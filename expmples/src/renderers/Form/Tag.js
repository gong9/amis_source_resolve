amis.define('src/renderers/Form/Tag.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TagControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const downshift_1 = tslib_1.__importDefault(require("node_modules/downshift/dist/downshift.cjs"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const ResultBox_1 = tslib_1.__importDefault(require("src/components/ResultBox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const ListMenu_1 = tslib_1.__importDefault(require("src/components/ListMenu.tsx"));
  let TagControl = /** @class */ (() => {
      var _a, _b, _c, _d;
      class TagControl extends react_1.default.PureComponent {
          constructor() {
              super(...arguments);
              this.input = react_1.default.createRef();
              this.state = {
                  isOpened: false,
                  inputValue: '',
                  isFocused: false
              };
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value) {
                  this.setState({
                      inputValue: ''
                  });
              }
          }
          addItem(option) {
              const { selectedOptions, onChange, joinValues, extractValue, delimiter, valueField } = this.props;
              const newValue = selectedOptions.concat();
              if (find_1.default(newValue, item => item.value == option.value)) {
                  return;
              }
              newValue.push(option);
              onChange(joinValues
                  ? newValue
                      .map(item => item[valueField || 'value'])
                      .join(delimiter || ',')
                  : extractValue
                      ? newValue.map(item => item[valueField || 'value'])
                      : newValue);
          }
          handleFocus(e) {
              var _a, _b;
              this.setState({
                  isFocused: true,
                  isOpened: true
              });
              (_b = (_a = this.props).onFocus) === null || _b === void 0 ? void 0 : _b.call(_a, e);
          }
          handleBlur(e) {
              var _a, _b;
              const { selectedOptions, onChange, joinValues, extractValue, delimiter, valueField } = this.props;
              const value = this.state.inputValue.trim();
              (_b = (_a = this.props).onBlur) === null || _b === void 0 ? void 0 : _b.call(_a, e);
              this.setState({
                  isFocused: false,
                  isOpened: false,
                  inputValue: ''
              }, value
                  ? () => {
                      const newValue = selectedOptions.concat();
                      if (!find_1.default(newValue, item => item.value === value)) {
                          const option = {
                              label: value,
                              value: value
                          };
                          newValue.push(option);
                          onChange(joinValues
                              ? newValue
                                  .map(item => item[valueField || 'value'])
                                  .join(delimiter || ',')
                              : extractValue
                                  ? newValue.map(item => item[valueField || 'value'])
                                  : newValue);
                      }
                  }
                  : undefined);
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          handleInputChange(text) {
              this.setState({
                  inputValue: text
              });
          }
          handleChange(value) {
              const { joinValues, extractValue, delimiter, valueField, onChange } = this.props;
              let newValue = Array.isArray(value) ? value.concat() : [];
              if (joinValues || extractValue) {
                  newValue = value.map(item => item[valueField || 'value']);
              }
              if (joinValues) {
                  newValue = newValue.join(delimiter || ',');
              }
              onChange(newValue);
          }
          renderItem(item) {
              const { labelField } = this.props;
              return `${item[labelField || 'label']}`;
          }
          handleKeyDown(evt) {
              const { selectedOptions, onChange, joinValues, extractValue, delimiter, valueField } = this.props;
              const value = this.state.inputValue.trim();
              if (selectedOptions.length && !value && evt.key == 'Backspace') {
                  const newValue = selectedOptions.concat();
                  newValue.pop();
                  onChange(joinValues
                      ? newValue
                          .map(item => item[valueField || 'value'])
                          .join(delimiter || ',')
                      : extractValue
                          ? newValue.map(item => item[valueField || 'value'])
                          : newValue);
              }
              else if (value && (evt.key === 'Enter' || evt.key === delimiter)) {
                  evt.preventDefault();
                  evt.stopPropagation();
                  const newValue = selectedOptions.concat();
                  if (!find_1.default(newValue, item => item.value == value)) {
                      newValue.push({
                          label: value,
                          value: value
                      });
                      onChange(joinValues
                          ? newValue
                              .map(item => item[valueField || 'value'])
                              .join(delimiter || ',')
                          : extractValue
                              ? newValue.map(item => item[valueField || 'value'])
                              : newValue);
                  }
                  this.setState({
                      inputValue: ''
                  });
              }
          }
          handleOptionChange(option) {
              if (this.state.inputValue || !option) {
                  return;
              }
              this.addItem(option);
          }
          getTarget() {
              return this.input.current;
          }
          getParent() {
              return this.input.current && react_dom_1.findDOMNode(this.input.current).parentElement;
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload === null || reload === void 0 ? void 0 : reload();
          }
          render() {
              const { className, classnames: cx, disabled, placeholder, name, clearable, selectedOptions, loading, popOverContainer, dropdown, options, optionsTip, translate: __ } = this.props;
              const finnalOptions = Array.isArray(options)
                  ? helper_1.filterTree(options, item => (Array.isArray(item.children) && !!item.children.length) ||
                      (item.value !== undefined && !~selectedOptions.indexOf(item)), 0, true)
                  : [];
              return (react_1.default.createElement(downshift_1.default, { selectedItem: selectedOptions, isOpen: this.state.isFocused, inputValue: this.state.inputValue, onChange: this.handleOptionChange, itemToString: this.renderItem }, ({ isOpen, highlightedIndex, getItemProps, getInputProps }) => {
                  return (react_1.default.createElement("div", { className: cx(className, `TagControl`) },
                      react_1.default.createElement(ResultBox_1.default, Object.assign({}, getInputProps({
                          name,
                          ref: this.input,
                          placeholder: __(placeholder || 'Tag.placeholder'),
                          value: this.state.inputValue,
                          onKeyDown: this.handleKeyDown,
                          onFocus: this.handleFocus,
                          onBlur: this.handleBlur,
                          disabled
                      }), { onChange: this.handleInputChange, className: cx('TagControl-input'), result: selectedOptions, onResultChange: this.handleChange, itemRender: this.renderItem, clearable: clearable, allowInput: true }), loading ? react_1.default.createElement(Spinner_1.default, { size: "sm" }) : undefined),
                      dropdown !== false ? (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || this.getParent, target: this.getTarget, placement: 'auto', show: isOpen && !!finnalOptions.length },
                          react_1.default.createElement(PopOver_1.default, { overlay: true, className: cx('TagControl-popover'), onHide: this.close },
                              react_1.default.createElement(ListMenu_1.default, { options: finnalOptions, itemRender: this.renderItem, highlightIndex: highlightedIndex, getItemProps: ({ item, index }) => (Object.assign({}, getItemProps({
                                      index,
                                      item,
                                      disabled: item.disabled
                                  }))) })))) : (
                      // 保留原来的展现方式，不推荐
                      react_1.default.createElement("div", { className: cx('TagControl-sug') },
                          optionsTip ? (react_1.default.createElement("div", { className: cx('TagControl-sugTip') }, __(optionsTip))) : null,
                          options.map((item, index) => (react_1.default.createElement("div", { className: cx('TagControl-sugItem', {
                                  'is-disabled': item.disabled || disabled
                              }), key: index, onClick: this.addItem.bind(this, item) }, item.label)))))));
              }));
          }
      }
      TagControl.defaultProps = {
          resetValue: '',
          labelField: 'label',
          valueField: 'value',
          multiple: true,
          placeholder: 'Tag.placeholder',
          optionsTip: 'Tag.tip'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleFocus", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleBlur", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleInputChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", Object)
      ], TagControl.prototype, "renderItem", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "handleOptionChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "getTarget", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TagControl.prototype, "getParent", null);
      return TagControl;
  })();
  exports.default = TagControl;
  let TagControlRenderer = /** @class */ (() => {
      let TagControlRenderer = class TagControlRenderer extends TagControl {
      };
      TagControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'tag'
          })
      ], TagControlRenderer);
      return TagControlRenderer;
  })();
  exports.TagControlRenderer = TagControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1RhZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix1Q0FLbUI7QUFDbkIsa0VBQWtDO0FBQ2xDLCtEQUErQjtBQUMvQix5Q0FBc0M7QUFDdEMsbUZBQW1EO0FBQ25ELCtDQUF3RDtBQUN4RCwrRUFBK0M7QUFDL0MsK0VBQStDO0FBQy9DLCtFQUErQztBQUMvQyxpRkFBaUQ7QUFvQ2pEOztJQUFBLE1BQXFCLFVBQVcsU0FBUSxlQUFLLENBQUMsYUFHN0M7UUFIRDs7WUFJRSxVQUFLLEdBQXlCLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQVdoRCxVQUFLLEdBQUc7Z0JBQ04sUUFBUSxFQUFFLEtBQUs7Z0JBQ2YsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLEtBQUs7YUFDakIsQ0FBQztRQXVVSixDQUFDO1FBclVDLHlCQUF5QixDQUFDLFNBQW1CO1lBQzNDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osVUFBVSxFQUFFLEVBQUU7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBRUQsT0FBTyxDQUFDLE1BQWM7WUFDcEIsTUFBTSxFQUNKLGVBQWUsRUFDZixRQUFRLEVBQ1IsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNmLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUUxQyxJQUFJLGNBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLEVBQUUs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

});
