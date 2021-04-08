amis.define('src/store/crud.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CRUDStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const file_saver_1 = require("node_modules/file-saver/dist/FileSaver.min");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const service_1 = require("src/store/service.ts");
  const helper_1 = require("src/utils/helper.ts");
  const pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  class ServerError extends Error {
      constructor() {
          super(...arguments);
          this.type = 'ServerError';
      }
  }
  exports.CRUDStore = service_1.ServiceStore.named('CRUDStore')
      .props({
      pristineQuery: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      query: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      prevPage: 1,
      page: 1,
      perPage: 10,
      total: 0,
      mode: 'normal',
      hasNext: false,
      selectedAction: mobx_state_tree_1.types.frozen(),
      items: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
      selectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
      unSelectedItems: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
      filterTogggable: false,
      filterVisible: true,
      hasInnerModalOpen: false
  })
      .views(self => ({
      get lastPage() {
          return Math.max(Math.ceil(self.total / (self.perPage < 1 ? 10 : self.perPage)), 1);
      },
      get filterData() {
          return helper_1.createObject(self.data, Object.assign({}, self.query));
      },
      get mergedData() {
          return helper_1.extendObject(self.data, Object.assign(Object.assign(Object.assign({}, self.query), self.data), { selectedItems: self.selectedItems, unSelectedItems: self.unSelectedItems }));
      },
      get hasModalOpened() {
          return self.dialogOpen || self.drawerOpen || self.hasInnerModalOpen;
      },
      get selectedItemsAsArray() {
          return self.selectedItems.concat();
      },
      fetchCtxOf(data, options) {
          return helper_1.createObject(data, Object.assign(Object.assign(Object.assign({}, self.query), { [options.pageField || 'page']: self.page, [options.perPageField || 'perPage']: self.perPage }), data));
      }
  }))
      .actions(self => {
      let fetchCancel = null;
      function setPristineQuery() {
          self.pristineQuery = self.query;
      }
      function updateQuery(values, updater, pageField = 'page', perPageField = 'perPage', replace = false) {
          const originQuery = self.query;
          self.query = replace
              ? Object.assign({}, values) : Object.assign(Object.assign({}, self.query), values);
          if (self.query[pageField || 'page']) {
              self.page = parseInt(self.query[pageField || 'page'], 10);
          }
          if (self.query[perPageField || 'perPage']) {
              self.perPage = parseInt(self.query[perPageField || 'perPage'], 10);
          }
          updater &&
              helper_1.isObjectShallowModified(originQuery, self.query, false) &&
              setTimeout(updater.bind(null, `?${helper_1.qsstringify(self.query)}`), 4);
      }
      const fetchInitData = mobx_state_tree_1.flow(function* getInitData(api, data, options = {}) {
          var _a, _b, _c, _d, _e;
          try {
              if (!options.forceReload && options.loadDataOnce && self.total) {
                  let items = options.source
                      ? tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.mergedData, {
                          items: self.data.itemsRaw,
                          rows: self.data.itemsRaw
                      }), '| raw')
                      : self.items.concat();
                  if (self.query.orderBy) {
                      const dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                      items = helper_1.sortArray(items, self.query.orderBy, dir);
                  }
                  const data = Object.assign(Object.assign({}, self.data), { total: items.length, items: items.slice((self.page - 1) * self.perPage, self.page * self.perPage) });
                  self.total = parseInt((_a = data.total) !== null && _a !== void 0 ? _a : data.count, 10) || 0;
                  self.reInitData(data);
                  return;
              }
              if (fetchCancel) {
                  fetchCancel();
                  fetchCancel = null;
                  self.fetching = false;
              }
              options.silent || self.markFetching(true);
              const ctx = helper_1.createObject(self.data, Object.assign(Object.assign(Object.assign({}, self.query), { [options.pageField || 'page']: self.page, [options.perPageField || 'perPage']: self.perPage }), data));
              // 一次性加载不要发送 perPage 属性
              if (options.loadDataOnce) {
                  delete ctx[options.perPageField || 'perPage'];
              }
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, ctx, Object.assign(Object.assign({}, options), { cancelExecutor: (executor) => (fetchCancel = executor) }));
              fetchCancel = null;
              if (!json.ok) {
                  self.updateMessage((_c = (_b = json.msg) !== null && _b !== void 0 ? _b : options.errorMessage) !== null && _c !== void 0 ? _c : self.__('CRUD.fetchFailed'), true);
                  mobx_state_tree_1.getEnv(self).notify('error', json.msg, json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
              }
              else {
                  if (!json.data) {
                      throw new Error(self.__('CRUD.invalidData'));
                  }
                  self.updatedAt = Date.now();
                  let result = json.data;
                  if (Array.isArray(result)) {
                      result = {
                          items: result
                      };
                  }
                  const { total, count, page, hasNext, items: oItems, rows: oRows } = result, rest = tslib_1.__rest(result, ["total", "count", "page", "hasNext", "items", "rows"]);
                  let items;
                  if (options.source) {
                      items = tpl_builtin_1.resolveVariableAndFilter(options.source, helper_1.createObject(self.filterData, result), '| raw');
                  }
                  else {
                      items = result.items || result.rows;
                  }
                  if (!Array.isArray(items)) {
                      throw new Error(self.__('CRUD.invalidArray'));
                  }
                  else {
                      // 确保成员是对象。
                      items.map((item) => typeof item === 'string' ? { text: item } : item);
                  }
                  // 点击加载更多数据
                  let rowsData = [];
                  if (options.loadDataMode && Array.isArray(self.data.items)) {
                      rowsData = self.data.items.concat(items);
                  }
                  else {
                      // 第一次的时候就是直接加载请求的数据
                      rowsData = items;
                  }
                  const data = Object.assign(Object.assign(Object.assign({}, (api.replaceData ? {} : self.pristine)), { items: rowsData, count: count, total: total }), rest);
                  if (options.loadDataOnce) {
                      // 记录原始集合，后续可能基于原始数据做排序查找。
                      data.itemsRaw = oItems || oRows;
                      if (self.query.orderBy) {
                          const dir = /desc/i.test(self.query.orderDir) ? -1 : 1;
                          rowsData = helper_1.sortArray(rowsData, self.query.orderBy, dir);
                      }
                      data.items = rowsData.slice((self.page - 1) * self.perPage, self.page * self.perPage);
                      data.count = data.total = rowsData.length;
                  }
                  self.items.replace(rowsData);
                  self.reInitData(data, !!api.replaceData);
                  options.syncResponse2Query !== false &&
                      updateQuery(pick_1.default(rest, Object.keys(self.query)), undefined, options.pageField || 'page', options.perPageField || 'perPage');
                  self.total = parseInt((_d = data.total) !== null && _d !== void 0 ? _d : data.count, 10) || 0;
                  typeof page !== 'undefined' && (self.page = parseInt(page, 10));
                  // 分页情况不清楚，只能知道有没有下一页。
                  if (typeof hasNext !== 'undefined') {
                      self.mode = 'simple';
                      self.total = 0;
                      self.hasNext = !!hasNext;
                  }
                  self.updateMessage((_e = json.msg) !== null && _e !== void 0 ? _e : options.successMessage);
                  // 配置了获取成功提示后提示，默认是空不会提示。
                  options &&
                      options.successMessage &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg);
              }
              self.markFetching(false);
              return json;
          }
          catch (e) {
              const env = mobx_state_tree_1.getEnv(self);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              self.markFetching(false);
              if (env.isCancel(e)) {
                  return;
              }
              console.error(e.stack);
              env.notify('error', e.message);
              return;
          }
      });
      function changePage(page, perPage) {
          self.page = page;
          perPage && (self.perPage = perPage);
      }
      function selectAction(action) {
          self.selectedAction = action;
      }
      const saveRemote = mobx_state_tree_1.flow(function* saveRemote(api, data, options = {}) {
          var _a, _b, _c;
          try {
              options = Object.assign({ method: 'post' }, options);
              self.markSaving(true);
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, options);
              self.markSaving(false);
              if (!helper_1.isEmpty(json.data) || json.ok) {
                  self.updateData(json.data, {
                      __saved: Date.now()
                  }, !!api && api.replaceData);
                  self.updatedAt = Date.now();
              }
              if (!json.ok) {
                  self.updateMessage((_b = (_a = json.msg) !== null && _a !== void 0 ? _a : options.errorMessage) !== null && _b !== void 0 ? _b : self.__('saveFailed'), true);
                  mobx_state_tree_1.getEnv(self).notify('error', self.msg, json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
                  throw new ServerError(self.msg);
              }
              else {
                  self.updateMessage((_c = json.msg) !== null && _c !== void 0 ? _c : options.successMessage);
                  self.msg &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg, json.msgTimeout !== undefined
                          ? {
                              closeButton: true,
                              timeout: json.msgTimeout
                          }
                          : undefined);
              }
              return json.data;
          }
          catch (e) {
              self.markSaving(false);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              e.type !== 'ServerError' && mobx_state_tree_1.getEnv(self).notify('error', e.message);
              throw e;
          }
      });
      const setFilterTogglable = (toggable, filterVisible) => {
          self.filterTogggable = toggable;
          filterVisible !== void 0 && (self.filterVisible = filterVisible);
      };
      const setFilterVisible = (visible) => {
          self.filterVisible = visible;
      };
      const setSelectedItems = (items) => {
          self.selectedItems.replace(items);
      };
      const setUnSelectedItems = (items) => {
          self.unSelectedItems.replace(items);
      };
      const setInnerModalOpened = (value) => {
          self.hasInnerModalOpen = value;
      };
      const initFromScope = function (scope, source) {
          let rowsData = tpl_builtin_1.resolveVariableAndFilter(source, scope, '| raw');
          if (!Array.isArray(rowsData)) {
              return;
          }
          const data = Object.assign(Object.assign({}, self.pristine), { items: rowsData, count: 0, total: 0 });
          self.items.replace(rowsData);
          self.reInitData(data);
      };
      return {
          setPristineQuery,
          updateQuery,
          fetchInitData,
          changePage,
          selectAction,
          saveRemote,
          setFilterTogglable,
          setFilterVisible,
          setSelectedItems,
          setUnSelectedItems,
          setInnerModalOpened,
          initFromScope,
          async exportAsCSV(options = {}) {
              let items = options.loadDataOnce ? self.data.itemsRaw : self.data.items;
              if (!options.loadDataOnce && options.api) {
                  const json = await self.fetchData(options.api, Object.assign(Object.assign({}, self.query), { page: undefined, perPage: undefined, op: 'export-csv' }), {
                      autoAppend: true
                  });
                  if (json.ok &&
                      (Array.isArray(json.data.items) || Array.isArray(json.data.rows))) {
                      items = json.data.items || json.data.rows;
                  }
              }
              Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/papaparse/papaparse.min'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then((papaparse) => {
                  const csvText = papaparse.unparse(items);
                  if (csvText) {
                      const blob = new Blob([csvText], {
                          type: 'text/plain;charset=utf-8'
                      });
                      file_saver_1.saveAs(blob, 'data.csv');
                  }
              });
          }
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3J1ZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9jcnVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyQ0FBa0M7QUFDbEMscURBUXlCO0FBRXpCLHVDQUF1QztBQUN2Qyw0Q0FPeUI7QUFFekIsK0RBQStCO0FBQy9CLHNEQUE4RDtBQUU5RCxNQUFNLFdBQVksU0FBUSxLQUFLO0lBQS9COztRQUNFLFNBQUksR0FBRyxhQUFhLENBQUM7SUFDdkIsQ0FBQztDQUFBO0FBRVksUUFBQSxTQUFTLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0tBQ3JELEtBQUssQ0FBQztJQUNMLGFBQWEsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLEVBQUUsQ0FBQztJQUNqRCxLQUFLLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekMsUUFBUSxFQUFFLENBQUM7SUFDWCxJQUFJLEVBQUUsQ0FBQztJQUNQLE9BQU8sRUFBRSxFQUFFO0lBQ1gsS0FBSyxFQUFFLENBQUM7SUFDUixJQUFJLEVBQUUsUUFBUTtJQUNkLE9BQU8sRUFBRSxLQUFLO0lBQ2QsY0FBYyxFQUFFLHVCQUFLLENBQUMsTUFBTSxFQUFFO0lBQzlCLEtBQUssRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLEtBQUssQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQ3RELGFBQWEsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLEtBQUssQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDO0lBQzlELGVBQWUsRUFBRSx1QkFBSyxDQUFDLFFBQVEs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

});
