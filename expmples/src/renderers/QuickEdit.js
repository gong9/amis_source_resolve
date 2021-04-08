amis.define('src/renderers/QuickEdit.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file scoped.jsx.
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HocQuickEdit = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const keycode_1 = tslib_1.__importDefault(require("node_modules/keycode/index"));
  const matches_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/query/matches"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  let inited = false;
  let currentOpened;
  exports.HocQuickEdit = (config = {}) => (Component) => {
      let QuickEditComponent = /** @class */ (() => {
          class QuickEditComponent extends react_1.default.PureComponent {
              constructor(props) {
                  super(props);
                  this.openQuickEdit = this.openQuickEdit.bind(this);
                  this.closeQuickEdit = this.closeQuickEdit.bind(this);
                  this.handleAction = this.handleAction.bind(this);
                  this.handleSubmit = this.handleSubmit.bind(this);
                  this.handleKeyUp = this.handleKeyUp.bind(this);
                  this.overlayRef = this.overlayRef.bind(this);
                  this.handleWindowKeyPress = this.handleWindowKeyPress.bind(this);
                  this.handleWindowKeyDown = this.handleWindowKeyDown.bind(this);
                  this.formRef = this.formRef.bind(this);
                  this.handleInit = this.handleInit.bind(this);
                  this.handleChange = this.handleChange.bind(this);
                  this.state = {
                      isOpened: false
                  };
              }
              componentDidMount() {
                  this.target = react_dom_1.findDOMNode(this);
                  if (inited) {
                      return;
                  }
                  inited = true;
                  document.body.addEventListener('keypress', this.handleWindowKeyPress);
                  document.body.addEventListener('keydown', this.handleWindowKeyDown);
              }
              formRef(ref) {
                  const { quickEditFormRef, rowIndex, colIndex } = this.props;
                  if (quickEditFormRef) {
                      while (ref && ref.getWrappedInstance) {
                          ref = ref.getWrappedInstance();
                      }
                      quickEditFormRef(ref, colIndex, rowIndex);
                  }
              }
              handleWindowKeyPress(e) {
                  const ns = this.props.classPrefix;
                  let el = e.target.closest(`.${ns}Field--quickEditable`);
                  if (!el) {
                      return;
                  }
                  const table = el.closest('table');
                  if (!table) {
                      return;
                  }
                  if (keycode_1.default(e) === 'space' &&
                      !~['INPUT', 'TEXTAREA'].indexOf(el.tagName)) {
                      e.preventDefault();
                      e.stopPropagation();
                  }
              }
              handleWindowKeyDown(e) {
                  const code = keycode_1.default(e);
                  if (code === 'esc' && currentOpened) {
                      currentOpened.closeQuickEdit();
                  }
                  else if (~['INPUT', 'TEXTAREA'].indexOf(e.target.tagName) ||
                      e.target.contentEditable === 'true' ||
                      !~['up', 'down', 'left', 'right'].indexOf(code)) {
                      return;
                  }
                  e.preventDefault();
                  const ns = this.props.classPrefix;
                  let el = e.target.closest(`.${ns}Field--quickEditable`) ||
                      document.querySelector(`.${ns}Field--quickEditable`);
                  if (!el) {
                      return;
                  }
                  let table = el.closest('table');
                  if (!table) {
                      return;
                  }
                  let current = table.querySelector(`.${ns}Field--quickEditable:focus`);
                  if (!current) {
                      let dom = table.querySelector(`.${ns}Field--quickEditable[tabindex]`);
                      dom && dom.focus();
                  }
                  else {
                      let prevTr, nextTr, prevTd, nextTd;
                      switch (code) {
                          case 'up':
                              prevTr = current.parentNode
                                  .previousSibling;
                              if (prevTr) {
                                  let index = current.cellIndex;
                                  prevTr.children[index].focus();
                              }
                              break;
                          case 'down':
                              nextTr = current.parentNode
                                  .nextSibling;
                              if (nextTr) {
                                  let index = current.cellIndex;
                                  nextTr.children[index].focus();
                              }
                              break;
                          case 'left':
                              prevTd = current.previousElementSibling;
                              while (prevTd) {
                                  if (matches_1.default(prevTd, `.${ns}Field--quickEditable[tabindex]`)) {
                                      break;
                                  }
                                  prevTd = prevTd.previousElementSibling;
                              }
                              if (prevTd) {
                                  prevTd.focus();
                              }
                              else if (current.parentNode.previousSibling) {
                                  let tds = current.parentNode
                                      .previousSibling.querySelectorAll(`.${ns}Field--quickEditable[tabindex]`);
                                  if (tds.length) {
                                      tds[tds.length - 1].focus();
                                  }
                              }
                              break;
                          case 'right':
                              nextTd = current.nextSibling;
                              while (nextTd) {
                                  if (matches_1.default(nextTd, `.${ns}Field--quickEditable[tabindex]`)) {
                                      break;
                                  }
                                  nextTd = nextTd.nextSibling;
                              }
                              if (nextTd) {
                                  nextTd.focus();
                              }
                              else if (current.parentNode.nextSibling) {
                                  nextTd = current.parentNode
                                      .nextSibling.querySelector(`.${ns}Field--quickEditable[tabindex]`);
                                  if (nextTd) {
                                      nextTd.focus();
                                  }
                              }
                              break;
                      }
                  }
              }
              // handleClickOutside() {
              //     this.closeQuickEdit();
              // }
              overlayRef(ref) {
                  this.overlay = ref;
              }
              handleAction(e, action, ctx) {
                  const { onAction } = this.props;
                  if (action.actionType === 'cancel' || action.actionType === 'close') {
                      this.closeQuickEdit();
                      return;
                  }
                  onAction && onAction(e, action, ctx);
              }
              handleSubmit(values) {
                  const { onQuickChange, quickEdit } = this.props;
                  this.closeQuickEdit();
                  onQuickChange(values, quickEdit.saveImmediately, false, quickEdit.resetOnFailed);
              }
              handleInit(values) {
                  const { onQuickChange } = this.props;
                  onQuickChange(values, false, true);
              }
              handleChange(values) {
                  const { onQuickChange, quickEdit } = this.props;
                  onQuickChange(values, quickEdit.saveImmediately, false, quickEdit.resetOnFailed);
              }
              openQuickEdit() {
                  currentOpened = this;
                  this.setState({
                      isOpened: true
                  });
              }
              closeQuickEdit() {
                  if (!this.state.isOpened) {
                      return;
                  }
                  currentOpened = null;
                  const ns = this.props.classPrefix;
                  this.setState({
                      isOpened: false
                  }, () => {
                      let el = react_dom_1.findDOMNode(this);
                      let table = el.closest('table');
                      ((table &&
                          table.querySelectorAll(`td.${ns}Field--quickEditable:focus`)
                              .length) ||
                          el) &&
                          el.focus();
                  });
              }
              buildSchema() {
                  const { quickEdit, name, label, translate: __ } = this.props;
                  let schema;
                  if (quickEdit === true) {
                      schema = {
                          type: 'form',
                          title: '',
                          autoFocus: true,
                          controls: [
                              {
                                  type: 'text',
                                  name,
                                  placeholder: label,
                                  label: false
                              }
                          ]
                      };
                  }
                  else if (quickEdit) {
                      if ((quickEdit.controls &&
                          !~['combo', 'group', 'panel', 'fieldSet'].indexOf(quickEdit.type)) ||
                          quickEdit.tabs ||
                          quickEdit.fieldSet) {
                          schema = Object.assign(Object.assign({ title: '', autoFocus: quickEdit.mode !== 'inline' }, quickEdit), { mode: 'noraml', type: 'form' });
                      }
                      else {
                          schema = {
                              title: '',
                              className: quickEdit.formClassName,
                              type: 'form',
                              autoFocus: quickEdit.mode !== 'inline',
                              mode: 'normal',
                              controls: [
                                  Object.assign(Object.assign({ type: quickEdit.type || 'text', name: quickEdit.name || name }, quickEdit), { mode: undefined })
                              ]
                          };
                      }
                  }
                  if (schema) {
                      schema = Object.assign(Object.assign({}, schema), { wrapWithPanel: quickEdit.mode !== 'inline', actions: quickEdit.mode === 'inline'
                              ? []
                              : [
                                  {
                                      type: 'button',
                                      label: __('cancle'),
                                      actionType: 'cancel'
                                  },
                                  {
                                      label: __('confirm'),
                                      type: 'submit',
                                      primary: true
                                  }
                              ] });
                  }
                  return schema || 'error';
              }
              handleKeyUp(e) {
                  const code = keycode_1.default(e);
                  if (code === 'space' &&
                      !~['INPUT', 'TEXTAREA'].indexOf(e.target.tagName)) {
                      e.preventDefault();
                      e.stopPropagation();
                      this.openQuickEdit();
                  }
              }
              renderPopOver() {
                  let { quickEdit, render, popOverContainer, classPrefix: ns, classnames: cx, canAccessSuperData } = this.props;
                  const content = (react_1.default.createElement("div", { ref: this.overlayRef, className: cx(quickEdit.className) }, render('quick-edit-form', this.buildSchema(), {
                      onSubmit: this.handleSubmit,
                      onAction: this.handleAction,
                      onChange: null,
                      formLazyChange: false,
                      ref: this.formRef,
                      popOverContainer: () => this.overlay,
                      canAccessSuperData
                  })));
                  popOverContainer = popOverContainer || (() => react_dom_1.findDOMNode(this));
                  return (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, target: () => this.target, onHide: this.closeQuickEdit, placement: "left-top right-top left-bottom right-bottom left-top", show: true },
                      react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: cx(`${ns}QuickEdit-popover`, quickEdit.popOverClassName), onHide: this.closeQuickEdit, overlay: true }, content)));
              }
              render() {
                  const { onQuickChange, quickEdit, quickEditEnabled, className, classnames: cx, render, noHoc, canAccessSuperData } = this.props;
                  if (!quickEdit || !onQuickChange || quickEditEnabled === false || noHoc) {
                      return react_1.default.createElement(Component, Object.assign({}, this.props));
                  }
                  if (quickEdit.mode === 'inline') {
                      return (react_1.default.createElement(Component, Object.assign({}, this.props), render('inline-form', this.buildSchema(), {
                          wrapperComponent: 'div',
                          className: cx('Form--quickEdit'),
                          ref: this.formRef,
                          simpleMode: true,
                          onInit: this.handleInit,
                          onChange: this.handleChange,
                          formLazyChange: false,
                          canAccessSuperData
                      })));
                  }
                  else {
                      return (react_1.default.createElement(Component, Object.assign({}, this.props, { className: cx(`Field--quickEditable`, className, {
                              in: this.state.isOpened
                          }), tabIndex: quickEdit.focusable === false
                              ? undefined
                              : '0', onKeyUp: this.handleKeyUp }),
                          react_1.default.createElement(Component, Object.assign({}, this.props, { wrapperComponent: '', noHoc: true })),
                          react_1.default.createElement("span", { key: "edit-btn", className: cx('Field-quickEditBtn'), onClick: this.openQuickEdit },
                              react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" })),
                          this.state.isOpened ? this.renderPopOver() : null));
                  }
              }
          }
          QuickEditComponent.ComposedComponent = Component;
          return QuickEditComponent;
      })();
      hoist_non_react_statics_1.default(QuickEditComponent, Component);
      return QuickEditComponent;
  };
  exports.default = exports.HocQuickEdit;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tFZGl0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9RdWlja0VkaXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7Ozs7QUFFSCwwREFBMEI7QUFDMUIseUNBQXNDO0FBTXRDLDhGQUEwRDtBQUcxRCw4REFBOEI7QUFDOUIsZ0ZBQWdEO0FBQ2hELDRFQUE0QztBQUM1Qyw0RUFBNEM7QUFDNUMsK0NBQXlDO0FBd0V6QyxJQUFJLE1BQU0sR0FBWSxLQUFLLENBQUM7QUFDNUIsSUFBSSxhQUFrQixDQUFDO0FBRVYsUUFBQSxZQUFZLEdBQUcsQ0FBQyxTQUFtQyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQ3JFLFNBQW1DLEVBQzlCLEVBQUU7SUFDUDtRQUFBLE1BQU0sa0JBQW1CLFNBQVEsZUFBSyxDQUFDLGFBR3RDO1lBSUMsWUFBWSxLQUFxQjtnQkFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUViLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ25ELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3JELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUs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

});
