amis.define('src/renderers/Form/Textarea.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TextAreaControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Textarea_1 = tslib_1.__importDefault(require("src/components/Textarea.tsx"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const helper_1 = require("src/utils/helper.ts");
  let TextAreaControl = /** @class */ (() => {
      var _a, _b, _c;
      class TextAreaControl extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.inputRef = (ref) => (this.input = react_dom_1.findDOMNode(ref));
          }
          focus() {
              if (!this.input) {
                  return;
              }
              this.input.focus();
              // 光标放到最后
              const len = this.input.value.length;
              len && this.input.setSelectionRange(len, len);
          }
          handleChange(e) {
              const { onChange } = this.props;
              let value = e.currentTarget.value;
              onChange(value);
          }
          handleFocus(e) {
              const { onFocus } = this.props;
              onFocus && onFocus(e);
          }
          handleBlur(e) {
              const { onBlur, trimContents, value, onChange } = this.props;
              if (trimContents && value && typeof value === 'string') {
                  onChange(value.trim());
              }
              onBlur && onBlur(e);
          }
          render() {
              const { className, classPrefix: ns, value, type, placeholder, disabled, minRows, maxRows, readOnly, name } = this.props;
              return (react_1.default.createElement(Textarea_1.default, { autoComplete: "off", ref: this.inputRef, name: name, disabled: disabled, type: type, className: classnames_1.default(`${ns}TextareaControl`, className), value: typeof value === 'undefined' || value === null
                      ? ''
                      : typeof value === 'string'
                          ? value
                          : JSON.stringify(value), placeholder: placeholder, autoCorrect: "off", spellCheck: "false", readOnly: readOnly, minRows: minRows, maxRows: maxRows, onChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur }));
          }
      }
      TextAreaControl.defaultProps = {
          minRows: 3,
          maxRows: 20,
          trimContents: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TextAreaControl.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.FocusEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TextAreaControl.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.FocusEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TextAreaControl.prototype, "handleBlur", null);
      return TextAreaControl;
  })();
  exports.default = TextAreaControl;
  let TextAreaControlRenderer = /** @class */ (() => {
      let TextAreaControlRenderer = class TextAreaControlRenderer extends TextAreaControl {
      };
      TextAreaControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'textarea'
          })
      ], TextAreaControlRenderer);
      return TextAreaControlRenderer;
  })();
  exports.TextAreaControlRenderer = TextAreaControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dGFyZWEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vVGV4dGFyZWEudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLG9FQUE0QjtBQUM1QixpRkFBaUQ7QUFDakQseUNBQXNDO0FBQ3RDLCtDQUE0QztBQWlDNUM7O0lBQUEsTUFBcUIsZUFBZ0IsU0FBUSxlQUFLLENBQUMsU0FHbEQ7UUFIRDs7WUFXRSxhQUFRLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssR0FBRyx1QkFBVyxDQUFDLEdBQUcsQ0FBcUIsQ0FBQyxDQUFDO1FBa0YvRSxDQUFDO1FBaEZDLEtBQUs7WUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZixPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBRW5CLFNBQVM7WUFDVCxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDcEMsR0FBRyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFHRCxZQUFZLENBQUMsQ0FBc0M7WUFDakQsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFOUIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFFbEMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2xCLENBQUM7UUFHRCxXQUFXLENBQUMsQ0FBd0M7WUFDbEQsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7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

});
