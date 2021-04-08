amis.define('src/renderers/Drawer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DrawerRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Scoped_1 = require("src/Scoped.tsx");
  const factory_1 = require("src/factory.tsx");
  const Drawer_1 = tslib_1.__importDefault(require("src/components/Drawer.tsx"));
  const findLast_1 = tslib_1.__importDefault(require("node_modules/lodash/findLast"));
  const helper_1 = require("src/utils/helper.ts");
  const mobx_1 = require("node_modules/mobx/lib/index");
  const react_dom_1 = require("node_modules/react-dom/index");
  const modal_1 = require("src/store/modal.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const components_1 = require("src/components/index.tsx");
  let Drawer = /** @class */ (() => {
      class Drawer extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.$$id = helper_1.guid();
              props.store.setEntered(!!props.show);
              this.handleSelfClose = this.handleSelfClose.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleDrawerConfirm = this.handleDrawerConfirm.bind(this);
              this.handleDrawerClose = this.handleDrawerClose.bind(this);
              this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
              this.handleDialogClose = this.handleDialogClose.bind(this);
              this.handleChildFinished = this.handleChildFinished.bind(this);
              this.resizeMouseDown = this.resizeMouseDown.bind(this);
              this.bindResize = this.bindResize.bind(this);
              this.removeResize = this.removeResize.bind(this);
              this.handleEntered = this.handleEntered.bind(this);
              this.handleExisted = this.handleExisted.bind(this);
              this.handleFormInit = this.handleFormInit.bind(this);
              this.handleFormChange = this.handleFormChange.bind(this);
              this.handleFormSaved = this.handleFormSaved.bind(this);
          }
          componentWillMount() {
              const store = this.props.store;
              this.reaction = mobx_1.reaction(() => `${store.loading}${store.error}`, () => this.forceUpdate());
          }
          // shouldComponentUpdate(nextProps:DrawerProps) {
          //     const props = this.props;
          //     if (props.show === nextProps.show && !nextProps.show) {
          //         return false;
          //     }
          //     return isObjectShallowModified(this.props, nextProps);
          // }
          componentWillUnmount() {
              this.reaction && this.reaction();
          }
          buildActions() {
              const { actions, confirm, translate: __ } = this.props;
              if (typeof actions !== 'undefined') {
                  return actions;
              }
              let ret = [];
              ret.push({
                  type: 'button',
                  actionType: 'close',
                  label: __('cancle')
              });
              if (confirm) {
                  ret.push({
                      type: 'button',
                      actionType: 'confirm',
                      label: __('confirm'),
                      primary: true
                  });
              }
              return ret;
          }
          handleSelfClose() {
              const { onClose, store } = this.props;
              // 如果有子弹框，那么就先不隐藏自己
              if (store.dialogOpen !== false || store.drawerOpen !== false) {
                  return;
              }
              // clear error
              store.updateMessage();
              onClose();
          }
          handleAction(e, action, data) {
              const { onClose, onAction } = this.props;
              if (action.actionType === 'close' || action.actionType === 'cancel') {
                  onClose();
              }
              else if (onAction) {
                  onAction(e, action, data);
              }
          }
          handleDrawerConfirm(values, action, ...args) {
              const { store } = this.props;
              if (action.mergeData && values.length === 1 && values[0]) {
                  store.updateData(values[0]);
              }
              const drawerAction = store.action;
              const drawer = drawerAction.drawer;
              if (drawer.onConfirm &&
                  drawer.onConfirm(values, action, ...args) === false) {
                  return;
              }
              store.closeDrawer();
          }
          handleDrawerClose(...args) {
              const { store } = this.props;
              const action = store.action;
              const drawer = action.drawer;
              if (drawer.onClose && drawer.onClose(...args) === false) {
                  return;
              }
              store.closeDrawer();
          }
          handleDialogConfirm(values, action, ...args) {
              const { store } = this.props;
              if (action.mergeData && values.length === 1 && values[0]) {
                  store.updateData(values[0]);
              }
              const dialogAction = store.action;
              const dialog = dialogAction.dialog;
              if (dialog.onConfirm &&
                  dialog.onConfirm(values, action, ...args) === false) {
                  return;
              }
              store.closeDialog();
          }
          handleDialogClose(...args) {
              const { store } = this.props;
              const action = store.action;
              const dialog = action.dialog;
              if (dialog.onClose && dialog.onClose(...args) === false) {
                  return;
              }
              store.closeDialog();
          }
          handleChildFinished(value, action) {
              // 下面会覆盖
          }
          handleFormInit(data) {
              const { store } = this.props;
              store.setFormData(data);
          }
          handleFormChange(data) {
              const { store } = this.props;
              store.setFormData(data);
          }
          handleFormSaved(data, response) {
              const { store } = this.props;
              store.setFormData(Object.assign(Object.assign({}, data), response));
          }
          handleEntered() {
              const { lazySchema, store } = this.props;
              store.setEntered(true);
              if (typeof lazySchema === 'function') {
                  store.setSchema(lazySchema(this.props));
              }
          }
          handleExisted() {
              const store = this.props.store;
              store.reset();
              store.setEntered(false);
          }
          getPopOverContainer() {
              return react_dom_1.findDOMNode(this).querySelector(`.${this.props.classPrefix}Drawer-content`);
          }
          renderBody(body, key) {
              let { render, store } = this.props;
              if (Array.isArray(body)) {
                  return body.map((body, key) => this.renderBody(body, key));
              }
              let schema = body;
              let subProps = {
                  key,
                  disabled: store.loading,
                  onAction: this.handleAction,
                  onFinished: this.handleChildFinished,
                  popOverContainer: this.getPopOverContainer,
                  onChange: this.handleFormChange,
                  onInit: this.handleFormInit,
                  onSaved: this.handleFormSaved
              };
              if (schema.type === 'form') {
                  schema = Object.assign({ mode: 'horizontal', wrapWithPanel: false, submitText: null }, schema);
              }
              return render(`body${key ? `/${key}` : ''}`, schema, subProps);
          }
          renderFooter() {
              const actions = this.buildActions();
              if (!actions || !actions.length) {
                  return null;
              }
              const { store, render, classnames: cx, showErrorMsg } = this.props;
              return (react_1.default.createElement("div", { className: cx('Drawer-footer') },
                  store.loading || store.error ? (react_1.default.createElement("div", { className: cx('Drawer-info') },
                      react_1.default.createElement(components_1.Spinner, { size: "sm", key: "info", show: store.loading }),
                      showErrorMsg && store.error ? (react_1.default.createElement("span", { className: cx('Drawer-error') }, store.msg)) : null)) : null,
                  actions.map((action, key) => render(`action/${key}`, action, {
                      onAction: this.handleAction,
                      data: store.formData,
                      key,
                      disabled: action.disabled || store.loading
                  }))));
          }
          renderResizeCtrl() {
              const { classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('Drawer-resizeCtrl'), onMouseDown: this.resizeMouseDown },
                  react_1.default.createElement("div", { className: cx('Drawer-resizeIcon') }, "\u00B7\u00B7\u00B7")));
          }
          resizeMouseDown(e) {
              const { position, classPrefix: ns, store } = this.props;
              this.drawer = react_dom_1.findDOMNode(this).querySelector(`.${ns}Drawer-content`);
              const resizeCtrl = react_dom_1.findDOMNode(this).querySelector(`.${ns}Drawer-content .${ns}Drawer-resizeCtrl`);
              const drawerWidth = getComputedStyle(this.drawer).width;
              const drawerHeight = getComputedStyle(this.drawer).height;
              store.setResizeCoord((position === 'left' &&
                  e.clientX -
                      resizeCtrl.offsetWidth -
                      parseInt(drawerWidth.substring(0, drawerWidth.length - 2))) ||
                  (position === 'right' &&
                      document.body.offsetWidth -
                          e.clientX -
                          resizeCtrl.offsetWidth -
                          parseInt(drawerWidth.substring(0, drawerWidth.length - 2))) ||
                  (position === 'top' &&
                      e.clientY -
                          resizeCtrl.offsetHeight -
                          parseInt(drawerHeight.substring(0, drawerHeight.length - 2))) ||
                  (position === 'bottom' &&
                      document.body.offsetHeight -
                          e.clientY -
                          resizeCtrl.offsetHeight -
                          parseInt(drawerHeight.substring(0, drawerHeight.length - 2))) ||
                  0);
              document.body.addEventListener('mousemove', this.bindResize);
              document.body.addEventListener('mouseup', this.removeResize);
          }
          bindResize(e) {
              const { position, store } = this.props;
              const maxWH = 'calc(100% - 50px)';
              const drawerStyle = this.drawer.style;
              let wh = (position === 'left' && e.clientX) ||
                  (position === 'right' && document.body.offsetWidth - e.clientX) ||
                  (position === 'top' && e.clientY) ||
                  (position === 'bottom' && document.body.offsetHeight - e.clientY) ||
                  0;
              wh = wh - store.resizeCoord + 'px';
              if (position === 'left' || position === 'right') {
                  drawerStyle.maxWidth = maxWH;
                  drawerStyle.width = wh;
              }
              if (position === 'top' || position === 'bottom') {
                  drawerStyle.maxHeight = maxWH;
                  drawerStyle.height = wh;
              }
          }
          removeResize() {
              document.body.removeEventListener('mousemove', this.bindResize);
              document.body.removeEventListener('mouseup', this.removeResize);
          }
          openFeedback(dialog, ctx) {
              return new Promise(resolve => {
                  const { store } = this.props;
                  store.setCurrentAction({
                      type: 'button',
                      actionType: 'dialog',
                      dialog: dialog
                  });
                  store.openDialog(ctx, undefined, confirmed => {
                      resolve(confirmed);
                  });
              });
          }
          render() {
              const store = this.props.store;
              const { className, size, closeOnEsc, position, title, render, header, body, bodyClassName, show, wrapperComponent, env, resizable, overlay, closeOnOutside, classPrefix: ns, classnames: cx, drawerContainer } = Object.assign(Object.assign({}, this.props), store.schema);
              const Container = wrapperComponent || Drawer_1.default;
              return (react_1.default.createElement(Container, { classPrefix: ns, className: className, size: size, onHide: this.handleSelfClose, disabled: store.loading, show: show, position: position, overlay: overlay, onEntered: this.handleEntered, onExisted: this.handleExisted, closeOnEsc: closeOnEsc, closeOnOutside: !store.drawerOpen && !store.dialogOpen && closeOnOutside, container: drawerContainer
                      ? drawerContainer
                      : env && env.getModalContainer
                          ? env.getModalContainer
                          : undefined },
                  react_1.default.createElement("div", { className: cx('Drawer-header') },
                      title ? (react_1.default.createElement("div", { className: cx('Drawer-title') }, render('title', title, {
                          data: store.formData
                      }))) : null,
                      header
                          ? render('header', header, {
                              data: store.formData
                          })
                          : null),
                  react_1.default.createElement("div", { className: cx('Drawer-body', bodyClassName) }, body ? this.renderBody(body, 'body') : null),
                  this.renderFooter(),
                  body
                      ? render('dialog', Object.assign(Object.assign({}, (store.action &&
                          store.action.dialog)), { type: 'dialog' }), {
                          key: 'dialog',
                          data: store.dialogData,
                          onConfirm: this.handleDialogConfirm,
                          onClose: this.handleDialogClose,
                          onAction: this.handleAction,
                          show: store.dialogOpen
                      })
                      : null,
                  body
                      ? render('drawer', Object.assign(Object.assign({}, (store.action &&
                          store.action.drawer)), { type: 'drawer' }), {
                          key: 'drawer',
                          data: store.drawerData,
                          onConfirm: this.handleDrawerConfirm,
                          onClose: this.handleDrawerClose,
                          onAction: this.handleAction,
                          show: store.drawerOpen
                      })
                      : null,
                  resizable ? this.renderResizeCtrl() : null));
          }
      }
      Drawer.propsList = [
          'title',
          'size',
          'closeOnEsc',
          'children',
          'bodyClassName',
          'confirm',
          'position',
          'onClose',
          'onConfirm',
          'show',
          'resizable',
          'overlay',
          'body',
          'popOverContainer',
          'showErrorMsg'
      ];
      Drawer.defaultProps = {
          title: '',
          bodyClassName: '',
          confirm: true,
          position: 'right',
          resizable: false,
          overlay: true,
          closeOnEsc: false,
          showErrorMsg: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Drawer.prototype, "getPopOverContainer", null);
      return Drawer;
  })();
  exports.default = Drawer;
  let DrawerRenderer = /** @class */ (() => {
      let DrawerRenderer = class DrawerRenderer extends Drawer {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
              super.componentWillMount();
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              super.componentWillUnmount();
          }
          tryChildrenToHandle(action, ctx, rawAction) {
              const scoped = this.context;
              if (action.fromDialog) {
                  return false;
              }
              const components = scoped.getComponents();
              const targets = [];
              const { onConfirm, store } = this.props;
              if (action.target) {
                  targets.push(...action.target
                      .split(',')
                      .map(name => scoped.getComponentByName(name))
                      .filter(item => item && item.doAction));
              }
              if (!targets.length) {
                  const page = findLast_1.default(components, component => component.props.type === 'page');
                  if (page) {
                      components.push(...page.context.getComponents());
                  }
                  const form = findLast_1.default(components, component => component.props.type === 'form');
                  form && targets.push(form);
                  const crud = findLast_1.default(components, component => component.props.type === 'crud');
                  crud && targets.push(crud);
              }
              if (targets.length) {
                  store.markBusying(true);
                  store.updateMessage();
                  Promise.all(targets.map(target => target.doAction(Object.assign(Object.assign({}, action), { from: this.$$id }), ctx, true)))
                      .then(values => {
                      if ((action.type === 'submit' ||
                          action.actionType === 'submit' ||
                          action.actionType === 'confirm') &&
                          action.close !== false) {
                          onConfirm && onConfirm(values, rawAction || action, ctx, targets);
                      }
                      else if (action.close) {
                          action.close === true
                              ? this.handleSelfClose()
                              : this.closeTarget(action.close);
                      }
                      store.markBusying(false);
                  })
                      .catch(reason => {
                      store.updateMessage(reason.message, true);
                      store.markBusying(false);
                  });
                  return true;
              }
              return false;
          }
          handleAction(e, action, data, throwErrors = false, delegate) {
              const { onClose, onAction, store, env } = this.props;
              if (action.from === this.$$id) {
                  return onAction
                      ? onAction(e, action, data, throwErrors, delegate || this.context)
                      : false;
              }
              const scoped = this.context;
              if (action.actionType === 'close' || action.actionType === 'cancel') {
                  store.setCurrentAction(action);
                  onClose();
                  action.close && this.closeTarget(action.close);
              }
              else if (action.actionType === 'confirm') {
                  store.setCurrentAction(action);
                  this.tryChildrenToHandle(action, data) || onClose();
              }
              else if (action.actionType === 'drawer') {
                  store.setCurrentAction(action);
                  store.openDrawer(data);
              }
              else if (action.actionType === 'dialog') {
                  store.setCurrentAction(action);
                  store.openDialog(data);
              }
              else if (action.actionType === 'reload') {
                  store.setCurrentAction(action);
                  action.target && scoped.reload(action.target, data);
                  if (action.close) {
                      this.handleSelfClose();
                      this.closeTarget(action.close);
                  }
              }
              else if (this.tryChildrenToHandle(action, data)) {
                  // do nothing
              }
              else if (action.actionType === 'ajax') {
                  store.setCurrentAction(action);
                  store
                      .saveRemote(action.api, data, {
                      successMessage: action.messages && action.messages.success,
                      errorMessage: action.messages && action.messages.failed
                  })
                      .then(async () => {
                      if (action.feedback && helper_1.isVisible(action.feedback, store.data)) {
                          await this.openFeedback(action.feedback, store.data);
                      }
                      const redirect = action.redirect && tpl_1.filter(action.redirect, store.data);
                      redirect && env.jumpTo(redirect, action);
                      action.reload && this.reloadTarget(action.reload, store.data);
                      if (action.close) {
                          this.handleSelfClose();
                          this.closeTarget(action.close);
                      }
                  })
                      .catch(() => { });
              }
              else if (onAction) {
                  let ret = onAction(e, action, data, throwErrors, delegate || this.context);
                  action.close &&
                      (ret && ret.then
                          ? ret.then(this.handleSelfClose)
                          : setTimeout(this.handleSelfClose, 200));
              }
          }
          handleChildFinished(value, action) {
              if ((action && action.from === this.$$id) || action.close === false) {
                  return;
              }
              const scoped = this.context;
              const components = scoped
                  .getComponents()
                  .filter((item) => !~['drawer', 'dialog'].indexOf(item.props.type));
              const onConfirm = this.props.onConfirm;
              if (components.length === 1 &&
                  (components[0].props.type === 'form' ||
                      components[0].props.type === 'wizard')) {
                  onConfirm([value], action, {}, components);
              }
          }
          handleDialogConfirm(values, action, ...rest) {
              super.handleDialogConfirm(values, action, ...rest);
              const scoped = this.context;
              const store = this.props.store;
              const dialogAction = store.action;
              if (dialogAction.reload) {
                  scoped.reload(dialogAction.reload, store.data);
              }
              else if (action.reload) {
                  scoped.reload(action.reload, store.data);
              }
              else {
                  // 没有设置，则自动让页面中 crud 刷新。
                  scoped
                      .getComponents()
                      .filter((item) => item.props.type === 'crud')
                      .forEach((item) => item.reload && item.reload());
              }
          }
          handleDrawerConfirm(values, action, ...rest) {
              super.handleDrawerConfirm(values, action);
              const scoped = this.context;
              const store = this.props.store;
              const drawerAction = store.action;
              // 稍等会，等动画结束。
              setTimeout(() => {
                  if (drawerAction.reload) {
                      scoped.reload(drawerAction.reload, store.data);
                  }
                  else if (action.reload) {
                      scoped.reload(action.reload, store.data);
                  }
                  else {
                      // 没有设置，则自动让页面中 crud 刷新。
                      scoped
                          .getComponents()
                          .filter((item) => item.props.type === 'crud')
                          .forEach((item) => item.reload && item.reload());
                  }
              }, 300);
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
          closeTarget(target) {
              const scoped = this.context;
              scoped.close(target);
          }
      };
      DrawerRenderer.contextType = Scoped_1.ScopedContext;
      DrawerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)drawer$/,
              storeType: modal_1.ModalStore.name,
              storeExtendsData: false,
              name: 'drawer',
              isolateScope: true,
              shouldSyncSuperStore: (store, props) => store.drawerOpen || props.show
          })
      ], DrawerRenderer);
      return DrawerRenderer;
  })();
  exports.DrawerRenderer = DrawerRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRHJhd2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9EcmF3ZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsc0NBQXdEO0FBQ3hELHdDQUFtRDtBQUVuRCwwRUFBZ0U7QUFDaEUsdUVBQXVDO0FBQ3ZDLDRDQUEwRDtBQUMxRCwrQkFBOEI7QUFDOUIseUNBQXNDO0FBQ3RDLDBDQUF1RDtBQUN2RCxzQ0FBb0M7QUFDcEMsOENBQXNDO0FBb0h0QztJQUFBLE1BQXFCLE1BQU8sU0FBUSxlQUFLLENBQUMsU0FBc0I7UUFnQzlELFlBQVksS0FBa0I7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBSGYsU0FBSSxHQUFXLGFBQUksRUFBRSxDQUFDO1lBS3BCLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDekQsQ0FBQztRQUVELGtCQUFrQjtZQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLGVBQVEsQ0FDdEIsR0FBRyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFDdEMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUN6QixDQUFDO1FBQ0osQ0FBQztRQUVELGlEQUFpRDtRQUNqRCxnQ0FBZ0M7UUFFaEMsOERBQThEO1FBQzlELHdCQUF3QjtRQUN4QixRQUFRO1FBRVIsNkRBQTZEO1FBQzdELElBQUk7UUFFSixvQkFBb0I7WUFDbEIsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVELFlBQVk7WUFDVixNQUFNLEVBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVyRCxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtnQkFDbEMsT0FBTyxPQUFPLENBQUM7YUFDaEI7WUFFRCxJQUFJLEdBQUcsR0FBd0IsRUFBRSxDQUFDO1lBQ2xDLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ1AsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsVUFBVSxFQUFFLE9BQU87Z0JBQ25CLEtBQUssRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDO2FBQ3BCLENBQUMsQ0FBQztZQUVILElBQUksT0FBTyxFQUFFO2dCQUNYLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBQ1AsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsVUFBVSxFQUFFLFNBQVM7b0JBQ3JCLEtBQUssRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDO29CQUNwQixPQUFPLEVBQUUsSUFBSTtpQkFDZCxDQUFDLENBQUM7YUFDSjtZQUVELE9BQU8sR0FBRyxDQUFDO1FBQ2IsQ0FBQztRQUVELGVBQWU7WUFDYixNQUFNLEVBQUMsT0FBTyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEMsbUJBQW1CO1lBQ25CLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7Z0JBQzVELE9BQU87YUFDUjtZQUVELGNBQWM7WUFDZCxLQUFLLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDdEIsT0FBTyxFQUFFLENBQUM7UUFDWixDQUFDO1FBRUQsWUFBWSxDQUFDLENBQXFCLEVBQUUsTUFBYyxFQUFFLElBQVk7WUFDOUQsTUFBTSxFQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3ZDLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7Z0JBQ25FLE9BQU8sRUFBRSxDQUFDO2FBQ1g7aUJBQU0sSUFBSSxRQUFRLEVBQUU7Z0JBQ25CLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNCO1FBQ0gsQ0FBQztRQUVELG1CQUFtQixDQUFDLE1BQWdCLEVBQUUsTUFBYyxFQUFFLEdBQUcsSUFBZ0I7WUFDdkUsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFM0IsSUFBSSxNQUFNLENBQUMsU0FBUyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDeEQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUM3QjtZQUVELE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFnQixDQUFDO1lBQzVDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxNQUFhLENBQUM7WUFFMUMsSUFDRSxNQUFNLENBQUMsU0FBUztnQkFDaEIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssS0FBSyxFQUNuRDtnQkFDQSxPQUFPO2FBQ1I7WUFFRCxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDdEIsQ0FBQztRQUVELGlCQUFpQixDQUFDLEdBQUcsSUFBZ0I7WUFDbkMsTUFBTSxFQUFDLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFM0IsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQWdCLENBQUM7WUFDdEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQWEsQ0FBQztZQUVwQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssRUFBRTtnQkFDdkQsT0FBTzthQUNSO1lBRUQsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxtQkFBbUIsQ0FBQyxNQUFnQixFQUFFLE1BQWMsRUFBRSxHQUFHLElBQWdCO1lBQ3ZFLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLElBQUksTUFBTSxDQUFDLFNBQVMsSUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQ3hELEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7WUFFRCxNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBZ0IsQ0FBQztZQUM1QyxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsTUFBYSxDQUFDO1lBRTFDLElBQ0UsTUFBTSxDQUFDLFNBQVM7Z0JBQ2hCLE1BQU0sQ0FBQyxTQUFTLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEtBQUssRUFDbkQ7Z0JBQ0EsT0FBTzthQUNSO1lBRUQsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3RCLENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxHQUFHLElBQWdCO1lBQ25DLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFnQixDQUFDO1lBQ3RDLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFhLENBQUM7WUFFcEMsSUFBSSxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3ZELE9BQU87YUFDUjtZQUVELEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQsbUJBQW1CLENBQUMsS0FBVSxFQUFFLE1BQWM7WUFDNUMsUUFBUTtRQUNWLENBQUM7UUFFRCxjQUFjLENBQUMsSUFBUztZQUN0QixNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzQixLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFFRCxnQkFBZ0IsQ0FBQyxJQUFTO1lBQ3hCLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDMUIsQ0FBQztRQUVELGVBQWUsQ0FBQyxJQUFTLEVBQUUsUUFBYTtZQUN0QyxNQUFNLEVBQUMsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzQixLQUFLLENBQUMsV0FBVyxpQ0FDWixJQUFJLEdBQ0osUUFBUSxFQUNYLENBQUM7UUFDTCxDQUFDO1FBRUQsYUFBYTtZQUNYLE1BQU0sRUFBQyxVQUFVLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV2QyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZCLElBQUksT0FBTyxVQUFVLEtBQUssVUFBVSxFQUFFO2dCQUNwQyxLQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN6QztRQUNILENBQUM7UUFFRCxhQUFhO1lBQ1gsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDL0IsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2QsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMxQixDQUFDO1FBR0QsbUJBQW1CO1lBQ2pCLE9BQVEsdUJBQVcsQ0FBQyxJQUFJLENBQWlCLENBQUMsYUFBYSxDQUNyRCxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxnQkFBZ0IsQ0FDM0MsQ0FBQztRQUNKLENBQUM7UUFFRCxVQUFVLENBQUMsSUFBZ0IsRUFBRSxHQUFTO1lBQ3BDLElBQUksRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVqQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZCLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDNUQ7WUFFRCxJQUFJLE1BQU0sR0FBVyxJQUFjLENBQUM7WUFDcEMsSUFBSSxRQUFRLEdBQVE7Z0JBQ2xCLEdBQUc7Z0JBQ0gsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPO2dCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVk7Z0JBQzNCLFVBQVUsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUNwQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsbUJBQW1CO2dCQUMxQyxRQUFRLEVBQUUsSUFBSSxDQUFDLGdCQUFnQjtnQkFDL0IsTUFBTSxFQUFFLElBQUksQ0FBQyxjQUFjO2dCQUMzQixPQUFPLEVBQUUsSUFBSSxDQUFDLGVBQWU7YUFDOUIsQ0FBQztZQUVGLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLE1BQU0sbUJBQ0osSUFBSSxFQUFFLFlBQVksRUFDbEIsYUFBYSxFQUFFLEtBQUssRUFDcEIsVUFBVSxFQUFFLElBQUksSUFDYixNQUFNLENBQ1YsQ0FBQzthQUNIO1lBRUQsT0FBTyxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNqRSxDQUFDO1FBRUQsWUFBWTtZQUNWLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVwQyxJQUFJLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDL0IsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELE1BQU0sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVqRSxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQ2hDLEtBQUssQ0FBQyxPQUFPLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDOUIsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUM7b0JBQy9CLDhCQUFDLG9CQUFPLElBQUMsSUFBSSxFQUFDLElBQUksRUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxHQUFJO29CQUNwRCxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDN0Isd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxjQUFjLENBQUMsSUFBRyxLQUFLLENBQUMsR0FBRyxDQUFRLENBQ3hELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDSixDQUNQLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUMzQixNQUFNLENBQUMsVUFBVSxHQUFHLEVBQUUsRUFBRSxNQUFNLEVBQUU7b0JBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFDM0IsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUNwQixHQUFHO29CQUNILFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPO2lCQUMzQyxDQUFDLENBQ0gsQ0FDRyxDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsZ0JBQWdCO1lBQ2QsTUFBTSxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXBDLE9BQU8sQ0FDTCx1Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQ2xDLFdBQVcsRUFBRSxJQUFJLENBQUMsZUFBZTtnQkFFakMsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyx5QkFBVyxDQUM5QyxDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsZUFBZSxDQUFDLENBQXdCO1lBQ3RDLE1BQU0sRUFBQyxRQUFRLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXRELElBQUksQ0FBQyxNQUFNLEdBQUksdUJBQVcsQ0FBQyxJQUFJLENBQWlCLENBQUMsYUFBYSxDQUM1RCxJQUFJLEVBQUUsZ0JBQWdCLENBQ1IsQ0FBQztZQUNqQixNQUFNLFVBQVUsR0FBSSx1QkFBVyxDQUFDLElBQUksQ0FBaUIsQ0FBQyxhQUFhLENBQ2pFLElBQUksRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FDaEMsQ0FBQztZQUNqQixNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsS0FBZSxDQUFDO1lBQ2xFLE1BQU0sWUFBWSxHQUFHLGdCQUFnQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxNQUFnQixDQUFDO1lBRXBFLEtBQUssQ0FBQyxjQUFjLENBQ2xCLENBQUMsUUFBUSxLQUFLLE1BQU07Z0JBQ2xCLENBQUMsQ0FBQyxPQUFPO29CQUNQLFVBQVUsQ0FBQyxXQUFXO29CQUN0QixRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxDQUFDLFFBQVEsS0FBSyxPQUFPO29CQUNuQixRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVc7d0JBQ3ZCLENBQUMsQ0FBQyxPQUFPO3dCQUNULFVBQVUsQ0FBQyxXQUFXO3dCQUN0QixRQUFRLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsV0FBVyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvRCxDQUFDLFFBQVEsS0FBSyxLQUFLO29CQUNqQixDQUFDLENBQUMsT0FBTzt3QkFDUCxVQUFVLENBQUMsWUFBWTt3QkFDdkIsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsQ0FBQyxRQUFRLEtBQUssUUFBUTtvQkFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZO3dCQUN4QixDQUFDLENBQUMsT0FBTzt3QkFDVCxVQUFVLENBQUMsWUFBWTt3QkFDdkIsUUFBUSxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDakUsQ0FBQyxDQUNKLENBQUM7WUFFRixRQUFRLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDN0QsUUFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQy9ELENBQUM7UUFFRCxVQUFVLENBQUMsQ0FBTTtZQUNmLE1BQU0sRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyQyxNQUFNLEtBQUssR0FBRyxtQkFBbUIsQ0FBQztZQUNsQyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQztZQUN0QyxJQUFJLEVBQUUsR0FDSixDQUFDLFFBQVEsS0FBSyxNQUFNLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDbEMsQ0FBQyxRQUFRLEtBQUssT0FBTyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUM7Z0JBQy9ELENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDO2dCQUNqQyxDQUFDLFFBQVEsS0FBSyxRQUFRLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDakUsQ0FBQyxDQUFDO1lBQ0osRUFBRSxHQUFHLEVBQUUsR0FBRyxLQUFLLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQztZQUVuQyxJQUFJLFFBQVEsS0FBSyxNQUFNLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTtnQkFDL0MsV0FBVyxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7Z0JBQzdCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ3hCO1lBRUQsSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQy9DLFdBQVcsQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDO2dCQUM5QixXQUFXLENBQUMsTUFBTSxHQUFHLEVBQUUsQ0FBQzthQUN6QjtRQUNILENBQUM7UUFDRCxZQUFZO1lBQ1YsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNsRSxDQUFDO1FBRUQsWUFBWSxDQUFDLE1BQVcsRUFBRSxHQUFRO1lBQ2hDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7Z0JBQzNCLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUMzQixLQUFLLENBQUMsZ0JBQWdCLENBQUM7b0JBQ3JCLElBQUksRUFBRSxRQUFRO29CQUNkLFVBQVUsRUFBRSxRQUFRO29CQUNwQixNQUFNLEVBQUUsTUFBTTtpQkFDZixDQUFDLENBQUM7Z0JBQ0gsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxFQUFFO29CQUMzQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JCLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQy9CLE1BQU0sRUFDSixTQUFTLEVBQ1QsSUFBSSxFQUNKLFVBQVUsRUFDVixRQUFRLEVBQ1IsS0FBSyxFQUNMLE1BQU0sRUFDTixNQUFNLEVBQ04sSUFBSSxFQUNKLGFBQWEsRUFDYixJQUFJLEVBQ0osZ0JBQWdCLEVBQ2hCLEdBQUcsRUFDSCxTQUFTLEVBQ1QsT0FBTyxFQUNQLGNBQWMsRUFDZCxXQUFXLEVBQUUsRUFBRSxFQUNmLFVBQVUsRUFBRSxFQUFFLEVBQ2QsZUFBZSxFQUNoQixHQUFHLGdDQUNDLElBQUksQ0FBQyxLQUFLLEdBQ1YsS0FBSyxDQUFDLE1BQU0sQ0FDVCxDQUFDO1lBRVQsTUFBTSxTQUFTLEdBQUcsZ0JBQWdCLElBQUksZ0JBQWUsQ0FBQztZQUV0RCxPQUFPLENBQ0wsOEJBQUMsU0FBUyxJQUNSLFdBQVcsRUFBRSxFQUFFLEVBQ2YsU0FBUyxFQUFFLFNBQVMsRUFDcEIsSUFBSSxFQUFFLElBQUksRUFDVixNQUFNLEVBQUUsSUFBSSxDQUFDLGVBQWUsRUFDNUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLEVBQ3ZCLElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQzdCLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxFQUM3QixVQUFVLEVBQUUsVUFBVSxFQUN0QixjQUFjLEVBQ1osQ0FBQyxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsSUFBSSxjQUFjLEVBRTFELFNBQVMsRUFDUCxlQUFlO29CQUNiLENBQUMsQ0FBQyxlQUFlO29CQUNqQixDQUFDLENBQUMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUI7d0JBQzlCLENBQUMsQ0FBQyxHQUFHLENBQUMsaUJBQWlCO3dCQUN2QixDQUFDLENBQUMsU0FBUztnQkFHZix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDaEMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNQLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDLElBQy9CLE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO3dCQUN0QixJQUFJLEVBQUUsS0FBSyxDQUFDLFFBQVE7cUJBQ3JCLENBQUMsQ0FDRSxDQUNQLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ1AsTUFBTTt3QkFDTCxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUU7NEJBQ3ZCLElBQUksRUFBRSxLQUFLLENBQUMsUUFBUTt5QkFDckIsQ0FBQzt3QkFDSixDQUFDLENBQUMsSUFBSSxDQUNKO2dCQUVOLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxJQUM3QyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3hDO2dCQUVMLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBRW5CLElBQUk7b0JBQ0gsQ0FBQyxDQUFDLE1BQU0sQ0FDSixRQUFRLGtDQUVILENBQUUsS0FBSyxDQUFDLE1BQWlCO3dCQUN4QixLQUFLLENBQUMsTUFBaUIsQ0FBQyxNQUFpQixDQUFDLEtBQzlDLElBQUksRUFBRSxRQUFRLEtBRWhCO3dCQUNFLEdBQUcsRUFBRSxRQUFRO3dCQUNiLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVTt3QkFDdEIsU0FBUyxFQUFFLElBQUksQ0FBQyxtQkFBbUI7d0JBQ25DLE9BQU8sRUFBRSxJQUFJLENBQUMsaUJBQWlCO3dCQUMvQixRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVk7d0JBQzNCLElBQUksRUFBRSxLQUFLLENBQUMsVUFBVTtxQkFDdkIsQ0FDRjtvQkFDSCxDQUFDLENBQUMsSUFBSTtnQkFFUCxJQUFJO29CQUNILENBQUMsQ0FBQyxNQUFNLENBQ0osUUFBUSxrQ0FFSCxDQUFFLEtBQUssQ0FBQyxNQUFpQjt3QkFDeEIsS0FBSyxDQUFDLE1BQWlCLENBQUMsTUFBaUIsQ0FBQyxLQUM5QyxJQUFJLEVBQUUsUUFBUSxLQUVoQjt3QkFDRSxHQUFHLEVBQUUsUUFBUTt3QkFDYixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVU7d0JBQ3RCLFNBQVMsRUFBRSxJQUFJLENBQUMsbUJBQW1CO3dCQUNuQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjt3QkFDL0IsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZO3dCQUMzQixJQUFJLEVBQUUsS0FBSyxDQUFDLFVBQVU7cUJBQ3ZCLENBQ0Y7b0JBQ0gsQ0FBQyxDQUFDLElBQUk7Z0JBRVAsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNqQyxDQUNiLENBQUM7UUFDSixDQUFDOztJQXZmTSxnQkFBUyxHQUFrQjtRQUNoQyxPQUFPO1FBQ1AsTUFBTTtRQUNOLFlBQVk7UUFDWixVQUFVO1FBQ1YsZUFBZTtRQUNmLFNBQVM7UUFDVCxVQUFVO1FBQ1YsU0FBUztRQUNULFdBQVc7UUFDWCxNQUFNO1FBQ04sV0FBVztRQUNYLFNBQVM7UUFDVCxNQUFNO1FBQ04sa0JBQWtCO1FBQ2xCLGNBQWM7S0FDZixDQUFDO0lBQ0ssbUJBQVksR0FBeUI7UUFDMUMsS0FBSyxFQUFFLEVBQUU7UUFDVCxhQUFhLEVBQUUsRUFBRTtRQUNqQixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxPQUFPO1FBQ2pCLFNBQVMsRUFBRSxLQUFLO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO1FBQ2IsVUFBVSxFQUFFLEtBQUs7UUFDakIsWUFBWSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQTJNRjtRQURDLGlCQUFROzs7O3FEQUtSO0lBK1FILGFBQUM7S0FBQTtrQkF6Zm9CLE1BQU07QUFvZ0IzQjtJQUFBLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxNQUFNO1FBR3hDLGtCQUFrQjtZQUNoQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBeUIsQ0FBQztZQUM5QyxNQUFNLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0IsS0FBSyxDQUFDLGtCQUFrQixFQUFFLENBQUM7UUFDN0IsQ0FBQztRQUVELG9CQUFvQjtZQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBeUIsQ0FBQztZQUM5QyxNQUFNLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsS0FBSyxDQUFDLG9CQUFvQixFQUFFLENBQUM7UUFDL0IsQ0FBQztRQUVELG1CQUFtQixDQUFDLE1BQWMsRUFBRSxHQUFXLEVBQUUsU0FBa0I7WUFDakUsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQXlCLENBQUM7WUFFOUMsSUFBSSxNQUFNLENBQUMsVUFBVSxFQUFFO2dCQUNyQixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQzFDLE1BQU0sT0FBTyxHQUFlLEVBQUUsQ0FBQztZQUMvQixNQUFNLEVBQUMsU0FBUyxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFdEMsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixPQUFPLENBQUMsSUFBSSxDQUNWLEdBQUcsTUFBTSxDQUFDLE1BQU07cUJBQ2IsS0FBSyxDQUFDLEdBQUcsQ0FBQztxQkFDVixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7cUJBQzVDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQ3pDLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNuQixNQUFNLElBQUksR0FBRyxrQkFBUSxDQUNuQixVQUFVLEVBQ1YsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQzdDLENBQUM7Z0JBRUYsSUFBSSxJQUFJLEVBQUU7b0JBQ1IsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQztpQkFDbEQ7Z0JBRUQsTUFBTSxJQUFJLEdBQUcsa0JBQVEsQ0FDbkIsVUFBVSxFQUNWLFNBQVMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxDQUM3QyxDQUFDO2dCQUNGLElBQUksSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUUzQixNQUFNLElBQUksR0FBRyxrQkFBUSxDQUNuQixVQUFVLEVBQ1YsU0FBUyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLENBQzdDLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDNUI7WUFFRCxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2xCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxhQUFhLEVBQUUsQ0FBQztnQkFFdEIsT0FBTyxDQUFDLEdBQUcsQ0FDVCxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQ25CLE1BQU0sQ0FBQyxRQUFRLGlDQUVSLE1BQU0sS0FDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksS0FFakIsR0FBRyxFQUNILElBQUksQ0FDTCxDQUNGLENBQ0Y7cUJBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUNiLElBQ0UsQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQ3ZCLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUTt3QkFDOUIsTUFBTSxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUM7d0JBQ2xDLE1BQU0sQ0FBQyxLQUFLLEtBQUssS0FBSyxFQUN0Qjt3QkFDQSxTQUFTLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRSxTQUFTLElBQUksTUFBTSxFQUFFLEdBQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztxQkFDbkU7eUJBQU0sSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO3dCQUN2QixNQUFNLENBQUMsS0FBSyxLQUFLLElBQUk7NEJBQ25CLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFOzRCQUN4QixDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7cUJBQ3BDO29CQUNELEtBQUssQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNCLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQ2QsS0FBSyxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUMxQyxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQixDQUFDLENBQUMsQ0FBQztnQkFFTCxPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsT0FBTyxLQUFLLENBQUM7UUFDZixDQUFDO1FBRUQsWUFBWSxDQUNWLENBQXFCLEVBQ3JCLE1BQWMsRUFDZCxJQUFZLEVBQ1osY0FBdUIsS0FBSyxFQUM1QixRQUF5QjtZQUV6QixNQUFNLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVuRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDN0IsT0FBTyxRQUFRO29CQUNiLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsV0FBVyxFQUFFLFFBQVEsSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUNsRSxDQUFDLENBQUMsS0FBSyxDQUFDO2FBQ1g7WUFFRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBeUIsQ0FBQztZQUU5QyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssT0FBTyxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO2dCQUNuRSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLE9BQU8sRUFBRSxDQUFDO2dCQUNWLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDaEQ7aUJBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFNBQVMsRUFBRTtnQkFDMUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJLE9BQU8sRUFBRSxDQUFDO2FBQ3JEO2lCQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3pDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QjtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssUUFBUSxFQUFFO2dCQUN6QyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQy9CLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDeEI7aUJBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLFFBQVEsRUFBRTtnQkFDekMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMvQixNQUFNLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxNQUFNLENBQUMsS0FBSyxFQUFFO29CQUNoQixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3ZCLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO2lCQUNoQzthQUNGO2lCQUFNLElBQUksSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDakQsYUFBYTthQUNkO2lCQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLEVBQUU7Z0JBQ3ZDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFDL0IsS0FBSztxQkFDRixVQUFVLENBQUMsTUFBTSxDQUFDLEdBQWEsRUFBRSxJQUFJLEVBQUU7b0JBQ3RDLGNBQWMsRUFBRSxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsT0FBTztvQkFDMUQsWUFBWSxFQUFFLE1BQU0sQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxNQUFNO2lCQUN4RCxDQUFDO3FCQUNELElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtvQkFDZixJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksa0JBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTt3QkFDN0QsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3FCQUN0RDtvQkFFRCxNQUFNLFFBQVEsR0FDWixNQUFNLENBQUMsUUFBUSxJQUFJLFlBQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDekQsUUFBUSxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO29CQUN6QyxNQUFNLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTt3QkFDaEIsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO3dCQUN2QixJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztxQkFDaEM7Z0JBQ0gsQ0FBQyxDQUFDO3FCQUNELEtBQUssQ0FBQyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUMsQ0FBQzthQUNwQjtpQkFBTSxJQUFJLFFBQVEsRUFBRTtnQkFDbkIsSUFBSSxHQUFHLEdBQUcsUUFBUSxDQUNoQixDQUFDLEVBQ0QsTUFBTSxFQUNOLElBQUksRUFDSixXQUFXLEVBQ1gsUUFBUSxJQUFJLElBQUksQ0FBQyxPQUFPLENBQ3pCLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLEtBQUs7b0JBQ1YsQ0FBQyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUk7d0JBQ2QsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQzt3QkFDaEMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDOUM7UUFDSCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsS0FBVSxFQUFFLE1BQWM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxNQUFNLENBQUMsS0FBSyxLQUFLLEtBQUssRUFBRTtnQkFDbkUsT0FBTzthQUNSO1lBRUQsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQXlCLENBQUM7WUFDOUMsTUFBTSxVQUFVLEdBQUcsTUFBTTtpQkFDdEIsYUFBYSxFQUFFO2lCQUNmLE1BQU0sQ0FBQyxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDMUUsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFFdkMsSUFDRSxVQUFVLENBQUMsTUFBTSxLQUFLLENBQUM7Z0JBQ3ZCLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTTtvQkFDbEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxDQUFDLEVBQ3hDO2dCQUNBLFNBQVMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLEVBQUUsVUFBVSxDQUFDLENBQUM7YUFDNUM7UUFDSCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsTUFBZ0IsRUFBRSxNQUFjLEVBQUUsR0FBRyxJQUFnQjtZQUN2RSxLQUFLLENBQUMsbUJBQW1CLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ25ELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUF5QixDQUFDO1lBQzlDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQy9CLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxNQUFnQixDQUFDO1lBRTVDLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtnQkFDdkIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNoRDtpQkFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3hCLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUM7aUJBQU07Z0JBQ0wsd0JBQXdCO2dCQUN4QixNQUFNO3FCQUNILGFBQWEsRUFBRTtxQkFDZixNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQztxQkFDakQsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2FBQ3pEO1FBQ0gsQ0FBQztRQUVELG1CQUFtQixDQUFDLE1BQWdCLEVBQUUsTUFBYyxFQUFFLEdBQUcsSUFBZ0I7WUFDdkUsS0FBSyxDQUFDLG1CQUFtQixDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUMxQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBeUIsQ0FBQztZQUM5QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMvQixNQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsTUFBZ0IsQ0FBQztZQUU1QyxhQUFhO1lBQ2IsVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUU7b0JBQ3ZCLE1BQU0sQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2hEO3FCQUFNLElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtvQkFDeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDMUM7cUJBQU07b0JBQ0wsd0JBQXdCO29CQUN4QixNQUFNO3lCQUNILGFBQWEsRUFBRTt5QkFDZixNQUFNLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQzt5QkFDakQsT0FBTyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO2lCQUN6RDtZQUNILENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNWLENBQUM7UUFFRCxZQUFZLENBQUMsTUFBYyxFQUFFLElBQVU7WUFDckMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQXlCLENBQUM7WUFDOUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDOUIsQ0FBQztRQUVELFdBQVcsQ0FBQyxNQUFjO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUF5QixDQUFDO1lBQzlDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDdkIsQ0FBQztLQUNGLENBQUE7SUFyUFEsMEJBQVcsR0FBRyxzQkFBYSxDQUFDO0lBRHhCLGNBQWM7UUFUMUIsa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxlQUFlO1lBQ3JCLFNBQVMsRUFBRSxrQkFBVSxDQUFDLElBQUk7WUFDMUIsZ0JBQWdCLEVBQUUsS0FBSztZQUN2QixJQUFJLEVBQUUsUUFBUTtZQUNkLFlBQVksRUFBRSxJQUFJO1lBQ2xCLG9CQUFvQixFQUFFLENBQUMsS0FBb0IsRUFBRSxLQUFVLEVBQUUsRUFBRSxDQUN6RCxLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJO1NBQ2pDLENBQUM7T0FDVyxjQUFjLENBc1AxQjtJQUFELHFCQUFDO0tBQUE7QUF0UFksd0NBQWMifQ==

});
