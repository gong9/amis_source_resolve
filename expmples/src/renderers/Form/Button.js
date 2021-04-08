amis.define('src/renderers/Form/Button.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ResetControlRenderer = exports.SubmitControlRenderer = exports.ButtonControlRenderer = exports.ButtonControl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  let ButtonControl = /** @class */ (() => {
      class ButtonControl extends react_1.default.Component {
          render() {
              const _a = this.props, { render, type, children, data } = _a, rest = tslib_1.__rest(_a, ["render", "type", "children", "data"]);
              return render('action', Object.assign(Object.assign({}, rest), { type }));
          }
      }
      ButtonControl.defaultProps = {};
      return ButtonControl;
  })();
  exports.ButtonControl = ButtonControl;
  let ButtonControlRenderer = /** @class */ (() => {
      let ButtonControlRenderer = class ButtonControlRenderer extends ButtonControl {
      };
      ButtonControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'button',
              renderLabel: false,
              strictMode: false,
              sizeMutable: false
          })
      ], ButtonControlRenderer);
      return ButtonControlRenderer;
  })();
  exports.ButtonControlRenderer = ButtonControlRenderer;
  let SubmitControlRenderer = /** @class */ (() => {
      let SubmitControlRenderer = class SubmitControlRenderer extends ButtonControl {
      };
      SubmitControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'submit',
              renderLabel: false,
              sizeMutable: false,
              strictMode: false
          })
      ], SubmitControlRenderer);
      return SubmitControlRenderer;
  })();
  exports.SubmitControlRenderer = SubmitControlRenderer;
  let ResetControlRenderer = /** @class */ (() => {
      let ResetControlRenderer = class ResetControlRenderer extends ButtonControl {
      };
      ResetControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'reset',
              renderLabel: false,
              strictMode: false,
              sizeMutable: false
          })
      ], ResetControlRenderer);
      return ResetControlRenderer;
  })();
  exports.ResetControlRenderer = ResetControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0J1dHRvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFlbkU7SUFBQSxNQUFhLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBMkI7UUFFbEUsTUFBTTtZQUNKLE1BQU0sS0FBMEMsSUFBSSxDQUFDLEtBQUssRUFBcEQsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxJQUFJLE9BQXVCLEVBQWxCLElBQUksc0JBQXRDLHNDQUF1QyxDQUFhLENBQUM7WUFFM0QsT0FBTyxNQUFNLENBQUMsUUFBUSxrQ0FDakIsSUFBSSxLQUNQLElBQUksSUFDVyxDQUFDO1FBQ3BCLENBQUM7O0lBUk0sMEJBQVksR0FBeUIsRUFBRSxDQUFDO0lBU2pELG9CQUFDO0tBQUE7QUFWWSxzQ0FBYTtBQWtCMUI7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FBRyxDQUFBO0lBQTlDLHFCQUFxQjtRQU5qQyxlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsUUFBUTtZQUNkLFdBQVcsRUFBRSxLQUFLO1lBQ2xCLFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFdBQVcsRUFBRSxLQUFLO1NBQ25CLENBQUM7T0FDVyxxQkFBcUIsQ0FBeUI7SUFBRCw0QkFBQztLQUFBO0FBQTlDLHNEQUFxQjtBQVFsQztJQUFBLElBQWEscUJBQXFCLEdBQWxDLE1BQWEscUJBQXNCLFNBQVEsYUFBYTtLQUFHLENBQUE7SUFBOUMscUJBQXFCO1FBTmpDLGVBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxRQUFRO1lBQ2QsV0FBVyxFQUFFLEtBQUs7WUFDbEIsV0FBVyxFQUFFLEtBQUs7WUFDbEIsVUFBVSxFQUFFLEtBQUs7U0FDbEIsQ0FBQztPQUNXLHFCQUFxQixDQUF5QjtJQUFELDRCQUFDO0tBQUE7QUFBOUMsc0RBQXFCO0FBUWxDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxhQUFhO0tBQUcsQ0FBQTtJQUE3QyxvQkFBb0I7UUFOaEMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLE9BQU87WUFDYixXQUFXLEVBQUUsS0FBSztZQUNsQixVQUFVLEVBQUUsS0FBSztZQUNqQixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO09BQ1csb0JBQW9CLENBQXlCO0lBQUQsMkJBQUM7S0FBQTtBQUE3QyxvREFBb0IifQ==

});
