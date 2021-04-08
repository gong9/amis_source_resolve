amis.define('src/renderers/QRCode.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.QRCodeControlRenderer = exports.QRCodeRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const factory_1 = require("src/factory.tsx");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  // @ts-ignore
  const qrcode_react_1 = tslib_1.__importDefault(require("node_modules/qrcode.react/lib/index"));
  let QRCode = /** @class */ (() => {
      class QRCode extends react_1.default.Component {
          render() {
              const { className, qrcodeClassName, codeSize, backgroundColor, foregroundColor, placeholder, level, value, data, classPrefix: ns } = this.props;
              const finalValue = tpl_1.filter(value, data, '| raw');
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}QrCode`, className) }, !finalValue ? (react_1.default.createElement("span", { className: `${ns}QrCode--placeholder` }, placeholder)) : finalValue.length > 2953 ? (
              // https://github.com/zpao/qrcode.react/issues/69
              react_1.default.createElement("span", { className: "text-danger" }, "\u4E8C\u7EF4\u7801\u503C\u8FC7\u957F\uFF0C\u8BF7\u8BBE\u7F6E2953\u4E2A\u5B57\u7B26\u4EE5\u4E0B\u7684\u6587\u672C")) : (react_1.default.createElement(qrcode_react_1.default, { className: qrcodeClassName, value: finalValue, renderAs: 'svg', size: codeSize, bgColor: backgroundColor, fgColor: foregroundColor, level: level || 'L' }))));
          }
      }
      QRCode.defaultProps = {
          codeSize: 128,
          qrcodeClassName: '',
          backgroundColor: '#fff',
          foregroundColor: '#000',
          level: 'L',
          placeholder: '-'
      };
      return QRCode;
  })();
  exports.default = QRCode;
  let QRCodeRenderer = /** @class */ (() => {
      let QRCodeRenderer = class QRCodeRenderer extends QRCode {
      };
      QRCodeRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)qr\-?code$/,
              name: 'qrcode'
          })
      ], QRCodeRenderer);
      return QRCodeRenderer;
  })();
  exports.QRCodeRenderer = QRCodeRenderer;
  let QRCodeControlRenderer = /** @class */ (() => {
      let QRCodeControlRenderer = class QRCodeControlRenderer extends QRCode {
      };
      QRCodeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'qr-code',
              sizeMutable: false
          })
      ], QRCodeControlRenderer);
      return QRCodeControlRenderer;
  })();
  exports.QRCodeControlRenderer = QRCodeControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUVJDb2RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9RUkNvZGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsb0VBQTRCO0FBQzVCLHdDQUFtRDtBQUNuRCxzQ0FBdUQ7QUFDdkQsc0NBQW9DO0FBQ3BDLGFBQWE7QUFDYix3RUFBa0M7QUFtRGxDO0lBQUEsTUFBcUIsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQVVuRSxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxlQUFlLEVBQ2YsUUFBUSxFQUNSLGVBQWUsRUFDZixlQUFlLEVBQ2YsV0FBVyxFQUNYLEtBQUssRUFDTCxLQUFLLEVBQ0wsSUFBSSxFQUNKLFdBQVcsRUFBRSxFQUFFLEVBQ2hCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sVUFBVSxHQUFHLFlBQU0sQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBRWhELE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsb0JBQUUsQ0FBQyxHQUFHLEVBQUUsUUFBUSxFQUFFLFNBQVMsQ0FBQyxJQUN6QyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FDYix3Q0FBTSxTQUFTLEVBQUUsR0FBRyxFQUFFLHFCQUFxQixJQUFHLFdBQVcsQ0FBUSxDQUNsRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsaURBQWlEO1lBQ2pELHdDQUFNLFNBQVMsRUFBQyxhQUFhLHVIQUV0QixDQUNSLENBQUMsQ0FBQyxDQUFDLENBQ0YsOEJBQUMsc0JBQU0sSUFDTCxTQUFTLEVBQUUsZUFBZSxFQUMxQixLQUFLLEVBQUUsVUFBVSxFQUNqQixRQUFRLEVBQUUsS0FBSyxFQUNmLElBQUksRUFBRSxRQUFRLEVBQ2QsT0FBTyxFQUFFLGVBQWUsRUFDeEIsT0FBTyxFQUFFLGVBQWUsRUFDeEIsS0FBSyxFQUFFLEtBQUssSUFBSSxHQUFHLEdBQ25CLENBQ0gsQ0FDRyxDQUNQLENBQUM7UUFDSixDQUFDOztJQS9DTSxtQkFBWSxHQUF5QjtRQUMxQyxRQUFRLEVBQUUsR0FBRztRQUNiLGVBQWUsRUFBRSxFQUFFO1FBQ25CLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLGVBQWUsRUFBRSxNQUFNO1FBQ3ZCLEtBQUssRUFBRSxHQUFHO1FBQ1YsV0FBVyxFQUFFLEdBQUc7S0FDakIsQ0FBQztJQXlDSixhQUFDO0tBQUE7a0JBakRvQixNQUFNO0FBdUQzQjtJQUFBLElBQWEsY0FBYyxHQUEzQixNQUFhLGNBQWUsU0FBUSxNQUFNO0tBQUcsQ0FBQTtJQUFoQyxjQUFjO1FBSjFCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsa0JBQWtCO1lBQ3hCLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUNXLGNBQWMsQ0FBa0I7SUFBRCxxQkFBQztLQUFBO0FBQWhDLHdDQUFjO0FBTTNCO0lBQUEsSUFBYSxxQkFBcUIsR0FBbEMsTUFBYSxxQkFBc0IsU0FBUSxNQUFNO0tBQUcsQ0FBQTtJQUF2QyxxQkFBcUI7UUFKakMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFNBQVM7WUFDZixXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO09BQ1cscUJBQXFCLENBQWtCO0lBQUQsNEJBQUM7S0FBQTtBQUF2QyxzREFBcUIifQ==

});
