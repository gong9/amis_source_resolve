amis.define('src/components/LocationPicker.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LocationPicker = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  const BaiduMapPicker_1 = tslib_1.__importDefault(require("src/components/BaiduMapPicker.tsx"));
  const locale_1 = require("src/locale.tsx");
  let LocationPicker = /** @class */ (() => {
      var _a, _b, _c;
      class LocationPicker extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.domRef = react_1.default.createRef();
              this.state = {
                  isFocused: false,
                  isOpened: false
              };
          }
          handleKeyPress(e) {
              if (e.key === ' ') {
                  this.handleClick();
                  e.preventDefault();
              }
          }
          handleFocus() {
              this.setState({
                  isFocused: true
              });
          }
          handleBlur() {
              this.setState({
                  isFocused: true
              });
          }
          handleClick() {
              this.state.isOpened ? this.close() : this.open();
          }
          getTarget() {
              return this.domRef.current;
          }
          getParent() {
              var _a;
              return (_a = this.domRef.current) === null || _a === void 0 ? void 0 : _a.parentElement;
          }
          open(fn) {
              this.props.disabled ||
                  this.setState({
                      isOpened: true
                  }, fn);
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          clearValue(e) {
              e.preventDefault();
              e.stopPropagation();
              const onChange = this.props.onChange;
              onChange('');
          }
          handlePopOverClick(e) {
              e.stopPropagation();
              e.preventDefault();
          }
          handleChange(value) {
              if (value) {
                  value = Object.assign(Object.assign({}, value), { vendor: this.props.vendor });
              }
              this.props.onChange(value);
          }
          render() {
              var _a;
              const { classnames: cx, value, className, disabled, placeholder, clearable, popOverContainer, vendor, coordinatesType, ak } = this.props;
              const __ = this.props.translate;
              const { isFocused, isOpened } = this.state;
              return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: cx(`LocationPicker`, {
                      'is-disabled': disabled,
                      'is-focused': isFocused,
                      'is-active': isOpened
                  }, className), ref: this.domRef, onClick: this.handleClick },
                  value ? (react_1.default.createElement("span", { className: cx('LocationPicker-value') }, value.address)) : (react_1.default.createElement("span", { className: cx('LocationPicker-placeholder') }, __(placeholder))),
                  clearable && !disabled && value ? (react_1.default.createElement("a", { className: cx('LocationPicker-clear'), onClick: this.clearValue },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  react_1.default.createElement("a", { className: cx('LocationPicker-toggler') },
                      react_1.default.createElement(icons_1.Icon, { icon: "location", className: "icon" })),
                  react_1.default.createElement(Overlay_1.default, { target: this.getTarget, container: popOverContainer || this.getParent, rootClose: false, show: isOpened },
                      react_1.default.createElement(PopOver_1.default, { className: cx('LocationPicker-popover'), onHide: this.close, overlay: true, onClick: this.handlePopOverClick, style: { width: (_a = this.getTarget()) === null || _a === void 0 ? void 0 : _a.offsetWidth } }, vendor === 'baidu' ? (react_1.default.createElement(BaiduMapPicker_1.default, { ak: ak, value: value, coordinatesType: coordinatesType, onChange: this.handleChange })) : (react_1.default.createElement(Alert2_1.default, null, __('${vendor} 地图控件不支持', { vendor })))))));
          }
      }
      LocationPicker.defaultProps = {
          placeholder: 'LocationPicker.placeholder',
          clearable: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handleKeyPress", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handleClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "getTarget", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "getParent", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Function]),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "open", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "clearValue", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handlePopOverClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], LocationPicker.prototype, "handleChange", null);
      return LocationPicker;
  })();
  exports.LocationPicker = LocationPicker;
  const ThemedCity = theme_1.themeable(locale_1.localeable(LocationPicker));
  exports.default = ThemedCity;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb25QaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Mb2NhdGlvblBpY2tlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixvQ0FBNkQ7QUFDN0QsZ0VBQWdDO0FBQ2hDLGdFQUFnQztBQUNoQyxtQ0FBNkI7QUFDN0IsNENBQXlDO0FBQ3pDLDhEQUE4QjtBQUM5Qiw4RUFBOEM7QUFDOUMsc0NBQWtEO0FBeUJsRDs7SUFBQSxNQUFhLGNBQWUsU0FBUSxlQUFLLENBQUMsU0FHekM7UUFIRDs7WUFRRSxXQUFNLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM1RCxVQUFLLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLEtBQUs7Z0JBQ2hCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUM7UUFrS0osQ0FBQztRQS9KQyxjQUFjLENBQUMsQ0FBc0I7WUFDbkMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixDQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7YUFDcEI7UUFDSCxDQUFDO1FBR0QsV0FBVztZQUNULElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdELFVBQVU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxJQUFJO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFHRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25ELENBQUM7UUFH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

});
