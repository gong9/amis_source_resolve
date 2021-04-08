amis.define('src/utils/image.ts', function(require, exports, module, define) {

  "use strict";
  /**
   * @file image 相关的工具
   * @param url
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.getImageDimensions = exports.toDataURL = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const memoize_1 = tslib_1.__importDefault(require("node_modules/lodash/memoize"));
  /**
   * 将 url 转成 dataurl
   * @param url
   */
  exports.toDataURL = memoize_1.default((url) => {
      return new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
              const reader = new FileReader();
              reader.onloadend = function () {
                  resolve(reader.result);
              };
              reader.readAsDataURL(xhr.response);
          };
          xhr.onerror = reject;
          xhr.open('GET', url);
          xhr.responseType = 'blob';
          xhr.send();
      });
  });
  /**
   * 根据 url 获取图片尺寸
   * @param url
   */
  exports.getImageDimensions = memoize_1.default((url) => {
      return new Promise(function (resolved, rejected) {
          const i = new Image();
          i.onerror = rejected;
          i.onload = function () {
              resolved({ width: i.width, height: i.height });
          };
          i.src = url;
      });
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvdXRpbHMvaW1hZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILHFFQUFxQztBQUVyQzs7O0dBR0c7QUFDVSxRQUFBLFNBQVMsR0FBRyxpQkFBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7SUFDL0MsT0FBTyxJQUFJLE9BQU8sQ0FBUyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtRQUM3QyxNQUFNLEdBQUcsR0FBRyxJQUFJLGNBQWMsRUFBRSxDQUFDO1FBQ2pDLEdBQUcsQ0FBQyxNQUFNLEdBQUc7WUFDWCxNQUFNLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBQ2hDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7Z0JBQ2pCLE9BQU8sQ0FBQyxNQUFNLENBQUMsTUFBZ0IsQ0FBQyxDQUFDO1lBQ25DLENBQUMsQ0FBQztZQUNGLE1BQU0sQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JDLENBQUMsQ0FBQztRQUNGLEdBQUcsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxZQUFZLEdBQUcsTUFBTSxDQUFDO1FBQzFCLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUM7QUFFSDs7O0dBR0c7QUFDVSxRQUFBLGtCQUFrQixHQUFHLGlCQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtJQUN4RCxPQUFPLElBQUksT0FBTyxDQUFrQyxVQUNsRCxRQUFRLEVBQ1IsUUFBUTtRQUVSLE1BQU0sQ0FBQyxHQUFHLElBQUksS0FBSyxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7UUFDckIsQ0FBQyxDQUFDLE1BQU0sR0FBRztZQUNULFFBQVEsQ0FBQyxFQUFDLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUMvQyxDQUFDLENBQUM7UUFDRixDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztJQUNkLENBQUMsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDLENBQUMifQ==

});
