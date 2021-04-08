amis.define('src/renderers/Container.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ContainerRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let Container = /** @class */ (() => {
      class Container extends react_1.default.Component {
          renderBody() {
              const { children, body, render, classnames: cx, bodyClassName } = this.props;
              return (react_1.default.createElement("div", { className: cx('Container-body', bodyClassName) }, children
                  ? typeof children === 'function'
                      ? children(this.props)
                      : children
                  : body
                      ? render('body', body)
                      : null));
          }
          render() {
              const { className, wrapperComponent, size, classnames: cx, style } = this.props;
              const Component = wrapperComponent || 'div';
              return (react_1.default.createElement(Component, { className: cx('Container', className), style: style }, this.renderBody()));
          }
      }
      Container.propsList = ['body', 'className'];
      Container.defaultProps = {
          className: ''
      };
      return Container;
  })();
  exports.default = Container;
  let ContainerRenderer = /** @class */ (() => {
      let ContainerRenderer = class ContainerRenderer extends Container {
      };
      ContainerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)container$/,
              name: 'container'
          })
      ], ContainerRenderer);
      return ContainerRenderer;
  })();
  exports.ContainerRenderer = ContainerRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Db250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBMkNuRDtJQUFBLE1BQXFCLFNBQWEsU0FBUSxlQUFLLENBQUMsU0FHL0M7UUFNQyxVQUFVO1lBQ1IsTUFBTSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsYUFBYSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzRSxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxhQUFhLENBQUMsSUFDaEQsUUFBUTtnQkFDUCxDQUFDLENBQUMsT0FBTyxRQUFRLEtBQUssVUFBVTtvQkFDOUIsQ0FBQyxDQUFHLFFBQWdCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBaUI7b0JBQ2hELENBQUMsQ0FBRSxRQUF3QjtnQkFDN0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBVyxDQUFpQjtvQkFDOUMsQ0FBQyxDQUFDLElBQUksQ0FDSixDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLElBQUksRUFDSixVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixNQUFNLFNBQVMsR0FDWixnQkFBZ0QsSUFBSSxLQUFLLENBQUM7WUFFN0QsT0FBTyxDQUNMLDhCQUFDLFNBQVMsSUFBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRSxLQUFLLEVBQUUsS0FBSyxJQUMzRCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQ1IsQ0FDYixDQUFDO1FBQ0osQ0FBQzs7SUF0Q00sbUJBQVMsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDakQsc0JBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7SUFvQ0osZ0JBQUM7S0FBQTtrQkEzQ29CLFNBQVM7QUFpRDlCO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxTQUFhO0tBQUcsQ0FBQTtJQUExQyxpQkFBaUI7UUFKN0Isa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxrQkFBa0I7WUFDeEIsSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQztPQUNXLGlCQUFpQixDQUF5QjtJQUFELHdCQUFDO0tBQUE7QUFBMUMsOENBQWlCIn0=

});
