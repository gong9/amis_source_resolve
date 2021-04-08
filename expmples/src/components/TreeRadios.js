amis.define('src/components/TreeRadios.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeRadios = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const ListRadios_1 = require("src/components/ListRadios.tsx");
  const locale_1 = require("src/locale.tsx");
  const icons_1 = require("src/components/icons.tsx");
  let TreeRadios = /** @class */ (() => {
      class TreeRadios extends ListRadios_1.BaseRadios {
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
              const { disabled, classnames: cx, itemClassName, itemRender, showRadio } = this.props;
              const id = indexes.join('-');
              let hasChildren = Array.isArray(option.children) && option.children.length;
              const checked = option === this.selected;
              const expaned = !!~this.state.expanded.indexOf(id);
              return (react_1.default.createElement("div", { key: index, className: cx('TreeRadios-item', disabled || option.disabled || (option.defer && option.loading)
                      ? 'is-disabled'
                      : '', expaned ? 'is-expanded' : '', checked ? 'is-active' : '') },
                  react_1.default.createElement("div", { className: cx('TreeRadios-itemInner', itemClassName, option.className, checked ? 'is-active' : ''), onClick: () => this.toggleOption(option) },
                      hasChildren || option.defer ? (react_1.default.createElement("a", { onClick: (e) => {
                              e.stopPropagation();
                              this.toggleCollapsed(option, id);
                          }, className: cx('Table-expandBtn', expaned ? 'is-active' : '') },
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" }))) : null,
                      react_1.default.createElement("div", { className: cx('TreeRadios-itemLabel') }, itemRender(option)),
                      option.defer && option.loading ? react_1.default.createElement(Spinner_1.default, { show: true, size: "sm" }) : null,
                      (!option.defer || option.loaded) &&
                          option.value !== undefined &&
                          showRadio !== false ? (react_1.default.createElement(Checkbox_1.default, { type: "radio", size: "sm", checked: checked, disabled: disabled || option.disabled })) : null),
                  hasChildren ? (react_1.default.createElement("div", { className: cx('TreeRadios-sublist') }, option.children.map((option, key) => this.renderItem(option, key, indexes.concat(key))))) : null));
          }
          render() {
              const { value, options, className, placeholder, classnames: cx, option2value, translate: __ } = this.props;
              this.selected = ListRadios_1.BaseRadios.resolveSelected(value, options, option2value);
              let body = [];
              if (Array.isArray(options) && options.length) {
                  body = options.map((option, key) => this.renderItem(option, key, [key]));
              }
              return (react_1.default.createElement("div", { className: cx('TreeRadios', className) }, body && body.length ? (body) : (react_1.default.createElement("div", { className: cx('TreeRadios-placeholder') }, __(placeholder)))));
          }
      }
      TreeRadios.defaultProps = Object.assign(Object.assign({}, ListRadios_1.BaseRadios.defaultProps), { expand: 'first' });
      return TreeRadios;
  })();
  exports.TreeRadios = TreeRadios;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(TreeRadios, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZVJhZGlvcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1RyZWVSYWRpb3MudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxvQ0FBbUM7QUFDbkMsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5QyxrRUFBa0M7QUFFbEMsNENBQThEO0FBQzlELGdFQUFnQztBQUNoQyw2Q0FBeUQ7QUFDekQsc0NBQXFDO0FBQ3JDLG1DQUE2QjtBQVU3QjtJQUFBLE1BQWEsVUFBVyxTQUFRLHVCQUE0QztRQUE1RTs7WUFDRSxVQUFLLEdBQW9CO2dCQUN2QixRQUFRLEVBQUUsRUFBRTthQUNiLENBQUM7UUEyS0osQ0FBQztRQXBLQyxpQkFBaUI7WUFDZixJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQTBCO1lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFDRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU07Z0JBQzNCLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUMxRTtnQkFDQSxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7YUFDckI7UUFDSCxDQUFDO1FBRUQsWUFBWTtZQUNWLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFrQixFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLE9B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

});
