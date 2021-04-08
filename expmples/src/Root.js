amis.define('src/Root.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.renderChild = exports.renderChildren = exports.Root = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const ImageGallery_1 = tslib_1.__importDefault(require("src/components/ImageGallery.tsx"));
  const locale_1 = require("src/locale.tsx");
  const RootRenderer_1 = require("src/RootRenderer.tsx");
  const SchemaRenderer_1 = require("src/SchemaRenderer.tsx");
  const Scoped_1 = tslib_1.__importDefault(require("src/Scoped.tsx"));
  const theme_1 = require("src/theme.tsx");
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const helper_1 = require("src/utils/helper.ts");
  const WithRootStore_1 = require("src/WithRootStore.tsx");
  let Root = /** @class */ (() => {
      class Root extends react_1.default.Component {
          resolveDefinitions(name) {
              const definitions = this.props.schema.definitions;
              if (!name || helper_1.isEmpty(definitions)) {
                  return {};
              }
              return definitions && definitions[name];
          }
          render() {
              const _a = this.props, { schema, rootStore, env, pathPrefix, location, data, locale, translate } = _a, rest = tslib_1.__rest(_a, ["schema", "rootStore", "env", "pathPrefix", "location", "data", "locale", "translate"]);
              const theme = env.theme;
              return (react_1.default.createElement(WithRootStore_1.RootStoreContext.Provider, { value: rootStore },
                  react_1.default.createElement(theme_1.ThemeContext.Provider, { value: this.props.theme || 'default' },
                      react_1.default.createElement(locale_1.LocaleContext.Provider, { value: this.props.locale },
                          react_1.default.createElement(ImageGallery_1.default, { modalContainer: env.getModalContainer },
                              react_1.default.createElement(RootRenderer_1.RootRenderer, Object.assign({ pathPrefix: pathPrefix || '', schema: isPlainObject_1.default(schema)
                                      ? Object.assign({ type: 'page' }, schema) : schema }, rest, { rootStore: rootStore, resolveDefinitions: this.resolveDefinitions, location: location, data: data, env: env, classnames: theme.classnames, classPrefix: theme.classPrefix, locale: locale, translate: translate })))))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Root.prototype, "resolveDefinitions", null);
      return Root;
  })();
  exports.Root = Root;
  function renderChildren(prefix, node, props) {
      if (Array.isArray(node)) {
          return node.map((node, index) => renderChild(`${prefix}/${index}`, node, Object.assign(Object.assign({}, props), { key: `${props.key ? `${props.key}-` : ''}${index}` })));
      }
      return renderChild(prefix, node, props);
  }
  exports.renderChildren = renderChildren;
  function renderChild(prefix, node, props) {
      if (Array.isArray(node)) {
          return renderChildren(prefix, node, props);
      }
      const typeofnode = typeof node;
      let schema = typeofnode === 'string' || typeofnode === 'number'
          ? { type: 'tpl', tpl: String(node) }
          : node;
      const detectData = schema &&
          (schema.detectField === '&' ? props : props[schema.detectField || 'data']);
      const exprProps = detectData
          ? filter_schema_1.default(schema, detectData, undefined, props)
          : null;
      if (exprProps &&
          (exprProps.hidden ||
              exprProps.visible === false ||
              schema.hidden ||
              schema.visible === false ||
              props.hidden ||
              props.visible === false)) {
          return null;
      }
      const transform = props.propsTransform;
      if (transform) {
          // @ts-ignore
          delete props.propsTransform;
          props = transform(props);
      }
      return (react_1.default.createElement(SchemaRenderer_1.SchemaRenderer, Object.assign({}, props, exprProps, { schema: schema, "$path": `${prefix ? `${prefix}/` : ''}${(schema && schema.type) || ''}` })));
  }
  exports.renderChild = renderChild;
  exports.default = Scoped_1.default(Root);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9Sb290LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUZBQWlEO0FBRWpELDBEQUEwQjtBQUUxQixxRkFBcUQ7QUFHckQscUNBQW9EO0FBQ3BELGlEQUE0QztBQUM1QyxxREFBZ0Q7QUFDaEQsOERBQThCO0FBRTlCLG1DQUFxQztBQUVyQyxrRkFBc0Q7QUFDdEQsMkNBQStEO0FBQy9ELG1EQUFpRDtBQW1CakQ7SUFBQSxNQUFhLElBQUssU0FBUSxlQUFLLENBQUMsU0FBb0I7UUFFbEQsa0JBQWtCLENBQUMsSUFBWTtZQUM3QixNQUFNLFdBQVcsR0FBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQWlCLENBQUMsV0FBVyxDQUFDO1lBQzlELElBQUksQ0FBQyxJQUFJLElBQUksZ0JBQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDakMsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELE9BQU8sV0FBVyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMxQyxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sS0FVRixJQUFJLENBQUMsS0FBSyxFQVZSLEVBQ0osTUFBTSxFQUNOLFNBQVMsRUFDVCxHQUFHLEVBQ0gsVUFBVSxFQUNWLFFBQVEsRUFDUixJQUFJLEVBQ0osTUFBTSxFQUNOLFNBQVMsT0FFRyxFQURULElBQUksc0JBVEgsdUZBVUwsQ0FBYSxDQUFDO1lBRWYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUV4QixPQUFPLENBQ0wsOEJBQUMsZ0NBQWdCLENBQUMsUUFBUSxJQUFDLEtBQUssRUFBRSxTQUFTO2dCQUN6Qyw4QkFBQyxvQkFBWSxDQUFDLFFBQVEsSUFBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksU0FBUztvQkFDekQsOEJB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

});
