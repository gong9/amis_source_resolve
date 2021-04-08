amis.define('src/renderers/Form/DateRange.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DateTimeRangeControlRenderer = exports.DateRangeControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  require("node_modules/moment/locale/zh-cn");
  const DateRangePicker_1 = tslib_1.__importStar(require("src/components/DateRangePicker.tsx"));
  let DateRangeControl = /** @class */ (() => {
      class DateRangeControl extends react_1.default.Component {
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
                  react_1.default.createElement(DateRangePicker_1.default, Object.assign({}, rest, { classPrefix: ns, data: data, format: format, minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined, maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined, minDuration: minDuration ? tpl_builtin_1.parseDuration(minDuration) : undefined, maxDuration: maxDuration ? tpl_builtin_1.parseDuration(maxDuration) : undefined }))));
          }
      }
      DateRangeControl.defaultProps = {
          format: 'X',
          joinValues: true,
          delimiter: ','
      };
      return DateRangeControl;
  })();
  exports.default = DateRangeControl;
  let DateRangeControlRenderer = /** @class */ (() => {
      let DateRangeControlRenderer = class DateRangeControlRenderer extends DateRangeControl {
      };
      DateRangeControlRenderer.defaultProps = Object.assign(Object.assign({}, DateRangeControl.defaultProps), { timeFormat: '' });
      DateRangeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'date-range'
          })
      ], DateRangeControlRenderer);
      return DateRangeControlRenderer;
  })();
  exports.DateRangeControlRenderer = DateRangeControlRenderer;
  let DateTimeRangeControlRenderer = /** @class */ (() => {
      let DateTimeRangeControlRenderer = class DateTimeRangeControlRenderer extends DateRangeControl {
      };
      DateTimeRangeControlRenderer.defaultProps = Object.assign(Object.assign({}, DateRangeControl.defaultProps), { timeFormat: 'HH:mm', inputFormat: 'YYYY-MM-DD HH:mm' });
      DateTimeRangeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'datetime-range',
              sizeMutable: false
          })
      ], DateTimeRangeControlRenderer);
      return DateTimeRangeControlRenderer;
  })();
  exports.DateTimeRangeControlRenderer = DateTimeRangeControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVJhbmdlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0RhdGVSYW5nZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFDbkUsb0VBQTRCO0FBQzVCLHlEQUFrRTtBQUNsRSwrQkFBNkI7QUFDN0IsNEZBRTBDO0FBMkUxQztJQUFBLE1BQXFCLGdCQUFpQixTQUFRLGVBQUssQ0FBQyxTQUF5QjtRQU8zRSxrQkFBa0I7WUFDaEIsTUFBTSxFQUNKLFlBQVksRUFDWixpQkFBaUIsRUFDakIsU0FBUyxFQUNULE1BQU0sRUFDTixJQUFJLEVBQ0osS0FBSyxFQUNMLFVBQVUsRUFDVixHQUFHLEVBQ0osR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxZQUFZLElBQUksS0FBSyxLQUFLLFlBQVksRUFBRTtnQkFDMUMsSUFBSSxHQUFHLEdBQ0wsT0FBTyxZQUFZLEtBQUssUUFBUTtvQkFDOUIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO29CQUMvQixDQUFDLENBQUMsWUFBWSxDQUFDO2dCQUNuQixpQkFBaUIsQ0FDZixpQ0FBbUIsQ0FBQyxXQUFXLENBQzdCO29CQUNFLFNBQVMsRUFBRSx3QkFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO29CQUMzQyxPQUFPLEVBQUUsd0JBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQztpQkFDMUMsRUFDRCxNQUFNLEVBQ04sVUFBVSxFQUNWLFNBQVMsRUFDVCxHQUFHLENBQ0osQ0FDRixDQUFDO2FBQ0g7UUFDSCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsU0FBeUI7WUFDMUMsTUFBTSxFQUNKLFlBQVksRUFDWixT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

});
