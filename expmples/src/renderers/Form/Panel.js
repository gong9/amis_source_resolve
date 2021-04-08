amis.define('src/renderers/Form/Panel.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PanelRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Panel_1 = tslib_1.__importDefault(require("src/renderers/Panel.tsx"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  let PanelRenderer = /** @class */ (() => {
      let PanelRenderer = class PanelRenderer extends Panel_1.default {
          renderBody() {
              const { render, renderFormItems, body, bodyClassName, controls, tabs, fieldSet, mode, formMode, horizontal, $path, classPrefix: ns } = this.props;
              if (!body && (controls || tabs || fieldSet)) {
                  let props = {};
                  mode && (props.mode = mode);
                  horizontal && (props.horizontal = horizontal);
                  return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Form--${props.mode || formMode || 'normal'}`, bodyClassName) }, renderFormItems({
                      controls,
                      tabs,
                      fieldSet
                  }, $path.replace(/^.*form\//, ''), props)));
              }
              return super.renderBody();
          }
      };
      PanelRenderer.propsList = ['onChange'];
      PanelRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?panel$/,
              weight: -100,
              name: 'panel-control'
          })
      ], PanelRenderer);
      return PanelRenderer;
  })();
  exports.PanelRenderer = PanelRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFuZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vUGFuZWwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsMkNBQXNEO0FBQ3RELDZEQUE0QztBQUU1QyxvRUFBNEI7QUErQjVCO0lBQUEsSUFBYSxhQUFhLEdBQTFCLE1BQWEsYUFBYyxTQUFRLGVBQUs7UUFFdEMsVUFBVTtZQUNSLE1BQU0sRUFDSixNQUFNLEVBQ04sZUFBZSxFQUNmLElBQUksRUFDSixhQUFhLEVBQ2IsUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEVBQ1IsSUFBSSxFQUNKLFFBQVEsRUFDUixVQUFVLEVBQ1YsS0FBSyxFQUNMLFdBQVcsRUFBRSxFQUFFLEVBQ2hCLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxFQUFFO2dCQUMzQyxJQUFJLEtBQUssR0FBUSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUM7Z0JBQzVCLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLENBQUM7Z0JBRTlDLE9BQU8sQ0FDTCx1Q0FDRSxTQUFTLEVBQUUsb0JBQUUsQ0FDWCxHQUFHLEVBQUUsU0FBUyxLQUFLLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUUsRUFDbEQsYUFBYSxDQUNkLElBRUEsZUFBZSxDQUNkO29CQUNFLFFBQVE7b0JBQ1IsSUFBSTtvQkFDSixRQUFRO2lCQUNULEVBQ0EsS0FBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxFQUMxQyxLQUFLLENBQ04sQ0FDRyxDQUNQLENBQUM7YUFDSDtZQUVELE9BQU8sS0FBSyxDQUFDLFVBQVUsRUFBRSxDQUFDO1FBQzVCLENBQUM7S0FDRixDQUFBO0lBNUNRLHVCQUFTLEdBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFEcEMsYUFBYTtRQUx6QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGdEQUFnRDtZQUN0RCxNQUFNLEVBQUUsQ0FBQyxHQUFHO1lBQ1osSUFBSSxFQUFFLGVBQWU7U0FDdEIsQ0FBQztPQUNXLGFBQWEsQ0E2Q3pCO0lBQUQsb0JBQUM7S0FBQTtBQTdDWSxzQ0FBYSJ9

});
