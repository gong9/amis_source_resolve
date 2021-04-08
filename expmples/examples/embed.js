amis.define('examples/embed.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.embed = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  require("examples/polyfills/index.ts");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  const path_to_regexp_1 = require("node_modules/path-to-regexp/dist/index");
  const copy_to_clipboard_1 = tslib_1.__importDefault(require("node_modules/copy-to-clipboard/index"));
  const normalizeLink_1 = require("src/utils/normalizeLink.ts");
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const index_1 = require("src/index.tsx");
  require("src/locale/en-US.ts");
  function embed(container, schema, props, env) {
      if (typeof container === 'string') {
          container = document.querySelector(container);
      }
      if (!container) {
          console.error('选择器不对，页面上没有此元素');
          return;
      }
      else if (container.tagName === 'BODY') {
          let div = document.createElement('div');
          container.appendChild(div);
          container = div;
      }
      container.classList.add('amis-scope');
      let scoped;
      const attachmentAdpator = (response) => {
          if (response &&
              response.headers &&
              response.headers['content-disposition']) {
              const disposition = response.headers['content-disposition'];
              let filename = '';
              if (disposition && disposition.indexOf('attachment') !== -1) {
                  let filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/i;
                  let matches = filenameRegex.exec(disposition);
                  if (matches != null && matches[1]) {
                      filename = matches[1].replace(/['"]/g, '');
                  }
                  // 很可能是中文被 url-encode 了
                  if (filename && filename.replace(/[^%]/g, '').length > 2) {
                      filename = decodeURIComponent(filename);
                  }
                  let type = response.headers['content-type'];
                  let blob = response.data.toString() === '[object Blob]'
                      ? response.data
                      : new Blob([response.data], { type: type });
                  if (typeof window.navigator.msSaveBlob !== 'undefined') {
                      // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
                      window.navigator.msSaveBlob(blob, filename);
                  }
                  else {
                      let URL = window.URL || window.webkitURL;
                      let downloadUrl = URL.createObjectURL(blob);
                      if (filename) {
                          // use HTML5 a[download] attribute to specify filename
                          let a = document.createElement('a');
                          // safari doesn't support this yet
                          if (typeof a.download === 'undefined') {
                              window.location = downloadUrl;
                          }
                          else {
                              a.href = downloadUrl;
                              a.download = filename;
                              document.body.appendChild(a);
                              a.click();
                          }
                      }
                      else {
                          window.location = downloadUrl;
                      }
                      setTimeout(function () {
                          URL.revokeObjectURL(downloadUrl);
                      }, 100); // cleanup
                  }
                  return Object.assign(Object.assign({}, response), { data: {
                          status: 0,
                          msg: '文件即将开始下载。。'
                      } });
              }
          }
          else if (response.data.toString() === '[object Blob]') {
              return new Promise((resolve, reject) => {
                  let reader = new FileReader();
                  reader.addEventListener('loadend', e => {
                      const text = reader.result;
                      try {
                          resolve(Object.assign(Object.assign({}, response), { data: Object.assign({}, JSON.parse(text)) }));
                      }
                      catch (e) {
                          reject(e);
                      }
                  });
                  reader.readAsText(response.data);
              });
          }
          return response;
      };
      const responseAdpater = (api) => (value) => {
          let response = value.data;
          if (env && env.responseAdpater) {
              const url = api.url;
              const idx = api.url.indexOf('?');
              const query = ~idx ? qs_1.default.parse(api.url.substring(idx)) : {};
              const request = Object.assign(Object.assign({}, api), { query: query, body: api.data });
              response = env.responseAdpater(api, response, query, request);
          }
          else {
              if (response.hasOwnProperty('errno')) {
                  response.status = response.errno;
                  response.msg = response.errmsg;
              }
              else if (response.hasOwnProperty('no')) {
                  response.status = response.no;
                  response.msg = response.error;
              }
          }
          const result = Object.assign(Object.assign({}, value), { data: response });
          return result;
      };
      react_dom_1.render(react_1.default.createElement("div", { className: "amis-routes-wrapper" },
          react_1.default.createElement(index_1.ToastComponent, { position: (env && env.toastPosition) || 'top-right', closeButton: false, timeout: 5000, theme: env === null || env === void 0 ? void 0 : env.theme }),
          react_1.default.createElement(index_1.AlertComponent, { theme: env === null || env === void 0 ? void 0 : env.theme, container: () => { var _a; return ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)) || container; } }),
          index_1.render(schema, Object.assign(Object.assign({}, props), { scopeRef: (ref) => (scoped = ref) }), Object.assign({ getModalContainer: () => { var _a; return ((_a = env === null || env === void 0 ? void 0 : env.getModalContainer) === null || _a === void 0 ? void 0 : _a.call(env)) || document.querySelector('.amis-scope'); }, notify: (type, msg) => index_1.toast[type]
                  ? index_1.toast[type](msg, type === 'error' ? '系统错误' : '系统消息')
                  : console.warn('[Notify]', type, msg), alert: index_1.alert,
              confirm: index_1.confirm, updateLocation: (to, replace) => {
                  if (to === 'goBack') {
                      return window.history.back();
                  }
                  if (replace && window.history.replaceState) {
                      window.history.replaceState('', document.title, to);
                      return;
                  }
                  location.href = normalizeLink_1.normalizeLink(to);
              }, isCurrentUrl: (to, ctx) => {
                  var _a;
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
                  else if (!~pathname.indexOf('http') && ~pathname.indexOf(':')) {
                      return path_to_regexp_1.match(link, {
                          decode: decodeURIComponent,
                          strict: (_a = ctx === null || ctx === void 0 ? void 0 : ctx.strict) !== null && _a !== void 0 ? _a : true
                      })(location.pathname);
                  }
                  return false;
              }, jumpTo: (to, action) => {
                  if (to === 'goBack') {
                      return window.history.back();
                  }
                  to = normalizeLink_1.normalizeLink(to);
                  if (action && action.actionType === 'url') {
                      action.blank === false
                          ? (window.location.href = to)
                          : window.open(to);
                      return;
                  }
                  if (/^https?:\/\//.test(to)) {
                      window.location.replace(to);
                  }
                  else {
                      location.href = to;
                  }
              }, fetcher: (api) => {
                  let { url, method, data, responseType, config, headers } = api;
                  config = config || {};
                  config.withCredentials = true;
                  responseType && (config.responseType = responseType);
                  if (config.cancelExecutor) {
                      config.cancelToken = new axios_1.default.CancelToken(config.cancelExecutor);
                  }
                  config.headers = headers || {};
                  config.method = method;
                  if (method === 'get' && data) {
                      config.params = data;
                  }
                  else if (data && data instanceof FormData) {
                      // config.headers['Content-Type'] = 'multipart/form-data';
                  }
                  else if (data &&
                      typeof data !== 'string' &&
                      !(data instanceof Blob) &&
                      !(data instanceof ArrayBuffer)) {
                      data = JSON.stringify(data);
                      config.headers['Content-Type'] = 'application/json';
                  }
                  data && (config.data = data);
                  return axios_1.default(url, config)
                      .then(attachmentAdpator)
                      .then(responseAdpater(api));
              }, isCancel: (value) => axios_1.default.isCancel(value), copy: (contents, options = {}) => {
                  const ret = copy_to_clipboard_1.default(contents, options);
                  ret && options.shutup !== true && index_1.toast.info('内容已拷贝到剪切板');
                  return ret;
              }, richTextToken: '', affixOffsetBottom: 0 }, env))), container);
      return scoped;
  }
  exports.embed = embed;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1iZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9leGFtcGxlcy9lbWJlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZCQUEyQjtBQUMzQiwwREFBMEI7QUFDMUIseUNBQWdEO0FBQ2hELDBEQUEwQjtBQUMxQixtREFBcUM7QUFDckMsa0ZBQXFDO0FBQ3JDLDhEQUF5RDtBQUV6RCxvREFBb0I7QUFDcEIsd0NBT3NCO0FBRXRCLCtCQUE2QjtBQUU3QixTQUFnQixLQUFLLENBQ25CLFNBQStCLEVBQy9CLE1BQVcsRUFDWCxLQUFVLEVBQ1YsR0FBUTtJQUVSLElBQUksT0FBTyxTQUFTLEtBQUssUUFBUSxFQUFFO1FBQ2pDLFNBQVMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBZ0IsQ0FBQztLQUM5RDtJQUNELElBQUksQ0FBQyxTQUFTLEVBQUU7UUFDZCxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDaEMsT0FBTztLQUNSO1NBQU0sSUFBSSxTQUFTLENBQUMsT0FBTyxLQUFLLE1BQU0sRUFBRTtRQUN2QyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDM0IsU0FBUyxHQUFHLEdBQUcsQ0FBQztLQUNqQjtJQUNELFNBQVMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQ3RDLElBQUksTUFBVyxDQUFDO0lBRWhCLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxRQUFhLEVBQUUsRUFBRTtRQUMxQyxJQUNFLFFBQVE7WUFDUixRQUFRLENBQUMsT0FBTztZQUNoQixRQUFRLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLEVBQ3ZDO1lBQ0EsTUFBTSxXQUFXLEdBQUcs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

});
