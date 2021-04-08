amis.define('src/components/virtual-list/SizeAndPositionManager.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  /* Forked from react-virtualized 💖 */
  const constants_1 = require("src/components/virtual-list/constants.ts");
  class SizeAndPositionManager {
      constructor({ itemCount, itemSizeGetter, estimatedItemSize }) {
          this.itemSizeGetter = itemSizeGetter;
          this.itemCount = itemCount;
          this.estimatedItemSize = estimatedItemSize;
          // Cache of size and position data for items, mapped by item index.
          this.itemSizeAndPositionData = {};
          // Measurements for items up to this index can be trusted; items afterward should be estimated.
          this.lastMeasuredIndex = -1;
      }
      updateConfig({ itemCount, itemSizeGetter, estimatedItemSize }) {
          if (itemCount != null) {
              this.itemCount = itemCount;
          }
          if (estimatedItemSize != null) {
              this.estimatedItemSize = estimatedItemSize;
          }
          if (itemSizeGetter != null) {
              this.itemSizeGetter = itemSizeGetter;
          }
      }
      getLastMeasuredIndex() {
          return this.lastMeasuredIndex;
      }
      /**
       * This method returns the size and position for the item at the specified index.
       * It just-in-time calculates (or used cached values) for items leading up to the index.
       */
      getSizeAndPositionForIndex(index) {
          if (index < 0 || index >= this.itemCount) {
              throw Error(`Requested index ${index} is outside of range 0..${this.itemCount}`);
          }
          if (index > this.lastMeasuredIndex) {
              const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
              let offset = lastMeasuredSizeAndPosition.offset + lastMeasuredSizeAndPosition.size;
              for (let i = this.lastMeasuredIndex + 1; i <= index; i++) {
                  const size = this.itemSizeGetter(i);
                  if (size == null || isNaN(size)) {
                      throw Error(`Invalid size returned for index ${i} of value ${size}`);
                  }
                  this.itemSizeAndPositionData[i] = {
                      offset,
                      size
                  };
                  offset += size;
              }
              this.lastMeasuredIndex = index;
          }
          return this.itemSizeAndPositionData[index];
      }
      getSizeAndPositionOfLastMeasuredItem() {
          return this.lastMeasuredIndex >= 0
              ? this.itemSizeAndPositionData[this.lastMeasuredIndex]
              : { offset: 0, size: 0 };
      }
      /**
       * Total size of all items being measured.
       * This value will be completedly estimated initially.
       * As items as measured the estimate will be updated.
       */
      getTotalSize() {
          const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
          return (lastMeasuredSizeAndPosition.offset +
              lastMeasuredSizeAndPosition.size +
              (this.itemCount - this.lastMeasuredIndex - 1) * this.estimatedItemSize);
      }
      /**
       * Determines a new offset that ensures a certain item is visible, given the alignment.
       *
       * @param align Desired alignment within container; one of "start" (default), "center", or "end"
       * @param containerSize Size (width or height) of the container viewport
       * @return Offset to use to ensure the specified item is visible
       */
      getUpdatedOffsetForIndex({ align = constants_1.ALIGNMENT.START, containerSize, currentOffset, targetIndex }) {
          if (containerSize <= 0) {
              return 0;
          }
          const datum = this.getSizeAndPositionForIndex(targetIndex);
          const maxOffset = datum.offset;
          const minOffset = maxOffset - containerSize + datum.size;
          let idealOffset;
          switch (align) {
              case constants_1.ALIGNMENT.END:
                  idealOffset = minOffset;
                  break;
              case constants_1.ALIGNMENT.CENTER:
                  idealOffset = maxOffset - (containerSize - datum.size) / 2;
                  break;
              case constants_1.ALIGNMENT.START:
                  idealOffset = maxOffset;
                  break;
              default:
                  idealOffset = Math.max(minOffset, Math.min(maxOffset, currentOffset));
          }
          const totalSize = this.getTotalSize();
          return Math.max(0, Math.min(totalSize - containerSize, idealOffset));
      }
      getVisibleRange({ containerSize, offset, overscanCount }) {
          const totalSize = this.getTotalSize();
          if (totalSize === 0) {
              return {};
          }
          const maxOffset = offset + containerSize;
          let start = this.findNearestItem(offset);
          if (typeof start === 'undefined') {
              throw Error(`Invalid offset ${offset} specified`);
          }
          const datum = this.getSizeAndPositionForIndex(start);
          offset = datum.offset + datum.size;
          let stop = start;
          while (offset < maxOffset && stop < this.itemCount - 1) {
              stop++;
              offset += this.getSizeAndPositionForIndex(stop).size;
          }
          if (overscanCount) {
              start = Math.max(0, start - overscanCount);
              stop = Math.min(stop + overscanCount, this.itemCount - 1);
          }
          return {
              start,
              stop
          };
      }
      /**
       * Clear all cached values for items after the specified index.
       * This method should be called for any item that has changed its size.
       * It will not immediately perform any calculations; they'll be performed the next time getSizeAndPositionForIndex() is called.
       */
      resetItem(index) {
          this.lastMeasuredIndex = Math.min(this.lastMeasuredIndex, index - 1);
      }
      /**
       * Searches for the item (index) nearest the specified offset.
       *
       * If no exact match is found the next lowest item index will be returned.
       * This allows partially visible items (with offsets just before/above the fold) to be visible.
       */
      findNearestItem(offset) {
          if (isNaN(offset)) {
              throw Error(`Invalid offset ${offset} specified`);
          }
          // Our search algorithms find the nearest match at or below the specified offset.
          // So make sure the offset is at least 0 or no match will be found.
          offset = Math.max(0, offset);
          const lastMeasuredSizeAndPosition = this.getSizeAndPositionOfLastMeasuredItem();
          const lastMeasuredIndex = Math.max(0, this.lastMeasuredIndex);
          if (lastMeasuredSizeAndPosition.offset >= offset) {
              // If we've already measured items within this range just use a binary search as it's faster.
              return this.binarySearch({
                  high: lastMeasuredIndex,
                  low: 0,
                  offset
              });
          }
          else {
              // If we haven't yet measured this high, fallback to an exponential search with an inner binary search.
              // The exponential search avoids pre-computing sizes for the full set of items as a binary search would.
              // The overall complexity for this approach is O(log n).
              return this.exponentialSearch({
                  index: lastMeasuredIndex,
                  offset
              });
          }
      }
      binarySearch({ low, high, offset }) {
          let middle = 0;
          let currentOffset = 0;
          while (low <= high) {
              middle = low + Math.floor((high - low) / 2);
              currentOffset = this.getSizeAndPositionForIndex(middle).offset;
              if (currentOffset === offset) {
                  return middle;
              }
              else if (currentOffset < offset) {
                  low = middle + 1;
              }
              else if (currentOffset > offset) {
                  high = middle - 1;
              }
          }
          if (low > 0) {
              return low - 1;
          }
          return 0;
      }
      exponentialSearch({ index, offset }) {
          let interval = 1;
          while (index < this.itemCount &&
              this.getSizeAndPositionForIndex(index).offset < offset) {
              index += interval;
              interval *= 2;
          }
          return this.binarySearch({
              high: Math.min(index, this.itemCount - 1),
              low: Math.floor(index / 2),
              offset
          });
      }
  }
  exports.default = SizeAndPositionManager;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2l6ZUFuZFBvc2l0aW9uTWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL3ZpcnR1YWwtbGlzdC9TaXplQW5kUG9zaXRpb25NYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsc0NBQXNDO0FBQ3RDLDJDQUFzQztBQW9CdEMsTUFBcUIsc0JBQXNCO0lBT3pDLFlBQVksRUFBQyxTQUFTLEVBQUUsY0FBYyxFQUFFLGlCQUFpQixFQUFVO1FBQ2pFLElBQUksQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcsU0FBUyxDQUFDO1FBQzNCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztRQUUzQyxtRUFBbUU7UUFDbkUsSUFBSSxDQUFDLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUVsQywrRkFBK0Y7UUFDL0YsSUFBSSxDQUFDLGlCQUFpQixHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRCxZQUFZLENBQUMsRUFDWCxTQUFTLEVBQ1QsY0FBYyxFQUNkLGlCQUFpQixFQUNBO1FBQ2pCLElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNyQixJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztTQUM1QjtRQUVELElBQUksaUJBQWlCLElBQUksSUFBSSxFQUFFO1lBQzdCLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztTQUM1QztRQUVELElBQUksY0FBYyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsY0FBYyxHQUFHLGNBQWMsQ0FBQztTQUN0QztJQUNILENBQUM7SUFFRCxvQkFBb0I7UUFDbEIsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDaEMsQ0FBQztJQUVEOzs7T0FHRztJQUNILDBCQUEwQixDQUFDLEtBQWE7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

});
