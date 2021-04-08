amis.define('src/components/Tabs.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Tabs
   * @description 选项卡
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Tabs = exports.Tab = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const theme_1 = require("src/theme.tsx");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const icon_1 = require("src/utils/icon.tsx");
  const transitionStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in'
  };
  class TabComponent extends react_1.default.PureComponent {
      constructor() {
          super(...arguments);
          this.contentRef = (ref) => (this.contentDom = ref);
      }
      render() {
          const { classnames: cx, mountOnEnter, reload, unmountOnExit, eventKey, activeKey, children, className } = this.props;
          return (react_1.default.createElement(Transition_1.default, { in: activeKey === eventKey, mountOnEnter: mountOnEnter, unmountOnExit: typeof reload === 'boolean' ? reload : unmountOnExit, timeout: 500 }, (status) => {
              if (status === Transition_1.ENTERING) {
                  this.contentDom.offsetWidth;
              }
              return (react_1.default.createElement("div", { ref: this.contentRef, className: cx(transitionStyles[status], activeKey === eventKey ? 'is-active' : '', 'Tabs-pane', className) }, children));
          }));
      }
  }
  exports.Tab = theme_1.themeable(TabComponent);
  let Tabs = /** @class */ (() => {
      class Tabs extends react_1.default.Component {
          handleSelect(key) {
              const { onSelect } = this.props;
              onSelect && onSelect(key);
          }
          renderNav(child, index) {
              if (!child) {
                  return;
              }
              const { classnames: cx, activeKey: activeKeyProp, mode } = this.props;
              const { eventKey, disabled, icon, iconPosition, title, toolbar } = child.props;
              const activeKey = activeKeyProp === undefined && index === 0 ? eventKey : activeKeyProp;
              const iconElement = icon_1.generateIcon(cx, icon, 'Icon');
              return (react_1.default.createElement("li", { className: cx('Tabs-link', activeKey === eventKey ? 'is-active' : '', disabled ? 'is-disabled' : ''), key: index, onClick: () => (disabled ? '' : this.handleSelect(eventKey)) },
                  react_1.default.createElement("a", null,
                      icon ? (iconPosition === 'right' ? (react_1.default.createElement(react_1.default.Fragment, null,
                          title,
                          " ",
                          iconElement)) : (react_1.default.createElement(react_1.default.Fragment, null,
                          iconElement,
                          " ",
                          title))) : (title),
                      react_1.default.isValidElement(toolbar) ? toolbar : null),
                  mode === 'chrome' ? (react_1.default.createElement("div", { className: "chrome-tab-background" },
                      react_1.default.createElement("svg", { version: "1.1", xmlns: "http://www.w3.org/2000/svg" },
                          react_1.default.createElement("defs", null,
                              react_1.default.createElement("symbol", { id: "chrome-tab-geometry-left", viewBox: "0 0 214 36" },
                                  react_1.default.createElement("path", { d: "M17 0h197v36H0v-2c4.5 0 9-3.5 9-8V8c0-4.5 3.5-8 8-8z" })),
                              react_1.default.createElement("symbol", { id: "chrome-tab-geometry-right", viewBox: "0 0 214 36" },
                                  react_1.default.createElement("use", { href: "#chrome-tab-geometry-left" })),
                              react_1.default.createElement("clipPath", { id: "crop" },
                                  react_1.default.createElement("rect", { className: "mask", width: "100%", height: "100%", x: "0" }))),
                          react_1.default.createElement("svg", { width: "52%", height: "100%" },
                              react_1.default.createElement("use", { href: "#chrome-tab-geometry-left", width: "214", height: "36", className: "chrome-tab-geometry" })),
                          react_1.default.createElement("g", { transform: "scale(-1, 1)" },
                              react_1.default.createElement("svg", { width: "52%", height: "100%", x: "-100%", y: "0" },
                                  react_1.default.createElement("use", { href: "#chrome-tab-geometry-right", width: "214", height: "36", className: "chrome-tab-geometry" })))))) : null));
          }
          renderTab(child, index) {
              if (!child) {
                  return;
              }
              const { activeKey: activeKeyProp, classnames } = this.props;
              const eventKey = child.props.eventKey;
              const activeKey = activeKeyProp === undefined && index === 0 ? eventKey : activeKeyProp;
              return react_1.default.cloneElement(child, Object.assign(Object.assign({}, child.props), { key: index, classnames: classnames, activeKey: activeKey }));
          }
          render() {
              const { classnames: cx, contentClassName, className, mode: dMode, tabsMode, children, additionBtns, toolbar } = this.props;
              if (!Array.isArray(children)) {
                  return null;
              }
              const mode = tabsMode || dMode;
              return (react_1.default.createElement("div", { className: cx(`Tabs`, {
                      [`Tabs--${mode}`]: mode
                  }, className) },
                  react_1.default.createElement("ul", { className: cx('Tabs-links'), role: "tablist" },
                      children.map((tab, index) => this.renderNav(tab, index)),
                      additionBtns,
                      toolbar),
                  react_1.default.createElement("div", { className: cx('Tabs-content', contentClassName) }, children.map((child, index) => {
                      return this.renderTab(child, index);
                  }))));
          }
      }
      Tabs.defaultProps = {
          mode: '',
          contentClassName: ''
      };
      Tabs.Tab = exports.Tab;
      return Tabs;
  })();
  exports.Tabs = Tabs;
  const ThemedTabs = theme_1.themeable(uncontrollable_1.uncontrollable(Tabs, {
      activeKey: 'onSelect'
  }));
  exports.default = ThemedTabs;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1RhYnMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBRTFCLHdGQUFnRjtBQUNoRixvQ0FBK0M7QUFDL0MsbURBQThDO0FBQzlDLHdDQUEyQztBQUUzQyxNQUFNLGdCQUFnQixHQUVsQjtJQUNGLENBQUMscUJBQVEsQ0FBQyxFQUFFLElBQUk7SUFDaEIsQ0FBQyxvQkFBTyxDQUFDLEVBQUUsSUFBSTtDQUNoQixDQUFDO0FBaUJGLE1BQU0sWUFBYSxTQUFRLGVBQUssQ0FBQyxhQUF1QjtJQUF4RDs7UUFFRSxlQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztJQTBDckQsQ0FBQztJQXhDQyxNQUFNO1FBQ0osTUFBTSxFQUNKLFVBQVUsRUFBRSxFQUFFLEVBQ2QsWUFBWSxFQUNaLE1BQU0sRUFDTixhQUFhLEVBQ2IsUUFBUSxFQUNSLFNBQVMsRUFDVCxRQUFRLEVBQ1IsU0FBUyxFQUNWLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVmLE9BQU8sQ0FDTCw4QkFBQyxvQkFBVSxJQUNULEVBQUUsRUFBRSxTQUFTLEtBQUssUUFBUSxFQUMxQixZQUFZLEVBQUUsWUFBWSxFQUMxQixhQUFhLEVBQUUsT0FBTyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLGFBQWEsRUFDbkUsT0FBTyxFQUFFLEdBQUcsSUFFWCxDQUFDLE1BQWMsRUFBRSxFQUFFO1lBQ2xCLElBQUksTUFBTSxLQUFLLHFCQUFRLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO2FBQzdCO1lBQ0QsT0FBTyxDQUNMLHVD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

});
