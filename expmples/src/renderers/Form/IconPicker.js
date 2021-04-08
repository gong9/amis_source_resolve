amis.define('src/renderers/Form/IconPicker.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.IconPickerControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  // @ts-ignore
  const match_sorter_1 = tslib_1.__importDefault(require("node_modules/match-sorter/dist/match-sorter.cjs"));
  const keycode_1 = tslib_1.__importDefault(require("node_modules/keycode/index"));
  const downshift_1 = tslib_1.__importStar(require("node_modules/downshift/dist/downshift.cjs"));
  const helper_1 = require("src/utils/helper.ts");
  const IconPickerIcons_1 = require("src/renderers/Form/IconPickerIcons.tsx");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  let IconPickerControl = /** @class */ (() => {
      var _a, _b, _c;
      class IconPickerControl extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpen: false,
                  inputValue: '',
                  isFocused: false,
                  vendorIndex: 0
              };
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value) {
                  this.setState({
                      inputValue: ''
                  });
              }
          }
          changeVendor(index) {
              this.setState({
                  vendorIndex: index
              }, this.formatOptions);
          }
          formatOptions() {
              let vendorIndex = this.state.vendorIndex || 0;
              let { prefix, icons } = IconPickerIcons_1.ICONS[vendorIndex];
              return icons.map((icon) => ({
                  label: prefix + icon,
                  value: prefix + icon
              }));
          }
          getVendors() {
              return IconPickerIcons_1.ICONS.map(icons => icons.name);
          }
          inputRef(ref) {
              this.input = ref;
          }
          focus() {
              if (!this.input) {
                  return;
              }
              this.input.focus();
              const len = this.input.value.length;
              len && this.input.setSelectionRange(len, len);
          }
          handleClick() {
              this.focus();
              this.setState({
                  isOpen: true
              });
          }
          handleFocus(e) {
              this.setState({
                  isOpen: true,
                  isFocused: true
              });
              this.props.onFocus && this.props.onFocus(e);
          }
          handleBlur(e) {
              const { onBlur, trimContents, value, onChange } = this.props;
              this.setState({
                  isFocused: false
              }, () => {
                  if (trimContents && value && typeof value === 'string') {
                      onChange(value.trim());
                  }
              });
              onBlur && onBlur(e);
          }
          handleInputChange(evt) {
              let value = evt.currentTarget.value;
              this.setState({
                  inputValue: value
              });
          }
          handleKeyDown(evt) {
              const code = keycode_1.default(evt.keyCode);
              if (code !== 'backspace') {
                  return;
              }
              const { onChange } = this.props;
              if (!this.state.inputValue) {
                  onChange('');
                  this.setState({
                      inputValue: ''
                  });
              }
          }
          handleChange(value) {
              const { onChange } = this.props;
              onChange(value);
              this.setState({
                  isFocused: false,
                  inputValue: ''
              });
          }
          handleStateChange(changes) {
              switch (changes.type) {
                  case downshift_1.default.stateChangeTypes.itemMouseEnter:
                  case downshift_1.default.stateChangeTypes.changeInput:
                      this.setState({
                          isOpen: true
                      });
                      break;
                  default:
                      const state = {};
                      if (typeof changes.isOpen !== 'undefined') {
                          state.isOpen = changes.isOpen;
                      }
                      if (this.state.isOpen && changes.isOpen === false) {
                          state.inputValue = '';
                      }
                      this.setState(state);
                      break;
              }
          }
          renderFontIcons() {
              const { className, inputOnly, placeholder, classnames: cx, name, value, noDataTip, translate: __ } = this.props;
              const options = this.formatOptions();
              const vendors = this.getVendors();
              return (react_1.default.createElement(downshift_1.default, { isOpen: this.state.isOpen, inputValue: this.state.inputValue, onChange: this.handleChange, onOuterClick: this.handleBlur, onStateChange: this.handleStateChange, selectedItem: [value] }, ({ getInputProps, getItemProps, isOpen, inputValue }) => {
                  let filteredOptions = inputValue && isOpen
                      ? match_sorter_1.default(options, inputValue, { keys: ['label', 'value'] })
                      : options;
                  return (react_1.default.createElement("div", { className: cx(`IconPickerControl-input IconPickerControl-input--withAC`, inputOnly ? className : '', {
                          'is-opened': isOpen
                      }), onClick: this.handleClick },
                      react_1.default.createElement("div", { className: cx('IconPickerControl-valueWrap') },
                          placeholder && !value && !this.state.inputValue ? (react_1.default.createElement("div", { className: cx('IconPickerControl-placeholder') }, placeholder)) : null,
                          !value || (inputValue && isOpen) ? null : (react_1.default.createElement("div", { className: cx('IconPickerControl-value') },
                              react_1.default.createElement("i", { className: cx(value) }),
                              value)),
                          react_1.default.createElement("input", Object.assign({}, getInputProps({
                              name,
                              ref: this.inputRef,
                              onFocus: this.handleFocus,
                              onChange: this.handleInputChange,
                              onKeyDown: this.handleKeyDown,
                              value: this.state.inputValue
                          }), { autoComplete: "off", size: 10 }))),
                      isOpen ? (react_1.default.createElement("div", { className: cx('IconPickerControl-sugsPanel') },
                          vendors.length > 1 ? (react_1.default.createElement("div", { className: cx('IconPickerControl-tabs') }, vendors.map((vendor, index) => (react_1.default.createElement("div", { className: cx('IconPickerControl-tab', {
                                  active: this.state.vendorIndex === index
                              }), onClick: () => this.changeVendor(index), key: index }, vendor))))) : null,
                          filteredOptions.length ? (react_1.default.createElement("div", { className: cx('IconPickerControl-sugs', vendors.length > 1
                                  ? 'IconPickerControl-multiVendor'
                                  : 'IconPickerControl-singleVendor') }, filteredOptions.map((option, index) => (react_1.default.createElement("div", Object.assign({}, getItemProps({
                              item: option.value,
                              className: cx(`IconPickerControl-sugItem`, {
                                  'is-active': value === option.value
                              })
                          }), { key: index }),
                              react_1.default.createElement("i", { className: cx(`${option.value}`), title: `${option.value}` })))))) : (react_1.default.createElement("div", { className: cx(vendors.length > 1
                                  ? 'IconPickerControl-multiVendor'
                                  : 'IconPickerControl-singleVendor') }, __(noDataTip))))) : null));
              }));
          }
          render() {
              const { className, classPrefix: ns, inputOnly } = this.props;
              let input = this.renderFontIcons();
              if (inputOnly) {
                  return input;
              }
              return (react_1.default.createElement("div", { className: classnames_1.default(className, `${ns}IconPickerControl`, {
                      'is-focused': this.state.isFocused
                  }) }, input));
          }
      }
      IconPickerControl.defaultProps = {
          resetValue: '',
          placeholder: '',
          noDataTip: '未找到匹配的图标'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "changeVendor", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "formatOptions", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "getVendors", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "inputRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "focus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleInputChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof downshift_1.StateChangeOptions !== "undefined" && downshift_1.StateChangeOptions) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IconPickerControl.prototype, "handleStateChange", null);
      return IconPickerControl;
  })();
  exports.default = IconPickerControl;
  let IconPickerControlRenderer = /** @class */ (() => {
      let IconPickerControlRenderer = class IconPickerControlRenderer extends IconPickerControl {
      };
      IconPickerControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'icon-picker'
          })
      ], IconPickerControlRenderer);
      return IconPickerControlRenderer;
  })();
  exports.IconPickerControlRenderer = IconPickerControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvblBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9JY29uUGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9FQUE0QjtBQUM1QixhQUFhO0FBQ2Isd0VBQXVDO0FBQ3ZDLDhEQUE4QjtBQUM5QiwrREFBd0Q7QUFDeEQsK0NBQTRDO0FBQzVDLHVEQUF3QztBQUN4QyxpQ0FBbUU7QUEwQm5FOztJQUFBLE1BQXFCLGlCQUFrQixTQUFRLGVBQUssQ0FBQyxhQUdwRDtRQUhEOztZQU1FLFVBQUssR0FBb0I7Z0JBQ3ZCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixXQUFXLEVBQUUsQ0FBQzthQUNmLENBQUM7UUFzVEosQ0FBQztRQTNTQyx5QkFBeUIsQ0FBQyxTQUEwQjtZQUNsRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLFVBQVUsRUFBRSxFQUFFO2lCQUNmLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUdELFlBQVksQ0FBQyxLQUFhO1lBQ3hCLElBQUksQ0FBQyxRQUFRLENBQ1g7Z0JBQ0UsV0FBVyxFQUFFLEtBQUs7YUFDbkIsRUFDRCxJQUFJLENBQUMsYUFBYSxDQUNuQixDQUFDO1FBQ0osQ0FBQztRQUdELGFBQWE7WUFDWCxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxDQUFDLENBQUM7WUFDOUMsSUFBSSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUMsR0FBRyx1QkFBSyxDQUFDLFdBQVcsQ0FB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

});
