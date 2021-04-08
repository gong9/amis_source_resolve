amis.define('src/renderers/Image.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ImageFieldRenderer = exports.ImageField = exports.imagePlaceholder = exports.ImageThumb = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  const locale_1 = require("src/locale.tsx");
  let ImageThumb = /** @class */ (() => {
      class ImageThumb extends react_1.default.Component {
          handleEnlarge() {
              const _a = this.props, { onEnlarge } = _a, rest = tslib_1.__rest(_a, ["onEnlarge"]);
              onEnlarge && onEnlarge(rest);
          }
          render() {
              const { classnames: cx, className, imageClassName, thumbClassName, thumbMode, thumbRatio, height, width, src, alt, title, caption, onLoad, enlargeAble, translate: __ } = this.props;
              return (react_1.default.createElement("div", { className: cx('Image', className) },
                  react_1.default.createElement("div", { className: cx('Image-thumb', thumbClassName, thumbMode ? `Image-thumb--${thumbMode}` : '', thumbRatio ? `Image-thumb--${thumbRatio.replace(/:/g, '-')}` : ''), style: { height: height, width: width } },
                      react_1.default.createElement("img", { onLoad: onLoad, className: cx(imageClassName), src: src, alt: alt }),
                      enlargeAble ? (react_1.default.createElement("div", { key: "overlay", className: cx('Image-overlay') },
                          react_1.default.createElement("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", onClick: this.handleEnlarge },
                              react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" })))) : null),
                  title || caption ? (react_1.default.createElement("div", { key: "caption", className: cx('Image-info') },
                      title ? (react_1.default.createElement("div", { className: cx('Image-title'), title: title }, title)) : null,
                      caption ? (react_1.default.createElement("div", { className: cx('Image-caption'), title: caption }, caption)) : null)) : null));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageThumb.prototype, "handleEnlarge", null);
      return ImageThumb;
  })();
  exports.ImageThumb = ImageThumb;
  const ThemedImageThumb = theme_1.themeable(locale_1.localeable(ImageThumb));
  exports.default = ThemedImageThumb;
  exports.imagePlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAC0CAMAAAAKE/YAAAAAP1BMVEXp7vG6vsHo7fC3ur7s8fXr8PO1uLy8wMO5vcDL0NLN0dXl6u3T19vHy86+wsXO0tbQ1djc4eTh5ejBxcjZ3eD/ULOKAAACiklEQVR42u3a2YrjMBCF4arSVrYTL3Le/1lHXqbdPTZDWheRDOcLAZGrnyLgRSIAAAAAAAAAAAAAAAAAAAAAAAAAAAD4IrmoGBHKVSxbyFEm56hMtRBN7TNPO1GRaiFpvDd5vG+lQLUQNT6EwDlCYD+4AtF2Ug4mkzKb+PFqITf6oP3wyDEEZTPaz0dT63s/2DxPw6YtFT2S7Lr0eZtrSkYP64pShrXWyZsVhaNHt6xScjdNUSy9lyG2fLTYbpyZw/NFJDeJFhdnb4wab1ohuUc0dbPnwMxB/WhFbhFtR8+boBwvSkSktmiS2fDu8oohzoqQ1BQtLgY9oht3HutrXKvrjX4SyekexTys1DVp6vojeimRf5t1ra5p0lvBTvVlz83MW3VV0TF1bfwsJOfmv9UVRYt9eN2a++gumo/qeqJJ3Ks3i+dl81FNUk90ipDX0I4TfW+WvflndT3R6WsTJ/9r3qvriSb569x8VPNaXU/0149y0XxU+4cjqSpaZK8+mq+rK4pOofE5WZFT86m6omjbzT4s1UfzZXVFf4+1uTc82aWZTeArGkzoXC3R25w1LNX2lZqVr2lfPnpZHc3MqTpOejSfmAqiHcn35kRDCk8qnnSKPpo3qqx1R6fV3swHrX/SazP/UHl0Wrml+VbRTmhpvlu0i6o3jA6IPlQTHWqJZqNv4ypumFJ0z+FtPc8VRJNI9zvln1wytrhrenLZ3GGjqHWW3O/tm5+Ftpm5Gdrht9qh2V6CCH2Y2KgmsM9imFWj+3w00eiVQx5eN8Lo44RkVJOLR5IyR2tcHJs8Y7SlDjGJtS6PteWOi53d4WQe3a8YAAAAAAAAAAAAAAAAAAAAAAAAAACgNn8AGA09DkR51CoAAAAASUVORK5CYII=';
  let ImageField = /** @class */ (() => {
      class ImageField extends react_1.default.Component {
          handleEnlarge({ src, originalSrc, title, caption, thumbMode, thumbRatio }) {
              const { onImageEnlarge, enlargeTitle, enlargeCaption } = this.props;
              onImageEnlarge &&
                  onImageEnlarge({
                      src: src,
                      originalSrc: originalSrc || src,
                      title: enlargeTitle || title,
                      caption: enlargeCaption || caption,
                      thumbMode,
                      thumbRatio
                  }, this.props);
          }
          render() {
              const { className, defaultImage, imageCaption, title, data, imageClassName, thumbClassName, height, width, classnames: cx, src, thumbMode, thumbRatio, placeholder, originalSrc, enlargeAble, showDimensions } = this.props;
              const finnalSrc = src ? tpl_1.filter(src, data, '| raw') : '';
              let value = finnalSrc || this.props.value || defaultImage;
              return (react_1.default.createElement("div", { className: cx('ImageField', className) }, value ? (react_1.default.createElement(ThemedImageThumb, { imageClassName: imageClassName, thumbClassName: thumbClassName, height: height, width: width, src: value, title: tpl_1.filter(title, data), caption: tpl_1.filter(imageCaption, data), thumbMode: thumbMode, thumbRatio: thumbRatio, originalSrc: tpl_1.filter(originalSrc, data, '| raw'), enlargeAble: enlargeAble && value !== defaultImage, onEnlarge: this.handleEnlarge, showDimensions: showDimensions })) : (react_1.default.createElement("span", { className: "text-muted" }, placeholder))));
          }
      }
      ImageField.defaultProps = {
          defaultImage: exports.imagePlaceholder,
          thumbMode: 'contain',
          thumbRatio: '1:1',
          placeholder: '-'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageField.prototype, "handleEnlarge", null);
      return ImageField;
  })();
  exports.ImageField = ImageField;
  let ImageFieldRenderer = /** @class */ (() => {
      let ImageFieldRenderer = class ImageFieldRenderer extends ImageField {
      };
      ImageFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)image$/,
              name: 'image'
          })
      ], ImageFieldRenderer);
      return ImageFieldRenderer;
  })();
  exports.ImageFieldRenderer = ImageFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0ltYWdlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUNuRCxzQ0FBb0M7QUFDcEMsb0NBQTZEO0FBQzdELDRDQUF5QztBQUN6QywrQ0FBeUM7QUFDekMsc0NBQWtEO0FBeUdsRDtJQUFBLE1BQWEsVUFBVyxTQUFRLGVBQUssQ0FBQyxTQUEwQjtRQUU5RCxhQUFhO1lBQ1gsTUFBTSxLQUF1QixJQUFJLENBQUMsS0FBSyxFQUFqQyxFQUFDLFNBQVMsT0FBdUIsRUFBbEIsSUFBSSxzQkFBbkIsYUFBb0IsQ0FBYSxDQUFDO1lBQ3hDLFNBQVMsSUFBSSxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0IsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQ1QsY0FBYyxFQUNkLGNBQWMsRUFDZCxTQUFTLEVBQ1QsVUFBVSxFQUNWLE1BQU0sRUFDTixLQUFLLEVBQ0wsR0FBRyxFQUNILEdBQUcsRUFDSCxLQUFLLEVBQ0wsT0FBTyxFQUNQLE1BQU0sRUFDTixXQUFXLEVBQ1gsU0FBUyxFQUFFLEVBQUUsRUFDZCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsU0FBUyxDQUFDO2dCQUNwQyx1Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUNYLGFBQWEsRUFDYixjQUFjLEVBQ2QsU0FBUyxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsU0FBUyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDNUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxD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

});
