amis.define('src/components/ColorPicker.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file ColorPicker
   * @description 颜色选择器组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorControl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const react_color_1 = require("node_modules/react-color/lib/index");
  const icons_1 = require("src/components/icons.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const locale_1 = require("src/locale.tsx");
  let ColorControl = /** @class */ (() => {
      class ColorControl extends react_1.default.PureComponent {
          constructor(props) {
              super(props);
              this.state = {
                  isOpened: false,
                  isFocused: false,
                  inputValue: this.props.value || ''
              };
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.focus = this.focus.bind(this);
              this.blur = this.blur.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.handleInputChange = this.handleInputChange.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.preview = react_1.default.createRef();
              this.input = react_1.default.createRef();
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value) {
                  this.setState({
                      inputValue: nextProps.value || ''
                  });
              }
          }
          handleFocus() {
              this.setState({
                  isFocused: true
              });
          }
          handleBlur() {
              this.setState({
                  isFocused: false,
                  inputValue: this.props.value
              });
          }
          focus() {
              this.input.current && this.input.current.focus();
          }
          blur() {
              this.input.current && this.input.current.blur();
          }
          open(fn) {
              if (this.props.disabled) {
                  return;
              }
              this.setState({
                  isOpened: true
              }, fn);
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          clearValue() {
              const { onChange, resetValue } = this.props;
              onChange(resetValue || '');
          }
          handleClick() {
              this.state.isOpened ? this.close() : this.open(this.focus);
          }
          handleInputChange(e) {
              if (!this.props.allowCustomColor) {
                  return;
              }
              const onChange = this.props.onChange;
              this.setState({
                  inputValue: e.currentTarget.value
              }, () => {
                  let isValidated = this.validateColor(this.state.inputValue);
                  if (isValidated) {
                      onChange(this.state.inputValue);
                  }
              });
          }
          validateColor(value) {
              if (value === '') {
                  return false;
              }
              if (value === 'inherit') {
                  return false;
              }
              if (value === 'transparent') {
                  return false;
              }
              let image = document.createElement('img');
              image.style.color = 'rgb(0, 0, 0)';
              image.style.color = value;
              if (image.style.color !== 'rgb(0, 0, 0)') {
                  return true;
              }
              image.style.color = 'rgb(255, 255, 255)';
              image.style.color = value;
              return image.style.color !== 'rgb(255, 255, 255)';
          }
          handleChange(color) {
              const { onChange, format
              // closeOnSelect
               } = this.props;
              if (format === 'rgba') {
                  onChange(`rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`);
              }
              else if (format === 'rgb') {
                  onChange(`rgb(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b})`);
              }
              else if (format === 'hsl') {
                  onChange(`hsl(${Math.round(color.hsl.h)}, ${Math.round(color.hsl.s * 100)}%, ${Math.round(color.hsl.l * 100)}%)`);
              }
              else {
                  onChange(color.hex);
              }
              // closeOnSelect && this.close();
          }
          render() {
              const { classPrefix: ns, className, value, placeholder, disabled, popOverContainer, format, clearable, placement, classnames: cx, presetColors, allowCustomColor } = this.props;
              const __ = this.props.translate;
              const isOpened = this.state.isOpened;
              const isFocused = this.state.isFocused;
              return (react_1.default.createElement("div", { className: cx(`ColorPicker`, {
                      'is-disabled': disabled,
                      'is-focused': isFocused
                  }, className) },
                  react_1.default.createElement("input", { ref: this.input, type: "text", autoComplete: "off", size: 10, className: cx('ColorPicker-input'), value: this.state.inputValue || '', placeholder: __(placeholder), disabled: disabled, onChange: this.handleInputChange, onFocus: this.handleFocus, onBlur: this.handleBlur, onClick: this.handleClick }),
                  clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('ColorPicker-clear') },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  react_1.default.createElement("span", { onClick: this.handleClick, className: cx('ColorPicker-preview') },
                      react_1.default.createElement("i", { ref: this.preview, className: `${ns}ColorPicker-previewIcon`, style: { background: this.state.inputValue || '#ccc' } })),
                  isOpened ? (react_1.default.createElement(Overlay_1.default, { placement: placement || 'auto', target: () => react_dom_1.findDOMNode(this), onHide: this.close, container: popOverContainer || (() => react_dom_1.findDOMNode(this)), rootClose: false, show: true },
                      react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: cx('ColorPicker-popover'), onHide: this.close, overlay: true }, allowCustomColor ? (react_1.default.createElement(react_color_1.SketchPicker, { disableAlpha: !!~['rgb', 'hex'].indexOf(format), color: value, presetColors: presetColors, onChangeComplete: this.handleChange })) : (react_1.default.createElement(react_color_1.GithubPicker, { color: value, colors: presetColors, onChangeComplete: this.handleChange }))))) : null));
          }
      }
      ColorControl.defaultProps = {
          format: 'hex',
          clearable: true,
          placeholder: 'ColorPicker.placeholder',
          allowCustomColor: true
          // closeOnSelect: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ColorControl.prototype, "validateColor", null);
      return ColorControl;
  })();
  exports.ColorControl = ColorControl;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ColorControl, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3JQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Db2xvclBpY2tlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFFMUIseUNBQXNDO0FBQ3RDLDZDQUFtRTtBQUNuRSxtQ0FBNkI7QUFDN0IsZ0VBQWdDO0FBQ2hDLG1EQUE4QztBQUM5QyxnRUFBZ0M7QUFDaEMsb0NBQTZEO0FBQzdELDRDQUF5QztBQUN6QyxzQ0FBa0Q7QUF3QmxEO0lBQUEsTUFBYSxZQUFhLFNBQVEsZUFBSyxDQUFDLGFBR3ZDO1FBaUJDLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBVmYsVUFBSyxHQUFHO2dCQUNOLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksRUFBRTthQUNuQyxDQUFDO1lBUUEsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxXQUFXLEdB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

});
