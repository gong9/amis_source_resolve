amis.define('src/renderers/Cards.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CardsRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const factory_1 = require("src/factory.tsx");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const list_1 = require("src/store/list.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const sortablejs_1 = tslib_1.__importDefault(require("node_modules/sortablejs/Sortable"));
  const tpl_1 = require("src/utils/tpl.ts");
  const icons_1 = require("src/components/icons.tsx");
  let Cards = /** @class */ (() => {
      class Cards extends react_1.default.Component {
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
              this.bodyRef = this.bodyRef.bind(this);
              this.affixDetect = this.affixDetect.bind(this);
              this.itemsRef = this.itemsRef.bind(this);
              this.renderToolbar = this.renderToolbar.bind(this);
              // this.fixAlignmentLazy = debounce(this.fixAlignment.bind(this), 250, {
              //     trailing: true,
              //     leading: false
              // })
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
              typeof props.selected !== 'undefined' &&
                  store.updateSelected(props.selected, props.valueField);
          }
          componentWillMount() {
              const { store, selectable, draggable, orderBy, orderDir, multiple, hideCheckToggler, itemCheckableOn, itemDraggableOn } = this.props;
              store.update({
                  selectable,
                  draggable,
                  orderBy,
                  orderDir,
                  multiple,
                  hideCheckToggler,
                  itemCheckableOn,
                  itemDraggableOn
              });
              Cards.syncItems(store, this.props);
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
                      selectable: nextProps.selectable,
                      draggable: nextProps.draggable,
                      orderBy: nextProps.orderBy,
                      orderDir: nextProps.orderDir,
                      multiple: nextProps.multiple,
                      hideCheckToggler: nextProps.hideCheckToggler,
                      itemCheckableOn: nextProps.itemCheckableOn,
                      itemDraggableOn: nextProps.itemDraggableOn
                  });
              }
              if (helper_1.anyChanged(['source', 'value', 'items'], props, nextProps) ||
                  (!nextProps.value && !nextProps.items && nextProps.data !== props.data)) {
                  Cards.syncItems(store, nextProps, props);
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
          // fixAlignment() {
          //     if (!this.props.fixAlignment || this.props.masonryLayout) {
          //         return;
          //     }
          //     const dom = this.body as HTMLElement;
          //     const ns = this.props.classPrefix;
          //     const cards = [].slice.apply(dom.querySelectorAll(`.${ns}Cards-body > div`));
          //     if (!cards.length) {
          //         return;
          //     }
          //     let maxHeight = cards.reduce((maxHeight:number, item:HTMLElement) => Math.max(item.offsetHeight, maxHeight), 0);
          //     cards.forEach((item: HTMLElement) => item.style.cssText += `min-height: ${maxHeight}px;`);
          // }
          bodyRef(ref) {
              this.body = ref;
          }
          itemsRef(ref) {
              if (ref) {
                  // this.unSensor = resizeSensor(ref.parentNode as HTMLElement, this.fixAlignmentLazy);
              }
              else {
                  this.unSensor && this.unSensor();
                  // @ts-ignore;
                  delete this.unSensor;
              }
          }
          affixDetect() {
              var _a, _b;
              if (!this.props.affixHeader || !this.body) {
                  return;
              }
              const ns = this.props.classPrefix;
              const dom = react_dom_1.findDOMNode(this);
              const clip = this.body.getBoundingClientRect();
              const offsetY = (_b = (_a = this.props.affixOffsetTop) !== null && _a !== void 0 ? _a : this.props.env.affixOffsetTop) !== null && _b !== void 0 ? _b : 0;
              // 50 是 headerToolbar 的高度
              const toolbarHeight = this.renderedToolbars.length || this.props.headerToolbarRender ? 50 : 0;
              const affixed = clip.top - toolbarHeight < offsetY &&
                  clip.top + clip.height - 40 > offsetY;
              const afixedDom = dom.querySelector(`.${ns}Cards-fixedTop`);
              this.body.offsetWidth &&
                  (afixedDom.style.cssText = `top: ${offsetY}px;width: ${this.body.offsetWidth}px;`);
              affixed ? afixedDom.classList.add('in') : afixedDom.classList.remove('in');
              // store.markHeaderAffix(clip.top < offsetY && (clip.top + clip.height - 40) > offsetY);
          }
          handleAction(e, action, ctx) {
              const { onAction } = this.props;
              // 需要支持特殊事件吗？
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
          handleQuickChange(item, values, saveImmediately, saveSilent, resetOnFailed) {
              item.change(values, saveSilent);
              if (!saveImmediately || saveSilent) {
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
              this.sortable = new sortablejs_1.default(dom.querySelector(`.${ns}Cards-body`), {
                  group: 'table',
                  animation: 150,
                  handle: `.${ns}Card-dragBtn`,
                  ghostClass: `is-dragging`,
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
              let { actions, render, store, multiple, selectable, classnames: cx, classPrefix: ns, env } = this.props;
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
              return Array.isArray(actions) && actions.length ? (react_1.default.createElement("div", { className: cx('Cards-actions') }, actions.map((action, key) => render(`action/${key}`, Object.assign({ type: 'button' }, action), {
                  onAction: this.handleAction,
                  key,
                  btnDisabled: store.dragging
              })))) : null;
          }
          renderHeading() {
              let { title, store, hideQuickSaveBtn, classnames: cx, data } = this.props;
              if (title || (store.modified && !hideQuickSaveBtn) || store.moved) {
                  return (react_1.default.createElement("div", { className: cx('Cards-heading') }, store.modified && !hideQuickSaveBtn ? (react_1.default.createElement("span", null,
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
              const { header, headerClassName, headerToolbar, headerToolbarRender, showHeader, render, store, classnames: cx, translate: __ } = this.props;
              if (showHeader === false) {
                  return null;
              }
              const child = headerToolbarRender
                  ? headerToolbarRender(Object.assign(Object.assign({}, this.props), { selectedItems: store.selectedItems.map(item => item.data), items: store.items.map(item => item.data), unSelectedItems: store.unSelectedItems.map(item => item.data) }), this.renderToolbar)
                  : null;
              const actions = this.renderActions('header');
              const toolbarNode = actions || child || store.dragging ? (react_1.default.createElement("div", { className: cx('Cards-toolbar'), key: "header-toolbar" },
                  actions,
                  child,
                  store.dragging ? (react_1.default.createElement("div", { className: cx('Cards-dragTip'), ref: this.dragTipRef }, __('Card.dragTip'))) : null)) : null;
              const headerNode = header ? (react_1.default.createElement("div", { className: cx('Cards-header', headerClassName), key: "header" }, render('header', header))) : null;
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
              const toolbarNode = actions || child ? (react_1.default.createElement("div", { className: cx('Cards-toolbar'), key: "footer-toolbar" },
                  actions,
                  child)) : null;
              const footerNode = footer ? (react_1.default.createElement("div", { className: cx('Cards-footer', footerClassName), key: "footer" }, render('footer', footer))) : null;
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
              const { store, multiple, selectable, env, translate: __ } = this.props;
              if (!store.draggable || store.items.length < 2) {
                  return null;
              }
              return (react_1.default.createElement(Button_1.default, { iconOnly: true, key: "dragging-toggle", tooltip: __('Card.toggleDrag'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, size: "sm", active: store.dragging, onClick: (e) => {
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
              const { className, store, columnsCount, itemClassName, placeholder, render, affixHeader, card, onAction, multiple, hideCheckToggler, checkOnItemClick, masonryLayout, itemsClassName, classnames: cx, data, translate: __ } = this.props;
              this.renderedToolbars = []; // 用来记录哪些 toolbar 已经渲染了，已经渲染了就不重复渲染了。
              let itemFinalClassName = columnsCount
                  ? `Grid-col--sm${Math.round(12 / columnsCount)}`
                  : itemClassName || '';
              const header = this.renderHeader();
              const heading = this.renderHeading();
              const footer = this.renderFooter();
              let masonryClassName = '';
              if (masonryLayout) {
                  masonryClassName =
                      'Cards--masonry ' +
                          itemFinalClassName
                              .split(/\s/)
                              .map(item => {
                              if (/^Grid-col--(xs|sm|md|lg)(\d+)/.test(item)) {
                                  return `Cards--masonry${helper_1.ucFirst(RegExp.$1)}${RegExp.$2}`;
                              }
                              return item;
                          })
                              .join(' ');
              }
              return (react_1.default.createElement("div", { ref: this.bodyRef, className: cx('Cards', className, {
                      'Cards--unsaved': !!store.modified || !!store.moved
                  }) },
                  affixHeader ? (react_1.default.createElement("div", { className: cx('Cards-fixedTop') },
                      heading,
                      header)) : null,
                  heading,
                  header,
                  store.items.length ? (react_1.default.createElement("div", { ref: this.itemsRef, className: cx('Cards-body Grid', itemsClassName, masonryClassName) }, store.items.map((item, index) => {
                      return (react_1.default.createElement("div", { key: item.index, className: cx(itemFinalClassName) }, render(`${index}`, Object.assign({ 
                          // @ts-ignore
                          type: 'card' }, card), {
                          className: cx((card && card.className) || '', {
                              'is-checked': item.checked,
                              'is-modified': item.modified,
                              'is-moved': item.moved
                          }),
                          item,
                          intemIndex: item.index,
                          multiple,
                          hideCheckToggler,
                          selectable: store.selectable,
                          checkable: item.checkable,
                          draggable: item.draggable,
                          selected: item.checked,
                          onSelect: item.toggle,
                          dragging: store.dragging,
                          data: item.locals,
                          checkOnItemClick,
                          onAction,
                          onCheck: this.handleCheck,
                          onQuickChange: store.dragging
                              ? null
                              : this.handleQuickChange
                      })));
                  }))) : (react_1.default.createElement("div", { className: cx('Cards-placeholder') }, render('placeholder', __(placeholder)))),
                  footer));
          }
      }
      Cards.propsList = [
          'header',
          'headerToolbarRender',
          'footer',
          'footerToolbarRender',
          'placeholder',
          'source',
          'selectable',
          'headerClassName',
          'footerClassName',
          'fixAlignment',
          'hideQuickSaveBtn',
          'hideCheckToggler',
          'itemCheckableOn',
          'itemDraggableOn',
          'masonryLayout',
          'items',
          'valueField'
      ];
      Cards.defaultProps = {
          className: '',
          placeholder: 'placeholder.noData',
          source: '$items',
          selectable: false,
          headerClassName: '',
          footerClassName: '',
          itemClassName: 'Grid-col--sm6 Grid-col--md4 Grid-col--lg3',
          // fixAlignment: false,
          hideCheckToggler: false,
          masonryLayout: false,
          affixHeader: true,
          itemsClassName: ''
      };
      return Cards;
  })();
  exports.default = Cards;
  let CardsRenderer = /** @class */ (() => {
      let CardsRenderer = class CardsRenderer extends Cards {
      };
      CardsRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:crud\/body\/grid|cards)$/,
              name: 'cards',
              storeType: list_1.ListStore.name,
              weight: -100 // 默认的 grid 不是这样，这个只识别 crud 下面的 grid
          })
      ], CardsRenderer);
      return CardsRenderer;
  })();
  exports.CardsRenderer = CardsRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0NhcmRzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHlDQUFzQztBQUN0Qyx3Q0FBbUQ7QUFFbkQsMEVBQTBDO0FBQzFDLHdDQUEyRDtBQUUzRCw0Q0FLeUI7QUFDekIsc0RBQXFEO0FBQ3JELG9FQUFrQztBQUNsQyxzQ0FBb0M7QUFDcEMsK0NBQXlDO0FBaUp6QztJQUFBLE1BQXFCLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBNEI7UUEyQ25FLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUs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

});
