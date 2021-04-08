amis.define('src/components/SparkLine.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SparkLine = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  const theme_1 = require("src/theme.tsx");
  let SparkLine = /** @class */ (() => {
      class SparkLine extends react_1.default.Component {
          normalizeValue(item) {
              if (typeof item === 'number') {
                  return item;
              }
              else if (item && typeof item.value === 'number') {
                  return item.value;
              }
              else {
                  return Number(item) || 0;
              }
          }
          renderLines() {
              const { width, height, value, classnames: cx } = this.props;
              const values = value.map(item => this.normalizeValue(item));
              const max = Math.max(...values);
              const min = Math.min(...values);
              const duration = max - min || 1;
              const gap = width / (values.length - 1);
              const points = [];
              values.forEach((value, index) => {
                  points.push({
                      x: index * gap,
                      y: height - ((value - min) * height) / duration
                  });
              });
              const lineD = points
                  .map((value, index) => `${index === 0 ? 'M' : 'L'} ${value.x} ${value.y}`)
                  .join(' ');
              const areaD = `${lineD} V ${height} L 0 ${height} Z`;
              // todo 支持鼠标 hover 显示对应数据。
              return (react_1.default.createElement("g", null,
                  react_1.default.createElement("path", { className: cx(`Sparkline-area`), d: areaD, stroke: "none" }),
                  react_1.default.createElement("path", { className: cx(`Sparkline-line`), d: lineD, fill: "none" })));
          }
          render() {
              const { classnames: cx, className, value, width, height, onClick } = this.props;
              return (react_1.default.createElement("div", { className: cx('Sparkline', className, onClick ? 'Sparkline--clickable' : ''), onClick: onClick }, Array.isArray(value) && value.length > 1 ? (react_1.default.createElement("svg", { className: cx('Sparkline-svg'), width: width, height: height, viewBox: `0 0 ${width} ${height}` }, this.renderLines())) : (react_1.default.createElement("span", null, "Invalid Value"))));
          }
      }
      SparkLine.defaultProps = {
          width: 100,
          height: 50
      };
      return SparkLine;
  })();
  exports.SparkLine = SparkLine;
  exports.default = theme_1.themeable(locale_1.localeable(SparkLine));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcmtMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvU3BhcmtMaW5lLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHNDQUFrRDtBQUNsRCxvQ0FBK0M7QUFpQi9DO0lBQUEsTUFBYSxTQUFVLFNBQVEsZUFBSyxDQUFDLFNBQXlCO1FBTTVELGNBQWMsQ0FBQyxJQUFTO1lBQ3RCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQzthQUNiO2lCQUFNLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxDQUFDLEtBQUssS0FBSyxRQUFRLEVBQUU7Z0JBQ2pELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQjtpQkFBTTtnQkFDTCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDMUI7UUFDSCxDQUFDO1FBRUQsV0FBVztZQUNULE1BQU0sRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUUxRCxNQUFNLE1BQU0sR0FBRyxLQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQztZQUNoQyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUM7WUFDaEMsTUFBTSxRQUFRLEdBQUcsR0FBRyxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFFaEMsTUFBTSxHQUFHLEdBQUcsS0FBSyxHQUFHLENB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

});
