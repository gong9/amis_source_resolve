amis.define('src/utils/tpl.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.evalJS = exports.setCustomEvalJs = exports.evalExpression = exports.setCustomEvalExpression = exports.filter = exports.registerTplEnginer = void 0;
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const tpl_lodash_1 = require("src/utils/tpl-lodash.ts");
  const enginers = {};
  function registerTplEnginer(name, enginer) {
      enginers[name] = enginer;
  }
  exports.registerTplEnginer = registerTplEnginer;
  function filter(tpl, data = {}, ...rest) {
      if (!tpl || typeof tpl !== 'string') {
          return '';
      }
      let keys = Object.keys(enginers);
      for (let i = 0, len = keys.length; i < len; i++) {
          let enginer = enginers[keys[i]];
          if (enginer.test(tpl)) {
              return enginer.compile(tpl, data, ...rest);
          }
      }
      return tpl;
  }
  exports.filter = filter;
  // 缓存一下提升性能
  const EVAL_CACHE = {};
  let customEvalExpressionFn;
  function setCustomEvalExpression(fn) {
      customEvalExpressionFn = fn;
  }
  exports.setCustomEvalExpression = setCustomEvalExpression;
  // 几乎所有的 visibleOn requiredOn 都是通过这个方法判断出来结果，很粗暴也存在风险，建议自己实现。
  // 如果想自己实现，请通过 setCustomEvalExpression 来替换。
  function evalExpression(expression, data) {
      if (typeof customEvalExpressionFn === 'function') {
          return customEvalExpressionFn(expression, data);
      }
      if (!expression || typeof expression !== 'string') {
          return false;
      }
      /* jshint evil:true */
      try {
          let debug = false;
          const idx = expression.indexOf('debugger');
          if (~idx) {
              debug = true;
              expression = expression.replace(/debugger;?/, '');
          }
          let fn;
          if (expression in EVAL_CACHE) {
              fn = EVAL_CACHE[expression];
          }
          else {
              fn = new Function('data', 'utils', `with(data) {${debug ? 'debugger;' : ''}return !!(${expression});}`);
              EVAL_CACHE[expression] = fn;
          }
          data = data || {};
          return fn.call(data, data, tpl_builtin_1.getFilters());
      }
      catch (e) {
          console.warn(expression, e);
          return false;
      }
  }
  exports.evalExpression = evalExpression;
  let customEvalJsFn;
  function setCustomEvalJs(fn) {
      customEvalJsFn = fn;
  }
  exports.setCustomEvalJs = setCustomEvalJs;
  // 这个主要用在 formula 里面，用来动态的改变某个值。也很粗暴，建议自己实现。
  // 如果想自己实现，请通过 setCustomEvalJs 来替换。
  function evalJS(js, data) {
      if (typeof customEvalJsFn === 'function') {
          return customEvalJsFn(js, data);
      }
      /* jshint evil:true */
      try {
          const fn = new Function('data', 'utils', `with(data) {${/^\s*return\b/.test(js) ? '' : 'return '}${js};}`);
          data = data || {};
          return fn.call(data, data, tpl_builtin_1.getFilters());
      }
      catch (e) {
          console.warn(js, e);
          return null;
      }
  }
  exports.evalJS = evalJS;
  [tpl_builtin_1.register, tpl_lodash_1.register].forEach(fn => {
      const info = fn();
      registerTplEnginer(info.name, {
          test: info.test,
          compile: info.compile
      });
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL3RwbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQ0FBc0U7QUFDdEUsNkNBQXdEO0FBT3hELE1BQU0sUUFBUSxHQUVWLEVBQUUsQ0FBQztBQUVQLFNBQWdCLGtCQUFrQixDQUFDLElBQVksRUFBRSxPQUFnQjtJQUMvRCxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDO0FBQzNCLENBQUM7QUFGRCxnREFFQztBQUVELFNBQWdCLE1BQU0sQ0FDcEIsR0FBWSxFQUNaLE9BQWUsRUFBRSxFQUNqQixHQUFHLElBQWdCO0lBRW5CLElBQUksQ0FBQyxHQUFHLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxFQUFFO1FBQ25DLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFFRCxJQUFJLElBQUksR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2pDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDL0MsSUFBSSxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNyQixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQzVDO0tBQ0Y7SUFFRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFsQkQsd0JBa0JDO0FBRUQsV0FBVztBQUNYLE1BQU0sVUFBVSxHQUE4QixFQUFFLENBQUM7QUFFakQsSUFBSSxzQkFBbUUsQ0FBQztBQUN4RSxT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

});
