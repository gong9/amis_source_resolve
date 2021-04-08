amis.define('src/renderers/Form/Picker.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PickerControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const types_1 = require("src/types.ts");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const helper_1 = require("src/utils/helper.ts");
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  const Html_1 = tslib_1.__importDefault(require("src/components/Html.tsx"));
  const tpl_1 = require("src/utils/tpl.ts");
  const icons_1 = require("src/components/icons.tsx");
  const api_1 = require("src/utils/api.ts");
  let PickerControl = /** @class */ (() => {
      var _a, _b, _c, _d, _e;
      class PickerControl extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpened: false,
                  schema: this.buildSchema(this.props),
                  isFocused: false
              };
              this.input = react_1.default.createRef();
          }
          componentDidMount() {
              this.fetchOptions();
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (helper_1.anyChanged(['pickerSchema', 'multiple', 'source'], props, nextProps)) {
                  this.setState({
                      schema: this.buildSchema(nextProps)
                  });
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (JSON.stringify(props.value) !== JSON.stringify(prevProps.value)) {
                  this.fetchOptions();
              }
              else if (api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data)) {
                  this.fetchOptions();
              }
          }
          fetchOptions() {
              const { value, formItem, valueField, labelField, source, data } = this.props;
              let selectedOptions;
              if (!source ||
                  !formItem ||
                  (valueField || 'value') === (labelField || 'label') ||
                  ((selectedOptions = formItem.getSelectedOptions(value)) &&
                      (!selectedOptions.length ||
                          selectedOptions[0][valueField || 'value'] !==
                              selectedOptions[0][labelField || 'label']))) {
                  return;
              }
              const ctx = helper_1.createObject(data, {
                  value: value,
                  op: 'loadOptions'
              });
              api_1.isEffectiveApi(source, ctx) &&
                  formItem.loadOptions(source, ctx, {
                      autoAppend: true
                  });
          }
          buildSchema(props) {
              var _a, _b;
              return Object.assign(Object.assign({ checkOnItemClick: true }, props.pickerSchema), { labelTpl: (_b = (_a = props.pickerSchema) === null || _a === void 0 ? void 0 : _a.labelTpl) !== null && _b !== void 0 ? _b : props.labelTpl, type: 'crud', pickerMode: true, syncLocation: false, api: props.source, keepItemSelectionOnPageChange: true, valueField: props.valueField, labelField: props.labelField, 
                  // 不支持批量操作，会乱套
                  bulkActions: props.multiple
                      ? props.pickerSchema.bulkActions
                      : [] });
          }
          crudRef(ref) {
              while (ref && ref.getWrappedInstance) {
                  ref = ref.getWrappedInstance();
              }
              this.crud = ref;
          }
          reload() {
              if (this.crud) {
                  this.crud.search();
              }
              else {
                  const reload = this.props.reloadOptions;
                  reload && reload();
              }
          }
          open() {
              this.setState({
                  isOpened: true
              });
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          handleModalConfirm(values, action, ctx, components) {
              const idx = findIndex_1.default(components, (item) => item.props.type === 'crud');
              this.handleChange(values[idx].items);
              this.close();
          }
          handleChange(items) {
              const { joinValues, valueField, delimiter, extractValue, multiple, options, setOptions, onChange } = this.props;
              let value = items;
              if (joinValues) {
                  value = items
                      .map((item) => item[valueField || 'value'])
                      .join(delimiter || ',');
              }
              else if (extractValue) {
                  value = multiple
                      ? items.map((item) => item[valueField || 'value'])
                      : (items[0] && items[0][valueField || 'value']) || '';
              }
              else {
                  value = multiple ? items : items[0];
              }
              let additionalOptions = [];
              items.forEach(item => {
                  if (!find_1.default(options, option => item[valueField || 'value'] == option[valueField || 'value'])) {
                      additionalOptions.push(item);
                  }
              });
              additionalOptions.length && setOptions(options.concat(additionalOptions));
              onChange(value);
          }
          removeItem(index) {
              const { selectedOptions, joinValues, extractValue, delimiter, valueField, onChange, multiple } = this.props;
              const items = selectedOptions.concat();
              items.splice(index, 1);
              let value = items;
              if (joinValues) {
                  value = items
                      .map((item) => item[valueField || 'value'])
                      .join(delimiter || ',');
              }
              else if (extractValue) {
                  value = multiple
                      ? items.map((item) => item[valueField || 'value'])
                      : (items[0] && items[0][valueField || 'value']) || '';
              }
              else {
                  value = multiple ? items : items[0];
              }
              onChange(value);
          }
          handleKeyDown(e) {
              const selectedOptions = this.props.selectedOptions;
              if (e.key === ' ') {
                  this.open();
                  e.preventDefault();
              }
              else if (selectedOptions.length && e.key == 'Backspace') {
                  this.removeItem(selectedOptions.length - 1);
              }
          }
          handleFocus() {
              this.setState({
                  isFocused: true
              });
          }
          handleBlur() {
              this.setState({
                  isFocused: false
              });
          }
          handleClick() {
              this.input.current && this.input.current.focus();
          }
          clearValue() {
              const { onChange, resetValue } = this.props;
              onChange(resetValue !== void 0 ? resetValue : '');
          }
          renderValues() {
              const { classPrefix: ns, selectedOptions, labelField, labelTpl, disabled } = this.props;
              return (react_1.default.createElement("div", { className: `${ns}Picker-values` }, selectedOptions.map((item, index) => (react_1.default.createElement("div", { key: index, className: classnames_1.default(`${ns}Picker-value`, {
                      'is-disabled': disabled
                  }) },
                  react_1.default.createElement("span", { "data-tooltip": "\u5220\u9664", "data-position": "bottom", className: `${ns}Picker-valueIcon`, onClick: this.removeItem.bind(this, index) }, "\u00D7"),
                  react_1.default.createElement("span", { className: `${ns}Picker-valueLabel` }, labelTpl ? (react_1.default.createElement(Html_1.default, { html: tpl_1.filter(labelTpl, item) })) : (`${helper_1.getVariable(item, labelField || 'label') ||
                      helper_1.getVariable(item, 'id')}`)))))));
          }
          renderBody({ popOverContainer } = {}) {
              const { render, selectedOptions, options, multiple, valueField, embed } = this.props;
              return render('modal-body', this.state.schema, {
                  value: selectedOptions,
                  valueField,
                  primaryField: valueField,
                  options: options,
                  multiple,
                  onSelect: embed ? this.handleChange : undefined,
                  ref: this.crudRef,
                  popOverContainer
              });
          }
          render() {
              const { className, classnames: cx, disabled, render, modalMode, source, size, env, clearable, multiple, placeholder, embed, value, selectedOptions, translate: __, popOverContainer } = this.props;
              return (react_1.default.createElement("div", { className: cx(`PickerControl`, className) }, embed ? (react_1.default.createElement("div", { className: cx('Picker') }, this.renderBody({ popOverContainer }))) : (react_1.default.createElement("div", { className: cx(`Picker`, {
                      'Picker--single': !multiple,
                      'Picker--multi': multiple,
                      'is-focused': this.state.isFocused,
                      'is-disabled': disabled
                  }) },
                  react_1.default.createElement("div", { onClick: this.handleClick, className: cx('Picker-input') },
                      !selectedOptions.length && placeholder ? (react_1.default.createElement("div", { className: cx('Picker-placeholder') }, __(placeholder))) : null,
                      react_1.default.createElement("div", { className: cx('Picker-valueWrap') },
                          this.renderValues(),
                          react_1.default.createElement("input", { onChange: helper_1.noop, value: '', ref: this.input, onKeyDown: this.handleKeyDown, onFocus: this.handleFocus, onBlur: this.handleBlur })),
                      clearable && !disabled && selectedOptions.length ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('Picker-clear') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      react_1.default.createElement("span", { onClick: this.open, className: cx('Picker-btn') },
                          react_1.default.createElement(icons_1.Icon, { icon: "window-restore", className: "icon" }))),
                  render('modal', {
                      title: __('Select.placeholder'),
                      size: size,
                      type: modalMode,
                      body: {
                          children: this.renderBody
                      }
                  }, {
                      key: 'modal',
                      lazyRender: !!source,
                      onConfirm: this.handleModalConfirm,
                      onClose: this.close,
                      show: this.state.isOpened
                  }))
              // <div className={`${ns}Picker`}>
              //         {this.renderValues()}
              //         <Button
              //             classPrefix={ns}
              //             className={`${ns}Picker-pickBtn`}
              //             tooltip="点击选择"
              //             tooltipContainer={env && env.getModalContainer ? env.getModalContainer : undefined}
              //             level="info"
              //             size="sm"
              //             disabled={disabled}
              //             onClick={this.open}
              //             iconOnly
              //         >
              //         选定
              //         </Button>
              //         {render('modal', {
              //             title: '请选择',
              //             size: size,
              //             type: modalMode,
              //             body: {
              //                 children: this.renderBody
              //             }
              //         }, {
              //             key: 'modal',
              //             lazyRender: !!source,
              //             onConfirm: this.handleModalConfirm,
              //             onClose: this.close,
              //             show: this.state.isOpened
              //         })}
              //     </div>
              )));
          }
      }
      PickerControl.propsList = [
          'modalMode',
          'pickerSchema',
          'labelField',
          'onChange',
          'options',
          'value',
          'inline',
          'multiple',
          'embed',
          'resetValue',
          'placeholder',
          'onQuery' // 防止 Form 的 onQuery 事件透传下去，不然会导致 table 先后触发 Form 和 Crud 的 onQuery
      ];
      PickerControl.defaultProps = {
          modalMode: 'dialog',
          multiple: false,
          placeholder: '请点击右侧的图标',
          labelField: 'label',
          valueField: 'value',
          pickerSchema: {
              mode: 'list',
              listItem: {
                  title: '${label|raw}'
              }
          },
          embed: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "crudRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "open", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object, typeof (_b = typeof types_1.Action !== "undefined" && types_1.Action) === "function" ? _b : Object, Object, typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleModalConfirm", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Array !== "undefined" && Array) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _e : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "handleClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "clearValue", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PickerControl.prototype, "renderBody", null);
      return PickerControl;
  })();
  exports.default = PickerControl;
  let PickerControlRenderer = /** @class */ (() => {
      let PickerControlRenderer = class PickerControlRenderer extends PickerControl {
      };
      PickerControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'picker',
              autoLoadOptionsFromSource: false,
              sizeMutable: false
          })
      ], PickerControlRenderer);
      return PickerControlRenderer;
  })();
  exports.PickerControlRenderer = PickerControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGlja2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1BpY2tlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix1Q0FLbUI7QUFDbkIsb0VBQTRCO0FBRTVCLHVDQUFvRTtBQUNwRSwrREFBK0I7QUFDL0IsK0NBTzRCO0FBQzVCLHlFQUF5QztBQUN6Qyx5RUFBeUM7QUFDekMseUNBQXVDO0FBQ3ZDLGtEQUE0QztBQUs1Qyx5Q0FBOEQ7QUFxRDlEOztJQUFBLE1BQXFCLGFBQWMsU0FBUSxlQUFLLENBQUMsYUFHaEQ7UUFIRDs7WUFpQ0UsVUFBSyxHQUFnQjtnQkFDbkIsUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDcEMsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQztZQUVGLFVBQUssR0FBc0MsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBbWEvRCxDQUFDO1FBamFDLGlCQUFpQjtZQUNmLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN0QixDQUFDO1FBRUQseUJBQXlCLENBQUMsU0FBc0I7WUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV6QixJQUFJLG1CQUFVLENBQUMsQ0FBQyxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxFQUFFLEtBQUssRUFBRSxTQUFTLENBQUMsRUFBRTtnQkFDeEUsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixNQUFNLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUM7aUJBQ3BDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQXNCO1lBQ3ZDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FB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

});
