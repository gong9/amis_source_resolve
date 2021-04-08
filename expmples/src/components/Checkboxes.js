amis.define('src/components/Checkboxes.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Checkboxes
   * @description 多选输入框
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Checkboxes = exports.BaseCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const locale_1 = require("src/locale.tsx");
  let BaseCheckboxes = /** @class */ (() => {
      class BaseCheckboxes extends react_1.default.Component {
          static value2array(value, options, option2value = (option) => option) {
              if (value === void 0) {
                  return [];
              }
              if (!Array.isArray(value)) {
                  value = [value];
              }
              return value.map((value) => {
                  const option = helper_1.findTree(options, option => isEqual_1.default(option2value(option), value));
                  return option || value;
              });
          }
          toggleOption(option) {
              const { value, onChange, option2value, options, disabled } = this.props;
              if (disabled || option.disabled) {
                  return;
              }
              let valueArray = BaseCheckboxes.value2array(value, options, option2value);
              let idx = valueArray.indexOf(option);
              if (~idx) {
                  valueArray.splice(idx, 1);
              }
              else {
                  valueArray.push(option);
              }
              let newValue = option2value
                  ? valueArray.map(item => option2value(item))
                  : valueArray;
              onChange && onChange(newValue);
          }
          toggleAll() {
              const { value, onChange, option2value, options } = this.props;
              let valueArray = [];
              if (!Array.isArray(value) || !value.length) {
                  valueArray = options.filter(option => !option.disabled);
              }
              let newValue = option2value
                  ? valueArray.map(item => option2value(item))
                  : valueArray;
              onChange && onChange(newValue);
          }
          render() {
              const { value, options, className, placeholder, inline, labelClassName, disabled, classnames: cx, option2value, itemClassName, itemRender } = this.props;
              const __ = this.props.translate;
              let valueArray = BaseCheckboxes.value2array(value, options, option2value);
              let body = [];
              if (Array.isArray(options) && options.length) {
                  body = options.map((option, key) => (react_1.default.createElement(Checkbox_1.default, { className: cx(itemClassName, option.className), key: key, onChange: () => this.toggleOption(option), checked: !!~valueArray.indexOf(option), disabled: disabled || option.disabled, labelClassName: labelClassName, description: option.description }, itemRender(option))));
              }
              return (react_1.default.createElement("div", { className: cx('Checkboxes', className, inline ? 'Checkboxes--inline' : '') }, body && body.length ? body : react_1.default.createElement("div", null, __(placeholder))));
          }
      }
      BaseCheckboxes.defaultProps = {
          placeholder: 'placeholder.noOption',
          itemRender: (option) => react_1.default.createElement("span", null, option.label)
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaseCheckboxes.prototype, "toggleAll", null);
      return BaseCheckboxes;
  })();
  exports.BaseCheckboxes = BaseCheckboxes;
  class Checkboxes extends BaseCheckboxes {
  }
  exports.Checkboxes = Checkboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(Checkboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0NoZWNrYm94ZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5QyxrRUFBa0M7QUFFbEMsb0NBQTZEO0FBRzdELDRDQUFtRDtBQUNuRCxxRUFBcUM7QUFDckMsc0NBQWtEO0FBbUJsRDtJQUFBLE1BQWEsY0FHWCxTQUFRLGVBQUssQ0FBQyxTQUFlO1FBTTdCLE1BQU0sQ0FBQyxXQUFXLENBQ2hCLEtBQVUsRUFDVixPQUFnQixFQUNoQixlQUF3QyxDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsTUFBTTtZQUVsRSxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixLQUFLLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNqQjtZQUVELE9BQU8sS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO2dCQUM5QixNQUFNLE1BQU0sR0FBRyxpQkFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUN4QyxpQkFBTyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDckMsQ0FBQztnQkFDRixPQUFPLE1BQU0sSUFBSSxLQUFLLENBQUM7WUFDekIsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsWUFBWSxDQUFDLE1BQWM7WUFDekIsTUFBTSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lB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

});
