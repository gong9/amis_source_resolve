amis.define('src/renderers/Page.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PageRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const service_1 = require("src/store/service.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  const api_1 = require("src/utils/api.ts");
  const components_1 = require("src/components/index.tsx");
  let Page = /** @class */ (() => {
      class Page extends react_1.default.Component {
          componentWillMount() {
              const { store, location } = this.props;
              // autobind 会让继承里面的 super 指向有问题，所以先这样！
              helper_1.bulkBindFunctions(this, [
                  'handleAction',
                  'handleQuery',
                  'handleDialogConfirm',
                  'handleDialogClose',
                  'handleDrawerConfirm',
                  'handleDrawerClose',
                  'handleClick',
                  'reload',
                  'silentReload',
                  'initInterval'
              ]);
          }
          componentDidMount() {
              const { initApi, initFetch, initFetchOn, store, messages } = this.props;
              this.mounted = true;
              if (api_1.isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
                  store
                      .fetchInitData(initApi, store.data, {
                      successMessage: messages && messages.fetchSuccess,
                      errorMessage: messages && messages.fetchFailed
                  })
                      .then(this.initInterval);
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              const store = props.store;
              const initApi = props.initApi;
              if (
              // 前一次不构成条件，这次更新构成了条件，则需要重新拉取
              (props.initFetchOn && props.initFetch && !prevProps.initFetch) ||
                  // 构成了条件，同时 url 里面有变量，且上次和这次还不一样，则需要重新拉取。
                  (props.initFetch !== false &&
                      api_1.isApiOutdated(prevProps.initApi, initApi, prevProps.data, props.data))) {
                  const messages = props.messages;
                  api_1.isEffectiveApi(initApi, store.data) &&
                      store
                          .fetchData(initApi, store.data, {
                          successMessage: messages && messages.fetchSuccess,
                          errorMessage: messages && messages.fetchFailed
                      })
                          .then(this.initInterval);
              }
          }
          componentWillUnmount() {
              this.mounted = false;
              clearTimeout(this.timer);
          }
          reloadTarget(target, data) {
              // 会被覆写
          }
          handleAction(e, action, ctx, throwErrors = false, delegate) {
              const { env, store, messages, onAction } = this.props;
              if (action.actionType === 'dialog') {
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
                      action.reload && this.reloadTarget(action.reload, store.data);
                  })
                      .catch(() => { });
              }
              else {
                  onAction(e, action, ctx, throwErrors, delegate || this.context);
              }
          }
          handleQuery(query) {
              this.receive(query);
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
          handleDialogClose() {
              const { store } = this.props;
              store.closeDialog();
          }
          handleDrawerConfirm(values, action, ...args) {
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
              store.closeDrawer();
          }
          handleDrawerClose() {
              const { store } = this.props;
              store.closeDrawer();
          }
          handleClick(e) {
              const target = e.target;
              const { env } = this.props;
              if (env && target.tagName === 'A' && target.hasAttribute('data-link')) {
                  env.jumpTo(target.getAttribute('data-link'));
                  e.preventDefault();
              }
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
          reload(subpath, query, ctx, silent) {
              if (query) {
                  return this.receive(query);
              }
              const { store, initApi } = this.props;
              clearTimeout(this.timer);
              api_1.isEffectiveApi(initApi, store.data) &&
                  store
                      .fetchData(initApi, store.data, {
                      silent
                  })
                      .then(this.initInterval);
          }
          receive(values) {
              const { store } = this.props;
              store.updateData(values);
              this.reload();
          }
          silentReload(target, query) {
              this.reload(query, undefined, undefined, true);
          }
          initInterval(value) {
              const { interval, silentPolling, stopAutoRefreshWhen, data } = this.props;
              interval &&
                  this.mounted &&
                  (!stopAutoRefreshWhen || !tpl_1.evalExpression(stopAutoRefreshWhen, data)) &&
                  (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
              return value;
          }
          renderHeader() {
              const { title, subTitle, remark, remarkPlacement, headerClassName, toolbarClassName, toolbar, render, store, initApi, env, classnames: cx } = this.props;
              const subProps = {
                  onAction: this.handleAction,
                  onQuery: initApi ? this.handleQuery : undefined
              };
              let header, right;
              if (title || subTitle) {
                  header = (react_1.default.createElement("div", { className: cx(`Page-header`, headerClassName) },
                      title ? (react_1.default.createElement("h2", { className: cx('Page-title') },
                          render('title', title, subProps),
                          remark
                              ? render('remark', {
                                  type: 'remark',
                                  tooltip: remark,
                                  placement: remarkPlacement || 'bottom',
                                  container: env && env.getModalContainer
                                      ? env.getModalContainer
                                      : undefined
                              })
                              : null)) : null,
                      subTitle && (react_1.default.createElement("small", { className: cx('Page-subTitle') }, render('subTitle', subTitle, subProps)))));
              }
              if (toolbar) {
                  right = (react_1.default.createElement("div", { className: cx(`Page-toolbar`, toolbarClassName) }, render('toolbar', toolbar, subProps)));
              }
              if (header && right) {
                  return (react_1.default.createElement("div", { className: cx('Page-headerRow') },
                      header,
                      right));
              }
              return header || right;
          }
          render() {
              const { className, store, body, bodyClassName, cssVars, render, aside, asideClassName, classnames: cx, header, showErrorMsg, initApi } = this.props;
              const subProps = {
                  onAction: this.handleAction,
                  onQuery: initApi ? this.handleQuery : undefined,
                  loading: store.loading
              };
              const hasAside = aside && (!Array.isArray(aside) || aside.length);
              let cssVarsContent = '';
              if (cssVars) {
                  for (const key in cssVars) {
                      if (key.startsWith('--')) {
                          if (key.indexOf(':') !== -1) {
                              continue;
                          }
                          const value = cssVars[key];
                          // 这是为了防止 xss，可能还有别的
                          if (typeof value === 'string' &&
                              (value.indexOf('expression(') !== -1 || value.indexOf(';') !== -1)) {
                              continue;
                          }
                          cssVarsContent += `${key}: ${value}; \n`;
                      }
                  }
              }
              return (react_1.default.createElement("div", { className: cx(`Page`, hasAside ? `Page--withSidebar` : '', className), onClick: this.handleClick },
                  cssVarsContent ? (react_1.default.createElement("style", { 
                      // 似乎无法用 style 属性的方式来实现，所以目前先这样做
                      dangerouslySetInnerHTML: {
                          __html: `
            :root {
              ${cssVarsContent}
            }
          `
                      } })) : null,
                  hasAside ? (react_1.default.createElement("div", { className: cx(`Page-aside`, asideClassName) }, render('aside', aside, Object.assign(Object.assign({}, subProps), (typeof aside === 'string'
                      ? {
                          inline: false,
                          className: `Page-asideTplWrapper`
                      }
                      : null))))) : null,
                  react_1.default.createElement("div", { className: cx('Page-content') },
                      header ? render('header', header, subProps) : null,
                      react_1.default.createElement("div", { className: cx('Page-main') },
                          this.renderHeader(),
                          react_1.default.createElement("div", { className: cx(`Page-body`, bodyClassName) },
                              react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading }),
                              store.error && showErrorMsg !== false ? (react_1.default.createElement(Alert2_1.default, { level: "danger", showCloseButton: true, onClose: store.clearMessage }, store.msg)) : null,
                              body ? render('body', body, subProps) : null))),
                  render('dialog', Object.assign(Object.assign({}, (store.action &&
                      store.action.dialog)), { type: 'dialog' }), {
                      key: 'dialog',
                      data: store.dialogData,
                      onConfirm: this.handleDialogConfirm,
                      onClose: this.handleDialogClose,
                      show: store.dialogOpen,
                      onAction: this.handleAction,
                      onQuery: initApi ? this.handleQuery : undefined
                  }),
                  render('drawer', Object.assign(Object.assign({}, (store.action &&
                      store.action.drawer)), { type: 'drawer' }), {
                      key: 'drawer',
                      data: store.drawerData,
                      onConfirm: this.handleDrawerConfirm,
                      onClose: this.handleDrawerClose,
                      show: store.drawerOpen,
                      onAction: this.handleAction,
                      onQuery: initApi ? this.handleQuery : undefined
                  })));
          }
      }
      Page.defaultProps = {
          asideClassName: '',
          bodyClassName: '',
          headerClassName: '',
          initFetch: true,
          // primaryField: 'id',
          toolbarClassName: '',
          messages: {}
      };
      Page.propsList = [
          'title',
          'subTitle',
          'initApi',
          'initFetchOn',
          'initFetch',
          'headerClassName',
          'bodyClassName',
          'asideClassName',
          'toolbarClassName',
          'toolbar',
          'body',
          'aside',
          'messages',
          'style',
          'showErrorMsg'
      ];
      return Page;
  })();
  exports.default = Page;
  let PageRenderer = /** @class */ (() => {
      let PageRenderer = class PageRenderer extends Page {
          componentWillMount() {
              super.componentWillMount();
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              super.componentWillUnmount();
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
          handleAction(e, action, ctx, throwErrors = false, delegate) {
              const scoped = this.context;
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
              else {
                  super.handleAction(e, action, ctx, throwErrors, delegate);
                  if (action.reload &&
                      ~['url', 'link', 'jump'].indexOf(action.actionType)) {
                      const scoped = delegate || this.context;
                      scoped.reload(action.reload, ctx);
                  }
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
                  else {
                      // 没有设置，则自动让页面中 crud 刷新。
                      scoped
                          .getComponents()
                          .filter((item) => item.props.type === 'crud')
                          .forEach((item) => item.reload && item.reload());
                  }
              }, 300);
          }
      };
      PageRenderer.contextType = Scoped_1.ScopedContext;
      PageRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(?:^|\/)page$/,
              name: 'page',
              storeType: service_1.ServiceStore.name,
              isolateScope: true
          })
      ], PageRenderer);
      return PageRenderer;
  })();
  exports.PageRenderer = PageRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvUGFnZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQix3Q0FBbUQ7QUFFbkQsOENBQTZEO0FBUzdELHNDQUFvRDtBQUdwRCw0Q0FBdUU7QUFDdkUsc0NBQXdEO0FBQ3hELDBFQUF5QztBQUN6QyxzQ0FBMkQ7QUFDM0QsOENBQXNDO0FBd0l0QztJQUFBLE1BQXFCLElBQUssU0FBUSxlQUFLLENBQUMsU0FBb0I7UUFnQzFELGtCQUFrQjtZQUNoQixNQUFNLEVBQUMsS0FBSyxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFckMsc0NBQXNDO1lBQ3RDLDBCQUFpQixDQUErQixJQUFJLEVBQUU7Z0JBQ3BELGNBQWM7Z0JBQ2QsYUFBYTtnQkFDYixxQkFBcUI7Z0JBQ3JCLG1CQUFtQjtnQkFDbkIscUJBQXFCO2dCQUNyQixtQkFBbUI7Z0JBQ25CLGFBQWE7Z0JBQ2IsUUFBUTtnQkFDUixjQUFjO2dCQUNkLGNBQWM7YUFDZixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsTUFBTSxFQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXRFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1lBRXBCLElBQUksb0JBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsV0FBVyxDQUFDLEVBQUU7Z0JBQy9ELEtBQUs7cUJBQ0YsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFO29CQUNsQyxjQUFjLEVBQUUsUUFBUSxJQUFJLFFBQVEsQ0FBQyxZQUFZO29CQUNq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

});
