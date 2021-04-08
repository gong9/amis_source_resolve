amis.define('src/renderers/Divider.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DividerRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let Divider = /** @class */ (() => {
      class Divider extends react_1.default.Component {
          render() {
              const { classnames: cx, className, lineStyle } = this.props;
              return (react_1.default.createElement("div", { className: cx('Divider', lineStyle ? `Divider--${lineStyle}` : '', className) }));
          }
      }
      Divider.defaultProps = {
          className: '',
          lineStyle: 'dashed'
      };
      return Divider;
  })();
  exports.default = Divider;
  let DividerRenderer = /** @class */ (() => {
      let DividerRenderer = class DividerRenderer extends Divider {
      };
      DividerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:divider|hr)$/,
              name: 'divider'
          })
      ], DividerRenderer);
      return DividerRenderer;
  })();
  exports.DividerRenderer = DividerRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGl2aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRGl2aWRlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFpQm5EO0lBQUEsTUFBcUIsT0FBUSxTQUFRLGVBQUssQ0FBQyxTQUErQjtRQU14RSxNQUFNO1lBQ0osTUFBTSxFQUFDLFVBQVUsRUFBRSxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDMUQsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsU0FBUyxFQUNULFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUN4QyxTQUFTLENBQ1YsR0FDRCxDQUNILENBQUM7UUFDSixDQUFDOztJQWhCTSxvQkFBWSxHQUFrRDtRQUNuRSxTQUFTLEVBQUUsRUFBRTtRQUNiLFNBQVMsRUFBRSxRQUFRO0tBQ3BCLENBQUM7SUFjSixjQUFDO0tBQUE7a0JBbEJvQixPQUFPO0FBd0I1QjtJQUFBLElBQWEsZUFBZSxHQUE1QixNQUFhLGVBQWdCLFNBQVEsT0FBTztLQUFHLENBQUE7SUFBbEMsZUFBZTtRQUozQixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLHVCQUF1QjtZQUM3QixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO09BQ1csZUFBZSxDQUFtQjtJQUFELHNCQUFDO0tBQUE7QUFBbEMsMENBQWUifQ==

});
