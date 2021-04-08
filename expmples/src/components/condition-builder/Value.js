amis.define('src/components/condition-builder/Value.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Value = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const InputBox_1 = tslib_1.__importDefault(require("src/components/InputBox.tsx"));
  const NumberInput_1 = tslib_1.__importDefault(require("src/components/NumberInput.tsx"));
  const DatePicker_1 = tslib_1.__importDefault(require("src/components/DatePicker.tsx"));
  const Select_1 = require("src/components/Select.tsx");
  const Switch_1 = tslib_1.__importDefault(require("src/components/Switch.tsx"));
  const locale_1 = require("src/locale.tsx");
  class Value extends react_1.default.Component {
      render() {
          var _a;
          const { classnames: cx, field, value, onChange, op, translate: __, data } = this.props;
          let input = undefined;
          if (field.type === 'text') {
              input = (react_1.default.createElement(InputBox_1.default, { value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange, placeholder: field.placeholder }));
          }
          else if (field.type === 'number') {
              input = (react_1.default.createElement(NumberInput_1.default, { placeholder: field.placeholder || __('NumberInput.placeholder'), step: field.step, min: field.minimum, max: field.maximum, precision: field.precision, value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange }));
          }
          else if (field.type === 'date') {
              input = (react_1.default.createElement(DatePicker_1.default, { placeholder: field.placeholder || __('Date.placeholder'), format: field.format || 'YYYY-MM-DD', inputFormat: field.inputFormat || 'YYYY-MM-DD', value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange, timeFormat: "" }));
          }
          else if (field.type === 'time') {
              input = (react_1.default.createElement(DatePicker_1.default, { viewMode: "time", placeholder: field.placeholder || 'Time.placeholder', format: field.format || 'HH:mm', inputFormat: field.inputFormat || 'HH:mm', value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange, dateFormat: "", timeFormat: field.format || 'HH:mm' }));
          }
          else if (field.type === 'datetime') {
              input = (react_1.default.createElement(DatePicker_1.default, { placeholder: field.placeholder || '请选择日期时间', format: field.format || '', inputFormat: field.inputFormat || 'YYYY-MM-DD HH:mm', value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange, timeFormat: field.timeFormat || 'HH:mm' }));
          }
          else if (field.type === 'select') {
              input = (react_1.default.createElement(Select_1.SelectWithRemoteOptions, { simpleValue: true, options: field.options, source: field.source, searchable: field.searchable, value: (_a = value !== null && value !== void 0 ? value : field.defaultValue) !== null && _a !== void 0 ? _a : '', data: data, onChange: onChange, multiple: op === 'select_any_in' || op === 'select_not_any_in' }));
          }
          else if (field.type === 'boolean') {
              input = (react_1.default.createElement(Switch_1.default, { value: value !== null && value !== void 0 ? value : field.defaultValue, onChange: onChange }));
          }
          return react_1.default.createElement("div", { className: cx('CBValue') }, input);
      }
  }
  exports.Value = Value;
  exports.default = theme_1.themeable(locale_1.localeable(Value));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmFsdWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9WYWx1ZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQix1Q0FBa0Q7QUFDbEQsbUVBQW1DO0FBQ25DLHlFQUF5QztBQUN6Qyx1RUFBdUM7QUFDdkMsc0NBQTREO0FBQzVELCtEQUErQjtBQUMvQix5Q0FBcUQ7QUFVckQsTUFBYSxLQUFNLFNBQVEsZUFBSyxDQUFDLFNBQXFCO0lBQ3BELE1BQU07O1FBQ0osTUFBTSxFQUNKLFVBQVUsRUFBRSxFQUFFLEVBQ2QsS0FBSyxFQUNMLEtBQUssRUFDTCxRQUFRLEVBQ1IsRUFBRSxFQUNGLFNBQVMsRUFBRSxFQUFFLEVBQ2IsSUFBSSxFQUNMLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUNmLElBQUksS0FBSyxHQUE0QixTQUFTLENBQUM7UUFFL0MsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE1BQU0sRUFBRTtZQUN6QixLQUFLLEdBQUcsQ0FDTiw4QkFBQyxrQkFBUSxJQUNQLEtBQUssRUFBRSxLQUFLLGFBQUwsS0FBSyxjQUFMLEtBQUssR0FBSSxLQUFLLENBQUMsWUFBWSxFQUNsQyxRQUFRLEVBQUUsUUFBUSxFQUNsQixXQUFXLEVBQUUsS0FBSyxDQUFDLFdBQVcsR0FDOUIsQ0FDSCxDQUFDO1NBQ0g7YUFBTSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQ2xDLEtBQUssR0FBRyxDQUNOLDhCQUFDLHFCQUFXLElBQ1YsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLElBQUksRUFBRSxDQUFDLHlCQUF5QixDQUFDLEVBQy9ELElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUNoQixHQUFHLEVBQUUsS0FBSyxDQUFDLE9BQU8sRUFDbEIsR0FBRyxF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

});
