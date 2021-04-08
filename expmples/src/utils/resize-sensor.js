amis.define('src/utils/resize-sensor.ts', function(require, exports, module, define) {

  "use strict";
  /**
   * @file resize-sensor.js.
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.resizeSensor = exports.getComputedStyle = void 0;
  class EventQueue {
      constructor() {
          this.q = [];
      }
      add(cb) {
          this.q.push(cb);
      }
      call(...args) {
          this.q.forEach(fn => {
              fn(...args);
          });
      }
  }
  function getComputedStyle(element, prop) {
      if (element.currentStyle) {
          return element.currentStyle[prop];
      }
      else if (window.getComputedStyle) {
          const style = window.getComputedStyle(element, undefined);
          return style ? style.getPropertyValue(prop) : undefined;
      }
      else {
          return element.style[prop];
      }
  }
  exports.getComputedStyle = getComputedStyle;
  function attachResizeEvent(element, resized) {
      if (!element.resizedAttached) {
          element.resizedAttached = new EventQueue();
          element.resizedAttached.add(resized);
      }
      else if (element.resizedAttached) {
          element.resizedAttached.add(resized);
          return;
      }
      const resizeSensor = (element.resizeSensor = document.createElement('div'));
      resizeSensor.className = 'resize-sensor';
      let style = 'position: absolute; left: 0; top: 0; right: 0; bottom: 0; overflow: scroll; z-index: -1; visibility: hidden;';
      let styleChild = 'position: absolute; left: 0; top: 0;';
      resizeSensor.style.cssText = style;
      resizeSensor.innerHTML = `
    <div class="resize-sensor-expand" style="${style}">
      <div style="${styleChild}"></div>
    </div>
    <div class="resize-sensor-shrink" style="${style}">
      <div style="${styleChild} width: 200%; height: 200%"></div>
    </div>
    <div class="resize-sensor-appear" style="${style}animation-name: apearSensor; animation-duration: 0.2s;"></div>`;
      // 要定义 resizeSensor 这个动画，靠这个监听出现。
      element.appendChild(resizeSensor);
      element.hasInlineStyle = element.hasAttribute('style');
      const position = (element.originPosition = getComputedStyle(element, 'position'));
      if (!~['fixed', 'absolute'].indexOf(position)) {
          element.style.position = 'relative';
      }
      const expand = resizeSensor.children[0];
      const expandChild = expand.children[0];
      const shrink = resizeSensor.children[1];
      // let shrinkChild = shrink.children[0] as HTMLElement;
      const appear = resizeSensor.children[2];
      let lastWidth, lastHeight;
      const reset = function () {
          expandChild.style.width = expand.offsetWidth + 10 + 'px';
          expandChild.style.height = expand.offsetHeight + 10 + 'px';
          expand.scrollLeft = expand.scrollWidth;
          expand.scrollTop = expand.scrollHeight;
          shrink.scrollLeft = shrink.scrollWidth;
          shrink.scrollTop = shrink.scrollHeight;
          lastWidth = element.offsetWidth;
          lastHeight = element.offsetHeight;
      };
      reset();
      let changed = function () {
          if (element.resizedAttached) {
              element.resizedAttached.call();
          }
      };
      let addEvent = function (el, name, cb) {
          if (el.attachEvent) {
              el.attachEvent('on' + name, cb);
          }
          else {
              el.addEventListener(name, cb);
          }
      };
      let onScroll = function (e) {
          if (element.offsetWidth != lastWidth ||
              element.offsetHeight != lastHeight) {
              changed();
          }
          reset();
      };
      addEvent(expand, 'scroll', onScroll);
      addEvent(shrink, 'scroll', onScroll);
      addEvent(appear, 'animationstart', reset);
  }
  function detach(element) {
      if (element.resizeSensor) {
          if (element.hasInlineStyle) {
              element.style.position = element.originPosition;
          }
          else {
              element.removeAttribute('style');
          }
          try {
              element.removeChild(element.resizeSensor);
          }
          catch (e) { }
          delete element.resizeSensor;
          delete element.resizedAttached;
          delete element.hasInlineStyle;
          delete element.originPosition;
      }
  }
  function resizeSensor(element, callback, once = false) {
      if (once) {
          attachResizeEvent(element, function () {
              callback.apply(this, arguments);
              detach(element);
          });
          return;
      }
      attachResizeEvent(element, callback);
      let detached = false;
      return function () {
          if (detached)
              return;
          detached = true;
          detach(element);
      };
  }
  exports.resizeSensor = resizeSensor;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzaXplLXNlbnNvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy91dGlscy9yZXNpemUtc2Vuc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7O0dBR0c7OztBQUVILE1BQU0sVUFBVTtJQUFoQjtRQUNFLE1BQUMsR0FBb0IsRUFBRSxDQUFDO0lBVzFCLENBQUM7SUFUQyxHQUFHLENBQUMsRUFBWTtRQUNkLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxJQUFJLENBQUMsR0FBRyxJQUFnQjtRQUN0QixJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUNsQixFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUNkLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBRUQsU0FBZ0IsZ0JBQWdCLENBQUMsT0FBb0IsRUFBRSxJQUFZO0lBQ2pFLElBQUssT0FBZSxDQUFDLFlBQVksRUFBRTtRQUNqQyxPQUFRLE9BQWUsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDNUM7U0FBTSxJQUFJLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRTtRQUNsQyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQzFELE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztLQUN6RDtTQUFNO1FBQ0wsT0FBTyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQVcsQ0FBQyxDQUFDO0tBQ25DO0FBQ0gsQ0FBQztBQVRELDRDQVNDO0FBRUQsU0FBUyxpQkFBaUIsQ0FBQyxPQUFvQixFQUFFLE9BQWlCO0lB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

});
