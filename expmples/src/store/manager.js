amis.define('src/store/manager.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getStores = exports.getStoreById = exports.removeStore = exports.addStore = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const stores = {};
  function addStore(store) {
      if (stores[store.id]) {
          return stores[store.id];
      }
      stores[store.id] = store;
      // drawer dialog 不加进去，否则有些容器就不会自我销毁 store 了。
      if (store.parentId && !/(?:dialog|drawer)$/.test(store.path)) {
          const parent = stores[store.parentId];
          parent.addChildId(store.id);
      }
      cleanUp();
      return store;
  }
  exports.addStore = addStore;
  const toDelete = [];
  function removeStore(store) {
      const id = store.id;
      toDelete.push(id);
      store.dispose(cleanUp);
  }
  exports.removeStore = removeStore;
  function cleanUp() {
      let index = toDelete.length - 1;
      while (index >= 0) {
          const id = toDelete[index];
          const store = stores[id];
          if (store && !mobx_state_tree_1.isAlive(store)) {
              delete stores[id];
              toDelete.splice(index, 1);
          }
          else {
              index--;
          }
      }
  }
  function getStoreById(id) {
      return stores[id];
  }
  exports.getStoreById = getStoreById;
  function getStores() {
      return stores;
  }
  exports.getStores = getStores;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUF3QztBQUl4QyxNQUFNLE1BQU0sR0FFUixFQUFFLENBQUM7QUFFUCxTQUFnQixRQUFRLENBQUMsS0FBaUI7SUFDeEMsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3BCLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQztLQUN6QjtJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBRXpCLDRDQUE0QztJQUM1QyxJQUFJLEtBQUssQ0FBQyxRQUFRLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQzVELE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFvQixDQUFDO1FBQ3pELE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQzdCO0lBRUQsT0FBTyxFQUFFLENBQUM7SUFDVixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUM7QUFmRCw0QkFlQztBQUVELE1BQU0sUUFBUSxHQUFrQixFQUFFLENBQUM7QUFFbkMsU0FBZ0IsV0FBVyxDQUFDLEtBQWlCO0lBQzNDLE1BQU0sRUFBRSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUM7SUFDcEIsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNsQixLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3pCLENBQUM7QUFKRCxrQ0FJQztBQUVELFNBQVMsT0FBTztJQUNkLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO0lBQ2hDLE9BQU8sS0FBSyxJQUFJLENBQUMsRUFBRTtRQUNqQixNQUFNLEVBQUUsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDM0IsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRXpCLElBQUksS0FBSyxJQUFJLENBQUMseUJBQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM1QixPQUFPLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztZQUNsQixRQUFRLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQztTQUMzQjthQUFNO1lBQ0wsS0FBSyxFQUFFLENBQUM7U0FDVDtLQUNGO0FBQ0gsQ0FBQztBQUVELFNBQWdCLFlBQVksQ0FBQyxFQUFVO0lBQ3JDLE9BQU8sTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLFNBQVM7SUFDdkIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUZELDhCQUVDIn0=

});
