amis.define('src/theme.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.themeable = exports.ThemeContext = exports.defaultTheme = exports.getTheme = exports.getClassPrefix = exports.classnames = exports.setDefaultTheme = exports.hasTheme = exports.makeClassnames = exports.theme = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  // 主题管理
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const themes = {
      default: {}
  };
  function theme(name, config) {
      themes[name] = Object.assign({}, config);
  }
  exports.theme = theme;
  const fns = {};
  function makeClassnames(ns) {
      if (ns && fns[ns]) {
          return fns[ns];
      }
      const fn = (...classes) => {
          const str = classnames_1.default(...classes);
          return str && ns
              ? str
                  .replace(/(^|\s)([A-Z])/g, '$1' + ns + '$2')
                  .replace(/(^|\s)\:/g, '$1')
              : str || '';
      };
      ns && (fns[ns] = fn);
      return fn;
  }
  exports.makeClassnames = makeClassnames;
  function hasTheme(theme) {
      return !!themes[theme];
  }
  exports.hasTheme = hasTheme;
  function setDefaultTheme(theme) {
      if (hasTheme(theme)) {
          exports.defaultTheme = theme;
      }
  }
  exports.setDefaultTheme = setDefaultTheme;
  function classnames(...classes) {
      return getTheme(exports.defaultTheme).classnames(...classes);
  }
  exports.classnames = classnames;
  function getClassPrefix() {
      return getTheme(exports.defaultTheme).classPrefix;
  }
  exports.getClassPrefix = getClassPrefix;
  function getTheme(theme) {
      if (!themes[theme]) {
          throw new Error(`Theme with name "${theme}" does not exist!`);
      }
      const config = themes[theme];
      if (!config.getRendererConfig) {
          config.getRendererConfig = (name) => config.renderers && name ? config.renderers[name] : null;
      }
      if (!config.classnames) {
          const ns = config.classPrefix;
          config.classnames = config.classnames || makeClassnames(ns);
      }
      if (!config.getComponentConfig) {
          config.getComponentConfig = (name) => config.components && name ? config.components[name] : null;
      }
      return config;
  }
  exports.getTheme = getTheme;
  exports.defaultTheme = 'default';
  exports.ThemeContext = react_1.default.createContext('');
  function themeable(ComposedComponent) {
      var _a;
      const result = hoist_non_react_statics_1.default((_a = class extends react_1.default.Component {
              render() {
                  const theme = this.props.theme || this.context || exports.defaultTheme;
                  const config = hasTheme(theme)
                      ? getTheme(theme)
                      : getTheme(exports.defaultTheme);
                  const injectedProps = {
                      classPrefix: config.classPrefix,
                      classnames: config.classnames,
                      theme
                  };
                  return (react_1.default.createElement(exports.ThemeContext.Provider, { value: theme },
                      react_1.default.createElement(ComposedComponent, Object.assign({}, config.getComponentConfig(ComposedComponent.themeKey), this.props, injectedProps))));
              }
          },
          _a.displayName = `Themeable(${ComposedComponent.displayName || ComposedComponent.name})`,
          _a.contextType = exports.ThemeContext,
          _a.ComposedComponent = ComposedComponent,
          _a), ComposedComponent);
      return result;
  }
  exports.themeable = themeable;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvdGhlbWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPO0FBQ1Asb0VBQTRCO0FBQzVCLDBEQUEwQjtBQUMxQiw4RkFBMEQ7QUErQjFELE1BQU0sTUFBTSxHQUVSO0lBQ0YsT0FBTyxFQUFFLEVBQUU7Q0FDWixDQUFDO0FBRUYsU0FBZ0IsS0FBSyxDQUFDLElBQVksRUFBRSxNQUE0QjtJQUM5RCxNQUFNLENBQUMsSUFBSSxDQUFDLHFCQUNQLE1BQU0sQ0FDVixDQUFDO0FBQ0osQ0FBQztBQUpELHNCQUlDO0FBRUQsTUFBTSxHQUFHLEdBRUwsRUFBRSxDQUFDO0FBQ1AsU0FBZ0IsY0FBYyxDQUFDLEVBQVc7SUFDeEMsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2pCLE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxHQUFHLE9BQXFCLEVBQUUsRUFBRTtRQUN0QyxNQUFNLEdBQUcsR0FBRyxvQkFBRSxDQUFDLEdBQUksT0FBZSxDQUFDLENBQUM7UUFDcEMsT0FBTyxHQUFHLElBQUksRUFBRTtZQUNkLENBQUMsQ0FBQyxHQUFHO2lCQUNBLE9BQU8sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztpQkFDM0MsT0FBTyxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUM7WUFDL0IsQ0FBQyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUM7SUFDaEIsQ0FBQyxDQUFDO0lBRUYsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3JCLE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQWhCRCx3Q0FnQkM7QUFRRCxTQUFn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

});
