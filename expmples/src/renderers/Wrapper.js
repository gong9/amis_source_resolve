amis.define('src/renderers/Wrapper.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WrapperRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let Wrapper = /** @class */ (() => {
      class Wrapper extends react_1.default.Component {
          renderBody() {
              const { children, body, render } = this.props;
              return children
                  ? typeof children === 'function'
                      ? children(this.props)
                      : children
                  : body
                      ? render('body', body)
                      : null;
          }
          render() {
              const { className, size, classnames: cx, style } = this.props;
              return (react_1.default.createElement("div", { className: cx('Wrapper', size ? `Wrapper--${size}` : '', className), style: style }, this.renderBody()));
          }
      }
      Wrapper.propsList = ['body', 'className', 'children', 'size'];
      Wrapper.defaultProps = {
          className: ''
      };
      return Wrapper;
  })();
  exports.default = Wrapper;
  let WrapperRenderer = /** @class */ (() => {
      let WrapperRenderer = class WrapperRenderer extends Wrapper {
      };
      WrapperRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)wrapper$/,
              name: 'wrapper'
          })
      ], WrapperRenderer);
      return WrapperRenderer;
  })();
  exports.WrapperRenderer = WrapperRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV3JhcHBlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvV3JhcHBlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFtQ25EO0lBQUEsTUFBcUIsT0FBUSxTQUFRLGVBQUssQ0FBQyxTQUErQjtRQU14RSxVQUFVO1lBQ1IsTUFBTSxFQUFDLFFBQVEsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU1QyxPQUFPLFFBQVE7Z0JBQ2IsQ0FBQyxDQUFDLE9BQU8sUUFBUSxLQUFLLFVBQVU7b0JBQzlCLENBQUMsQ0FBRSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBaUI7b0JBQ3ZDLENBQUMsQ0FBRSxRQUF3QjtnQkFDN0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFFLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFpQjtvQkFDdkMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTVELE9BQU8sQ0FDTCx1Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLFlBQVksSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsRUFDbkUsS0FBSyxFQUFFLEtBQUssSUFFWCxJQUFJLENBQUMsVUFBVSxFQUFFLENBQ2QsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUE1Qk0saUJBQVMsR0FBa0IsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNyRSxvQkFBWSxHQUEwQjtRQUMzQyxTQUFTLEVBQUUsRUFBRTtLQUNkLENBQUM7SUEwQkosY0FBQztLQUFBO2tCQTlCb0IsT0FBTztBQW9DNUI7SUFBQSxJQUFhLGVBQWUsR0FBNUIsTUFBYSxlQUFnQixTQUFRLE9BQU87S0FBRyxDQUFBO0lBQWxDLGVBQWU7UUFKM0Isa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxnQkFBZ0I7WUFDdEIsSUFBSSxFQUFFLFNBQVM7U0FDaEIsQ0FBQztPQUNXLGVBQWUsQ0FBbUI7SUFBRCxzQkFBQztLQUFBO0FBQWxDLDBDQUFlIn0=

});
