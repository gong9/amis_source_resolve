amis.define('src/renderers/Breadcrumb.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.BreadcrumbFieldRenderer = exports.BreadcrumbField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 用来展示面包屑导航
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const icon_1 = require("src/utils/icon.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let BreadcrumbField = /** @class */ (() => {
      class BreadcrumbField extends react_1.default.Component {
          render() {
              const { className, itemClassName, separatorClassName, classnames: cx, items, source, data, separator, render } = this.props;
              const crumbItems = items
                  ? items
                  : tpl_builtin_1.resolveVariable(source, data);
              const crumbs = crumbItems
                  .map(item => (react_1.default.createElement("span", { className: cx('Breadcrumb-item', itemClassName) },
                  item.icon
                      ? icon_1.generateIcon(cx, item.icon, 'Icon', 'Breadcrumb-icon')
                      : null,
                  item.href ? (react_1.default.createElement("a", { href: item.href }, tpl_1.filter(item.label, data))) : (render('label', tpl_1.filter(item.label, data))))))
                  .reduce((prev, curr) => [
                  prev,
                  react_1.default.createElement("span", { className: cx('Breadcrumb-separator', separatorClassName) }, separator),
                  curr
              ]);
              return react_1.default.createElement("div", { className: cx('Breadcrumb', className) }, crumbs);
          }
      }
      BreadcrumbField.defaultProps = {
          className: '',
          itemClassName: '',
          separator: '/'
      };
      return BreadcrumbField;
  })();
  exports.BreadcrumbField = BreadcrumbField;
  let BreadcrumbFieldRenderer = /** @class */ (() => {
      let BreadcrumbFieldRenderer = class BreadcrumbFieldRenderer extends BreadcrumbField {
      };
      BreadcrumbFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)breadcrumb$/,
              name: 'breadcrumb'
          })
      ], BreadcrumbFieldRenderer);
      return BreadcrumbFieldRenderer;
  })();
  exports.BreadcrumbFieldRenderer = BreadcrumbFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnJlYWRjcnVtYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvQnJlYWRjcnVtYi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztHQUVHO0FBQ0gsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUVuRCx3Q0FBMkM7QUFDM0Msc0NBQW9DO0FBQ3BDLHNEQUErRTtBQWlEL0U7SUFBQSxNQUFhLGVBQWdCLFNBQVEsZUFBSyxDQUFDLFNBQWtDO1FBTzNFLE1BQU07WUFDSixNQUFNLEVBQ0osU0FBUyxFQUNULGFBQWEsRUFDYixrQkFBa0IsRUFDbEIsVUFBVSxFQUFFLEVBQUUsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLElBQUksRUFDSixTQUFTLEVBQ1QsTUFBTSxFQUNQLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sVUFBVSxHQUFHLEtBQUs7Z0JBQ3RCLENBQUMsQ0FBQyxLQUFLO2dCQUNQLENBQUMsQ0FBRSw2QkFBZSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQWlDLENBQUM7WUFFbkUsTUFBTSxNQUFNLEdBQUcsVUFBVTtpQkFDdEIsR0FBRyxDQUFrQixJQUFJLENBQUMsRUFBRSxDQUFDLENBQzVCLHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLEVBQUUsYUFBYSxDQUFDO2dCQUNsRCxJQUFJLENBQUMsSUFBSTtvQkFDUixDQUFDLENBQUMsbUJBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsaUJBQWlCLENBQUM7b0JBQ3hELENBQUMsQ0FBQyxJQUFJO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ1gscUNBQUcsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUcsWUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUssQ0FDbkQsQ0FBQyxDQUFDLENBQUMsQ0FDRixNQUFNLENBQUMsT0FBTyxFQUFFLFlBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQzFDLENBQ0ksQ0FDUixDQUFDO2lCQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDO2dCQUN0QixJQUFJO2dCQUNKLHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsa0JBQWtCLENBQUMsSUFDNUQsU0FBUyxDQUNMO2dCQUNQLElBQUk7YUFDTCxDQUFDLENBQUM7WUFFTCxPQUFPLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxJQUFHLE1BQU0sQ0FBTyxDQUFDO1FBQ3JFLENBQUM7O0lBN0NNLDRCQUFZLEdBQUc7UUFDcEIsU0FBUyxFQUFFLEVBQUU7UUFDYixhQUFhLEVBQUUsRUFBRTtRQUNqQixTQUFTLEVBQUUsR0FBRztLQUNmLENBQUM7SUEwQ0osc0JBQUM7S0FBQTtBQS9DWSwwQ0FBZTtBQXFENUI7SUFBQSxJQUFhLHVCQUF1QixHQUFwQyxNQUFhLHVCQUF3QixTQUFRLGVBQWU7S0FBRyxDQUFBO0lBQWxELHVCQUF1QjtRQUpuQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLG1CQUFtQjtZQUN6QixJQUFJLEVBQUUsWUFBWTtTQUNuQixDQUFDO09BQ1csdUJBQXVCLENBQTJCO0lBQUQsOEJBQUM7S0FBQTtBQUFsRCwwREFBdUIifQ==

});
