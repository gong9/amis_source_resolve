amis.define('src/renderers/Each.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EachRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  let Each = /** @class */ (() => {
      class Each extends react_1.default.Component {
          render() {
              const { data, name, className, render, value, items, placeholder, classnames: cx, translate: __ } = this.props;
              const arr = typeof value !== 'undefined'
                  ? helper_1.isObject(value)
                      ? Object.keys(value).map(key => ({
                          key: key,
                          value: value[key]
                      }))
                      : Array.isArray(value)
                          ? value
                          : []
                  : tpl_builtin_1.resolveVariable(name, data);
              return (react_1.default.createElement("div", { className: cx('Each', className) }, Array.isArray(arr) && items ? (arr.map((item, index) => render(`item/${index}`, items, {
                  data: helper_1.createObject(data, helper_1.isObject(item)
                      ? Object.assign({ index }, item) : { [name]: item, item: item, index }),
                  key: index
              }))) : (react_1.default.createElement("div", { className: cx('Each-placeholder') }, render('placeholder', __(placeholder))))));
          }
      }
      Each.propsList = ['name', 'items', 'value'];
      Each.defaultProps = {
          className: '',
          placeholder: '暂无内容'
      };
      return Each;
  })();
  exports.default = Each;
  let EachRenderer = /** @class */ (() => {
      let EachRenderer = class EachRenderer extends Each {
      };
      EachRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:repeat|each)$/,
              name: 'each'
          })
      ], EachRenderer);
      return EachRenderer;
  })();
  exports.EachRenderer = EachRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWFjaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRWFjaC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsc0RBQXFEO0FBQ3JELDRDQUF1RDtBQTRCdkQ7SUFBQSxNQUFxQixJQUFLLFNBQVEsZUFBSyxDQUFDLFNBQW9CO1FBTzFELE1BQU07WUFDSixNQUFNLEVBQ0osSUFBSSxFQUNKLElBQUksRUFDSixTQUFTLEVBQ1QsTUFBTSxFQUNOLEtBQUssRUFDTCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFVBQVUsRUFBRSxFQUFFLEVBQ2QsU0FBUyxFQUFFLEVBQUUsRUFDZCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixNQUFNLEdBQUcsR0FDUCxPQUFPLEtBQUssS0FBSyxXQUFXO2dCQUMxQixDQUFDLENBQUMsaUJBQVEsQ0FBQyxLQUFLLENBQUM7b0JBQ2YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDN0IsR0FBRyxFQUFFLEdBQUc7d0JBQ1IsS0FBSyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUM7cUJBQ2xCLENBQUMsQ0FBQztvQkFDTCxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7d0JBQ3RCLENBQUMsQ0FBQyxLQUFLO3dCQUNQLENBQUMsQ0FBQyxFQUFFO2dCQUNOLENBQUMsQ0FBQyw2QkFBZSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUVsQyxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQ2xDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUM3QixHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEtBQWEsRUFBRSxFQUFFLENBQ25DLE1BQU0sQ0FBQyxRQUFRLEtBQUssRUFBRSxFQUFFLEtBQUssRUFBRTtnQkFDN0IsSUFBSSxFQUFFLHFCQUFZLENBQ2hCLElBQUksRUFDSixpQkFBUSxDQUFDLElBQUksQ0FBQztvQkFDWixDQUFDLGlCQUFFLEtBQUssSUFBSyxJQUFJLEVBQ2pCLENBQUMsQ0FBQyxFQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFDLENBQ3RDO2dCQUNELEdBQUcsRUFBRSxLQUFLO2FBQ1gsQ0FBQyxDQUNILENBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FDRix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQ25DLE1BQU0sQ0FBQyxhQUFhLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQ25DLENBQ1AsQ0FDRyxDQUNQLENBQUM7UUFDSixDQUFDOztJQXBETSxjQUFTLEdBQWtCLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUN0RCxpQkFBWSxHQUFHO1FBQ3BCLFNBQVMsRUFBRSxFQUFFO1FBQ2IsV0FBVyxFQUFFLE1BQU07S0FDcEIsQ0FBQztJQWlESixXQUFDO0tBQUE7a0JBdERvQixJQUFJO0FBNER6QjtJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxJQUFJO0tBQUcsQ0FBQTtJQUE1QixZQUFZO1FBSnhCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsd0JBQXdCO1lBQzlCLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztPQUNXLFlBQVksQ0FBZ0I7SUFBRCxtQkFBQztLQUFBO0FBQTVCLG9DQUFZIn0=

});
