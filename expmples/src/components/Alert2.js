amis.define('src/components/Alert2.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Alert2
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Alert = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  let Alert = /** @class */ (() => {
      class Alert extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleClick = this.handleClick.bind(this);
              this.state = {
                  show: true
              };
          }
          handleClick() {
              this.setState({
                  show: false
              }, this.props.onClose);
          }
          render() {
              const { classnames: cx, className, level, children, showCloseButton } = this.props;
              return this.state.show ? (react_1.default.createElement("div", { className: cx('Alert', level ? `Alert--${level}` : '', className) },
                  showCloseButton ? (react_1.default.createElement("button", { className: cx('Alert-close'), onClick: this.handleClick, type: "button" },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
                  children)) : null;
          }
      }
      Alert.defaultProps = {
          level: 'info',
          className: '',
          showCloseButton: false
      };
      Alert.propsList = [
          'level',
          'className',
          'showCloseButton',
          'onClose'
      ];
      return Alert;
  })();
  exports.Alert = Alert;
  exports.default = theme_1.themeable(Alert);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWxlcnQyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvQWxlcnQyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9DQUFpRDtBQUNqRCxtQ0FBNkI7QUFlN0I7SUFBQSxNQUFhLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBaUM7UUFnQmhFLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLElBQUksRUFBRSxJQUFJO2FBQ1gsQ0FBQztRQUNKLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FDWDtnQkFDRSxJQUFJLEVBQUUsS0FBSzthQUNaLEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQ25CLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxFQUNkLFNBQVMsRUFDVCxLQUFLLEVBQ0wsUUFBUSxFQUNSLGVBQWUsRUFDaEIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDdkIsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDO2dCQUNuRSxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQ2pCLDBDQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDLEVBQzVCLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUN6QixJQUFJLEVBQUMsUUFBUTtvQkFFYiw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQy9CLENBQ1YsQ0FBQyxDQUFDLENBQUMsSUFBSTtnQkFDUCxRQUFRLENBQ0wsQ0FDUCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDWCxDQUFDOztJQXhETSxrQkFBWSxHQUdmO1FBQ0YsS0FBSyxFQUFFLE1BQU07UUFDYixTQUFTLEVBQUUsRUFBRTtRQUNiLGVBQWUsRUFBRSxLQUFLO0tBQ3ZCLENBQUM7SUFDSyxlQUFTLEdBQWtCO1FBQ2hDLE9BQU87UUFDUCxXQUFXO1FBQ1gsaUJBQWlCO1FBQ2pCLFNBQVM7S0FDVixDQUFDO0lBNENKLFlBQUM7S0FBQTtBQTFEWSxzQkFBSztBQTREbEIsa0JBQWUsaUJBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyJ9

});
