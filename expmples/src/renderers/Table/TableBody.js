amis.define('src/renderers/Table/TableBody.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableBody = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const TableRow_1 = require("src/renderers/Table/TableRow.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const mobx_1 = require("node_modules/mobx/lib/index");
  const helper_1 = require("src/utils/helper.ts");
  class TableBody extends react_1.default.Component {
      constructor(props) {
          super(props);
          const rows = props.rows;
          this.reaction = mobx_1.reaction(() => `${helper_1.flattenTree(rows)
              .map(item => `${item.id}`)
              .join(',')}${rows
              .filter(item => item.checked)
              .map(item => item.id)
              .join(',')}`, () => this.forceUpdate(), {
              onError: () => this.reaction()
          });
      }
      shouldComponentUpdate(nextProps) {
          const props = this.props;
          if (props.columns !== nextProps.columns ||
              props.buildItemProps !== nextProps.buildItemProps ||
              props.prefixRow ||
              props.affixRow) {
              return true;
          }
          return false;
      }
      componentWillUnmount() {
          var _a;
          (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
      }
      renderRows(rows, columns = this.props.columns, rowProps = {}) {
          const { rowClassName, rowClassNameExpr, onAction, buildItemProps, checkOnItemClick, classnames: cx, render, renderCell, onCheck, onQuickChange, footable, ignoreFootableContent, footableColumns } = this.props;
          return rows.map((item, rowIndex) => {
              const itemProps = buildItemProps ? buildItemProps(item, rowIndex) : null;
              const doms = [
                  react_1.default.createElement(TableRow_1.TableRow, Object.assign({}, itemProps, { classnames: cx, checkOnItemClick: checkOnItemClick, key: item.id, itemIndex: rowIndex, item: item, itemClassName: cx(rowClassNameExpr
                          ? tpl_1.filter(rowClassNameExpr, item.data)
                          : rowClassName, {
                          'is-last': item.depth > 1 && rowIndex === rows.length - 1
                      }), columns: columns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, 
                      // todo 先注释 quickEditEnabled={item.depth === 1}
                      onQuickChange: onQuickChange }, rowProps))
              ];
              if (footable && footableColumns.length) {
                  if (item.depth === 1) {
                      doms.push(react_1.default.createElement(TableRow_1.TableRow, Object.assign({}, itemProps, { classnames: cx, checkOnItemClick: checkOnItemClick, key: `foot-${item.id}`, itemIndex: rowIndex, item: item, itemClassName: cx(rowClassNameExpr
                              ? tpl_1.filter(rowClassNameExpr, item.data)
                              : rowClassName), columns: footableColumns, renderCell: renderCell, render: render, onAction: onAction, onCheck: onCheck, footableMode: true, footableColSpan: columns.length, onQuickChange: onQuickChange, ignoreFootableContent: ignoreFootableContent }, rowProps)));
                  }
              }
              else if (item.children.length) {
                  // 嵌套表格
                  doms.push(...this.renderRows(item.children, columns, Object.assign(Object.assign({}, rowProps), { parent: item })));
              }
              return doms;
          });
      }
      renderSummaryRow(items) {
          const { columns, render, data, classnames: cx, rows } = this.props;
          if (!(Array.isArray(items) && items.length)) {
              return null;
          }
          const filterColumns = columns.filter(item => item.toggable);
          const result = [];
          for (let index = 0; index < filterColumns.length; index++) {
              const item = items[filterColumns[index].rawIndex];
              item && result.push(item);
          }
          //  如果是勾选栏，让它和下一列合并。
          if (columns[0].type === '__checkme' && result[0]) {
              result[0].colSpan = (result[0].colSpan || 1) + 1;
          }
          //  如果是展开栏，让它和下一列合并。
          if (columns[0].type === '__expandme' && result[0]) {
              result[0].colSpan = (result[0].colSpan || 1) + 1;
          }
          // 缺少的单元格补齐
          const appendLen = columns.length - result.reduce((p, c) => p + (c.colSpan || 1), 0);
          if (appendLen) {
              const item = result.pop();
              result.push(Object.assign(Object.assign({}, item), { colSpan: (item.colSpan || 1) + appendLen }));
          }
          const ctx = helper_1.createObject(data, {
              items: rows.map(row => row.locals)
          });
          return (react_1.default.createElement("tr", { className: cx('Table-tr', 'is-summary') }, result.map((item, index) => {
              const Com = item.isHead ? 'th' : 'td';
              return (react_1.default.createElement(Com, { key: index, colSpan: item.colSpan, className: item.cellClassName }, render(`summary-row/${index}`, item, {
                  data: ctx
              })));
          })));
      }
      renderSummary(items) {
          return Array.isArray(items)
              ? items.some(i => Array.isArray(i))
                  ? items.map(i => this.renderSummaryRow(Array.isArray(i) ? i : [i]))
                  : this.renderSummaryRow(items)
              : null;
      }
      render() {
          const { classnames: cx, className, render, rows, columns, rowsProps, prefixRow, affixRow, translate: __ } = this.props;
          return (react_1.default.createElement("tbody", { className: className }, rows.length ? (react_1.default.createElement(react_1.default.Fragment, null,
              this.renderSummary(prefixRow),
              this.renderRows(rows, columns, rowsProps),
              this.renderSummary(affixRow))) : null));
      }
  }
  exports.TableBody = TableBody;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVCb2R5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9UYWJsZS9UYWJsZUJvZHkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFJMUIseUNBQW9DO0FBQ3BDLHlDQUF1QztBQUV2QywrQkFBcUM7QUFDckMsK0NBQTZEO0FBcUM3RCxNQUFhLFNBQVUsU0FBUSxlQUFLLENBQUMsU0FBeUI7SUFFNUQsWUFBWSxLQUFxQjtRQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFYixNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBRXhCLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBUSxDQUN0QixHQUFHLEVBQUUsQ0FDSCxHQUFHLG9CQUFXLENBQUMsSUFBSSxDQUFDO2FBQ2pCLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDO2FBQ3pCLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJO2FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDNUIsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQzthQUNwQixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFDaEIsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUN4QjtZQUNFLE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUyxFQUFFO1NBQ2hDLENBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxTQUF5QjtRQUM3QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXpCLElBQ0UsS0FBSyxDQUFDLE9BQU8sS0FB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

});
