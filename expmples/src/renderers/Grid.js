amis.define('src/renderers/Grid.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.GridRenderer = exports.ColProps = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  exports.ColProps = ['lg', 'md', 'sm', 'xs'];
  function fromBsClass(cn) {
      if (typeof cn === 'string' && cn) {
          return cn.replace(/\bcol-(xs|sm|md|lg)-(\d+)\b/g, (_, bp, size) => `Grid-col--${bp}${size}`);
      }
      return cn;
  }
  function copProps2Class(props) {
      const cns = [];
      const modifiers = exports.ColProps;
      modifiers.forEach(modifier => props &&
          props[modifier] &&
          cns.push(`Grid-col--${modifier}${props[modifier]}`));
      cns.length || cns.push('Grid-col--sm');
      return cns.join(' ');
  }
  let Grid = /** @class */ (() => {
      class Grid extends react_1.default.Component {
          renderChild(region, node, key, length) {
              const { render, itemRender } = this.props;
              return itemRender
                  ? itemRender(node, key, length, this.props)
                  : render(region, node);
          }
          renderColumn(column, key, length) {
              let colProps = pick_1.default(column, exports.ColProps);
              colProps = Object.assign({}, colProps);
              const cx = this.props.classnames;
              return (react_1.default.createElement("div", { key: key, className: cx(copProps2Class(colProps), fromBsClass(column.columnClassName)) }, Array.isArray(column) ? (react_1.default.createElement("div", { className: cx('Grid') }, column.map((column, key) => this.renderColumn(column, key, column.length)))) : (this.renderChild(`column/${key}`, column, key, length))));
          }
          renderColumns(columns) {
              return columns.map((column, key) => this.renderColumn(column, key, columns.length));
          }
          render() {
              const { className, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('Grid', className) }, this.renderColumns(this.props.columns)));
          }
      }
      Grid.propsList = ['columns'];
      Grid.defaultProps = {};
      return Grid;
  })();
  exports.default = Grid;
  let GridRenderer = /** @class */ (() => {
      let GridRenderer = class GridRenderer extends Grid {
      };
      GridRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)grid$/,
              name: 'grid'
          })
      ], GridRenderer);
      return GridRenderer;
  })();
  exports.GridRenderer = GridRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvR3JpZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsK0RBQStCO0FBR2xCLFFBQUEsUUFBUSxHQUFHLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7QUF1SWpELFNBQVMsV0FBVyxDQUFDLEVBQVU7SUFDN0IsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLElBQUksRUFBRSxFQUFFO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FDZiw4QkFBOEIsRUFDOUIsQ0FBQyxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLEdBQUcsSUFBSSxFQUFFLENBQzFDLENBQUM7S0FDSDtJQUVELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQztBQUVELFNBQVMsY0FBYyxDQUFDLEtBQVU7SUFDaEMsTUFBTSxHQUFHLEdBQWtCLEVBQUUsQ0FBQztJQUM5QixNQUFNLFNBQVMsR0FBRyxnQkFBUSxDQUFDO0lBRTNCLFNBQVMsQ0FBQyxPQUFPLENBQ2YsUUFBUSxDQUFDLEVBQUUsQ0FDVCxLQUFLO1FBQ0wsS0FBSyxDQUFDLFFBQVEsQ0FBQztRQUNmLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FDdEQsQ0FBQztJQUNGLEdBQUcsQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN2QyxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDdkIsQ0FBQztBQUVEO0lBQUEsTUFBcUIsSUFBUSxTQUFRLGVBQUssQ0FBQyxTQUFnQztRQUl6RSxXQUFXLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxHQUFXLEVBQUUsTUFBYztZQUNuRSxNQUFNLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFeEMsT0FBTyxVQUFVO2dCQUNmLENBQUMsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDM0IsQ0FBQztRQUVELFlBQVksQ0FBQyxNQUFrQixFQUFFLEdBQVcsRUFBRSxNQUFjO1lBQzFELElBQUksUUFBUSxHQUVSLGNBQUksQ0FBQyxNQUFNLEVBQUUsZ0JBQVEsQ0FBQyxDQUFDO1lBRTNCLFFBQVEscUJBQ0gsUUFBUSxDQUNaLENBQUM7WUFFRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQztZQUVqQyxPQUFPLENBQ0wsdUNBQ0UsR0FBRyxFQUFFLEdBQUcsRUFDUixTQUFTLEVBQUUsRUFBRSxDQUNYLGNBQWMsQ0FBQyxRQUFRLENBQUMsRUFDeEIsV0FBVyxDQUFFLE1BQWMsQ0FBQyxlQUFnQixDQUFDLENBQzlDLElBRUEsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdkIsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFDdkIsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsRUFBRSxDQUMxQixJQUFJLENBQUMsWUFBWSxDQUNmLE1BQU0sRUFDTixHQUFHLEVBQ0YsTUFBNEIsQ0FBQyxNQUFNLENBQ3JDLENBQ0YsQ0FDRyxDQUNQLENBQUMsQ0FBQyxDQUFDLENBQ0YsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQ3ZELENBQ0csQ0FDUCxDQUFDO1FBQ0osQ0FBQztRQUVELGFBQWEsQ0FBQyxPQUFvQjtZQUNoQyxPQUFPLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FDakMsSUFBSSxDQUFDLFlBQVksQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FDL0MsQ0FBQztRQUNKLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUMvQyxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBQ2xDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FDbkMsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUE1RE0sY0FBUyxHQUFrQixDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZDLGlCQUFZLEdBQUcsRUFBRSxDQUFDO0lBNEQzQixXQUFDO0tBQUE7a0JBOURvQixJQUFJO0FBb0V6QjtJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxJQUFRO0tBQUcsQ0FBQTtJQUFoQyxZQUFZO1FBSnhCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsYUFBYTtZQUNuQixJQUFJLEVBQUUsTUFBTTtTQUNiLENBQUM7T0FDVyxZQUFZLENBQW9CO0lBQUQsbUJBQUM7S0FBQTtBQUFoQyxvQ0FBWSJ9

});
