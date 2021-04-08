amis.define('src/renderers/Form/Combo.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ComboControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const combo_1 = require("src/store/combo.ts");
  const Tabs_1 = tslib_1.__importStar(require("src/components/Tabs.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const tpl_1 = require("src/utils/tpl.ts");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const api_1 = require("src/utils/api.ts");
  const components_1 = require("src/components/index.tsx");
  const memoize_1 = tslib_1.__importDefault(require("node_modules/lodash/memoize"));
  const icons_1 = require("src/components/icons.tsx");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  function pickVars(vars, fields) {
      return fields.reduce((data, key) => {
          data[key] = tpl_builtin_1.resolveVariable(key, vars);
          return data;
      }, {});
  }
  let ComboControl = /** @class */ (() => {
      var _a;
      class ComboControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.subForms = [];
              this.subFormDefaultValues = [];
              this.keys = [];
              this.toDispose = [];
              this.id = helper_1.guid();
              this.refsMap = {};
              this.makeFormRef = memoize_1.default((index) => (ref) => this.formRef(ref, index));
              this.memoizedFormatValue = memoize_1.default((strictMode, syncFields, value, index, data) => {
                  return helper_1.createObject(helper_1.extendObject(data, Object.assign({ index, __index: index }, data)), Object.assign(Object.assign({}, value), (Array.isArray(syncFields) ? pickVars(data, syncFields) : null)));
              }, (strictMode, syncFields, value, index, data) => Array.isArray(syncFields)
                  ? JSON.stringify([value, index, data, pickVars(data, syncFields)])
                  : strictMode
                      ? JSON.stringify([value, index])
                      : JSON.stringify([value, index, data]));
              this.handleChange = this.handleChange.bind(this);
              this.handleSingleFormChange = this.handleSingleFormChange.bind(this);
              this.handleSingleFormInit = this.handleSingleFormInit.bind(this);
              this.handleFormInit = this.handleFormInit.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.addItem = this.addItem.bind(this);
              this.removeItem = this.removeItem.bind(this);
              this.dragTipRef = this.dragTipRef.bind(this);
              this.flush = this.flush.bind(this);
              this.handleComboTypeChange = this.handleComboTypeChange.bind(this);
              this.defaultValue = Object.assign({}, props.scaffold);
          }
          componentWillMount() {
              const { store, value, multiple, minLength, maxLength, formItem, addHook } = this.props;
              store.config({
                  multiple,
                  minLength,
                  maxLength,
                  length: this.getValueAsArray().length
              });
              formItem && mobx_state_tree_1.isAlive(formItem) && formItem.setSubStore(store);
              addHook && this.toDispose.push(addHook(this.flush, 'flush'));
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (helper_1.anyChanged(['minLength', 'maxLength', 'value'], props, nextProps)) {
                  const { store, minLength, maxLength, multiple } = nextProps;
                  const values = this.getValueAsArray(nextProps);
                  store.config({
                      multiple,
                      minLength,
                      maxLength,
                      length: values.length
                  });
                  if (store.activeKey >= values.length) {
                      store.setActiveKey(Math.max(0, values.length - 1));
                  }
                  // combo 进来了新的值，且这次 form 初始化时带来的新值变化，但是之前的值已经 onInit 过了
                  // 所以，之前 onInit 设置进去的初始值是过时了的。这个时候修复一下。
                  if (nextProps.value !== props.value &&
                      !props.formInited &&
                      this.subFormDefaultValues.length) {
                      this.subFormDefaultValues = this.subFormDefaultValues.map((item, index) => {
                          return Object.assign(Object.assign({}, item), { values: values[index] });
                      });
                  }
              }
          }
          componentWillUnmount() {
              var _a, _b, _c, _d;
              const { formItem } = this.props;
              formItem && mobx_state_tree_1.isAlive(formItem) && formItem.setSubStore(null);
              this.toDispose.forEach(fn => fn());
              this.toDispose = [];
              (_b = (_a = this.memoizedFormatValue.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
              (_d = (_c = this.makeFormRef.cache).clear) === null || _d === void 0 ? void 0 : _d.call(_c);
          }
          getValueAsArray(props = this.props) {
              const { flat, joinValues, delimiter } = props;
              let value = props.value;
              if (joinValues && flat && typeof value === 'string') {
                  value = value.split(delimiter || ',');
              }
              else if (!Array.isArray(value)) {
                  value = [];
              }
              else {
                  value = value.concat();
              }
              return value;
          }
          addItemWith(condition) {
              const { flat, joinValues, delimiter, scaffold, disabled, submitOnChange } = this.props;
              if (disabled) {
                  return;
              }
              let value = this.getValueAsArray();
              value.push(flat
                  ? condition.scaffold || scaffold || ''
                  : Object.assign({}, (condition.scaffold || scaffold)));
              this.keys.push(helper_1.guid());
              if (flat && joinValues) {
                  value = value.join(delimiter || ',');
              }
              this.props.onChange(value, submitOnChange, true);
          }
          addItem() {
              const { flat, joinValues, delimiter, scaffold, disabled, submitOnChange } = this.props;
              if (disabled) {
                  return;
              }
              let value = this.getValueAsArray();
              value.push(flat
                  ? scaffold || ''
                  : Object.assign({}, scaffold));
              this.keys.push(helper_1.guid());
              if (flat && joinValues) {
                  value = value.join(delimiter || ',');
              }
              this.props.onChange(value, submitOnChange, true);
          }
          async removeItem(key) {
              const { flat, joinValues, delimiter, disabled, deleteApi, deleteConfirmText, data, env, translate: __ } = this.props;
              if (disabled) {
                  return;
              }
              let value = this.getValueAsArray();
              const ctx = helper_1.createObject(data, value[key]);
              if (api_1.isEffectiveApi(deleteApi, ctx)) {
                  const confirmed = await env.confirm(deleteConfirmText ? tpl_1.filter(deleteConfirmText, ctx) : __('deleteConfirm'));
                  if (!confirmed) {
                      // 如果不确认，则跳过！
                      return;
                  }
                  const result = await env.fetcher(deleteApi, ctx);
                  if (!result.ok) {
                      env.notify('error', __('deleteFailed'));
                      return;
                  }
              }
              value.splice(key, 1);
              this.keys.splice(key, 1);
              if (flat && joinValues) {
                  value = value.join(delimiter || ',');
              }
              this.props.onChange(value);
          }
          handleChange(values, diff, { index }) {
              const { flat, store, joinValues, delimiter, disabled, submitOnChange } = this.props;
              if (disabled) {
                  return;
              }
              let value = this.getValueAsArray();
              value[index] = flat ? values.flat : Object.assign({}, values);
              if (flat && joinValues) {
                  value = value.join(delimiter || ',');
              }
              this.props.onChange(value, submitOnChange, true);
              store.forms.forEach(item => mobx_state_tree_1.isAlive(item) &&
                  item.items.forEach(item => item.unique && item.syncOptions()));
          }
          handleSingleFormChange(values) {
              this.props.onChange(Object.assign({}, values), this.props.submitOnChange, true);
          }
          handleFormInit(values, { index }) {
              const { syncDefaultValue, flat, joinValues, delimiter, formInited, onChange, submitOnChange, setPrinstineValue } = this.props;
              this.subFormDefaultValues.push({
                  index,
                  values,
                  setted: false
              });
              if (syncDefaultValue === false ||
                  this.subFormDefaultValues.length !== this.subForms.length) {
                  return;
              }
              let value = this.getValueAsArray();
              let isModified = false;
              this.subFormDefaultValues = this.subFormDefaultValues.map(({ index, values, setted }) => {
                  const newValue = flat ? values.flat : Object.assign({}, values);
                  if (!setted && helper_1.isObjectShallowModified(value[index], newValue)) {
                      value[index] = flat ? values.flat : Object.assign({}, values);
                      isModified = true;
                  }
                  return {
                      index,
                      values,
                      setted: true
                  };
              });
              if (!isModified) {
                  return;
              }
              if (flat && joinValues) {
                  value = value.join(delimiter || ',');
              }
              formInited
                  ? onChange(value, submitOnChange, true)
                  : setPrinstineValue(value);
          }
          handleSingleFormInit(values) {
              const { syncDefaultValue, setPrinstineValue, value, nullable } = this.props;
              if (syncDefaultValue !== false &&
                  !nullable &&
                  helper_1.isObjectShallowModified(value, values) &&
                  setPrinstineValue) {
                  setPrinstineValue(Object.assign({}, values));
              }
          }
          handleAction(action) {
              const { onAction } = this.props;
              if (action.actionType === 'delete') {
                  action.index !== void 0 && this.removeItem(action.index);
                  return;
              }
              onAction && onAction.apply(null, arguments);
          }
          validate() {
              const { value, minLength, maxLength, messages, nullable, translate: __ } = this.props;
              if (minLength && (!Array.isArray(value) || value.length < minLength)) {
                  return __((messages && messages.minLengthValidateFailed) || 'Combo.minLength', { minLength });
              }
              else if (maxLength && Array.isArray(value) && value.length > maxLength) {
                  return __((messages && messages.maxLengthValidateFailed) || 'Combo.maxLength', { maxLength });
              }
              else if (this.subForms.length && (!nullable || value)) {
                  return Promise.all(this.subForms.map(item => item.validate())).then(values => {
                      if (~values.indexOf(false)) {
                          return __((messages && messages.validateFailed) || 'validateFailed');
                      }
                      return;
                  });
              }
          }
          flush() {
              this.subForms.forEach(form => form.flush());
          }
          dragTipRef(ref) {
              if (!this.dragTip && ref) {
                  this.initDragging();
              }
              else if (this.dragTip && !ref) {
                  this.destroyDragging();
              }
              this.dragTip = ref;
          }
          initDragging() {
              const ns = this.props.classPrefix;
              const submitOnChange = this.props.submitOnChange;
              const dom = react_dom_1.findDOMNode(this);
              this.sortable = new sortablejs_1.default(dom.querySelector(`.${ns}Combo-items`), {
                  group: `combo-${this.id}`,
                  animation: 150,
                  handle: `.${ns}Combo-itemDrager`,
                  ghostClass: `${ns}Combo-item--dragging`,
                  onEnd: (e) => {
                      // 没有移动
                      if (e.newIndex === e.oldIndex) {
                          return;
                      }
                      // 换回来
                      const parent = e.to;
                      if (e.oldIndex < parent.childNodes.length - 1) {
                          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                      }
                      else {
                          parent.appendChild(e.item);
                      }
                      const value = this.props.value;
                      if (!Array.isArray(value)) {
                          return;
                      }
                      const newValue = value.concat();
                      newValue.splice(e.newIndex, 0, newValue.splice(e.oldIndex, 1)[0]);
                      this.keys.splice(e.newIndex, 0, this.keys.splice(e.oldIndex, 1)[0]);
                      this.props.onChange(newValue, submitOnChange, true);
                  }
              });
          }
          destroyDragging() {
              this.sortable && this.sortable.destroy();
          }
          formRef(ref, index = 0) {
              if (ref) {
                  while (ref && ref.getWrappedInstance) {
                      ref = ref.getWrappedInstance();
                  }
                  this.subForms[index] = ref;
                  this.refsMap[index] = ref;
              }
              else {
                  const form = this.refsMap[index];
                  this.subForms = this.subForms.filter(item => item !== form);
                  this.subFormDefaultValues = this.subFormDefaultValues.filter(({ index: dIndex }) => dIndex !== index);
                  delete this.refsMap[index];
              }
          }
          formatValue(value, index = -1) {
              const { flat, data, strictMode, syncFields } = this.props;
              if (flat) {
                  value = {
                      flat: value
                  };
              }
              value = value || this.defaultValue;
              return this.memoizedFormatValue(strictMode !== false, syncFields, value, index, data);
          }
          pickCondition(value) {
              const conditions = this.props.conditions;
              return find_1.default(conditions, item => item.test && tpl_1.evalExpression(item.test, value));
          }
          handleComboTypeChange(index, selection) {
              const { multiple, onChange, value, flat, submitOnChange } = this.props;
              const conditions = this.props
                  .conditions;
              const condition = find_1.default(conditions, item => item.label === selection.label);
              if (!condition) {
                  return;
              }
              if (multiple) {
                  const newValue = this.getValueAsArray();
                  newValue.splice(index, 1, Object.assign({}, tpl_builtin_1.dataMapping(condition.scaffold || {}, newValue[index])));
                  // todo 支持 flat
                  onChange(newValue, submitOnChange, true);
              }
              else {
                  onChange(Object.assign({}, tpl_builtin_1.dataMapping(condition.scaffold || {}, value)), submitOnChange, true);
              }
          }
          handleTabSelect(key) {
              const { store } = this.props;
              store.setActiveKey(key);
          }
          setNull(e) {
              e.preventDefault();
              const { onChange } = this.props;
              onChange(null);
              Array.isArray(this.subForms) &&
                  this.subForms.forEach(subForm => {
                      subForm.clearErrors();
                  });
          }
          renderPlaceholder() {
              const { placeholder, translate: __ } = this.props;
              return (react_1.default.createElement("span", { className: "text-muted" }, __(placeholder || 'placeholder.noData')));
          }
          renderTabsMode() {
              const { classPrefix: ns, classnames: cx, tabsStyle, formClassName, render, disabled, store, flat, subFormMode, addButtonText, addable, removable, typeSwitchable, itemRemovableOn, delimiter, canAccessSuperData, addIcon, deleteIcon, tabsLabelTpl, conditions, changeImmediately, translate: __ } = this.props;
              let controls = this.props.controls;
              let value = this.props.value;
              if (flat && typeof value === 'string') {
                  value = value.split(delimiter || ',');
              }
              const finnalRemovable = store.removable !== false && // minLength ?
                  !disabled && // 控件自身是否禁用
                  removable !== false; // 是否可以删除
              if (!Array.isArray(value)) {
                  return this.renderPlaceholder();
              }
              // todo 支持拖拽排序。
              return (react_1.default.createElement(Tabs_1.default, { className: 'ComboTabs', mode: tabsStyle, activeKey: store.activeKey, onSelect: this.handleTabSelect, additionBtns: !disabled ? (react_1.default.createElement("li", { className: cx(`Tabs-link ComboTabs-addLink`) }, store.addable && addable !== false ? (Array.isArray(conditions) && conditions.length ? (render('add-button', {
                      type: 'dropdown-button',
                      icon: addIcon ? (react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" })) : (''),
                      label: __(addButtonText || 'Combo.add'),
                      level: 'info',
                      size: 'sm',
                      closeOnClick: true
                  }, {
                      buttons: conditions.map(item => ({
                          label: item.label,
                          onClick: (e) => {
                              this.addItemWith(item);
                              return false;
                          }
                      }))
                  })) : (react_1.default.createElement("a", { onClick: this.addItem, "data-position": "left", "data-tooltip": __('Combo.add') },
                      addIcon ? react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }) : null,
                      react_1.default.createElement("span", null, __(addButtonText || 'Combo.add'))))) : null)) : null }, value.map((value, index) => {
                  const data = this.formatValue(value, index);
                  let condition = null;
                  let toolbar = undefined;
                  if (finnalRemovable && // 表达式判断单条是否可删除
                      (!itemRemovableOn ||
                          tpl_1.evalExpression(itemRemovableOn, value) !== false)) {
                      toolbar = (react_1.default.createElement("div", { onClick: this.removeItem.bind(this, index), key: "remove", className: cx(`Combo-tab-delBtn ${!store.removable ? 'is-disabled' : ''}`), "data-tooltip": __('delete'), "data-position": "bottom" }, deleteIcon ? (react_1.default.createElement("i", { className: deleteIcon })) : (react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))));
                  }
                  if (Array.isArray(conditions) && conditions.length) {
                      condition = this.pickCondition(data);
                      controls = condition ? condition.controls : undefined;
                  }
                  let finnalControls = flat && controls
                      ? [
                          Object.assign(Object.assign({}, (controls && controls[0])), { name: 'flat' })
                      ]
                      : controls;
                  const hasUnique = Array.isArray(finnalControls) &&
                      finnalControls.some((item) => item.unique);
                  return (react_1.default.createElement(Tabs_1.Tab, { title: tpl_1.filter(tabsLabelTpl ||
                          __('{{index}}', { index: data.index + 1 }), data), key: this.keys[index] || (this.keys[index] = helper_1.guid()), toolbar: toolbar, eventKey: index, 
                      // 不能按需渲染，因为 unique 会失效。
                      mountOnEnter: !hasUnique, unmountOnExit: false },
                      condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                          react_1.default.createElement("label", null, __('Combo.type')),
                          react_1.default.createElement(Select_1.default, { onChange: this.handleComboTypeChange.bind(this, index), options: conditions.map(item => ({
                                  label: item.label,
                                  value: item.label
                              })), value: condition.label, clearable: false }))) : null,
                      react_1.default.createElement("div", { className: cx(`Combo-itemInner`) }, finnalControls ? (render(`multiple/${index}`, {
                          type: 'form',
                          controls: finnalControls,
                          wrapperComponent: 'div',
                          wrapWithPanel: false,
                          mode: subFormMode,
                          className: cx(`Combo-form`, formClassName)
                      }, {
                          index,
                          disabled,
                          data,
                          onChange: this.handleChange,
                          onInit: this.handleFormInit,
                          onAction: this.handleAction,
                          ref: this.makeFormRef(index),
                          canAccessSuperData,
                          lazyChange: changeImmediately ? false : true,
                          formLazyChange: false,
                          value: undefined,
                          formItemValue: undefined
                      })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData'))))));
              })));
          }
          renderMultipe() {
              if (this.props.tabsMode) {
                  return this.renderTabsMode();
              }
              const { classPrefix: ns, classnames: cx, formClassName, render, multiLine, addButtonClassName, disabled, store, flat, subFormMode, draggable, draggableTip, addButtonText, addable, removable, typeSwitchable, itemRemovableOn, delimiter, canAccessSuperData, addIcon, dragIcon, deleteIcon, noBorder, conditions, lazyLoad, changeImmediately, placeholder, translate: __ } = this.props;
              let controls = this.props.controls;
              let value = this.props.value;
              if (flat && typeof value === 'string') {
                  value = value.split(delimiter || ',');
              }
              const finnalRemovable = store.removable !== false && // minLength ?
                  !disabled && // 控件自身是否禁用
                  removable !== false; // 是否可以删除
              return (react_1.default.createElement("div", { className: cx(`Combo Combo--multi`, multiLine ? `Combo--ver` : `Combo--hor`, noBorder ? `Combo--noBorder` : '', disabled ? 'is-disabled' : '', !disabled && draggable && Array.isArray(value) && value.length > 1
                      ? 'is-draggable'
                      : '') },
                  react_1.default.createElement("div", { className: cx(`Combo-items`) }, Array.isArray(value) && value.length ? (value.map((value, index, thelist) => {
                      let delBtn = null;
                      if (finnalRemovable && // 表达式判断单条是否可删除
                          (!itemRemovableOn ||
                              tpl_1.evalExpression(itemRemovableOn, value) !== false)) {
                          delBtn = (react_1.default.createElement("a", { onClick: this.removeItem.bind(this, index), key: "remove", className: cx(`Combo-delBtn ${!store.removable ? 'is-disabled' : ''}`), "data-tooltip": __('delete'), "data-position": "bottom" }, deleteIcon ? (react_1.default.createElement("i", { className: deleteIcon })) : (react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))));
                      }
                      const data = this.formatValue(value, index);
                      let condition = null;
                      if (Array.isArray(conditions) && conditions.length) {
                          condition = this.pickCondition(data);
                          controls = condition ? condition.controls : undefined;
                      }
                      let finnalControls = flat && controls
                          ? [
                              Object.assign(Object.assign({}, (controls && controls[0])), { name: 'flat' })
                          ]
                          : controls;
                      return (react_1.default.createElement("div", { className: cx(`Combo-item`), key: this.keys[index] || (this.keys[index] = helper_1.guid()) },
                          !disabled && draggable && thelist.length > 1 ? (react_1.default.createElement("div", { className: cx('Combo-itemDrager') },
                              react_1.default.createElement("a", { key: "drag", "data-tooltip": __('Combo.dragDropSort'), "data-position": "bottom" }, dragIcon ? (react_1.default.createElement("i", { className: dragIcon })) : (react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" }))))) : null,
                          condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                              react_1.default.createElement("label", null, __('Combo.type')),
                              react_1.default.createElement(Select_1.default, { onChange: this.handleComboTypeChange.bind(this, index), options: conditions.map(item => ({
                                      label: item.label,
                                      value: item.label
                                  })), value: condition.label, clearable: false }))) : null,
                          react_1.default.createElement("div", { className: cx(`Combo-itemInner`) }, finnalControls ? (render(`multiple/${index}`, {
                              type: 'form',
                              controls: finnalControls,
                              wrapperComponent: 'div',
                              wrapWithPanel: false,
                              mode: multiLine ? subFormMode : 'row',
                              className: cx(`Combo-form`, formClassName)
                          }, {
                              index,
                              disabled,
                              data,
                              onChange: this.handleChange,
                              onInit: this.handleFormInit,
                              onAction: this.handleAction,
                              ref: this.makeFormRef(index),
                              lazyChange: changeImmediately ? false : true,
                              formLazyChange: false,
                              lazyLoad,
                              canAccessSuperData,
                              value: undefined,
                              formItemValue: undefined
                          })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData')))),
                          delBtn));
                  })) : placeholder ? (react_1.default.createElement("div", { className: cx(`Combo-placeholder`) }, __(placeholder))) : null),
                  !disabled ? (react_1.default.createElement("div", { className: cx(`Combo-toolbar`) },
                      store.addable && addable !== false ? (Array.isArray(conditions) && conditions.length ? (render('add-button', {
                          type: 'dropdown-button',
                          label: __(addButtonText || 'Combo.add'),
                          level: 'info',
                          size: 'sm',
                          closeOnClick: true
                      }, {
                          buttons: conditions.map(item => ({
                              label: item.label,
                              onClick: (e) => {
                                  this.addItemWith(item);
                                  return false;
                              }
                          }))
                      })) : (react_1.default.createElement("button", { type: "button", onClick: this.addItem, className: cx(`Button Combo-addBtn`, addButtonClassName), "data-tooltip": __('Combo.add') },
                          addIcon ? react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }) : null,
                          react_1.default.createElement("span", null, __(addButtonText || 'Combo.add'))))) : null,
                      draggable ? (react_1.default.createElement("span", { className: cx(`Combo-dragableTip`), ref: this.dragTipRef }, Array.isArray(value) && value.length > 1
                          ? __(draggableTip)
                          : '')) : null)) : null));
          }
          renderSingle() {
              const { conditions, classnames: cx, render, value, multiLine, formClassName, canAccessSuperData, noBorder, disabled, typeSwitchable, nullable, translate: __ } = this.props;
              let controls = this.props.controls;
              const data = helper_1.isObject(value) ? this.formatValue(value) : this.defaultValue;
              let condition = null;
              if (Array.isArray(conditions) && conditions.length) {
                  condition = this.pickCondition(data);
                  controls = condition ? condition.controls : undefined;
              }
              return (react_1.default.createElement("div", { className: cx(`Combo Combo--single`, multiLine ? `Combo--ver` : `Combo--hor`, noBorder ? `Combo--noBorder` : '', disabled ? 'is-disabled' : '') },
                  react_1.default.createElement("div", { className: cx(`Combo-item`) },
                      condition && typeSwitchable !== false ? (react_1.default.createElement("div", { className: cx('Combo-itemTag') },
                          react_1.default.createElement("label", null, __('Combo.type')),
                          react_1.default.createElement(Select_1.default, { onChange: this.handleComboTypeChange.bind(this, 0), options: conditions.map(item => ({
                                  label: item.label,
                                  value: item.label
                              })), value: condition.label, clearable: false }))) : null,
                      react_1.default.createElement("div", { className: cx(`Combo-itemInner`) }, controls ? (render('single', {
                          type: 'form',
                          controls,
                          wrapperComponent: 'div',
                          wrapWithPanel: false,
                          mode: multiLine ? 'normal' : 'row',
                          className: cx(`Combo-form`, formClassName)
                      }, {
                          disabled: disabled,
                          data: data,
                          onChange: this.handleSingleFormChange,
                          ref: this.makeFormRef(0),
                          onInit: this.handleSingleFormInit,
                          canAccessSuperData
                      })) : (react_1.default.createElement(components_1.Alert2, { level: "warning", className: "m-b-none" }, __('Combo.invalidData'))))),
                  value && nullable ? (react_1.default.createElement("a", { className: cx('Combo-setNullBtn'), href: "#", onClick: this.setNull }, __('clear'))) : null));
          }
          render() {
              const { formInited, multiple, className, classPrefix: ns, classnames: cx, disabled } = this.props;
              return formInited ? (react_1.default.createElement("div", { className: cx(`ComboControl`, className) }, multiple ? this.renderMultipe() : this.renderSingle())) : null;
          }
      }
      ComboControl.defaultProps = {
          minLength: 0,
          maxLength: 0,
          multiple: false,
          multiLine: false,
          addButtonClassName: '',
          formClassName: '',
          subFormMode: 'normal',
          draggableTip: '',
          addButtonText: 'Combo.add',
          canAccessSuperData: false,
          addIcon: true,
          dragIcon: '',
          deleteIcon: '',
          tabsMode: false,
          tabsStyle: '',
          placeholder: 'placeholder.empty'
      };
      ComboControl.propsList = [
          'minLength',
          'maxLength',
          'multiple',
          'multiLine',
          'addButtonClassName',
          'subFormMode',
          'draggableTip',
          'addButtonText',
          'draggable',
          'scaffold',
          'canAccessSuperData',
          'addIcon',
          'dragIcon',
          'deleteIcon',
          'noBorder',
          'conditions',
          'tabsMode',
          'tabsStyle',
          'lazyLoad',
          'changeImmediately',
          'strictMode',
          'controls',
          'conditions',
          'messages'
      ];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ComboControl.prototype, "handleTabSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ComboControl.prototype, "setNull", null);
      return ComboControl;
  })();
  exports.default = ComboControl;
  let ComboControlRenderer = /** @class */ (() => {
      let ComboControlRenderer = class ComboControlRenderer extends ComboControl {
      };
      ComboControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'combo',
              storeType: combo_1.ComboStore.name,
              extendsData: false
          })
      ], ComboControlRenderer);
      return ComboControlRenderer;
  })();
  exports.ComboControlRenderer = ComboControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tYm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQ29tYm8udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIseUNBQXNDO0FBQ3RDLGlDQU1nQjtBQUVoQiw2Q0FBMEQ7QUFDMUQsc0VBQTREO0FBRTVELCtDQVE0QjtBQUM1QixvRUFBa0M7QUFDbEMseUNBQXVEO0FBQ3ZELCtEQUErQjtBQUMvQiw2RUFBNkM7QUFDN0MseURBQXFFO0FBQ3JFLHlDQUErQztBQUMvQyxpREFBd0M7QUFDeEMscUVBQXFDO0FBQ3JDLGtEQUE0QztBQUM1QyxxREFBd0M7QUFzTnhDLFNBQVMsUUFBUSxDQUFDLElBQVMsRUFBRSxNQUFxQjtJQUNoRCxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsR0FBVyxFQUFFLEVBQUU7UUFDOUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLDZCQUFlLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1QsQ0FBQztBQVlEOztJQUFBLE1BQXFCLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBcUI7UUE2RW5FLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBZGYsYUFBUSxHQUFlLEVBQUUsQ0FBQztZQUMxQix5QkFBb0IsR0FJZixFQUFFLENBQUM7WUFFUixTQUFJLEdBQWtCLEVBQUUsQ0FBQztZQUl6QixjQUFTLEdBQW9CLEVBQUUsQ0FBQztZQUNoQyxPQUFFLEdBQVcsYUFBSSxFQUFFLENBQUM7WUE0YXBCLFlBQU8sR0FFSCxFQUFFLENBQUM7WUFFUCxnQkFBVyxHQUFHLGlCQUFPLENBQUMsQ0FBQyxLQUFhLEVBQUUsRUFBRSxD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

});
