amis.define('src/renderers/Form/Number.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NumberControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const tpl_1 = require("src/utils/tpl.ts");
  const NumberInput_1 = tslib_1.__importDefault(require("src/components/NumberInput.tsx"));
  let NumberControl = /** @class */ (() => {
      class NumberControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleChange = this.handleChange.bind(this);
          }
          handleChange(inputValue) {
              const { classPrefix: ns, onChange, resetValue } = this.props;
              if (inputValue && typeof inputValue !== 'number') {
                  return;
              }
              onChange(inputValue === null ? resetValue !== null && resetValue !== void 0 ? resetValue : null : inputValue);
          }
          filterNum(value) {
              if (typeof value !== 'number') {
                  value = tpl_1.filter(value, this.props.data);
                  value = /^[-]?\d+/.test(value) ? parseInt(value, 10) : undefined;
              }
              return value;
          }
          render() {
              const { className, classPrefix: ns, value, step, precision, max, min, disabled, placeholder, showSteps } = this.props;
              let precisionProps = {};
              const finalPrecision = this.filterNum(precision);
              if (typeof finalPrecision === 'number') {
                  precisionProps.precision = finalPrecision;
              }
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}NumberControl`, className) },
                  react_1.default.createElement(NumberInput_1.default, { value: value, step: step, max: this.filterNum(max), min: this.filterNum(min), onChange: this.handleChange, disabled: disabled, placeholder: placeholder, precision: finalPrecision, showSteps: showSteps })));
          }
      }
      NumberControl.defaultProps = {
          step: 1,
          resetValue: ''
      };
      return NumberControl;
  })();
  exports.default = NumberControl;
  let NumberControlRenderer = /** @class */ (() => {
      let NumberControlRenderer = class NumberControlRenderer extends NumberControl {
      };
      NumberControlRenderer.defaultProps = {
          validations: 'isNumeric'
      };
      NumberControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'number'
          })
      ], NumberControlRenderer);
      return NumberControlRenderer;
  })();
  exports.NumberControlRenderer = NumberControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL051bWJlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFDbkUsb0VBQTRCO0FBQzVCLHlDQUF1QztBQUN2Qyx1RkFBdUQ7QUE0Q3ZEO0lBQUEsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQU0xRSxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELFlBQVksQ0FBQyxVQUFlO1lBQzFCLE1BQU0sRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNELElBQUksVUFBVSxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtnQkFDaEQsT0FBTzthQUNSO1lBRUQsUUFBUSxDQUFDLFVBQVUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEUsQ0FBQztRQUVELFNBQVMsQ0FBQyxLQUFrQztZQUMxQyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsS0FBSyxHQUFHLFlBQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkMsS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQzthQUNsRTtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osU0FBUyxFQUNULFdBQVcsRUFBRSxFQUFFLEVBQ2YsS0FBSyxFQUNMLElBQUksRUFDSixTQUFTLEVBQ1QsR0FBRyxFQUNILEdBQUcsRUFDSCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFDVixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixJQUFJLGNBQWMsR0FBUSxFQUFFLENBQUM7WUFFN0IsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUNqRCxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtnQkFDdEMsY0FBYyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7YUFDM0M7WUFFRCxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLG9CQUFFLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUM7Z0JBQ2pELDhCQUFDLHFCQUFXLElBQ1YsS0FBSyxFQUFFLEtBQUssRUFDWixJQUFJLEVBQUUsSUFBSSxFQUNWLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxFQUN4QixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFDeEIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFdBQVcsRUFBRSxXQUFXLEVBQ3hCLFNBQVMsRUFBRSxjQUFjLEVBQ3pCLFNBQVMsRUFBRSxTQUFTLEdBQ3BCLENBQ0UsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFqRU0sMEJBQVksR0FBeUI7UUFDMUMsSUFBSSxFQUFFLENBQUM7UUFDUCxVQUFVLEVBQUUsRUFBRTtLQUNmLENBQUM7SUErREosb0JBQUM7S0FBQTtrQkFuRW9CLGFBQWE7QUF3RWxDO0lBQUEsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxhQUFhO0tBSXZELENBQUE7SUFIUSxrQ0FBWSxHQUE4QjtRQUMvQyxXQUFXLEVBQUUsV0FBVztLQUN6QixDQUFDO0lBSFMscUJBQXFCO1FBSGpDLGVBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUNXLHFCQUFxQixDQUlqQztJQUFELDRCQUFDO0tBQUE7QUFKWSxzREFBcUIifQ==

});
