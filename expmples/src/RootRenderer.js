amis.define('src/RootRenderer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RootRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const Root_1 = require("src/Root.tsx");
  const Scoped_1 = require("src/Scoped.tsx");
  const root_1 = require("src/store/root.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  let RootRenderer = /** @class */ (() => {
      let RootRenderer = class RootRenderer extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.store = props.rootStore.addStore({
                  id: helper_1.guid(),
                  path: this.props.$path,
                  storeType: root_1.RootStore.name,
                  parentId: ''
              });
              this.store.initData(props.data);
              this.store.updateLocation(props.location);
              helper_1.bulkBindFunctions(this, [
                  'handleAction',
                  'handleDialogConfirm',
                  'handleDialogClose',
                  'handleDrawerConfirm',
                  'handleDrawerClose'
              ]);
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (props.data !== prevProps.data) {
                  this.store.initData(props.data);
              }
              if (props.location !== prevProps.location) {
                  this.store.updateLocation(props.location);
              }
          }
          componentDidCatch(error, errorInfo) {
              this.store.setRuntimeError(error, errorInfo);
          }
          componentWillUnmount() {
              this.props.rootStore.removeStore(this.store);
          }
          handleAction(e, action, ctx, throwErrors = false, delegate) {
              const { env, messages, onAction } = this.props;
              const store = this.store;
              if ((onAction === null || onAction === void 0 ? void 0 : onAction(e, action, ctx, throwErrors, delegate || this.context)) ===
                  false) {
                  return;
              }
              const scoped = delegate || this.context;
              if (action.actionType === 'reload') {
                  action.target && scoped.reload(action.target, ctx);
              }
              else if (action.target) {
                  action.target.split(',').forEach(name => {
                      let target = scoped.getComponentByName(name);
                      target &&
                          target.doAction &&
                          target.doAction(Object.assign(Object.assign({}, action), { target: undefined }), ctx);
                  });
              }
              else if (action.actionType === 'url' ||
                  action.actionType === 'link' ||
                  action.actionType === 'jump') {
                  if (!env || !env.jumpTo) {
                      throw new Error('env.jumpTo is required!');
                  }
                  env.jumpTo(tpl_1.filter((action.to || action.url || action.link), ctx, '| raw'), action, ctx);
              }
              else if (action.actionType === 'dialog') {
                  store.setCurrentAction(action);
                  store.openDialog(ctx);
              }
              else if (action.actionType === 'drawer') {
                  store.setCurrentAction(action);
                  store.openDrawer(ctx);
              }
              else if (action.actionType === 'ajax') {
                  store.setCurrentAction(action);
                  store
                      .saveRemote(action.api, ctx, {
                      successMessage: (action.messages && action.messages.success) ||
                          (messages && messages.saveSuccess),
                      errorMessage: (action.messages && action.messages.failed) ||
                          (messages && messages.saveSuccess)
                  })
                      .then(async () => {
                      if (action.feedback && helper_1.isVisible(action.feedback, store.data)) {
                          await this.openFeedback(action.feedback, store.data);
                      }
                      const redirect = action.redirect && tpl_1.filter(action.redirect, store.data);
                      redirect && env.jumpTo(redirect, action);
                      action.reload &&
                          this.reloadTarget(delegate || this.context, action.reload, store.data);
                  })
                      .catch(() => { });
              }
              else if (action.actionType === 'copy' &&
                  (action.content || action.copy)) {
                  env.copy && env.copy(tpl_1.filter(action.content || action.copy, ctx, '| raw'));
              }
          }
          handleDialogConfirm(values, action, ...args) {
              const store = this.store;
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
          handleDialogClose() {
              const store = this.store;
              store.closeDialog();
          }
          handleDrawerConfirm(values, action, ...args) {
              const store = this.store;
              if (action.mergeData && values.length === 1 && values[0]) {
                  store.updateData(values[0]);
              }
              const dialog = store.action.dialog;
              if (dialog &&
                  dialog.onConfirm &&
                  dialog.onConfirm(values, action, ...args) === false) {
                  return;
              }
              store.closeDrawer();
          }
          handleDrawerClose() {
              const store = this.store;
              store.closeDrawer();
          }
          openFeedback(dialog, ctx) {
              return new Promise(resolve => {
                  const store = this.store;
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
          reloadTarget(scoped, target, data) {
              scoped.reload(target, data);
          }
          render() {
              var _a;
              const _b = this.props, { pathPrefix, schema } = _b, rest = tslib_1.__rest(_b, ["pathPrefix", "schema"]);
              const store = this.store;
              if (store.runtimeError) {
                  return (react_1.default.createElement(Alert2_1.default, { level: "danger" },
                      react_1.default.createElement("h3", null, (_a = this.store.runtimeError) === null || _a === void 0 ? void 0 : _a.toString()),
                      react_1.default.createElement("pre", null,
                          react_1.default.createElement("code", null, this.store.runtimeErrorStack.componentStack))));
              }
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  Root_1.renderChild(pathPrefix, schema, Object.assign(Object.assign({}, rest), { data: this.store.downStream, onAction: this.handleAction })),
                  react_1.default.createElement(Spinner_1.default, { size: "lg", overlay: true, key: "info", show: store.loading }),
                  store.error ? (react_1.default.createElement(Alert2_1.default, { level: "danger", showCloseButton: true, onClose: store.clearMessage }, store.msg)) : null,
                  Root_1.renderChild('dialog', Object.assign(Object.assign({}, (store.action &&
                      store.action.dialog)), { type: 'dialog' }), Object.assign(Object.assign({}, rest), { key: 'dialog', data: store.dialogData, onConfirm: this.handleDialogConfirm, onClose: this.handleDialogClose, show: store.dialogOpen, onAction: this.handleAction })),
                  Root_1.renderChild('drawer', Object.assign(Object.assign({}, (store.action &&
                      store.action.drawer)), { type: 'drawer' }), Object.assign(Object.assign({}, rest), { key: 'drawer', data: store.drawerData, onConfirm: this.handleDrawerConfirm, onClose: this.handleDrawerClose, show: store.drawerOpen, onAction: this.handleAction }))));
          }
      };
      RootRenderer.contextType = Scoped_1.ScopedContext;
      RootRenderer = tslib_1.__decorate([
          mobx_react_1.observer,
          tslib_1.__metadata("design:paramtypes", [Object])
      ], RootRenderer);
      return RootRenderer;
  })();
  exports.RootRenderer = RootRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUm9vdFJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL1Jvb3RSZW5kZXJlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJDQUFvQztBQUNwQywwREFBMEI7QUFDMUIseUVBQXdDO0FBQ3hDLDJFQUEyQztBQUMzQyxpQ0FBOEM7QUFDOUMscUNBQXVEO0FBQ3ZELHVDQUFtRDtBQUVuRCwyQ0FBa0U7QUFDbEUscUNBQW1DO0FBT25DO0lBQUEsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBYSxTQUFRLGVBQUssQ0FBQyxTQUE0QjtRQUlsRSxZQUFZLEtBQXdCO1lBQ2xDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUM7Z0JBQ3BDLEVBQUUsRUFBRSxhQUFJLEVBQUU7Z0JBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSztnQkFDdEIsU0FBUyxFQUFFLGdCQUFTLENBQUMsSUFBSTtnQkFDekIsUUFBUSxFQUFFLEVBQUU7YUFDYixDQUFlLENBQUM7WUFFakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUUxQywwQkFBaUIsQ0FBdUMsSUFBSSxFQUFFO2dCQUM1RCxjQUFjO2dCQUNkLHFCQUFxQjtnQkFDckIsbUJBQW1CO2dCQUNuQixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjthQUNwQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsU0FBNEI7WUFDN0MsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV6QixJQUFJLEtBQUss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

});
