amis.define('src/env.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.withRendererEnv = exports.EnvContext = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 组件 Env，包括如何发送 ajax，如何通知，如何跳转等等。。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  exports.EnvContext = react_1.default.createContext(undefined);
  function withRendererEnv(ComposedComponent) {
      var _a;
      const result = hoist_non_react_statics_1.default((_a = class extends react_1.default.Component {
              render() {
                  const injectedProps = {
                      env: this.props.env || this.context
                  };
                  if (!injectedProps.env) {
                      throw new Error('Env 信息获取失败，组件用法不正确');
                  }
                  return (react_1.default.createElement(ComposedComponent, Object.assign({}, this.props, injectedProps)));
              }
          },
          _a.displayName = `WithEnv(${ComposedComponent.displayName || ComposedComponent.name})`,
          _a.contextType = exports.EnvContext,
          _a.ComposedComponent = ComposedComponent,
          _a), ComposedComponent);
      return result;
  }
  exports.withRendererEnv = withRendererEnv;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2Vudi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztHQUVHO0FBQ0gsMERBQTBCO0FBSTFCLDhGQUEwRDtBQW1EN0MsUUFBQSxVQUFVLEdBQUcsZUFBSyxDQUFDLGFBQWEsQ0FBcUIsU0FBUyxDQUFDLENBQUM7QUFNN0UsU0FBZ0IsZUFBZSxDQUU3QixpQkFBb0I7O0lBUXBCLE1BQU0sTUFBTSxHQUFHLGlDQUFtQixPQUNoQyxLQUFNLFNBQVEsZUFBSyxDQUFDLFNBQXFCO1lBT3ZDLE1BQU07Z0JBQ0osTUFBTSxhQUFhLEdBRWY7b0JBQ0YsR0FBRyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPO2lCQUNwQyxDQUFDO2dCQUVGLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFO29CQUN0QixNQUFNLElBQUksS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7aUJBQ3ZDO2dCQUVELE9BQU8sQ0FDTCw4QkFBQyxpQkFBaUIsb0JBQ1gsSUFBSSxDQUFDLEtBR1IsRUFDRSxhQUFhLEVBQ2pCLENBQ0gsQ0FBQztZQUNKLENBQUM7U0FDRjtRQTNCUSxjQUFXLEdBQUcsV0FDbkIsaUJBQWlCLENBQUMsV0FBVyxJQUFJLGlCQUFpQixDQUFDLElBQ3JELEdBQUk7UUFDRyxjQUFXLEdBQUcsa0JBQVc7UUFDekIsb0JBQWlCLEdBQUcsaUJBQWtCO2FBd0IvQyxpQkFBaUIsQ0FDbEIsQ0FBQztJQUVGLE9BQU8sTUFFTixDQUFDO0FBQ0osQ0FBQztBQTlDRCwwQ0E4Q0MifQ==

});
