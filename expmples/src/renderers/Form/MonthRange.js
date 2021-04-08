amis.define('src/renderers/Form/MonthRange.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MonthRangeControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  require("node_modules/moment/locale/zh-cn");
  const DateRangePicker_1 = require("src/components/DateRangePicker.tsx");
  const MonthRangePicker_1 = tslib_1.__importDefault(require("src/components/MonthRangePicker.tsx"));
  let MonthRangeControl = /** @class */ (() => {
      class MonthRangeControl extends react_1.default.Component {
          componentWillMount() {
              const { defaultValue, setPrinstineValue, delimiter, format, data, value, joinValues, utc } = this.props;
              if (defaultValue && value === defaultValue) {
                  let arr = typeof defaultValue === 'string'
                      ? defaultValue.split(delimiter)
                      : defaultValue;
                  setPrinstineValue(DateRangePicker_1.DateRangePicker.formatValue({
                      startDate: tpl_builtin_1.filterDate(arr[0], data, format),
                      endDate: tpl_builtin_1.filterDate(arr[1], data, format)
                  }, format, joinValues, delimiter, utc));
              }
          }
          componentDidUpdate(prevProps) {
              const { defaultValue, delimiter, joinValues, setPrinstineValue, data, utc, format } = this.props;
              if (prevProps.defaultValue !== defaultValue) {
                  let arr = typeof defaultValue === 'string'
                      ? defaultValue.split(delimiter)
                      : defaultValue;
                  setPrinstineValue(arr
                      ? DateRangePicker_1.DateRangePicker.formatValue({
                          startDate: tpl_builtin_1.filterDate(arr[0], data, format),
                          endDate: tpl_builtin_1.filterDate(arr[1], data, format)
                      }, format, joinValues, delimiter, utc)
                      : undefined);
              }
          }
          render() {
              const _a = this.props, { className, classPrefix: ns, defaultValue, defaultData, minDate, maxDate, minDuration, maxDuration, data, format } = _a, rest = tslib_1.__rest(_a, ["className", "classPrefix", "defaultValue", "defaultData", "minDate", "maxDate", "minDuration", "maxDuration", "data", "format"]);
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}DateRangeControl`, className) },
                  react_1.default.createElement(MonthRangePicker_1.default, Object.assign({}, rest, { classPrefix: ns, data: data, format: format, minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined, maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined, minDuration: minDuration ? tpl_builtin_1.parseDuration(minDuration) : undefined, maxDuration: maxDuration ? tpl_builtin_1.parseDuration(maxDuration) : undefined }))));
          }
      }
      MonthRangeControl.defaultProps = {
          format: 'X',
          joinValues: true,
          delimiter: ','
      };
      return MonthRangeControl;
  })();
  exports.default = MonthRangeControl;
  let MonthRangeControlRenderer = /** @class */ (() => {
      let MonthRangeControlRenderer = class MonthRangeControlRenderer extends MonthRangeControl {
      };
      MonthRangeControlRenderer.defaultProps = Object.assign(Object.assign({}, MonthRangeControl.defaultProps), { timeFormat: '' });
      MonthRangeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'month-range'
          })
      ], MonthRangeControlRenderer);
      return MonthRangeControlRenderer;
  })();
  exports.MonthRangeControlRenderer = MonthRangeControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9udGhSYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9Nb250aFJhbmdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUNuRSxvRUFBNEI7QUFDNUIseURBQWtFO0FBRWxFLCtCQUE2QjtBQUM3QixzRUFFMEM7QUFFMUMsaUdBQWlFO0FBMkVqRTtJQUFBLE1BQXFCLGlCQUFrQixTQUFRLGVBQUssQ0FBQyxTQUEwQjtRQU83RSxrQkFBa0I7WUFDaEIsTUFBTSxFQUNKLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixJQUFJLEVBQ0osS0FBSyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0osR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxZQUFZLElBQUksS0FBSyxLQUFLLFlBQVksRUFBRTtnQkFDMUMsSUFBSSxHQUFHLEdBQ0wsT0FBTyxZQUFZLEtBQUssUUFBUTtvQkFDOUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUMvQixDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUNuQixpQkFBaUIsQ0FDZixpQ0FBbUIsQ0FBQyxXQUFXLENBQzdCO29CQUNFLFNBQVMsRUFBRSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsd0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztpQkFDMUMsRUFDRCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxHQUFHLENBQ0osQ0FDRixDQUFDO2FBQ0g7UUFDSCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsU0FBMEI7WUFDM0MsTUFBTSxF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

});
