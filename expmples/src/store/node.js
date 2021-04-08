amis.define('src/store/node.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StoreNode = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const manager_1 = require("src/store/manager.ts");
  exports.StoreNode = mobx_state_tree_1.types
      .model('StoreNode', {
      id: mobx_state_tree_1.types.identifier,
      path: '',
      storeType: mobx_state_tree_1.types.string,
      disposed: false,
      parentId: '',
      childrenIds: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), [])
  })
      .views(self => {
      return {
          get parentStore() {
              return mobx_state_tree_1.isAlive(self) && self.parentId
                  ? manager_1.getStoreById(self.parentId)
                  : null;
          },
          get __() {
              return mobx_state_tree_1.getEnv(self).translate;
          }
      };
  })
      .actions(self => {
      function addChildId(id) {
          self.childrenIds.push(id);
      }
      function removeChildId(id) {
          const childrenIds = self.childrenIds.filter(item => item !== id);
          self.childrenIds.replace(childrenIds);
          self.disposed && dispose();
      }
      function dispose(callback) {
          var _a;
          // 先标记自己是要销毁的。
          self.disposed = true;
          if (/(?:dialog|drawer)$/.test(self.path)) {
              mobx_state_tree_1.destroy(self);
              callback === null || callback === void 0 ? void 0 : callback();
          }
          else if (!self.childrenIds.length) {
              const parent = self.parentStore;
              (_a = parent === null || parent === void 0 ? void 0 : parent.onChildStoreDispose) === null || _a === void 0 ? void 0 : _a.call(parent, self);
              mobx_state_tree_1.destroy(self);
              callback === null || callback === void 0 ? void 0 : callback();
              // destroy(self);
          }
      }
      return {
          onChildStoreDispose(child) {
              removeChildId(child.id);
          },
          syncProps(props, prevProps, list = Object.keys(props)) {
              const target = self;
              list.forEach(key => {
                  if (prevProps && props[key] === prevProps[key]) {
                      return;
                  }
                  const setter = `set${key
                      .substring(0, 1)
                      .toUpperCase()}${key.substring(1)}`;
                  if (typeof target[setter] === 'function') {
                      target[setter](props[key]);
                  }
                  else if (target.hasOwnProperty(key)) {
                      target[key] = props[key];
                  }
              });
          },
          dispose,
          addChildId,
          removeChildId
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9ub2RlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQVF5QjtBQUN6Qix1Q0FBdUM7QUFFMUIsUUFBQSxTQUFTLEdBQUcsdUJBQUs7S0FDM0IsS0FBSyxDQUFDLFdBQVcsRUFBRTtJQUNsQixFQUFFLEVBQUUsdUJBQUssQ0FBQyxVQUFVO0lBQ3BCLElBQUksRUFBRSxFQUFFO0lBQ1IsU0FBUyxFQUFFLHVCQUFLLENBQUMsTUFBTTtJQUN2QixRQUFRLEVBQUUsS0FBSztJQUNmLFFBQVEsRUFBRSxFQUFFO0lBQ1osV0FBVyxFQUFFLHVCQUFLLENBQUMsUUFBUSxDQUFDLHVCQUFLLENBQUMsS0FBSyxDQUFDLHVCQUFLLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxDQUFDO0NBQzNELENBQUM7S0FDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDWixPQUFPO1FBQ0wsSUFBSSxXQUFXO1lBQ2IsT0FBTyx5QkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRO2dCQUNuQyxDQUFDLENBQUMsc0JBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDO1FBQ1gsQ0FBQztRQUVELElBQUksRUFBRTtZQUNKLE9BQU8sd0JBQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUM7UUFDaEMsQ0FBQztLQUNGLENBQUM7QUFDSixDQUFDLENBQUM7S0FDRCxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDZCxTQUFTLFVBQVUsQ0FBQyxFQUFVO1FBQzVCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzVCLENBQUM7SUFFRCxTQUFTLGFBQWEsQ0FBQyxFQUFVO1FBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEVBQUUsQ0FBQyxDQUFDO1FBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBRXRDLElBQUksQ0FBQyxRQUFRLElBQUksT0FBTyxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVELFNBQVMsT0FBTyxDQUFDLFFBQXFCOztRQUNwQyxjQUFjO1FBQ2QsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7UUFFckIsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3hDLHlCQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDZCxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLEdBQUs7U0FDZDthQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRTtZQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO1lBQ2hDLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLG1CQUFtQiwrQ0FBM0IsTUFBTSxFQUF3QixJQUFJLEVBQUU7WUFDcEMseUJBQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNkLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsR0FBSztZQUNiLGlCQUFpQjtTQUNsQjtJQUNILENBQUM7SUFFRCxPQUFPO1FBQ0wsbUJBQW1CLENBQUMsS0FBVTtZQUM1QixhQUFhLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFCLENBQUM7UUFFRCxTQUFTLENBQ1AsS0FBVSxFQUNWLFNBQWMsRUFDZCxPQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV4QyxNQUFNLE1BQU0sR0FBUSxJQUFJLENBQUM7WUFDekIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDakIsSUFBSSxTQUFTLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTtvQkFDOUMsT0FBTztpQkFDUjtnQkFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUc7cUJBQ3JCLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDO3FCQUNmLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztnQkFFdEMsSUFBSSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsS0FBSyxVQUFVLEVBQUU7b0JBQ3hDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztpQkFDNUI7cUJBQU0sSUFBSSxNQUFNLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxFQUFFO29CQUNyQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUMxQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELE9BQU87UUFDUCxVQUFVO1FBQ1YsYUFBYTtLQUNkLENBQUM7QUFDSixDQUFDLENBQUMsQ0FBQyJ9

});
