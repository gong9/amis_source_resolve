amis.define('src/renderers/Form/FieldSet.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FieldSetRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Collapse_1 = tslib_1.__importDefault(require("src/renderers/Collapse.tsx"));
  let FieldSetControl = /** @class */ (() => {
      class FieldSetControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.renderBody = this.renderBody.bind(this);
          }
          renderBody() {
              const { renderFormItems, controls, body, collapsable, horizontal, render, mode, formMode, $path, classnames: cx, store, formClassName } = this.props;
              if (!controls) {
                  return render('body', body);
              }
              let props = {
                  store,
                  data: store.data,
                  render
              };
              mode && (props.mode = mode);
              typeof collapsable !== 'undefined' && (props.collapsable = collapsable);
              horizontal && (props.horizontal = horizontal);
              return (react_1.default.createElement("div", { className: cx(`Form--${props.mode || formMode || 'normal'}`, formClassName) }, renderFormItems({ controls }, 'controls', props)));
          }
          render() {
              const _a = this.props, { controls, className, mode, body } = _a, rest = tslib_1.__rest(_a, ["controls", "className", "mode", "body"]);
              return (react_1.default.createElement(Collapse_1.default, Object.assign({}, rest, { body: body, className: className, children: this.renderBody, wrapperComponent: "fieldset", headingComponent: rest.titlePosition === 'bottom' ? 'div' : 'legend' })));
          }
      }
      FieldSetControl.defaultProps = {
          titlePosition: 'top',
          headingClassName: '',
          collapsable: false
      };
      return FieldSetControl;
  })();
  exports.default = FieldSetControl;
  let FieldSetRenderer = /** @class */ (() => {
      let FieldSetRenderer = class FieldSetRenderer extends FieldSetControl {
      };
      FieldSetRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:.+)?\/control\/fieldSet$/i,
              weight: -100,
              name: 'fieldset'
          })
      ], FieldSetRenderer);
      return FieldSetRenderer;
  })();
  exports.FieldSetRenderer = FieldSetRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmllbGRTZXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vRmllbGRTZXQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsMkNBQXNEO0FBRXRELG1FQUFxRDtBQW9FckQ7SUFBQSxNQUFxQixlQUFnQixTQUFRLGVBQUssQ0FBQyxTQUdsRDtRQUNDLFlBQVksS0FBb0I7WUFDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUMvQyxDQUFDO1FBUUQsVUFBVTtZQUNSLE1BQU0sRUFDSixlQUFlLEVBQ2YsUUFBUSxFQUNSLElBQUksRUFDSixXQUFXLEVBQ1gsVUFBVSxFQUNWLE1BQU0sRUFDTixJQUFJLEVBQ0osUUFBUSxFQUNSLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTCxhQUFhLEVBQ2QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxDQUFDLFFBQVEsRUFBRTtnQkFDYixPQUFPLE1BQU0sQ0FBQyxNQUFNLEVBQUUsSUFBSyxDQUFnQixDQUFDO2FBQzdDO1lBRUQsSUFBSSxLQUFLLEdBQVE7Z0JBQ2YsS0FBSztnQkFDTCxJQUFJLEVBQUUsS0FBTSxDQUFDLElBQUk7Z0JBQ2pCLE1BQU07YUFDUCxDQUFDO1lBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztZQUM1QixPQUFPLFdBQVcsS0FBSyxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQyxDQUFDO1lBQ3hFLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUM7WUFFOUMsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSxFQUFFLENBQ1gsU0FBUyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUUsRUFDN0MsYUFBYSxDQUNkLElBRUEsZUFBZSxDQUFDLEVBQUMsUUFBUSxFQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUMzQyxDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sS0FBNkMsSUFBSSxDQUFDLEtBQUssRUFBdkQsRUFBQyxRQUFRLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxJQUFJLE9BQXVCLEVBQWxCLElBQUksc0JBQXpDLHlDQUEwQyxDQUFhLENBQUM7WUFFOUQsT0FBTyxDQUNMLDhCQUFDLGtCQUFRLG9CQUNILElBQUksSUFDUixJQUFJLEVBQUUsSUFBSyxFQUNYLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFFBQVEsRUFBRSxJQUFJLENBQUMsVUFBVSxFQUN6QixnQkFBZ0IsRUFBQyxVQUFVLEVBQzNCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFDcEUsQ0FDSCxDQUFDO1FBQ0osQ0FBQzs7SUE1RE0sNEJBQVksR0FBRztRQUNwQixhQUFhLEVBQUUsS0FBSztRQUNwQixnQkFBZ0IsRUFBRSxFQUFFO1FBQ3BCLFdBQVcsRUFBRSxLQUFLO0tBQ25CLENBQUM7SUF5REosc0JBQUM7S0FBQTtrQkF0RW9CLGVBQWU7QUE2RXBDO0lBQUEsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxlQUFlO0tBQUcsQ0FBQTtJQUEzQyxnQkFBZ0I7UUFMNUIsa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSx3Q0FBd0M7WUFDOUMsTUFBTSxFQUFFLENBQUMsR0FBRztZQUNaLElBQUksRUFBRSxVQUFVO1NBQ2pCLENBQUM7T0FDVyxnQkFBZ0IsQ0FBMkI7SUFBRCx1QkFBQztLQUFBO0FBQTNDLDRDQUFnQiJ9

});
