amis.define('src/renderers/Form/TreeSelect.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeSelectControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const Tree_1 = tslib_1.__importDefault(require("src/components/Tree.tsx"));
  // @ts-ignore
  const match_sorter_1 = tslib_1.__importDefault(require("node_modules/match-sorter/dist/match-sorter.cjs"));
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const api_1 = require("src/utils/api.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const ResultBox_1 = tslib_1.__importDefault(require("src/components/ResultBox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const react_dom_1 = require("node_modules/react-dom/index");
  let TreeSelectControl = /** @class */ (() => {
      var _a, _b, _c;
      class TreeSelectControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.container = react_1.default.createRef();
              this.input = react_1.default.createRef();
              this.cache = {};
              this.targetRef = (ref) => (this.target = ref ? react_dom_1.findDOMNode(ref) : null);
              this.state = {
                  inputValue: '',
                  isOpened: false,
                  isFocused: false
              };
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.handleChange = this.handleChange.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.handleKeyPress = this.handleKeyPress.bind(this);
              this.handleInputChange = this.handleInputChange.bind(this);
              this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
              this.loadRemote = debounce_1.default(this.loadRemote.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
          }
          componentDidMount() {
              this.loadRemote('');
          }
          open(fn) {
              if (this.props.disabled) {
                  return;
              }
              this.setState({
                  isOpened: true
              }, fn);
          }
          close() {
              this.setState({
                  isOpened: false,
                  inputValue: this.props.multiple ? this.state.inputValue : ''
              }, () => this.loadRemote(this.state.inputValue));
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
          handleKeyPress(e) {
              if (e.key === ' ') {
                  this.handleOutClick(e);
                  e.preventDefault();
              }
          }
          validate() {
              const { value, minLength, maxLength, delimiter, translate: __ } = this.props;
              let curValue = Array.isArray(value)
                  ? value
                  : (value ? String(value) : '').split(delimiter || ',');
              if (minLength && curValue.length < minLength) {
                  return __('已选择数量低于设定的最小个数${minLength}，请选择更多的选项。', { minLength });
              }
              else if (maxLength && curValue.length > maxLength) {
                  return __('已选择数量超出设定的最大个数{{maxLength}}，请取消选择超出的选项。', { maxLength });
              }
          }
          removeItem(index, e) {
              const { selectedOptions, joinValues, extractValue, delimiter, valueField, onChange, disabled } = this.props;
              e && e.stopPropagation();
              if (disabled) {
                  return;
              }
              const items = selectedOptions.concat();
              items.splice(index, 1);
              let value = items;
              if (joinValues) {
                  value = items
                      .map((item) => item[valueField || 'value'])
                      .join(delimiter || ',');
              }
              else if (extractValue) {
                  value = items.map((item) => item[valueField || 'value']);
              }
              onChange(value);
          }
          handleChange(value) {
              const { onChange, multiple } = this.props;
              if (!multiple) {
                  this.close();
              }
              multiple || !this.state.inputValue
                  ? onChange(value)
                  : this.setState({
                      inputValue: ''
                  }, () => onChange(value));
          }
          handleInputChange(value) {
              const { autoComplete, data } = this.props;
              this.setState({
                  inputValue: value
              }, api_1.isEffectiveApi(autoComplete, data)
                  ? () => this.loadRemote(this.state.inputValue)
                  : undefined);
          }
          handleInputKeyDown(event) {
              const inputValue = this.state.inputValue;
              const { multiple, selectedOptions } = this.props;
              if (event.key === 'Backspace' &&
                  !inputValue &&
                  selectedOptions.length &&
                  multiple) {
                  this.removeItem(selectedOptions.length - 1);
              }
          }
          clearValue() {
              const { onChange, resetValue } = this.props;
              onChange(typeof resetValue === 'undefined' ? '' : resetValue);
          }
          filterOptions(options, keywords) {
              const { labelField, valueField } = this.props;
              return options.map(option => {
                  option = Object.assign({}, option);
                  option.visible = !!match_sorter_1.default([option], keywords, {
                      keys: [labelField || 'label', valueField || 'value']
                  }).length;
                  if (!option.visible && option.children) {
                      option.children = this.filterOptions(option.children, keywords);
                      const visibleCount = option.children.filter(item => item.visible)
                          .length;
                      option.visible = !!visibleCount;
                  }
                  option.visible && (option.collapsed = false);
                  return option;
              });
          }
          loadRemote(input) {
              const { autoComplete, env, data, setOptions, setLoading } = this.props;
              if (!api_1.isEffectiveApi(autoComplete, data)) {
                  return;
              }
              else if (!env || !env.fetcher) {
                  throw new Error('fetcher is required');
              }
              if (this.cache[input] || ~input.indexOf("'") /*中文没输完 233*/) {
                  let options = this.cache[input] || [];
                  let combinedOptions = this.mergeOptions(options);
                  setOptions(combinedOptions);
                  return Promise.resolve({
                      options: combinedOptions
                  });
              }
              setLoading(true);
              return env
                  .fetcher(autoComplete, Object.assign(Object.assign({}, data), { term: input, value: input }))
                  .then(ret => {
                  let options = (ret.data && ret.data.options) || ret.data || [];
                  this.cache[input] = options;
                  let combinedOptions = this.mergeOptions(options);
                  setOptions(combinedOptions);
                  return Promise.resolve({
                      options: combinedOptions
                  });
              })
                  .finally(() => setLoading(false));
          }
          mergeOptions(options) {
              const { selectedOptions } = this.props;
              let combinedOptions = options.concat();
              if (Array.isArray(selectedOptions) && selectedOptions.length) {
                  selectedOptions.forEach(option => {
                      if (!find_1.default(combinedOptions, (item) => item.value == option.value)) {
                          combinedOptions.push(Object.assign(Object.assign({}, option), { visible: false }));
                      }
                  });
              }
              return combinedOptions;
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          handleOutClick(e) {
              e.defaultPrevented ||
                  this.setState({
                      isOpened: true
                  });
          }
          handleResultChange(value) {
              const { joinValues, extractValue, delimiter, valueField, onChange, multiple } = this.props;
              let newValue = Array.isArray(value) ? value.concat() : [];
              if (!multiple && !newValue.length) {
                  onChange('');
                  return;
              }
              if (joinValues || extractValue) {
                  newValue = value.map(item => item[valueField || 'value']);
              }
              if (joinValues) {
                  newValue = newValue.join(delimiter || ',');
              }
              onChange(newValue);
          }
          renderItem(item) {
              const { labelField, options } = this.props;
              // 将所有祖先节点也展现出来
              const ancestors = helper_1.getTreeAncestors(options, item, true);
              return `${ancestors
                  ? ancestors.map(item => `${item[labelField || 'label']}`).join(' / ')
                  : item[labelField || 'label']}`;
          }
          renderOuter() {
              const { value, disabled, joinValues, extractValue, delimiter, placeholder, options, multiple, valueField, initiallyOpen, unfoldedLevel, withChildren, rootLabel, cascade, rootValue, showIcon, showRadio, popOverContainer, onlyChildren, classPrefix: ns, optionsPlaceholder, searchable, autoComplete, maxLength, minLength, labelField, translate: __ } = this.props;
              let filtedOptions = !api_1.isEffectiveApi(autoComplete) && searchable && this.state.inputValue
                  ? this.filterOptions(options, this.state.inputValue)
                  : options;
              return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (() => this.container.current), target: () => this.target, show: true },
                  react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: `${ns}TreeSelect-popover`, style: {
                          minWidth: this.target
                              ? this.target.getBoundingClientRect().width
                              : undefined
                      }, onHide: this.close, overlay: true },
                      react_1.default.createElement(Tree_1.default, { classPrefix: ns, onlyChildren: onlyChildren, labelField: labelField, valueField: valueField, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: __(optionsPlaceholder), options: filtedOptions, highlightTxt: this.state.inputValue, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, rootLabel: __(rootLabel), rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, cascade: cascade, foldedField: "collapsed", hideRoot: true, value: value || '', maxLength: maxLength, minLength: minLength }))));
          }
          render() {
              const { className, disabled, inline, loading, multiple, value, clearable, classPrefix: ns, classnames: cx, searchable, autoComplete, selectedOptions, placeholder, translate: __ } = this.props;
              return (react_1.default.createElement("div", { ref: this.container, className: cx(`TreeSelectControl`, className) },
                  react_1.default.createElement(ResultBox_1.default, { disabled: disabled, ref: this.targetRef, placeholder: __(placeholder || '空'), className: cx(`TreeSelect`, {
                          'TreeSelect--inline': inline,
                          'TreeSelect--single': !multiple,
                          'TreeSelect--multi': multiple,
                          'TreeSelect--searchable': searchable || api_1.isEffectiveApi(autoComplete),
                          'is-opened': this.state.isOpened,
                          'is-focused': this.state.isFocused,
                          'is-disabled': disabled
                      }), result: multiple
                          ? selectedOptions
                          : selectedOptions.length
                              ? this.renderItem(selectedOptions[0])
                              : '', onResultClick: this.handleOutClick, value: this.state.inputValue, onChange: this.handleInputChange, onResultChange: this.handleResultChange, itemRender: this.renderItem, onKeyPress: this.handleKeyPress, onFocus: this.handleFocus, onBlur: this.handleBlur, onKeyDown: this.handleInputKeyDown, clearable: clearable, allowInput: searchable || api_1.isEffectiveApi(autoComplete), inputPlaceholder: '' }, loading ? react_1.default.createElement(Spinner_1.default, { size: "sm" }) : undefined),
                  this.state.isOpened ? this.renderOuter() : null));
          }
      }
      TreeSelectControl.defaultProps = {
          placeholder: 'Select.placeholder',
          optionsPlaceholder: 'placeholder.noData',
          multiple: false,
          clearable: true,
          rootLabel: '顶级',
          rootValue: '',
          showIcon: true,
          joinValues: true,
          extractValue: false,
          delimiter: ',',
          resetValue: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelectControl.prototype, "handleOutClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelectControl.prototype, "handleResultChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelectControl.prototype, "renderItem", null);
      return TreeSelectControl;
  })();
  exports.default = TreeSelectControl;
  let TreeSelectControlRenderer = /** @class */ (() => {
      let TreeSelectControlRenderer = class TreeSelectControlRenderer extends TreeSelectControl {
      };
      TreeSelectControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'tree-select'
          })
      ], TreeSelectControlRenderer);
      return TreeSelectControlRenderer;
  })();
  exports.TreeSelectControlRenderer = TreeSelectControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZVNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9UcmVlU2VsZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLCtFQUErQztBQUMvQywrRUFBK0M7QUFFL0MsdUNBS21CO0FBRW5CLHlFQUFpRDtBQUNqRCxhQUFhO0FBQ2Isd0VBQXVDO0FBQ3ZDLHVFQUFzQztBQUN0QywrREFBK0I7QUFFL0IseUNBQStDO0FBQy9DLCtFQUErQztBQUMvQyxtRkFBbUQ7QUFDbkQsK0NBQThEO0FBQzlELHlDQUFzQztBQTZEdEM7O0lBQUEsTUFBcUIsaUJBQWtCLFNBQVEsZUFBSyxDQUFDLFNBR3BEO1FBMkJDLFlBQVksS0FBc0I7WUFDaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBYmYsY0FBUyxHQUFvQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFL0QsVUFBSyxHQUF5QixlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFFaEQsVUFBSyxHQUVELEVBQUUsQ0FBQztZQUdQLGNBQVMsR0FBRyxDQUFDLEdBQVEsRUFBRSxFQUFFLENBQ3ZCLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFFLHVCQUFXLENBQUMsR0FBRyxDQUFpQixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUsvRCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUM7WUFFRixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxrQkFBa0IsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdELElBQUksQ0FBQyxVQUFVLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQ3pELFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGlCQUFpQjtZQUNmLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDdEIsQ0FBQztRQUVELElBQUksQ0FBQyxFQUFlO1lBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ3ZCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxRQUFRLENBQ1g7Z0JBQ0UsUUFBUSxFQUFFLElBQUk7YUFDZixFQUNELEVBQUUsQ0FDSCxDQUFDO1FBQ0osQ0FBQztRQUVELEtBQUs7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUNYO2dCQUNFLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFVBQVUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEVBQUU7YUFDN0QsRUFDRCxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQzdDLENBQUM7UUFDSixDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osU0FBUyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELFVBQVU7WUFDUixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFNBQVMsRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxjQUFjLENBQUMsQ0FBc0I7WUFDbkMsSUFBSSxDQUFDLENBQUMsR0FBRyxLQUFLLEdBQUcsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFRLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQztRQUVELFFBQVE7WUFDTixNQUFNLEVBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNFLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNqQyxDQUFDLENBQUMsS0FBSztnQkFDUCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUN6RCxJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLFNBQVMsRUFBRTtnQkFDNUMsT0FBTyxFQUFFLENBQ1Asc0NBQXNDLEVBQ3RDLEVBQUMsU0FBUyxFQUFDLENBQ1osQ0FBQzthQUNIO2lCQUFNLElBQUksU0FBUyxJQUFJLFFBQVEsQ0FBQyxNQUFNLEdBQUcsU0FBUyxFQUFFO2dCQUNuRCxPQUFPLEVBQUUsQ0FDUCx5Q0FBeUMsRUFDekMsRUFBQyxTQUFTLEVBQUMsQ0FDWixDQUFDO2FBQ0g7UUFDSCxDQUFDO1FBRUQsVUFBVSxDQUFDLEtBQWEsRUFBRSxDQUFpQztZQUN6RCxNQUFNLEVBQ0osZUFBZSxFQUNmLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxFQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFFekIsSUFBSSxRQUFRLEVBQUU7Z0JBQ1osT0FBTzthQUNSO1lBRUQsTUFBTSxLQUFLLEdBQUcsZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ3ZDLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRXZCLElBQUksS0FBSyxHQUFRLEtBQUssQ0FBQztZQUV2QixJQUFJLFVBQVUsRUFBRTtnQkFDZCxLQUFLLEdBQUcsS0FBSztxQkFDVixHQUFHLENBQUMsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUM7cUJBQy9DLElBQUksQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDLENBQUM7YUFDM0I7aUJBQU0sSUFBSSxZQUFZLEVBQUU7Z0JBQ3ZCLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFDL0Q7WUFFRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUVELFlBQVksQ0FBQyxLQUFVO1lBQ3JCLE1BQU0sRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV4QyxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUNkO1lBRUQsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVO2dCQUNoQyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztnQkFDakIsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQ1g7b0JBQ0UsVUFBVSxFQUFFLEVBQUU7aUJBQ2YsRUFDRCxHQUFHLEVBQUUsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQ3RCLENBQUM7UUFDUixDQUFDO1FBRUQsaUJBQWlCLENBQUMsS0FBYTtZQUM3QixNQUFNLEVBQUMsWUFBWSxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFeEMsSUFBSSxDQUFDLFFBQVEsQ0FDWDtnQkFDRSxVQUFVLEVBQUUsS0FBSzthQUNsQixFQUNELG9CQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQztnQkFDaEMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQzlDLENBQUMsQ0FBQyxTQUFTLENBQ2QsQ0FBQztRQUNKLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxLQUEwQjtZQUMzQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUN6QyxNQUFNLEVBQUMsUUFBUSxFQUFFLGVBQWUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFL0MsSUFDRSxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVc7Z0JBQ3pCLENBQUMsVUFBVTtnQkFDWCxlQUFlLENBQUMsTUFBTTtnQkFDdEIsUUFBUSxFQUNSO2dCQUNBLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQzthQUM3QztRQUNILENBQUM7UUFFRCxVQUFVO1lBQ1IsTUFBTSxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTFDLFFBQVEsQ0FBQyxPQUFPLFVBQVUsS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFzQixFQUFFLFFBQWdCO1lBQ3BELE1BQU0sRUFBQyxVQUFVLEVBQUUsVUFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU1QyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQzFCLE1BQU0scUJBQ0QsTUFBTSxDQUNWLENBQUM7Z0JBQ0YsTUFBTSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsc0JBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLFFBQVEsRUFBRTtvQkFDakQsSUFBSSxFQUFFLENBQUMsVUFBVSxJQUFJLE9BQU8sRUFBRSxVQUFVLElBQUksT0FBTyxDQUFDO2lCQUNyRCxDQUFDLENBQUMsTUFBTSxDQUFDO2dCQUVWLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUU7b0JBQ3RDLE1BQU0sQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO29CQUNoRSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7eUJBQzlELE1BQU0sQ0FBQztvQkFDVixNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxZQUFZLENBQUM7aUJBQ2pDO2dCQUVELE1BQU0sQ0FBQyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxDQUFDO2dCQUM3QyxPQUFPLE1BQU0sQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxVQUFVLENBQUMsS0FBYTtZQUN0QixNQUFNLEVBQUMsWUFBWSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLFVBQVUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFckUsSUFBSSxDQUFDLG9CQUFjLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUN2QyxPQUFPO2FBQ1I7aUJBQU0sSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUU7Z0JBQy9CLE1BQU0sSUFBSSxLQUFLLENBQUMscUJBQXFCLENBQUMsQ0FBQzthQUN4QztZQUVELElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsYUFBYSxFQUFFO2dCQUMxRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDdEMsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUU1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ3JCLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixDQUFDLENBQUM7YUFDSjtZQUVELFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQixPQUFPLEdBQUc7aUJBQ1AsT0FBTyxDQUFDLFlBQVksa0NBQ2hCLElBQUksS0FDUCxJQUFJLEVBQUUsS0FBSyxFQUNYLEtBQUssRUFBRSxLQUFLLElBQ1o7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNWLElBQUksT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksSUFBSyxHQUFHLENBQUMsSUFBWSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEdBQUcsQ0FBQyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUN4RSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLE9BQU8sQ0FBQztnQkFDNUIsSUFBSSxlQUFlLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztnQkFDakQsVUFBVSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUU1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUM7b0JBQ3JCLE9BQU8sRUFBRSxlQUFlO2lCQUN6QixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUM7aUJBQ0QsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQ3RDLENBQUM7UUFFRCxZQUFZLENBQUMsT0FBc0I7WUFDakMsTUFBTSxFQUFDLGVBQWUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxlQUFlLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBRXZDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFlLENBQUMsTUFBTSxFQUFFO2dCQUM1RCxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMvQixJQUNFLENBQUMsY0FBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLElBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQ3BFO3dCQUNBLGVBQWUsQ0FBQyxJQUFJLGlDQUNmLE1BQU0sS0FDVCxPQUFPLEVBQUUsS0FBSyxJQUNkLENBQUM7cUJBQ0o7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtZQUNELE9BQU8sZUFBZSxDQUFDO1FBQ3pCLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDeEMsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFHRCxjQUFjLENBQUMsQ0FBd0I7WUFDckMsQ0FBQyxDQUFDLGdCQUFnQjtnQkFDaEIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixRQUFRLEVBQUUsSUFBSTtpQkFDZixDQUFDLENBQUM7UUFDUCxDQUFDO1FBR0Qsa0JBQWtCLENBQUMsS0FBb0I7WUFDckMsTUFBTSxFQUNKLFVBQVUsRUFDVixZQUFZLEVBQ1osU0FBUyxFQUNULFVBQVUsRUFDVixRQUFRLEVBQ1IsUUFBUSxFQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRS9ELElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO2dCQUNqQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7Z0JBQ2IsT0FBTzthQUNSO1lBRUQsSUFBSSxVQUFVLElBQUksWUFBWSxFQUFFO2dCQUM5QixRQUFRLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQzthQUMzRDtZQUVELElBQUksVUFBVSxFQUFFO2dCQUNkLFFBQVEsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUM1QztZQUVELFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUNyQixDQUFDO1FBR0QsVUFBVSxDQUFDLElBQVk7WUFDckIsTUFBTSxFQUFDLFVBQVUsRUFBRSxPQUFPLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpDLGVBQWU7WUFDZixNQUFNLFNBQVMsR0FBRyx5QkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3hELE9BQU8sR0FDTCxTQUFTO2dCQUNQLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNyRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQ2hDLEVBQUUsQ0FBQztRQUNMLENBQUM7UUFFRCxXQUFXO1lBQ1QsTUFBTSxFQUNKLEtBQUssRUFDTCxRQUFRLEVBQ1IsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLFNBQVMsRUFDVCxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFlBQVksRUFDWixXQUFXLEVBQUUsRUFBRSxFQUNmLGtCQUFrQixFQUNsQixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLFNBQVMsRUFBRSxFQUFFLEVBQ2QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxhQUFhLEdBQ2YsQ0FBQyxvQkFBYyxDQUFDLFlBQVksQ0FBQyxJQUFJLFVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7Z0JBQ2xFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztnQkFDcEQsQ0FBQyxDQUFDLE9BQU8sQ0FBQztZQUVkLE9BQU8sQ0FDTCw4QkFBQyxpQkFBTyxJQUNOLFNBQVMsRUFBRSxnQkFBZ0IsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQzdELE1BQU0sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUN6QixJQUFJO2dCQUVKLDhCQUFDLGlCQUFPLElBQ04sV0FBVyxFQUFFLEVBQUUsRUFDZixTQUFTLEVBQUUsR0FBRyxFQUFFLG9CQUFvQixFQUNwQyxLQUFLLEVBQUU7d0JBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNOzRCQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUs7NEJBQzNDLENBQUMsQ0FBQyxTQUFTO3FCQUNkLEVBQ0QsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ2xCLE9BQU87b0JBRVAsOEJBQUMsY0FBWSxJQUNYLFdBQVcsRUFBRSxFQUFFLEVBQ2YsWUFBWSxFQUFFLFlBQVksRUFDMUIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsVUFBVSxFQUFFLFVBQVUsRUFDdEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFlBQVksRUFBRSxZQUFZLEVBQzFCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFdBQVcsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsRUFDbkMsT0FBTyxFQUFFLGFBQWEsRUFDdEIsWUFBWSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUNuQyxRQUFRLEVBQUUsUUFBUSxFQUNsQixhQUFhLEVBQUUsYUFBYSxFQUM1QixhQUFhLEVBQUUsYUFBYSxFQUM1QixZQUFZLEVBQUUsWUFBWSxFQUMxQixTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUN4QixTQUFTLEVBQUUsU0FBUyxFQUNwQixRQUFRLEVBQUUsUUFBUSxFQUNsQixTQUFTLEVBQUUsU0FBUyxFQUNwQixPQUFPLEVBQUUsT0FBTyxFQUNoQixXQUFXLEVBQUMsV0FBVyxFQUN2QixRQUFRLFFBQ1IsS0FBSyxFQUFFLEtBQUssSUFBSSxFQUFFLEVBQ2xCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFNBQVMsRUFBRSxTQUFTLEdBQ3BCLENBQ00sQ0FDRixDQUNYLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsUUFBUSxFQUNSLE1BQU0sRUFDTixPQUFPLEVBQ1AsUUFBUSxFQUNSLEtBQUssRUFDTCxTQUFTLEVBQ1QsV0FBVyxFQUFFLEVBQUUsRUFDZixVQUFVLEVBQUUsRUFBRSxFQUNkLFVBQVUsRUFDVixZQUFZLEVBQ1osZUFBZSxFQUNmLFdBQVcsRUFDWCxTQUFTLEVBQUUsRUFBRSxFQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE9BQU8sQ0FDTCx1Q0FBSyxHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixFQUFFLFNBQVMsQ0FBQztnQkFDckUsOEJBQUMsbUJBQVMsSUFDUixRQUFRLEVBQUUsUUFBUSxFQUNsQixHQUFHLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDbkIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLElBQUksR0FBRyxDQUFDLEVBQ25DLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFO3dCQUMxQixvQkFBb0IsRUFBRSxNQUFNO3dCQUM1QixvQkFBb0IsRUFBRSxDQUFDLFFBQVE7d0JBQy9CLG1CQUFtQixFQUFFLFFBQVE7d0JBQzdCLHdCQUF3QixFQUN0QixVQUFVLElBQUksb0JBQWMsQ0FBQyxZQUFZLENBQUM7d0JBQzVDLFdBQVcsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVE7d0JBQ2hDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7d0JBQ2xDLGFBQWEsRUFBRSxRQUFRO3FCQUN4QixDQUFDLEVBQ0YsTUFBTSxFQUNKLFFBQVE7d0JBQ04sQ0FBQyxDQUFDLGVBQWU7d0JBQ2pCLENBQUMsQ0FBQyxlQUFlLENBQUMsTUFBTTs0QkFDeEIsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUNyQyxDQUFDLENBQUMsRUFBRSxFQUVSLGFBQWEsRUFBRSxJQUFJLENBQUMsY0FBYyxFQUNsQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQ2hDLGNBQWMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLEVBQ3ZDLFVBQVUsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUMzQixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDL0IsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLEVBQ3pCLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUNsQyxTQUFTLEVBQUUsU0FBUyxFQUNwQixVQUFVLEVBQUUsVUFBVSxJQUFJLG9CQUFjLENBQUMsWUFBWSxDQUFDLEVBQ3RELGdCQUFnQixFQUFFLEVBQUUsSUFFbkIsT0FBTyxDQUFDLENBQUMsQ0FBQyw4QkFBQyxpQkFBTyxJQUFDLElBQUksRUFBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUNsQztnQkFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQzVDLENBQ1AsQ0FBQztRQUNKLENBQUM7O0lBaGVNLDhCQUFZLEdBQUc7UUFDcEIsV0FBVyxFQUFFLG9CQUFvQjtRQUNqQyxrQkFBa0IsRUFBRSxvQkFBb0I7UUFDeEMsUUFBUSxFQUFFLEtBQUs7UUFDZixTQUFTLEVBQUUsSUFBSTtRQUNmLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsSUFBSTtRQUNkLFVBQVUsRUFBRSxJQUFJO1FBQ2hCLFlBQVksRUFBRSxLQUFLO1FBQ25CLFNBQVMsRUFBRSxHQUFHO1FBQ2QsVUFBVSxFQUFFLEVBQUU7S0FDZixDQUFDO0lBa1JGO1FBREMsaUJBQVE7O3FFQUNTLGVBQUssb0JBQUwsZUFBSyxDQUFDLFVBQVU7OzJEQUtqQztJQUdEO1FBREMsaUJBQVE7O3FFQUNpQixLQUFLLG9CQUFMLEtBQUs7OytEQTBCOUI7SUFHRDtRQURDLGlCQUFROztxRUFDUSxnQkFBTSxvQkFBTixnQkFBTTs7dURBVXRCO0lBb0pILHdCQUFDO0tBQUE7a0JBcmVvQixpQkFBaUI7QUEwZXRDO0lBQUEsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxpQkFBaUI7S0FBRyxDQUFBO0lBQXRELHlCQUF5QjtRQUhyQyx3QkFBYyxDQUFDO1lBQ2QsSUFBSSxFQUFFLGFBQWE7U0FDcEIsQ0FBQztPQUNXLHlCQUF5QixDQUE2QjtJQUFELGdDQUFDO0tBQUE7QUFBdEQsOERBQXlCIn0=

});
