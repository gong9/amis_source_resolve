amis.define('src/renderers/Form/Checkbox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CheckboxControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  let CheckboxControl = /** @class */ (() => {
      class CheckboxControl extends react_1.default.Component {
          render() {
              const { className, value, trueValue, falseValue, option, onChange, disabled, render, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}CheckboxControl`, className) },
                  react_1.default.createElement(Checkbox_1.default, { inline: true, value: value || '', trueValue: trueValue, falseValue: falseValue, disabled: disabled, onChange: (value) => onChange(value) }, option ? render('option', option) : null)));
          }
      }
      CheckboxControl.defaultProps = {
          trueValue: true,
          falseValue: false
      };
      return CheckboxControl;
  })();
  exports.default = CheckboxControl;
  let CheckboxControlRenderer = /** @class */ (() => {
      let CheckboxControlRenderer = class CheckboxControlRenderer extends CheckboxControl {
      };
      CheckboxControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'checkbox',
              sizeMutable: false
          })
      ], CheckboxControlRenderer);
      return CheckboxControlRenderer;
  })();
  exports.CheckboxControlRenderer = CheckboxControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQ2hlY2tib3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLG9FQUE0QjtBQUM1QixpRkFBaUQ7QUFtQ2pEO0lBQUEsTUFBcUIsZUFBZ0IsU0FBUSxlQUFLLENBQUMsU0FHbEQ7UUFLQyxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxLQUFLLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sUUFBUSxFQUNSLFFBQVEsRUFDUixNQUFNLEVBQ04sV0FBVyxFQUFFLEVBQUUsRUFDaEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxvQkFBRSxDQUFDLEdBQUcsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLENBQUM7Z0JBQ25ELDhCQUFDLGtCQUFRLElBQ1AsTUFBTSxRQUNOLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxFQUNsQixTQUFTLEVBQUUsU0FBUyxFQUNwQixVQUFVLEVBQUUsVUFBVSxFQUN0QixRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBQUUsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFFeEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2hDLENBQ1AsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUEvQk0sNEJBQVksR0FBMkI7UUFDNUMsU0FBUyxFQUFFLElBQUk7UUFDZixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDO0lBNkJKLHNCQUFDO0tBQUE7a0JBcENvQixlQUFlO0FBMENwQztJQUFBLElBQWEsdUJBQXVCLEdBQXBDLE1BQWEsdUJBQXdCLFNBQVEsZUFBZTtLQUFHLENBQUE7SUFBbEQsdUJBQXVCO1FBSm5DLGVBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxVQUFVO1lBQ2hCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7T0FDVyx1QkFBdUIsQ0FBMkI7SUFBRCw4QkFBQztLQUFBO0FBQWxELDBEQUF1QiJ9

});
