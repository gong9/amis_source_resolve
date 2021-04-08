amis.define('src/renderers/Form/Group.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ControlGroupRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  let ControlGroupRenderer = /** @class */ (() => {
      let ControlGroupRenderer = class ControlGroupRenderer extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.renderInput = this.renderInput.bind(this);
          }
          renderControl(control, index, otherProps) {
              const { render, disabled, data } = this.props;
              if (!control) {
                  return null;
              }
              const subSchema = control && control.type === 'control'
                  ? control
                  : {
                      type: 'control',
                      control
                  };
              if (subSchema.control) {
                  let control = subSchema.control;
                  control = subSchema.control = Object.assign(Object.assign({}, control), filter_schema_1.default(control, data));
                  control.hiddenOn && (subSchema.hiddenOn = control.hiddenOn);
                  control.visibleOn && (subSchema.visibleOn = control.visibleOn);
              }
              return render(`${index}`, subSchema, Object.assign(Object.assign({}, otherProps), { disabled }));
          }
          renderVertical(props = this.props) {
              let { controls, className, classnames: cx, mode, formMode, data } = props;
              formMode = mode || formMode;
              return (react_1.default.createElement("div", { className: cx(`Form-group Form-group--ver Form-group--${formMode}`, className) }, controls.map((control, index) => {
                  if (!helper_1.isVisible(control, data)) {
                      return null;
                  }
                  const controlMode = (control && control.mode) || formMode;
                  return this.renderControl(control, index, {
                      key: index,
                      formMode: controlMode
                  });
              })));
          }
          renderHorizontal(props = this.props) {
              let { controls, className, classPrefix: ns, classnames: cx, mode, horizontal, formMode, formHorizontal, data, gap } = props;
              if (!Array.isArray(controls)) {
                  return null;
              }
              formMode = mode || formMode;
              let horizontalDeeper = horizontal ||
                  helper_1.makeHorizontalDeeper(formHorizontal, controls.filter(item => item.mode !== 'inline' && helper_1.isVisible(item, data))
                      .length);
              return (react_1.default.createElement("div", { className: cx(`Form-group Form-group--hor Form-group--${formMode}`, gap ? `Form-group--${gap}` : '', className) }, controls.map((control, index) => {
                  if (!helper_1.isVisible(control, data)) {
                      return null;
                  }
                  const controlMode = (control && control.mode) || formMode;
                  if (controlMode === 'inline' ||
                      (control && control.type === 'formula')) {
                      return this.renderControl(control, index, {
                          formMode: 'inline',
                          key: index,
                          className: cx(control.className, control.columnClassName)
                      });
                  }
                  const columnWidth = control.columnRatio ||
                      helper_1.getWidthRate(control && control.columnClassName, true);
                  return (react_1.default.createElement("div", { key: index, className: cx(`${ns}Form-groupColumn`, columnWidth ? `${ns}Form-groupColumn--${columnWidth}` : '', control && control.columnClassName) }, this.renderControl(control, index, {
                      formHorizontal: horizontalDeeper,
                      formMode: controlMode
                  })));
              })));
          }
          renderInput(props = this.props) {
              const direction = props.direction;
              return direction === 'vertical'
                  ? this.renderVertical(props)
                  : this.renderHorizontal(props);
          }
          render() {
              const _a = this.props, { label } = _a, rest = tslib_1.__rest(_a, ["label"]);
              if (label) {
                  return (react_1.default.createElement(Item_1.FormItemWrap, Object.assign({}, rest, { sizeMutable: false, label: label, renderControl: this.renderInput })));
              }
              return this.renderInput();
          }
      };
      ControlGroupRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?group$/,
              name: 'group-control'
          }),
          tslib_1.__metadata("design:paramtypes", [Object])
      ], ControlGroupRenderer);
      return ControlGroupRenderer;
  })();
  exports.ControlGroupRenderer = ControlGroupRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsMkNBQXNEO0FBRXRELCtDQUk0QjtBQUU1QixpQ0FBd0U7QUFDeEUsc0ZBQTBEO0FBbUQxRDtJQUFBLElBQWEsb0JBQW9CLEdBQWpDLE1BQWEsb0JBQXFCLFNBQVEsZUFBSyxDQUFDLFNBQTBCO1FBQ3hFLFlBQVksS0FBc0I7WUFDaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqRCxDQUFDO1FBRUQsYUFBYSxDQUFDLE9BQVksRUFBRSxLQUFVLEVBQUUsVUFBZ0I7WUFDdEQsTUFBTSxFQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU1QyxJQUFJLENBQUMsT0FBTyxFQUFFO2dCQUNaLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxNQUFNLFNBQVMsR0FDYixPQUFPLElBQUssT0FBa0IsQ0FBQyxJQUFJLEtBQUssU0FBUztnQkFDL0MsQ0FBQyxDQUFDLE9BQU87Z0JBQ1QsQ0FBQyxDQUFDO29CQUNFLElBQUksRUFBRSxTQUFTO29CQUNmLE9BQU87aUJBQ1IsQ0FBQztZQUVSLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtnQkFDckIsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDLE9BQWlCLENBQUM7Z0JBRTFDLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxtQ0FDdEIsT0FBTyxHQUNQLHVCQUFpQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FDcEMsQ0FBQztnQkFFRixPQUFPLENBQUMsUUFBUSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBQzVELE9BQU8sQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUNoRTtZQUVELE9BQU8sTUFBTSxDQUFDLEdBQUcsS0FBSyxFQUFFLEVBQUUsU0FBUyxrQ0FDOUIsVUFBVSxLQUNiLFFBQVEsSUFDUixDQUFDO1FBQ0wsQ0FBQztRQUVELGNBQWMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDL0IsSUFBSSxFQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBQyxHQUFHLEtBQUssQ0FBQztZQUN4RSxRQUFRLEdBQUcsSUFBSSxJQUFJLFFBQVEsQ0FBQztZQUU1QixPQUFPLENBQ0wsdUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCwwQ0FBMEMsUUFBUSxFQUFFLEVBQ3BELFNBQVMsQ0FDVixJQUVBLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQy9CLElBQUksQ0FBQyxrQkFBUyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsRUFBRTtvQkFDN0IsT0FBTyxJQUFJLENBQUM7aUJBQ2I7Z0JBRUQsTUFBTSxXQUFXLEdBQUcsQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLFFBQVEsQ0FBQztnQkFFMUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7b0JBQ3hDLEdBQUcsRUFBRSxLQUFLO29CQUNWLFFBQVEsRUFBRSxXQUFXO2lCQUN0QixDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FDRSxDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsZ0JBQWdCLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ2pDLElBQUksRUFDRixRQUFRLEVBQ1IsU0FBUyxFQUNULFdBQVcsRUFBRSxFQUFFLEVBQ2YsVUFBVSxFQUFFLEVBQUUsRUFDZCxJQUFJLEVBQ0osVUFBVSxFQUNWLFFBQVEsRUFDUixjQUFjLEVBQ2QsSUFBSSxFQUNKLEdBQUcsRUFDSixHQUFHLEtBQUssQ0FBQztZQUVWLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQzthQUNiO1lBRUQsUUFBUSxHQUFHLElBQUksSUFBSSxRQUFRLENBQUM7WUFFNUIsSUFBSSxnQkFBZ0IsR0FDbEIsVUFBVTtnQkFDViw2QkFBb0IsQ0FDbEIsY0FBYyxFQUNkLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLFFBQVEsSUFBSSxrQkFBUyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztxQkFDckUsTUFBTSxDQUNWLENBQUM7WUFFSixPQUFPLENBQ0wsdUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCwwQ0FBMEMsUUFBUSxFQUFFLEVBQ3BELEdBQUcsQ0FBQyxDQUFDLENBQUMsZUFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUMvQixTQUFTLENBQ1YsSUFFQSxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUMvQixJQUFJLENBQUMsa0JBQVMsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLEVBQUU7b0JBQzdCLE9BQU8sSUFBSSxDQUFDO2lCQUNiO2dCQUNELE1BQU0sV0FBVyxHQUFHLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxRQUFRLENBQUM7Z0JBRTFELElBQ0UsV0FBVyxLQUFLLFFBQVE7b0JBQ3hCLENBQUMsT0FBTyxJQUFLLE9BQWUsQ0FBQyxJQUFJLEtBQUssU0FBUyxDQUFDLEVBQ2hEO29CQUNBLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFO3dCQUN4QyxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsR0FBRyxFQUFFLEtBQUs7d0JBQ1YsU0FBUyxFQUFFLEVBQUUsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUM7cUJBQzFELENBQUMsQ0FBQztpQkFDSjtnQkFFRCxNQUFNLFdBQVcsR0FDZixPQUFPLENBQUMsV0FBVztvQkFDbkIscUJBQVksQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLGVBQWUsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFFekQsT0FBTyxDQUNMLHVDQUNFLEdBQUcsRUFBRSxLQUFLLEVBQ1YsU0FBUyxFQUFFLEVBQUUsQ0FDWCxHQUFHLEVBQUUsa0JBQWtCLEVBQ3ZCLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLHFCQUFxQixXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUMxRCxPQUFPLElBQUksT0FBTyxDQUFDLGVBQWUsQ0FDbkMsSUFFQSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUU7b0JBQ2xDLGNBQWMsRUFBRSxnQkFBZ0I7b0JBQ2hDLFFBQVEsRUFBRSxXQUFXO2lCQUN0QixDQUFDLENBQ0UsQ0FDUCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQ0UsQ0FDUCxDQUFDO1FBQ0osQ0FBQztRQUVELFdBQVcsQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUs7WUFDNUIsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQztZQUNsQyxPQUFPLFNBQVMsS0FBSyxVQUFVO2dCQUM3QixDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7Z0JBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDbkMsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEtBQW1CLElBQUksQ0FBQyxLQUFLLEVBQTdCLEVBQUMsS0FBSyxPQUF1QixFQUFsQixJQUFJLHNCQUFmLFNBQWdCLENBQWEsQ0FBQztZQUVwQyxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLENBQ0wsOEJBQUMsbUJBQVksb0JBQ04sSUFBWSxJQUNqQixXQUFXLEVBQUUsS0FBSyxFQUNsQixLQUFLLEVBQUUsS0FBSyxFQUNaLGFBQWEsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUMvQixDQUNILENBQUM7YUFDSDtZQUVELE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FDRixDQUFBO0lBdEtZLG9CQUFvQjtRQUpoQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGdEQUFnRDtZQUN0RCxJQUFJLEVBQUUsZUFBZTtTQUN0QixDQUFDOztPQUNXLG9CQUFvQixDQXNLaEM7SUFBRCwyQkFBQztLQUFBO0FBdEtZLG9EQUFvQiJ9

});
