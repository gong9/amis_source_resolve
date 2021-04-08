amis.define('src/renderers/Form/NestedSelect.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NestedSelectControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const Select_1 = require("src/components/Select.tsx");
  const react_dom_1 = require("node_modules/react-dom/index");
  const components_1 = require("src/components/index.tsx");
  const xor_1 = tslib_1.__importDefault(require("node_modules/lodash/xor"));
  const union_1 = tslib_1.__importDefault(require("node_modules/lodash/union"));
  let NestedSelectControl = /** @class */ (() => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      class NestedSelectControl extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpened: false,
                  isFocused: false,
                  inputValue: '',
                  stack: [this.props.options]
              };
          }
          domRef(ref) {
              this.target = ref;
          }
          componentDidUpdate(prevProps) {
              if (prevProps.options !== this.props.options) {
                  this.setState({
                      stack: [this.props.options]
                  });
              }
          }
          handleOutClick(e) {
              const { options } = this.props;
              e.defaultPrevented ||
                  this.setState({
                      isOpened: true
                  });
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          removeItem(index, e) {
              let { onChange, selectedOptions, joinValues, valueField, extractValue, delimiter, value } = this.props;
              e && e.stopPropagation();
              selectedOptions.splice(index, 1);
              if (joinValues) {
                  value = selectedOptions
                      .map(item => item[valueField || 'value'])
                      .join(delimiter || ',');
              }
              else if (extractValue) {
                  value = selectedOptions.map(item => item[valueField || 'value']);
              }
              onChange(value);
          }
          renderValue(item, key) {
              const { classnames: cx, labelField, options } = this.props;
              const ancestors = helper_1.getTreeAncestors(options, item, true);
              return (react_1.default.createElement("span", { className: cx('Select-valueLabel'), key: key }, `${ancestors
                  ? ancestors
                      .map(item => `${item[labelField || 'label']}`)
                      .join(' / ')
                  : item[labelField || 'label']}`));
          }
          handleOptionClick(option) {
              const { multiple, onChange, joinValues, extractValue, valueField } = this.props;
              if (multiple) {
                  return;
              }
              onChange(joinValues
                  ? option[valueField || 'value']
                  : extractValue
                      ? option[valueField || 'value']
                      : option);
              !multiple && this.close();
          }
          handleCheck(option, index) {
              const { onChange, selectedOptions, joinValues, delimiter, extractValue, withChildren, cascade, options } = this.props;
              const { stack } = this.state;
              let valueField = this.props.valueField || 'value';
              if (!Array.isArray(option) &&
                  option.children &&
                  option.children.length &&
                  typeof index === 'number') {
                  if (stack[index]) {
                      stack.splice(index + 1, 1, option.children);
                  }
                  else {
                      stack.push(option.children);
                  }
              }
              const items = selectedOptions;
              let value;
              // 三种情况：
              // 1.全选，option为数组
              // 2.单个选中，且有children
              // 3.单个选中，没有children
              if (Array.isArray(option)) {
                  option = withChildren ? helper_1.flattenTree(option) : option;
                  value = items.length === option.length ? [] : option;
              }
              else if (Array.isArray(option.children)) {
                  if (cascade) {
                      value = xor_1.default(items, [option]);
                  }
                  else if (withChildren) {
                      option = helper_1.flattenTree([option]);
                      const isEvery = option.every(opt => !!~items.indexOf(opt));
                      value = (isEvery ? xor_1.default : union_1.default)(items, option);
                  }
                  else {
                      value = items.filter(item => !~helper_1.flattenTree([option]).indexOf(item));
                      !~items.indexOf(option) && value.push(option);
                  }
              }
              else {
                  value = xor_1.default(items, [option]);
              }
              if (!cascade) {
                  let toCheck = option;
                  while (true) {
                      const parent = helper_1.getTreeParent(options, toCheck);
                      if (parent === null || parent === void 0 ? void 0 : parent.value) {
                          // 如果所有孩子节点都勾选了，应该自动勾选父级。
                          if (parent.children.every((child) => ~value.indexOf(child))) {
                              parent.children.forEach((child) => {
                                  const index = value.indexOf(child);
                                  if (~index && !withChildren) {
                                      value.splice(index, 1);
                                  }
                              });
                              value.push(parent);
                              toCheck = parent;
                              continue;
                          }
                      }
                      break;
                  }
              }
              onChange(joinValues
                  ? value.map(item => item[valueField]).join(delimiter)
                  : extractValue
                      ? value.map(item => item[valueField])
                      : value);
          }
          allChecked(options) {
              const { selectedOptions, withChildren } = this.props;
              return options.every(option => {
                  if (withChildren && option.children) {
                      return this.allChecked(option.children);
                  }
                  return selectedOptions.some(item => item === option);
              });
          }
          partialChecked(options) {
              return options.some(option => {
                  const childrenPartialChecked = option.children && this.partialChecked(option.children);
                  return (childrenPartialChecked ||
                      this.props.selectedOptions.some(item => item === option));
              });
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          onFocus(e) {
              this.props.disabled ||
                  this.state.isOpened ||
                  this.setState({
                      isFocused: true
                  });
          }
          onBlur(e) {
              this.setState({
                  isFocused: false
              });
          }
          getTarget() {
              if (!this.target) {
                  this.target = react_dom_1.findDOMNode(this);
              }
              return this.target;
          }
          handleKeyPress(e) {
              if (e.key === ' ') {
                  this.handleOutClick(e);
                  e.preventDefault();
              }
          }
          handleInputKeyDown(event) {
              const inputValue = this.state.inputValue;
              const { multiple, selectedOptions } = this.props;
              if (event.key === 'Backspace' &&
                  !inputValue &&
                  selectedOptions.length &&
                  multiple) {
                  this.removeItem(selectedOptions.length - 1);
              }
          }
          handleInputChange(inputValue) {
              const { options, labelField, valueField } = this.props;
              const regexp = helper_1.string2regExp(inputValue);
              let filtedOptions = inputValue && this.state.isOpened
                  ? helper_1.filterTree(options, option => regexp.test(option[labelField || 'label']) ||
                      regexp.test(option[valueField || 'value']) ||
                      !!(option.children && option.children.length), 1, true)
                  : options.concat();
              this.setState({
                  inputValue,
                  stack: [filtedOptions]
              });
          }
          handleResultChange(value) {
              const { joinValues, extractValue, delimiter, valueField, onChange, multiple } = this.props;
              let newValue = Array.isArray(value) ? value.concat() : [];
              if (!multiple && !newValue.length) {
                  onChange('');
                  return;
              }
              if (joinValues || extractValue) {
                  newValue = value.map(item => item[valueField || 'value']);
              }
              if (joinValues) {
                  newValue = newValue.join(delimiter || ',');
              }
              onChange(newValue);
          }
          renderOptions() {
              const { multiple, selectedOptions, classnames: cx, options: propOptions, disabled, checkAll, checkAllLabel, translate: __, labelField, cascade } = this.props;
              const valueField = this.props.valueField || 'value';
              const stack = this.state.stack;
              let partialChecked = this.partialChecked(propOptions);
              let allChecked = this.allChecked(propOptions);
              return (react_1.default.createElement(react_1.default.Fragment, null, stack.map((options, index) => (react_1.default.createElement("div", { key: index, className: cx('NestedSelect-menu') },
                  multiple && checkAll && index === 0 ? (react_1.default.createElement("div", { className: cx('NestedSelect-option', 'checkall') },
                      react_1.default.createElement(Checkbox_1.default, { size: "sm", onChange: this.handleCheck.bind(this, options), checked: partialChecked, partial: partialChecked && !allChecked }),
                      react_1.default.createElement("span", { onClick: this.handleCheck.bind(this, options) }, __(checkAllLabel)))) : null,
                  options.map((option, idx) => {
                      const ancestors = helper_1.getTreeAncestors(propOptions, option);
                      const parentChecked = ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(item => !!~selectedOptions.indexOf(item));
                      const uncheckable = cascade ? false : multiple && parentChecked;
                      const selfChecked = uncheckable || !!~selectedOptions.indexOf(option);
                      const parentDisabled = ancestors === null || ancestors === void 0 ? void 0 : ancestors.some(item => !!item.disabled);
                      let nodeDisabled = uncheckable || option.disabled || parentDisabled || !!disabled;
                      let selfChildrenChecked = !!(option.children && this.partialChecked(option.children));
                      return (react_1.default.createElement("div", { key: idx, className: cx('NestedSelect-option', {
                              'is-active': !nodeDisabled &&
                                  (selfChecked || (!cascade && selfChildrenChecked))
                          }), onMouseEnter: this.onMouseEnter.bind(this, option, index) },
                          multiple ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", onChange: this.handleCheck.bind(this, option, index), trueValue: option[valueField], checked: selfChecked || (!cascade && selfChildrenChecked), partial: !selfChecked, disabled: nodeDisabled })) : null,
                          react_1.default.createElement("div", { className: cx('NestedSelect-optionLabel', {
                                  'is-disabled': nodeDisabled
                              }), onClick: () => !nodeDisabled &&
                                  (multiple
                                      ? this.handleCheck(option, index)
                                      : this.handleOptionClick(option)) }, option[labelField || 'label']),
                          option.children && option.children.length ? (react_1.default.createElement("div", { className: cx('NestedSelect-optionArrowRight') },
                              react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))) : null));
                  }))))));
          }
          onMouseEnter(option, index, e) {
              let { stack } = this.state;
              index = index + 1;
              const children = option.children;
              if (children && children.length) {
                  if (stack[index]) {
                      stack.splice(index, 1, children);
                  }
                  else {
                      stack.push(children);
                  }
              }
              else {
                  stack[index] && stack.splice(index, 1);
              }
              this.setState({ stack: stack.slice(0, index + 1) });
          }
          renderOuter() {
              const { popOverContainer, classnames: cx } = this.props;
              let body = (react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: this.close },
                  react_1.default.createElement("div", { className: cx('NestedSelect-menuOuter') }, this.renderOptions())));
              return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || this.getTarget, target: this.getTarget, show: true },
                  react_1.default.createElement(PopOver_1.default, { className: cx('NestedSelect-popover') }, body)));
          }
          render() {
              const { className, disabled, classnames: cx, multiple, placeholder, translate: __, inline, searchable, autoComplete, selectedOptions, clearable, loading } = this.props;
              return (react_1.default.createElement("div", { className: cx('NestedSelectControl', className) },
                  react_1.default.createElement(components_1.ResultBox, { disabled: disabled, ref: this.domRef, placeholder: __(placeholder || '空'), className: cx(`NestedSelect`, {
                          'NestedSelect--inline': inline,
                          'NestedSelect--single': !multiple,
                          'NestedSelect--multi': multiple,
                          'NestedSelect--searchable': searchable,
                          'is-opened': this.state.isOpened,
                          'is-focused': this.state.isFocused
                      }), result: multiple
                          ? selectedOptions
                          : selectedOptions.length
                              ? this.renderValue(selectedOptions[0])
                              : '', onResultClick: this.handleOutClick, value: this.state.inputValue, onChange: this.handleInputChange, onResultChange: this.handleResultChange, itemRender: this.renderValue, onKeyPress: this.handleKeyPress, onFocus: this.onFocus, onBlur: this.onBlur, onKeyDown: this.handleInputKeyDown, clearable: clearable, allowInput: searchable, inputPlaceholder: '' }, loading ? react_1.default.createElement(components_1.Spinner, { size: "sm" }) : undefined),
                  this.state.isOpened ? this.renderOuter() : null));
          }
      }
      NestedSelectControl.defaultProps = {
          cascade: false,
          withChildren: false,
          searchPromptText: 'Select.searchPromptText',
          checkAll: true,
          checkAllLabel: '全选'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "domRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleOutClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "renderValue", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleOptionClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleCheck", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "onFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "onBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "getTarget", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _f : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleKeyPress", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_g = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _g : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleInputKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleInputChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_h = typeof Array !== "undefined" && Array) === "function" ? _h : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], NestedSelectControl.prototype, "handleResultChange", null);
      return NestedSelectControl;
  })();
  exports.default = NestedSelectControl;
  let NestedSelectControlRenderer = /** @class */ (() => {
      let NestedSelectControlRenderer = class NestedSelectControlRenderer extends NestedSelectControl {
      };
      NestedSelectControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'nested-select'
          })
      ], NestedSelectControlRenderer);
      return NestedSelectControlRenderer;
  })();
  exports.NestedSelectControlRenderer = NestedSelectControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVzdGVkU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL05lc3RlZFNlbGVjdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQiwrRUFBK0M7QUFDL0MsaUZBQWlEO0FBQ2pELCtFQUErQztBQUMvQyxtREFBZ0Q7QUFDaEQsa0RBQTRDO0FBQzVDLCtDQU80QjtBQUM1Qiw2Q0FJeUI7QUFDekIsb0RBQXdEO0FBQ3hELHlDQUFzQztBQUN0QyxpREFBb0Q7QUFDcEQsNkRBQTZCO0FBQzdCLGlFQUFpQztBQXVCakM7O0lBQUEsTUFBcUIsbUJBQW9CLFNBQVEsZUFBSyxDQUFDLFNBR3REO1FBSEQ7O1lBYUUsVUFBSyxHQUFzQjtnQkFDekIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFVBQVUsRUFBRSxFQUFFO2dCQUNkLEtBQUssRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2FBQzVCLENBQUM7UUF1Z0JKLENBQUM7UUFwZ0JDLE1BQU0sQ0FBQyxHQUFRO1lBQ2IsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDcEIsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQTRCO1lBQzdDLElBQUksU0FBUyxDQUFDLE9BQU8sS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDNUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztpQkFDNUIsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBR0QsY0FBYyxDQUFDLENBQXdCO1lBQ3JDLE1BQU0sRUFBQyxPQUFPLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzdCLENBQUMsQ0FB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

});
