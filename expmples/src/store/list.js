amis.define('src/store/list.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListStore = exports.Item = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const helper_1 = require("src/utils/helper.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  exports.Item = mobx_state_tree_1.types
      .model('Item', {
      id: mobx_state_tree_1.types.identifier,
      pristine: mobx_state_tree_1.types.frozen(),
      data: mobx_state_tree_1.types.frozen(),
      index: mobx_state_tree_1.types.number,
      newIndex: mobx_state_tree_1.types.number
  })
      .views(self => ({
      get checked() {
          return mobx_state_tree_1.getParent(self, 2).isSelected(self);
      },
      get modified() {
          if (!self.data) {
              return false;
          }
          return Object.keys(self.data).some(key => !isEqual_1.default(self.data[key], self.pristine[key]));
      },
      get moved() {
          return self.index !== self.newIndex;
      },
      get locals() {
          return helper_1.createObject(helper_1.extendObject(mobx_state_tree_1.getParent(self, 2).data, {
              index: self.index
          }), self.data);
      },
      get checkable() {
          const table = mobx_state_tree_1.getParent(self, 2);
          return table && table.itemCheckableOn
              ? tpl_1.evalExpression(table.itemCheckableOn, self.locals)
              : true;
      },
      get draggable() {
          const table = mobx_state_tree_1.getParent(self, 2);
          return table && table.itemDraggableOn
              ? tpl_1.evalExpression(table.itemDraggableOn, self.locals)
              : true;
      }
  }))
      .actions(self => ({
      toggle() {
          mobx_state_tree_1.getParent(self, 2).toggle(self);
      },
      change(values, savePristine) {
          self.data = helper_1.immutableExtends(self.data, values);
          savePristine && (self.pristine = self.data);
      },
      reset() {
          self.newIndex = self.index;
          self.data = self.pristine;
      }
  }));
  exports.ListStore = iRenderer_1.iRendererStore
      .named('ListStore')
      .props({
      items: mobx_state_tree_1.types.array(exports.Item),
      selectedItems: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(exports.Item)),
      primaryField: 'id',
      orderBy: '',
      orderDir: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.union(mobx_state_tree_1.types.literal('asc'), mobx_state_tree_1.types.literal('desc')), 'asc'),
      draggable: false,
      dragging: false,
      multiple: true,
      selectable: false,
      itemCheckableOn: '',
      itemDraggableOn: '',
      hideCheckToggler: false
  })
      .views(self => {
      function isSelected(item) {
          return !!~self.selectedItems.indexOf(item);
      }
      function getModifiedItems() {
          return self.items.filter(item => item.modified);
      }
      function getModified() {
          return getModifiedItems().length;
      }
      function getMovedItems() {
          return self.items.filter(item => item.moved);
      }
      function getMovied() {
          return getMovedItems().length;
      }
      return {
          get allChecked() {
              return !!(self.selectedItems.length ===
                  self.checkableItems.length &&
                  self.checkableItems.length);
          },
          get checkableItems() {
              return self.items.filter(item => item.checkable);
          },
          get unSelectedItems() {
              return self.items.filter(item => !item.checked);
          },
          isSelected,
          get modified() {
              return getModified();
          },
          get modifiedItems() {
              return getModifiedItems();
          },
          get moved() {
              return getMovied();
          },
          get movedItems() {
              return getMovedItems();
          }
      };
  })
      .actions(self => {
      function update(config) {
          config.selectable === void 0 || (self.selectable = config.selectable);
          config.draggable === void 0 || (self.draggable = config.draggable);
          config.multiple === void 0 || (self.multiple = config.multiple);
          config.hideCheckToggler === void 0 ||
              (self.hideCheckToggler = config.hideCheckToggler);
          if (typeof config.orderBy !== 'undefined') {
              setOrderByInfo(config.orderBy, config.orderDir === 'desc' ? 'desc' : 'asc');
          }
          config.itemCheckableOn === void 0 ||
              (self.itemCheckableOn = config.itemCheckableOn);
          config.itemDraggableOn === void 0 ||
              (self.itemDraggableOn = config.itemDraggableOn);
      }
      function initItems(items) {
          let arr = items.map((item, key) => {
              item = helper_1.isObject(item)
                  ? item
                  : {
                      item: item
                  };
              return {
                  // id: String((item as any)[self.primaryField] || key),
                  id: helper_1.guid(),
                  index: key,
                  newIndex: key,
                  pristine: item,
                  data: item,
                  modified: false
              };
          });
          self.selectedItems.clear();
          self.items.replace(arr);
          self.dragging = false;
      }
      function updateSelected(selected, valueField) {
          self.selectedItems.clear();
          self.items.forEach(item => {
              if (~selected.indexOf(item.pristine)) {
                  self.selectedItems.push(item);
              }
              else if (find_1.default(selected, a => a[valueField || 'value'] == item.pristine[valueField || 'value'])) {
                  self.selectedItems.push(item);
              }
          });
      }
      function toggleAll() {
          if (self.allChecked) {
              self.selectedItems.clear();
          }
          else {
              self.selectedItems.replace(self.checkableItems);
          }
      }
      function toggle(item) {
          if (!item.checkable) {
              return;
          }
          const idx = self.selectedItems.indexOf(item);
          if (self.multiple) {
              ~idx
                  ? self.selectedItems.splice(idx, 1)
                  : self.selectedItems.push(item);
          }
          else {
              ~idx
                  ? self.selectedItems.splice(idx, 1)
                  : self.selectedItems.replace([item]);
          }
      }
      function clear() {
          self.selectedItems.clear();
      }
      function setOrderByInfo(key, direction) {
          self.orderBy = key;
          self.orderDir = direction;
      }
      function reset() {
          self.items.forEach(item => item.reset());
          self.dragging = false;
      }
      function toggleDragging() {
          self.dragging = !self.dragging;
      }
      function stopDragging() {
          self.dragging = false;
      }
      function exchange(fromIndex, toIndex) {
          const item = self.items[fromIndex];
          item.newIndex = toIndex;
          const newItems = self.items.slice();
          newItems.splice(fromIndex, 1);
          newItems.splice(toIndex, 0, item);
          self.items.replace(newItems);
      }
      return {
          update,
          initItems,
          updateSelected,
          toggleAll,
          toggle,
          clear,
          setOrderByInfo,
          reset,
          toggleDragging,
          stopDragging,
          exchange
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9zdG9yZS9saXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxxREFReUI7QUFDekIsMkNBQTJDO0FBQzNDLHFFQUFxQztBQUNyQywrREFBK0I7QUFDL0IsNENBTXlCO0FBQ3pCLHNDQUE0QztBQUUvQixRQUFBLElBQUksR0FBRyx1QkFBSztLQUN0QixLQUFLLENBQUMsTUFBTSxFQUFFO0lBQ2IsRUFBRSxFQUFFLHVCQUFLLENBQUMsVUFBVTtJQUNwQixRQUFRLEVBQUUsdUJBQUssQ0FBQyxNQUFNLEVBQUU7SUFDeEIsSUFBSSxFQUFFLHVCQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3BCLEtBQUssRUFBRSx1QkFBSyxDQUFDLE1BQU07SUFDbkIsUUFBUSxFQUFFLHVCQUFLLENBQUMsTUFBTTtDQUN2QixDQUFDO0tBQ0QsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLElBQUksT0FBTztRQUNULE9BQVEsMkJBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFhLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBRUQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ2hDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUNwRCxDQUFDO0lBQ0osQ0FBQztJQUVELElBQUksS0FBSztRQUNQLE9BQU8sSUFBSSxDQUFD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

});
