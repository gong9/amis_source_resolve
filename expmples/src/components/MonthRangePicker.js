amis.define('src/components/MonthRangePicker.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file MonthRangePicker
   * @description 月份范围选择器
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MonthRangePicker = void 0;
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
  const locale_1 = require("src/locale.tsx");
  const DateRangePicker_1 = require("src/components/DateRangePicker.tsx");
  const capitalize_1 = tslib_1.__importDefault(require("node_modules/lodash/capitalize"));
  let MonthRangePicker = /** @class */ (() => {
      class MonthRangePicker extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.nextMonth = moment_1.default().add(1, 'year').startOf('month');
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
              this.renderMonth = this.renderMonth.bind(this);
              const { format, joinValues, delimiter, value } = this.props;
              this.state = Object.assign({ isOpened: false, isFocused: false }, DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter));
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const { value, format, joinValues, delimiter } = nextProps;
              if (props.value !== value) {
                  this.setState(Object.assign({}, DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter)));
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
              this.props.onChange(DateRangePicker_1.DateRangePicker.formatValue({
                  startDate: this.state.startDate,
                  endDate: this.state.endDate
              }, this.props.format, this.props.joinValues, this.props.delimiter, this.props.utc));
              this.close();
          }
          filterDate(date, originValue, timeFormat, type = 'start') {
              let value = date.clone();
              value = value[type === 'start' ? 'startOf' : 'endOf']('month');
              return value;
          }
          handleStartChange(newValue) {
              const { embed, minDuration, maxDuration } = this.props;
              const { startDate, endDate } = this.state;
              if (startDate &&
                  !endDate &&
                  newValue.isSameOrAfter(startDate) &&
                  (!minDuration || newValue.isAfter(startDate.clone().add(minDuration))) &&
                  (!maxDuration || newValue.isBefore(startDate.clone().add(maxDuration)))) {
                  return this.setState({
                      endDate: this.filterDate(newValue, endDate, '', 'end')
                  }, () => {
                      embed && this.confirm();
                  });
              }
              this.setState({
                  startDate: this.filterDate(newValue, startDate, '', 'start')
              }, () => {
                  embed && this.confirm();
              });
          }
          handleEndChange(newValue) {
              const { embed, minDuration, maxDuration } = this.props;
              const { startDate, endDate } = this.state;
              if (endDate &&
                  !startDate &&
                  newValue.isSameOrBefore(endDate) &&
                  (!minDuration ||
                      newValue.isBefore(endDate.clone().subtract(minDuration))) &&
                  (!maxDuration || newValue.isAfter(endDate.clone().subtract(maxDuration)))) {
                  return this.setState({
                      startDate: this.filterDate(newValue, startDate, '', 'start')
                  }, () => {
                      embed && this.confirm();
                  });
              }
              this.setState({
                  endDate: this.filterDate(newValue, endDate, '', 'end')
              }, () => {
                  embed && this.confirm();
              });
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
          renderMonth(props, month, year) {
              var currentDate = moment_1.default().year(year).month(month);
              var monthStr = currentDate
                  .localeData()
                  .monthsShort(currentDate.month(month));
              var strLength = 3;
              var monthStrFixedLength = monthStr.substring(0, strLength);
              const { startDate, endDate } = this.state;
              if (startDate &&
                  endDate &&
                  currentDate.isBetween(startDate, endDate, 'month', '[]')) {
                  props.className += ' rdtBetween';
              }
              return (react_1.default.createElement("td", Object.assign({}, props),
                  react_1.default.createElement("span", null, capitalize_1.default(monthStrFixedLength))));
          }
          renderCalendar() {
              const { classPrefix: ns, locale, embed } = this.props;
              const __ = this.props.translate;
              const viewMode = 'months';
              const dateFormat = 'YYYY-MM';
              const { startDate, endDate } = this.state;
              return (react_1.default.createElement("div", { className: `${ns}DateRangePicker-wrap` },
                  react_1.default.createElement(Calendar_1.default, { className: `${ns}DateRangePicker-start`, value: startDate, onChange: this.handleStartChange, requiredConfirm: false, dateFormat: dateFormat, isValidDate: this.checkStartIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderMonth: this.renderMonth, locale: locale }),
                  react_1.default.createElement(Calendar_1.default, { className: `${ns}DateRangePicker-end`, value: 
                      // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                      endDate === null || 
                      // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                      endDate === void 0 ? void 0 : 
                      // 因为如果最后一天，切换月份的时候会切不了,有的月份有 31 号，有的没有。
                      endDate.clone().startOf('month'), onChange: this.handleEndChange, requiredConfirm: false, dateFormat: dateFormat, viewDate: this.nextMonth, isEndDate: true, isValidDate: this.checkEndIsValidDate, viewMode: viewMode, input: false, onClose: this.close, renderMonth: this.renderMonth, locale: locale }),
                  embed ? null : (react_1.default.createElement("div", { key: "button", className: `${ns}DateRangePicker-actions` },
                      react_1.default.createElement("a", { className: classnames_1.default('rdtBtn rdtBtnConfirm', {
                              'is-disabled': !this.state.startDate || !this.state.endDate
                          }), onClick: this.confirm }, __('confirm')),
                      react_1.default.createElement("a", { className: "rdtBtn rdtBtnCancel", onClick: this.close }, __('cancle'))))));
          }
          render() {
              const { className, classPrefix: ns, value, placeholder, popOverContainer, inputFormat, format, joinValues, delimiter, clearable, disabled, embed, overlayPlacement } = this.props;
              const { isOpened, isFocused } = this.state;
              const selectedDate = DateRangePicker_1.DateRangePicker.unFormatValue(value, format, joinValues, delimiter);
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
      MonthRangePicker.defaultProps = {
          placeholder: 'MonthRange.placeholder',
          format: 'YYYY-MM',
          inputFormat: 'YYYY-MM',
          joinValues: true,
          clearable: true,
          delimiter: ',',
          resetValue: '',
          closeOnSelect: true,
          overlayPlacement: 'auto'
      };
      return MonthRangePicker;
  })();
  exports.MonthRangePicker = MonthRangePicker;
  exports.default = theme_1.themeable(locale_1.localeable(MonthRangePicker));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9udGhSYW5nZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL01vbnRoUmFuZ2VQaWNrZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLDREQUE0QjtBQUM1Qix5Q0FBc0M7QUFDdEMsb0VBQTRCO0FBQzVCLG1DQUE2QjtBQUM3QixnRUFBZ0M7QUFDaEMsMkVBQTJDO0FBQzNDLGdFQUFnQztBQUNoQyxvQ0FBK0M7QUFHL0Msc0NBQWtEO0FBQ2xELHVEQUFrRDtBQUNsRCwyRUFBMkM7QUFtQzNDO0lBQUEsTUFBYSxnQkFBaUIsU0FBUSxlQUFLLENBQUMsU0FHM0M7UUFvQkMsWUFBWSxLQUE0QjtZQUN0QyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFIZixjQUFTLEdBQUcsZ0JBQU0sRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBS25ELElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFB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

});
