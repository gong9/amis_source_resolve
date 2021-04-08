amis.define('src/renderers/Form/Text.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NativeNumberControlRenderer = exports.NativeTimeControlRenderer = exports.NativeDateControlRenderer = exports.UrlControlRenderer = exports.EmailControlRenderer = exports.PasswordControlRenderer = exports.TextControlRenderer = exports.mapItemIndex = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const downshift_1 = tslib_1.__importDefault(require("node_modules/downshift/dist/downshift.cjs"));
  // @ts-ignore
  const match_sorter_1 = tslib_1.__importDefault(require("node_modules/match-sorter/dist/match-sorter.cjs"));
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const tpl_1 = require("src/utils/tpl.ts");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const icons_1 = require("src/components/icons.tsx");
  const Input_1 = tslib_1.__importDefault(require("src/components/Input.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const api_1 = require("src/utils/api.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const icon_1 = require("src/utils/icon.tsx");
  let TextControl = /** @class */ (() => {
      var _a;
      class TextControl extends react_1.default.PureComponent {
          constructor(props) {
              super(props);
              const value = props.value;
              this.state = {
                  isOpen: false,
                  inputValue: '',
                  isFocused: false
              };
              this.focus = this.focus.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.inputRef = this.inputRef.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.handleInputChange = this.handleInputChange.bind(this);
              this.handleKeyDown = this.handleKeyDown.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.handleStateChange = this.handleStateChange.bind(this);
              this.loadAutoComplete = debounce_1.default(this.loadAutoComplete.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value) {
                  const value = nextProps.value;
                  this.setState({
                      inputValue: ''
                  });
              }
          }
          componentDidMount() {
              const { formItem, autoComplete, addHook, formInited, data, name } = this.props;
              if (api_1.isEffectiveApi(autoComplete, data) && formItem) {
                  if (formInited) {
                      formItem.loadOptions(autoComplete, helper_1.createObject(data, {
                          term: ''
                      }));
                  }
                  else {
                      this.unHook = addHook(async (data) => {
                          await formItem.loadOptions(autoComplete, helper_1.createObject(data, {
                              term: ''
                          }));
                          if (formItem.value) {
                              helper_1.setVariable(data, name, formItem.value);
                          }
                      }, 'init');
                  }
              }
          }
          componentWillUnmount() {
              this.unHook && this.unHook();
          }
          inputRef(ref) {
              this.input = ref;
          }
          focus() {
              if (!this.input) {
                  return;
              }
              this.input.focus();
              // 光标放到最后
              const len = this.input.value.length;
              len && this.input.setSelectionRange(len, len);
          }
          clearValue() {
              const { onChange, resetValue } = this.props;
              onChange(resetValue);
              this.setState({
                  inputValue: resetValue
              }, () => {
                  this.focus();
                  this.loadAutoComplete();
              });
          }
          removeItem(index) {
              const { selectedOptions, onChange, joinValues, extractValue, delimiter, valueField } = this.props;
              const newValue = selectedOptions.concat();
              newValue.splice(index, 1);
              onChange(joinValues
                  ? newValue
                      .map(item => item[valueField || 'value'])
                      .join(delimiter || ',')
                  : extractValue
                      ? newValue.map(item => item[valueField || 'value'])
                      : newValue);
          }
          handleClick() {
              this.focus();
              this.setState({
                  isOpen: true
              });
          }
          handleFocus(e) {
              this.setState({
                  isOpen: true,
                  isFocused: true
              });
              this.props.onFocus && this.props.onFocus(e);
          }
          handleBlur(e) {
              const { onBlur, trimContents, value, onChange } = this.props;
              this.setState({
                  isFocused: false
              }, () => {
                  if (trimContents && value && typeof value === 'string') {
                      onChange(value.trim());
                  }
              });
              onBlur && onBlur(e);
          }
          handleInputChange(evt) {
              let value = evt.currentTarget.value;
              this.setState({
                  inputValue: value
              }, this.loadAutoComplete);
          }
          handleKeyDown(evt) {
              const { selectedOptions, onChange, joinValues, extractValue, delimiter, multiple, valueField } = this.props;
              if (selectedOptions.length && !this.state.inputValue && evt.keyCode === 8) {
                  evt.preventDefault();
                  const newValue = selectedOptions.concat();
                  newValue.pop();
                  onChange(joinValues
                      ? newValue
                          .map(item => item[valueField || 'value'])
                          .join(delimiter || ',')
                      : extractValue
                          ? newValue.map(item => item[valueField || 'value'])
                          : newValue);
                  this.setState({
                      inputValue: ''
                  }, this.loadAutoComplete);
              }
              else if (evt.keyCode === 13 &&
                  this.state.inputValue &&
                  typeof this.highlightedIndex !== 'number') {
                  evt.preventDefault();
                  const value = this.state.inputValue;
                  if (multiple) {
                      if (value && !find_1.default(selectedOptions, item => item.value == value)) {
                          const newValue = selectedOptions.concat();
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
                  }
                  else {
                      onChange(value);
                  }
                  this.setState({
                      inputValue: '',
                      isOpen: false
                  }, this.loadAutoComplete);
              }
              else if (evt.keyCode === 13 &&
                  this.state.isOpen &&
                  typeof this.highlightedIndex !== 'number') {
                  this.setState({
                      isOpen: false
                  });
              }
          }
          handleChange(value) {
              const { onChange, multiple, joinValues, extractValue, delimiter, selectedOptions, valueField } = this.props;
              if (multiple) {
                  const newValue = selectedOptions.concat();
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
              else {
                  onChange(value);
              }
              this.setState({
                  inputValue: ''
              }, this.loadAutoComplete);
          }
          handleStateChange(changes) {
              const multiple = this.props.multiple || this.props.multi;
              switch (changes.type) {
                  case downshift_1.default.stateChangeTypes.itemMouseEnter:
                      this.setState({
                          isOpen: true
                      });
                      break;
                  case downshift_1.default.stateChangeTypes.changeInput:
                      this.setState({
                          isOpen: true
                      });
                      break;
                  default:
                      const state = {};
                      if (typeof changes.isOpen !== 'undefined') {
                          state.isOpen = changes.isOpen;
                      }
                      if (typeof changes.highlightedIndex !== 'undefined') {
                          this.highlightedIndex = changes.highlightedIndex;
                      }
                      // 输入框清空
                      if (!multiple && this.state.isOpen && changes.isOpen === false) {
                          state.inputValue = '';
                      }
                      this.setState(state);
                      break;
              }
          }
          handleNormalInputChange(e) {
              const { onChange } = this.props;
              let value = e.currentTarget.value;
              onChange(value);
          }
          loadAutoComplete() {
              const { formItem, autoComplete, data, multiple, selectedOptions } = this.props;
              if (api_1.isEffectiveApi(autoComplete, data) && formItem) {
                  formItem.loadOptions(autoComplete, helper_1.createObject(data, {
                      term: this.state.inputValue || '' // (multiple ? '' : selectedOptions[selectedOptions.length - 1]?.value)
                  }));
              }
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          renderSugestMode() {
              const { className, inputOnly, value, type, placeholder, classnames: cx, disabled, name, loading, clearable, options, selectedOptions, autoComplete, labelField, valueField, multiple, creatable, translate: __ } = this.props;
              return (react_1.default.createElement(downshift_1.default, { isOpen: this.state.isOpen, inputValue: this.state.inputValue, onChange: this.handleChange, onStateChange: this.handleStateChange, selectedItem: selectedOptions.map(item => item[valueField || 'value']) }, ({ getInputProps, getItemProps, isOpen, inputValue, selectedItem, highlightedIndex }) => {
                  let filtedOptions = inputValue && isOpen && !autoComplete
                      ? match_sorter_1.default(options, inputValue, {
                          keys: [labelField || 'label', valueField || 'value']
                      })
                      : options;
                  const indices = isOpen
                      ? mapItemIndex(filtedOptions, selectedItem)
                      : {};
                  filtedOptions = filtedOptions.filter((option) => !~selectedItem.indexOf(option.value));
                  if (this.state.inputValue &&
                      !filtedOptions.some((option) => option.value === this.state.inputValue)) {
                      filtedOptions.push({
                          [labelField || 'label']: this.state.inputValue,
                          [valueField || 'value']: this.state.inputValue,
                          isNew: true
                      });
                  }
                  return (react_1.default.createElement("div", { className: cx(`TextControl-input TextControl-input--withAC`, inputOnly ? className : '', {
                          'is-opened': isOpen,
                          'TextControl-input--multiple': multiple
                      }), onClick: this.handleClick },
                      react_1.default.createElement(react_1.default.Fragment, null,
                          placeholder &&
                              !selectedOptions.length &&
                              !this.state.inputValue &&
                              !this.state.isFocused ? (react_1.default.createElement("div", { className: cx('TextControl-placeholder') }, placeholder)) : null,
                          selectedOptions.map((item, index) => multiple ? (react_1.default.createElement("div", { className: cx('TextControl-value'), key: index },
                              react_1.default.createElement("span", { className: cx('TextControl-valueIcon'), onClick: this.removeItem.bind(this, index) }, "\u00D7"),
                              react_1.default.createElement("span", { className: cx('TextControl-valueLabel') }, `${item[labelField || 'label']}`))) : inputValue && isOpen ? null : (react_1.default.createElement("div", { className: cx('TextControl-value'), key: index }, item.label))),
                          react_1.default.createElement(Input_1.default, Object.assign({}, getInputProps({
                              name,
                              ref: this.inputRef,
                              disabled,
                              type,
                              onFocus: this.handleFocus,
                              onBlur: this.handleBlur,
                              onChange: this.handleInputChange,
                              onKeyDown: this.handleKeyDown
                          }), { autoComplete: "off", size: 10 }))),
                      clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: cx('TextControl-clear') },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                      loading ? (react_1.default.createElement(Spinner_1.default, { show: true, icon: "reload", spinnerClassName: cx('TextControl-spinner') })) : null,
                      isOpen && filtedOptions.length ? (react_1.default.createElement("div", { className: cx('TextControl-sugs') }, filtedOptions.map((option) => {
                          return (react_1.default.createElement("div", Object.assign({}, getItemProps({
                              item: option.value,
                              disabled: option.disabled,
                              className: cx(`TextControl-sugItem`, {
                                  'is-highlight': highlightedIndex === indices[option.value],
                                  'is-disabled': option.disabled
                              })
                          }), { key: option.value }), option.isNew ? (react_1.default.createElement("span", null,
                              __('Text.add', { label: option.label }),
                              react_1.default.createElement(icons_1.Icon, { icon: "enter", className: "icon" }))) : (react_1.default.createElement("span", null,
                              option.disabled
                                  ? option.label
                                  : Options_1.highlight(option.label, inputValue),
                              option.tip))));
                      }))) : null));
              }));
          }
          renderNormal() {
              var _a;
              const { classPrefix: ns, classnames: cx, className, inputOnly, value, placeholder, onChange, disabled, readOnly, max, min, step, clearable, name } = this.props;
              const type = (_a = this.props.type) === null || _a === void 0 ? void 0 : _a.replace('native-', '');
              return (react_1.default.createElement("div", { className: cx('TextControl-input', inputOnly ? className : '') },
                  react_1.default.createElement("input", { name: name, placeholder: placeholder, ref: this.inputRef, disabled: disabled, readOnly: readOnly, type: type, onFocus: this.handleFocus, onBlur: this.handleBlur, max: max, min: min, autoComplete: "off", size: 10, step: step, onChange: this.handleNormalInputChange, value: typeof value === 'undefined' || value === null
                          ? ''
                          : typeof value === 'string'
                              ? value
                              : JSON.stringify(value) }),
                  clearable && !disabled && value ? (react_1.default.createElement("a", { onClick: this.clearValue, className: `${ns}TextControl-clear` },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null));
          }
          render() {
              const { classnames: cx, className, classPrefix: ns, options, source, autoComplete, addOn: addOnRaw, render, data, disabled, inputOnly } = this.props;
              const addOn = typeof addOnRaw === 'string'
                  ? {
                      label: addOnRaw,
                      type: 'plain'
                  }
                  : addOnRaw;
              let input = autoComplete !== false && (source || options.length || autoComplete)
                  ? this.renderSugestMode()
                  : this.renderNormal();
              const iconElement = icon_1.generateIcon(cx, addOn === null || addOn === void 0 ? void 0 : addOn.icon, 'Icon');
              let addOnDom = addOn ? (addOn.actionType ||
                  ~['button', 'submit', 'reset', 'action'].indexOf(addOn.type) ? (react_1.default.createElement("div", { className: cx(`${ns}TextControl-button`, addOn.className) }, render('addOn', addOn, {
                  disabled
              }))) : (react_1.default.createElement("div", { className: cx(`${ns}TextControl-addOn`, addOn.className) },
                  addOn.label ? tpl_1.filter(addOn.label, data) : null,
                  iconElement))) : null;
              if (inputOnly) {
                  return input;
              }
              return (react_1.default.createElement("div", { className: cx(className, `${ns}TextControl`, {
                      [`${ns}TextControl--withAddOn`]: !!addOnDom,
                      'is-focused': this.state.isFocused,
                      'is-disabled': disabled
                  }) },
                  addOn && addOn.position === 'left' ? addOnDom : null,
                  input,
                  addOn && addOn.position !== 'left' ? addOnDom : null));
          }
      }
      TextControl.defaultProps = {
          resetValue: '',
          labelField: 'label',
          valueField: 'value',
          placeholder: '',
          allowInputText: true,
          trimContents: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TextControl.prototype, "handleNormalInputChange", null);
      return TextControl;
  })();
  exports.default = TextControl;
  function mapItemIndex(items, values, valueField = 'value') {
      return items
          .filter(item => values.indexOf(item[valueField || 'value']) === -1)
          .reduce((prev, next, i) => {
          prev[next[valueField || 'value']] = i;
          return prev;
      }, {});
  }
  exports.mapItemIndex = mapItemIndex;
  let TextControlRenderer = /** @class */ (() => {
      let TextControlRenderer = class TextControlRenderer extends TextControl {
      };
      TextControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'text'
          })
      ], TextControlRenderer);
      return TextControlRenderer;
  })();
  exports.TextControlRenderer = TextControlRenderer;
  let PasswordControlRenderer = /** @class */ (() => {
      let PasswordControlRenderer = class PasswordControlRenderer extends TextControl {
      };
      PasswordControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'password'
          })
      ], PasswordControlRenderer);
      return PasswordControlRenderer;
  })();
  exports.PasswordControlRenderer = PasswordControlRenderer;
  let EmailControlRenderer = /** @class */ (() => {
      let EmailControlRenderer = class EmailControlRenderer extends TextControl {
      };
      EmailControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'email',
              validations: 'isEmail'
          })
      ], EmailControlRenderer);
      return EmailControlRenderer;
  })();
  exports.EmailControlRenderer = EmailControlRenderer;
  let UrlControlRenderer = /** @class */ (() => {
      let UrlControlRenderer = class UrlControlRenderer extends TextControl {
      };
      UrlControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'url',
              validations: 'isUrl'
          })
      ], UrlControlRenderer);
      return UrlControlRenderer;
  })();
  exports.UrlControlRenderer = UrlControlRenderer;
  let NativeDateControlRenderer = /** @class */ (() => {
      let NativeDateControlRenderer = class NativeDateControlRenderer extends TextControl {
      };
      NativeDateControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'native-date'
          })
      ], NativeDateControlRenderer);
      return NativeDateControlRenderer;
  })();
  exports.NativeDateControlRenderer = NativeDateControlRenderer;
  let NativeTimeControlRenderer = /** @class */ (() => {
      let NativeTimeControlRenderer = class NativeTimeControlRenderer extends TextControl {
      };
      NativeTimeControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'native-time'
          })
      ], NativeTimeControlRenderer);
      return NativeTimeControlRenderer;
  })();
  exports.NativeTimeControlRenderer = NativeTimeControlRenderer;
  let NativeNumberControlRenderer = /** @class */ (() => {
      let NativeNumberControlRenderer = class NativeNumberControlRenderer extends TextControl {
      };
      NativeNumberControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'native-number'
          })
      ], NativeNumberControlRenderer);
      return NativeNumberControlRenderer;
  })();
  exports.NativeNumberControlRenderer = NativeNumberControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9UZXh0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHVDQUttQjtBQUduQixrRUFBd0Q7QUFDeEQsYUFBYTtBQUNiLHdFQUF1QztBQUN2Qyx1RUFBc0M7QUFDdEMseUNBQXVDO0FBQ3ZDLCtEQUErQjtBQUMvQixrREFBNEM7QUFDNUMsMkVBQTJDO0FBQzNDLCtDQUF1RTtBQUN2RSx5Q0FBK0M7QUFDL0MsK0VBQStDO0FBSS9DLDJDQUE4QztBQTJEOUM7O0lBQUEsTUFBcUIsV0FBWSxTQUFRLGVBQUssQ0FBQyxhQUc5QztRQUtDLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxQixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLE1BQU0sRUFBRSxLQUFLO2dCQUNiLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUM7WUFDRixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLGtCQUFPLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3JFLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQVdELHlCQUF5QixDQUFDLFNBQW9CO1lBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxLQUFLLEVBQUU7Z0JBQ25DLE1BQU0sS0FBSyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUM7Z0JBQzlCLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osVUFBVSxFQUFFLEVBQUU7aUJBQ2YsQ0FBQyxDQUFDO2FBQ0o7UUFDSCxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsTUFBTSxFQUNKLFFBQVEsRUFDUixZQUFZLEVBQ1osT0FBTyxFQUNQLFVBQVUsRUFDVixJQUFJLEVBQ0osSUFBSSxFQUNMLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksb0JBQWMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLElBQUksUUFBUSxFQUFFO2dCQUNsRCxJQUFJLFVBQVUsRUFBRTtvQkFDZCxRQUFRLENBQUMsV0FBVyxDQUNsQixZQUFZLEVBQ1oscUJBQVksQ0FBQyxJQUFJLEVBQUU7d0JBQ2pCLElBQUksRUFBRSxFQUFFO3FCQUNULENBQUMsQ0FDSCxDQUFDO2lCQUNIO3FCQUFNO29CQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFTLEVBQUUsRUFBRTt3QkFDeEMsTUFBTSxRQUFRLENBQUMsV0FBVyxDQUN4QixZQUFZLEVBQ1oscUJBQVksQ0FBQyxJQUFJLEVBQUU7NEJBQ2pCLElBQUksRUFBRSxFQUFFO3lCQUNULENBQUMsQ0FDSCxDQUFDO3dCQUVGLElBQUksUUFBUSxDQUFDLEtBQUssRUFBRTs0QkFDbEIsb0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDMUM7b0JBQ0gsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUNaO2FBQ0Y7UUFDSCxDQUFDO1FBRUQsb0JBQW9CO1lBQ2xCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFRCxRQUFRLENBQUMsR0FBUTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRCxLQUFLO1lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ2YsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUVuQixTQUFTO1lBQ1QsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDO1lBQ3BDLEdBQUcsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNoRCxDQUFDO1FBRUQsVUFBVTtZQUNSLE1BQU0sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUxQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FDWDtnQkFDRSxVQUFVLEVBQUUsVUFBVTthQUN2QixFQUNELEdBQUcsRUFBRTtnQkFDSCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDMUIsQ0FBQyxDQUNGLENBQUM7UUFDSixDQUFDO1FBRUQsVUFBVSxDQUFDLEtBQWE7WUFDdEIsTUFBTSxFQUNKLGVBQWUsRUFDZixRQUFRLEVBQ1IsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsVUFBVSxFQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztZQUMxQyxRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztZQUUxQixRQUFRLENBQ04sVUFBVTtnQkFDUixDQUFDLENBQUMsUUFBUTtxQkFDTCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO3FCQUN4QyxJQUFJLENBQUMsU0FBUyxJQUFJLEdBQUcsQ0FBQztnQkFDM0IsQ0FBQyxDQUFDLFlBQVk7b0JBQ2QsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO29CQUNuRCxDQUFDLENBQUMsUUFBUSxDQUNiLENBQUM7UUFDSixDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNiLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osTUFBTSxFQUFFLElBQUk7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsV0FBVyxDQUFDLENBQU07WUFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixNQUFNLEVBQUUsSUFBSTtnQkFDWixTQUFTLEVBQUUsSUFBSTthQUNoQixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM5QyxDQUFDO1FBRUQsVUFBVSxDQUFDLENBQU07WUFDZixNQUFNLEVBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUzRCxJQUFJLENBQUMsUUFBUSxDQUNYO2dCQUNFLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLEVBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksWUFBWSxJQUFJLEtBQUssSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLEVBQUU7b0JBQ3RELFFBQVEsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztpQkFDeEI7WUFDSCxDQUFDLENBQ0YsQ0FBQztZQUVGLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVELGlCQUFpQixDQUFDLEdBQXdDO1lBQ3hELElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1lBRXBDLElBQUksQ0FBQyxRQUFRLENBQ1g7Z0JBQ0UsVUFBVSxFQUFFLEtBQUs7YUFDbEIsRUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQ3RCLENBQUM7UUFDSixDQUFDO1FBRUQsYUFBYSxDQUFDLEdBQTBDO1lBQ3RELE1BQU0sRUFDSixlQUFlLEVBQ2YsUUFBUSxFQUNSLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULFFBQVEsRUFDUixVQUFVLEVBQ1gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxlQUFlLENBQUMsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksR0FBRyxDQUFDLE9BQU8sS0FBSyxDQUFDLEVBQUU7Z0JBQ3pFLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxRQUFRLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO2dCQUMxQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7Z0JBRWYsUUFBUSxDQUNOLFVBQVU7b0JBQ1IsQ0FBQyxDQUFDLFFBQVE7eUJBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQzt5QkFDeEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxZQUFZO3dCQUNkLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO2dCQUNGLElBQUksQ0FBQyxRQUFRLENBQ1g7b0JBQ0UsVUFBVSxFQUFFLEVBQUU7aUJBQ2YsRUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQ3RCLENBQUM7YUFDSDtpQkFBTSxJQUNMLEdBQUcsQ0FBQyxPQUFPLEtBQUssRUFBRTtnQkFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2dCQUNyQixPQUFPLElBQUksQ0FBQyxnQkFBZ0IsS0FBSyxRQUFRLEVBQ3pDO2dCQUNBLEdBQUcsQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDckIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBRXBDLElBQUksUUFBUSxFQUFFO29CQUNaLElBQUksS0FBSyxJQUFJLENBQUMsY0FBSSxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksS0FBSyxDQUFDLEVBQUU7d0JBQ2hFLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQzt3QkFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQzs0QkFDWixLQUFLLEVBQUUsS0FBSzs0QkFDWixLQUFLLEVBQUUsS0FBSzt5QkFDYixDQUFDLENBQUM7d0JBRUgsUUFBUSxDQUNOLFVBQVU7NEJBQ1IsQ0FBQyxDQUFDLFFBQVE7aUNBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQztpQ0FDeEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7NEJBQzNCLENBQUMsQ0FBQyxZQUFZO2dDQUNkLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQztnQ0FDbkQsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO3FCQUNIO2lCQUNGO3FCQUFNO29CQUNMLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDakI7Z0JBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FDWDtvQkFDRSxVQUFVLEVBQUUsRUFBRTtvQkFDZCxNQUFNLEVBQUUsS0FBSztpQkFDZCxFQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FDdEIsQ0FBQzthQUNIO2lCQUFNLElBQ0wsR0FBRyxDQUFDLE9BQU8sS0FBSyxFQUFFO2dCQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU07Z0JBQ2pCLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixLQUFLLFFBQVEsRUFDekM7Z0JBQ0EsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixNQUFNLEVBQUUsS0FBSztpQkFDZCxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFFRCxZQUFZLENBQUMsS0FBVTtZQUNyQixNQUFNLEVBQ0osUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxlQUFlLEVBQ2YsVUFBVSxFQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksUUFBUSxFQUFFO2dCQUNaLE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDMUMsUUFBUSxDQUFDLElBQUksQ0FBQztvQkFDWixLQUFLLEVBQUUsS0FBSztvQkFDWixLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDLENBQUM7Z0JBRUgsUUFBUSxDQUNOLFVBQVU7b0JBQ1IsQ0FBQyxDQUFDLFFBQVE7eUJBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQzt5QkFDeEMsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxZQUFZO3dCQUNkLENBQUMsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQzt3QkFDbkQsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO2FBQ0g7aUJBQU07Z0JBQ0wsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ2pCO1lBRUQsSUFBSSxDQUFDLFFBQVEsQ0FDWDtnQkFDRSxVQUFVLEVBQUUsRUFBRTthQUNmLEVBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUN0QixDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQixDQUFDLE9BQWdDO1lBQ2hELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ3pELFFBQVEsT0FBTyxDQUFDLElBQUksRUFBRTtnQkFDcEIsS0FBSyxtQkFBUyxDQUFDLGdCQUFnQixDQUFDLGNBQWM7b0JBQzVDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ1osTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1IsS0FBSyxtQkFBUyxDQUFDLGdCQUFnQixDQUFDLFdBQVc7b0JBQ3pDLElBQUksQ0FBQyxRQUFRLENBQUM7d0JBQ1osTUFBTSxFQUFFLElBQUk7cUJBQ2IsQ0FBQyxDQUFDO29CQUNILE1BQU07Z0JBQ1I7b0JBQ0UsTUFBTSxLQUFLLEdBQWMsRUFBRSxDQUFDO29CQUM1QixJQUFJLE9BQU8sT0FBTyxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7d0JBQ3pDLEtBQUssQ0FBQyxNQUFNLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQztxQkFDL0I7b0JBRUQsSUFBSSxPQUFPLE9BQU8sQ0FBQyxnQkFBZ0IsS0FBSyxXQUFXLEVBQUU7d0JBQ25ELElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsZ0JBQWdCLENBQUM7cUJBQ2xEO29CQUVELFFBQVE7b0JBQ1IsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxLQUFLLEtBQUssRUFBRTt3QkFDOUQsS0FBSyxDQUFDLFVBQVUsR0FBRyxFQUFFLENBQUM7cUJBQ3ZCO29CQUVELElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQ3JCLE1BQU07YUFDVDtRQUNILENBQUM7UUFHRCx1QkFBdUIsQ0FBQyxDQUFzQztZQUM1RCxNQUFNLEVBQUMsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU5QixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztZQUVsQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELGdCQUFnQjtZQUNkLE1BQU0sRUFDSixRQUFRLEVBQ1IsWUFBWSxFQUNaLElBQUksRUFDSixRQUFRLEVBQ1IsZUFBZSxFQUNoQixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixJQUFJLG9CQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxJQUFJLFFBQVEsRUFBRTtnQkFDbEQsUUFBUSxDQUFDLFdBQVcsQ0FDbEIsWUFBWSxFQUNaLHFCQUFZLENBQUMsSUFBSSxFQUFFO29CQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLHVFQUF1RTtpQkFDMUcsQ0FBQyxDQUNILENBQUM7YUFDSDtRQUNILENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDeEMsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxnQkFBZ0I7WUFDZCxNQUFNLEVBQ0osU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFdBQVcsRUFDWCxVQUFVLEVBQUUsRUFBRSxFQUNkLFFBQVEsRUFDUixJQUFJLEVBQ0osT0FBTyxFQUNQLFNBQVMsRUFDVCxPQUFPLEVBQ1AsZUFBZSxFQUNmLFlBQVksRUFDWixVQUFVLEVBQ1YsVUFBVSxFQUNWLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUFFLEVBQUUsRUFDZCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsOEJBQUMsbUJBQVMsSUFDUixNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3pCLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDakMsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLGFBQWEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQ3JDLFlBQVksRUFBRSxlQUFlLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsQ0FBQyxJQUVyRSxDQUFDLEVBQ0EsYUFBYSxFQUNiLFlBQVksRUFDWixNQUFNLEVBQ04sVUFBVSxFQUNWLFlBQVksRUFDWixnQkFBZ0IsRUFDakIsRUFBRSxFQUFFO2dCQUNILElBQUksYUFBYSxHQUNmLFVBQVUsSUFBSSxNQUFNLElBQUksQ0FBQyxZQUFZO29CQUNuQyxDQUFDLENBQUMsc0JBQVcsQ0FBQyxPQUFPLEVBQUUsVUFBVSxFQUFFO3dCQUMvQixJQUFJLEVBQUUsQ0FBQyxVQUFVLElBQUksT0FBTyxFQUFFLFVBQVUsSUFBSSxPQUFPLENBQUM7cUJBQ3JELENBQUM7b0JBQ0osQ0FBQyxDQUFDLE9BQU8sQ0FBQztnQkFDZCxNQUFNLE9BQU8sR0FBRyxNQUFNO29CQUNwQixDQUFDLENBQUMsWUFBWSxDQUFDLGFBQWEsRUFBRSxZQUFZLENBQUM7b0JBQzNDLENBQUMsQ0FBQyxFQUFFLENBQUM7Z0JBQ1AsYUFBYSxHQUFHLGFBQWEsQ0FBQyxNQUFNLENBQ2xDLENBQUMsTUFBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQ3RELENBQUM7Z0JBRUYsSUFDRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7b0JBQ3JCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDakIsQ0FBQyxNQUFXLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQ3hELEVBQ0Q7b0JBQ0EsYUFBYSxDQUFDLElBQUksQ0FBQzt3QkFDakIsQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO3dCQUM5QyxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7d0JBQzlDLEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUMsQ0FBQztpQkFDSjtnQkFFRCxPQUFPLENBQ0wsdUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCw2Q0FBNkMsRUFDN0MsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDMUI7d0JBQ0UsV0FBVyxFQUFFLE1BQU07d0JBQ25CLDZCQUE2QixFQUFFLFFBQVE7cUJBQ3hDLENBQ0YsRUFDRCxPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBRXpCO3dCQUNHLFdBQVc7NEJBQ1osQ0FBQyxlQUFlLENBQUMsTUFBTTs0QkFDdkIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7NEJBQ3RCLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ3RCLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMseUJBQXlCLENBQUMsSUFDMUMsV0FBVyxDQUNSLENBQ1AsQ0FBQyxDQUFDLENBQUMsSUFBSTt3QkFFUCxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ25DLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FDVCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUs7NEJBQ2pELHdDQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsdUJBQXVCLENBQUMsRUFDdEMsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsYUFHckM7NEJBQ1Asd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxJQUMxQyxHQUFHLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLEVBQUUsQ0FDNUIsQ0FDSCxDQUNQLENBQUMsQ0FBQyxDQUFDLFVBQVUsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDaEMsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLElBQ2hELElBQUksQ0FBQyxLQUFLLENBQ1AsQ0FDUCxDQUNGO3dCQUVELDhCQUFDLGVBQUssb0JBQ0EsYUFBYSxDQUFDOzRCQUNoQixJQUFJOzRCQUNKLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUTs0QkFDbEIsUUFBUTs0QkFDUixJQUFJOzRCQUNKLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVzs0QkFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVOzRCQUN2QixRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQjs0QkFDaEMsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhO3lCQUM5QixDQUFDLElBQ0YsWUFBWSxFQUFDLEtBQUssRUFDbEIsSUFBSSxFQUFFLEVBQUUsSUFDUixDQUNEO29CQUVGLFNBQVMsSUFBSSxDQUFDLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ2pDLHFDQUNFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUN4QixTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO3dCQUVsQyw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ3BDLENBQ0wsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFDUCxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ1QsOEJBQUMsaUJBQU8sSUFDTixJQUFJLFFBQ0osSUFBSSxFQUFDLFFBQVEsRUFDYixnQkFBZ0IsRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FDM0MsQ0FDSCxDQUFDLENBQUMsQ0FBQyxJQUFJO29CQUNQLE1BQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNoQyx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLElBQ25DLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFXLEVBQUUsRUFBRTt3QkFDakMsT0FBTyxDQUNMLHVEQUNNLFlBQVksQ0FBQzs0QkFDZixJQUFJLEVBQUUsTUFBTSxDQUFDLEtBQUs7NEJBQ2xCLFFBQVEsRUFBRSxNQUFNLENBQUMsUUFBUTs0QkFDekIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRTtnQ0FDbkMsY0FBYyxFQUNaLGdCQUFnQixLQUFLLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2dDQUM1QyxhQUFhLEVBQUUsTUFBTSxDQUFDLFFBQVE7NkJBQy9CLENBQUM7eUJBQ0gsQ0FBQyxJQUNGLEdBQUcsRUFBRSxNQUFNLENBQUMsS0FBSyxLQUVoQixNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNkOzRCQUNHLEVBQUUsQ0FBQyxVQUFVLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBQyxDQUFDOzRCQUN0Qyw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ2pDLENBQ1IsQ0FBQyxDQUFDLENBQUMsQ0FDRjs0QkFDRyxNQUFNLENBQUMsUUFBUTtnQ0FDZCxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUs7Z0NBQ2QsQ0FBQyxDQUFDLG1CQUFTLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxVQUFvQixDQUFDOzRCQUNoRCxNQUFNLENBQUMsR0FBRyxDQUNOLENBQ1IsQ0FDRyxDQUNQLENBQUM7b0JBQ0osQ0FBQyxDQUFDLENBQ0UsQ0FDUCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO1lBQ0osQ0FBQyxDQUNTLENBQ2IsQ0FBQztRQUNKLENBQUM7UUFFRCxZQUFZOztZQUNWLE1BQU0sRUFDSixXQUFXLEVBQUUsRUFBRSxFQUNmLFVBQVUsRUFBRSxFQUFFLEVBQ2QsU0FBUyxFQUNULFNBQVMsRUFDVCxLQUFLLEVBQ0wsV0FBVyxFQUNYLFFBQVEsRUFDUixRQUFRLEVBQ1IsUUFBUSxFQUNSLEdBQUcsRUFDSCxHQUFHLEVBQ0gsSUFBSSxFQUNKLFNBQVMsRUFDVCxJQUFJLEVBQ0wsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsTUFBTSxJQUFJLFNBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLDBDQUFFLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFFckQsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFDakUseUNBQ0UsSUFBSSxFQUFFLElBQUksRUFDVixXQUFXLEVBQUUsV0FBVyxFQUN4QixHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFDbEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQ3ZCLEdBQUcsRUFBRSxHQUFHLEVBQ1IsR0FBRyxFQUFFLEdBQUcsRUFDUixZQUFZLEVBQUMsS0FBSyxFQUNsQixJQUFJLEVBQUUsRUFBRSxFQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLElBQUksQ0FBQyx1QkFBdUIsRUFDdEMsS0FBSyxFQUNILE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssSUFBSTt3QkFDNUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ0osQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFFBQVE7NEJBQzNCLENBQUMsQ0FBQyxLQUFLOzRCQUNQLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxHQUUzQjtnQkFDRCxTQUFTLElBQUksQ0FBQyxRQUFRLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUNqQyxxQ0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLG1CQUFtQjtvQkFDOUQsOEJBQUMsWUFBSSxJQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsU0FBUyxFQUFDLE1BQU0sR0FBRyxDQUNwQyxDQUNMLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDSixDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxFQUNkLFNBQVMsRUFDVCxXQUFXLEVBQUUsRUFBRSxFQUNmLE9BQU8sRUFDUCxNQUFNLEVBQ04sWUFBWSxFQUNaLEtBQUssRUFBRSxRQUFRLEVBQ2YsTUFBTSxFQUNOLElBQUksRUFDSixRQUFRLEVBQ1IsU0FBUyxFQUNWLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sS0FBSyxHQUNULE9BQU8sUUFBUSxLQUFLLFFBQVE7Z0JBQzFCLENBQUMsQ0FBQztvQkFDRSxLQUFLLEVBQUUsUUFBUTtvQkFDZixJQUFJLEVBQUUsT0FBTztpQkFDZDtnQkFDSCxDQUFDLENBQUMsUUFBUSxDQUFDO1lBRWYsSUFBSSxLQUFLLEdBQ1AsWUFBWSxLQUFLLEtBQUssSUFBSSxDQUFDLE1BQU0sSUFBSSxPQUFPLENBQUMsTUFBTSxJQUFJLFlBQVksQ0FBQztnQkFDbEUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtnQkFDekIsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUUxQixNQUFNLFdBQVcsR0FBRyxtQkFBWSxDQUFDLEVBQUUsRUFBRSxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBRTFELElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDckIsS0FBSyxDQUFDLFVBQVU7Z0JBQ2hCLENBQUMsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUM3RCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxvQkFBb0IsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLElBQzNELE1BQU0sQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO2dCQUN0QixRQUFRO2FBQ1QsQ0FBQyxDQUNFLENBQ1AsQ0FBQyxDQUFDLENBQUMsQ0FDRix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLEdBQUcsRUFBRSxtQkFBbUIsRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUMxRCxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxZQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDOUMsV0FBVyxDQUNSLENBQ1AsQ0FDRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFFVCxJQUFJLFNBQVMsRUFBRTtnQkFDYixPQUFPLEtBQUssQ0FBQzthQUNkO1lBRUQsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxhQUFhLEVBQUU7b0JBQzNDLENBQUMsR0FBRyxFQUFFLHdCQUF3QixDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVE7b0JBQzNDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7b0JBQ2xDLGFBQWEsRUFBRSxRQUFRO2lCQUN4QixDQUFDO2dCQUVELEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNwRCxLQUFLO2dCQUNMLEtBQUssSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2pELENBQ1AsQ0FBQztRQUNKLENBQUM7O0lBNW5CTSx3QkFBWSxHQUF1QjtRQUN4QyxVQUFVLEVBQUUsRUFBRTtRQUNkLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFVBQVUsRUFBRSxPQUFPO1FBQ25CLFdBQVcsRUFBRSxFQUFFO1FBQ2YsY0FBYyxFQUFFLElBQUk7UUFDcEIsWUFBWSxFQUFFLElBQUk7S0FDbkIsQ0FBQztJQThTRjtRQURDLGlCQUFROztxRUFDa0IsZUFBSyxvQkFBTCxlQUFLLENBQUMsV0FBVzs7OERBTTNDO0lBa1VILGtCQUFDO0tBQUE7a0JBOXBCb0IsV0FBVztBQWdxQmhDLFNBQWdCLFlBQVksQ0FDMUIsS0FBaUIsRUFDakIsTUFBa0IsRUFDbEIsYUFBcUIsT0FBTztJQUU1QixPQUFPLEtBQUs7U0FDVCxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUNsRSxNQUFNLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ3hCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQVhELG9DQVdDO0FBS0Q7SUFBQSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLFdBQVc7S0FBRyxDQUFBO0lBQTFDLG1CQUFtQjtRQUgvQix3QkFBYyxDQUFDO1lBQ2QsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO09BQ1csbUJBQW1CLENBQXVCO0lBQUQsMEJBQUM7S0FBQTtBQUExQyxrREFBbUI7QUFLaEM7SUFBQSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLFdBQVc7S0FBRyxDQUFBO0lBQTlDLHVCQUF1QjtRQUhuQyx3QkFBYyxDQUFDO1lBQ2QsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQztPQUNXLHVCQUF1QixDQUF1QjtJQUFELDhCQUFDO0tBQUE7QUFBOUMsMERBQXVCO0FBTXBDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUEzQyxvQkFBb0I7UUFKaEMsd0JBQWMsQ0FBQztZQUNkLElBQUksRUFBRSxPQUFPO1lBQ2IsV0FBVyxFQUFFLFNBQVM7U0FDdkIsQ0FBQztPQUNXLG9CQUFvQixDQUF1QjtJQUFELDJCQUFDO0tBQUE7QUFBM0Msb0RBQW9CO0FBTWpDO0lBQUEsSUFBYSxrQkFBa0IsR0FBL0IsTUFBYSxrQkFBbUIsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUF6QyxrQkFBa0I7UUFKOUIsd0JBQWMsQ0FBQztZQUNkLElBQUksRUFBRSxLQUFLO1lBQ1gsV0FBVyxFQUFFLE9BQU87U0FDckIsQ0FBQztPQUNXLGtCQUFrQixDQUF1QjtJQUFELHlCQUFDO0tBQUE7QUFBekMsZ0RBQWtCO0FBSy9CO0lBQUEsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUFoRCx5QkFBeUI7UUFIckMsd0JBQWMsQ0FBQztZQUNkLElBQUksRUFBRSxhQUFhO1NBQ3BCLENBQUM7T0FDVyx5QkFBeUIsQ0FBdUI7SUFBRCxnQ0FBQztLQUFBO0FBQWhELDhEQUF5QjtBQUt0QztJQUFBLElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEsV0FBVztLQUFHLENBQUE7SUFBaEQseUJBQXlCO1FBSHJDLHdCQUFjLENBQUM7WUFDZCxJQUFJLEVBQUUsYUFBYTtTQUNwQixDQUFDO09BQ1cseUJBQXlCLENBQXVCO0lBQUQsZ0NBQUM7S0FBQTtBQUFoRCw4REFBeUI7QUFLdEM7SUFBQSxJQUFhLDJCQUEyQixHQUF4QyxNQUFhLDJCQUE0QixTQUFRLFdBQVc7S0FBRyxDQUFBO0lBQWxELDJCQUEyQjtRQUh2Qyx3QkFBYyxDQUFDO1lBQ2QsSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztPQUNXLDJCQUEyQixDQUF1QjtJQUFELGtDQUFDO0tBQUE7QUFBbEQsa0VBQTJCIn0=

});
