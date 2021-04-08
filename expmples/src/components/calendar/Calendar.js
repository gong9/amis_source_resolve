amis.define('src/components/calendar/Calendar.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 基于 react-datetime 改造。
   */
  const react_datetime_1 = tslib_1.__importDefault(require("node_modules/react-datetime/DateTime"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const CalendarContainer_1 = tslib_1.__importDefault(require("src/components/calendar/CalendarContainer.tsx"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const theme_1 = require("src/theme.tsx");
  let BaseDatePicker = /** @class */ (() => {
      class BaseDatePicker extends react_datetime_1.default {
          constructor(props) {
              super(props);
              this.getUpdateOn = (formats) => {
                  if (formats.date.match(/[lLD]/)) {
                      return 'days';
                  }
                  else if (formats.date.indexOf('M') !== -1) {
                      return 'months';
                  }
                  else if (formats.date.indexOf('Q') !== -1) {
                      return 'quarters';
                  }
                  else if (formats.date.indexOf('Y') !== -1) {
                      return 'years';
                  }
                  return 'days';
              };
              this.getComponentProps = ((origin) => {
                  return () => {
                      const props = origin.call(this);
                      props.setDateTimeState = this.setState.bind(this);
                      [
                          'inputFormat',
                          'onChange',
                          'onClose',
                          'requiredConfirm',
                          'classPrefix',
                          'prevIcon',
                          'nextIcon',
                          'isEndDate',
                          'classnames'
                      ].forEach(key => (props[key] = this.props[key]));
                      return props;
                  };
              })(this.getComponentProps);
              this.setDate = (type) => {
                  // todo 没看懂这个是啥意思，好像没啥用
                  const currentShould = this.props.viewMode === 'months' &&
                      !/^mm$/i.test(this.props.inputFormat || '');
                  const nextViews = {
                      month: currentShould ? 'months' : 'days',
                      year: currentShould ? 'months' : 'days',
                      quarters: ''
                  };
                  if (this.props.viewMode === 'quarters') {
                      nextViews.year = 'quarters';
                  }
                  return (e) => {
                      this.setState({
                          viewDate: this.state.viewDate
                              .clone()[type](parseInt(e.target.closest('td').getAttribute('data-value'), 10))
                              .startOf(type),
                          currentView: nextViews[type]
                      });
                      this.props.onViewModeChange(nextViews[type]);
                  };
              };
              this.updateSelectedDate = (e, close) => {
                  const that = this;
                  let target = e.currentTarget, modifier = 0, viewDate = this.state.viewDate, currentDate = this.state.selectedDate || viewDate, date;
                  if (target.className.indexOf('rdtDay') !== -1) {
                      if (target.className.indexOf('rdtNew') !== -1)
                          modifier = 1;
                      else if (target.className.indexOf('rdtOld') !== -1)
                          modifier = -1;
                      date = viewDate
                          .clone()
                          .month(viewDate.month() + modifier)
                          .date(parseInt(target.getAttribute('data-value'), 10));
                  }
                  else if (target.className.indexOf('rdtMonth') !== -1) {
                      date = viewDate
                          .clone()
                          .month(parseInt(target.getAttribute('data-value'), 10))
                          .date(currentDate.date());
                  }
                  else if (target.className.indexOf('rdtQuarter') !== -1) {
                      date = viewDate
                          .clone()
                          .quarter(parseInt(target.getAttribute('data-value'), 10))
                          .date(currentDate.date());
                  }
                  else if (target.className.indexOf('rdtYear') !== -1) {
                      date = viewDate
                          .clone()
                          .month(currentDate.month())
                          .date(currentDate.date())
                          .year(parseInt(target.getAttribute('data-value'), 10));
                  }
                  date
                      .hours(currentDate.hours())
                      .minutes(currentDate.minutes())
                      .seconds(currentDate.seconds())
                      .milliseconds(currentDate.milliseconds());
                  if (!this.props.value) {
                      var open = !(this.props.closeOnSelect && close);
                      if (!open) {
                          that.props.onBlur(date);
                      }
                      this.setState({
                          selectedDate: date,
                          viewDate: date.clone().startOf('month'),
                          inputValue: date.format(this.state.inputFormat),
                          open: open
                      });
                  }
                  else {
                      if (this.props.closeOnSelect && close) {
                          that.closeCalendar();
                      }
                  }
                  that.props.onChange(date);
              };
              const state = this.getStateFromProps(this.props);
              if (state.open === undefined) {
                  state.open = !this.props.input;
              }
              state.currentView = this.props.dateFormat
                  ? this.props.viewMode || state.updateOn || 'days'
                  : 'time';
              this.state = state;
          }
          render() {
              const Component = CalendarContainer_1.default;
              return (react_1.default.createElement("div", { className: classnames_1.default('rdt rdtStatic rdtOpen', this.props.className) },
                  react_1.default.createElement("div", { key: "dt", className: "rdtPicker" },
                      react_1.default.createElement(Component, { view: this.state.currentView, viewProps: this.getComponentProps() }))));
          }
      }
      BaseDatePicker.propTypes = {};
      return BaseDatePicker;
  })();
  const Calendar = theme_1.themeable(BaseDatePicker);
  exports.default = Calendar;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jYWxlbmRhci9DYWxlbmRhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7O0dBRUc7QUFDSCw0RUFBNkM7QUFDN0MsMERBQTBCO0FBQzFCLG9GQUEwRDtBQUMxRCxvRUFBNEI7QUFFNUIsdUNBQW9FO0FBaUJwRTtJQUFBLE1BQU0sY0FBZSxTQUFRLHdCQUFlO1FBTTFDLFlBQVksS0FBVTtZQUNwQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFnQmYsZ0JBQVcsR0FBRyxDQUFDLE9BQVksRUFBRSxFQUFFO2dCQUM3QixJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUMvQixPQUFPLE1BQU0sQ0FBQztpQkFDZjtxQkFBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUMzQyxPQUFPLFFBQVEsQ0FBQztpQkFDakI7cUJBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDM0MsT0FBTyxVQUFVLENBQUM7aUJBQ25CO3FCQUFNLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzNDLE9BQU8sT0FBTyxDQUFDO2lCQUNoQjtnQkFFRCxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUM7WUFFRixzQkFBaUIsR0FBRyxDQUFDLENBQUMsTUFBZ0IsRUFBRSxFQUFFO2dCQUN4QyxPQUFPLEdBQUcsRUFBRTtvQkFDVixNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FB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

});
