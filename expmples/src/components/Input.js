amis.define('src/components/Input.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 这个 Input 与系统默认的 input 不同的地方在于，
   * 中文输入过程中不会触发 onChange 事件。对于 autoComplete
   * 功能很有必要。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  let InputInner = /** @class */ (() => {
      var _a, _b;
      class InputInner extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.isOnComposition = false;
              this.state = { value: this.props.value };
          }
          componentWillReceiveProps(nextProps) {
              if (this.props.value !== nextProps.value) {
                  this.setState({
                      value: nextProps.value
                  });
              }
          }
          handleComposition(e) {
              this.isOnComposition = e.type !== 'compositionend';
              if (!this.isOnComposition) {
                  this.handleChange(e);
              }
          }
          handleChange(e) {
              const { onChange } = this.props;
              const value = e.currentTarget.value;
              this.isOnComposition || (onChange && onChange(e));
              this.setState({
                  value
              });
          }
          render() {
              const _a = this.props, { forwardedRef } = _a, rest = tslib_1.__rest(_a, ["forwardedRef"]);
              return (react_1.default.createElement("input", Object.assign({ type: "text" }, rest, { value: this.state.value, ref: forwardedRef, onChange: this.handleChange, onCompositionStart: this.handleComposition, onCompositionUpdate: this.handleComposition, onCompositionEnd: this.handleComposition })));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.CompositionEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputInner.prototype, "handleComposition", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], InputInner.prototype, "handleChange", null);
      return InputInner;
  })();
  exports.default = react_1.default.forwardRef((props, ref) => {
      return react_1.default.createElement(InputInner, Object.assign({}, props, { forwardedRef: ref }));
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9JbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7Ozs7R0FJRztBQUNILDBEQUEwQjtBQUMxQiw0Q0FBeUM7QUFXekM7O0lBQUEsTUFBTSxVQUFXLFNBQVEsZUFBSyxDQUFDLFNBQWlDO1FBQWhFOztZQUNFLG9CQUFlLEdBQVksS0FBSyxDQUFDO1lBQ2pDLFVBQUssR0FBRyxFQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDO1FBNkNwQyxDQUFDO1FBM0NDLHlCQUF5QixDQUFDLFNBQXFCO1lBQzdDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLEtBQUssRUFBRTtnQkFDeEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixLQUFLLEVBQUUsU0FBUyxDQUFDLEtBQUs7aUJBQ3ZCLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUdELGlCQUFpQixDQUFDLENBQTJDO1lBQzNELElBQUksQ0FBQyxlQUFlLEdBQUcsQ0FBQyxDQUFDLElBQUksS0FBSyxnQkFBZ0IsQ0FBQztZQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRTtnQkFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFRLENBQUMsQ0FBQzthQUM3QjtRQUNILENBQUM7UUFHRCxZQUFZLENBQUMsQ0FBc0M7WUFDakQsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFFcEMsSUFBSSxDQUFDLGVBQWUsSUFBSSxDQUFDLFFBQVEsSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLEtBQUs7YUFDTixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sS0FBMEIsSUFBSSxDQUFDLEtBQUssRUFBcEMsRUFBQyxZQUFZLE9BQXVCLEVBQWxCLElBQUksc0JBQXRCLGdCQUF1QixDQUFhLENBQUM7WUFFM0MsT0FBTyxDQUNMLHVEQUNFLElBQUksRUFBQyxNQUFNLElBQ1AsSUFBSSxJQUNSLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFDdkIsR0FBRyxFQUFFLFlBQVksRUFDakIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLGtCQUFrQixFQUFFLElBQUksQ0FBQyxpQkFBaUIsRUFDMUMsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUMzQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsaUJBQWlCLElBQ3hDLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FDRjtJQWxDQztRQURDLGlCQUFROztxRUFDWSxlQUFLLG9CQUFMLGVBQUssQ0FBQyxnQkFBZ0I7O3VEQUsxQztJQUdEO1FBREMsaUJBQVE7O3FFQUNPLGVBQUssb0JBQUwsZUFBSyxDQUFDLFdBQVc7O2tEQVFoQztJQWtCSCxpQkFBQztLQUFBO0FBRUQsa0JBQWUsZUFBSyxDQUFDLFVBQVUsQ0FBbUIsQ0FBQyxLQUFLLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDL0QsT0FBTyw4QkFBQyxVQUFVLG9CQUFLLEtBQUssSUFBRSxZQUFZLEVBQUUsR0FBRyxJQUFJLENBQUM7QUFDdEQsQ0FBQyxDQUVBLENBQUMifQ==

});
