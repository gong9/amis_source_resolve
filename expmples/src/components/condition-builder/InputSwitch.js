amis.define('src/components/condition-builder/InputSwitch.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InputSwitch = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const PopOverContainer_1 = tslib_1.__importDefault(require("src/components/PopOverContainer.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const ListRadios_1 = tslib_1.__importDefault(require("src/components/ListRadios.tsx"));
  const theme_1 = require("src/theme.tsx");
  const option2value = (item) => item.value;
  function InputSwitch({ options, value, onChange, classnames: cx }) {
      return (react_1.default.createElement(PopOverContainer_1.default, { popOverRender: ({ onClose }) => (react_1.default.createElement(ListRadios_1.default, { onClick: onClose, option2value: option2value, onChange: onChange, options: options, value: value, showRadio: false })) }, ({ onClick, isOpened, ref }) => (react_1.default.createElement("div", { className: cx('CBInputSwitch', isOpened ? 'is-active' : '') },
          react_1.default.createElement("a", { onClick: onClick, ref: ref },
              react_1.default.createElement(icons_1.Icon, { icon: "ellipsis-v" }))))));
  }
  exports.InputSwitch = InputSwitch;
  exports.default = theme_1.themeable(InputSwitch);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRTd2l0Y2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9JbnB1dFN3aXRjaC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixtRkFBbUQ7QUFDbkQsb0NBQThCO0FBQzlCLHVFQUF1QztBQUN2Qyx1Q0FBZ0U7QUFRaEUsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFFL0MsU0FBZ0IsV0FBVyxDQUFDLEVBQzFCLE9BQU8sRUFDUCxLQUFLLEVBQ0wsUUFBUSxFQUNSLFVBQVUsRUFBRSxFQUFFLEVBQ0c7SUFDakIsT0FBTyxDQUNMLDhCQUFDLDBCQUFnQixJQUNmLGFBQWEsRUFBRSxDQUFDLEVBQUMsT0FBTyxFQUFDLEVBQUUsRUFBRSxDQUFDLENBQzVCLDhCQUFDLG9CQUFVLElBQ1QsT0FBTyxFQUFFLE9BQU8sRUFDaEIsWUFBWSxFQUFFLFlBQVksRUFDMUIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsS0FBSyxFQUFFLEtBQUssRUFDWixTQUFTLEVBQUUsS0FBSyxHQUNoQixDQUNILElBRUEsQ0FBQyxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxFQUFDLEVBQUUsRUFBRSxDQUFDLENBQzdCLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDOUQscUNBQUcsT0FBTyxFQUFFLE9BQU8sRUFBRSxHQUFHLEVBQUUsR0FBRztZQUMzQiw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLFlBQVksR0FBRyxDQUN4QixDQUNBLENBQ1AsQ0FDZ0IsQ0FDcEIsQ0FBQztBQUNKLENBQUM7QUE1QkQsa0NBNEJDO0FBRUQsa0JBQWUsaUJBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQyJ9

});
