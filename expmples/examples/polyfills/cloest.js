amis.define('examples/polyfills/cloest.ts', function(require, exports, module, define) {

  /**
   * @file 担心会有些浏览器不支持，所以网上抄了一段
   * @author mdn
   */
  if (!Element.prototype.matches) {
      Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
              Element.prototype.webkitMatchesSelector;
  }
  if (!Element.prototype.closest) {
      Element.prototype.closest = function (s) {
          var el = this;
          if (!document.documentElement.contains(el)) {
              return null;
          }
          do {
              if (el.matches(s)) {
                  return el;
              }
              el = el.parentElement;
          } while (el !== null);
          return null;
      };
  }
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvZXhhbXBsZXMvcG9seWZpbGxzL2Nsb2VzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7O0dBR0c7QUFDSCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDOUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPO1FBQ3ZCLE9BQU8sQ0FBQyxTQUFTLENBQUMsaUJBQWlCO1lBQ25DLE9BQU8sQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUM7Q0FDM0M7QUFFRCxJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEVBQUU7SUFDOUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDO1FBQ3JDLElBQUksRUFBRSxHQUFHLElBQUksQ0FBQztRQUNkLElBQUksQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsRUFBRTtZQUMxQyxPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsR0FBRztZQUNELElBQUksRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDakIsT0FBTyxFQUFFLENBQUM7YUFDWDtZQUNELEVBQUUsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDO1NBQ3ZCLFFBQVEsRUFBRSxLQUFLLElBQUksRUFBRTtRQUN0QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUMsQ0FBQztDQUNIIn0=

});
