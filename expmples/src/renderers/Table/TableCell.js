amis.define('src/renderers/Table/TableCell.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FieldRenderer = exports.TableCellRenderer = exports.TableCell = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const QuickEdit_1 = tslib_1.__importDefault(require("src/renderers/QuickEdit.tsx"));
  const Copyable_1 = tslib_1.__importDefault(require("src/renderers/Copyable.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/renderers/PopOver.tsx"));
  const mobx_react_1 = require("node_modules/mobx-react/dist/index");
  let TableCell = /** @class */ (() => {
      class TableCell extends react_1.default.Component {
          render() {
              let _a = this.props, { className, render, style, wrapperComponent: Component, column, value, data, children, width, innerClassName, label, tabIndex, onKeyUp, rowSpan, body: _body, tpl, remark, prefix, affix, isHead } = _a, rest = tslib_1.__rest(_a, ["className", "render", "style", "wrapperComponent", "column", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "rowSpan", "body", "tpl", "remark", "prefix", "affix", "isHead"]);
              const schema = Object.assign(Object.assign({}, column), { className: innerClassName, type: (column && column.type) || 'plain' });
              let body = children
                  ? children
                  : render('field', schema, Object.assign(Object.assign({}, rest), { value,
                      data }));
              if (width) {
                  style = Object.assign(Object.assign({}, style), { width: (style && style.width) || width });
                  if (!/%$/.test(String(style.width))) {
                      body = (react_1.default.createElement("div", { style: { width: style.width } },
                          prefix,
                          body,
                          affix));
                      prefix = null;
                      affix = null;
                      // delete style.width;
                  }
              }
              if (!Component) {
                  return body;
              }
              if (isHead) {
                  Component = 'th';
              }
              return (react_1.default.createElement(Component, { rowSpan: rowSpan > 1 ? rowSpan : undefined, style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp },
                  prefix,
                  body,
                  affix));
          }
      }
      TableCell.defaultProps = {
          wrapperComponent: 'td'
      };
      TableCell.propsList = [
          'type',
          'label',
          'column',
          'body',
          'tpl',
          'rowSpan',
          'remark'
      ];
      return TableCell;
  })();
  exports.TableCell = TableCell;
  let TableCellRenderer = /** @class */ (() => {
      let TableCellRenderer = class TableCellRenderer extends TableCell {
      };
      TableCellRenderer.propsList = [
          'quickEdit',
          'quickEditEnabledOn',
          'popOver',
          'copyable',
          'inline',
          ...TableCell.propsList
      ];
      TableCellRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)table\/(?:.*\/)?cell$/,
              name: 'table-cell'
          }),
          QuickEdit_1.default(),
          PopOver_1.default({
              targetOutter: true
          }),
          Copyable_1.default(),
          mobx_react_1.observer
      ], TableCellRenderer);
      return TableCellRenderer;
  })();
  exports.TableCellRenderer = TableCellRenderer;
  let FieldRenderer = /** @class */ (() => {
      let FieldRenderer = class FieldRenderer extends TableCell {
      };
      FieldRenderer.defaultProps = Object.assign(Object.assign({}, TableCell.defaultProps), { wrapperComponent: 'div' });
      FieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)field$/,
              name: 'field'
          }),
          PopOver_1.default(),
          Copyable_1.default()
      ], FieldRenderer);
      return FieldRenderer;
  })();
  exports.FieldRenderer = FieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVDZWxsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9UYWJsZS9UYWJsZUNlbGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsMkNBQXNEO0FBQ3RELHFFQUFxQztBQUNyQyxtRUFBbUM7QUFDbkMsaUVBQXFDO0FBQ3JDLDJDQUFvQztBQU1wQztJQUFBLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUF3QjtRQWUzRCxNQUFNO1lBQ0osSUFBSSxLQXNCQSxJQUFJLENBQUMsS0FBSyxFQXRCVixFQUNGLFNBQVMsRUFDVCxNQUFNLEVBQ04sS0FBSyxFQUNMLGdCQUFnQixFQUFFLFNBQVMsRUFDM0IsTUFBTSxFQUNOLEtBQUssRUFDTCxJQUFJLEVBQ0osUUFBUSxFQUNSLEtBQUssRUFDTCxjQUFjLEVBQ2QsS0FBSyxFQUNMLFFBQVEsRUFDUixPQUFPLEVBQ1AsT0FBTyxFQUNQLElBQUksRUFBRSxLQUFLLEVBQ1gsR0FBRyxFQUNILE1BQU0sRUFDTixNQUFNLEVBQ04sS0FBSyxFQUNMLE1BQU0sT0FFTSxFQURULElBQUksc0JBckJMLHVOQXNCSCxDQUFhLENBQUM7WUFFZixNQUFNLE1BQU0sbUNBQ1AsTUFBTSxLQUNULFNBQVMsRUFBRSxjQUFjLEVBQ3pCLElBQUksRUFBRSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksT0FBTyxHQUN6QyxDQUFDO1lBRUYsSUFBSSxJQUFJLEdBQUcsUUFBUTtnQkFDakIsQ0FBQyxDQUFDLFFBQVE7Z0JBQ1YsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxrQ0FDakIsSUFBSSxLQUNQLEtBQUs7b0JBQ0wsSUFBSSxJQUNKLENBQUM7WUFFUCxJQUFJLEtBQUssRUFBRTtnQkFDVCxLQUFLLG1DQUNBLEtBQUssS0FDUixLQUFL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

});
