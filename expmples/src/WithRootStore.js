amis.define('src/WithRootStore.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.withRootStore = exports.RootStoreContext = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  exports.RootStoreContext = react_1.default.createContext(undefined);
  function withRootStore(ComposedComponent) {
      var _a;
      const result = hoist_non_react_statics_1.default((_a = class extends react_1.default.Component {
              render() {
                  const rootStore = this.context;
                  const injectedProps = {
                      rootStore
                  };
                  return (react_1.default.createElement(ComposedComponent, Object.assign({}, this.props, injectedProps)));
              }
          },
          _a.displayName = `WithRootStore(${ComposedComponent.displayName || ComposedComponent.name})`,
          _a.contextType = exports.RootStoreContext,
          _a.ComposedComponent = ComposedComponent,
          _a), ComposedComponent);
      return result;
  }
  exports.withRootStore = withRootStore;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l0aFJvb3RTdG9yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9XaXRoUm9vdFN0b3JlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLDhGQUEwRDtBQUU3QyxRQUFBLGdCQUFnQixHQUFHLGVBQUssQ0FBQyxhQUFhLENBQ2pELFNBQWdCLENBQ2pCLENBQUM7QUFFRixTQUFnQixhQUFhLENBTTNCLGlCQUFvQjs7SUFNcEIsTUFBTSxNQUFNLEdBQUcsaUNBQW1CLE9BQ2hDLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBcUI7WUFPdkMsTUFBTTtnQkFDSixNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMvQixNQUFNLGFBQWEsR0FFZjtvQkFDRixTQUFTO2lCQUNWLENBQUM7Z0JBRUYsT0FBTyxDQUNMLDhCQUFDLGlCQUFpQixvQkFDWCxJQUFJLENBQUMsS0FHUixFQUNFLGFBQWEsRUFDakIsQ0FDSCxDQUFDO1lBQ0osQ0FBQztTQUNGO1FBeEJRLGNBQVcsR0FBRyxpQkFDbkIsaUJBQWlCLENBQUMsV0FBVyxJQUFJLGlCQUFpQixDQUFDLElBQ3JELEdBQUk7UUFDRyxjQUFXLEdBQUcsd0JBQWlCO1FBQy9CLG9CQUFpQixHQUFHLGlCQUFrQjthQXFCL0MsaUJBQWlCLENBQ2xCLENBQUM7SUFFRixPQUFPLE1BRU4sQ0FBQztBQUNKLENBQUM7QUE3Q0Qsc0NBNkNDIn0=

});
