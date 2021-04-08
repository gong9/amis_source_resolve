amis.define('src/renderers/Form/Select.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MultiSelectControlRenderer = exports.SelectControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const api_1 = require("src/utils/api.ts");
  const helper_1 = require("src/utils/helper.ts");
  let SelectControl = /** @class */ (() => {
      var _a;
      class SelectControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.changeValue = this.changeValue.bind(this);
              this.lazyloadRemote = debounce_1.default(this.loadRemote.bind(this), 250, {
                  trailing: true,
                  leading: false
              });
              this.inputRef = this.inputRef.bind(this);
          }
          componentWillUnmount() {
              this.unHook && this.unHook();
          }
          inputRef(ref) {
              this.input = ref;
          }
          foucs() {
              this.input && this.input.focus();
          }
          changeValue(value) {
              const { joinValues, extractValue, delimiter, multiple, type, valueField, onChange, setOptions, options } = this.props;
              let newValue = value;
              let additonalOptions = [];
              (Array.isArray(value) ? value : value ? [value] : []).forEach((option) => {
                  let resolved = find_1.default(options, (item) => item[valueField || 'value'] == option[valueField || 'value']);
                  resolved || additonalOptions.push(option);
              });
              if (joinValues) {
                  if (multiple) {
                      newValue = Array.isArray(value)
                          ? value
                              .map(item => item[valueField || 'value'])
                              .join(delimiter)
                          : value
                              ? value[valueField || 'value']
                              : '';
                  }
                  else {
                      newValue = newValue ? newValue[valueField || 'value'] : '';
                  }
              }
              else if (extractValue) {
                  if (multiple) {
                      newValue = Array.isArray(value)
                          ? value.map(item => item[valueField || 'value'])
                          : value
                              ? [value[valueField || 'value']]
                              : [''];
                  }
                  else {
                      newValue = newValue ? newValue[valueField || 'value'] : '';
                  }
              }
              // 不设置没法回显
              additonalOptions.length && setOptions(options.concat(additonalOptions));
              onChange(newValue);
          }
          loadRemote(input) {
              const { autoComplete, env, data, setOptions, setLoading, formInited, addHook } = this.props;
              if (!env || !env.fetcher) {
                  throw new Error('fetcher is required');
              }
              if (!formInited) {
                  this.unHook && this.unHook();
                  return (this.unHook = addHook(this.loadRemote.bind(this, input), 'init'));
              }
              const ctx = helper_1.createObject(data, {
                  term: input,
                  value: input
              });
              if (!api_1.isEffectiveApi(autoComplete, ctx)) {
                  return Promise.resolve({
                      options: []
                  });
              }
              setLoading(true);
              return env
                  .fetcher(autoComplete, ctx)
                  .then(ret => {
                  let options = (ret.data && ret.data.options) || ret.data || [];
                  let combinedOptions = this.mergeOptions(options);
                  setOptions(combinedOptions);
                  return {
                      options: combinedOptions
                  };
              })
                  .finally(() => setLoading(false));
          }
          mergeOptions(options) {
              const { selectedOptions } = this.props;
              let combinedOptions = options.concat();
              if (Array.isArray(selectedOptions) && selectedOptions.length) {
                  selectedOptions.forEach(option => {
                      if (!find_1.default(combinedOptions, (item) => item.value == option.value)) {
                          combinedOptions.push(Object.assign(Object.assign({}, option), { hidden: true }));
                      }
                  });
              }
              return combinedOptions;
          }
          renderMenu(option, state) {
              const { menuTpl, render, data } = this.props;
              return render(`menu/${state.index}`, menuTpl, {
                  data: helper_1.createObject(helper_1.createObject(data, state), option)
              });
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render() {
              let _a = this.props, { autoComplete, searchable, options, className, loading, value, selectedOptions, multi, multiple, placeholder, id, classPrefix, classnames, creatable, inline, noResultsText, render, menuTpl } = _a, rest = tslib_1.__rest(_a, ["autoComplete", "searchable", "options", "className", "loading", "value", "selectedOptions", "multi", "multiple", "placeholder", "id", "classPrefix", "classnames", "creatable", "inline", "noResultsText", "render", "menuTpl"]);
              if (noResultsText && /<\w+/.test(noResultsText)) {
                  noResultsText = render('noResultText', noResultsText);
              }
              return (react_1.default.createElement("div", { className: classnames_1.default(`${classPrefix}SelectControl`, className) },
                  react_1.default.createElement(Select_1.default, Object.assign({}, rest, { placeholder: placeholder, multiple: multiple || multi, ref: this.inputRef, value: selectedOptions, options: options, loadOptions: api_1.isEffectiveApi(autoComplete) ? this.lazyloadRemote : undefined, creatable: creatable, searchable: searchable || !!autoComplete, onChange: this.changeValue, loading: loading, noResultsText: noResultsText, renderMenu: menuTpl ? this.renderMenu : undefined }))));
          }
      }
      SelectControl.defaultProps = {
          clearable: false,
          searchable: false,
          multiple: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], SelectControl.prototype, "renderMenu", null);
      return SelectControl;
  })();
  exports.default = SelectControl;
  let SelectControlRenderer = /** @class */ (() => {
      let SelectControlRenderer = class SelectControlRenderer extends SelectControl {
      };
      SelectControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'select'
          })
      ], SelectControlRenderer);
      return SelectControlRenderer;
  })();
  exports.SelectControlRenderer = SelectControlRenderer;
  let MultiSelectControlRenderer = /** @class */ (() => {
      let MultiSelectControlRenderer = class MultiSelectControlRenderer extends SelectControl {
      };
      MultiSelectControlRenderer.defaultProps = {
          multiple: true
      };
      MultiSelectControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'multi-select'
          })
      ], MultiSelectControlRenderer);
      return MultiSelectControlRenderer;
  })();
  exports.MultiSelectControlRenderer = MultiSelectControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1NlbGVjdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixvRUFBNEI7QUFDNUIsdUNBS21CO0FBQ25CLDZFQUE2QztBQUM3QywrREFBK0I7QUFDL0IsdUVBQXNDO0FBRXRDLHlDQUErQztBQUMvQywrQ0FBbUU7QUFrQ25FOztJQUFBLE1BQXFCLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBMkI7UUFVMUUsWUFBWSxLQUFrQjtZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsa0JBQU8sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUU7Z0JBQzdELFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsb0JBQW9CO1lBQ2xCLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFFRCxRQUFRLENBQUMsR0FBUTtZQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxDQUFDO1FBQ25CLENBQUM7UUFFRCxLQUFLO1lBQ0gsSUFBSSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7UUFFRCxXQUFXLENBQUMsS0FB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

});
