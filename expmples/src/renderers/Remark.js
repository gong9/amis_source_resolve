amis.define('src/renderers/Remark.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RemarkRenderer = exports.filterContents = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const TooltipWrapper_1 = tslib_1.__importDefault(require("src/components/TooltipWrapper.tsx"));
  const tpl_1 = require("src/utils/tpl.ts");
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  function filterContents(tooltip, data) {
      if (typeof tooltip === 'string') {
          return tpl_1.filter(tooltip, data);
      }
      else if (tooltip) {
          return tooltip.title
              ? {
                  render: tooltip.render ? () => tooltip.render(data) : undefined,
                  title: tpl_1.filter(tooltip.title, data),
                  content: tooltip.content || tooltip.body
                      ? tpl_1.filter(tooltip.content || tooltip.body || '', data)
                      : undefined
              }
              : tooltip.content || tooltip.body
                  ? tpl_1.filter(tooltip.content || tooltip.body || '', data)
                  : undefined;
      }
      return tooltip;
  }
  exports.filterContents = filterContents;
  let Remark = /** @class */ (() => {
      class Remark extends react_1.default.Component {
          render() {
              var _a, _b;
              const { className, icon, label, tooltip, placement, rootClose, trigger, container, classPrefix: ns, classnames: cx, content, data, env, tooltipClassName } = this.props;
              const finalIcon = (_a = tooltip === null || tooltip === void 0 ? void 0 : tooltip.icon) !== null && _a !== void 0 ? _a : icon;
              const finalLabel = (_b = tooltip === null || tooltip === void 0 ? void 0 : tooltip.label) !== null && _b !== void 0 ? _b : label;
              return (react_1.default.createElement(TooltipWrapper_1.default, { classPrefix: ns, classnames: cx, tooltip: filterContents(tooltip || content, data), tooltipClassName: (tooltip && tooltip.tooltipClassName) || tooltipClassName, placement: (tooltip && tooltip.placement) || placement, rootClose: (tooltip && tooltip.rootClose) || rootClose, trigger: (tooltip && tooltip.trigger) || trigger, container: container || env.getModalContainer, delay: tooltip && tooltip.delay },
                  react_1.default.createElement("div", { className: cx(`Remark`, (tooltip && tooltip.className) || className || `Remark--warning`) },
                      finalLabel ? react_1.default.createElement("span", null, finalLabel) : null,
                      finalIcon ? (icons_1.hasIcon(finalIcon) ? (react_1.default.createElement("span", { className: cx('Remark-icon') },
                          react_1.default.createElement(icons_1.Icon, { icon: finalIcon }))) : (react_1.default.createElement("i", { className: cx('Remark-icon', finalIcon) }))) : finalIcon === false && finalLabel ? null : (react_1.default.createElement("span", { className: cx('Remark-icon icon') },
                          react_1.default.createElement(icons_1.Icon, { icon: "question-mark" }))))));
          }
      }
      Remark.propsList = [];
      Remark.defaultProps = {
          icon: '',
          trigger: ['hover', 'focus']
      };
      return Remark;
  })();
  exports.default = theme_1.themeable(Remark);
  let RemarkRenderer = /** @class */ (() => {
      let RemarkRenderer = class RemarkRenderer extends Remark {
      };
      RemarkRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)remark$/,
              name: 'remark'
          })
      ], RemarkRenderer);
      return RemarkRenderer;
  })();
  exports.RemarkRenderer = RemarkRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVtYXJrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9SZW1hcmsudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBR25ELDBGQUEwRDtBQUMxRCxzQ0FBb0M7QUFDcEMsb0NBQW1DO0FBQ25DLCtDQUFrRDtBQThDbEQsU0FBZ0IsY0FBYyxDQUM1QixPQUdtRSxFQUNuRSxJQUFTO0lBRVQsSUFBSSxPQUFPLE9BQU8sS0FBSyxRQUFRLEVBQUU7UUFDL0IsT0FBTyxZQUFNLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzlCO1NBQU0sSUFBSSxPQUFPLEVBQUU7UUFDbEIsT0FBTyxPQUFPLENBQUMsS0FBSztZQUNsQixDQUFDLENBQUM7Z0JBQ0UsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Z0JBQy9ELEtBQUssRUFBRSxZQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUM7Z0JBQ2xDLE9BQU8sRUFDTCxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJO29CQUM3QixDQUFDLENBQUMsWUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDO29CQUNyRCxDQUFDLENBQUMsU0FBUzthQUNoQjtZQUNILENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJO2dCQUNqQyxDQUFDLENBQUMsWUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxFQUFFLEVBQUUsSUFBSSxDQUFDO2dC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

});
