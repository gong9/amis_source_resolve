amis.define('src/components/TreeCheckboxes.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const locale_1 = require("src/locale.tsx");
  const icons_1 = require("src/components/icons.tsx");
  let TreeCheckboxes = /** @class */ (() => {
      class TreeCheckboxes extends Checkboxes_1.BaseCheckboxes {
          constructor() {
              super(...arguments);
              this.state = {
                  expanded: []
              };
          }
          componentDidMount() {
              this.syncExpanded();
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (!this.state.expanded.length &&
                  (props.expand !== prevProps.expand || props.options !== prevProps.options)) {
                  this.syncExpanded();
              }
          }
          syncExpanded() {
              const options = this.props.options;
              const mode = this.props.expand;
              const expanded = [];
              if (!Array.isArray(options)) {
                  return;
              }
              if (mode === 'first' || mode === 'root') {
                  options.every((option, index) => {
                      if (Array.isArray(option.children)) {
                          expanded.push(`${index}`);
                          return mode === 'root';
                      }
                      return true;
                  });
              }
              else if (mode === 'all') {
                  helper_1.everyTree(options, (option, index, level, paths, indexes) => {
                      if (Array.isArray(option.children)) {
                          expanded.push(`${indexes.concat(index).join('-')}`);
                      }
                      return true;
                  });
              }
              this.setState({ expanded });
          }
          toggleOption(option) {
              const { value, onChange, option2value, options, onDeferLoad, disabled } = this.props;
              if (disabled || option.disabled) {
                  return;
              }
              else if (option.defer && !option.loaded) {
                  onDeferLoad === null || onDeferLoad === void 0 ? void 0 : onDeferLoad(option);
                  return;
              }
              let valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              if (option.value === void 0 &&
                  Array.isArray(option.children) &&
                  option.children.length) {
                  const someCheckedFn = (child) => (Array.isArray(child.children) && child.children.length
                      ? child.children.some(someCheckedFn)
                      : false) ||
                      (child.value !== void 0 && ~valueArray.indexOf(child));
                  const someChecked = option.children.some(someCheckedFn);
                  const eachFn = (child) => {
                      if (Array.isArray(child.children) && child.children.length) {
                          child.children.forEach(eachFn);
                      }
                      if (child.value !== void 0) {
                          const idx = valueArray.indexOf(child);
                          ~idx && valueArray.splice(idx, 1);
                          if (!someChecked) {
                              valueArray.push(child);
                          }
                      }
                  };
                  option.children.forEach(eachFn);
              }
              else {
                  let idx = valueArray.indexOf(option);
                  if (~idx) {
                      valueArray.splice(idx, 1);
                  }
                  else {
                      valueArray.push(option);
                  }
              }
              let newValue = option2value
                  ? valueArray.map(item => option2value(item))
                  : valueArray;
              onChange && onChange(newValue);
          }
          toggleCollapsed(option, index) {
              const onDeferLoad = this.props.onDeferLoad;
              const expanded = this.state.expanded.concat();
              const idx = expanded.indexOf(index);
              if (~idx) {
                  expanded.splice(idx, 1);
              }
              else {
                  expanded.push(index);
              }
              this.setState({
                  expanded: expanded
              }, option.defer && onDeferLoad ? () => onDeferLoad(option) : undefined);
          }
          renderItem(option, index, indexes = []) {
              const { labelClassName, disabled, classnames: cx, itemClassName, itemRender } = this.props;
              const id = indexes.join('-');
              const valueArray = this.valueArray;
              let partial = false;
              let checked = false;
              let hasChildren = Array.isArray(option.children) && option.children.length;
              if (option.value === void 0 && hasChildren) {
                  let allchecked = true;
                  let partialChecked = false;
                  const eachFn = (child) => {
                      if (Array.isArray(child.children) && child.children.length) {
                          child.children.forEach(eachFn);
                      }
                      if (child.value !== void 0) {
                          const isIn = !!~valueArray.indexOf(child);
                          if (isIn && !partialChecked) {
                              partialChecked = true;
                          }
                          else if (!isIn && allchecked) {
                              allchecked = false;
                          }
                          checked = partialChecked;
                          partial = partialChecked && !allchecked;
                      }
                  };
                  option.children.forEach(eachFn);
              }
              else {
                  checked = !!~valueArray.indexOf(option);
              }
              const expaned = !!~this.state.expanded.indexOf(id);
              return (react_1.default.createElement("div", { key: index, className: cx('TreeCheckboxes-item', disabled || option.disabled || (option.defer && option.loading)
                      ? 'is-disabled'
                      : '', expaned ? 'is-expanded' : '') },
                  react_1.default.createElement("div", { className: cx('TreeCheckboxes-itemInner', itemClassName, option.className), onClick: () => this.toggleOption(option) },
                      hasChildren || option.defer ? (react_1.default.createElement("a", { onClick: (e) => {
                              e.stopPropagation();
                              this.toggleCollapsed(option, id);
                          }, className: cx('Table-expandBtn', expaned ? 'is-active' : '') },
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" }))) : null,
                      react_1.default.createElement("div", { className: cx('TreeCheckboxes-itemLabel') }, itemRender(option)),
                      option.defer && option.loading ? react_1.default.createElement(Spinner_1.default, { show: true, size: "sm" }) : null,
                      !option.defer || option.loaded ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", checked: checked, partial: partial, disabled: disabled || option.disabled, labelClassName: labelClassName, description: option.description })) : null),
                  hasChildren ? (react_1.default.createElement("div", { className: cx('TreeCheckboxes-sublist') }, option.children.map((option, key) => this.renderItem(option, key, indexes.concat(key))))) : null));
          }
          render() {
              const { value, options, className, placeholder, classnames: cx, option2value, translate: __ } = this.props;
              this.valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              let body = [];
              if (Array.isArray(options) && options.length) {
                  body = options.map((option, key) => this.renderItem(option, key, [key]));
              }
              return (react_1.default.createElement("div", { className: cx('TreeCheckboxes', className) }, body && body.length ? (body) : (react_1.default.createElement("div", { className: cx('TreeCheckboxes-placeholder') }, __(placeholder)))));
          }
      }
      TreeCheckboxes.defaultProps = Object.assign(Object.assign({}, Checkboxes_1.BaseCheckboxes.defaultProps), { expand: 'first' });
      return TreeCheckboxes;
  })();
  exports.TreeCheckboxes = TreeCheckboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(TreeCheckboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZUNoZWNrYm94ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9UcmVlQ2hlY2tib3hlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUFpRTtBQUNqRSxvQ0FBbUM7QUFDbkMsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5QyxrRUFBa0M7QUFFbEMsNENBQThEO0FBQzlELGdFQUFnQztBQUNoQyxzQ0FBcUM7QUFDckMsbUNBQTZCO0FBVTdCO0lBQUEsTUFBYSxjQUFlLFNBQVEsMkJBR25DO1FBSEQ7O1lBS0UsVUFBSyxHQUF3QjtnQkFDM0IsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFDO1FBeVFKLENBQUM7UUFsUUMsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxTQUE4QjtZQUMvQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQ0UsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNO2dCQUMzQixDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFDMUU7Z0JBQ0EsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQ3JCO1FBQ0gsQ0FBQztRQUVELFlBQVk7WUFDVixNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUNuQyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUMvQixNQUFNLFFBQVEsR0FBa0IsRUFBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dC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

});
