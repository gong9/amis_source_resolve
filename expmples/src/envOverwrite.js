amis.define('src/envOverwrite.ts', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 用于在移动端或不同语言环境下使用不同配置
   */
  var _a, _b;
  Object.defineProperty(exports, "__esModule", { value: true });
  const factory_1 = require("src/factory.tsx");
  const isMobile = ((_b = (_a = window).matchMedia) === null || _b === void 0 ? void 0 : _b.call(_a, '(max-width: 768px)').matches) ? true
      : false;
  factory_1.addSchemaFilter(function (schema, renderer, props) {
      if (schema.mobile && isMobile) {
          return Object.assign(Object.assign({}, schema), schema.mobile);
      }
      if (props.locale && schema[props.locale]) {
          return Object.assign(Object.assign({}, schema), schema[props.locale]);
      }
      return schema;
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW52T3ZlcndyaXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2Vudk92ZXJ3cml0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7OztBQUtILHVDQUF5RTtBQUV6RSxNQUFNLFFBQVEsR0FBRyxPQUFBLE1BQUMsTUFBYyxFQUFDLFVBQVUsbURBQUcsb0JBQW9CLEVBQUUsT0FBTyxFQUN6RSxDQUFDLENBQUMsSUFBSTtJQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7QUFFVix5QkFBZSxDQUFDLFVBQVUsTUFBYyxFQUFFLFFBQVEsRUFBRSxLQUFLO0lBQ3ZELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxRQUFRLEVBQUU7UUFDN0IsdUNBQVcsTUFBTSxHQUFLLE1BQU0sQ0FBQyxNQUFNLEVBQUU7S0FDdEM7SUFFRCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN4Qyx1Q0FBVyxNQUFNLEdBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsRUFBRTtLQUM3QztJQUVELE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMsQ0FBQyxDQUFDIn0=

});
