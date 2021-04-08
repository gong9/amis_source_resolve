amis.define('src/components/calendar/DaysView.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CustomDaysView = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  const DaysView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/DaysView"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  class CustomDaysView extends DaysView_1.default {
      constructor() {
          super(...arguments);
          this.updateSelectedDate = (event) => {
              // need confirm
              if (this.props.requiredConfirm) {
                  const viewDate = this.props.viewDate.clone();
                  const currentDate = this.props.selectedDate || viewDate;
                  const target = event.target;
                  let modifier = 0;
                  if (~target.className.indexOf('rdtNew')) {
                      modifier = 1;
                  }
                  if (~target.className.indexOf('rdtOld')) {
                      modifier = -1;
                  }
                  viewDate
                      .month(viewDate.month() + modifier)
                      .date(parseInt(target.getAttribute('data-value'), 10))
                      .hours(currentDate.hours())
                      .minutes(currentDate.minutes())
                      .seconds(currentDate.seconds())
                      .milliseconds(currentDate.milliseconds());
                  this.props.setDateTimeState({
                      viewDate,
                      selectedDate: viewDate.clone()
                  });
                  return;
              }
              this.props.updateSelectedDate(event, true);
          };
          this.setTime = (type, value) => {
              const date = (this.props.selectedDate || this.props.viewDate).clone();
              date[type](value);
              this.props.setDateTimeState({
                  viewDate: date.clone(),
                  selectedDate: date.clone()
              });
              if (!this.props.requiredConfirm) {
                  this.props.onChange(date);
              }
          };
          this.confirm = () => {
              const date = (this.props.selectedDate || this.props.viewDate).clone();
              this.props.setDateTimeState({
                  selectedDate: date
              });
              this.props.onChange(date);
              this.props.onClose && this.props.onClose();
          };
          this.cancel = () => {
              this.props.onClose && this.props.onClose();
          };
          this.renderDay = (props, currentDate) => {
              return react_1.default.createElement("td", Object.assign({}, props), currentDate.date());
          };
          this.renderTimes = () => {
              const { timeFormat, selectedDate, viewDate, isEndDate, classnames: cx } = this.props;
              const date = selectedDate || (isEndDate ? viewDate.endOf('day') : viewDate);
              const inputs = [];
              timeFormat.split(':').forEach((format, i) => {
                  const type = /h/i.test(format)
                      ? 'hours'
                      : /m/i.test(format)
                          ? 'minutes'
                          : 'seconds';
                  const min = 0;
                  const max = type === 'hours' ? 23 : 59;
                  inputs.push(react_1.default.createElement("input", { key: i + 'input', type: "text", value: date.format(format), className: cx('CalendarInput'), min: min, max: max, onChange: e => this.setTime(type, Math.max(min, Math.min(parseInt(e.currentTarget.value.replace(/\D/g, ''), 10) || 0, max))) }));
                  inputs.push(react_1.default.createElement("span", { key: i + 'divider' }, ":"));
              });
              inputs.length && inputs.pop();
              return react_1.default.createElement("div", null, inputs);
          };
          this.renderFooter = () => {
              if (!this.props.timeFormat && !this.props.requiredConfirm) {
                  return null;
              }
              const __ = this.props.translate;
              return (react_1.default.createElement("tfoot", { key: "tf" },
                  react_1.default.createElement("tr", null,
                      react_1.default.createElement("td", { colSpan: 7 },
                          this.props.timeFormat ? this.renderTimes() : null,
                          this.props.requiredConfirm ? (react_1.default.createElement("div", { key: "button", className: "rdtActions" },
                              react_1.default.createElement("a", { className: "rdtBtn rdtBtnConfirm", onClick: this.confirm }, __('confirm')),
                              react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.cancel }, __('cancle')))) : null))));
          };
      }
      render() {
          const footer = this.renderFooter();
          const date = this.props.viewDate;
          const locale = date.localeData();
          const __ = this.props.translate;
          const tableChildren = [
              react_1.default.createElement("thead", { key: "th" },
                  react_1.default.createElement("tr", null,
                      react_1.default.createElement("th", { colSpan: 7 },
                          react_1.default.createElement("div", { className: "rdtHeader" },
                              react_1.default.createElement("a", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'years') }, "\u00AB"),
                              react_1.default.createElement("a", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'months') }, "\u2039"),
                              react_1.default.createElement("div", { className: "rdtCenter" },
                                  react_1.default.createElement("a", { className: "rdtSwitch", onClick: this.props.showView('years') }, date.format(__('dateformat.year'))),
                                  react_1.default.createElement("a", { className: "rdtSwitch", onClick: this.props.showView('months') }, date.format(__('MMM')))),
                              react_1.default.createElement("a", { className: "rdtNext", onClick: this.props.addTime(1, 'months') }, "\u203A"),
                              react_1.default.createElement("a", { className: "rdtNext", onClick: this.props.addTime(1, 'years') }, "\u00BB")))),
                  react_1.default.createElement("tr", null, this.getDaysOfWeek(locale).map((day, index) => (react_1.default.createElement("th", { key: day + index, className: "dow" }, day))))),
              react_1.default.createElement("tbody", { key: "tb" }, this.renderDays())
          ];
          footer && tableChildren.push(footer);
          return (react_1.default.createElement("div", { className: "rdtDays" },
              react_1.default.createElement("table", null, tableChildren)));
      }
  }
  exports.CustomDaysView = CustomDaysView;
  exports.default = locale_1.localeable(CustomDaysView);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF5c1ZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jYWxlbmRhci9EYXlzVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLGFBQWE7QUFDYixtRkFBbUQ7QUFDbkQsMERBQTBCO0FBQzFCLHlDQUFxRDtBQXFDckQsTUFBYSxjQUFlLFNBQVEsa0JBQVE7SUFBNUM7O1FBS0UsdUJBQWtCLEdBQUcsQ0FBQyxLQUE0QixFQUFFLEVBQUU7WUFDcEQsZUFBZTtZQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQzlCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUM3QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUM7Z0JBRXhELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFxQixDQUFDO2dCQUMzQyxJQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7Z0JBRWpCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsRUFBRTtvQkFDdkMsUUFBUSxHQUFHLENBQUMsQ0FBQztpQkFDZDtnQkFDRCxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3ZDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDZjtnQkFFRCxRQUFRO3FCQUNMLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEdBQUcsUUFBUSxDQUFDO3FCQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7cUJBQy9ELEtBQUssQ0FBQyxX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

});
