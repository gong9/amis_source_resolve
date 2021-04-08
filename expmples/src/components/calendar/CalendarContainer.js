amis.define('src/components/calendar/CalendarContainer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  const CalendarContainer_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/CalendarContainer"));
  const DaysView_1 = tslib_1.__importDefault(require("src/components/calendar/DaysView.tsx"));
  const YearsView_1 = tslib_1.__importDefault(require("src/components/calendar/YearsView.tsx"));
  const MonthsView_1 = tslib_1.__importDefault(require("src/components/calendar/MonthsView.tsx"));
  const TimeView_1 = tslib_1.__importDefault(require("src/components/calendar/TimeView.tsx"));
  const QuartersView_1 = tslib_1.__importDefault(require("src/components/calendar/QuartersView.tsx"));
  class CustomCalendarContainer extends CalendarContainer_1.default {
      constructor() {
          super(...arguments);
          this.viewComponents = Object.assign(Object.assign({}, this.viewComponents), { days: DaysView_1.default, years: YearsView_1.default, months: MonthsView_1.default, time: TimeView_1.default, quarters: QuartersView_1.default });
      }
  }
  exports.default = CustomCalendarContainer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsZW5kYXJDb250YWluZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jYWxlbmRhci9DYWxlbmRhckNvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsYUFBYTtBQUNiLHFHQUFxRTtBQUVyRSxrRUFBd0M7QUFDeEMsb0VBQTBDO0FBQzFDLHNFQUE0QztBQUM1QyxrRUFBd0M7QUFDeEMsMEVBQTBDO0FBRTFDLE1BQXFCLHVCQUF3QixTQUFRLDJCQUFpQjtJQUF0RTs7UUFDRSxtQkFBYyxtQ0FDUixJQUFZLENBQUMsY0FBYyxLQUMvQixJQUFJLEVBQUUsa0JBQWMsRUFDcEIsS0FBSyxFQUFFLG1CQUFlLEVBQ3RCLE1BQU0sRUFBRSxvQkFBZ0IsRUFDeEIsSUFBSSxFQUFFLGtCQUFjLEVBQ3BCLFFBQVEsRUFBRSxzQkFBWSxJQUN0QjtJQUNKLENBQUM7Q0FBQTtBQVRELDBDQVNDIn0=

});
