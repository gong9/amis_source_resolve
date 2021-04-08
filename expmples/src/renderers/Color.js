amis.define('src/renderers/Color.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorFieldRenderer = exports.ColorField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 用来展示颜色块。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let ColorField = /** @class */ (() => {
      class ColorField extends react_1.default.Component {
          render() {
              const { className, data, classnames: cx, name, value, defaultColor, showValue } = this.props;
              const color = value || (name ? tpl_builtin_1.resolveVariableAndFilter(name, data, '| raw') : null);
              return (react_1.default.createElement("div", { className: cx('ColorField', className) },
                  react_1.default.createElement("i", { className: cx('ColorField-previewIcon'), style: { backgroundColor: color || defaultColor } }),
                  showValue ? (react_1.default.createElement("span", { className: cx('ColorField-value') }, color)) : null));
          }
      }
      ColorField.defaultProps = {
          className: '',
          defaultColor: '#ccc',
          showValue: true
      };
      return ColorField;
  })();
  exports.ColorField = ColorField;
  let ColorFieldRenderer = /** @class */ (() => {
      let ColorFieldRenderer = class ColorFieldRenderer extends ColorField {
      };
      ColorFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)color$/,
              name: 'color'
          })
      ], ColorFieldRenderer);
      return ColorFieldRenderer;
  })();
  exports.ColorFieldRenderer = ColorFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0NvbG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUE7O0dBRUc7QUFDSCwwREFBMEI7QUFDMUIsd0NBQW1EO0FBRW5ELHNEQUE4RDtBQTJCOUQ7SUFBQSxNQUFhLFVBQVcsU0FBUSxlQUFLLENBQUMsU0FBNkI7UUFPakUsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsSUFBSSxFQUNKLFVBQVUsRUFBRSxFQUFFLEVBQ2QsSUFBSSxFQUNKLEtBQUssRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNWLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNmLE1BQU0sS0FBSyxHQUNULEtBQUssSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsc0NBQXdCLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFekUsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQztnQkFDekMscUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUN2QyxLQUFLLEVBQUUsRUFBQyxlQUFlLEVBQUUsS0FBSyxJQUFJLFlBQVksRUFBQyxHQUMvQztnQkFDRCxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ1gsd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUFHLEtBQUssQ0FBUSxDQUN4RCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUE5Qk0sdUJBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsRUFBRTtRQUNiLFlBQVksRUFBRSxNQUFNO1FBQ3BCLFNBQVMsRUFBRSxJQUFJO0tBQ2hCLENBQUM7SUEyQkosaUJBQUM7S0FBQTtBQWhDWSxnQ0FBVTtBQXNDdkI7SUFBQSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFtQixTQUFRLFVBQVU7S0FBRyxDQUFBO0lBQXhDLGtCQUFrQjtRQUo5QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGNBQWM7WUFDcEIsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO09BQ1csa0JBQWtCLENBQXNCO0lBQUQseUJBQUM7S0FBQTtBQUF4QyxnREFBa0IifQ==

});
