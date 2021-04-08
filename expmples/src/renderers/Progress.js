amis.define('src/renderers/Progress.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ProgressFieldRenderer = exports.ProgressField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let ProgressField = /** @class */ (() => {
      class ProgressField extends react_1.default.Component {
          autoClassName(value) {
              const map = this.props.map;
              let index = Math.floor((value * map.length) / 100);
              index = Math.max(0, Math.min(map.length - 1, index));
              return map[index];
          }
          render() {
              const { className, placeholder, progressClassName, progressBarClassName, map, stripe, animate, showLabel, classnames: cx } = this.props;
              let value = this.props.value;
              let viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
              if (/^\d*\.?\d+$/.test(value)) {
                  value = parseFloat(value);
              }
              if (typeof value === 'number') {
                  viewValue = [
                      react_1.default.createElement("div", { key: "progress", className: cx('Progress', progressClassName) },
                          react_1.default.createElement("div", { className: cx('Progress-bar', progressBarClassName || this.autoClassName(value), { 'Progress-bar--stripe': stripe }, { 'Progress-bar--animate': animate }), title: `${value}%`, style: {
                                  width: `${value}%`
                              } })),
                      showLabel ? react_1.default.createElement("div", { key: "value" },
                          value,
                          "%") : null
                  ];
              }
              return react_1.default.createElement("span", { className: cx('ProgressField', className) }, viewValue);
          }
      }
      ProgressField.defaultProps = {
          placeholder: '-',
          progressClassName: '',
          progressBarClassName: '',
          map: ['bg-danger', 'bg-warning', 'bg-info', 'bg-success', 'bg-success'],
          showLabel: true,
          stripe: false,
          animate: false
      };
      return ProgressField;
  })();
  exports.ProgressField = ProgressField;
  let ProgressFieldRenderer = /** @class */ (() => {
      let ProgressFieldRenderer = class ProgressFieldRenderer extends ProgressField {
      };
      ProgressFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)progress$/,
              name: 'progress'
          })
      ], ProgressFieldRenderer);
      return ProgressFieldRenderer;
  })();
  exports.ProgressFieldRenderer = ProgressFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvZ3Jlc3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1Byb2dyZXNzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQTZEbkQ7SUFBQSxNQUFhLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBZ0M7UUFXdkUsYUFBYSxDQUFDLEtBQWE7WUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7WUFDM0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7WUFDbkQsS0FBSyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsV0FBVyxFQUNYLGlCQUFpQixFQUNqQixvQkFBb0IsRUFDcEIsR0FBRyxFQUNILE1BQU0sRUFDTixPQUFPLEVBQ1AsU0FBUyxFQUNULFVBQVUsRUFBRSxFQUFFLEVBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxTQUFTLEdBQW9CLENBQy9CLHdDQUFNLFNBQVMsRUFBQyxZQUFZLElBQUUsV0FBVyxDQUFRLENBQ2xELENBQUM7WUFFRixJQUFJLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQzdCLEtBQUssR0FBRyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDM0I7WUFFRCxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtnQkFDN0IsU0FBUyxHQUFHO29CQUNWLHVDQUFLLEdBQUcsRUFBQyxVQUFVLEVBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUM7d0JBQzlELHVDQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsY0FBYyxFQUNkLG9CQUFvQixJQUFJLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEVBQ2pELEVBQUMsc0JBQXNCLEVBQUUsTUFBTSxFQUFDLEVBQ2hDLEVBQUMsdUJBQXVCLEVBQUUsT0FBTyxFQUFDLENBQ25DLEVBQ0QsS0FBSyxFQUFFLEdBQUcsS0FBSyxHQUFHLEVBQ2xCLEtBQUssRUFBRTtnQ0FDTCxLQUFLLEVBQUUsR0FBRyxLQUFLLEdBQUc7NkJBQ25CLEdBQ0QsQ0FDRTtvQkFDTixTQUFTLENBQUMsQ0FBQyxDQUFDLHVDQUFLLEdBQUcsRUFBQyxPQUFPO3dCQUFFLEtBQUs7NEJBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSTtpQkFDbkQsQ0FBQzthQUNIO1lBRUQsT0FBTyx3Q0FBTSxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsSUFBRyxTQUFTLENBQVEsQ0FBQztRQUM3RSxDQUFDOztJQTVETSwwQkFBWSxHQUFHO1FBQ3BCLFdBQVcsRUFBRSxHQUFHO1FBQ2hCLGlCQUFpQixFQUFFLEVBQUU7UUFDckIsb0JBQW9CLEVBQUUsRUFBRTtRQUN4QixHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsWUFBWSxDQUFDO1FBQ3ZFLFNBQVMsRUFBRSxJQUFJO1FBQ2YsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPLEVBQUUsS0FBSztLQUNmLENBQUM7SUFxREosb0JBQUM7S0FBQTtBQTlEWSxzQ0FBYTtBQW9FMUI7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FBRyxDQUFBO0lBQTlDLHFCQUFxQjtRQUpqQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGlCQUFpQjtZQUN2QixJQUFJLEVBQUUsVUFBVTtTQUNqQixDQUFDO09BQ1cscUJBQXFCLENBQXlCO0lBQUQsNEJBQUM7S0FBQTtBQUE5QyxzREFBcUIifQ==

});
