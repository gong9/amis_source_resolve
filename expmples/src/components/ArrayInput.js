amis.define('src/components/ArrayInput.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ArrayInput = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const locale_1 = require("src/locale.tsx");
  const InputBox_1 = tslib_1.__importDefault(require("src/components/InputBox.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const react_dom_1 = require("node_modules/react-dom/index");
  let ArrayInput = /** @class */ (() => {
      var _a;
      class ArrayInput extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.id = helper_1.guid();
          }
          handleItemOnChange(index, itemValue) {
              const { onChange } = this.props;
              const value = this.props.value;
              const newValue = Array.isArray(value) ? value.concat() : [];
              newValue.splice(index, 1, itemValue);
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
          }
          dragTipRef(ref) {
              if (!this.dragTip && ref) {
                  this.initDragging();
              }
              else if (this.dragTip && !ref) {
                  this.destroyDragging();
              }
              this.dragTip = ref;
          }
          handleAdd() {
              const { value, onChange, itemInitalValue } = this.props;
              const newValue = Array.isArray(value) ? value.concat() : [];
              newValue.push(itemInitalValue);
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
          }
          handleRemove(e) {
              const indx = parseInt(e.currentTarget.getAttribute('data-index'), 10);
              const { value, onChange, itemInitalValue } = this.props;
              const newValue = Array.isArray(value) ? value.concat() : [];
              newValue.splice(indx, 1);
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
          }
          initDragging() {
              const onChange = this.props.onChange;
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              this.sortable = new sortablejs_1.default(dom.querySelector(`.drag-group`), {
                  group: `array-input-${this.id}`,
                  animation: 150,
                  handle: `.drag-bar`,
                  ghostClass: `${ns}ArrayInput-item--dragging`,
                  onEnd: (e) => {
                      // 没有移动
                      if (e.newIndex === e.oldIndex) {
                          return;
                      }
                      // 换回来
                      const parent = e.to;
                      if (e.newIndex < e.oldIndex &&
                          e.oldIndex < parent.childNodes.length - 1) {
                          parent.insertBefore(e.item, parent.childNodes[e.oldIndex + 1]);
                      }
                      else if (e.oldIndex < parent.childNodes.length - 1) {
                          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                      }
                      else {
                          parent.appendChild(e.item);
                      }
                      const value = this.props.value;
                      if (!Array.isArray(value)) {
                          return;
                      }
                      const newValue = value.concat();
                      newValue.splice(e.newIndex, 0, newValue.splice(e.oldIndex, 1)[0]);
                      onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
                  }
              });
          }
          destroyDragging() {
              this.sortable && this.sortable.destroy();
          }
          renderItem(value, index, collection) {
              const { itemRender, disabled, classnames: cx, sortable, removable, minLength } = this.props;
              return (react_1.default.createElement("div", { className: cx('ArrayInput-item'), key: index },
                  sortable && collection.length > 1 && !disabled ? (react_1.default.createElement("a", { className: cx('ArrayInput-itemDrager drag-bar') },
                      react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" }))) : null,
                  itemRender({
                      value,
                      onChange: this.handleItemOnChange.bind(this, index),
                      index,
                      disabled
                  }),
                  removable !== false &&
                      !disabled &&
                      (!minLength || collection.length > minLength) ? (react_1.default.createElement("a", { "data-index": index, className: cx('ArrayInput-itemRemove'), onClick: this.handleRemove },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null));
          }
          render() {
              const { classnames: cx, value, placeholder, translate: __, maxLength, sortable, sortTip, disabled } = this.props;
              return (react_1.default.createElement("div", { className: cx('ArrayInput') },
                  Array.isArray(value) && value.length ? (react_1.default.createElement("div", { className: cx('ArrayInput-items drag-group') }, value.map((item, index) => this.renderItem(item, index, value)))) : (react_1.default.createElement("div", { className: cx('ArrayInput-placeholder') }, __(placeholder))),
                  react_1.default.createElement("div", { className: cx('ArrayInput-toolbar', sortable && Array.isArray(value) && value.length > 1
                          ? 'ArrayInput-toolbar--dnd'
                          : '') },
                      !Array.isArray(value) || !maxLength || value.length < maxLength ? (react_1.default.createElement(Button_1.default, { className: cx('ArrayInput-addBtn'), onClick: this.handleAdd, level: "", disabled: disabled },
                          react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                          react_1.default.createElement("span", null, __('Combo.add')))) : null,
                      sortable && Array.isArray(value) && value.length ? (react_1.default.createElement("span", { className: cx(`ArrayInput-sortTip`), ref: this.dragTipRef }, Array.isArray(value) && value.length > 1 ? __(sortTip) : '')) : null)));
          }
      }
      ArrayInput.defaultProps = {
          placeholder: 'empty',
          itemRender: ({ value, onChange }) => react_1.default.createElement(InputBox_1.default, { value: value, onChange: onChange })
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ArrayInput.prototype, "dragTipRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ArrayInput.prototype, "handleAdd", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ArrayInput.prototype, "handleRemove", null);
      return ArrayInput;
  })();
  exports.ArrayInput = ArrayInput;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ArrayInput, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXJyYXlJbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0FycmF5SW5wdXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsb0NBQStDO0FBQy9DLHNDQUFrRDtBQUNsRCxrRUFBa0M7QUFDbEMsbUNBQTZCO0FBQzdCLDhEQUE4QjtBQUM5Qiw0Q0FBK0M7QUFDL0MsbURBQThDO0FBQzlDLG9FQUFrQztBQUNsQyx5Q0FBc0M7QUF1QnRDOztJQUFBLE1BQWEsVUFBVyxTQUFRLGVBQUssQ0FBQyxTQUEwQjtRQUFoRTs7WUFjRSxPQUFFLEdBQVcsYUFBSSxFQUFFLENBQUM7UUFtTHRCLENBQUM7UUEvS0Msa0JBQWtCLENBQUMsS0FBYSxFQUFFLFNBQWM7WUFDOUMsTUFBTSxFQUFDLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDOUIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDL0IsTUFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDNUQsUUFBUSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1lBQ3JDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRyxRQUFRLEVBQUU7UUFDdkIsQ0FBQztRQUdELFVBQVUsQ0FBQyxHQUFRO1lBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLEdBQUcsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO2lCQUFNLElBQUksSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLEdBQUcs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

});
