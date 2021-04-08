amis.define('src/renderers/Form/Hidden.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HiddenControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  class HiddenControl extends react_1.default.Component {
      render() {
          return null;
      }
  }
  exports.default = HiddenControl;
  let HiddenControlRenderer = /** @class */ (() => {
      let HiddenControlRenderer = class HiddenControlRenderer extends HiddenControl {
      };
      HiddenControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'hidden',
              wrap: false,
              sizeMutable: false
          })
      ], HiddenControlRenderer);
      return HiddenControlRenderer;
  })();
  exports.HiddenControlRenderer = HiddenControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGlkZGVuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0hpZGRlbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFVbkUsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUdoRDtJQUNDLE1BQU07UUFDSixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7Q0FDRjtBQVBELGdDQU9DO0FBT0Q7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FBRyxDQUFBO0lBQTlDLHFCQUFxQjtRQUxqQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztPQUNXLHFCQUFxQixDQUF5QjtJQUFELDRCQUFDO0tBQUE7QUFBOUMsc0RBQXFCIn0=

});
