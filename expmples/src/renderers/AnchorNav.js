amis.define('src/renderers/AnchorNav.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AnchorNavRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const AnchorNav_1 = require("src/components/AnchorNav.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const lodash_1 = require("node_modules/lodash/lodash");
  let AnchorNav = /** @class */ (() => {
      class AnchorNav extends react_1.default.Component {
          constructor(props) {
              super(props);
              // 设置默认激活项
              const links = props.links;
              let active = 0;
              if (typeof props.active !== 'undefined') {
                  active = props.active;
              }
              else {
                  const section = lodash_1.find(links, section => section.href === props.active);
                  active =
                      section && section.href
                          ? section.href
                          : (links[0] && links[0].href) || 0;
              }
              this.state = {
                  active
              };
          }
          handleSelect(key) {
              this.setState({
                  active: key
              });
          }
          locateTo(index) {
              const { links } = this.props;
              Array.isArray(links) &&
                  links[index] &&
                  this.setState({
                      active: links[index].href || index
                  });
          }
          render() {
              const { classnames: cx, classPrefix: ns, className, linkClassName, sectionClassName, sectionRender, render, data } = this.props;
              let links = this.props.links;
              if (!links) {
                  return null;
              }
              links = Array.isArray(links) ? links : [links];
              let children = [];
              children = links.map((section, index) => helper_1.isVisible(section, data) ? (react_1.default.createElement(AnchorNav_1.AnchorNavSection, Object.assign({}, section, { title: tpl_1.filter(section.title, data), key: index, name: section.href || index }), this.renderSection
                  ? this.renderSection(section, this.props, index)
                  : sectionRender
                      ? sectionRender(section, this.props, index)
                      : render(`section/${index}`, section.body || ''))) : null);
              return (react_1.default.createElement(AnchorNav_1.AnchorNav, { classPrefix: ns, classnames: cx, className: className, linkClassName: linkClassName, sectionClassName: sectionClassName, onSelect: this.handleSelect, active: this.state.active }, children));
          }
      }
      AnchorNav.defaultProps = {
          className: '',
          linkClassName: '',
          sectionClassName: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], AnchorNav.prototype, "handleSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], AnchorNav.prototype, "locateTo", null);
      return AnchorNav;
  })();
  exports.default = AnchorNav;
  let AnchorNavRenderer = /** @class */ (() => {
      let AnchorNavRenderer = class AnchorNavRenderer extends AnchorNav {
      };
      AnchorNavRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)anchor-nav$/,
              name: 'anchor-nav'
          })
      ], AnchorNavRenderer);
      return AnchorNavRenderer;
  })();
  exports.AnchorNavRenderer = AnchorNavRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5jaG9yTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9BbmNob3JOYXYudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBQ25ELHVEQUdpQztBQUNqQyw0Q0FBb0Q7QUFDcEQsc0NBQW9DO0FBQ3BDLG1DQUE0QjtBQTRFNUI7SUFBQSxNQUFxQixTQUFVLFNBQVEsZUFBSyxDQUFDLFNBRzVDO1FBYUMsWUFBWSxLQUFxQjtZQUMvQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFYixVQUFVO1lBQ1YsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxQixJQUFJLE1BQU0sR0FBUSxDQUFDLENBQUM7WUFFcEIsSUFBSSxPQUFPLEtBQUssQ0FBQyxNQUFNLEtBQUssV0FBVyxFQUFFO2dCQUN2QyxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQzthQUN2QjtpQkFBTTtnQkFDTCxNQUFNLE9BQU8sR0FBMkIsYUFBSSxDQUMxQyxLQUFLLEVBQ0wsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxNQUFNLENBQ2YsQ0FBQztnQkFDNUIsTUFBTTtvQkFDSixPQUFPLElBQUksT0FBTyxDQUFDLElBQUk7d0JBQ3JCLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSTt3QkFDZCxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUN4QztZQUVELElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsTUFBTTthQUNQLENBQUM7UUFDSixDQUFDO1FBR0QsWUFBWSxDQUFDLEdBQVE7WUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFD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

});
