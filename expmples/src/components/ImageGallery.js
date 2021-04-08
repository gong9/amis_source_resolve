amis.define('src/components/ImageGallery.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ImageGallery = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Modal_1 = tslib_1.__importDefault(require("src/components/Modal.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const locale_1 = require("src/locale.tsx");
  let ImageGallery = /** @class */ (() => {
      var _a;
      class ImageGallery extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpened: false,
                  index: -1,
                  items: []
              };
          }
          handleImageEnlarge(info) {
              this.setState({
                  isOpened: true,
                  items: info.list ? info.list : [info],
                  index: info.index || 0
              });
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          prev() {
              const index = this.state.index;
              this.setState({
                  index: index - 1
              });
          }
          next() {
              const index = this.state.index;
              this.setState({
                  index: index + 1
              });
          }
          handleItemClick(e) {
              const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
              this.setState({
                  index
              });
          }
          render() {
              const { children, classnames: cx, modalContainer } = this.props;
              const { index, items } = this.state;
              const __ = this.props.translate;
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  react_1.default.cloneElement(children, {
                      onImageEnlarge: this.handleImageEnlarge
                  }),
                  react_1.default.createElement(Modal_1.default, { closeOnEsc: true, size: "full", onHide: this.close, show: this.state.isOpened, contentClassName: cx('ImageGallery'), container: modalContainer },
                      react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", className: cx('ImageGallery-close'), onClick: this.close },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                      ~index && items[index] ? (react_1.default.createElement(react_1.default.Fragment, null,
                          react_1.default.createElement("div", { className: cx('ImageGallery-title') }, items[index].title),
                          react_1.default.createElement("div", { className: cx('ImageGallery-main') },
                              react_1.default.createElement("img", { src: items[index].originalSrc }),
                              items.length > 1 ? (react_1.default.createElement(react_1.default.Fragment, null,
                                  react_1.default.createElement("a", { className: cx('ImageGallery-prevBtn', index <= 0 ? 'is-disabled' : ''), onClick: this.prev },
                                      react_1.default.createElement(icons_1.Icon, { icon: "prev", className: "icon" })),
                                  react_1.default.createElement("a", { className: cx('ImageGallery-nextBtn', index >= items.length - 1 ? 'is-disabled' : ''), onClick: this.next },
                                      react_1.default.createElement(icons_1.Icon, { icon: "next", className: "icon" })))) : null))) : null,
                      items.length > 1 ? (react_1.default.createElement("div", { className: cx('ImageGallery-footer') },
                          react_1.default.createElement("a", { className: cx('ImageGallery-prevList is-disabled') },
                              react_1.default.createElement(icons_1.Icon, { icon: "prev", className: "icon" })),
                          react_1.default.createElement("div", { className: cx('ImageGallery-itemsWrap') },
                              react_1.default.createElement("div", { className: cx('ImageGallery-items') }, items.map((item, i) => (react_1.default.createElement("div", { key: i, "data-index": i, onClick: this.handleItemClick, className: cx('ImageGallery-item', i === index ? 'is-active' : '') },
                                  react_1.default.createElement("img", { src: item.src })))))),
                          react_1.default.createElement("a", { className: cx('ImageGallery-nextList is-disabled') },
                              react_1.default.createElement(icons_1.Icon, { icon: "next", className: "icon" })))) : null)));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "handleImageEnlarge", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "prev", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "next", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ImageGallery.prototype, "handleItemClick", null);
      return ImageGallery;
  })();
  exports.ImageGallery = ImageGallery;
  exports.default = theme_1.themeable(locale_1.localeable(ImageGallery));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2VHYWxsZXJ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvSW1hZ2VHYWxsZXJ5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9DQUE2RDtBQUM3RCw0Q0FBeUM7QUFDekMsNERBQTRCO0FBQzVCLG1DQUE2QjtBQUM3QixzQ0FBa0Q7QUFrQmxEOztJQUFBLE1BQWEsWUFBYSxTQUFRLGVBQUssQ0FBQyxTQUd2QztRQUhEOztZQUlFLFVBQUssR0FBc0I7Z0JBQ3pCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLEtBQUssRUFBRSxDQUFDLENBQUM7Z0JBQ1QsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDO1FBaUpKLENBQUM7UUE5SUMsa0JBQWtCLENBQUMsSUFZbEI7WUFDQyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDckMsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksQ0FBQzthQUN2QixDQUFDLENBQUM7UUFDTCxDQUFDO1FBR0QsS0FBSztZQUNILElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdELElBQUk7WUFDRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLEtBQUssRUFBRSxLQUFLLEdBQUcsQ0FBQzthQUNqQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBR0QsSUFBSTtZQUNGLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxL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

});
