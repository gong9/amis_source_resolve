amis.define('src/renderers/Form/ConditionBuilder.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ConditionBuilderRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const index_1 = tslib_1.__importDefault(require("src/components/condition-builder/index.tsx"));
  class ConditionBuilderControl extends react_1.default.PureComponent {
      render() {
          const _a = this.props, { className, classnames: cx } = _a, rest = tslib_1.__rest(_a, ["className", "classnames"]);
          return (react_1.default.createElement("div", { className: cx(`ConditionBuilderControl`, className) },
              react_1.default.createElement(index_1.default, Object.assign({}, rest))));
      }
  }
  exports.default = ConditionBuilderControl;
  let ConditionBuilderRenderer = /** @class */ (() => {
      let ConditionBuilderRenderer = class ConditionBuilderRenderer extends ConditionBuilderControl {
      };
      ConditionBuilderRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'condition-builder'
          })
      ], ConditionBuilderRenderer);
      return ConditionBuilderRenderer;
  })();
  exports.ConditionBuilderRenderer = ConditionBuilderRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uQnVpbGRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9Db25kaXRpb25CdWlsZGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUluRSw2RkFBd0U7QUFtQ3hFLE1BQXFCLHVCQUF3QixTQUFRLGVBQUssQ0FBQyxhQUFvQztJQUM3RixNQUFNO1FBQ0osTUFBTSxLQUF1QyxJQUFJLENBQUMsS0FBSyxFQUFqRCxFQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsRUFBRSxPQUF1QixFQUFsQixJQUFJLHNCQUFuQywyQkFBb0MsQ0FBYSxDQUFDO1FBRXhELE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLHlCQUF5QixFQUFFLFNBQVMsQ0FBQztZQUN0RCw4QkFBQyxlQUFnQixvQkFBSyxJQUFJLEVBQUksQ0FDMUIsQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBVkQsMENBVUM7QUFLRDtJQUFBLElBQWEsd0JBQXdCLEdBQXJDLE1BQWEsd0JBQXlCLFNBQVEsdUJBQXVCO0tBQUcsQ0FBQTtJQUEzRCx3QkFBd0I7UUFIcEMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtTQUMxQixDQUFDO09BQ1csd0JBQXdCLENBQW1DO0lBQUQsK0JBQUM7S0FBQTtBQUEzRCw0REFBd0IifQ==

});
