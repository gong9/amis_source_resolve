amis.define('src/renderers/Form/Rating.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RatingControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const Rating_1 = tslib_1.__importDefault(require("src/components/Rating.tsx"));
  let RatingControl = /** @class */ (() => {
      class RatingControl extends react_1.default.Component {
          render() {
              const { className, value, count, half, readOnly, onChange, size, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('RatingControl', className) },
                  react_1.default.createElement(Rating_1.default, { classnames: cx, value: value, count: count, half: half, readOnly: readOnly, onChange: (value) => onChange(value) })));
          }
      }
      RatingControl.defaultProps = {
          value: 0,
          count: 5,
          half: false,
          readOnly: false
      };
      return RatingControl;
  })();
  exports.default = RatingControl;
  let RatingControlRenderer = /** @class */ (() => {
      let RatingControlRenderer = class RatingControlRenderer extends RatingControl {
      };
      RatingControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'rating',
              sizeMutable: false
          })
      ], RatingControlRenderer);
      return RatingControlRenderer;
  })();
  exports.RatingControlRenderer = RatingControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1JhdGluZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFDbkUsNkVBQTZDO0FBMkI3QztJQUFBLE1BQXFCLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBMkI7UUFRMUUsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFDUixJQUFJLEVBQ0osVUFBVSxFQUFFLEVBQUUsRUFDZixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDO2dCQUM1Qyw4QkFBQyxnQkFBTSxJQUNMLFVBQVUsRUFBRSxFQUFFLEVBQ2QsS0FBSyxFQUFFLEtBQUssRUFDWixLQUFLLEVBQUUsS0FBSyxFQUNaLElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQ3pDLENBQ0UsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUEvQk0sMEJBQVksR0FBeUI7UUFDMUMsS0FBSyxFQUFFLENBQUM7UUFDUixLQUFLLEVBQUUsQ0FBQztRQUNSLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQTJCSixvQkFBQztLQUFBO2tCQWpDb0IsYUFBYTtBQXVDbEM7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FBRyxDQUFBO0lBQTlDLHFCQUFxQjtRQUpqQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7T0FDVyxxQkFBcUIsQ0FBeUI7SUFBRCw0QkFBQztLQUFBO0FBQTlDLHNEQUFxQiJ9

});
