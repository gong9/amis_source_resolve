amis.define('src/themes/default.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.classnames = exports.classPrefix = void 0;
  const theme_1 = require("src/theme.tsx");
  exports.classPrefix = 'a-';
  exports.classnames = theme_1.makeClassnames(exports.classPrefix);
  theme_1.theme('default', {
      classPrefix: exports.classPrefix,
      classnames: exports.classnames
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy90aGVtZXMvZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxvQ0FBNkQ7QUFDaEQsUUFBQSxXQUFXLEdBQVcsSUFBSSxDQUFDO0FBQzNCLFFBQUEsVUFBVSxHQUFpQixzQkFBYyxDQUFDLG1CQUFXLENBQUMsQ0FBQztBQUVwRSxhQUFLLENBQUMsU0FBUyxFQUFFO0lBQ2YsV0FBVyxFQUFYLG1CQUFXO0lBQ1gsVUFBVSxFQUFWLGtCQUFVO0NBQ1gsQ0FBQyxDQUFDIn0=

});
