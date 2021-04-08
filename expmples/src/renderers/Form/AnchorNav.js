amis.define('src/renderers/Form/AnchorNav.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AnchorNavRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const AnchorNav_1 = tslib_1.__importDefault(require("src/renderers/AnchorNav.tsx"));
  let AnchorNavRenderer = /** @class */ (() => {
      let AnchorNavRenderer = class AnchorNavRenderer extends AnchorNav_1.default {
          constructor() {
              super(...arguments);
              this.renderSection = (section, props, key) => {
                  const { renderFormItems, formMode, formHorizontal, $path, render, classnames: cx } = this.props;
                  if (renderFormItems && !section.type && section.controls) {
                      return (react_1.default.createElement("div", { className: cx(`Form--${formMode || 'normal'}`) }, renderFormItems(section, `${$path.replace(/^.*form\//, '')}/${key}`, {
                          mode: formMode,
                          horizontal: formHorizontal
                      })));
                  }
                  return render(`section/${key}`, section.body || section);
              };
          }
      };
      AnchorNavRenderer.defaultProps = {
          mountOnEnter: false // form 中的不按需渲染
      };
      AnchorNavRenderer.propsList = ['onChange', 'links'];
      AnchorNavRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:.+)?\/control\/anchor-nav$/i,
              weight: -100,
              name: 'anchor-nav-control'
          })
      ], AnchorNavRenderer);
      return AnchorNavRenderer;
  })();
  exports.AnchorNavRenderer = AnchorNavRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5jaG9yTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0FuY2hvck5hdi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQiwyQ0FBc0Q7QUFDdEQscUVBQWdGO0FBNkJoRjtJQUFBLElBQWEsaUJBQWlCLEdBQTlCLE1BQWEsaUJBQWtCLFNBQVEsbUJBQVM7UUFBaEQ7O1lBTUUsa0JBQWEsR0FBRyxDQUFDLE9BQVksRUFBRSxLQUFVLEVBQUUsR0FBVyxFQUFFLEVBQUU7Z0JBQ3hELE1BQU0sRUFDSixlQUFlLEVBQ2YsUUFBUSxFQUNSLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFBRSxFQUFFLEVBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUVmLElBQUksZUFBZSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsUUFBUSxFQUFFO29CQUN4RCxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxTQUFTLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQyxJQUNoRCxlQUFlLENBQ2QsT0FBTyxFQUNQLEdBQUksS0FBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUN0RDt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxVQUFVLEVBQUUsY0FBYztxQkFDM0IsQ0FDRixDQUNHLENBQ1AsQ0FBQztpQkFDSDtnQkFFRCxPQUFPLE1BQU0sQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUFFLE9BQU8sQ0FBQyxJQUFJLElBQUksT0FBTyxDQUFDLENBQUM7WUFDM0QsQ0FBQyxDQUFDO1FBQ0osQ0FBQztLQUFBLENBQUE7SUFoQ1EsOEJBQVksR0FBRztRQUNwQixZQUFZLEVBQUUsS0FBSyxDQUFDLGVBQWU7S0FDcEMsQ0FBQztJQUNLLDJCQUFTLEdBQWtCLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBSjdDLGlCQUFpQjtRQUw3QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLDBDQUEwQztZQUNoRCxNQUFNLEVBQUUsQ0FBQyxHQUFHO1lBQ1osSUFBSSxFQUFFLG9CQUFvQjtTQUMzQixDQUFDO09BQ1csaUJBQWlCLENBaUM3QjtJQUFELHdCQUFDO0tBQUE7QUFqQ1ksOENBQWlCIn0=

});
