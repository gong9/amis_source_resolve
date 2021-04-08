amis.define('src/components/NumberInput.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NumberInput = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  // @ts-ignore
  const rc_input_number_1 = tslib_1.__importDefault(require("node_modules/rc-input-number/lib/index"));
  const theme_1 = require("src/theme.tsx");
  let NumberInput = /** @class */ (() => {
      class NumberInput extends react_1.default.Component {
          render() {
              const { className, classPrefix: ns, classnames: cx, value, step, precision, max, min, disabled, placeholder, onChange, showSteps } = this.props;
              let precisionProps = {};
              if (typeof precision === 'number') {
                  precisionProps.precision = precision;
              }
              return (react_1.default.createElement(rc_input_number_1.default, Object.assign({ className: cx(className, showSteps === false ? 'no-steps' : ''), prefixCls: `${ns}Number`, value: value, step: step, max: max, min: min, onChange: onChange, disabled: disabled, placeholder: placeholder }, precisionProps)));
          }
      }
      NumberInput.defaultProps = {
          step: 1
      };
      return NumberInput;
  })();
  exports.NumberInput = NumberInput;
  exports.default = theme_1.themeable(NumberInput);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVySW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9OdW1iZXJJbnB1dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixhQUFhO0FBQ2IsOEVBQTBDO0FBQzFDLG9DQUErQztBQWMvQztJQUFBLE1BQWEsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQUtoRSxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxXQUFXLEVBQUUsRUFBRSxFQUNmLFVBQVUsRUFBRSxFQUFFLEVBQ2QsS0FBSyxFQUNMLElBQUksRUFDSixTQUFTLEVBQ1QsR0FBRyxFQUNILEdBQUcsRUFDSCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFFBQVEsRUFDUixTQUFTLEVBQ1YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxjQUFjLEdBQVEsRUFBRSxDQUFDO1lBRTdCLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO2dCQUNqQyxjQUFjLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzthQUN0QztZQUVELE9BQU8sQ0FDTCw4QkFBQyx5QkFBVyxrQkFDVixTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxTQUFTLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUMvRCxTQUFTLEVBQUUsR0FBRyxFQUFFLFFBQVEsRUFDeEIsS0FBSyxFQUFFLEtBQUssRUFDWixJQUFJLEVBQUUsSUFBSSxFQUNWLEdBQUcsRUFBRSxHQUFHLEVBQ1IsR0FBRyxFQUFFLEdBQUcsRUFDUixRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBQUUsUUFBUSxFQUNsQixXQUFXLEVBQUUsV0FBVyxJQUNwQixjQUFjLEVBQ2xCLENBQ0gsQ0FBQztRQUNKLENBQUM7O0lBeENNLHdCQUFZLEdBQUc7UUFDcEIsSUFBSSxFQUFFLENBQUM7S0FDUixDQUFDO0lBdUNKLGtCQUFDO0tBQUE7QUExQ1ksa0NBQVc7QUE0Q3hCLGtCQUFlLGlCQUFTLENBQUMsV0FBVyxDQUFDLENBQUMifQ==

});
