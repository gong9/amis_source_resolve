amis.define('src/components/Alert.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Alert
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FinnalAlert = exports.prompt = exports.confirm = exports.alert = exports.setRenderSchemaFn = exports.Alert = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const Modal_1 = tslib_1.__importDefault(require("src/components/Modal.tsx"));
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const theme_1 = require("src/theme.tsx");
  const locale_1 = require("src/locale.tsx");
  const Html_1 = tslib_1.__importDefault(require("src/components/Html.tsx"));
  let Alert = /** @class */ (() => {
      class Alert extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  show: false,
                  title: '',
                  content: '',
                  confirm: false
              };
              this.close = this.close.bind(this);
              this.handleConfirm = this.handleConfirm.bind(this);
              this.handleCancel = this.handleCancel.bind(this);
              this.modalRef = this.modalRef.bind(this);
              this.handleFormSubmit = this.handleFormSubmit.bind(this);
              this.scopeRef = this.scopeRef.bind(this);
          }
          static getInstance() {
              if (!Alert.instance) {
                  console.warn('Alert 组件应该没有被渲染，所以隐性的渲染到 body 了');
                  const container = document.body;
                  const div = document.createElement('div');
                  container.appendChild(div);
                  react_dom_1.render(react_1.default.createElement(exports.FinnalAlert, null), div);
              }
              return Alert.instance;
          }
          componentWillMount() {
              Alert.instance = this;
          }
          componentDidMount() {
              this._body && (this._body.innerHTML = this.state.content);
          }
          componentDidUpdate(prevProps, prevState) {
              if (prevState.content !== this.state.content) {
                  this._body && (this._body.innerHTML = this.state.content);
              }
          }
          componentWillUnmount() {
              Alert.instance = null;
          }
          scopeRef(schemaSope) {
              this.schemaSope = schemaSope;
          }
          handleConfirm() {
              var _a;
              const form = (_a = this.schemaSope) === null || _a === void 0 ? void 0 : _a.getComponentByName('form');
              if (form) {
                  form.doAction({ type: 'submit' });
              }
              else {
                  this.close(true);
              }
          }
          handleCancel() {
              this.close(false);
          }
          close(confirmed) {
              const isConfirm = this.state.confirm || this.state.prompt;
              this.setState({
                  show: false
              }, isConfirm ? () => this._resolve(confirmed) /*this._reject()*/ : undefined);
          }
          alert(content, title) {
              this.setState({
                  title,
                  content,
                  show: true,
                  confirm: false
              });
          }
          confirm(content, title, confirmText) {
              this.setState({
                  title,
                  content,
                  show: true,
                  confirm: true,
                  confirmText
              });
              return new Promise(resolve => {
                  this._resolve = resolve;
              });
          }
          prompt(controls, defaultValue, title = 'placeholder.enter', confirmText = 'confirm') {
              if (typeof controls === 'string') {
                  // 兼容浏览器标准用法。
                  controls = [
                      {
                          name: 'text',
                          label: controls,
                          type: 'text'
                      }
                  ];
                  if (typeof defaultValue === 'string') {
                      defaultValue = {
                          text: defaultValue
                      };
                  }
              }
              else if (!Array.isArray(controls)) {
                  controls = [controls];
              }
              this.setState({
                  title,
                  controls,
                  show: true,
                  prompt: true,
                  value: defaultValue,
                  confirmText
              });
              return new Promise(resolve => {
                  this._resolve = resolve;
              });
          }
          modalRef(ref) {
              this._modal = ref;
          }
          handleFormSubmit(values) {
              this.close(values);
          }
          render() {
              var _a, _b;
              const { container, cancelText, confirmText, title, confirmBtnLevel, alertBtnLevel, classnames: cx, theme } = this.props;
              const __ = this.props.translate;
              const finalTitle = __((_a = this.state.title) !== null && _a !== void 0 ? _a : title);
              const finalConfirmText = __((_b = this.state.confirmText) !== null && _b !== void 0 ? _b : confirmText);
              return (react_1.default.createElement(Modal_1.default, { show: this.state.show, onHide: this.handleCancel, container: container, ref: this.modalRef, closeOnEsc: true },
                  finalTitle ? (react_1.default.createElement("div", { className: cx('Modal-header') },
                      react_1.default.createElement("div", { className: cx('Modal-title') }, finalTitle))) : null,
                  react_1.default.createElement("div", { className: cx('Modal-body') }, this.state.prompt ? (renderForm(this.state.controls, this.state.value, this.handleFormSubmit, this.scopeRef, theme)) : (react_1.default.createElement(Html_1.default, { html: this.state.content }))),
                  finalConfirmText ? (react_1.default.createElement("div", { className: cx('Modal-footer') },
                      this.state.confirm || this.state.prompt ? (react_1.default.createElement(Button_1.default, { onClick: this.handleCancel }, __(cancelText))) : null,
                      react_1.default.createElement(Button_1.default, { level: this.state.confirm || this.state.prompt
                              ? confirmBtnLevel
                              : alertBtnLevel, onClick: this.handleConfirm }, finalConfirmText))) : null));
          }
      }
      Alert.instance = null;
      Alert.defaultProps = {
          confirmText: 'confirm',
          cancelText: 'cancel',
          title: 'Alert.info',
          alertBtnLevel: 'primary',
          confirmBtnLevel: 'danger'
      };
      return Alert;
  })();
  exports.Alert = Alert;
  let renderSchemaFn;
  function setRenderSchemaFn(fn) {
      renderSchemaFn = fn;
  }
  exports.setRenderSchemaFn = setRenderSchemaFn;
  function renderForm(controls, value = {}, callback, scopeRef, theme) {
      return renderSchemaFn === null || renderSchemaFn === void 0 ? void 0 : renderSchemaFn(controls, value, callback, scopeRef, theme);
  }
  exports.alert = (content, title) => Alert.getInstance().alert(content, title);
  exports.confirm = (content, title, confirmText) => Alert.getInstance().confirm(content, title, confirmText);
  exports.prompt = (controls, defaultvalue, title, confirmText) => Alert.getInstance().prompt(controls, defaultvalue, title, confirmText);
  exports.FinnalAlert = theme_1.themeable(locale_1.localeable(Alert));
  exports.default = exports.FinnalAlert;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxlcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9BbGVydC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILDBEQUEwQjtBQUMxQix5Q0FBaUM7QUFDakMsNERBQTRCO0FBQzVCLDhEQUE4QjtBQUM5QixvQ0FBNkQ7QUFDN0Qsc0NBQWtEO0FBQ2xELDBEQUEwQjtBQXNCMUI7SUFBQSxNQUFhLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBaUM7UUF1QmhFLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBUGYsVUFBSyxHQUFlO2dCQUNsQixJQUFJLEVBQUUsS0FBSztnQkFDWCxLQUFLLEVBQUUsRUFBRTtnQkFDVCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7WUFJQSxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDM0MsQ0FB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

});
