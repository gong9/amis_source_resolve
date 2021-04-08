amis.define('src/store/table.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableStore = exports.Row = exports.Column = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const iRenderer_1 = require("src/store/iRenderer.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const helper_1 = require("src/utils/helper.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const manager_1 = require("src/store/manager.ts");
  exports.Column = mobx_state_tree_1.types
      .model('Column', {
      label: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      type: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.string, 'plain'),
      name: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.string),
      value: mobx_state_tree_1.types.frozen(),
      groupName: '',
      toggled: false,
      toggable: true,
      expandable: false,
      checkdisable: false,
      isPrimary: false,
      searchable: mobx_state_tree_1.types.maybe(mobx_state_tree_1.types.frozen()),
      sortable: false,
      filterable: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      fixed: '',
      index: 0,
      rawIndex: 0,
      breakpoint: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      pristine: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      remark: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.frozen(), undefined),
      className: ''
  })
      .actions(self => ({
      toggleToggle() {
          self.toggled = !self.toggled;
          const table = mobx_state_tree_1.getParent(self, 2);
          if (!table.activeToggaleColumns.length) {
              self.toggled = true;
          }
          table.persistSaveToggledColumns();
      },
      setToggled(value) {
          self.toggled = value;
      }
  }));
  exports.Row = mobx_state_tree_1.types
      .model('Row', {
      id: mobx_state_tree_1.types.identifier,
      parentId: '',
      key: mobx_state_tree_1.types.string,
      pristine: mobx_state_tree_1.types.frozen({}),
      data: mobx_state_tree_1.types.frozen({}),
      rowSpans: mobx_state_tree_1.types.frozen({}),
      index: mobx_state_tree_1.types.number,
      newIndex: mobx_state_tree_1.types.number,
      expandable: false,
      checkdisable: false,
      isHover: false,
      children: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.late(() => exports.Row)), []),
      depth: mobx_state_tree_1.types.number // 当前children位于第几层，便于使用getParent获取最顶层TableStore
  })
      .views(self => ({
      get checked() {
          return mobx_state_tree_1.getParent(self, self.depth * 2).isSelected(self);
      },
      get modified() {
          if (!self.data) {
              return false;
          }
          return Object.keys(self.data).some(key => !isEqual_1.default(self.data[key], self.pristine[key]));
      },
      getDataWithModifiedChilden() {
          let data = Object.assign({}, self.data);
          if (data.children && self.children) {
              data.children = self.children.map(item => item.getDataWithModifiedChilden());
          }
          return data;
      },
      get collapsed() {
          const table = mobx_state_tree_1.getParent(self, self.depth * 2);
          if (table.dragging) {
              return true;
          }
          let from = self;
          while (from && from !== table) {
              if (!table.isExpanded(from)) {
                  return true;
              }
              from = mobx_state_tree_1.getParent(from, 2);
          }
          return false;
      },
      get expanded() {
          return !this.collapsed;
      },
      get moved() {
          return self.index !== self.newIndex;
      },
      get locals() {
          return helper_1.createObject(helper_1.extendObject(mobx_state_tree_1.getParent(self, self.depth * 2).data, {
              index: self.index
          }), self.data);
      },
      get checkable() {
          const table = mobx_state_tree_1.getParent(self, self.depth * 2);
          return table && table.itemCheckableOn
              ? tpl_1.evalExpression(table.itemCheckableOn, self.locals)
              : true;
      },
      get draggable() {
          const table = mobx_state_tree_1.getParent(self, self.depth * 2);
          return table && table.itemDraggableOn
              ? tpl_1.evalExpression(table.itemDraggableOn, self.locals)
              : true;
      }
  }))
      .actions(self => ({
      toggle() {
          mobx_state_tree_1.getParent(self, self.depth * 2).toggle(self);
      },
      toggleExpanded() {
          mobx_state_tree_1.getParent(self, self.depth * 2).toggleExpanded(self);
      },
      change(values, savePristine) {
          self.data = helper_1.immutableExtends(self.data, values);
          savePristine && (self.pristine = self.data);
      },
      reset() {
          self.newIndex = self.index;
          self.data = self.pristine;
      },
      setCheckdisable(bool) {
          self.checkdisable = bool;
      },
      setIsHover(value) {
          self.isHover = value;
      },
      replaceWith(data) {
          Object.keys(data).forEach(key => {
              if (key !== 'id') {
                  self[key] = data[key];
              }
          });
          if (Array.isArray(data.children)) {
              const arr = data.children;
              const pool = arr.concat();
              // 把多的删了先
              if (self.children.length > arr.length) {
                  self.children.splice(arr.length, self.children.length - arr.length);
              }
              let index = 0;
              const len = self.children.length;
              while (pool.length) {
                  const item = pool.shift();
                  if (index < len) {
                      self.children[index].replaceWith(item);
                  }
                  else {
                      const row = exports.Row.create(item);
                      self.children.push(row);
                  }
                  index++;
              }
          }
      }
  }));
  exports.TableStore = iRenderer_1.iRendererStore
      .named('TableStore')
      .props({
      columns: mobx_state_tree_1.types.array(exports.Column),
      rows: mobx_state_tree_1.types.array(exports.Row),
      selectedRows: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(exports.Row)),
      expandedRows: mobx_state_tree_1.types.array(mobx_state_tree_1.types.reference(exports.Row)),
      primaryField: 'id',
      orderBy: '',
      orderDir: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.union(mobx_state_tree_1.types.literal('asc'), mobx_state_tree_1.types.literal('desc')), 'asc'),
      draggable: false,
      dragging: false,
      selectable: false,
      multiple: true,
      footable: mobx_state_tree_1.types.frozen(),
      expandConfig: mobx_state_tree_1.types.frozen(),
      isNested: false,
      columnsTogglable: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.union(mobx_state_tree_1.types.boolean, mobx_state_tree_1.types.literal('auto')), 'auto'),
      itemCheckableOn: '',
      itemDraggableOn: '',
      hideCheckToggler: false,
      combineNum: 0,
      formsRef: mobx_state_tree_1.types.optional(mobx_state_tree_1.types.array(mobx_state_tree_1.types.frozen()), []),
      maxKeepItemSelectionLength: 0,
      keepItemSelectionOnPageChange: false
  })
      .views(self => {
      function getForms() {
          return self.formsRef.map(item => ({
              store: manager_1.getStoreById(item.id),
              rowIndex: item.rowIndex
          }));
      }
      function getFilteredColumns() {
          return self.columns.filter(item => item &&
              helper_1.isVisible(item.pristine, helper_1.hasVisibleExpression(item.pristine) ? self.data : {}) &&
              (item.type === '__checkme'
                  ? self.selectable &&
                      !self.dragging &&
                      !self.hideCheckToggler &&
                      self.rows.length
                  : item.type === '__dragme'
                      ? self.dragging
                      : item.type === '__expandme'
                          ? (getFootableColumns().length || self.isNested) && !self.dragging
                          : (item.toggled || !item.toggable) &&
                              (!self.footable ||
                                  !item.breakpoint ||
                                  !helper_1.isBreakpoint(item.breakpoint))));
      }
      function getFootableColumns() {
          return self.columns.filter(item => item.type === '__checkme' ||
              item.type === '__dragme' ||
              item.type === '__expandme'
              ? false
              : (item.toggled || !item.toggable) &&
                  self.footable &&
                  item.breakpoint &&
                  helper_1.isBreakpoint(item.breakpoint));
      }
      function getLeftFixedColumns() {
          if (self.dragging) {
              return [];
          }
          let columns = getFilteredColumns().filter(item => item.fixed === 'left');
          // 有才带过去，没有就不带了
          if (columns.length) {
              columns = getFilteredColumns().filter(item => item.fixed === 'left' || /^__/.test(item.type));
          }
          return columns;
      }
      function getRightFixedColumns() {
          if (self.dragging) {
              return [];
          }
          return getFilteredColumns().filter(item => item.fixed === 'right');
      }
      function isSelected(row) {
          return !!~self.selectedRows.indexOf(row);
      }
      function isExpanded(row) {
          return !!~self.expandedRows.indexOf(row);
      }
      function getTogglable() {
          if (self.columnsTogglable === 'auto') {
              return self.columns.filter(item => !/^__/.test(item.type)).length > 5;
          }
          return self.columnsTogglable;
      }
      function getToggableColumns() {
          return self.columns.filter(item => helper_1.isVisible(item.pristine, self.data) && item.toggable !== false);
      }
      function getActiveToggableColumns() {
          return getToggableColumns().filter(item => item.toggled);
      }
      function getModifiedRows(rows = [], modifiedRows = []) {
          rows = rows && rows.length ? rows : self.rows;
          rows.forEach((item) => {
              if (item.children && item.children.length) {
                  getModifiedRows(item.children, modifiedRows);
              }
              let diff = helper_1.difference(item.data, item.pristine);
              let hasDifference = Object.keys(diff).length;
              if (hasDifference) {
                  modifiedRows.push(item);
              }
          });
          return modifiedRows;
      }
      function getModified() {
          return getModifiedRows().length;
      }
      function getMovedRows() {
          return helper_1.flattenTree(self.rows).filter((item) => item.moved);
      }
      function getMoved() {
          return getMovedRows().length;
      }
      function getHoverIndex() {
          return self.rows.findIndex(item => item.isHover);
      }
      function getUnSelectedRows() {
          return self.rows.filter(item => !item.checked);
      }
      function getData(superData) {
          return helper_1.createObject(superData, {
              items: self.rows.map(item => item.data),
              selectedItems: self.selectedRows.map(item => item.data),
              unSelectedItems: getUnSelectedRows().map(item => item.data)
          });
      }
      function getColumnGroup() {
          const columsn = getFilteredColumns();
          const len = columsn.length;
          if (!len) {
              return [];
          }
          const result = [
              {
                  label: columsn[0].groupName,
                  colSpan: 1,
                  index: columsn[0].index,
                  has: [columsn[0]]
              }
          ];
          //  如果是勾选栏，让它和下一列合并。
          if (columsn[0].type === '__checkme' && columsn[1]) {
              result[0].label = columsn[1].groupName;
          }
          for (let i = 1; i < len; i++) {
              let prev = result[result.length - 1];
              const current = columsn[i];
              if (current.groupName === prev.label) {
                  prev.colSpan++;
                  prev.has.push(current);
              }
              else {
                  result.push({
                      label: current.groupName,
                      colSpan: 1,
                      index: current.index,
                      has: [current]
                  });
              }
          }
          if (result.length === 1 && !result[0].label) {
              result.pop();
          }
          return result;
      }
      return {
          get forms() {
              return getForms();
          },
          get filteredColumns() {
              return getFilteredColumns();
          },
          get footableColumns() {
              return getFootableColumns();
          },
          get leftFixedColumns() {
              return getLeftFixedColumns();
          },
          get rightFixedColumns() {
              return getRightFixedColumns();
          },
          get toggableColumns() {
              return getToggableColumns();
          },
          get activeToggaleColumns() {
              return getActiveToggableColumns();
          },
          get someChecked() {
              return !!self.selectedRows.length;
          },
          get allChecked() {
              return !!(self.selectedRows.length ===
                  self.checkableRows.length &&
                  self.checkableRows.length);
          },
          isSelected,
          get allExpanded() {
              return !!(self.expandedRows.length === self.rows.length && self.rows.length);
          },
          isExpanded,
          get toggable() {
              return getTogglable();
          },
          get modified() {
              return getModified();
          },
          get modifiedRows() {
              return getModifiedRows();
          },
          get unSelectedRows() {
              return getUnSelectedRows();
          },
          get checkableRows() {
              return self.rows.filter(item => item.checkable);
          },
          get moved() {
              return getMoved();
          },
          get movedRows() {
              return getMovedRows();
          },
          get hoverIndex() {
              return getHoverIndex();
          },
          get disabledHeadCheckbox() {
              var _a;
              const selectedLength = (_a = self.data) === null || _a === void 0 ? void 0 : _a.selectedItems.length;
              const maxLength = self.maxKeepItemSelectionLength;
              if (!self.data || !self.keepItemSelectionOnPageChange || !maxLength) {
                  return false;
              }
              return maxLength === selectedLength;
          },
          getData,
          get columnGroup() {
              return getColumnGroup();
          },
          getRowById(id) {
              return helper_1.findTree(self.rows, item => item.id === id);
          },
          getItemsByName(name) {
              return this.forms
                  .filter(form => form.rowIndex === parseInt(name, 10))
                  .map(item => item.store);
          }
      };
  })
      .actions(self => {
      function update(config) {
          config.primaryField !== void 0 &&
              (self.primaryField = config.primaryField);
          config.selectable !== void 0 && (self.selectable = config.selectable);
          config.columnsTogglable !== void 0 &&
              (self.columnsTogglable = config.columnsTogglable);
          config.draggable !== void 0 && (self.draggable = config.draggable);
          if (typeof config.orderBy === 'string') {
              setOrderByInfo(config.orderBy, config.orderDir === 'desc' ? 'desc' : 'asc');
          }
          config.multiple !== void 0 && (self.multiple = config.multiple);
          config.footable !== void 0 && (self.footable = config.footable);
          config.expandConfig !== void 0 &&
              (self.expandConfig = config.expandConfig);
          config.itemCheckableOn !== void 0 &&
              (self.itemCheckableOn = config.itemCheckableOn);
          config.itemDraggableOn !== void 0 &&
              (self.itemDraggableOn = config.itemDraggableOn);
          config.hideCheckToggler !== void 0 &&
              (self.hideCheckToggler = !!config.hideCheckToggler);
          config.combineNum !== void 0 &&
              (self.combineNum = parseInt(config.combineNum, 10) || 0);
          config.maxKeepItemSelectionLength !== void 0 &&
              (self.maxKeepItemSelectionLength = config.maxKeepItemSelectionLength);
          config.keepItemSelectionOnPageChange !== void 0 &&
              (self.keepItemSelectionOnPageChange = config.keepItemSelectionOnPageChange);
          if (config.columns && Array.isArray(config.columns)) {
              let columns = config.columns
                  .filter(column => column)
                  .concat();
              if (!columns.length) {
                  columns.push({
                      type: 'text',
                      label: '空'
                  });
              }
              columns.unshift({
                  type: '__expandme',
                  toggable: false,
                  className: 'Table-expandCell'
              });
              columns.unshift({
                  type: '__checkme',
                  fixed: 'left',
                  toggable: false,
                  className: 'Table-checkCell'
              });
              columns.unshift({
                  type: '__dragme',
                  toggable: false,
                  className: 'Table-dragCell'
              });
              columns = columns.map((item, index) => (Object.assign(Object.assign({}, item), { index, rawIndex: index - 3, type: item.type || 'plain', pristine: item, toggled: item.toggled !== false, breakpoint: item.breakpoint, isPrimary: index === 3 })));
              self.columns.replace(columns);
          }
      }
      function combineCell(arr, keys) {
          if (!keys.length || !arr.length) {
              return arr;
          }
          const key = keys.shift();
          let rowIndex = 0;
          let row = arr[rowIndex];
          row.rowSpans[key] = 1;
          let value = tpl_builtin_1.resolveVariable(key, row.data);
          for (let i = 1, len = arr.length; i < len; i++) {
              const current = arr[i];
              if (isEqual_1.default(tpl_builtin_1.resolveVariable(key, current.data), value)) {
                  row.rowSpans[key] += 1;
                  current.rowSpans[key] = 0;
              }
              else {
                  if (row.rowSpans[key] > 1) {
                      combineCell(arr.slice(rowIndex, i), keys.concat());
                  }
                  rowIndex = i;
                  row = current;
                  row.rowSpans[key] = 1;
                  value = tpl_builtin_1.resolveVariable(key, row.data);
              }
          }
          if (row.rowSpans[key] > 1 && keys.length) {
              combineCell(arr.slice(rowIndex, arr.length), keys.concat());
          }
          return arr;
      }
      function autoCombineCell(arr, columns, maxCount) {
          if (!columns.length || !maxCount || !arr.length) {
              return arr;
          }
          const keys = [];
          for (let i = 0; i < maxCount; i++) {
              const column = columns[i];
              // maxCount 可能比实际配置的 columns 还有多。
              if (!column) {
                  break;
              }
              if ('__' === column.type.substring(0, 2)) {
                  maxCount++;
                  continue;
              }
              const key = column.name;
              if (!key) {
                  break;
              }
              keys.push(key);
          }
          return combineCell(arr, keys);
      }
      function initChildren(children, depth, pindex, parentId) {
          depth += 1;
          return children.map((item, key) => {
              item = helper_1.isObject(item)
                  ? item
                  : {
                      item
                  };
              const id = helper_1.guid();
              return {
                  // id: String(item && (item as any)[self.primaryField] || `${pindex}-${depth}-${key}`),
                  id: id,
                  parentId,
                  key: String(`${pindex}-${depth}-${key}`),
                  depth: depth,
                  index: key,
                  newIndex: key,
                  pristine: item,
                  data: item,
                  rowSpans: {},
                  children: item && Array.isArray(item.children)
                      ? initChildren(item.children, depth, key, id)
                      : [],
                  expandable: !!((item && Array.isArray(item.children) && item.children.length) ||
                      (self.footable && self.footableColumns.length))
              };
          });
      }
      function initRows(rows, getEntryId) {
          self.selectedRows.clear();
          self.expandedRows.clear();
          let arr = rows.map((item, key) => {
              let id = getEntryId ? getEntryId(item, key) : helper_1.guid();
              return {
                  // id: getEntryId ? getEntryId(item, key) : String(item && (item as any)[self.primaryField] || `${key}-1-${key}`),
                  id: id,
                  key: String(`${key}-1-${key}`),
                  depth: 1,
                  index: key,
                  newIndex: key,
                  pristine: item,
                  data: item,
                  rowSpans: {},
                  children: item && Array.isArray(item.children)
                      ? initChildren(item.children, 1, key, id)
                      : [],
                  expandable: !!((item && Array.isArray(item.children) && item.children.length) ||
                      (self.footable && self.footableColumns.length))
              };
          });
          if (self.combineNum) {
              arr = autoCombineCell(arr, self.columns, self.combineNum);
          }
          replaceRow(arr);
          self.isNested = self.rows.some(item => item.children.length);
          const expand = self.footable && self.footable.expand;
          if (expand === 'first' ||
              (self.expandConfig && self.expandConfig.expand === 'first')) {
              self.rows.length && self.expandedRows.push(self.rows[0]);
          }
          else if ((expand === 'all' && !self.footable.accordion) ||
              (self.expandConfig &&
                  self.expandConfig.expand === 'all' &&
                  !self.expandConfig.accordion)) {
              self.expandedRows.replace(self.rows);
          }
          self.dragging = false;
      }
      // 尽可能的复用 row
      function replaceRow(arr) {
          const pool = arr.concat();
          // 把多的删了先
          if (self.rows.length > arr.length) {
              self.rows.splice(arr.length, self.rows.length - arr.length);
          }
          let index = 0;
          const len = self.rows.length;
          while (pool.length) {
              const item = pool.shift();
              if (index < len) {
                  self.rows[index].replaceWith(item);
              }
              else {
                  const row = exports.Row.create(item);
                  self.rows.push(row);
              }
              index++;
          }
      }
      function updateSelected(selected, valueField) {
          self.selectedRows.clear();
          self.rows.forEach(item => {
              if (~selected.indexOf(item.pristine)) {
                  self.selectedRows.push(item);
              }
              else if (find_1.default(selected, a => a[valueField || 'value'] &&
                  a[valueField || 'value'] == item.pristine[valueField || 'value'])) {
                  self.selectedRows.push(item);
              }
          });
          updateCheckDisable();
      }
      function toggleAll() {
          var _a;
          const maxLength = self.maxKeepItemSelectionLength;
          const keep = self.keepItemSelectionOnPageChange;
          if (self.allChecked) {
              self.selectedRows.clear();
          }
          else {
              const selectedItems = (_a = self.data) === null || _a === void 0 ? void 0 : _a.selectedItems;
              if (keep && maxLength && selectedItems && maxLength >= selectedItems.length) {
                  const restCheckableRows = self.checkableRows.filter(item => !item.checked);
                  const checkableRows = restCheckableRows.filter((item, i) => i < maxLength - selectedItems.length);
                  self.selectedRows.replace([...self.selectedRows, ...checkableRows]);
              }
              else {
                  self.selectedRows.replace(self.checkableRows);
              }
          }
      }
      function toggle(row) {
          if (!row.checkable) {
              return;
          }
          const idx = self.selectedRows.indexOf(row);
          if (self.multiple) {
              ~idx ? self.selectedRows.splice(idx, 1) : self.selectedRows.push(row);
          }
          else {
              ~idx
                  ? self.selectedRows.splice(idx, 1)
                  : self.selectedRows.replace([row]);
          }
      }
      function updateCheckDisable() {
          if (!self.data) {
              return;
          }
          const maxLength = self.maxKeepItemSelectionLength;
          const selectedItems = self.data.selectedItems;
          self.selectedRows.map(item => item.setCheckdisable(false));
          if (maxLength && maxLength <= selectedItems.length) {
              self.unSelectedRows.map(item => !item.checked && item.setCheckdisable(true));
          }
          else {
              self.unSelectedRows.map(item => item.checkdisable && item.setCheckdisable(false));
          }
      }
      function clear() {
          self.selectedRows.clear();
      }
      function toggleExpandAll() {
          if (self.allExpanded) {
              self.expandedRows.clear();
          }
          else {
              self.expandedRows.replace(self.rows);
          }
      }
      function toggleExpanded(row) {
          const idx = self.expandedRows.indexOf(row);
          if (~idx) {
              self.expandedRows.splice(idx, 1);
          }
          else if (self.footable && self.footable.accordion) {
              self.expandedRows.replace([row]);
          }
          else if (self.expandConfig && self.expandConfig.accordion) {
              let rows = self.expandedRows.filter(item => item.depth !== row.depth);
              rows.push(row);
              self.expandedRows.replace(rows);
          }
          else {
              self.expandedRows.push(row);
          }
      }
      function collapseAllAtDepth(depth) {
          let rows = self.expandedRows.filter(item => item.depth !== depth);
          self.expandedRows.replace(rows);
      }
      function setOrderByInfo(key, direction) {
          self.orderBy = key;
          self.orderDir = direction;
      }
      function reset() {
          self.rows.forEach(item => item.reset());
          let rows = self.rows.concat();
          helper_1.eachTree(rows, item => {
              if (item.children) {
                  let rows = item.children.concat().sort((a, b) => a.index - b.index);
                  rows.forEach(item => item.reset());
                  item.children.replace(rows);
              }
          });
          rows.forEach(item => item.reset());
          rows = rows.sort((a, b) => a.index - b.index);
          self.rows.replace(rows);
          self.dragging = false;
      }
      function toggleDragging() {
          self.dragging = !self.dragging;
      }
      function stopDragging() {
          self.dragging = false;
      }
      function exchange(fromIndex, toIndex, item) {
          item = item || self.rows[fromIndex];
          if (item.parentId) {
              const parent = self.getRowById(item.parentId);
              const offset = parent.children.indexOf(item) - fromIndex;
              toIndex += offset;
              fromIndex += offset;
              const newRows = parent.children.concat();
              newRows.splice(fromIndex, 1);
              newRows.splice(toIndex, 0, item);
              newRows.forEach((item, index) => (item.newIndex = index));
              parent.children.replace(newRows);
              return;
          }
          const newRows = self.rows.concat();
          newRows.splice(fromIndex, 1);
          newRows.splice(toIndex, 0, item);
          newRows.forEach((item, index) => (item.newIndex = index));
          self.rows.replace(newRows);
      }
      function persistSaveToggledColumns() {
          const key = location.pathname +
              self.path +
              self.toggableColumns.map(item => item.name || item.index).join('-');
          localStorage.setItem(key, JSON.stringify(self.activeToggaleColumns.map(item => item.index)));
      }
      function addForm(form, rowIndex) {
          self.formsRef.push({
              id: form.id,
              rowIndex
          });
      }
      return {
          update,
          initRows,
          updateSelected,
          toggleAll,
          toggle,
          toggleExpandAll,
          toggleExpanded,
          collapseAllAtDepth,
          clear,
          setOrderByInfo,
          reset,
          toggleDragging,
          stopDragging,
          exchange,
          addForm,
          persistSaveToggledColumns,
          // events
          afterCreate() {
              setTimeout(() => {
                  if (!mobx_state_tree_1.isAlive(self)) {
                      return;
                  }
                  const key = location.pathname +
                      self.path +
                      self.toggableColumns.map(item => item.name || item.index).join('-');
                  const data = localStorage.getItem(key);
                  if (data) {
                      const selectedColumns = JSON.parse(data);
                      self.toggableColumns.forEach(item => item.setToggled(!!~selectedColumns.indexOf(item.index)));
                  }
              }, 200);
          }
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvc3RvcmUvdGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQVV5QjtBQUN6QiwyQ0FBMkM7QUFDM0Msc0RBQXFEO0FBQ3JELHFFQUFxQztBQUNyQywrREFBK0I7QUFDL0IsNENBYXlCO0FBQ3pCLHNDQUE0QztBQUU1Qyx1Q0FBdUM7QUFFMUIsUUFBQSxNQUFNLEdBQUcsdUJBQUs7S0FDeEIsS0FBSyxDQUFDLFFBQVEsRUFBRTtJQUNmLEtBQUssRUFBRSx1QkFBSyxDQUFDLFFBQVEsQ0FBQyx1QkFBSyxDQUFDLE1BQU0sRUFBRSxFQUFFLFNBQVMsQ0FBQztJQUNoRCxJQUFJLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDO0lBQzNDLElBQUksRUFBRSx1QkFBSyxDQUFDLEtBQUssQ0FBQyx1QkFBSyxDQUFDLE1BQU0sQ0FBQztJQUMvQixLQUFLLEVBQUUsdUJBQUssQ0FBQyxNQUFNLEVBQUU7SUFDckIsU0FBUyxFQUFFLEVBQUU7SUFDYixPQUFPLEVBQUUsS0FBSztJQUNkLFFBQVEsRUFBRSxJQUFJO0lBQ2QsVUFBVSxFQUFFLEtBQUs7SUFDakIsWUFBWSxFQUFFLEtBQUs7SUFDbkIsU0FBUyxFQUFFLEtBQUs7SUFDaEIsVUFBVSxFQUFFLHVCQUFLLENBQUMsS0FBSyxDQUFDLHVCQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdkMsUUFBUSxFQUFFLEtBQUs7SUFDZixVQUFVLEVBQUUsdUJBQUssQ0FBQyxRQUFRLENBQUMsdUJBQUssQ0FBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLENBQUM7SUFDckQsS0FBSyxFQUFFLEVBQUU7SUFDVCxLQUFLLEVBQUUsQ0FBQztJQUNSLFFBQVEsRUFBRSxDQUFDO0lBQ1gsVUFBVSxFQUFFLHVC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

});
