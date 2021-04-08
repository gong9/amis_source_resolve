amis.define('src/renderers/CRUD.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CRUDRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const crud_1 = require("src/store/crud.ts");
  const helper_1 = require("src/utils/helper.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const tpl_1 = require("src/utils/tpl.ts");
  const api_1 = require("src/utils/api.ts");
  const omit_1 = tslib_1.__importDefault(require("node_modules/lodash/omit"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  const Html_1 = tslib_1.__importDefault(require("src/components/Html.tsx"));
  const components_1 = require("src/components/index.tsx");
  const icons_1 = require("src/components/icons.tsx");
  let CRUD = /** @class */ (() => {
      class CRUD extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.dataInvalid = false;
              this.controlRef = this.controlRef.bind(this);
              this.handleFilterReset = this.handleFilterReset.bind(this);
              this.handleFilterSubmit = this.handleFilterSubmit.bind(this);
              this.handleFilterInit = this.handleFilterInit.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleBulkAction = this.handleBulkAction.bind(this);
              this.handleChangePage = this.handleChangePage.bind(this);
              this.handleBulkGo = this.handleBulkGo.bind(this);
              this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
              this.handleDialogClose = this.handleDialogClose.bind(this);
              this.handleSave = this.handleSave.bind(this);
              this.handleSaveOrder = this.handleSaveOrder.bind(this);
              this.handleSelect = this.handleSelect.bind(this);
              this.handleChildPopOverOpen = this.handleChildPopOverOpen.bind(this);
              this.handleChildPopOverClose = this.handleChildPopOverClose.bind(this);
              this.search = this.search.bind(this);
              this.silentSearch = this.silentSearch.bind(this);
              this.handleQuery = this.handleQuery.bind(this);
              this.renderHeaderToolbar = this.renderHeaderToolbar.bind(this);
              this.renderFooterToolbar = this.renderFooterToolbar.bind(this);
              this.clearSelection = this.clearSelection.bind(this);
          }
          componentWillMount() {
              const { location, store, pageField, perPageField, syncLocation, loadDataOnce } = this.props;
              this.mounted = true;
              if (syncLocation && location && (location.query || location.search)) {
                  store.updateQuery(qs_1.default.parse(location.search.substring(1)), undefined, pageField, perPageField);
              }
              else if (syncLocation && !location && window.location.search) {
                  store.updateQuery(qs_1.default.parse(window.location.search.substring(1)), undefined, pageField, perPageField);
              }
              this.props.store.setFilterTogglable(!!this.props.filterTogglable, this.props.filterDefaultVisible);
          }
          componentDidMount() {
              const store = this.props.store;
              if (this.props.perPage) {
                  store.changePage(store.page, this.props.perPage);
              }
              if (!this.props.filter || (store.filterTogggable && !store.filterVisible)) {
                  this.handleFilterInit({});
              }
              if (this.props.pickerMode && this.props.value) {
                  store.setSelectedItems(this.props.value);
              }
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const store = props.store;
              if (helper_1.anyChanged(['toolbar', 'headerToolbar', 'footerToolbar', 'bulkActions'], props, nextProps)) {
                  // 来点参数变化。
                  this.renderHeaderToolbar = this.renderHeaderToolbar.bind(this);
                  this.renderFooterToolbar = this.renderFooterToolbar.bind(this);
              }
              if (this.props.pickerMode && this.props.value !== nextProps.value) {
                  store.setSelectedItems(nextProps.value);
              }
              if (this.props.filterTogglable !== nextProps.filterTogglable) {
                  store.setFilterTogglable(!!nextProps.filterTogglable, nextProps.filterDefaultVisible);
              }
              if (props.syncLocation &&
                  props.location &&
                  props.location.search !== nextProps.location.search) {
                  // 同步地址栏，那么直接检测 query 是否变了，变了就重新拉数据
                  store.updateQuery(qs_1.default.parse(nextProps.location.search.substring(1)), undefined, nextProps.pageField, nextProps.perPageField);
                  this.dataInvalid = helper_1.isObjectShallowModified(store.query, this.lastQuery, false);
              }
              else if (props.api &&
                  nextProps.api &&
                  api_1.isApiOutdated(props.api, nextProps.api, store.fetchCtxOf(props.data, {
                      pageField: props.pageField,
                      perPageField: props.perPageField
                  }), store.fetchCtxOf(nextProps.data, {
                      pageField: nextProps.pageField,
                      perPageField: nextProps.perPageField
                  }))) {
                  this.dataInvalid = true;
              }
          }
          componentDidUpdate() {
              if (this.dataInvalid) {
                  this.dataInvalid = false;
                  this.search();
              }
          }
          componentWillUnmount() {
              this.mounted = false;
              clearTimeout(this.timer);
          }
          controlRef(control) {
              // 因为 control 有可能被 n 层 hoc 包裹。
              while (control && control.getWrappedInstance) {
                  control = control.getWrappedInstance();
              }
              this.control = control;
          }
          handleAction(e, action, ctx, throwErrors = false, delegate) {
              const { onAction, store, messages, pickerMode, env, pageField, stopAutoRefreshWhenModalIsOpen } = this.props;
              if (action.actionType === 'dialog') {
                  store.setCurrentAction(action);
                  const idx = ctx.index;
                  const length = store.items.length;
                  stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                  store.openDialog(ctx, {
                      hasNext: idx < length - 1,
                      nextIndex: idx + 1,
                      hasPrev: idx > 0,
                      prevIndex: idx - 1,
                      index: idx
                  });
              }
              else if (action.actionType === 'ajax') {
                  store.setCurrentAction(action);
                  const data = ctx;
                  // 由于 ajax 一段时间后再弹出，肯定被浏览器给阻止掉的，所以提前弹。
                  const redirect = action.redirect && tpl_1.filter(action.redirect, data);
                  redirect && action.blank && env.jumpTo(redirect, action);
                  return store
                      .saveRemote(action.api, data, {
                      successMessage: (action.messages && action.messages.success) ||
                          (messages && messages.saveSuccess),
                      errorMessage: (action.messages && action.messages.failed) ||
                          (messages && messages.saveFailed)
                  })
                      .then(async (payload) => {
                      const data = helper_1.createObject(ctx, payload);
                      if (action.feedback && helper_1.isVisible(action.feedback, data)) {
                          await this.openFeedback(action.feedback, data);
                          stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                      }
                      const redirect = action.redirect && tpl_1.filter(action.redirect, data);
                      redirect && !action.blank && env.jumpTo(redirect, action);
                      action.reload
                          ? this.reloadTarget(action.reload, data)
                          : redirect
                              ? null
                              : this.search(undefined, undefined, true, true);
                      action.close && this.closeTarget(action.close);
                  })
                      .catch(() => { });
              }
              else if (pickerMode &&
                  (action.actionType === 'confirm' || action.actionType === 'submit')) {
                  store.setCurrentAction(action);
                  return Promise.resolve({
                      items: store.selectedItems.concat()
                  });
              }
              else {
                  onAction(e, action, ctx, throwErrors, delegate || this.context);
              }
          }
          handleBulkAction(selectedItems, unSelectedItems, e, action) {
              const { store, primaryField, onAction, messages, pageField, stopAutoRefreshWhenModalIsOpen, env } = this.props;
              if (!selectedItems.length && action.requireSelected !== false) {
                  return;
              }
              let ids = selectedItems
                  .map(item => item.hasOwnProperty(primaryField) ? item[primaryField] : null)
                  .filter(item => item)
                  .join(',');
              const ctx = helper_1.createObject(store.mergedData, Object.assign(Object.assign({}, selectedItems[0]), { rows: selectedItems, items: selectedItems, unSelectedItems: unSelectedItems, ids }));
              let fn = () => {
                  if (action.actionType === 'dialog') {
                      return this.handleAction(e, Object.assign(Object.assign({}, action), { __from: 'bulkAction' }), ctx);
                  }
                  else if (action.actionType === 'ajax') {
                      api_1.isEffectiveApi(action.api, ctx) &&
                          store
                              .saveRemote(action.api, ctx, {
                              successMessage: (action.messages && action.messages.success) ||
                                  (messages && messages.saveSuccess),
                              errorMessage: (action.messages && action.messages.failed) ||
                                  (messages && messages.saveFailed)
                          })
                              .then(async (payload) => {
                              const data = helper_1.createObject(ctx, payload);
                              if (action.feedback && helper_1.isVisible(action.feedback, data)) {
                                  await this.openFeedback(action.feedback, data);
                                  stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                              }
                              action.reload
                                  ? this.reloadTarget(action.reload, data)
                                  : this.search({ [pageField || 'page']: 1 }, undefined, true, true);
                              action.close && this.closeTarget(action.close);
                              const redirect = action.redirect && tpl_1.filter(action.redirect, data);
                              redirect && env.jumpTo(redirect, action);
                          })
                              .catch(() => null);
                  }
                  else if (onAction) {
                      onAction(e, action, ctx, false, this.context);
                  }
              };
              if (action.confirmText && env.confirm) {
                  env
                      .confirm(tpl_1.filter(action.confirmText, ctx))
                      .then((confirmed) => confirmed && fn());
              }
              else {
                  fn();
              }
          }
          handleItemAction(action, ctx) {
              this.doAction(action, ctx);
          }
          handleFilterInit(values) {
              const { defaultParams, data, store } = this.props;
              this.handleFilterSubmit(Object.assign(Object.assign(Object.assign({}, defaultParams), values), store.query), false, true, this.props.initFetch !== false);
              store.setPristineQuery();
              const { pickerMode, options } = this.props;
              pickerMode &&
                  store.updateData({
                      items: options || []
                  });
          }
          handleFilterReset(values) {
              const { store, syncLocation, env, pageField, perPageField } = this.props;
              store.updateQuery(store.pristineQuery, syncLocation && env && env.updateLocation
                  ? (location) => env.updateLocation(location)
                  : undefined, pageField, perPageField, true);
              this.lastQuery = store.query;
              this.search();
          }
          handleFilterSubmit(values, jumpToFirstPage = true, replaceLocation = false, search = true) {
              const { store, syncLocation, env, pageField, perPageField, loadDataOnceFetchOnFilter } = this.props;
              values = syncLocation ? qs_1.default.parse(helper_1.qsstringify(values)) : values;
              store.updateQuery(Object.assign(Object.assign({}, values), { [pageField || 'page']: jumpToFirstPage ? 1 : store.page }), syncLocation && env && env.updateLocation
                  ? (location) => env.updateLocation(location, replaceLocation)
                  : undefined, pageField, perPageField);
              this.lastQuery = store.query;
              search &&
                  this.search(undefined, undefined, undefined, loadDataOnceFetchOnFilter);
          }
          handleBulkGo(selectedItems, unSelectedItems, e) {
              const action = this.props.store.selectedAction;
              const env = this.props.env;
              if (action.confirmText) {
                  return env
                      .confirm(action.confirmText)
                      .then((confirmed) => confirmed &&
                      this.handleBulkAction(selectedItems, unSelectedItems, e, action));
              }
              return this.handleBulkAction(selectedItems, unSelectedItems, e, action);
          }
          handleDialogConfirm(values, action, ctx, components) {
              const { store, pageField, stopAutoRefreshWhenModalIsOpen, interval, silentPolling, env } = this.props;
              store.closeDialog();
              const dialogAction = store.action;
              if (stopAutoRefreshWhenModalIsOpen && interval) {
                  this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
              }
              if (action.actionType === 'next' &&
                  typeof ctx.nextIndex === 'number' &&
                  store.data.items[ctx.nextIndex]) {
                  return this.handleAction(undefined, Object.assign({}, dialogAction), helper_1.createObject(helper_1.createObject(store.data, {
                      index: ctx.nextIndex
                  }), store.data.items[ctx.nextIndex]));
              }
              else if (action.actionType === 'prev' &&
                  typeof ctx.prevIndex === 'number' &&
                  store.data.items[ctx.prevIndex]) {
                  return this.handleAction(undefined, Object.assign({}, dialogAction), helper_1.createObject(helper_1.createObject(store.data, {
                      index: ctx.prevIndex
                  }), store.data.items[ctx.prevIndex]));
              }
              else if (values.length) {
                  const value = values[0];
                  ctx = helper_1.createObject(ctx, value);
                  const component = components[0];
                  // 提交来自 form
                  if (component && component.props.type === 'form') {
                      // 数据保存了，说明列表数据已经无效了，重新刷新。
                      if (value && value.__saved) {
                          // 配置了 reload 则跳过自动更新。
                          dialogAction.reload ||
                              this.search(dialogAction.__from ? { [pageField || 'page']: 1 } : undefined, undefined, true, true);
                      }
                      else if (value &&
                          ((value.hasOwnProperty('items') && value.items) ||
                              value.hasOwnProperty('ids')) &&
                          this.control.bulkUpdate) {
                          this.control.bulkUpdate(value, value.items);
                      }
                  }
              }
              if (dialogAction.reload) {
                  this.reloadTarget(dialogAction.reload, ctx);
              }
              const redirect = dialogAction.redirect && tpl_1.filter(action.redirect, ctx);
              redirect && env.jumpTo(redirect, dialogAction);
          }
          handleDialogClose() {
              const { store, stopAutoRefreshWhenModalIsOpen, silentPolling, interval } = this.props;
              store.closeDialog();
              if (stopAutoRefreshWhenModalIsOpen && interval) {
                  this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
              }
          }
          openFeedback(dialog, ctx) {
              return new Promise(resolve => {
                  const { store } = this.props;
                  store.setCurrentAction({
                      type: 'button',
                      actionType: 'dialog',
                      dialog: dialog
                  });
                  store.openDialog(ctx, undefined, confirmed => {
                      resolve(confirmed);
                  });
              });
          }
          search(values, silent, clearSelection, forceReload = false) {
              const { store, api, messages, pageField, perPageField, interval, stopAutoRefreshWhen, stopAutoRefreshWhenModalIsOpen, silentPolling, syncLocation, syncResponse2Query, keepItemSelectionOnPageChange, pickerMode, env, loadDataOnce, loadDataOnceFetchOnFilter, source } = this.props;
              // reload 需要清空用户选择。
              if (keepItemSelectionOnPageChange && clearSelection && !pickerMode) {
                  store.setSelectedItems([]);
                  store.setUnSelectedItems([]);
              }
              let loadDataMode = '';
              if (values && typeof values.loadDataMode === 'string') {
                  loadDataMode = 'load-more';
                  delete values.loadDataMode;
              }
              clearTimeout(this.timer);
              values &&
                  store.updateQuery(values, !loadDataMode && syncLocation && env && env.updateLocation
                      ? env.updateLocation
                      : undefined, pageField, perPageField);
              this.lastQuery = store.query;
              const data = helper_1.createObject(store.data, store.query);
              api_1.isEffectiveApi(api, data)
                  ? store
                      .fetchInitData(api, data, {
                      successMessage: messages && messages.fetchSuccess,
                      errorMessage: messages && messages.fetchFailed,
                      autoAppend: true,
                      forceReload,
                      loadDataOnce,
                      loadDataOnceFetchOnFilter,
                      source,
                      silent,
                      pageField,
                      perPageField,
                      loadDataMode,
                      syncResponse2Query
                  })
                      .then(value => {
                      interval &&
                          this.mounted &&
                          (!stopAutoRefreshWhen ||
                              !((stopAutoRefreshWhenModalIsOpen && store.hasModalOpened) ||
                                  tpl_1.evalExpression(stopAutoRefreshWhen, data))) &&
                          (this.timer = setTimeout(silentPolling
                              ? this.silentSearch.bind(this, undefined, undefined, true)
                              : this.search.bind(this, undefined, undefined, undefined, true), Math.max(interval, 1000)));
                      return value;
                  })
                  : source && store.initFromScope(data, source);
          }
          silentSearch(values, clearSelection, forceReload = false) {
              return this.search(values, true, clearSelection, forceReload);
          }
          handleChangePage(page, perPage) {
              var _a;
              const { store, syncLocation, env, pageField, perPageField, autoJumpToTopOnPagerChange, affixOffsetTop } = this.props;
              let query = {
                  [pageField || 'page']: page
              };
              if (perPage) {
                  query[perPageField || 'perPage'] = perPage;
              }
              store.updateQuery(query, syncLocation && (env === null || env === void 0 ? void 0 : env.updateLocation) ? env.updateLocation : undefined, pageField, perPageField);
              this.search(undefined, undefined, undefined);
              if (autoJumpToTopOnPagerChange && this.control) {
                  react_dom_1.findDOMNode(this.control).scrollIntoView();
                  const scrolledY = window.scrollY;
                  const offsetTop = (_a = affixOffsetTop !== null && affixOffsetTop !== void 0 ? affixOffsetTop : env === null || env === void 0 ? void 0 : env.affixOffsetTop) !== null && _a !== void 0 ? _a : 50;
                  scrolledY && window.scroll(0, scrolledY - offsetTop);
              }
          }
          handleSave(rows, diff, indexes, unModifiedItems, rowsOrigin, resetOnFailed) {
              const { store, quickSaveApi, quickSaveItemApi, primaryField, env, messages, reload } = this.props;
              if (Array.isArray(rows)) {
                  if (!api_1.isEffectiveApi(quickSaveApi)) {
                      env && env.alert('CRUD quickSaveApi is required');
                      return;
                  }
                  const data = helper_1.createObject(store.data, {
                      rows,
                      rowsDiff: diff,
                      indexes: indexes,
                      rowsOrigin
                  });
                  if (rows.length && rows[0].hasOwnProperty(primaryField || 'id')) {
                      data.ids = rows
                          .map(item => item[primaryField || 'id'])
                          .join(',');
                  }
                  if (unModifiedItems) {
                      data.unModifiedItems = unModifiedItems;
                  }
                  store
                      .saveRemote(quickSaveApi, data, {
                      successMessage: messages && messages.saveFailed,
                      errorMessage: messages && messages.saveSuccess
                  })
                      .then(() => {
                      reload && this.reloadTarget(reload, data);
                      this.search(undefined, undefined, true, true);
                  })
                      .catch(() => { });
              }
              else {
                  if (!api_1.isEffectiveApi(quickSaveItemApi)) {
                      env && env.alert('CRUD quickSaveItemApi is required!');
                      return;
                  }
                  const data = helper_1.createObject(store.data, {
                      item: rows,
                      modified: diff,
                      origin: rowsOrigin
                  });
                  const sendData = helper_1.createObject(data, rows);
                  store
                      .saveRemote(quickSaveItemApi, sendData)
                      .then(() => {
                      reload && this.reloadTarget(reload, data);
                      this.search(undefined, undefined, true, true);
                  })
                      .catch(() => {
                      resetOnFailed && this.control.reset();
                  });
              }
          }
          handleSaveOrder(moved, rows) {
              const { store, saveOrderApi, orderField, primaryField, env, reload } = this.props;
              if (!saveOrderApi) {
                  env && env.alert('CRUD saveOrderApi is required!');
                  return;
              }
              const model = helper_1.createObject(store.data);
              let insertAfter;
              let insertBefore;
              const holding = [];
              const hasIdField = primaryField &&
                  rows[0] &&
                  rows[0].hasOwnProperty(primaryField);
              hasIdField || (model.idMap = {});
              model.insertAfter = {};
              rows.forEach((item) => {
                  if (~moved.indexOf(item)) {
                      if (insertAfter) {
                          let insertAfterId = hasIdField
                              ? insertAfter[primaryField]
                              : rows.indexOf(insertAfter);
                          model.insertAfter[insertAfterId] =
                              model.insertAfter[insertAfterId] || [];
                          hasIdField || (model.idMap[insertAfterId] = insertAfter);
                          model.insertAfter[insertAfterId].push(hasIdField ? item[primaryField] : item);
                      }
                      else {
                          holding.push(item);
                      }
                  }
                  else {
                      insertAfter = item;
                      insertBefore = insertBefore || item;
                  }
              });
              if (insertBefore && holding.length) {
                  let insertBeforeId = hasIdField
                      ? insertBefore[primaryField]
                      : rows.indexOf(insertBefore);
                  hasIdField || (model.idMap[insertBeforeId] = insertBefore);
                  model.insertBefore = {};
                  model.insertBefore[insertBeforeId] = holding.map((item) => hasIdField ? item[primaryField] : item);
              }
              else if (holding.length) {
                  const first = holding[0];
                  const firstId = hasIdField
                      ? first[primaryField]
                      : rows.indexOf(first);
                  hasIdField || (model.idMap[firstId] = first);
                  model.insertAfter[firstId] = holding
                      .slice(1)
                      .map((item) => (hasIdField ? item[primaryField] : item));
              }
              if (orderField) {
                  const start = (store.page - 1) * store.perPage || 0;
                  rows = rows.map((item, key) => helper_1.extendObject(item, {
                      [orderField]: start + key + 1
                  }));
              }
              model.rows = rows.concat();
              hasIdField &&
                  (model.ids = rows
                      .map((item) => item[primaryField])
                      .join(','));
              hasIdField &&
                  orderField &&
                  (model.order = rows.map(item => pick_1.default(item, [primaryField, orderField])));
              api_1.isEffectiveApi(saveOrderApi, model) &&
                  store
                      .saveRemote(saveOrderApi, model)
                      .then(() => {
                      reload && this.reloadTarget(reload, model);
                      this.search(undefined, undefined, true, true);
                  })
                      .catch(() => { });
          }
          handleSelect(items, unSelectedItems) {
              const { store, keepItemSelectionOnPageChange, primaryField, multiple, pickerMode, onSelect } = this.props;
              let newItems = items;
              let newUnSelectedItems = unSelectedItems;
              if (keepItemSelectionOnPageChange && store.selectedItems.length) {
                  const oldItems = store.selectedItems.concat();
                  const oldUnselectedItems = store.unSelectedItems.concat();
                  items.forEach(item => {
                      const idx = findIndex_1.default(oldItems, a => a === item ||
                          (a[primaryField || 'id'] &&
                              a[primaryField || 'id'] == item[primaryField || 'id']));
                      if (~idx) {
                          oldItems[idx] = item;
                      }
                      else {
                          oldItems.push(item);
                      }
                      const idx2 = findIndex_1.default(oldUnselectedItems, a => a === item ||
                          (a[primaryField || 'id'] &&
                              a[primaryField || 'id'] == item[primaryField || 'id']));
                      if (~idx2) {
                          oldUnselectedItems.splice(idx2, 1);
                      }
                  });
                  unSelectedItems.forEach(item => {
                      const idx = findIndex_1.default(oldUnselectedItems, a => a === item ||
                          (a[primaryField || 'id'] &&
                              a[primaryField || 'id'] == item[primaryField || 'id']));
                      const idx2 = findIndex_1.default(oldItems, a => a === item ||
                          (a[primaryField || 'id'] &&
                              a[primaryField || 'id'] == item[primaryField || 'id']));
                      if (~idx) {
                          oldUnselectedItems[idx] = item;
                      }
                      else {
                          oldUnselectedItems.push(item);
                      }
                      ~idx2 && oldItems.splice(idx2, 1);
                  });
                  newItems = oldItems;
                  newUnSelectedItems = oldUnselectedItems;
                  // const thisBatch = items.concat(unSelectedItems);
                  // let notInThisBatch = (item: any) =>
                  //   !find(
                  //     thisBatch,
                  //     a => a[primaryField || 'id'] == item[primaryField || 'id']
                  //   );
                  // newItems = store.selectedItems.filter(notInThisBatch);
                  // newUnSelectedItems = store.unSelectedItems.filter(notInThisBatch);
                  // newItems.push(...items);
                  // newUnSelectedItems.push(...unSelectedItems);
              }
              if (pickerMode && multiple === false && newItems.length > 1) {
                  newUnSelectedItems.push.apply(newUnSelectedItems, newItems.splice(0, newItems.length - 1));
              }
              store.setSelectedItems(newItems);
              store.setUnSelectedItems(newUnSelectedItems);
              onSelect && onSelect(newItems);
          }
          handleChildPopOverOpen(popOver) {
              if (this.props.interval &&
                  popOver &&
                  ~['dialog', 'drawer'].indexOf(popOver.mode)) {
                  this.props.stopAutoRefreshWhenModalIsOpen && clearTimeout(this.timer);
                  this.props.store.setInnerModalOpened(true);
              }
          }
          handleChildPopOverClose(popOver) {
              const { stopAutoRefreshWhenModalIsOpen, silentPolling, interval } = this.props;
              if (popOver && ~['dialog', 'drawer'].indexOf(popOver.mode)) {
                  this.props.store.setInnerModalOpened(false);
                  if (stopAutoRefreshWhenModalIsOpen && interval) {
                      this.timer = setTimeout(silentPolling ? this.silentSearch : this.search, Math.max(interval, 1000));
                  }
              }
          }
          handleQuery(values, forceReload = false) {
              const { store, syncLocation, env, pageField, perPageField } = this.props;
              store.updateQuery(Object.assign(Object.assign({}, values), { [pageField || 'page']: 1 }), syncLocation && env && env.updateLocation
                  ? env.updateLocation
                  : undefined, pageField, perPageField);
              this.search(undefined, undefined, undefined, forceReload);
          }
          reload(subpath, query) {
              if (query) {
                  return this.receive(query);
              }
              else {
                  this.search(undefined, undefined, true, true);
              }
          }
          receive(values) {
              this.handleQuery(values, true);
          }
          reloadTarget(target, data) {
              // implement this.
          }
          closeTarget(target) {
              // implement this.
          }
          doAction(action, data, throwErrors = false) {
              return this.handleAction(undefined, action, data, throwErrors);
          }
          unSelectItem(item, index) {
              const { store } = this.props;
              const selected = store.selectedItems.concat();
              const unSelected = store.unSelectedItems.concat();
              const idx = selected.indexOf(item);
              ~idx && unSelected.push.apply(unSelected, selected.splice(idx, 1));
              store.setSelectedItems(selected);
              store.setUnSelectedItems(unSelected);
          }
          clearSelection() {
              const { store } = this.props;
              const selected = store.selectedItems.concat();
              const unSelected = store.unSelectedItems.concat();
              store.setSelectedItems([]);
              store.setUnSelectedItems(unSelected.concat(selected));
          }
          hasBulkActionsToolbar() {
              const { headerToolbar, footerToolbar } = this.props;
              const isBulkActions = (item) => ~['bulkActions', 'bulk-actions'].indexOf(item.type || item);
              return ((Array.isArray(headerToolbar) && find_1.default(headerToolbar, isBulkActions)) ||
                  (Array.isArray(footerToolbar) && find_1.default(footerToolbar, isBulkActions)));
          }
          hasBulkActions() {
              const { bulkActions, itemActions, store } = this.props;
              if ((!bulkActions || !bulkActions.length) &&
                  (!itemActions || !itemActions.length)) {
                  return false;
              }
              let bulkBtns = [];
              let itemBtns = [];
              const ctx = store.mergedData;
              if (bulkActions && bulkActions.length) {
                  bulkBtns = bulkActions
                      .map(item => (Object.assign(Object.assign({}, item), filter_schema_1.default(item, ctx))))
                      .filter(item => !item.hidden && item.visible !== false);
              }
              const itemData = helper_1.createObject(store.data, store.selectedItems.length ? store.selectedItems[0] : {});
              if (itemActions && itemActions.length) {
                  itemBtns = itemActions
                      .map(item => (Object.assign(Object.assign({}, item), filter_schema_1.default(item, itemData))))
                      .filter(item => !item.hidden && item.visible !== false);
              }
              return bulkBtns.length || itemBtns.length;
          }
          renderBulkActions(childProps) {
              let { bulkActions, itemActions, store, render, classnames: cx } = this.props;
              const items = childProps.items;
              if (!items.length ||
                  ((!bulkActions || !bulkActions.length) &&
                      (!itemActions || !itemActions.length))) {
                  return null;
              }
              const selectedItems = store.selectedItems;
              const unSelectedItems = store.unSelectedItems;
              let bulkBtns = [];
              let itemBtns = [];
              const ctx = store.mergedData;
              // const ctx = createObject(store.data, {
              //     ...store.query,
              //     items: childProps.items,
              //     selectedItems: childProps.selectedItems,
              //     unSelectedItems: childProps.unSelectedItems
              // });
              if (bulkActions &&
                  bulkActions.length &&
                  (!itemActions || !itemActions.length || selectedItems.length > 1)) {
                  bulkBtns = bulkActions
                      .map(item => (Object.assign(Object.assign({}, item), filter_schema_1.default(item, ctx))))
                      .filter(item => !item.hidden && item.visible !== false);
              }
              const itemData = helper_1.createObject(store.data, selectedItems.length ? selectedItems[0] : {});
              if (itemActions && selectedItems.length === 1) {
                  itemBtns = itemActions
                      .map(item => (Object.assign(Object.assign({}, item), filter_schema_1.default(item, itemData))))
                      .filter(item => !item.hidden && item.visible !== false);
              }
              return bulkBtns.length || itemBtns.length ? (react_1.default.createElement("div", { className: cx('Crud-actions') },
                  bulkBtns.map((btn, index) => render(`bulk-action/${index}`, Object.assign(Object.assign({ size: 'sm' }, omit_1.default(btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: 'button', ignoreConfirm: true }), {
                      key: `bulk-${index}`,
                      data: ctx,
                      disabled: btn.disabled ||
                          (btn.requireSelected !== false ? !selectedItems.length : false),
                      onAction: this.handleBulkAction.bind(this, selectedItems.concat(), unSelectedItems.concat())
                  })),
                  itemBtns.map((btn, index) => render(`bulk-action/${index}`, Object.assign(Object.assign({ size: 'sm' }, omit_1.default(btn, ['visibleOn', 'hiddenOn', 'disabledOn'])), { type: 'button' }), {
                      key: `item-${index}`,
                      data: itemData,
                      disabled: btn.disabled,
                      onAction: this.handleItemAction.bind(this, btn, itemData)
                  })))) : null;
          }
          renderPagination(toolbar) {
              const { store, render, classnames: cx, alwaysShowPagination } = this.props;
              const { page, lastPage } = store;
              if (store.mode !== 'simple' &&
                  store.lastPage < 2 &&
                  !alwaysShowPagination) {
                  return null;
              }
              const extraProps = {};
              if (typeof toolbar !== 'string') {
                  extraProps.showPageInput = toolbar.showPageInput;
                  extraProps.maxButtons = toolbar.maxButtons;
              }
              return (react_1.default.createElement("div", { className: cx('Crud-pager') }, render('pagination', {
                  type: 'pagination'
              }, Object.assign(Object.assign({}, extraProps), { activePage: page, lastPage: lastPage, hasNext: store.hasNext, mode: store.mode, onPageChange: this.handleChangePage }))));
          }
          renderStatistics() {
              const { store, classnames: cx, translate: __, alwaysShowPagination } = this.props;
              if (store.lastPage <= 1 && !alwaysShowPagination) {
                  return null;
              }
              return (react_1.default.createElement("div", { className: cx('Crud-statistics') }, __('CRUD.stat', {
                  page: store.page,
                  lastPage: store.lastPage,
                  total: store.total
              })));
          }
          renderSwitchPerPage(childProps) {
              const { store, perPageAvailable, classnames: cx, classPrefix: ns, translate: __ } = this.props;
              const items = childProps.items;
              if (!items.length) {
                  return null;
              }
              const perPages = (perPageAvailable || [5, 10, 20, 50, 100]).map((item) => ({
                  label: item,
                  value: item + ''
              }));
              return (react_1.default.createElement("div", { className: cx('Crud-pageSwitch') },
                  __('CRUD.perPage'),
                  react_1.default.createElement(Select_1.default, { classPrefix: ns, searchable: false, placeholder: __('Select.placeholder'), options: perPages, value: store.perPage + '', onChange: (value) => this.handleChangePage(1, value.value), clearable: false })));
          }
          renderLoadMore() {
              const { store, classPrefix: ns, classnames: cx, translate: __ } = this.props;
              const { page, lastPage } = store;
              return page < lastPage ? (react_1.default.createElement("div", { className: cx('Crud-loadMore') },
                  react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: () => this.search({ page: page + 1, loadDataMode: 'load-more' }), size: "sm" }, __('CRUD.loadMore')))) : ('');
          }
          renderFilterToggler() {
              const { store, classnames: cx, translate: __ } = this.props;
              if (!store.filterTogggable) {
                  return null;
              }
              return (react_1.default.createElement("button", { onClick: () => store.setFilterVisible(!store.filterVisible), className: cx('Button Button--sm Button--default', {
                      'is-active': store.filterVisible
                  }) },
                  react_1.default.createElement(icons_1.Icon, { icon: "filter", className: "icon m-r-xs" }),
                  __('CRUD.filter')));
          }
          renderExportCSV() {
              const { store, classPrefix: ns, classnames: cx, translate: __, loadDataOnce, api } = this.props;
              return (react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: () => store.exportAsCSV({
                      loadDataOnce,
                      api
                  }), size: "sm" }, __('CRUD.exportCSV')));
          }
          renderToolbar(toolbar, index = 0, childProps = {}, toolbarRenderer) {
              if (!toolbar) {
                  return null;
              }
              const type = toolbar.type || toolbar;
              if (type === 'bulkActions' || type === 'bulk-actions') {
                  return this.renderBulkActions(childProps);
              }
              else if (type === 'pagination') {
                  return this.renderPagination(toolbar);
              }
              else if (type === 'statistics') {
                  return this.renderStatistics();
              }
              else if (type === 'switch-per-page') {
                  return this.renderSwitchPerPage(childProps);
              }
              else if (type === 'load-more') {
                  return this.renderLoadMore();
              }
              else if (type === 'filter-toggler') {
                  return this.renderFilterToggler();
              }
              else if (type === 'export-csv') {
                  return this.renderExportCSV();
              }
              else if (Array.isArray(toolbar)) {
                  const children = toolbar
                      .map((toolbar, index) => ({
                      dom: this.renderToolbar(toolbar, index, childProps, toolbarRenderer),
                      toolbar
                  }))
                      .filter(item => item.dom);
                  const len = children.length;
                  const cx = this.props.classnames;
                  if (len) {
                      return (react_1.default.createElement("div", { className: cx('Crud-toolbar'), key: index }, children.map(({ toolbar, dom: child }, index) => {
                          const type = toolbar.type || toolbar;
                          let align = toolbar.align ||
                              (type === 'pagination' || (index === len - 1 && index > 0)
                                  ? 'right'
                                  : index < len - 1
                                      ? 'left'
                                      : '');
                          return (react_1.default.createElement("div", { key: index, className: cx('Crud-toolbar-item', align ? `Crud-toolbar-item--${align}` : '', toolbar.className) }, child));
                      })));
                  }
                  return null;
              }
              const result = toolbarRenderer
                  ? toolbarRenderer(toolbar, index)
                  : undefined;
              if (result !== void 0) {
                  return result;
              }
              const { render, store } = this.props;
              const $$editable = childProps.$$editable;
              return render(`toolbar/${index}`, toolbar, {
                  // 包两层，主要是为了处理以下 case
                  // 里面放了个 form，form 提交过来的时候不希望把 items 这些发送过来。
                  // 因为会把数据呈现在地址栏上。
                  data: helper_1.createObject(helper_1.createObject(store.filterData, {
                      items: childProps.items,
                      selectedItems: childProps.selectedItems,
                      unSelectedItems: childProps.unSelectedItems
                  }), {}),
                  page: store.page,
                  lastPage: store.lastPage,
                  perPage: store.perPage,
                  total: store.total,
                  onQuery: this.handleQuery,
                  onAction: this.handleAction,
                  onChangePage: this.handleChangePage,
                  onBulkAction: this.handleBulkAction,
                  $$editable
              });
          }
          renderHeaderToolbar(childProps, toolbarRenderer) {
              let { toolbar, toolbarInline, headerToolbar } = this.props;
              if (toolbar) {
                  if (Array.isArray(headerToolbar)) {
                      headerToolbar = toolbarInline
                          ? headerToolbar.concat(toolbar)
                          : [headerToolbar, toolbar];
                  }
                  else if (headerToolbar) {
                      headerToolbar = [headerToolbar, toolbar];
                  }
                  else {
                      headerToolbar = toolbar;
                  }
              }
              return this.renderToolbar(headerToolbar || [], 0, childProps, toolbarRenderer);
          }
          renderFooterToolbar(childProps, toolbarRenderer) {
              let { toolbar, toolbarInline, footerToolbar } = this.props;
              if (toolbar) {
                  if (Array.isArray(footerToolbar)) {
                      footerToolbar = toolbarInline
                          ? footerToolbar.concat(toolbar)
                          : [footerToolbar, toolbar];
                  }
                  else if (footerToolbar) {
                      footerToolbar = [footerToolbar, toolbar];
                  }
                  else {
                      footerToolbar = toolbar;
                  }
              }
              return this.renderToolbar(footerToolbar, 0, childProps, toolbarRenderer);
          }
          renderSelection() {
              const { store, classnames: cx, labelField, labelTpl, primaryField, translate: __ } = this.props;
              if (!store.selectedItems.length) {
                  return null;
              }
              return (react_1.default.createElement("div", { className: cx('Crud-selection') },
                  react_1.default.createElement("div", { className: cx('Crud-selectionLabel') }, __('CRUD.selected')),
                  store.selectedItems.map((item, index) => (react_1.default.createElement("div", { key: index, className: cx(`Crud-value`) },
                      react_1.default.createElement("span", { "data-tooltip": __('delete'), "data-position": "bottom", className: cx('Crud-valueIcon'), onClick: this.unSelectItem.bind(this, item, index) }, "\u00D7"),
                      react_1.default.createElement("span", { className: cx('Crud-valueLabel') }, labelTpl ? (react_1.default.createElement(Html_1.default, { html: tpl_1.filter(labelTpl, item) })) : (helper_1.getVariable(item, labelField || 'label') ||
                          helper_1.getVariable(item, primaryField || 'id')))))),
                  react_1.default.createElement("a", { onClick: this.clearSelection, className: cx('Crud-selectionClear') }, __('clear'))));
          }
          render() {
              const _a = this.props, { className, bodyClassName, filter, render, store, mode, syncLocation, children, bulkActions, pickerMode, multiple, valueField, primaryField, value, hideQuickSaveBtn, itemActions, classnames: cx, keepItemSelectionOnPageChange, maxKeepItemSelectionLength, onAction, popOverContainer, translate: __, onQuery } = _a, rest = tslib_1.__rest(_a, ["className", "bodyClassName", "filter", "render", "store", "mode", "syncLocation", "children", "bulkActions", "pickerMode", "multiple", "valueField", "primaryField", "value", "hideQuickSaveBtn", "itemActions", "classnames", "keepItemSelectionOnPageChange", "maxKeepItemSelectionLength", "onAction", "popOverContainer", "translate", "onQuery"]);
              return (react_1.default.createElement("div", { className: cx('Crud', className, {
                      'is-loading': store.loading
                  }) },
                  filter && (!store.filterTogggable || store.filterVisible)
                      ? render('filter', Object.assign(Object.assign({ title: __('CRUD.filter'), mode: 'inline', submitText: __('search') }, filter), { type: 'form', api: null }), {
                          key: 'filter',
                          data: store.filterData,
                          onReset: this.handleFilterReset,
                          onSubmit: this.handleFilterSubmit,
                          onInit: this.handleFilterInit
                      })
                      : null,
                  keepItemSelectionOnPageChange && multiple !== false
                      ? this.renderSelection()
                      : null,
                  render('body', Object.assign(Object.assign({}, rest), { type: mode || 'table' }), {
                      key: 'body',
                      className: cx('Crud-body', bodyClassName),
                      ref: this.controlRef,
                      selectable: !!((this.hasBulkActionsToolbar() && this.hasBulkActions()) ||
                          pickerMode),
                      itemActions,
                      multiple: multiple === void 0
                          ? bulkActions && bulkActions.length > 0
                              ? true
                              : false
                          : multiple,
                      selected: pickerMode || keepItemSelectionOnPageChange
                          ? store.selectedItemsAsArray
                          : undefined,
                      keepItemSelectionOnPageChange,
                      maxKeepItemSelectionLength,
                      valueField: valueField || primaryField,
                      primaryField: primaryField,
                      hideQuickSaveBtn,
                      items: store.data.items,
                      query: store.query,
                      orderBy: store.query.orderBy,
                      orderDir: store.query.orderDir,
                      popOverContainer,
                      onAction: this.handleAction,
                      onSave: this.handleSave,
                      onSaveOrder: this.handleSaveOrder,
                      onQuery: this.handleQuery,
                      onSelect: this.handleSelect,
                      onPopOverOpened: this.handleChildPopOverOpen,
                      onPopOverClosed: this.handleChildPopOverClose,
                      headerToolbarRender: this.renderHeaderToolbar,
                      footerToolbarRender: this.renderFooterToolbar,
                      data: store.mergedData
                  }),
                  react_1.default.createElement(components_1.Spinner, { overlay: true, size: "lg", key: "info", show: store.loading }),
                  render('dialog', Object.assign(Object.assign({}, (store.action &&
                      store.action.dialog)), { type: 'dialog' }), {
                      key: 'dialog',
                      data: store.dialogData,
                      onConfirm: this.handleDialogConfirm,
                      onClose: this.handleDialogClose,
                      show: store.dialogOpen
                  })));
          }
      }
      CRUD.propsList = [
          'bulkActions',
          'itemActions',
          'mode',
          'orderField',
          'syncLocation',
          'toolbar',
          'toolbarInline',
          'messages',
          'value',
          'options',
          'multiple',
          'valueField',
          'defaultParams',
          'bodyClassName',
          'perPageAvailable',
          'pageField',
          'perPageField',
          'hideQuickSaveBtn',
          'autoJumpToTopOnPagerChange',
          'interval',
          'silentPolling',
          'stopAutoRefreshWhen',
          'stopAutoRefreshWhenModalIsOpen',
          'api',
          'affixHeader',
          'columnsTogglable',
          'placeholder',
          'tableClassName',
          'headerClassName',
          'footerClassName',
          // 'toolbarClassName',
          'headerToolbar',
          'footerToolbar',
          'filterTogglable',
          'filterDefaultVisible',
          'syncResponse2Query',
          'keepItemSelectionOnPageChange',
          'labelTpl',
          'labelField',
          'loadDataOnce',
          'loadDataOnceFetchOnFilter',
          'source',
          'header',
          'columns',
          'size',
          'onChange',
          'onInit',
          'onSaved',
          'onQuery'
      ];
      CRUD.defaultProps = {
          toolbarInline: true,
          headerToolbar: ['bulkActions', 'pagination'],
          footerToolbar: ['statistics', 'pagination'],
          primaryField: 'id',
          syncLocation: true,
          pageField: 'page',
          perPageField: 'perPage',
          hideQuickSaveBtn: false,
          autoJumpToTopOnPagerChange: true,
          silentPolling: false,
          filterTogglable: false,
          filterDefaultVisible: true,
          loadDataOnce: false,
          loadDataOnceFetchOnFilter: true
      };
      return CRUD;
  })();
  exports.default = CRUD;
  let CRUDRenderer = /** @class */ (() => {
      let CRUDRenderer = class CRUDRenderer extends CRUD {
          componentWillMount() {
              super.componentWillMount();
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              super.componentWillUnmount();
              const scoped = this.context;
              scoped.unRegisterComponent(this);
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
          closeTarget(target) {
              const scoped = this.context;
              scoped.close(target);
          }
      };
      CRUDRenderer.contextType = Scoped_1.ScopedContext;
      CRUDRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)crud$/,
              storeType: crud_1.CRUDStore.name,
              name: 'crud'
          })
      ], CRUDRenderer);
      return CRUDRenderer;
  })();
  exports.CRUDRenderer = CRUDRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1JVRC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvQ1JVRC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUcxQix3Q0FBbUQ7QUFTbkQsd0NBQW9EO0FBQ3BELDRDQVN5QjtBQUd6QixzQ0FBZ0U7QUFDaEUsMEVBQTBDO0FBQzFDLDBFQUEwQztBQUMxQyxtRkFBdUQ7QUFDdkQsK0RBQStCO0FBQy9CLG9EQUFvQjtBQUNwQix5Q0FBc0M7QUFDdEMsc0NBQW9EO0FBQ3BELHNDQUtzQjtBQUN0QiwrREFBK0I7QUFDL0IsK0RBQStCO0FBQy9CLHlFQUF5QztBQUN6QyxzRUFBc0M7QUFDdEMsOENBQXNDO0FBQ3RDLCtDQUF5QztBQXlSekM7SUFBQSxNQUFxQixJQUFLLFNBQVEsZUFBSyxDQUFDLFNBQXlCO1FBMEUvRCxZQUFZLEtBQWdCO1lBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUpmLGdCQUFXLEdBQVksS0FBSyxDQUFDO1lBTTNCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENB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

});
