amis.define('src/renderers/Link.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LinkFieldRenderer = exports.LinkField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  let LinkField = /** @class */ (() => {
      class LinkField extends react_1.default.Component {
          render() {
              const { className, body, href, classnames: cx, blank, htmlTarget, data, render, translate: __ } = this.props;
              let value = this.props.value;
              const finnalHref = href ? tpl_1.filter(href, data, '| raw') : '';
              return (react_1.default.createElement("a", { href: finnalHref || value, target: htmlTarget || (blank ? '_blank' : '_self'), className: cx('Link', className) }, body ? render('body', body) : finnalHref || value || __('link')));
          }
      }
      LinkField.defaultProps = {
          className: '',
          blank: false
      };
      return LinkField;
  })();
  exports.LinkField = LinkField;
  let LinkFieldRenderer = /** @class */ (() => {
      let LinkFieldRenderer = class LinkFieldRenderer extends LinkField {
      };
      LinkFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)link$/,
              name: 'link'
          })
      ], LinkFieldRenderer);
      return LinkFieldRenderer;
  })();
  exports.LinkFieldRenderer = LinkFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvTGluay50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsc0NBQW9DO0FBMkJwQztJQUFBLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUE0QjtRQU0vRCxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxJQUFJLEVBQ0osSUFBSSxFQUNKLFVBQVUsRUFBRSxFQUFFLEVBQ2QsS0FBSyxFQUNMLFVBQVUsRUFDVixJQUFJLEVBQ0osTUFBTSxFQUNOLFNBQVMsRUFBRSxFQUFFLEVBQ2QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxZQUFNLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRTNELE9BQU8sQ0FDTCxxQ0FDRSxJQUFJLEVBQUUsVUFBVSxJQUFJLEtBQUssRUFDekIsTUFBTSxFQUFFLFVBQVUsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFDbEQsU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLElBRS9CLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsVUFBVSxJQUFJLEtBQUssSUFBSSxFQUFFLENBQUMsTUFBTSxDQUFDLENBQzlELENBQ0wsQ0FBQztRQUNKLENBQUM7O0lBOUJNLHNCQUFZLEdBQUc7UUFDcEIsU0FBUyxFQUFFLEVBQUU7UUFDYixLQUFLLEVBQUUsS0FBSztLQUNiLENBQUM7SUE0QkosZ0JBQUM7S0FBQTtBQWhDWSw4QkFBUztBQXNDdEI7SUFBQSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFrQixTQUFRLFNBQVM7S0FBRyxDQUFBO0lBQXRDLGlCQUFpQjtRQUo3QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO09BQ1csaUJBQWlCLENBQXFCO0lBQUQsd0JBQUM7S0FBQTtBQUF0Qyw4Q0FBaUIifQ==

});
