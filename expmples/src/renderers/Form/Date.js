amis.define('src/renderers/Form/Date.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.YearControlRenderer = exports.QuarterControlRenderer = exports.MonthControlRenderer = exports.TimeControlRenderer = exports.DatetimeControlRenderer = exports.DateControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  require("node_modules/moment/locale/zh-cn");
  const DatePicker_1 = tslib_1.__importDefault(require("src/components/DatePicker.tsx"));
  let DateControl = /** @class */ (() => {
      class DateControl extends react_1.default.PureComponent {
          componentWillMount() {
              const { minDate, maxDate, value, defaultValue, setPrinstineValue, data, format, utc } = this.props;
              if (defaultValue && value === defaultValue) {
                  const date = tpl_builtin_1.filterDate(defaultValue, data, format);
                  setPrinstineValue((utc ? moment_1.default.utc(date) : date).format(format));
              }
              this.setState({
                  minDate: minDate ? tpl_builtin_1.filterDate(minDate, data, format) : undefined,
                  maxDate: maxDate ? tpl_builtin_1.filterDate(maxDate, data, format) : undefined
              });
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.defaultValue !== nextProps.defaultValue) {
                  const date = tpl_builtin_1.filterDate(nextProps.defaultValue, nextProps.data, nextProps.format);
                  nextProps.setPrinstineValue((nextProps.utc ? moment_1.default.utc(date) : date).format(nextProps.format));
              }
              if (props.minDate !== nextProps.minDate ||
                  props.maxDate !== nextProps.maxDate ||
                  props.data !== nextProps.data) {
                  this.setState({
                      minDate: nextProps.minDate
                          ? tpl_builtin_1.filterDate(nextProps.minDate, nextProps.data, this.props.format)
                          : undefined,
                      maxDate: nextProps.maxDate
                          ? tpl_builtin_1.filterDate(nextProps.maxDate, nextProps.data, this.props.format)
                          : undefined
                  });
              }
          }
          render() {
              let _a = this.props, { className, defaultValue, defaultData, classnames: cx, minDate, maxDate, type, format, timeFormat } = _a, rest = tslib_1.__rest(_a, ["className", "defaultValue", "defaultData", "classnames", "minDate", "maxDate", "type", "format", "timeFormat"]);
              if (type === 'time' && timeFormat) {
                  format = timeFormat;
              }
              return (react_1.default.createElement("div", { className: cx(`DateControl`, className) },
                  react_1.default.createElement(DatePicker_1.default, Object.assign({}, rest, { timeFormat: timeFormat, format: format }, this.state, { classnames: cx }))));
          }
      }
      DateControl.defaultProps = {
          format: 'X',
          viewMode: 'days',
          inputFormat: 'YYYY-MM-DD',
          timeConstraints: {
              minutes: {
                  step: 1
              }
          },
          clearable: true
      };
      return DateControl;
  })();
  exports.default = DateControl;
  let DateControlRenderer = /** @class */ (() => {
      let DateControlRenderer = class DateControlRenderer extends DateControl {
      };
      DateControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'Date.placeholder', dateFormat: 'YYYY-MM-DD', timeFormat: '', strictMode: false });
      DateControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'date',
              weight: -150
          })
      ], DateControlRenderer);
      return DateControlRenderer;
  })();
  exports.DateControlRenderer = DateControlRenderer;
  let DatetimeControlRenderer = /** @class */ (() => {
      let DatetimeControlRenderer = class DatetimeControlRenderer extends DateControl {
      };
      DatetimeControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'DateTime.placeholder', inputFormat: 'YYYY-MM-DD HH:mm:ss', dateFormat: 'LL', timeFormat: 'HH:mm:ss', closeOnSelect: false, strictMode: false });
      DatetimeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'datetime'
          })
      ], DatetimeControlRenderer);
      return DatetimeControlRenderer;
  })();
  exports.DatetimeControlRenderer = DatetimeControlRenderer;
  let TimeControlRenderer = /** @class */ (() => {
      let TimeControlRenderer = class TimeControlRenderer extends DateControl {
      };
      TimeControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'Time.placeholder', inputFormat: 'HH:mm', dateFormat: '', timeFormat: 'HH:mm', viewMode: 'time', closeOnSelect: false });
      TimeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'time'
          })
      ], TimeControlRenderer);
      return TimeControlRenderer;
  })();
  exports.TimeControlRenderer = TimeControlRenderer;
  let MonthControlRenderer = /** @class */ (() => {
      let MonthControlRenderer = class MonthControlRenderer extends DateControl {
      };
      MonthControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'Month.placeholder', inputFormat: 'YYYY-MM', dateFormat: 'MM', timeFormat: '', viewMode: 'months', closeOnSelect: true });
      MonthControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'month'
          })
      ], MonthControlRenderer);
      return MonthControlRenderer;
  })();
  exports.MonthControlRenderer = MonthControlRenderer;
  let QuarterControlRenderer = /** @class */ (() => {
      let QuarterControlRenderer = class QuarterControlRenderer extends DateControl {
      };
      QuarterControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'Quarter.placeholder', inputFormat: 'YYYY [Q]Q', dateFormat: 'YYYY [Q]Q', timeFormat: '', viewMode: 'quarters', closeOnSelect: true });
      QuarterControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'quarter'
          })
      ], QuarterControlRenderer);
      return QuarterControlRenderer;
  })();
  exports.QuarterControlRenderer = QuarterControlRenderer;
  let YearControlRenderer = /** @class */ (() => {
      let YearControlRenderer = class YearControlRenderer extends DateControl {
      };
      YearControlRenderer.defaultProps = Object.assign(Object.assign({}, DateControl.defaultProps), { placeholder: 'Year.placeholder', inputFormat: 'YYYY', dateFormat: 'YYYY', timeFormat: '', viewMode: 'years', closeOnSelect: true });
      YearControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'year'
          })
      ], YearControlRenderer);
      return YearControlRenderer;
  })();
  exports.YearControlRenderer = YearControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9EYXRlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUVuRSx5REFBbUQ7QUFDbkQsNERBQTRCO0FBQzVCLCtCQUE2QjtBQUM3QixxRkFBcUQ7QUF1T3JEO0lBQUEsTUFBcUIsV0FBWSxTQUFRLGVBQUssQ0FBQyxhQUc5QztRQWFDLGtCQUFrQjtZQUNoQixNQUFNLEVBQ0osT0FBTyxFQUNQLE9BQU8sRUFDUCxLQUFLLEVBQ0wsWUFBWSxFQUNaLGlCQUFpQixFQUNqQixJQUFJLEVBQ0osTUFBTSxFQUNOLEdBQUcsRUFDSixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixJQUFJLFlBQVksSUFBSSxLQUFLLEtBQUssWUFBWSxFQUFFO2dCQUMxQyxNQUFNLElBQUksR0FBRyx3QkFBVSxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7Z0JBQ3BELGlCQUFpQixDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxnQkFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7YUFDbkU7WUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLHdCQUFVLENBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztnQkFDaEUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQUMsd0JBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO2FBQ2pFLENBQUMsQ0FB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

});
