amis.define('src/renderers/Form/index.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FormRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const form_1 = require("src/store/form.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const helper_1 = require("src/utils/helper.ts");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const flatten_1 = tslib_1.__importDefault(require("node_modules/lodash/flatten"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const Scoped_1 = require("src/Scoped.tsx");
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const api_1 = require("src/utils/api.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const components_1 = require("src/components/index.tsx");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const SimpleMap_1 = require("src/utils/SimpleMap.ts");
  let Form = /** @class */ (() => {
      class Form extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.hooks = {};
              this.shouldLoadInitApi = false;
              this.lazyHandleChange = debounce_1.default(this.handleChange.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
              this.componentCache = new SimpleMap_1.SimpleMap();
              this.onInit = this.onInit.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleQuery = this.handleQuery.bind(this);
              this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
              this.handleDialogClose = this.handleDialogClose.bind(this);
              this.handleDrawerConfirm = this.handleDrawerConfirm.bind(this);
              this.handleDrawerClose = this.handleDrawerClose.bind(this);
              this.handleFormSubmit = this.handleFormSubmit.bind(this);
              this.validate = this.validate.bind(this);
              this.submit = this.submit.bind(this);
              this.addHook = this.addHook.bind(this);
              this.removeHook = this.removeHook.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.renderFormItems = this.renderFormItems.bind(this);
              this.reload = this.reload.bind(this);
              this.silentReload = this.silentReload.bind(this);
              this.initInterval = this.initInterval.bind(this);
              this.blockRouting = this.blockRouting.bind(this);
              this.beforePageUnload = this.beforePageUnload.bind(this);
          }
          componentWillMount() {
              const { store, canAccessSuperData, persistData, simpleMode } = this.props;
              store.setCanAccessSuperData(canAccessSuperData !== false);
              persistData && store.getPersistData();
              if (simpleMode) {
                  store.setInited(true);
              }
              if (store &&
                  store.parentStore &&
                  store.parentStore.storeType === 'ComboStore') {
                  const combo = store.parentStore;
                  combo.addForm(store);
                  combo.forms.forEach(item => item.items.forEach(item => item.unique && item.syncOptions()));
              }
          }
          componentDidMount() {
              var _a, _b;
              const { initApi, initFetch, initFetchOn, initAsyncApi, initFinishedField, initCheckInterval, store, messages: { fetchSuccess, fetchFailed }, onValidate, promptPageLeave, env, rules } = this.props;
              this.mounted = true;
              if (onValidate) {
                  const finalValidate = helper_1.promisify(onValidate);
                  this.disposeOnValidate = this.addHook(async () => {
                      const result = await finalValidate(store.data, store);
                      if (result && helper_1.isObject(result)) {
                          Object.keys(result).forEach(key => {
                              let msg = result[key];
                              const items = store.getItemsByPath(key);
                              // 没有找到
                              if (!Array.isArray(items) || !items.length) {
                                  return;
                              }
                              // 在setError之前，提前把残留的error信息清除掉，否则每次onValidate后都会一直把报错 append 上去
                              items.forEach(item => item.clearError());
                              if (msg) {
                                  msg = Array.isArray(msg) ? msg : [msg];
                                  items.forEach(item => item.addError(msg));
                              }
                              delete result[key];
                          });
                          helper_1.isEmpty(result)
                              ? store.clearRestError()
                              : store.setRestError(Object.keys(result).map(key => result[key]));
                      }
                  });
              }
              if (Array.isArray(rules) && rules.length) {
                  this.disposeRulesValidate = this.addHook(() => {
                      if (!store.valid) {
                          return;
                      }
                      rules.forEach(item => !tpl_1.evalExpression(item.rule, store.data) &&
                          store.addRestError(item.message));
                  });
              }
              if (api_1.isEffectiveApi(initApi, store.data, initFetch, initFetchOn)) {
                  store
                      .fetchInitData(initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed,
                      onSuccess: () => {
                          if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                              store.data[initFinishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(() => store.checkRemote(initAsyncApi, store.data), (ret) => ret && ret[initFinishedField || 'finished'], cancel => (this.asyncCancel = cancel), initCheckInterval);
                      }
                  })
                      .then(this.initInterval)
                      .then(this.onInit);
              }
              else {
                  setTimeout(this.onInit.bind(this), 4);
              }
              if (promptPageLeave) {
                  window.addEventListener('beforeunload', this.beforePageUnload);
                  this.unBlockRouting = (_b = (_a = env.blockRouting) === null || _a === void 0 ? void 0 : _a.call(env, this.blockRouting)) !== null && _b !== void 0 ? _b : undefined;
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              const store = props.store;
              if (api_1.isApiOutdated(prevProps.initApi, props.initApi, prevProps.data, props.data)) {
                  const { fetchSuccess, fetchFailed } = props;
                  store[store.hasRemoteData ? 'fetchData' : 'fetchInitData'](props.initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  }).then(this.initInterval);
              }
          }
          componentWillUnmount() {
              var _a;
              this.mounted = false;
              clearTimeout(this.timer);
              // this.lazyHandleChange.flush();
              this.lazyHandleChange.cancel();
              this.asyncCancel && this.asyncCancel();
              this.disposeOnValidate && this.disposeOnValidate();
              this.disposeRulesValidate && this.disposeRulesValidate();
              this.componentCache.dispose();
              window.removeEventListener('beforeunload', this.beforePageUnload);
              (_a = this.unBlockRouting) === null || _a === void 0 ? void 0 : _a.call(this);
          }
          blockRouting() {
              const store = this.props.store;
              const { promptPageLeaveMessage, promptPageLeave } = this.props;
              if (promptPageLeave && store.modified) {
                  return promptPageLeaveMessage || '新的修改没有保存，确认要离开？';
              }
          }
          beforePageUnload(e) {
              const blocked = this.blockRouting();
              if (blocked) {
                  e.preventDefault();
                  e.returnValue = '';
              }
          }
          async onInit() {
              const { onInit, store, submitOnInit } = this.props;
              if (!mobx_state_tree_1.isAlive(store)) {
                  return;
              }
              // 先拿出来数据，主要担心 form 被什么东西篡改了，然后又应用出去了
              // 之前遇到过问题，所以拿出来了。但是 options  loadOptions 默认值失效了。
              // 所以目前需要两个都要设置一下，再 init Hook 里面。
              let data = helper_1.cloneObject(store.data);
              const initedAt = store.initedAt;
              store.setInited(true);
              const hooks = this.hooks['init'] || [];
              await Promise.all(hooks.map(hook => hook(data)));
              if (!mobx_state_tree_1.isAlive(store)) {
                  return;
              }
              if (store.initedAt !== initedAt) {
                  // 说明，之前的数据已经失效了。
                  // 比如 combo 一开始设置了初始值，然后 form 的 initApi 又返回了新的值。
                  // 这个时候 store 的数据应该已经 init 了新的值。但是 data 还是老的，这个时候
                  // onInit 出去就是错误的。
                  data = Object.assign(Object.assign({}, data), store.data);
              }
              onInit && onInit(data, this.props);
              submitOnInit &&
                  this.handleAction(undefined, {
                      type: 'submit'
                  }, store.data);
          }
          reload(subPath, query, ctx, silent) {
              if (query) {
                  return this.receive(query);
              }
              const { store, initApi, initAsyncApi, initFinishedField, messages: { fetchSuccess, fetchFailed } } = this.props;
              api_1.isEffectiveApi(initAsyncApi, store.data) &&
                  store.updateData({
                      [initFinishedField || 'finished']: false
                  });
              api_1.isEffectiveApi(initApi, store.data)
                  ? store
                      .fetchInitData(initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed,
                      silent,
                      onSuccess: () => {
                          if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                              store.data[initFinishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(() => store.checkRemote(initAsyncApi, store.data), (ret) => ret && ret[initFinishedField || 'finished'], cancel => (this.asyncCancel = cancel));
                      }
                  })
                      .then((result) => {
                      if (result === null || result === void 0 ? void 0 : result.ok) {
                          this.initInterval(result);
                          store.reset(undefined, false);
                      }
                  })
                  : store.reset(undefined, false);
          }
          receive(values) {
              const { store } = this.props;
              store.updateData(values);
              this.reload();
          }
          silentReload(target, query) {
              this.reload(target, query, undefined, true);
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
          isValidated() {
              return this.props.store.validated;
          }
          validate(forceValidate) {
              const { store } = this.props;
              this.flush();
              return store.validate(this.hooks['validate'] || [], forceValidate);
          }
          clearErrors() {
              const { store } = this.props;
              return store.clearErrors();
          }
          getValues() {
              const { store } = this.props;
              this.flush();
              return store.data;
          }
          setValues(value) {
              const { store } = this.props;
              this.flush();
              store.setValues(value);
          }
          submit(fn) {
              const { store, messages, translate: __ } = this.props;
              this.flush();
              return store.submit(fn, this.hooks['validate'] || [], __(messages && messages.validateFailed));
          }
          // 如果开启了 lazyChange，需要一个 flush 方法把队列中值应用上。
          flush() {
              const hooks = this.hooks['flush'] || [];
              hooks.forEach(fn => fn());
              this.lazyHandleChange.flush();
          }
          reset() {
              const { store, onReset } = this.props;
              store.reset(onReset);
          }
          addHook(fn, type = 'validate') {
              this.hooks[type] = this.hooks[type] || [];
              this.hooks[type].push(type === 'flush' ? fn : helper_1.promisify(fn));
              return () => {
                  this.removeHook(fn, type);
                  fn = helper_1.noop;
              };
          }
          removeHook(fn, type = 'validate') {
              const hooks = this.hooks[type];
              if (!hooks) {
                  return;
              }
              for (let i = 0, len = hooks.length; i < len; i++) {
                  let hook = hooks[i];
                  if (hook === fn || hook.raw === fn) {
                      hooks.splice(i, 1);
                      len--;
                      i--;
                  }
              }
          }
          handleChange(value, name, submit) {
              const { onChange, store, submitOnChange } = this.props;
              onChange &&
                  onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
              store.clearRestError();
              (submit || submitOnChange) &&
                  this.handleAction(undefined, {
                      type: 'submit'
                  }, store.data);
          }
          handleFormSubmit(e) {
              e.preventDefault();
              return this.handleAction(e, {
                  type: 'submit'
              }, this.props.store.data);
          }
          handleAction(e, action, data, throwErrors = false, delegate) {
              const { store, onSubmit, api, asyncApi, finishedField, checkInterval, messages: { saveSuccess, saveFailed }, resetAfterSubmit, clearAfterSubmit, onAction, onSaved, onReset, onFinished, onFailed, redirect, reload, target, env, onChange, clearPersistDataAfterSubmit, trimValues, translate: __ } = this.props;
              // 做动作之前，先把数据同步一下。
              this.flush();
              if (trimValues) {
                  store.trimValues();
              }
              // 如果 data 就是当前层，则 flush 一下。
              if (data === this.props.data) {
                  data = store.data;
              }
              if (Array.isArray(action.required) && action.required.length) {
                  return store.validateFields(action.required).then(result => {
                      if (!result) {
                          env.notify('error', __('Form.validateFailed'));
                      }
                      else {
                          this.handleAction(e, Object.assign(Object.assign({}, action), { required: undefined }), data, throwErrors, delegate);
                      }
                  });
              }
              if (action.type === 'submit' ||
                  action.actionType === 'submit' ||
                  action.actionType === 'confirm' ||
                  action.actionType === 'reset-and-submit' ||
                  action.actionType === 'clear-and-submit') {
                  store.setCurrentAction(action);
                  if (action.actionType === 'reset-and-submit') {
                      store.reset(onReset);
                  }
                  else if (action.actionType === 'clear-and-submit') {
                      store.clear(onReset);
                  }
                  return this.submit((values) => {
                      if (onSubmit && onSubmit(values, action) === false) {
                          return Promise.resolve(false);
                      }
                      if (target) {
                          this.submitToTarget(target, values);
                      }
                      else if (action.actionType === 'reload') {
                          action.target && this.reloadTarget(action.target, values);
                      }
                      else if (action.actionType === 'dialog') {
                          store.openDialog(data);
                      }
                      else if (action.actionType === 'drawer') {
                          store.openDrawer(data);
                      }
                      else if (api_1.isEffectiveApi(action.api || api, values)) {
                          let finnalAsyncApi = action.asyncApi || asyncApi;
                          api_1.isEffectiveApi(finnalAsyncApi, store.data) &&
                              store.updateData({
                                  [finishedField || 'finished']: false
                              });
                          return store
                              .saveRemote(action.api || api, values, {
                              successMessage: saveSuccess,
                              errorMessage: saveFailed,
                              onSuccess: () => {
                                  if (!api_1.isEffectiveApi(finnalAsyncApi, store.data) ||
                                      store.data[finishedField || 'finished']) {
                                      return;
                                  }
                                  return helper_1.until(() => store.checkRemote(finnalAsyncApi, store.data), (ret) => ret && ret[finishedField || 'finished'], cancel => (this.asyncCancel = cancel), checkInterval);
                              }
                          })
                              .then(async (response) => {
                              onSaved && onSaved(values, response);
                              const feedback = action.feedback || this.props.feedback;
                              // submit 也支持 feedback
                              if (feedback && helper_1.isVisible(feedback, store.data)) {
                                  const confirmed = await this.openFeedback(feedback, store.data);
                                  // 如果 feedback 配置了，取消就跳过原有逻辑。
                                  if (feedback.skipRestOnCancel && !confirmed) {
                                      throw new helper_1.SkipOperation();
                                  }
                                  else if (feedback.skipRestOnConfirm && confirmed) {
                                      throw new helper_1.SkipOperation();
                                  }
                              }
                              // return values;
                          });
                      }
                      return Promise.resolve(null);
                  })
                      .then(values => {
                      // 有可能 onSubmit return false 了，那么后面的就不应该再执行了。
                      if (values === false) {
                          return store.data;
                      }
                      if (onFinished && onFinished(values, action) === false) {
                          return values;
                      }
                      resetAfterSubmit && store.reset(onReset);
                      clearAfterSubmit && store.clear(onReset);
                      clearPersistDataAfterSubmit && store.clearPersistData();
                      if (action.redirect || redirect) {
                          const finalRedirect = tpl_1.filter(action.redirect || redirect, store.data);
                          finalRedirect && env.jumpTo(finalRedirect, action);
                      }
                      else if (action.reload || reload) {
                          this.reloadTarget(action.reload || reload, store.data);
                      }
                      action.close && this.closeTarget(action.close);
                      return values;
                  })
                      .catch(reason => {
                      if (reason instanceof helper_1.SkipOperation) {
                          return;
                      }
                      onFailed && onFailed(reason, store.errors);
                      if (throwErrors) {
                          throw reason;
                      }
                  });
              }
              else if (action.type === 'reset' || action.actionType === 'reset') {
                  store.setCurrentAction(action);
                  store.reset(onReset);
              }
              else if (action.actionType === 'clear') {
                  store.setCurrentAction(action);
                  store.clear(onReset);
              }
              else if (action.actionType === 'dialog') {
                  store.setCurrentAction(action);
                  store.openDialog(data);
              }
              else if (action.actionType === 'drawer') {
                  store.setCurrentAction(action);
                  store.openDrawer(data);
              }
              else if (action.actionType === 'ajax') {
                  store.setCurrentAction(action);
                  if (!api_1.isEffectiveApi(action.api)) {
                      return env.alert(__(`当 actionType 为 ajax 时，请设置 api 属性`));
                  }
                  return store
                      .saveRemote(action.api, data, {
                      successMessage: __((action.messages && action.messages.success) || saveSuccess),
                      errorMessage: __((action.messages && action.messages.failed) || saveFailed)
                  })
                      .then(async (response) => {
                      response &&
                          onChange &&
                          onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
                      if (store.validated) {
                          await this.validate(true);
                      }
                      if (action.feedback && helper_1.isVisible(action.feedback, store.data)) {
                          await this.openFeedback(action.feedback, store.data);
                      }
                      const redirect = action.redirect && tpl_1.filter(action.redirect, store.data);
                      redirect && env.jumpTo(redirect, action);
                      action.reload && this.reloadTarget(action.reload, store.data);
                      action.close && this.closeTarget(action.close);
                  })
                      .catch(e => {
                      onFailed && onFailed(e, store.errors);
                      if (throwErrors) {
                          throw e;
                      }
                  });
              }
              else if (action.actionType === 'reload') {
                  store.setCurrentAction(action);
                  action.target && this.reloadTarget(action.target, data);
              }
              else if (onAction) {
                  // 不识别的丢给上层去处理。
                  return onAction(e, action, data, throwErrors, delegate || this.context);
              }
          }
          handleQuery(query) {
              var _a, _b;
              if (this.props.initApi) {
                  this.receive(query);
              }
              else {
                  (_b = (_a = this.props).onQuery) === null || _b === void 0 ? void 0 : _b.call(_a, query);
              }
          }
          handleDialogConfirm(values, action, ctx, targets) {
              const { store, onChange } = this.props;
              if ((action.mergeData || store.action.mergeData) &&
                  values.length === 1 &&
                  values[0] &&
                  targets[0].props.type === 'form') {
                  store.updateData(values[0]);
                  onChange &&
                      onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
              }
              store.closeDialog(true);
          }
          handleDialogClose() {
              const { store } = this.props;
              store.closeDialog(false);
          }
          handleDrawerConfirm(values, action, ctx, targets) {
              const { store, onChange } = this.props;
              if ((action.mergeData || store.action.mergeData) &&
                  values.length === 1 &&
                  values[0] &&
                  targets[0].props.type === 'form') {
                  store.updateData(values[0]);
                  onChange &&
                      onChange(store.data, helper_1.difference(store.data, store.pristine), this.props);
              }
              store.closeDrawer(true);
          }
          handleDrawerClose() {
              const { store } = this.props;
              store.closeDrawer(false);
          }
          submitToTarget(target, values) {
              // 会被覆写
          }
          reloadTarget(target, data) {
              // 会被覆写
          }
          closeTarget(target) {
              // 会被覆写
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
          buildActions() {
              const { actions, submitText, controls, translate: __ } = this.props;
              if (typeof actions !== 'undefined' ||
                  !submitText ||
                  (Array.isArray(controls) &&
                      controls.some(item => item &&
                          (!!~['submit', 'button', 'reset'].indexOf(item.type) ||
                              (item.type === 'button-group' &&
                                  !item.options))))) {
                  return actions;
              }
              return [
                  {
                      type: 'submit',
                      label: __(submitText),
                      primary: true
                  }
              ];
          }
          renderFormItems(schema, region = '', otherProps = {}) {
              return this.renderControls(schema.controls, region, otherProps);
              // return schema.tabs ? this.renderTabs(schema.tabs, schema, region)
              // : schema.fieldSet ? this.renderFiledSet(schema.fieldSet, schema, region) : this.renderControls(schema.controls as SchemaNode, schema, region);
          }
          renderControls(controls, region, otherProps = {}) {
              controls = controls || [];
              if (!Array.isArray(controls)) {
                  controls = [controls];
              }
              if (this.props.mode === 'row') {
                  const ns = this.props.classPrefix;
                  controls = flatten_1.default(controls).filter(item => {
                      if (item.hidden || item.visible === false) {
                          return false;
                      }
                      const exprProps = filter_schema_1.default(item, this.props.store.data, undefined, this.props);
                      if (exprProps.hidden || exprProps.visible === false) {
                          return false;
                      }
                      return true;
                  });
                  if (!controls.length) {
                      return null;
                  }
                  return (react_1.default.createElement("div", { className: `${ns}Form-row` }, controls.map((control, key) => ~['hidden', 'formula'].indexOf(control.type) ||
                      control.mode === 'inline' ? (this.renderControl(control, key, otherProps)) : (react_1.default.createElement("div", { key: key, className: classnames_1.default(`${ns}Form-col`, control.columnClassName) }, this.renderControl(control, '', Object.assign(Object.assign({}, otherProps), { mode: 'row' })))))));
              }
              return controls.map((control, key) => this.renderControl(control, key, otherProps, region));
          }
          renderControl(control, key = '', otherProps = {}, region = '') {
              if (!control) {
                  return null;
              }
              else if (typeof control === 'string') {
                  control = {
                      type: 'tpl',
                      tpl: control
                  };
              }
              const props = Object.assign(Object.assign({}, this.props), otherProps);
              const form = this.props.store;
              const { render, mode, horizontal, store, disabled, controlWidth, resolveDefinitions, lazyChange, formLazyChange } = props;
              const subProps = {
                  formStore: form,
                  data: store.data,
                  key: `${control.name || ''}-${control.type}-${key}`,
                  formInited: form.inited,
                  formMode: mode,
                  formHorizontal: horizontal,
                  controlWidth,
                  disabled: disabled || control.disabled || form.loading,
                  btnDisabled: form.loading || form.validating,
                  onAction: this.handleAction,
                  onQuery: this.handleQuery,
                  onChange: formLazyChange === false ? this.handleChange : this.lazyHandleChange,
                  addHook: this.addHook,
                  removeHook: this.removeHook,
                  renderFormItems: this.renderFormItems,
                  formPristine: form.pristine
              };
              const subSchema = control.type === 'control'
                  ? control
                  : {
                      type: 'control',
                      control
                  };
              if (subSchema.control) {
                  let control = subSchema.control;
                  if (control.$ref) {
                      subSchema.control = control = Object.assign(Object.assign(Object.assign({}, resolveDefinitions(control.$ref)), control), filter_schema_1.default(control, store.data, undefined, subProps));
                  }
                  else {
                      subSchema.control = control = Object.assign(Object.assign({}, control), filter_schema_1.default(control, store.data, undefined, subProps));
                  }
                  // 自定义组件如果在节点设置了 label name 什么的，就用 formItem 包一层
                  // 至少自动支持了 valdiations, label, description 等逻辑。
                  if (control.component &&
                      (control.formItemConfig ||
                          (control.label !== undefined && control.name))) {
                      const cache = this.componentCache.get(control.component);
                      if (cache) {
                          control.component = cache;
                      }
                      else {
                          const cache = Item_1.asFormItem(Object.assign({ strictMode: false }, control.formItemConfig))(control.component);
                          this.componentCache.set(control.component, cache);
                          control.component = cache;
                      }
                  }
                  control.hiddenOn && (subSchema.hiddenOn = control.hiddenOn);
                  control.visibleOn && (subSchema.visibleOn = control.visibleOn);
                  lazyChange === false && (control.changeImmediately = true);
              }
              return render(`${region ? `${region}/` : ''}${key}`, subSchema, subProps);
          }
          renderBody() {
              const { tabs, fieldSet, controls, mode, className, classnames: cx, debug, $path, store, render } = this.props;
              const { restError } = store;
              const WrapperComponent = this.props.wrapperComponent ||
                  (/(?:\/|^)form\//.test($path) ? 'div' : 'form');
              return (react_1.default.createElement(WrapperComponent, { className: cx(`Form`, `Form--${mode || 'normal'}`, className), onSubmit: this.handleFormSubmit, noValidate: true },
                  debug ? (react_1.default.createElement("pre", null,
                      react_1.default.createElement("code", null, JSON.stringify(store.data, null, 2)))) : null,
                  react_1.default.createElement(Spinner_1.default, { show: store.loading, overlay: true }),
                  this.renderFormItems({
                      tabs,
                      fieldSet,
                      controls
                  }),
                  restError && restError.length ? (react_1.default.createElement("ul", { className: cx('Form-restError', 'Form-feedback') }, restError.map((item, idx) => (react_1.default.createElement("li", { key: idx }, item))))) : null,
                  render('modal', Object.assign(Object.assign({}, (store.action &&
                      store.action.dialog)), { type: 'dialog' }), {
                      key: 'dialog',
                      data: store.dialogData,
                      onConfirm: this.handleDialogConfirm,
                      onClose: this.handleDialogClose,
                      show: store.dialogOpen
                  }),
                  render('modal', Object.assign(Object.assign({}, (store.action &&
                      store.action.drawer)), { type: 'drawer' }), {
                      key: 'drawer',
                      data: store.drawerData,
                      onConfirm: this.handleDrawerConfirm,
                      onClose: this.handleDrawerClose,
                      show: store.drawerOpen
                  }),
                  react_1.default.createElement("input", { type: "submit", style: { display: 'none' } })));
          }
          render() {
              const { wrapWithPanel, render, title, store, panelClassName, headerClassName, footerClassName, footerWrapClassName, actionsClassName, bodyClassName, classnames: cx, affixFooter, lazyLoad, translate: __, footer } = this.props;
              // trace(true);
              // console.log('Form');
              let body = this.renderBody();
              if (wrapWithPanel) {
                  body = render('body', {
                      type: 'panel',
                      title: __(title)
                  }, {
                      className: cx(panelClassName, 'Panel--form'),
                      children: body,
                      actions: this.buildActions(),
                      onAction: this.handleAction,
                      onQuery: this.handleQuery,
                      disabled: store.loading,
                      btnDisabled: store.loading || store.validating,
                      headerClassName,
                      footer,
                      footerClassName,
                      footerWrapClassName,
                      actionsClassName,
                      bodyClassName,
                      affixFooter
                  });
              }
              if (lazyLoad) {
                  body = react_1.default.createElement(components_1.LazyComponent, null, body);
              }
              return body;
          }
      }
      Form.defaultProps = {
          title: 'Form.title',
          submitText: 'Form.submit',
          initFetch: true,
          wrapWithPanel: true,
          mode: 'normal',
          collapsable: false,
          controlWidth: 'full',
          horizontal: {
              left: 2,
              right: 10,
              offset: 2
          },
          panelClassName: 'Panel--default',
          messages: {
              fetchFailed: 'fetchFailed',
              saveSuccess: 'saveSuccess',
              saveFailed: 'saveFailed'
          },
          wrapperComponent: '',
          finishedField: 'finished',
          initFinishedField: 'finished'
      };
      Form.propsList = [
          'title',
          'header',
          'controls',
          'tabs',
          'fieldSet',
          'submitText',
          'initFetch',
          'wrapWithPanel',
          'mode',
          'collapsable',
          'horizontal',
          'panelClassName',
          'messages',
          'wrapperComponent',
          'resetAfterSubmit',
          'clearAfterSubmit',
          'submitOnInit',
          'submitOnChange',
          'onInit',
          'onReset',
          'onSubmit',
          'onChange',
          'onFailed',
          'onFinished',
          'onSaved',
          'canAccessSuperData',
          'lazyChange',
          'formLazyChange',
          'lazyLoad',
          'formInited',
          'simpleMode'
      ];
      return Form;
  })();
  exports.default = Form;
  let FormRenderer = /** @class */ (() => {
      let FormRenderer = class FormRenderer extends Form {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
              super.componentWillMount();
          }
          componentDidMount() {
              super.componentDidMount();
              if (this.props.autoFocus) {
                  const scoped = this.context;
                  const inputs = scoped.getComponents();
                  let focuableInput = find_1.default(inputs, input => input.focus);
                  focuableInput && setTimeout(() => focuableInput.focus(), 200);
              }
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              super.componentWillUnmount();
          }
          doAction(action, data = this.props.store.data, throwErrors = false) {
              return this.handleAction(undefined, action, data, throwErrors);
          }
          handleAction(e, action, ctx, throwErrors = false, delegate) {
              if (action.target && action.actionType !== 'reload') {
                  const scoped = this.context;
                  return Promise.all(action.target.split(',').map(name => {
                      let target = scoped.getComponentByName(name);
                      return (target &&
                          target.doAction &&
                          target.doAction(Object.assign(Object.assign({}, action), { target: undefined }), ctx, throwErrors));
                  }));
              }
              else {
                  return super.handleAction(e, action, ctx, throwErrors, delegate);
              }
          }
          handleDialogConfirm(values, action, ctx, targets) {
              super.handleDialogConfirm(values, action, ctx, targets);
              const store = this.props.store;
              const scoped = this.context;
              if (action.reload) {
                  scoped.reload(action.reload, ctx);
              }
              else if (store.action && store.action.reload) {
                  scoped.reload(store.action.reload, ctx);
              }
          }
          submitToTarget(target, values) {
              const scoped = this.context;
              scoped.send(target, values);
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
          closeTarget(target) {
              const scoped = this.context;
              scoped.close(target);
          }
          reload(target, query, ctx, silent) {
              if (query) {
                  return this.receive(query);
              }
              const scoped = this.context;
              let subPath = '';
              let idx;
              let subQuery = null;
              if (target && ~(idx = target.indexOf('.'))) {
                  subPath = target.substring(idx + 1);
                  target = target.substring(0, idx);
              }
              const idx2 = target ? target.indexOf('?') : -1;
              if (~idx2) {
                  subQuery = tpl_builtin_1.dataMapping(qs_1.default.parse(target.substring(idx2 + 1)), ctx);
                  target = target.substring(0, idx2);
              }
              let component;
              if (target &&
                  (component = scoped.getComponentByName(target)) &&
                  component.reload) {
                  component.reload(subPath, subQuery, ctx);
              }
              else if (target === '*') {
                  super.reload(target, query, ctx, silent);
                  const components = scoped.getComponents();
                  components.forEach((component) => component.reload && component.reload('', subQuery, ctx));
              }
              else {
                  super.reload(target, query, ctx, silent);
              }
          }
          receive(values, name) {
              if (name) {
                  const scoped = this.context;
                  const idx = name.indexOf('.');
                  let subPath = '';
                  if (~idx) {
                      subPath = name.substring(1 + idx);
                      name = name.substring(0, idx);
                  }
                  const component = scoped.getComponentByName(name);
                  component && component.receive && component.receive(values, subPath);
                  return;
              }
              return super.receive(values);
          }
      };
      FormRenderer.contextType = Scoped_1.ScopedContext;
      FormRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: (path) => /(^|\/)form$/.test(path) &&
                  !/(^|\/)form(?:\/.+)?\/control\/form$/.test(path),
              storeType: form_1.FormStore.name,
              name: 'form',
              isolateScope: true,
              shouldSyncSuperStore: (store, nextProps) => {
                  // 如果是 QuickEdit，让 store 同步 __super 数据。
                  if (nextProps.canAccessSuperData &&
                      nextProps.quickEditFormRef &&
                      nextProps.onQuickChange) {
                      return true;
                  }
                  return undefined;
              }
          })
      ], FormRenderer);
      return FormRenderer;
  })();
  exports.FormRenderer = FormRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsMkNBQXNEO0FBRXRELDJDQUF1RDtBQUV2RCx5Q0FBdUQ7QUFDdkQsb0VBQTRCO0FBQzVCLHNGQUEwRDtBQUMxRCwrQ0FVNEI7QUFDNUIsdUVBQXNDO0FBQ3RDLHFFQUFxQztBQUNyQywrREFBK0I7QUFDL0IseUNBSXNCO0FBRXRCLG9EQUFvQjtBQUNwQix5REFBb0Q7QUFDcEQseUNBQThEO0FBQzlELCtFQUErQztBQUMvQyxpREFBK0M7QUFDL0MscURBQXdDO0FBQ3hDLGlDQUFxRDtBQUNyRCxxREFBZ0Q7QUF3U2hEO0lBQUEsTUFBcUIsSUFBSyxTQUFRLGVBQUssQ0FBQyxTQUE0QjtRQXlFbEUsWUFBWSxLQUFnQjtZQUMxQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFoQmYsVUFBSyxHQUVELEVBQUUsQ0FBQztZQUlQLHNCQUFpQixHQUFZLEtBQUssQ0FBQztZQUduQyxxQkFBZ0IsR0FBRyxrQkFBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRTtnQkFDNUQsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDLENBQUM7WUFDSCxtQkFBYyxHQUFjLElBQUkscUJBQVMsRUFBRSxDQUFDO1lBSzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFH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

});
