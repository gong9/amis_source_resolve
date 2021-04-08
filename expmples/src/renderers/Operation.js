amis.define('src/renderers/Operation.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.OperationFieldRenderer = exports.OperationField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let OperationField = /** @class */ (() => {
      class OperationField extends react_1.default.Component {
          render() {
              const { className, buttons, render, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('OperationField', className) }, Array.isArray(buttons)
                  ? buttons.map((button, index) => render(`${index}`, Object.assign({ type: 'button', size: button.size || 'sm', level: button.level ||
                          (button.icon && !button.label ? 'link' : '') }, button), {
                      key: index
                  }))
                  : null));
          }
      }
      OperationField.propsList = ['buttons', 'label'];
      OperationField.defaultProps = {};
      return OperationField;
  })();
  exports.OperationField = OperationField;
  let OperationFieldRenderer = /** @class */ (() => {
      let OperationFieldRenderer = class OperationFieldRenderer extends OperationField {
      };
      OperationFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              // test: /(^|\/)table\/(.*\/)operation$/,
              test: (path) => /(^|\/)table\/(.*\/)operation$/.test(path),
              name: 'operation'
          })
      ], OperationFieldRenderer);
      return OperationFieldRenderer;
  })();
  exports.OperationFieldRenderer = OperationFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3BlcmF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9PcGVyYXRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBK0JuRDtJQUFBLE1BQWEsY0FBZSxTQUFRLGVBQUssQ0FBQyxTQUFpQztRQUt6RSxNQUFNO1lBQ0osTUFBTSxFQUFDLFNBQVMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWhFLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixFQUFFLFNBQVMsQ0FBQyxJQUM1QyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQztnQkFDckIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDNUIsTUFBTSxDQUNKLEdBQUcsS0FBSyxFQUFFLGtCQUVSLElBQUksRUFBRSxRQUFRLEVBQ2QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUN6QixLQUFLLEVBQ0gsTUFBTSxDQUFDLEtBQUs7d0JBQ1osQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFDMUMsTUFBYyxHQUVwQjtvQkFDRSxHQUFHLEVBQUUsS0FBSztpQkFDWCxDQUNGLENBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FDSixDQUNQLENBQUM7UUFDSixDQUFDOztJQTdCTSx3QkFBUyxHQUFrQixDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztJQUVoRCwyQkFBWSxHQUE0QixFQUFFLENBQUM7SUE0QnBELHFCQUFDO0tBQUE7QUEvQlksd0NBQWM7QUFzQzNCO0lBQUEsSUFBYSxzQkFBc0IsR0FBbkMsTUFBYSxzQkFBdUIsU0FBUSxjQUFjO0tBQUcsQ0FBQTtJQUFoRCxzQkFBc0I7UUFMbEMsa0JBQVEsQ0FBQztZQUNSLHlDQUF5QztZQUN6QyxJQUFJLEVBQUUsQ0FBQyxJQUFZLEVBQUUsRUFBRSxDQUFDLCtCQUErQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDbEUsSUFBSSxFQUFFLFdBQVc7U0FDbEIsQ0FBQztPQUNXLHNCQUFzQixDQUEwQjtJQUFELDZCQUFDO0tBQUE7QUFBaEQsd0RBQXNCIn0=

});
