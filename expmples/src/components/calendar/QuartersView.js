amis.define('src/components/calendar/QuartersView.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.QuarterView = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  class QuarterView extends react_1.default.Component {
      constructor() {
          super(...arguments);
          this.renderQuarter = (props, quartar, year, date) => {
              return (react_1.default.createElement("td", Object.assign({}, props),
                  react_1.default.createElement("span", null,
                      "Q",
                      quartar)));
          };
          this.updateSelectedQuarter = (event) => {
              this.props.updateSelectedDate(event);
          };
      }
      renderYear() {
          const __ = this.props.translate;
          const showYearHead = !/^mm$/i.test(this.props.inputFormat || '');
          if (!showYearHead) {
              return null;
          }
          const canClick = /yy/i.test(this.props.inputFormat || '');
          return (react_1.default.createElement("table", null,
              react_1.default.createElement("thead", null,
                  react_1.default.createElement("tr", null,
                      react_1.default.createElement("th", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'years') }, "\u00AB"),
                      canClick ? (react_1.default.createElement("th", { className: "rdtSwitch", onClick: this.props.showView('years') }, this.props.viewDate.format(__('dateformat.year')))) : (react_1.default.createElement("th", { className: "rdtSwitch" }, this.props.viewDate.format(__('dateformat.year')))),
                      react_1.default.createElement("th", { className: "rdtNext", onClick: this.props.addTime(1, 'years') }, "\u00BB")))));
      }
      renderQuarters() {
          let date = this.props.selectedDate, month = this.props.viewDate.month(), year = this.props.viewDate.year(), rows = [], i = 1, months = [], renderer = this.props.renderQuarter || this.renderQuarter, isValid = this.props.isValidDate || this.alwaysValidDate, classes, props, currentMonth, isDisabled, noOfDaysInMonth, daysInMonth, validDay, 
          // Date is irrelevant because we're only interested in month
          irrelevantDate = 1;
          while (i < 5) {
              classes = 'rdtQuarter';
              currentMonth = this.props.viewDate
                  .clone()
                  .set({ year: year, quarter: i, date: irrelevantDate });
              noOfDaysInMonth = currentMonth.endOf('quarter').format('Q');
              daysInMonth = Array.from({ length: parseInt(noOfDaysInMonth, 10) }, function (e, i) {
                  return i + 1;
              });
              validDay = daysInMonth.find(function (d) {
                  var day = currentMonth.clone().set('date', d);
                  return isValid(day);
              });
              isDisabled = validDay === undefined;
              if (isDisabled)
                  classes += ' rdtDisabled';
              if (date && i === date.quarter() && year === date.year())
                  classes += ' rdtActive';
              props = {
                  'key': i,
                  'data-value': i,
                  'className': classes
              };
              if (!isDisabled) {
                  props.onClick =
                      this.props.updateOn === 'quarters'
                          ? this.updateSelectedQuarter
                          : this.props.setDate('quarter');
              }
              months.push(renderer(props, i, year, date && date.clone()));
              if (months.length === 2) {
                  rows.push(react_1.default.createElement('tr', { key: month + '_' + rows.length }, months));
                  months = [];
              }
              i++;
          }
          return rows;
      }
      render() {
          const { classnames: cx } = this.props;
          return (react_1.default.createElement("div", { className: cx('ClalendarQuarter') },
              this.renderYear(),
              react_1.default.createElement("table", null,
                  react_1.default.createElement("tbody", null, this.renderQuarters()))));
      }
  }
  exports.QuarterView = QuarterView;
  exports.default = locale_1.localeable(QuarterView);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVhcnRlcnNWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvY2FsZW5kYXIvUXVhcnRlcnNWaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHlDQUFxRDtBQXlCckQsTUFBYSxXQUFZLFNBQVEsZUFBSyxDQUFDLFNBQTJCO0lBQWxFOztRQWlIRSxrQkFBYSxHQUFHLENBQ2QsS0FBVSxFQUNWLE9BQWUsRUFDZixJQUFZLEVBQ1osSUFBbUIsRUFDbkIsRUFBRTtZQUNGLE9BQU8sQ0FDTCxzREFBUSxLQUFLO2dCQUNYOztvQkFBUSxPQUFPLENBQVEsQ0FDcEIsQ0FDTixDQUFDO1FBQ0osQ0FBQyxDQUFDO1FBRUYsMEJBQXFCLEdBQUcsQ0FBQyxLQUFVLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQztJQWNKLENBQUM7SUEzSUMsVUFBVTtRQUNSLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUVqRSxJQUFJLENBQUMsWUFBWSxFQUFFO1lBQ2pCLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FDTDtZQUNFO2dCQUNFO29CQUNFLHNDQUNFLFNBQVMsRUFBQyxTQUFTLEVBQ25CLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVks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

});
