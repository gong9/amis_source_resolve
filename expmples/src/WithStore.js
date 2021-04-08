amis.define('src/WithStore.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HocStoreFactory = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const helper_1 = require("src/utils/helper.ts");
  const WithRootStore_1 = require("src/WithRootStore.tsx");
  function HocStoreFactory(renderer) {
      return function (Component) {
          let StoreFactory = /** @class */ (() => {
              let StoreFactory = class StoreFactory extends react_1.default.Component {
                  getWrappedInstance() {
                      return this.ref;
                  }
                  refFn(ref) {
                      this.ref = ref;
                  }
                  formatData(data) {
                      if (Array.isArray(data)) {
                          return {
                              items: data
                          };
                      }
                      return data;
                  }
                  componentWillMount() {
                      const rootStore = this.context;
                      this.renderChild = this.renderChild.bind(this);
                      this.refFn = this.refFn.bind(this);
                      const store = rootStore.addStore({
                          id: helper_1.guid(),
                          path: this.props.$path,
                          storeType: renderer.storeType,
                          parentId: this.props.store ? this.props.store.id : ''
                      });
                      this.store = store;
                      if (renderer.extendsData === false) {
                          store.initData(helper_1.createObject(this.props.data
                              ? this.props.data.__super
                              : null, Object.assign(Object.assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data))));
                      }
                      else if (this.props.scope ||
                          (this.props.data && this.props.data.__super)) {
                          if (this.props.store && this.props.data === this.props.store.data) {
                              store.initData(helper_1.createObject(this.props.store.data, Object.assign({}, this.formatData(this.props.defaultData))));
                          }
                          else {
                              store.initData(helper_1.createObject(this.props.data.__super || this.props.scope, Object.assign(Object.assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data))));
                          }
                      }
                      else {
                          store.initData(Object.assign(Object.assign({}, this.formatData(this.props.defaultData)), this.formatData(this.props.data)));
                      }
                  }
                  componentWillReceiveProps(nextProps) {
                      var _a, _b;
                      const props = this.props;
                      const store = this.store;
                      const shouldSync = (_a = renderer.shouldSyncSuperStore) === null || _a === void 0 ? void 0 : _a.call(renderer, store, nextProps, props);
                      if (shouldSync === false) {
                          return;
                      }
                      if (renderer.extendsData === false) {
                          if (shouldSync === true ||
                              props.defaultData !== nextProps.defaultData ||
                              helper_1.isObjectShallowModified(props.data, nextProps.data) ||
                              //
                              // 特殊处理 CRUD。
                              // CRUD 中 toolbar 里面的 data 是空对象，但是 __super 会不一样
                              (nextProps.data &&
                                  props.data &&
                                  nextProps.data.__super !== props.data.__super)) {
                              store.initData(helper_1.extendObject(nextProps.data, Object.assign(Object.assign(Object.assign({}, (store.hasRemoteData ? store.data : null)), this.formatData(nextProps.defaultData)), this.formatData(nextProps.data))));
                          }
                      }
                      else if (shouldSync === true ||
                          helper_1.isObjectShallowModified(props.data, nextProps.data)) {
                          if (nextProps.store && nextProps.store.data === nextProps.data) {
                              store.initData(helper_1.createObject(nextProps.store.data, nextProps.syncSuperStore === false
                                  ? Object.assign({}, store.data) : helper_1.syncDataFromSuper(store.data, nextProps.store.data, props.scope, store, nextProps.syncSuperStore === true)));
                          }
                          else if (nextProps.data && nextProps.data.__super) {
                              store.initData(helper_1.extendObject(nextProps.data));
                          }
                          else {
                              store.initData(helper_1.createObject(nextProps.scope, nextProps.data));
                          }
                      }
                      else if ((shouldSync === true ||
                          !nextProps.store ||
                          nextProps.data !== nextProps.store.data) &&
                          nextProps.data &&
                          nextProps.data.__super) {
                          // 这个用法很少，当 data.__super 值发生变化时，更新 store.data
                          (!props.data ||
                              helper_1.isObjectShallowModified(nextProps.data.__super, props.data.__super, false)) &&
                              // nextProps.data.__super !== props.data.__super) &&
                              store.initData(helper_1.createObject(nextProps.data.__super, Object.assign(Object.assign({}, nextProps.data), store.data)), store.storeType === 'FormStore' &&
                                  ((_b = props.store) === null || _b === void 0 ? void 0 : _b.storeType) === 'CRUDStore');
                      }
                      else if (nextProps.scope &&
                          nextProps.data === nextProps.store.data &&
                          (shouldSync === true || props.data !== nextProps.data)) {
                          store.initData(helper_1.createObject(nextProps.scope, Object.assign({}, store.data)));
                      }
                  }
                  componentWillUnmount() {
                      const rootStore = this.context;
                      const store = this.store;
                      rootStore.removeStore(store);
                      // @ts-ignore
                      delete this.store;
                  }
                  renderChild(region, node, subProps = {}) {
                      let { render } = this.props;
                      return render(region, node, Object.assign(Object.assign({ data: this.store.data, dataUpdatedAt: this.store.updatedAt }, subProps), { scope: this.store.data, store: this.store }));
                  }
                  render() {
                      const _a = this.props, { detectField } = _a, rest = tslib_1.__rest(_a, ["detectField"]);
                      let exprProps = {};
                      if (!detectField || detectField === 'data') {
                          exprProps = filter_schema_1.default(rest, this.store.data, undefined, rest);
                          if (exprProps.hidden || exprProps.visible === false) {
                              return null;
                          }
                      }
                      return (react_1.default.createElement(Component, Object.assign({}, rest /* todo */, exprProps, { ref: this.refFn, data: this.store.data, dataUpdatedAt: this.store.updatedAt, store: this.store, scope: this.store.data, render: this.renderChild })));
                  }
              };
              StoreFactory.displayName = `WithStore(${Component.displayName || Component.name})`;
              StoreFactory.ComposedComponent = Component;
              StoreFactory.contextType = WithRootStore_1.RootStoreContext;
              StoreFactory = tslib_1.__decorate([
                  mobx_react_1.observer
              ], StoreFactory);
              return StoreFactory;
          })();
          hoist_non_react_statics_1.default(StoreFactory, Component);
          return StoreFactory;
      };
  }
  exports.HocStoreFactory = HocStoreFactory;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l0aFN0b3JlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL1dpdGhTdG9yZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDhGQUEwRDtBQUMxRCwyQ0FBb0M7QUFDcEMsMERBQTBCO0FBSTFCLGtGQUFzRDtBQUN0RCwyQ0FNd0I7QUFDeEIsbURBQWlEO0FBRWpELFNBQWdCLGVBQWUsQ0FBQyxRQVEvQjtJQUNDLE9BQU8sVUFBd0QsU0FBWTtRQVd6RTtZQUFBLElBQU0sWUFBWSxHQUFsQixNQUFNLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBZ0I7Z0JBVS9DLGtCQUFrQjtvQkFDaEIsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO2dCQUNsQixDQUFDO2dCQUVELEtBQUssQ0FBQyxHQUFRO29CQUNaLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO2dCQUNqQixDQUFDO2dCQUVELFVBQVUsQ0FBQyxJQUFTO29CQUNsQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7d0JBQ3ZCLE9BQU87NEJBQ0wsS0FBSyxFQUFFLElBQUk7eUJBQ1osQ0FBQztxQkFDSDtvQkFFRCxPQUFPLElBQWMsQ0FBQztnQkFDeEIsQ0FBQztnQkFFRCxrQkFBa0I7b0JBQ2hCLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7b0JBQy9CLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQy9DLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRW5DLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUM7d0JBQy9CLEVBQUUsRUFBRSxhQUFJLEVBQUU7d0JBQ1YsSUFBSSxFQUFF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

});
