amis.define('src/components/Switch.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Switch
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Switch = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const sizeMap = {
      md: 'i-switch-md',
      lg: 'i-switch-lg',
      middle: 'i-switch-md',
      large: 'i-switch-lg'
  };
  const levelMap = {
      info: 'bg-info',
      primary: 'bg-primary',
      danger: 'bg-danger'
  };
  let Switch = /** @class */ (() => {
      class Switch extends react_1.default.PureComponent {
          constructor(props) {
              super(props);
              this.hanldeCheck = this.hanldeCheck.bind(this);
          }
          hanldeCheck(e) {
              const { trueValue, falseValue, onChange } = this.props;
              if (!onChange) {
                  return;
              }
              onChange(e.currentTarget.checked ? trueValue : falseValue);
          }
          render() {
              let _a = this.props, { size, level, className, classPrefix, onChange, value, inline, trueValue, falseValue, onText = '', offText = '', disabled, readOnly, checked, classnames: cx } = _a, rest = tslib_1.__rest(_a, ["size", "level", "className", "classPrefix", "onChange", "value", "inline", "trueValue", "falseValue", "onText", "offText", "disabled", "readOnly", "checked", "classnames"]);
              className =
                  (className ? className : '') +
                      (size && sizeMap[size] ? ` ${sizeMap[size]}` : '') +
                      (level && levelMap[level] ? ` ${levelMap[level]}` : '');
              const isChecked = typeof checked !== 'undefined'
                  ? checked
                  : typeof value === 'undefined'
                      ? false
                      : value == trueValue;
              return (react_1.default.createElement("label", { className: cx(`Switch`, isChecked ? 'is-checked' : '', disabled ? 'is-disabled' : '', className) },
                  react_1.default.createElement("input", Object.assign({ type: "checkbox", checked: isChecked, onChange: this.hanldeCheck, disabled: disabled, readOnly: readOnly }, rest)),
                  react_1.default.createElement("span", { className: "text" }, isChecked ? onText : offText),
                  react_1.default.createElement("span", { className: "slider" })));
          }
      }
      Switch.defaultProps = {
          trueValue: true,
          falseValue: false
      };
      return Switch;
  })();
  exports.Switch = Switch;
  exports.default = theme_1.themeable(Switch);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvU3dpdGNoLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUUxQixvQ0FBaUQ7QUFHakQsTUFBTSxPQUFPLEdBQUc7SUFDZCxFQUFFLEVBQUUsYUFBYTtJQUNqQixFQUFFLEVBQUUsYUFBYTtJQUNqQixNQUFNLEVBQUUsYUFBYTtJQUNyQixLQUFLLEVBQUUsYUFBYTtDQUNyQixDQUFDO0FBRUYsTUFBTSxRQUFRLEdBQUc7SUFDZixJQUFJLEVBQUUsU0FBUztJQUNmLE9BQU8sRUFBRSxZQUFZO0lBQ3JCLE1BQU0sRUFBRSxXQUFXO0NBQ3BCLENBQUM7QUFxQkY7SUFBQSxNQUFhLE1BQU8sU0FBUSxlQUFLLENBQUMsYUFBK0I7UUFNL0QsWUFBWSxLQUFrQjtZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxXQUFXLENBQUMsQ0FBc0M7WUFDaEQsTUFBTSxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyRCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE9BQU87YUFDUjtZQUVELFFBQVEsQ0FBQyxDQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM3RCxDQUFDO1FBRUQsTUFBTTtZQUNKLElBQUksS0FpQkEsSUFBSSxDQUFDLEtBQUssRUFqQlYsRUFDRixJQUFJLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxXQUFXLEVBQ1gsUUFBUSxFQUNSLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEdBQUcsRUFBRSxFQUNYLE9BQU8sR0FBRyxFQUFFLEVBQ1osUUFBUSxFQUNSLFFBQVEsRUFDUixPQUFPLEVBQ1AsVUFBVSxFQUFFLEVBQUUsT0FFRixFQURULElBQUksc0JBaEJMLDZLQWlCSCxDQUFhLENBQUM7WUFFZixTQUFTO2dCQUNQLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztvQkFDNUIsQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7b0JBQ2xELENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUM7WUFFMUQsTUFBTSxTQUFTLEdBQ2IsT0FBTyxPQUFPLEtBQUssV0FBVztnQkFDNUIsQ0FBQyxDQUFDLE9BQU87Z0JBQ1QsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVc7b0JBQzlCLENBQUMsQ0FBQyxLQUFLO29CQUNQLENBQUMsQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDO1lBRXpCLE9BQU8sQ0FDTCx5Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUNYLFFBQVEsRUFDUixTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUM3QixRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUM3QixTQUFTLENBQ1Y7Z0JBRUQsdURBQ0UsSUFBSSxFQUFDLFVBQVUsRUFDZixPQUFPLEVBQUUsU0FBUyxFQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFDMUIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLFFBQVEsSUFDZCxJQUFJLEVBQ1I7Z0JBRUYsd0NBQU0sU0FBUyxFQUFDLE1BQU0sSUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFRO2dCQUM1RCx3Q0FBTSxTQUFTLEVBQUMsUUFBUSxHQUFRLENBQzFCLENBQ1QsQ0FBQztRQUNKLENBQUM7O0lBM0VNLG1CQUFZLEdBQUc7UUFDcEIsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDO0lBeUVKLGFBQUM7S0FBQTtBQTdFWSx3QkFBTTtBQStFbkIsa0JBQWUsaUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyJ9

});
