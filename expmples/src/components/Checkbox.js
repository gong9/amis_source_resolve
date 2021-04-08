amis.define('src/components/Checkbox.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Checkbox
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Checkbox = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const preventEvent = (e) => e.stopPropagation();
  let Checkbox = /** @class */ (() => {
      var _a;
      class Checkbox extends react_1.default.Component {
          handleCheck(e) {
              const { trueValue, falseValue, onChange } = this.props;
              if (!onChange) {
                  return;
              }
              onChange(e.currentTarget.checked ? trueValue : falseValue);
          }
          render() {
              let { size, className, classnames: cx, value, label, partial, trueValue, children, disabled, description, readOnly, checked, type, name, labelClassName } = this.props;
              return (react_1.default.createElement("label", { className: cx(`Checkbox Checkbox--${type}`, className, {
                      'Checkbox--full': !partial,
                      [`Checkbox--${size}`]: size
                  }) },
                  react_1.default.createElement("input", { type: type, checked: typeof checked !== 'undefined'
                          ? checked
                          : typeof value === 'undefined'
                              ? value
                              : value == trueValue, onChange: this.handleCheck, onClick: preventEvent // 当点击 i 的时候，这个地方也会触发 click，很奇怪，干脆禁掉
                      , disabled: disabled, readOnly: readOnly, name: name }),
                  react_1.default.createElement("i", null),
                  react_1.default.createElement("span", { className: cx(labelClassName) }, children || label),
                  description ? (react_1.default.createElement("div", { className: cx('Checkbox-desc') }, description)) : null));
          }
      }
      Checkbox.defaultProps = {
          trueValue: true,
          falseValue: false,
          type: 'checkbox'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Checkbox.prototype, "handleCheck", null);
      return Checkbox;
  })();
  exports.Checkbox = Checkbox;
  exports.default = theme_1.themeable(Checkbox);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9DaGVja2JveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILDBEQUEwQjtBQUMxQixvQ0FBaUQ7QUFDakQsNENBQXlDO0FBRXpDLE1BQU0sWUFBWSxHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7QUF1QnJEOztJQUFBLE1BQWEsUUFBUyxTQUFRLGVBQUssQ0FBQyxTQUE2QjtRQVcvRCxXQUFXLENBQUMsQ0FBeUI7WUFDbkMsTUFBTSxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE9BQU87YUFDUjtZQUVELFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsTUFBTTtZQUNKLElBQUksRUFDRixJQUFJLEVBQ0osU0FBUyxFQUNULFVBQVUsRUFBRSxFQUFFLEVBQ2QsS0FBSyxFQUNMLEtBQUssRUFDTCxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEVBQ1IsV0FBVyxFQUNYLFFBQVEsRUFDUixPQUFPLEVBQ1AsSUFBSSxFQUNKLElBQUksRUFDSixjQUFjLEVBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxDQUNMLHlDQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsc0JBQXNCLElBQUksRUFBRSxFQUFFLFNBQVMsRUFBRTtvQkFDckQsZ0JBQWdCLEVBQUUsQ0FBQyxPQUFPO29CQUMxQixDQUFDLGFBQWEsSUFBSSxFQUFFLENBQUMsRUFBRSxJQUFJO2lCQUM1QixDQUFDO2dCQUVGLHlDQUNFLElBQUksRUFBRSxJQUFJLEVBQ1YsT0FBTyxFQUNMLE9BQU8sT0FBTyxLQUFLLFdBQVc7d0JBQzVCLENBQUMsQ0FBQyxPQUFPO3dCQUNULENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxXQUFXOzRCQUM5QixDQUFDLENBQUMsS0FBSzs0QkFDUCxDQUFDLENBQUMsS0FBSyxJQUFJLFNBQVMsRUFFeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQzFCLE9BQU8sRUFDTCxZQUFZLENBQUMsb0NBQW9DO3NCQUVuRCxRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBQUUsUUFBUSxFQUNsQixJQUFJLEVBQUUsSUFBSSxHQUNWO2dCQUNGLHdDQUFLO2dCQUNMLHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQUcsUUFBUSxJQUFJLEtBQUssQ0FBUTtnQkFDOUQsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNiLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUcsV0FBVyxDQUFPLENBQ3pELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDRixDQUNULENBQUM7UUFDSixDQUFDOztJQXRFTSxxQkFBWSxHQUdmO1FBQ0YsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsS0FBSztRQUNqQixJQUFJLEVBQUUsVUFBVTtLQUNqQixDQUFDO0lBR0Y7UUFEQyxpQkFBUTs7cUVBQ00sZUFBSyxvQkFBTCxlQUFLLENBQUMsV0FBVzs7K0NBUS9CO0lBcURILGVBQUM7S0FBQTtBQXhFWSw0QkFBUTtBQTBFckIsa0JBQWUsaUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyJ9

});
