amis.define('src/components/condition-builder/Field.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConditionField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const PopOverContainer_1 = tslib_1.__importDefault(require("src/components/PopOverContainer.tsx"));
  const ListRadios_1 = tslib_1.__importDefault(require("src/components/ListRadios.tsx"));
  const ResultBox_1 = tslib_1.__importDefault(require("src/components/ResultBox.tsx"));
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const option2value = (item) => item.name;
  function ConditionField({ options, onChange, value, classnames: cx }) {
      return (react_1.default.createElement(PopOverContainer_1.default, { popOverRender: ({ onClose }) => (react_1.default.createElement(ListRadios_1.default, { onClick: onClose, showRadio: false, options: options, value: value, option2value: option2value, onChange: onChange })) }, ({ onClick, ref, isOpened }) => {
          var _a;
          return (react_1.default.createElement("div", { className: cx('CBGroup-field') },
              react_1.default.createElement(ResultBox_1.default, { className: cx('CBGroup-fieldInput', isOpened ? 'is-active' : ''), ref: ref, allowInput: false, result: value ? (_a = helper_1.findTree(options, item => item.name === value)) === null || _a === void 0 ? void 0 : _a.label : '', onResultChange: helper_1.noop, onResultClick: onClick, placeholder: "\u8BF7\u9009\u62E9\u5B57\u6BB5" },
                  react_1.default.createElement("span", { className: cx('CBGroup-fieldCaret') },
                      react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))));
      }));
  }
  exports.ConditionField = ConditionField;
  exports.default = theme_1.themeable(ConditionField);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9GaWVsZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixtRkFBbUQ7QUFDbkQsdUVBQXVDO0FBQ3ZDLHFFQUFxQztBQUNyQyx1Q0FBZ0U7QUFDaEUsb0NBQThCO0FBQzlCLCtDQUFrRDtBQVFsRCxNQUFNLFlBQVksR0FBRyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztBQUU5QyxTQUFnQixjQUFjLENBQUMsRUFDN0IsT0FBTyxFQUNQLFFBQVEsRUFDUixLQUFLLEVBQ0wsVUFBVSxFQUFFLEVBQUUsRUFDTTtJQUNwQixPQUFPLENBQ0wsOEJBQUMsMEJBQWdCLElBQ2YsYUFBYSxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FDNUIsOEJBQUMsb0JBQVUsSUFDVCxPQUFPLEVBQUUsT0FBTyxFQUNoQixTQUFTLEVBQUUsS0FBSyxFQUNoQixPQUFPLEVBQUUsT0FBTyxFQUNoQixLQUFLLEVBQUUsS0FBSyxFQUNaLFlBQVksRUFBRSxZQUFZLEVBQzFCLFFBQVEsRUFBRSxRQUFRLEdBQ2xCLENBQ0gsSUFFQSxDQUFDLEVBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUMsRUFBRSxFQUFFOztRQUFDLE9BQUEsQ0FDN0IsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUM7WUFDakMsOEJBQUMsbUJBQVMsSUFDUixTQUFTLEVBQUUsRUFBRSxDQUFDLG9CQUFvQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFDaEUsR0FBRyxFQUFFLEdBQUcsRUFDUixVQUFVLEVBQUUsS0FBSyxFQUNqQixNQUFNLEVBQ0osS0FBSyxDQUFDLENBQUMsT0FBQyxpQkFBUSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLDBDQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUVwRSxjQUFjLEVBQUUsYUFBSSxFQUNwQixhQUFhLEVBQUUsT0FBTyxFQUN0QixXQUFXLEVBQUMsZ0NBQU87Z0JBRW5CLHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUM7b0JBQ3ZDLDhCQUFDLFlBQUksSUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEdBQUcsQ0FDakMsQ0FDRyxDQUNSLENBQ1AsQ0FBQTtLQUFBLENBQ2dCLENBQ3BCLENBQUM7QUFDSixDQUFDO0FBeENELHdDQXdDQztBQUVELGtCQUFlLGlCQUFTLENBQUMsY0FBYyxDQUFDLENBQUMifQ==

});
