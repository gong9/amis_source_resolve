amis.define('src/renderers/Alert.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TplRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const factory_1 = require("src/factory.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Alert2_1 = tslib_1.__importDefault(require("src/components/Alert2.tsx"));
  let TplRenderer = /** @class */ (() => {
      let TplRenderer = class TplRenderer extends react_1.default.Component {
          render() {
              const _a = this.props, { render, body } = _a, rest = tslib_1.__rest(_a, ["render", "body"]);
              return react_1.default.createElement(Alert2_1.default, Object.assign({}, rest), render('body', body));
          }
      };
      TplRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)alert$/,
              name: 'alert'
          })
      ], TplRenderer);
      return TplRenderer;
  })();
  exports.TplRenderer = TplRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0FsZXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsd0NBQW1EO0FBQ25ELDBEQUEwQjtBQUMxQiwwRUFBdUQ7QUFpQ3ZEO0lBQUEsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUFxQztRQUMxRSxNQUFNO1lBQ0osTUFBTSxLQUEwQixJQUFJLENBQUMsS0FBSyxFQUFwQyxFQUFDLE1BQU0sRUFBRSxJQUFJLE9BQXVCLEVBQWxCLElBQUksc0JBQXRCLGtCQUF1QixDQUFhLENBQUM7WUFDM0MsT0FBTyw4QkFBQyxnQkFBSyxvQkFBSyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBUyxDQUFDO1FBQ3pELENBQUM7S0FDRixDQUFBO0lBTFksV0FBVztRQUp2QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGNBQWM7WUFDcEIsSUFBSSxFQUFFLE9BQU87U0FDZCxDQUFDO09BQ1csV0FBVyxDQUt2QjtJQUFELGtCQUFDO0tBQUE7QUFMWSxrQ0FBVyJ9

});
