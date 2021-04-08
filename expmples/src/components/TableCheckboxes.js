amis.define('src/components/TableCheckboxes.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const locale_1 = require("src/locale.tsx");
  let TableCheckboxes = /** @class */ (() => {
      class TableCheckboxes extends Checkboxes_1.BaseCheckboxes {
          getColumns() {
              let columns = this.props.columns;
              if (!Array.isArray(columns) || !columns.length) {
                  columns = [{ label: 'Label', name: 'label' }];
              }
              return columns;
          }
          renderTHead() {
              const { options, classnames: cx, value, disabled, option2value } = this.props;
              let columns = this.getColumns();
              let valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              const availableOptions = options.filter(option => !option.disabled);
              let partialChecked = false;
              let allChecked = !!availableOptions.length;
              availableOptions.forEach(option => {
                  const isIn = !!~valueArray.indexOf(option);
                  if (isIn && !partialChecked) {
                      partialChecked = true;
                  }
                  else if (!isIn && allChecked) {
                      allChecked = false;
                  }
              });
              return (react_1.default.createElement("thead", null,
                  react_1.default.createElement("tr", null,
                      Array.isArray(options) && options.length ? (react_1.default.createElement("th", { className: cx('Table-checkCell') },
                          react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: disabled, onChange: this.toggleAll, checked: partialChecked, partial: partialChecked && !allChecked }))) : null,
                      columns.map((column, index) => (react_1.default.createElement("th", { key: index }, column.label))))));
          }
          renderTBody() {
              const { options, placeholder, classnames: cx, cellRender, value, disabled, option2value, translate: __ } = this.props;
              const columns = this.getColumns();
              let valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              return (react_1.default.createElement("tbody", null, Array.isArray(options) && options.length ? (options.map((option, rowIndex) => {
                  const checked = valueArray.indexOf(option) !== -1;
                  return (react_1.default.createElement("tr", { key: rowIndex, onClick: e => e.defaultPrevented || this.toggleOption(option) },
                      react_1.default.createElement("td", { className: cx('Table-checkCell') },
                          react_1.default.createElement(Checkbox_1.default, { size: "sm", checked: checked, disabled: disabled })),
                      columns.map((column, colIndex) => (react_1.default.createElement("td", { key: colIndex }, cellRender(column, option, colIndex, rowIndex))))));
              })) : (react_1.default.createElement("tr", null,
                  react_1.default.createElement("td", { colSpan: columns.length }, __(placeholder))))));
          }
          render() {
              const { value, options, className, labelClassName, disabled, classnames: cx, option2value, itemClassName, itemRender } = this.props;
              let valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              let body = [];
              if (Array.isArray(options) && options.length) {
                  body = options.map((option, key) => (react_1.default.createElement("div", { key: key, className: cx('TableCheckboxes-item', itemClassName, option.className, disabled || option.disabled ? 'is-disabled' : ''), onClick: () => this.toggleOption(option) },
                      react_1.default.createElement("div", { className: cx('TableCheckboxes-itemLabel') }, itemRender(option)),
                      react_1.default.createElement(Checkbox_1.default, { size: "sm", checked: !!~valueArray.indexOf(option), disabled: disabled || option.disabled, labelClassName: labelClassName, description: option.description }))));
              }
              return (react_1.default.createElement("div", { className: cx('TableCheckboxes', className) },
                  react_1.default.createElement("div", { className: cx('Table-content') },
                      react_1.default.createElement("table", { className: cx('Table-table') },
                          this.renderTHead(),
                          this.renderTBody()))));
          }
      }
      TableCheckboxes.defaultProps = Object.assign(Object.assign({}, Checkboxes_1.BaseCheckboxes.defaultProps), { cellRender: (column, option, colIndex, rowIndex) => react_1.default.createElement("span", null, tpl_builtin_1.resolveVariable(column.name, option)) });
      return TableCheckboxes;
  })();
  exports.TableCheckboxes = TableCheckboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(TableCheckboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDaGVja2JveGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvVGFibGVDaGVja2JveGVzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNkNBQWlFO0FBQ2pFLG9DQUFtQztBQUNuQywwREFBMEI7QUFDMUIsbURBQThDO0FBQzlDLGtFQUFrQztBQUVsQyxzREFBcUQ7QUFDckQsc0NBQXFDO0FBb0JyQztJQUFBLE1BQWEsZUFBZ0IsU0FBUSwyQkFBb0M7UUFldkUsVUFBVTtZQUNSLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBRWpDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRTtnQkFDOUMsT0FBTyxHQUFHLENBQUMsRUFBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUMsQ0FBQyxDQUFDO2FBQzdDO1lBQ0QsT0FBTyxPQUFPLENBQUM7UUFDakIsQ0FBQztRQUVELFdBQVc7WUFDVCxNQUFNLEVBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzVFLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztZQUNoQyxJQUFJLFVBQVUsR0FBRywyQkFBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1lBQzFFLE1BQU0sZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ3BFLElBQUksY0FBYyxHQUFH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

});
