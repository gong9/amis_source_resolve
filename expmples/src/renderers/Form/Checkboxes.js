amis.define('src/renderers/Form/Checkboxes.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CheckboxesControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const chunk_1 = tslib_1.__importDefault(require("node_modules/lodash/chunk"));
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let CheckboxesControl = /** @class */ (() => {
      var _a, _b;
      class CheckboxesControl extends react_1.default.Component {
          componentDidMount() {
              const { defaultCheckAll, onToggleAll } = this.props;
              defaultCheckAll && onToggleAll();
          }
          componentDidUpdate(prevProps) {
              let { options: currOptions, onToggleAll, defaultCheckAll } = this.props;
              let { options: prevOptions } = prevProps;
              if (defaultCheckAll && prevOptions != currOptions) {
                  onToggleAll();
              }
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          handleAddClick() {
              const { onAdd } = this.props;
              onAdd && onAdd();
          }
          handleEditClick(e, item) {
              const { onEdit } = this.props;
              e.preventDefault();
              e.stopPropagation();
              onEdit && onEdit(item);
          }
          handleDeleteClick(e, item) {
              const { onDelete } = this.props;
              e.preventDefault();
              e.stopPropagation();
              onDelete && onDelete(item);
          }
          renderGroup(option, index) {
              const { classnames: cx, labelField } = this.props;
              return (react_1.default.createElement("div", { key: index, className: cx('CheckboxesControl-group', option.className) },
                  react_1.default.createElement("label", { className: cx('CheckboxesControl-groupLabel', option.labelClassName) }, option[labelField || 'label']),
                  option.children && option.children.length
                      ? option.children.map((option, index) => this.renderItem(option, index))
                      : null));
          }
          renderItem(option, index) {
              if (option.children) {
                  return this.renderGroup(option, index);
              }
              const { itemClassName, onToggle, selectedOptions, disabled, inline, labelClassName, labelField, removable, editable, translate: __ } = this.props;
              return (react_1.default.createElement(Checkbox_1.default, { className: itemClassName, key: index, onChange: () => onToggle(option), checked: !!~selectedOptions.indexOf(option), disabled: disabled || option.disabled, inline: inline, labelClassName: labelClassName, description: option.description },
                  String(option[labelField || 'label']),
                  removable ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "left" },
                      react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon", onClick: (e) => this.handleDeleteClick(e, option) }))) : null,
                  editable ? (react_1.default.createElement("a", { "data-tooltip": "\u7F16\u8F91", "data-position": "left" },
                      react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon", onClick: (e) => this.handleEditClick(e, option) }))) : null));
          }
          render() {
              const { className, disabled, placeholder, options, inline, columnsCount, selectedOptions, onToggle, onToggleAll, checkAll, classnames: cx, itemClassName, labelClassName, creatable, addApi, createBtnLabel, translate: __ } = this.props;
              let body = [];
              if (options && options.length) {
                  body = options.map((option, key) => this.renderItem(option, key));
              }
              if (checkAll && body.length) {
                  body.unshift(react_1.default.createElement(Checkbox_1.default, { key: "checkall", className: itemClassName, onChange: onToggleAll, checked: !!selectedOptions.length, partial: !!(selectedOptions.length &&
                          selectedOptions.length !== options.length), disabled: disabled, inline: inline, labelClassName: labelClassName }, "\u5168\u9009/\u4E0D\u9009"));
              }
              if (!inline && columnsCount > 1) {
                  let weight = 12 / columnsCount;
                  let cellClassName = `Grid-col--sm${weight === Math.round(weight) ? weight : ''}`;
                  body = chunk_1.default(body, columnsCount).map((group, groupIndex) => (react_1.default.createElement("div", { className: cx('Grid'), key: groupIndex }, Array.from({ length: columnsCount }).map((_, index) => (react_1.default.createElement("div", { key: index, className: cx(cellClassName) }, group[index]))))));
              }
              return (react_1.default.createElement("div", { className: cx(`CheckboxesControl`, className) },
                  body && body.length ? (body) : (react_1.default.createElement("span", { className: `Form-placeholder` }, __(placeholder))),
                  (creatable || addApi) && !disabled ? (react_1.default.createElement("a", { className: cx('Checkboxes-addBtn'), onClick: this.handleAddClick },
                      react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                      __(createBtnLabel))) : null));
          }
      }
      CheckboxesControl.defaultProps = {
          columnsCount: 1,
          multiple: true,
          placeholder: 'placeholder.noOption',
          creatable: false,
          createBtnLabel: 'Select.createLabel'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], CheckboxesControl.prototype, "handleAddClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Event !== "undefined" && Event) === "function" ? _a : Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CheckboxesControl.prototype, "handleEditClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Event !== "undefined" && Event) === "function" ? _b : Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CheckboxesControl.prototype, "handleDeleteClick", null);
      return CheckboxesControl;
  })();
  exports.default = CheckboxesControl;
  let CheckboxesControlRenderer = /** @class */ (() => {
      let CheckboxesControlRenderer = class CheckboxesControlRenderer extends CheckboxesControl {
      };
      CheckboxesControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'checkboxes',
              sizeMutable: false
          })
      ], CheckboxesControlRenderer);
      return CheckboxesControlRenderer;
  })();
  exports.CheckboxesControlRenderer = CheckboxesControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hlY2tib3hlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9DaGVja2JveGVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHVDQUttQjtBQUVuQixpRkFBaUQ7QUFDakQsaUVBQWlDO0FBQ2pDLGtEQUE0QztBQUU1QywrQ0FBNEM7QUErQzVDOztJQUFBLE1BQXFCLGlCQUFrQixTQUFRLGVBQUssQ0FBQyxTQUdwRDtRQVNDLGlCQUFpQjtZQUNmLE1BQU0sRUFBQyxlQUFlLEVBQUUsV0FBVyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVsRCxlQUFlLElBQUksV0FBVyxFQUFFLENBQUM7UUFDbkMsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQThCO1lBQy9DLElBQUksRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFFLFdBQVcsRUFBRSxlQUFlLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RFLElBQUksRUFBQyxPQUFPLEVBQUUsV0FBVyxFQUFDLEdBQUcsU0FBUyxDQUFDO1lBRXZDLElBQUksZUFBZSxJQUFJLFdBQVcsSUFBSSxXQUFXLEVBQUU7Z0JBQ2pELFdBQVcsRUFBRSxDQUFDO2FBQ2Y7UUFDSCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBR0QsY0FBYztZQUNaLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLEtBQUssSUFBSSxLQUFLLEVBQUUsQ0FBQztRQUNuQixDQUFDO1FBR0QsZUFBZSxDQUFDLENBQVEsRUFBRSxJQUFTO1lBQ2pDLE1BQU0sRUFBQyxNQUFNLEVB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

});
