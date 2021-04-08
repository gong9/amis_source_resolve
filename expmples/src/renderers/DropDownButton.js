amis.define('src/renderers/DropDownButton.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DropDownButtonRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const TooltipWrapper_1 = tslib_1.__importDefault(require("src/components/TooltipWrapper.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const icons_1 = require("src/components/icons.tsx");
  let DropDownButton = /** @class */ (() => {
      class DropDownButton extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  isOpened: false
              };
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.toogle = this.toogle.bind(this);
              this.domRef = this.domRef.bind(this);
          }
          componentDidMount() {
              if (this.props.defaultIsOpened) {
                  this.setState({
                      isOpened: true
                  });
              }
          }
          domRef(ref) {
              this.target = ref;
          }
          toogle(e) {
              e.preventDefault();
              this.setState({
                  isOpened: !this.state.isOpened
              });
          }
          open() {
              this.setState({
                  isOpened: true
              });
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          renderOuter() {
              var _a;
              const { render, buttons, data, popOverContainer, classnames: cx, classPrefix: ns, children, align, closeOnClick, closeOnOutside } = this.props;
              let body = (react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: closeOnOutside !== false ? this.close : helper_1.noop },
                  react_1.default.createElement("ul", { className: cx('DropDown-menu'), onClick: closeOnClick ? this.close : helper_1.noop }, children
                      ? children
                      : Array.isArray(buttons)
                          ? buttons.map((button, index) => {
                              if (typeof button !== 'string' && !helper_1.isVisible(button, data)) {
                                  return null;
                              }
                              else if (button === 'divider' || button.type === 'divider') {
                                  return react_1.default.createElement("li", { key: index, className: cx('DropDown-divider') });
                              }
                              return (react_1.default.createElement("li", { key: index, className: helper_1.isDisabled(button, data) ? 'is-disabled' : '' }, render(`button/${index}`, Object.assign(Object.assign({ type: 'button' }, button), { isMenuItem: true }))));
                          })
                          : null)));
              if (popOverContainer) {
                  return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, target: () => this.target, show: true },
                      react_1.default.createElement(PopOver_1.default, { overlay: true, onHide: this.close, classPrefix: ns, className: cx('DropDown-popover'), style: { minWidth: (_a = this.target) === null || _a === void 0 ? void 0 : _a.getBoundingClientRect().width } }, body)));
              }
              return body;
          }
          render() {
              const { tooltip, placement, tooltipContainer, tooltipTrigger, tooltipRootClose, disabledTip, block, disabled, btnDisabled, btnClassName, size, label, level, primary, className, classnames: cx, align, iconOnly, icon, data } = this.props;
              return (react_1.default.createElement("div", { className: cx('DropDown ', {
                      'DropDown--block': block,
                      'DropDown--alignRight': align === 'right',
                      'is-opened': this.state.isOpened
                  }, className), ref: this.domRef },
                  react_1.default.createElement(TooltipWrapper_1.default, { placement: placement, tooltip: disabled ? disabledTip : tooltip, container: tooltipContainer, trigger: tooltipTrigger, rootClose: tooltipRootClose },
                      react_1.default.createElement("button", { onClick: this.toogle, disabled: disabled || btnDisabled, className: cx('Button', btnClassName, typeof level === 'undefined'
                              ? 'Button--default'
                              : level
                                  ? `Button--${level}`
                                  : '', {
                              'Button--block': block,
                              'Button--primary': primary,
                              'Button--iconOnly': iconOnly
                          }, size ? `Button--${size}` : '') },
                          icon ? (typeof icon === 'string' ? (react_1.default.createElement("i", { className: cx(icon, 'm-r-xs') })) : (icon)) : null,
                          typeof label === 'string' ? tpl_1.filter(label, data) : label,
                          react_1.default.createElement("span", { className: cx('DropDown-caret') },
                              react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))),
                  this.state.isOpened ? this.renderOuter() : null));
          }
      }
      DropDownButton.defaultProps = {
          placement: 'top',
          tooltipTrigger: ['hover', 'focus'],
          tooltipRootClose: false
      };
      return DropDownButton;
  })();
  exports.default = DropDownButton;
  let DropDownButtonRenderer = /** @class */ (() => {
      let DropDownButtonRenderer = class DropDownButtonRenderer extends DropDownButton {
      };
      DropDownButtonRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)dropdown-button$/,
              name: 'dropdown-button'
          })
      ], DropDownButtonRenderer);
      return DropDownButtonRenderer;
  })();
  exports.DropDownButtonRenderer = DropDownButtonRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJvcERvd25CdXR0b24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Ryb3BEb3duQnV0dG9uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUNuRCxtREFBZ0Q7QUFDaEQsNEVBQTRDO0FBQzVDLDRFQUE0QztBQUM1QywwRkFBMEQ7QUFFMUQsNENBQTREO0FBQzVELHNDQUFvQztBQUNwQywrQ0FBeUM7QUEyRnpDO0lBQUEsTUFBcUIsY0FBZSxTQUFRLGVBQUssQ0FBQyxTQUdqRDtRQWVDLFlBQVksS0FBMEI7WUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBZmYsVUFBSyxHQUF3QjtnQkFDM0IsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQztZQWVBLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkMsQ0FBQztRQUVELGlCQUFpQjtZQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxlQUFlLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osUUFBUSxFQUFFLElBQUk7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBRUQsTUFBTSxDQUFDLEdBQVE7WUFDYixJQUFJLENBQUMsTUFBTSxHQUFH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

});
