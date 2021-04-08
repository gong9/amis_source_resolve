amis.define('src/renderers/Form/Switch.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SwitchControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const Switch_1 = tslib_1.__importDefault(require("src/components/Switch.tsx"));
  let SwitchControl = /** @class */ (() => {
      class SwitchControl extends react_1.default.Component {
          render() {
              const { className, classPrefix: ns, classnames: cx, value, trueValue, falseValue, onText, offText, option, onChange, disabled, optionAtLeft } = this.props;
              return (react_1.default.createElement("div", { className: cx(`SwitchControl`, className) },
                  optionAtLeft ? (react_1.default.createElement("span", { className: cx('Switch-option') }, option)) : null,
                  react_1.default.createElement(Switch_1.default, { classPrefix: ns, value: value, trueValue: trueValue, falseValue: falseValue, onText: onText, offText: offText, disabled: disabled, onChange: onChange }),
                  optionAtLeft ? null : (react_1.default.createElement("span", { className: cx('Switch-option') }, option))));
          }
      }
      SwitchControl.defaultProps = {
          trueValue: true,
          falseValue: false,
          optionAtLeft: false
      };
      return SwitchControl;
  })();
  exports.default = SwitchControl;
  let SwitchControlRenderer = /** @class */ (() => {
      let SwitchControlRenderer = class SwitchControlRenderer extends SwitchControl {
      };
      SwitchControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'switch',
              sizeMutable: false
          })
      ], SwitchControlRenderer);
      return SwitchControlRenderer;
  })();
  exports.SwitchControlRenderer = SwitchControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1N3aXRjaC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFFbkUsNkVBQTZDO0FBNEM3QztJQUFBLE1BQXFCLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBMkI7UUFNMUUsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsV0FBVyxFQUFFLEVBQUUsRUFDZixVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNiLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUM7Z0JBQzNDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FDZCx3Q0FBTSxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFHLE1BQU0sQ0FBUSxDQUN0RCxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUVSLDhCQUFDLGdCQUFNLElBQ0wsV0FBVyxFQUFFLEVBQUUsRUFDZixLQUFLLEVBQUUsS0FBSyxFQUNaLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLE1BQU0sRUFBRSxNQUFNLEVBQ2QsT0FBTyxFQUFFLE9BQU8sRUFDaEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLFFBQVEsR0FDbEI7Z0JBRUQsWUFBWSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ3JCLHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLElBQUcsTUFBTSxDQUFRLENBQ3RELENBQ0csQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUEzQ00sMEJBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsSUFBSTtRQUNmLFVBQVUsRUFBRSxLQUFLO1FBQ2pCLFlBQVksRUFBRSxLQUFLO0tBQ3BCLENBQUM7SUF3Q0osb0JBQUM7S0FBQTtrQkE3Q29CLGFBQWE7QUFtRGxDO0lBQUEsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxhQUFhO0tBQUcsQ0FBQTtJQUE5QyxxQkFBcUI7UUFKakMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO09BQ1cscUJBQXFCLENBQXlCO0lBQUQsNEJBQUM7S0FBQTtBQUE5QyxzREFBcUIifQ==

});
