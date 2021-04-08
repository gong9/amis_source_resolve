amis.define('src/renderers/Form/UUID.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.UUIDControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  class UUIDControl extends react_1.default.Component {
      constructor(props) {
          super(props);
          let uuid = helper_1.uuidv4();
          if (props.length) {
              uuid = uuid.substring(0, props.length);
          }
          props.onChange(uuid);
      }
      render() {
          return null;
      }
  }
  exports.default = UUIDControl;
  let UUIDControlRenderer = /** @class */ (() => {
      let UUIDControlRenderer = class UUIDControlRenderer extends UUIDControl {
      };
      UUIDControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'uuid',
              wrap: false,
              sizeMutable: false
          })
      ], UUIDControlRenderer);
      return UUIDControlRenderer;
  })();
  exports.UUIDControlRenderer = UUIDControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVVVJRC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9VVUlELnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLCtDQUEwQztBQUMxQyxpQ0FBbUU7QUFjbkUsTUFBcUIsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUc5QztJQUNDLFlBQVksS0FBdUI7UUFDakMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ2IsSUFBSSxJQUFJLEdBQUcsZUFBTSxFQUFFLENBQUM7UUFDcEIsSUFBSSxLQUFLLENBQUMsTUFBTSxFQUFFO1lBQ2hCLElBQUksR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEM7UUFDRCxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0NBQ0Y7QUFoQkQsOEJBZ0JDO0FBT0Q7SUFBQSxJQUFhLG1CQUFtQixHQUFoQyxNQUFhLG1CQUFvQixTQUFRLFdBQVc7S0FBRyxDQUFBO0lBQTFDLG1CQUFtQjtRQUwvQixlQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsTUFBTTtZQUNaLElBQUksRUFBRSxLQUFLO1lBQ1gsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztPQUNXLG1CQUFtQixDQUF1QjtJQUFELDBCQUFDO0tBQUE7QUFBMUMsa0RBQW1CIn0=

});
