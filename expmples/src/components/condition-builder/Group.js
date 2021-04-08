amis.define('src/components/condition-builder/Group.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConditionGroup = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const GroupOrItem_1 = tslib_1.__importDefault(require("src/components/condition-builder/GroupOrItem.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  let ConditionGroup = /** @class */ (() => {
      class ConditionGroup extends react_1.default.Component {
          getValue() {
              return Object.assign({ id: helper_1.guid(), conjunction: 'and' }, this.props.value);
          }
          handleNotClick() {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.not = !value.not;
              onChange(value);
          }
          handleConjunctionClick() {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.conjunction = value.conjunction === 'and' ? 'or' : 'and';
              onChange(value);
          }
          handleAdd() {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.children = Array.isArray(value.children)
                  ? value.children.concat()
                  : [];
              value.children.push({
                  id: helper_1.guid()
              });
              onChange(value);
          }
          handleAddGroup() {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.children = Array.isArray(value.children)
                  ? value.children.concat()
                  : [];
              value.children.push({
                  id: helper_1.guid(),
                  conjunction: 'and',
                  children: [
                      {
                          id: helper_1.guid()
                      }
                  ]
              });
              onChange(value);
          }
          handleItemChange(item, index) {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.children = Array.isArray(value.children)
                  ? value.children.concat()
                  : [];
              value.children.splice(index, 1, item);
              onChange(value);
          }
          handleItemRemove(index) {
              const onChange = this.props.onChange;
              let value = this.getValue();
              value.children = Array.isArray(value.children)
                  ? value.children.concat()
                  : [];
              value.children.splice(index, 1);
              onChange(value);
          }
          render() {
              const { classnames: cx, value, data, fields, funcs, config, removeable, onRemove, onDragStart, showNot } = this.props;
              return (react_1.default.createElement("div", { className: cx('CBGroup'), "data-group-id": value === null || value === void 0 ? void 0 : value.id },
                  react_1.default.createElement("div", { className: cx('CBGroup-toolbar') },
                      react_1.default.createElement("div", { className: cx('CBGroup-toolbarCondition') },
                          showNot ? (react_1.default.createElement(Button_1.default, { onClick: this.handleNotClick, className: "m-r-xs", size: "xs", active: value === null || value === void 0 ? void 0 : value.not, level: (value === null || value === void 0 ? void 0 : value.not) ? 'info' : 'default' }, "\u975E")) : null,
                          react_1.default.createElement("div", { className: cx('ButtonGroup') },
                              react_1.default.createElement(Button_1.default, { size: "xs", onClick: this.handleConjunctionClick, active: (value === null || value === void 0 ? void 0 : value.conjunction) !== 'or', level: (value === null || value === void 0 ? void 0 : value.conjunction) !== 'or' ? 'info' : 'default' }, "\u5E76\u4E14"),
                              react_1.default.createElement(Button_1.default, { size: "xs", onClick: this.handleConjunctionClick, active: (value === null || value === void 0 ? void 0 : value.conjunction) === 'or', level: (value === null || value === void 0 ? void 0 : value.conjunction) === 'or' ? 'info' : 'default' }, "\u6216\u8005"))),
                      react_1.default.createElement("div", { className: cx('CBGroup-toolbarConditionAdd') },
                          react_1.default.createElement("div", { className: cx('ButtonGroup') },
                              react_1.default.createElement(Button_1.default, { onClick: this.handleAdd, size: "xs" },
                                  react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                                  "\u6DFB\u52A0\u6761\u4EF6"),
                              react_1.default.createElement(Button_1.default, { onClick: this.handleAddGroup, size: "xs" },
                                  react_1.default.createElement(icons_1.Icon, { icon: "plus-cicle", className: "icon" }),
                                  "\u6DFB\u52A0\u6761\u4EF6\u7EC4"))),
                      removeable ? (react_1.default.createElement("a", { className: cx('CBDelete'), onClick: onRemove },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null),
                  react_1.default.createElement("div", { className: cx('CBGroup-body') }, Array.isArray(value === null || value === void 0 ? void 0 : value.children) && value.children.length ? (value.children.map((item, index) => (react_1.default.createElement(GroupOrItem_1.default, { draggable: value.children.length > 1, onDragStart: onDragStart, config: config, key: item.id, fields: fields, value: item, index: index, onChange: this.handleItemChange, funcs: funcs, onRemove: this.handleItemRemove, data: data })))) : (react_1.default.createElement("div", { className: cx('CBGroup-placeholder') }, "\u7A7A")))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleNotClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleConjunctionClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleAdd", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleAddGroup", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleItemChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ConditionGroup.prototype, "handleItemRemove", null);
      return ConditionGroup;
  })();
  exports.ConditionGroup = ConditionGroup;
  exports.default = theme_1.themeable(ConditionGroup);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9Hcm91cC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQix1Q0FBa0Q7QUFDbEQsK0RBQStCO0FBQy9CLHdFQUF3QztBQUN4QywrQ0FBa0Q7QUFFbEQsb0NBQThCO0FBZTlCO0lBQUEsTUFBYSxjQUFlLFNBQVEsZUFBSyxDQUFDLFNBQThCO1FBQ3RFLFFBQVE7WUFDTixPQUFPLGdCQUNMLEVBQUUsRUFBRSxhQUFJLEVBQUUsRUFDVixXQUFXLEVBQUUsS0FBYyxJQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDRyxDQUFDO1FBQzNCLENBQUM7UUFHRCxjQUFjO1lBQ1osTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7WUFDckMsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQzVCLEtBQUssQ0FBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBRXZCLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNsQixDQUFDO1FBR0Qsc0JBQXNCO1lBQ3BCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ3JDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM1QixLQUFLLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQyxXQUFXLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUMvRCxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbEIsQ0FBQztRQUdELFNBQVM7WUFDUCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMs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

});
