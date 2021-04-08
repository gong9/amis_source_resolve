amis.define('src/renderers/List.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListItemFieldRenderer = exports.ListItemRenderer = exports.ListItem = exports.ListRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const list_1 = require("src/store/list.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const QuickEdit_1 = tslib_1.__importDefault(require("src/renderers/QuickEdit.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/renderers/PopOver.tsx"));
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const Table_1 = require("src/renderers/Table/index.tsx");
  const Copyable_1 = tslib_1.__importDefault(require("src/renderers/Copyable.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  let List = /** @class */ (() => {
      class List extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleAction = this.handleAction.bind(this);
              this.handleCheck = this.handleCheck.bind(this);
              this.handleCheckAll = this.handleCheckAll.bind(this);
              this.handleQuickChange = this.handleQuickChange.bind(this);
              this.handleSave = this.handleSave.bind(this);
              this.handleSaveOrder = this.handleSaveOrder.bind(this);
              this.reset = this.reset.bind(this);
              this.dragTipRef = this.dragTipRef.bind(this);
              this.getPopOverContainer = this.getPopOverContainer.bind(this);
              this.affixDetect = this.affixDetect.bind(this);
              this.bodyRef = this.bodyRef.bind(this);
              this.renderToolbar = this.renderToolbar.bind(this);
          }
          static syncItems(store, props, prevProps) {
              const source = props.source;
              const value = props.value || props.items;
              let items = [];
              let updateItems = true;
              if (Array.isArray(value)) {
                  items = value;
              }
              else if (typeof source === 'string') {
                  const resolved = tpl_builtin_1.resolveVariable(source, props.data);
                  const prev = prevProps ? tpl_builtin_1.resolveVariable(source, prevProps.data) : null;
                  if (prev && prev === resolved) {
                      updateItems = false;
                  }
                  else if (Array.isArray(resolved)) {
                      items = resolved;
                  }
              }
              updateItems && store.initItems(items);
              Array.isArray(props.selected) &&
                  store.updateSelected(props.selected, props.valueField);
          }
          componentWillMount() {
              const { store, selectable, draggable, orderBy, orderDir, multiple, hideCheckToggler, itemCheckableOn, itemDraggableOn } = this.props;
              store.update({
                  multiple,
                  selectable,
                  draggable,
                  orderBy,
                  orderDir,
                  hideCheckToggler,
                  itemCheckableOn,
                  itemDraggableOn
              });
              List.syncItems(store, this.props);
              this.syncSelected();
          }
          componentDidMount() {
              let parent = helper_1.getScrollParent(react_dom_1.findDOMNode(this));
              if (!parent || parent === document.body) {
                  parent = window;
              }
              this.parentNode = parent;
              this.affixDetect();
              parent.addEventListener('scroll', this.affixDetect);
              window.addEventListener('resize', this.affixDetect);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const store = nextProps.store;
              if (helper_1.anyChanged([
                  'selectable',
                  'draggable',
                  'orderBy',
                  'orderDir',
                  'multiple',
                  'hideCheckToggler',
                  'itemCheckableOn',
                  'itemDraggableOn'
              ], props, nextProps)) {
                  store.update({
                      multiple: nextProps.multiple,
                      selectable: nextProps.selectable,
                      draggable: nextProps.draggable,
                      orderBy: nextProps.orderBy,
                      orderDir: nextProps.orderDir,
                      hideCheckToggler: nextProps.hideCheckToggler,
                      itemCheckableOn: nextProps.itemCheckableOn,
                      itemDraggableOn: nextProps.itemDraggableOn
                  });
              }
              if (helper_1.anyChanged(['source', 'value', 'items'], props, nextProps) ||
                  (!nextProps.value && !nextProps.items && nextProps.data !== props.data)) {
                  List.syncItems(store, nextProps, props);
                  this.syncSelected();
              }
              else if (props.selected !== nextProps.selected) {
                  store.updateSelected(nextProps.selected || [], nextProps.valueField);
              }
          }
          componentWillUnmount() {
              const parent = this.parentNode;
              parent && parent.removeEventListener('scroll', this.affixDetect);
              window.removeEventListener('resize', this.affixDetect);
          }
          bodyRef(ref) {
              this.body = ref;
          }
          affixDetect() {
              var _a, _b;
              if (!this.props.affixHeader || !this.body) {
                  return;
              }
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              const afixedDom = dom.querySelector(`.${ns}List-fixedTop`);
              if (!afixedDom) {
                  return;
              }
              const clip = this.body.getBoundingClientRect();
              const offsetY = (_b = (_a = this.props.affixOffsetTop) !== null && _a !== void 0 ? _a : this.props.env.affixOffsetTop) !== null && _b !== void 0 ? _b : 0;
              // 50 是 headerToolbar 的高度
              const toolbarHeight = this.renderedToolbars.length || this.props.headerToolbarRender ? 50 : 0;
              const affixed = clip.top - toolbarHeight < offsetY &&
                  clip.top + clip.height - 40 > offsetY;
              this.body.offsetWidth &&
                  (afixedDom.style.cssText = `top: ${offsetY}px;width: ${this.body.offsetWidth}px;`);
              affixed ? afixedDom.classList.add('in') : afixedDom.classList.remove('in');
              // store.markHeaderAffix(clip.top < offsetY && (clip.top + clip.height - 40) > offsetY);
          }
          getPopOverContainer() {
              return react_dom_1.findDOMNode(this);
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
          syncSelected() {
              const { store, onSelect } = this.props;
              onSelect &&
                  onSelect(store.selectedItems.map(item => item.data), store.unSelectedItems.map(item => item.data));
          }
          handleQuickChange(item, values, saveImmediately, savePristine, resetOnFailed) {
              item.change(values, savePristine);
              if (!saveImmediately || savePristine) {
                  return;
              }
              if (saveImmediately && saveImmediately.api) {
                  this.props.onAction(null, {
                      actionType: 'ajax',
                      api: saveImmediately.api
                  }, values);
                  return;
              }
              const { onSave, primaryField } = this.props;
              if (!onSave) {
                  return;
              }
              onSave(item.data, helper_1.difference(item.data, item.pristine, ['id', primaryField]), item.index, undefined, item.pristine, resetOnFailed);
          }
          handleSave() {
              const { store, onSave, primaryField } = this.props;
              if (!onSave || !store.modifiedItems.length) {
                  return;
              }
              const items = store.modifiedItems.map(item => item.data);
              const itemIndexes = store.modifiedItems.map(item => item.index);
              const diff = store.modifiedItems.map(item => helper_1.difference(item.data, item.pristine, ['id', primaryField]));
              const unModifiedItems = store.items
                  .filter(item => !item.modified)
                  .map(item => item.data);
              onSave(items, diff, itemIndexes, unModifiedItems, store.modifiedItems.map(item => item.pristine));
          }
          handleSaveOrder() {
              const { store, onSaveOrder } = this.props;
              if (!onSaveOrder || !store.movedItems.length) {
                  return;
              }
              onSaveOrder(store.movedItems.map(item => item.data), store.items.map(item => item.data));
          }
          reset() {
              const { store } = this.props;
              store.reset();
          }
          bulkUpdate(value, items) {
              const { store } = this.props;
              const items2 = store.items.filter(item => ~items.indexOf(item.pristine));
              items2.forEach(item => item.change(value));
          }
          getSelected() {
              const { store } = this.props;
              return store.selectedItems.map(item => item.data);
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
          initDragging() {
              const store = this.props.store;
              const dom = react_dom_1.findDOMNode(this);
              const ns = this.props.classPrefix;
              this.sortable = new sortablejs_1.default(dom.querySelector(`.${ns}List-items`), {
                  group: 'table',
                  animation: 150,
                  handle: `.${ns}ListItem-dragBtn`,
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
          renderActions(region) {
              let { actions, render, store, multiple, selectable, env, classPrefix: ns, classnames: cx } = this.props;
              let btn;
              actions = Array.isArray(actions) ? actions.concat() : [];
              if (!~this.renderedToolbars.indexOf('check-all') &&
                  (btn = this.renderCheckAll())) {
                  actions.unshift({
                      type: 'button',
                      children: btn
                  });
              }
              if (region === 'header' &&
                  !~this.renderedToolbars.indexOf('drag-toggler') &&
                  (btn = this.renderDragToggler())) {
                  actions.unshift({
                      type: 'button',
                      children: btn
                  });
              }
              return Array.isArray(actions) && actions.length ? (react_1.default.createElement("div", { className: cx('List-actions') }, actions.map((action, key) => render(`action/${key}`, Object.assign({ type: 'button' }, action), {
                  onAction: this.handleAction,
                  key,
                  btnDisabled: store.dragging
              })))) : null;
          }
          renderHeading() {
              let { title, store, hideQuickSaveBtn, classnames: cx, data } = this.props;
              if (title || (store.modified && !hideQuickSaveBtn) || store.moved) {
                  return (react_1.default.createElement("div", { className: cx('List-heading') }, store.modified && !hideQuickSaveBtn ? (react_1.default.createElement("span", null,
                      `当前有 ${store.modified} 条记录修改了内容, 但并没有提交。请选择:`,
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSave },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon m-r-xs" }),
                          "\u63D0\u4EA4"),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon m-r-xs" }),
                          "\u653E\u5F03"))) : store.moved ? (react_1.default.createElement("span", null,
                      `当前有 ${store.moved} 条记录修改了顺序, 但并没有提交。请选择:`,
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--success m-l-sm'), onClick: this.handleSaveOrder },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon m-r-xs" }),
                          "\u63D0\u4EA4"),
                      react_1.default.createElement("button", { type: "button", className: cx('Button Button--xs Button--danger m-l-sm'), onClick: this.reset },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon m-r-xs" }),
                          "\u653E\u5F03"))) : title ? (tpl_1.filter(title, data)) : ('')));
              }
              return null;
          }
          renderHeader() {
              const { header, headerClassName, headerToolbar, headerToolbarRender, render, showHeader, store, classnames: cx } = this.props;
              if (showHeader === false) {
                  return null;
              }
              const child = headerToolbarRender
                  ? headerToolbarRender(Object.assign(Object.assign({}, this.props), { selectedItems: store.selectedItems.map(item => item.data), items: store.items.map(item => item.data), unSelectedItems: store.unSelectedItems.map(item => item.data) }), this.renderToolbar)
                  : null;
              const actions = this.renderActions('header');
              const toolbarNode = actions || child || store.dragging ? (react_1.default.createElement("div", { className: cx('List-toolbar', headerClassName), key: "header-toolbar" },
                  actions,
                  child,
                  store.dragging ? (react_1.default.createElement("div", { className: cx('List-dragTip'), ref: this.dragTipRef }, "\u8BF7\u62D6\u52A8\u5DE6\u8FB9\u7684\u6309\u94AE\u8FDB\u884C\u6392\u5E8F")) : null)) : null;
              const headerNode = header && (!Array.isArray(header) || header.length) ? (react_1.default.createElement("div", { className: cx('List-header', headerClassName), key: "header" }, render('header', header))) : null;
              return headerNode && toolbarNode
                  ? [headerNode, toolbarNode]
                  : headerNode || toolbarNode || null;
          }
          renderFooter() {
              const { footer, footerClassName, footerToolbar, footerToolbarRender, render, showFooter, store, classnames: cx } = this.props;
              if (showFooter === false) {
                  return null;
              }
              const child = footerToolbarRender
                  ? footerToolbarRender(Object.assign(Object.assign({}, this.props), { selectedItems: store.selectedItems.map(item => item.data), items: store.items.map(item => item.data), unSelectedItems: store.unSelectedItems.map(item => item.data) }), this.renderToolbar)
                  : null;
              const actions = this.renderActions('footer');
              const toolbarNode = actions || child ? (react_1.default.createElement("div", { className: cx('List-toolbar', footerClassName), key: "footer-toolbar" },
                  actions,
                  child)) : null;
              const footerNode = footer && (!Array.isArray(footer) || footer.length) ? (react_1.default.createElement("div", { className: cx('List-footer', footerClassName), key: "footer" }, render('footer', footer))) : null;
              return footerNode && toolbarNode
                  ? [toolbarNode, footerNode]
                  : footerNode || toolbarNode || null;
          }
          renderCheckAll() {
              const { store, multiple, selectable } = this.props;
              if (!store.selectable ||
                  !multiple ||
                  !selectable ||
                  store.dragging ||
                  !store.items.length) {
                  return null;
              }
              return (react_1.default.createElement(Button_1.default, { key: "checkall", tooltip: "\u5207\u6362\u5168\u9009", onClick: this.handleCheckAll, size: "sm", level: store.allChecked ? 'info' : 'default' }, "\u5168\u9009"));
          }
          renderDragToggler() {
              const { store, multiple, selectable, env } = this.props;
              if (!store.draggable || store.items.length < 2) {
                  return null;
              }
              return (react_1.default.createElement(Button_1.default, { iconOnly: true, key: "dragging-toggle", tooltip: "\u5BF9\u5217\u8868\u8FDB\u884C\u6392\u5E8F\u64CD\u4F5C", tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, size: "sm", active: store.dragging, onClick: (e) => {
                      e.preventDefault();
                      store.toggleDragging();
                      store.dragging && store.clear();
                  } },
                  react_1.default.createElement(icons_1.Icon, { icon: "exchange", className: "icon r90" })));
          }
          renderToolbar(toolbar, index) {
              const type = toolbar.type || toolbar;
              if (type === 'drag-toggler') {
                  this.renderedToolbars.push(type);
                  return this.renderDragToggler();
              }
              else if (type === 'check-all') {
                  this.renderedToolbars.push(type);
                  return this.renderCheckAll();
              }
              return void 0;
          }
          render() {
              const { className, itemClassName, store, placeholder, render, multiple, listItem, onAction, hideCheckToggler, checkOnItemClick, affixHeader, classnames: cx, size, translate: __ } = this.props;
              this.renderedToolbars = [];
              const heading = this.renderHeading();
              const header = this.renderHeader();
              return (react_1.default.createElement("div", { className: cx('List', className, {
                      [`List--${size}`]: size,
                      'List--unsaved': !!store.modified || !!store.moved
                  }), ref: this.bodyRef },
                  affixHeader && heading && header ? (react_1.default.createElement("div", { className: cx('List-fixedTop') },
                      heading,
                      header)) : null,
                  heading,
                  header,
                  store.items.length ? (react_1.default.createElement("div", { className: cx('List-items') }, store.items.map((item, index) => render(`${index}`, Object.assign({ type: 'list-item' }, listItem), {
                      key: item.index,
                      className: cx(itemClassName, {
                          'is-checked': item.checked,
                          'is-modified': item.modified,
                          'is-moved': item.moved
                      }),
                      selectable: store.selectable,
                      checkable: item.checkable,
                      multiple,
                      item,
                      itemIndex: item.index,
                      hideCheckToggler,
                      checkOnItemClick,
                      selected: item.checked,
                      onCheck: this.handleCheck,
                      dragging: store.dragging,
                      onAction,
                      data: item.locals,
                      onQuickChange: store.dragging ? null : this.handleQuickChange,
                      popOverContainer: this.getPopOverContainer
                  })))) : (react_1.default.createElement("div", { className: cx('List-placeholder') }, render('placeholder', __(placeholder)))),
                  this.renderFooter()));
          }
      }
      List.propsList = [
          'header',
          'headerToolbarRender',
          'footer',
          'footerToolbarRender',
          'placeholder',
          'source',
          'selectable',
          'headerClassName',
          'footerClassName',
          'hideQuickSaveBtn',
          'hideCheckToggler',
          'itemCheckableOn',
          'itemDraggableOn',
          'actions',
          'items',
          'valueField'
      ];
      List.defaultProps = {
          className: '',
          placeholder: 'placeholder.noData',
          source: '$items',
          selectable: false,
          headerClassName: '',
          footerClassName: '',
          affixHeader: true
      };
      return List;
  })();
  exports.default = List;
  let ListRenderer = /** @class */ (() => {
      let ListRenderer = class ListRenderer extends List {
      };
      ListRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:list|list-group)$/,
              storeType: list_1.ListStore.name,
              name: 'list'
          })
      ], ListRenderer);
      return ListRenderer;
  })();
  exports.ListRenderer = ListRenderer;
  let ListItem = /** @class */ (() => {
      class ListItem extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.itemRender = this.itemRender.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleQuickChange = this.handleQuickChange.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleCheck = this.handleCheck.bind(this);
          }
          handleClick(e) {
              const target = e.target;
              const ns = this.props.classPrefix;
              let formItem;
              if (!e.currentTarget.contains(target) ||
                  ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
                  ((formItem = target.closest(`button, a, .${ns}Form-item`)) &&
                      e.currentTarget.contains(formItem))) {
                  return;
              }
              const item = this.props.item;
              this.props.onCheck && this.props.onCheck(item);
          }
          handleCheck() {
              const item = this.props.item;
              this.props.onCheck && this.props.onCheck(item);
          }
          handleAction(e, action, ctx) {
              const { onAction, item } = this.props;
              onAction && onAction(e, action, ctx || item.data);
          }
          handleQuickChange(values, saveImmediately, savePristine, resetOnFailed) {
              const { onQuickChange, item } = this.props;
              onQuickChange &&
                  onQuickChange(item, values, saveImmediately, savePristine, resetOnFailed);
          }
          renderLeft() {
              const { dragging, selectable, selected, checkable, multiple, hideCheckToggler, checkOnItemClick, classnames: cx, classPrefix: ns } = this.props;
              if (dragging) {
                  return (react_1.default.createElement("div", { className: cx('ListItem-dragBtn') },
                      react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" })));
              }
              else if (selectable && !hideCheckToggler) {
                  return (react_1.default.createElement("div", { className: cx('ListItem-checkBtn') },
                      react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', disabled: !checkable, checked: selected, onChange: checkOnItemClick ? helper_1.noop : this.handleCheck, inline: true })));
              }
              return null;
          }
          renderRight() {
              const { actions, render, data, dragging, classnames: cx } = this.props;
              if (Array.isArray(actions)) {
                  return (react_1.default.createElement("div", { className: cx('ListItem-actions') }, actions.map((action, index) => {
                      if (!helper_1.isVisible(action, data)) {
                          return null;
                      }
                      return render(`action/${index}`, Object.assign({ size: 'sm', level: 'link', type: 'button' }, action // todo 等后面修复了干掉 https://github.com/microsoft/TypeScript/pull/38577
                      ), {
                          key: index,
                          disabled: dragging || helper_1.isDisabled(action, data),
                          onAction: this.handleAction
                      });
                  })));
              }
              return null;
          }
          renderChild(node, region = 'body', key = 0) {
              const { render } = this.props;
              /*if (Array.isArray(node)) {
                      return (
                          <div className="hbox" key={key}>
                              {node.map((item, index) => (
                                  <div key={index} className="col">{this.renderChild(item, `${region}/${index}`)}</div>
                              ))}
                          </div>
                      );
                  } else */ if (typeof node === 'string' ||
                  typeof node === 'number') {
                  return render(region, node, { key });
              }
              const childNode = node;
              if (childNode.type === 'hbox' || childNode.type === 'grid') {
                  return render(region, node, {
                      key,
                      itemRender: this.itemRender
                  });
              }
              return this.renderFeild(region, childNode, key, this.props);
          }
          itemRender(field, index, props) {
              return this.renderFeild(`column/${index}`, field, index, props);
          }
          renderFeild(region, field, key, props) {
              const render = props.render || this.props.render;
              const data = this.props.data;
              const cx = this.props.classnames;
              const itemIndex = this.props.itemIndex;
              const $$id = field.$$id ? `${field.$$id}-field` : '';
              if (!helper_1.isVisible(field, data)) {
                  return null;
              }
              return (react_1.default.createElement("div", { key: key, className: cx('ListItem-field') },
                  field && field.label ? (react_1.default.createElement("label", { className: cx('ListItem-fieldLabel', field.labelClassName) }, field.label)) : null,
                  render(region, Object.assign(Object.assign({}, field), { field: field, $$id, type: 'list-item-field' }), {
                      rowIndex: itemIndex,
                      colIndex: key,
                      className: cx('ListItem-fieldValue', field.className),
                      value: field.name ? tpl_builtin_1.resolveVariable(field.name, data) : `-`,
                      onAction: this.handleAction,
                      onQuickChange: this.handleQuickChange
                  })));
          }
          renderBody() {
              const { body } = this.props;
              if (!body) {
                  return null;
              }
              else if (Array.isArray(body)) {
                  return body.map((child, index) => this.renderChild(Object.assign({ type: 'plain' }, (typeof child === 'string' ? { type: 'tpl', tpl: child } : child)), `body/${index}`, index));
              }
              return this.renderChild(body, 'body');
          }
          render() {
              const { className, data, avatar: avatarTpl, title: titleTpl, titleClassName, subTitle: subTitleTpl, desc: descTpl, avatarClassName, checkOnItemClick, render, checkable, classnames: cx, actionsPosition } = this.props;
              const avatar = tpl_1.filter(avatarTpl, data);
              const title = tpl_1.filter(titleTpl, data);
              const subTitle = tpl_1.filter(subTitleTpl, data);
              const desc = tpl_1.filter(descTpl, data);
              return (react_1.default.createElement("div", { onClick: checkOnItemClick && checkable ? this.handleClick : undefined, className: cx(`ListItem ListItem--actions-at-${actionsPosition || 'right'}`, className) },
                  this.renderLeft(),
                  this.renderRight(),
                  avatar ? (react_1.default.createElement("span", { className: cx('ListItem-avatar', avatarClassName) },
                      react_1.default.createElement("img", { src: avatar, alt: "..." }))) : null,
                  react_1.default.createElement("div", { className: cx('ListItem-content') },
                      title ? (react_1.default.createElement("p", { className: cx('ListItem-title', titleClassName) }, title)) : null,
                      subTitle ? (react_1.default.createElement("div", null,
                          react_1.default.createElement("small", { className: cx('ListItem-subtitle') }, subTitle))) : null,
                      desc ? render('description', desc) : null,
                      this.renderBody())));
          }
      }
      ListItem.defaultProps = {
          avatarClassName: 'thumb-sm avatar m-r',
          titleClassName: 'h5'
      };
      ListItem.propsList = ['avatarClassName', 'titleClassName'];
      return ListItem;
  })();
  exports.ListItem = ListItem;
  let ListItemRenderer = /** @class */ (() => {
      let ListItemRenderer = class ListItemRenderer extends ListItem {
      };
      ListItemRenderer.propsList = ['multiple', ...ListItem.propsList];
      ListItemRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:list|list-group)\/(?:.*\/)?list-item$/,
              name: 'list-item'
          })
      ], ListItemRenderer);
      return ListItemRenderer;
  })();
  exports.ListItemRenderer = ListItemRenderer;
  let ListItemFieldRenderer = /** @class */ (() => {
      let ListItemFieldRenderer = class ListItemFieldRenderer extends Table_1.TableCell {
          render() {
              let _a = this.props, { className, render, style, wrapperComponent: Component, labelClassName, value, data, children, width, innerClassName, label, tabIndex, onKeyUp, field } = _a, rest = tslib_1.__rest(_a, ["className", "render", "style", "wrapperComponent", "labelClassName", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "field"]);
              const schema = Object.assign(Object.assign({}, field), { className: innerClassName, type: (field && field.type) || 'plain' });
              let body = children
                  ? children
                  : render('field', schema, Object.assign(Object.assign({}, rest), { value,
                      data }));
              if (width) {
                  style = style || {};
                  style.width = style.width || width;
                  body = (react_1.default.createElement("div", { style: { width: !/%/.test(String(width)) ? width : '' } }, body));
              }
              if (!Component) {
                  return body;
              }
              return (react_1.default.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
          }
      };
      ListItemFieldRenderer.defaultProps = Object.assign(Object.assign({}, Table_1.TableCell.defaultProps), { wrapperComponent: 'div' });
      ListItemFieldRenderer.propsList = [
          'quickEdit',
          'quickEditEnabledOn',
          'popOver',
          'copyable',
          'inline',
          ...Table_1.TableCell.propsList
      ];
      ListItemFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)list-item-field$/,
              name: 'list-item-field'
          }),
          QuickEdit_1.default(),
          PopOver_1.default(),
          Copyable_1.default()
      ], ListItemFieldRenderer);
      return ListItemFieldRenderer;
  })();
  exports.ListItemFieldRenderer = ListItemFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvTGlzdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMsd0NBQW1EO0FBRW5ELHNDQUFvQztBQUVwQywwRUFBMEM7QUFDMUMsOEVBQThDO0FBQzlDLHdDQUEyRDtBQUUzRCw0Q0FPeUI7QUFDekIsc0RBQXFEO0FBQ3JELG9FQUF1RDtBQUN2RCxnRUFBaUQ7QUFDakQsb0VBQWtDO0FBQ2xDLG1DQUFrQztBQUNsQyxrRUFBb0Q7QUFDcEQsK0NBQXlDO0FBME56QztJQUFBLE1BQXFCLElBQUssU0FBUSxlQUFLLENBQUMsU0FBNEI7UUFtQ2xFLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFB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

});
