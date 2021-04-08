amis.define('src/components/condition-builder/Item.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConditionItem = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const types_1 = require("src/components/condition-builder/types.ts");
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Expression_1 = tslib_1.__importDefault(require("src/components/condition-builder/Expression.tsx"));
  const config_1 = require("src/components/condition-builder/config.ts");
  const PopOverContainer_1 = tslib_1.__importDefault(require("src/components/PopOverContainer.tsx"));
  const ListRadios_1 = tslib_1.__importDefault(require("src/components/ListRadios.tsx"));
  const ResultBox_1 = tslib_1.__importDefault(require("src/components/ResultBox.tsx"));
  const option2value = (item) => item.value;
  let ConditionItem = /** @class */ (() => {
      var _a;
      class ConditionItem extends react_1.default.Component {
          handleLeftFieldSelect(field) {
              const value = Object.assign({}, this.props.value);
              const onChange = this.props.onChange;
              value.left = field;
              onChange(value, this.props.index);
          }
          handleLeftInputTypeChange(type) {
              const value = Object.assign({}, this.props.value);
              const onChange = this.props.onChange;
              if (type === 'func') {
                  value.left = { type: 'func' };
              }
              else {
                  value.left = '';
              }
              onChange(value, this.props.index);
          }
          handleLeftChange(leftValue) {
              const value = Object.assign(Object.assign({}, this.props.value), { left: leftValue, op: undefined, right: undefined });
              const onChange = this.props.onChange;
              onChange(value, this.props.index);
          }
          handleOperatorChange(op) {
              const value = Object.assign(Object.assign({}, this.props.value), { op: op, right: undefined });
              this.props.onChange(value, this.props.index);
          }
          handleRightChange(rightValue) {
              const value = Object.assign(Object.assign({}, this.props.value), { right: rightValue });
              const onChange = this.props.onChange;
              onChange(value, this.props.index);
          }
          handleRightSubChange(index, rightValue) {
              var _a;
              const origin = Array.isArray((_a = this.props.value) === null || _a === void 0 ? void 0 : _a.right)
                  ? this.props.value.right.concat()
                  : [];
              origin[index] = rightValue;
              const value = Object.assign(Object.assign({}, this.props.value), { right: origin });
              const onChange = this.props.onChange;
              onChange(value, this.props.index);
          }
          renderLeft() {
              const { value, fields, funcs, config } = this.props;
              return (react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, value: value.left, onChange: this.handleLeftChange, fields: fields, allowedTypes: ['field', 'func'].filter(type => type === 'field' || type === 'func') }));
          }
          renderOperator() {
              var _a, _b, _c, _d;
              const { funcs, config, fields, value, classnames: cx } = this.props;
              const left = value === null || value === void 0 ? void 0 : value.left;
              let operators = [];
              if (((_a = left) === null || _a === void 0 ? void 0 : _a.type) === 'func') {
                  const func = helper_1.findTree(funcs, (i) => i.type === left.func);
                  if (func) {
                      operators = (_b = config.types[func.returnType]) === null || _b === void 0 ? void 0 : _b.operators;
                  }
              }
              else if (((_c = left) === null || _c === void 0 ? void 0 : _c.type) === 'field') {
                  const field = helper_1.findTree(fields, (i) => i.name === left.field);
                  if (field) {
                      operators = field.operators || ((_d = config.types[field.type]) === null || _d === void 0 ? void 0 : _d.operators);
                  }
              }
              if (Array.isArray(operators) && operators.length) {
                  return (react_1.default.createElement(PopOverContainer_1.default, { popOverRender: ({ onClose }) => (react_1.default.createElement(ListRadios_1.default, { onClick: onClose, option2value: option2value, onChange: this.handleOperatorChange, options: operators.map(operator => ({
                              label: config_1.OperationMap[operator],
                              value: operator
                          })), value: value.op, showRadio: false })) }, ({ onClick, isOpened, ref }) => (react_1.default.createElement("div", { className: cx('CBGroup-operator') },
                      react_1.default.createElement(ResultBox_1.default, { className: cx('CBGroup-operatorInput', isOpened ? 'is-active' : ''), ref: ref, allowInput: false, result: config_1.OperationMap[value === null || value === void 0 ? void 0 : value.op], onResultChange: helper_1.noop, onResultClick: onClick, placeholder: "\u8BF7\u9009\u62E9\u64CD\u4F5C" },
                          react_1.default.createElement("span", { className: cx('CBGroup-operatorCaret') },
                              react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))))));
              }
              return null;
          }
          renderRight() {
              var _a, _b;
              const { value, funcs, fields } = this.props;
              if (!(value === null || value === void 0 ? void 0 : value.op)) {
                  return null;
              }
              const left = value === null || value === void 0 ? void 0 : value.left;
              let leftType = '';
              if (((_a = left) === null || _a === void 0 ? void 0 : _a.type) === 'func') {
                  const func = helper_1.findTree(funcs, (i) => i.type === left.func);
                  if (func) {
                      leftType = func.returnType;
                  }
              }
              else if (((_b = left) === null || _b === void 0 ? void 0 : _b.type) === 'field') {
                  const field = helper_1.findTree(fields, (i) => i.name === left.field);
                  if (field) {
                      leftType = field.type;
                  }
              }
              if (leftType) {
                  return this.renderRightWidgets(leftType, value.op);
              }
              return null;
          }
          renderRightWidgets(type, op) {
              var _a, _b, _c;
              const { funcs, value, data, fields, config, classnames: cx } = this.props;
              let field = Object.assign(Object.assign({}, config.types[type]), { type });
              if (((_a = value === null || value === void 0 ? void 0 : value.left) === null || _a === void 0 ? void 0 : _a.type) === 'field') {
                  const leftField = helper_1.findTree(fields, (i) => i.name === (value === null || value === void 0 ? void 0 : value.left).field);
                  if (leftField) {
                      field = Object.assign(Object.assign({}, field), leftField);
                  }
              }
              if (op === 'is_empty' || op === 'is_not_empty') {
                  return null;
              }
              else if (op === 'between' || op === 'not_between') {
                  return (react_1.default.createElement(react_1.default.Fragment, null,
                      react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, valueField: field, value: (_b = value.right) === null || _b === void 0 ? void 0 : _b[0], data: data, onChange: this.handleRightSubChange.bind(this, 0), fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                              config.valueTypes || ['value', 'field', 'func', 'formula'] }),
                      react_1.default.createElement("span", { className: cx('CBSeprator') }, "~"),
                      react_1.default.createElement(Expression_1.default, { config: config, funcs: funcs, valueField: field, value: (_c = value.right) === null || _c === void 0 ? void 0 : _c[1], data: data, onChange: this.handleRightSubChange.bind(this, 1), fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                              config.valueTypes || ['value', 'field', 'func', 'formula'] })));
              }
              return (react_1.default.createElement(Expression_1.default, { config: config, op: op, funcs: funcs, valueField: field, value: value.right, data: data, onChange: this.handleRightChange, fields: fields, allowedTypes: (field === null || field === void 0 ? void 0 : field.valueTypes) ||
                      config.valueTypes || ['value', 'field', 'func', 'formula'] }));
          }
          render() {
              const { classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('CBItem') },
                  this.renderLeft(),
                  this.renderOperator(),
                  this.renderRight()));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionItem.prototype, "handleLeftFieldSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionItem.prototype, "handleLeftInputTypeChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionItem.prototype, "handleLeftChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof types_1.OperatorType !== "undefined" && types_1.OperatorType) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionItem.prototype, "handleOperatorChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionItem.prototype, "handleRightChange", null);
      return ConditionItem;
  })();
  exports.ConditionItem = ConditionItem;
  exports.default = theme_1.themeable(ConditionItem);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL2NvbmRpdGlvbi1idWlsZGVyL0l0ZW0udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsbUNBWWlCO0FBQ2pCLHVDQUFrRDtBQUNsRCxvQ0FBOEI7QUFDOUIsK0NBQTREO0FBQzVELHNFQUFzQztBQUN0QyxxQ0FBOEM7QUFDOUMsbUZBQW1EO0FBQ25ELHVFQUF1QztBQUN2QyxxRUFBcUM7QUFFckMsTUFBTSxZQUFZLEdBQUcsQ0FBQyxJQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7QUFZL0M7O0lBQUEsTUFBYSxhQUFjLFNBQVEsZUFBSyxDQUFDLFNBQTZCO1FBRXBFLHFCQUFxQixDQUFDLEtBQVU7WUFDOUIsTUFBTSxLQUFLLHFCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDckMsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7WUFDbkIsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFHRCx5QkFBeUIsQ0FBQyxJQUFzQjtZQUM5QyxNQUFNLEtBQUsscUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUVyQyxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ25CLEtBQUssQ0FBQyxJQUFJLEdBQUcsRUFBQyxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUM7YUFDN0I7aUJBQU07Z0JBQ0wsS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLENBQUM7YUFDakI7WUFFRCxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUdELGdCQUFnQixDQUFDLFNBQWM7WUFDN0IsTUFBTSxLQUFLLG1DQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUNuQixJQUFJLEVBQUUsU0FBUyxFQUNmLEVBQUUsRUFBRSxTQUFTLEVBQ2IsS0FBSyxFQUFFLFNBQVMsR0FDakIsQ0FBQztZQUNGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBRXJDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxDQUFDO1FBR0Qsb0JBQW9CLENBQUMsRUFBZ0I7WUFDbkMsTUFBTSxLQUFLLG1DQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsR0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFHRCxpQkFBaUIsQ0FBQyxVQUFlO1lBQy9CLE1BQU0sS0FBSyxtQ0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBRSxLQUFLLEVBQUUsVUFBVSxHQUFDLENBQUM7WUFDdkQsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFFckMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BDLENBQUM7UUFFRCxvQkFBb0IsQ0FBQyxLQUFhLEVBQUUsVUFBZTs7WUFDakQsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE9BQU8sT0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssMENBQUUsS0FBSyxDQUFDO2dCQUNuRCxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDakMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVQLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxVQUFVLENBQUM7WUFDM0IsTUFBTSxLQUFLLG1DQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFFLEtBQUssRUFBRSxNQUFNLEdBQUMsQ0FBQztZQUNuRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUVyQyxRQUFRLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELFVBQVU7WUFDUixNQUFNLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVsRCxPQUFPLENBQ0wsOEJBQUMsb0JBQVUsSUFDVCxNQUFNLEVBQUUsTUFBTSxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osS0FBSyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQ2pCLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQy9CLE1BQU0sRUFBRSxNQUFNLEVBQ2QsWUFBWSxFQUNWLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FDdEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksS0FBSyxNQUFNLENBQ3JDLEdBRVYsQ0FDSCxDQUFDO1FBQ0osQ0FBQztRQUVELGNBQWM7O1lBQ1osTUFBTSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNsRSxNQUFNLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDO1lBQ3pCLElBQUksU0FBUyxHQUFrQixFQUFFLENBQUM7WUFFbEMsSUFBSSxPQUFDLElBQXVCLDBDQUFFLElBQUksTUFBSyxNQUFNLEVBQUU7Z0JBQzdDLE1BQU0sSUFBSSxHQUFTLGlCQUFRLENBQ3pCLEtBQU0sRUFDTixDQUFDLENBQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBTSxJQUF1QixDQUFDLElBQUksQ0FDOUMsQ0FBQztnQkFFVixJQUFJLElBQUksRUFBRTtvQkFDUixTQUFTLFNBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLDBDQUFFLFNBQVMsQ0FBQztpQkFDdEQ7YUFDRjtpQkFBTSxJQUFJLE9BQUMsSUFBd0IsMENBQUUsSUFBSSxNQUFLLE9BQU8sRUFBRTtnQkFDdEQsTUFBTSxLQUFLLEdBQWdCLGlCQUFRLENBQ2pDLE1BQU0sRUFDTixDQUFDLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBTSxJQUF3QixDQUFDLEtBQUssQ0FDaEQsQ0FBQztnQkFFakIsSUFBSSxLQUFLLEVBQUU7b0JBQ1QsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLFdBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDBDQUFFLFNBQVMsQ0FBQSxDQUFDO2lCQUNwRTthQUNGO1lBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxNQUFNLEVBQUU7Z0JBQ2hELE9BQU8sQ0FDTCw4QkFBQywwQkFBZ0IsSUFDZixhQUFhLEVBQUUsQ0FBQyxFQUFDLE9BQU8sRUFBQyxFQUFFLEVBQUUsQ0FBQyxDQUM1Qiw4QkFBQyxvQkFBVSxJQUNULE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFlBQVksRUFBRSxZQUFZLEVBQzFCLFFBQVEsRUFBRSxJQUFJLENBQUMsb0JBQW9CLEVBQ25DLE9BQU8sRUFBRSxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDbEMsS0FBSyxFQUFFLHFCQUFZLENBQUMsUUFBcUMsQ0FBQzs0QkFDMUQsS0FBSyxFQUFFLFFBQVE7eUJBQ2hCLENBQUMsQ0FBQyxFQUNILEtBQUssRUFBRSxLQUFLLENBQUMsRUFBRSxFQUNmLFNBQVMsRUFBRSxLQUFLLEdBQ2hCLENBQ0gsSUFFQSxDQUFDLEVBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUMsRUFBRSxFQUFFLENBQUMsQ0FDN0IsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDcEMsOEJBQUMsbUJBQVMsSUFDUixTQUFTLEVBQUUsRUFBRSxDQUNYLHVCQUF1QixFQUN2QixRQUFRLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUM1QixFQUNELEdBQUcsRUFBRSxHQUFHLEVBQ1IsVUFBVSxFQUFFLEtBQUssRUFDakIsTUFBTSxFQUFFLHFCQUFZLENBQUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEVBQStCLENBQUMsRUFDNUQsY0FBYyxFQUFFLGFBQUksRUFDcEIsYUFBYSxFQUFFLE9BQU8sRUFDdEIsV0FBVyxFQUFDLGdDQUFPO3dCQUVuQix3Q0FBTSxTQUFTLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDOzRCQUMxQyw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ2pDLENBQ0csQ0FDUixDQUNQLENBQ2dCLENBQ3BCLENBQUM7YUFDSDtZQUVELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQztRQUVELFdBQVc7O1lBQ1QsTUFBTSxFQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUxQyxJQUFJLEVBQUMsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLEVBQUUsQ0FBQSxFQUFFO2dCQUNkLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLElBQUksR0FBRyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBSSxDQUFDO1lBQ3pCLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztZQUVsQixJQUFJLE9BQUMsSUFBdUIsMENBQUUsSUFBSSxNQUFLLE1BQU0sRUFBRTtnQkFDN0MsTUFBTSxJQUFJLEdBQVMsaUJBQVEsQ0FDekIsS0FBTSxFQUNOLENBQUMsQ0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFNLElBQXVCLENBQUMsSUFBSSxDQUM5QyxDQUFDO2dCQUVWLElBQUksSUFBSSxFQUFFO29CQUNSLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2lCQUM1QjthQUNGO2lCQUFNLElBQUksT0FBQyxJQUF3QiwwQ0FBRSxJQUFJLE1BQUssT0FBTyxFQUFFO2dCQUN0RCxNQUFNLEtBQUssR0FBZ0IsaUJBQVEsQ0FDakMsTUFBTSxFQUNOLENBQUMsQ0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxLQUFNLElBQXdCLENBQUMsS0FBSyxDQUNoRCxDQUFDO2dCQUVqQixJQUFJLEtBQUssRUFBRTtvQkFDVCxRQUFRLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztpQkFDdkI7YUFDRjtZQUVELElBQUksUUFBUSxFQUFFO2dCQUNaLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsRUFBRyxDQUFDLENBQUM7YUFDckQ7WUFFRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsRUFBZ0I7O1lBQy9DLE1BQU0sRUFBQyxLQUFLLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3hFLElBQUksS0FBSyxHQUFHLGdDQUNQLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQ3JCLElBQUksR0FDVSxDQUFDO1lBRWpCLElBQUksT0FBQyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsSUFBd0IsMENBQUUsSUFBSSxNQUFLLE9BQU8sRUFBRTtnQkFDdEQsTUFBTSxTQUFTLEdBQWdCLGlCQUFRLENBQ3JDLE1BQU0sRUFDTixDQUFDLENBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxJQUF3QixDQUFBLENBQUMsS0FBSyxDQUN2RCxDQUFDO2dCQUVqQixJQUFJLFNBQVMsRUFBRTtvQkFDYixLQUFLLG1DQUNBLEtBQUssR0FDTCxTQUFTLENBQ2IsQ0FBQztpQkFDSDthQUNGO1lBRUQsSUFBSSxFQUFFLEtBQUssVUFBVSxJQUFJLEVBQUUsS0FBSyxjQUFjLEVBQUU7Z0JBQzlDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU0sSUFBSSxFQUFFLEtBQUssU0FBUyxJQUFJLEVBQUUsS0FBSyxhQUFhLEVBQUU7Z0JBQ25ELE9BQU8sQ0FDTDtvQkFDRSw4QkFBQyxvQkFBVSxJQUNULE1BQU0sRUFBRSxNQUFNLEVBQ2QsS0FBSyxFQUFFLEtBQUssRUFDWixVQUFVLEVBQUUsS0FBSyxFQUNqQixLQUFLLFFBQUcsS0FBSyxDQUFDLEtBQWtDLDBDQUFHLENBQUMsR0FDcEQsSUFBSSxFQUFFLElBQUksRUFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEVBQ2pELE1BQU0sRUFBRSxNQUFNLEVBQ2QsWUFBWSxFQUNWLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFVBQVU7NEJBQ2pCLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsR0FFNUQ7b0JBRUYsd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLENBQUMsUUFBVTtvQkFFM0MsOEJBQUMsb0JBQVUsSUFDVCxNQUFNLEVBQUUsTUFBTSxFQUNkLEtBQUssRUFBRSxLQUFLLEVBQ1osVUFBVSxFQUFFLEtBQUssRUFDakIsS0FBSyxRQUFHLEtBQUssQ0FBQyxLQUFrQywwQ0FBRyxDQUFDLEdBQ3BELElBQUksRUFBRSxJQUFJLEVBQ1YsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxFQUNqRCxNQUFNLEVBQUUsTUFBTSxFQUNkLFlBQVksRUFDVixDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxVQUFVOzRCQUNqQixNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBRTVELENBQ0QsQ0FDSixDQUFDO2FBQ0g7WUFFRCxPQUFPLENBQ0wsOEJBQUMsb0JBQVUsSUFDVCxNQUFNLEVBQUUsTUFBTSxFQUNkLEVBQUUsRUFBRSxFQUFFLEVBQ04sS0FBSyxFQUFFLEtBQUssRUFDWixVQUFVLEVBQUUsS0FBSyxFQUNqQixLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFDbEIsSUFBSSxFQUFFLElBQUksRUFDVixRQUFRLEVBQUUsSUFBSSxDQUFDLGlCQUFpQixFQUNoQyxNQUFNLEVBQUUsTUFBTSxFQUNkLFlBQVksRUFDVixDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxVQUFVO29CQUNqQixNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDLEdBRTVELENBQ0gsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXBDLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQkFDekIsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDakIsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUNmLENBQ1AsQ0FBQztRQUNKLENBQUM7S0FDRjtJQWpSQztRQURDLGlCQUFROzs7OzhEQU1SO0lBR0Q7UUFEQyxpQkFBUTs7OztrRUFZUjtJQUdEO1FBREMsaUJBQVE7Ozs7eURBV1I7SUFHRDtRQURDLGlCQUFROztxRUFDZ0Isb0JBQVksb0JBQVosb0JBQVk7OzZEQUdwQztJQUdEO1FBREMsaUJBQVE7Ozs7MERBTVI7SUFtT0gsb0JBQUM7S0FBQTtBQW5SWSxzQ0FBYTtBQXFSMUIsa0JBQWUsaUJBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyJ9

});
