amis.define('src/utils/filter-schema.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  /**
   * 处理 Props 数据，所有带 On 结束的做一次
   *
   * xxxOn
   * xxxExpr
   *
   *
   * @param schema
   * @param data
   */
  function getExprProperties(schema, data = {}, blackList = ['addOn'], props) {
      const exprProps = {};
      let ctx = null;
      Object.getOwnPropertyNames(schema).forEach(key => {
          if (blackList && ~blackList.indexOf(key)) {
              return;
          }
          let parts = /^(.*)(On|Expr|(?:c|C)lassName)(Raw)?$/.exec(key);
          let value = schema[key];
          if (value &&
              typeof value === 'string' && (parts === null || parts === void 0 ? void 0 : parts[1]) &&
              (parts[2] === 'On' || parts[2] === 'Expr')) {
              key = parts[1];
              if (parts[2] === 'On' || parts[2] === 'Expr') {
                  if (!ctx &&
                      props &&
                      typeof value === 'string' &&
                      ~value.indexOf('__props')) {
                      ctx = helper_1.injectPropsToObject(data, {
                          __props: props
                      });
                  }
                  value =
                      parts[2] === 'On'
                          ? tpl_1.evalExpression(value, ctx || data)
                          : tpl_1.filter(value, ctx || data);
              }
              exprProps[key] = value;
          }
          else if (value &&
              isPlainObject_1.default(value) &&
              ((parts === null || parts === void 0 ? void 0 : parts[2]) === 'className' || (parts === null || parts === void 0 ? void 0 : parts[2]) === 'ClassName')) {
              key = parts[1] + parts[2];
              exprProps[`${key}Raw`] = value;
              exprProps[key] = classnames_1.default(helper_1.mapObject(value, (value) => typeof value === 'string' ? tpl_1.evalExpression(value, data) : value));
          }
      });
      return exprProps;
  }
  exports.default = getExprProperties;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsdGVyLXNjaGVtYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy91dGlscy9maWx0ZXItc2NoZW1hLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtCQUE2QztBQUc3QyxxQ0FBd0Q7QUFDeEQsaUZBQWlEO0FBQ2pELG9FQUE0QjtBQUU1Qjs7Ozs7Ozs7O0dBU0c7QUFDSCxTQUF3QixpQkFBaUIsQ0FDdkMsTUFBbUIsRUFDbkIsT0FBZSxFQUFFLEVBQ2pCLFlBQTJCLENBQUMsT0FBTyxDQUFDLEVBQ3BDLEtBQVc7SUFFWCxNQUFNLFNBQVMsR0FBZ0IsRUFBRSxDQUFDO0lBQ2xDLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQztJQUVwQixNQUFNLENBQUMsbUJBQW1CLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQy9DLElBQUksU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN4QyxPQUFPO1NBQ1I7UUFFRCxJQUFJLEtBQUssR0FBRyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUQsSUFBSSxLQUFLLEdBQVEsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRTdCLElBQ0UsS0FBSztZQUNMLE9BQU8sS0FBSyxLQUFLLFFBQVEsS0FDekIsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsRUFBQztZQUNWLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxDQUFDLEVBQzFDO1lBQ0EsR0FBRyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVmLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssTUFBTSxFQUFFO2dCQUM1QyxJQUNFLENBQUMsR0FBRztvQkFDSixLQUFLO29CQUNMLE9BQU8sS0FBSyxLQUFLLFFBQVE7b0JBQ3pCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFDekI7b0JBQ0EsR0FBRyxHQUFHLDRCQUFtQixDQUFDLElBQUksRUFBRTt3QkFDOUIsT0FBTyxFQUFFLEtBQUs7cUJBQ2YsQ0FBQyxDQUFDO2lCQUNKO2dCQUVELEtBQUs7b0JBQ0gsS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQUk7d0JBQ2YsQ0FBQyxDQUFDLG9CQUFjLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxZQUFNLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQzthQUNsQztZQUVELFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDeEI7YUFBTSxJQUNMLEtBQUs7WUFDTCx1QkFBYSxDQUFDLEtBQUssQ0FBQztZQUNwQixDQUFDLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFHLENBQUMsT0FBTSxXQUFXLElBQUksQ0FBQSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUcsQ0FBQyxPQUFNLFdBQVcsQ0FBQyxFQUMxRDtZQUNBLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzFCLFNBQVMsQ0FBQyxHQUFHLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQy9CLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxvQkFBRSxDQUNqQixrQkFBUyxDQUFDLEtBQUssRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQzlCLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsb0JBQWMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDaEUsQ0FDRixDQUFDO1NBQ0g7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sU0FBUyxDQUFDO0FBQ25CLENBQUM7QUE1REQsb0NBNERDIn0=

});
