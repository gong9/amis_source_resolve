amis.define('src/renderers/Dialog.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DialogRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Scoped_1 = require("src/Scoped.tsx");
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const Modal_1 = tslib_1.__importDefault(require("src/components/Modal.tsx"));
  const findLast_1 = tslib_1.__importDefault(require("node_modules/lodash/findLast"));
  const helper_1 = require("src/utils/helper.ts");
  const mobx_1 = require("node_modules/mobx/lib/index");
  const icons_1 = require("src/components/icons.tsx");
  const modal_1 = require("src/store/modal.ts");
  const react_dom_1 = require("node_modules/react-dom/index");
  const components_1 = require("src/components/index.tsx");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  let Dialog = /** @class */ (() => {
      class Dialog extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.isDead = false;
              this.$$id = helper_1.guid();
              props.store.setEntered(!!props.show);
              this.handleSelfClose = this.handleSelfClose.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
              this.handleDialogClose = this.handleDialogClose.bind(this);
              this.handleDrawerConfirm = this.handleDrawerConfirm.bind(this);
              this.handleDrawerClose = this.handleDrawerClose.bind(this);
              this.handleEntered = this.handleEntered.bind(this);
              this.handleExited = this.handleExited.bind(this);
              this.handleFormInit = this.handleFormInit.bind(this);
              this.handleFormSaved = this.handleFormSaved.bind(this);
              this.handleFormChange = this.handleFormChange.bind(this);
              this.handleChildFinished = this.handleChildFinished.bind(this);
          }
          componentWillMount() {
              const store = this.props.store;
              this.reaction = mobx_1.reaction(() => `${store.loading}${store.error}`, () => this.forceUpdate());
          }
          // shouldComponentUpdate(nextProps:DialogProps, nextState:DialogState) {
          //     const props = this.props;
          //     if (this.state.entered !== nextState.entered) {
          //         return true;
          //     } else if (props.show === nextProps.show && !nextProps.show) {
          //         return false;
          //     }
          //     return isObjectShallowModified(this.props, nextProps);
          // }
          componentWillUnmount() {
              this.reaction && this.reaction();
              this.isDead = true;
          }
          buildActions() {
              const { actions, confirm, translate: __ } = this.props;
              if (typeof actions !== 'undefined') {
                  return actions;
              }
              let ret = [];
              ret.push({
                  type: 'button',
                  actionType: 'cancel',
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
              // clear error
              store.updateMessage();
              onClose();
          }
          handleAction(e, action, data) {
              const { store, onAction } = this.props;
              if (action.type === 'reset') {
                  store.reset();
              }
              else if (action.actionType === 'cancel') {
                  this.handleSelfClose();
              }
              else if (onAction) {
                  onAction(e, action, data);
              }
          }
          handleDialogConfirm(values, action, ...args) {
              const { store } = this.props;
              if (action.mergeData && values.length === 1 && values[0]) {
                  store.updateData(values[0]);
              }
              const dialog = store.action.dialog;
              if (dialog &&
                  dialog.onConfirm &&
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
          handleDrawerConfirm(values, action, ...args) {
              const { store } = this.props;
              if (action.mergeData && values.length === 1 && values[0]) {
                  store.updateData(values[0]);
              }
              const drawer = store.action.drawer;
              if (drawer &&
                  drawer.onConfirm &&
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
          handleEntered() {
              const { lazySchema, store } = this.props;
              store.setEntered(true);
              if (typeof lazySchema === 'function') {
                  store.setSchema(lazySchema(this.props));
              }
              const activeElem = document.activeElement;
              if (activeElem) {
                  const dom = react_dom_1.findDOMNode(this);
                  dom && !dom.contains(activeElem) && activeElem.blur();
              }
          }
          handleExited() {
              const { store } = this.props;
              mobx_state_tree_1.isAlive(store) && store.setFormData({});
              store.setEntered(false);
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
          handleChildFinished(value, action) {
              // 下面会覆盖
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
          getPopOverContainer() {
              return react_dom_1.findDOMNode(this).querySelector(`.${this.props.classPrefix}Modal-content`);
          }
          renderBody(body, key) {
              let { render, store } = this.props;
              if (Array.isArray(body)) {
                  return body.map((body, key) => this.renderBody(body, key));
              }
              let subProps = {
                  key,
                  disabled: (body && body.disabled) || store.loading,
                  onAction: this.handleAction,
                  onFinished: this.handleChildFinished,
                  popOverContainer: this.getPopOverContainer,
                  affixOffsetTop: 0,
                  onChange: this.handleFormChange,
                  onInit: this.handleFormInit,
                  onSaved: this.handleFormSaved
              };
              if (!body.type) {
                  return render(`body${key ? `/${key}` : ''}`, body, subProps);
              }
              let schema = body;
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
              return (react_1.default.createElement("div", { className: cx('Modal-footer') },
                  store.loading || store.error ? (react_1.default.createElement("div", { className: cx('Dialog-info'), key: "info" },
                      react_1.default.createElement(components_1.Spinner, { size: "sm", key: "info", show: store.loading }),
                      store.error && showErrorMsg !== false ? (react_1.default.createElement("span", { className: cx('Dialog-error') }, store.msg)) : null)) : null,
                  actions.map((action, key) => render(`action/${key}`, action, {
                      data: store.formData,
                      onAction: this.handleAction,
                      key,
                      disabled: action.disabled || store.loading
                  }))));
          }
          render() {
              const store = this.props.store;
              const { className, size, closeOnEsc, title, render, header, body, bodyClassName, headerClassName, show, lazyRender, lazySchema, wrapperComponent, showCloseButton, env, classnames: cx, classPrefix, translate: __ } = Object.assign(Object.assign({}, this.props), store.schema);
              const Wrapper = wrapperComponent || Modal_1.default;
              return (react_1.default.createElement(Wrapper, { classPrefix: classPrefix, className: cx(className), size: size, backdrop: "static", onHide: this.handleSelfClose, keyboard: closeOnEsc && !store.loading, closeOnEsc: closeOnEsc, show: show, onEntered: this.handleEntered, onExited: this.handleExited, container: env && env.getModalContainer ? env.getModalContainer : undefined, enforceFocus: false, disabled: store.loading },
                  title && typeof title === 'string' ? (react_1.default.createElement("div", { className: cx('Modal-header', headerClassName) },
                      showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", onClick: this.handleSelfClose, className: cx('Modal-close') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      react_1.default.createElement("div", { className: cx('Modal-title') }, tpl_1.filter(__(title), store.formData)))) : title ? (react_1.default.createElement("div", { className: cx('Modal-header', headerClassName) },
                      showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      render('title', title, {
                          data: store.formData
                      }))) : showCloseButton !== false && !store.loading ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), onClick: this.handleSelfClose, className: cx('Modal-close') },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  header
                      ? render('header', header, {
                          data: store.formData
                      })
                      : null,
                  (!store.entered && lazyRender) || (lazySchema && !body) ? (react_1.default.createElement("div", { className: cx('Modal-body', bodyClassName) },
                      react_1.default.createElement(components_1.Spinner, { overlay: true, show: true, size: "lg" }))) : body ? (react_1.default.createElement("div", { className: cx('Modal-body', bodyClassName) }, this.renderBody(body, 'body'))) : null,
                  this.renderFooter(),
                  body
                      ? render('drawer', Object.assign(Object.assign({}, (store.action &&
                          store.action.drawer)), { type: 'drawer' }), {
                          key: 'drawer',
                          data: store.drawerData,
                          onConfirm: this.handleDrawerConfirm,
                          onClose: this.handleDrawerClose,
                          show: store.drawerOpen,
                          onAction: this.handleAction
                      })
                      : null,
                  body
                      ? render('dialog', Object.assign(Object.assign({}, (store.action &&
                          store.action.dialog)), { type: 'dialog' }), {
                          key: 'dialog',
                          data: store.dialogData,
                          onConfirm: this.handleDialogConfirm,
                          onClose: this.handleDialogClose,
                          show: store.dialogOpen,
                          onAction: this.handleAction
                      })
                      : null));
          }
      }
      Dialog.propsList = [
          'title',
          'size',
          'closeOnEsc',
          'children',
          'bodyClassName',
          'headerClassName',
          'confirm',
          'onClose',
          'onConfirm',
          'show',
          'body',
          'showCloseButton',
          'showErrorMsg',
          'actions',
          'popOverContainer'
      ];
      Dialog.defaultProps = {
          title: '弹框',
          bodyClassName: '',
          confirm: true,
          show: true,
          lazyRender: false,
          showCloseButton: true,
          wrapperComponent: Modal_1.default,
          closeOnEsc: false,
          showErrorMsg: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Dialog.prototype, "getPopOverContainer", null);
      return Dialog;
  })();
  exports.default = Dialog;
  let DialogRenderer = /** @class */ (() => {
      let DialogRenderer = class DialogRenderer extends Dialog {
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
                      if (this.isDead) {
                          return;
                      }
                      store.updateMessage(reason.message, true);
                      store.markBusying(false);
                  });
                  return true;
              }
              return false;
          }
          handleAction(e, action, data, throwErrors = false, delegate) {
              const { onAction, store, onConfirm, env } = this.props;
              if (action.from === this.$$id) {
                  return onAction
                      ? onAction(e, action, data, throwErrors, delegate || this.context)
                      : false;
              }
              const scoped = this.context;
              if (action.type === 'reset') {
                  store.setCurrentAction(action);
                  store.reset();
              }
              else if (action.actionType === 'close' ||
                  action.actionType === 'cancel') {
                  store.setCurrentAction(action);
                  this.handleSelfClose();
                  action.close && this.closeTarget(action.close);
              }
              else if (action.actionType === 'confirm') {
                  store.setCurrentAction(action);
                  this.tryChildrenToHandle(Object.assign(Object.assign({}, action), { actionType: 'submit' }), data, action) || this.handleSelfClose();
              }
              else if (action.actionType === 'next' || action.actionType === 'prev') {
                  store.setCurrentAction(action);
                  if (action.type === 'submit') {
                      this.tryChildrenToHandle(Object.assign(Object.assign({}, action), { actionType: 'submit', close: true }), data, action) || this.handleSelfClose();
                  }
                  else {
                      onConfirm([data], action, data, []);
                  }
              }
              else if (action.actionType === 'dialog') {
                  store.setCurrentAction(action);
                  store.openDialog(data);
              }
              else if (action.actionType === 'drawer') {
                  store.setCurrentAction(action);
                  store.openDrawer(data);
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
                      const reidrect = action.redirect && tpl_1.filter(action.redirect, store.data);
                      reidrect && env.jumpTo(reidrect, action);
                      action.reload && this.reloadTarget(action.reload, store.data);
                      if (action.close) {
                          this.handleSelfClose();
                          this.closeTarget(action.close);
                      }
                  })
                      .catch(() => { });
              }
              else if (onAction) {
                  let ret = onAction(e, Object.assign(Object.assign({}, action), { close: false }), data, throwErrors, delegate || this.context);
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
              const onClose = this.props.onClose;
              if (components.length === 1 &&
                  (components[0].props.type === 'form' ||
                      components[0].props.type === 'wizard') &&
                  (action.close === true ||
                      components[0].props.closeDialogOnSubmit !== false)) {
                  onConfirm && onConfirm([value], action, {}, components);
              }
              else if (action.close === true) {
                  onClose();
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
      DialogRenderer.contextType = Scoped_1.ScopedContext;
      DialogRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)dialog$/,
              storeType: modal_1.ModalStore.name,
              storeExtendsData: false,
              name: 'dialog',
              isolateScope: true,
              shouldSyncSuperStore: (store, props) => store.dialogOpen || props.show
          })
      ], DialogRenderer);
      return DialogRenderer;
  })();
  exports.DialogRenderer = DialogRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlhbG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9EaWFsb2cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsc0NBQXdEO0FBQ3hELHdDQUFtRDtBQUVuRCxzQ0FBb0M7QUFDcEMsd0VBQXdDO0FBQ3hDLHVFQUF1QztBQUN2Qyw0Q0FBMEQ7QUFDMUQsK0JBQThCO0FBQzlCLCtDQUF5QztBQUN6QywwQ0FBdUQ7QUFDdkQseUNBQXNDO0FBQ3RDLDhDQUFzQztBQVV0QyxxREFBd0M7QUFrRnhDO0lBQUEsTUFBcUIsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUFzQjtRQWlDOUQsWUFBWSxLQUFrQjtZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFIZixXQUFNLEdBQUcsS0FBSyxDQUFDO1lBQ2YsU0FBSSxHQUFXLGFBQUksRUFBRSxDQUFDO1lBSXBCLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElB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

});
