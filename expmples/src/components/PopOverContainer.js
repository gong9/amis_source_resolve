amis.define('src/components/PopOverContainer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PopOverContainer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const react_dom_1 = require("node_modules/react-dom/index");
  let PopOverContainer = /** @class */ (() => {
      class PopOverContainer extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  isOpened: false
              };
          }
          targetRef(target) {
              this.target = target ? react_dom_1.findDOMNode(target) : null;
          }
          handleClick() {
              this.setState({
                  isOpened: true
              });
          }
          close() {
              this.setState({
                  isOpened: false
              });
          }
          getTarget() {
              return this.target || react_dom_1.findDOMNode(this);
          }
          getParent() {
              var _a;
              return (_a = this.getTarget()) === null || _a === void 0 ? void 0 : _a.parentElement;
          }
          render() {
              const { children, popOverContainer, popOverClassName, popOverRender: dropdownRender } = this.props;
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  children({
                      isOpened: this.state.isOpened,
                      onClick: this.handleClick,
                      ref: this.targetRef
                  }),
                  react_1.default.createElement(Overlay_1.default, { container: popOverContainer || this.getParent, target: this.getTarget, placement: 'auto', show: this.state.isOpened },
                      react_1.default.createElement(PopOver_1.default, { overlay: true, className: popOverClassName, style: {
                              minWidth: this.target
                                  ? Math.max(this.target.getBoundingClientRect().width, 100)
                                  : 'auto'
                          }, onHide: this.close }, dropdownRender({ onClose: this.close })))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], PopOverContainer.prototype, "targetRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PopOverContainer.prototype, "handleClick", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PopOverContainer.prototype, "close", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PopOverContainer.prototype, "getTarget", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], PopOverContainer.prototype, "getParent", null);
      return PopOverContainer;
  })();
  exports.PopOverContainer = PopOverContainer;
  exports.default = PopOverContainer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG9wT3ZlckNvbnRhaW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1BvcE92ZXJDb250YWluZXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsNENBQXlDO0FBQ3pDLGdFQUFnQztBQUNoQyxnRUFBZ0M7QUFDaEMseUNBQXNDO0FBaUJ0QztJQUFBLE1BQWEsZ0JBQWlCLFNBQVEsZUFBSyxDQUFDLFNBRzNDO1FBSEQ7O1lBSUUsVUFBSyxHQUEwQjtnQkFDN0IsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQztRQXNFSixDQUFDO1FBakVDLFNBQVMsQ0FBQyxNQUFXO1lBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyx1QkFBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDcEQsQ0FBQztRQUdELFdBQVc7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2FBQ2YsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUdELEtBQUs7WUFDSCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFHRCxTQUFTO1lBQ1AsT0FBTyxJQUFJLENBQUMsTUFBTSxJQUFLLHVCQUFXLENBQUMsSUFBSSxDQUFpQixDQUFDO1FBQzNELENBQUM7UUFHRCxTQUFTOztZQUNQLGFBQU8sSUFBSSxDQUFDLFNBQVMsRUFBRSwwQ0FBRSxhQUFhLENBQUM7UUFDekMsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osUUFBUSxFQUNSLGdCQUFnQixFQUNoQixnQkFBZ0IsRUFDaEIsYUFBYSxFQUFFLGNBQWMsRUFDOUIsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ2YsT0FBTyxDQUNMO2dCQUNHLFFBQVEsQ0FBQztvQkFDUixRQUFRLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRO29CQUM3QixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVc7b0JBQ3pCLEdBQUcsRUFBRSxJQUFJLENBQUMsU0FBUztpQkFDcEIsQ0FBQztnQkFFRiw4QkFBQyxpQkFBTyxJQUNOLFNBQVMsRUFBRSxnQkFBZ0IsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUM3QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDdEIsU0FBUyxFQUFFLE1BQU0sRUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUTtvQkFFekIsOEJBQUMsaUJBQU8sSUFDTixPQUFPLFFBQ1AsU0FBUyxFQUFFLGdCQUFnQixFQUMzQixLQUFLLEVBQUU7NEJBQ0wsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNO2dDQUNuQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQztnQ0FDMUQsQ0FBQyxDQUFDLE1BQU07eUJBQ1gsRUFDRCxNQUFNLEVBQUUsSUFBSSxDQUFDLEtBQUssSUFFakIsY0FBYyxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUM5QixDQUNGLENBQ1QsQ0FDSixDQUFDO1FBQ0osQ0FBQztLQUNGO0lBakVDO1FBREMsaUJBQVE7Ozs7cURBR1I7SUFHRDtRQURDLGlCQUFROzs7O3VEQUtSO0lBR0Q7UUFEQyxpQkFBUTs7OztpREFLUjtJQUdEO1FBREMsaUJBQVE7Ozs7cURBR1I7SUFHRDtRQURDLGlCQUFROzs7O3FEQUdSO0lBdUNILHVCQUFDO0tBQUE7QUE1RVksNENBQWdCO0FBOEU3QixrQkFBZSxnQkFBZ0IsQ0FBQyJ9

});
