amis.define('src/components/condition-builder/Func.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConditionFunc = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const PopOverContainer_1 = tslib_1.__importDefault(require("src/components/PopOverContainer.tsx"));
  const ListRadios_1 = tslib_1.__importDefault(require("src/components/ListRadios.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const ResultBox_1 = tslib_1.__importDefault(require("src/components/ResultBox.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const Expression_1 = tslib_1.__importDefault(require("src/components/condition-builder/Expression.tsx"));
  const option2value = (item) => item.type;
  let ConditionFunc = /** @class */ (() => {
      class ConditionFunc extends react_1.default.Component {
          handleFuncChange(type) {
              const value = Object.assign({}, this.props.value);
              value.func = type;
              this.props.onChange(value);
          }
          handleArgChange(arg, index) {
              const value = Object.assign({}, this.props.value);
              value.args = Array.isArray(value.args) ? value.args.concat() : [];
              value.args.splice(index, 1, arg);
              this.props.onChange(value);
          }
          renderFunc(func) {
              const { classnames: cx, fields, value, funcs, config } = this.props;
              return (react_1.default.createElement("div", { className: cx('CBFunc-args') },
                  react_1.default.createElement("span", null, "("),
                  Array.isArray(func.args) && func.args.length ? (react_1.default.createElement("div", null, func.args.map((item, index) => (react_1.default.createElement(Expression_1.default, { config: config, key: index, index: index, fields: fields, value: value === null || value === void 0 ? void 0 : value.args[index], valueField: { type: item.type }, onChange: this.handleArgChange, funcs: funcs }))))) : null,
                  react_1.default.createElement("span", null, ")")));
          }
          render() {
              const { value, classnames: cx, funcs } = this.props;
              const func = value
                  ? helper_1.findTree(funcs, item => item.type === value.func)
                  : null;
              return (react_1.default.createElement("div", { className: cx('CBFunc') },
                  react_1.default.createElement(PopOverContainer_1.default, { popOverRender: ({ onClose }) => {
                          var _a;
                          return (react_1.default.createElement(ListRadios_1.default, { onClick: onClose, showRadio: false, options: funcs, value: (_a = func) === null || _a === void 0 ? void 0 : _a.type, option2value: option2value, onChange: this.handleFuncChange }));
                      } }, ({ onClick, ref, isOpened }) => (react_1.default.createElement("div", { className: cx('CBFunc-select') },
                      react_1.default.createElement(ResultBox_1.default, { className: cx('CBGroup-fieldInput', isOpened ? 'is-active' : ''), ref: ref, allowInput: false, result: func === null || func === void 0 ? void 0 : func.label, onResultChange: helper_1.noop, onResultClick: onClick, placeholder: "\u8BF7\u9009\u62E9\u5B57\u6BB5" },
                          react_1.default.createElement("span", { className: cx('CBGroup-fieldCaret') },
                              react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" })))))),
                  func ? (this.renderFunc(func)) : (react_1.default.createElement("span", { className: cx('CBFunc-error') }, "\u65B9\u6CD5\u672A\u5B9A\u4E49"))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionFunc.prototype, "handleFuncChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionFunc.prototype, "handleArgChange", null);
      return ConditionFunc;
  })();
  exports.ConditionFunc = ConditionFunc;
  exports.default = theme_1.themeable(ConditionFunc);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRnVuYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL2NvbmRpdGlvbi1idWlsZGVyL0Z1bmMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsdUNBQWtEO0FBQ2xELG1GQUFtRDtBQUNuRCx1RUFBdUM7QUFDdkMsK0NBQTREO0FBQzVELHFFQUFxQztBQUNyQyxvQ0FBOEI7QUFDOUIsc0VBQXNDO0FBWXRDLE1BQU0sWUFBWSxHQUFHLENBQUMsSUFBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0FBRS9DO0lBQUEsTUFBYSxhQUFjLFNBQVEsZUFBSyxDQUFDLFNBQTZCO1FBRXBFLGdCQUFnQixDQUFDLElBQVk7WUFDM0IsTUFBTSxLQUFLLHFCQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFDbEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDN0IsQ0FBQztRQUdELGVBQWUsQ0FBQyxHQUFRLEVBQUUsS0FBYTtZQUNyQyxNQUFNLEtBQUsscUJBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUNwQyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDbEUsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENB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

});
