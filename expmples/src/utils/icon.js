amis.define('src/utils/icon.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 图标支持的公共方法，主要是支持自动识别地址和 icon-font
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.generateIcon = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  /**
   * 判断字符串来生成 i 或 img
   * @param icon icon 设置
   * @param className 内部用的 className
   * @param classNameProp amis 配置里设置的 className
   */
  exports.generateIcon = (cx, icon, className, classNameProp) => {
      const isURLIcon = (icon === null || icon === void 0 ? void 0 : icon.indexOf('.')) !== -1;
      return icon ? (isURLIcon ? (react_1.default.createElement("img", { className: cx(className, classNameProp), src: icon })) : (react_1.default.createElement("i", { className: cx(className, icon, classNameProp) }))) : null;
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy91dGlscy9pY29uLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7QUFFSCwwREFBMEI7QUFHMUI7Ozs7O0dBS0c7QUFDVSxRQUFBLFlBQVksR0FBRyxDQUMxQixFQUFnQixFQUNoQixJQUFhLEVBQ2IsU0FBa0IsRUFDbEIsYUFBc0IsRUFDdEIsRUFBRTtJQUNGLE1BQU0sU0FBUyxHQUFHLENBQUEsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLE9BQU8sQ0FBQyxHQUFHLE9BQU0sQ0FBQyxDQUFDLENBQUM7SUFFNUMsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1osU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNWLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxJQUFJLEdBQUksQ0FDNUQsQ0FBQyxDQUFDLENBQUMsQ0FDRixxQ0FBRyxTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsYUFBYSxDQUFDLEdBQUksQ0FDckQsQ0FDRixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7QUFDWCxDQUFDLENBQUMifQ==

});
