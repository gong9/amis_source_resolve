amis.define('src/components/Tooltip.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Tooltip
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Tooltip = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  let Tooltip = /** @class */ (() => {
      class Tooltip extends react_1.default.Component {
          render() {
              const _a = this.props, { classPrefix: ns, className, title, children, arrowProps, style, placement, arrowOffsetLeft, arrowOffsetTop, positionLeft, positionTop, classnames: cx, activePlacement } = _a, rest = tslib_1.__rest(_a, ["classPrefix", "className", "title", "children", "arrowProps", "style", "placement", "arrowOffsetLeft", "arrowOffsetTop", "positionLeft", "positionTop", "classnames", "activePlacement"]);
              return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx(`Tooltip`, activePlacement ? `Tooltip--${activePlacement}` : '', className), style: style, role: "tooltip" }),
                  react_1.default.createElement("div", Object.assign({ className: cx(`Tooltip-arrow`) }, arrowProps)),
                  title ? react_1.default.createElement("div", { className: cx('Tooltip-title') }, title) : null,
                  react_1.default.createElement("div", { className: cx('Tooltip-body') }, children)));
          }
      }
      Tooltip.defaultProps = {
          className: ''
      };
      return Tooltip;
  })();
  exports.Tooltip = Tooltip;
  exports.default = theme_1.themeable(Tooltip);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1Rvb2x0aXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBRzFCLG9DQUFpRDtBQWNqRDtJQUFBLE1BQWEsT0FBUSxTQUFRLGVBQUssQ0FBQyxTQUF1QjtRQUt4RCxNQUFNO1lBQ0osTUFBTSxLQWVGLElBQUksQ0FBQyxLQUFLLEVBZlIsRUFDSixXQUFXLEVBQUUsRUFBRSxFQUNmLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxFQUNSLFVBQVUsRUFDVixLQUFLLEVBQ0wsU0FBUyxFQUNULGVBQWUsRUFDZixjQUFjLEVBQ2QsWUFBWSxFQUNaLFdBQVcsRUFDWCxVQUFVLEVBQUUsRUFBRSxFQUNkLGVBQWUsT0FFSCxFQURULElBQUksc0JBZEgsMExBZUwsQ0FBYSxDQUFDO1lBRWYsT0FBTyxDQUNMLHVEQUNNLElBQUksSUFDUixTQUFTLEVBQUUsRUFBRSxDQUNYLFNBQVMsRUFDVCxlQUFlLENBQUMsQ0FBQyxDQUFDLFlBQVksZUFBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDcEQsU0FBUyxDQUNWLEVBQ0QsS0FBSyxFQUFFLEtBQUssRUFDWixJQUFJLEVBQUMsU0FBUztnQkFFZCxxREFBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFNLFVBQVUsRUFBSTtnQkFDdEQsS0FBSyxDQUFDLENBQUMsQ0FBQyx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxJQUFHLEtBQUssQ0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNsRSx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxJQUFHLFFBQVEsQ0FBTyxDQUNoRCxDQUNQLENBQUM7UUFDSixDQUFDOztJQXRDTSxvQkFBWSxHQUFHO1FBQ3BCLFNBQVMsRUFBRSxFQUFFO0tBQ2QsQ0FBQztJQXFDSixjQUFDO0tBQUE7QUF4Q1ksMEJBQU87QUEwQ3BCLGtCQUFlLGlCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMifQ==

});
