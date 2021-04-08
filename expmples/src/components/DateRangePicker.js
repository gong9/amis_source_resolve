amis.define('src/components/DateRangePicker.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file DateRangePicker
   * @description 自定义日期范围时间选择器组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DateRangePicker = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const icons_1 = require("src/components/icons.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const Calendar_1 = tslib_1.__importDefault(require("src/components/calendar/Calendar.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const locale_1 = require("src/locale.tsx");
  const availableRanges = {
      'today': {
          label: 'Date.today',
          startDate: (now) => {
              return now.startOf('day');
          },
          endDate: (now) => {
              return now;
          }
      },
      'yesterday': {
          label: 'Date.yesterday',
          startDate: (now) => {
              return now.add(-1, 'days').startOf('day');
          },
          endDate: (now) => {
              return now.add(-1, 'days').endOf('day');
          }
      },
      '1dayago': {
          label: 'DateRange.1dayago',
          startDate: (now) => {
              return now.add(-1, 'days');
          },
          endDate: (now) => {
              return now;
          }
      },
      '7daysago': {
          label: 'DateRange.7daysago',
          startDate: (now) => {
              return now.add(-7, 'days').startOf('day');
          },
          endDate: (now) => {
              return now.add(-1, 'days').endOf('day');
          }
      },
      '30daysago': {
          label: 'DateRange.30daysago',
          startDate: (now) => {
              return now.add(-30, 'days').startOf('day');
          },
          endDate: (now) => {
              return now.add(-1, 'days').endOf('day');
          }
      },
      '90daysago': {
          label: 'DateRange.90daysago',
          startDate: (now) => {
              return now.add(-90, 'days').startOf('day');
          },
          endDate: (now) => {
              return now.add(-1, 'days').endOf('day');
          }
      },
      'prevweek': {
          label: 'DateRange.lastWeek',
          startDate: (now) => {
              return now.startOf('week').add(-1, 'weeks');
          },
          endDate: (now) => {
              return now.startOf('week').add(-1, 'days').endOf('day');
          }
      },
      'thisweek': {
          label: 'DateRange.thisWeek',
          startDate: (now) => {
              return now.startOf('week');
          },
          endDate: (now) => {
              return now.endOf('week');
          }
      },
      'thismonth': {
          label: 'DateRange.thisMonth',
          startDate: (now) => {
              return now.startOf('month');
          },
          endDate: (now) => {
              return now.endOf('month');
          }
      },
      'thisquarter': {
          label: 'DateRange.thisQuarter',
          startDate: (now) => {
              return now.startOf('quarter');
          },
          endDate: (now) => {
              return now.endOf('quarter');
          }
      },
      'prevmonth': {
          label: 'DateRange.lastMonth',
          startDate: (now) => {
              return now.startOf('month').add(-1, 'month');
          },
          endDate: (now) => {
              return now.startOf('month').add(-1, 'day').endOf('day');
          }
      },
      'prevquarter': {
          label: 'DateRange.lastQuarter',
          startDate: (now) => {
              return now.startOf('quarter').add(-1, 'quarter');
          },
          endDate: (now) => {
              return now.startOf('quarter').add(-1, 'day').endOf('day');
          }
      }
  };
  let DateRangePicker = /** @class */ (() => {
      class DateRangePicker extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.nextMonth = moment_1.default().add(1, 'months');
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.handleStartChange = this.handleStartChange.bind(this);
              this.handleEndChange = this.handleEndChange.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.checkStartIsValidDate = this.checkStartIsValidDate.bind(this);
              this.checkEndIsValidDate = this.checkEndIsValidDate.bind(this);
              this.confirm = this.confirm.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.dom = react_1.default.createRef();
              this.handleClick = this.handleClick.bind(this);
              this.handleKeyPress = this.handleKeyPress.bind(this);
              this.handlePopOverClick = this.handlePopOverClick.bind(this);
              this.renderDay = this.renderDay.bind(this);
              const { format, joinValues, delimiter, value } = this.props;
              this.state = Object.assign({ isOpened: false, isFocused: false }, DateRangePicker.unFormatValue(value, format, joinValues, delimiter));
          }
          static formatValue(newValue, format, joinValues, delimiter, utc = false) {
              newValue = [
                  (utc ? moment_1.default.utc(newValue.startDate) : newValue.startDate).format(format),
                  (utc ? moment_1.default.utc(newValue.endDate) : newValue.endDate).format(format)
              ];
              if (joinValues) {
                  newValue = newValue.join(delimiter);
              }
              return newValue;
          }
          static unFormatValue(value, format, joinValues, delimiter) {
              if (!value) {
                  return {
                      startDate: undefined,
                      endDate: undefined
                  };
              }
              if (joinValues && typeof value === 'string') {
                  value = value.split(delimiter);
              }
              return {
                  startDate: value[0] ? moment_1.default(value[0], format) : undefined,
                  endDate: value[1] ? moment_1.default(value[1], format) : undefined
              };
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const { value, format, joinValues, delimiter } = nextProps;
              if (props.value !== value) {
                  this.setState(Object.assign({}, DateRangePicker.unFormatValue(value, format, joinValues, delimiter)));
              }
          }
          focus() {
              if (!this.dom.current || this.props.disabled) {
                  return;
              }
              this.dom.current.focus();
          }
          blur() {
              if (!this.dom.current || this.props.disabled) {
                  return;
              }
              this.dom.current.blur();
          }
          handleFocus() {
              this.setState({
                  isFocused: true
              });
          }
          handleBlur() {
              this.setState({
                  isFocused: false
              });
          }
          open() {
              if (this.props.disabled) {
                  return;
              }
              this.setState({
                  isOpened: true
              });
          }
          close() {
              this.setState({
                  isOpened: false
              }, this.blur);
          }
          handleClick() {
              this.state.isOpened ? this.close() : this.open();
          }
          handlePopOverClick(e) {
              e.stopPropagation();
              e.preventDefault();
          }
          handleKeyPress(e) {
              if (e.key === ' ') {
                  this.handleClick();
                  e.preventDefault();
              }
          }
          confirm() {
              if (!this.state.startDate || !this.state.endDate) {
                  return;
              }
              else if (this.state.startDate.isAfter(this.state.endDate)) {
                  return;
              }
              this.props.onChange(DateRangePicker.formatValue({
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
              }, this.props.format, this.props.joinValues, this.props.delimiter, this.props.utc));
              this.close();
          }
          filterDate(date, originValue, timeFormat, type = 'start') {
              let value = date.clone();
              // 没有初始值
              if (!originValue) {
                  value = value[type === 'start' ? 'startOf' : 'endOf']('day');
              }
              else if (typeof timeFormat === 'string' && /ss/.test(timeFormat)) {
                  value = value[type === 'start' ? 'startOf' : 'endOf']('second');
              }
              else if (typeof timeFormat === 'string' && /mm/.test(timeFormat)) {
                  value = value[type === 'start' ? 'startOf' : 'endOf']('minute');
              }
              else if (typeof timeFormat === 'string' && /HH/i.test(timeFormat)) {
                  value = value[type === 'start' ? 'startOf' : 'endOf']('hour');
              }
              else {
                  value = value[type === 'start' ? 'startOf' : 'endOf']('day');
              }
              return value;
          }
          handleStartChange(newValue) {
              const { embed, timeFormat, minDuration, maxDuration } = this.props;
              const { startDate, endDate } = this.state;
              if (startDate &&
                  !endDate &&
                  newValue.isSameOrAfter(startDate) &&
                  (!minDuration || newValue.isAfter(startDate.clone().add(minDuration))) &&
                  (!maxDuration || newValue.isBefore(startDate.clone().add(maxDuration)))) {
                  return this.setState({
                      endDate: this.filterDate(newValue, endDate, timeFormat, 'end')
                  }, () => {
                      embed && this.confirm();
                  });
              }
              this.setState({
                  startDate: this.filterDate(newValue, startDate, timeFormat, 'start')
              }, () => {
                  embed && this.confirm();
              });
          }
          handleEndChange(newValue) {
              const { embed, timeFormat, minDuration, maxDuration } = this.props;
              const { startDate, endDate } = this.state;
              if (endDate &&
                  !startDate &&
                  newValue.isSameOrBefore(endDate) &&
                  (!minDuration ||
                      newValue.isBefore(endDate.clone().subtract(minDuration))) &&
                  (!maxDuration || newValue.isAfter(endDate.clone().subtract(maxDuration)))) {
                  return this.setState({
                      startDate: this.filterDate(newValue, startDate, timeFormat, 'start')
                  }, () => {
                      embed && this.confirm();
                  });
              }
              this.setState({
                  endDate: this.filterDate(newValue, endDate, timeFormat, 'end')
              }, () => {
                  embed && this.confirm();
              });
          }
          selectRannge(range) {
              const { closeOnSelect, minDate, maxDate } = this.props;
              const now = moment_1.default();
              this.setState({
                  startDate: minDate
                      ? moment_1.default.max(range.startDate(now.clone()), minDate)
                      : range.startDate(now.clone()),
                  endDate: maxDate
                      ? moment_1.default.min(maxDate, range.endDate(now.clone()))
                      : range.endDate(now.clone())
              }, closeOnSelect ? this.confirm : helper_1.noop);
          }
          renderRanges(ranges) {
              if (!ranges) {
                  return null;
              }
              const { classPrefix: ns } = this.props;
              let rangeArr;
              if (typeof ranges === 'string') {
                  rangeArr = ranges.split(',');
              }
              else {
                  rangeArr = ranges;
              }
              const __ = this.props.translate;
              return (react_1.default.createElement("ul", { className: `${ns}DateRangePicker-rangers` }, rangeArr.map(item => {
                  if (!item) {
                      return null;
                  }
                  let range = {};
                  if (typeof item === 'string') {
                      range = availableRanges[item];
                      range.key = item;
                  }
                  else if (item.startDate &&
                      item.endDate) {
                      range = Object.assign(Object.assign({}, item), { startDate: () => item.startDate, endDate: () => item.endDate });
                  }
                  return (react_1.default.createElement("li", { className: `${ns}DateRangePicker-ranger`, onClick: () => this.selectRannge(range), key: range.key || range.label },
                      react_1.default.createElement("a", null, __(range.label))));
              })));
          }
          clearValue(e) {
              e.preventDefault();
              e.stopPropagation();
              const { resetValue, onChange } = this.props;
              onChange(resetValue);
          }
          checkStartIsValidDate(currentDate) {
              let { endDate, startDate } = this.state;
              let { minDate, maxDate, minDuration, maxDuration } = this.props;
              maxDate =
                  maxDate && endDate
                      ? maxDate.isBefore(endDate)
                          ? maxDate
                          : endDate
                      : maxDate || endDate;
              if (minDate && currentDate.isBefore(minDate, 'day')) {
                  return false;
              }
              else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
                  return false;
              }
              else if (
              // 如果配置了 minDuration 那么 EndDate - minDuration 之后的天数也不能选
              endDate &&
                  minDuration &&
                  currentDate.isAfter(endDate.clone().subtract(minDuration))) {
                  return false;
              }
              else if (endDate &&
                  maxDuration &&
                  currentDate.isBefore(endDate.clone().subtract(maxDuration))) {
                  return false;
              }
              return true;
          }
          checkEndIsValidDate(currentDate) {
              let { startDate } = this.state;
              let { minDate, maxDate, minDuration, maxDuration } = this.props;
              minDate =
                  minDate && startDate
                      ? minDate.isAfter(startDate)
                          ? minDate
                          : startDate
                      : minDate || startDate;
              if (minDate && currentDate.isBefore(minDate, 'day')) {
                  return false;
              }
              else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
                  return false;
              }
              else if (startDate &&
                  minDuration &&
                  currentDate.isBefore(startDate.clone().add(minDuration))) {
                  return false;
              }
              else if (startDate &&
                  maxDuration &&
                  currentDate.isAfter(startDate.clone().add(maxDuration))) {
                  return false;
              }
              return true;
          }
          renderDay(props, currentDate) {
              let { startDate, endDate } = this.state;
              if (startDate &&
                  endDate &&
                  currentDate.isBetween(startDate, endDate, 'day', '[]')) {
                  props.className += ' rdtBetween';
              }
              return react_1.default.createElement("td", Object.assign({}, props), currentDate.date());
          }
          renderCalendar() {
              const { classPrefix: ns, dateFormat, timeFormat, ranges, locale, embed } = this.props;
              const __ = this.props.translate;
              let viewMode = 'days';
              const { startDate, endDate } = this.state;
              return (react_1.default.createElement("div", { className: `${ns}DateRangePicker-wrap` },
                  this.renderRanges(ranges),
                  react_1.default.createElement(Calendar_1.default, { className: `${ns}DateRangePicker-start`, value: startDate, onChange: this.handleStartChange, requiredConfirm: false, dateFormat: dateFormat, timeFormat: timeFormat, isValidDate: this.checkStartIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderDay: this.renderDay, locale: locale }),
                  react_1.default.createElement(Calendar_1.default, { className: `${ns}DateRangePicker-end`, value: endDate, onChange: this.handleEndChange, requiredConfirm: false, dateFormat: dateFormat, timeFormat: timeFormat, viewDate: this.nextMonth, isEndDate: true, isValidDate: this.checkEndIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderDay: this.renderDay, locale: locale }),
                  embed ? null : (react_1.default.createElement("div", { key: "button", className: `${ns}DateRangePicker-actions` },
                      react_1.default.createElement("a", { className: classnames_1.default('rdtBtn rdtBtnConfirm', {
                              'is-disabled': !this.state.startDate || !this.state.endDate
                          }), onClick: this.confirm }, __('confirm')),
                      react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.close }, __('cancle'))))));
          }
          render() {
              const { className, classPrefix: ns, value, placeholder, popOverContainer, inputFormat, format, joinValues, delimiter, clearable, disabled, embed, overlayPlacement } = this.props;
              const { isOpened, isFocused } = this.state;
              const selectedDate = DateRangePicker.unFormatValue(value, format, joinValues, delimiter);
              const startViewValue = selectedDate.startDate
                  ? selectedDate.startDate.format(inputFormat)
                  : '';
              const endViewValue = selectedDate.endDate
                  ? selectedDate.endDate.format(inputFormat)
                  : '';
              const arr = [];
              startViewValue && arr.push(startViewValue);
              endViewValue && arr.push(endViewValue);
              const __ = this.props.translate;
              if (embed) {
                  return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}DateRangeCalendar`, {
                          'is-disabled': disabled
                      }, className) }, this.renderCalendar()));
              }
              return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(`${ns}DateRangePicker`, {
                      'is-disabled': disabled,
                      'is-focused': isFocused
                  }, className), ref: this.dom, onClick: this.handleClick },
                  arr.length ? (react_1.default.createElement("span", { className: `${ns}DateRangePicker-value` }, arr.join(__('DateRange.valueConcat')))) : (react_1.default.createElement("span", { className: `${ns}DateRangePicker-placeholder` }, __(placeholder))),
                  clearable && !disabled && value ? (react_1.default.createElement("a", { className: `${ns}DateRangePicker-clear`, onClick: this.clearValue },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  react_1.default.createElement("a", { className: `${ns}DateRangePicker-toggler` },
                      react_1.default.createElement(icons_1.Icon, { icon: "calendar", className: "icon" })),
                  isOpened ? (react_1.default.createElement(Overlay_1.default, { target: () => this.dom.current, onHide: this.close, container: popOverContainer || (() => react_dom_1.findDOMNode(this)), rootClose: false, placement: overlayPlacement, show: true },
                      react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: `${ns}DateRangePicker-popover`, onHide: this.close, onClick: this.handlePopOverClick, overlay: true }, this.renderCalendar()))) : null));
          }
      }
      DateRangePicker.defaultProps = {
          placeholder: 'DateRange.placeholder',
          format: 'X',
          inputFormat: 'YYYY-MM-DD',
          joinValues: true,
          clearable: true,
          delimiter: ',',
          ranges: 'yesterday,7daysago,prevweek,thismonth,prevmonth,prevquarter',
          resetValue: '',
          closeOnSelect: true,
          overlayPlacement: 'auto'
      };
      return DateRangePicker;
  })();
  exports.DateRangePicker = DateRangePicker;
  exports.default = theme_1.themeable(locale_1.localeable(DateRangePicker));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVJhbmdlUGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvRGF0ZVJhbmdlUGlja2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUMxQiw0REFBNEI7QUFDNUIseUNBQXNDO0FBQ3RDLG9FQUE0QjtBQUM1QixtQ0FBNkI7QUFDN0IsZ0VBQWdDO0FBRWhDLDJFQUEyQztBQUMzQyxnRUFBZ0M7QUFDaEMsb0NBQTZEO0FBRTdELDRDQUFxQztBQUNyQyxzQ0FBa0Q7QUFxQ2xELE1BQU0sZUFBZSxHQUE4QjtJQUNqRCxPQUFPLEVBQUU7UUFDUCxLQUFLLEVBQUUsWUFBWTtRQUNuQixTQUFTLEVBQUUsQ0FBQyxHQUFrQixFQUFFLEVBQUU7WUFDaEMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFrQixFQUFFLEVBQUU7WUFDOUIsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0Y7SUFFRCxXQUFXLEVBQUU7UUFDWCxLQUFLLEVBQUUsZ0JBQWdCO1FBQ3ZCLFNBQVMsRUFBRSxDQUFDLEdBQWtCLEVBQUUsRUFBRTtZQUNoQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVDLENBQUM7UUFDRCxPQUFPLEVBQUUsQ0FBQyxHQUFrQixFQUFFLEVBQUU7WUFDOUIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQyxDQUFDO0tBQ0Y7SUFFRCxTQUFTLEVBQUU7UUFDVCxLQUFLLEVBQUUsbUJB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

});
