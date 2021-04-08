amis.define('src/components/ResultBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ResultBox = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const icons_1 = require("src/components/icons.tsx");
  const Input_1 = tslib_1.__importDefault(require("src/components/Input.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const locale_1 = require("src/locale.tsx");
  let ResultBox = /** @class */ (() => {
      var _a, _b, _c;
      class ResultBox extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isFocused: false
              };
              this.inputRef = react_1.default.createRef();
          }
          focus() {
              var _a;
              (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
          }
          blur() {
              var _a;
              (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.blur();
          }
          clearValue(e) {
              e.preventDefault();
              const onResultChange = this.props.onResultChange;
              onResultChange && onResultChange([]);
          }
          handleFocus(e) {
              const onFocus = this.props.onFocus;
              onFocus && onFocus(e);
              this.setState({
                  isFocused: true
              });
          }
          handleBlur(e) {
              const onBlur = this.props.onBlur;
              onBlur && onBlur(e);
              this.setState({
                  isFocused: false
              });
          }
          removeItem(e) {
              e.stopPropagation();
              e.preventDefault();
              const { result, onResultChange } = this.props;
              const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
              const newResult = Array.isArray(result) ? result.concat() : [];
              newResult.splice(index, 1);
              onResultChange && onResultChange(newResult);
          }
          handleChange(e) {
              const { onChange } = this.props;
              onChange === null || onChange === void 0 ? void 0 : onChange(e.currentTarget.value);
          }
          render() {
              const _a = this.props, { className, classnames: cx, classPrefix, clearable, disabled, hasError, result, value, placeholder, children, itemRender, allowInput, inputPlaceholder, onResultChange, onChange, onResultClick, translate: __, locale, onKeyPress, onFocus, onBlur } = _a, rest = tslib_1.__rest(_a, ["className", "classnames", "classPrefix", "clearable", "disabled", "hasError", "result", "value", "placeholder", "children", "itemRender", "allowInput", "inputPlaceholder", "onResultChange", "onChange", "onResultClick", "translate", "locale", "onKeyPress", "onFocus", "onBlur"]);
              const isFocused = this.state.isFocused;
              return (react_1.default.createElement("div", { className: cx('ResultBox', className, isFocused ? 'is-focused' : '', disabled ? 'is-disabled' : '', hasError ? 'is-error' : '', onResultClick ? 'is-clickable' : ''), onClick: onResultClick, tabIndex: !allowInput && !disabled && onFocus ? 0 : -1, onKeyPress: allowInput ? undefined : onKeyPress, onFocus: allowInput ? undefined : onFocus, onBlur: allowInput ? undefined : onBlur },
                  Array.isArray(result) && result.length ? (result.map((item, index) => (react_1.default.createElement("div", { className: cx('ResultBox-value'), key: index },
                      react_1.default.createElement("span", { className: cx('ResultBox-valueLabel') }, itemRender(item)),
                      !disabled ? (react_1.default.createElement("a", { "data-index": index, onClick: this.removeItem },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null)))) : result && !Array.isArray(result) ? (react_1.default.createElement("span", { className: cx('ResultBox-singleValue') }, result)) : allowInput && !disabled ? null : (react_1.default.createElement("span", { className: cx('ResultBox-placeholder') }, __(placeholder || 'placeholder.noData'))),
                  allowInput && !disabled ? (react_1.default.createElement(Input_1.default, Object.assign({}, rest, { onKeyPress: onKeyPress, ref: this.inputRef, value: value || '', onChange: this.handleChange, placeholder: __(Array.isArray(result) && result.length
                          ? inputPlaceholder
                          : placeholder), onFocus: this.handleFocus, onBlur: this.handleBlur }))) : null,
                  children,
                  clearable &&
                      !disabled &&
                      (Array.isArray(result) ? result.length : result) ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('ResultBox-clear') },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null));
          }
      }
      ResultBox.defaultProps = {
          clearable: false,
          placeholder: 'placeholder.noData',
          inputPlaceholder: 'placeholder.enter',
          itemRender: (option) => (react_1.default.createElement("span", null, `${option.scopeLabel || ''}${option.label}`))
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultBox.prototype, "clearValue", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultBox.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultBox.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultBox.prototype, "removeItem", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultBox.prototype, "handleChange", null);
      return ResultBox;
  })();
  exports.ResultBox = ResultBox;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ResultBox, {
      value: 'onChange',
      result: 'onResultChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdWx0Qm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvUmVzdWx0Qm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsb0NBQStDO0FBQy9DLDBEQUEwQjtBQUUxQixtREFBOEM7QUFDOUMsbUNBQTZCO0FBQzdCLDREQUE0QjtBQUM1Qiw0Q0FBeUM7QUFDekMsc0NBQWtEO0FBZWxEOztJQUFBLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUF5QjtRQUE5RDs7WUFhRSxVQUFLLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQztZQUVGLGFBQVEsR0FBeUIsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBa0pyRCxDQUFDO1FBaEpDLEtBQUs7O1lBQ0gsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sMENBQUUsS0FBSyxHQUFHO1FBQ2pDLENBQUM7UUFFRCxJQUFJOztZQUNGLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLDBDQUFFLElBQUksR0FBRztRQUNoQyxDQUFDO1FBR0QsVUFBVSxDQUFDLENBQXdCO1lBQ2pDLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNuQixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQztZQUNqRCxjQUFjLElBQUksY0FBYyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZDLENBQUM7UUFHRCxXQUFXLENBQUMsQ0FBTTtZQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdELFVB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

});
