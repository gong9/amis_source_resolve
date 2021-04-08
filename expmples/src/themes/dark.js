amis.define('src/themes/dark.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.classnames = exports.classPrefix = void 0;
  const theme_1 = require("src/theme.tsx");
  exports.classPrefix = 'dark-';
  exports.classnames = theme_1.makeClassnames(exports.classPrefix);
  theme_1.theme('dark', {
      classPrefix: exports.classPrefix,
      classnames: exports.classnames,
      renderers: {
          'json': {
              jsonTheme: 'eighties'
          },
          'editor-control': {
              editorTheme: 'vs-dark'
          }
      }
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFyay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy90aGVtZXMvZGFyay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBNkQ7QUFDaEQsUUFBQSxXQUFXLEdBQVcsT0FBTyxDQUFDO0FBQzlCLFFBQUEsVUFBVSxHQUFpQixzQkFBYyxDQUFDLG1CQUFXLENBQUMsQ0FBQztBQUVwRSxhQUFLLENBQUMsTUFBTSxFQUFFO0lBQ1osV0FBVyxFQUFYLG1CQUFXO0lBQ1gsVUFBVSxFQUFWLGtCQUFVO0lBQ1YsU0FBUyxFQUFFO1FBQ1QsTUFBTSxFQUFFO1lBQ04sU0FBUyxFQUFFLFVBQVU7U0FDdEI7UUFDRCxnQkFBZ0IsRUFBRTtZQUNoQixXQUFXLEVBQUUsU0FBUztTQUN2QjtLQUNGO0NBQ0YsQ0FBQyxDQUFDIn0=

});
