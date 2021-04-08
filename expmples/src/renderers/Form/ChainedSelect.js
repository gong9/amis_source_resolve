amis.define('src/renderers/Form/ChainedSelect.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChainedSelectControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  const api_1 = require("src/utils/api.ts");
  let ChainedSelectControl = /** @class */ (() => {
      class ChainedSelectControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  stack: []
              };
              this.handleChange = this.handleChange.bind(this);
              this.loadMore = this.loadMore.bind(this);
          }
          componentDidMount() {
              const { formInited } = this.props;
              formInited ? this.loadMore() : this.props.addHook(this.loadMore, 'init');
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.options !== nextProps.options) {
                  this.setState({
                      stack: []
                  });
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (props.formInited && props.value !== prevProps.value) {
                  this.loadMore();
              }
          }
          loadMore() {
              const { value, delimiter, onChange, joinValues, extractValue, source, data, env } = this.props;
              const arr = Array.isArray(value)
                  ? value.concat()
                  : value && typeof value === 'string'
                      ? value.split(delimiter || ',')
                      : [];
              let idx = 0;
              let len = this.state.stack.length;
              while (idx < len &&
                  arr[idx] &&
                  this.state.stack[idx].parentId ==
                      (joinValues || extractValue ? arr[idx] : arr[idx].value)) {
                  idx++;
              }
              if (!arr[idx] || !env || !api_1.isEffectiveApi(source, data)) {
                  return;
              }
              const parentId = joinValues || extractValue ? arr[idx] : arr[idx].value;
              const stack = this.state.stack.concat();
              stack.splice(idx, stack.length - idx);
              stack.push({
                  parentId,
                  loading: true,
                  options: []
              });
              this.setState({
                  stack
              }, () => {
                  env
                      .fetcher(source, Object.assign(Object.assign({}, data), { value: arr, level: idx + 1, parentId, parent: arr[idx] }))
                      .then(ret => {
                      // todo 没有检测 response.ok
                      const stack = this.state.stack.concat();
                      const remoteValue = ret.data ? ret.data.value : undefined;
                      let options = (ret.data && ret.data.options) || ret.data;
                      stack.splice(idx, stack.length - idx);
                      if (typeof remoteValue !== 'undefined') {
                          arr.splice(idx + 1, value.length - idx - 1);
                          arr.push(remoteValue);
                          onChange(joinValues ? arr.join(delimiter || ',') : arr);
                      }
                      stack.push({
                          options,
                          parentId,
                          loading: false,
                          visible: !!options
                      });
                      this.setState({
                          stack: stack
                      }, this.loadMore);
                  })
                      .catch(e => {
                      env.notify('error', e.message);
                  });
              });
          }
          handleChange(index, currentValue) {
              const { value, delimiter, onChange, joinValues, extractValue } = this.props;
              const arr = Array.isArray(value)
                  ? value.concat()
                  : value && typeof value === 'string'
                      ? value.split(delimiter || ',')
                      : [];
              arr.splice(index, arr.length - index);
              arr.push(joinValues ? currentValue.value : currentValue);
              onChange(joinValues
                  ? arr.join(delimiter || ',')
                  : extractValue
                      ? arr.map(item => item.value || item)
                      : arr);
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render() {
              const _a = this.props, { options, classPrefix: ns, className, inline, loading, value, delimiter, joinValues, extractValue, multiple } = _a, rest = tslib_1.__rest(_a, ["options", "classPrefix", "className", "inline", "loading", "value", "delimiter", "joinValues", "extractValue", "multiple"]);
              const arr = Array.isArray(value)
                  ? value.concat()
                  : value && typeof value === 'string'
                      ? value.split(delimiter || ',')
                      : [];
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}ChainedSelectControl`, className) },
                  react_1.default.createElement(Select_1.default, Object.assign({}, rest, { classPrefix: ns, key: "base", options: options, value: arr[0], onChange: this.handleChange.bind(this, 0), loading: loading, inline: true })),
                  this.state.stack.map(({ options, loading, visible }, index) => visible === false ? null : (react_1.default.createElement(Select_1.default, Object.assign({}, rest, { classPrefix: ns, key: `x-${index + 1}`, options: options, value: arr[index + 1], onChange: this.handleChange.bind(this, index + 1), loading: loading, inline: true }))))));
          }
      }
      ChainedSelectControl.defaultProps = {
          clearable: false,
          searchable: false,
          multiple: true
      };
      return ChainedSelectControl;
  })();
  exports.default = ChainedSelectControl;
  let ChainedSelectControlRenderer = /** @class */ (() => {
      let ChainedSelectControlRenderer = class ChainedSelectControlRenderer extends ChainedSelectControl {
      };
      ChainedSelectControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'chained-select',
              sizeMutable: false
          })
      ], ChainedSelectControlRenderer);
      return ChainedSelectControlRenderer;
  })();
  exports.ChainedSelectControlRenderer = ChainedSelectControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhaW5lZFNlbGVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9DaGFpbmVkU2VsZWN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9FQUE0QjtBQUM1Qix1Q0FLbUI7QUFDbkIsNkVBQTZDO0FBRTdDLHlDQUErQztBQWdDL0M7SUFBQSxNQUFxQixvQkFBcUIsU0FBUSxlQUFLLENBQUMsU0FHdkQ7UUFVQyxZQUFZLEtBQXlCO1lBQ25DLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUpmLFVBQUssR0FBZ0I7Z0JBQ25CLEtBQUssRUFBRSxFQUFFO2FBQ1YsQ0FBQztZQUlBLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQsaUJBQWlCO1lBQ2YsTUFBTSxFQUFDLFVBQVUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFaEMsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0UsQ0FBQztRQUVELHlCQUF5QixDQUFDLFNBQTZCO1lBQ3JELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFekIsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLFNBQVMsQ0FBQyxPQUFPLEVBQUU7Z0JBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osS0FBSyxFQUFFLEVBQUU7aUJB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

});
