amis.define('src/store/service.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ServiceStore = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  const helper_1 = require("src/utils/helper.ts");
  const errors_1 = require("src/utils/errors.ts");
  exports.ServiceStore = iRenderer_1.iRendererStore
      .named('ServiceStore')
      .props({
      msg: '',
      error: false,
      fetching: false,
      saving: false,
      busying: false,
      checking: false,
      initializing: false,
      schema: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), null),
      schemaKey: ''
  })
      .views(self => ({
      get loading() {
          return self.fetching || self.saving || self.busying || self.initializing;
      }
  }))
      .actions(self => {
      let fetchCancel;
      let fetchSchemaCancel;
      function markFetching(fetching = true) {
          self.fetching = fetching;
      }
      function markSaving(saving = true) {
          self.saving = saving;
      }
      function markBusying(busying = true) {
          self.busying = busying;
      }
      function reInitData(data, replace = false) {
          const newData = helper_1.extendObject(self.pristine, data, !replace);
          self.data = self.pristine = newData;
      }
      function updateMessage(msg, error = false) {
          self.msg = (msg && String(msg)) || '';
          self.error = error;
      }
      function clearMessage() {
          updateMessage('');
      }
      const fetchInitData = mobx_state_tree_1.flow(function* getInitData(api, data, options) {
          var _a, _b;
          try {
              if (fetchCancel) {
                  fetchCancel();
                  fetchCancel = null;
                  self.fetching = false;
              }
              if (self.fetching) {
                  return;
              }
              (options && options.silent) || markFetching(true);
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, Object.assign(Object.assign({}, options), { cancelExecutor: (executor) => (fetchCancel = executor) }));
              fetchCancel = null;
              if (!json.ok) {
                  updateMessage((_a = json.msg) !== null && _a !== void 0 ? _a : (options && options.errorMessage), true);
                  mobx_state_tree_1.getEnv(self).notify('error', json.msg, json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
              }
              else {
                  self.updatedAt = Date.now();
                  let replace = !!api.replaceData;
                  let data = Object.assign(Object.assign({}, (replace ? {} : self.data)), json.data);
                  reInitData(data, replace);
                  self.hasRemoteData = true;
                  if (options && options.onSuccess) {
                      const ret = options.onSuccess(json);
                      if (ret && ret.then) {
                          yield ret;
                      }
                  }
                  updateMessage((_b = json.msg) !== null && _b !== void 0 ? _b : (options && options.successMessage));
                  // 配置了获取成功提示后提示，默认是空不会提示。
                  options &&
                      options.successMessage &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg);
              }
              markFetching(false);
              return json;
          }
          catch (e) {
              const env = mobx_state_tree_1.getEnv(self);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              if (env.isCancel(e)) {
                  return;
              }
              markFetching(false);
              e.stack && console.error(e.stack);
              let message = e.message || e;
              if (e && e.message === 'Network Error') {
                  message = self.__('networkError');
              }
              env.notify('error', message);
              return;
          }
      });
      const fetchWSData = (ws, afterDataFetch) => {
          const env = mobx_state_tree_1.getEnv(self);
          env.wsFetcher(ws, (data) => {
              self.updateData(data, undefined, false);
              setHasRemoteData();
              // 因为 WebSocket 只会获取纯数据，所以没有 msg 之类的
              afterDataFetch({ ok: true, data: data });
          }, (error) => {
              updateMessage(error, true);
              env.notify('error', error);
          });
      };
      const setHasRemoteData = () => {
          self.hasRemoteData = true;
      };
      const fetchData = mobx_state_tree_1.flow(function* getInitData(api, data, options) {
          var _a, _b;
          try {
              if (fetchCancel) {
                  fetchCancel();
                  fetchCancel = null;
                  self.fetching = false;
              }
              if (self.fetching) {
                  return;
              }
              (options && options.silent) || markFetching(true);
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, Object.assign(Object.assign({}, options), { cancelExecutor: (executor) => (fetchCancel = executor) }));
              fetchCancel = null;
              if (!helper_1.isEmpty(json.data) || json.ok) {
                  self.updatedAt = Date.now();
                  json.data &&
                      self.updateData(json.data, undefined, !!api.replaceData);
                  self.hasRemoteData = true;
              }
              if (!json.ok) {
                  updateMessage((_a = json.msg) !== null && _a !== void 0 ? _a : (options && options.errorMessage), true);
                  mobx_state_tree_1.getEnv(self).notify('error', self.msg, json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
              }
              else {
                  if (options && options.onSuccess) {
                      const ret = options.onSuccess(json);
                      if (ret && ret.then) {
                          yield ret;
                      }
                  }
                  updateMessage((_b = json.msg) !== null && _b !== void 0 ? _b : (options && options.successMessage));
                  // 配置了获取成功提示后提示，默认是空不会提示。
                  options &&
                      options.successMessage &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg);
              }
              markFetching(false);
              return json;
          }
          catch (e) {
              const env = mobx_state_tree_1.getEnv(self);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              if (env.isCancel(e)) {
                  return;
              }
              markFetching(false);
              e.stack && console.error(e.stack);
              let message = e.message || e;
              if (e && e.message === 'Network Error') {
                  message = self.__('networkError');
              }
              env.notify('error', message);
              return;
          }
      });
      const saveRemote = mobx_state_tree_1.flow(function* saveRemote(api, data, options = {}) {
          var _a, _b, _c;
          try {
              options = Object.assign({ method: 'post' }, options);
              if (self.saving) {
                  return;
              }
              markSaving(true);
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, options);
              if (!helper_1.isEmpty(json.data) || json.ok) {
                  self.updatedAt = Date.now();
                  json.data &&
                      self.updateData(json.data, undefined, !!api.replaceData);
              }
              if (!json.ok) {
                  if (options && options.onFailed) {
                      const ret = options.onFailed(json);
                      if (ret && ret.then) {
                          yield ret;
                      }
                  }
                  updateMessage((_b = (_a = json.msg) !== null && _a !== void 0 ? _a : (options && options.errorMessage)) !== null && _b !== void 0 ? _b : self.__('saveFailed'), true);
                  throw new errors_1.ServerError(self.msg, json);
              }
              else {
                  if (options && options.onSuccess) {
                      const ret = options.onSuccess(json);
                      if (ret && ret.then) {
                          yield ret;
                      }
                  }
                  updateMessage((_c = json.msg) !== null && _c !== void 0 ? _c : (options && options.successMessage));
                  self.msg &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg, json.msgTimeout !== undefined
                          ? {
                              closeButton: true,
                              timeout: json.msgTimeout
                          }
                          : undefined);
              }
              markSaving(false);
              return json.data;
          }
          catch (e) {
              self.saving = false;
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              // console.log(e.stack);
              if (e.type === 'ServerError') {
                  const result = e.response;
                  mobx_state_tree_1.getEnv(self).notify('error', e.message, result.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: result.msgTimeout
                      }
                      : undefined);
              }
              else {
                  mobx_state_tree_1.getEnv(self).notify('error', e.message);
              }
              throw e;
          }
      });
      const fetchSchema = mobx_state_tree_1.flow(function* fetchSchema(api, data, options = {}) {
          var _a, _b, _c;
          try {
              options = Object.assign(Object.assign({ method: 'post' }, options), { cancelExecutor: (executor) => (fetchSchemaCancel = executor) });
              if (fetchSchemaCancel) {
                  fetchSchemaCancel();
                  fetchSchemaCancel = null;
                  self.initializing = false;
              }
              if (self.initializing) {
                  return;
              }
              self.initializing = true;
              if (typeof api === 'string') {
                  api += (~api.indexOf('?') ? '&' : '?') + '_replace=1';
              }
              else {
                  api = Object.assign(Object.assign({}, api), { url: api.url +
                          (~api.url.indexOf('?') ? '&' : '?') +
                          '_replace=1' });
              }
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, options);
              fetchSchemaCancel = null;
              if (!json.ok) {
                  updateMessage((_b = (_a = json.msg) !== null && _a !== void 0 ? _a : (options && options.errorMessage)) !== null && _b !== void 0 ? _b : self.__('fetchFailed'), true);
                  mobx_state_tree_1.getEnv(self).notify('error', self.msg, json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
              }
              else {
                  if (json.data) {
                      self.schema = json.data;
                      self.schemaKey = '' + Date.now();
                      helper_1.isObject(json.data.data) &&
                          self.updateData(json.data.data, undefined, !!api.replaceData);
                  }
                  updateMessage((_c = json.msg) !== null && _c !== void 0 ? _c : (options && options.successMessage));
                  // 配置了获取成功提示后提示，默认是空不会提示。
                  options &&
                      options.successMessage &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg);
              }
              self.initializing = false;
              return json.data;
          }
          catch (e) {
              const env = mobx_state_tree_1.getEnv(self);
              self.initializing = false;
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              if (env.isCancel(e)) {
                  return;
              }
              e.stack && console.error(e.stack);
              let message = e.message || e;
              if (e && e.message === 'Network Error') {
                  message = self.__('networkError');
              }
              env.notify('error', message);
          }
      });
      const checkRemote = mobx_state_tree_1.flow(function* checkRemote(api, data, options) {
          if (self.checking) {
              return;
          }
          try {
              self.checking = true;
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, options);
              json.ok &&
                  self.updateData(json.data, undefined, !!api.replaceData);
              if (!json.ok) {
                  throw new Error(json.msg);
              }
              return json.data;
          }
          finally {
              self.checking = false;
          }
      });
      return {
          markFetching,
          markSaving,
          markBusying,
          fetchInitData,
          fetchData,
          fetchWSData,
          reInitData,
          updateMessage,
          clearMessage,
          setHasRemoteData,
          saveRemote,
          fetchSchema,
          checkRemote
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUF1RTtBQUN2RSwyQ0FBMkM7QUFFM0MsNENBQWdFO0FBQ2hFLDRDQUE0QztBQUUvQixRQUFBLFlBQVksR0FBRywwQkFBYztLQUN2QyxLQUFLLENBQUMsY0FBYyxDQUFDO0tBQ3JCLEtBQUssQ0FBQztJQUNMLEdBQUcsRUFBRSxFQUFFO0lBQ1AsS0FBSyxFQUFFLEtBQUs7SUFDWixRQUFRLEVBQUUsS0FBSztJQUNmLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLEtBQUs7SUFDZCxRQUFRLEVBQUUsS0FBSztJQUNmLFlBQVksRUFBRSxLQUFLO0lBQ25CLE1BQU0sRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLElBQUksQ0FBQztJQUM1QyxTQUFTLEVBQUUsRUFBRTtDQUNkLENBQUM7S0FDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsSUFBSSxPQUFPO1FBQ1QsT0FBTyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDO0lBQzNFLENBQUM7Q0FDRixDQUFDLENBQUM7S0FDRixPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDZCxJQUFJLFdBQTRCLENBQUM7SUFDakMsSUFBSSxpQkFBa0MsQ0FBQztJQUV2QyxTQUFTLFlBQVksQ0FBQyxRQUFRLEdBQUcsSUFBSTtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBRUQsU0FBUyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUk7UUFDL0IsSUFBSSxDQUFDLE1B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

});
