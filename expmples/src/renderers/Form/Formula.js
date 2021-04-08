amis.define('src/renderers/Form/Formula.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FormulaControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  class FormulaControl extends react_1.default.Component {
      componentDidMount() {
          const { formula, data, setPrinstineValue, initSet, condition } = this.props;
          if (!formula || initSet === false) {
              return;
          }
          else if (condition &&
              !~condition.indexOf('$') &&
              !~condition.indexOf('<%') &&
              !tpl_1.evalJS(condition, data)) {
              return;
          }
          const result = tpl_1.evalJS(formula, data);
          result !== null && setPrinstineValue(result);
      }
      componentWillReceiveProps(nextProps) {
          const { formula, data, onChange, autoSet, value, condition } = this.props;
          if (autoSet !== false &&
              formula &&
              nextProps.formula &&
              helper_1.isObjectShallowModified(data, nextProps.data, false) &&
              value === nextProps.value) {
              const nextResult = tpl_1.evalJS(nextProps.formula, nextProps.data);
              if (condition && nextProps.condition) {
                  if (!!~condition.indexOf('$') || !!~condition.indexOf('<%')) {
                      // 使用${xxx}，来监听某个变量的变化
                      if (tpl_1.filter(condition, data) !==
                          tpl_1.filter(nextProps.condition, nextProps.data)) {
                          onChange(nextResult);
                      }
                  }
                  else if (tpl_1.evalJS(nextProps.condition, nextProps.data)) {
                      // 使用 data.xxx == 'a' 表达式形式来判断
                      onChange(nextResult);
                  }
              }
              else {
                  const prevResult = tpl_1.evalJS(formula, data);
                  if (JSON.stringify(prevResult) !== JSON.stringify(nextResult)) {
                      onChange(nextResult || '');
                  }
              }
          }
      }
      doAction() {
          // 不细化具体是啥动作了，先重新计算，并把值运用上。
          const { formula, data, onChange, autoSet, value } = this.props;
          const result = tpl_1.evalJS(formula, data);
          onChange(result);
      }
      render() {
          return null;
      }
  }
  exports.default = FormulaControl;
  let FormulaControlRenderer = /** @class */ (() => {
      let FormulaControlRenderer = class FormulaControlRenderer extends FormulaControl {
      };
      FormulaControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'formula',
              wrap: false,
              strictMode: false,
              sizeMutable: false
          })
      ], FormulaControlRenderer);
      return FormulaControlRenderer;
  })();
  exports.FormulaControlRenderer = FormulaControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9Gb3JtdWxhLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUNuRSx5Q0FBK0M7QUFDL0MsK0NBQTJEO0FBa0QzRCxNQUFxQixjQUFlLFNBQVEsZUFBSyxDQUFDLFNBR2pEO0lBQ0MsaUJBQWlCO1FBQ2YsTUFBTSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsaUJBQWlCLEVBQUUsT0FBTyxFQUFFLFNBQVMsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFMUUsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQ2pDLE9BQU87U0FDUjthQUFNLElBQ0wsU0FBUztZQUNULENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztZQUN4QixDQUFDLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7WUFDekIsQ0FBQyxZQUFNLENBQUMsU0FBUyxFQUFFLElBQWMsQ0FBQyxFQUNsQztZQUNBLE9BQU87U0FDUjtRQUVELE1BQU0sTUFBTSxHQUFRLFlBQU0sQ0FBQyxPQUFPLEVBQUUsSUFBYyxDQUFDLENBQUM7UUFDcEQsTUFBTSxLQUFLLElBQUksSUFBSSxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQseUJBQXlCLENBQUMsU0FBMkI7UUFDbkQsTUFBTSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV4RSxJQUNFLE9BQU8sS0FBSyxLQUFLO1lBQ2pCLE9BQU87WUFDUCxTQUFTLENBQUMsT0FBTztZQUNqQixnQ0FBdUIsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUM7WUFDcEQsS0FBSyxLQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQ3pCO1lBQ0EsTUFBTSxVQUFVLEdBQVEsWUFBTSxDQUM1QixTQUFTLENBQUMsT0FBTyxFQUNqQixTQUFTLENBQUMsSUFBYyxDQUN6QixDQUFDO1lBRUYsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzNELHNCQUFzQjtvQkFDdEIsSUFDRSxZQUFNLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQzt3QkFDdkIsWUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUMzQzt3QkFDQSxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7cUJBQ3RCO2lCQUNGO3FCQUFNLElBQUksWUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQWMsQ0FBQyxFQUFFO29CQUNoRSw4QkFBOEI7b0JBQzlCLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDdEI7YUFDRjtpQkFBTTtnQkFDTCxNQUFNLFVBQVUsR0FBUSxZQUFNLENBQUMsT0FBTyxFQUFFLElBQWMsQ0FBQyxDQUFDO2dCQUN4RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEtBQUssSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsRUFBRTtvQkFDN0QsUUFBUSxDQUFDLFVBQVUsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDNUI7YUFDRjtTQUNGO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTiwyQkFBMkI7UUFFM0IsTUFBTSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTdELE1BQU0sTUFBTSxHQUFRLFlBQU0sQ0FBQyxPQUFPLEVBQUUsSUFBYyxDQUFDLENBQUM7UUFDcEQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ25CLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUF2RUQsaUNBdUVDO0FBUUQ7SUFBQSxJQUFhLHNCQUFzQixHQUFuQyxNQUFhLHNCQUF1QixTQUFRLGNBQWM7S0FBRyxDQUFBO0lBQWhELHNCQUFzQjtRQU5sQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsU0FBUztZQUNmLElBQUksRUFBRSxLQUFLO1lBQ1gsVUFBVSxFQUFFLEtBQUs7WUFDakIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztPQUNXLHNCQUFzQixDQUEwQjtJQUFELDZCQUFDO0tBQUE7QUFBaEQsd0RBQXNCIn0=

});
