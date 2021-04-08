amis.define('src/store/form.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.IFormItemStore = exports.FormStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const service_1 = require("src/store/service.ts");
  const formItem_1 = require("src/store/formItem.ts");
  Object.defineProperty(exports, "IFormItemStore", { enumerable: true, get: function () { return formItem_1.IFormItemStore; } });
  const errors_1 = require("src/utils/errors.ts");
  const helper_1 = require("src/utils/helper.ts");
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const flatten_1 = tslib_1.__importDefault(require("node_modules/lodash/flatten"));
  const manager_1 = require("src/store/manager.ts");
  exports.FormStore = service_1.ServiceStore.named('FormStore')
      .props({
      inited: false,
      validated: false,
      submited: false,
      submiting: false,
      validating: false,
      savedData: mobx_state_tree_1.types.frozen(),
      // items: types.optional(types.array(types.late(() => FormItemStore)), []),
      itemsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
      canAccessSuperData: true,
      persistData: false,
      restError: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []) // 没有映射到表达项上的 errors
  })
      .views(self => {
      function getItems() {
          return self.itemsRef.map(item => manager_1.getStoreById(item));
      }
      return {
          get loading() {
              return self.saving || self.fetching;
          },
          get items() {
              return getItems();
          },
          get errors() {
              let errors = {};
              getItems().forEach(item => {
                  if (!item.valid) {
                      errors[item.name] = Array.isArray(errors[item.name])
                          ? errors[item.name].concat(item.errors)
                          : item.errors.concat();
                  }
              });
              return errors;
          },
          getValueByName(name) {
              return helper_1.getVariable(self.data, name, self.canAccessSuperData);
          },
          getPristineValueByName(name) {
              return helper_1.getVariable(self.pristine, name);
          },
          getItemById(id) {
              return getItems().find(item => item.itemId === id);
          },
          getItemByName(name) {
              return getItems().find(item => item.name === name);
          },
          getItemsByName(name) {
              return getItems().filter(item => item.name === name);
          },
          get valid() {
              return (getItems().every(item => item.valid) &&
                  (!self.restError || !self.restError.length));
          },
          get isPristine() {
              return isEqual_1.default(self.pristine, self.data);
          },
          get modified() {
              if (self.savedData) {
                  return self.savedData !== self.data;
              }
              return !this.isPristine;
          }
      };
  })
      .actions(self => {
      function setValues(values, tag, replace) {
          self.updateData(values, tag, replace);
          // 如果数据域中有数据变化，就都reset一下，去掉之前残留的验证消息
          self.items.forEach(item => item.reset());
          // 同步 options
          syncOptions();
      }
      function setValueByName(name, value, isPristine = false, force = false) {
          // 没有变化就不跑了。
          const origin = helper_1.getVariable(self.data, name, false);
          const prev = self.data;
          const data = helper_1.cloneObject(self.data);
          if (value !== origin) {
              if (prev.__prev) {
                  // 基于之前的 __prev 改
                  const prevData = helper_1.cloneObject(prev.__prev);
                  helper_1.setVariable(prevData, name, origin);
                  Object.defineProperty(data, '__prev', {
                      value: prevData,
                      enumerable: false,
                      configurable: false,
                      writable: false
                  });
              }
              else {
                  Object.defineProperty(data, '__prev', {
                      value: Object.assign({}, prev),
                      enumerable: false,
                      configurable: false,
                      writable: false
                  });
              }
          }
          else if (!force) {
              return;
          }
          helper_1.setVariable(data, name, value);
          if (isPristine) {
              const pristine = helper_1.cloneObject(self.pristine);
              helper_1.setVariable(pristine, name, value);
              self.pristine = pristine;
          }
          if (!data.__pristine) {
              Object.defineProperty(data, '__pristine', {
                  value: self.pristine,
                  enumerable: false,
                  configurable: false,
                  writable: false
              });
          }
          self.data = data;
          if (self.persistData) {
              setPersistData();
          }
          // 同步 options
          syncOptions();
      }
      function deleteValueByName(name) {
          const prev = self.data;
          const data = helper_1.cloneObject(self.data);
          if (prev.__prev) {
              // 基于之前的 __prev 改
              const prevData = helper_1.cloneObject(prev.__prev);
              helper_1.setVariable(prevData, name, helper_1.getVariable(prev, name));
              Object.defineProperty(data, '__prev', {
                  value: prevData,
                  enumerable: false,
                  configurable: false,
                  writable: false
              });
          }
          else {
              Object.defineProperty(data, '__prev', {
                  value: Object.assign({}, prev),
                  enumerable: false,
                  configurable: false,
                  writable: false
              });
          }
          helper_1.deleteVariable(data, name);
          self.data = data;
      }
      function trimValues() {
          let data = helper_1.mapObject(self.data, (item) => typeof item === 'string' ? item.trim() : item);
          self.updateData(data);
      }
      const syncOptions = debounce_1.default(() => self.items.forEach(item => item.syncOptions()), 250, {
          trailing: true,
          leading: false
      });
      function setRestError(errors) {
          self.restError.replace(errors);
      }
      function addRestError(msg) {
          const msgs = Array.isArray(msg) ? msg : [msg];
          msgs.forEach(msg => {
              self.restError.push(msg);
          });
      }
      function clearRestError() {
          setRestError([]);
      }
      const saveRemote = mobx_state_tree_1.flow(function* saveRemote(api, data, options = {}) {
          var _a, _b, _c, _d;
          clearRestError();
          try {
              options = Object.assign({ method: 'post' }, options);
              if (options && options.beforeSend) {
                  let ret = options.beforeSend(data);
                  if (ret && ret.then) {
                      ret = yield ret;
                  }
                  if (ret === false) {
                      return;
                  }
              }
              self.markSaving(true);
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, options);
              // 失败也同样修改数据，如果有数据的话。
              if (!helper_1.isEmpty(json.data) || json.ok) {
                  self.updatedAt = Date.now();
                  setValues(json.data, json.ok
                      ? {
                          __saved: Date.now()
                      }
                      : undefined, !!api.replaceData);
              }
              if (!json.ok) {
                  // 验证错误
                  if (json.status === 422 && json.errors) {
                      handleRemoteError(json.errors);
                      self.updateMessage((_b = (_a = json.msg) !== null && _a !== void 0 ? _a : self.__(options && options.errorMessage)) !== null && _b !== void 0 ? _b : self.__('Form.validateFailed'), true);
                  }
                  else {
                      self.updateMessage((_c = json.msg) !== null && _c !== void 0 ? _c : self.__(options && options.errorMessage), true);
                  }
                  throw new errors_1.ServerError(self.msg, json);
              }
              else {
                  updateSavedData();
                  if (options && options.onSuccess) {
                      const ret = options.onSuccess(json);
                      if (ret && ret.then) {
                          yield ret;
                      }
                  }
                  self.markSaving(false);
                  self.updateMessage((_d = json.msg) !== null && _d !== void 0 ? _d : self.__(options && options.successMessage));
                  self.msg &&
                      mobx_state_tree_1.getEnv(self).notify('success', self.msg, json.msgTimeout !== undefined
                          ? {
                              closeButton: true,
                              timeout: json.msgTimeout
                          }
                          : undefined);
                  return json.data;
              }
          }
          catch (e) {
              self.markSaving(false);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
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
      function handleRemoteError(errors) {
          Object.keys(errors).forEach((key) => {
              const item = self.getItemById(key);
              const items = self.getItemsByName(key);
              if (item) {
                  item.setError(errors[key]);
                  delete errors[key];
              }
              else if (items.length) {
                  // 通过 name 直接找到的
                  items.forEach(item => item.setError(errors[key]));
                  delete errors[key];
              }
              else {
                  // 尝试通过path寻找
                  const items = getItemsByPath(key);
                  if (Array.isArray(items) && items.length) {
                      items.forEach(item => item.setError(`${errors[key]}`));
                      delete errors[key];
                  }
              }
          });
          // 没有映射上的error信息加在msg后显示出来
          !helper_1.isEmpty(errors) &&
              setRestError(Object.keys(errors).map(key => String(errors[key])));
      }
      const getItemsByPath = (key) => {
          const paths = helper_1.keyToPath(key);
          const len = paths.length;
          return paths.reduce((stores, path, idx) => {
              if (Array.isArray(stores) && stores.every(s => s.getItemsByName)) {
                  const items = flatten_1.default(stores.map(s => s.getItemsByName(path))).filter(i => i);
                  const subStores = items
                      .map(item => { var _a; return (_a = item === null || item === void 0 ? void 0 : item.getSubStore) === null || _a === void 0 ? void 0 : _a.call(item); })
                      .filter(i => i);
                  return subStores.length && idx < len - 1 ? subStores : items;
              }
              return null;
          }, [self]);
      };
      const submit = mobx_state_tree_1.flow(function* submit(fn, hooks, failedMessage) {
          self.submited = true;
          self.submiting = true;
          try {
              let valid = yield validate(hooks);
              if (!valid) {
                  const msg = failedMessage !== null && failedMessage !== void 0 ? failedMessage : self.__('Form.validateFailed');
                  msg && mobx_state_tree_1.getEnv(self).notify('error', msg);
                  throw new Error(self.__('Form.validateFailed'));
              }
              if (fn) {
                  const diff = helper_1.difference(self.data, self.pristine);
                  const result = yield fn(helper_1.createObject(helper_1.createObject(self.data.__super, {
                      diff: diff,
                      __diff: diff,
                      pristine: self.pristine
                  }), self.data));
                  return result !== null && result !== void 0 ? result : self.data;
              }
              return self.data;
          }
          finally {
              self.submiting = false;
          }
      });
      const validate = mobx_state_tree_1.flow(function* validate(hooks, forceValidate) {
          self.validating = true;
          self.validated = true;
          const items = self.items.concat();
          for (let i = 0, len = items.length; i < len; i++) {
              let item = items[i];
              // 验证过，或者是 unique 的表单项，或者强制验证
              if (!item.validated || item.unique || forceValidate) {
                  yield item.validate();
              }
          }
          if (hooks && hooks.length) {
              for (let i = 0, len = hooks.length; i < len; i++) {
                  yield hooks[i]();
              }
          }
          self.validating = false;
          return self.valid;
      });
      const validateFields = mobx_state_tree_1.flow(function* validateFields(fields) {
          self.validating = true;
          const items = self.items.concat();
          let result = [];
          for (let i = 0, len = items.length; i < len; i++) {
              let item = items[i];
              if (~fields.indexOf(item.name)) {
                  result.push(yield item.validate());
              }
          }
          self.validating = false;
          return result.every(item => item);
      });
      function clearErrors() {
          const items = self.items.concat();
          items.forEach(item => item.reset());
      }
      function reset(cb, resetData = true) {
          if (resetData) {
              self.data = self.pristine;
          }
          // 值可能变了，重新验证一次。
          self.validated = false;
          self.submited = false;
          self.items.forEach(item => item.reset());
          cb && cb(self.data);
      }
      function clear(cb) {
          const toClear = {};
          self.items.forEach(item => {
              if (item.name && item.type !== 'hidden') {
                  toClear[item.name] = item.resetValue;
              }
          });
          setValues(toClear);
          self.validated = false;
          self.submited = false;
          self.items.forEach(item => item.reset());
          cb && cb(self.data);
      }
      function addFormItem(item) {
          self.itemsRef.push(item.id);
          // 默认值可能在原型上，把他挪到当前对象上。
          setValueByName(item.name, item.value, false, false);
      }
      function removeFormItem(item) {
          item.clearValueOnHidden && deleteValueByName(item.name);
          manager_1.removeStore(item);
      }
      function setCanAccessSuperData(value = true) {
          self.canAccessSuperData = value;
      }
      function setInited(value) {
          self.inited = value;
      }
      const setPersistData = debounce_1.default(() => localStorage.setItem(location.pathname + self.path, JSON.stringify(self.data)), 250, {
          trailing: true,
          leading: false
      });
      function getPersistData() {
          self.persistData = true;
          let data = localStorage.getItem(location.pathname + self.path);
          if (data) {
              self.updateData(JSON.parse(data));
          }
      }
      function clearPersistData() {
          localStorage.removeItem(location.pathname + self.path);
      }
      function onChildStoreDispose(child) {
          if (child.storeType === formItem_1.FormItemStore.name) {
              const itemsRef = self.itemsRef.filter(id => id !== child.id);
              self.itemsRef.replace(itemsRef);
          }
          self.removeChildId(child.id);
      }
      function updateSavedData() {
          self.savedData = self.data;
      }
      return {
          setInited,
          setValues,
          setValueByName,
          trimValues,
          submit,
          validate,
          validateFields,
          clearErrors,
          saveRemote,
          reset,
          addFormItem,
          removeFormItem,
          syncOptions,
          setCanAccessSuperData,
          deleteValueByName,
          getPersistData,
          setPersistData,
          clearPersistData,
          clear,
          onChildStoreDispose,
          updateSavedData,
          handleRemoteError,
          getItemsByPath,
          setRestError,
          addRestError,
          clearRestError,
          beforeDestroy() {
              syncOptions.cancel();
              setPersistData.cancel();
          }
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxREFTeUI7QUFDekIsdUVBQXVDO0FBQ3ZDLHVDQUF1QztBQUN2Qyx5Q0FBeUU7QUFvbUJqRSwrRkFwbUJlLHlCQUFjLE9Bb21CZjtBQWxtQnRCLDRDQUE0QztBQUM1Qyw0Q0FXeUI7QUFDekIscUVBQXFDO0FBQ3JDLHFFQUFxQztBQUNyQyx1Q0FBb0Q7QUFFdkMsUUFBQSxTQUFTLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0tBQ3JELEtBQUssQ0FBQztJQUNMLE1BQU0sRUFBRSxLQUFLO0lBQ2IsU0FBUyxFQUFFLEtBQUs7SUFDaEIsUUFBUSxFQUFFLEtBQUs7SUFDZixTQUFTLEVBQUUsS0FBSztJQUNoQixVQUFVLEVBQUUsS0FBSztJQUNqQixTQUFTLEVBQUUsdUJBQUssQ0FBQyxNQUFNLEVBQUU7SUFDekIsMkVBQTJFO0lBQzNFLFFBQVEsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLEtBQUssQ0FBQyx1QkFBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQztJQUN2RCxrQkFBa0IsRUFBRSxJQUFJO0lBQ3hCLFdBQVcsRUFBRSxLQUFLO0lBQ2xCLFNBQVMsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLEtBQUssQ0FBQyx1QkFBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLG9CQUFvQjtDQUM5RSxDQUFDO0tBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ1osU0FBUyxRQUFRO1FBQ2YsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLHNCQUFZLENBQUMsSUFBSSxDQUFtQixD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

});
