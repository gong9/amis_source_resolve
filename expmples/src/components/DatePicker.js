amis.define('src/components/DatePicker.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file DatePicker
   * @description 时间选择器组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DatePicker = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  require("node_modules/moment/locale/zh-cn");
  const icons_1 = require("src/components/icons.tsx");
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const theme_1 = require("src/theme.tsx");
  const Calendar_1 = tslib_1.__importDefault(require("src/components/calendar/Calendar.tsx"));
  ''/*@require node_modules/react-datetime/css/react-datetime.css*/;
  const locale_1 = require("src/locale.tsx");
  const availableShortcuts = {
      now: {
          label: 'Date.now',
          date: (now) => {
              return now;
          }
      },
      today: {
          label: 'Date.today',
          date: (now) => {
              return now.startOf('day');
          }
      },
      yesterday: {
          label: 'Date.yesterday',
          date: (now) => {
              return now.add(-1, 'days').startOf('day');
          }
      },
      thisweek: {
          label: 'Date.monday',
          date: (now) => {
              return now.startOf('week').startOf('day');
          }
      },
      thismonth: {
          label: 'Date.startOfMonth',
          date: (now) => {
              return now.startOf('month');
          }
      },
      prevmonth: {
          label: 'Date.startOfLastMonth',
          date: (now) => {
              return now.startOf('month').add(-1, 'month');
          }
      },
      prevquarter: {
          label: 'Date.startOfLastQuarter',
          date: (now) => {
              return now.startOf('quarter').add(-1, 'quarter');
          }
      },
      thisquarter: {
          label: 'Date.startOfQuarter',
          date: (now) => {
              return now.startOf('quarter');
          }
      },
      tomorrow: {
          label: 'Date.tomorrow',
          date: (now) => {
              return now.add(1, 'days').startOf('day');
          }
      },
      endofthisweek: {
          label: 'Date.endOfWeek',
          date: (now) => {
              return now.endOf('week');
          }
      },
      endofthismonth: {
          label: 'Date.endOfMonth',
          date: (now) => {
              return now.endOf('month');
          }
      }
  };
  const advancedShortcuts = [
      {
          regexp: /^(\d+)hoursago$/,
          resolve: (__, _, hours) => {
              return {
                  label: __('Date.hoursago', { hours }),
                  date: (now) => {
                      return now.subtract(hours, 'hours');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)hourslater$/,
          resolve: (__, _, hours) => {
              return {
                  label: __('Date.hourslater', { hours }),
                  date: (now) => {
                      return now.add(hours, 'hours');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)daysago$/,
          resolve: (__, _, days) => {
              return {
                  label: __('Date.daysago', { days }),
                  date: (now) => {
                      return now.subtract(days, 'days');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)dayslater$/,
          resolve: (__, _, days) => {
              return {
                  label: __('Date.dayslater', { days }),
                  date: (now) => {
                      return now.add(days, 'days');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)weeksago$/,
          resolve: (__, _, weeks) => {
              return {
                  label: __('Date.weeksago', { weeks }),
                  date: (now) => {
                      return now.subtract(weeks, 'weeks');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)weekslater$/,
          resolve: (__, _, weeks) => {
              return {
                  label: __('Date.weekslater', { weeks }),
                  date: (now) => {
                      return now.add(weeks, 'weeks');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)monthsago$/,
          resolve: (__, _, months) => {
              return {
                  label: __('Date.monthsago', { months }),
                  date: (now) => {
                      return now.subtract(months, 'months');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)monthslater$/,
          resolve: (__, _, months) => {
              return {
                  label: __('Date.monthslater', { months }),
                  date: (now) => {
                      return now.add(months, 'months');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)quartersago$/,
          resolve: (__, _, quarters) => {
              return {
                  label: __('Date.quartersago', { quarters }),
                  date: (now) => {
                      return now.subtract(quarters, 'quarters');
                  }
              };
          }
      },
      {
          regexp: /^(\d+)quarterslater$/,
          resolve: (__, _, quarters) => {
              return {
                  label: __('Date.quarterslater', { quarters }),
                  date: (now) => {
                      return now.add(quarters, 'quarters');
                  }
              };
          }
      }
  ];
  function normalizeValue(value, format) {
      if (!value || value === '0') {
          return undefined;
      }
      const v = moment_1.default(value, format, true);
      return v.isValid() ? v : undefined;
  }
  let DatePicker = /** @class */ (() => {
      class DatePicker extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  isOpened: false,
                  isFocused: false,
                  value: normalizeValue(this.props.value, this.props.format)
              };
              this.domRef = (ref) => {
                  this.dom = ref;
              };
              this.handleChange = this.handleChange.bind(this);
              this.selectRannge = this.selectRannge.bind(this);
              this.checkIsValidDate = this.checkIsValidDate.bind(this);
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleKeyPress = this.handleKeyPress.bind(this);
              this.getParent = this.getParent.bind(this);
              this.getTarget = this.getTarget.bind(this);
              this.handlePopOverClick = this.handlePopOverClick.bind(this);
              this.renderShortCuts = this.renderShortCuts.bind(this);
          }
          componentWillReceiveProps(nextProps) {
              if (this.props.value !== nextProps.value) {
                  this.setState({
                      value: normalizeValue(nextProps.value, nextProps.format)
                  });
              }
          }
          focus() {
              if (!this.dom) {
                  return;
              }
              this.dom.focus();
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
          handleKeyPress(e) {
              if (e.key === ' ') {
                  this.handleClick();
                  e.preventDefault();
              }
          }
          handleClick() {
              this.state.isOpened ? this.close() : this.open();
          }
          handlePopOverClick(e) {
              e.stopPropagation();
              e.preventDefault();
          }
          open(fn) {
              this.props.disabled ||
                  this.setState({
                      isOpened: true
                  }, fn);
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          clearValue(e) {
              e.preventDefault();
              e.stopPropagation();
              const onChange = this.props.onChange;
              onChange('');
          }
          handleChange(value) {
              const { onChange, format, minTime, maxTime, dateFormat, timeFormat, closeOnSelect, utc, viewMode } = this.props;
              if (!moment_1.default.isMoment(value)) {
                  return;
              }
              if (minTime && value && value.isBefore(minTime, 'second')) {
                  value = minTime;
              }
              else if (maxTime && value && value.isAfter(maxTime, 'second')) {
                  value = maxTime;
              }
              onChange(utc ? moment_1.default.utc(value).format(format) : value.format(format));
              if (closeOnSelect && dateFormat && !timeFormat) {
                  this.close();
              }
          }
          selectRannge(item) {
              const { closeOnSelect } = this.props;
              const now = moment_1.default();
              this.handleChange(item.date(now));
              closeOnSelect && this.close();
          }
          checkIsValidDate(currentDate) {
              const { minDate, maxDate } = this.props;
              if (minDate && currentDate.isBefore(minDate, 'day')) {
                  return false;
              }
              else if (maxDate && currentDate.isAfter(maxDate, 'day')) {
                  return false;
              }
              return true;
          }
          getTarget() {
              return this.dom;
          }
          getParent() {
              return this.dom;
          }
          getAvailableShortcuts(key) {
              if (availableShortcuts[key]) {
                  return availableShortcuts[key];
              }
              const __ = this.props.translate;
              for (let i = 0, len = advancedShortcuts.length; i < len; i++) {
                  let item = advancedShortcuts[i];
                  const m = item.regexp.exec(key);
                  if (m) {
                      return item.resolve.apply(item, [__, ...m]);
                  }
              }
              return null;
          }
          renderShortCuts(shortcuts) {
              if (!shortcuts) {
                  return null;
              }
              const { classPrefix: ns } = this.props;
              let shortcutArr;
              if (typeof shortcuts === 'string') {
                  shortcutArr = shortcuts.split(',');
              }
              else {
                  shortcutArr = shortcuts;
              }
              const __ = this.props.translate;
              return (react_1.default.createElement("ul", { className: `${ns}DatePicker-shortcuts` }, shortcutArr.map(item => {
                  if (!item) {
                      return null;
                  }
                  let shortcut = {};
                  if (typeof item === 'string') {
                      shortcut = this.getAvailableShortcuts(item);
                      shortcut.key = item;
                  }
                  else if (item.date) {
                      shortcut = Object.assign(Object.assign({}, item), { date: () => item.date });
                  }
                  return (react_1.default.createElement("li", { className: `${ns}DatePicker-shortcut`, onClick: () => this.selectRannge(shortcut), key: shortcut.key || shortcut.label },
                      react_1.default.createElement("a", null, __(shortcut.label))));
              })));
          }
          render() {
              const { classPrefix: ns, className, value, placeholder, disabled, inputFormat, dateFormat, timeFormat, viewMode, timeConstraints, popOverContainer, clearable, shortcuts, utc, overlayPlacement, locale, format, embed } = this.props;
              const __ = this.props.translate;
              const isOpened = this.state.isOpened;
              let date = this.state.value;
              if (embed) {
                  return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}DateCalendar`, {
                          'is-disabled': disabled
                      }, className) },
                      react_1.default.createElement(Calendar_1.default, { value: date, onChange: this.handleChange, requiredConfirm: false, dateFormat: dateFormat, timeFormat: timeFormat, isValidDate: this.checkIsValidDate, viewMode: viewMode, timeConstraints: timeConstraints, input: false, onClose: this.close, locale: locale })));
              }
              return (react_1.default.createElement("div", { tabIndex: 0, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, className: classnames_1.default(`${ns}DatePicker`, {
                      'is-disabled': disabled,
                      'is-focused': this.state.isFocused
                  }, className), ref: this.domRef, onClick: this.handleClick },
                  date ? (react_1.default.createElement("span", { className: `${ns}DatePicker-value` }, date.format(inputFormat))) : (react_1.default.createElement("span", { className: `${ns}DatePicker-placeholder` }, __(placeholder))),
                  clearable && !disabled && normalizeValue(value, format) ? (react_1.default.createElement("a", { className: `${ns}DatePicker-clear`, onClick: this.clearValue },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  react_1.default.createElement("a", { className: `${ns}DatePicker-toggler` },
                      react_1.default.createElement(icons_1.Icon, { icon: "calendar", className: "icon" })),
                  isOpened ? (react_1.default.createElement(Overlay_1.default, { target: this.getTarget, container: popOverContainer || this.getParent, rootClose: false, placement: overlayPlacement, show: true },
                      react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: `${ns}DatePicker-popover`, onHide: this.close, overlay: true, onClick: this.handlePopOverClick },
                          this.renderShortCuts(shortcuts),
                          react_1.default.createElement(Calendar_1.default, { value: date, onChange: this.handleChange, requiredConfirm: !!(dateFormat && timeFormat), dateFormat: dateFormat, inputFormat: inputFormat, timeFormat: timeFormat, isValidDate: this.checkIsValidDate, viewMode: viewMode, timeConstraints: timeConstraints, input: false, onClose: this.close, locale: locale })))) : null));
          }
      }
      DatePicker.defaultProps = {
          viewMode: 'days',
          shortcuts: '',
          closeOnSelect: true,
          overlayPlacement: 'auto'
      };
      return DatePicker;
  })();
  exports.DatePicker = DatePicker;
  exports.default = theme_1.themeable(locale_1.localeable(DatePicker));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVBpY2tlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0RhdGVQaWNrZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9FQUE0QjtBQUM1Qiw0REFBNEI7QUFDNUIsK0JBQTZCO0FBQzdCLG1DQUE2QjtBQUM3QixnRUFBZ0M7QUFDaEMsZ0VBQWdDO0FBQ2hDLG9DQUE2RDtBQUU3RCwyRUFBMkM7QUFDM0MsaURBQStDO0FBQy9DLHNDQUErRDtBQUUvRCxNQUFNLGtCQUFrQixHQUE4QjtJQUNwRCxHQUFHLEVBQUU7UUFDSCxLQUFLLEVBQUUsVUFBVTtRQUNqQixJQUFJLEVBQUUsQ0FBQyxHQUFrQixFQUFFLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUM7UUFDYixDQUFDO0tBQ0Y7SUFDRCxLQUFLLEVBQUU7UUFDTCxLQUFLLEVBQUUsWUFBWTtRQUNuQixJQUFJLEVBQUUsQ0FBQyxHQUFrQixFQUFFLEVBQUU7WUFDM0IsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzVCLENBQUM7S0FDRjtJQUVELFNBQVMsRUFBRTtRQUNULEtBQUssRUFBRSxnQkFBZ0I7UUFDdkIsSUFBSSxFQUFFLENBQUMsR0FBa0IsRUFBRSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUMsQ0FBQztLQUNGO0lBRUQsUUFBUSxFQUFFO1FBQ1IsS0FBSyxFQUFFLGFBQWE7UUFDcEIsSUFBSSxFQUFFLENBQUMsR0FBa0IsRUFBRSxFQUFFO1lBQzNCLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxD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

});
