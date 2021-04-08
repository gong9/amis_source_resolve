amis.define('src/renderers/Form/Transfer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TransferRender = exports.BaseTransferRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Transfer_1 = tslib_1.__importDefault(require("src/components/Transfer.tsx"));
  const Options_2 = require("src/renderers/Form/Options.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const Select_1 = require("src/components/Select.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let BaseTransferRenderer = /** @class */ (() => {
      var _a, _b, _c, _d;
      class BaseTransferRenderer extends react_1.default.Component {
          handleChange(value) {
              const { onChange, joinValues, delimiter, valueField, extractValue, options, setOptions } = this.props;
              let newValue = value;
              let newOptions = options.concat();
              if (Array.isArray(value)) {
                  if (joinValues || extractValue) {
                      newValue = value.map(item => {
                          const resolved = helper_1.findTree(options, Select_1.optionValueCompare(item[valueField || 'value'], valueField || 'value'));
                          if (!resolved) {
                              newOptions.push(item);
                          }
                          return item[valueField || 'value'];
                      });
                  }
                  if (joinValues) {
                      newValue = newValue.join(delimiter || ',');
                  }
              }
              newOptions.length > options.length && setOptions(newOptions, true);
              onChange(newValue);
          }
          option2value(option) {
              return option;
          }
          async handleSearch(term, cancelExecutor) {
              const { searchApi, options, labelField, valueField, env, data } = this.props;
              if (searchApi) {
                  try {
                      const payload = await env.fetcher(searchApi, helper_1.createObject(data, { term }), {
                          cancelExecutor
                      });
                      if (!payload.ok) {
                          throw new Error(payload.msg || '搜索请求异常');
                      }
                      const result = payload.data.options || payload.data.items || payload.data;
                      if (!Array.isArray(result)) {
                          throw new Error('CRUD.invalidArray');
                      }
                      return result.map(item => {
                          let resolved = null;
                          const value = item[valueField || 'value'];
                          // 只有 value 值有意义的时候，再去找；否则直接返回
                          if (Array.isArray(options) && value !== null && value !== undefined) {
                              resolved = find_1.default(options, Select_1.optionValueCompare(value, valueField));
                          }
                          return resolved || item;
                      });
                  }
                  catch (e) {
                      if (!env.isCancel(e)) {
                          env.notify('error', e.message);
                      }
                      return [];
                  }
              }
              else if (term) {
                  const regexp = helper_1.string2regExp(term);
                  return helper_1.filterTree(options, (option) => {
                      return !!((Array.isArray(option.children) && option.children.length) ||
                          regexp.test(option[labelField || 'label']) ||
                          regexp.test(option[valueField || 'value']));
                  }, 0, true);
              }
              else {
                  return options;
              }
          }
          renderCell(column, option, colIndex, rowIndex) {
              const { render, data } = this.props;
              return render(`cell/${colIndex}/${rowIndex}`, Object.assign({ type: 'text' }, column), {
                  value: tpl_builtin_1.resolveVariable(column.name, option),
                  data: helper_1.createObject(data, option)
              });
          }
          render() {
              const { className, classnames: cx, options, selectedOptions, showArrow, sortable, selectMode, columns, loading, searchable, searchResultMode, deferLoad, leftOptions, leftMode, rightMode, disabled } = this.props;
              return (react_1.default.createElement("div", { className: cx('TransferControl', className) },
                  react_1.default.createElement(Transfer_1.default, { value: selectedOptions, options: options, disabled: disabled, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, showArrow: showArrow, selectMode: selectMode, searchResultMode: searchResultMode, columns: columns, onSearch: searchable ? this.handleSearch : undefined, onDeferLoad: deferLoad, leftOptions: leftOptions, leftMode: leftMode, rightMode: rightMode, cellRender: this.renderCell }),
                  react_1.default.createElement(Spinner_1.default, { overlay: true, key: "info", show: loading })));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaseTransferRenderer.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Options_2.Option !== "undefined" && Options_2.Option) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaseTransferRenderer.prototype, "option2value", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, typeof (_c = typeof Function !== "undefined" && Function) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", Promise)
      ], BaseTransferRenderer.prototype, "handleSearch", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, typeof (_d = typeof Options_2.Option !== "undefined" && Options_2.Option) === "function" ? _d : Object, Number, Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaseTransferRenderer.prototype, "renderCell", null);
      return BaseTransferRenderer;
  })();
  exports.BaseTransferRenderer = BaseTransferRenderer;
  // ts 3.9 里面非得这样才不报错，鬼知道为何。
  class TransferRender extends BaseTransferRenderer {
  }
  exports.TransferRender = TransferRender;
  exports.default = Options_1.OptionsControl({
      type: 'transfer'
  })(TransferRender);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vVHJhbnNmZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSx1Q0FJbUI7QUFDbkIsMERBQTBCO0FBQzFCLGlGQUFpRDtBQUNqRCx1Q0FBaUM7QUFDakMsK0NBTTRCO0FBRTVCLCtFQUErQztBQUMvQywrREFBK0I7QUFDL0Isb0RBQTJEO0FBQzNELHlEQUF3RDtBQXdFeEQ7O0lBQUEsTUFBYSxvQkFFWCxTQUFRLGVBQUssQ0FBQyxTQUFZO1FBRTFCLFlBQVksQ0FBQyxLQUFvQjtZQUMvQixNQUFNLEVBQ0osUUFBUSxFQUNSLFVBQVUsRUFDVixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixPQUFPLEVBQ1AsVUFBVSxFQUNYLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNmLElBQUksUUFBUSxHQUFRLEtBQUssQ0FBQztZQUMxQixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUM7WUFFbEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN4QixJQUFJLFVBQVUsSUFBSSxZQUFZLEVBQUU7b0JBQzlCLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO3dCQUMxQixNQUFNLFFBQVEsR0FBRyxpQkFBUSxDQUN2QixPQUFPLEVBQ1AsMkJBQWtCLENBQ2hCLElBQUksQ0FBRSxVQUFxQixJQUFJLE9BQU8sQ0FBQyxFQUN0QyxVQUFxQixJQUFJLE9BQU8sQ0FDbEMsQ0FDRixDQUFDO3dCQUVGLElBQUksQ0FBQyxRQUFRLEVBQUU7NEJBQ2IsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDdkI7d0JBRUQsT0FBTyxJQUFJLENBQUUsVUFBcUIsSUFBSSxP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

});
