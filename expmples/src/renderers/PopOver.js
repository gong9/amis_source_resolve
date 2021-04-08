amis.define('src/renderers/PopOver.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file scoped.jsx.
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HocPopOver = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  exports.HocPopOver = (config = {}) => (Component) => {
      let lastOpenedInstance = null;
      let PopOverComponent = /** @class */ (() => {
          class PopOverComponent extends react_1.default.Component {
              constructor(props) {
                  super(props);
                  this.openPopOver = this.openPopOver.bind(this);
                  this.closePopOver = this.closePopOver.bind(this);
                  this.closePopOverLater = this.closePopOverLater.bind(this);
                  this.clearCloseTimer = this.clearCloseTimer.bind(this);
                  this.targetRef = this.targetRef.bind(this);
                  // this.handleClickOutside = this.handleClickOutside.bind(this);
                  this.state = {
                      isOpened: false
                  };
              }
              targetRef(ref) {
                  this.target = ref;
              }
              openPopOver() {
                  const onPopOverOpened = this.props.onPopOverOpened;
                  lastOpenedInstance === null || lastOpenedInstance === void 0 ? void 0 : lastOpenedInstance.closePopOver();
                  lastOpenedInstance = this;
                  this.setState({
                      isOpened: true
                  }, () => onPopOverOpened && onPopOverOpened(this.props.popOver));
              }
              closePopOver() {
                  clearTimeout(this.timer);
                  if (!this.state.isOpened) {
                      return;
                  }
                  lastOpenedInstance = null;
                  const onPopOverClosed = this.props.onPopOverClosed;
                  this.setState({
                      isOpened: false
                  }, () => onPopOverClosed && onPopOverClosed(this.props.popOver));
              }
              closePopOverLater() {
                  // 5s 后自动关闭。
                  this.timer = setTimeout(this.closePopOver, 2000);
              }
              clearCloseTimer() {
                  clearTimeout(this.timer);
              }
              buildSchema() {
                  const { popOver, name, label, translate: __ } = this.props;
                  let schema;
                  if (popOver === true) {
                      schema = {
                          type: 'panel',
                          body: '${name}'
                      };
                  }
                  else if (popOver &&
                      (popOver.mode === 'dialog' || popOver.mode === 'drawer')) {
                      schema = Object.assign({ type: popOver.mode, actions: [
                              {
                                  label: __('Dialog.close'),
                                  type: 'button',
                                  actionType: 'cancel'
                              }
                          ] }, popOver);
                  }
                  else if (popOver) {
                      schema = Object.assign({ type: 'panel' }, popOver);
                  }
                  return schema || 'error';
              }
              renderPopOver() {
                  var _a, _b, _c, _d;
                  let { popOver, render, popOverContainer, classnames: cx, classPrefix: ns } = this.props;
                  if (popOver &&
                      (popOver.mode === 'dialog' ||
                          popOver.mode === 'drawer')) {
                      return render('popover-detail', this.buildSchema(), {
                          show: true,
                          onClose: this.closePopOver,
                          onConfirm: this.closePopOver
                      });
                  }
                  const content = render('popover-detail', this.buildSchema(), {
                      className: cx(popOver.className)
                  });
                  if (!popOverContainer) {
                      popOverContainer = () => react_dom_1.findDOMNode(this);
                  }
                  const position = (popOver && popOver.position) || '';
                  const isFixed = /^fixed\-/.test(position);
                  return isFixed ? (
                  // @ts-ignore
                  react_1.default.createElement(react_overlays_1.RootCloseWrapper, { disabled: !this.state.isOpened, onRootClose: this.closePopOver },
                      react_1.default.createElement("div", { className: cx(`PopOverAble--fixed PopOverAble--${position}`), onMouseLeave: ((_a = popOver) === null || _a === void 0 ? void 0 : _a.trigger) === 'hover'
                              ? this.closePopOver
                              : undefined, onMouseEnter: ((_b = popOver) === null || _b === void 0 ? void 0 : _b.trigger) === 'hover'
                              ? this.clearCloseTimer
                              : undefined }, content))) : (react_1.default.createElement(Overlay_1.default, { container: popOverContainer, placement: position || 'center', target: () => this.target, onHide: this.closePopOver, rootClose: true, show: true },
                      react_1.default.createElement(PopOver_1.default, { classPrefix: ns, className: cx('PopOverAble-popover', popOver.popOverClassName), offset: popOver.offset, onMouseLeave: ((_c = popOver) === null || _c === void 0 ? void 0 : _c.trigger) === 'hover'
                              ? this.closePopOver
                              : undefined, onMouseEnter: ((_d = popOver) === null || _d === void 0 ? void 0 : _d.trigger) === 'hover'
                              ? this.clearCloseTimer
                              : undefined }, content)));
              }
              render() {
                  var _a, _b;
                  const { popOver, popOverEnabled, popOverEnable, className, noHoc, classnames: cx, showIcon } = this.props;
                  if (!popOver ||
                      popOverEnabled === false ||
                      noHoc ||
                      popOverEnable === false) {
                      return react_1.default.createElement(Component, Object.assign({}, this.props));
                  }
                  const triggerProps = {};
                  const trigger = (_a = popOver) === null || _a === void 0 ? void 0 : _a.trigger;
                  if (trigger === 'hover') {
                      triggerProps.onMouseEnter = this.openPopOver;
                      triggerProps.onMouseLeave = this.closePopOverLater;
                  }
                  else {
                      triggerProps.onClick = this.openPopOver;
                  }
                  return (react_1.default.createElement(Component, Object.assign({}, this.props, { className: cx(`Field--popOverAble`, className, {
                          in: this.state.isOpened
                      }), ref: config.targetOutter ? this.targetRef : undefined }), ((_b = popOver) === null || _b === void 0 ? void 0 : _b.showIcon) !== false ? (react_1.default.createElement(react_1.default.Fragment, null,
                      react_1.default.createElement(Component, Object.assign({}, this.props, { wrapperComponent: '', noHoc: true })),
                      react_1.default.createElement("span", Object.assign({ key: "popover-btn", className: cx('Field-popOverBtn') }, triggerProps, { ref: config.targetOutter ? undefined : this.targetRef }),
                          react_1.default.createElement(icons_1.Icon, { icon: "zoom-in", className: "icon" })),
                      this.state.isOpened ? this.renderPopOver() : null)) : (react_1.default.createElement(react_1.default.Fragment, null,
                      react_1.default.createElement("div", Object.assign({ className: cx('Field-popOverWrap') }, triggerProps, { ref: config.targetOutter ? undefined : this.targetRef }),
                          react_1.default.createElement(Component, Object.assign({}, this.props, { wrapperComponent: '', noHoc: true }))),
                      this.state.isOpened ? this.renderPopOver() : null))));
              }
          }
          PopOverComponent.ComposedComponent = Component;
          return PopOverComponent;
      })();
      hoist_non_react_statics_1.default(PopOverComponent, Component);
      return PopOverComponent;
  };
  exports.default = exports.HocPopOver;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3Zlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvUG9wT3Zlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILDBEQUEwQjtBQUMxQix5Q0FBc0M7QUFHdEMsOEZBQTBEO0FBQzFELG1EQUFnRDtBQUNoRCw0RUFBc0Q7QUFDdEQsNEVBQTRDO0FBQzVDLCtDQUF5QztBQXdINUIsUUFBQSxVQUFVLEdBQUcsQ0FDeEIsU0FFSSxFQUFFLEVBQ04sRUFBRSxDQUFDLENBQUMsU0FBbUMsRUFBTyxFQUFFO0lBQ2hELElBQUksa0JBQWtCLEdBQTRCLElBQUksQ0FBQztJQUN2RDtRQUFBLE1BQU0sZ0JBQWlCLFNBQVEsZUFBSyxDQUFDLFNBQXFDO1lBSXhFLFlBQVksS0FBbUI7Z0JBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFFYixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0QsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDdkQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDM0MsZ0VBQWdFO2dCQUNoRSxJQUFJLENBQUMsS0FBSyxHQUFHO29CQUNYLFFBQVEsRUFBRSxLQUFLO2lCQUNoQixDQUFDO1lBQ0osQ0FBQztZQUVELFNBQVMsQ0FBQyxHQUFRO2dCQUNoQixJQUFJLENBQUMsTUFBTSxHQUFHLEdBQUcsQ0FBQztZQUNwQixDQUFDO1lBRUQsV0FBVztnQkFDVCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztnQkFDbkQsa0JBQWtCLGFBQWxCLGtCQUFrQix1QkFBbEIsa0JBQWtCLENBQUUsWUFBWSxHQUFHO2dCQUNuQyxrQkFBa0IsR0FBRyxJQUFJLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxRQUFRLENBQ1g7b0JBQ0UsUUFBUSxFQUFFLElBQUk7aUJBQ2YsRUFDRCxHQUFHLEVBQUUsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQzdELENBQUM7WUFDSixDQUFDO1lBRUQsWUFBWTtnQkFDVixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUU7b0JBQ3hCLE9BQU87aUJBQ1I7Z0JBRUQsa0JBQWtCLEdBQUcsSUFBSSxDQUFDO2dCQUMxQixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFFBQVEsQ0FDWDtvQkFDRSxRQUFRLEVBQUUsS0FBSztpQkFDaEIsRUFDRCxHQUFHLEVBQUUsQ0FBQyxlQUFlLElBQUksZUFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQzdELENBQUM7WUFDSixDQUFDO1lBRUQsaUJBQWlCO2dCQUNmLFlBQVk7Z0JBQ1osSUFBSSxDQUFDLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUNuRCxDQUFDO1lBRUQsZUFBZTtnQkFDYixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzNCLENBQUM7WUFFRCxXQUFXO2dCQUNULE1BQU0sRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFFekQsSUFBSSxNQUFNLENBQUM7Z0JBRVgsSUFBSSxPQUFPLEtBQUssSUFBSSxFQUFFO29CQUNwQixNQUFNLEdBQUc7d0JBQ1AsSUFBSSxFQUFFLE9BQU87d0JBQ2IsSUFBSSxFQUFFLFNBQVM7cUJBQ2hCLENBQUM7aUJBQ0g7cUJBQU0sSUFDTCxPQUFPO29CQUNQLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsRUFDeEQ7b0JBQ0EsTUFBTSxtQkFDSixJQUFJLEVBQUUsT0FBTyxDQUFDLElBQUksRUFDbEIsT0FBTyxFQUFFOzRCQUNQO2dDQUNFLEtBQUssRUFBRSxFQUFFLENBQUMsY0FBYyxDQUFDO2dDQUN6QixJQUFJLEVBQUUsUUFBUTtnQ0FDZCxVQUFVLEVBQUUsUUFBUTs2QkFDckI7eUJBQ0YsSUFDRSxPQUFPLENBQ1gsQ0FBQztpQkFDSDtxQkFBTSxJQUFJLE9BQU8sRUFBRTtvQkFDbEIsTUFBTSxtQkFDSixJQUFJLEVBQUUsT0FBTyxJQUNWLE9BQU8sQ0FDWCxDQUFDO2lCQUNIO2dCQUVELE9BQU8sTUFBTSxJQUFJLE9BQU8sQ0FBQztZQUMzQixDQUFDO1lBRUQsYUFBYTs7Z0JBQ1gsSUFBSSxFQUNGLE9BQU8sRUFDUCxNQUFNLEVBQ04sZ0JBQWdCLEVBQ2hCLFVBQVUsRUFBRSxFQUFFLEVBQ2QsV0FBVyxFQUFFLEVBQUUsRUFDaEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUNmLElBQ0UsT0FBTztvQkFDUCxDQUFFLE9BQStCLENBQUMsSUFBSSxLQUFLLFFBQVE7d0JBQ2hELE9BQStCLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxFQUNyRDtvQkFDQSxPQUFPLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7d0JBQ2xELElBQUksRUFBRSxJQUFJO3dCQUNWLE9BQU8sRUFBRSxJQUFJLENBQUMsWUFBWTt3QkFDMUIsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZO3FCQUM3QixDQUFDLENBQUM7aUJBQ0o7Z0JBRUQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixFQUFFLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDM0QsU0FBUyxFQUFFLEVBQUUsQ0FBRSxPQUErQixDQUFDLFNBQVMsQ0FBQztpQkFDMUQsQ0FBZ0IsQ0FBQztnQkFFbEIsSUFBSSxDQUFDLGdCQUFnQixFQUFFO29CQUNyQixnQkFBZ0IsR0FBRyxHQUFHLEVBQUUsQ0FBQyx1QkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2lCQUM1QztnQkFFRCxNQUFNLFFBQVEsR0FDWixDQUFDLE9BQU8sSUFBSyxPQUErQixDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQztnQkFDL0QsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztnQkFFMUMsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNmLGFBQWE7Z0JBQ2IsOEJBQUMsaUNBQWdCLElBQ2YsUUFBUSxFQUFFLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQzlCLFdBQVcsRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFFOUIsdUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQ0FBbUMsUUFBUSxFQUFFLENBQUMsRUFDNUQsWUFBWSxFQUNWLE9BQUMsT0FBK0IsMENBQUUsT0FBTyxNQUFLLE9BQU87NEJBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTs0QkFDbkIsQ0FBQyxDQUFDLFNBQVMsRUFFZixZQUFZLEVBQ1YsT0FBQyxPQUErQiwwQ0FBRSxPQUFPLE1BQUssT0FBTzs0QkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlOzRCQUN0QixDQUFDLENBQUMsU0FBUyxJQUdkLE9BQU8sQ0FDSixDQUNXLENBQ3BCLENBQUMsQ0FBQyxDQUFDLENBQ0YsOEJBQUMsaUJBQU8sSUFDTixTQUFTLEVBQUUsZ0JBQWdCLEVBQzNCLFNBQVMsRUFBRSxRQUFRLElBQUksUUFBUSxFQUMvQixNQUFNLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFDekIsTUFBTSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQ3pCLFNBQVMsUUFDVCxJQUFJO29CQUVKLDhCQUFDLGlCQUFPLElBQ04sV0FBVyxFQUFFLEVBQUUsRUFDZixTQUFTLEVBQUUsRUFBRSxDQUNYLHFCQUFxQixFQUNwQixPQUErQixDQUFDLGdCQUFnQixDQUNsRCxFQUNELE1BQU0sRUFBRyxPQUErQixDQUFDLE1BQU0sRUFDL0MsWUFBWSxFQUNWLE9BQUMsT0FBK0IsMENBQUUsT0FBTyxNQUFLLE9BQU87NEJBQ25ELENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWTs0QkFDbkIsQ0FBQyxDQUFDLFNBQVMsRUFFZixZQUFZLEVBQ1YsT0FBQyxPQUErQiwwQ0FBRSxPQUFPLE1BQUssT0FBTzs0QkFDbkQsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlOzRCQUN0QixDQUFDLENBQUMsU0FBUyxJQUdkLE9BQU8sQ0FDQSxDQUNGLENBQ1gsQ0FBQztZQUNKLENBQUM7WUFFRCxNQUFNOztnQkFDSixNQUFNLEVBQ0osT0FBTyxFQUNQLGNBQWMsRUFDZCxhQUFhLEVBQ2IsU0FBUyxFQUNULEtBQUssRUFDTCxVQUFVLEVBQUUsRUFBRSxFQUNkLFFBQVEsRUFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBRWYsSUFDRSxDQUFDLE9BQU87b0JBQ1IsY0FBYyxLQUFLLEtBQUs7b0JBQ3hCLEtBQUs7b0JBQ0wsYUFBYSxLQUFLLEtBQUssRUFDdkI7b0JBQ0EsT0FBTyw4QkFBQyxTQUFTLG9CQUFLLElBQUksQ0FBQyxLQUFLLEVBQUksQ0FBQztpQkFDdEM7Z0JBRUQsTUFBTSxZQUFZLEdBQVEsRUFBRSxDQUFDO2dCQUM3QixNQUFNLE9BQU8sU0FBSSxPQUErQiwwQ0FBRSxPQUFPLENBQUM7Z0JBQzFELElBQUksT0FBTyxLQUFLLE9BQU8sRUFBRTtvQkFDdkIsWUFBWSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO29CQUM3QyxZQUFZLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztpQkFDcEQ7cUJBQU07b0JBQ0wsWUFBWSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDO2lCQUN6QztnQkFFRCxPQUFPLENBQ0wsOEJBQUMsU0FBUyxvQkFDSixJQUFJLENBQUMsS0FBSyxJQUNkLFNBQVMsRUFBRSxFQUFFLENBQUMsb0JBQW9CLEVBQUUsU0FBUyxFQUFFO3dCQUM3QyxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO3FCQUN4QixDQUFDLEVBQ0YsR0FBRyxFQUFFLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FFcEQsT0FBQyxPQUErQiwwQ0FBRSxRQUFRLE1BQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUN0RDtvQkFDRSw4QkFBQyxTQUFTLG9CQUFLLElBQUksQ0FBQyxLQUFLLElBQUUsZ0JBQWdCLEVBQUUsRUFBRSxFQUFFLEtBQUssVUFBRztvQkFDekQsc0RBQ0UsR0FBRyxFQUFDLGFBQWEsRUFDakIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxJQUM3QixZQUFZLElBQ2hCLEdBQUcsRUFBRSxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTO3dCQUVyRCw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLFNBQVMsRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ25DO29CQUNOLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDakQsQ0FDSixDQUFDLENBQUMsQ0FBQyxDQUNGO29CQUNFLHFEQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsSUFDOUIsWUFBWSxJQUNoQixHQUFHLEVBQUUsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUzt3QkFFckQsOEJBQUMsU0FBUyxvQkFBSyxJQUFJLENBQUMsS0FBSyxJQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxLQUFLLFVBQUcsQ0FDckQ7b0JBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNqRCxDQUNKLENBQ1MsQ0FDYixDQUFDO1lBQ0osQ0FBQzs7UUFsUE0sa0NBQWlCLEdBQUcsU0FBUyxDQUFDO1FBbVB2Qyx1QkFBQztTQUFBO0lBRUQsaUNBQW1CLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFakQsT0FBTyxnQkFBZ0IsQ0FBQztBQUMxQixDQUFDLENBQUM7QUFFRixrQkFBZSxrQkFBVSxDQUFDIn0=

});
