amis.define('src/components/ContextMenu.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.openContextMenus = exports.ThemedContextMenu = exports.ContextMenu = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const helper_1 = require("src/utils/helper.ts");
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const dom_1 = require("src/utils/dom.tsx");
  const fadeStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in',
      [Transition_1.EXITING]: 'out'
  };
  let ContextMenu = /** @class */ (() => {
      var _a, _b, _c, _d, _e;
      class ContextMenu extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpened: false,
                  menus: [],
                  x: -99999,
                  y: -99999
              };
              this.menuRef = react_1.default.createRef();
          }
          static getInstance() {
              if (!ContextMenu.instance) {
                  const container = document.body;
                  const div = document.createElement('div');
                  container.appendChild(div);
                  react_dom_1.render(react_1.default.createElement(exports.ThemedContextMenu, null), div);
              }
              return ContextMenu.instance;
          }
          componentWillMount() {
              this.originInstance = ContextMenu.instance;
              ContextMenu.instance = this;
          }
          componentDidMount() {
              document.body.addEventListener('click', this.handleOutClick, true);
              document.addEventListener('keydown', this.handleKeyDown);
          }
          componentWillUnmount() {
              ContextMenu.instance = this.originInstance;
              document.body.removeEventListener('click', this.handleOutClick, true);
              document.removeEventListener('keydown', this.handleKeyDown);
              // @ts-ignore
              delete this.originInstance;
          }
          openContextMenus(info, menus, onClose) {
              this.setState({
                  isOpened: true,
                  x: info.x,
                  y: info.y,
                  menus: menus,
                  onClose
              });
          }
          close() {
              const onClose = this.state.onClose;
              this.setState({
                  isOpened: false,
                  x: -99999,
                  y: -99999,
                  menus: []
              }, onClose);
          }
          handleOutClick(e) {
              if (!e.target ||
                  !this.menuRef.current ||
                  this.menuRef.current.contains(e.target)) {
                  return;
              }
              if (this.state.isOpened) {
                  e.preventDefault();
                  this.close();
              }
          }
          handleClick(item) {
              const onClose = this.state.onClose;
              item.disabled ||
                  (Array.isArray(item.children) && item.children.length) ||
                  this.setState({
                      isOpened: false,
                      x: -99999,
                      y: -99999,
                      menus: []
                  }, () => {
                      var _a;
                      (_a = item.onSelect) === null || _a === void 0 ? void 0 : _a.call(item, item.data);
                      onClose === null || onClose === void 0 ? void 0 : onClose();
                  });
          }
          handleKeyDown(e) {
              if (e.keyCode === 27 && this.state.isOpened) {
                  e.preventDefault();
                  this.close();
              }
          }
          handleMouseEnter(item) {
              item.disabled || !item.onHighlight || item.onHighlight(true, item.data);
          }
          handleMouseLeave(item) {
              item.disabled || !item.onHighlight || item.onHighlight(false, item.data);
          }
          handleEnter(menu) {
              // 智能定位，选择一个合适的对齐方式。
              const info = dom_1.calculatePosition('auto', menu.lastChild, menu.children[1], document.body);
              const align = info.positionLeft + 300 < window.innerWidth ? 'right' : 'left';
              this.setState({
                  x: info.positionLeft,
                  y: info.positionTop,
                  align
              });
          }
          handleSelfContextMenu(e) {
              e.preventDefault();
          }
          renderMenus(menus) {
              const { classnames: cx } = this.props;
              return menus.map((item, index) => {
                  if (item === '|') {
                      return react_1.default.createElement("li", { key: index, className: cx('ContextMenu-divider') });
                  }
                  const hasChildren = Array.isArray(item.children) && item.children.length;
                  return (react_1.default.createElement("li", { key: `${item.label}-${index}`, className: cx('ContextMenu-item', item.className, {
                          'has-child': hasChildren,
                          'is-disabled': item.disabled
                      }) },
                      react_1.default.createElement("a", { onClick: this.handleClick.bind(this, item), onMouseEnter: this.handleMouseEnter.bind(this, item), onMouseLeave: this.handleMouseLeave.bind(this, item) },
                          item.icon ? (react_1.default.createElement("span", { className: cx('ContextMenu-itemIcon', item.icon) })) : null,
                          item.label),
                      hasChildren ? (react_1.default.createElement("ul", { className: cx('ContextMenu-subList') }, this.renderMenus(item.children))) : null));
              });
          }
          render() {
              const { className, container, classnames: cx } = this.props;
              return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, onEnter: this.handleEnter, in: this.state.isOpened, timeout: 500 }, (status) => (react_1.default.createElement("div", { ref: this.menuRef, role: "contextmenu", className: cx('ContextMenu', {
                      'ContextMenu--left': this.state.align === 'left'
                  }, className), onContextMenu: this.handleSelfContextMenu },
                  react_1.default.createElement("div", { className: cx(`ContextMenu-overlay`, fadeStyles[status]) }),
                  react_1.default.createElement("div", { className: cx(`ContextMenu-cursor`), style: { left: `${this.state.x}px`, top: `${this.state.y}px` } }),
                  react_1.default.createElement("div", { style: { left: `${this.state.x}px`, top: `${this.state.y}px` }, className: cx(`ContextMenu-menu`, fadeStyles[status]) },
                      react_1.default.createElement("ul", { className: cx('ContextMenu-list') }, this.renderMenus(this.state.menus)))))));
          }
      }
      ContextMenu.instance = null;
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object, Function]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "openContextMenus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Event !== "undefined" && Event) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleOutClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof KeyboardEvent !== "undefined" && KeyboardEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleEnter", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _e : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ContextMenu.prototype, "handleSelfContextMenu", null);
      return ContextMenu;
  })();
  exports.ContextMenu = ContextMenu;
  exports.ThemedContextMenu = theme_1.themeable(ContextMenu);
  exports.default = exports.ThemedContextMenu;
  function openContextMenus(info, menus, onClose) {
      return ContextMenu.getInstance().openContextMenus(info, menus, onClose);
  }
  exports.openContextMenus = openContextMenus;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Db250ZXh0TWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9DQUFpRDtBQUNqRCwwREFBMEI7QUFDMUIseUNBQWlDO0FBQ2pDLDRDQUF5QztBQUN6Qyx3RkFJMkM7QUFFM0Msc0NBQStDO0FBQy9DLE1BQU0sVUFBVSxHQUVaO0lBQ0YsQ0FBQyxxQkFBUSxDQUFDLEVBQUUsSUFBSTtJQUNoQixDQUFDLG9CQUFPLENBQUMsRUFBRSxJQUFJO0lBQ2YsQ0FBQyxvQkFBTyxDQUFDLEVBQUUsS0FBSztDQUNqQixDQUFDO0FBK0JGOztJQUFBLE1BQWEsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUd0QztRQUhEOztZQWdCRSxVQUFLLEdBQXFCO2dCQUN4QixRQUFRLEVBQUUsS0FBSztnQkFDZixLQUFLLEVBQUUsRUFBRTtnQkFDVCxDQUFDLEVBQUUsQ0FBQyxLQUFLO2dCQUNULENBQUMsRUFBRSxDQUFDLEtBQUs7YUFDVixDQUFDO1lBRUYsWUFBTyxHQUFvQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7UUEyTS9ELENBQUM7UUE3TkMsTUFBTSxDQUFDLFdBQVc7WUFDaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3pCLE1BQU0sU0FBUyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUM7Z0JBQ2hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzNCLGtCQUFNLENBQUMsOEJBQUMseUJBQWlCLE9BQUcsRUFBRSxHQUFHLENBQUMsQ0FBQzthQUNwQztZQUVELE9BQU8sV0FBVyxDQUFDLFFBQVEsQ0FBQztRQUM5QixDQUFDO1FB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

});
