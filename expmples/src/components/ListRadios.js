amis.define('src/components/ListRadios.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListRadios = exports.BaseRadios = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const Select_1 = require("src/components/Select.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const locale_1 = require("src/locale.tsx");
  let BaseRadios = /** @class */ (() => {
      var _a;
      class BaseRadios extends react_1.default.Component {
          static resolveSelected(value, options, option2value = (option) => option) {
              return helper_1.findTree(options, option => isEqual_1.default(option2value(option), value));
          }
          toggleOption(option) {
              const { onChange, clearable, value, options, option2value } = this.props;
              let newValue = option;
              if (clearable) {
                  const prevSelected = BaseRadios.resolveSelected(value, options, option2value);
                  if (prevSelected) {
                      newValue = null;
                  }
              }
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue && option2value ? option2value(newValue) : newValue);
          }
          renderOption(option, index) {
              const { disabled, classnames: cx, itemClassName, itemRender, showRadio } = this.props;
              const selected = this.selected;
              if (Array.isArray(option.children)) {
                  return (react_1.default.createElement("div", { key: index, className: cx('ListRadios-group', option.className) },
                      react_1.default.createElement("div", { className: cx('ListRadios-itemLabel') }, itemRender(option)),
                      react_1.default.createElement("div", { className: cx('ListRadios-items', option.className) }, option.children.map((child, index) => this.renderOption(child, index)))));
              }
              return (react_1.default.createElement("div", { key: index, className: cx('ListRadios-item', itemClassName, option.className, disabled || option.disabled ? 'is-disabled' : '', selected === option ? 'is-active' : ''), onClick: () => this.toggleOption(option) },
                  react_1.default.createElement("div", { className: cx('ListRadios-itemLabel') }, itemRender(option)),
                  showRadio !== false ? (react_1.default.createElement(Checkbox_1.default, { type: "radio", size: "sm", checked: selected === option, disabled: disabled || option.disabled })) : null));
          }
          render() {
              const { value, options, className, placeholder, classnames: cx, option2value, onClick } = this.props;
              const __ = this.props.translate;
              this.selected = BaseRadios.resolveSelected(value, options, option2value);
              let body = [];
              if (Array.isArray(options) && options.length) {
                  body = options.map((option, key) => this.renderOption(option, key));
              }
              return (react_1.default.createElement("div", { className: cx('ListRadios', className), onClick: onClick }, body && body.length ? (body) : (react_1.default.createElement("div", { className: cx('ListRadios-placeholder') }, __(placeholder)))));
          }
      }
      BaseRadios.defaultProps = {
          placeholder: 'placeholder.noOption',
          itemRender: (option) => react_1.default.createElement("span", null, option.label)
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaseRadios.prototype, "toggleOption", null);
      return BaseRadios;
  })();
  exports.BaseRadios = BaseRadios;
  class ListRadios extends BaseRadios {
  }
  exports.ListRadios = ListRadios;
  const themedListRadios = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ListRadios, {
      value: 'onChange'
  })));
  themedListRadios.resolveSelected = BaseRadios.resolveSelected;
  exports.default = themedListRadios;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdFJhZGlvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0xpc3RSYWRpb3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSxvQ0FBK0M7QUFDL0MsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5QyxrRUFBa0M7QUFDbEMscUNBQXlDO0FBQ3pDLDRDQUFtRDtBQUNuRCxxRUFBcUM7QUFDckMsc0NBQWtEO0FBa0JsRDs7SUFBQSxNQUFhLFVBR1gsU0FBUSxlQUFLLENBQUMsU0FBZTtRQU83QixNQUFNLENBQUMsZUFBZSxDQUNwQixLQUFVLEVBQ1YsT0FBZ0IsRUFDaEIsZUFBd0MsQ0FBQyxNQUFjLEVBQUUsRUFBRSxDQUFDLE1BQU07WUFFbEUsT0FBTyxpQkFBUSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDLGlCQUFPLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUdELFlBQVksQ0FBQyxNQUFjO1lBQ3pCLE1BQU0sRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsWUFBWSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV2RSxJQUFJLFFBQVEsR0FBa0IsTUFBTSxDQUFDO1lBRXJDLElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sWUFBWSxHQUFHLFVBQVUsQ0FBQyxlQUFlLENBQzdDLEtBQUssRUFDTCxPQUFPLEVBQ1AsWUFBWSxDQUNiLENBQUM7Z0JBRUYsSUFBSSxZQUFZLEVBQUU7b0JBQ2hCLFFBQVEsR0FBRyxJQUFJLENBQUM7aUJBQ2pCO2FBQ0Y7WUFFRCxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUcsUUFBUSxJQUFJLFlBQVksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLFFBQVEs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

});
