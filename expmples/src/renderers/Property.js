amis.define('src/renderers/Property.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 表格的方式显示只读信息，比如产品详情
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PropertyRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  class Property extends react_1.default.Component {
      constructor(props) {
          super(props);
      }
      /**
       * 算好每行的分布情况，方便后续渲染
       */
      prepareRows() {
          const { column = 3, items, source, data } = this.props;
          const propertyItems = items
              ? items
              : tpl_builtin_1.resolveVariable(source, data);
          const rows = [];
          let row = [];
          let columnLeft = column;
          let index = 0;
          const filteredItems = helper_1.visibilityFilter(propertyItems, data);
          for (const item of filteredItems) {
              index = index + 1;
              const span = Math.min(item.span || 1, column);
              columnLeft = columnLeft - span;
              const rowItem = {
                  label: item.label,
                  content: item.content,
                  span: span
              };
              // 如果还能放得下就放这一行
              if (columnLeft >= 0) {
                  row.push(rowItem);
              }
              else {
                  rows.push(row);
                  columnLeft = column - span;
                  row = [rowItem];
              }
              // 最后一行将最后的数据 push
              if (index === filteredItems.length) {
                  rows.push(row);
              }
          }
          return rows;
      }
      renderRow(rows) {
          const { render, contentStyle, labelStyle, separator = ': ', mode = 'table' } = this.props;
          return rows.map((row, key) => {
              return (react_1.default.createElement("tr", { key: key }, row.map((property, index) => {
                  return mode === 'table' ? (react_1.default.createElement(react_1.default.Fragment, { key: `item-${index}` },
                      react_1.default.createElement("th", { style: labelStyle }, render('label', property.label)),
                      react_1.default.createElement("td", { colSpan: property.span + property.span - 1, style: contentStyle }, render('content', property.content)))) : (react_1.default.createElement("td", { colSpan: property.span, style: contentStyle, key: `item-${index}` },
                      react_1.default.createElement("span", { style: labelStyle }, render('label', property.label)),
                      separator,
                      render('content', property.content)));
              })));
          });
      }
      render() {
          const { style, title, column = 3, classnames: cx, className, titleStyle, mode = 'table' } = this.props;
          const rows = this.prepareRows();
          return (react_1.default.createElement("div", { className: cx('Property', `Property--${mode}`, className), style: style },
              react_1.default.createElement("table", null,
                  title ? (react_1.default.createElement("thead", null,
                      react_1.default.createElement("tr", null,
                          react_1.default.createElement("th", { colSpan: mode === 'table' ? column + column : column, style: titleStyle }, title)))) : null,
                  react_1.default.createElement("tbody", null, this.renderRow(rows)))));
      }
  }
  exports.default = Property;
  let PropertyRenderer = /** @class */ (() => {
      let PropertyRenderer = class PropertyRenderer extends Property {
      };
      PropertyRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)property$/,
              name: 'property'
          })
      ], PropertyRenderer);
      return PropertyRenderer;
  })();
  exports.PropertyRenderer = PropertyRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHJvcGVydHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1Byb3BlcnR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsd0NBQW1EO0FBR25ELHNEQUFxRDtBQUNyRCw0Q0FBaUQ7QUFzR2pELE1BQXFCLFFBQVMsU0FBUSxlQUFLLENBQUMsU0FBZ0M7SUFDMUUsWUFBWSxLQUFvQjtRQUM5QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDZixDQUFDO0lBRUQ7O09BRUc7SUFDSCxXQUFXO1FBQ1QsTUFBTSxFQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUUsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXJELE1BQU0sYUFBYSxHQUFHLEtBQUs7WUFDekIsQ0FBQyxDQUFDLEtBQUs7WUFDUCxDQUFDLENBQUUsNkJBQWUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUF5QixDQUFDO1FBRTNELE1BQU0sSUFBSSxHQUF3QixFQUFFLENBQUM7UUFFckMsSUFBSSxHQUFHLEdBQXNCLEVBQUUsQ0FBQztRQUNoQyxJQUFJLFVBQVUsR0FBRyxNQUFNLENBQUM7UUFDeEIsSUFBSSxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2QsTUFBTSxhQUFhLEdBQUcseUJBQWdCLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBRTVELEtBQUssTUFBTSxJQUFJLElBQUksYUFBYSxFQUFFO1lBQ2hDLEtBQUssR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDOUMsVUFBVSxHQUFHLFVBQVUsR0FBRyxJ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

});
