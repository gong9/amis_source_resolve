amis.define('src/renderers/Copyable.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file scoped.jsx.
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HocCopyable = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const tpl_1 = require("src/utils/tpl.ts");
  const icons_1 = require("src/components/icons.tsx");
  exports.HocCopyable = () => (Component) => {
      let QuickEditComponent = /** @class */ (() => {
          class QuickEditComponent extends react_1.default.PureComponent {
              handleClick(content) {
                  const { env } = this.props;
                  env.copy && env.copy(content);
              }
              render() {
                  const { copyable, name, className, data, noHoc, classnames: cx, translate: __ } = this.props;
                  if (copyable && !noHoc) {
                      const content = tpl_1.filter(copyable.content ||
                          '${' + name + ' | raw }', data);
                      if (content) {
                          return (react_1.default.createElement(Component, Object.assign({}, this.props, { className: cx(`Field--copyable`, className) }),
                              react_1.default.createElement(Component, Object.assign({}, this.props, { wrapperComponent: '', noHoc: true })),
                              react_1.default.createElement("a", { key: "edit-btn", "data-tooltip": __('Copyable.tip'), className: cx('Field-copyBtn'), onClick: this.handleClick.bind(this, content) },
                                  react_1.default.createElement(icons_1.Icon, { icon: "copy", className: "icon" }))));
                      }
                  }
                  return react_1.default.createElement(Component, Object.assign({}, this.props));
              }
          }
          QuickEditComponent.ComposedComponent = Component;
          return QuickEditComponent;
      })();
      hoist_non_react_statics_1.default(QuickEditComponent, Component);
      return QuickEditComponent;
  };
  exports.default = exports.HocCopyable;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29weWFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0NvcHlhYmxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7O0FBRUgsMERBQTBCO0FBRzFCLDhGQUEwRDtBQUUxRCxzQ0FBb0M7QUFDcEMsK0NBQXlDO0FBdUI1QixRQUFBLFdBQVcsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDLFNBQW1DLEVBQU8sRUFBRTtJQUM1RTtRQUFBLE1BQU0sa0JBQW1CLFNBQVEsZUFBSyxDQUFDLGFBQWlDO1lBRXRFLFdBQVcsQ0FBQyxPQUFlO2dCQUN6QixNQUFNLEVBQUMsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDekIsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ2hDLENBQUM7WUFDRCxNQUFNO2dCQUNKLE1BQU0sRUFDSixRQUFRLEVBQ1IsSUFBSSxFQUNKLFNBQVMsRUFDVCxJQUFJLEVBQ0osS0FBSyxFQUNMLFVBQVUsRUFBRSxFQUFFLEVBQ2QsU0FBUyxFQUFFLEVBQUUsRUFDZCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7Z0JBRWYsSUFBSSxRQUFRLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3RCLE1BQU0sT0FBTyxHQUFHLFlBQU0sQ0FDbkIsUUFBaUMsQ0FBQyxPQUFPO3dCQUN4QyxJQUFJLEdBQUcsSUFBSSxHQUFHLFVBQVUsRUFDMUIsSUFBSSxDQUNMLENBQUM7b0JBQ0YsSUFBSSxPQUFPLEVBQUU7d0JBQ1gsT0FBTyxDQUNMLDhCQUFDLFNBQVMsb0JBQ0osSUFBSSxDQUFDLEtBQUssSUFDZCxTQUFTLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQzs0QkFFM0MsOEJBQUMsU0FBUyxvQkFBSyxJQUFJLENBQUMsS0FBSyxJQUFFLGdCQUFnQixFQUFFLEVBQUUsRUFBRSxLQUFLLFVBQUc7NEJBQ3pELHFDQUNFLEdBQUcsRUFBQyxVQUFVLGtCQUNBLEVBQUUsQ0FBQyxjQUFjLENBQUMsRUFDaEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFDOUIsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUM7Z0NBRTdDLDhCQUFDLFlBQUksSUFBQyxJQUFJLEVBQUMsTUFBTSxFQUFDLFNBQVMsRUFBQyxNQUFNLEdBQUcsQ0FDbkMsQ0FDTSxDQUNiLENBQUM7cUJBQ0g7aUJBQ0Y7Z0JBQ0QsT0FBTyw4QkFBQyxTQUFTLG9CQUFLLElBQUksQ0FBQyxLQUFLLEVBQUksQ0FBQztZQUN2QyxDQUFDOztRQTFDTSxvQ0FBaUIsR0FBRyxTQUFTLENBQUM7UUEyQ3ZDLHlCQUFDO1NBQUE7SUFDRCxpQ0FBbUIsQ0FBQyxrQkFBa0IsRUFBRSxTQUFTLENBQUMsQ0FBQztJQUNuRCxPQUFPLGtCQUFrQixDQUFDO0FBQzVCLENBQUMsQ0FBQztBQUVGLGtCQUFlLG1CQUFXLENBQUMifQ==

});
