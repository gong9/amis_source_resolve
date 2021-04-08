amis.define('src/components/WithRemoteOptions.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.withRemoteOptions = exports.Store = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * 让选项类的组件支持远程加载选项。
   *
   * 目前这个逻辑其实在 renderer/form/options 中有
   * 但是那个里面耦合较多，没办法简单的在组件之间相互调用，
   * 所以先单独弄个 hoc 出来，后续再想个更加合理的方案。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const WithStore_1 = require("src/components/WithStore.tsx");
  const env_1 = require("src/env.tsx");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const api_1 = require("src/utils/api.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const Select_1 = require("src/components/Select.tsx");
  const mobx_1 = require("node_modules/mobx/lib/index");
  exports.Store = mobx_state_tree_1.types
      .model('OptionsStore')
      .props({
      fetching: false,
      errorMsg: '',
      options: mobx_state_tree_1.types.frozen([]),
      data: mobx_state_tree_1.types.frozen({})
  })
      .actions(self => {
      const load = mobx_state_tree_1.flow(function* (env, api, data) {
          try {
              self.fetching = true;
              const ret = yield env.fetcher(api, data);
              if (ret.ok) {
                  const data = ret.data || {};
                  let options = data.options || data.items || data.rows || data;
                  self.setOptions(options);
              }
              else {
                  throw new Error(ret.msg || 'fetch error');
              }
          }
          catch (e) {
              self.errorMsg = e.message;
          }
          finally {
              self.fetching = false;
          }
      });
      return {
          load,
          setData(data) {
              self.data = data || {};
          },
          setOptions(options) {
              options = Select_1.normalizeOptions(options);
              if (Array.isArray(options)) {
                  self.options = options.concat();
              }
          }
      };
  });
  function withRemoteOptions(ComposedComponent) {
      var _a;
      const result = hoist_non_react_statics_1.default(WithStore_1.withStore(() => exports.Store.create())((_a = class extends react_1.default.Component {
              constructor() {
                  super(...arguments);
                  this.toDispose = [];
              }
              componentDidMount() {
                  const env = this.props.env || this.context;
                  const { store, source, data, options } = this.props;
                  store.setData(data);
                  options && store.setOptions(options);
                  if (tpl_builtin_1.isPureVariable(source)) {
                      this.syncOptions();
                      this.toDispose.push(mobx_1.reaction(() => tpl_builtin_1.resolveVariableAndFilter(source, store.data, '| raw'), () => this.syncOptions()));
                  }
                  else if (env && api_1.isEffectiveApi(source, data)) {
                      this.loadOptions();
                      this.toDispose.push(mobx_1.reaction(() => api_1.buildApi(source, store.data, {
                          ignoreData: true
                      }).url, () => this.loadOptions()));
                  }
              }
              componentDidUpdate(prevProps) {
                  const props = this.props;
                  if (props.data !== prevProps.data) {
                      props.store.setData(props.data);
                  }
              }
              componentWillUnmount() {
                  this.toDispose.forEach(fn => fn());
                  this.toDispose = [];
              }
              loadOptions() {
                  const env = this.props.env || this.context;
                  const { store, source, data, options } = this.props;
                  if (env && api_1.isEffectiveApi(source, data)) {
                      store.load(env, source, data);
                  }
              }
              syncOptions() {
                  const { store, source, data } = this.props;
                  if (tpl_builtin_1.isPureVariable(source)) {
                      store.setOptions(tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw') || []);
                  }
              }
              render() {
                  const store = this.props.store;
                  const injectedProps = {
                      options: store.options,
                      loading: store.fetching
                  };
                  return (react_1.default.createElement(ComposedComponent, Object.assign({}, this.props, injectedProps)));
              }
          },
          _a.displayName = `WithRemoteOptions(${ComposedComponent.displayName || ComposedComponent.name})`,
          _a.ComposedComponent = ComposedComponent,
          _a.contextType = env_1.EnvContext,
          _a)), ComposedComponent);
      return result;
  }
  exports.withRemoteOptions = withRemoteOptions;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l0aFJlbW90ZU9wdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9XaXRoUmVtb3RlT3B0aW9ucy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7Ozs7R0FNRztBQUNILDBEQUEwQjtBQUMxQiw4RkFBMEQ7QUFHMUQsMkNBQXNDO0FBRXRDLGdDQUErQztBQUUvQyxxREFBc0Q7QUFDdEQsc0NBQXNEO0FBQ3RELHNEQUE4RTtBQUM5RSxxQ0FBMEM7QUFDMUMsK0JBQThCO0FBRWpCLFFBQUEsS0FBSyxHQUFHLHVCQUFLO0tBQ3ZCLEtBQUssQ0FBQyxjQUFjLENBQUM7S0FDckIsS0FBSyxDQUFDO0lBQ0wsUUFBUSxFQUFFLEtBQUs7SUFDZixRQUFRLEVBQUUsRUFBRTtJQUNaLE9BQU8sRUFBRSx1QkFBSyxDQUFDLE1BQU0sQ0FBZ0IsRUFBRSxDQUFDO0lBQ3hDLElBQUksRUFBRSx1QkFBSyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUM7Q0FDdkIsQ0FBQztLQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNkLE1BQU0sSUFBSSxHQUE0RCxzQkFBSSxDQUN4RSxRQUFRLENBQUMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7UUFDdkIsSUFBSTtZQUNGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLE1BQU0sR0FBRyxHQUFZLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFbEQsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFO2dCQUNWLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUM1QixJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFD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

});
