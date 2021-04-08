amis.define('src/store/combo.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ComboStore = exports.UniqueGroup = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  const form_1 = require("src/store/form.ts");
  const manager_1 = require("src/store/manager.ts");
  exports.UniqueGroup = mobx_state_tree_1.types
      .model('UniqueGroup', {
      name: mobx_state_tree_1.types.identifier,
      itemsRef: mobx_state_tree_1.types.array(mobx_state_tree_1.types.string)
  })
      .views(self => ({
      get items() {
          return self.itemsRef.map(id => manager_1.getStoreById(id));
      }
  }))
      .actions(self => ({
      removeItem(item) {
          self.itemsRef.replace(self.itemsRef.filter(id => id !== item.id));
      },
      addItem(item) {
          self.itemsRef.push(item.id);
      }
  }));
  exports.ComboStore = iRenderer_1.iRendererStore
      .named('ComboStore')
      .props({
      uniques: mobx_state_tree_1.types.map(exports.UniqueGroup),
      multiple: false,
      formsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.string), []),
      minLength: 0,
      maxLength: 0,
      length: 0,
      activeKey: 0
  })
      .views(self => {
      function getForms() {
          return self.formsRef.map(item => manager_1.getStoreById(item));
      }
      return {
          get forms() {
              return getForms();
          },
          get addable() {
              if (self.maxLength && self.length >= self.maxLength) {
                  return false;
              }
              if (self.uniques.size) {
                  let isFull = false;
                  self.uniques.forEach(item => {
                      if (isFull || !item.items.length) {
                          return;
                      }
                      let total = item.items[0].options.length;
                      let current = item.items.reduce((total, item) => {
                          return total + item.selectedOptions.length;
                      }, 0);
                      isFull = total && current >= total ? true : false;
                  });
                  if (isFull) {
                      return false;
                  }
              }
              return true;
          },
          get removable() {
              if (self.minLength && self.minLength >= self.length) {
                  return false;
              }
              return true;
          },
          /**
           * name 值有两种类型：
           * 1. 数字索引，出现在多条模式下，这个时候，需要返回当前索引下的form，并且用于下一层的遍历搜索
           * 2. 普通的表单项 name 值，出现在单条模式下，当前这层查找已经结束，所以要返回当前找到的items，而不能返回form
           *
           * @param name 查找的name
           */
          getItemsByName(name) {
              const forms = getForms();
              return self.multiple
                  ? [forms[parseInt(name, 10)]]
                  : forms[0].getItemsByName(name);
          }
      };
  })
      .actions(self => {
      function config(setting) {
          typeof setting.multiple !== 'undefined' &&
              (self.multiple = setting.multiple);
          typeof setting.minLength !== 'undefined' &&
              (self.minLength = parseInt(setting.minLength, 10));
          typeof setting.maxLength !== 'undefined' &&
              (self.maxLength = parseInt(setting.maxLength, 10));
          typeof setting.length !== 'undefined' && (self.length = setting.length);
      }
      function bindUniuqueItem(item) {
          if (!self.uniques.has(item.name)) {
              self.uniques.put({
                  name: item.name
              });
          }
          let group = self.uniques.get(item.name);
          group.addItem(item);
      }
      function unBindUniuqueItem(item) {
          let group = self.uniques.get(item.name);
          group.removeItem(item);
          if (!group.items.length) {
              self.uniques.delete(item.name);
          }
      }
      function addForm(form) {
          self.formsRef.push(form.id);
      }
      function onChildStoreDispose(child) {
          if (child.storeType === form_1.FormStore.name) {
              const idx = self.formsRef.indexOf(child.id);
              if (~idx) {
                  self.formsRef.splice(idx, 1);
                  child.items.forEach(item => {
                      if (item.unique) {
                          unBindUniuqueItem(item);
                      }
                  });
                  self.forms.forEach(item => item.items.forEach(item => item.unique && item.syncOptions()));
              }
          }
          self.removeChildId(child.id);
      }
      function setActiveKey(key) {
          self.activeKey = key;
      }
      return {
          config,
          setActiveKey,
          bindUniuqueItem,
          unBindUniuqueItem,
          addForm,
          onChildStoreDispose
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tYm8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvc3RvcmUvY29tYm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscURBQStFO0FBQy9FLDJDQUE0RDtBQUU1RCxpQ0FBNkQ7QUFDN0QsdUNBQXVDO0FBRTFCLFFBQUEsV0FBVyxHQUFHLHVCQUFLO0tBQzdCLEtBQUssQ0FBQyxhQUFhLEVBQUU7SUFDcEIsSUFBSSxFQUFFLHVCQUFLLENBQUMsVUFBVTtJQUN0QixRQUFRLEVBQUUsdUJBQUssQ0FBQyxLQUFLLENBQUMsdUJBQUssQ0FBQyxNQUFNLENBQUM7Q0FDcEMsQ0FBQztLQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDZCxJQUFJLEtBQUs7UUFDUCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUN0QixFQUFFLENBQUMsRUFBRSxDQUFFLHNCQUFZLENBQUMsRUFBRSxDQUEyQixDQUNsRCxDQUFDO0lBQ0osQ0FBQztDQUNGLENBQUMsQ0FBQztLQUNGLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDaEIsVUFBVSxDQUFDLElBQW9CO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxPQUFPLENBQUMsSUFBb0I7UUFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzlCLENBQUM7Q0FDRixDQUFDLENBQUMsQ0FBQztBQUlPLFFBQUEsVUFBVSxHQUFHLDBCQUFjO0tBQ3JDLEtBQUssQ0FBQyxZQUFZLENBQUM7S0FDbkIs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

});
