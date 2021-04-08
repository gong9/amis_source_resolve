amis.define('examples/loadMonacoEditor.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.__mod__async__load = void 0;
  // 这是个特殊的方法，请看考 mod.js 里面的实现。
  function __mod__async__load(callback) {
      // @ts-ignore
      const monacoLoader = '/node_modules/monaco-editor/min/vs/loader.js';
      // @ts-ignore
      const script = amis.require.loadJs(filterUrl(monacoLoader));
      script.onload = () => onLoad(window.require, callback);
  }
  exports.__mod__async__load = __mod__async__load;
  function __uri(url) {
      return url;
  }
  // 用于发布 sdk 版本的时候替换，因为不确定 sdk 版本怎么部署，而 worker 地址路径不可知。
  // 所以会被 fis3 替换成取相对的代码。
  function filterUrl(url) {
      return url;
  }
  function onLoad(req, callback) {
      const config = {
          'vs/nls': {
              availableLanguages: {
                  '*': 'zh-cn'
              }
          },
          'paths': {
              'vs': '/node_modules/monaco-editor/min/vs/editor/editor.main.js'.replace(/\/vs\/.*$/, ''),
              'vs/base/worker/workerMain': '/node_modules/monaco-editor/min/vs/base/worker/workerMain.js',
              'vs/basic-languages/apex/apex': '/node_modules/monaco-editor/min/vs/basic-languages/apex/apex.js',
              'vs/basic-languages/azcli/azcli': '/node_modules/monaco-editor/min/vs/basic-languages/azcli/azcli.js',
              'vs/basic-languages/clojure/clojure': '/node_modules/monaco-editor/min/vs/basic-languages/clojure/clojure.js',
              'vs/basic-languages/bat/bat': '/node_modules/monaco-editor/min/vs/basic-languages/bat/bat.js',
              'vs/basic-languages/coffee/coffee': '/node_modules/monaco-editor/min/vs/basic-languages/coffee/coffee.js',
              'vs/basic-languages/cpp/cpp': '/node_modules/monaco-editor/min/vs/basic-languages/cpp/cpp.js',
              'vs/basic-languages/csharp/csharp': '/node_modules/monaco-editor/min/vs/basic-languages/csharp/csharp.js',
              'vs/basic-languages/css/css': '/node_modules/monaco-editor/min/vs/basic-languages/css/css.js',
              'vs/basic-languages/dockerfile/dockerfile': '/node_modules/monaco-editor/min/vs/basic-languages/dockerfile/dockerfile.js',
              'vs/basic-languages/fsharp/fsharp': '/node_modules/monaco-editor/min/vs/basic-languages/fsharp/fsharp.js',
              'vs/basic-languages/go/go': '/node_modules/monaco-editor/min/vs/basic-languages/go/go.js',
              'vs/basic-languages/handlebars/handlebars': '/node_modules/monaco-editor/min/vs/basic-languages/handlebars/handlebars.js',
              'vs/basic-languages/html/html': '/node_modules/monaco-editor/min/vs/basic-languages/html/html.js',
              'vs/basic-languages/ini/ini': '/node_modules/monaco-editor/min/vs/basic-languages/ini/ini.js',
              'vs/basic-languages/java/java': '/node_modules/monaco-editor/min/vs/basic-languages/java/java.js',
              'vs/basic-languages/javascript/javascript': '/node_modules/monaco-editor/min/vs/basic-languages/javascript/javascript.js',
              'vs/basic-languages/less/less': '/node_modules/monaco-editor/min/vs/basic-languages/less/less.js',
              'vs/basic-languages/lua/lua': '/node_modules/monaco-editor/min/vs/basic-languages/lua/lua.js',
              'vs/basic-languages/markdown/markdown': '/node_modules/monaco-editor/min/vs/basic-languages/markdown/markdown.js',
              'vs/basic-languages/msdax/msdax': '/node_modules/monaco-editor/min/vs/basic-languages/msdax/msdax.js',
              'vs/basic-languages/objective-c/objective-c': '/node_modules/monaco-editor/min/vs/basic-languages/objective-c/objective-c.js',
              'vs/basic-languages/php/php': '/node_modules/monaco-editor/min/vs/basic-languages/php/php.js',
              'vs/basic-languages/postiats/postiats': '/node_modules/monaco-editor/min/vs/basic-languages/postiats/postiats.js',
              'vs/basic-languages/powershell/powershell': '/node_modules/monaco-editor/min/vs/basic-languages/powershell/powershell.js',
              'vs/basic-languages/pug/pug': '/node_modules/monaco-editor/min/vs/basic-languages/pug/pug.js',
              'vs/basic-languages/python/python': '/node_modules/monaco-editor/min/vs/basic-languages/python/python.js',
              'vs/basic-languages/r/r': '/node_modules/monaco-editor/min/vs/basic-languages/r/r.js',
              'vs/basic-languages/razor/razor': '/node_modules/monaco-editor/min/vs/basic-languages/razor/razor.js',
              'vs/basic-languages/redis/redis': '/node_modules/monaco-editor/min/vs/basic-languages/redis/redis.js',
              'vs/basic-languages/redshift/redshift': '/node_modules/monaco-editor/min/vs/basic-languages/redshift/redshift.js',
              'vs/basic-languages/ruby/ruby': '/node_modules/monaco-editor/min/vs/basic-languages/ruby/ruby.js',
              'vs/basic-languages/rust/rust': '/node_modules/monaco-editor/min/vs/basic-languages/rust/rust.js',
              'vs/basic-languages/sb/sb': '/node_modules/monaco-editor/min/vs/basic-languages/sb/sb.js',
              'vs/basic-languages/scheme/scheme': '/node_modules/monaco-editor/min/vs/basic-languages/scheme/scheme.js',
              'vs/basic-languages/scss/scss': '/node_modules/monaco-editor/min/vs/basic-languages/scss/scss.js',
              'vs/basic-languages/shell/shell': '/node_modules/monaco-editor/min/vs/basic-languages/shell/shell.js',
              'vs/basic-languages/solidity/solidity': '/node_modules/monaco-editor/min/vs/basic-languages/solidity/solidity.js',
              'vs/basic-languages/sql/sql': '/node_modules/monaco-editor/min/vs/basic-languages/sql/sql.js',
              'vs/basic-languages/st/st': '/node_modules/monaco-editor/min/vs/basic-languages/st/st.js',
              'vs/basic-languages/swift/swift': '/node_modules/monaco-editor/min/vs/basic-languages/swift/swift.js',
              'vs/basic-languages/typescript/typescript': '/node_modules/monaco-editor/min/vs/basic-languages/typescript/typescript.js',
              'vs/basic-languages/vb/vb': '/node_modules/monaco-editor/min/vs/basic-languages/vb/vb.js',
              'vs/basic-languages/xml/xml': '/node_modules/monaco-editor/min/vs/basic-languages/xml/xml.js',
              'vs/basic-languages/yaml/yaml': '/node_modules/monaco-editor/min/vs/basic-languages/yaml/yaml.js',
              'vs/editor/editor.main': '/node_modules/monaco-editor/min/vs/editor/editor.main.js',
              'vs/editor/editor.main.css': '/node_modules/monaco-editor/min/vs/editor/editor.main.css',
              'vs/editor/editor.main.nls': '/node_modules/monaco-editor/min/vs/editor/editor.main.nls.js',
              'vs/editor/editor.main.nls.zh-cn': '/node_modules/monaco-editor/min/vs/editor/editor.main.nls.zh-cn.js',
              // 'vs/editor/contrib/suggest/media/String_16x.svg': __uri('monaco-editor/min/vs/editor/contrib/suggest/media/String_16x.svg'),
              // 'vs/editor/contrib/suggest/media/String_inverse_16x.svg': __uri('monaco-editor/min/vs/editor/contrib/suggest/media/String_inverse_16x.svg'),
              // 'vs/editor/standalone/browser/quickOpen/symbol-sprite.svg': __uri('monaco-editor/min/vs/editor/standalone/browser/quickOpen/symbol-sprite.svg'),
              'vs/base/browser/ui/codicons/codicon/codicon.ttf': '/node_modules/monaco-editor/min/vs/base/browser/ui/codicons/codicon/codicon.ttf',
              'vs/language/typescript/tsMode': '/node_modules/monaco-editor/min/vs/language/typescript/tsMode.js',
              // 'vs/language/typescript/lib/typescriptServices': __uri('monaco-editor/min/vs/language/typescript/lib/typescriptServices.js'),
              'vs/language/typescript/tsWorker': '/node_modules/monaco-editor/min/vs/language/typescript/tsWorker.js',
              'vs/language/json/jsonMode': '/node_modules/monaco-editor/min/vs/language/json/jsonMode.js',
              'vs/language/json/jsonWorker': '/node_modules/monaco-editor/min/vs/language/json/jsonWorker.js',
              'vs/language/html/htmlMode': '/node_modules/monaco-editor/min/vs/language/html/htmlMode.js',
              'vs/language/html/htmlWorker': '/node_modules/monaco-editor/min/vs/language/html/htmlWorker.js',
              'vs/language/css/cssMode': '/node_modules/monaco-editor/min/vs/language/css/cssMode.js',
              'vs/language/css/cssWorker': '/node_modules/monaco-editor/min/vs/language/css/cssWorker.js'
          }
      };
      Object.keys(config.paths).forEach((key) => {
          config.paths[key] = filterUrl(config.paths[key].replace(/\.js$/, ''));
      });
      req.config(config);
      if (/^(https?:)?\/\//.test(config.paths.vs)) {
          window.MonacoEnvironment = {
              getWorkerUrl: function () {
                  return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
                self.MonacoEnvironment = {
                    baseUrl: '${config.paths.vs}',
                    paths: ${JSON.stringify(config.paths)}
                };
                importScripts('${filterUrl(__uri('monaco-editor/min/vs/base/worker/workerMain.js'))}');`)}`;
              }
          };
      }
      else {
          delete window.MonacoEnvironment;
      }
      req(['vs/editor/editor.main'], function (ret) {
          callback(ret);
      });
  }
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZE1vbmFjb0VkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL2V4YW1wbGVzL2xvYWRNb25hY29FZGl0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkJBQTZCO0FBQzdCLFNBQWdCLGtCQUFrQixDQUFDLFFBQWdDO0lBQ2pFLGFBQWE7SUFDYixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztJQUU3RCxhQUFhO0lBQ2IsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDNUQsTUFBTSxDQUFDLE1BQU0sR0FBRyxHQUFHLEVBQUUsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQztBQUN6RCxDQUFDO0FBUEQsZ0RBT0M7QUFFRCxTQUFTLEtBQUssQ0FBQyxHQUFXO0lBQ3hCLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQUVELHNEQUFzRDtBQUN0RCx1QkFBdUI7QUFDdkIsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM1QixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFRCxTQUFTLE1BQU0sQ0FBQyxHQUFRLEVBQUUsUUFBK0I7SUFDdkQsTUFBTSxNQUFNLEdBQUc7UUFDYixRQUFRLEVBQUU7WUFDUixrQkFBa0IsRUFBRTtnQkFDbEIsR0FBRyxFQUFFLE9BQU87YUFDYjtTQUNGO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLEtBQUssQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDLE9BQU8sQ0FDL0QsV0FBVyxFQUNYLEVBQUUsQ0FDSDtZQUNELDJCQUEyQixFQUFFLEtBQUssQ0FDaEMsZ0RBQWdELENBQ2pEO1lBQ0QsOEJBQThCLEVBQUUsS0FBSyxDQUNuQyxnREFBZ0QsQ0FDakQ7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

});
