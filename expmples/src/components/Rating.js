amis.define('src/components/Rating.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Rating
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Rating = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const theme_1 = require("src/theme.tsx");
  let Rating = /** @class */ (() => {
      class Rating extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  value: props.value || 0,
                  stars: [],
                  halfStar: {
                      at: Math.floor(props.value),
                      hidden: props.half && props.value % 1 < 0.5
                  }
              };
              this.getRate = this.getRate.bind(this);
              this.getStars = this.getStars.bind(this);
              this.moreThanHalf = this.moreThanHalf.bind(this);
              this.mouseOver = this.mouseOver.bind(this);
              this.mouseLeave = this.mouseLeave.bind(this);
              this.handleClick = this.handleClick.bind(this);
          }
          componentDidMount() {
              const { value } = this.state;
              this.setState({
                  stars: this.getStars(value)
              });
          }
          componentWillReceiveProps(props) {
              this.setState({
                  stars: this.getStars(props.value),
                  value: props.value,
                  halfStar: {
                      at: Math.floor(props.value),
                      hidden: props.half && props.value % 1 < 0.5
                  }
              });
          }
          getRate() {
              let stars;
              const { value } = this.state;
              const { half } = this.props;
              if (half) {
                  stars = Math.floor(value);
              }
              else {
                  stars = Math.round(value);
              }
              return stars;
          }
          getStars(activeCount) {
              if (typeof activeCount === 'undefined') {
                  activeCount = this.getRate();
              }
              let stars = [];
              const { count } = this.props;
              for (let i = 0; i < count; i++) {
                  stars.push({
                      active: i <= activeCount - 1
                  });
              }
              return stars;
          }
          mouseOver(event) {
              let { readOnly, size, half } = this.props;
              if (readOnly)
                  return;
              let index = Number(event.target.getAttribute('data-index'));
              if (half) {
                  const isAtHalf = this.moreThanHalf(event, size);
                  if (isAtHalf)
                      index = index + 1;
                  this.setState({
                      halfStar: {
                          at: index,
                          hidden: isAtHalf
                      }
                  });
              }
              else {
                  index = index + 1;
              }
              this.setState({
                  stars: this.getStars(index)
              });
          }
          moreThanHalf(event, size) {
              let { target } = event;
              let mouseAt = event.clientX - target.getBoundingClientRect().left;
              mouseAt = Math.round(Math.abs(mouseAt));
              return mouseAt > size / 2;
          }
          mouseLeave() {
              let { value } = this.state;
              const { half, readOnly } = this.props;
              if (readOnly)
                  return;
              if (half) {
                  this.setState({
                      halfStar: {
                          at: Math.floor(value),
                          hidden: value % 1 === 0 // check value is decimal or not
                      }
                  });
              }
              this.setState({
                  stars: this.getStars()
              });
          }
          handleClick(event) {
              const { half, readOnly, onChange, size } = this.props;
              if (readOnly)
                  return;
              let index = Number(event.target.getAttribute('data-index'));
              let value;
              if (half) {
                  const isAtHalf = this.moreThanHalf(event, size);
                  if (isAtHalf)
                      index = index + 1;
                  value = isAtHalf ? index : index + 0.5;
                  this.setState({
                      halfStar: {
                          at: index,
                          hidden: isAtHalf
                      }
                  });
              }
              else {
                  value = index = index + 1;
              }
              this.setState({
                  value: value,
                  stars: this.getStars(index)
              });
              onChange && onChange(value);
          }
          renderStars() {
              const { halfStar, stars } = this.state;
              const { char, half, readOnly, classnames: cx } = this.props;
              return stars.map((star, i) => {
                  let className = cx('Rating', {
                      'Rating-half': half && !halfStar.hidden && halfStar.at === i,
                      'is-active': star.active,
                      'is-disabled': readOnly
                  });
                  return (react_1.default.createElement("span", { className: className, key: i, "data-index": i, "data-forhalf": char, onMouseOver: this.mouseOver, onMouseMove: this.mouseOver, onMouseLeave: this.mouseLeave, onClick: this.handleClick }, char));
              });
          }
          render() {
              let { className } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(className ? className : '') }, this.renderStars()));
          }
      }
      Rating.defaultProps = {
          containerClass: 'rating',
          readOnly: false,
          half: true,
          value: 0,
          count: 5,
          char: '★',
          size: 24
      };
      return Rating;
  })();
  exports.Rating = Rating;
  exports.default = theme_1.themeable(Rating);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmF0aW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvUmF0aW5nLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUMxQixvRUFBNEI7QUFDNUIsb0NBQWlEO0FBbUJqRDtJQUFBLE1BQWEsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQVczRCxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLElBQUksQ0FBQztnQkFDdkIsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFO29CQUNSLEVBQUUsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzNCLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxHQUFHLEdBQUc7aUJBQzVDO2FBQ0YsQ0FBQztZQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN6QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMs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

});
