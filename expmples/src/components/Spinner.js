amis.define('src/components/Spinner.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Spinner
   * @description
   * @author fex
   * @date 2017-11-07
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Spinner = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const icons_1 = require("src/components/icons.tsx");
  const fadeStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in'
  };
  let Spinner = /** @class */ (() => {
      class Spinner extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.div = react_1.default.createRef();
              this.overlay = react_1.default.createRef();
          }
          render() {
              const { show, classnames: cx, spinnerClassName, mode, size, overlay, icon } = this.props;
              return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 350 }, (status) => {
                  if (status === Transition_1.ENTERING) {
                      // force reflow
                      // 由于从 mount 进来到加上 in 这个 class 估计是时间太短，上次的样式还没应用进去，所以这里强制reflow一把。
                      // 否则看不到动画。
                      // this.div.current!.offsetWidth;
                      this.overlay.current && this.overlay.current.offsetWidth;
                  }
                  return (react_1.default.createElement(react_1.default.Fragment, null,
                      overlay ? (react_1.default.createElement("div", { ref: this.overlay, className: cx(`Spinner-overlay`, fadeStyles[status]) })) : null,
                      react_1.default.createElement("div", { ref: this.div, className: cx(`Spinner`, spinnerClassName, fadeStyles[status], {
                              [`Spinner--${mode}`]: mode,
                              [`Spinner--overlay`]: overlay,
                              [`Spinner--${size}`]: size,
                              [`Spinner--icon`]: icon
                          }) }, icon ? react_1.default.createElement(icons_1.Icon, { icon: icon, className: "icon" }) : null)));
              }));
          }
      }
      Spinner.defaultProps = {
          overlay: false,
          spinnerClassName: '',
          mode: '',
          size: '',
          show: true
      };
      return Spinner;
  })();
  exports.Spinner = Spinner;
  exports.default = theme_1.themeable(Spinner);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1NwaW5uZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7Ozs7R0FLRzs7OztBQUVILDBEQUEwQjtBQUMxQixvQ0FBK0M7QUFDL0Msd0ZBQWdGO0FBQ2hGLG1DQUE2QjtBQUU3QixNQUFNLFVBQVUsR0FFWjtJQUNGLENBQUMscUJBQVEsQ0FBQyxFQUFFLElBQUk7SUFDaEIsQ0FBQyxvQkFBTyxDQUFDLEVBQUUsSUFBSTtDQUNoQixDQUFDO0FBV0Y7SUFBQSxNQUFhLE9BQVEsU0FBUSxlQUFLLENBQUMsU0FBK0I7UUFBbEU7O1lBU0UsUUFBRyxHQUFvQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDekQsWUFBTyxHQUFvQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUFpRC9ELENBQUM7UUEvQ0MsTUFBTTtZQUNKLE1BQU0sRUFDSixJQUFJLEVBQ0osVUFBVSxFQUFFLEVBQUUsRUFDZCxnQkFBZ0IsRUFDaEIsSUFBSSxFQUNKLElBQUksRUFDSixPQUFPLEVBQ1AsSUFBSSxFQUNMLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNmLE9BQU8sQ0FDTCw4QkFBQyxvQkFBVSxJQUFDLFlBQVksUUFBQyxhQUFhLFFBQUMsRUFBRSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxJQUMxRCxDQUFDLE1BQWMsRUFBRSxFQUFFO2dCQUNsQixJQUFJLE1BQU0sS0FBSyxxQkFBUSxFQUFFO29CQUN2QixlQUFlO29CQUNmLGtFQUFrRTtvQkFDbEUsV0FBVztvQkFDWCxpQ0FBaUM7b0JBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQztpQkFDMUQ7Z0JBRUQsT0FBTyxDQUNMO29CQUNHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDVCx1Q0FDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU8sRUFDakIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsR0FDcEQsQ0FDSCxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUVSLHVDQUNFLEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUNiLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLGdCQUFnQixFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsRUFBRTs0QkFDN0QsQ0FBQyxZQUFZLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSTs0QkFDMUIsQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLE9BQU87NEJBQzdCLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUk7NEJBQzFCLENBQUMsZUFBZSxDQUFDLEVBQUUsSUFBSTt5QkFDeEIsQ0FBQyxJQUVELElBQUksQ0FBQyxDQUFDLENBQUMsOEJBQUMsWUFBSSxJQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2hELENBQ0wsQ0FDSixDQUFDO1lBQ0osQ0FBQyxDQUNVLENBQ2QsQ0FBQztRQUNKLENBQUM7O0lBekRNLG9CQUFZLEdBQUc7UUFDcEIsT0FBTyxFQUFFLEtBQUs7UUFDZCxnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLElBQUksRUFBRSxFQUFFO1FBQ1IsSUFBSSxFQUFFLEVBQVE7UUFDZCxJQUFJLEVBQUUsSUFBSTtLQUNYLENBQUM7SUFvREosY0FBQztLQUFBO0FBM0RZLDBCQUFPO0FBNkRwQixrQkFBZSxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDIn0=

});
