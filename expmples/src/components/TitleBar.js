amis.define('src/components/TitleBar.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file TitleBar。
   * @description
   * @author fex
   * @param 参数说明：
   * title 标题内容
   * titleClassName 标题类名，默认为 bg-light lter b-b
   * right 可以传入右侧节点, 当有右侧时自动采用 hbox 来左右布局。
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TitleBar = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  let TitleBar = /** @class */ (() => {
      class TitleBar extends react_1.default.PureComponent {
          render() {
              const { className, title, titleClassName, right, classnames: cx } = this.props;
              let left = title ? react_1.default.createElement("div", { className: titleClassName }, title) : null;
              let body = left;
              if (right) {
                  body = (react_1.default.createElement("div", { className: "hbox hbox-auto-xs h-auto" },
                      react_1.default.createElement("div", { className: "col bg-light b-b wrapper" }, left),
                      react_1.default.createElement("div", { className: "col v-middle padder-md text-right bg-light b-b wrapper-sm" }, right)));
              }
              else {
                  body = react_1.default.createElement("div", { className: "wrapper" }, left);
              }
              return react_1.default.createElement("div", { className: cx(className, 'TitleBar') }, body);
          }
      }
      TitleBar.defaultProps = {
          className: 'bg-light lter b-b',
          title: '标题',
          titleClassName: 'm-n font-thin h3',
          right: false
      };
      return TitleBar;
  })();
  exports.TitleBar = TitleBar;
  exports.default = theme_1.themeable(TitleBar);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGl0bGVCYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9UaXRsZUJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7OztHQVFHOzs7O0FBRUgsMERBQTBCO0FBRTFCLG9DQUFpRDtBQVdqRDtJQUFBLE1BQWEsUUFBUyxTQUFRLGVBQUssQ0FBQyxhQUFpQztRQVFuRSxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxLQUFLLEVBQ0wsY0FBYyxFQUNkLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFBRSxFQUNmLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsdUNBQUssU0FBUyxFQUFFLGNBQWMsSUFBRyxLQUFLLENBQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBRXhFLElBQUksSUFBSSxHQUFHLElBQUksQ0FBQztZQUVoQixJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLEdBQUcsQ0FDTCx1Q0FBSyxTQUFTLEVBQUMsMEJBQTBCO29CQUN2Qyx1Q0FBSyxTQUFTLEVBQUMsMEJBQTBCLElBQUUsSUFBSSxDQUFPO29CQUN0RCx1Q0FBSyxTQUFTLEVBQUMsMkRBQTJELElBQ3ZFLEtBQUssQ0FDRixDQUNGLENBQ1AsQ0FBQzthQUNIO2lCQUFNO2dCQUNMLElBQUksR0FBRyx1Q0FBSyxTQUFTLEVBQUMsU0FBUyxJQUFFLElBQUksQ0FBTyxDQUFDO2FBQzlDO1lBRUQsT0FBTyx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsSUFBRyxJQUFJLENBQU8sQ0FBQztRQUNqRSxDQUFDOztJQWxDTSxxQkFBWSxHQUFHO1FBQ3BCLFNBQVMsRUFBRSxtQkFBbUI7UUFDOUIsS0FBSyxFQUFFLElBQUk7UUFDWCxjQUFjLEVBQUUsa0JBQWtCO1FBQ2xDLEtBQUssRUFBRSxLQUFLO0tBQ2IsQ0FBQztJQThCSixlQUFDO0tBQUE7QUFwQ1ksNEJBQVE7QUFzQ3JCLGtCQUFlLGlCQUFTLENBQUMsUUFBUSxDQUFDLENBQUMifQ==

});
