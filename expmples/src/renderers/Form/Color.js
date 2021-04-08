amis.define('src/renderers/Form/Color.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ColorControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const ColorPicker_1 = tslib_1.__importDefault(require("src/components/ColorPicker.tsx"));
  let ColorControl = /** @class */ (() => {
      class ColorControl extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.state = {
                  open: false
              };
          }
          render() {
              const _a = this.props, { className, classPrefix: ns } = _a, rest = tslib_1.__rest(_a, ["className", "classPrefix"]);
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}ColorControl`, className) },
                  react_1.default.createElement(ColorPicker_1.default, Object.assign({ classPrefix: ns }, rest))));
          }
      }
      ColorControl.defaultProps = {
          format: 'hex',
          clearable: true
      };
      return ColorControl;
  })();
  exports.default = ColorControl;
  let ColorControlRenderer = /** @class */ (() => {
      let ColorControlRenderer = class ColorControlRenderer extends ColorControl {
      };
      ColorControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'color'
          })
      ], ColorControlRenderer);
      return ColorControlRenderer;
  })();
  exports.ColorControlRenderer = ColorControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQ29sb3IudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLG9FQUE0QjtBQUM1Qix1RkFBdUQ7QUFpRHZEO0lBQUEsTUFBcUIsWUFBYSxTQUFRLGVBQUssQ0FBQyxhQUcvQztRQUhEOztZQVFFLFVBQUssR0FBc0I7Z0JBQ3pCLElBQUksRUFBRSxLQUFLO2FBQ1osQ0FBQztRQVdKLENBQUM7UUFUQyxNQUFNO1lBQ0osTUFBTSxLQUF3QyxJQUFJLENBQUMsS0FBSyxFQUFsRCxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsRUFBRSxPQUF1QixFQUFsQixJQUFJLHNCQUFwQyw0QkFBcUMsQ0FBYSxDQUFDO1lBRXpELE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsb0JBQUUsQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFLFNBQVMsQ0FBQztnQkFDaEQsOEJBQUMscUJBQVcsa0JBQUMsV0FBVyxFQUFFLEVBQUUsSUFBTSxJQUFJLEVBQUksQ0FDdEMsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFoQk0seUJBQVksR0FBd0I7UUFDekMsTUFBTSxFQUFFLEtBQUs7UUFDYixTQUFTLEVBQUUsSUFBSTtLQUNoQixDQUFDO0lBY0osbUJBQUM7S0FBQTtrQkFyQm9CLFlBQVk7QUEwQmpDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxZQUFZO0tBQUcsQ0FBQTtJQUE1QyxvQkFBb0I7UUFIaEMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO09BQ1csb0JBQW9CLENBQXdCO0lBQUQsMkJBQUM7S0FBQTtBQUE1QyxvREFBb0IifQ==

});
