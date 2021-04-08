amis.define('src/store/pagination.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PaginationStore = void 0;
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  exports.PaginationStore = iRenderer_1.iRendererStore
      .named('PaginationStore')
      .props({
      page: 1,
      perPage: 10,
      inputName: '',
      outputName: '',
      mode: 'normal'
  })
      .views(self => ({
      get inputItems() {
          const items = tpl_builtin_1.resolveVariable(self.inputName || 'items', self.data);
          if (!Array.isArray(items)) {
              return [];
          }
          return items;
      },
      get locals() {
          const skip = (self.page - 1) * self.perPage;
          return helper_1.createObject(self.data, {
              currentPage: self.page,
              lastPage: this.lastPage,
              [self.outputName || 'items']: this.inputItems.slice(skip, skip + self.perPage)
          });
      },
      get lastPage() {
          return Math.ceil(this.inputItems.length / self.perPage);
      }
  }))
      .actions(self => ({
      switchTo(page, perPage) {
          self.page = page;
          if (typeof perPage === 'number') {
              self.perPage = perPage;
          }
      }
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9wYWdpbmF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLDRDQUE2QztBQUM3QyxzREFBcUQ7QUFDckQsMkNBQTJDO0FBRTlCLFFBQUEsZUFBZSxHQUFHLDBCQUFjO0tBQzFDLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQztLQUN4QixLQUFLLENBQUM7SUFDTCxJQUFJLEVBQUUsQ0FBQztJQUNQLE9BQU8sRUFBRSxFQUFFO0lBQ1gsU0FBUyxFQUFFLEVBQUU7SUFDYixVQUFVLEVBQUUsRUFBRTtJQUNkLElBQUksRUFBRSxRQUFRO0NBQ2YsQ0FBQztLQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxJQUFJLFVBQVU7UUFDWixNQUFNLEtBQUssR0FBRyw2QkFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVwRSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUN6QixPQUFPLEVBQUUsQ0FBQztTQUNYO1FBRUQsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsTUFBTSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUM7UUFFNUMsT0FBTyxxQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDN0IsV0FBVyxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ3RCLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN2QixDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQ2pELElBQUksRUFDSixJQUFJLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FDcEI7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0QsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0NBQ0YsQ0FBQyxDQUFDO0tBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixRQUFRLENBQUMsSUFBWSxFQUFFLE9BQWdCO1FBQ3JDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxFQUFFO1lBQy9CLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1NBQ3hCO0lBQ0gsQ0FBQztDQUNGLENBQUMsQ0FBQyxDQUFDIn0=

});
