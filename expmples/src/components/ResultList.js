amis.define('src/components/ResultList.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ResultList = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * 用来显示选择结果，垂直显示。支持移出、排序等操作。
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const locale_1 = require("src/locale.tsx");
  let ResultList = /** @class */ (() => {
      var _a;
      class ResultList extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.id = helper_1.guid();
          }
          componentDidMount() {
              this.props.sortable && this.initSortable();
          }
          componentDidUpdate() {
              if (this.props.sortable) {
                  this.sortable || this.initSortable();
              }
              else {
                  this.desposeSortable();
              }
          }
          componentWillUnmount() {
              this.desposeSortable();
          }
          handleRemove(e) {
              const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
              const { value, onChange } = this.props;
              if (!Array.isArray(value)) {
                  return;
              }
              const newValue = value.concat();
              newValue.splice(index, 1);
              onChange === null || onChange === void 0 ? void 0 : onChange(newValue);
          }
          initSortable() {
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              const container = dom.querySelector(`.${ns}Selections-items`);
              if (!container) {
                  return;
              }
              this.sortable = new sortablejs_1.default(container, {
                  group: `selections-${this.id}`,
                  animation: 150,
                  handle: `.${ns}Selections-dragbar`,
                  ghostClass: `${ns}Selections-item--dragging`,
                  onEnd: (e) => {
                      var _a, _b;
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
                      (_b = (_a = this.props).onChange) === null || _b === void 0 ? void 0 : _b.call(_a, newValue);
                  }
              });
          }
          desposeSortable() {
              var _a;
              (_a = this.sortable) === null || _a === void 0 ? void 0 : _a.destroy();
              delete this.sortable;
          }
          render() {
              const { classnames: cx, className, value, placeholder, itemRender, disabled, title, itemClassName, sortable, translate: __ } = this.props;
              return (react_1.default.createElement("div", { className: cx('Selections', className) },
                  title ? react_1.default.createElement("div", { className: cx('Selections-title') }, title) : null,
                  Array.isArray(value) && value.length ? (react_1.default.createElement("div", { className: cx('Selections-items') }, value.map((option, index) => (react_1.default.createElement("div", { className: cx('Selections-item', itemClassName, option === null || option === void 0 ? void 0 : option.className), key: index },
                      sortable && !disabled && value.length > 1 ? (react_1.default.createElement(icons_1.Icon, { className: cx('Selections-dragbar icon'), icon: "drag-bar" })) : null,
                      react_1.default.createElement("label", null, itemRender(option)),
                      !disabled ? (react_1.default.createElement("a", { className: cx('Selections-delBtn'), "data-index": index, onClick: this.handleRemove },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null))))) : (react_1.default.createElement("div", { className: cx('Selections-placeholder') }, __(placeholder)))));
          }
      }
      ResultList.defaultProps = {
          placeholder: 'placeholder.selectData',
          itemRender: (option) => (react_1.default.createElement("span", null, `${option.scopeLabel || ''}${option.label}`))
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ResultList.prototype, "handleRemove", null);
      return ResultList;
  })();
  exports.ResultList = ResultList;
  exports.default = theme_1.themeable(locale_1.localeable(ResultList));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVzdWx0TGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1Jlc3VsdExpc3QudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7R0FFRztBQUNILDBEQUEwQjtBQUUxQixvQ0FBK0M7QUFDL0MsbUNBQTZCO0FBQzdCLDRDQUErQztBQUMvQyxvRUFBa0M7QUFDbEMseUNBQXNDO0FBQ3RDLHNDQUFrRDtBQWNsRDs7SUFBQSxNQUFhLFVBQVcsU0FBUSxlQUFLLENBQUMsU0FBMEI7UUFBaEU7O1lBUUUsT0FBRSxHQUFHLGFBQUksRUFBRSxDQUFDO1FBNElkLENBQUM7UUF6SUMsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzdDLENBQUM7UUFFRCxrQkFBa0I7WUFDaEIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRTtnQkFDdkIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDdEM7aUJBQU07Z0JBQ0wsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO2FBQ3hCO1FBQ0gsQ0FBQztRQUVELG9CQUFvQjtZQUNsQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7UUFDekIsQ0FBQztRQUdELFlBQVksQ0FBQyxDQUFnQztZQUMzQyxNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDeEUsTUFBTSxFQUFDLEtBQUssRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXJDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN6QixPQUFPO2FB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

});
