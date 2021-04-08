amis.define('src/renderers/Spinner.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SpinnerRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const factory_1 = require("src/factory.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  let SpinnerRenderer = /** @class */ (() => {
      let SpinnerRenderer = class SpinnerRenderer extends react_1.default.Component {
          render() {
              return react_1.default.createElement(Spinner_1.default, Object.assign({}, this.props));
          }
      };
      SpinnerRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)spinner$/,
              name: 'spinner'
          })
      ], SpinnerRenderer);
      return SpinnerRenderer;
  })();
  exports.SpinnerRenderer = SpinnerRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3Bpbm5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvU3Bpbm5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDRFQUE0QztBQUM1Qyx3Q0FBbUQ7QUFDbkQsMERBQTBCO0FBUTFCO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZ0IsU0FBUSxlQUFLLENBQUMsU0FBdUI7UUFDaEUsTUFBTTtZQUNKLE9BQU8sOEJBQUMsaUJBQU8sb0JBQUssSUFBSSxDQUFDLEtBQUssRUFBSSxDQUFDO1FBQ3JDLENBQUM7S0FDRixDQUFBO0lBSlksZUFBZTtRQUozQixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGdCQUFnQjtZQUN0QixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO09BQ1csZUFBZSxDQUkzQjtJQUFELHNCQUFDO0tBQUE7QUFKWSwwQ0FBZSJ9

});
