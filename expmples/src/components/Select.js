amis.define('src/components/Select.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Select
   * @description
   * @author fex
   * @date 2017-11-07
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SelectWithRemoteOptions = exports.Select = exports.normalizeOptions = exports.optionValueCompare = exports.matchOptionValue = exports.expandValue = exports.value2array = exports.Options = exports.Option = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const virtual_list_1 = tslib_1.__importDefault(require("src/components/virtual-list/index.tsx"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const downshift_1 = tslib_1.__importDefault(require("node_modules/downshift/dist/downshift.cjs"));
  const icons_1 = require("src/components/icons.tsx");
  // @ts-ignore
  const match_sorter_1 = tslib_1.__importDefault(require("node_modules/match-sorter/dist/match-sorter.cjs"));
  const helper_1 = require("src/utils/helper.ts");
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  const union_1 = tslib_1.__importDefault(require("node_modules/lodash/union"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const react_dom_1 = require("node_modules/react-dom/index");
  const theme_1 = require("src/theme.tsx");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const Input_1 = tslib_1.__importDefault(require("src/components/Input.tsx"));
  const locale_1 = require("src/locale.tsx");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const Schema_1 = require("src/Schema.ts");
  Object.defineProperty(exports, "Option", { enumerable: true, get: function () { return Schema_1.Option; } });
  Object.defineProperty(exports, "Options", { enumerable: true, get: function () { return Schema_1.Options; } });
  const WithRemoteOptions_1 = require("src/components/WithRemoteOptions.tsx");
  function value2array(value, props) {
      if (props.multi || props.multiple) {
          if (typeof value === 'string') {
              value = value.split(props.delimiter || ',');
          }
          if (!Array.isArray(value)) {
              if (value === null || value === undefined) {
                  return [];
              }
              value = [value];
          }
          return value
              .map((value) => expandValue(value, props.options, props.valueField))
              .filter((item) => item);
      }
      else if (Array.isArray(value)) {
          value = value[0];
      }
      let expandedValue = expandValue(value, props.options, props.valueField);
      return expandedValue ? [expandedValue] : [];
  }
  exports.value2array = value2array;
  function expandValue(value, options, valueField = 'value') {
      var _a;
      const valueType = typeof value;
      if (valueType !== 'string' &&
          valueType !== 'number' &&
          valueType !== 'boolean' &&
          valueType !== 'object') {
          return value;
      }
      if (!options) {
          return null;
      }
      if (valueType === 'object' &&
          value &&
          value.hasOwnProperty(valueField || 'value')) {
          value = (_a = value[valueField || 'value']) !== null && _a !== void 0 ? _a : '';
      }
      return helper_1.findTree(options, optionValueCompare(value, valueField || 'value'));
  }
  exports.expandValue = expandValue;
  function matchOptionValue(a, b, valueField = 'value') {
      return helper_1.isObject(a)
          ? a === b[valueField || 'value']
          : String(b[valueField || 'value']) === String(a);
  }
  exports.matchOptionValue = matchOptionValue;
  function optionValueCompare(a, valueField = 'value') {
      return (b) => matchOptionValue(a, b, valueField);
  }
  exports.optionValueCompare = optionValueCompare;
  function normalizeOptions(options, share = {
      values: [],
      options: []
  }) {
      if (typeof options === 'string') {
          return options.split(',').map(item => {
              const idx = share.values.indexOf(item);
              if (~idx) {
                  return share.options[idx];
              }
              const option = {
                  label: item,
                  value: item
              };
              share.values.push(option.value);
              share.options.push(option);
              return option;
          });
      }
      else if (Array.isArray(options) &&
          typeof options[0] === 'string') {
          return options.map(item => {
              const idx = share.values.indexOf(item);
              if (~idx) {
                  return share.options[idx];
              }
              const option = {
                  label: item,
                  value: item
              };
              share.values.push(option.value);
              share.options.push(option);
              return option;
          });
      }
      else if (Array.isArray(options)) {
          return options.map(item => {
              const value = item && item.value;
              const idx = value !== undefined ? share.values.indexOf(value) : -1;
              if (~idx) {
                  return share.options[idx];
              }
              const option = Object.assign(Object.assign({}, item), { value });
              if (typeof option.children !== 'undefined') {
                  option.children = normalizeOptions(option.children, share);
              }
              else if (value !== undefined) {
                  share.values.push(value);
                  share.options.push(option);
              }
              return option;
          });
      }
      else if (isPlainObject_1.default(options)) {
          return Object.keys(options).map(key => {
              const idx = share.values.indexOf(key);
              if (~idx) {
                  return share.options[idx];
              }
              const option = {
                  label: options[key],
                  value: key
              };
              share.values.push(option.value);
              share.options.push(option);
              return option;
          });
      }
      return [];
  }
  exports.normalizeOptions = normalizeOptions;
  const DownshiftChangeTypes = downshift_1.default.stateChangeTypes;
  let Select = /** @class */ (() => {
      class Select extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.menu = react_1.default.createRef();
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.toggle = this.toggle.bind(this);
              this.onBlur = this.onBlur.bind(this);
              this.onFocus = this.onFocus.bind(this);
              this.focus = this.focus.bind(this);
              this.inputRef = this.inputRef.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.handleInputChange = this.handleInputChange.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.clearSearchValue = this.clearSearchValue.bind(this);
              this.handleStateChange = this.handleStateChange.bind(this);
              this.handleKeyPress = this.handleKeyPress.bind(this);
              this.getTarget = this.getTarget.bind(this);
              this.toggleCheckAll = this.toggleCheckAll.bind(this);
              this.handleAddClick = this.handleAddClick.bind(this);
              this.handleEditClick = this.handleEditClick.bind(this);
              this.handleDeleteClick = this.handleDeleteClick.bind(this);
              // console.log('props.value', props.value);
              this.state = {
                  isOpen: props.defaultOpen || false,
                  isFocused: false,
                  inputValue: '',
                  highlightedIndex: -1,
                  selection: value2array(props.value, props),
                  itemHeight: 35
              };
          }
          componentDidMount() {
              const { loadOptions, options, multiple, defaultCheckAll, onChange, simpleValue } = this.props;
              let { selection } = this.state;
              if (multiple && defaultCheckAll && options.length) {
                  selection = union_1.default(options, selection);
                  this.setState({
                      selection: selection
                  });
                  // 因为等 State 设置完后再 onChange，会让 form 再 didMount 中的
                  // onInit 出去的数据没有包含这部分，所以从 state 回调中拿出来了
                  // 存在风险
                  onChange(simpleValue ? selection.map(item => item.value) : selection);
              }
              loadOptions && loadOptions('');
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              let fn = helper_1.noop;
              if (props.value !== prevProps.value ||
                  JSON.stringify(props.options) !== JSON.stringify(prevProps.options)) {
                  let selection;
                  if ((!prevProps.options || !prevProps.options.length) &&
                      props.options.length) {
                      const { selection: stateSelection } = this.state;
                      const { multiple, defaultCheckAll, options, onChange, simpleValue } = props;
                      if (multiple && defaultCheckAll && options.length) {
                          selection = union_1.default(options, stateSelection);
                          fn = () => onChange(simpleValue ? selection.map(item => item.value) : selection);
                      }
                      else {
                          selection = value2array(props.value, props);
                      }
                  }
                  else {
                      selection = value2array(props.value, props);
                  }
                  this.setState({
                      selection: selection
                  }, fn);
              }
          }
          open() {
              this.props.disabled ||
                  this.setState({
                      isOpen: true,
                      highlightedIndex: -1
                  }, () => setTimeout(this.focus, 500));
          }
          close() {
              this.setState({
                  isOpen: false
              });
          }
          toggle(e) {
              if (e &&
                  this.menu.current &&
                  this.menu.current.contains(e.target)) {
                  return;
              }
              this.props.disabled ||
                  this.setState({
                      isOpen: !this.state.isOpen,
                      highlightedIndex: -1
                  }, this.state.isOpen ? undefined : () => setTimeout(this.focus, 500));
          }
          onFocus(e) {
              this.props.disabled ||
                  this.state.isOpen ||
                  this.setState({
                      isFocused: true
                  }, this.focus);
              this.props.onFocus && this.props.onFocus(e);
          }
          onBlur(e) {
              this.setState({
                  isFocused: false
              });
              this.props.onBlur && this.props.onBlur(e);
          }
          focus() {
              this.input
                  ? this.input.focus()
                  : this.getTarget() && this.getTarget().focus();
          }
          blur() {
              this.input
                  ? this.input.blur()
                  : this.getTarget() && this.getTarget().blur();
          }
          getTarget() {
              if (!this.target) {
                  this.target = react_dom_1.findDOMNode(this);
              }
              return this.target;
          }
          inputRef(ref) {
              this.input = ref;
          }
          toggleCheckAll() {
              const { options, onChange, simpleValue } = this.props;
              let { selection } = this.state;
              const optionsValues = options.map(option => option.value);
              const selectionValues = selection.map(select => select.value);
              const checkedAll = optionsValues.every(option => selectionValues.indexOf(option) > -1);
              selection = checkedAll ? [] : options;
              onChange(simpleValue ? selection.map(item => item.value) : selection);
          }
          removeItem(index, e) {
              const { onChange, simpleValue, disabled } = this.props;
              if (disabled) {
                  return;
              }
              let { selection: value } = this.state;
              e && e.stopPropagation();
              value = Array.isArray(value) ? value.concat() : [value];
              value.splice(index, 1);
              onChange(simpleValue ? value.map(item => item.value) : value);
          }
          handleInputChange(evt) {
              const { loadOptions } = this.props;
              this.setState({
                  inputValue: evt.currentTarget.value
              }, () => loadOptions && loadOptions(this.state.inputValue));
          }
          handleChange(selectItem) {
              const { onChange, multiple, simpleValue, valueField } = this.props;
              let { selection } = this.state;
              if (multiple) {
                  const selectionValues = selection.map(item => item[valueField]);
                  selection = selection.concat();
                  const idx = selectionValues.indexOf(selectItem[valueField]);
                  if (~idx) {
                      selection.splice(idx, 1);
                  }
                  else {
                      selection.push(selectItem);
                  }
                  onChange(simpleValue ? selection.map(item => item[valueField]) : selection);
              }
              else {
                  onChange(simpleValue ? selectItem[valueField] : selectItem);
              }
          }
          handleStateChange(changes) {
              const { multiple, checkAll } = this.props;
              let update = {};
              switch (changes.type) {
                  case DownshiftChangeTypes.keyDownEnter:
                  case DownshiftChangeTypes.clickItem:
                      update = Object.assign(Object.assign({}, update), { isOpen: multiple ? true : false, isFocused: multiple && checkAll ? true : false });
                      break;
                  case DownshiftChangeTypes.controlledPropUpdatedSelectedItem:
                  case DownshiftChangeTypes.changeInput:
                      update.highlightedIndex = 0;
                      break;
                  case DownshiftChangeTypes.keyDownArrowDown:
                  case DownshiftChangeTypes.keyDownArrowUp:
                  case DownshiftChangeTypes.itemMouseEnter:
                      update = Object.assign(Object.assign({}, update), changes);
                      break;
              }
              if (Object.keys(update).length) {
                  this.setState(update);
              }
          }
          handleKeyPress(e) {
              if (this.props.multiple && e.key === ' ') {
                  this.toggle();
                  e.preventDefault();
              }
          }
          clearValue(e) {
              const onChange = this.props.onChange;
              e.preventDefault();
              e.stopPropagation();
              onChange(this.props.resetValue);
          }
          clearSearchValue() {
              const { loadOptions } = this.props;
              this.setState({
                  inputValue: ''
              }, () => loadOptions === null || loadOptions === void 0 ? void 0 : loadOptions(''));
          }
          handleAddClick() {
              const { onAdd } = this.props;
              onAdd && onAdd();
          }
          handleEditClick(e, item) {
              const { onEdit } = this.props;
              e.preventDefault();
              e.stopPropagation();
              onEdit && onEdit(item);
          }
          handleDeleteClick(e, item) {
              const { onDelete } = this.props;
              e.preventDefault();
              e.stopPropagation();
              onDelete && onDelete(item);
          }
          menuItemRef(ref) {
              ref && this.setState({ itemHeight: ref.offsetHeight });
          }
          renderValue({ inputValue, isOpen }) {
              const { multiple, placeholder, classPrefix: ns, labelField, disabled, translate: __ } = this.props;
              const selection = this.state.selection;
              // console.log('selection', selection);
              if (!selection.length) {
                  return (react_1.default.createElement("div", { key: "placeholder", className: `${ns}Select-placeholder` }, __(placeholder)));
              }
              return selection.map((item, index) => multiple ? (react_1.default.createElement("div", { className: `${ns}Select-value`, key: index },
                  react_1.default.createElement("span", { className: `${ns}Select-valueIcon ${disabled || item.disabled ? 'is-disabled' : ''}`, onClick: this.removeItem.bind(this, index) }, "\u00D7"),
                  react_1.default.createElement("span", { className: `${ns}Select-valueLabel` }, `${item[labelField || 'label']}`))) : (react_1.default.createElement("div", { className: `${ns}Select-value`, key: index }, `${item[labelField || 'label']}`)));
          }
          renderOuter({ selectedItem, getItemProps, highlightedIndex, inputValue, isOpen, getToggleButtonProps, getInputProps }) {
              const { popOverContainer, options, valueField, labelField, noResultsText, loadOptions, creatable, multiple, classnames: cx, checkAll, checkAllLabel, searchable, createBtnLabel, disabled, searchPromptText, editable, removable, overlayPlacement, translate: __, renderMenu } = this.props;
              const { selection } = this.state;
              let checkedAll = false;
              let checkedPartial = false;
              let filtedOptions = (inputValue && isOpen && !loadOptions
                  ? match_sorter_1.default(options, inputValue, {
                      keys: [labelField || 'label', valueField || 'value']
                  })
                  : options.concat()).filter((option) => !option.hidden && option.visible !== false);
              const selectionValues = selection.map(select => select[valueField]);
              if (multiple && checkAll) {
                  const optionsValues = options.map(option => option[valueField]);
                  checkedAll = optionsValues.every(option => selectionValues.indexOf(option) > -1);
                  checkedPartial = optionsValues.some(option => selectionValues.indexOf(option) > -1);
              }
              const itemHeight = this.state.itemHeight;
              // 渲染单个选项
              const renderItem = ({ index, style }) => {
                  const item = filtedOptions[index];
                  const checked = selectedItem === item || !!~selectionValues.indexOf(item[valueField]);
                  return (react_1.default.createElement("div", Object.assign({}, getItemProps({
                      key: typeof item.value === 'string'
                          ? `${item.label}-${item.value}`
                          : index,
                      index,
                      item,
                      disabled: item.disabled
                  }), { style: style, className: cx(`Select-option`, {
                          'is-disabled': item.disabled,
                          'is-highlight': highlightedIndex === index,
                          'is-active': checked
                      }) }),
                      removable ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon", onClick: (e) => this.handleDeleteClick(e, item) }))) : null,
                      editable ? (react_1.default.createElement("a", { "data-tooltip": "\u7F16\u8F91", "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon", onClick: (e) => this.handleEditClick(e, item) }))) : null,
                      renderMenu ? (renderMenu(item, {
                          multiple,
                          checkAll,
                          checked,
                          onChange: () => this.handleChange(item),
                          inputValue: inputValue || '',
                          searchable,
                          index
                      })) : checkAll || multiple ? (react_1.default.createElement(Checkbox_1.default, { checked: checked, trueValue: item.value, onChange: () => {
                              this.handleChange(item);
                          }, disabled: item.disabled },
                          item.disabled
                              ? item[labelField]
                              : Options_1.highlight(item[labelField], inputValue, cx('Select-option-hl')),
                          item.tip)) : (react_1.default.createElement("span", null,
                          item.disabled
                              ? item[labelField]
                              : Options_1.highlight(item[labelField], inputValue, cx('Select-option-hl')),
                          item.tip))));
              };
              const menu = (react_1.default.createElement("div", { ref: this.menu, className: cx('Select-menu') },
                  searchable ? (react_1.default.createElement("div", { className: cx(`Select-input`, {
                          'is-focused': this.state.isFocused
                      }) },
                      react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" }),
                      react_1.default.createElement(Input_1.default, Object.assign({}, getInputProps({
                          onFocus: this.onFocus,
                          onBlur: this.onBlur,
                          disabled: disabled,
                          placeholder: __(searchPromptText),
                          onChange: this.handleInputChange,
                          ref: this.inputRef
                      }))),
                      (inputValue === null || inputValue === void 0 ? void 0 : inputValue.length) ? (react_1.default.createElement("a", { onClick: this.clearSearchValue, className: cx('Select-clear') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null)) : null,
                  multiple && checkAll && filtedOptions.length ? (react_1.default.createElement("div", { className: cx('Select-option') },
                      react_1.default.createElement(Checkbox_1.default, { checked: checkedPartial, partial: checkedPartial && !checkedAll, onChange: this.toggleCheckAll }, __(checkAllLabel)))) : null,
                  react_1.default.createElement("div", { ref: this.menuItemRef, className: cx('Select-option invisible') },
                      react_1.default.createElement("span", null, "Placeholder")),
                  creatable && !disabled ? (react_1.default.createElement("a", { className: cx('Select-addBtn'), onClick: this.handleAddClick },
                      react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                      __(createBtnLabel))) : null,
                  filtedOptions.length ? (filtedOptions.length > 100 ? ( // 超过 100 行数据才启用 virtuallist 避免滚动条问题
                  react_1.default.createElement(virtual_list_1.default, { height: filtedOptions.length > 8
                          ? 266
                          : filtedOptions.length * itemHeight, itemCount: filtedOptions.length, itemSize: itemHeight, renderItem: renderItem })) : (filtedOptions.map((item, index) => {
                      return renderItem({ index });
                  }))) : (react_1.default.createElement("div", { className: cx('Select-noResult') }, __(noResultsText)))));
              return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || this.getTarget, target: this.getTarget, placement: overlayPlacement, show: true },
                  react_1.default.createElement(PopOver_1.default, { overlay: true, className: cx('Select-popover'), style: {
                          minWidth: this.target
                              ? this.target.getBoundingClientRect().width
                              : 'auto'
                      }, onHide: this.close }, menu)));
          }
          render() {
              const { classnames: cx, multiple, searchable, inline, className, value, loading, clearable, labelField, disabled, checkAll } = this.props;
              const selection = this.state.selection;
              const inputValue = this.state.inputValue;
              const resetValue = this.props.resetValue;
              return (react_1.default.createElement(downshift_1.default, { selectedItem: selection, highlightedIndex: this.state.highlightedIndex, isOpen: this.state.isOpen, inputValue: inputValue, onChange: 
                  /*展示 Checkbox 的时候，会出发多次 onChange 原因待查*/ multiple ||
                      checkAll
                      ? helper_1.noop
                      : this.handleChange, onStateChange: this.handleStateChange, itemToString: item => (item ? `${item[labelField]}` : '') }, (options) => {
                  const { isOpen } = options;
                  return (react_1.default.createElement("div", { tabIndex: disabled ? -1 : 0, onKeyPress: this.handleKeyPress, onClick: this.toggle, onFocus: this.onFocus, onBlur: this.onBlur, className: cx(`Select`, {
                          [`Select--multi`]: multiple,
                          [`Select--inline`]: inline,
                          [`Select--searchable`]: searchable,
                          'is-opened': isOpen,
                          'is-focused': this.state.isFocused,
                          'is-disabled': disabled
                      }, className) },
                      react_1.default.createElement("div", { className: cx(`Select-valueWrap`) }, this.renderValue(options)),
                      clearable &&
                          !disabled &&
                          (Array.isArray(value) ? value.length : value !== resetValue) ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('Select-clear') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      loading ? (react_1.default.createElement(Spinner_1.default, { show: true, icon: "reload", spinnerClassName: cx('Select-spinner') })) : null,
                      react_1.default.createElement("span", { className: cx('Select-arrow') },
                          react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })),
                      isOpen ? this.renderOuter(options) : null));
              }));
          }
      }
      Select.defaultProps = {
          multiple: false,
          clearable: true,
          creatable: false,
          createBtnLabel: 'Select.createLabel',
          searchPromptText: 'Select.searchPromptText',
          loadingPlaceholder: 'loading',
          noResultsText: 'noResult',
          clearAllText: 'Select.clearAll',
          clearValueText: 'Select.clear',
          placeholder: 'Select.placeholder',
          valueField: 'value',
          labelField: 'label',
          resetValue: '',
          inline: false,
          disabled: false,
          checkAll: false,
          checkAllLabel: 'Select.checkAll',
          defaultCheckAll: false,
          overlayPlacement: 'auto'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Select.prototype, "menuItemRef", null);
      return Select;
  })();
  exports.Select = Select;
  const enhancedSelect = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(Select, {
      value: 'onChange'
  })));
  exports.default = enhancedSelect;
  exports.SelectWithRemoteOptions = WithRemoteOptions_1.withRemoteOptions(enhancedSelect);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvU2VsZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7O0dBS0c7Ozs7QUFFSCxtREFBOEM7QUFDOUMsMERBQTBCO0FBQzFCLDBFQUF5QztBQUN6QyxnRUFBZ0M7QUFDaEMsZ0VBQWdDO0FBQ2hDLGtFQUErRDtBQUMvRCxtQ0FBd0M7QUFDeEMsYUFBYTtBQUNiLHdFQUF1QztBQUN2Qyw0Q0FBbUU7QUFFbkUsaUZBQWlEO0FBQ2pELGlFQUFpQztBQUNqQyx1REFBb0Q7QUFDcEQseUNBQXNDO0FBQ3RDLG9DQUE2RDtBQUM3RCxrRUFBa0M7QUFDbEMsNERBQTRCO0FBRTVCLHNDQUFrRDtBQUNsRCxnRUFBZ0M7QUFDaEMsc0NBQTBDO0FBR2xDLHVGQUhBLGVBQU0sT0FHQTtBQUFFLHdGQUhBLGdCQUFPLE9BR0E7QUFGdkIsMkRBQXNEO0FBa0N0RCxTQUFnQixXQUFXLENBQ3pCLEtBQXVDLEVBQ3ZDLEtBR0M7SUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUNqQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1NBQzdDO1FBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDekIsSUFBSSxLQUFLLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxTQUFTLEVBQUU7Z0JBQ3pDLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCxLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNqQjtRQUVELE9BQU8sS0FBSzthQUNULEdBQUcsQ0FBQyxDQUFDLEtBQVUs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

});
