amis.define('src/components/Html.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Html
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Html = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  let Html = /** @class */ (() => {
      class Html extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.htmlRef = this.htmlRef.bind(this);
          }
          componentDidUpdate(prevProps) {
              if (this.props.html !== prevProps.html) {
                  this._render();
              }
          }
          htmlRef(dom) {
              this.dom = dom;
              if (!dom) {
                  return;
              }
              this._render();
          }
          _render() {
              const { html } = this.props;
              if (html) {
                  this.dom.innerHTML = html;
              }
          }
          render() {
              const { className, wrapperComponent, inline, classPrefix: ns, classnames: cx } = this.props;
              const Component = wrapperComponent || (inline ? 'span' : 'div');
              return (react_1.default.createElement(Component, { ref: this.htmlRef, className: cx(`Html`, className) }));
          }
      }
      Html.defaultProps = {
          inline: true
      };
      return Html;
  })();
  exports.Html = Html;
  exports.default = theme_1.themeable(Html);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSHRtbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0h0bWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9DQUFpRDtBQVdqRDtJQUFBLE1BQWEsSUFBSyxTQUFRLGVBQUssQ0FBQyxTQUFvQjtRQU9sRCxZQUFZLEtBQWdCO1lBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNiLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekMsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQW9CO1lBQ3JDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLElBQUksRUFBRTtnQkFDdEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO2FBQ2hCO1FBQ0gsQ0FBQztRQUVELE9BQU8sQ0FBQyxHQUFRO1lBQ2QsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7WUFFZixJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBRUQsT0FBTztZQUNMLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTFCLElBQUksSUFBSSxFQUFFO2dCQUNSLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQzthQUMzQjtRQUNILENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsTUFBTSxFQUNOLFdBQVcsRUFBRSxFQUFFLEVBQ2YsVUFBVSxFQUFFLEVBQUUsRUFDZixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoRSxPQUFPLENBQ0wsOEJBQUMsU0FBUyxJQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUNqQixTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FDckIsQ0FDZCxDQUFDO1FBQ0osQ0FBQzs7SUFwRE0saUJBQVksR0FBRztRQUNwQixNQUFNLEVBQUUsSUFBSTtLQUNiLENBQUM7SUFtREosV0FBQztLQUFBO0FBdERZLG9CQUFJO0FBd0RqQixrQkFBZSxpQkFBUyxDQUFDLElBQUksQ0FBQyxDQUFDIn0=

});
