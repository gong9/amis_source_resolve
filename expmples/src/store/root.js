amis.define('src/store/root.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RootStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const helper_1 = require("src/utils/helper.ts");
  const service_1 = require("src/store/service.ts");
  exports.RootStore = service_1.ServiceStore.named('RootStore')
      .props({
      runtimeError: mobx_state_tree_1.types.frozen(),
      runtimeErrorStack: mobx_state_tree_1.types.frozen(),
      query: mobx_state_tree_1.types.frozen()
  })
      .views(self => ({
      get downStream() {
          return self.query
              ? helper_1.createObject(Object.assign(Object.assign(Object.assign({}, (self.data && self.data.__super ? self.data.__super : null)), self.query), { __query: self.query }), self.data)
              : self.data;
      }
  }))
      .actions(self => ({
      setRuntimeError(error, errorStack) {
          self.runtimeError = error;
          self.runtimeErrorStack = errorStack;
      },
      updateLocation(location) {
          const query = (location && location.query) ||
              (location &&
                  location.search &&
                  qs_1.default.parse(location.search.substring(1))) ||
              (window.location.search &&
                  qs_1.default.parse(window.location.search.substring(1)));
          self.query = query;
      }
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9yb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxREFBZ0Q7QUFDaEQsb0RBQW9CO0FBQ3BCLDRDQUE2QztBQUM3Qyx1Q0FBdUM7QUFFMUIsUUFBQSxTQUFTLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDO0tBQ3JELEtBQUssQ0FBQztJQUNMLFlBQVksRUFBRSx1QkFBSyxDQUFDLE1BQU0sRUFBRTtJQUM1QixpQkFBaUIsRUFBRSx1QkFBSyxDQUFDLE1BQU0sRUFBRTtJQUNqQyxLQUFLLEVBQUUsdUJBQUssQ0FBQyxNQUFNLEVBQUU7Q0FDdEIsQ0FBQztLQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxJQUFJLFVBQVU7UUFDWixPQUFPLElBQUksQ0FBQyxLQUFLO1lBQ2YsQ0FBQyxDQUFDLHFCQUFZLCtDQUVMLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUMzRCxJQUFJLENBQUMsS0FBSyxLQUNiLE9BQU8sRUFBRSxJQUFJLENBQUMsS0FBSyxLQUVyQixJQUFJLENBQUMsSUFBSSxDQUNWO1lBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDaEIsQ0FBQztDQUNGLENBQUMsQ0FBQztLQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsZUFBZSxDQUFDLEtBQVUsRUFBRSxVQUFlO1FBQ3pDLElBQUksQ0FBQyxZQUFZLEdBQUcsS0FBSyxDQUFDO1FBQzFCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxVQUFVLENBQUM7SUFDdEMsQ0FBQztJQUNELGNBQWMsQ0FBQyxRQUFjO1FBQzNCLE1BQU0sS0FBSyxHQUNULENBQUMsUUFBUSxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDNUIsQ0FBQyxRQUFRO2dCQUNQLFFBQVEsQ0FBQyxNQUFNO2dCQUNmLFlBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN6QyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTtnQkFDckIsWUFBRSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRW5ELElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Q0FDRixDQUFDLENBQUMsQ0FBQyJ9

});
