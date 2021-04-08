amis.define('src/renderers/Grid2D.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Grid2DRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  // Grid 布局默认的这个命名方式和其它 CSS 差异太大，所以我们使用更类似其它 CSS 的命名
  const justifySelfMap = {
      left: 'start',
      right: 'end',
      center: 'center',
      auto: 'stretch'
  };
  const alignSelfMap = {
      top: 'start',
      bottom: 'end',
      middle: 'center',
      auto: 'stretch'
  };
  let Grid2D = /** @class */ (() => {
      class Grid2D extends react_1.default.Component {
          constructor(props) {
              super(props);
          }
          renderChild(region, node) {
              const { render } = this.props;
              return render(region, node);
          }
          renderGrid(grid, key, length) {
              const { itemRender, data } = this.props;
              if (!helper_1.isVisible(grid, data)) {
                  return null;
              }
              let style = {
                  gridColumnStart: grid.x,
                  gridColumnEnd: grid.x + grid.w,
                  gridRowStart: grid.y,
                  gridRowEnd: grid.y + grid.h,
                  justifySelf: grid.align ? justifySelfMap[grid.align] : 'stretch',
                  alignSelf: grid.valign ? alignSelfMap[grid.valign] : 'stretch'
              };
              return (react_1.default.createElement("div", { key: key, style: style, className: grid.gridClassName }, itemRender
                  ? itemRender(grid, key, length, this.props)
                  : this.renderChild(`grid2d/${key}`, grid)));
          }
          renderGrids() {
              const { grids } = this.props;
              return grids.map((grid, key) => this.renderGrid(grid, key, grids.length));
          }
          render() {
              const { grids, cols, gap, gapRow, width, rowHeight } = this.props;
              const templateColumns = new Array(cols);
              templateColumns.fill('1fr');
              let maxRow = 0;
              // 计算最大有多少行
              grids.forEach((grid, index) => {
                  let row = grid.y + grid.h - 1;
                  if (row > maxRow) {
                      maxRow = row;
                  }
              });
              const templateRows = new Array(maxRow);
              templateRows.fill(rowHeight);
              // 根据 grid 中的设置自动更新行列高度
              grids.forEach(grid => {
                  if (grid.width) {
                      templateColumns[grid.x - 1] = Number.isInteger(grid.width)
                          ? grid.width + 'px'
                          : grid.width;
                  }
                  if (grid.height) {
                      templateRows[grid.y - 1] = Number.isInteger(grid.height)
                          ? grid.height + 'px'
                          : grid.height;
                  }
              });
              const style = {
                  display: 'grid',
                  columnGap: gap,
                  rowGap: typeof gapRow === 'undefined' ? gap : gapRow,
                  width,
                  gridTemplateColumns: templateColumns.join(' '),
                  gridTemplateRows: templateRows.join(' ')
              };
              return react_1.default.createElement("div", { style: style }, this.renderGrids());
          }
      }
      Grid2D.propsList = ['grids'];
      Grid2D.defaultProps = {
          cols: 12,
          width: 'auto',
          gap: 0,
          rowHeight: '3.125rem'
      };
      return Grid2D;
  })();
  exports.default = Grid2D;
  let Grid2DRenderer = /** @class */ (() => {
      let Grid2DRenderer = class Grid2DRenderer extends Grid2D {
      };
      Grid2DRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)grid-2d$/,
              name: 'grid-2d'
          })
      ], Grid2DRenderer);
      return Grid2DRenderer;
  })();
  exports.Grid2DRenderer = Grid2DRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZDJELmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9HcmlkMkQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBRW5ELDRDQUEwQztBQXdHMUMsbURBQW1EO0FBQ25ELE1BQU0sY0FBYyxHQUFHO0lBQ3JCLElBQUksRUFBRSxPQUFPO0lBQ2IsS0FBSyxFQUFFLEtBQUs7SUFDWixNQUFNLEVBQUUsUUFBUTtJQUNoQixJQUFJLEVBQUUsU0FBUztDQUNoQixDQUFDO0FBRUYsTUFBTSxZQUFZLEdBQUc7SUFDbkIsR0FBRyxFQUFFLE9BQU87SUFDWixNQUFNLEVBQUUsS0FBSztJQUNiLE1BQU0sRUFBRSxRQUFRO0lBQ2hCLElBQUksRUFBRSxTQUFTO0NBQ2hCLENBQUM7QUFFRjtJQUFBLE1BQXFCLE1BQU8sU0FBUSxlQUFLLENBQUMsU0FBOEI7UUFVdEUsWUFBWSxLQUFrQjtZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDZixDQUFDO1FBRUQsV0FBVyxDQUFDLE1BQWMsRUFBRSxJQUFZO1lBQ3RDLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTVCLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsVUFBVSxDQUFDLElBQWdCLEVBQUUsR0FBVyxFQUFFLE1BQWM7WUFDdEQsTUFBTSxFQUFDLFVBQVUsRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXRDLElBQUksQ0FBQyxrQkFBUyxDQUFDLElBQVksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDbEMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUVELElBQUksS0FBSyxHQUFRO2dCQUNmLGVBQWUsRUFBRSxJQUFJLENB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

});
