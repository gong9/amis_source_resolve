amis.define('src/utils/dom.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.calculatePosition = exports.ownerDocument = exports.getContainer = exports.props2BsPropsHoc = exports.props2BsProps = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = tslib_1.__importDefault(require("node_modules/react-dom/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const ownerDocument_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/ownerDocument"));
  const offset_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/query/offset"));
  const position_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/query/position"));
  const scrollTop_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/query/scrollTop"));
  const bsMapping = {
      level: 'bsStyle',
      classPrefix: 'bsClass',
      size: 'bsSize'
  };
  /**
   * 主要目的是希望在是用 bootstrap 组件的时候不需要带 bs 前缀。
   *
   * @param {Object} rawProps 原始属性对象。
   * @return {Object}
   */
  exports.props2BsProps = (rawProps) => {
      let props = {};
      Object.keys(rawProps).forEach(key => (props[bsMapping[key] || key] = rawProps[key]));
      return props;
  };
  /**
   * props2BsProps 的 hoc 版本
   *
   * @param {*} ComposedComponent 组合组件
   * @return {Component}
   */
  exports.props2BsPropsHoc = ComposedComponent => {
      class BsComponent extends react_1.default.Component {
          render() {
              return react_1.default.createElement(ComposedComponent, Object.assign({}, exports.props2BsProps(this.props)));
          }
      }
      hoist_non_react_statics_1.default(BsComponent, ComposedComponent);
      return BsComponent;
  };
  function getContainer(container, defaultContainer) {
      container = typeof container === 'function' ? container() : container;
      return react_dom_1.default.findDOMNode(container) || defaultContainer;
  }
  exports.getContainer = getContainer;
  function ownerDocument(componentOrElement) {
      return ownerDocument_1.default(react_dom_1.default.findDOMNode(componentOrElement));
  }
  exports.ownerDocument = ownerDocument;
  function getContainerDimensions(containerNode) {
      let width, height, scroll;
      if (containerNode.tagName === 'BODY') {
          width = window.innerWidth;
          height = window.innerHeight;
          scroll =
              scrollTop_1.default(ownerDocument(containerNode).documentElement) ||
                  scrollTop_1.default(containerNode);
      }
      else {
          ({ width, height } = offset_1.default(containerNode));
          scroll = scrollTop_1.default(containerNode);
      }
      return { width, height, scroll };
  }
  function getTopDelta(top, overlayHeight, container, padding) {
      const containerDimensions = getContainerDimensions(container);
      const containerScroll = containerDimensions.scroll;
      const containerHeight = containerDimensions.height;
      const topEdgeOffset = top - padding - containerScroll;
      const bottomEdgeOffset = top + padding - containerScroll + overlayHeight;
      if (topEdgeOffset < 0) {
          return -topEdgeOffset;
      }
      else if (bottomEdgeOffset > containerHeight) {
          return containerHeight - bottomEdgeOffset;
      }
      else {
          return 0;
      }
  }
  function getLeftDelta(left, overlayWidth, container, padding) {
      const containerDimensions = getContainerDimensions(container);
      const containerWidth = containerDimensions.width;
      const leftEdgeOffset = left - padding;
      const rightEdgeOffset = left + padding + overlayWidth;
      if (leftEdgeOffset < 0) {
          return -leftEdgeOffset;
      }
      else if (rightEdgeOffset > containerWidth) {
          return containerWidth - rightEdgeOffset;
      }
      return 0;
  }
  // function position(node: HTMLElement, offsetParent: HTMLElement) {
  //   const rect = offsetParent.getBoundingClientRect();
  //   const rect2 = node.getBoundingClientRect();
  //   return {
  //     width:
  //       rect2.width -
  //         (parseInt(css(node, 'borderLeftWidth') || '', 10) || 0) -
  //         parseInt(css(node, 'borderRightWidth') || '', 10) || 0,
  //     height:
  //       rect2.height -
  //         (parseInt(css(node, 'borderTopWidth') || '', 10) || 0) -
  //         parseInt(css(node, 'borderBottomWidth') || '', 10) || 0,
  //     top: rect2.top - rect.top,
  //     left: rect2.left - rect.left
  //   };
  // }
  function calculatePosition(placement, overlayNode, target, container, padding = 0) {
      const childOffset = container.tagName === 'BODY'
          ? offset_1.default(target)
          : position_1.default(target, container);
      const { height: overlayHeight, width: overlayWidth } = offset_1.default(overlayNode);
      const clip = container.getBoundingClientRect();
      const clip2 = overlayNode.getBoundingClientRect();
      const scaleX = overlayNode.offsetWidth
          ? clip2.width / overlayNode.offsetWidth
          : 1;
      const scaleY = overlayNode.offsetHeight
          ? clip2.height / overlayNode.offsetHeight
          : 1;
      // auto 尝试四个方向对齐。
      placement =
          placement === 'auto'
              ? 'left-bottom-left-top right-bottom-right-top left-top-left-bottom right-top-right-bottom left-bottom-left-top'
              : placement;
      let positionLeft = 0, positionTop = 0, arrowOffsetLeft = '', arrowOffsetTop = '', activePlacement = placement;
      if (~placement.indexOf('-')) {
          const tests = placement.split(/\s+/);
          while (tests.length) {
              const current = (activePlacement = tests.shift());
              let [atX, atY, myX, myY] = current.split('-');
              myX = myX || atX;
              myY = myY || atY;
              positionLeft =
                  atX === 'left'
                      ? childOffset.left
                      : atX === 'right'
                          ? childOffset.left + childOffset.width
                          : childOffset.left + childOffset.width / 2;
              positionTop =
                  atY === 'top'
                      ? childOffset.top
                      : atY === 'bottom'
                          ? childOffset.top + childOffset.height
                          : childOffset.top + childOffset.height / 2;
              positionLeft -=
                  myX === 'left' ? 0 : myX === 'right' ? overlayWidth : overlayWidth / 2;
              positionTop -=
                  myY === 'top'
                      ? 0
                      : myY === 'bottom'
                          ? overlayHeight
                          : overlayHeight / 2;
              // 如果还有其他可选项，则做位置判断，是否在可视区域，不完全在则继续看其他定位情况。
              if (tests.length) {
                  const transformed = {
                      x: clip.x + positionLeft / scaleX,
                      y: clip.y + positionTop / scaleY,
                      width: overlayWidth,
                      height: overlayHeight
                  };
                  if (transformed.x > 0 &&
                      transformed.x + transformed.width < window.innerWidth &&
                      transformed.y > 0 &&
                      transformed.y + transformed.height < window.innerHeight) {
                      break;
                  }
              }
          }
          // todo arrow 位置支持
      }
      else if (placement === 'left' || placement === 'right') {
          // atX = placement;
          // atY = myY = 'center';
          // myX = placement === 'left' ? 'right' : 'left';
          if (placement === 'left') {
              positionLeft = childOffset.left - overlayWidth;
          }
          else {
              positionLeft = childOffset.left + childOffset.width;
          }
          positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
          const topDelta = getTopDelta(positionTop, overlayHeight, container, padding);
          positionTop += topDelta;
          arrowOffsetTop = 50 * (1 - (2 * topDelta) / overlayHeight) + '%';
      }
      else if (placement === 'top' || placement === 'bottom') {
          // atY = placement;
          // atX = myX = 'center';
          // myY = placement === 'top' ? 'bottom': 'top';
          if (placement === 'top') {
              positionTop = childOffset.top - overlayHeight;
          }
          else {
              positionTop = childOffset.top + childOffset.height;
          }
          positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;
          const leftDelta = getLeftDelta(positionLeft, overlayWidth, container, padding);
          positionLeft += leftDelta;
          arrowOffsetLeft = 50 * (1 - (2 * leftDelta) / overlayHeight) + '%';
      }
      else if (placement === 'center') {
          // atX = atY = myX = myY = 'center';
          positionLeft = childOffset.left + (childOffset.width - overlayWidth) / 2;
          positionTop = childOffset.top + (childOffset.height - overlayHeight) / 2;
          arrowOffsetLeft = arrowOffsetTop = void 0;
      }
      else {
          throw new Error(`calcOverlayPosition(): No such placement of "${placement}" found.`);
      }
      return {
          positionLeft: positionLeft / scaleX,
          positionTop: positionTop / scaleY,
          arrowOffsetLeft: arrowOffsetLeft / scaleX,
          arrowOffsetTop: arrowOffsetTop / scaleY,
          activePlacement
      };
  }
  exports.calculatePosition = calculatePosition;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL2RvbS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixrRUFBaUM7QUFDakMsOEZBQTBEO0FBQzFELHNGQUF5RDtBQUV6RCw4RUFBaUQ7QUFDakQsa0ZBQXFEO0FBQ3JELG9GQUF1RDtBQUV2RCxNQUFNLFNBQVMsR0FFWDtJQUNGLEtBQUssRUFBRSxTQUFTO0lBQ2hCLFdBQVcsRUFBRSxTQUFTO0lBQ3RCLElBQUksRUFBRSxRQUFRO0NBQ2YsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ1UsUUFBQSxhQUFhLEdBQUcsQ0FBQyxRQUFtQyxFQUFFLEVBQUU7SUFDbkUsSUFBSSxLQUFLLEdBQThCLEVBQUUsQ0FBQztJQUUxQyxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FDM0IsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLElBQUksR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3RELENBQUM7SUFFRixPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGOzs7OztHQUtHO0FBQ1UsUUFBQSxnQkFBZ0IsR0FFRyxpQkFBaUIsQ0FBQyxFQUFFO0lBQ2xELE1BQU0sV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUFjO1FBQzVDLE1BQU07WUFDSixPQUFPLDhCQUFDLGlCQUFpQixvQkFBSyxxQkFBYSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBSSxDQUFDO1FBQzlELENBQUM7S0FDRjtJQUVELGlDQUFtQixDQUFDLFdBQVcsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3BELE9BQU8sV0FBVyxDQUFDO0FBQ3JCLENBQUMsQ0FBQztBQUVGLFNBQWdCLFlBQVks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

});
