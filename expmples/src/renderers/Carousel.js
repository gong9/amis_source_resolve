amis.define('src/renderers/Carousel.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CarouselRenderer = exports.Carousel = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const factory_1 = require("src/factory.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  const animationStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in',
      [Transition_1.EXITING]: 'out'
  };
  const defaultSchema = {
      type: 'tpl',
      tpl: `
      <% if (data.hasOwnProperty('image')) { %>
          <div style="background-image: url('<%= data.image %>'); background-size: contain; background-repeat: no-repeat; background-position: center center;" class="image <%= data.imageClassName %>"></div>
          <% if (data.hasOwnProperty('title')) { %>
              <div class="title <%= data.titleClassName %>"><%= data.title %></div>
          <% } if (data.hasOwnProperty('description')) { %> 
              <div class="description <%= data.descriptionClassName %>"><%= data.description %></div> 
          <% } %>
      <% } else if (data.hasOwnProperty('html')) { %>
          <%= data.html %>"
      <% } else if (data.hasOwnProperty('image')) { %>
          <div style="background-image: url('<%= data.image %>')" class="image <%= data.imageClassName %>"></div>
          <% if (data.title) { %>
              <div class="title <%= data.titleClassName %>"><%= data.title %></div>
          <% } if (data.description) { %> 
              <div class="description <%= data.descriptionClassName %>"><%= data.description %></div> 
          <% } %>
      <% } else if (data.hasOwnProperty('html')) { %>
          <%= data.html %>
      <% } else if (data.hasOwnProperty('item')) { %>
          <%= data.item %>
      <% } else { %>
          <%= '未找到渲染数据' %>
      <% } %>
      `
  };
  let Carousel = /** @class */ (() => {
      class Carousel extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.wrapperRef = react_1.default.createRef();
              this.state = {
                  current: 0,
                  options: this.props.value ||
                      this.props.options ||
                      tpl_builtin_1.resolveVariable(this.props.name, this.props.data) ||
                      [],
                  showArrows: false,
                  nextAnimation: ''
              };
          }
          componentWillReceiveProps(nextProps) {
              const currentOptions = this.state.options;
              const nextOptions = nextProps.value ||
                  nextProps.options ||
                  tpl_builtin_1.resolveVariable(nextProps.name, nextProps.data) ||
                  [];
              if (helper_1.isArrayChildrenModified(currentOptions, nextOptions)) {
                  this.setState({
                      options: nextOptions
                  });
              }
          }
          componentDidMount() {
              this.prepareAutoSlide();
          }
          componentWillUnmount() {
              this.clearAutoTimeout();
          }
          prepareAutoSlide() {
              if (this.state.options.length < 2) {
                  return;
              }
              this.clearAutoTimeout();
              if (this.props.auto) {
                  this.intervalTimeout = setTimeout(this.autoSlide, this.props.interval);
              }
          }
          autoSlide(rel) {
              this.clearAutoTimeout();
              const { animation } = this.props;
              let { nextAnimation } = this.state;
              switch (rel) {
                  case 'prev':
                      animation === 'slide'
                          ? (nextAnimation = 'slideRight')
                          : (nextAnimation = '');
                      this.transitFramesTowards('right', nextAnimation);
                      break;
                  case 'next':
                  default:
                      nextAnimation = '';
                      this.transitFramesTowards('left', nextAnimation);
                      break;
              }
              this.durationTimeout = setTimeout(this.prepareAutoSlide, this.props.duration);
          }
          transitFramesTowards(direction, nextAnimation) {
              let { current } = this.state;
              switch (direction) {
                  case 'left':
                      current = this.getFrameId('next');
                      break;
                  case 'right':
                      current = this.getFrameId('prev');
                      break;
              }
              this.setState({
                  current,
                  nextAnimation
              });
          }
          getFrameId(pos) {
              const { options, current } = this.state;
              const total = options.length;
              switch (pos) {
                  case 'prev':
                      return (current - 1 + total) % total;
                  case 'next':
                      return (current + 1) % total;
                  default:
                      return current;
              }
          }
          next() {
              this.autoSlide('next');
          }
          prev() {
              this.autoSlide('prev');
          }
          clearAutoTimeout() {
              clearTimeout(this.intervalTimeout);
              clearTimeout(this.durationTimeout);
          }
          renderDots() {
              const { classnames: cx } = this.props;
              const { current, options } = this.state;
              return (react_1.default.createElement("div", { className: cx('Carousel-dotsControl'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave }, Array.from({ length: options.length }).map((_, i) => (react_1.default.createElement("span", { key: i, className: cx('Carousel-dot', current === i ? 'is-active' : '') })))));
          }
          renderArrows() {
              const { classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('Carousel-arrowsControl'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
                  react_1.default.createElement("div", { className: cx('Carousel-leftArrow'), onClick: this.prev },
                      react_1.default.createElement(icons_1.Icon, { icon: "left-arrow", className: "icon" })),
                  react_1.default.createElement("div", { className: cx('Carousel-rightArrow'), onClick: this.next },
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))));
          }
          handleMouseEnter() {
              this.setState({
                  showArrows: true
              });
              this.clearAutoTimeout();
          }
          handleMouseLeave() {
              this.setState({
                  showArrows: false
              });
              this.prepareAutoSlide();
          }
          render() {
              const { render, className, classnames: cx, itemSchema, animation, width, height, controls, controlsTheme, placeholder, data, name } = this.props;
              const { options, showArrows, current, nextAnimation } = this.state;
              let body = null;
              let carouselStyles = {};
              width ? (carouselStyles.width = width + 'px') : '';
              height ? (carouselStyles.height = height + 'px') : '';
              const [dots, arrows] = [
                  controls.indexOf('dots') > -1,
                  controls.indexOf('arrows') > -1
              ];
              const animationName = nextAnimation || animation;
              if (Array.isArray(options) && options.length) {
                  body = (react_1.default.createElement("div", { ref: this.wrapperRef, className: cx('Carousel-container'), onMouseEnter: this.handleMouseEnter, onMouseLeave: this.handleMouseLeave },
                      options.map((option, key) => (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: key === current, timeout: 500, key: key }, (status) => {
                          if (status === Transition_1.ENTERING) {
                              this.wrapperRef.current &&
                                  this.wrapperRef.current.childNodes.forEach((item) => item.offsetHeight);
                          }
                          return (react_1.default.createElement("div", { className: cx('Carousel-item', animationName, animationStyles[status]) }, render(`${current}/body`, itemSchema ? itemSchema : defaultSchema, {
                              data: helper_1.createObject(data, helper_1.isObject(option)
                                  ? option
                                  : { item: option, [name]: option })
                          })));
                      }))),
                      dots ? this.renderDots() : null,
                      arrows && showArrows ? this.renderArrows() : null));
              }
              return (react_1.default.createElement("div", { className: cx(`Carousel Carousel--${controlsTheme}`, className), style: carouselStyles }, body ? body : placeholder));
          }
      }
      Carousel.defaultProps = {
          auto: true,
          interval: 5000,
          duration: 500,
          controlsTheme: 'light',
          animation: 'fade',
          controls: ['dots', 'arrows'],
          placeholder: '-'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "prepareAutoSlide", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "autoSlide", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "transitFramesTowards", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "getFrameId", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "next", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "prev", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "clearAutoTimeout", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "handleMouseEnter", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Carousel.prototype, "handleMouseLeave", null);
      return Carousel;
  })();
  exports.Carousel = Carousel;
  let CarouselRenderer = /** @class */ (() => {
      let CarouselRenderer = class CarouselRenderer extends Carousel {
      };
      CarouselRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)carousel/,
              name: 'carousel'
          })
      ], CarouselRenderer);
      return CarouselRenderer;
  })();
  exports.CarouselRenderer = CarouselRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2Fyb3VzZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Nhcm91c2VsLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdGQUkyQztBQUMzQyx3Q0FBbUQ7QUFDbkQsc0RBQXFEO0FBQ3JELDRDQUt5QjtBQUN6QiwrQ0FBeUM7QUFvRXpDLE1BQU0sZUFBZSxHQUVqQjtJQUNGLENBQUMscUJBQVEsQ0FBQyxFQUFFLElBQUk7SUFDaEIsQ0FBQyxvQkFBTyxDQUFDLEVBQUUsSUFBSTtJQUNmLENBQUMsb0JBQU8sQ0FBQyxFQUFFLEtBQUs7Q0FDakIsQ0FBQztBQWVGLE1BQU0sYUFBYSxHQUFHO0lBQ3BCLElBQUksRUFBRSxLQUFLO0lBQ1gsR0FBRyxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0F3QkY7Q0FDSixDQUFDO0FBRUY7SUFBQSxNQUFhLFFBQVMsU0FBUSxlQUFLLENBQUMsU0FBdUM7UUFBM0U7O1lBQ0UsZUFBVSxHQUFvQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUF1QmhFLFVBQUssR0FBRztnQkFDTixPQUFPLEVBQUUsQ0FBQztnQkFDVixPQUFPLEVBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUNoQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU87b0JBQ2xCLDZCQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7b0JBQ2pELEVBQUU7Z0JBQ0osVUFBVSxFQUFFLEtBQUs7Z0JBQ2pCLGFBQWEsRUFBRSxFQUFFO2FBQ2xCLENBQUM7UUFpUUosQ0FBQztRQS9QQyx5QkFBeUIsQ0FBQyxTQUF3QjtZQUNoRCxNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztZQUMxQyxN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

});
