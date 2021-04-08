amis.define('src/components/Button.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Button
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Button = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const TooltipWrapper_1 = tslib_1.__importDefault(require("src/components/TooltipWrapper.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const theme_1 = require("src/theme.tsx");
  let Button = /** @class */ (() => {
      class Button extends react_1.default.Component {
          renderButton() {
              let _a = this.props, { level, size, disabled, className, componentClass: Comp, classnames: cx, children, disabledTip, block, type, active, iconOnly, href } = _a, rest = tslib_1.__rest(_a, ["level", "size", "disabled", "className", "componentClass", "classnames", "children", "disabledTip", "block", "type", "active", "iconOnly", "href"]);
              if (href) {
                  Comp = 'a';
              }
              return (react_1.default.createElement(Comp, Object.assign({ type: Comp === 'a' ? undefined : type }, helper_1.pickEventsProps(rest), { href: href, className: cx(`Button`, {
                      [`Button--${level}`]: level,
                      [`Button--${size}`]: size,
                      [`Button--block`]: block,
                      [`Button--iconOnly`]: iconOnly,
                      'is-disabled': disabled,
                      'is-active': active
                  }, className), disabled: disabled }), children));
          }
          render() {
              const { tooltip, placement, tooltipContainer, tooltipTrigger, tooltipRootClose, disabled, disabledTip, classPrefix, classnames: cx } = this.props;
              return (react_1.default.createElement(TooltipWrapper_1.default, { placement: placement, tooltip: disabled ? disabledTip : tooltip, container: tooltipContainer, trigger: tooltipTrigger, rootClose: tooltipRootClose }, disabled && disabledTip ? (react_1.default.createElement("div", { className: cx('Button--disabled-wrap') }, this.renderButton())) : (this.renderButton())));
          }
      }
      Button.defaultProps = {
          componentClass: 'button',
          level: 'default',
          type: 'button',
          placement: 'top',
          tooltipTrigger: ['hover', 'focus'],
          tooltipRootClose: false
      };
      return Button;
  })();
  exports.Button = Button;
  exports.default = theme_1.themeable(Button);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7O0FBRUgsMERBQTBCO0FBQzFCLDhFQUF3RTtBQUN4RSw0Q0FBZ0Q7QUFDaEQsb0NBQWlEO0FBd0JqRDtJQUFBLE1BQWEsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUFzQjtRQWtCdEQsWUFBWTtZQUNWLElBQUksS0FlQSxJQUFJLENBQUMsS0FBSyxFQWZWLEVBQ0YsS0FBSyxFQUNMLElBQUksRUFDSixRQUFRLEVBQ1IsU0FBUyxFQUNULGNBQWMsRUFBRSxJQUFJLEVBQ3BCLFVBQVUsRUFBRSxFQUFFLEVBQ2QsUUFBUSxFQUNSLFdBQVcsRUFDWCxLQUFLLEVBQ0wsSUFBSSxFQUNKLE1BQU0sRUFDTixRQUFRLEVBQ1IsSUFBSSxPQUVRLEVBRFQsSUFBSSxzQkFkTCxvSkFlSCxDQUFhLENBQUM7WUFFZixJQUFJLElBQUksRUFBRTtnQkFDUixJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ1o7WUFFRCxPQUFPLENBQ0wsOEJBQUMsSUFBSSxrQkFDSCxJQUFJLEVBQUUsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQ2pDLHdCQUFlLENBQUMsSUFBSSxDQUFDLElBQ3pCLElBQUksRUFBRSxJQUFJLEVBQ1YsU0FBUyxFQUFFLEVBQUUsQ0FDWCxRQUFRLEVBQ1I7b0JBQ0UsQ0FBQyxXQUFXLEtBQUssRUFBRSxDQUFDLEVBQUUsS0FBSztvQkFDM0IsQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSTtvQkFDekIsQ0FBQyxlQUFlLENBQUMsRUFBRSxLQUFLO29CQUN4QixDQUFDLGtCQUFrQixDQUFDLEVBQUUsUUFBUTtvQkFDOUIsYUFBYSxFQUFFLFFBQVE7b0JBQ3ZCLFdBQVcsRUFBRSxNQUFNO2lCQUNwQixFQUNELFNBQVMsQ0FDVixFQUNELFFBQVEsRUFBRSxRQUFRLEtBRWpCLFFBQVEsQ0FDSixDQUNSLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixPQUFPLEVBQ1AsU0FBUyxFQUNULGdCQUFnQixFQUNoQixjQUFjLEVBQ2QsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixXQUFXLEVBQ1gsV0FBVyxFQUNYLFVBQVUsRUFBRSxFQUFFLEVBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxDQUNMLDhCQUFDLHdCQUFjLElBQ2IsU0FBUyxFQUFFLFNBQVMsRUFDcEIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQ3pDLFNBQVMsRUFBRSxnQkFBZ0IsRUFDM0IsT0FBTyxFQUFFLGNBQWMsRUFDdkIsU0FBUyxFQUFFLGdCQUFnQixJQUUxQixRQUFRLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUN6Qix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDLElBQ3hDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FDaEIsQ0FDUCxDQUFDLENBQUMsQ0FBQyxDQUNGLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FDcEIsQ0FDYyxDQUNsQixDQUFDO1FBQ0osQ0FBQzs7SUE3Rk0sbUJBQVksR0FRZjtRQUNGLGNBQWMsRUFBRSxRQUFRO1FBQ3hCLEtBQUssRUFBRSxTQUFTO1FBQ2hCLElBQUksRUFBRSxRQUFRO1FBQ2QsU0FBUyxFQUFFLEtBQUs7UUFDaEIsY0FBYyxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztRQUNsQyxnQkFBZ0IsRUFBRSxLQUFLO0tBQ3hCLENBQUM7SUErRUosYUFBQztLQUFBO0FBL0ZZLHdCQUFNO0FBaUduQixrQkFBZSxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDIn0=

});
