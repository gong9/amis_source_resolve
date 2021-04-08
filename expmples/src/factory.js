amis.define('src/factory.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RendererEnv = exports.getRendererByName = exports.getRenderers = exports.resolveRenderer = exports.updateEnv = exports.clearStoresCache = exports.render = exports.loadRenderer = exports.unRegisterRenderer = exports.registerRenderer = exports.Renderer = exports.filterSchema = exports.addSchemaFilter = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const index_1 = require("src/store/index.ts");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const api_1 = require("src/utils/api.ts");
  const normalizeLink_1 = require("src/utils/normalizeLink.ts");
  const helper_1 = require("src/utils/helper.ts");
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  const Scoped_1 = tslib_1.__importDefault(require("src/Scoped.tsx"));
  const theme_1 = require("src/theme.tsx");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  const Toast_1 = require("src/components/Toast.tsx");
  const Alert_1 = require("src/components/Alert.tsx");
  const locale_1 = require("src/locale.tsx");
  const Root_1 = tslib_1.__importDefault(require("src/Root.tsx"));
  const WithStore_1 = require("src/WithStore.tsx");
  const env_1 = require("src/env.tsx");
  Object.defineProperty(exports, "RendererEnv", { enumerable: true, get: function () { return env_1.RendererEnv; } });
  const renderers = [];
  const rendererNames = [];
  const schemaFilters = [];
  let anonymousIndex = 1;
  function addSchemaFilter(fn) {
      schemaFilters.push(fn);
  }
  exports.addSchemaFilter = addSchemaFilter;
  function filterSchema(schema, render, props) {
      return schemaFilters.reduce((schema, filter) => filter(schema, render, props), schema);
  }
  exports.filterSchema = filterSchema;
  function Renderer(config) {
      return function (component) {
          const renderer = registerRenderer(Object.assign(Object.assign({}, config), { component: component }));
          return renderer.component;
      };
  }
  exports.Renderer = Renderer;
  function registerRenderer(config) {
      if (!config.test) {
          throw new TypeError('config.test is required');
      }
      else if (!config.component) {
          throw new TypeError('config.component is required');
      }
      config.weight = config.weight || 0;
      config.Renderer = config.component;
      config.name = config.name || `anonymous-${anonymousIndex++}`;
      if (~rendererNames.indexOf(config.name)) {
          throw new Error(`The renderer with name "${config.name}" has already exists, please try another name!`);
      }
      if (config.storeType && config.component) {
          config.component = WithStore_1.HocStoreFactory({
              storeType: config.storeType,
              extendsData: config.storeExtendsData,
              shouldSyncSuperStore: config.shouldSyncSuperStore
          })(mobx_react_1.observer(config.component));
      }
      if (config.isolateScope) {
          config.component = Scoped_1.default(config.component);
      }
      const idx = helper_1.findIndex(renderers, item => config.weight < item.weight);
      ~idx ? renderers.splice(idx, 0, config) : renderers.push(config);
      rendererNames.push(config.name);
      return config;
  }
  exports.registerRenderer = registerRenderer;
  function unRegisterRenderer(config) {
      let idx = typeof config === 'string'
          ? helper_1.findIndex(renderers, item => item.name === config)
          : renderers.indexOf(config);
      ~idx && renderers.splice(idx, 1);
      let idx2 = typeof config === 'string'
          ? helper_1.findIndex(rendererNames, item => item === config)
          : rendererNames.indexOf(config.name || '');
      ~idx2 && rendererNames.splice(idx2, 1);
      // 清空渲染器定位缓存
      cache = {};
  }
  exports.unRegisterRenderer = unRegisterRenderer;
  function loadRenderer(schema, path) {
      return (react_1.default.createElement(Alert2_1.default, { level: "danger" },
          react_1.default.createElement("p", null, "Error: \u627E\u4E0D\u5230\u5BF9\u5E94\u7684\u6E32\u67D3\u5668"),
          react_1.default.createElement("p", null,
              "Path: ",
              path),
          react_1.default.createElement("pre", null,
              react_1.default.createElement("code", null, JSON.stringify(schema, null, 2)))));
  }
  exports.loadRenderer = loadRenderer;
  const defaultOptions = {
      session: 'global',
      affixOffsetTop: 50,
      affixOffsetBottom: 0,
      richTextToken: '',
      loadRenderer,
      fetcher() {
          return Promise.reject('fetcher is required');
      },
      // 使用 WebSocket 来实时获取数据
      wsFetcher(ws, onMessage, onError) {
          if (ws) {
              const socket = new WebSocket(ws);
              socket.onmessage = (event) => {
                  if (event.data) {
                      onMessage(JSON.parse(event.data));
                  }
              };
              socket.onerror = onError;
              return {
                  close: socket.close
              };
          }
          else {
              return {
                  close: () => { }
              };
          }
      },
      isCancel() {
          console.error('Please implements this. see https://baidu.gitee.io/amis/docs/start/getting-started#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97');
          return false;
      },
      updateLocation() {
          console.error('Please implements this. see https://baidu.gitee.io/amis/docs/start/getting-started#%E4%BD%BF%E7%94%A8%E6%8C%87%E5%8D%97');
      },
      alert: Alert_1.alert,
      confirm: Alert_1.confirm,
      notify: (type, msg, conf) => Toast_1.toast[type]
          ? Toast_1.toast[type](msg, type === 'error' ? 'Error' : 'Info', conf)
          : console.warn('[Notify]', type, msg),
      jumpTo: (to, action) => {
          if (to === 'goBack') {
              return window.history.back();
          }
          to = normalizeLink_1.normalizeLink(to);
          if (action && action.actionType === 'url') {
              action.blank === false ? (window.location.href = to) : window.open(to);
              return;
          }
          if (/^https?:\/\//.test(to)) {
              window.location.replace(to);
          }
          else {
              location.href = to;
          }
      },
      isCurrentUrl: (to) => {
          if (!to) {
              return false;
          }
          const link = normalizeLink_1.normalizeLink(to);
          const location = window.location;
          let pathname = link;
          let search = '';
          const idx = link.indexOf('?');
          if (~idx) {
              pathname = link.substring(0, idx);
              search = link.substring(idx);
          }
          if (search) {
              if (pathname !== location.pathname || !location.search) {
                  return false;
              }
              const query = qs_1.default.parse(search.substring(1));
              const currentQuery = qs_1.default.parse(location.search.substring(1));
              return Object.keys(query).every(key => query[key] === currentQuery[key]);
          }
          else if (pathname === location.pathname) {
              return true;
          }
          return false;
      },
      copy(contents) {
          console.error('copy contents', contents);
      },
      rendererResolver: resolveRenderer
  };
  let stores = {};
  function render(schema, props = {}, options = {}, pathPrefix = '') {
      let locale = props.locale || locale_1.getDefaultLocale();
      // 兼容 locale 的不同写法
      locale = locale.replace('_', '-');
      locale = locale === 'en' ? 'en-US' : locale;
      locale = locale === 'zh' ? 'zh-CN' : locale;
      locale = locale === 'cn' ? 'zh-CN' : locale;
      const translate = props.translate || locale_1.makeTranslator(locale);
      let store = stores[options.session || 'global'];
      if (!store) {
          options = Object.assign(Object.assign(Object.assign({}, defaultOptions), options), { fetcher: options.fetcher
                  ? api_1.wrapFetcher(options.fetcher)
                  : defaultOptions.fetcher, confirm: helper_1.promisify(options.confirm || defaultOptions.confirm || window.confirm), locale,
              translate });
          store = index_1.RendererStore.create({}, options);
          stores[options.session || 'global'] = store;
      }
      window.amisStore = store; // 为了方便 debug.
      const env = mobx_state_tree_1.getEnv(store);
      const theme = props.theme || options.theme || 'default';
      env.theme = theme_1.getTheme(theme);
      if (props.locale !== undefined) {
          env.translate = translate;
          env.locale = locale;
      }
      return (react_1.default.createElement(env_1.EnvContext.Provider, { value: env },
          react_1.default.createElement(Root_1.default, Object.assign({}, props, { schema: schema, pathPrefix: pathPrefix, rootStore: store, env: env, theme: theme, locale: locale, translate: translate }))));
  }
  exports.render = render;
  // 默认 env 会被缓存，所以新传入的 env 不会替换旧的。
  // 除非先删了旧的，新的才会生效。
  function clearStoresCache(sessions = Object.keys(stores)) {
      if (!Array.isArray(sessions)) {
          sessions = [sessions];
      }
      sessions.forEach(key => {
          const store = stores[key];
          // @ts-ignore
          delete stores[key];
          store && mobx_state_tree_1.destroy(store);
      });
  }
  exports.clearStoresCache = clearStoresCache;
  // 当然也可以直接这样更新。
  // 主要是有时候第一次创建的时候并没有准备多少接口，
  // 可以后续补充点，比如 amis 自己实现的，prompt 里面的表单。
  function updateEnv(options, session = 'global') {
      options = Object.assign({}, options);
      if (options.fetcher) {
          options.fetcher = api_1.wrapFetcher(options.fetcher);
      }
      if (options.confirm) {
          options.confirm = helper_1.promisify(options.confirm);
      }
      let store = stores[options.session || session];
      if (!store) {
          store = index_1.RendererStore.create({}, options);
          stores[options.session || session] = store;
      }
      else {
          const env = mobx_state_tree_1.getEnv(store);
          Object.assign(env, options);
      }
  }
  exports.updateEnv = updateEnv;
  let cache = {};
  function resolveRenderer(path, schema) {
      if (cache[path]) {
          return cache[path];
      }
      else if (path && path.length > 1024) {
          throw new Error('Path太长是不是死循环了？');
      }
      let renderer = null;
      renderers.some(item => {
          let matched = false;
          // 不应该搞得这么复杂的，让每个渲染器唯一 id，自己不晕别人用起来也不晕。
          if (typeof item.test === 'function') {
              matched = item.test(path, schema, resolveRenderer);
          }
          else if (item.test instanceof RegExp) {
              matched = item.test.test(path);
          }
          if (matched) {
              renderer = item;
          }
          return matched;
      });
      // 只能缓存纯正则表达式的后者方法中没有用到第二个参数的，
      // 因为自定义 test 函数的有可能依赖 schema 的结果
      if (renderer !== null &&
          (renderer.test instanceof RegExp ||
              (typeof renderer.test === 'function' &&
                  renderer.test.length < 2))) {
          cache[path] = renderer;
      }
      return renderer;
  }
  exports.resolveRenderer = resolveRenderer;
  function getRenderers() {
      return renderers.concat();
  }
  exports.getRenderers = getRenderers;
  function getRendererByName(name) {
      return find_1.default(renderers, item => item.name === name);
  }
  exports.getRendererByName = getRendererByName;
  Alert_1.setRenderSchemaFn((controls, value, callback, scopeRef, theme) => {
      return render({
          name: 'form',
          type: 'form',
          wrapWithPanel: false,
          mode: 'horizontal',
          controls,
          messages: {
              validateFailed: ''
          }
      }, {
          data: value,
          onFinished: callback,
          scopeRef,
          theme
      }, {
          session: 'prompt'
      });
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjdG9yeS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9mYWN0b3J5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9EQUFvQjtBQUNwQix5Q0FBK0U7QUFDL0UscURBQWtEO0FBQ2xELHFDQUEwQztBQUMxQyx5REFBc0Q7QUFDdEQsMkNBQXNEO0FBRXRELDJDQUFzQztBQUN0Qyw4REFBOEI7QUFDOUIsbUNBQThEO0FBQzlELCtEQUErQjtBQUMvQix5RUFBd0M7QUFDeEMsOENBQTJDO0FBQzNDLDhDQUF1RTtBQUN2RSxxQ0FBeUU7QUFDekUsMERBQTZEO0FBQzdELDJDQUE4QztBQUM5QywrQkFBZ0Q7QUEyZHZDLDRGQTNkWSxpQkFBVyxPQTJkWjtBQXJYcEIsTUFBTSxTQUFTLEdBQTBCLEVBQUUsQ0FBQztBQUM1QyxNQUFNLGFBQWEsR0FBa0IsRUFBRSxDQUFDO0FBQ3hDLE1BQU0sYUFBYSxHQUE4QixFQUFFLENBQUM7QUFDcEQsSUFBSSxjQUFjLEdBQUcsQ0FBQyxDQUFDO0FBRXZCLFNBQWdCLGVBQWUsQ0FBQyxFQUFzQjtJQUNwRCxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFGRCwwQ0FFQztBQUVELFNBQWdCLFlBQVksQ0FDMUIsTUFBYyxFQUNkLE1BQXNCLEVBQ3RCLEtBQVc7SUFFWCxPQUFPLGFBQWEsQ0FBQyxNQUFNLENBQ3pCLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQ2pELE1BQU0sQ0FDRyxDQUFDO0FBQ2QsQ0FBQztBQVRELG9DQVNDO0FBRUQsU0FBZ0IsUUFBUSxDQUFDLE1BQTJCO0lBQ2xELE9BQU8sVUFBdUMsU0FBWTtRQUN4RCxNQUFNLFFBQVEsR0FBRyxnQkFB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

});
