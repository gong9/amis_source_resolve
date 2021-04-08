amis.define('src/components/InputBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InputBox = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const Input_1 = tslib_1.__importDefault(require("src/components/Input.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  let InputBox = /** @class */ (() => {
      var _a;
      class InputBox extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isFocused: false
              };
          }
          clearValue(e) {
              e.preventDefault();
              const onClear = this.props.onChange;
              const onChange = this.props.onChange;
              onClear === null || onClear === void 0 ? void 0 : onClear(e);
              onChange === null || onChange === void 0 ? void 0 : onChange('');
          }
          handleChange(e) {
              const onChange = this.props.onChange;
              onChange && onChange(e.currentTarget.value);
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
          render() {
              const _a = this.props, { className, classnames: cx, classPrefix, clearable, disabled, hasError, value, placeholder, prefix: result, children } = _a, rest = tslib_1.__rest(_a, ["className", "classnames", "classPrefix", "clearable", "disabled", "hasError", "value", "placeholder", "prefix", "children"]);
              const isFocused = this.state.isFocused;
              return (react_1.default.createElement("div", { className: cx('InputBox', className, isFocused ? 'is-focused' : '', disabled ? 'is-disabled' : '', hasError ? 'is-error' : '', rest.onClick ? 'is-clickable' : '') },
                  result,
                  react_1.default.createElement(Input_1.default, Object.assign({}, rest, { value: value || '', onChange: this.handleChange, placeholder: placeholder, onFocus: this.handleFocus, onBlur: this.handleBlur, size: 12 })),
                  children,
                  clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('InputBox-clear') },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null));
          }
      }
      InputBox.defaultProps = {
          clearable: true,
          placeholder: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputBox.prototype, "clearValue", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputBox.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputBox.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputBox.prototype, "handleBlur", null);
      return InputBox;
  })();
  exports.InputBox = InputBox;
  exports.default = theme_1.themeable(InputBox);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRCb3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9JbnB1dEJveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixvQ0FBK0M7QUFDL0MsNERBQTRCO0FBQzVCLDRDQUF5QztBQUN6QyxtQ0FBNkI7QUFxQjdCOztJQUFBLE1BQWEsUUFBUyxTQUFRLGVBQUssQ0FBQyxTQUF1QztRQUEzRTs7WUFNRSxVQUFLLEdBQUc7Z0JBQ04sU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQztRQXFGSixDQUFDO1FBbEZDLFVBQVUsQ0FBQyxDQUFNO1lBQ2YsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3BDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3JDLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRyxDQUFDLEVBQUU7WUFDYixRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUcsRUFBRSxFQUFFO1FBQ2pCLENBQUM7UUFHRCxZQUFZLENBQUMsQ0FBc0M7WUFDakQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDckMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlDLENBQUM7UUFHRCxXQUFXLENBQUMsQ0FBTTtZQUNoQixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdELFVBQVUsQ0FBQyxDQUFNO1lBQ2YsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7WUFDakMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxLQVlGLElBQUksQ0FBQyxLQUFLLEVBWlIsRUFDSixTQUFTLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxXQUFXLEVBQ1gsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEVBQ1IsS0FBSyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQUUsTUFBTSxFQUNkLFFBQVEsT0FFSSxFQURULElBQUksc0JBWEgsNkhBWUwsQ0FBYSxDQUFDO1lBQ2YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFFdkMsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUM3QixRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUM3QixRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUMxQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDbkM7Z0JBRUEsTUFBTTtnQkFFUCw4QkFBQyxlQUFLLG9CQUNBLElBQUksSUFDUixLQUFLLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFDdkIsSUFBSSxFQUFFLEVBQUUsSUFDUjtnQkFFRCxRQUFRO2dCQUVSLFNBQVMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ2pDLHFDQUFHLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUM7b0JBQzFELDhCQUFDLFlBQUksSUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEdBQUcsQ0FDcEMsQ0FDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUEzRk0scUJBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsSUFBSTtRQUNmLFdBQVcsRUFBRSxFQUFFO0tBQ2hCLENBQUM7SUFPRjtRQURDLGlCQUFROzs7OzhDQVFSO0lBR0Q7UUFEQyxpQkFBUTs7cUVBQ08sZUFBSyxvQkFBTCxlQUFLLENBQUMsV0FBVzs7Z0RBR2hDO0lBR0Q7UUFEQyxpQkFBUTs7OzsrQ0FPUjtJQUdEO1FBREMsaUJBQVE7Ozs7OENBT1I7SUFtREgsZUFBQztLQUFBO0FBN0ZZLDRCQUFRO0FBK0ZyQixrQkFBZSxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDIn0=

});
