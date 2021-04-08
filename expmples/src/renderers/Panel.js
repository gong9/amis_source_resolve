amis.define('src/renderers/Panel.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PanelRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const react_dom_1 = require("node_modules/react-dom/index");
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  let Panel = /** @class */ (() => {
      class Panel extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.affixDom = react_1.default.createRef();
              this.footerDom = react_1.default.createRef();
          }
          componentDidMount() {
              const dom = react_dom_1.findDOMNode(this);
              let parent = dom ? helper_1.getScrollParent(dom) : null;
              if (!parent || parent === document.body) {
                  parent = window;
              }
              this.parentNode = parent;
              parent.addEventListener('scroll', this.affixDetect);
              this.unSensor = resize_sensor_1.resizeSensor(dom, this.affixDetect);
              this.affixDetect();
          }
          componentWillUnmount() {
              const parent = this.parentNode;
              parent && parent.removeEventListener('scroll', this.affixDetect);
              this.unSensor && this.unSensor();
              clearTimeout(this.timer);
          }
          affixDetect() {
              var _a, _b;
              if (!this.props.affixFooter ||
                  !this.affixDom.current ||
                  !this.footerDom.current) {
                  return;
              }
              const affixDom = this.affixDom.current;
              const footerDom = this.footerDom.current;
              const offsetBottom = (_b = (_a = this.props.affixOffsetBottom) !== null && _a !== void 0 ? _a : this.props.env.affixOffsetBottom) !== null && _b !== void 0 ? _b : 0;
              let affixed = false;
              if (footerDom.offsetWidth) {
                  affixDom.style.cssText = `bottom: ${offsetBottom}px;width: ${footerDom.offsetWidth}px`;
              }
              else {
                  this.timer = setTimeout(this.affixDetect, 250);
                  return;
              }
              if (this.props.affixFooter === 'always') {
                  affixed = true;
                  footerDom.classList.add('invisible2');
              }
              else {
                  const clip = footerDom.getBoundingClientRect();
                  const clientHeight = window.innerHeight;
                  // affixed = clip.top + clip.height / 2 > clientHeight;
                  affixed = clip.bottom > clientHeight - offsetBottom;
              }
              affixed ? affixDom.classList.add('in') : affixDom.classList.remove('in');
          }
          renderBody() {
              const _a = this.props, { type, className, data, header, body, render, bodyClassName, headerClassName, actionsClassName, footerClassName, children, title, actions, footer, classPrefix: ns } = _a, rest = tslib_1.__rest(_a, ["type", "className", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "children", "title", "actions", "footer", "classPrefix"]);
              const subProps = Object.assign({ data }, rest);
              return children
                  ? typeof children === 'function'
                      ? children(this.props)
                      : children
                  : body
                      ? render('body', body, subProps)
                      : null;
          }
          renderActions() {
              const { actions, render } = this.props;
              if (Array.isArray(actions) && actions.length) {
                  return actions.map((action, key) => render('action', action, {
                      type: action.type || 'button',
                      key: key
                  }));
              }
              return null;
          }
          render() {
              const _a = this.props, { type, className, data, header, body, render, bodyClassName, headerClassName, actionsClassName, footerClassName, footerWrapClassName, children, title, footer, affixFooter, classPrefix: ns, classnames: cx } = _a, rest = tslib_1.__rest(_a, ["type", "className", "data", "header", "body", "render", "bodyClassName", "headerClassName", "actionsClassName", "footerClassName", "footerWrapClassName", "children", "title", "footer", "affixFooter", "classPrefix", "classnames"]);
              const subProps = Object.assign({ data }, rest);
              const footerDoms = [];
              const actions = this.renderActions();
              actions &&
                  footerDoms.push(react_1.default.createElement("div", { key: "actions", className: cx(`Panel-btnToolbar`, actionsClassName || `Panel-footer`) }, actions));
              footer &&
                  footerDoms.push(react_1.default.createElement("div", { key: "footer", className: cx(footerClassName || `Panel-footer`) }, render('footer', footer, subProps)));
              let footerDom = footerDoms.length ? (react_1.default.createElement("div", { className: cx('Panel-footerWrap', footerWrapClassName), ref: this.footerDom }, footerDoms)) : null;
              return (react_1.default.createElement("div", { className: cx(`Panel`, className || `Panel--default`) },
                  header ? (react_1.default.createElement("div", { className: cx(headerClassName || `Panel-heading`) }, render('header', header, subProps))) : title ? (react_1.default.createElement("div", { className: cx(headerClassName || `Panel-heading`) },
                      react_1.default.createElement("h3", { className: cx(`Panel-title`) }, render('title', title, subProps)))) : null,
                  react_1.default.createElement("div", { className: bodyClassName || `${ns}Panel-body` }, this.renderBody()),
                  footerDom,
                  affixFooter && footerDoms.length ? (react_1.default.createElement("div", { ref: this.affixDom, className: cx('Panel-fixedBottom Panel-footerWrap', footerWrapClassName) }, footerDoms)) : null));
          }
      }
      Panel.propsList = [
          'header',
          'headerClassName',
          'footerClassName',
          'footerWrapClassName',
          'actionsClassName',
          'bodyClassName'
      ];
      Panel.defaultProps = {
      // className: 'Panel--default',
      // headerClassName: 'Panel-heading',
      // footerClassName: 'Panel-footer bg-light lter Wrapper',
      // actionsClassName: 'Panel-footer',
      // bodyClassName: 'Panel-body'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Panel.prototype, "affixDetect", null);
      return Panel;
  })();
  exports.default = Panel;
  let PanelRenderer = /** @class */ (() => {
      let PanelRenderer = class PanelRenderer extends Panel {
      };
      PanelRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)panel$/,
              name: 'panel'
          })
      ], PanelRenderer);
      return PanelRenderer;
  })();
  exports.PanelRenderer = PanelRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1BhbmVsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUVuRCw0Q0FBMEQ7QUFDMUQseUNBQXNDO0FBQ3RDLDBEQUFvRDtBQWtGcEQ7SUFBQSxNQUFxQixLQUFNLFNBQVEsZUFBSyxDQUFDLFNBQXFCO1FBQTlEOztZQW1CRSxhQUFRLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUM5RCxjQUFTLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQW9NakUsQ0FBQztRQWpNQyxpQkFBaUI7WUFDZixNQUFNLEdBQUcsR0FBRyx1QkFBVyxDQUFDLElBQUksQ0FBZ0IsQ0FBQztZQUM3QyxJQUFJLE1BQU0sR0FBZ0MsR0FBRyxDQUFDLENBQUMsQ0FBQyx3QkFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDNUUsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLEtBQUssUUFBUSxDQUFDLElBQUksRUFBRTtnQkFDdkMsTUFBTSxHQUFHLE1BQU0sQ0FBQzthQUNqQjtZQUNELElBQUksQ0FBQyxVQUFVLEdBQUcsTUFBTSxDQUFDO1lBQ3pCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsNEJBQVksQ0FBQyxHQUFrQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELG9CQUFvQjtZQUNsQixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxNQUFNLENBQUMsbUJB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

});
