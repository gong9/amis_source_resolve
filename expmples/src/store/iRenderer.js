amis.define('src/store/iRenderer.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.iRendererStore = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const SimpleMap_1 = require("src/utils/SimpleMap.ts");
  const node_1 = require("src/store/node.ts");
  exports.iRendererStore = node_1.StoreNode.named('iRendererStore')
      .props({
      hasRemoteData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.boolean, false),
      data: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      initedAt: 0,
      updatedAt: 0,
      pristine: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), {}),
      action: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      dialogOpen: false,
      dialogData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      drawerOpen: false,
      drawerData: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined)
  })
      .actions(self => {
      const dialogCallbacks = new SimpleMap_1.SimpleMap();
      return {
          initData(data = {}, skipSetPristine = false) {
              self.initedAt = Date.now();
              !skipSetPristine && (self.pristine = data);
              self.data = data;
          },
          reset() {
              self.data = self.pristine;
          },
          updateData(data = {}, tag, replace) {
              const prev = self.data;
              let newData;
              if (tag) {
                  let proto = helper_1.createObject(self.data.__super || null, tag);
                  newData = helper_1.createObject(proto, Object.assign(Object.assign({}, (replace ? {} : self.data)), data));
              }
              else {
                  newData = helper_1.extendObject(self.data, data, !replace);
              }
              Object.defineProperty(newData, '__prev', {
                  value: Object.assign({}, prev),
                  enumerable: false,
                  configurable: false,
                  writable: false
              });
              self.data = newData;
          },
          setCurrentAction(action) {
              self.action = action;
          },
          openDialog(ctx, additonal, callback) {
              let proto = ctx.__super ? ctx.__super : self.data;
              if (additonal) {
                  proto = helper_1.createObject(proto, additonal);
              }
              const data = helper_1.createObject(proto, Object.assign({}, ctx));
              if (self.action.dialog && self.action.dialog.data) {
                  self.dialogData = tpl_builtin_1.dataMapping(self.action.dialog.data, data);
                  const clonedAction = Object.assign(Object.assign({}, self.action), { dialog: Object.assign({}, self.action.dialog) });
                  delete clonedAction.dialog.data;
                  self.action = clonedAction;
              }
              else {
                  self.dialogData = data;
              }
              self.dialogOpen = true;
              callback && dialogCallbacks.set(self.dialogData, callback);
          },
          closeDialog(result) {
              const callback = dialogCallbacks.get(self.dialogData);
              self.dialogOpen = false;
              if (callback) {
                  dialogCallbacks.delete(self.dialogData);
                  setTimeout(() => callback(result), 200);
              }
          },
          openDrawer(ctx, additonal, callback) {
              let proto = ctx.__super ? ctx.__super : self.data;
              if (additonal) {
                  proto = helper_1.createObject(proto, additonal);
              }
              const data = helper_1.createObject(proto, Object.assign({}, ctx));
              if (self.action.drawer.data) {
                  self.drawerData = tpl_builtin_1.dataMapping(self.action.drawer.data, data);
                  const clonedAction = Object.assign(Object.assign({}, self.action), { dialog: Object.assign({}, self.action.dialog) });
                  delete clonedAction.dialog.data;
                  self.action = clonedAction;
              }
              else {
                  self.drawerData = data;
              }
              self.drawerOpen = true;
              if (callback) {
                  dialogCallbacks.set(self.drawerData, callback);
              }
          },
          closeDrawer(result) {
              const callback = dialogCallbacks.get(self.drawerData);
              self.drawerOpen = false;
              if (callback) {
                  dialogCallbacks.delete(self.drawerData);
                  setTimeout(() => callback(result), 200);
              }
          }
      };
  });
  // export type SIRendererStore = typeof iRendererStore.SnapshotType;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaVJlbmRlcmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3N0b3JlL2lSZW5kZXJlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBNEQ7QUFDNUQsNENBQTJEO0FBQzNELHNEQUFpRDtBQUNqRCxrREFBNkM7QUFDN0MsaUNBQWlDO0FBRXBCLFFBQUEsY0FBYyxHQUFHLGdCQUFTLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDO0tBQzVELEtBQUssQ0FBQztJQUNMLGFBQWEsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUM7SUFDbkQsSUFBSSxFQUFFLHVCQUFLLENBQUMsUUFBUSxDQUFDLHVCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsRUFBRSxDQUFDO0lBQ3hDLFFBQVEsRUFBRSxDQUFDO0lBQ1gsU0FBUyxFQUFFLENBQUM7SUFDWixRQUFRLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUM7SUFDNUMsTUFBTSxFQUFFLHVCQUFLLENBQUMsUUFBUSxDQUFDLHVCQUFLLENBQUMsTUFBTSxFQUFFLEVBQUUsU0FBUyxDQUFDO0lBQ2pELFVBQVUsRUFBRSxLQUFLO0lBQ2pCLFVBQVUsRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQztJQUNyRCxVQUFVLEVBQUUsS0FBSztJQUNqQixVQUFVLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLENBQUM7Q0FDdEQsQ0FBQztLQUNELE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtJQUNkLE1BQU0sZUFBZSxHQUFHLElBQUkscUJBQVMsRUFBMEIsQ0FBQztJQUVoRSxPQUFP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

});
