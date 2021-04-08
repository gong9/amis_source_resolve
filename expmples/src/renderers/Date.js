amis.define('src/renderers/Date.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MonthFieldRenderer = exports.TimeFieldRenderer = exports.DateTimeFieldRenderer = exports.DateFieldRenderer = exports.DateField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  let DateField = /** @class */ (() => {
      class DateField extends react_1.default.Component {
          constructor() {
              super(...arguments);
              // 动态显示相对时间时，用来触发视图更新
              this.state = {
                  random: 0
              };
          }
          componentDidMount() {
              const { fromNow, updateFrequency } = this.props;
              if (fromNow && updateFrequency) {
                  this.refreshInterval = setInterval(() => {
                      this.setState({
                          random: Math.random()
                      });
                  }, updateFrequency);
              }
          }
          componentWillUnmount() {
              clearInterval(this.refreshInterval);
          }
          render() {
              const { value, valueFormat, format, placeholder, fromNow, className, classnames: cx, translate: __ } = this.props;
              let viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
              if (value) {
                  let ISODate = moment_1.default(value, moment_1.default.ISO_8601);
                  let NormalDate = moment_1.default(value, valueFormat);
                  viewValue = ISODate.isValid()
                      ? ISODate.format(format)
                      : NormalDate.isValid()
                          ? NormalDate.format(format)
                          : false;
              }
              if (fromNow) {
                  viewValue = moment_1.default(viewValue).fromNow();
              }
              viewValue = !viewValue ? (react_1.default.createElement("span", { className: "text-danger" }, __('Date.invalid'))) : (viewValue);
              return react_1.default.createElement("span", { className: cx('DateField', className) }, viewValue);
          }
      }
      DateField.defaultProps = {
          placeholder: '-',
          format: 'YYYY-MM-DD',
          valueFormat: 'X',
          fromNow: false,
          updateFrequency: 60000
      };
      return DateField;
  })();
  exports.DateField = DateField;
  let DateFieldRenderer = /** @class */ (() => {
      let DateFieldRenderer = class DateFieldRenderer extends DateField {
      };
      DateFieldRenderer.defaultProps = Object.assign(Object.assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD' });
      DateFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)date$/,
              name: 'date-field'
          })
      ], DateFieldRenderer);
      return DateFieldRenderer;
  })();
  exports.DateFieldRenderer = DateFieldRenderer;
  let DateTimeFieldRenderer = /** @class */ (() => {
      let DateTimeFieldRenderer = class DateTimeFieldRenderer extends DateField {
      };
      DateTimeFieldRenderer.defaultProps = Object.assign(Object.assign({}, DateField.defaultProps), { format: 'YYYY-MM-DD HH:mm:ss' });
      DateTimeFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)datetime$/,
              name: 'datetime-field'
          })
      ], DateTimeFieldRenderer);
      return DateTimeFieldRenderer;
  })();
  exports.DateTimeFieldRenderer = DateTimeFieldRenderer;
  let TimeFieldRenderer = /** @class */ (() => {
      let TimeFieldRenderer = class TimeFieldRenderer extends DateField {
      };
      TimeFieldRenderer.defaultProps = Object.assign(Object.assign({}, DateField.defaultProps), { format: 'HH:mm' });
      TimeFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)time$/,
              name: 'time-field'
          })
      ], TimeFieldRenderer);
      return TimeFieldRenderer;
  })();
  exports.TimeFieldRenderer = TimeFieldRenderer;
  let MonthFieldRenderer = /** @class */ (() => {
      let MonthFieldRenderer = class MonthFieldRenderer extends DateField {
      };
      MonthFieldRenderer.defaultProps = Object.assign(Object.assign({}, DateField.defaultProps), { format: 'YYYY-MM' });
      MonthFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)month$/,
              name: 'month-field'
          })
      ], MonthFieldRenderer);
      return MonthFieldRenderer;
  })();
  exports.MonthFieldRenderer = MonthFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRGF0ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFDbkQsNERBQTRCO0FBcUQ1QjtJQUFBLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUErQjtRQUFwRTs7WUFjRSxxQkFBcUI7WUFDckIsVUFBSyxHQUFjO2dCQUNqQixNQUFNLEVBQUUsQ0FBQzthQUNWLENBQUM7UUF3REosQ0FBQztRQXREQyxpQkFBaUI7WUFDZixNQUFNLEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFOUMsSUFBSSxPQUFPLElBQUksZUFBZSxFQUFFO2dCQUM5QixJQUFJLENBQUMsZUFBZSxHQUFHLFdBQVcsQ0FBQyxHQUFHLEVBQUU7b0JBQ3RDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ1osTUFBTSxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUU7cUJBQ3RCLENBQUMsQ0FBQztnQkFDTCxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUM7YUFDckI7UUFDSCxDQUFDO1FBRUQsb0JBQW9CO1lBQ2xCLGFBQWEsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDdEMsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osS0FBSyxFQUNMLFdBQVcsRUFDWCxNQUFNLEVBQ04sV0FBVyxFQUNYLE9BQU8sRUFDUCxTQUFTLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQUUsRUFBRSxFQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNmLElBQUksU0FBUyxHQUFvQixDQUMvQix3Q0FBTSxTQUFTLEVBQUMsWUFBWSxJQUFFLFdBQVcsQ0FBUSxDQUNsRCxDQUFDO1lBRUYsSUFBSSxLQUFLLEVBQUU7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

});
