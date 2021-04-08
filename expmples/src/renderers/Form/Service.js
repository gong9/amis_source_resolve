amis.define('src/renderers/Form/Service.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ServiceRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Service_1 = tslib_1.__importDefault(require("src/renderers/Service.tsx"));
  const Scoped_1 = require("src/Scoped.tsx");
  const service_1 = require("src/store/service.ts");
  const helper_1 = require("src/utils/helper.ts");
  let ServiceRenderer = /** @class */ (() => {
      let ServiceRenderer = class ServiceRenderer extends Service_1.default {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentDidMount() {
              const { formInited, addHook } = this.props;
              this.mounted = true;
              // form层级下的所有service应该都会走这里
              // 但是传入props有可能是undefined，所以做个处理
              if (formInited !== false) {
                  super.componentDidMount();
              }
              else {
                  addHook && addHook(this.initFetch, 'init');
              }
          }
          componentDidUpdate(prevProps) {
              const { formInited } = this.props;
              if (formInited !== false) {
                  super.componentDidUpdate(prevProps);
              }
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              const removeHook = this.props.removeHook;
              removeHook && removeHook(this.initFetch, 'init');
              super.componentWillUnmount();
          }
          afterDataFetch(payload) {
              const formStore = this.props.formStore;
              const onChange = this.props.onChange;
              // 有可能有很多层 serivce，这里需要注意。
              if (formStore && this.isFormMode()) {
                  const keys = helper_1.isObject(payload === null || payload === void 0 ? void 0 : payload.data) ? Object.keys(payload.data) : [];
                  if (keys.length) {
                      formStore.setValues(payload.data);
                      onChange(payload.data[keys[0]], keys[0]);
                  }
              }
              return super.afterDataFetch(payload);
          }
          // schema 接口可能会返回数据，需要把它同步到表单上，否则会没用。
          afterSchemaFetch(schema) {
              const formStore = this.props.formStore;
              const onChange = this.props.onChange;
              // 有可能有很多层 serivce，这里需要注意。
              if (formStore && this.isFormMode()) {
                  const keys = helper_1.isObject(schema === null || schema === void 0 ? void 0 : schema.data) ? Object.keys(schema.data) : [];
                  if (keys.length) {
                      formStore.setValues(schema.data);
                      onChange(schema.data[keys[0]], keys[0]);
                  }
              }
              return super.afterSchemaFetch(schema);
          }
          isFormMode() {
              const { store, body: schema, controls, tabs, feildSet, renderFormItems, classnames: cx } = this.props;
              const finnalSchema = store.schema ||
                  schema || {
                  controls,
                  tabs,
                  feildSet
              };
              return (finnalSchema &&
                  !finnalSchema.type &&
                  (finnalSchema.controls || finnalSchema.tabs || finnalSchema.feildSet) &&
                  renderFormItems);
          }
          renderBody() {
              const { render, store, body: schema, controls, tabs, feildSet, renderFormItems, formMode, classnames: cx } = this.props;
              if (this.isFormMode()) {
                  const finnalSchema = store.schema ||
                      schema || {
                      controls,
                      tabs,
                      feildSet
                  };
                  return (react_1.default.createElement("div", { key: store.schemaKey || 'forms', className: cx(`Form--${formMode || 'normal'}`) }, renderFormItems(finnalSchema, 'controls', {
                      store,
                      data: store.data,
                      render
                  })));
              }
              return super.renderBody();
          }
      };
      ServiceRenderer.propsList = ['onChange'];
      ServiceRenderer.contextType = Scoped_1.ScopedContext;
      ServiceRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form\/(.*)\/service$/,
              weight: -100,
              storeType: service_1.ServiceStore.name,
              storeExtendsData: false,
              name: 'service-control'
          })
      ], ServiceRenderer);
      return ServiceRenderer;
  })();
  exports.ServiceRenderer = ServiceRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9TZXJ2aWNlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLDJDQUFzRDtBQUN0RCxpRUFBcUU7QUFFckUseUNBQW1FO0FBRW5FLGlEQUFnRTtBQUVoRSwrQ0FBNEM7QUFpQzVDO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxpQkFBWTtRQUkvQyxrQkFBa0I7WUFDaEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQXlCLENBQUM7WUFDOUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxpQkFBaUI7WUFDZixNQUFNLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDekMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7WUFFcEIsMkJBQTJCO1lBQzNCLGdDQUFnQztZQUNoQyxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQ3hCLEtBQUssQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO2FBQzNCO2lCQUFNO2dCQUNMLE9BQU8sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQzthQUM1QztRQUNILENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxTQUF1QjtZQUN4QyxNQUFNLEVBQUMsVUFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNoQyxJQUFJLFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQ3hCLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNyQztRQUNILENBQUM7UUFFRCxvQkFBb0I7WUFDbEIsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9B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

});
