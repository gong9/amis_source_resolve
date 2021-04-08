amis.define('src/components/Toast.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Toast
   * @description toast提示组件, 单例模式，App级别只需要一个ToastComponent，引入了多个会兼容，也只有第一个生效
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.toast = exports.ToastMessage = exports.ToastComponent = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Html_1 = tslib_1.__importDefault(require("src/components/Html.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const locale_1 = require("src/locale.tsx");
  const fadeStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in',
      [Transition_1.EXITING]: 'out'
  };
  let toastRef = null;
  const show = (content, title = '', conf = {}, method) => {
      if (!toastRef || !toastRef[method]) {
          return;
      }
      toastRef[method](content, title || '', Object.assign({}, conf));
  };
  let ToastComponent = /** @class */ (() => {
      class ToastComponent extends react_1.default.Component {
          constructor() {
              super(...arguments);
              // 当前ToastComponent是否真正render了
              this.hasRendered = false;
              this.state = {
                  items: []
              };
          }
          componentDidMount() {
              this.hasRendered = true;
              toastRef = this;
          }
          componentWillUnmount() {
              if (this.hasRendered) {
                  toastRef = null;
              }
          }
          notifiy(level, content, title, config) {
              const items = this.state.items.concat();
              items.push(Object.assign(Object.assign({ title: title, body: content, level }, config), { id: helper_1.uuid() }));
              this.setState({
                  items
              });
          }
          success(content, title, config) {
              this.notifiy('success', content, title, config);
          }
          error(content, title, config) {
              this.notifiy('error', content, title, config);
          }
          info(content, title, config) {
              this.notifiy('info', content, title, config);
          }
          warning(content, title, config) {
              this.notifiy('warning', content, title, config);
          }
          handleDismissed(index) {
              const items = this.state.items.concat();
              items.splice(index, 1);
              this.setState({
                  items: items
              });
          }
          render() {
              if (toastRef && !this.hasRendered) {
                  return null;
              }
              const { classnames: cx, className, timeout, position, showIcon, translate, closeButton } = this.props;
              const items = this.state.items;
              return (react_1.default.createElement("div", { className: cx(`Toast-wrap Toast-wrap--${position.replace(/\-(\w)/g, (_, l) => l.toUpperCase())}`, className) }, items.map((item, index) => {
                  var _a, _b;
                  return (react_1.default.createElement(ToastMessage, { classnames: cx, key: item.id, title: item.title, body: item.body, level: item.level || 'info', timeout: (_a = item.timeout) !== null && _a !== void 0 ? _a : timeout, closeButton: (_b = item.closeButton) !== null && _b !== void 0 ? _b : closeButton, onDismiss: this.handleDismissed.bind(this, index), translate: translate, showIcon: showIcon }));
              })));
          }
      }
      ToastComponent.defaultProps = {
          position: 'top-right',
          closeButton: false,
          timeout: 5000
      };
      ToastComponent.themeKey = 'toast';
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, String, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastComponent.prototype, "success", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, String, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastComponent.prototype, "error", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, String, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastComponent.prototype, "info", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, String, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastComponent.prototype, "warning", null);
      return ToastComponent;
  })();
  exports.ToastComponent = ToastComponent;
  exports.default = theme_1.themeable(locale_1.localeable(ToastComponent));
  let ToastMessage = /** @class */ (() => {
      class ToastMessage extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  visible: false
              };
              this.mounted = false;
          }
          componentDidMount() {
              this.mounted = true;
              this.setState({
                  visible: true
              });
          }
          componentWillUnmount() {
              clearTimeout(this.timer);
              this.mounted = false;
          }
          handleMouseEnter() {
              clearTimeout(this.timer);
          }
          handleMouseLeave() {
              this.handleEntered();
          }
          handleEntered() {
              const timeout = this.props.timeout;
              if (this.mounted && timeout) {
                  this.timer = setTimeout(this.close, timeout);
              }
          }
          close() {
              clearTimeout(this.timer);
              this.setState({
                  visible: false
              });
          }
          render() {
              const { onDismiss, classnames: cx, closeButton, title, body, allowHtml, level, showIcon, translate: __ } = this.props;
              return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: this.state.visible, timeout: 750, onEntered: this.handleEntered, onExited: onDismiss }, (status) => {
                  return (react_1.default.createElement("div", { className: cx(`Toast Toast--${level}`, fadeStyles[status]), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave, onClick: closeButton ? helper_1.noop : this.close },
                      closeButton ? (react_1.default.createElement("a", { onClick: this.close, className: cx(`Toast-close`) },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      showIcon === false ? null : (react_1.default.createElement("div", { className: cx('Toast-icon') }, level === 'success' ? (react_1.default.createElement(icons_1.Icon, { icon: "success", className: "icon" })) : level == 'error' ? (react_1.default.createElement(icons_1.Icon, { icon: "fail", className: "icon" })) : level == 'info' ? (react_1.default.createElement(icons_1.Icon, { icon: "info-circle", className: "icon" })) : level == 'warning' ? (react_1.default.createElement(icons_1.Icon, { icon: "warning", className: "icon" })) : null)),
                      title ? (react_1.default.createElement("div", { className: cx('Toast-title') }, __(title))) : null,
                      react_1.default.createElement("div", { className: cx('Toast-body') }, allowHtml ? react_1.default.createElement(Html_1.default, { html: body }) : body)));
              }));
          }
      }
      ToastMessage.defaultProps = {
          timeout: 5000,
          classPrefix: '',
          position: 'top-right',
          allowHtml: true,
          level: 'info'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastMessage.prototype, "handleMouseEnter", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastMessage.prototype, "handleMouseLeave", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastMessage.prototype, "handleEntered", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ToastMessage.prototype, "close", null);
      return ToastMessage;
  })();
  exports.ToastMessage = ToastMessage;
  exports.toast = {
      container: toastRef,
      success: (content, title, conf) => show(content, title, conf, 'success'),
      error: (content, title, conf) => show(content, title, conf, 'error'),
      info: (content, title, conf) => show(content, title, conf, 'info'),
      warning: (content, title, conf) => show(content, title, conf, 'warning')
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9hc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Ub2FzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCx3RkFLMkM7QUFDM0MsMERBQTBCO0FBRTFCLDBEQUEwQjtBQUMxQiw0Q0FBcUQ7QUFDckQsb0NBQXlFO0FBQ3pFLG1DQUE2QjtBQUM3QixzQ0FBK0Q7QUFPL0QsTUFBTSxVQUFVLEdBRVo7SUFDRixDQUFDLHFCQUFRLENBQUMsRUFBRSxJQUFJO0lBQ2hCLENBQUMsb0JBQU8sQ0FBQyxFQUFFLElBQUk7SUFDZixDQUFDLG9CQUFPLENBQUMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7QUFFRixJQUFJLFFBQVEsR0FBUSxJQUFJLENBQUM7QUFDekIsTUFBTSxJQUFJLEdBQUcsQ0FDWCxPQUFlLEVBQ2YsUUFBZ0IsRUFBRSxFQUNsQixPQUFZLEVBQUUsRUFDZCxNQUFjLEVBQ2QsRUFBRTtJQUNGLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDbEMsT0FBTztLQUNSO0lBQ0QsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRSxvQkFBTSxJQUFJLEVBQUUsQ0FBQztBQUNwRCxDQUFDLENBQUM7QUEyQkY7SUFBQSxNQUFhLGNBQWUsU0FBUSxlQUFLLENBQUMsU0FHekM7UUFIRDs7WUFjRSw4QkFBOEI7WUFDOUIsZ0JBQVcsR0FBRyxLQUFLLENBQUM7WUFDcEIsVUFBSyxHQUF3QjtnQkFDM0IsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDO1FBaUdKLENBQUM7UUEvRkMsaUJBQWlCO1lBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUM7WUFDeEIsUUFBUSxHQUFHLElBQUksQ0FBQztRQUNsQixDQUFDO1FBRUQs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

});
