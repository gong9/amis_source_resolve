amis.define('src/renderers/Form/Grid.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.GridRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Grid_1 = tslib_1.__importDefault(require("src/renderers/Grid.tsx"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const defaultHorizontal = {
      left: 'col-sm-4',
      right: 'col-sm-8',
      offset: 'col-sm-offset-4'
  };
  let GridRenderer = /** @class */ (() => {
      let GridRenderer = class GridRenderer extends Grid_1.default {
          renderChild(region, node, key, length) {
              const { render, renderFormItems, classnames: cx, $path, itemRender, store } = this.props;
              if (node && !node.type && (node.controls || node.tabs || node.feildSet)) {
                  return (react_1.default.createElement("div", { className: cx(`Grid-form Form--${node.mode || 'normal'}`) }, renderFormItems(node, $path.replace(/^.*form\//, ''), {
                      mode: node.mode || 'normal',
                      horizontal: node.horizontal || defaultHorizontal,
                      store,
                      data: store.data,
                      render
                  })));
              }
              return itemRender
                  ? itemRender(node, key, length, this.props)
                  : render(region, node.body || node);
          }
      };
      GridRenderer.propsList = ['columns', 'onChange'];
      GridRenderer.defaultProps = {};
      GridRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'grid',
              strictMode: false,
              sizeMutable: false
          })
      ], GridRenderer);
      return GridRenderer;
  })();
  exports.GridRenderer = GridRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9HcmlkLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMkRBT2lCO0FBR2pCLGlDQUtnQjtBQUVoQiwwREFBMEI7QUF5QzFCLE1BQU0saUJBQWlCLEdBQUc7SUFDeEIsSUFBSSxFQUFFLFVBQVU7SUFDaEIsS0FBSyxFQUFFLFVBQVU7SUFDakIsTUFBTSxFQUFFLGlCQUFpQjtDQUMxQixDQUFDO0FBT0Y7SUFBQSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsY0FBZTtRQUkvQyxXQUFXLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsTUFBYztZQUNuRSxNQUFNLEVBQ0osTUFBTSxFQUNOLGVBQWUsRUFDZixVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTCxVQUFVLEVBQ1YsS0FBSyxFQUNOLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZFLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixJQUFJLENBQUMsSUFBSSxJQUFJLFFBQVEsRUFBRSxDQUFDLElBQzNELGVBQWUsQ0FDZCxJQUFXLEVBQ1YsS0FBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUMxQztvQkFDRSxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksSUFBSSxRQUFRO29CQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLFVBQVUsSUFBSSxpQkFBaUI7b0JBQ2hELEtBQUs7b0JBQ0wsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixNQUFNO2lCQUNQLENBQ0YsQ0FDRyxDQUNQLENBQUM7YUFDSDtZQUVELE9BQU8sVUFBVTtnQkFDZixDQUFDLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUM7UUFDeEMsQ0FBQztLQUNGLENBQUE7SUFuQ1Esc0JBQVMsR0FBa0IsQ0FBQyxTQUFTLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDbkQseUJBQVksR0FBRyxFQUFFLENBQUM7SUFGZCxZQUFZO1FBTHhCLGVBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFLEtBQUs7WUFDakIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztPQUNXLFlBQVksQ0FvQ3hCO0lBQUQsbUJBQUM7S0FBQTtBQXBDWSxvQ0FBWSJ9

});
