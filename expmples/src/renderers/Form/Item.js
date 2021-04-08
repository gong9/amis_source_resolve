amis.define('src/renderers/Form/Item.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FormItem = exports.registerFormItem = exports.asFormItem = exports.detectProps = exports.FormItemWrap = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const mobx_1 = require("node_modules/mobx/lib/index");
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  const types_1 = require("src/types.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const WithStore_1 = require("src/WithStore.tsx");
  let FormItemWrap = /** @class */ (() => {
      var _a, _b;
      class FormItemWrap extends react_1.default.Component {
          componentWillMount() {
              const { formItem: model } = this.props;
              if (model) {
                  this.reaction = mobx_1.reaction(() => `${model.errors.join('')}${model.isFocused}${model.dialogOpen}`, () => this.forceUpdate());
              }
          }
          componentWillUnmount() {
              this.reaction && this.reaction();
          }
          handleFocus(e) {
              const { formItem: model } = this.props;
              model && model.focus();
              this.props.onFocus && this.props.onFocus(e);
          }
          handleBlur(e) {
              const { formItem: model } = this.props;
              model && model.blur();
              this.props.onBlur && this.props.onBlur(e);
          }
          async handleOpenDialog(schema, data) {
              const { formItem: model } = this.props;
              if (!model) {
                  return;
              }
              return new Promise(resolve => model.openDialog(schema, data, (result) => resolve(result)));
          }
          handleDialogConfirm([values]) {
              const { formItem: model } = this.props;
              if (!model) {
                  return;
              }
              model.closeDialog(values);
          }
          handleDialogClose() {
              const { formItem: model } = this.props;
              if (!model) {
                  return;
              }
              model.closeDialog();
          }
          renderControl() {
              const _a = this.props, { inputClassName, formItem: model, classnames: cx, children, type, renderControl, formItemConfig, sizeMutable, size, defaultSize } = _a, rest = tslib_1.__rest(_a, ["inputClassName", "formItem", "classnames", "children", "type", "renderControl", "formItemConfig", "sizeMutable", "size", "defaultSize"]);
              if (renderControl) {
                  const controlSize = size || defaultSize;
                  return renderControl(Object.assign(Object.assign({}, rest), { onOpenDialog: this.handleOpenDialog, type, classnames: cx, formItem: model, className: cx(`Form-control`, {
                          'is-inline': !!rest.inline,
                          'is-error': model && !model.valid,
                          [`Form-control--withSize Form-control--size${helper_1.ucFirst(controlSize)}`]: sizeMutable !== false &&
                              typeof controlSize === 'string' &&
                              !!controlSize &&
                              controlSize !== 'full'
                      }, inputClassName) }));
              }
              return null;
          }
          renderHorizontal() {
              let { className, classnames: cx, description, descriptionClassName, captionClassName, desc, label, labelClassName, render, required, caption, remark, labelRemark, env, formItem: model, renderLabel, renderDescription, hint, data, showErrorMsg } = this.props;
              // 强制不渲染 label 的话
              if (renderLabel === false) {
                  label = label === false ? false : '';
              }
              description = description || desc;
              const horizontal = this.props.horizontal || this.props.formHorizontal;
              const left = helper_1.getWidthRate(horizontal.left);
              const right = helper_1.getWidthRate(horizontal.right);
              return (react_1.default.createElement("div", { "data-role": "form-item", className: cx(`Form-item Form-item--horizontal`, className, {
                      [`is-error`]: model && !model.valid,
                      [`is-required`]: required
                  }) },
                  label !== false ? (react_1.default.createElement("label", { className: cx(`Form-label`, {
                          [`Form-itemColumn--${typeof horizontal.leftFixed === 'string'
                              ? horizontal.leftFixed
                              : 'normal'}`]: horizontal.leftFixed,
                          [`Form-itemColumn--${left}`]: !horizontal.leftFixed
                      }, labelClassName) },
                      react_1.default.createElement("span", null,
                          label ? render('label', tpl_1.filter(label, data)) : null,
                          required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx(`Form-star`) }, "*")) : null,
                          labelRemark
                              ? render('label-remark', {
                                  type: 'remark',
                                  icon: labelRemark.icon || 'warning-mark',
                                  tooltip: labelRemark,
                                  className: cx(`Form-labelRemark`),
                                  container: env && env.getModalContainer
                                      ? env.getModalContainer
                                      : undefined
                              })
                              : null))) : null,
                  react_1.default.createElement("div", { className: cx(`Form-value`, {
                          // [`Form-itemColumn--offset${getWidthRate(horizontal.offset)}`]: !label && label !== false,
                          [`Form-itemColumn--${right}`]: !!right && right !== 12 - left
                      }) },
                      this.renderControl(),
                      caption
                          ? render('caption', caption, {
                              className: cx(`Form-caption`, captionClassName)
                          })
                          : null,
                      remark
                          ? render('remark', {
                              type: 'remark',
                              icon: remark.icon || 'warning-mark',
                              tooltip: remark,
                              className: cx(`Form-remark`),
                              container: env && env.getModalContainer
                                  ? env.getModalContainer
                                  : undefined
                          })
                          : null,
                      hint && model && model.isFocused
                          ? render('hint', hint, {
                              className: cx(`Form-hint`)
                          })
                          : null,
                      model &&
                          !model.valid &&
                          showErrorMsg !== false &&
                          Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx(`Form-feedback`) }, model.errors.map((msg, key) => (react_1.default.createElement("li", { key: key }, msg))))) : null,
                      renderDescription !== false && description
                          ? render('description', description, {
                              className: cx(`Form-description`, descriptionClassName)
                          })
                          : null)));
          }
          renderNormal() {
              let { className, classnames: cx, desc, description, label, labelClassName, render, required, caption, remark, labelRemark, env, descriptionClassName, captionClassName, formItem: model, renderLabel, renderDescription, hint, formMode, data, showErrorMsg } = this.props;
              description = description || desc;
              return (react_1.default.createElement("div", { "data-role": "form-item", className: cx(`Form-item Form-item--${formMode}`, className, {
                      'is-error': model && !model.valid,
                      [`is-required`]: required
                  }) },
                  label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx(`Form-label`, labelClassName) },
                      react_1.default.createElement("span", null,
                          label ? render('label', tpl_1.filter(label, data)) : null,
                          required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx(`Form-star`) }, "*")) : null,
                          labelRemark
                              ? render('label-remark', {
                                  type: 'remark',
                                  icon: labelRemark.icon || 'warning-mark',
                                  tooltip: labelRemark,
                                  className: cx(`Form-lableRemark`),
                                  container: env && env.getModalContainer
                                      ? env.getModalContainer
                                      : undefined
                              })
                              : null))) : null,
                  this.renderControl(),
                  caption
                      ? render('caption', caption, {
                          className: cx(`Form-caption`, captionClassName)
                      })
                      : null,
                  remark
                      ? render('remark', {
                          type: 'remark',
                          icon: remark.icon || 'warning-mark',
                          className: cx(`Form-remark`),
                          tooltip: remark,
                          container: env && env.getModalContainer ? env.getModalContainer : undefined
                      })
                      : null,
                  hint && model && model.isFocused
                      ? render('hint', hint, {
                          className: cx(`Form-hint`)
                      })
                      : null,
                  model &&
                      !model.valid &&
                      showErrorMsg !== false &&
                      Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx(`Form-feedback`) }, model.errors.map((msg, key) => (react_1.default.createElement("li", { key: key }, msg))))) : null,
                  renderDescription !== false && description
                      ? render('description', description, {
                          className: cx(`Form-description`, descriptionClassName)
                      })
                      : null));
          }
          renderInline() {
              let { className, classnames: cx, desc, description, label, labelClassName, render, required, caption, descriptionClassName, captionClassName, formItem: model, remark, labelRemark, env, hint, renderLabel, renderDescription, data, showErrorMsg } = this.props;
              description = description || desc;
              return (react_1.default.createElement("div", { "data-role": "form-item", className: cx(`Form-item Form-item--inline`, className, {
                      'is-error': model && !model.valid,
                      [`is-required`]: required
                  }) },
                  label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx(`Form-label`, labelClassName) },
                      react_1.default.createElement("span", null,
                          label ? render('label', tpl_1.filter(label, data)) : label,
                          required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx(`Form-star`) }, "*")) : null,
                          labelRemark
                              ? render('label-remark', {
                                  type: 'remark',
                                  icon: labelRemark.icon || 'warning-mark',
                                  tooltip: labelRemark,
                                  className: cx(`Form-lableRemark`),
                                  container: env && env.getModalContainer
                                      ? env.getModalContainer
                                      : undefined
                              })
                              : null))) : null,
                  react_1.default.createElement("div", { className: cx(`Form-value`) },
                      this.renderControl(),
                      caption
                          ? render('caption', caption, {
                              className: cx(`Form-caption`, captionClassName)
                          })
                          : null,
                      remark
                          ? render('remark', {
                              type: 'remark',
                              icon: remark.icon || 'warning-mark',
                              className: cx(`Form-remark`),
                              tooltip: remark,
                              container: env && env.getModalContainer
                                  ? env.getModalContainer
                                  : undefined
                          })
                          : null,
                      hint && model && model.isFocused
                          ? render('hint', hint, {
                              className: cx(`Form-hint`)
                          })
                          : null,
                      model &&
                          !model.valid &&
                          showErrorMsg !== false &&
                          Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx(`Form-feedback`) }, model.errors.map((msg, key) => (react_1.default.createElement("li", { key: key }, msg))))) : null,
                      renderDescription !== false && description
                          ? render('description', description, {
                              className: cx(`Form-description`, descriptionClassName)
                          })
                          : null)));
          }
          renderRow() {
              let { className, classnames: cx, desc, description, label, labelClassName, render, required, caption, remark, labelRemark, env, descriptionClassName, captionClassName, formItem: model, renderLabel, renderDescription, hint, formMode, data, showErrorMsg } = this.props;
              description = description || desc;
              return (react_1.default.createElement("div", { "data-role": "form-item", className: cx(`Form-item Form-item--${formMode}`, className, {
                      'is-error': model && !model.valid,
                      [`is-required`]: required
                  }) },
                  react_1.default.createElement("div", { className: cx('Form-rowInner') },
                      label && renderLabel !== false ? (react_1.default.createElement("label", { className: cx(`Form-label`, labelClassName) },
                          react_1.default.createElement("span", null,
                              render('label', tpl_1.filter(label, data)),
                              required && (label || labelRemark) ? (react_1.default.createElement("span", { className: cx(`Form-star`) }, "*")) : null,
                              labelRemark
                                  ? render('label-remark', {
                                      type: 'remark',
                                      icon: labelRemark.icon || 'warning-mark',
                                      tooltip: labelRemark,
                                      className: cx(`Form-lableRemark`),
                                      container: env && env.getModalContainer
                                          ? env.getModalContainer
                                          : undefined
                                  })
                                  : null))) : null,
                      this.renderControl(),
                      caption
                          ? render('caption', caption, {
                              className: cx(`Form-caption`, captionClassName)
                          })
                          : null,
                      remark
                          ? render('remark', {
                              type: 'remark',
                              icon: remark.icon || 'warning-mark',
                              className: cx(`Form-remark`),
                              tooltip: remark,
                              container: env && env.getModalContainer
                                  ? env.getModalContainer
                                  : undefined
                          })
                          : null),
                  hint && model && model.isFocused
                      ? render('hint', hint, {
                          className: cx(`Form-hint`)
                      })
                      : null,
                  model &&
                      !model.valid &&
                      showErrorMsg !== false &&
                      Array.isArray(model.errors) ? (react_1.default.createElement("ul", { className: cx('Form-feedback') }, model.errors.map((msg, key) => (react_1.default.createElement("li", { key: key }, msg))))) : null,
                  description && renderDescription !== false
                      ? render('description', description, {
                          className: cx(`Form-description`, descriptionClassName)
                      })
                      : null));
          }
          render() {
              const { formMode, inputOnly, wrap, render, formItem: model } = this.props;
              if (wrap === false || inputOnly) {
                  return this.renderControl();
              }
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  formMode === 'inline'
                      ? this.renderInline()
                      : formMode === 'horizontal'
                          ? this.renderHorizontal()
                          : formMode === 'row'
                              ? this.renderRow()
                              : this.renderNormal(),
                  model
                      ? render('modal', Object.assign({ type: 'dialog' }, model.dialogSchema), {
                          show: model.dialogOpen,
                          onClose: this.handleDialogClose,
                          onConfirm: this.handleDialogConfirm,
                          data: model.dialogData
                      })
                      : null));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], FormItemWrap.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], FormItemWrap.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof types_1.Schema !== "undefined" && types_1.Schema) === "function" ? _a : Object, Object]),
          tslib_1.__metadata("design:returntype", Promise)
      ], FormItemWrap.prototype, "handleOpenDialog", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], FormItemWrap.prototype, "handleDialogConfirm", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], FormItemWrap.prototype, "handleDialogClose", null);
      return FormItemWrap;
  })();
  exports.FormItemWrap = FormItemWrap;
  // 白名单形式，只有这些属性发生变化，才会往下更新。
  // 除非配置  strictMode
  exports.detectProps = [
      'formPristine',
      'formInited',
      'addable',
      'addButtonClassName',
      'addButtonText',
      'addOn',
      'btnClassName',
      'btnLabel',
      'btnDisabled',
      'className',
      'clearable',
      'columns',
      'columnsCount',
      'controls',
      'desc',
      'description',
      'disabled',
      'draggable',
      'editable',
      'editButtonClassName',
      'formHorizontal',
      'formMode',
      'hideRoot',
      'horizontal',
      'icon',
      'inline',
      'inputClassName',
      'label',
      'labelClassName',
      'labelField',
      'language',
      'level',
      'max',
      'maxRows',
      'min',
      'minRows',
      'multiLine',
      'multiple',
      'option',
      'placeholder',
      'removable',
      'required',
      'remark',
      'hint',
      'rows',
      'searchable',
      'showCompressOptions',
      'size',
      'step',
      'showInput',
      'unit',
      'value',
      'diffValue'
  ];
  function asFormItem(config) {
      return (Control) => {
          var _a;
          const isSFC = !(Control.prototype instanceof react_1.default.Component);
          // 兼容老的 FormItem 用法。
          if (config.validate && !Control.prototype.validate) {
              const fn = config.validate;
              Control.prototype.validate = function () {
                  const host = {
                      input: this
                  };
                  return fn.apply(host, arguments);
              };
          }
          else if (config.validate) {
              console.error('FormItem配置中的 validate 将不起作用，因为类的成员函数中已经定义了 validate 方法，将优先使用类里面的实现。');
          }
          if (config.storeType) {
              Control = WithStore_1.HocStoreFactory({
                  storeType: config.storeType,
                  extendsData: config.extendsData
              })(mobx_react_1.observer(Control));
              delete config.storeType;
          }
          return hoist_non_react_statics_1.default((_a = class extends FormItemWrap {
                  constructor(props) {
                      super(props);
                      this.refFn = this.refFn.bind(this);
                  }
                  componentWillMount() {
                      const { validations, formItem: model } = this.props;
                      // 组件注册的时候可能默认指定验证器类型
                      if (model && !validations && config.validations) {
                          model.config({
                              rules: config.validations
                          });
                      }
                      super.componentWillMount();
                  }
                  shouldComponentUpdate(nextProps) {
                      if (nextProps.strictMode === false || config.strictMode === false) {
                          return true;
                      }
                      // 把可能会影响视图的白名单弄出来，减少重新渲染次数。
                      if (helper_1.anyChanged(exports.detectProps, this.props, nextProps)) {
                          return true;
                      }
                      return false;
                  }
                  getWrappedInstance() {
                      return this.ref;
                  }
                  refFn(ref) {
                      this.ref = ref;
                  }
                  renderControl() {
                      const _a = this.props, { inputClassName, formItem: model, classnames: cx, children, type, size, defaultSize } = _a, rest = tslib_1.__rest(_a, ["inputClassName", "formItem", "classnames", "children", "type", "size", "defaultSize"]);
                      const controlSize = size || defaultSize;
                      return (react_1.default.createElement(Control, Object.assign({}, rest, { onOpenDialog: this.handleOpenDialog, size: config.sizeMutable !== false ? undefined : size, onFocus: this.handleFocus, onBlur: this.handleBlur, type: type, classnames: cx, ref: isSFC ? undefined : this.refFn, forwardedRef: isSFC ? this.refFn : undefined, formItem: model, className: cx(`Form-control`, {
                              'is-inline': !!rest.inline,
                              'is-error': model && !model.valid,
                              [`Form-control--withSize Form-control--size${helper_1.ucFirst(controlSize)}`]: config.sizeMutable !== false &&
                                  typeof controlSize === 'string' &&
                                  !!controlSize &&
                                  controlSize !== 'full'
                          }, inputClassName) })));
                  }
              },
              _a.defaultProps = Object.assign({ className: '', renderLabel: config.renderLabel, renderDescription: config.renderDescription, sizeMutable: config.sizeMutable, wrap: config.wrap, showErrorMsg: config.showErrorMsg }, Control.defaultProps),
              _a.propsList = [
                  'value',
                  'defaultValue',
                  'onChange',
                  'setPrinstineValue',
                  'readOnly',
                  'strictMode',
                  ...(Control.propsList || [])
              ],
              _a.displayName = `FormItem${config.type ? `(${config.type})` : ''}`,
              _a.ComposedComponent = Control,
              _a), Control);
      };
  }
  exports.asFormItem = asFormItem;
  function registerFormItem(config) {
      let Control = asFormItem(config)(config.component);
      return factory_1.registerRenderer(Object.assign(Object.assign({}, config), { name: config.name || `${config.type}-control`, weight: typeof config.weight !== 'undefined' ? config.weight : -100, test: config.test ||
              new RegExp(`(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?${config.type}$`, 'i'), component: Control, isFormItem: true }));
  }
  exports.registerFormItem = registerFormItem;
  function FormItem(config) {
      return function (component) {
          const renderer = registerFormItem(Object.assign(Object.assign({}, config), { component }));
          return renderer.component;
      };
  }
  exports.FormItem = FormItem;
  exports.default = FormItem;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9JdGVtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLDhGQUEwRDtBQUUxRCwrQkFBOEI7QUFFOUIsMkNBS3VCO0FBQ3ZCLCtDQUErRTtBQUMvRSwyQ0FBb0M7QUFFcEMsdUNBQW1DO0FBQ25DLHlDQUF1QztBQWlFdkMsK0NBQWdEO0FBNmhCaEQ7O0lBQUEsTUFBYSxZQUFhLFNBQVEsZUFBSyxDQUFDLFNBQXdCO1FBRzlELGtCQUFrQjtZQUNoQixNQUFNLEVBQUMsUUFBUSxFQUFFLEtBQUssRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFckMsSUFBSSxLQUFLLEVBQUU7Z0JBQ1QsSUFBSSxDQUFDLFFBQVEsR0FBRyxlQUFRLENBQ3RCLEdBQUcsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsVUFBVSxFQUFFLEVBQ3JFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FDekIsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUVELG9CQUFvQjtZQUNsQixJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxDQUFDO1FBR0QsV0FBVyxDQUFDLENBQU07WUFDaEIsTUFBTSxFQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3JDLEtBQUssSUFBSSxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENB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

});
