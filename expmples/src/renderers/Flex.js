amis.define('src/renderers/Flex.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 简化版 Flex 布局，主要用于不熟悉 CSS 的开发者
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FlexRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let Flex = /** @class */ (() => {
      class Flex extends react_1.default.Component {
          constructor(props) {
              super(props);
          }
          render() {
              const { items, direction, justify, alignItems, alignContent, style, render, className } = this.props;
              const flexStyle = Object.assign({ display: 'flex', flexDirection: direction, justifyContent: justify, alignItems,
                  alignContent }, style);
              return (react_1.default.createElement("div", { style: flexStyle, className: className }, items.map((item, key) => render(`flexItem/${key}`, item))));
          }
      }
      Flex.defaultProps = {
          direction: 'row',
          justify: 'center',
          alignItems: 'center',
          alignContent: 'center'
      };
      return Flex;
  })();
  exports.default = Flex;
  let FlexRenderer = /** @class */ (() => {
      let FlexRenderer = class FlexRenderer extends Flex {
      };
      FlexRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)flex$/,
              name: 'flex'
          })
      ], FlexRenderer);
      return FlexRenderer;
  })();
  exports.FlexRenderer = FlexRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmxleC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRmxleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOztHQUVHOzs7O0FBRUgsMERBQTBCO0FBQzFCLHdDQUFtRDtBQW9HbkQ7SUFBQSxNQUFxQixJQUFLLFNBQVEsZUFBSyxDQUFDLFNBQTRCO1FBUWxFLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2YsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxPQUFPLEVBQ1AsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLFNBQVMsRUFDVixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixNQUFNLFNBQVMsbUJBQ2IsT0FBTyxFQUFFLE1BQU0sRUFDZixhQUFhLEVBQUUsU0FBUyxFQUN4QixjQUFjLEVBQUUsT0FBTyxFQUN2QixVQUFVO2dCQUNWLFlBQVksSUFDVCxLQUFLLENBQ1QsQ0FBQztZQUVGLE9BQU8sQ0FDTCx1Q0FBSyxLQUFLLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLElBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUN0RCxDQUNQLENBQUM7UUFDSixDQUFDOztJQXJDTSxpQkFBWSxHQUF1QjtRQUN4QyxTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsUUFBUTtRQUNqQixVQUFVLEVBQUUsUUFBUTtRQUNwQixZQUFZLEVBQUUsUUFBUTtLQUN2QixDQUFDO0lBaUNKLFdBQUM7S0FBQTtrQkF2Q29CLElBQUk7QUE2Q3pCO0lBQUEsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLElBQUk7S0FBRyxDQUFBO0lBQTVCLFlBQVk7UUFKeEIsa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxhQUFhO1lBQ25CLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztPQUNXLFlBQVksQ0FBZ0I7SUFBRCxtQkFBQztLQUFBO0FBQTVCLG9DQUFZIn0=

});
