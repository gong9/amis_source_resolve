amis.define('src/renderers/Table/TableContent.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableContent = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const TableBody_1 = require("src/renderers/Table/TableBody.tsx");
  class TableContent extends react_1.default.Component {
      render() {
          const { placeholder, classnames: cx, render, className, columns, columnsGroup, onMouseMove, onScroll, tableRef, rows, renderHeadCell, renderCell, onCheck, rowClassName, onQuickChange, footable, footableColumns, checkOnItemClick, buildItemProps, onAction, rowClassNameExpr, data, prefixRow, locale, translate, affixRow } = this.props;
          const tableClassName = cx('Table-table', this.props.tableClassName);
          const hideHeader = columns.every(column => !column.label);
          return (react_1.default.createElement("div", { onMouseMove: onMouseMove, className: cx('Table-content', className), onScroll: onScroll },
              react_1.default.createElement("table", { ref: tableRef, className: tableClassName },
                  react_1.default.createElement("thead", null,
                      columnsGroup.length ? (react_1.default.createElement("tr", null, columnsGroup.map((item, index) => (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label ? render('tpl', item.label) : null))))) : null,
                      react_1.default.createElement("tr", { className: hideHeader ? 'fake-hide' : '' }, columns.map(column => renderHeadCell(column, {
                          'data-index': column.index,
                          'key': column.index
                      })))),
                  !rows.length ? (react_1.default.createElement("tbody", null,
                      react_1.default.createElement("tr", { className: cx('Table-placeholder') },
                          react_1.default.createElement("td", { colSpan: columns.length }, render('placeholder', translate(placeholder || 'placeholder.noData')))))) : (react_1.default.createElement(TableBody_1.TableBody, { classnames: cx, render: render, renderCell: renderCell, onCheck: onCheck, onQuickChange: onQuickChange, footable: footable, footableColumns: footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: onAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, rows: rows, columns: columns, locale: locale, translate: translate, prefixRow: prefixRow, affixRow: affixRow, data: data })))));
      }
  }
  exports.TableContent = TableContent;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDb250ZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9UYWJsZS9UYWJsZUNvbnRlbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFJMUIsMkNBQXNDO0FBOEN0QyxNQUFhLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FBNEI7SUFDbEUsTUFBTTtRQUNKLE1BQU0sRUFDSixXQUFXLEVBQ1gsVUFBVSxFQUFFLEVBQUUsRUFDZCxNQUFNLEVBQ04sU0FBUyxFQUNULE9BQU8sRUFDUCxZQUFZLEVBQ1osV0FBVyxFQUNYLFFBQVEsRUFDUixRQUFRLEVBQ1IsSUFBSSxFQUNKLGNBQWMsRUFDZCxVQUFVLEVBQ1YsT0FBTyxFQUNQLFlBQVksRUFDWixhQUFhLEVBQ2IsUUFBUSxFQUNSLGVBQWUsRUFDZixnQkFBZ0IsRUFDaEIsY0FBYyxFQUNkLFFBQVEsRUFDUixnQkFBZ0IsRUFDaEIsSUFBSSxFQUNKLFNBQVMsRUFDVCxNQUFNLEVBQ04sU0FBUyxFQUNULFFBQVEsRUFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFZixNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDcEUsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBRTFELE9BQU8sQ0FDTCx1Q0FDRSxXQUFXLEVBQUUsV0FBVyxFQUN4QixTQUFTLEVBQUUsRUFBRSxDQUFDLGVBQWUsRUFBRSxTQUFTLENBQUMsRUFDekMsUUFBUSxFQUFFLFFBQVE7WUFFbEIseUNBQU8sR0FBRyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsY0FBYztnQkFDN0M7b0JBQ0csWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDckIsMENBQ0csWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQ2pDLHNDQUNFLEdBQUcsRUFBRSxLQUFLLGdCQUNFLElBQUksQ0FBQyxLQUFLLEVBQ3RCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxJQUVwQixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUMzQyxDQUNOLENBQUMsQ0FDQyxDQUNOLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ1Isc0NBQUksU0FBUyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FDcEIsY0FBYyxDQUFDLE1BQU0sRUFBRTt3QkFDckIsWUFBWSxFQUFFLE1BQU0sQ0FBQyxLQUFLO3dCQUMxQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUs7cUJBQ3BCLENBQUMsQ0FDSCxDQUNFLENBQ0M7Z0JBQ1AsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNkO29CQUNFLHNDQUFJLFNBQVMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUM7d0JBQ3BDLHNDQUFJLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxJQUN4QixNQUFNLENBQ0wsYUFBYSxFQUNiLFNBQVMsQ0FBQyxXQUFXLElBQUksb0JBQW9CLENBQUMsQ0FDL0MsQ0FDRSxDQUNGLENBQ0MsQ0FDVCxDQUFDLENBQUMsQ0FBQyxDQUNGLDhCQUFDLHFCQUFTLElBQ1IsVUFBVSxFQUFFLEVBQUUsRUFDZCxNQUFNLEVBQUUsTUFBTSxFQUNkLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLGFBQWEsRUFBRSxhQUFhLEVBQzVCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLGVBQWUsRUFBRSxlQUFlLEVBQ2hDLGdCQUFnQixFQUFFLGdCQUFnQixFQUNsQyxjQUFjLEVBQUUsY0FBYyxFQUM5QixRQUFRLEVBQUUsUUFBUSxFQUNsQixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDbEMsWUFBWSxFQUFFLFlBQVksRUFDMUIsSUFBSSxFQUFFLElBQUksRUFDVixPQUFPLEVBQUUsT0FBTyxFQUNoQixNQUFNLEVBQUUsTUFBTSxFQUNkLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLElBQUksRUFBRSxJQUFJLEdBQ0MsQ0FDZCxDQUNLLENBQ0osQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBdEdELG9DQXNHQyJ9

});
