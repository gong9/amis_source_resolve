amis.define('src/components/PopOver.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file PopOver
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PopOver = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let PopOver = /** @class */ (() => {
      class PopOver extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.state = {
                  xOffset: 0,
                  yOffset: 0
              };
          }
          componentDidMount() {
              this.mayUpdateOffset();
              const dom = react_dom_1.findDOMNode(this);
              this.parent = dom.parentNode;
              this.parent.classList.add('has-popover');
          }
          componentDidUpdate() {
              this.mayUpdateOffset();
          }
          componentWillUnmount() {
              this.parent && this.parent.classList.remove('has-popover');
          }
          mayUpdateOffset() {
              let offset;
              let getOffset = this.props.offset;
              if (getOffset && typeof getOffset === 'function') {
                  const { placement, positionTop: y, positionLeft: x } = this.props;
                  offset = getOffset(react_dom_1.findDOMNode(this).getBoundingClientRect(), {
                      x,
                      y,
                      placement
                  });
              }
              else {
                  offset = getOffset;
              }
              this.setState({
                  xOffset: offset && offset.x ? offset.x : 0,
                  yOffset: offset && offset.y ? offset.y : 0
              });
          }
          render() {
              const _a = this.props, { placement, activePlacement, positionTop, positionLeft, arrowOffsetLeft, arrowOffsetTop, style, children, offset, overlay, onHide, classPrefix: ns, classnames: cx, className } = _a, rest = tslib_1.__rest(_a, ["placement", "activePlacement", "positionTop", "positionLeft", "arrowOffsetLeft", "arrowOffsetTop", "style", "children", "offset", "overlay", "onHide", "classPrefix", "classnames", "className"]);
              const { xOffset, yOffset } = this.state;
              const outerStyle = Object.assign(Object.assign({ display: 'block' }, style), { top: positionTop + yOffset, left: positionLeft + xOffset });
              return (react_1.default.createElement("div", Object.assign({ className: cx(`${ns}PopOver`, className, `${ns}PopOver--${helper_1.camel(activePlacement)}`), style: outerStyle }, rest),
                  overlay ? (react_1.default.createElement("div", { className: `${ns}PopOver-overlay`, onClick: onHide })) : null,
                  children));
          }
      }
      PopOver.defaultProps = {
          className: '',
          offset: {
              x: 0,
              y: 0
          },
          overlay: false,
          placement: 'auto'
      };
      return PopOver;
  })();
  exports.PopOver = PopOver;
  exports.default = theme_1.themeable(PopOver);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1BvcE92ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLHlDQUFzQztBQUN0QyxvQ0FBaUQ7QUFDakQsNENBQXNDO0FBNkJ0QztJQUFBLE1BQWEsT0FBUSxTQUFRLGVBQUssQ0FBQyxhQUF5QztRQUE1RTs7WUFXRSxVQUFLLEdBQUc7Z0JBQ04sT0FBTyxFQUFFLENBQUM7Z0JBQ1YsT0FBTyxFQUFFLENBQUM7YUFDWCxDQUFDO1FBdUZKLENBQUM7UUFuRkMsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLHVCQUFXLENBQUMsSUFBSSxDQUFnQixDQUFDO1lBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsR0FBRyxDQUFDLFVBQXlCLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxvQkFBb0I7WUFDbEIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDN0QsQ0FBQztRQUVELGVBQWU7WUFDYixJQUFJLE1BQWMsQ0FBQztZQUNuQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUVsQyxJQUFJLFNBQVMsSUFBSSxPQUFPLFNBQVMsS0FBSyxVQUFVLEVBQUU7Z0JBQ2hELE1BQU0sRUFBQyxTQUFTLEVBQUUsV0FBVyxFQUFFLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFFaEUsTUFBTSxHQUFHLFNBQVMsQ0FDZix1QkFBVyxDQUFDLElBQUksQ0FBaUIsQ0FBQyxxQkFBcUIsRUFBRSxFQUMxRDtvQkFDRSxDQUFDO29CQUNELENBQUM7b0JBQ0QsU0FBUztpQkFDVixDQUNGLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxNQUFNLEdBQUcsU0FBbUIsQ0FBQzthQUM5QjtZQUNELElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxNQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdEQsT0FBTyxFQUFFLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBRSxNQUFpQixDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUN2RCxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sS0FnQkYsSUFBSSxDQUFDLEtBQUssRUFoQlIsRUFDSixTQUFTLEVBQ1QsZUFBZSxFQUNmLFdBQVcsRUFDWCxZQUFZLEVBQ1osZUFBZSxFQUNmLGNBQWMsRUFDZCxLQUFLLEVBQ0wsUUFBUSxFQUNSLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLFdBQVcsRUFBRSxFQUFFLEVBQ2YsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLE9BRUcsRUFEVCxJQUFJLHNCQWZILGtNQWdCTCxDQUFhLENBQUM7WUFFZixNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDdEMsTUFBTSxVQUFVLGlDQUNkLE9BQU8sRUFBRSxPQUFPLElBQ2IsS0FBSyxLQUNSLEdBQUcsRUFBRyxXQUFzQixHQUFHLE9BQU8sRUFDdEMsSUFBSSxFQUFHLFlBQXVCLEdBQUcsT0FBTyxHQUN6QyxDQUFDO1lBRUYsT0FBTyxDQUNMLHFEQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsR0FBRyxFQUFFLFNBQVMsRUFDZCxTQUFTLEVBQ1QsR0FBRyxFQUFFLFlBQVksY0FBSyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQzFDLEVBQ0QsS0FBSyxFQUFFLFVBQVUsSUFDYixJQUFJO2dCQUVQLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FDVCx1Q0FBSyxTQUFTLEVBQUUsR0FBRyxFQUFFLGlCQUFpQixFQUFFLE9BQU8sRUFBRSxNQUFNLEdBQUksQ0FDNUQsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDUCxRQUFRLENBQ0wsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFuR00sb0JBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsRUFBRTtRQUNiLE1BQU0sRUFBRTtZQUNOLENBQUMsRUFBRSxDQUFDO1lBQ0osQ0FBQyxFQUFFLENBQUM7U0FDTDtRQUNELE9BQU8sRUFBRSxLQUFLO1FBQ2QsU0FBUyxFQUFFLE1BQU07S0FDbEIsQ0FBQztJQTRGSixjQUFDO0tBQUE7QUFyR1ksMEJBQU87QUF1R3BCLGtCQUFlLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMifQ==

});
