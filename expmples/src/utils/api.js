amis.define('src/utils/api.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.clearApiCache = exports.setApiCache = exports.getApiCache = exports.isSameApi = exports.isEffectiveApi = exports.isValidApi = exports.isApiOutdated = exports.wrapAdaptor = exports.wrapFetcher = exports.responseAdaptor = exports.buildApi = exports.normalizeApi = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const rSchema = /(?:^|raw\:)(get|post|put|delete|patch|options|head):/i;
  const apiCaches = [];
  function normalizeApi(api, defaultMethod) {
      if (typeof api === 'string') {
          let method = rSchema.test(api) ? RegExp.$1 : '';
          method && (api = api.replace(method + ':', ''));
          api = {
              method: (method || defaultMethod),
              url: api
          };
      }
      else {
          api = Object.assign({}, api);
      }
      return api;
  }
  exports.normalizeApi = normalizeApi;
  function buildApi(api, data, options = {}) {
      api = normalizeApi(api, options.method);
      const { autoAppend, ignoreData } = options, rest = tslib_1.__rest(options, ["autoAppend", "ignoreData"]);
      api.config = Object.assign({}, rest);
      api.method = (api.method || options.method || 'get').toLowerCase();
      if (!data) {
          return api;
      }
      else if (data instanceof FormData ||
          data instanceof Blob ||
          data instanceof ArrayBuffer) {
          api.data = data;
          return api;
      }
      const raw = (api.url = api.url || '');
      const idx = api.url.indexOf('?');
      if (~idx) {
          const hashIdx = api.url.indexOf('#');
          const params = qs_1.default.parse(api.url.substring(idx + 1, ~hashIdx ? hashIdx : undefined));
          api.url =
              tpl_builtin_1.tokenize(api.url.substring(0, idx + 1), data, '| url_encode') +
                  helper_1.qsstringify((api.query = tpl_builtin_1.dataMapping(params, data))) +
                  (~hashIdx ? api.url.substring(hashIdx) : '');
      }
      else {
          api.url = tpl_builtin_1.tokenize(api.url, data, '| url_encode');
      }
      if (ignoreData) {
          return api;
      }
      if (api.data) {
          api.body = api.data = tpl_builtin_1.dataMapping(api.data, data);
      }
      else if (api.method === 'post' || api.method === 'put') {
          api.body = api.data = helper_1.cloneObject(data);
      }
      // get 类请求，把 data 附带到 url 上。
      if (api.method === 'get') {
          if (!~raw.indexOf('$') && !api.data && autoAppend) {
              api.query = api.data = data;
          }
          else if (api.attachDataToQuery === false &&
              api.data &&
              !~raw.indexOf('$') &&
              autoAppend) {
              const idx = api.url.indexOf('?');
              if (~idx) {
                  let params = (api.query = Object.assign(Object.assign({}, qs_1.default.parse(api.url.substring(idx + 1))), data));
                  api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
              }
              else {
                  api.query = data;
                  api.url += '?' + helper_1.qsstringify(data);
              }
          }
          if (api.data && api.attachDataToQuery !== false) {
              const idx = api.url.indexOf('?');
              if (~idx) {
                  let params = (api.query = Object.assign(Object.assign({}, qs_1.default.parse(api.url.substring(idx + 1))), api.data));
                  api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
              }
              else {
                  api.query = api.data;
                  api.url += '?' + helper_1.qsstringify(api.data);
              }
              delete api.data;
          }
      }
      if (api.headers) {
          api.headers = tpl_builtin_1.dataMapping(api.headers, data);
      }
      if (api.requestAdaptor && typeof api.requestAdaptor === 'string') {
          api.requestAdaptor = str2function(api.requestAdaptor, 'api');
      }
      if (api.adaptor && typeof api.adaptor === 'string') {
          api.adaptor = str2function(api.adaptor, 'payload', 'response', 'api');
      }
      return api;
  }
  exports.buildApi = buildApi;
  function str2function(contents, ...args) {
      try {
          let fn = new Function(...args, contents);
          return fn;
      }
      catch (e) {
          console.warn(e);
          return null;
      }
  }
  function responseAdaptor(ret, api) {
      const data = ret.data;
      let hasStatusField = true;
      if (!data) {
          throw new Error('Response is empty!');
      }
      else if (!data.hasOwnProperty('status')) {
          hasStatusField = false;
      }
      const payload = {
          ok: hasStatusField === false || data.status == 0,
          status: hasStatusField === false ? 0 : data.status,
          msg: data.msg,
          msgTimeout: data.msgTimeout,
          data: !data.data && !hasStatusField ? data : data.data // 兼容直接返回数据的情况
      };
      if (payload.status == 422) {
          payload.errors = data.errors;
      }
      if (payload.ok && api.responseData) {
          payload.data = tpl_builtin_1.dataMapping(api.responseData, helper_1.createObject({ api }, (Array.isArray(payload.data)
              ? {
                  items: payload.data
              }
              : payload.data) || {}));
      }
      return payload;
  }
  exports.responseAdaptor = responseAdaptor;
  function wrapFetcher(fn) {
      return function (api, data, options) {
          api = buildApi(api, data, options);
          api.requestAdaptor && (api = api.requestAdaptor(api) || api);
          if (api.data && (helper_1.hasFile(api.data) || api.dataType === 'form-data')) {
              api.data = helper_1.object2formData(api.data, api.qsOptions);
          }
          else if (api.data &&
              typeof api.data !== 'string' &&
              api.dataType === 'form') {
              api.data = helper_1.qsstringify(api.data, api.qsOptions);
              api.headers = api.headers || (api.headers = {});
              api.headers['Content-Type'] = 'application/x-www-form-urlencoded';
          }
          else if (api.data &&
              typeof api.data !== 'string' &&
              api.dataType === 'json') {
              api.data = JSON.stringify(api.data);
              api.headers = api.headers || (api.headers = {});
              api.headers['Content-Type'] = 'application/json';
          }
          if (typeof api.cache === 'number' && api.cache > 0) {
              const apiCache = getApiCache(api);
              return wrapAdaptor(apiCache
                  ? apiCache.cachedPromise
                  : setApiCache(api, fn(api)), api);
          }
          return wrapAdaptor(fn(api), api);
      };
  }
  exports.wrapFetcher = wrapFetcher;
  function wrapAdaptor(promise, api) {
      const adaptor = api.adaptor;
      return adaptor
          ? promise
              .then(async (response) => {
              let result = adaptor(response.data, response, api);
              if (result === null || result === void 0 ? void 0 : result.then) {
                  result = await result;
              }
              return Object.assign(Object.assign({}, response), { data: result });
          })
              .then(ret => responseAdaptor(ret, api))
          : promise.then(ret => responseAdaptor(ret, api));
  }
  exports.wrapAdaptor = wrapAdaptor;
  function isApiOutdated(prevApi, nextApi, prevData, nextData) {
      const url = (nextApi && nextApi.url) || nextApi;
      if (nextApi && nextApi.autoRefresh === false) {
          return false;
      }
      if (url && typeof url === 'string' && ~url.indexOf('$')) {
          prevApi = buildApi(prevApi, prevData, { ignoreData: true });
          nextApi = buildApi(nextApi, nextData, { ignoreData: true });
          return !!(prevApi.url !== nextApi.url &&
              isValidApi(nextApi.url) &&
              (!nextApi.sendOn || tpl_1.evalExpression(nextApi.sendOn, nextData)));
      }
      return false;
  }
  exports.isApiOutdated = isApiOutdated;
  function isValidApi(api) {
      return (api &&
          /^(?:(https?|wss?|taf):\/\/[^\/]+)?(\/?[^\s\/\?]*){1,}(\?.*)?$/.test(api));
  }
  exports.isValidApi = isValidApi;
  function isEffectiveApi(api, data, initFetch, initFetchOn) {
      if (!api) {
          return false;
      }
      if (initFetch === false) {
          return false;
      }
      if (initFetchOn && data && !tpl_1.evalExpression(initFetchOn, data)) {
          return false;
      }
      if (typeof api === 'string' && api.length) {
          return true;
      }
      else if (helper_1.isObject(api) && api.url) {
          if (api.sendOn &&
              data &&
              !tpl_1.evalExpression(api.sendOn, data)) {
              return false;
          }
          return true;
      }
      return false;
  }
  exports.isEffectiveApi = isEffectiveApi;
  function isSameApi(apiA, apiB) {
      return (apiA.method === apiB.method &&
          apiA.url === apiB.url &&
          !helper_1.isObjectShallowModified(apiA.data, apiB.data, false));
  }
  exports.isSameApi = isSameApi;
  function getApiCache(api) {
      // 清理过期cache
      const now = Date.now();
      let result;
      for (let idx = 0, len = apiCaches.length; idx < len; idx++) {
          const apiCache = apiCaches[idx];
          if (now - apiCache.requestTime > apiCache.cache) {
              apiCaches.splice(idx, 1);
              len--;
              idx--;
              continue;
          }
          if (isSameApi(api, apiCache)) {
              result = apiCache;
              break;
          }
      }
      return result;
  }
  exports.getApiCache = getApiCache;
  function setApiCache(api, promise) {
      apiCaches.push(Object.assign(Object.assign({}, api), { cachedPromise: promise, requestTime: Date.now() }));
      return promise;
  }
  exports.setApiCache = setApiCache;
  function clearApiCache() {
      apiCaches.splice(0, apiCaches.length);
  }
  exports.clearApiCache = clearApiCache;
  // window.apiCaches = apiCaches;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL2FwaS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsK0NBQW9EO0FBQ3BELG9EQUFvQjtBQUNwQiwrQkFBcUM7QUFDckMscUNBUWtCO0FBRWxCLE1BQU0sT0FBTyxHQUFHLHVEQUF1RCxDQUFDO0FBT3hFLE1BQU0sU0FBUyxHQUEwQixFQUFFLENBQUM7QUFFNUMsU0FBZ0IsWUFBWSxDQUFDLEdBQVEsRUFBRSxhQUFzQjtJQUMzRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUMzQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDaEQsTUFBTSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBRWhELEdBQUcsR0FBRztZQUNKLE1BQU0sRUFBRSxDQUFDLE1BQU0sSUFBSSxhQUFhLENBQVE7WUFDeEMsR0FBRyxFQUFFLEdBQUc7U0FDVCxDQUFDO0tBQ0g7U0FBTTtRQUNMLEdBQUcscUJBQ0UsR0FBRyxDQUNQLENBQUM7S0FDSDtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQWZELG9DQWVDO0FBRUQsU0FBZ0IsUUFBUSxDQUN0QixHQUFRLEVBQ1IsSUFBYSxFQUNiLFVBSUksRUFBRTtJQUVOLEdBQUcsR0FBRyxZQUFZLENBQUMsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxNQUFNLEVBQUMsVUFBVSxFQUFFLFVBQVUsS0FBYSxPQUFPLEVBQWYsSUFBSSxrQkFBSSxPQUFPLEVBQTNDLDRCQUFpQyxDQUFVLENBQUM7SUFFbEQsR0FBRyxDQUFDLE1BQU0scUJBQ0wsSUFBSSxDQUNSLENBQUM7SUFDRixHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLE1BQU0sSUFBSyxPQUFlLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBRTVFLElBQUksQ0FBQyxJQUFJLEVBQUU7UUFDVCxPQUFPLEdBQUcsQ0FBQztLQUNaO1NBQU0sSUFDTCxJQUFJLFlBQVksUUFBUTtRQUN4QixJQUFJLFlBQVksSUFBSTtRQUNwQixJQUFJLFlBQVksV0FBVyxFQUMzQjtRQUNBLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2hCLE9BQU8sR0FBRyxDQUFDO0tBQ1o7SUFFRCxNQUFNLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN0QyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVqQyxJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDckMsTUFBTSxNQUFNLEdBQUcsWUFBRSxDQUFDLEtBQUssQ0FDckIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FDM0QsQ0FBQztRQUNGLEdBQUcsQ0FBQyxHQUFHO1lBQ0wsc0JBQVEsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxjQUFjLENBQUM7Z0JBQzdELG9CQUFXLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxHQUFHLHlCQUFXLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3BELENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUNoRDtTQUFNO1FBQ0wsR0FBRyxDQUFDLEdBQUcsR0FBRyxzQkFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLGNBQWMsQ0FBQyxDQUFDO0tBQ25EO0lBRUQsSUFBSSxVQUFVLEVBQUU7UUFDZCxPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsSUFBSSxHQUFHLENBQUMsSUFBSSxFQUFFO1FBQ1osR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLHlCQUFXLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNuRDtTQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxNQUFNLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxLQUFLLEVBQUU7UUFDeEQsR0FBRyxDQUFDLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLG9CQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekM7SUFFRCw0QkFBNEI7SUFDNUIsSUFBSSxHQUFHLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTtRQUN4QixJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSSxVQUFVLEVBQUU7WUFDakQsR0FBRyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM3QjthQUFNLElBQ0wsR0FBRyxDQUFDLGlCQUFpQixLQUFLLEtBQUs7WUFDL0IsR0FBRyxDQUFDLElBQUk7WUFDUixDQUFDLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDbEIsVUFBVSxFQUNWO1lBQ0EsTUFBTSxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEdBQUcsRUFBRTtnQkFDUixJQUFJLE1BQU0sR0FBRyxDQUFDLEdBQUcsQ0FBQyxLQUFLLG1DQUNsQixZQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUNwQyxJQUFJLENBQ1IsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO2dCQUNqQixHQUFHLENBQUMsR0FBRyxJQUFJLEdBQUcsR0FBRyxvQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3BDO1NBQ0Y7UUFFRCxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksR0FBRyxDQUFDLGlCQUFpQixLQUFLLEtBQUssRUFBRTtZQUMvQyxNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLElBQUksTUFBTSxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssbUNBQ2xCLFlBQUUsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQ3BDLEdBQUcsQ0FBQyxJQUFJLENBQ1osQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxHQUFHLEdBQUcsR0FBRyxvQkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO2FBQ2pFO2lCQUFNO2dCQUNMLEdBQUcsQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztnQkFDckIsR0FBRyxDQUFDLEdBQUcsSUFBSSxHQUFHLEdBQUcsb0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUM7U0FDakI7S0FDRjtJQUVELElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtRQUNmLEdBQUcsQ0FBQyxPQUFPLEdBQUcseUJBQVcsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlDO0lBRUQsSUFBSSxHQUFHLENBQUMsY0FBYyxJQUFJLE9BQU8sR0FBRyxDQUFDLGNBQWMsS0FBSyxRQUFRLEVBQUU7UUFDaEUsR0FBRyxDQUFDLGNBQWMsR0FBRyxZQUFZLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxLQUFLLENBQVEsQ0FBQztLQUNyRTtJQUVELElBQUksR0FBRyxDQUFDLE9BQU8sSUFBSSxPQUFPLEdBQUcsQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO1FBQ2xELEdBQUcsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUN4QixHQUFHLENBQUMsT0FBTyxFQUNYLFNBQVMsRUFDVCxVQUFVLEVBQ1YsS0FBSyxDQUNDLENBQUM7S0FDVjtJQUVELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQS9HRCw0QkErR0M7QUFFRCxTQUFTLFlBQVksQ0FDbkIsUUFBZ0IsRUFDaEIsR0FBRyxJQUFtQjtJQUV0QixJQUFJO1FBQ0YsSUFBSSxFQUFFLEdBQUcsSUFBSSxRQUFRLENBQUMsR0FBRyxJQUFJLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDekMsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQztLQUNiO0FBQ0gsQ0FBQztBQUVELFNBQWdCLGVBQWUsQ0FBQyxHQUFrQixFQUFFLEdBQWM7SUFDaEUsTUFBTSxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztJQUN0QixJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksRUFBRTtRQUNULE1BQU0sSUFBSSxLQUFLLENBQUMsb0JBQW9CLENBQUMsQ0FBQztLQUN2QztTQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxFQUFFO1FBQ3pDLGNBQWMsR0FBRyxLQUFLLENBQUM7S0FDeEI7SUFFRCxNQUFNLE9BQU8sR0FBWTtRQUN2QixFQUFFLEVBQUUsY0FBYyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUM7UUFDaEQsTUFBTSxFQUFFLGNBQWMsS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU07UUFDbEQsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1FBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxVQUFVO1FBQzNCLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjO0tBQ3RFLENBQUM7SUFFRixJQUFJLE9BQU8sQ0FBQyxNQUFNLElBQUksR0FBRyxFQUFFO1FBQ3pCLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUM5QjtJQUVELElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsWUFBWSxFQUFFO1FBQ2xDLE9BQU8sQ0FBQyxJQUFJLEdBQUcseUJBQVcsQ0FDeEIsR0FBRyxDQUFDLFlBQVksRUFFaEIscUJBQVksQ0FDVixFQUFDLEdBQUcsRUFBQyxFQUNMLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1lBQzFCLENBQUMsQ0FBQztnQkFDRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQUk7YUFDcEI7WUFDSCxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FDeEIsQ0FDRixDQUFDO0tBQ0g7SUFFRCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBdENELDBDQXNDQztBQUVELFNBQWdCLFdBQVcsQ0FDekIsRUFBcUQ7SUFFckQsT0FBTyxVQUFVLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTztRQUNqQyxHQUFHLEdBQUcsUUFBUSxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFjLENBQUM7UUFFaEQsR0FBRyxDQUFDLGNBQWMsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO1FBRTdELElBQUksR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDLGdCQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLEtBQUssV0FBVyxDQUFDLEVBQUU7WUFDbkUsR0FBRyxDQUFDLElBQUksR0FBRyx3QkFBZSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3JEO2FBQU0sSUFDTCxHQUFHLENBQUMsSUFBSTtZQUNSLE9BQU8sR0FBRyxDQUFDLElBQUksS0FBSyxRQUFRO1lBQzVCLEdBQUcsQ0FBQyxRQUFRLEtBQUssTUFBTSxFQUN2QjtZQUNBLEdBQUcsQ0FBQyxJQUFJLEdBQUcsb0JBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxTQUFTLENBQVEsQ0FBQztZQUN2RCxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsbUNBQW1DLENBQUM7U0FDbkU7YUFBTSxJQUNMLEdBQUcsQ0FBQyxJQUFJO1lBQ1IsT0FBTyxHQUFHLENBQUMsSUFBSSxLQUFLLFFBQVE7WUFDNUIsR0FBRyxDQUFDLFFBQVEsS0FBSyxNQUFNLEVBQ3ZCO1lBQ0EsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQVEsQ0FBQztZQUMzQyxHQUFHLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxDQUFDO1lBQ2hELEdBQUcsQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7U0FDbEQ7UUFFRCxJQUFJLE9BQU8sR0FBRyxDQUFDLEtBQUssS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLEtBQUssR0FBRyxDQUFDLEVBQUU7WUFDbEQsTUFBTSxRQUFRLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2xDLE9BQU8sV0FBVyxDQUNoQixRQUFRO2dCQUNOLENBQUMsQ0FBRSxRQUEyQixDQUFDLGFBQWE7Z0JBQzVDLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUM3QixHQUFHLENBQ0osQ0FBQztTQUNIO1FBQ0QsT0FBTyxXQUFXLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ25DLENBQUMsQ0FBQztBQUNKLENBQUM7QUF2Q0Qsa0NBdUNDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLE9BQStCLEVBQUUsR0FBYztJQUN6RSxNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQzVCLE9BQU8sT0FBTztRQUNaLENBQUMsQ0FBQyxPQUFPO2FBQ0osSUFBSSxDQUFDLEtBQUssRUFBQyxRQUFRLEVBQUMsRUFBRTtZQUNyQixJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUUsUUFBZ0IsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTVELElBQUksTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLElBQUksRUFBRTtnQkFDaEIsTUFBTSxHQUFHLE1BQU0sTUFBTSxDQUFDO2FBQ3ZCO1lBRUQsdUNBQ0ssUUFBUSxLQUNYLElBQUksRUFBRSxNQUFNLElBQ1o7UUFDSixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ3JELENBQUM7QUFsQkQsa0NBa0JDO0FBRUQsU0FBZ0IsYUFBYSxDQUMzQixPQUF3QixFQUN4QixPQUF3QixFQUN4QixRQUFhLEVBQ2IsUUFBYTtJQUViLE1BQU0sR0FBRyxHQUNQLENBQUMsT0FBTyxJQUFLLE9BQXFCLENBQUMsR0FBRyxDQUFDLElBQUssT0FBa0IsQ0FBQztJQUVqRSxJQUFJLE9BQU8sSUFBSyxPQUFxQixDQUFDLFdBQVcsS0FBSyxLQUFLLEVBQUU7UUFDM0QsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUVELElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkQsT0FBTyxHQUFHLFFBQVEsQ0FBQyxPQUFjLEVBQUUsUUFBa0IsRUFBRSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1FBQzNFLE9BQU8sR0FBRyxRQUFRLENBQUMsT0FBYyxFQUFFLFFBQWtCLEVBQUUsRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztRQUUzRSxPQUFPLENBQUMsQ0FBQyxDQUNQLE9BQU8sQ0FBQyxHQUFHLEtBQUssT0FBTyxDQUFDLEdBQUc7WUFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUM7WUFDdkIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksb0JBQWMsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQzlELENBQUM7S0FDSDtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQXpCRCxzQ0F5QkM7QUFFRCxTQUFnQixVQUFVLENBQUMsR0FBVztJQUNwQyxPQUFPLENBQ0wsR0FBRztRQUNILCtEQUErRCxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FDMUUsQ0FBQztBQUNKLENBQUM7QUFMRCxnQ0FLQztBQUVELFNBQWdCLGNBQWMsQ0FDNUIsR0FBUyxFQUNULElBQVUsRUFDVixTQUFtQixFQUNuQixXQUFvQjtJQUVwQixJQUFJLENBQUMsR0FBRyxFQUFFO1FBQ1IsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELElBQUksU0FBUyxLQUFLLEtBQUssRUFBRTtRQUN2QixPQUFPLEtBQUssQ0FBQztLQUNkO0lBQ0QsSUFBSSxXQUFXLElBQUksSUFBSSxJQUFJLENBQUMsb0JBQWMsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLEVBQUU7UUFDN0QsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLEVBQUU7UUFDekMsT0FBTyxJQUFJLENBQUM7S0FDYjtTQUFNLElBQUksaUJBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSyxHQUFpQixDQUFDLEdBQUcsRUFBRTtRQUNsRCxJQUNHLEdBQWlCLENBQUMsTUFBTTtZQUN6QixJQUFJO1lBQ0osQ0FBQyxvQkFBYyxDQUFFLEdBQWlCLENBQUMsTUFBZ0IsRUFBRSxJQUFJLENBQUMsRUFDMUQ7WUFDQSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQTVCRCx3Q0E0QkM7QUFFRCxTQUFnQixTQUFTLENBQ3ZCLElBQWdDLEVBQ2hDLElBQWdDO0lBRWhDLE9BQU8sQ0FDTCxJQUFJLENBQUMsTUFBTSxLQUFLLElBQUksQ0FBQyxNQUFNO1FBQzNCLElBQUksQ0FBQyxHQUFHLEtBQUssSUFBSSxDQUFDLEdBQUc7UUFDckIsQ0FBQyxnQ0FBdUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQ3RELENBQUM7QUFDSixDQUFDO0FBVEQsOEJBU0M7QUFFRCxTQUFnQixXQUFXLENBQUMsR0FBYztJQUN4QyxZQUFZO0lBQ1osTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQ3ZCLElBQUksTUFBa0MsQ0FBQztJQUV2QyxLQUFLLElBQUksR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxHQUFHLEdBQUcsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFO1FBQzFELE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoQyxJQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsV0FBVyxHQUFJLFFBQVEsQ0FBQyxLQUFnQixFQUFFO1lBQzNELFNBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3pCLEdBQUcsRUFBRSxDQUFDO1lBQ04sR0FBRyxFQUFFLENBQUM7WUFDTixTQUFTO1NBQ1Y7UUFFRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLEVBQUUsUUFBUSxDQUFDLEVBQUU7WUFDNUIsTUFBTSxHQUFHLFFBQVEsQ0FBQztZQUNsQixNQUFNO1NBQ1A7S0FDRjtJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUF0QkQsa0NBc0JDO0FBRUQsU0FBZ0IsV0FBVyxDQUN6QixHQUFjLEVBQ2QsT0FBcUI7SUFFckIsU0FBUyxDQUFDLElBQUksaUNBQ1QsR0FBRyxLQUNOLGFBQWEsRUFBRSxPQUFPLEVBQ3RCLFdBQVcsRUFBRSxJQUFJLENBQUMsR0FBRyxFQUFFLElBQ3ZCLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBVkQsa0NBVUM7QUFFRCxTQUFnQixhQUFhO0lBQzNCLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUN4QyxDQUFDO0FBRkQsc0NBRUM7QUFFRCxnQ0FBZ0MifQ==

});
