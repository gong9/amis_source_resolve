amis.define('src/renderers/HBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HBoxRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const helper_1 = require("src/utils/helper.ts");
  let HBox = /** @class */ (() => {
      class HBox extends react_1.default.Component {
          renderChild(region, node) {
              const { render } = this.props;
              return render(region, node);
          }
          renderColumn(column, key, length) {
              const { itemRender, data, classPrefix: ns } = this.props;
              if (!helper_1.isVisible(column, data)) {
                  return null;
              }
              let style = Object.assign({ width: column.width, height: column.height }, column.style);
              return (react_1.default.createElement("div", { key: key, className: classnames_1.default(`${ns}Hbox-col`, column.columnClassName), style: style }, itemRender
                  ? itemRender(column, key, length, this.props)
                  : this.renderChild(`column/${key}`, column)));
          }
          renderColumns() {
              const { columns } = this.props;
              return columns.map((column, key) => this.renderColumn(column, key, columns.length));
          }
          render() {
              const { className, classnames: cx } = this.props;
              return react_1.default.createElement("div", { className: cx(`Hbox`, className) }, this.renderColumns());
          }
      }
      HBox.propsList = ['columns'];
      HBox.defaultProps = {};
      return HBox;
  })();
  exports.default = HBox;
  let HBoxRenderer = /** @class */ (() => {
      let HBoxRenderer = class HBoxRenderer extends HBox {
      };
      HBoxRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)hbox$/,
              name: 'hbox'
          })
      ], HBoxRenderer);
      return HBoxRenderer;
  })();
  exports.HBoxRenderer = HBoxRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSEJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvSEJveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsb0VBQTRCO0FBQzVCLDRDQUEwQztBQW1EMUM7SUFBQSxNQUFxQixJQUFLLFNBQVEsZUFBSyxDQUFDLFNBQTRCO1FBS2xFLFdBQVcsQ0FBQyxNQUFjLEVBQUUsSUFBWTtZQUN0QyxNQUFNLEVBQUMsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU1QixPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFrQixFQUFFLEdBQVcsRUFBRSxNQUFjO1lBQzFELE1BQU0sRUFBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXZELElBQUksQ0FBQyxrQkFBUyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDNUIsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksS0FBSyxtQkFDUCxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFDbkIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQ2xCLE1BQU0sQ0FBQyxLQUFLLENBQ2hCLENBQUM7WUFFRixPQUFPLENBQ0wsdUNBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsb0JBQUUsQ0FBQyxHQUFHLEVBQUUsVUFBVSxFQUFHLE1BQXFCLENBQUMsZUFBZSxDQUFDLEVBQ3RFLEtBQUssRUFBRSxLQUFLLElBRVgsVUFBVTtnQkFDVCxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ3pDLENBQ1AsQ0FBQztRQUNKLENBQUM7UUFFRCxhQUFhO1lBQ1gsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFN0IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQy9DLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDL0MsT0FBTyx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQU8sQ0FBQztRQUM3RSxDQUFDOztJQS9DTSxjQUFTLEdBQWtCLENBQUMsU0FBUyxDQUFDLENBQUM7SUFFdkMsaUJBQVksR0FBdUIsRUFBRSxDQUFDO0lBOEMvQyxXQUFDO0tBQUE7a0JBakRvQixJQUFJO0FBdUR6QjtJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxJQUFJO0tBQUcsQ0FBQTtJQUE1QixZQUFZO1FBSnhCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUM7T0FDVyxZQUFZLENBQWdCO0lBQUQsbUJBQUM7S0FBQTtBQUE1QixvQ0FBWSJ9

});
