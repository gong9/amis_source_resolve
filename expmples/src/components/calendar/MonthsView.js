amis.define('src/components/calendar/MonthsView.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CustomMonthsView = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  const MonthsView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/MonthsView"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  class CustomMonthsView extends MonthsView_1.default {
      constructor() {
          super(...arguments);
          this.renderMonth = (props, month) => {
              var localMoment = this.props.viewDate;
              var monthStr = localMoment
                  .localeData()
                  .monthsShort(localMoment.month(month));
              var strLength = 3;
              // Because some months are up to 5 characters long, we want to
              // use a fixed string length for consistency
              var monthStrFixedLength = monthStr.substring(0, strLength);
              return (react_1.default.createElement("td", Object.assign({}, props),
                  react_1.default.createElement("span", null, monthStrFixedLength)));
          };
      }
      render() {
          const __ = this.props.translate;
          const showYearHead = !/^mm$/i.test(this.props.inputFormat || '');
          const canClick = /yy/i.test(this.props.inputFormat || '');
          return (react_1.default.createElement("div", { className: "rdtMonths" },
              showYearHead && (react_1.default.createElement("table", null,
                  react_1.default.createElement("thead", null,
                      react_1.default.createElement("tr", null,
                          react_1.default.createElement("th", { className: "rdtPrev", onClick: this.props.subtractTime(1, 'years') }, "\u00AB"),
                          canClick ? (react_1.default.createElement("th", { className: "rdtSwitch", onClick: this.props.showView('years') }, this.props.viewDate.format(__('dateformat.year')))) : (react_1.default.createElement("th", { className: "rdtSwitch" }, this.props.viewDate.format(__('dateformat.year')))),
                          react_1.default.createElement("th", { className: "rdtNext", onClick: this.props.addTime(1, 'years') }, "\u00BB"))))),
              react_1.default.createElement("table", null,
                  react_1.default.createElement("tbody", null, this.renderMonths()))));
      }
  }
  exports.CustomMonthsView = CustomMonthsView;
  exports.default = locale_1.localeable(CustomMonthsView);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9udGhzVmlldy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL2NhbGVuZGFyL01vbnRoc1ZpZXcudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxhQUFhO0FBQ2IsdUZBQXVEO0FBRXZELDBEQUEwQjtBQUMxQix5Q0FBa0U7QUFNbEUsTUFBYSxnQkFBaUIsU0FBUSxvQkFBVTtJQUFoRDs7UUFpQkUsZ0JBQVcsR0FBRyxDQUFDLEtBQVUsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUMxQyxJQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUN0QyxJQUFJLFFBQVEsR0FBRyxXQUFXO2lCQUN2QixVQUFVLEVBQUU7aUJBQ1osV0FBVyxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUN6QyxJQUFJLFNBQVMsR0FBRyxDQUFDLENBQUM7WUFDbEIsOERBQThEO1lBQzlELDRDQUE0QztZQUM1QyxJQUFJLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQzNELE9BQU8sQ0FDTCxzREFBUSxLQUFLO2dCQUNYLDRDQUFPLG1CQUFtQixDQUFRLENBQy9CLENBQ04sQ0FBQztRQUNKLENBQUMsQ0FBQztJQWdESixDQUFDO0lBL0NDLE1BQU07UUFDSixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUNoQyxNQUFNLFlBQVksR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLENBQUM7UUFDakUsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUUxRCxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFDLFdBQVc7WUFDdkIsWUFBWSxJQUFJLENBQ2Y7Z0JBQ0U7b0JBQ0U7d0JBQ0Usc0NBQ0UsU0FBUyxFQUFDLFNBQVMsRUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsYUFHekM7d0JBQ0osUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUNWLHNDQUNFLFNBQVMsRUFBQyxXQUFXLEVBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFFcEMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQy9DLENBQ04sQ0FBQyxDQUFDLENBQUMsQ0FDRixzQ0FBSSxTQUFTLEVBQUMsV0FBVyxJQUN0QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FDL0MsQ0FDTjt3QkFFRCxzQ0FDRSxTQUFTLEVBQUMsU0FBUyxFQUNuQixPQUFPLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLE9BQU8sQ0FBQyxhQUdwQyxDQUNGLENBQ0MsQ0FDRixDQUNUO1lBRUQ7Z0JBQ0UsNkNBQVEsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFTLENBQzlCLENBQ0osQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBL0VELDRDQStFQztBQUVELGtCQUFlLG1CQUFVLENBQUMsZ0JBQXVCLENBQUMsQ0FBQyJ9

});
