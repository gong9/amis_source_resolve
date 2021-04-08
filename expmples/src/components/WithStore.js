amis.define('src/components/WithStore.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.withStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * 接管 store 的生命周期，这个比较轻量，适合在组件中使用。
   * 相比渲染器中的 withStore，这里面的 store 不会在一个大树中。
   * 而且不会知道父级和子级中还有哪些 store。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  function withStore(storeFactory) {
      return function (ComposedComponent) {
          var _a;
          ComposedComponent = mobx_react_1.observer(ComposedComponent);
          const result = hoist_non_react_statics_1.default((_a = class extends react_1.default.Component {
                  constructor() {
                      super(...arguments);
                      this.store = storeFactory(this.props);
                      this.refFn = (ref) => {
                          this.ref = ref;
                      };
                  }
                  componentWillUnmount() {
                      this.store && mobx_state_tree_1.destroy(this.store);
                      delete this.store;
                  }
                  getWrappedInstance() {
                      return this.ref;
                  }
                  render() {
                      const injectedProps = {
                          store: this.store
                      };
                      return (react_1.default.createElement(ComposedComponent, Object.assign({}, this.props, injectedProps, { ref: this.refFn })));
                  }
              },
              _a.displayName = `WithStore(${ComposedComponent.displayName || 'Unkown'})`,
              _a.ComposedComponent = ComposedComponent,
              _a), ComposedComponent);
          return result;
      };
  }
  exports.withStore = withStore;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l0aFN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvV2l0aFN0b3JlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7Ozs7R0FJRztBQUNILDBEQUEwQjtBQUMxQiw4RkFBMEQ7QUFDMUQscURBQTJEO0FBQzNELDJDQUFvQztBQUVwQyxTQUFnQixTQUFTLENBQ3ZCLFlBQStCO0lBRS9CLE9BQU8sVUFNTCxpQkFBb0I7O1FBQ3BCLGlCQUFpQixHQUFHLHFCQUFRLENBQUMsaUJBQWlCLENBQUMsQ0FBQztRQU9oRCxNQUFNLE1BQU0sR0FBRyxpQ0FBbUIsT0FDaEMsS0FBTSxTQUFRLGVBQUssQ0FBQyxTQUFxQjtnQkFBekM7O29CQU1FLFVBQUssR0FBTyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNyQyxVQUFLLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRTt3QkFDbkIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7b0JBQ2pCLENBQUMsQ0FBQztnQkEyQkosQ0FBQztnQkF6QkMsb0JBQW9CO29CQUNsQixJQUFJLENBQUMsS0FBSyxJQUFJLHlCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQ3BCLENBQUM7Z0JBRUQsa0JBQWtCO29CQUNoQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ2xCLENBQUM7Z0JBRUQsTUFBTTtvQkFDSixNQUFNLGFBQWEsR0FBRzt3QkFDcEIsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLO3FCQUNsQixDQUFDO29CQUVGLE9BQU8sQ0FDTCw4QkFBQyxpQkFBaUIsb0JBQ1gsSUFBSSxDQUFDLEtBR1IsRUFDRSxhQUFhLElBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsS0FBSyxJQUNmLENBQ0gsQ0FBQztnQkFDSixDQUFDO2FBQ0Y7WUFuQ1EsY0FBVyxHQUFHLGFBQ25CLGlCQUFpQixDQUFDLFdBQVcsSUFBSSxRQUNuQyxHQUFJO1lBQ0csb0JBQWlCLEdBQUcsaUJBQWtCO2lCQWlDL0MsaUJBQWlCLENBQ2xCLENBQUM7UUFFRixPQUFPLE1BRU4sQ0FBQztJQUNKLENBQUMsQ0FBQztBQUNKLENBQUM7QUE5REQsOEJBOERDIn0=

});
