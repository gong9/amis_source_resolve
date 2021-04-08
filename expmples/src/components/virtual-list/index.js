amis.define('src/components/virtual-list/index.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * 基于 https://github.com/clauderic/react-tiny-virtual-list 改造，主要是加了宽度自适应
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  const React = tslib_1.__importStar(require("node_modules/react/index"));
  const PropTypes = tslib_1.__importStar(require("node_modules/prop-types/index"));
  const SizeAndPositionManager_1 = tslib_1.__importDefault(require("src/components/virtual-list/SizeAndPositionManager.ts"));
  const constants_1 = require("src/components/virtual-list/constants.ts");
  var constants_2 = require("src/components/virtual-list/constants.ts");
  Object.defineProperty(exports, "ScrollDirection", { enumerable: true, get: function () { return constants_2.DIRECTION; } });
  const STYLE_WRAPPER = {
      overflow: 'auto',
      willChange: 'transform',
      WebkitOverflowScrolling: 'touch'
  };
  const STYLE_INNER = {
      position: 'relative',
      width: 'auto',
      whiteSpace: 'nowrap',
      minHeight: '100%'
  };
  const STYLE_ITEM = {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%'
  };
  const STYLE_STICKY_ITEM = Object.assign(Object.assign({}, STYLE_ITEM), { position: 'sticky' });
  let VirtualList = /** @class */ (() => {
      class VirtualList extends React.PureComponent {
          constructor() {
              super(...arguments);
              this.itemSizeGetter = (itemSize) => {
                  return (index) => this.getSize(index, itemSize);
              };
              this.sizeAndPositionManager = new SizeAndPositionManager_1.default({
                  itemCount: this.props.itemCount,
                  itemSizeGetter: this.itemSizeGetter(this.props.itemSize),
                  estimatedItemSize: this.getEstimatedItemSize()
              });
              this.state = {
                  offset: this.props.scrollOffset ||
                      (this.props.scrollToIndex != null &&
                          this.getOffsetForIndex(this.props.scrollToIndex)) ||
                      0,
                  scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
              };
              this.styleCache = {};
              this.getRef = (node) => {
                  this.rootNode = node;
              };
              this.handleScroll = (event) => {
                  const { onScroll } = this.props;
                  const offset = this.getNodeOffset();
                  if (offset < 0 ||
                      this.state.offset === offset ||
                      event.target !== this.rootNode) {
                      return;
                  }
                  this.setState({
                      offset,
                      scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.OBSERVED
                  });
                  if (typeof onScroll === 'function') {
                      onScroll(offset, event);
                  }
              };
          }
          componentDidMount() {
              const { scrollOffset, scrollToIndex } = this.props;
              this.rootNode.addEventListener('scroll', this.handleScroll, {
                  passive: true
              });
              this.updateRootWidth();
              if (scrollOffset != null) {
                  this.scrollTo(scrollOffset);
              }
              else if (scrollToIndex != null) {
                  this.scrollTo(this.getOffsetForIndex(scrollToIndex));
              }
          }
          // 自适应宽度
          updateRootWidth() {
              const itemsDom = this.rootNode.children[0].children;
              const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth || 15;
              const containerWidth = this.rootNode.parentElement.getBoundingClientRect()
                  .width;
              let maxItemWidth = 0;
              for (let i = 0; i < itemsDom.length; i++) {
                  let itemWidth = itemsDom[i].getBoundingClientRect().width;
                  if (itemWidth > maxItemWidth) {
                      maxItemWidth = itemWidth;
                  }
              }
              if (maxItemWidth > containerWidth) {
                  this.rootNode.style.width = maxItemWidth + scrollbarWidth + 'px';
              }
          }
          componentWillReceiveProps(nextProps) {
              const { estimatedItemSize, itemCount, itemSize, scrollOffset, scrollToAlignment, scrollToIndex } = this.props;
              const scrollPropsHaveChanged = nextProps.scrollToIndex !== scrollToIndex ||
                  nextProps.scrollToAlignment !== scrollToAlignment;
              const itemPropsHaveChanged = nextProps.itemCount !== itemCount ||
                  nextProps.itemSize !== itemSize ||
                  nextProps.estimatedItemSize !== estimatedItemSize;
              if (nextProps.itemSize !== itemSize) {
                  this.sizeAndPositionManager.updateConfig({
                      itemSizeGetter: this.itemSizeGetter(nextProps.itemSize)
                  });
              }
              if (nextProps.itemCount !== itemCount ||
                  nextProps.estimatedItemSize !== estimatedItemSize) {
                  this.sizeAndPositionManager.updateConfig({
                      itemCount: nextProps.itemCount,
                      estimatedItemSize: this.getEstimatedItemSize(nextProps)
                  });
              }
              if (itemPropsHaveChanged) {
                  this.recomputeSizes();
              }
              if (nextProps.scrollOffset !== scrollOffset) {
                  this.setState({
                      offset: nextProps.scrollOffset || 0,
                      scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
                  });
              }
              else if (typeof nextProps.scrollToIndex === 'number' &&
                  (scrollPropsHaveChanged || itemPropsHaveChanged)) {
                  this.setState({
                      offset: this.getOffsetForIndex(nextProps.scrollToIndex, nextProps.scrollToAlignment, nextProps.itemCount),
                      scrollChangeReason: constants_1.SCROLL_CHANGE_REASON.REQUESTED
                  });
              }
          }
          componentDidUpdate(_, prevState) {
              const { offset, scrollChangeReason } = this.state;
              if (prevState.offset !== offset &&
                  scrollChangeReason === constants_1.SCROLL_CHANGE_REASON.REQUESTED) {
                  this.scrollTo(offset);
              }
          }
          componentWillUnmount() {
              this.rootNode.removeEventListener('scroll', this.handleScroll);
          }
          scrollTo(value) {
              const { scrollDirection = constants_1.DIRECTION.VERTICAL } = this.props;
              this.rootNode[constants_1.scrollProp[scrollDirection]] = value;
          }
          getOffsetForIndex(index, scrollToAlignment = this.props.scrollToAlignment, itemCount = this.props.itemCount) {
              const { scrollDirection = constants_1.DIRECTION.VERTICAL } = this.props;
              if (index < 0 || index >= itemCount) {
                  index = 0;
              }
              return this.sizeAndPositionManager.getUpdatedOffsetForIndex({
                  align: scrollToAlignment,
                  containerSize: this.props[constants_1.sizeProp[scrollDirection]],
                  currentOffset: (this.state && this.state.offset) || 0,
                  targetIndex: index
              });
          }
          recomputeSizes(startIndex = 0) {
              this.styleCache = {};
              this.sizeAndPositionManager.resetItem(startIndex);
          }
          render() {
              const _a = this.props, { estimatedItemSize, height, overscanCount = 3, renderItem, itemCount, itemSize, onItemsRendered, onScroll, scrollDirection = constants_1.DIRECTION.VERTICAL, scrollOffset, scrollToIndex, scrollToAlignment, stickyIndices, style, width } = _a, props = tslib_1.__rest(_a, ["estimatedItemSize", "height", "overscanCount", "renderItem", "itemCount", "itemSize", "onItemsRendered", "onScroll", "scrollDirection", "scrollOffset", "scrollToIndex", "scrollToAlignment", "stickyIndices", "style", "width"]);
              const { offset } = this.state;
              const { start, stop } = this.sizeAndPositionManager.getVisibleRange({
                  containerSize: this.props[constants_1.sizeProp[scrollDirection]] || 0,
                  offset,
                  overscanCount
              });
              const items = [];
              const wrapperStyle = Object.assign(Object.assign(Object.assign({}, STYLE_WRAPPER), style), { height, width });
              const innerStyle = Object.assign(Object.assign({}, STYLE_INNER), { [constants_1.sizeProp[scrollDirection]]: this.sizeAndPositionManager.getTotalSize() });
              if (stickyIndices != null && stickyIndices.length !== 0) {
                  stickyIndices.forEach((index) => items.push(renderItem({
                      index,
                      style: this.getStyle(index, true)
                  })));
                  if (scrollDirection === constants_1.DIRECTION.HORIZONTAL) {
                      innerStyle.display = 'flex';
                  }
              }
              if (typeof start !== 'undefined' && typeof stop !== 'undefined') {
                  for (let index = start; index <= stop; index++) {
                      if (stickyIndices != null && ~stickyIndices.indexOf(index)) {
                          continue;
                      }
                      items.push(renderItem({
                          index,
                          style: this.getStyle(index, false)
                      }));
                  }
                  if (typeof onItemsRendered === 'function') {
                      onItemsRendered({
                          startIndex: start,
                          stopIndex: stop
                      });
                  }
              }
              return (React.createElement("div", Object.assign({ ref: this.getRef }, props, { style: wrapperStyle }),
                  React.createElement("div", { style: innerStyle }, items)));
          }
          getNodeOffset() {
              const { scrollDirection = constants_1.DIRECTION.VERTICAL } = this.props;
              return this.rootNode[constants_1.scrollProp[scrollDirection]];
          }
          getEstimatedItemSize(props = this.props) {
              return (props.estimatedItemSize ||
                  (typeof props.itemSize === 'number' && props.itemSize) ||
                  50);
          }
          getSize(index, itemSize) {
              if (typeof itemSize === 'function') {
                  return itemSize(index);
              }
              return Array.isArray(itemSize) ? itemSize[index] : itemSize;
          }
          getStyle(index, sticky) {
              const style = this.styleCache[index];
              if (style) {
                  return style;
              }
              const { scrollDirection = constants_1.DIRECTION.VERTICAL } = this.props;
              const { size, offset } = this.sizeAndPositionManager.getSizeAndPositionForIndex(index);
              return (this.styleCache[index] = sticky
                  ? Object.assign(Object.assign({}, STYLE_STICKY_ITEM), { [constants_1.sizeProp[scrollDirection]]: size, [constants_1.marginProp[scrollDirection]]: offset, [constants_1.oppositeMarginProp[scrollDirection]]: -(offset + size), zIndex: 1 }) : Object.assign(Object.assign({}, STYLE_ITEM), { [constants_1.sizeProp[scrollDirection]]: size, [constants_1.positionProp[scrollDirection]]: offset }));
          }
      }
      VirtualList.defaultProps = {
          overscanCount: 3,
          scrollDirection: constants_1.DIRECTION.VERTICAL,
          width: '100%'
      };
      VirtualList.propTypes = {
          estimatedItemSize: PropTypes.number,
          height: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
              .isRequired,
          itemCount: PropTypes.number.isRequired,
          itemSize: PropTypes.oneOfType([
              PropTypes.number,
              PropTypes.array,
              PropTypes.func
          ]).isRequired,
          onScroll: PropTypes.func,
          onItemsRendered: PropTypes.func,
          overscanCount: PropTypes.number,
          renderItem: PropTypes.func.isRequired,
          scrollOffset: PropTypes.number,
          scrollToIndex: PropTypes.number,
          scrollToAlignment: PropTypes.oneOf([
              constants_1.ALIGNMENT.AUTO,
              constants_1.ALIGNMENT.START,
              constants_1.ALIGNMENT.CENTER,
              constants_1.ALIGNMENT.END
          ]),
          scrollDirection: PropTypes.oneOf([
              constants_1.DIRECTION.HORIZONTAL,
              constants_1.DIRECTION.VERTICAL
          ]),
          stickyIndices: PropTypes.arrayOf(PropTypes.number),
          style: PropTypes.object,
          width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
      };
      return VirtualList;
  })();
  exports.default = VirtualList;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy92aXJ0dWFsLWxpc3QvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7R0FFRzs7O0FBRUgscURBQStCO0FBRS9CLDhEQUF3QztBQUN4Qyw4RkFBMEU7QUFDMUUsMkNBU3FCO0FBRXJCLHlDQUF5RDtBQUFqRCw0R0FBQSxTQUFTLE9BQW1CO0FBdURwQyxNQUFNLGFBQWEsR0FBd0I7SUFDekMsUUFBUSxFQUFFLE1BQU07SUFDaEIsVUFBVSxFQUFFLFdBQVc7SUFDdkIsdUJBQXVCLEVBQUUsT0FBTztDQUNqQyxDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQXdCO0lBQ3ZDLFFBQVEsRUFBRSxVQUFVO0lBQ3BCLEtBQUssRUFBRSxNQUFNO0lBQ2IsVUFBVSxFQUFFLFFBQVE7SUFDcEIsU0FBUyxFQUFFLE1BQU07Q0FDbEIsQ0FBQztBQUVGLE1BQU0sVUFBVSxHQUtaO0lBQ0YsUUFBUSxFQUFFLFVBQTBCO0lBQ3BDLEdBQUcsRUFBRSxDQUFDO0lBQ04sSUFBSSxFQUFFLENBQUM7SUFDUCxLQUFLLEVBQUUsTUFBTTtDQUNkLENBQUM7QUFFRixNQUFNLGlCQUFpQixtQ0FDbEIsVUFBVSxLQUNiLFFBQVEsRUFBRSxRQUF3QixHQUNuQyxDQUFDO0FBRUY7SUFBQSxNQUFxQixXQUFZLFNBQVEsS0FBSyxDQUFDLGFBQTJCO1FBQTFFOztZQXNDRSxtQkFBYyxHQUFHLENBQUMsUUFBMkIsRUFBRSxFQUFFO2dCQUMvQyxPQUFPLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUM7WUFFRiwyQkFBc0IsR0FBRyxJQUFJLGdDQUFzQixDQUFDO2dCQUNsRCxTQUFTLEVBQUUsSUFBSSxDQUFD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

});
