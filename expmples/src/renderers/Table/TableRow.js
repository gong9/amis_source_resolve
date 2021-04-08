amis.define('src/renderers/Table/TableRow.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableRow = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const mobx_1 = require("node_modules/mobx/lib/index");
  class TableRow extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.handleAction = this.handleAction.bind(this);
          this.handleQuickChange = this.handleQuickChange.bind(this);
          this.handleClick = this.handleClick.bind(this);
          const item = props.item;
          const parent = props.parent;
          const columns = props.columns;
          this.reaction = mobx_1.reaction(() => `${item.isHover}${item.checked}${item.checkdisable}${JSON.stringify(item.data)}${item.moved}${item.modified}${item.expanded}${parent === null || parent === void 0 ? void 0 : parent.expanded}${columns.length}`, () => this.forceUpdate(), {
              onError: () => this.reaction()
          });
      }
      shouldComponentUpdate(nextProps) {
          const props = this.props;
          if (props.columns !== nextProps.columns) {
              return true;
          }
          // 不需要更新，因为子节点已经 observer 了
          return false;
      }
      componentWillUnmount() {
          var _a;
          (_a = this.reaction) === null || _a === void 0 ? void 0 : _a.call(this);
      }
      handleClick(e) {
          const target = e.target;
          const ns = this.props.classPrefix;
          let formItem;
          if (!e.currentTarget.contains(target) ||
              ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
              ((formItem = target.closest(`button, a, [data-role="form-item"]`)) &&
                  e.currentTarget.contains(formItem))) {
              return;
          }
          this.props.onCheck(this.props.item);
      }
      handleAction(e, action, ctx) {
          const { onAction, item } = this.props;
          onAction && onAction(e, action, ctx || item.data);
      }
      handleQuickChange(values, saveImmediately, savePristine, resetOnFailed) {
          const { onQuickChange, item } = this.props;
          onQuickChange &&
              onQuickChange(item, values, saveImmediately, savePristine, resetOnFailed);
      }
      render() {
          const _a = this.props, { itemClassName, itemIndex, item, columns, renderCell, children, footableMode, ignoreFootableContent, footableColSpan, regionPrefix, checkOnItemClick, classPrefix: ns, render, classnames: cx, parent } = _a, rest = tslib_1.__rest(_a, ["itemClassName", "itemIndex", "item", "columns", "renderCell", "children", "footableMode", "ignoreFootableContent", "footableColSpan", "regionPrefix", "checkOnItemClick", "classPrefix", "render", "classnames", "parent"]);
          // console.log('TableRow');
          if (footableMode) {
              if (!item.expanded) {
                  return null;
              }
              return (react_1.default.createElement("tr", { "data-id": item.id, "data-index": item.newIndex, onClick: checkOnItemClick ? this.handleClick : undefined, className: cx(itemClassName, {
                      'is-hovered': item.isHover,
                      'is-checked': item.checked,
                      'is-modified': item.modified,
                      'is-moved': item.moved,
                      [`Table-tr--odd`]: itemIndex % 2 === 0,
                      [`Table-tr--even`]: itemIndex % 2 === 1
                  }) },
                  react_1.default.createElement("td", { className: cx(`Table-foot`), colSpan: footableColSpan },
                      react_1.default.createElement("table", { className: cx(`Table-footTable`) },
                          react_1.default.createElement("tbody", null, ignoreFootableContent
                              ? columns.map(column => (react_1.default.createElement("tr", { key: column.index },
                                  column.label !== false ? react_1.default.createElement("th", null) : null,
                                  react_1.default.createElement("td", null))))
                              : columns.map(column => (react_1.default.createElement("tr", { key: column.index },
                                  column.label !== false ? (react_1.default.createElement("th", null, render(`${regionPrefix}${itemIndex}/${column.index}/tpl`, column.label))) : null,
                                  renderCell(`${regionPrefix}${itemIndex}/${column.index}`, column, item, Object.assign(Object.assign({}, rest), { width: null, rowIndex: itemIndex, colIndex: column.index, key: column.index, onAction: this.handleAction, onQuickChange: this.handleQuickChange }))))))))));
          }
          if (parent && !parent.expanded) {
              return null;
          }
          return (react_1.default.createElement("tr", { onClick: checkOnItemClick ? this.handleClick : undefined, "data-index": item.depth === 1 ? item.newIndex : undefined, "data-id": item.id, className: cx(itemClassName, {
                  'is-hovered': item.isHover,
                  'is-checked': item.checked,
                  'is-modified': item.modified,
                  'is-moved': item.moved,
                  'is-expanded': item.expanded,
                  'is-expandable': item.expandable,
                  [`Table-tr--odd`]: itemIndex % 2 === 0,
                  [`Table-tr--even`]: itemIndex % 2 === 1
              }, `Table-tr--${item.depth}th`) }, columns.map(column => renderCell(`${itemIndex}/${column.index}`, column, item, Object.assign(Object.assign({}, rest), { rowIndex: itemIndex, colIndex: column.index, key: column.index, onAction: this.handleAction, onQuickChange: this.handleQuickChange })))));
      }
  }
  exports.TableRow = TableRow;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGVSb3cuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1RhYmxlL1RhYmxlUm93LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsMERBQTBCO0FBSTFCLCtCQUE4QjtBQXNCOUIsTUFBYSxRQUFTLFNBQVEsZUFBSyxDQUFDLFNBQXdCO0lBRTFELFlBQVksS0FBb0I7UUFDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBRS9DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDeEIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUM1QixNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDO1FBQzlCLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBUSxDQUN0QixHQUFHLEVBQUUsQ0FDSCxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUM1RSxJQUFJLENBQUMsS0FDUCxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsR0FBRyxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVB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

});
