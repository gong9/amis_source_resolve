amis.define('src/components/LazyComponent.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file LazyComponent
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  // @ts-ignore
  const react_visibility_sensor_1 = tslib_1.__importDefault(require("node_modules/react-visibility-sensor/visibility-sensor"));
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  let LazyComponent = /** @class */ (() => {
      class LazyComponent extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.mounted = false;
              this.handleVisibleChange = this.handleVisibleChange.bind(this);
              this.state = {
                  visible: false,
                  component: props.component
              };
          }
          componentWillMount() {
              this.mounted = true;
          }
          componentWillUnmount() {
              this.mounted = false;
          }
          handleVisibleChange(visible) {
              this.setState({
                  visible: visible
              });
              if (!visible || this.state.component || !this.props.getComponent) {
                  return;
              }
              this.props
                  .getComponent()
                  .then(component => this.mounted &&
                  typeof component === 'function' &&
                  this.setState({
                      component: component
                  }))
                  .catch(reason => this.mounted &&
                  this.setState({
                      component: () => (react_1.default.createElement("div", { className: "alert alert-danger" }, String(reason)))
                  }));
          }
          render() {
              const _a = this.props, { placeholder, unMountOnHidden, childProps, visiblilityProps, partialVisibility, children } = _a, rest = tslib_1.__rest(_a, ["placeholder", "unMountOnHidden", "childProps", "visiblilityProps", "partialVisibility", "children"]);
              const { visible, component: Component } = this.state;
              // 需要监听从可见到不可见。
              if (unMountOnHidden) {
                  return (react_1.default.createElement(react_visibility_sensor_1.default, Object.assign({}, visiblilityProps, { partialVisibility: partialVisibility, onChange: this.handleVisibleChange }),
                      react_1.default.createElement("div", { className: "visibility-sensor" }, Component && visible ? (react_1.default.createElement(Component, Object.assign({}, rest, childProps))) : children && visible ? (children) : (placeholder))));
              }
              if (!visible) {
                  return (react_1.default.createElement(react_visibility_sensor_1.default, Object.assign({}, visiblilityProps, { partialVisibility: partialVisibility, onChange: this.handleVisibleChange }),
                      react_1.default.createElement("div", { className: "visibility-sensor" }, placeholder)));
              }
              else if (Component) {
                  // 只监听不可见到可见，一旦可见了，就销毁检查。
                  return react_1.default.createElement(Component, Object.assign({}, rest, childProps));
              }
              else if (children) {
                  return children;
              }
              return react_1.default.createElement("div", null, placeholder);
          }
      }
      LazyComponent.defaultProps = {
          placeholder: react_1.default.createElement(Spinner_1.default, null),
          unMountOnHidden: false,
          partialVisibility: true
      };
      return LazyComponent;
  })();
  exports.default = LazyComponent;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF6eUNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL0xhenlDb21wb25lbnQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7QUFFSCwwREFBMEI7QUFDMUIsYUFBYTtBQUNiLDhGQUF1RDtBQUN2RCxnRUFBZ0M7QUFpQmhDO0lBQUEsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUdoRDtRQVFDLFlBQVksS0FBeUI7WUFDbkMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRmYsWUFBTyxHQUFZLEtBQUssQ0FBQztZQUl2QixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUUvRCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLE9BQU8sRUFBRSxLQUFLO2dCQUNkLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBNEI7YUFDOUMsQ0FBQztRQUNKLENBQUM7UUFFRCxrQkFBa0I7WUFDaEIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDdEIsQ0FBQztRQUVELG9CQUFvQjtZQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN2QixDQUFDO1FBRUQsbUJBQW1CLENBQUMsT0FBZ0I7WUFDbEMsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixPQUFPLEVBQUUsT0FBTzthQUNqQixDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUU7Z0JBQ2hFLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxLQUFLO2lCQUNQLFlBQVksRUFBRTtpQkFDZCxJQUFJLENBQ0gsU0FBUyxDQUFDLEVBQUUsQ0FDVixJQUFJLENBQUMsT0FBTztnQkFDWixPQUFPLFNBQVMsS0FBSyxVQUFVO2dCQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLFNBQVMsRUFBRSxTQUFTO2lCQUNyQixDQUFDLENBQ0w7aUJBQ0EsS0FBSyxDQUNKLE1BQU0sQ0FBQyxFQUFFLENBQ1AsSUFBSSxDQUFDLE9BQU87Z0JBQ1osSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixTQUFTLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FDZix1Q0FBSyxTQUFTLEVBQUMsb0JBQW9CLElBQUUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFPLENBQzNEO2lCQUNGLENBQUMsQ0FDTCxDQUFDO1FBQ04sQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEtBUUYsSUFBSSxDQUFDLEtBQUssRUFSUixFQUNKLFdBQVcsRUFDWCxlQUFlLEVBQ2YsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixpQkFBaUIsRUFDakIsUUFBUSxPQUVJLEVBRFQsSUFBSSxzQkFQSCxxR0FRTCxDQUFhLENBQUM7WUFFZixNQUFNLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRW5ELGVBQWU7WUFDZixJQUFJLGVBQWUsRUFBRTtnQkFDbkIsT0FBTyxDQUNMLDhCQUFDLGlDQUFnQixvQkFDWCxnQkFBZ0IsSUFDcEIsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQW1CO29CQUVsQyx1Q0FBSyxTQUFTLEVBQUMsbUJBQW1CLElBQy9CLFNBQVMsSUFBSSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQ3RCLDhCQUFDLFNBQVMsb0JBQUssSUFBSSxFQUFNLFVBQVUsRUFBSSxDQUN4QyxDQUFDLENBQUMsQ0FBQyxRQUFRLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUN4QixRQUFRLENBQ1QsQ0FBQyxDQUFDLENBQUMsQ0FDRixXQUFXLENBQ1osQ0FDRyxDQUNXLENBQ3BCLENBQUM7YUFDSDtZQUVELElBQUksQ0FBQyxPQUFPLEVBQUU7Z0JBQ1osT0FBTyxDQUNMLDhCQUFDLGlDQUFnQixvQkFDWCxnQkFBZ0IsSUFDcEIsaUJBQWlCLEVBQUUsaUJBQWlCLEVBQ3BDLFFBQVEsRUFBRSxJQUFJLENBQUMsbUJBQW1CO29CQUVsQyx1Q0FBSyxTQUFTLEVBQUMsbUJBQW1CLElBQUUsV0FBVyxDQUFPLENBQ3JDLENBQ3BCLENBQUM7YUFDSDtpQkFBTSxJQUFJLFNBQVMsRUFBRTtnQkFDcEIseUJBQXlCO2dCQUN6QixPQUFPLDhCQUFDLFNBQVMsb0JBQUssSUFBSSxFQUFNLFVBQVUsRUFBSSxDQUFDO2FBQ2hEO2lCQUFNLElBQUksUUFBUSxFQUFFO2dCQUNuQixPQUFPLFFBQVEsQ0FBQzthQUNqQjtZQUVELE9BQU8sMkNBQU0sV0FBVyxDQUFPLENBQUM7UUFDbEMsQ0FBQzs7SUE1R00sMEJBQVksR0FBRztRQUNwQixXQUFXLEVBQUUsOEJBQUMsaUJBQU8sT0FBRztRQUN4QixlQUFlLEVBQUUsS0FBSztRQUN0QixpQkFBaUIsRUFBRSxJQUFJO0tBQ3hCLENBQUM7SUF5R0osb0JBQUM7S0FBQTtrQkFqSG9CLGFBQWEifQ==

});
