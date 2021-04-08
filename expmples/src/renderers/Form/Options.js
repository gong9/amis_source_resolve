amis.define('src/renderers/Form/Options.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.highlight = exports.OptionsControl = exports.registerOptionsControl = exports.detectProps = exports.Option = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const api_1 = require("src/utils/api.ts");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const helper_1 = require("src/utils/helper.ts");
  const mobx_1 = require("node_modules/mobx/lib/index");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const Select_1 = require("src/components/Select.tsx");
  Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return Select_1.Option; } });
  const tpl_1 = require("src/utils/tpl.ts");
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  exports.detectProps = Item_1.detectProps.concat([
      'options',
      'size',
      'buttons',
      'columnsCount',
      'multiple',
      'hideRoot',
      'checkAll',
      'showIcon',
      'showRadio',
      'btnDisabled',
      'joinValues',
      'extractValue'
  ]);
  function registerOptionsControl(config) {
      const Control = config.component;
      let FormOptionsItem = /** @class */ (() => {
          var _a, _b, _c, _d;
          class FormOptionsItem extends react_1.default.Component {
              componentWillMount() {
                  const { initFetch, formItem, source, data, setPrinstineValue, defaultValue, multiple, joinValues, extractValue, addHook, formInited, valueField, options, value, onChange } = this.props;
                  if (formItem) {
                      formItem.setOptions(Select_1.normalizeOptions(options), onChange);
                      this.reaction = mobx_1.reaction(() => JSON.stringify([formItem.loading, formItem.filteredOptions]), () => this.forceUpdate());
                  }
                  let loadOptions = initFetch !== false;
                  if (formItem && joinValues === false && defaultValue) {
                      const selectedOptions = extractValue
                          ? formItem
                              .getSelectedOptions(value)
                              .map((selectedOption) => selectedOption[valueField || 'value'])
                          : formItem.getSelectedOptions(value);
                      setPrinstineValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
                  }
                  loadOptions &&
                      config.autoLoadOptionsFromSource !== false &&
                      (formInited
                          ? this.reload()
                          : addHook && addHook(this.initOptions, 'init'));
              }
              componentDidMount() {
                  this.normalizeValue();
              }
              shouldComponentUpdate(nextProps) {
                  if (config.strictMode === false || nextProps.strictMode === false) {
                      return true;
                  }
                  else if (nextProps.source || nextProps.autoComplete) {
                      return true;
                  }
                  if (helper_1.anyChanged(exports.detectProps, this.props, nextProps)) {
                      return true;
                  }
                  return false;
              }
              componentDidUpdate(prevProps) {
                  const props = this.props;
                  const formItem = props.formItem;
                  if (!formItem || !props.formInited) {
                      return;
                  }
                  else if (!prevProps.formItem) {
                      // todo 优化 name 变化情况。
                  }
                  if (prevProps.value !== props.value || formItem.expressionsInOptions) {
                      formItem.syncOptions();
                  }
                  if (prevProps.options !== props.options && formItem) {
                      formItem.setOptions(Select_1.normalizeOptions(props.options || []), props.onChange);
                      this.normalizeValue();
                  }
                  else if (config.autoLoadOptionsFromSource !== false &&
                      props.source &&
                      formItem &&
                      (prevProps.source !== props.source || prevProps.data !== props.data)) {
                      if (tpl_builtin_1.isPureVariable(props.source)) {
                          const prevOptions = tpl_builtin_1.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw');
                          const options = tpl_builtin_1.resolveVariableAndFilter(props.source, props.data, '| raw');
                          if (prevOptions !== options) {
                              formItem.setOptions(Select_1.normalizeOptions(options || []), props.onChange);
                              this.normalizeValue();
                          }
                      }
                      else if (api_1.isEffectiveApi(props.source, props.data) &&
                          api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
                          formItem
                              .loadOptions(props.source, props.data, undefined, true, props.onChange)
                              .then(() => this.normalizeValue());
                      }
                  }
              }
              componentWillUnmount() {
                  this.props.removeHook && this.props.removeHook(this.reload, 'init');
                  this.reaction && this.reaction();
              }
              normalizeValue() {
                  const { joinValues, extractValue, value, multiple, formItem, valueField } = this.props;
                  if (!formItem || joinValues !== false || !formItem.options.length) {
                      return;
                  }
                  if (extractValue === false &&
                      (typeof value === 'string' || typeof value === 'number')) {
                      const selectedOptions = formItem.getSelectedOptions(value);
                      formItem.changeValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
                  }
                  else if (extractValue === true &&
                      value &&
                      !((Array.isArray(value) &&
                          value.every(val => typeof val === 'string' || typeof val === 'number')) ||
                          typeof value === 'string' ||
                          typeof value === 'number')) {
                      const selectedOptions = formItem
                          .getSelectedOptions(value)
                          .map((selectedOption) => selectedOption[valueField || 'value']);
                      formItem.changeValue(multiple ? selectedOptions.concat() : selectedOptions[0]);
                  }
              }
              getWrappedInstance() {
                  return this.input;
              }
              inputRef(ref) {
                  this.input = ref;
              }
              handleToggle(option, submitOnChange, changeImmediately) {
                  const { onChange, formItem, value } = this.props;
                  if (!formItem) {
                      return;
                  }
                  let newValue = this.toggleValue(option, value);
                  onChange && onChange(newValue, submitOnChange, changeImmediately);
              }
              handleToggleAll() {
                  const { value, onChange, joinValues, extractValue, valueField, delimiter, resetValue, multiple, formItem } = this.props;
                  if (!formItem) {
                      return;
                  }
                  const selectedOptions = formItem.getSelectedOptions(value);
                  let valueArray = selectedOptions.length === formItem.filteredOptions.length
                      ? []
                      : formItem.filteredOptions.concat();
                  let newValue = '';
                  if (multiple) {
                      newValue = valueArray;
                      if (joinValues) {
                          newValue = newValue
                              .map(item => item[valueField || 'value'])
                              .join(delimiter);
                      }
                      else if (extractValue) {
                          newValue = newValue.map(item => item[valueField || 'value']);
                      }
                  }
                  else {
                      newValue = valueArray[0] || resetValue;
                      if (joinValues && newValue) {
                          newValue = newValue[valueField || 'value'];
                      }
                  }
                  onChange && onChange(newValue);
              }
              toggleValue(option, originValue) {
                  const { joinValues, extractValue, valueField, delimiter, clearable, resetValue, multiple, formItem } = this.props;
                  let valueArray = originValue !== undefined
                      ? formItem.getSelectedOptions(originValue).concat()
                      : [];
                  const idx = findIndex_1.default(valueArray, Select_1.optionValueCompare(option[valueField || 'value'], valueField || 'value'));
                  let newValue = '';
                  if (multiple) {
                      if (~idx) {
                          valueArray.splice(idx, 1);
                      }
                      else {
                          valueArray.push(option);
                      }
                      newValue = valueArray;
                      if (joinValues) {
                          newValue = newValue
                              .map(item => item[valueField || 'value'])
                              .join(delimiter);
                      }
                      else if (extractValue) {
                          newValue = newValue.map(item => item[valueField || 'value']);
                      }
                  }
                  else {
                      if (~idx && clearable) {
                          valueArray.splice(idx, 1);
                      }
                      else {
                          valueArray = [option];
                      }
                      newValue = valueArray[0] || resetValue;
                      if ((joinValues || extractValue) && newValue) {
                          newValue = newValue[valueField || 'value'];
                      }
                  }
                  return newValue;
              }
              // 当有 action 触发，如果指定了 reload 目标组件，有可能会来到这里面来
              reload() {
                  return this.reloadOptions();
              }
              reloadOptions(setError, isInit = false) {
                  const { source, formItem, data, onChange, setPrinstineValue, selectFirst } = this.props;
                  if (formItem && tpl_builtin_1.isPureVariable(source)) {
                      formItem.setOptions(Select_1.normalizeOptions(tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw') || []), onChange);
                      return;
                  }
                  else if (!formItem || !api_1.isEffectiveApi(source, data)) {
                      return;
                  }
                  return formItem.loadOptions(source, data, undefined, false, isInit ? setPrinstineValue : onChange, setError);
              }
              deferLoad(option) {
                  const { deferApi, source, env, formItem, data } = this.props;
                  if (option.loaded) {
                      return;
                  }
                  const api = option.deferApi || deferApi || source;
                  if (!api) {
                      env.notify('error', '请在选项中设置 `deferApi` 或者表单项中设置 `deferApi`，用来加载子选项。');
                      return;
                  }
                  formItem === null || formItem === void 0 ? void 0 : formItem.deferLoadOptions(option, api, helper_1.createObject(data, option));
              }
              async initOptions(data) {
                  await this.reloadOptions(false, true);
                  const { formItem, name } = this.props;
                  if (!formItem) {
                      return;
                  }
                  if (mobx_state_tree_1.isAlive(formItem) && formItem.value) {
                      helper_1.setVariable(data, name, formItem.value);
                  }
              }
              focus() {
                  this.input && this.input.focus && this.input.focus();
              }
              setOptions(options, skipNormalize = false) {
                  const formItem = this.props.formItem;
                  formItem &&
                      formItem.setOptions(skipNormalize ? options : Select_1.normalizeOptions(options || []), this.props.onChange);
              }
              syncOptions() {
                  const formItem = this.props.formItem;
                  formItem && formItem.syncOptions();
              }
              setLoading(value) {
                  const formItem = this.props.formItem;
                  formItem && formItem.setLoading(value);
              }
              async handleOptionAdd(idx = -1, value, skipForm = false) {
                  let { addControls, disabled, labelField, onOpenDialog, optionLabel, addApi, source, data, valueField, formItem: model, createBtnLabel, env, translate: __ } = this.props;
                  // 禁用或者没有配置 name
                  if (disabled || !model) {
                      return;
                  }
                  // 用户没有配置表单项，则自动创建一个 label 输入
                  if (!skipForm && (!Array.isArray(addControls) || !addControls.length)) {
                      addControls = [
                          {
                              type: 'text',
                              name: labelField || 'label',
                              label: false,
                              placeholder: __('Options.addPlaceholder')
                          }
                      ];
                  }
                  const ctx = helper_1.createObject(data, Array.isArray(idx)
                      ? Object.assign({ parent: helper_1.getTree(model.options, idx.slice(0, -1)) }, value) : value);
                  let result = skipForm
                      ? ctx
                      : await onOpenDialog({
                          type: 'dialog',
                          title: createBtnLabel || `新增${optionLabel || '选项'}`,
                          body: {
                              type: 'form',
                              api: addApi,
                              controls: addControls
                          }
                      }, ctx);
                  // 单独发请求
                  if (skipForm && addApi) {
                      try {
                          const payload = await env.fetcher(addApi, result, {
                              method: 'post'
                          });
                          if (!payload.ok) {
                              env.notify('error', payload.msg || '新增失败，请仔细检查');
                              result = null;
                          }
                          else {
                              result = payload.data || result;
                          }
                      }
                      catch (e) {
                          result = null;
                          console.error(e);
                          env.notify('error', e.message);
                      }
                  }
                  // 有 result 说明弹框点了确认。否则就是取消了。
                  if (!result) {
                      return;
                  }
                  // 没走服务端的。
                  if (!result.hasOwnProperty(valueField || 'value')) {
                      result = Object.assign(Object.assign({}, result), { [valueField || 'value']: result[labelField || 'label'] });
                  }
                  // 如果配置了 source 且配置了 addApi 直接重新拉取接口就够了
                  // 不能不判断 addApi 就刷新，因为有些场景就是临时添加的。
                  if (source && addApi) {
                      this.reload();
                  }
                  else {
                      // 否则直接前端变更 options
                      let options = model.options.concat();
                      if (Array.isArray(idx)) {
                          options = helper_1.spliceTree(options, idx, 0, Object.assign({}, result));
                      }
                      else {
                          ~idx
                              ? options.splice(idx, 0, Object.assign({}, result))
                              : options.push(Object.assign({}, result));
                      }
                      model.setOptions(options, this.props.onChange);
                  }
              }
              async handleOptionEdit(value, origin = value, skipForm = false) {
                  let { editControls, disabled, labelField, onOpenDialog, editApi, env, source, data, formItem: model, optionLabel, translate: __ } = this.props;
                  if (disabled || !model) {
                      return;
                  }
                  if (!skipForm && (!Array.isArray(editControls) || !editControls.length)) {
                      editControls = [
                          {
                              type: 'text',
                              name: labelField || 'label',
                              label: false,
                              placeholder: __('Options.addPlaceholder')
                          }
                      ];
                  }
                  let result = skipForm
                      ? value
                      : await onOpenDialog({
                          type: 'dialog',
                          title: __('Options.editLabel', {
                              label: optionLabel || __('Options.label')
                          }),
                          body: {
                              type: 'form',
                              api: editApi,
                              controls: editControls
                          }
                      }, helper_1.createObject(data, value));
                  // 单独发请求
                  if (skipForm && editApi) {
                      try {
                          const payload = await env.fetcher(editApi, helper_1.createObject(data, result), {
                              method: 'post'
                          });
                          if (!payload.ok) {
                              env.notify('error', payload.msg || __('saveFailed'));
                              result = null;
                          }
                          else {
                              result = payload.data || result;
                          }
                      }
                      catch (e) {
                          result = null;
                          console.error(e);
                          env.notify('error', e.message);
                      }
                  }
                  // 没有结果，说明取消了。
                  if (!result) {
                      return;
                  }
                  if (source && !editApi) {
                      this.reload();
                  }
                  else {
                      const indexes = helper_1.findTreeIndex(model.options, item => item === origin);
                      if (indexes) {
                          model.setOptions(helper_1.spliceTree(model.options, indexes, 1, Object.assign(Object.assign({}, origin), result)), this.props.onChange);
                      }
                  }
              }
              async handleOptionDelete(value) {
                  let { deleteConfirmText, disabled, data, deleteApi, env, formItem: model, source, valueField, translate: __ } = this.props;
                  if (disabled || !model) {
                      return;
                  }
                  const ctx = helper_1.createObject(data, value);
                  // 如果配置了 deleteConfirmText 让用户先确认。
                  const confirmed = deleteConfirmText
                      ? await env.confirm(tpl_1.filter(deleteConfirmText, ctx))
                      : true;
                  if (!confirmed) {
                      return;
                  }
                  // 通过 deleteApi 删除。
                  try {
                      if (!deleteApi) {
                          throw new Error(__('Options.deleteAPI'));
                      }
                      const result = await env.fetcher(deleteApi, ctx, {
                          method: 'delete'
                      });
                      if (!result.ok) {
                          env.notify('error', result.msg || __('deleteFailed'));
                      }
                      else if (source) {
                          this.reload();
                      }
                      else {
                          const options = model.options.concat();
                          const idx = findIndex_1.default(options, item => item[valueField || 'value'] == value[valueField || 'value']);
                          if (~idx) {
                              options.splice(idx, 1);
                              model.setOptions(options, this.props.onChange);
                          }
                      }
                  }
                  catch (e) {
                      console.error(e);
                      env.notify('error', e.message);
                  }
              }
              render() {
                  const { value, formItem, addApi, editApi, deleteApi, creatable, editable, removable } = this.props;
                  return (react_1.default.createElement(Control, Object.assign({}, this.props, { ref: this.inputRef, options: formItem ? formItem.filteredOptions : [], onToggle: this.handleToggle, onToggleAll: this.handleToggleAll, selectedOptions: formItem ? formItem.getSelectedOptions(value) : [], loading: formItem ? formItem.loading : false, setLoading: this.setLoading, setOptions: this.setOptions, syncOptions: this.syncOptions, reloadOptions: this.reload, deferLoad: this.deferLoad, creatable: creatable || (creatable !== false && api_1.isEffectiveApi(addApi)), editable: editable || (editable !== false && api_1.isEffectiveApi(editApi)), removable: removable || (removable !== false && api_1.isEffectiveApi(deleteApi)), onAdd: this.handleOptionAdd, onEdit: this.handleOptionEdit, onDelete: this.handleOptionDelete })));
              }
          }
          FormOptionsItem.displayName = `OptionsControl(${config.type})`;
          FormOptionsItem.defaultProps = Object.assign({ delimiter: ',', labelField: 'label', valueField: 'value', joinValues: true, extractValue: false, multiple: false, placeholder: 'Select.placeholder', resetValue: '', deleteConfirmText: '确定要删除？' }, Control.defaultProps);
          FormOptionsItem.propsList = Control.propsList
              ? [...Control.propsList]
              : [];
          FormOptionsItem.ComposedComponent = Control;
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "inputRef", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object, Boolean, Boolean]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "handleToggle", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", []),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "handleToggleAll", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", []),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "reload", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Boolean, Object]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "reloadOptions", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "deferLoad", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object]),
              tslib_1.__metadata("design:returntype", Promise)
          ], FormOptionsItem.prototype, "initOptions", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object, Object]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "setOptions", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", []),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "syncOptions", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Boolean]),
              tslib_1.__metadata("design:returntype", void 0)
          ], FormOptionsItem.prototype, "setLoading", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object, Object, Boolean]),
              tslib_1.__metadata("design:returntype", Promise)
          ], FormOptionsItem.prototype, "handleOptionAdd", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object, Object, Boolean]),
              tslib_1.__metadata("design:returntype", Promise)
          ], FormOptionsItem.prototype, "handleOptionEdit", null);
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object]),
              tslib_1.__metadata("design:returntype", Promise)
          ], FormOptionsItem.prototype, "handleOptionDelete", null);
          return FormOptionsItem;
      })();
      return Item_1.registerFormItem(Object.assign(Object.assign({}, config), { strictMode: false, component: FormOptionsItem }));
  }
  exports.registerOptionsControl = registerOptionsControl;
  function OptionsControl(config) {
      return function (component) {
          const renderer = registerOptionsControl(Object.assign(Object.assign({}, config), { component: component }));
          return renderer.component;
      };
  }
  exports.OptionsControl = OptionsControl;
  function highlight(text, input, hlClassName = 'is-matched') {
      if (!input) {
          return text;
      }
      text = String(text);
      const reg = new RegExp(input.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&'), 'i');
      if (!reg.test(text)) {
          return text;
      }
      const parts = text.split(reg);
      const dom = [];
      parts.forEach((text, index) => {
          text && dom.push(react_1.default.createElement("span", { key: index }, text));
          dom.push(react_1.default.createElement("span", { className: hlClassName, key: `${index}-hl` }, input));
      });
      dom.pop();
      return dom;
  }
  exports.highlight = highlight;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3B0aW9ucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9PcHRpb25zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBS0EseUNBQTBFO0FBQzFFLHFEQUF3QztBQUN4QywrQ0FRNEI7QUFDNUIsK0JBQThCO0FBQzlCLGlDQU9nQjtBQUloQiwwREFBMEI7QUFDMUIseURBR2lDO0FBQ2pDLG9EQUtpQztBQVN6Qix1RkFiTixlQUFNLE9BYU07QUFSZCx5Q0FBdUM7QUFDdkMseUVBQXlDO0FBMkw1QixRQUFBLFdBQVcsR0FBRyxrQkFBZSxDQUFDLE1BQU0sQ0FBQztJQUNoRCxTQUFTO0lBQ1QsTUFBTTtJQUNOLFNBQVM7SUFDVCxjQUFjO0lBQ2QsVUFBVTtJQUNWLFVBQVU7SUFDVixVQUFVO0lBQ1YsVUFBVTtJQUNWLFdBQVc7SUFDWCxhQUFhO0lBQ2IsWUFBWTtJQUNaLGNBQWM7Q0FDZixDQUFDLENBQUM7QUFFSCxTQUFnQixzQkFBc0IsQ0FBQyxNQUFxQjtJQUMxRCxNQUFNLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDO0lBRWpDOztRQUFBLE1BQU0sZUFBZ0IsU0FBUSxlQUFLLENBQUMsU0FBNEI7WUFzQjlELGtCQUFrQjtnQkFDaEIsTUFBTSxFQUNKLFNBQVMsRUFDVCxRQUFRLEVBQ1IsTUFBTSxFQUNOLElBQUksRUFDSixpQkFBaUIsRUFDakIsWUFBWSxFQUNaLFFBQVEsRUFDUixVQUFVLEVBQ1YsWUFBWSxFQUNaLE9BQU8sRUFDUCxVQUFVLEVBQ1YsVUFBVSxFQUNWLE9BQU8sRUFDUCxLQUFLLEVBQ0wsUUFBUSxFQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFFZixJQUFJLFFBQVEsRUFBRTtvQkFDWixRQUFRLENBQUMsVUFBVSxDQUFDLHlCQUFnQixDQUFDLE9BQU8sQ0FBQyxFQUFFLFFBQVEsQ0FB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

});
