amis.define('src/renderers/ButtonGroup.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ButtonGroupRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const ButtonGroup_1 = tslib_1.__importDefault(require("src/renderers/Form/ButtonGroup.tsx"));
  const factory_1 = require("src/factory.tsx");
  exports.default = ButtonGroup_1.default;
  let ButtonGroupRenderer = /** @class */ (() => {
      let ButtonGroupRenderer = class ButtonGroupRenderer extends ButtonGroup_1.default {
      };
      ButtonGroupRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:button|action)\-group$/,
              name: 'button-group'
          })
      ], ButtonGroupRenderer);
      return ButtonGroupRenderer;
  })();
  exports.ButtonGroupRenderer = ButtonGroupRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0J1dHRvbkdyb3VwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsNkVBQTZDO0FBQzdDLHdDQUFvQztBQXNFcEMsa0JBQWUscUJBQVcsQ0FBQztBQU0zQjtJQUFBLElBQWEsbUJBQW1CLEdBQWhDLE1BQWEsbUJBQW9CLFNBQVEscUJBQVc7S0FBRyxDQUFBO0lBQTFDLG1CQUFtQjtRQUovQixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGlDQUFpQztZQUN2QyxJQUFJLEVBQUUsY0FBYztTQUNyQixDQUFDO09BQ1csbUJBQW1CLENBQXVCO0lBQUQsMEJBQUM7S0FBQTtBQUExQyxrREFBbUIifQ==

});
