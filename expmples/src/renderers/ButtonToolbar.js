amis.define('src/renderers/ButtonToolbar.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ButtonToolbarRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let ButtonToolbar = /** @class */ (() => {
      class ButtonToolbar extends react_1.default.Component {
          render() {
              const { buttons, className, classnames: cx, render } = this.props;
              return (react_1.default.createElement("div", { className: cx('ButtonToolbar', className) }, Array.isArray(buttons)
                  ? buttons.map((button, key) => render(`${key}`, button, {
                      key
                  }))
                  : null));
          }
      }
      ButtonToolbar.propsList = ['buttons', 'className'];
      return ButtonToolbar;
  })();
  exports.default = ButtonToolbar;
  let ButtonToolbarRenderer = /** @class */ (() => {
      let ButtonToolbarRenderer = class ButtonToolbarRenderer extends ButtonToolbar {
      };
      ButtonToolbarRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)button-toolbar$/,
              name: 'button-toolbar'
          })
      ], ButtonToolbarRenderer);
      return ButtonToolbarRenderer;
  })();
  exports.ButtonToolbarRenderer = ButtonToolbarRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvQnV0dG9uVG9vbGJhci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFxQm5EO0lBQUEsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUdoRDtRQUdDLE1BQU07WUFDSixNQUFNLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFaEUsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZUFBZSxFQUFFLFNBQVMsQ0FBQyxJQUMzQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FDMUIsTUFBTSxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFO29CQUN2QixHQUFHO2lCQUNKLENBQUMsQ0FDSDtnQkFDSCxDQUFDLENBQUMsSUFBSSxDQUNKLENBQ1AsQ0FBQztRQUNKLENBQUM7O0lBaEJNLHVCQUFTLEdBQWtCLENBQUMsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBaUI3RCxvQkFBQztLQUFBO2tCQXJCb0IsYUFBYTtBQTJCbEM7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FBRyxDQUFBO0lBQTlDLHFCQUFxQjtRQUpqQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixJQUFJLEVBQUUsZ0JBQWdCO1NBQ3ZCLENBQUM7T0FDVyxxQkFBcUIsQ0FBeUI7SUFBRCw0QkFBQztLQUFBO0FBQTlDLHNEQUFxQiJ9

});
