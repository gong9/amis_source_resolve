amis.define('src/renderers/SparkLine.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SparkLineRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const SparkLine_1 = tslib_1.__importDefault(require("src/components/SparkLine.tsx"));
  const factory_1 = require("src/factory.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  let SparkLineRenderer = /** @class */ (() => {
      var _a;
      let SparkLineRenderer = class SparkLineRenderer extends react_1.default.Component {
          handleClick(e, ctx) {
              const { disabled, onAction, clickAction, data } = this.props;
              if (e.defaultPrevented || !clickAction || disabled) {
                  return;
              }
              onAction === null || onAction === void 0 ? void 0 : onAction(null, clickAction, ctx ? helper_1.createObject(data, ctx) : data);
          }
          render() {
              const { value, name, data, clickAction } = this.props;
              const finalValue = value !== null && value !== void 0 ? value : (name ? tpl_builtin_1.resolveVariableAndFilter(name, data) : [1, 1]);
              return (react_1.default.createElement(SparkLine_1.default, Object.assign({ onClick: clickAction ? this.handleClick : undefined }, this.props, { value: finalValue })));
          }
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], SparkLineRenderer.prototype, "handleClick", null);
      SparkLineRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)sparkline$/,
              name: 'sparkline'
          })
      ], SparkLineRenderer);
      return SparkLineRenderer;
  })();
  exports.SparkLineRenderer = SparkLineRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3BhcmtMaW5lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9TcGFya0xpbmUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxnRkFBa0U7QUFDbEUsd0NBQW1EO0FBQ25ELDBEQUEwQjtBQUMxQixzREFBOEQ7QUFHOUQsNENBQXVEO0FBMkV2RDs7SUFBQSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLGVBQUssQ0FBQyxTQUE2QjtRQUV4RSxXQUFXLENBQUMsQ0FBbUIsRUFBRSxHQUFRO1lBQ3ZDLE1BQU0sRUFBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNELElBQUksQ0FBQyxDQUFDLGdCQUFnQixJQUFJLENBQUMsV0FBVyxJQUFJLFFBQVEsRUFBRTtnQkFDbEQsT0FBTzthQUNSO1lBRUQsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFHLElBQUksRUFBRSxXQUFXLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxxQkFBWSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFO1FBQ3RFLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEQsTUFBTSxVQUFVLEdBQ2QsS0FBSyxhQUFMLEtBQUssY0FBTCxLQUFLLEdBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLHNDQUF3QixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVsRSxPQUFPLENBQ0wsOEJBQUMsbUJBQVMsa0JBQ1IsT0FBTyxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsU0FBUyxJQUMvQyxJQUFJLENBQUMsS0FBSyxJQUNkLEtBQUssRUFBRSxVQUFVLElBQ2pCLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFBO0lBdkJDO1FBREMsaUJBQVE7O3FFQUNNLGVBQUssb0JBQUwsZUFBSyxDQUFDLFVBQVU7O3dEQU85QjtJQVRVLGlCQUFpQjtRQUo3QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGtCQUFrQjtZQUN4QixJQUFJLEVBQUUsV0FBVztTQUNsQixDQUFDO09BQ1csaUJBQWlCLENBeUI3QjtJQUFELHdCQUFDO0tBQUE7QUF6QlksOENBQWlCIn0=

});
