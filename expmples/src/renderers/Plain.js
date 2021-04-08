amis.define('src/renderers/Plain.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PlainRenderer = exports.Plain = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  let Plain = /** @class */ (() => {
      class Plain extends react_1.default.Component {
          render() {
              const { className, wrapperComponent, value, text, data, tpl, inline, placeholder, classnames: cx } = this.props;
              const Component = wrapperComponent || (inline ? 'span' : 'div');
              return (react_1.default.createElement(Component, { className: cx('PlainField', className) }, tpl || text ? (tpl_1.filter(tpl || text, data)) : typeof value === 'undefined' || value === '' || value === null ? (react_1.default.createElement("span", { className: "text-muted" }, placeholder)) : (String(value))));
          }
      }
      Plain.defaultProps = {
          wrapperComponent: '',
          inline: true,
          placeholder: '-'
      };
      return Plain;
  })();
  exports.Plain = Plain;
  let PlainRenderer = /** @class */ (() => {
      let PlainRenderer = class PlainRenderer extends Plain {
      };
      PlainRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:plain|text)$/,
              name: 'plain'
          })
      ], PlainRenderer);
      return PlainRenderer;
  })();
  exports.PlainRenderer = PlainRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1BsYWluLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUNuRCxzQ0FBb0M7QUFvQ3BDO0lBQUEsTUFBYSxLQUFNLFNBQVEsZUFBSyxDQUFDLFNBQTZCO1FBTzVELE1BQU07WUFDSixNQUFNLEVBQ0osU0FBUyxFQUNULGdCQUFnQixFQUNoQixLQUFLLEVBQ0wsSUFBSSxFQUNKLElBQUksRUFDSixHQUFHLEVBQ0gsTUFBTSxFQUNOLFdBQVcsRUFDWCxVQUFVLEVBQUUsRUFBRSxFQUNmLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sU0FBUyxHQUFHLGdCQUFnQixJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWhFLE9BQU8sQ0FDTCw4QkFBQyxTQUFTLElBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLElBQzlDLEdBQUcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2IsWUFBTSxDQUFDLEdBQUcsSUFBSyxJQUFlLEVBQUUsSUFBSSxDQUFDLENBQ3RDLENBQUMsQ0FBQyxDQUFDLE9BQU8sS0FBSyxLQUFLLFdBQVcsSUFBSSxLQUFLLEtBQUssRUFBRSxJQUFJLEtBQUssS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ25FLHdDQUFNLFNBQVMsRUFBQyxZQUFZLElBQUUsV0FBVyxDQUFRLENBQ2xELENBQUMsQ0FBQyxDQUFDLENBQ0YsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUNkLENBQ1MsQ0FDYixDQUFDO1FBQ0osQ0FBQzs7SUFoQ00sa0JBQVksR0FBd0I7UUFDekMsZ0JBQWdCLEVBQUUsRUFBRTtRQUNwQixNQUFNLEVBQUUsSUFBSTtRQUNaLFdBQVcsRUFBRSxHQUFHO0tBQ2pCLENBQUM7SUE2QkosWUFBQztLQUFBO0FBbENZLHNCQUFLO0FBd0NsQjtJQUFBLElBQWEsYUFBYSxHQUExQixNQUFhLGFBQWMsU0FBUSxLQUFLO0tBQUcsQ0FBQTtJQUE5QixhQUFhO1FBSnpCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsdUJBQXVCO1lBQzdCLElBQUksRUFBRSxPQUFPO1NBQ2QsQ0FBQztPQUNXLGFBQWEsQ0FBaUI7SUFBRCxvQkFBQztLQUFBO0FBQTlCLHNDQUFhIn0=

});
