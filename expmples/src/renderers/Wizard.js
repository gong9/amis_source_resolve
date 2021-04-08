amis.define('src/renderers/Wizard.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.WizardRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Scoped_1 = require("src/Scoped.tsx");
  const factory_1 = require("src/factory.tsx");
  const service_1 = require("src/store/service.ts");
  const types_1 = require("src/types.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const api_1 = require("src/utils/api.ts");
  const components_1 = require("src/components/index.tsx");
  const react_dom_1 = require("node_modules/react-dom/index");
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  let Wizard = /** @class */ (() => {
      var _a, _b, _c, _d, _e, _f;
      class Wizard extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.affixDom = react_1.default.createRef();
              this.footerDom = react_1.default.createRef();
              this.initalValues = {};
              this.state = {
                  currentStep: -1 // init 完后会设置成 1
              };
          }
          componentDidMount() {
              const { initApi, initFetch, initAsyncApi, initFinishedField, store, messages: { fetchSuccess, fetchFailed }, onInit } = this.props;
              if (api_1.isEffectiveApi(initApi, store.data, initFetch)) {
                  store
                      .fetchInitData(initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed,
                      onSuccess: () => {
                          if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                              store.data[initFinishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(() => store.checkRemote(initAsyncApi, store.data), (ret) => ret && ret[initFinishedField || 'finished'], cancel => (this.asyncCancel = cancel));
                      }
                  })
                      .then(value => {
                      onInit && onInit(store.data);
                      const state = {
                          currentStep: 1
                      };
                      if (value &&
                          value.data &&
                          (typeof value.data.step === 'number' ||
                              (typeof value.data.step === 'string' &&
                                  /^\d+$/.test(value.data.step)))) {
                          state.currentStep = parseInt(value.data.step, 10);
                      }
                      this.setState(state, () => {
                          // 如果 initApi 返回的状态是正在提交，则进入轮顺状态。
                          if (value &&
                              value.data &&
                              (value.data.submiting || value.data.submited)) {
                              this.checkSubmit();
                          }
                      });
                      return value;
                  });
              }
              else {
                  this.setState({
                      currentStep: 1
                  }, () => onInit && onInit(store.data));
              }
              const dom = react_dom_1.findDOMNode(this);
              if (!(dom instanceof Element)) {
                  return;
              }
              let parent = dom ? helper_1.getScrollParent(dom) : null;
              if (!parent || parent === document.body) {
                  parent = window;
              }
              this.parentNode = parent;
              parent.addEventListener('scroll', this.affixDetect);
              this.unSensor = resize_sensor_1.resizeSensor(dom, this.affixDetect);
              this.affixDetect();
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              const { store, fetchSuccess, fetchFailed } = props;
              if (api_1.isApiOutdated(prevProps.initApi, props.initApi, prevProps.data, props.data)) {
                  store.fetchData(props.initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed
                  });
              }
          }
          componentWillUnmount() {
              this.asyncCancel && this.asyncCancel();
              const parent = this.parentNode;
              parent && parent.removeEventListener('scroll', this.affixDetect);
              this.unSensor && this.unSensor();
          }
          affixDetect() {
              if (!this.props.affixFooter ||
                  !this.affixDom.current ||
                  !this.footerDom.current) {
                  return;
              }
              const affixDom = this.affixDom.current;
              const footerDom = this.footerDom.current;
              let affixed = false;
              footerDom.offsetWidth &&
                  (affixDom.style.cssText = `width: ${footerDom.offsetWidth}px;`);
              if (this.props.affixFooter === 'always') {
                  affixed = true;
                  footerDom.classList.add('invisible2');
              }
              else {
                  const clip = footerDom.getBoundingClientRect();
                  const clientHeight = window.innerHeight;
                  affixed = clip.top + clip.height / 2 > clientHeight;
              }
              affixed ? affixDom.classList.add('in') : affixDom.classList.remove('in');
          }
          gotoStep(index) {
              const steps = this.props.steps || [];
              index = Math.max(Math.min(steps.length, index), 1);
              this.setState({
                  currentStep: index
              });
          }
          formRef(ref) {
              if (ref) {
                  while (ref && ref.getWrappedInstance) {
                      ref = ref.getWrappedInstance();
                  }
                  this.form = ref;
              }
              else {
                  this.form = undefined;
              }
          }
          submitToTarget(target, values) {
              throw new Error('Please implements this!');
          }
          reloadTarget(target, data) {
              throw new Error('Please implements this!');
          }
          reload(subPath, query, ctx) {
              if (query) {
                  return this.receive(query);
              }
              const { initApi, initAsyncApi, initFinishedField, store, messages: { fetchSuccess, fetchFailed } } = this.props;
              if (api_1.isEffectiveApi(initApi, store.data) && this.state.currentStep === 1) {
                  store
                      .fetchInitData(initApi, store.data, {
                      successMessage: fetchSuccess,
                      errorMessage: fetchFailed,
                      onSuccess: () => {
                          if (!api_1.isEffectiveApi(initAsyncApi, store.data) ||
                              store.data[initFinishedField || 'finished']) {
                              return;
                          }
                          return helper_1.until(() => store.checkRemote(initAsyncApi, store.data), (ret) => ret && ret[initFinishedField || 'finished'], cancel => (this.asyncCancel = cancel));
                      }
                  })
                      .then(value => {
                      const state = {
                          currentStep: 1
                      };
                      if (value &&
                          value.data &&
                          (typeof value.data.step === 'number' ||
                              (typeof value.data.step === 'string' &&
                                  /^\d+$/.test(value.data.step)))) {
                          state.currentStep = parseInt(value.data.step, 10);
                      }
                      this.setState(state, () => {
                          // 如果 initApi 返回的状态是正在提交，则进入轮顺状态。
                          if (value &&
                              value.data &&
                              (value.data.submiting || value.data.submited)) {
                              this.checkSubmit();
                          }
                      });
                      return value;
                  });
              }
          }
          receive(values) {
              const { store } = this.props;
              store.updateData(values);
              this.reload();
          }
          domRef(ref) {
              this.dom = ref;
          }
          getPopOverContainer() {
              return this.dom;
          }
          // 用来还原异步提交状态。
          checkSubmit() {
              const { store, steps, asyncApi, finishedField, env } = this.props;
              const step = steps[this.state.currentStep - 1];
              let finnalAsyncApi = (step && step.asyncApi) ||
                  (this.state.currentStep === steps.length && asyncApi);
              if (!step || !api_1.isEffectiveApi(finnalAsyncApi, store.data)) {
                  return;
              }
              store.markSaving(true);
              store.updateData({
                  [finishedField || 'finished']: false
              });
              helper_1.until(() => store.checkRemote(finnalAsyncApi, store.data), (ret) => ret && ret[finishedField || 'finished'], cancel => (this.asyncCancel = cancel))
                  .then(() => {
                  store.markSaving(false);
                  this.gotoStep(this.state.currentStep + 1);
              })
                  .catch(e => {
                  env.notify('error', e.message);
                  store.markSaving(false);
              });
          }
          handleAction(e, action, data, throwErrors = false, delegate) {
              const { onAction, store, env } = this.props;
              if (action.actionType === 'next' || action.type === 'submit') {
                  this.form.doAction(Object.assign(Object.assign({}, action), { actionType: 'submit' }), data);
              }
              else if (action.actionType === 'prev') {
                  this.gotoStep(this.state.currentStep - 1);
              }
              else if (action.type === 'reset') {
                  this.form.reset();
              }
              else if (action.actionType === 'dialog') {
                  store.openDialog(data);
              }
              else if (action.actionType === 'ajax') {
                  if (!action.api) {
                      return env.alert(`当 actionType 为 ajax 时，请设置 api 属性`);
                  }
                  return store
                      .saveRemote(action.api, data, {
                      successMessage: action.messages && action.messages.success,
                      errorMessage: action.messages && action.messages.failed
                  })
                      .then(async () => {
                      this.form && this.form.isValidated() && this.form.validate(true);
                      if (action.feedback && helper_1.isVisible(action.feedback, store.data)) {
                          await this.openFeedback(action.feedback, store.data);
                      }
                      const reidrect = action.redirect && tpl_1.filter(action.redirect, store.data);
                      reidrect && env.jumpTo(reidrect, action);
                      action.reload && this.reloadTarget(action.reload, store.data);
                  })
                      .catch(() => { });
              }
              else if (action.actionType === 'reload') {
                  action.target && this.reloadTarget(action.target, data);
              }
              else if (onAction) {
                  onAction(e, action, data, throwErrors, delegate || this.context);
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
          handleChange(values) {
              const { store } = this.props;
              store.updateData(values);
          }
          handleInit(values) {
              const step = this.state.currentStep;
              this.initalValues[step] = this.initalValues[step] || values;
          }
          handleReset(values) {
              const { store } = this.props;
              const initalValue = this.initalValues[this.state.currentStep];
              const reseted = {};
              Object.keys(values).forEach(key => {
                  reseted[key] = initalValue.hasOwnProperty(key)
                      ? initalValue[key]
                      : undefined;
              });
              store.updateData(reseted);
          }
          // 接管里面 form 的提交，不能直接让 form 提交，因为 wizard 自己需要知道进度。
          handleSubmit(values, action) {
              const { store, steps, api, asyncApi, finishedField, target, redirect, reload, env, onFinished } = this.props;
              const step = steps[this.state.currentStep - 1];
              store.updateData(values);
              if (this.state.currentStep < steps.length) {
                  let finnalAsyncApi = action.asyncApi || step.asyncApi;
                  api_1.isEffectiveApi(finnalAsyncApi, store.data) &&
                      store.updateData({
                          [finishedField || 'finished']: false
                      });
                  if (api_1.isEffectiveApi(action.api || step.api, store.data)) {
                      store
                          .saveRemote(action.api || step.api, store.data, {
                          onSuccess: () => {
                              if (!api_1.isEffectiveApi(finnalAsyncApi, store.data) ||
                                  store.data[finishedField || 'finished']) {
                                  return;
                              }
                              return helper_1.until(() => store.checkRemote(finnalAsyncApi, store.data), (ret) => ret && ret[finishedField || 'finished'], cancel => (this.asyncCancel = cancel));
                          },
                          onFailed: json => {
                              if (json.status === 422 && json.errors && this.form) {
                                  this.form.props.store.handleRemoteError(json.errors);
                              }
                          }
                      })
                          .then((value) => this.gotoStep(value && typeof value.step === 'number'
                          ? value.step
                          : this.state.currentStep + 1))
                          .catch(() => {
                          // do nothing
                      });
                  }
                  else {
                      this.gotoStep(this.state.currentStep + 1);
                  }
              }
              else {
                  // 最后一步
                  if (target) {
                      this.submitToTarget(target, store.data);
                  }
                  else if (action.api || step.api || api) {
                      let finnalAsyncApi = action.asyncApi || step.asyncApi || asyncApi;
                      api_1.isEffectiveApi(finnalAsyncApi, store.data) &&
                          store.updateData({
                              [finishedField || 'finished']: false
                          });
                      const formStore = this.form
                          ? this.form.props.store
                          : store;
                      store.markSaving(true);
                      formStore
                          .saveRemote(action.api || step.api || api, store.data, {
                          onSuccess: () => {
                              if (!api_1.isEffectiveApi(finnalAsyncApi, store.data) ||
                                  store.data[finishedField || 'finished']) {
                                  return;
                              }
                              return helper_1.until(() => store.checkRemote(finnalAsyncApi, store.data), (ret) => ret && ret[finishedField || 'finished'], cancel => (this.asyncCancel = cancel));
                          }
                      })
                          .then(value => {
                          store.updateData(Object.assign(Object.assign({}, store.data), value));
                          store.markSaving(false);
                          if (value && typeof value.step === 'number') {
                              this.gotoStep(value.step);
                          }
                          else if (onFinished && onFinished(value, action) === false) {
                              // 如果是 false 后面的操作就不执行
                              return value;
                          }
                          const finalRedirect = (action.redirect || step.redirect || redirect) &&
                              tpl_1.filter(action.redirect || step.redirect || redirect, store.data);
                          if (finalRedirect) {
                              env.jumpTo(finalRedirect, action);
                          }
                          else if (action.reload || step.reload || reload) {
                              this.reloadTarget(action.reload || step.reload || reload, store.data);
                          }
                          return value;
                      })
                          .catch(e => {
                          store.markSaving(false);
                          console.error(e);
                      });
                  }
                  else {
                      onFinished && onFinished(store.data, action);
                  }
              }
              return false;
          }
          handleDialogConfirm(values, action, targets) {
              const { store } = this.props;
              if (action.mergeData &&
                  values.length === 1 &&
                  values[0] &&
                  targets[0].props.type === 'form') {
                  store.updateData(values[0]);
              }
              store.closeDialog();
          }
          handleDialogClose() {
              const { store } = this.props;
              store.closeDialog();
          }
          renderSteps() {
              const { steps, store, mode, classPrefix: ns, classnames: cx } = this.props;
              const currentStep = this.state.currentStep;
              return (react_1.default.createElement("div", { className: `${ns}Wizard-steps`, id: "form-wizard" }, Array.isArray(steps) && steps.length ? (react_1.default.createElement("ul", null, steps.map((step, key) => {
                  const canJump = isJumpable(step, key, currentStep, store.data);
                  return (react_1.default.createElement("li", { key: key, className: cx({
                          'is-complete': canJump,
                          'is-active': currentStep === key + 1
                      }), onClick: () => (canJump ? this.gotoStep(key + 1) : null) },
                      react_1.default.createElement("span", { className: cx('Badge', {
                              // 'Badge--success': canJump && currentStep != key + 1,
                              'is-active': currentStep === key + 1 ||
                                  (canJump && currentStep != key + 1)
                          }) }, key + 1),
                      step.title || step.label || `第 ${key + 1} 步`));
              }))) : null));
          }
          renderActions() {
              const { steps, store, readOnly, disabled, actionClassName, actionPrevLabel, actionNextLabel, actionNextSaveLabel, actionFinishLabel, render, translate: __ } = this.props;
              if (!Array.isArray(steps)) {
                  return null;
              }
              const currentStepIndex = this.state.currentStep;
              const nextStep = steps[currentStepIndex];
              const prevStep = steps[currentStepIndex - 2];
              const waiting = store.loading;
              const step = steps[currentStepIndex - 1];
              if (!step) {
                  return null;
              }
              const prevCanJump = prevStep
                  ? isJumpable(prevStep, currentStepIndex - 2, currentStepIndex, store.data)
                  : false;
              if (step.actions && Array.isArray(step.actions)) {
                  return step.actions.length ? (react_1.default.createElement(react_1.default.Fragment, null, step.actions.map((action, index) => render(`action/${index}`, action, {
                      key: index,
                      onAction: this.handleAction,
                      disabled: action.disabled ||
                          waiting ||
                          disabled ||
                          (action.actionType === 'prev' && !prevCanJump) ||
                          (action.actionType === 'next' &&
                              readOnly &&
                              (!!step.api || !nextStep))
                  })))) : null;
              }
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  render(`prev-btn`, {
                      type: 'button',
                      label: __(actionPrevLabel),
                      actionType: 'prev',
                      className: actionClassName
                  }, {
                      disabled: waiting || !prevCanJump || disabled,
                      onAction: this.handleAction
                  }),
                  render(`next-btn`, {
                      type: 'button',
                      label: !nextStep
                          ? __(actionFinishLabel)
                          : !step.api
                              ? __(actionNextLabel)
                              : __(actionNextSaveLabel),
                      actionType: 'next',
                      primary: !nextStep || !!step.api,
                      className: actionClassName
                  }, {
                      disabled: waiting || disabled || (readOnly && (!!step.api || !nextStep)),
                      onAction: this.handleAction
                  })));
          }
          renderFooter() {
              const actions = this.renderActions();
              if (!actions) {
                  return actions;
              }
              const { classnames: cx, affixFooter } = this.props;
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  react_1.default.createElement("div", { role: "wizard-footer", ref: this.footerDom, className: cx('Panel-footer Wizard-footer') }, actions),
                  affixFooter ? (react_1.default.createElement("div", { ref: this.affixDom, className: cx('Panel-fixedBottom Wizard-footer') },
                      react_1.default.createElement("div", { className: cx('Panel-footer') }, actions))) : null));
          }
          renderWizard() {
              const { className, steps, render, store, classPrefix: ns, classnames: cx, popOverContainer, mode, translate: __ } = this.props;
              const currentStep = this.state.currentStep;
              const step = Array.isArray(steps) ? steps[currentStep - 1] : null;
              return (react_1.default.createElement("div", { ref: this.domRef, className: cx(`${ns}Panel ${ns}Panel--default ${ns}Wizard ${ns}Wizard--${mode}`, className) },
                  react_1.default.createElement("div", { className: `${ns}Wizard-step` },
                      this.renderSteps(),
                      react_1.default.createElement("div", { role: "wizard-body", className: `${ns}Wizard-stepContent clearfix` }, step ? (render('body', Object.assign(Object.assign({}, step), { type: 'form', wrapWithPanel: false, 
                          // 接口相关需要外部来接管
                          api: null }), {
                          key: this.state.currentStep,
                          ref: this.formRef,
                          onInit: this.handleInit,
                          onReset: this.handleReset,
                          onSubmit: this.handleSubmit,
                          onAction: this.handleAction,
                          onQuery: this.handleQuery,
                          disabled: store.loading,
                          popOverContainer: popOverContainer || this.getPopOverContainer,
                          onChange: this.handleChange
                      })) : currentStep === -1 ? (__('loading')) : (react_1.default.createElement("p", { className: "text-danger" }, __('Wizard.configError')))),
                      this.renderFooter()),
                  render('dialog', Object.assign(Object.assign({}, (store.action &&
                      store.action.dialog)), { type: 'dialog' }), {
                      key: 'dialog',
                      data: store.dialogData,
                      onConfirm: this.handleDialogConfirm,
                      onClose: this.handleDialogClose,
                      show: store.dialogOpen
                  }),
                  react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: store.loading })));
          }
          render() {
              return this.renderWizard();
          }
      }
      Wizard.defaultProps = {
          mode: 'horizontal',
          readOnly: false,
          messages: {},
          actionClassName: '',
          actionPrevLabel: 'Wizard.prev',
          actionNextLabel: 'Wizard.next',
          actionNextSaveLabel: 'Wizard.saveAndNext',
          actionFinishLabel: 'Wizard.finish'
      };
      Wizard.propsList = [
          'steps',
          'mode',
          'messages',
          'actionClassName',
          'actionPrevLabel',
          'actionNextLabel',
          'actionNextSaveLabel',
          'actionFinishLabel',
          'onFinished',
          'affixFooter'
      ];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "affixDetect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "formRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "domRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "getPopOverContainer", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_b = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _b : Object, Object, Boolean, typeof (_c = typeof Scoped_1.IScopedContext !== "undefined" && Scoped_1.IScopedContext) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleAction", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleQuery", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleInit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleReset", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleSubmit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Array, typeof (_e = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _e : Object, typeof (_f = typeof Array !== "undefined" && Array) === "function" ? _f : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleDialogConfirm", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Wizard.prototype, "handleDialogClose", null);
      return Wizard;
  })();
  exports.default = Wizard;
  function isJumpable(step, index, currentStep, data) {
      let canJump = false;
      if (step && step.hasOwnProperty('jumpable')) {
          canJump = step.jumpable;
      }
      else if (step && step.jumpableOn) {
          canJump = tpl_1.evalExpression(step.jumpableOn, helper_1.createObject(data, {
              currentStep
          }));
      }
      else {
          canJump = index + 1 < currentStep;
      }
      return canJump;
  }
  let WizardRenderer = /** @class */ (() => {
      let WizardRenderer = class WizardRenderer extends Wizard {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              super.componentWillUnmount();
          }
          doAction(action, data, throwErrors = false) {
              return this.handleAction(undefined, action, data);
          }
          submitToTarget(target, values) {
              const scoped = this.context;
              scoped.send(target, values);
          }
          reloadTarget(target, data) {
              const scoped = this.context;
              scoped.reload(target, data);
          }
          handleDialogConfirm(values, action, targets) {
              super.handleDialogConfirm(values, action, targets);
              const store = this.props.store;
              const scoped = this.context;
              if (action.reload) {
                  scoped.reload(action.reload, store.data);
              }
              else if (store.action && store.action.reload) {
                  scoped.reload(store.action.reload, store.data);
              }
          }
      };
      WizardRenderer.contextType = Scoped_1.ScopedContext;
      WizardRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)wizard$/,
              storeType: service_1.ServiceStore.name,
              name: 'wizard',
              isolateScope: true
          })
      ], WizardRenderer);
      return WizardRenderer;
  })();
  exports.WizardRenderer = WizardRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV2l6YXJkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9XaXphcmQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsc0NBQXdEO0FBQ3hELHdDQUFtRDtBQUNuRCw4Q0FBNkQ7QUFDN0Qsb0NBQXFDO0FBQ3JDLHNDQUFvRDtBQUNwRCw0Q0FNeUI7QUFDekIsc0NBQTJEO0FBRTNELDhDQUFzQztBQUN0Qyx5Q0FBc0M7QUFDdEMsMERBQW9EO0FBMkpwRDs7SUFBQSxNQUFxQixNQUFPLFNBQVEsZUFBSyxDQUFDLFNBQW1DO1FBQTdFOztZQStCRSxhQUFRLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM5RCxjQUFTLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUMvRCxpQkFBWSxHQUVSLEVBQUUsQ0FBQztZQUVQLFVBQUssR0FBRztnQkFDTixXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCO2FBQ2pDLENBQUM7UUE0eEJKLENBQUM7UUExeEJDLGlCQUFpQjtZQUNmLE1BQU0sRUFDSixPQUFPLEVBQ1AsU0FBUyxFQUNULFlBQVksRUFDWixpQkFBaUIsRUFDakIsS0FBSyxFQUNMLFFBQVEsRUFBRSxFQUFDLFlBQVksRUFBRSxXQUFXLEVBQUMsRUFDckMsTUFBTSxFQUNQLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksb0JBQWMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDbEQsS0FBSztxQkFDRixhQUFhLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2xDLGNBQWMsRUFBRSxZQUFZO29CQUM1QixZQUFZLEVBQUUsV0FBVztvQkFDekIsU0FBUyxFQUFFLEdBQUcsRUFBRTt3QkFDZCxJ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

});
