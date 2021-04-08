amis.define('src/renderers/Table/index.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableCell = exports.TableRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const factory_1 = require("src/factory.tsx");
  const forEach_1 = tslib_1.__importDefault(require("node_modules/lodash/forEach"));
  const tpl_1 = require("src/utils/tpl.ts");
  const DropDownButton_1 = tslib_1.__importDefault(require("src/renderers/DropDownButton.tsx"));
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const table_1 = require("src/store/table.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const icons_1 = require("src/components/icons.tsx");
  const TableCell_1 = require("src/renderers/Table/TableCell.tsx");
  Object.defineProperty(exports, "TableCell", { enumerable: true, get: function () { return TableCell_1.TableCell; } });
  const HeadCellFilterDropdown_1 = require("src/renderers/Table/HeadCellFilterDropdown.tsx");
  const HeadCellSearchDropdown_1 = require("src/renderers/Table/HeadCellSearchDropdown.tsx");
  const TableContent_1 = require("src/renderers/Table/TableContent.tsx");
  const image_1 = require("src/utils/image.ts");
  const TableBody_1 = require("src/renderers/Table/TableBody.tsx");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  /**
   * 将 url 转成绝对地址
   */
  const getAbsoluteUrl = (function () {
      let link;
      return function (url) {
          if (!link)
              link = document.createElement('a');
          link.href = url;
          return link.href;
      };
  })();
  let Table = /** @class */ (() => {
      var _a;
      class Table extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.lastScrollLeft = -1;
              this.totalWidth = 0;
              this.totalHeight = 0;
              this.outterWidth = 0;
              this.outterHeight = 0;
              this.widths = {};
              this.heights = {};
              this.renderedToolbars = [];
              this.subForms = {};
              this.handleOutterScroll = this.handleOutterScroll.bind(this);
              this.affixDetect = this.affixDetect.bind(this);
              this.updateTableInfoLazy = debounce_1.default(this.updateTableInfo.bind(this), 250, {
                  trailing: true,
                  leading: true
              });
              this.tableRef = this.tableRef.bind(this);
              this.affixedTableRef = this.affixedTableRef.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleCheck = this.handleCheck.bind(this);
              this.handleCheckAll = this.handleCheckAll.bind(this);
              this.handleQuickChange = this.handleQuickChange.bind(this);
              this.handleSave = this.handleSave.bind(this);
              this.handleSaveOrder = this.handleSaveOrder.bind(this);
              this.reset = this.reset.bind(this);
              this.dragTipRef = this.dragTipRef.bind(this);
              this.getPopOverContainer = this.getPopOverContainer.bind(this);
              this.renderCell = this.renderCell.bind(this);
              this.renderHeadCell = this.renderHeadCell.bind(this);
              this.renderToolbar = this.renderToolbar.bind(this);
              this.handleMouseMove = this.handleMouseMove.bind(this);
              this.handleMouseLeave = this.handleMouseLeave.bind(this);
              this.subFormRef = this.subFormRef.bind(this);
          }
          static syncRows(store, props, prevProps) {
              const source = props.source;
              const value = props.value || props.items;
              let rows = [];
              let updateRows = true;
              if (Array.isArray(value)) {
                  rows = value;
              }
              else if (typeof source === 'string') {
                  const resolved = tpl_builtin_1.resolveVariable(source, props.data);
                  const prev = prevProps ? tpl_builtin_1.resolveVariable(source, prevProps.data) : null;
                  if (prev && prev === resolved) {
                      updateRows = false;
                  }
                  else if (Array.isArray(resolved)) {
                      rows = resolved;
                  }
              }
              updateRows && store.initRows(rows, props.getEntryId);
              typeof props.selected !== 'undefined' &&
                  store.updateSelected(props.selected, props.valueField);
          }
          componentWillMount() {
              const { store, columns, selectable, columnsTogglable, draggable, orderBy, orderDir, multiple, footable, primaryField, itemCheckableOn, itemDraggableOn, hideCheckToggler, combineNum, expandConfig, formItem, keepItemSelectionOnPageChange, maxKeepItemSelectionLength } = this.props;
              store.update({
                  selectable,
                  draggable,
                  columns,
                  columnsTogglable,
                  orderBy,
                  orderDir,
                  multiple,
                  footable,
                  expandConfig,
                  primaryField,
                  itemCheckableOn,
                  itemDraggableOn,
                  hideCheckToggler,
                  combineNum,
                  keepItemSelectionOnPageChange,
                  maxKeepItemSelectionLength
              });
              formItem && mobx_state_tree_1.isAlive(formItem) && formItem.setSubStore(store);
              Table.syncRows(store, this.props);
              this.syncSelected();
          }
          componentDidMount() {
              let parent = helper_1.getScrollParent(react_dom_1.findDOMNode(this));
              if (!parent || parent === document.body) {
                  parent = window;
              }
              this.parentNode = parent;
              this.updateTableInfo();
              const dom = react_dom_1.findDOMNode(this);
              if (dom.closest('.modal-body')) {
                  return;
              }
              this.affixDetect();
              parent.addEventListener('scroll', this.affixDetect);
              window.addEventListener('resize', this.affixDetect);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const store = nextProps.store;
              if (helper_1.anyChanged([
                  'selectable',
                  'columnsTogglable',
                  'draggable',
                  'orderBy',
                  'orderDir',
                  'multiple',
                  'footable',
                  'primaryField',
                  'itemCheckableOn',
                  'itemDraggableOn',
                  'hideCheckToggler',
                  'combineNum',
                  'expandConfig'
              ], props, nextProps)) {
                  store.update({
                      selectable: nextProps.selectable,
                      columnsTogglable: nextProps.columnsTogglable,
                      draggable: nextProps.draggable,
                      orderBy: nextProps.orderBy,
                      orderDir: nextProps.orderDir,
                      multiple: nextProps.multiple,
                      primaryField: nextProps.primaryField,
                      footable: nextProps.footable,
                      itemCheckableOn: nextProps.itemCheckableOn,
                      itemDraggableOn: nextProps.itemDraggableOn,
                      hideCheckToggler: nextProps.hideCheckToggler,
                      combineNum: nextProps.combineNum,
                      expandConfig: nextProps.expandConfig
                  });
              }
              if (props.columns !== nextProps.columns) {
                  store.update({
                      columns: nextProps.columns
                  });
              }
              if (helper_1.anyChanged(['source', 'value', 'items'], props, nextProps) ||
                  (!nextProps.value && !nextProps.items && nextProps.data !== props.data)) {
                  Table.syncRows(store, nextProps, props);
                  this.syncSelected();
              }
              else if (helper_1.isArrayChildrenModified(props.selected, nextProps.selected)) {
                  store.updateSelected(nextProps.selected || [], nextProps.valueField);
                  this.syncSelected();
              }
          }
          componentDidUpdate() {
              this.updateTableInfoLazy();
          }
          componentWillUnmount() {
              const { formItem } = this.props;
              const parent = this.parentNode;
              parent && parent.removeEventListener('scroll', this.affixDetect);
              window.removeEventListener('resize', this.affixDetect);
              this.updateTableInfoLazy.cancel();
              this.unSensor && this.unSensor();
              formItem && mobx_state_tree_1.isAlive(formItem) && formItem.setSubStore(null);
          }
          subFormRef(form, x, y) {
              const { quickEditFormRef } = this.props;
              quickEditFormRef && quickEditFormRef(form, x, y);
              this.subForms[`${x}-${y}`] = form;
              form && this.props.store.addForm(form.props.store, y);
          }
          handleAction(e, action, ctx) {
              const { onAction } = this.props;
              // todo
              onAction(e, action, ctx);
          }
          handleCheck(item) {
              item.toggle();
              this.syncSelected();
          }
          handleCheckAll() {
              const { store } = this.props;
              store.toggleAll();
              this.syncSelected();
          }
          handleQuickChange(item, values, saveImmediately, savePristine, resetOnFailed) {
              const { onSave, saveImmediately: propsSaveImmediately, primaryField } = this.props;
              item.change(values, savePristine);
              // 值发生变化了，需要通过 onSelect 通知到外面，否则会出现数据不同步的问题
              item.modified && this.syncSelected();
              if ((!saveImmediately && !propsSaveImmediately) || savePristine) {
                  return;
              }
              if (saveImmediately && saveImmediately.api) {
                  this.props.onAction(null, {
                      actionType: 'ajax',
                      api: saveImmediately.api
                  }, values);
                  return;
              }
              if (!onSave) {
                  return;
              }
              onSave(item.data, helper_1.difference(item.data, item.pristine, ['id', primaryField]), item.index, undefined, item.pristine, resetOnFailed);
          }
          async handleSave() {
              const { store, onSave, primaryField } = this.props;
              if (!onSave || !store.modifiedRows.length) {
                  return;
              }
              // 验证所有表单项，没有错误才继续
              const subForms = [];
              Object.keys(this.subForms).forEach(key => this.subForms[key] && subForms.push(this.subForms[key]));
              if (subForms.length) {
                  const result = await Promise.all(subForms.map(item => item.validate()));
                  if (~result.indexOf(false)) {
                      return;
                  }
              }
              const rows = store.modifiedRows.map(item => item.data);
              const rowIndexes = store.modifiedRows.map(item => item.index);
              const diff = store.modifiedRows.map(item => helper_1.difference(item.data, item.pristine, ['id', primaryField]));
              const unModifiedRows = store.rows
                  .filter(item => !item.modified)
                  .map(item => item.data);
              onSave(rows, diff, rowIndexes, unModifiedRows, store.modifiedRows.map(item => item.pristine));
          }
          handleSaveOrder() {
              const { store, onSaveOrder } = this.props;
              if (!onSaveOrder || !store.movedRows.length) {
                  return;
              }
              onSaveOrder(store.movedRows.map(item => item.data), store.rows.map(item => item.getDataWithModifiedChilden()));
          }
          syncSelected() {
              const { store, onSelect } = this.props;
              onSelect &&
                  onSelect(store.selectedRows.map(item => item.data), store.unSelectedRows.map(item => item.data));
          }
          reset() {
              const { store } = this.props;
              store.reset();
              const subForms = [];
              Object.keys(this.subForms).forEach(key => this.subForms[key] && subForms.push(this.subForms[key]));
              subForms.forEach(item => item.clearErrors());
          }
          bulkUpdate(value, items) {
              const { store, primaryField } = this.props;
              if (primaryField && value.ids) {
                  const ids = value.ids.split(',');
                  const rows = store.rows.filter(item => find_1.default(ids, (id) => id && id == item.data[primaryField]));
                  const newValue = Object.assign(Object.assign({}, value), { ids: undefined });
                  rows.forEach(row => row.change(newValue));
              }
              else {
                  const rows = store.rows.filter(item => ~items.indexOf(item.pristine));
                  rows.forEach(row => row.change(value));
              }
          }
          getSelected() {
              const { store } = this.props;
              return store.selectedRows.map(item => item.data);
          }
          affixDetect() {
              var _a, _b;
              if (!this.props.affixHeader || !this.table) {
                  return;
              }
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              const clip = this.table.getBoundingClientRect();
              const offsetY = (_b = (_a = this.props.affixOffsetTop) !== null && _a !== void 0 ? _a : this.props.env.affixOffsetTop) !== null && _b !== void 0 ? _b : 0;
              // 50 是 headerToolbar 的高度
              const toolbarHeight = this.renderedToolbars.length || this.props.headerToolbarRender ? 50 : 0;
              const affixed = clip.top - toolbarHeight < offsetY &&
                  clip.top + clip.height - 40 > offsetY;
              const affixedDom = dom.querySelector(`.${ns}Table-fixedTop`);
              affixedDom.style.cssText += `top: ${offsetY}px;width: ${this.table.parentNode.offsetWidth}px`;
              affixed
                  ? affixedDom.classList.add('in')
                  : affixedDom.classList.remove('in');
              // store.markHeaderAffix(clip.top < offsetY && (clip.top + clip.height - 40) > offsetY);
          }
          updateTableInfo() {
              if (!this.table) {
                  return;
              }
              const table = this.table;
              const outter = table.parentNode;
              const affixHeader = this.props.affixHeader;
              const ns = this.props.classPrefix;
              // 完成宽高都没有变化就直接跳过了。
              // if (this.totalWidth === table.scrollWidth && this.totalHeight === table.scrollHeight) {
              //     return;
              // }
              this.totalWidth = table.scrollWidth;
              this.totalHeight = table.scrollHeight;
              this.outterWidth = outter.offsetWidth;
              this.outterHeight = outter.offsetHeight;
              let widths = (this.widths = {});
              let heights = (this.heights = {});
              heights.header ||
                  (heights.header = table.querySelector('thead').offsetHeight);
              forEach_1.default(table.querySelectorAll('thead>tr:last-child>th'), (item) => {
                  widths[item.getAttribute('data-index')] = item.offsetWidth;
              });
              forEach_1.default(table.querySelectorAll('tbody>tr>*:last-child'), (item, index) => (heights[index] = item.offsetHeight));
              // 让 react 去更新非常慢，还是手动更新吧。
              const dom = react_dom_1.findDOMNode(this);
              forEach_1.default(
              // 折叠 footTable 不需要改变
              dom.querySelectorAll(`.${ns}Table-fixedTop table, .${ns}Table-fixedLeft>table, .${ns}Table-fixedRight>table`), (table) => {
                  let totalWidth = 0;
                  forEach_1.default(table.querySelectorAll('thead>tr:last-child>th'), (item) => {
                      const width = widths[item.getAttribute('data-index')];
                      item.style.cssText += `width: ${width}px; height: ${heights.header}px`;
                      totalWidth += width;
                  });
                  forEach_1.default(table.querySelectorAll('tbody>tr'), (item, index) => {
                      item.style.cssText += `height: ${heights[index]}px`;
                  });
                  table.style.cssText += `width: ${totalWidth}px;table-layout: fixed;`;
              });
              if (affixHeader) {
                  dom.querySelector(`.${ns}Table-fixedTop>.${ns}Table-wrapper`).style.cssText += `width: ${this.outterWidth}px`;
              }
              this.lastScrollLeft = -1;
              this.handleOutterScroll();
          }
          handleOutterScroll() {
              const outter = this.table.parentNode;
              const scrollLeft = outter.scrollLeft;
              if (scrollLeft === this.lastScrollLeft) {
                  return;
              }
              this.lastScrollLeft = scrollLeft;
              let leading = scrollLeft === 0;
              let trailing = Math.ceil(scrollLeft) + this.outterWidth >= this.totalWidth;
              // console.log(scrollLeft, store.outterWidth, store.totalWidth, (scrollLeft + store.outterWidth) === store.totalWidth);
              // store.setLeading(leading);
              // store.setTrailing(trailing);
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              const fixedLeft = dom.querySelectorAll(`.${ns}Table-fixedLeft`);
              if (fixedLeft && fixedLeft.length) {
                  for (let i = 0, len = fixedLeft.length; i < len; i++) {
                      let node = fixedLeft[i];
                      leading ? node.classList.remove('in') : node.classList.add('in');
                  }
              }
              const fixedRight = dom.querySelectorAll(`.${ns}Table-fixedRight`);
              if (fixedRight && fixedRight.length) {
                  for (let i = 0, len = fixedRight.length; i < len; i++) {
                      let node = fixedRight[i];
                      trailing ? node.classList.remove('in') : node.classList.add('in');
                  }
              }
              const table = this.affixedTable;
              if (table) {
                  table.style.cssText += `transform: translateX(-${scrollLeft}px)`;
              }
          }
          tableRef(ref) {
              this.table = ref;
              if (ref) {
                  this.unSensor = resize_sensor_1.resizeSensor(ref.parentNode, this.updateTableInfoLazy);
              }
              else {
                  this.unSensor && this.unSensor();
                  delete this.unSensor;
              }
          }
          dragTipRef(ref) {
              if (!this.dragTip && ref) {
                  this.initDragging();
              }
              else if (this.dragTip && !ref) {
                  this.destroyDragging();
              }
              this.dragTip = ref;
          }
          affixedTableRef(ref) {
              this.affixedTable = ref;
          }
          initDragging() {
              const store = this.props.store;
              const ns = this.props.classPrefix;
              this.sortable = new sortablejs_1.default(this.table.querySelector('tbody'), {
                  group: 'table',
                  animation: 150,
                  handle: `.${ns}Table-dragCell`,
                  ghostClass: 'is-dragging',
                  onEnd: (e) => {
                      // 没有移动
                      if (e.newIndex === e.oldIndex) {
                          return;
                      }
                      const parent = e.to;
                      if (e.oldIndex < parent.childNodes.length - 1) {
                          parent.insertBefore(e.item, parent.childNodes[e.oldIndex]);
                      }
                      else {
                          parent.appendChild(e.item);
                      }
                      store.exchange(e.oldIndex, e.newIndex);
                  }
              });
          }
          destroyDragging() {
              this.sortable && this.sortable.destroy();
          }
          getPopOverContainer() {
              return react_dom_1.findDOMNode(this);
          }
          handleMouseMove(e) {
              const tr = e.target.closest('tr[data-index]');
              if (!tr) {
                  return;
              }
              const { store, affixColumns, itemActions } = this.props;
              if ((affixColumns === false ||
                  (store.leftFixedColumns.length === 0 &&
                      store.rightFixedColumns.length === 0)) &&
                  (!itemActions || !itemActions.filter(item => !item.hiddenOnHover).length)) {
                  return;
              }
              const index = parseInt(tr.getAttribute('data-index'), 10);
              if (store.hoverIndex === index) {
                  return;
              }
              store.rows.forEach((item, key) => item.setIsHover(index === key));
          }
          handleMouseLeave() {
              const store = this.props.store;
              if (~store.hoverIndex) {
                  store.rows[store.hoverIndex].setIsHover(false);
              }
          }
          handleDragStart(e) {
              const store = this.props.store;
              const target = e.currentTarget;
              const tr = (this.draggingTr = target.closest('tr'));
              const id = tr.getAttribute('data-id');
              const tbody = tr.parentNode;
              this.originIndex = Array.prototype.indexOf.call(tbody.childNodes, tr);
              tr.classList.add('is-dragging');
              e.dataTransfer.effectAllowed = 'move';
              e.dataTransfer.setData('text/plain', id);
              e.dataTransfer.setDragImage(tr, 0, 0);
              const item = store.getRowById(id);
              store.collapseAllAtDepth(item.depth);
              let siblings = store.rows;
              if (item.parentId) {
                  const parent = store.getRowById(item.parentId);
                  siblings = parent.children;
              }
              siblings = siblings.filter(sibling => sibling !== item);
              tbody.addEventListener('dragover', this.handleDragOver);
              tbody.addEventListener('drop', this.handleDrop);
              this.draggingSibling = siblings.map(item => {
                  let tr = tbody.querySelector(`tr[data-id="${item.id}"]`);
                  tr.classList.add('is-drop-allowed');
                  return tr;
              });
              tr.addEventListener('dragend', this.handleDragEnd);
          }
          handleDragOver(e) {
              if (!e.target) {
                  return;
              }
              e.preventDefault();
              e.dataTransfer.dropEffect = 'move';
              const overTr = e.target.closest('tr');
              if (!overTr ||
                  !~overTr.className.indexOf('is-drop-allowed') ||
                  overTr === this.draggingTr) {
                  return;
              }
              const tbody = overTr.parentElement;
              const dRect = this.draggingTr.getBoundingClientRect();
              const tRect = overTr.getBoundingClientRect();
              let ratio = dRect.top < tRect.top ? 0.1 : 0.9;
              const next = (e.clientY - tRect.top) / (tRect.bottom - tRect.top) > ratio;
              tbody.insertBefore(this.draggingTr, (next && overTr.nextSibling) || overTr);
          }
          handleDrop() {
              const store = this.props.store;
              const tr = this.draggingTr;
              const tbody = tr.parentElement;
              const index = Array.prototype.indexOf.call(tbody.childNodes, tr);
              const item = store.getRowById(tr.getAttribute('data-id'));
              // destroy
              this.handleDragEnd();
              store.exchange(this.originIndex, index, item);
          }
          handleDragEnd() {
              const tr = this.draggingTr;
              const tbody = tr.parentElement;
              const index = Array.prototype.indexOf.call(tbody.childNodes, tr);
              tbody.insertBefore(tr, tbody.childNodes[index < this.originIndex ? this.originIndex + 1 : this.originIndex]);
              tr.classList.remove('is-dragging');
              tr.removeEventListener('dragend', this.handleDragEnd);
              tbody.removeEventListener('dragover', this.handleDragOver);
              tbody.removeEventListener('drop', this.handleDrop);
              this.draggingSibling.forEach(item => item.classList.remove('is-drop-allowed'));
          }
          handleImageEnlarge(info, target) {
              const onImageEnlarge = this.props.onImageEnlarge;
              // 如果已经是多张了，直接跳过
              if (Array.isArray(info.list)) {
                  return onImageEnlarge && onImageEnlarge(info, target);
              }
              // 从列表中收集所有图片，然后作为一个图片集合派送出去。
              const store = this.props.store;
              const column = store.columns[target.colIndex].pristine;
              let index = target.rowIndex;
              const list = [];
              store.rows.forEach((row, i) => {
                  const src = tpl_builtin_1.resolveVariable(column.name, row.data);
                  if (!src) {
                      if (i < target.rowIndex) {
                          index--;
                      }
                      return;
                  }
                  list.push({
                      src,
                      originalSrc: column.originalSrc
                          ? tpl_1.filter(column.originalSrc, row.data)
                          : src,
                      title: column.enlargeTitle
                          ? tpl_1.filter(column.enlargeTitle, row.data)
                          : column.title
                              ? tpl_1.filter(column.title, row.data)
                              : undefined,
                      caption: column.enlargeCaption
                          ? tpl_1.filter(column.enlargeCaption, row.data)
                          : column.caption
                              ? tpl_1.filter(column.caption, row.data)
                              : undefined
                  });
              });
              if (list.length > 1) {
                  onImageEnlarge &&
                      onImageEnlarge(Object.assign(Object.assign({}, info), { list,
                          index }), target);
              }
              else {
                  onImageEnlarge && onImageEnlarge(info, target);
              }
          }
          renderHeading() {
              let { title, store, hideQuickSaveBtn, data, classnames: cx, saveImmediately, headingClassName, translate: __ } = this.props;
              if (title ||
                  (!saveImmediately && store.modified && !hideQuickSaveBtn) ||
                  store.moved) {
                  return (react_1.default.createElement("div", { className: cx('Table-heading', headingClassName), key: "heading" }, !saveImmediately && store.modified && !hideQuickSaveBtn ? (react_1.default.createElement("span", null,
                      __('Table.modified', {
                          modified: store.modified
                      }),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSave },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon m-r-xs" }),
                          __('Form.submit')),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon m-r-xs" }),
                          __('Table.discard')))) : store.moved ? (react_1.default.createElement("span", null,
                      __('Table.moved', {
                          moved: store.moved
                      }),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon m-r-xs" }),
                          __('Form.submit')),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon m-r-xs" }),
                          __('Table.discard')))) : title ? (tpl_1.filter(title, data)) : ('')));
              }
              return null;
          }
          renderHeadCell(column, props) {
              const { store, query, onQuery, multiple, env, render, classPrefix: ns, classnames: cx } = this.props;
              if (column.type === '__checkme') {
                  return (react_1.default.createElement("th", Object.assign({}, props, { className: cx(column.pristine.className) }), store.rows.length && multiple ? (react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, partial: !store.allChecked, checked: store.someChecked, disabled: store.disabledHeadCheckbox, onChange: this.handleCheckAll })) : ('\u00A0')));
              }
              else if (column.type === '__dragme') {
                  return react_1.default.createElement("th", Object.assign({}, props, { className: cx(column.pristine.className) }));
              }
              else if (column.type === '__expandme') {
                  return (react_1.default.createElement("th", Object.assign({}, props, { className: cx(column.pristine.className) }), (store.footable &&
                      (store.footable.expandAll === false || store.footable.accordion)) ||
                      (store.expandConfig &&
                          (store.expandConfig.expandAll === false ||
                              store.expandConfig.accordion)) ? null : (react_1.default.createElement("a", { className: cx('Table-expandBtn', store.allExpanded ? 'is-active' : ''), 
                      // data-tooltip="展开/收起全部"
                      // data-position="top"
                      onClick: store.toggleExpandAll },
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" })))));
              }
              let affix = null;
              if (column.searchable && column.name) {
                  affix = (react_1.default.createElement(HeadCellSearchDropdown_1.HeadCellSearchDropDown, Object.assign({}, this.props, { onQuery: onQuery, name: column.name, searchable: column.searchable, sortable: column.sortable, type: column.type, data: query, orderBy: store.orderBy, orderDir: store.orderDir, popOverContainer: this.getPopOverContainer })));
              }
              else if (column.sortable && column.name) {
                  affix = (react_1.default.createElement("span", { className: cx('TableCell-sortBtn'), onClick: () => {
                          if (column.name === store.orderBy) {
                              if (store.orderDir === 'desc') {
                                  // 降序之后取消排序
                                  store.setOrderByInfo('', 'asc');
                              }
                              else {
                                  // 升序之后降序
                                  store.setOrderByInfo(column.name, 'desc');
                              }
                          }
                          else {
                              store.setOrderByInfo(column.name, 'asc');
                          }
                          onQuery &&
                              onQuery({
                                  orderBy: store.orderBy,
                                  orderDir: store.orderDir
                              });
                      } },
                      react_1.default.createElement("i", { className: cx('TableCell-sortBtn--down', store.orderBy === column.name && store.orderDir === 'desc'
                              ? 'is-active'
                              : '') },
                          react_1.default.createElement(icons_1.Icon, { icon: "sort-desc", className: "icon" })),
                      react_1.default.createElement("i", { className: cx('TableCell-sortBtn--up', store.orderBy === column.name && store.orderDir === 'asc'
                              ? 'is-active'
                              : '') },
                          react_1.default.createElement(icons_1.Icon, { icon: "sort-asc", className: "icon" })),
                      react_1.default.createElement("i", { className: cx('TableCell-sortBtn--default', store.orderBy === column.name ? '' : 'is-active') },
                          react_1.default.createElement(icons_1.Icon, { icon: "sort-default", className: "icon" }))));
              }
              else if (column.filterable && column.name) {
                  affix = (react_1.default.createElement(HeadCellFilterDropdown_1.HeadCellFilterDropDown, Object.assign({}, this.props, { onQuery: onQuery, name: column.name, type: column.type, data: query, filterable: column.filterable, popOverContainer: this.getPopOverContainer })));
              }
              if (column.pristine.width) {
                  props.style = props.style || {};
                  props.style.width = column.pristine.width;
              }
              return (react_1.default.createElement("th", Object.assign({}, props, { className: cx(props ? props.className : '', column.pristine.className, {
                      'TableCell--sortable': column.sortable,
                      'TableCell--searchable': column.searchable,
                      'TableCell--filterable': column.filterable,
                      'Table-operationCell': column.type === 'operation'
                  }) }),
                  react_1.default.createElement("div", { className: cx(`${ns}TableCell--title`) },
                      column.label ? render('tpl', column.label) : null,
                      column.remark
                          ? render('remark', {
                              type: 'remark',
                              tooltip: column.remark,
                              container: env && env.getModalContainer
                                  ? env.getModalContainer
                                  : undefined
                          })
                          : null),
                  affix));
          }
          renderCell(region, column, item, props, ignoreDrag = false) {
              const { render, store, multiple, classPrefix: ns, classnames: cx, checkOnItemClick, popOverContainer, canAccessSuperData } = this.props;
              if (column.name && item.rowSpans[column.name] === 0) {
                  return null;
              }
              if (column.type === '__checkme') {
                  return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) },
                      react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', checked: item.checked, disabled: item.checkdisable, onChange: checkOnItemClick ? helper_1.noop : this.handleCheck.bind(this, item) })));
              }
              else if (column.type === '__dragme') {
                  return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) }, item.draggable ? react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" }) : null));
              }
              else if (column.type === '__expandme') {
                  return (react_1.default.createElement("td", { key: props.key, className: cx(column.pristine.className) },
                      item.depth > 2
                          ? Array.from({ length: item.depth - 2 }).map((_, index) => (react_1.default.createElement("i", { key: index, className: cx('Table-divider-' + (index + 1)) })))
                          : null,
                      item.expandable ? (react_1.default.createElement("a", { className: cx('Table-expandBtn', item.expanded ? 'is-active' : ''), 
                          // data-tooltip="展开/收起"
                          // data-position="top"
                          onClick: item.toggleExpanded },
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" }))) : null));
              }
              let prefix = null;
              if (!ignoreDrag &&
                  column.isPrimary &&
                  store.isNested &&
                  store.draggable &&
                  item.draggable) {
                  prefix = (react_1.default.createElement("a", { draggable: true, onDragStart: this.handleDragStart, className: cx('Table-dragBtn') },
                      react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" })));
              }
              const subProps = Object.assign(Object.assign({}, props), { btnDisabled: store.dragging, data: item.locals, value: column.name
                      ? tpl_builtin_1.resolveVariable(column.name, canAccessSuperData ? item.locals : item.data)
                      : column.value, popOverContainer: popOverContainer || this.getPopOverContainer, rowSpan: item.rowSpans[column.name], quickEditFormRef: this.subFormRef, prefix, onImageEnlarge: this.handleImageEnlarge, canAccessSuperData });
              delete subProps.label;
              return render(region, Object.assign(Object.assign({}, column.pristine), { column: column.pristine, type: 'cell' }), subProps);
          }
          renderAffixHeader(tableClassName) {
              const { store, affixHeader, render, classnames: cx } = this.props;
              const hideHeader = store.filteredColumns.every(column => !column.label);
              return affixHeader ? (react_1.default.createElement("div", { className: cx('Table-fixedTop', {
                      'is-fakeHide': hideHeader
                  }) },
                  this.renderHeading(),
                  this.renderHeader(false),
                  react_1.default.createElement("div", { className: cx('Table-fixedLeft') }, store.leftFixedColumns.length
                      ? this.renderFixedColumns(store.rows, store.leftFixedColumns, true, tableClassName)
                      : null),
                  react_1.default.createElement("div", { className: cx('Table-fixedRight') }, store.rightFixedColumns.length
                      ? this.renderFixedColumns(store.rows, store.rightFixedColumns, true, tableClassName)
                      : null),
                  react_1.default.createElement("div", { className: cx('Table-wrapper') },
                      react_1.default.createElement("table", { ref: this.affixedTableRef, className: tableClassName },
                          react_1.default.createElement("thead", null,
                              store.columnGroup.length ? (react_1.default.createElement("tr", null, store.columnGroup.map((item, index) => (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: item.colSpan }, item.label ? render('tpl', item.label) : null))))) : null,
                              react_1.default.createElement("tr", null, store.filteredColumns.map(column => this.renderHeadCell(column, {
                                  'key': column.index,
                                  'data-index': column.index
                              })))))))) : null;
          }
          renderFixedColumns(rows, columns, headerOnly = false, tableClassName = '') {
              const { placeholder, store, classnames: cx, render, data, translate, locale, checkOnItemClick, buildItemProps, rowClassNameExpr, rowClassName } = this.props;
              const hideHeader = store.filteredColumns.every(column => !column.label);
              return (react_1.default.createElement("table", { className: cx('Table-table', store.combineNum > 0 ? 'Table-table--withCombine' : '', tableClassName) },
                  react_1.default.createElement("thead", null,
                      store.columnGroup.length ? (react_1.default.createElement("tr", null, store.columnGroup.map((item, index) => {
                          const renderColumns = columns.filter(a => ~item.has.indexOf(a));
                          return renderColumns.length ? (react_1.default.createElement("th", { key: index, "data-index": item.index, colSpan: renderColumns.length }, '\u00A0')) : null;
                      }))) : null,
                      react_1.default.createElement("tr", { className: hideHeader ? 'fake-hide' : '' }, columns.map(column => this.renderHeadCell(column, {
                          'key': column.index,
                          'data-index': column.index
                      })))),
                  headerOnly ? null : !rows.length ? (react_1.default.createElement("tbody", null,
                      react_1.default.createElement("tr", { className: cx('Table-placeholder') },
                          react_1.default.createElement("td", { colSpan: columns.length }, render('placeholder', translate(placeholder || 'placeholder.noData')))))) : (react_1.default.createElement(TableBody_1.TableBody, { tableClassName: cx(store.combineNum > 0 ? 'Table-table--withCombine' : '', tableClassName), classnames: cx, render: render, renderCell: this.renderCell, onCheck: this.handleCheck, onQuickChange: store.dragging ? undefined : this.handleQuickChange, footable: store.footable, ignoreFootableContent: true, footableColumns: store.footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: this.handleAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, columns: columns, rows: rows, locale: locale, translate: translate, rowsProps: {
                          regionPrefix: 'fixed/',
                          renderCell: (region, column, item, props) => this.renderCell(region, column, item, props, true)
                      } }))));
          }
          renderToolbar(toolbar) {
              const type = toolbar.type || toolbar;
              if (type === 'columns-toggler') {
                  this.renderedToolbars.push(type);
                  return this.renderColumnsToggler(toolbar);
              }
              else if (type === 'drag-toggler') {
                  this.renderedToolbars.push(type);
                  return this.renderDragToggler();
              }
              else if (type === 'export-excel') {
                  return this.renderExportExcel();
              }
              return void 0;
          }
          renderColumnsToggler(config) {
              const _a = this.props, { className, store, classPrefix: ns, classnames: cx } = _a, rest = tslib_1.__rest(_a, ["className", "store", "classPrefix", "classnames"]);
              const __ = rest.translate;
              const env = rest.env;
              const render = this.props.render;
              if (!store.columnsTogglable) {
                  return null;
              }
              return (react_1.default.createElement(DropDownButton_1.default, Object.assign({}, rest, { tooltip: __('Table.columnsVisibility'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, align: config ? config.align : 'left', classnames: cx, classPrefix: ns, key: "columns-toggable", size: "sm", label: react_1.default.createElement(icons_1.Icon, { icon: "columns", className: "icon m-r-none" }) }), store.toggableColumns.map(column => (react_1.default.createElement("li", { className: cx('DropDown-menuItem'), key: column.index, onClick: column.toggleToggle },
                  react_1.default.createElement(Checkbox_1.default, { size: "sm", classPrefix: ns, checked: column.toggled }, column.label ? render('tpl', column.label) : null))))));
          }
          renderDragToggler() {
              const { store, env, draggable, classPrefix: ns, translate: __ } = this.props;
              if (!draggable || store.isNested) {
                  return null;
              }
              return (react_1.default.createElement(Button_1.default, { disabled: !!store.modified, classPrefix: ns, key: "dragging-toggle", tooltip: __('Table.startSort'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, size: "sm", active: store.dragging, onClick: (e) => {
                      e.preventDefault();
                      store.toggleDragging();
                      store.dragging && store.clear();
                  }, iconOnly: true },
                  react_1.default.createElement(icons_1.Icon, { icon: "exchange", className: "icon" })));
          }
          renderExportExcel() {
              const { store, classPrefix: ns, classnames: cx, translate: __, columns } = this.props;
              if (!columns) {
                  return null;
              }
              return (react_1.default.createElement(Button_1.default, { classPrefix: ns, onClick: () => {
                      Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/exceljs/dist/exceljs.min'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(async (ExcelJS) => {
                          var _a, _b;
                          if (!store.data.items || store.data.items.length === 0) {
                              return;
                          }
                          const workbook = new ExcelJS.Workbook();
                          const worksheet = workbook.addWorksheet('sheet', {
                              properties: { defaultColWidth: 15 }
                          });
                          worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];
                          const firstRowLabels = columns.map(column => {
                              return column.label;
                          });
                          const firstRow = worksheet.getRow(1);
                          firstRow.values = firstRowLabels;
                          worksheet.autoFilter = {
                              from: {
                                  row: 1,
                                  column: 1
                              },
                              to: {
                                  row: 1,
                                  column: firstRowLabels.length
                              }
                          };
                          // 数据从第二行开始
                          let rowIndex = 1;
                          for (const row of store.rows) {
                              rowIndex += 1;
                              const sheetRow = worksheet.getRow(rowIndex);
                              let columIndex = 0;
                              for (const column of columns) {
                                  columIndex += 1;
                                  const name = column.name;
                                  const value = helper_1.getVariable(row.data, name);
                                  if (typeof value === 'undefined' &&
                                      !column.tpl) {
                                      continue;
                                  }
                                  // 处理合并单元格
                                  if (name in row.rowSpans) {
                                      if (row.rowSpans[name] === 0) {
                                          continue;
                                      }
                                      else {
                                          // start row, start column, end row, end column
                                          worksheet.mergeCells(rowIndex, columIndex, rowIndex + row.rowSpans[name] - 1, columIndex);
                                      }
                                  }
                                  const type = column.type || 'plain';
                                  if (type === 'image') {
                                      const imageData = await image_1.toDataURL(value);
                                      const imageDimensions = await image_1.getImageDimensions(imageData);
                                      let imageWidth = imageDimensions.width;
                                      let imageHeight = imageDimensions.height;
                                      // 限制一下图片高宽
                                      const imageMaxSize = 100;
                                      if (imageWidth > imageHeight) {
                                          if (imageWidth > imageMaxSize) {
                                              imageHeight = (imageMaxSize * imageHeight) / imageWidth;
                                              imageWidth = imageMaxSize;
                                          }
                                      }
                                      else {
                                          if (imageHeight > imageMaxSize) {
                                              imageWidth = (imageMaxSize * imageWidth) / imageHeight;
                                              imageHeight = imageMaxSize;
                                          }
                                      }
                                      const imageMatch = imageData.match(/data:image\/(.*);/);
                                      let imageExt = 'png';
                                      if (imageMatch) {
                                          imageExt = imageMatch[1];
                                      }
                                      // 目前 excel 只支持这些格式，所以其它格式直接输出 url
                                      if (imageExt != 'png' &&
                                          imageExt != 'jpeg' &&
                                          imageExt != 'gif') {
                                          sheetRow.getCell(columIndex).value = value;
                                          continue;
                                      }
                                      const imageId = workbook.addImage({
                                          base64: imageData,
                                          extension: imageExt
                                      });
                                      const linkURL = getAbsoluteUrl(value);
                                      worksheet.addImage(imageId, {
                                          // 这里坐标位置是从 0 开始的，所以要减一
                                          tl: { col: columIndex - 1, row: rowIndex - 1 },
                                          ext: {
                                              width: imageWidth,
                                              height: imageHeight
                                          },
                                          hyperlinks: {
                                              tooltip: linkURL
                                          }
                                      });
                                  }
                                  else if (type == 'link') {
                                      const linkURL = getAbsoluteUrl(value);
                                      sheetRow.getCell(columIndex).value = {
                                          text: value,
                                          hyperlink: linkURL
                                      };
                                  }
                                  else if (type === 'mapping') {
                                      // 拷贝自 Mapping.tsx
                                      const map = column.map;
                                      if (typeof value !== 'undefined' &&
                                          map &&
                                          ((_a = map[value]) !== null && _a !== void 0 ? _a : map['*'])) {
                                          const viewValue = (_b = map[value]) !== null && _b !== void 0 ? _b : (value === true && map['1']
                                              ? map['1']
                                              : value === false && map['0']
                                                  ? map['0']
                                                  : map['*']); // 兼容平台旧用法：即 value 为 true 时映射 1 ，为 false 时映射 0
                                          sheetRow.getCell(columIndex).value = viewValue;
                                      }
                                      else {
                                          sheetRow.getCell(columIndex).value = value;
                                      }
                                  }
                                  else {
                                      if (column.tpl) {
                                          sheetRow.getCell(columIndex).value = tpl_1.filter(column.tpl, row.data);
                                      }
                                      else {
                                          sheetRow.getCell(columIndex).value = value;
                                      }
                                  }
                              }
                          }
                          const buffer = await workbook.xlsx.writeBuffer();
                          if (buffer) {
                              var blob = new Blob([buffer], {
                                  type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
                              });
                              saveAs(blob, 'data.xlsx');
                          }
                      });
                  }, size: "sm" }, __('CRUD.exportExcel')));
          }
          renderActions(region) {
              let { actions, render, store, classnames: cx, data } = this.props;
              actions = Array.isArray(actions) ? actions.concat() : [];
              if (store.toggable &&
                  region === 'header' &&
                  !~this.renderedToolbars.indexOf('columns-toggler')) {
                  actions.push({
                      type: 'button',
                      children: this.renderColumnsToggler()
                  });
              }
              if (store.draggable &&
                  !store.isNested &&
                  region === 'header' &&
                  store.rows.length > 1 &&
                  !~this.renderedToolbars.indexOf('drag-toggler')) {
                  actions.push({
                      type: 'button',
                      children: this.renderDragToggler()
                  });
              }
              return Array.isArray(actions) && actions.length ? (react_1.default.createElement("div", { className: cx('Table-actions') }, actions.map((action, key) => render(`action/${key}`, Object.assign({ type: 'button' }, action), {
                  onAction: this.handleAction,
                  key,
                  btnDisabled: store.dragging,
                  data: store.getData(data)
              })))) : null;
          }
          renderHeader(editable) {
              const { header, headerClassName, toolbarClassName, headerToolbarClassName, headerToolbarRender, render, showHeader, store, classnames: cx, data, translate: __ } = this.props;
              if (showHeader === false) {
                  return null;
              }
              const otherProps = {};
              // editable === false && (otherProps.$$editable = false);
              const child = headerToolbarRender
                  ? headerToolbarRender(Object.assign(Object.assign(Object.assign({}, this.props), { selectedItems: store.selectedRows.map(item => item.data), items: store.rows.map(item => item.data), unSelectedItems: store.unSelectedRows.map(item => item.data) }), otherProps), this.renderToolbar)
                  : null;
              const actions = this.renderActions('header');
              const toolbarNode = actions || child || store.dragging ? (react_1.default.createElement("div", { className: cx('Table-toolbar Table-headToolbar', toolbarClassName, headerToolbarClassName), key: "header-toolbar" },
                  actions,
                  child,
                  store.dragging ? (react_1.default.createElement("div", { className: cx('Table-dragTip'), ref: this.dragTipRef }, __('Table.dragTip'))) : null)) : null;
              const headerNode = header && (!Array.isArray(header) || header.length) ? (react_1.default.createElement("div", { className: cx('Table-header', headerClassName), key: "header" }, render('header', header, Object.assign(Object.assign({}, (editable === false ? otherProps : null)), { data: store.getData(data) })))) : null;
              return headerNode && toolbarNode
                  ? [headerNode, toolbarNode]
                  : headerNode || toolbarNode || null;
          }
          renderFooter() {
              const { footer, toolbarClassName, footerToolbarClassName, footerClassName, footerToolbarRender, render, showFooter, store, data, classnames: cx } = this.props;
              if (showFooter === false) {
                  return null;
              }
              const child = footerToolbarRender
                  ? footerToolbarRender(Object.assign(Object.assign({}, this.props), { selectedItems: store.selectedRows.map(item => item.data), items: store.rows.map(item => item.data) }), this.renderToolbar)
                  : null;
              const actions = this.renderActions('footer');
              const toolbarNode = actions || child ? (react_1.default.createElement("div", { className: cx('Table-toolbar Table-footToolbar', toolbarClassName, footerToolbarClassName), key: "footer-toolbar" },
                  actions,
                  child)) : null;
              const footerNode = footer && (!Array.isArray(footer) || footer.length) ? (react_1.default.createElement("div", { className: cx('Table-footer', footerClassName), key: "footer" }, render('footer', footer, {
                  data: store.getData(data)
              }))) : null;
              return footerNode && toolbarNode
                  ? [toolbarNode, footerNode]
                  : footerNode || toolbarNode || null;
          }
          renderItemActions() {
              const { itemActions, render, store, classnames: cx } = this.props;
              const finalActions = Array.isArray(itemActions)
                  ? itemActions.filter(action => !action.hiddenOnHover)
                  : [];
              if (!finalActions.length) {
                  return null;
              }
              const rowIndex = store.hoverIndex;
              const heights = this.heights;
              let height = 40;
              let top = 0;
              if (heights && heights[rowIndex]) {
                  height = heights[rowIndex];
                  top += heights.header;
                  for (let i = rowIndex - 1; i >= 0; i--) {
                      top += heights[i];
                  }
              }
              return (react_1.default.createElement("div", { className: cx('Table-itemActions-wrap'), style: {
                      top,
                      height
                  } },
                  react_1.default.createElement("div", { className: cx('Table-itemActions') }, finalActions.map((action, index) => render(`itemAction/${index}`, Object.assign(Object.assign({}, action), { isMenuItem: true }), {
                      key: index,
                      item: store.rows[rowIndex],
                      data: store.rows[rowIndex].locals,
                      rowIndex
                  })))));
          }
          renderTableContent() {
              const { classnames: cx, tableClassName, store, placeholder, render, checkOnItemClick, buildItemProps, rowClassNameExpr, rowClassName, prefixRow, locale, affixRow, translate } = this.props;
              return (react_1.default.createElement(TableContent_1.TableContent, { tableClassName: cx(store.combineNum > 0 ? 'Table-table--withCombine' : '', tableClassName), classnames: cx, columns: store.filteredColumns, columnsGroup: store.columnGroup, rows: store.rows, placeholder: placeholder, render: render, onMouseMove: this.handleMouseMove, onScroll: this.handleOutterScroll, tableRef: this.tableRef, renderHeadCell: this.renderHeadCell, renderCell: this.renderCell, onCheck: this.handleCheck, onQuickChange: store.dragging ? undefined : this.handleQuickChange, footable: store.footable, footableColumns: store.footableColumns, checkOnItemClick: checkOnItemClick, buildItemProps: buildItemProps, onAction: this.handleAction, rowClassNameExpr: rowClassNameExpr, rowClassName: rowClassName, data: store.data, prefixRow: prefixRow, affixRow: affixRow, locale: locale, translate: translate }));
          }
          render() {
              const { className, store, classnames: cx, affixColumns } = this.props;
              this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了，已经渲染了就不重复渲染了。
              const heading = this.renderHeading();
              const header = this.renderHeader();
              const footer = this.renderFooter();
              const tableClassName = cx('Table-table', store.combineNum > 0 ? 'Table-table--withCombine' : '', this.props.tableClassName);
              return (react_1.default.createElement("div", { className: cx('Table', className, {
                      'Table--unsaved': !!store.modified || !!store.moved
                  }) },
                  heading,
                  header,
                  react_1.default.createElement("div", { className: cx('Table-contentWrap'), onMouseLeave: this.handleMouseLeave },
                      react_1.default.createElement("div", { className: cx('Table-fixedLeft'), onMouseMove: this.handleMouseMove }, affixColumns !== false && store.leftFixedColumns.length
                          ? this.renderFixedColumns(store.rows, store.leftFixedColumns, false, tableClassName)
                          : null),
                      react_1.default.createElement("div", { className: cx('Table-fixedRight'), onMouseMove: this.handleMouseMove }, affixColumns !== false && store.rightFixedColumns.length
                          ? this.renderFixedColumns(store.rows, store.rightFixedColumns, false, tableClassName)
                          : null),
                      this.renderTableContent(),
                      ~store.hoverIndex ? this.renderItemActions() : null),
                  this.renderAffixHeader(tableClassName),
                  footer));
          }
      }
      Table.propsList = [
          'header',
          'headerToolbarRender',
          'footer',
          'footerToolbarRender',
          'footable',
          'expandConfig',
          'placeholder',
          'tableClassName',
          'headingClassName',
          'source',
          'selectable',
          'columnsTogglable',
          'affixHeader',
          'affixColumns',
          'headerClassName',
          'footerClassName',
          'selected',
          'multiple',
          'primaryField',
          'hideQuickSaveBtn',
          'itemCheckableOn',
          'itemDraggableOn',
          'checkOnItemClick',
          'hideCheckToggler',
          'itemActions',
          'combineNum',
          'items',
          'columns',
          'valueField',
          'saveImmediately',
          'rowClassName',
          'rowClassNameExpr',
          'popOverContainer',
          'headerToolbarClassName',
          'toolbarClassName',
          'footerToolbarClassName'
      ];
      Table.defaultProps = {
          className: '',
          placeholder: 'placeholder.noData',
          tableClassName: '',
          source: '$items',
          selectable: false,
          columnsTogglable: 'auto',
          affixHeader: true,
          headerClassName: '',
          footerClassName: '',
          toolbarClassName: '',
          headerToolbarClassName: '',
          footerToolbarClassName: '',
          primaryField: 'id',
          itemCheckableOn: '',
          itemDraggableOn: '',
          hideCheckToggler: false,
          canAccessSuperData: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.DragEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Table.prototype, "handleDragStart", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Table.prototype, "handleDragOver", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Table.prototype, "handleDrop", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Table.prototype, "handleDragEnd", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Table.prototype, "handleImageEnlarge", null);
      return Table;
  })();
  exports.default = Table;
  let TableRenderer = /** @class */ (() => {
      let TableRenderer = class TableRenderer extends Table {
      };
      TableRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: (path) => /(^|\/)table$/.test(path) /* && !/(^|\/)table$/.test(path)*/,
              storeType: table_1.TableStore.name,
              name: 'table'
          })
      ], TableRenderer);
      return TableRenderer;
  })();
  exports.TableRenderer = TableRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1RhYmxlL2luZGV4LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHlDQUFzQztBQUN0QywyQ0FBc0Q7QUFFdEQscUVBQXFDO0FBQ3JDLHlDQUF1QztBQUN2QywrRUFBK0M7QUFDL0MsaUZBQWlEO0FBQ2pELDZFQUE2QztBQUM3Qyw2Q0FBeUU7QUFDekUsK0NBUTRCO0FBQzVCLHlEQUF3RDtBQUN4RCx1RUFBdUM7QUFDdkMsb0VBQWtDO0FBQ2xDLDZEQUF1RDtBQUN2RCwrREFBK0I7QUFDL0Isa0RBQTRDO0FBQzVDLDJDQUFzQztBQWd3RTlCLDBGQWh3RUEscUJBQVMsT0Fnd0VBO0FBOXZFakIscUVBQWdFO0FBQ2hFLHFFQUFnRTtBQUNoRSxpREFBNEM7QUFhNUMsNkNBQWdFO0FBQ2hFLDJDQUFzQztBQUd0QyxxREFBd0M7QUEwUHhDOztHQUVHO0FBQ0gsTUFBTSxjQUFjLEdBQUcsQ0FBQztJQUN0QixJQUFJLElBQXVCLENBQUM7SUFDNUIsT0FBTyxVQUFVLEdBQVc7UUFDMUIsSUFBSSxDQUFDLElBQUk7WUFBRSxJQUFJLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNoQixPQUFPLElBQUksQ0FBQyxJQUFJLENBQUM7SUFDbkIsQ0FBQyxDQUFDO0FBQ0osQ0FBQyxDQUFDLEVBQUUsQ0FBQztBQUVMOztJQUFBLE1BQXFCLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBNkI7UUFnRnBFLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBakJmLG1CQUFjLEdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDNUIsZUFBVSxHQUFXLENBQUMsQ0FB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

});
