amis.define('src/renderers/Form/Control.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FormControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const factory_1 = require("src/factory.tsx");
  const combo_1 = require("src/store/combo.ts");
  const helper_1 = require("src/utils/helper.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const mobx_1 = require("node_modules/mobx/lib/index");
  const formItem_1 = require("src/store/formItem.ts");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  const WithRootStore_1 = require("src/WithRootStore.tsx");
  let FormControl = /** @class */ (() => {
      let FormControl = class FormControl extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.value = undefined;
              this.lazyValidate = debounce_1.default(this.validate.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
              this.lazyEmitChange = debounce_1.default(this.emitChange.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
          }
          componentWillMount() {
              var _a;
              const { formStore: form, formItem, rootStore, control: { name, id, type, required, validations, validationErrors, unique, value, multiple, delimiter, valueField, labelField, joinValues, extractValue, selectFirst, autoFill, clearValueOnHidden, validateOnChange } } = this.props;
              this.getValue = this.getValue.bind(this);
              this.setValue = this.setValue.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.handleBulkChange = this.handleBulkChange.bind(this);
              this.setPrinstineValue = this.setPrinstineValue.bind(this);
              this.controlRef = this.controlRef.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              if (!name) {
                  return;
              }
              const model = rootStore.addStore({
                  id: helper_1.guid(),
                  path: this.props.$path,
                  storeType: formItem_1.FormItemStore.name,
                  parentId: form.id,
                  name
              });
              this.model = model;
              form.addFormItem(model);
              formItem === null || formItem === void 0 ? void 0 : formItem.addSubFormItem(model);
              model.config({
                  id,
                  type,
                  required,
                  unique,
                  value,
                  rules: validations,
                  messages: validationErrors,
                  multiple,
                  delimiter,
                  valueField,
                  labelField,
                  joinValues,
                  extractValue,
                  selectFirst,
                  autoFill,
                  clearValueOnHidden
              });
              if (this.model.unique && ((_a = form.parentStore) === null || _a === void 0 ? void 0 : _a.storeType) === combo_1.ComboStore.name) {
                  const combo = form.parentStore;
                  combo.bindUniuqueItem(model);
              }
              // 同步 value
              model.changeTmpValue(model.value);
              this.reaction = mobx_1.reaction(() => model.value, value => {
                  if (value !== model.tmpValue) {
                      model.changeTmpValue(value);
                  }
                  if (validateOnChange === true ||
                      (validateOnChange !== false &&
                          (form.submited || (mobx_state_tree_1.isAlive(model) && model.validated)))) {
                      this.lazyValidate();
                  }
                  else if (validateOnChange === false) {
                      model.reset();
                  }
              });
          }
          componentDidMount() {
              const { store, formStore: form, control: { name, validate }, addHook } = this.props;
              // 提交前先把之前的 lazyEmit 执行一下。
              this.hook3 = () => {
                  this.lazyEmitChange.flush();
                  this.lazyValidate.flush();
              };
              addHook(this.hook3, 'flush');
              const formItem = this.model;
              if (formItem && validate) {
                  let finalValidate = helper_1.promisify(validate.bind(formItem));
                  this.hook2 = function () {
                      formItem.clearError('control:valdiate');
                      return finalValidate(form.data, formItem.value, formItem.name).then((ret) => {
                          if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                              formItem.addError(ret, 'control:valdiate');
                          }
                      });
                  };
                  addHook(this.hook2);
              }
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const form = nextProps.formStore;
              // if (!nextProps.control.name) {
              //   // 把 name 删了, 对 model 做清理
              //   this.model && this.disposeModel();
              //   this.reaction && this.reaction();
              //   this.model = undefined;
              //   return;
              // } else if (nextProps.control.name !== props.control.name || !this.model) {
              //   // 对 model 做清理
              //   this.model && this.disposeModel();
              //   this.reaction && this.reaction();
              //   // name 是后面才有的，比如编辑模式下就会出现。
              //   const model = (this.model = form.registryItem(nextProps.control.name, {
              //     id: nextProps.control.id,
              //     type: nextProps.control.type,
              //     required: nextProps.control.required,
              //     unique: nextProps.control.unique,
              //     value: nextProps.control.value,
              //     rules: nextProps.control.validations,
              //     multiple: nextProps.control.multiple,
              //     delimiter: nextProps.control.delimiter,
              //     valueField: nextProps.control.valueField,
              //     labelField: nextProps.control.labelField,
              //     joinValues: nextProps.control.joinValues,
              //     extractValue: nextProps.control.extractValue,
              //     messages: nextProps.control.validationErrors
              //   }));
              //   // this.forceUpdate();
              //   this.setState({
              //     value: model.value
              //   });
              //   this.reaction = reaction(
              //     () => model.value,
              //     value => this.setState({value})
              //   );
              // }
              if (this.model &&
                  helper_1.anyChanged([
                      'id',
                      'validations',
                      'validationErrors',
                      'value',
                      'required',
                      'unique',
                      'multiple',
                      'delimiter',
                      'valueField',
                      'labelField',
                      'joinValues',
                      'extractValue',
                      'selectFirst',
                      'autoFill',
                      'clearValueOnHidden'
                  ], props.control, nextProps.control)) {
                  this.model.config({
                      required: nextProps.control.required,
                      id: nextProps.control.id,
                      unique: nextProps.control.unique,
                      value: nextProps.control.value,
                      rules: nextProps.control.validations,
                      multiple: nextProps.control.multiple,
                      delimiter: nextProps.control.delimiter,
                      valueField: nextProps.control.valueField,
                      labelField: nextProps.control.labelField,
                      joinValues: nextProps.control.joinValues,
                      extractValue: nextProps.control.extractValue,
                      messages: nextProps.control.validationErrors,
                      selectFirst: nextProps.control.selectFirst,
                      autoFill: nextProps.control.autoFill,
                      clearValueOnHidden: nextProps.control.clearValueOnHidden
                  });
              }
          }
          componentWillUnmount() {
              this.hook && this.props.removeHook(this.hook);
              this.hook2 && this.props.removeHook(this.hook2);
              this.hook3 && this.props.removeHook(this.hook3, 'flush');
              this.lazyValidate.cancel();
              // this.lazyEmitChange.flush();
              this.lazyEmitChange.cancel();
              this.reaction && this.reaction();
              this.disposeModel();
          }
          disposeModel() {
              const { formStore: form, formItem } = this.props;
              if (this.model &&
                  this.model.unique &&
                  form.parentStore &&
                  form.parentStore.storeType === combo_1.ComboStore.name) {
                  const combo = form.parentStore;
                  combo.unBindUniuqueItem(this.model);
              }
              this.model &&
                  formItem &&
                  mobx_state_tree_1.isAlive(formItem) &&
                  formItem.removeSubFormItem(this.model);
              this.model && form.removeFormItem(this.model);
          }
          controlRef(control) {
              const { addHook, removeHook, formStore: form } = this.props;
              // 因为 control 有可能被 n 层 hoc 包裹。
              while (control && control.getWrappedInstance) {
                  control = control.getWrappedInstance();
              }
              if (control && control.validate && this.model) {
                  const formItem = this.model;
                  let validate = helper_1.promisify(control.validate.bind(control));
                  this.hook = function () {
                      formItem.clearError('component:valdiate');
                      return validate(form.data, formItem.value, formItem.name).then(ret => {
                          if ((typeof ret === 'string' || Array.isArray(ret)) && ret) {
                              formItem.setError(ret, 'component:valdiate');
                          }
                      });
                  };
                  addHook(this.hook);
              }
              else if (!control && this.hook) {
                  removeHook(this.hook);
                  this.hook = undefined;
              }
              this.control = control;
          }
          validate() {
              const { formStore: form } = this.props;
              if (this.model) {
                  if (this.model.unique &&
                      form.parentStore &&
                      form.parentStore.storeType === combo_1.ComboStore.name) {
                      const combo = form.parentStore;
                      const group = combo.uniques.get(this.model.name);
                      group.items.forEach(item => item.validate());
                  }
                  else {
                      this.model.validate(this.hook);
                      form
                          .getItemsByName(this.model.name)
                          .forEach(item => item !== this.model && item.validate());
                  }
              }
          }
          handleChange(value, submitOnChange = this.props.control.submitOnChange, changeImmediately = false) {
              const { formStore: form, onChange, control: { type, pipeOut, changeImmediately: conrolChangeImmediately }, formInited } = this.props;
              if (!this.model ||
                  // todo 以后想办法不要強耦合类型。
                  ~['service', 'group', 'hbox', 'panel', 'grid'].indexOf(type)) {
                  onChange && onChange.apply(null, arguments);
                  return;
              }
              if (pipeOut) {
                  const oldValue = this.model.value;
                  value = pipeOut(value, oldValue, form.data);
              }
              this.model.changeTmpValue(value);
              if (changeImmediately || conrolChangeImmediately || !formInited) {
                  this.emitChange(submitOnChange);
              }
              else {
                  // this.props.onTmpValueChange?.(value, this.model.name);
                  this.lazyEmitChange(submitOnChange);
              }
          }
          emitChange(submitOnChange = this.props.control.submitOnChange) {
              const { formStore: form, onChange, control: { validateOnChange, name, onChange: onFormItemChange } } = this.props;
              if (!this.model) {
                  return;
              }
              const value = this.model.tmpValue;
              const oldValue = this.model.value;
              if (oldValue === value) {
                  return;
              }
              this.model.changeValue(value);
              onFormItemChange && onFormItemChange(value, oldValue, this.model, form);
              onChange && onChange(value, name, submitOnChange === true);
          }
          handleBlur(e) {
              const { onBlur, control: { validateOnBlur } } = this.props;
              if (validateOnBlur && this.model) {
                  this.validate();
              }
              onBlur && onBlur(e);
          }
          handleBulkChange(values, submitOnChange = this.props.control.submitOnChange) {
              const { formStore: form, onChange, control: { validateOnChange, type }, onBulkChange } = this.props;
              if (!helper_1.isObject(values)) {
                  return;
              }
              else if (!this.model ||
                  // todo 以后想办法不要強耦合类型。
                  ~['service', 'group', 'hbox', 'panel', 'grid'].indexOf(type)) {
                  onBulkChange && onBulkChange(values);
                  return;
              }
              let lastKey = '';
              let lastValue;
              Object.keys(values).forEach(key => {
                  const value = values[key];
                  lastKey = key;
                  lastValue = value;
              });
              // is empty
              if (!lastKey) {
                  return;
              }
              form.setValues(values);
              if (validateOnChange !== false && (form.submited || this.model.validated)) {
                  this.lazyValidate();
              }
              onChange && onChange(lastValue, lastKey, submitOnChange === true);
          }
          setPrinstineValue(value) {
              if (!this.model) {
                  return;
              }
              const { formStore: form, control: { pipeOut } } = this.props;
              if (pipeOut) {
                  const oldValue = this.model.value;
                  value = pipeOut(value, oldValue, form.data);
              }
              this.model.changeValue(value, true);
          }
          getValue() {
              const { formStore: form, control } = this.props;
              let value = this.model ? this.model.tmpValue : control.value;
              if (control.pipeIn) {
                  value = control.pipeIn(value, form.data);
              }
              return value;
          }
          // 兼容老版本用法，新版本直接用 onChange 就可以。
          setValue(value, key) {
              const { control: { name } } = this.props;
              if (!key || key === name) {
                  this.handleChange(value);
              }
              else {
                  this.handleBulkChange({
                      [key]: value
                  });
              }
          }
          render() {
              const _a = this.props, { render } = _a, _b = _a.control, { pipeIn, pipeOut, onChange } = _b, control = tslib_1.__rest(_b, ["pipeIn", "pipeOut", "onChange"]), { formMode, controlWidth, type, store, data, disabled, onChange: superOnChange } = _a, rest = tslib_1.__rest(_a, ["render", "control", "formMode", "controlWidth", "type", "store", "data", "disabled", "onChange"]);
              const model = this.model;
              const value = this.getValue();
              return render('', control, Object.assign(Object.assign({}, rest), { defaultSize: controlWidth, disabled: disabled || control.disabled, formItem: model, formMode: control.mode || formMode, ref: this.controlRef, defaultValue: control.value, data: store ? store.data : data, value, formItemValue: value, onChange: control.type === 'input-group' ? superOnChange : this.handleChange, onBlur: this.handleBlur, setValue: this.setValue, getValue: this.getValue, onBulkChange: this.handleBulkChange, prinstine: model ? model.prinstine : undefined, setPrinstineValue: this.setPrinstineValue }));
          }
      };
      FormControl.propsList = ['control'];
      FormControl.defaultProps = {};
      FormControl = tslib_1.__decorate([
          mobx_react_1.observer
      ], FormControl);
      return FormControl;
  })();
  exports.default = FormControl;
  let FormControlRenderer = /** @class */ (() => {
      let FormControlRenderer = class FormControlRenderer extends FormControl {
          controlRef(ref) {
              const originRef = this.control;
              super.controlRef(ref);
              const scoped = this.context;
              if (!this.control) {
                  return;
              }
              if (ref) {
                  scoped.registerComponent(this.control);
              }
              else {
                  scoped.unRegisterComponent(originRef);
              }
          }
      };
      FormControlRenderer.displayName = 'Control';
      FormControlRenderer.contextType = Scoped_1.ScopedContext;
      FormControlRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: (path) => /(^|\/)form(?:\/.*)?\/control$/i.test(path) &&
                  !/\/control\/control$/i.test(path),
              name: 'control'
          })
          // @ts-ignore
          ,
          WithRootStore_1.withRootStore
      ], FormControlRenderer);
      return FormControlRenderer;
  })();
  exports.FormControlRenderer = FormControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJvbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9Db250cm9sLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLHVFQUFzQztBQUV0QywyQ0FBc0Q7QUFDdEQsNkNBQXdFO0FBQ3hFLCtDQU00QjtBQUc1Qix5Q0FBMkQ7QUFDM0QsK0JBQThCO0FBQzlCLG1EQUFtRDtBQUNuRCxxREFBd0M7QUFDeEMsMkNBQW9DO0FBQ3BDLHVEQUFrRDtBQXVDbEQ7SUFBQSxJQUFxQixXQUFXLEdBQWhDLE1BQXFCLFdBQVksU0FBUSxlQUFLLENBQUMsYUFBMkI7UUFBMUU7O1lBSUUsVUFBSyxHQUFTLFNBQVMsQ0FBQztZQVF4QixpQkFBWSxHQUFHLGtCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFO2dCQUNwRCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsS0FBSzthQUNmLENBQUMsQ0FBQztZQUNILG1CQUFjLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3hELFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1FBOGVMLENBQUM7UUE3ZUMsa0JBQWtCOztZQUNoQixNQUFNLEVBQ0osU0FBUyxFQUFFLElBQUksRUFDZixRQUFRLEVBQ1IsU0FBUyxFQUNULE9BQU8sRUFBRSxFQUNQLElBQUksRUFDSixFQUFFLEVBQ0YsSUFBSSxFQUNKLFFBQVEsRUFDUixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixLQUFLLEVBQ0wsUUFBUSxFQUNSLFNBQVMsRUFDVCxVQUFVLEVBQ1YsVUFBVSxFQUNW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

});
