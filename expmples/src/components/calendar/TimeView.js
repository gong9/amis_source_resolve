amis.define('src/components/calendar/TimeView.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CustomTimeView = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  const TimeView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/TimeView"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  const icons_1 = require("src/components/icons.tsx");
  class CustomTimeView extends TimeView_1.default {
      constructor() {
          super(...arguments);
          this.padValues = {
              hours: 2,
              minutes: 2,
              seconds: 2,
              milliseconds: 3
          };
          this.renderDayPart = () => {
              const { translate: __, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { key: "dayPart", className: cx('CalendarCounter CalendarCounter--daypart') },
                  react_1.default.createElement("span", { key: "up", className: cx('CalendarCounter-btn CalendarCounter-btn--up'), onClick: this.onStartClicking('toggleDayPart', 'hours'), onContextMenu: this.disableContextMenu },
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold" })),
                  react_1.default.createElement("div", { className: cx('CalendarCounter-value'), key: this.state.daypart }, __(this.state.daypart)),
                  react_1.default.createElement("span", { key: "down", className: cx('CalendarCounter-btn CalendarCounter-btn--down'), onClick: this.onStartClicking('toggleDayPart', 'hours'), onContextMenu: this.disableContextMenu },
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold" }))));
          };
          this.renderCounter = (type) => {
              const cx = this.props.classnames;
              if (type !== 'daypart') {
                  var value = this.state[type];
                  if (type === 'hours' &&
                      this.props.timeFormat.toLowerCase().indexOf(' a') !== -1) {
                      value = ((value - 1) % 12) + 1;
                      if (value === 0) {
                          value = 12;
                      }
                  }
                  const { min, max, step } = this.timeConstraints[type];
                  return (react_1.default.createElement("div", { key: type, className: cx('CalendarCounter') },
                      react_1.default.createElement("span", { key: "up", className: cx('CalendarCounter-btn CalendarCounter-btn--up'), onMouseDown: this.onStartClicking('increase', type), onContextMenu: this.disableContextMenu },
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold" })),
                      react_1.default.createElement("div", { key: "c", className: cx('CalendarCounter-value') },
                          react_1.default.createElement("input", { type: "text", value: this.pad(type, value), className: cx('CalendarInput'), min: min, max: max, step: step, onChange: e => this.props.setTime(type, Math.max(min, Math.min(parseInt(e.currentTarget.value.replace(/\D/g, ''), 10) ||
                                  0, max))) })),
                      react_1.default.createElement("span", { key: "do", className: cx('CalendarCounter-btn CalendarCounter-btn--down'), onMouseDown: this.onStartClicking('decrease', type), onContextMenu: this.disableContextMenu },
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold" }))));
              }
              return null;
          };
      }
      render() {
          const counters = [];
          const cx = this.props.classnames;
          this.state.counters.forEach(c => {
              if (counters.length) {
                  counters.push(react_1.default.createElement("div", { key: `sep${counters.length}`, className: cx('CalendarCounter-sep') }, ":"));
              }
              counters.push(this.renderCounter(c));
          });
          if (this.state.daypart !== false) {
              counters.push(this.renderDayPart());
          }
          if (this.state.counters.length === 3 &&
              this.props.timeFormat.indexOf('S') !== -1) {
              counters.push(react_1.default.createElement("div", { className: cx('CalendarCounter-sep'), key: "sep5" }, ":"));
              counters.push(react_1.default.createElement("div", { className: cx('CalendarCounter CalendarCounter--milli') },
                  react_1.default.createElement("input", { value: this.state.milliseconds, type: "text", onChange: this.updateMilli })));
          }
          return react_1.default.createElement("div", { className: cx('CalendarTime') }, counters);
      }
  }
  exports.CustomTimeView = CustomTimeView;
  exports.default = locale_1.localeable(CustomTimeView);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZVZpZXcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jYWxlbmRhci9UaW1lVmlldy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLGFBQWE7QUFDYixtRkFBbUQ7QUFFbkQsMERBQTBCO0FBQzFCLHlDQUFxRDtBQUNyRCxvQ0FBOEI7QUFHOUIsTUFBYSxjQUFlLFNBQVEsa0JBQVE7SUFBNUM7O1FBeUJFLGNBQVMsR0FBRztZQUNWLEtBQUssRUFBRSxDQUFDO1lBQ1IsT0FBTyxFQUFFLENBQUM7WUFDVixPQUFPLEVBQUUsQ0FBQztZQUNWLFlBQVksRUFBRSxDQUFDO1NBQ2hCLENBQUM7UUFFRixrQkFBYSxHQUFHLEdBQUcsRUFBRTtZQUNuQixNQUFNLEVBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNuRCxPQUFPLENBQ0wsdUNBQ0UsR0FBRyxFQUFDLFNBQVMsRUFDYixTQUFTLEVBQUUsRUFBRSxDQUFDLDBDQUEwQyxDQUFDO2dCQUV6RCx3Q0FDRSxHQUFHLEVBQUMsSUFBSSxFQUNSLFNBQVMsRUFBRSxFQUFFLENBQUMsNkNBQTZDLENBQUMsRUFDNUQsT0FBTyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxFQUN2RCxhQUFhLEVBQUUsSUFBSSxDQUFDLGtCQUFrQjtvQkFFdEMsOEJBQUMsWUFBSSxJQUFDLElBQUksRUFBQyxrQkFBa0IsR0FBRyxDQUMzQjtnQkFDUCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxJQUNqRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDbkI7Z0JB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

});
