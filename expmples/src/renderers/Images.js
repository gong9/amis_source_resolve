amis.define('src/renderers/Images.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ImagesFieldRenderer = exports.ImagesField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const Image_1 = tslib_1.__importStar(require("src/renderers/Image.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  let ImagesField = /** @class */ (() => {
      var _a;
      class ImagesField extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.list = [];
          }
          handleEnlarge(info) {
              const { onImageEnlarge, src, originalSrc } = this.props;
              onImageEnlarge &&
                  onImageEnlarge(Object.assign(Object.assign({}, info), { originalSrc: info.originalSrc || info.src, list: this.list.map(item => ({
                          src: src
                              ? tpl_1.filter(src, item, '| raw')
                              : (item && item.image) || item,
                          originalSrc: originalSrc
                              ? tpl_1.filter(originalSrc, item, '| raw')
                              : (item && item.src) || item,
                          title: item && (item.enlargeTitle || item.title),
                          caption: item && (item.enlargeCaption || item.description || item.caption)
                      })) }), this.props);
          }
          render() {
              const { className, defaultImage, thumbMode, thumbRatio, data, name, value, placeholder, classnames: cx, source, delimiter, enlargeAble, src, originalSrc, listClassName } = this.props;
              let list;
              if (typeof source === 'string' && tpl_builtin_1.isPureVariable(source)) {
                  list = tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw') || undefined;
              }
              else if (Array.isArray(value)) {
                  list = value;
              }
              else if (name && data[name]) {
                  list = data[name];
              }
              if (typeof list === 'string') {
                  list = list.split(delimiter);
              }
              else if (list && !Array.isArray(list)) {
                  list = [list];
              }
              this.list = list;
              return (react_1.default.createElement("div", { className: cx('ImagesField', className) }, Array.isArray(list) ? (react_1.default.createElement("div", { className: cx('Images', listClassName) }, list.map((item, index) => (react_1.default.createElement(Image_1.default, { index: index, className: cx('Images-item'), key: index, src: (src ? tpl_1.filter(src, item, '| raw') : item && item.image) ||
                      item, originalSrc: (originalSrc
                      ? tpl_1.filter(originalSrc, item, '| raw')
                      : item && item.src) || item, title: item && item.title, caption: item && (item.description || item.caption), thumbMode: thumbMode, thumbRatio: thumbRatio, enlargeAble: enlargeAble, onEnlarge: this.handleEnlarge }))))) : defaultImage ? (react_1.default.createElement("div", { className: cx('Images', listClassName) },
                  react_1.default.createElement(Image_1.default, { className: cx('Images-item'), src: defaultImage, thumbMode: thumbMode, thumbRatio: thumbRatio }))) : (placeholder)));
          }
      }
      ImagesField.defaultProps = {
          className: '',
          delimiter: ',',
          defaultImage: Image_1.imagePlaceholder,
          placehoder: '-',
          thumbMode: 'contain',
          thumbRatio: '1:1'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Image_1.ImageThumbProps !== "undefined" && Image_1.ImageThumbProps) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImagesField.prototype, "handleEnlarge", null);
      return ImagesField;
  })();
  exports.ImagesField = ImagesField;
  let ImagesFieldRenderer = /** @class */ (() => {
      let ImagesFieldRenderer = class ImagesFieldRenderer extends ImagesField {
      };
      ImagesFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)images$/,
              name: 'images'
          })
      ], ImagesFieldRenderer);
      return ImagesFieldRenderer;
  })();
  exports.ImagesFieldRenderer = ImagesFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9JbWFnZXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBQ25ELHNDQUFvQztBQUNwQyxzREFJOEI7QUFDOUIseURBQWlFO0FBQ2pFLDRDQUF5QztBQTRGekM7O0lBQUEsTUFBYSxXQUFZLFNBQVEsZUFBSyxDQUFDLFNBQXNCO1FBQTdEOztZQWtCRSxTQUFJLEdBQWUsRUFBRSxDQUFDO1FBMEd4QixDQUFDO1FBdkdDLGFBQWEsQ0FBQyxJQUFxQjtZQUNqQyxNQUFNLEVBQUMsY0FBYyxFQUFFLEdBQUcsRUFBRSxXQUFXLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXRELGNBQWM7Z0JBQ1osY0FBYyxpQ0FFUCxJQUFJLEtBQ1AsV0FBVyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLEdBQUcsRUFDekMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQzt3QkFDM0IsR0FBRyxFQUFFLEdBQUc7NEJBQ04sQ0FBQyxDQUFDLFlBQU0sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzs0QkFDNUIsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJO3dCQUNoQyxXQUFXLEVBQUUsV0FBVzs0QkFDdEIsQ0FBQyxDQUFDLFlBQU0sQ0FBQyxXQUFXLEVBQUUsSUFBSSxFQUFFLE9BQU8sQ0FBQzs0QkFDcEMsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJO3dCQUM5QixLQUFLLEVBQUUsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVks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

});
