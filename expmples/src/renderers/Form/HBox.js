amis.define('src/renderers/Form/HBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HBoxRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const helper_1 = require("src/utils/helper.ts");
  let HBoxRenderer = /** @class */ (() => {
      let HBoxRenderer = class HBoxRenderer extends react_1.default.Component {
          renderColumn(column, key, length) {
              const { itemRender, data, classPrefix: ns } = this.props;
              if (!helper_1.isVisible(column, data)) {
                  return null;
              }
              let style = Object.assign({ width: column.width, height: column.height }, column.style);
              return (react_1.default.createElement("div", { key: key, style: style, className: classnames_1.default(`${ns}Hbox-col`, `${ns}Form--${column.mode || 'normal'}`, column.columnClassName) }, itemRender
                  ? itemRender(column, key, length, this.props)
                  : this.renderChild(`column/${key}`, column, key)));
          }
          renderChild(region, node, index) {
              const { render, renderFormItems, formMode, store, $path } = this.props;
              if (node && !node.type && (node.controls || node.tabs || node.feildSet)) {
                  return renderFormItems(node, $path.replace(/^.*form\//, ''), {
                      mode: node.mode || 'normal',
                      horizontal: node.horizontal || {
                          left: 4,
                          right: 8,
                          offset: 4
                      },
                      store,
                      data: store.data,
                      render
                  });
              }
              return render(region, node.body || node);
          }
          renderColumns() {
              const { columns } = this.props;
              return columns.map((column, key) => this.renderColumn(column, key, columns.length));
          }
          render() {
              const { className, columns, gap, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}FormHbox`, gap ? `${ns}Hbox--${gap}` : '', className) },
                  react_1.default.createElement("div", { className: `${ns}Hbox` }, this.renderColumns())));
          }
      };
      HBoxRenderer.propsList = ['columns', 'onChange'];
      HBoxRenderer.defaultProps = {};
      HBoxRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'hbox',
              strictMode: false,
              sizeMutable: false
          })
      ], HBoxRenderer);
      return HBoxRenderer;
  })();
  exports.HBoxRenderer = HBoxRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSEJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9IQm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLGlDQUtnQjtBQUdoQixvRUFBNEI7QUFDNUIsK0NBQTZDO0FBOEM3QztJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBeUI7UUFJL0QsWUFBWSxDQUFDLE1BQVcsRUFBRSxHQUFXLEVBQUUsTUFBYztZQUNuRCxNQUFNLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV2RCxJQUFJLENBQUMsa0JBQVMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxJQUFJLEtBQUssbUJBQ1AsS0FBSyxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQ25CLE1BQU0sRUFBRSxNQUFNLENBQUMsTUFBTSxJQUNsQixNQUFNLENBQUMsS0FBSyxDQUNoQixDQUFDO1lBRUYsT0FBTyxDQUNMLHVDQUNFLEdBQUcsRUFBRSxHQUFHLEVBQ1IsS0FBSyxFQUFFLEtBQUssRUFDWixTQUFTLEVBQUUsb0JBQUUsQ0FDWCxHQUFHLEVBQUUsVUFBVSxFQUNmLEdBQUcsRUFBRSxTQUFTLE1BQU0sQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFLEVBQ3ZDLE1BQU0sQ0FBQyxlQUFlLENBQ3ZCLElBRUEsVUFBVTtnQkFDVCxDQUFDLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFVBQVUsR0FBRyxFQUFFLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUM5QyxDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsV0FBVyxDQUFDLE1BQWMsRUFBRSxJQUFZLEVBQUUsS0FBYTtZQUNyRCxNQUFNLEVBQUMsTUFBTSxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFckUsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDdkUsT0FBTyxlQUFlLENBQ3BCLElBQVcsRUFDVixLQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQzFDO29CQUNFLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVE7b0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxJQUFJO3dCQUM3QixJQUFJLEVBQUUsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixNQUFNLEVBQUUsQ0FBQztxQkFDVjtvQkFDRCxLQUFLO29CQUNMLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSTtvQkFDaEIsTUFBTTtpQkFDUCxDQUNGLENBQUM7YUFDSDtZQUVELE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDO1FBQzNDLENBQUM7UUFFRCxhQUFhO1lBQ1gsTUFBTSxFQUFDLE9BQU8sRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFN0IsT0FBTyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsTUFBTSxDQUFDLENBQy9DLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFBQyxTQUFTLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU5RCxPQUFPLENBQ0wsdUNBQ0UsU0FBUyxFQUFFLG9CQUFFLENBQ1gsR0FBRyxFQUFFLFVBQVUsRUFDZixHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQzlCLFNBQVMsQ0FDVjtnQkFFRCx1Q0FBSyxTQUFTLEVBQUUsR0FBRyxFQUFFLE1BQU0sSUFBRyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQU8sQ0FDckQsQ0FDUCxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUE7SUFoRlEsc0JBQVMsR0FBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQseUJBQVksR0FBdUIsRUFBRSxDQUFDO0lBRmxDLFlBQVk7UUFMeEIsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLE1BQU07WUFDWixVQUFVLEVBQUUsS0FBSztZQUNqQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO09BQ1csWUFBWSxDQWlGeEI7SUFBRCxtQkFBQztLQUFBO0FBakZZLG9DQUFZIn0=

});
