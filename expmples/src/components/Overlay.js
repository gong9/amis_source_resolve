amis.define('src/components/Overlay.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Overlay
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const react_dom_1 = require("node_modules/react-dom/index");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const dom_1 = require("src/utils/dom.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  // @ts-ignore
  react_overlays_1.Position.propTypes.placement = () => null;
  // @ts-ignore
  class Position extends react_overlays_1.Position {
      updatePosition(target) {
          var _a;
          this._lastTarget = target;
          if (!target) {
              return this.setState({
                  positionLeft: 0,
                  positionTop: 0,
                  arrowOffsetLeft: null,
                  arrowOffsetTop: null
              });
          }
          const watchTargetSizeChange = this.props.watchTargetSizeChange;
          const overlay = react_dom_1.findDOMNode(this);
          const container = dom_1.getContainer(this.props.container, dom_1.ownerDocument(this).body);
          if ((!this.watchedTarget || this.watchedTarget !== target) &&
              resize_sensor_1.getComputedStyle(target, 'position') !== 'static') {
              (_a = this.resizeDispose) === null || _a === void 0 ? void 0 : _a.forEach(fn => fn());
              this.watchedTarget = target;
              this.resizeDispose = [
                  watchTargetSizeChange !== false
                      ? resize_sensor_1.resizeSensor(target, () => this.updatePosition(target))
                      : helper_1.noop,
                  resize_sensor_1.resizeSensor(overlay, () => this.updatePosition(target))
              ];
          }
          this.setState(dom_1.calculatePosition(this.props.placement, overlay, target, container, this.props.containerPadding));
      }
      componentWillUnmount() {
          var _a;
          (_a = this.resizeDispose) === null || _a === void 0 ? void 0 : _a.forEach(fn => fn());
      }
  }
  let Overlay = /** @class */ (() => {
      var _a;
      class Overlay extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  exited: !props.show
              };
          }
          componentWillReceiveProps(nextProps) {
              if (nextProps.show) {
                  this.setState({ exited: false });
              }
              else if (!nextProps.transition) {
                  // Otherwise let handleHidden take care of marking exited.
                  this.setState({ exited: true });
              }
          }
          onHiddenListener(node) {
              this.setState({ exited: true });
              if (this.props.onExited) {
                  this.props.onExited(node);
              }
          }
          render() {
              const _a = this.props, { container, containerPadding, target, placement, shouldUpdatePosition, rootClose, children, watchTargetSizeChange, transition: Transition } = _a, props = tslib_1.__rest(_a, ["container", "containerPadding", "target", "placement", "shouldUpdatePosition", "rootClose", "children", "watchTargetSizeChange", "transition"]);
              const mountOverlay = props.show || (Transition && !this.state.exited);
              if (!mountOverlay) {
                  // Don't bother showing anything if we don't have to.
                  return null;
              }
              let child = children;
              // Position is be inner-most because it adds inline styles into the child,
              // which the other wrappers don't forward correctly.
              child = (
              // @ts-ignore
              react_1.default.createElement(Position, Object.assign({}, {
                  container,
                  containerPadding,
                  target,
                  placement,
                  shouldUpdatePosition
              }), child));
              if (Transition) {
                  let { onExit, onExiting, onEnter, onEntering, onEntered } = props;
                  // This animates the child node by injecting props, so it must precede
                  // anything that adds a wrapping div.
                  child = (react_1.default.createElement(Transition, { in: props.show, appear: true, onExit: onExit, onExiting: onExiting, onExited: this.onHiddenListener, onEnter: onEnter, onEntering: onEntering, onEntered: onEntered }, child));
              }
              // This goes after everything else because it adds a wrapping div.
              if (rootClose) {
                  child = (
                  // @ts-ignore
                  react_1.default.createElement(react_overlays_1.RootCloseWrapper, { onRootClose: props.onHide }, child));
              }
              // @ts-ignore
              return react_1.default.createElement(react_overlays_1.Portal, { container: container }, child);
          }
      }
      Overlay.defaultProps = {
          placement: 'auto'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Overlay.prototype, "onHiddenListener", null);
      return Overlay;
  })();
  exports.default = Overlay;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3ZlcmxheS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL092ZXJsYXkudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFFSCxtREFJd0I7QUFDeEIseUNBQXNDO0FBQ3RDLDBEQUEwQjtBQUMxQixzQ0FBNEU7QUFDNUUsNENBQStDO0FBQy9DLDBEQUFzRTtBQUV0RSxhQUFhO0FBQ2IseUJBQVksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQztBQUU5QyxhQUFhO0FBQ2IsTUFBTSxRQUFTLFNBQVEseUJBQVk7SUFPakMsY0FBYyxDQUFDLE1BQVc7O1FBQ3hCLElBQUksQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDO1FBRTFCLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDWCxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ25CLFlBQVksRUFBRSxDQUFDO2dCQUNmLFdBQVcsRUFBRSxDQUFDO2dCQUNkLGVBQWUsRUFBRSxJQUFJO2dCQUNyQixjQUFjLEVBQUUsSUFBSTthQUNyQixDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0scUJBQXFCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQztRQUMvRCxNQUFNLE9BQU8sR0FBRyx1QkFBVyxDQUFDLElBQVcsQ0FBZ0IsQ0FBQztRQUN4RCxNQUFNLFNBQVMsR0FBRyxrQkFBWSxDQUM1QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDcEIsbUJBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQ3pCLENBQUM7UUFFRixJQUNFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxhQUFhLEtBQUssTUFBTSxDQUFDO1lBQ3RELGdDQUFnQixDQUFDLE1BQU0sRUFBRSxVQUFVLENBQUMsS0FB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

});
