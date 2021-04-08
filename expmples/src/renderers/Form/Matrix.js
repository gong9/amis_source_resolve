amis.define('src/renderers/Form/Matrix.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file filter
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MatrixRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const api_1 = require("src/utils/api.ts");
  const components_1 = require("src/components/index.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let MatrixCheckbox = /** @class */ (() => {
      class MatrixCheckbox extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.sourceInvalid = false;
              this.mounted = false;
              this.state = {
                  columns: props.columns || [],
                  rows: props.rows || [],
                  loading: false
              };
              this.toggleItem = this.toggleItem.bind(this);
              this.reload = this.reload.bind(this);
              this.initOptions = this.initOptions.bind(this);
          }
          componentWillMount() {
              this.mounted = true;
          }
          componentDidMount() {
              const { formInited, addHook } = this.props;
              formInited ? this.reload() : addHook(this.initOptions, 'init');
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.columns !== nextProps.columns || props.rows !== nextProps.rows) {
                  this.setState({
                      columns: nextProps.columns || [],
                      rows: nextProps.rows || []
                  });
              }
              else if (nextProps.formInited &&
                  (nextProps.source !== props.source || props.data !== nextProps.data)) {
                  let prevApi = api_1.buildApi(props.source, props.data, {
                      ignoreData: true
                  });
                  let nextApi = api_1.buildApi(nextProps.source, nextProps.data, { ignoreData: true });
                  if (prevApi.url !== nextApi.url && api_1.isValidApi(nextApi.url)) {
                      this.sourceInvalid = true;
                  }
              }
          }
          componentDidUpdate() {
              if (this.sourceInvalid) {
                  this.sourceInvalid = false;
                  this.reload();
              }
          }
          componentWillUnmount() {
              this.mounted = false;
              const { removeHook } = this.props;
              removeHook(this.initOptions, 'init');
          }
          async initOptions(data) {
              await this.reload();
              const { formItem, name } = this.props;
              if (!formItem) {
                  return;
              }
              if (formItem.value) {
                  helper_1.setVariable(data, name, formItem.value);
              }
          }
          async reload() {
              const { source, data, env, onChange, translate: __ } = this.props;
              if (!api_1.isEffectiveApi(source, data) || this.state.loading) {
                  return;
              }
              if (!env || !env.fetcher) {
                  throw new Error('fetcher is required');
              }
              // todo 优化这块
              return await new Promise((resolve, reject) => {
                  if (!this.mounted) {
                      return resolve();
                  }
                  this.setState({
                      loading: true
                  }, () => {
                      if (!this.mounted) {
                          return resolve();
                      }
                      env
                          .fetcher(source, data)
                          .then(ret => {
                          if (!ret.ok) {
                              throw new Error(ret.msg || __('fetchFailed'));
                          }
                          if (!this.mounted) {
                              return resolve();
                          }
                          this.setState({
                              loading: false,
                              rows: ret.data.rows || [],
                              columns: ret.data.columns || []
                          }, () => {
                              let replace = source && source.replaceData;
                              let value = ret.data.value;
                              if (value) {
                                  value = source.replaceData
                                      ? value
                                      : mergeValue(value, this.state.columns, this.state.rows);
                                  onChange(value);
                              }
                              resolve();
                          });
                      })
                          .catch(reason => this.setState({
                          error: reason,
                          loading: false
                      }, () => resolve()));
                  });
              });
          }
          toggleItem(checked, x, y) {
              const { columns, rows } = this.state;
              const { multiple, singleSelectMode } = this.props;
              const value = this.props.value || buildDefaultValue(columns, rows);
              if (multiple) {
                  value[x][y] = Object.assign(Object.assign({}, value[x][y]), { checked });
              }
              else if (singleSelectMode === 'row') {
                  for (let x2 = 0, len = columns.length; x2 < len; x2++) {
                      value[x2][y] = Object.assign(Object.assign({}, value[x2][y]), { checked: x === x2 ? checked : !checked });
                  }
              }
              else if (singleSelectMode === 'column') {
                  for (let y2 = 0, len = rows.length; y2 < len; y2++) {
                      value[x][y2] = Object.assign(Object.assign({}, value[x][y2]), { checked: y === y2 ? checked : !checked });
                  }
              }
              else {
                  // 只剩下 cell 了
                  for (let y2 = 0, len = rows.length; y2 < len; y2++) {
                      for (let x2 = 0, len2 = columns.length; x2 < len2; x2++) {
                          value[x2][y2] = Object.assign(Object.assign({}, value[x2][y2]), { checked: x === x2 && y === y2 ? checked : !checked });
                      }
                  }
              }
              this.props.onChange(value.concat());
          }
          renderInput() {
              const { columns, rows } = this.state;
              const { rowLabel, className, classnames: cx, multiple } = this.props;
              const value = this.props.value || buildDefaultValue(columns, rows);
              return (react_1.default.createElement("div", { className: cx('Table m-b-none') },
                  react_1.default.createElement("div", { className: cx('Table-content') },
                      react_1.default.createElement("table", { className: cx('Table-table') },
                          react_1.default.createElement("thead", null,
                              react_1.default.createElement("tr", null,
                                  react_1.default.createElement("th", null, rowLabel),
                                  columns.map((column, x) => (react_1.default.createElement("th", { key: x, className: "text-center" }, column.label))))),
                          react_1.default.createElement("tbody", null, rows.map((row, y) => (react_1.default.createElement("tr", { key: y },
                              react_1.default.createElement("td", null,
                                  row.label,
                                  row.description || row.desc ? (react_1.default.createElement("span", { className: "m-l-xs text-muted text-xs" }, row.description || row.desc)) : null),
                              columns.map((column, x) => (react_1.default.createElement("td", { key: x, className: "text-center" },
                                  react_1.default.createElement(components_1.Checkbox, { type: multiple ? 'checkbox' : 'radio', checked: !!(value[x] && value[x][y] && value[x][y].checked), onChange: (checked) => this.toggleItem(checked, x, y) }))))))))))));
          }
          render() {
              const { className, render, classnames: cx } = this.props;
              const { error, loading } = this.state;
              return (react_1.default.createElement("div", { key: "input", className: cx('MatrixControl', className || '') },
                  error ? (react_1.default.createElement("div", { className: cx('MatrixControl-error Alert Alert--danger') }, String(error))) : (this.renderInput()),
                  react_1.default.createElement(components_1.Spinner, { size: "lg", overlay: true, key: "info", show: loading })));
          }
      }
      MatrixCheckbox.defaultProps = {
          columns: [],
          rows: [],
          multiple: true,
          singleSelectMode: 'column' // multiple 为 false 时有效。
      };
      return MatrixCheckbox;
  })();
  exports.default = MatrixCheckbox;
  function buildDefaultValue(columns, rows) {
      if (!Array.isArray(columns)) {
          columns = [];
      }
      if (!Array.isArray(rows)) {
          rows = [];
      }
      return columns.map(column => rows.map(row => (Object.assign(Object.assign(Object.assign({}, row), column), { checked: false }))));
  }
  function mergeValue(value, columns, rows) {
      return value.map((column, x) => column.map((item, y) => (Object.assign(Object.assign(Object.assign({}, columns[x]), rows[y]), item))));
  }
  let MatrixRenderer = /** @class */ (() => {
      let MatrixRenderer = class MatrixRenderer extends MatrixCheckbox {
      };
      MatrixRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'matrix',
              strictMode: false,
              sizeMutable: false
          })
      ], MatrixRenderer);
      return MatrixRenderer;
  })();
  exports.MatrixRenderer = MatrixRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0cml4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL01hdHJpeC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILDBEQUEwQjtBQUUxQixpQ0FBbUU7QUFDbkUseUNBQXFFO0FBQ3JFLGlEQUFtRDtBQUNuRCwrQ0FBeUQ7QUFzRXpEO0lBQUEsTUFBcUIsY0FBZSxTQUFRLGVBQUssQ0FBQyxTQUdqRDtRQVlDLFlBQVksS0FBa0I7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBSmYsa0JBQWEsR0FBWSxLQUFLLENBQUM7WUFDL0IsWUFBTyxHQUFZLEtBQUssQ0FBQztZQUt2QixJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLE9BQU8sRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLEVBQUU7Z0JBQzVCLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3RCLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztZQUVGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELGlCQUFpQjtZQUNmLE1BQU0sRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV6QyxVQUFVLENBQUMsQ0FBQyxD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

});
