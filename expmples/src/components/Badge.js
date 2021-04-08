amis.define('src/components/Badge.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 角标组件
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.withBadge = exports.Badge = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const tpl_1 = require("src/utils/tpl.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let Badge = /** @class */ (() => {
      class Badge extends react_1.default.Component {
          constructor(props) {
              super(props);
          }
          render() {
              const badge = this.props.badge;
              if (!badge) {
                  return this.props.children;
              }
              const { children, classnames: cx, data } = this.props;
              let isDisplay = true;
              if (typeof badge === 'string') {
                  isDisplay = tpl_1.evalExpression(badge, data) === true;
              }
              let { mode = 'dot', text, size, style, position = 'top-right', visibleOn, className } = badge;
              if (visibleOn) {
                  isDisplay = tpl_1.evalExpression(visibleOn, data) === true;
              }
              if (typeof text === 'string' && text[0] === '$') {
                  text = tpl_builtin_1.resolveVariable(text, data);
              }
              // 设置默认值
              if (typeof size === 'undefined') {
                  if (mode === 'dot') {
                      size = 6;
                  }
                  else {
                      size = 16;
                  }
              }
              let sizeStyle = {};
              if (mode === 'text') {
                  sizeStyle = {
                      borderRadius: size / 2,
                      height: size,
                      lineHeight: size + 'px'
                  };
                  if (!text) {
                      isDisplay = false;
                  }
              }
              if (mode === 'dot') {
                  sizeStyle = { width: size, height: size };
              }
              return (react_1.default.createElement("div", { className: cx('Badge', className) },
                  children,
                  isDisplay ? (mode === 'dot' ? (react_1.default.createElement("span", { className: cx('Badge-dot', `Badge--${position}`), style: Object.assign(Object.assign({}, sizeStyle), style) })) : (react_1.default.createElement("span", { className: cx('Badge-text', `Badge--${position}`), style: Object.assign(Object.assign({}, sizeStyle), style) }, text))) : null));
          }
      }
      Badge.propsList = ['body', 'className', 'children'];
      return Badge;
  })();
  exports.Badge = Badge;
  function withBadge(Component) {
      var _a;
      return hoist_non_react_statics_1.default((_a = class WithBadge extends react_1.default.Component {
              render() {
                  const badge = this.props.badge;
                  if (!badge) {
                      return react_1.default.createElement(Component, Object.assign({}, this.props));
                  }
                  return (react_1.default.createElement(Badge, Object.assign({}, this.props),
                      react_1.default.createElement(Component, Object.assign({}, this.props))));
              }
          },
          _a.displayName = `WithBadge(${Component.displayName || Component.name})`,
          _a), Component);
  }
  exports.withBadge = withBadge;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9CYWRnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7O0FBRUgsMERBQTBCO0FBQzFCLDhGQUEwRDtBQUUxRCxzQ0FBNEM7QUFDNUMsc0RBQXFEO0FBK0NyRDtJQUFBLE1BQWEsS0FBTSxTQUFRLGVBQUssQ0FBQyxTQUE2QjtRQUc1RCxZQUFZLEtBQWlCO1lBQzNCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNmLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDL0IsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2FBQzVCO1lBQ0QsTUFBTSxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDcEQsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO2dCQUM3QixTQUFTLEdBQUcsb0JBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFBSSxDQUFDO2FBQ2xEO1lBRUQsSUFBSSxFQUNGLElBQUksR0FBRyxLQUFLLEVBQ1osSUFBSSxFQUNKLElBQUksRUFDSixLQUFLLEVBQ0wsUUFBUSxHQUFHLFdBQVcsRUFDdEIsU0FBUyxFQUNULFNBQVMsRUFDVixHQUFHLEtBQUssQ0FBQztZQUVWLElBQUksU0FBUyxFQUFFO2dCQUNiLFNBQVMsR0FBRyxvQkFBYyxDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUFJLENBQUM7YUFDdEQ7WUFFRCxJQUFJLE9BQU8sSUFBSSxL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

});
