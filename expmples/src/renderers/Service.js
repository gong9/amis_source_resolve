amis.define('src/renderers/Service.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ServiceRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const service_1 = require("src/store/service.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const api_1 = require("src/utils/api.ts");
  const components_1 = require("src/components/index.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let Service = /** @class */ (() => {
      class Service extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleQuery = this.handleQuery.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.reload = this.reload.bind(this);
              this.silentReload = this.silentReload.bind(this);
              this.initInterval = this.initInterval.bind(this);
              this.afterDataFetch = this.afterDataFetch.bind(this);
              this.afterSchemaFetch = this.afterSchemaFetch.bind(this);
          }
          componentDidMount() {
              this.mounted = true;
              this.initFetch();
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              const store = props.store;
              const { fetchSuccess, fetchFailed } = props.messages;
              api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data) &&
                  store
                      .fetchData(props.api, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterDataFetch);
              api_1.isApiOutdated(prevProps.schemaApi, props.schemaApi, prevProps.data, props.data) &&
                  store
                      .fetchSchema(props.schemaApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterSchemaFetch);
              if (props.ws && prevProps.ws !== props.ws) {
                  if (this.socket) {
                      this.socket.close();
                  }
                  this.socket = store.fetchWSData(props.ws, this.afterDataFetch);
              }
          }
          componentWillUnmount() {
              this.mounted = false;
              clearTimeout(this.timer);
              if (this.socket && this.socket.close) {
                  this.socket.close();
              }
          }
          initFetch() {
              const { schemaApi, initFetchSchema, api, ws, initFetch, initFetchOn, store, messages: { fetchSuccess, fetchFailed } } = this.props;
              if (api_1.isEffectiveApi(schemaApi, store.data, initFetchSchema)) {
                  store
                      .fetchSchema(schemaApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterSchemaFetch);
              }
              if (api_1.isEffectiveApi(api, store.data, initFetch, initFetchOn)) {
                  store
                      .fetchInitData(api, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterDataFetch);
              }
              if (ws) {
                  this.socket = store.fetchWSData(ws, this.afterDataFetch);
              }
          }
          afterDataFetch(data) {
              this.initInterval(data);
          }
          afterSchemaFetch(schema) {
              this.initInterval(schema);
          }
          initInterval(value) {
              const { interval, silentPolling, stopAutoRefreshWhen, data } = this.props;
              clearTimeout(this.timer);
              interval &&
                  this.mounted &&
                  (!stopAutoRefreshWhen || !tpl_1.evalExpression(stopAutoRefreshWhen, data)) &&
                  (this.timer = setTimeout(silentPolling ? this.silentReload : this.reload, Math.max(interval, 1000)));
              return value;
          }
          reload(subpath, query, ctx, silent) {
              if (query) {
                  return this.receive(query);
              }
              const { schemaApi, initFetchSchema, api, initFetch, initFetchOn, store, messages: { fetchSuccess, fetchFailed } } = this.props;
              clearTimeout(this.timer);
              if (api_1.isEffectiveApi(schemaApi, store.data)) {
                  store
                      .fetchSchema(schemaApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterSchemaFetch);
              }
              if (api_1.isEffectiveApi(api, store.data)) {
                  store
                      .fetchData(api, store.data, {
                      silent,
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  })
                      .then(this.afterDataFetch);
              }
          }
          silentReload(target, query) {
              this.reload(target, query, undefined, true);
          }
          receive(values) {
              const { store } = this.props;
              store.updateData(values);
              this.reload();
          }
          handleQuery(query) {
              var _a, _b;
              if (this.props.api || this.props.schemaApi) {
                  this.receive(query);
              }
              else {
                  (_b = (_a = this.props).onQuery) === null || _b === void 0 ? void 0 : _b.call(_a, query);
              }
          }
          reloadTarget(target, data) {
              // 会被覆写
          }
          openFeedback(dialog, ctx) {
              return new Promise(resolve => {
                  const { store } = this.props;
                  const parentStore = store.parentStore;
                  // 暂时自己不支持弹出 dialog
                  if (parentStore && parentStore.openDialog) {
                      store.setCurrentAction({
                          type: 'button',
                          actionType: 'dialog',
                          dialog: dialog
                      });
                      store.openDialog(ctx, undefined, confirmed => {
                          resolve(confirmed);
                      });
                  }
              });
          }
          handleAction(e, action, data, throwErrors = false, delegate) {
              const { onAction, store, env, api, translate: __ } = this.props;
              if (api && action.actionType === 'ajax') {
                  store.setCurrentAction(action);
                  store
                      .saveRemote(action.api, data, {
                      successMessage: __(action.messages && action.messages.success),
                      errorMessage: __(action.messages && action.messages.failed)
                  })
                      .then(async (payload) => {
                      this.afterDataFetch(payload);
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
                  onAction(e, action, data, throwErrors, delegate || this.context);
              }
          }
          renderBody() {
              const { render, store, body: schema, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('Service-body') }, render('body', store.schema || schema, {
                  key: store.schemaKey || 'body',
                  onQuery: this.handleQuery,
                  onAction: this.handleAction
              })));
          }
          render() {
              const { className, store, render, classPrefix: ns, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx(`${ns}Service`, className) },
                  store.error ? (react_1.default.createElement("div", { className: cx(`Alert Alert--danger`) },
                      react_1.default.createElement("button", { className: cx('Alert-close'), onClick: () => store.updateMessage(''), type: "button" },
                          react_1.default.createElement("span", null, "\u00D7")),
                      store.msg)) : null,
                  this.renderBody(),
                  react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading })));
          }
      }
      Service.defaultProps = {
          messages: {
              fetchFailed: 'fetchFailed'
          }
      };
      Service.propsList = [];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Service.prototype, "initFetch", null);
      return Service;
  })();
  exports.default = Service;
  let ServiceRenderer = /** @class */ (() => {
      let ServiceRenderer = class ServiceRenderer extends Service {
          componentWillMount() {
              // super.componentWillMount();
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              super.componentWillUnmount();
              const scoped = this.context;
              scoped.unRegisterComponent(this);
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
      };
      ServiceRenderer.contextType = Scoped_1.ScopedContext;
      ServiceRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)service$/,
              storeType: service_1.ServiceStore.name,
              name: 'service'
          })
      ], ServiceRenderer);
      return ServiceRenderer;
  })();
  exports.ServiceRenderer = ServiceRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvU2VydmljZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQix3Q0FBbUQ7QUFDbkQsOENBQTZEO0FBRTdELHNDQUFvRDtBQUVwRCxzQ0FBZ0U7QUFFaEUsc0NBQTJEO0FBQzNELDhDQUFzQztBQUN0Qyw0Q0FBb0Q7QUE4RnBEO0lBQUEsTUFBcUIsT0FBUSxTQUFRLGVBQUssQ0FBQyxTQUF1QjtRQWVoRSxZQUFZLEtBQW1CO1lBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNELENBQUM7UUFFRCxpQkFBaUI7WUFDZixJQUFJLENBQUMsT0FBTyxH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

});
