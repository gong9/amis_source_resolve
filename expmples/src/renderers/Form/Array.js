amis.define('src/renderers/Form/Array.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ArrayControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const combo_1 = require("src/store/combo.ts");
  const Combo_1 = tslib_1.__importDefault(require("src/renderers/Form/Combo.tsx"));
  class ArrayControl extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.comboRef = this.comboRef.bind(this);
      }
      comboRef(ref) {
          this.comboInstance = ref;
      }
      validate(args) {
          return this.comboInstance ? this.comboInstance.validate(...args) : null;
      }
      render() {
          const _a = this.props, { items } = _a, rest = tslib_1.__rest(_a, ["items"]);
          return (react_1.default.createElement(Combo_1.default, Object.assign({}, rest, { controls: [items], flat: true, multiple: true, multiLine: false, ref: this.comboRef })));
      }
  }
  exports.default = ArrayControl;
  let ArrayControlRenderer = /** @class */ (() => {
      let ArrayControlRenderer = class ArrayControlRenderer extends ArrayControl {
      };
      ArrayControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'array',
              storeType: combo_1.ComboStore.name
          })
      ], ArrayControlRenderer);
      return ArrayControlRenderer;
  })();
  exports.ArrayControlRenderer = ArrayControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQXJyYXkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBS2dCO0FBRWhCLDZDQUEwRDtBQUUxRCw0REFBa0Q7QUE2QmxELE1BQXFCLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBcUI7SUFFbkUsWUFBWSxLQUFpQjtRQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDYixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBUTtRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxDQUFDO0lBQzNCLENBQUM7SUFFRCxRQUFRLENBQUMsSUFBZ0I7UUFDdkIsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUUsQ0FBQztJQUVELE1BQU07UUFDSixNQUFNLEtBQW1CLElBQUksQ0FBQyxLQUFLLEVBQTdCLEVBQUMsS0FBSyxPQUF1QixFQUFsQixJQUFJLHNCQUFmLFNBQWdCLENBQWEsQ0FBQztRQUVwQyxPQUFPLENBQ0wsOEJBQUMsZUFBSyxvQkFDQyxJQUFZLElBQ2pCLFFBQVEsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUNqQixJQUFJLFFBQ0osUUFBUSxRQUNSLFNBQVMsRUFBRSxLQUFLLEVBQ2hCLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxJQUNsQixDQUNILENBQUM7SUFDSixDQUFDO0NBQ0Y7QUE3QkQsK0JBNkJDO0FBTUQ7SUFBQSxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLFlBQVk7S0FBRyxDQUFBO0lBQTVDLG9CQUFvQjtRQUpoQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsT0FBTztZQUNiLFNBQVMsRUFBRSxrQkFBVSxDQUFDLElBQUk7U0FDM0IsQ0FBQztPQUNXLG9CQUFvQixDQUF3QjtJQUFELDJCQUFDO0tBQUE7QUFBNUMsb0RBQW9CIn0=

});
