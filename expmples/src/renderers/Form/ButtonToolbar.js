amis.define('src/renderers/Form/ButtonToolbar.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ButtonToolbarRenderer = exports.ButtonToolbarControl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  let ButtonToolbarControl = /** @class */ (() => {
      class ButtonToolbarControl extends react_1.default.Component {
          renderButtons() {
              const { render, classPrefix: ns, buttons } = this.props;
              return Array.isArray(buttons)
                  ? buttons.map((button, key) => render(`button/${key}`, button, {
                      key: key
                  }))
                  : null;
          }
          render() {
              const { render, className, classPrefix: ns, buttons } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}ButtonToolbar`, className) }, this.renderButtons()));
          }
      }
      ButtonToolbarControl.defaultProps = {};
      return ButtonToolbarControl;
  })();
  exports.ButtonToolbarControl = ButtonToolbarControl;
  let ButtonToolbarRenderer = /** @class */ (() => {
      let ButtonToolbarRenderer = class ButtonToolbarRenderer extends ButtonToolbarControl {
      };
      ButtonToolbarRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'button-toolbar',
              sizeMutable: false,
              strictMode: false // data 变化也更新
          })
      ], ButtonToolbarRenderer);
      return ButtonToolbarRenderer;
  })();
  exports.ButtonToolbarRenderer = ButtonToolbarRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uVG9vbGJhci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9CdXR0b25Ub29sYmFyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUNuRSxvRUFBNEI7QUFxQjVCO0lBQUEsTUFBYSxvQkFBcUIsU0FBUSxlQUFLLENBQUMsU0FBNkI7UUFHM0UsYUFBYTtZQUNYLE1BQU0sRUFBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3RELE9BQU8sS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUM7Z0JBQzNCLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQzFCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsRUFBRSxFQUFFLE1BQU0sRUFBRTtvQkFDOUIsR0FBRyxFQUFFLEdBQUc7aUJBQ1QsQ0FBQyxDQUNIO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDWCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFBQyxNQUFNLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVqRSxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLG9CQUFFLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRSxTQUFTLENBQUMsSUFDaEQsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUNqQixDQUNQLENBQUM7UUFDSixDQUFDOztJQXJCTSxpQ0FBWSxHQUFHLEVBQUUsQ0FBQztJQXNCM0IsMkJBQUM7S0FBQTtBQXZCWSxvREFBb0I7QUE4QmpDO0lBQUEsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxvQkFBb0I7S0FBRyxDQUFBO0lBQXJELHFCQUFxQjtRQUxqQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxLQUFLLENBQUMsYUFBYTtTQUNoQyxDQUFDO09BQ1cscUJBQXFCLENBQWdDO0lBQUQsNEJBQUM7S0FBQTtBQUFyRCxzREFBcUIifQ==

});
