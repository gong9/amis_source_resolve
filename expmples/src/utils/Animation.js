amis.define('src/utils/Animation.ts', function(require, exports, module, define) {

  "use strict";
  // 基本上都是从 sortable 那抄的，让拖拽切换有个动画，看起来更流畅。
  // 用法是移动前先 animat.capture(container) 把移动前的位置信息记住
  // 然后移动节点
  // 然后 animate.animateAll(); 计算移动后的位置，然后马上通过 css transform 到原来的位置
  // 然后开始动画到移动后的位置。
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AnimationManager = void 0;
  function userAgent(pattern) {
      if (typeof window !== 'undefined' && window.navigator) {
          return !!( /*@__PURE__*/navigator.userAgent.match(pattern));
      }
  }
  const IE11OrLess = userAgent(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i);
  // const Edge = userAgent(/Edge/i);
  // const FireFox = userAgent(/firefox/i);
  // const Safari =
  //   userAgent(/safari/i) && !userAgent(/chrome/i) && !userAgent(/android/i);
  // const IOS = userAgent(/iP(ad|od|hone)/i);
  // const ChromeForAndroid = userAgent(/chrome/i) && userAgent(/android/i);
  const AnimationDurtation = 150;
  const AnimationEasing = 'cubic-bezier(1, 0, 0, 1)';
  class AnimationManager {
      constructor() {
          this.animating = false;
          this.states = [];
      }
      capture(el) {
          // 清空，重复调用，旧的不管了
          this.states = [];
          let children = [].slice.call(el.children);
          children.forEach(child => {
              // 如果是 ghost
              if (child.classList.contains('is-ghost')) {
                  return;
              }
              const rect = getRect(child);
              // 通常是隐藏节点
              if (!rect.width) {
                  return;
              }
              let fromRect = Object.assign({}, rect);
              const state = {
                  target: child,
                  rect
              };
              // 还在动画中
              if (child.thisAnimationDuration) {
                  let childMatrix = matrix(child);
                  if (childMatrix) {
                      fromRect.top -= childMatrix.f;
                      fromRect.left -= childMatrix.e;
                  }
              }
              child.fromRect = fromRect;
              this.states.push(state);
          });
      }
      animateAll(callback) {
          this.animating = false;
          let animationTime = 0;
          this.states.forEach(state => {
              let time = 0, target = state.target, fromRect = target.fromRect, toRect = Object.assign({}, getRect(target)), prevFromRect = target.prevFromRect, prevToRect = target.prevToRect, animatingRect = state.rect, targetMatrix = matrix(target);
              if (targetMatrix) {
                  // Compensate for current animation
                  toRect.top -= targetMatrix.f;
                  toRect.left -= targetMatrix.e;
              }
              target.toRect = toRect;
              if (target.thisAnimationDuration) {
                  // Could also check if animatingRect is between fromRect and toRect
                  if (isRectEqual(prevFromRect, toRect) &&
                      !isRectEqual(fromRect, toRect) &&
                      // Make sure animatingRect is on line between toRect & fromRect
                      (animatingRect.top - toRect.top) /
                          (animatingRect.left - toRect.left) ===
                          (fromRect.top - toRect.top) / (fromRect.left - toRect.left)) {
                      // If returning to same place as started from animation and on same axis
                      time = calculateRealTime(animatingRect, prevFromRect, prevToRect);
                  }
              }
              // if fromRect != toRect: animate
              if (!isRectEqual(toRect, fromRect)) {
                  target.prevFromRect = fromRect;
                  target.prevToRect = toRect;
                  if (!time) {
                      time = AnimationDurtation;
                  }
                  this.animate(target, animatingRect, toRect, time);
              }
              if (time) {
                  this.animating = true;
                  animationTime = Math.max(animationTime, time);
                  clearTimeout(target.animationResetTimer);
                  target.animationResetTimer = setTimeout(function () {
                      target.animationTime = 0;
                      target.prevFromRect = null;
                      target.fromRect = null;
                      target.prevToRect = null;
                      target.thisAnimationDuration = null;
                  }, time);
                  target.thisAnimationDuration = time;
              }
          });
          clearTimeout(this.animationCallbackId);
          if (!this.animating) {
              if (typeof callback === 'function')
                  callback();
          }
          else {
              this.animationCallbackId = setTimeout(() => {
                  this.animating = false;
                  if (typeof callback === 'function')
                      callback();
              }, animationTime);
          }
          this.states = [];
      }
      animate(target, currentRect, toRect, duration) {
          if (duration) {
              let affectDisplay = false;
              css(target, 'transition', '');
              css(target, 'transform', '');
              let translateX = currentRect.left - toRect.left, translateY = currentRect.top - toRect.top;
              target.animatingX = !!translateX;
              target.animatingY = !!translateY;
              css(target, 'transform', 'translate3d(' + translateX + 'px,' + translateY + 'px,0)');
              if (css(target, 'display') === 'inline') {
                  affectDisplay = true;
                  css(target, 'display', 'inline-block');
              }
              target.offsetWidth; // repaint
              css(target, 'transition', 'transform ' +
                  duration +
                  'ms' +
                  (AnimationEasing ? ' ' + AnimationEasing : ''));
              css(target, 'transform', 'translate3d(0,0,0)');
              typeof target.animated === 'number' &&
                  clearTimeout(target.animated);
              target.animated = setTimeout(function () {
                  css(target, 'transition', '');
                  css(target, 'transform', '');
                  affectDisplay && css(target, 'display', '');
                  target.animated = false;
                  target.animatingX = false;
                  target.animatingY = false;
              }, duration);
          }
      }
  }
  exports.AnimationManager = AnimationManager;
  function matrix(el) {
      let appliedTransforms = '';
      if (typeof el === 'string') {
          appliedTransforms = el;
      }
      else {
          let transform = css(el, 'transform');
          if (transform && transform !== 'none') {
              appliedTransforms = transform + ' ' + appliedTransforms;
          }
      }
      const matrixFn = window.DOMMatrix ||
          window.WebKitCSSMatrix ||
          window.CSSMatrix ||
          window.MSCSSMatrix;
      /*jshint -W056 */
      return matrixFn && new matrixFn(appliedTransforms);
  }
  function css(el, prop, val) {
      let style = el && el.style;
      if (style) {
          if (val === void 0) {
              if (document.defaultView && document.defaultView.getComputedStyle) {
                  val = document.defaultView.getComputedStyle(el, '');
              }
              else if (el.currentStyle) {
                  val = el.currentStyle;
              }
              return prop === void 0 ? val : val[prop];
          }
          else {
              if (!(prop in style) && prop.indexOf('webkit') === -1) {
                  prop = '-webkit-' + prop;
              }
              style[prop] = val + (typeof val === 'string' ? '' : 'px');
          }
      }
  }
  function isRectEqual(rect1, rect2) {
      return (Math.round(rect1.top) === Math.round(rect2.top) &&
          Math.round(rect1.left) === Math.round(rect2.left) &&
          Math.round(rect1.height) === Math.round(rect2.height) &&
          Math.round(rect1.width) === Math.round(rect2.width));
  }
  function calculateRealTime(animatingRect, fromRect, toRect) {
      return ((Math.sqrt(Math.pow(fromRect.top - animatingRect.top, 2) +
          Math.pow(fromRect.left - animatingRect.left, 2)) /
          Math.sqrt(Math.pow(fromRect.top - toRect.top, 2) +
              Math.pow(fromRect.left - toRect.left, 2))) *
          AnimationDurtation);
  }
  function getWindowScrollingElement() {
      let scrollingElement = document.scrollingElement;
      if (scrollingElement) {
          return scrollingElement;
      }
      else {
          return document.documentElement;
      }
  }
  function getRect(el, relativeToContainingBlock, relativeToNonStaticParent, undoScale, container) {
      if (!el.getBoundingClientRect && el !== window)
          return;
      let elRect, top, left, bottom, right, height, width;
      if (el !== window && el !== getWindowScrollingElement()) {
          elRect = el.getBoundingClientRect();
          top = elRect.top;
          left = elRect.left;
          bottom = elRect.bottom;
          right = elRect.right;
          height = elRect.height;
          width = elRect.width;
      }
      else {
          top = 0;
          left = 0;
          bottom = window.innerHeight;
          right = window.innerWidth;
          height = window.innerHeight;
          width = window.innerWidth;
      }
      if ((relativeToContainingBlock || relativeToNonStaticParent) &&
          el !== window) {
          // Adjust for translate()
          container = container || el.parentNode;
          // solves #1123 (see: https://stackoverflow.com/a/37953806/6088312)
          // Not needed on <= IE11
          if (!IE11OrLess) {
              do {
                  if (container &&
                      container.getBoundingClientRect &&
                      (css(container, 'transform') !== 'none' ||
                          (relativeToNonStaticParent &&
                              css(container, 'position') !== 'static'))) {
                      let containerRect = container.getBoundingClientRect();
                      // Set relative to edges of padding box of container
                      top -=
                          containerRect.top + parseInt(css(container, 'border-top-width'));
                      left -=
                          containerRect.left + parseInt(css(container, 'border-left-width'));
                      bottom = top + elRect.height;
                      right = left + elRect.width;
                      break;
                  }
                  /* jshint boss:true */
              } while ((container = container.parentNode));
          }
      }
      if (undoScale && el !== window) {
          // Adjust for scale()
          let elMatrix = matrix(container || el), scaleX = elMatrix && elMatrix.a, scaleY = elMatrix && elMatrix.d;
          if (elMatrix) {
              top /= scaleY;
              left /= scaleX;
              width /= scaleX;
              height /= scaleY;
              bottom = top + height;
              right = left + width;
          }
      }
      return {
          top: top,
          left: left,
          bottom: bottom,
          right: right,
          width: width,
          height: height
      };
  }
  exports.default = new AnimationManager();
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5pbWF0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL0FuaW1hdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsd0NBQXdDO0FBQ3hDLGdEQUFnRDtBQUNoRCxTQUFTO0FBQ1QsZ0VBQWdFO0FBQ2hFLGlCQUFpQjs7O0FBZ0JqQixTQUFTLFNBQVMsQ0FBQyxPQUFlO0lBQ2hDLElBQUksT0FBTyxNQUFNLEtBQUssV0FBVyxJQUFJLE1BQU0sQ0FBQyxTQUFTLEVBQUU7UUFDckQsT0FBTyxDQUFDLENBQUMsRUFBQyxhQUFjLFNBQVMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7S0FDN0Q7QUFDSCxDQUFDO0FBRUQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUMxQix1REFBdUQsQ0FDeEQsQ0FBQztBQUNGLG1DQUFtQztBQUNuQyx5Q0FBeUM7QUFDekMsaUJBQWlCO0FBQ2pCLDZFQUE2RTtBQUM3RSw0Q0FBNEM7QUFDNUMsMEVBQTBFO0FBRTFFLE1BQU0sa0JBQWtCLEdBQUcsR0FBRyxDQUFDO0FBQy9CLE1BQU0sZUFBZSxHQUFHLDBCQUEwQixDQUFDO0FBRW5ELE1BQWEsZ0JBQWdCO0lBQTdCO1FBQ0UsY0FBUyxHQUFZLEtBQUssQ0FBQztRQUUzQixXQUFNLEdBQTBCLEVBQUUsQ0FBQztJQTBLckMsQ0FBQztJQXhLQyxPQUFPLENBQUMsRUFBZTtRQUNyQixnQkFBZ0I7UUFDaEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFFakIsSUFBSSxRQUFRLEdBQXVCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUM5RCxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3ZCLFlBQVk7WUFDWixJQUFJLEtBQUssQ0FBQyxT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

});
