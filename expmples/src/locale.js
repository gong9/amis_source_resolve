amis.define('src/locale.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.localeable = exports.LocaleContext = exports.setDefaultLocale = exports.getDefaultLocale = exports.makeTranslator = exports.register = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // 多语言支持
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let defaultLocale = 'zh-CN';
  const locales = {};
  function register(name, config) {
      locales[name] = config;
  }
  exports.register = register;
  const fns = {};
  function format(str, data) {
      return str.replace(/(\\)?\{\{([\s\S]+?)\}\}/g, (_, escape, key) => {
          if (escape) {
              return _.substring(1);
          }
          return tpl_builtin_1.resolveVariable(key, data || {});
      });
  }
  function makeTranslator(locale) {
      if (locale && fns[locale]) {
          return fns[locale];
      }
      const fn = (str, ...args) => {
          if (!str || typeof str !== 'string') {
              return str;
          }
          const dict = locales[locale] || locales[defaultLocale];
          return format((dict === null || dict === void 0 ? void 0 : dict[str]) || str, ...args);
      };
      locale && (fns[locale] = fn);
      return fn;
  }
  exports.makeTranslator = makeTranslator;
  function getDefaultLocale() {
      return defaultLocale;
  }
  exports.getDefaultLocale = getDefaultLocale;
  function setDefaultLocale(loacle) {
      defaultLocale = loacle;
  }
  exports.setDefaultLocale = setDefaultLocale;
  exports.LocaleContext = react_1.default.createContext('');
  function localeable(ComposedComponent) {
      var _a;
      const result = hoist_non_react_statics_1.default((_a = class extends react_1.default.Component {
              render() {
                  const locale = this.props.locale || this.context || defaultLocale;
                  const translate = this.props.translate || makeTranslator(locale);
                  const injectedProps = {
                      locale,
                      translate: translate
                  };
                  return (react_1.default.createElement(exports.LocaleContext.Provider, { value: locale },
                      react_1.default.createElement(ComposedComponent, Object.assign({}, this.props, injectedProps))));
              }
          },
          _a.displayName = `I18N(${ComposedComponent.displayName || ComposedComponent.name})`,
          _a.contextType = exports.LocaleContext,
          _a.ComposedComponent = ComposedComponent,
          _a), ComposedComponent);
      return result;
  }
  exports.localeable = localeable;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2xvY2FsZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLFFBQVE7QUFDUiwwREFBMEI7QUFDMUIsOEZBQTBEO0FBQzFELHFEQUFvRDtBQVFwRCxJQUFJLGFBQWEsR0FBVyxPQUFPLENBQUM7QUFFcEMsTUFBTSxPQUFPLEdBRVQsRUFBRSxDQUFDO0FBRVAsU0FBZ0IsUUFBUSxDQUFDLElBQVksRUFBRSxNQUFvQjtJQUN6RCxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO0FBQ3pCLENBQUM7QUFGRCw0QkFFQztBQUVELE1BQU0sR0FBRyxHQUVMLEVBQUUsQ0FBQztBQUVQLFNBQVMsTUFBTSxDQUFDLEdBQVcsRUFBRSxJQUFhO0lBQ3hDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQywwQkFBMEIsRUFBRSxDQUFDLENBQUMsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDaEUsSUFBSSxNQUFNLEVBQUU7WUFDVixPQUFPLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkI7UUFFRCxPQUFPLDZCQUFlLENBQUMsR0FBRyxFQUFFLElBQUksSUFBSSxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxTQUFnQixjQUFjLENBQUMsTUFBZTtJQUM1QyxJQUFJLE1BQU0sSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDekIsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEI7SUFFRCxNQUFNLEVBQUUsR0FBRyxDQUFDLEdBQVEsRUFBRSxHQUFHLElBQVcsRUFBRSxFQUFFO1FBQ3RDLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1lBQ25DLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFFRCxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTyxDQUFDLElBQUksT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELE9BQU8sTUFBTSxDQUFDLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFHLEdBQUcsTUFBSyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM3QyxDQUFDLENBQUM7SUFFRixNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDN0IsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDO0FBaEJELHdDQWdCQztBQUVELFNBQWdCLGdCQUFnQjtJQUM5QixPQUFPLGFBQWEsQ0FBQztBQUN2QixDQUFDO0FBRkQsNENBRUM7QUFFRCxTQUFnQixnQkFBZ0IsQ0FBQyxNQUFjO0lBQzdDLGFBQWEsR0FBRyxNQUFNLENBQUM7QUFDekIsQ0FBQztBQUZELDRDQUVDO0FBT1ksUUFBQSxhQUFhLEdBQUcsZUFBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUVyRCxTQUFnQixVQUFVLENBRXhCLGlCQUFvQjs7SUFTcEIsTUFBTSxNQUFNLEdBQUcsaUNBQW1CLE9BQ2hDLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBcUI7WUFPdkMsTUFBTTtnQkFDSixNQUFNLE1BQU0sR0FDVixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLGFBQWEsQ0FBQztnQkFDckQsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRSxNQUFNLGFBQWEsR0FHZjtvQkFDRixNQUFNO29CQUNOLFNBQVMsRUFBRSxTQUFVO2lCQUN0QixDQUFDO2dCQUVGLE9BQU8sQ0FDTCw4QkFBQyxxQkFBYSxDQUFDLFFBQVEsSUFBQyxLQUFLLEVBQUUsTUFBTTtvQkFDbkMsOEJBQUMsaUJBQWlCLG9CQUNYLElBQUksQ0FBQyxLQUdSLEVBQ0UsYUFBYSxFQUNqQixDQUNxQixDQUMxQixDQUFDO1lBQ0osQ0FBQztTQUNGO1FBOUJRLGNBQVcsR0FBRyxRQUNuQixpQkFBaUIsQ0FBQyxXQUFXLElBQUksaUJBQWlCLENBQUMsSUFDckQsR0FBSTtRQUNHLGNBQVcsR0FBRyxxQkFBYztRQUM1QixvQkFBaUIsR0FBRyxpQkFBa0I7YUEyQi9DLGlCQUFpQixDQUNsQixDQUFDO0lBRUYsT0FBTyxNQUVOLENBQUM7QUFDSixDQUFDO0FBbERELGdDQWtEQyJ9

});
