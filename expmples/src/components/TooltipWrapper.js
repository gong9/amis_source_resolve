amis.define('src/components/TooltipWrapper.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file TooltipWrapper
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TooltipWrapper = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Html_1 = tslib_1.__importDefault(require("src/components/Html.tsx"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const react_dom_1 = require("node_modules/react-dom/index");
  const Tooltip_1 = tslib_1.__importDefault(require("src/components/Tooltip.tsx"));
  const theme_1 = require("src/theme.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  let waitToHide = null;
  let TooltipWrapper = /** @class */ (() => {
      class TooltipWrapper extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.moutned = true;
              this.getTarget = this.getTarget.bind(this);
              this.show = this.show.bind(this);
              this.hide = this.hide.bind(this);
              this.handleShow = this.handleShow.bind(this);
              this.handleHide = this.handleHide.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.handleMouseOver = this.handleMouseOver.bind(this);
              this.handleMouseOut = this.handleMouseOut.bind(this);
              this.state = {
                  show: false
              };
          }
          componentWillUnmount() {
              clearTimeout(this.timer);
              this.moutned = false;
          }
          getTarget() {
              return react_dom_1.findDOMNode(this);
          }
          show() {
              this.setState({
                  show: true
              });
          }
          hide() {
              waitToHide = null;
              this.moutned &&
                  this.setState({
                      show: false
                  });
          }
          getChildProps() {
              const child = react_1.default.Children.only(this.props.children);
              return child && child.props;
          }
          handleShow() {
              // clearTimeout(this.timer);
              // const {
              //     delay
              // } = this.props;
              // this.timer = setTimeout(this.show, delay);
              // 顺速让即将消失的层消失。
              waitToHide && waitToHide();
              this.show();
          }
          handleHide() {
              clearTimeout(this.timer);
              const { delay } = this.props;
              waitToHide = this.hide.bind(this);
              this.timer = setTimeout(this.hide, delay);
          }
          handleFocus(e) {
              const { onFocus } = this.getChildProps();
              this.handleShow();
              onFocus && onFocus(e);
          }
          handleBlur(e) {
              const { onBlur } = this.getChildProps();
              this.handleHide();
              onBlur && onBlur(e);
          }
          handleMouseOver(e) {
              this.handleMouseOverOut(this.handleShow, e, 'fromElement');
          }
          handleMouseOut(e) {
              this.handleMouseOverOut(this.handleHide, e, 'toElement');
          }
          handleMouseOverOut(handler, e, relatedNative) {
              const target = e.currentTarget;
              const related = e.relatedTarget || e.nativeEvent[relatedNative];
              if ((!related || related !== target) && !target.contains(related)) {
                  handler(e);
              }
          }
          handleClick(e) {
              const { onClick } = this.getChildProps();
              this.state.show ? this.hide() : this.show();
              onClick && onClick(e);
          }
          render() {
              const { tooltip, children, placement, container, trigger, rootClose, tooltipClassName } = this.props;
              const child = react_1.default.Children.only(children);
              if (!tooltip) {
                  return child;
              }
              const childProps = {
                  key: 'target'
              };
              const triggers = Array.isArray(trigger) ? trigger.concat() : [trigger];
              if (~triggers.indexOf('click')) {
                  childProps.onClick = this.handleClick;
              }
              if (~triggers.indexOf('focus')) {
                  childProps.onFocus = this.handleShow;
                  childProps.onBlur = this.handleHide;
              }
              if (~triggers.indexOf('hover')) {
                  childProps.onMouseOver = this.handleMouseOver;
                  childProps.onMouseOut = this.handleMouseOut;
              }
              return [
                  child ? react_1.default.cloneElement(child, childProps) : null,
                  react_1.default.createElement(Overlay_1.default, { key: "overlay", target: this.getTarget, show: this.state.show, onHide: this.handleHide, rootClose: rootClose, placement: placement, container: container },
                      react_1.default.createElement(Tooltip_1.default, { title: typeof tooltip !== 'string' ? tooltip.title : undefined, className: tooltipClassName }, tooltip && tooltip.render ? (this.state.show ? (tooltip.render()) : null) : tooltip && tooltip.dom ? (tooltip.dom) : (react_1.default.createElement(Html_1.default, { html: typeof tooltip === 'string' ? tooltip : tooltip.content || '' }))))
              ];
          }
      }
      TooltipWrapper.defaultProps = {
          placement: 'top',
          trigger: ['hover', 'focus'],
          rootClose: false,
          delay: 200
      };
      return TooltipWrapper;
  })();
  exports.TooltipWrapper = TooltipWrapper;
  exports.default = theme_1.themeable(uncontrollable_1.uncontrollable(TooltipWrapper, {
      show: 'onVisibleChange'
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVG9vbHRpcFdyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Ub29sdGlwV3JhcHBlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5Qyx5Q0FBc0M7QUFDdEMsZ0VBQWdDO0FBQ2hDLG9DQUFpRDtBQUNqRCxnRUFBZ0M7QUE2QmhDLElBQUksVUFBVSxHQUFvQixJQUFJLENBQUM7QUFFdkM7SUFBQSxNQUFhLGNBQWUsU0FBUSxlQUFLLENBQUMsU0FHekM7UUFjQyxZQUFZLEtBQTBCO1lBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUZmLFlBQU8sR0FBRyxJQUFJLENBQUM7WUFJYixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFB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

});
