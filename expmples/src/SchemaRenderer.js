amis.define('src/SchemaRenderer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SchemaRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const difference_1 = tslib_1.__importDefault(require("node_modules/lodash/difference"));
  const omit_1 = tslib_1.__importDefault(require("node_modules/lodash/omit"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  const factory_1 = require("src/factory.tsx");
  const Root_1 = require("src/Root.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const defaultOmitList = [
      'type',
      'name',
      '$ref',
      'className',
      'data',
      'children',
      'ref',
      'visible',
      'visibleOn',
      'hidden',
      'hiddenOn',
      'disabled',
      'disabledOn',
      'component',
      'detectField',
      'required',
      'requiredOn',
      'syncSuperStore'
  ];
  let SchemaRenderer = /** @class */ (() => {
      class SchemaRenderer extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.refFn = this.refFn.bind(this);
              this.renderChild = this.renderChild.bind(this);
              this.reRender = this.reRender.bind(this);
          }
          componentWillMount() {
              this.resolveRenderer(this.props);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.schema &&
                  nextProps.schema &&
                  (props.schema.type !== nextProps.schema.type ||
                      props.schema.$$id !== nextProps.schema.$$id)) {
                  this.resolveRenderer(nextProps);
              }
          }
          // 限制：只有 schema 除外的 props 变化，或者 schema 里面的某个成员值发生变化才更新。
          shouldComponentUpdate(nextProps) {
              const props = this.props;
              const list = difference_1.default(Object.keys(nextProps), [
                  'schema',
                  'scope'
              ]);
              if (difference_1.default(Object.keys(props), ['schema', 'scope']).length !==
                  list.length ||
                  helper_1.anyChanged(list, this.props, nextProps)) {
                  return true;
              }
              else {
                  const list = Object.keys(nextProps.schema);
                  if (Object.keys(props.schema).length !== list.length ||
                      helper_1.anyChanged(list, props.schema, nextProps.schema)) {
                      return true;
                  }
              }
              return false;
          }
          resolveRenderer(props, skipResolve = false) {
              let schema = props.schema;
              let path = props.$path;
              if (schema && schema.$ref) {
                  schema = Object.assign(Object.assign({}, props.resolveDefinitions(schema.$ref)), schema);
                  path = path.replace(/(?!.*\/).*/, schema.type);
              }
              if (!skipResolve) {
                  const rendererResolver = props.env.rendererResolver || factory_1.resolveRenderer;
                  this.renderer = rendererResolver(path, schema, props);
              }
              return { path, schema };
          }
          getWrappedInstance() {
              return this.ref;
          }
          refFn(ref) {
              this.ref = ref;
          }
          renderChild(region, node, subProps = {}) {
              let _a = this.props, { schema, $path, env } = _a, rest = tslib_1.__rest(_a, ["schema", "$path", "env"]);
              if (schema && schema.$ref) {
                  const result = this.resolveRenderer(this.props, true);
                  schema = result.schema;
                  $path = result.path;
              }
              const omitList = defaultOmitList.concat();
              if (this.renderer) {
                  const Component = this.renderer.component;
                  Component.propsList &&
                      omitList.push.apply(omitList, Component.propsList);
              }
              return Root_1.renderChild(`${$path}${region ? `/${region}` : ''}`, node || '', Object.assign(Object.assign(Object.assign({}, omit_1.default(rest, omitList)), subProps), { data: subProps.data || rest.data, env: env }));
          }
          reRender() {
              this.resolveRenderer(this.props);
              this.forceUpdate();
          }
          render() {
              let _a = this.props, { $path, schema } = _a, rest = tslib_1.__rest(_a, ["$path", "schema"]);
              if (schema === null) {
                  return null;
              }
              if (schema.$ref) {
                  const result = this.resolveRenderer(this.props, true);
                  schema = result.schema;
                  $path = result.path;
              }
              const theme = this.props.env.theme;
              if (Array.isArray(schema)) {
                  return Root_1.renderChildren($path, schema, rest);
              }
              else if (schema.children) {
                  return react_1.default.isValidElement(schema.children)
                      ? schema.children
                      : schema.children(Object.assign(Object.assign({}, rest), { $path: $path, render: this.renderChild, forwardedRef: this.refFn }));
              }
              else if (typeof schema.component === 'function') {
                  const isSFC = !(schema.component.prototype instanceof react_1.default.Component);
                  return react_1.default.createElement(schema.component, Object.assign(Object.assign(Object.assign({}, rest), schema), { $path: $path, ref: isSFC ? undefined : this.refFn, forwardedRef: isSFC ? this.refFn : undefined, render: this.renderChild }));
              }
              else if (Object.keys(schema).length === 0) {
                  return null;
              }
              else if (!this.renderer) {
                  return (react_1.default.createElement(LazyComponent_1.default, Object.assign({}, rest, { getComponent: async () => {
                          const result = await rest.env.loadRenderer(schema, $path, this.reRender);
                          if (result && typeof result === 'function') {
                              return result;
                          }
                          else if (result && react_1.default.isValidElement(result)) {
                              return () => result;
                          }
                          this.reRender();
                          return () => factory_1.loadRenderer(schema, $path);
                      }, "$path": $path, retry: this.reRender })));
              }
              const renderer = this.renderer;
              schema = factory_1.filterSchema(schema, renderer, rest);
              const { data: defaultData } = schema, restSchema = tslib_1.__rest(schema, ["data"]);
              const Component = renderer.component;
              return (react_1.default.createElement(Component, Object.assign({}, theme.getRendererConfig(renderer.name), restSchema, helper_1.chainEvents(rest, restSchema), { defaultData: defaultData, "$path": $path, ref: this.refFn, render: this.renderChild })));
          }
      }
      SchemaRenderer.displayName = 'Renderer';
      return SchemaRenderer;
  })();
  exports.SchemaRenderer = SchemaRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NoZW1hUmVuZGVyZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvU2NoZW1hUmVuZGVyZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwyRUFBMkM7QUFDM0MsK0RBQStCO0FBQy9CLDBEQUEwQjtBQUMxQix1RkFBdUQ7QUFDdkQsdUNBT21CO0FBQ25CLGlDQUFtRDtBQUVuRCwyQ0FBdUQ7QUFRdkQsTUFBTSxlQUFlLEdBQUc7SUFDdEIsTUFBTTtJQUNOLE1BQU07SUFDTixNQUFNO0lBQ04sV0FBVztJQUNYLE1BQU07SUFDTixVQUFVO0lBQ1YsS0FBSztJQUNMLFNBQVM7SUFDVCxXQUFXO0lBQ1gsUUFBUTtJQUNSLFVBQVU7SUFDVixVQUFVO0lBQ1YsWUFBWTtJQUNaLFdBQVc7SUFDWCxhQUFhO0lBQ2IsVUFBVTtJQUNWLFlBQVk7SUFDWixnQkFBZ0I7Q0FDakIsQ0FBQztBQUVGO0lBQUEsTUFBYSxjQUFlLFNBQVEsZUFBSyxDQUFDLFNBQW1DO1FBUTNFLFlBQVksS0FBMEI7WUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FBQztRQUVELGtCQUFrQjtZQUNoQixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNuQyxDQUFDO1FBRUQseUJBQXlCLENBQUMsU0FBOEI7WUFDdEQsTUFBTSxLQUFLLEdBQUcs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

});
