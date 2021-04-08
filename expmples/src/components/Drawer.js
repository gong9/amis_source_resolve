amis.define('src/components/Drawer.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Drawer
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Drawer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const icons_1 = require("src/components/icons.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const ModalManager_1 = require("src/components/ModalManager.ts");
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const fadeStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in'
  };
  let Drawer = /** @class */ (() => {
      var _a, _b;
      class Drawer extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.isRootClosed = false;
              this.contentRef = (ref) => (this.contentDom = ref);
              this.handleEnter = () => {
                  document.body.classList.add(`is-modalOpened`);
                  if (document.body.scrollHeight > window.innerHeight) {
                      document.body.classList.add(`has-scrollbar`);
                  }
              };
              this.handleEntered = () => {
                  const onEntered = this.props.onEntered;
                  onEntered && onEntered();
              };
              this.handleExited = () => {
                  var _a, _b;
                  const onExited = this.props.onExited;
                  document.activeElement && ((_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.blur) === null || _b === void 0 ? void 0 : _b.call(_a));
                  onExited && onExited();
                  setTimeout(() => {
                      if (!document.querySelector('.amis-dialog-widget')) {
                          document.body.classList.remove(`is-modalOpened`);
                          document.body.classList.remove(`has-scrollbar`);
                      }
                  }, 200);
              };
              this.modalRef = (ref) => {
                  this.modalDom = ref;
                  if (ref) {
                      ModalManager_1.addModal(this);
                      ref.classList.add(`${this.props.classPrefix}Modal--${ModalManager_1.current()}th`);
                  }
                  else {
                      ModalManager_1.removeModal();
                  }
              };
          }
          componentDidMount() {
              if (this.props.show) {
                  this.handleEntered();
              }
              document.body.addEventListener('click', this.handleRootClickCapture, true);
              document.body.addEventListener('click', this.handleRootClick);
          }
          componentWillUnmount() {
              if (this.props.show) {
                  this.handleExited();
              }
              document.body.removeEventListener('click', this.handleRootClick);
              document.body.removeEventListener('click', this.handleRootClickCapture, true);
          }
          handleRootClickCapture(e) {
              const target = e.target;
              const { closeOnOutside, classPrefix: ns } = this.props;
              const isLeftButton = (e.button === 1 && window.event !== null) || e.button === 0;
              this.isRootClosed = !!(isLeftButton &&
                  closeOnOutside &&
                  target &&
                  this.modalDom &&
                  ((!this.modalDom.contains(target) && !target.closest('[role=dialog]')) ||
                      (target.matches(`.${ns}Drawer-overlay`) &&
                          target.parentElement === this.modalDom))); // 干脆过滤掉来自弹框里面的点击
          }
          handleRootClick(e) {
              const { onHide } = this.props;
              this.isRootClosed && !e.defaultPrevented && onHide(e);
          }
          render() {
              const { classPrefix: ns, className, children, container, show, position, size, onHide, disabled, overlay, bodyClassName } = this.props;
              return (react_1.default.createElement(react_overlays_1.Portal, { container: container },
                  react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 500, onEnter: this.handleEnter, onExited: this.handleExited, onEntered: this.handleEntered }, (status) => {
                      if (status === Transition_1.ENTERING) {
                          // force reflow
                          // 由于从 mount 进来到加上 in 这个 class 估计是时间太短，上次的样式还没应用进去，所以这里强制reflow一把。
                          // 否则看不到动画。
                          this.contentDom.offsetWidth;
                      }
                      return (react_1.default.createElement("div", { ref: this.modalRef, role: "dialog", className: classnames_1.default(`amis-dialog-widget ${ns}Drawer`, {
                              [`${ns}Drawer--${position}`]: position,
                              [`${ns}Drawer--${size}`]: size,
                              [`${ns}Drawer--noOverlay`]: !overlay
                          }, className) },
                          overlay ? (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Drawer-overlay`, fadeStyles[status]) })) : null,
                          react_1.default.createElement("div", { ref: this.contentRef, className: classnames_1.default(`${ns}Drawer-content`, bodyClassName, fadeStyles[status]) },
                              react_1.default.createElement("a", { onClick: disabled ? undefined : onHide, className: `${ns}Drawer-close` },
                                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                              children)));
                  })));
          }
      }
      Drawer.defaultProps = {
          container: document.body,
          position: 'left',
          size: 'md',
          overlay: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Drawer.prototype, "handleRootClickCapture", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof MouseEvent !== "undefined" && MouseEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Drawer.prototype, "handleRootClick", null);
      return Drawer;
  })();
  exports.Drawer = Drawer;
  exports.default = theme_1.themeable(Drawer);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvRHJhd2VyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUMxQix3RkFJMkM7QUFDM0MsbURBQXNDO0FBQ3RDLG1DQUE2QjtBQUM3QixvRUFBNEI7QUFDNUIsaURBQThEO0FBQzlELG9DQUFpRDtBQUNqRCw0Q0FBK0M7QUFzQi9DLE1BQU0sVUFBVSxHQUVaO0lBQ0YsQ0FBQyxxQkFBUSxDQUFDLEVBQUUsSUFBSTtJQUNoQixDQUFDLG9CQUFPLENBQUMsRUFBRSxJQUFJO0NBQ2hCLENBQUM7QUFDRjs7SUFBQSxNQUFhLE1BQU8sU0FBUSxlQUFLLENBQUMsU0FBbUM7UUFBckU7O1lBYUUsaUJBQVksR0FBRyxLQUFLLENBQUM7WUF3QnJCLGVBQVUsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxDQUFDO1lBRW5ELGdCQUFXLEdBQUcsR0FBRyxFQUFFO2dCQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO29CQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzlDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsa0JBQWEsR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUN2QyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDO1lBQ0YsaUJB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

});
