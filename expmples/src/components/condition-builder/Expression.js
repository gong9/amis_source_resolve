amis.define('src/components/condition-builder/Expression.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Expression = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Field_1 = tslib_1.__importDefault(require("src/components/condition-builder/Field.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const Value_1 = tslib_1.__importDefault(require("src/components/condition-builder/Value.tsx"));
  const InputSwitch_1 = tslib_1.__importDefault(require("src/components/condition-builder/InputSwitch.tsx"));
  const Func_1 = tslib_1.__importDefault(require("src/components/condition-builder/Func.tsx"));
  const theme_1 = require("src/theme.tsx");
  const Formula_1 = tslib_1.__importDefault(require("src/components/condition-builder/Formula.tsx"));
  const fieldMap = {
      value: '值',
      field: '字段',
      func: '函数',
      formula: '公式'
  };
  let Expression = /** @class */ (() => {
      class Expression extends react_1.default.Component {
          handleInputTypeChange(type) {
              var _a;
              let value = this.props.value;
              const onChange = this.props.onChange;
              if (type === 'value') {
                  value = '';
              }
              else if (type === 'func') {
                  value = {
                      type: 'func',
                      func: (_a = helper_1.findTree(this.props.funcs, item => item.type)) === null || _a === void 0 ? void 0 : _a.type,
                      args: []
                  };
              }
              else if (type === 'field') {
                  value = {
                      type: 'field',
                      field: ''
                  };
              }
              else if (type === 'formula') {
                  value = {
                      type: 'formula',
                      value: ''
                  };
              }
              onChange(value, this.props.index);
          }
          handleValueChange(data) {
              this.props.onChange(data, this.props.index);
          }
          handleFieldChange(field) {
              let value = this.props.value;
              const onChange = this.props.onChange;
              value = {
                  type: 'field',
                  field
              };
              onChange(value, this.props.index);
          }
          handleFuncChange(func) {
              let value = this.props.value;
              const onChange = this.props.onChange;
              value = Object.assign(Object.assign({}, func), { type: 'func' });
              onChange(value, this.props.index);
          }
          handleFormulaChange(formula) {
              let value = this.props.value;
              const onChange = this.props.onChange;
              value = {
                  type: 'formula',
                  value: formula
              };
              onChange(value, this.props.index);
          }
          render() {
              var _a, _b, _c, _d, _e;
              const { value, valueField, allowedTypes, funcs, fields, op, classnames: cx, config, data } = this.props;
              const inputType = (((_a = value) === null || _a === void 0 ? void 0 : _a.type) === 'field'
                  ? 'field'
                  : ((_b = value) === null || _b === void 0 ? void 0 : _b.type) === 'func'
                      ? 'func'
                      : ((_c = value) === null || _c === void 0 ? void 0 : _c.type) === 'formula'
                          ? 'formula'
                          : value !== undefined
                              ? 'value'
                              : undefined) || (allowedTypes === null || allowedTypes === void 0 ? void 0 : allowedTypes[0]) ||
                  'value';
              const types = allowedTypes || ['value', 'field', 'func'];
              if ((!Array.isArray(funcs) || !funcs.length) && ~types.indexOf('func')) {
                  types.splice(types.indexOf('func'), 1);
              }
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  inputType === 'value' ? (react_1.default.createElement(Value_1.default, { field: valueField, value: value, onChange: this.handleValueChange, op: op, data: data })) : null,
                  inputType === 'field' ? (react_1.default.createElement(Field_1.default, { value: (_d = value) === null || _d === void 0 ? void 0 : _d.field, onChange: this.handleFieldChange, options: valueField
                          ? helper_1.filterTree(fields, item => item.children ||
                              item.type === valueField.type)
                          : fields })) : null,
                  inputType === 'func' ? (react_1.default.createElement(Func_1.default, { config: config, value: value, onChange: this.handleFuncChange, funcs: funcs, fields: fields, allowedTypes: allowedTypes })) : null,
                  inputType === 'formula' ? (react_1.default.createElement(Formula_1.default, { value: (_e = value) === null || _e === void 0 ? void 0 : _e.value, onChange: this.handleFormulaChange })) : null,
                  types.length > 1 ? (react_1.default.createElement(InputSwitch_1.default, { value: inputType, onChange: this.handleInputTypeChange, options: types.map(item => ({
                          label: fieldMap[item],
                          value: item
                      })) })) : null));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Expression.prototype, "handleInputTypeChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Expression.prototype, "handleValueChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Expression.prototype, "handleFieldChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Expression.prototype, "handleFuncChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Expression.prototype, "handleFormulaChange", null);
      return Expression;
  })();
  exports.Expression = Expression;
  exports.default = theme_1.themeable(Expression);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL2NvbmRpdGlvbi1idWlsZGVyL0V4cHJlc3Npb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFXQSwwREFBMEI7QUFDMUIsNERBQXFDO0FBQ3JDLCtDQUFrRTtBQUNsRSw0REFBNEI7QUFDNUIsd0VBQXdDO0FBQ3hDLDBEQUFtQztBQUNuQyx1Q0FBa0Q7QUFHbEQsZ0VBQWdDO0FBd0JoQyxNQUFNLFFBQVEsR0FBRztJQUNmLEtBQUssRUFBRSxHQUFHO0lBQ1YsS0FBSyxFQUFFLElBQUk7SUFDWCxJQUFJLEVBQUUsSUFBSTtJQUNWLE9BQU8sRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUVGO0lBQUEsTUFBYSxVQUFXLFNBQVEsZUFBSyxDQUFDLFNBQTBCO1FBRTlELHFCQUFxQixDQUFDLElBQTRDOztZQUNoRSxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUVyQyxJQUFJLElBQUksS0FBSyxPQUFPLEVBQUU7Z0JBQ3BCLEtBQUssR0FBRyxFQUFFLENBQUM7YUFDWjtpQkFBTSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQzFCLEtBQUssR0FBRztvQkFDTixJQUFJLEVBQUUsTUFBTTtvQkFDWixJQUFJLFFBQUcsaUJBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFFLElBQWEsQ0FBQyxJQUFJLENBQVUsMENBQ3BFLElBQUk7b0JBQ1IsSUFBSSxFQUFFLEVBQUU7aUJBQ1QsQ0FBQzthQUNIO2lCQUFNLElBQUksSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDM0IsS0FBSyxHQUFHO29CQUNOLElBQUksRUFBRSxPQUFPO29CQUNiLEtBQUssRUFBRSxFQUFFO2lCQUNWLENBQUM7YUFDSDtpQkFBTSxJQUFJLElBQUksS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLEtBQUssR0FBRztvQkFDTixJQUFJLEVBQUUsU0FBUztvQkFDZixLQUFLLEVBQUUsRUFBRTtpQkFDVixDQUFDO2FBQ0g7WUFDRCxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUdELGlCQUFpQixDQUFDLElBQVM7WUFDekIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsQ0FBQztRQUdELGlCQUFpQixDQUFDLEtBQWE7WUFDN0IsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDckMsS0FBSyxHQUFHO2dCQUNOLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUs7YUFDTixDQUFDO1lBQ0YsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFHRCxnQkFBZ0IsQ0FBQyxJQUFTO1lBQ3hCLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzdCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3JDLEtBQUssbUNBQ0EsSUFBSSxLQUNQLElBQUksRUFBRSxNQUFNLEdBQ2IsQ0FBQztZQUNGLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBR0QsbUJBQW1CLENBQUMsT0FBZTtZQUNqQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUM3QixNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUNyQyxLQUFLLEdBQUc7Z0JBQ04sSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLE9BQU87YUFDZixDQUFDO1lBQ0YsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxNQUFNOztZQUNKLE1BQU0sRUFDSixLQUFLLEVBQ0wsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUNOLEVBQUUsRUFDRixVQUFVLEVBQUUsRUFBRSxFQUNkLE1BQU0sRUFDTixJQUFJLEVBQ0wsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2YsTUFBTSxTQUFTLEdBQ2IsQ0FBQyxPQUFDLEtBQWEsMENBQUUsSUFBSSxNQUFLLE9BQU87Z0JBQy9CLENBQUMsQ0FBQyxPQUFPO2dCQUNULENBQUMsQ0FBQyxPQUFDLEtBQWEsMENBQUUsSUFBSSxNQUFLLE1BQU07b0JBQ2pDLENBQUMsQ0FBQyxNQUFNO29CQUNSLENBQUMsQ0FBQyxPQUFDLEtBQWEsMENBQUUsSUFBSSxNQUFLLFNBQVM7d0JBQ3BDLENBQUMsQ0FBQyxTQUFTO3dCQUNYLENBQUMsQ0FBQyxLQUFLLEtBQUssU0FBUzs0QkFDckIsQ0FBQyxDQUFDLE9BQU87NEJBQ1QsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxLQUNkLFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxDQUFDLEVBQUM7Z0JBQ2pCLE9BQU8sQ0FBQztZQUVWLE1BQU0sS0FBSyxHQUFHLFlBQVksSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFekQsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3RFLEtBQUssQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4QztZQUVELE9BQU8sQ0FDTDtnQkFDRyxTQUFTLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUN2Qiw4QkFBQyxlQUFLLElBQ0osS0FBSyxFQUFFLFVBQVcsRUFDbEIsS0FBSyxFQUFFLEtBQUssRUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUNoQyxFQUFFLEVBQUUsRUFBRSxFQUNOLElBQUksRUFBRSxJQUFJLEdBQ1YsQ0FDSCxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUVQLFNBQVMsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ3ZCLDhCQUFDLGVBQWMsSUFDYixLQUFLLFFBQUcsS0FBYSwwQ0FBRSxLQUFLLEVBQzVCLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEVBQ2hDLE9BQU8sRUFDTCxVQUFVO3dCQUNSLENBQUMsQ0FBQyxtQkFBVSxDQUNSLE1BQU8sRUFDUCxJQUFJLENBQUMsRUFBRSxDQUNKLElBQVksQ0FBQyxRQUFROzRCQUNyQixJQUFvQixDQUFDLElBQUksS0FBSyxVQUFVLENBQUMsSUFBSSxDQUNqRDt3QkFDSCxDQUFDLENBQUMsTUFBTyxHQUViLENBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFFUCxTQUFTLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUN0Qiw4QkFBQyxjQUFhLElBQ1osTUFBTSxFQUFFLE1BQU0sRUFDZCxLQUFLLEVBQUUsS0FBdUIsRUFDOUIsUUFBUSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsRUFDL0IsS0FBSyxFQUFFLEtBQUssRUFDWixNQUFNLEVBQUUsTUFBTSxFQUNkLFlBQVksRUFBRSxZQUFZLEdBQzFCLENBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFFUCxTQUFTLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUN6Qiw4QkFBQyxpQkFBTyxJQUNOLEtBQUssUUFBRyxLQUFhLDBDQUFFLEtBQUssRUFDNUIsUUFBUSxFQUFFLElBQUksQ0FBQyxtQkFBbUIsR0FDbEMsQ0FDSCxDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUVQLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNsQiw4QkFBQyxxQkFBVyxJQUNWLEtBQUssRUFBRSxTQUFTLEVBQ2hCLFFBQVEsRUFBRSxJQUFJLENBQUMscUJBQXFCLEVBQ3BDLE9BQU8sRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDMUIsS0FBSyxFQUFFLFFBQVEsQ0FBQyxJQUFJLENBQUM7d0JBQ3JCLEtBQUssRUFBRSxJQUFJO3FCQUNaLENBQUMsQ0FBQyxHQUNILENBQ0gsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNQLENBQ0osQ0FBQztRQUNKLENBQUM7S0FDRjtJQTVKQztRQURDLGlCQUFROzs7OzJEQTBCUjtJQUdEO1FBREMsaUJBQVE7Ozs7dURBR1I7SUFHRDtRQURDLGlCQUFROzs7O3VEQVNSO0lBR0Q7UUFEQyxpQkFBUTs7OztzREFTUjtJQUdEO1FBREMsaUJBQVE7Ozs7eURBU1I7SUE2RkgsaUJBQUM7S0FBQTtBQTlKWSxnQ0FBVTtBQWdLdkIsa0JBQWUsaUJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyJ9

});
