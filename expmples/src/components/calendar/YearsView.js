amis.define('src/components/calendar/YearsView.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CustomYearsView = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // @ts-ignore
  const YearsView_1 = tslib_1.__importDefault(require("node_modules/react-datetime/src/YearsView"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  class CustomYearsView extends YearsView_1.default {
      constructor() {
          super(...arguments);
          this.renderYear = (props, year) => {
              return (react_1.default.createElement("td", Object.assign({}, props),
                  react_1.default.createElement("span", null, year)));
          };
      }
      render() {
          let year = this.props.viewDate.year();
          year = year - (year % 10);
          const __ = this.props.translate;
          return (react_1.default.createElement("div", { className: "rdtYears" },
              react_1.default.createElement("table", null,
                  react_1.default.createElement("thead", null,
                      react_1.default.createElement("tr", null,
                          react_1.default.createElement("th", { className: "rdtPrev", onClick: this.props.subtractTime(10, 'years') }, "\u00AB"),
                          react_1.default.createElement("th", { className: "rdtSwitch" }, __('year-to-year', { from: year, to: year + 9 })),
                          react_1.default.createElement("th", { className: "rdtNext", onClick: this.props.addTime(10, 'years') }, "\u00BB")))),
              react_1.default.createElement("table", null,
                  react_1.default.createElement("tbody", null, this.renderYears(year)))));
      }
  }
  exports.CustomYearsView = CustomYearsView;
  exports.default = locale_1.localeable(CustomYearsView);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiWWVhcnNWaWV3LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvY2FsZW5kYXIvWWVhcnNWaWV3LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsYUFBYTtBQUNiLHFGQUFxRDtBQUVyRCwwREFBMEI7QUFDMUIseUNBQXFEO0FBRXJELE1BQWEsZUFBZ0IsU0FBUSxtQkFBUztJQUE5Qzs7UUFnQkUsZUFBVSxHQUFHLENBQUMsS0FBVSxFQUFFLElBQVksRUFBRSxFQUFFO1lBQ3hDLE9BQU8sQ0FDTCxzREFBUSxLQUFLO2dCQUNYLDRDQUFPLElBQUksQ0FBUSxDQUNoQixDQUNOLENBQUM7UUFDSixDQUFDLENBQUM7SUFnQ0osQ0FBQztJQS9CQyxNQUFNO1FBQ0osSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdEMsSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQztRQUMxQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUVoQyxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFDLFVBQVU7WUFDdkI7Z0JBQ0U7b0JBQ0U7d0JBQ0Usc0NBQ0UsU0FBUyxFQUFDLFNBQVMsRUFDbkIsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsYUFHMUM7d0JBQ0wsc0NBQUksU0FBUyxFQUFDLFdBQVcsSUFDdEIsRUFBRSxDQUFDLGNBQWMsRUFBRSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUM1Qzt3QkFDTCxzQ0FBSSxTQUFTLEVBQUMsU0FBUyxFQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLGFBRTNELENBQ0YsQ0FDQyxDQUNGO1lBQ1I7Z0JBQ0UsNkNBQVEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBUyxDQUNqQyxDQUNKLENBQ1AsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQXRERCwwQ0FzREM7QUFFRCxrQkFBZSxtQkFBVSxDQUFDLGVBQXNCLENBQUMsQ0FBQyJ9

});
