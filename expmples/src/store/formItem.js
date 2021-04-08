amis.define('src/store/formItem.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FormItemStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const validations_1 = require("src/utils/validations.ts");
  const combo_1 = require("src/store/combo.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  const helper_1 = require("src/utils/helper.ts");
  const helper_2 = require("src/utils/helper.ts");
  const Select_1 = require("src/components/Select.tsx");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const SimpleMap_1 = require("src/utils/SimpleMap.ts");
  const node_1 = require("src/store/node.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const manager_1 = require("src/store/manager.ts");
  const ErrorDetail = mobx_state_tree_1.types.model('ErrorDetail', {
      msg: '',
      tag: ''
  });
  exports.FormItemStore = node_1.StoreNode.named('FormItemStore')
      .props({
      isFocused: false,
      type: '',
      unique: false,
      loading: false,
      required: false,
      tmpValue: mobx_state_tree_1.types.frozen(),
      rules: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      messages: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      errorData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(ErrorDetail), []),
      name: mobx_state_tree_1.types.string,
      itemId: '',
      unsetValueOnInvisible: false,
      itemsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
      validated: false,
      validating: false,
      multiple: false,
      delimiter: ',',
      valueField: 'value',
      labelField: 'label',
      joinValues: true,
      extractValue: false,
      options: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
      expressionsInOptions: false,
      selectFirst: false,
      autoFill: mobx_state_tree_1.types.frozen(),
      clearValueOnHidden: false,
      selectedOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
      filteredOptions: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), []),
      dialogSchema: mobx_state_tree_1.types.frozen(),
      dialogOpen: false,
      dialogData: mobx_state_tree_1.types.frozen(),
      resetValue: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), '')
  })
      .views(self => {
      function getForm() {
          return self.parentStore;
      }
      function getValue() {
          var _a;
          return (_a = getForm()) === null || _a === void 0 ? void 0 : _a.getValueByName(self.name);
      }
      function getLastOptionValue() {
          if (self.selectedOptions.length) {
              return self.selectedOptions[self.selectedOptions.length - 1].value;
          }
          return '';
      }
      function getErrors() {
          return self.errorData.map(item => item.msg);
      }
      return {
          get subFormItems() {
              return self.itemsRef.map(item => manager_1.getStoreById(item));
          },
          get form() {
              return getForm();
          },
          get value() {
              return getValue();
          },
          get prinstine() {
              return getForm().getPristineValueByName(self.name);
          },
          get errors() {
              return getErrors();
          },
          get valid() {
              const errors = getErrors();
              return !!(!errors || !errors.length);
          },
          get lastSelectValue() {
              return getLastOptionValue();
          },
          getSelectedOptions: (value = getValue()) => {
              if (typeof value === 'undefined') {
                  return [];
              }
              const valueArray = Array.isArray(value)
                  ? value
                  : typeof value === 'string'
                      ? value.split(self.delimiter || ',')
                      : [value];
              const selected = valueArray.map(item => item && item.hasOwnProperty(self.valueField || 'value')
                  ? item[self.valueField || 'value']
                  : item);
              const selectedOptions = [];
              selected.forEach((item, index) => {
                  const matched = helper_1.findTree(self.filteredOptions, Select_1.optionValueCompare(item, self.valueField || 'value'));
                  if (matched) {
                      selectedOptions.push(matched);
                  }
                  else {
                      let unMatched = (valueArray && valueArray[index]) || item;
                      if (unMatched &&
                          (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                          unMatched = {
                              [self.valueField || 'value']: item,
                              [self.labelField || 'label']: item,
                              __unmatched: true
                          };
                      }
                      else if (unMatched && self.extractValue) {
                          unMatched = {
                              [self.valueField || 'value']: item,
                              [self.labelField || 'label']: 'UnKnown',
                              __unmatched: true
                          };
                      }
                      unMatched && selectedOptions.push(unMatched);
                  }
              });
              return selectedOptions;
          }
      };
  })
      .actions(self => {
      const form = self.form;
      const dialogCallbacks = new SimpleMap_1.SimpleMap();
      function config({ required, unique, value, rules, messages, delimiter, multiple, valueField, labelField, joinValues, extractValue, type, id, selectFirst, autoFill, clearValueOnHidden }) {
          if (typeof rules === 'string') {
              rules = validations_1.str2rules(rules);
          }
          typeof type !== 'undefined' && (self.type = type);
          typeof id !== 'undefined' && (self.itemId = id);
          typeof messages !== 'undefined' && (self.messages = messages);
          typeof required !== 'undefined' && (self.required = !!required);
          typeof unique !== 'undefined' && (self.unique = !!unique);
          typeof multiple !== 'undefined' && (self.multiple = !!multiple);
          typeof selectFirst !== 'undefined' && (self.selectFirst = !!selectFirst);
          typeof autoFill !== 'undefined' && (self.autoFill = autoFill);
          typeof joinValues !== 'undefined' && (self.joinValues = !!joinValues);
          typeof extractValue !== 'undefined' &&
              (self.extractValue = !!extractValue);
          typeof delimiter !== 'undefined' &&
              (self.delimiter = delimiter || ',');
          typeof valueField !== 'undefined' &&
              (self.valueField = valueField || 'value');
          typeof labelField !== 'undefined' &&
              (self.labelField = labelField || 'label');
          typeof clearValueOnHidden !== 'undefined' &&
              (self.clearValueOnHidden = !!clearValueOnHidden);
          rules = rules || {};
          rules = Object.assign(Object.assign({}, rules), { isRequired: self.required });
          if (helper_1.isObjectShallowModified(rules, self.rules)) {
              self.rules = rules;
              clearError('bultin');
              self.validated = false;
          }
          if (value !== void 0 && self.value === void 0) {
              form.setValueByName(self.name, value, true);
              syncAutoFill(value, true);
          }
      }
      function focus() {
          self.isFocused = true;
      }
      function blur() {
          self.isFocused = false;
      }
      function changeValue(value, isPrintine = false) {
          if (typeof value === 'undefined' || value === '__undefined') {
              self.form.deleteValueByName(self.name);
          }
          else {
              self.form.setValueByName(self.name, value, isPrintine);
          }
          syncAutoFill(value, isPrintine);
      }
      const validate = mobx_state_tree_1.flow(function* validate(hook) {
          if (self.validating) {
              return self.valid;
          }
          self.validating = true;
          clearError();
          if (hook) {
              yield hook();
          }
          addError(validations_1.validate(self.value, self.form.data, self.rules, self.messages, self.__));
          self.validated = true;
          if (self.unique &&
              self.form.parentStore &&
              self.form.parentStore.storeType === 'ComboStore') {
              const combo = self.form.parentStore;
              const group = combo.uniques.get(self.name);
              if (group.items.some(item => item !== self && self.value && item.value === self.value)) {
                  addError(self.__('`当前值不唯一`'));
              }
          }
          self.validating = false;
          return self.valid;
      });
      function setError(msg, tag = 'bultin') {
          clearError();
          addError(msg, tag);
      }
      function addError(msg, tag = 'bultin') {
          const msgs = Array.isArray(msg) ? msg : [msg];
          msgs.forEach(item => self.errorData.push({
              msg: item,
              tag: tag
          }));
      }
      function clearError(tag) {
          if (tag) {
              const filtered = self.errorData.filter(item => item.tag !== tag);
              self.errorData.replace(filtered);
          }
          else {
              self.errorData.clear();
          }
      }
      function getFirstAvaibleOption(options) {
          if (!Array.isArray(options)) {
              return;
          }
          for (let option of options) {
              if (Array.isArray(option.children)) {
                  const childFirst = getFirstAvaibleOption(option.children);
                  if (childFirst !== undefined) {
                      return childFirst;
                  }
              }
              else if (option[self.valueField || 'value'] && !option.disabled) {
                  return option;
              }
          }
      }
      function setOptions(options, onChange) {
          if (!Array.isArray(options)) {
              return;
          }
          options = options.filter(item => item);
          const originOptions = self.options.concat();
          options.length ? self.options.replace(options) : self.options.clear();
          syncOptions(originOptions);
          let selectedOptions;
          if (self.selectFirst &&
              self.filteredOptions.length &&
              (selectedOptions = self.getSelectedOptions(self.value)) &&
              !selectedOptions.filter(item => !item.__unmatched).length) {
              const fistOption = getFirstAvaibleOption(self.filteredOptions);
              if (!fistOption) {
                  return;
              }
              const list = [fistOption].map((item) => {
                  if (self.extractValue || self.joinValues) {
                      return item[self.valueField || 'value'];
                  }
                  return item;
              });
              const value = self.joinValues && self.multiple
                  ? list.join(self.delimiter)
                  : self.multiple
                      ? list
                      : list[0];
              if (form.inited && onChange) {
                  onChange(value);
              }
              else {
                  changeValue(value, !form.inited);
              }
          }
          syncAutoFill(self.value, !form.inited);
      }
      let loadCancel = null;
      const fetchOptions = mobx_state_tree_1.flow(function* getInitData(api, data, config, setErrorFlag) {
          var _a;
          try {
              if (loadCancel) {
                  loadCancel();
                  loadCancel = null;
                  self.loading = false;
              }
              self.loading = true;
              const json = yield mobx_state_tree_1.getEnv(self).fetcher(api, data, Object.assign({ autoAppend: false, cancelExecutor: (executor) => (loadCancel = executor) }, config));
              loadCancel = null;
              let result = null;
              if (!json.ok) {
                  setErrorFlag !== false &&
                      setError(self.__('Form.loadOptionsFailed', {
                          reason: (_a = json.msg) !== null && _a !== void 0 ? _a : (config && config.errorMessage)
                      }));
                  mobx_state_tree_1.getEnv(self).notify('error', self.errors.join(''), json.msgTimeout !== undefined
                      ? {
                          closeButton: true,
                          timeout: json.msgTimeout
                      }
                      : undefined);
              }
              else {
                  result = json;
              }
              self.loading = false;
              return result;
          }
          catch (e) {
              const env = mobx_state_tree_1.getEnv(self);
              if (!mobx_state_tree_1.isAlive(self) || self.disposed) {
                  return;
              }
              self.loading = false;
              if (env.isCancel(e)) {
                  return;
              }
              console.error(e.stack);
              env.notify('error', e.message);
              return;
          }
      });
      const loadOptions = mobx_state_tree_1.flow(function* getInitData(api, data, config, clearValue, onChange, setErrorFlag) {
          var _a;
          let json = yield fetchOptions(api, data, config, setErrorFlag);
          if (!json) {
              return;
          }
          clearError();
          self.validated = false; // 拉完数据应该需要再校验一下
          let options = ((_a = json.data) === null || _a === void 0 ? void 0 : _a.options) ||
              json.data.items ||
              json.data.rows ||
              json.data ||
              [];
          options = Select_1.normalizeOptions(options);
          setOptions(options, onChange);
          if (json.data && typeof json.data.value !== 'undefined') {
              onChange && onChange(json.data.value, false, true);
          }
          else if (clearValue && !self.selectFirst) {
              self.selectedOptions.some((item) => item.__unmatched) &&
                  onChange &&
                  onChange('', false, true);
          }
          return json;
      });
      const deferLoadOptions = mobx_state_tree_1.flow(function* getInitData(option, api, data, config) {
          var _a;
          const indexes = helper_1.findTreeIndex(self.options, item => item === option);
          if (!indexes) {
              return;
          }
          setOptions(helper_1.spliceTree(self.options, indexes, 1, Object.assign(Object.assign({}, option), { loading: true })));
          let json = yield fetchOptions(api, data, config, false);
          if (!json) {
              setOptions(helper_1.spliceTree(self.options, indexes, 1, Object.assign(Object.assign({}, option), { loading: false, error: true })));
              return;
          }
          let options = ((_a = json.data) === null || _a === void 0 ? void 0 : _a.options) ||
              json.data.items ||
              json.data.rows ||
              json.data ||
              [];
          setOptions(helper_1.spliceTree(self.options, indexes, 1, Object.assign(Object.assign({}, option), { loading: false, loaded: true, children: options })));
          return json;
      });
      function syncOptions(originOptions) {
          if (!self.options.length && typeof self.value === 'undefined') {
              self.selectedOptions = [];
              self.filteredOptions = [];
              return;
          }
          const form = self.form;
          const value = self.value;
          // 有可能销毁了
          if (!form) {
              return;
          }
          const selected = Array.isArray(value)
              ? value.map(item => item && item.hasOwnProperty(self.valueField || 'value')
                  ? item[self.valueField || 'value']
                  : item)
              : typeof value === 'string'
                  ? value.split(self.delimiter || ',')
                  : value === void 0
                      ? []
                      : [
                          value && value.hasOwnProperty(self.valueField || 'value')
                              ? value[self.valueField || 'value']
                              : value
                      ];
          if (value && value.hasOwnProperty(self.labelField || 'label')) {
              selected[0] = {
                  [self.labelField || 'label']: value[self.labelField || 'label'],
                  [self.valueField || 'value']: value[self.valueField || 'value']
              };
          }
          let expressionsInOptions = false;
          let filteredOptions = self.options
              .filter((item) => {
              if (!expressionsInOptions && (item.visibleOn || item.hiddenOn)) {
                  expressionsInOptions = true;
              }
              return item.visibleOn
                  ? tpl_1.evalExpression(item.visibleOn, form.data) !== false
                  : item.hiddenOn
                      ? tpl_1.evalExpression(item.hiddenOn, form.data) !== true
                      : item.visible !== false || item.hidden !== true;
          })
              .map((item, index) => {
              const disabled = tpl_1.evalExpression(item.disabledOn, form.data);
              const newItem = item.disabledOn
                  ? self.filteredOptions.length > index &&
                      self.filteredOptions[index].disabled === disabled
                      ? self.filteredOptions[index]
                      : Object.assign(Object.assign({}, item), { disabled: disabled })
                  : item;
              return newItem;
          });
          self.expressionsInOptions = expressionsInOptions;
          const flattened = helper_2.flattenTree(filteredOptions);
          const selectedOptions = [];
          selected.forEach((item, index) => {
              let idx = findIndex_1.default(flattened, Select_1.optionValueCompare(item, self.valueField || 'value'));
              if (~idx) {
                  selectedOptions.push(flattened[idx]);
              }
              else {
                  let unMatched = (value && value[index]) || item;
                  if (unMatched &&
                      (typeof unMatched === 'string' || typeof unMatched === 'number')) {
                      unMatched = {
                          [self.valueField || 'value']: item,
                          [self.labelField || 'label']: item,
                          __unmatched: true
                      };
                      const orgin = originOptions &&
                          find_1.default(originOptions, Select_1.optionValueCompare(item, self.valueField || 'value'));
                      if (orgin) {
                          unMatched[self.labelField || 'label'] =
                              orgin[self.labelField || 'label'];
                      }
                  }
                  else if (unMatched && self.extractValue) {
                      unMatched = {
                          [self.valueField || 'value']: item,
                          [self.labelField || 'label']: 'UnKnown',
                          __unmatched: true
                      };
                  }
                  unMatched && selectedOptions.push(unMatched);
              }
          });
          let parentStore = form.parentStore;
          if (parentStore && parentStore.storeType === combo_1.ComboStore.name) {
              let combo = parentStore;
              let group = combo.uniques.get(self.name);
              let options = [];
              group &&
                  group.items.forEach(item => {
                      if (self !== item) {
                          options.push(...item.selectedOptions.map((item) => item && item.value));
                      }
                  });
              if (filteredOptions.length) {
                  filteredOptions = filteredOptions.filter(option => !~options.indexOf(option.value));
              }
          }
          helper_1.isArrayChildrenModified(self.selectedOptions, selectedOptions) &&
              (self.selectedOptions = selectedOptions);
          helper_1.isArrayChildrenModified(self.filteredOptions, filteredOptions) &&
              (self.filteredOptions = filteredOptions);
      }
      function setLoading(value) {
          self.loading = value;
      }
      let subStore;
      function getSubStore() {
          return subStore;
      }
      function setSubStore(store) {
          subStore = store;
      }
      function reset() {
          self.validated = false;
          if (subStore && subStore.storeType === 'ComboStore') {
              const combo = subStore;
              combo.forms.forEach(form => form.reset());
          }
          clearError();
      }
      function openDialog(schema, data = form.data, callback) {
          self.dialogSchema = schema;
          self.dialogData = data;
          self.dialogOpen = true;
          callback && dialogCallbacks.set(self.dialogData, callback);
      }
      function closeDialog(result) {
          const callback = dialogCallbacks.get(self.dialogData);
          self.dialogOpen = false;
          if (callback) {
              dialogCallbacks.delete(self.dialogData);
              setTimeout(() => callback(result), 200);
          }
      }
      function syncAutoFill(value = self.value, isPrintine = false) {
          if (!self.multiple &&
              self.autoFill &&
              !helper_1.isEmpty(self.autoFill) &&
              self.options.length) {
              const selectedOptions = self.getSelectedOptions(value);
              if (selectedOptions.length !== 1) {
                  return;
              }
              const toSync = tpl_builtin_1.dataMapping(self.autoFill, helper_1.createObject({
                  ancestors: helper_1.getTreeAncestors(self.filteredOptions, selectedOptions[0], true)
              }, selectedOptions[0]));
              Object.keys(toSync).forEach(key => {
                  const value = toSync[key];
                  if (typeof value === 'undefined' || value === '__undefined') {
                      self.form.deleteValueByName(key);
                  }
                  else {
                      self.form.setValueByName(key, value, isPrintine);
                  }
              });
          }
      }
      function changeTmpValue(value) {
          self.tmpValue = value;
      }
      function addSubFormItem(item) {
          self.itemsRef.push(item.id);
      }
      function removeSubFormItem(item) {
          const idx = self.itemsRef.findIndex(a => a === item.id);
          if (~idx) {
              self.itemsRef.splice(idx, 1);
          }
      }
      return {
          focus,
          blur,
          config,
          changeValue,
          validate,
          setError,
          addError,
          clearError,
          setOptions,
          loadOptions,
          deferLoadOptions,
          syncOptions,
          setLoading,
          setSubStore,
          getSubStore,
          reset,
          openDialog,
          closeDialog,
          syncAutoFill,
          changeTmpValue,
          addSubFormItem,
          removeSubFormItem
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybUl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvc3RvcmUvZm9ybUl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQVV5QjtBQUV6QixzREFBdUU7QUFFdkUsbUNBQThEO0FBQzlELHNDQUE0QztBQUM1Qyx5RUFBeUM7QUFDekMsNENBVXlCO0FBQ3pCLDRDQUE0QztBQUU1QyxpREFBMEU7QUFDMUUsK0RBQStCO0FBQy9CLGtEQUE2QztBQUc3QyxpQ0FBaUM7QUFDakMsc0RBQWlEO0FBQ2pELHVDQUF1QztBQVd2QyxNQUFNLFdBQVcsR0FBRyx1QkFBSyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUU7SUFDN0MsR0FBRyxFQUFFLEVBQUU7SUFDUCxHQUFHLEVBQUUsRUFBRTtDQUNSLENBQUMsQ0FBQztBQUVVLFFBQUEsYUFBYSxHQUFHLGdCQUFTLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztLQUMxRCxLQUFLLENBQUM7SUFDTCxTQUFTLEVBQUUsS0FBSztJQUNoQixJQUFJLEVBQUUsRUFBRTtJQUNSLE1BQU0sRUFBRSxLQUFLO0lBQ2IsT0FBTyxFQUFFLEtBQUs7SUFDZCxRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRSx1QkFBSyxDQUFDLE1BQU0sRUFBRTtJQUN4QixLQUFLLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDekMsUUFBUSxFQUFFLHVCQUFLLENBQUMsUUFBUSxDQUFDLHVCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQzVDLFNBQVMsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLENBQUM7SUFDdkQsSUFBSSxFQUFFLHVCQUFLLENBQUMsTUFBTTtJ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

});
