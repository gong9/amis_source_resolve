amis.define('src/components/Range.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Range
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Range = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_input_range_1 = tslib_1.__importDefault(require("node_modules/react-input-range/lib/js/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const theme_1 = require("src/theme.tsx");
  let Range = /** @class */ (() => {
      class Range extends react_1.default.Component {
          render() {
              const { min, max, value, className, classPrefix: ns, multiple } = this.props;
              const classNames = {
                  activeTrack: multiple
                      ? `${ns}InputRange-track is-active`
                      : `${ns}InputRange-track`,
                  disabledInputRange: `${ns}InputRange is-disabled`,
                  inputRange: `${ns}InputRange`,
                  labelContainer: `${ns}InputRange-labelContainer`,
                  maxLabel: `${ns}InputRange-label ${ns}InputRange-label--max`,
                  minLabel: `${ns}InputRange-label ${ns}InputRange-label--min`,
                  slider: `${ns}InputRange-slider`,
                  sliderContainer: `${ns}InputRange-sliderContainer`,
                  track: `${ns}InputRange-track ${ns}InputRange-track--background`,
                  valueLabel: `${ns}InputRange-label ${ns}InputRange-label--value`
              };
              return (react_1.default.createElement(react_input_range_1.default, Object.assign({}, this.props, { classNames: classNames, minValue: min, maxValue: max, value: value })));
          }
      }
      Range.defaultProps = {
          min: 1,
          max: 100
      };
      return Range;
  })();
  exports.Range = Range;
  exports.default = theme_1.themeable(uncontrollable_1.uncontrollable(Range, {
      value: 'onChange'
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9SYW5nZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsa0ZBQTJDO0FBQzNDLG1EQUE4QztBQUc5QyxvQ0FBaUQ7QUFrQmpEO0lBQUEsTUFBYSxLQUFNLFNBQVEsZUFBSyxDQUFDLFNBQTBCO1FBTXpELE1BQU07WUFDSixNQUFNLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzRSxNQUFNLFVBQVUsR0FBRztnQkFDakIsV0FBVyxFQUFFLFFBQVE7b0JBQ25CLENBQUMsQ0FBQyxHQUFHLEVBQUUsNEJBQTRCO29CQUNuQyxDQUFDLENBQUMsR0FBRyxFQUFFLGtCQUFrQjtnQkFDM0Isa0JBQWtCLEVBQUUsR0FBRyxFQUFFLHdCQUF3QjtnQkFDakQsVUFBVSxFQUFFLEdBQUcsRUFBRSxZQUFZO2dCQUM3QixjQUFjLEVBQUUsR0FBRyxFQUFFLDJCQUEyQjtnQkFDaEQsUUFBUSxFQUFFLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSx1QkFBdUI7Z0JBQzVELFFBQVEsRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsdUJBQXVCO2dCQUM1RCxNQUFNLEVBQUUsR0FBRyxFQUFFLG1CQUFtQjtnQkFDaEMsZUFBZSxFQUFFLEdBQUcsRUFBRSw0QkFBNEI7Z0JBQ2xELEtBQUssRUFBRSxHQUFHLEVBQUUsb0JBQW9CLEVBQUUsOEJBQThCO2dCQUNoRSxVQUFVLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUFFLHlCQUF5QjthQUNqRSxDQUFDO1lBRUYsT0FBTyxDQUNMLDhCQUFDLDJCQUFVLG9CQUNMLElBQUksQ0FBQyxLQUFLLElBQ2QsVUFBVSxFQUFFLFVBQVUsRUFDdEIsUUFBUSxFQUFFLEdBQUcsRUFDYixRQUFRLEVBQUUsR0FBRyxFQUNiLEtBQUssRUFBRSxLQUFLLElBQ1osQ0FDSCxDQUFDO1FBQ0osQ0FBQzs7SUFoQ00sa0JBQVksR0FBd0I7UUFDekMsR0FBRyxFQUFFLENBQUM7UUFDTixHQUFHLEVBQUUsR0FBRztLQUNULENBQUM7SUE4QkosWUFBQztLQUFBO0FBbENZLHNCQUFLO0FBb0NsQixrQkFBZSxpQkFBUyxDQUN0QiwrQkFBYyxDQUFDLEtBQUssRUFBRTtJQUNwQixLQUFLLEVBQUUsVUFBVTtDQUNsQixDQUFDLENBQ0gsQ0FBQyJ9

});
