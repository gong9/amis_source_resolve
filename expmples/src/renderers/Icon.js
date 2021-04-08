amis.define('src/renderers/Icon.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TplRenderer = exports.Icon = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let Icon = /** @class */ (() => {
      class Icon extends react_1.default.Component {
          render() {
              const { icon, vendor, classnames: cx, className } = this.props;
              const isURLIcon = (icon === null || icon === void 0 ? void 0 : icon.indexOf('.')) !== -1;
              return isURLIcon ? (react_1.default.createElement("img", { className: cx('Icon'), src: icon })) : (react_1.default.createElement("i", { className: cx(vendor === 'iconfont'
                      ? `iconfont icon-${icon}`
                      : `${vendor} ${vendor}-${icon}`, className) }));
          }
      }
      Icon.defaultProps = {
          icon: '',
          vendor: 'fa'
      };
      return Icon;
  })();
  exports.Icon = Icon;
  let TplRenderer = /** @class */ (() => {
      let TplRenderer = class TplRenderer extends Icon {
      };
      TplRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)icon$/,
              name: 'icon'
          })
      ], TplRenderer);
      return TplRenderer;
  })();
  exports.TplRenderer = TplRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvSWNvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFzQm5EO0lBQUEsTUFBYSxJQUFLLFNBQVEsZUFBSyxDQUFDLFNBQTRCO1FBTTFELE1BQU07WUFDSixNQUFNLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFFLFNBQVMsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFN0QsTUFBTSxTQUFTLEdBQUcsQ0FBQSxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUUsT0FBTyxDQUFDLEdBQUcsT0FBTSxDQUFDLENBQUMsQ0FBQztZQUM1QyxPQUFPLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDakIsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsSUFBSSxHQUFJLENBQzFDLENBQUMsQ0FBQyxDQUFDLENBQ0YscUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCxNQUFNLEtBQUssVUFBVTtvQkFDbkIsQ0FBQyxDQUFDLGlCQUFpQixJQUFJLEVBQUU7b0JBQ3pCLENBQUMsQ0FBQyxHQUFHLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFLEVBQ2pDLFNBQVMsQ0FDVixHQUNELENBQ0gsQ0FBQztRQUNKLENBQUM7O0lBckJNLGlCQUFZLEdBQXVCO1FBQ3hDLElBQUksRUFBRSxFQUFFO1FBQ1IsTUFBTSxFQUFFLElBQUk7S0FDYixDQUFDO0lBbUJKLFdBQUM7S0FBQTtBQXZCWSxvQkFBSTtBQTZCakI7SUFBQSxJQUFhLFdBQVcsR0FBeEIsTUFBYSxXQUFZLFNBQVEsSUFBSTtLQUFHLENBQUE7SUFBM0IsV0FBVztRQUp2QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO09BQ1csV0FBVyxDQUFnQjtJQUFELGtCQUFDO0tBQUE7QUFBM0Isa0NBQVcifQ==

});
