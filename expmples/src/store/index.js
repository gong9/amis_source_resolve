amis.define('src/store/index.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RegisterStore = exports.IIRendererStore = exports.iRendererStore = exports.RendererStore = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  require("node_modules/setimmediate/setImmediate");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  Object.defineProperty(exports, "iRendererStore", { enumerable: true, get: function () { return iRenderer_1.iRendererStore; } });
  Object.defineProperty(exports, "IIRendererStore", { enumerable: true, get: function () { return iRenderer_1.IIRendererStore; } });
  const service_1 = require("src/store/service.ts");
  const combo_1 = require("src/store/combo.ts");
  const form_1 = require("src/store/form.ts");
  const crud_1 = require("src/store/crud.ts");
  const table_1 = require("src/store/table.ts");
  const list_1 = require("src/store/list.ts");
  const modal_1 = require("src/store/modal.ts");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const formItem_1 = require("src/store/formItem.ts");
  const manager_1 = require("src/store/manager.ts");
  const pagination_1 = require("src/store/pagination.ts");
  const app_1 = require("src/store/app.ts");
  const root_1 = require("src/store/root.ts");
  mobx_state_tree_1.setLivelynessChecking('development' === 'production' ? 'ignore' : 'error');
  const allowedStoreList = [
      service_1.ServiceStore,
      form_1.FormStore,
      combo_1.ComboStore,
      crud_1.CRUDStore,
      table_1.TableStore,
      list_1.ListStore,
      modal_1.ModalStore,
      formItem_1.FormItemStore,
      pagination_1.PaginationStore,
      app_1.AppStore
  ];
  exports.RendererStore = mobx_state_tree_1.types
      .model('RendererStore', {
      storeType: 'RendererStore'
  })
      .views(self => ({
      get fetcher() {
          return mobx_state_tree_1.getEnv(self).fetcher;
      },
      get notify() {
          return mobx_state_tree_1.getEnv(self).notify;
      },
      get isCancel() {
          return mobx_state_tree_1.getEnv(self).isCancel;
      },
      get __() {
          return mobx_state_tree_1.getEnv(self).translate;
      },
      getStoreById(id) {
          return manager_1.getStoreById(id);
      },
      get stores() {
          return manager_1.getStores();
      }
  }))
      .actions(self => ({
      addStore(store) {
          if (store.storeType === root_1.RootStore.name) {
              return manager_1.addStore(root_1.RootStore.create(store, mobx_state_tree_1.getEnv(self)));
          }
          const factory = find_1.default(allowedStoreList, item => item.name === store.storeType);
          return manager_1.addStore(factory.create(store, mobx_state_tree_1.getEnv(self)));
      },
      removeStore(store) {
          // store.dispose();
          manager_1.removeStore(store);
      }
  }));
  exports.RegisterStore = function (store) {
      allowedStoreList.push(store);
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvc3RvcmUvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQU95QjtBQUN6Qix3QkFBc0I7QUFDdEIsMkNBQTZFO0FBeUZyRSwrRkF6RkEsMEJBQWMsT0F5RkE7QUFBRSxnR0F6RkEsMkJBQWUsT0F5RkE7QUF4RnZDLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLGlDQUFpQztBQUNqQyxtQ0FBbUM7QUFDbkMsaUNBQWlDO0FBQ2pDLG1DQUFtQztBQUVuQywrREFBK0I7QUFFL0IseUNBQXlDO0FBQ3pDLHVDQUF5RTtBQUN6RSw2Q0FBNkM7QUFDN0MsK0JBQStCO0FBQy9CLGlDQUFpQztBQUVqQyx1Q0FBcUIsQ0FDbkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FDM0QsQ0FBQztBQUVGLE1BQU0sZ0JBQWdCLEdBQUc7SUFDdkIsc0JBQVk7SUFDWixnQkFBUztJQUNULGtCQUFVO0lBQ1YsZ0JBQVM7SUFDVCxrQkFBVTtJQUNWLGdCQUFTO0lBQ1Qsa0JBQVU7SUFDVix3QkFBYTtJQUNiLDRCQUFlO0lBQ2YsY0FBUTtDQUNULENBQUM7QUFFVyxRQUFBLGFBQWEsR0FBRyx1QkFBSztLQUMvQixLQUFLLENBQUMsZUFBZSxFQUFFO0lBQ3RCLFNBQVMsRUFBRSxlQUFlO0NBQzNCLENBQUM7S0FDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsSUFBSSxPQUFPO1FBQ1QsT0FBTyx3QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUM5QixDQUFDO0lBRUQsSUFBSSxNQUFNO1FBQ1IsT0FBTyx3QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyx3QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsQ0FBQztJQUMvQixDQUFDO0lBRUQsSUFBSSxFQUFFO1FBQ0osT0FBTyx3QkFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQztJQUNoQyxDQUFDO0lBQ0QsWUFBWSxDQUFDLEVBQVU7UUFDckIsT0FBTyxzQkFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFCLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLG1CQUFTLEVBQUUsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQyxDQUFDO0tBQ0YsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoQixRQUFRLENBQUMsS0FNUjtRQUNDLElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxnQkFBUyxDQUFDLElBQUksRUFBRTtZQUN0QyxPQUFPLGtCQUFRLENBQUMsZ0JBQVMsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLHdCQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBRUQsTUFBTSxPQUFPLEdBQUcsY0FBSSxDQUNsQixnQkFBZ0IsRUFDaEIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxTQUFTLENBQ3JDLENBQUM7UUFFSCxPQUFPLGtCQUFRLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFZLEVBQUUsd0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVELFdBQVcsQ0FBQyxLQUFpQjtRQUMzQixtQkFBbUI7UUFDbkIscUJBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyQixDQUFDO0NBQ0YsQ0FBQyxDQUFDLENBQUM7QUFJTyxRQUFBLGFBQWEsR0FBRyxVQUFVLEtBQVU7SUFDL0MsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEtBQVksQ0FBQyxDQUFDO0FBQ3RDLENBQUMsQ0FBQyJ9

});
