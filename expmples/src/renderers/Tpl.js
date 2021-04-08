amis.define('src/renderers/Tpl.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TplRenderer = exports.Tpl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let Tpl = /** @class */ (() => {
      class Tpl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.htmlRef = this.htmlRef.bind(this);
          }
          componentDidUpdate(prevProps) {
              if (helper_1.anyChanged(['data', 'tpl', 'html', 'text', 'raw', 'value'], this.props, prevProps)) {
                  this._render();
              }
          }
          htmlRef(dom) {
              this.dom = dom;
              this._render();
          }
          getContent() {
              const { tpl, html, text, raw, value, data, placeholder } = this.props;
              if (raw) {
                  return raw;
              }
              else if (html) {
                  return tpl_1.filter(html, data);
              }
              else if (tpl) {
                  return tpl_1.filter(tpl, data);
              }
              else if (text) {
                  return tpl_builtin_1.escapeHtml(tpl_1.filter(text, data));
              }
              else {
                  return value == null || value === ''
                      ? `<span class="text-muted">${placeholder}</span>`
                      : typeof value === 'string'
                          ? value
                          : JSON.stringify(value);
              }
          }
          _render() {
              if (!this.dom) {
                  return;
              }
              this.dom.firstChild.innerHTML = this.getContent();
          }
          render() {
              const { className, wrapperComponent, inline, classnames: cx, style } = this.props;
              const Component = wrapperComponent || (inline ? 'span' : 'div');
              return (react_1.default.createElement(Component, { ref: this.htmlRef, className: cx('TplField', className), style: style },
                  react_1.default.createElement("span", null, this.getContent())));
          }
      }
      Tpl.defaultProps = {
          inline: true,
          placeholder: '',
          value: ''
      };
      return Tpl;
  })();
  exports.Tpl = Tpl;
  let TplRenderer = /** @class */ (() => {
      let TplRenderer = class TplRenderer extends Tpl {
      };
      TplRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:tpl|html)$/,
              name: 'tpl'
          })
      ], TplRenderer);
      return TplRenderer;
  })();
  exports.TplRenderer = TplRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHBsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9UcGwudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBQ25ELHNDQUFvQztBQUVwQyw0Q0FBMkM7QUFDM0Msc0RBQWdEO0FBdUNoRDtJQUFBLE1BQWEsR0FBSSxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQVN4RCxZQUFZLEtBQWU7WUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN6QyxDQUFDO1FBRUQsa0JBQWtCLENBQUMsU0FBbUI7WUFDcEMsSUFDRSxtQkFBVSxDQUNSLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUMsRUFDL0MsSUFBSSxDQUFDLEtBQUssRUFDVixTQUFTLENBQ1YsRUFDRDtnQkFDQSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7YUFDaEI7UUFDSCxDQUFDO1FBRUQsT0FBTyxDQUFDLEdBQVE7WUFDZCxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztZQUNmLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztRQUNqQixDQUFDO1FBRUQsVUFBVTtZQUNSLE1BQU0sRUFBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXBFLElBQUksR0FBRyxFQUFFO2dCQUNQLE9BQU8sR0FBRyxDQUFDO2FBQ1o7aUJBQU0sSUFBSSxJQUFJLEVBQUU7Z0JBQ2YsT0FBTyxZQUFNLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQzNCO2lCQUFNLElBQUksR0FBRyxFQUFFO2dCQUNkLE9BQU8sWUFBTSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUMxQjtpQkFBTSxJQUFJLElBQUksRUFBRTtnQkFDZixPQUFPLHdCQUFVLENBQUMsWUFBTSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2FBQ3ZDO2lCQUFNO2dCQUNMLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtvQkFDbEMsQ0FBQyxDQUFDLDRCQUE0QixXQUFXLFNBQVM7b0JBQ2xELENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRO3dCQUMzQixDQUFDLENBQUMsS0FBSzt3QkFDUCxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQjtRQUNILENBQUM7UUFFRCxPQUFPO1lBQ0wsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ2IsT0FBTzthQUNSO1lBRUQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLEVBQUUsQ0FBQztRQUNwRCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLE1BQU0sRUFDTixVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDZixNQUFNLFNBQVMsR0FBRyxnQkFBZ0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVoRSxPQUFPLENBQ0wsOEJBQUMsU0FBUyxJQUNSLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxFQUNqQixTQUFTLEVBQUUsRUFBRSxDQUFDLFVBQVUsRUFBRSxTQUFTLENBQUMsRUFDcEMsS0FBSyxFQUFFLEtBQUs7Z0JBRVosNENBQU8sSUFBSSxDQUFDLFVBQVUsRUFBRSxDQUFRLENBQ3RCLENBQ2IsQ0FBQztRQUNKLENBQUM7O0lBN0VNLGdCQUFZLEdBQXNCO1FBQ3ZDLE1BQU0sRUFBRSxJQUFJO1FBQ1osV0FBVyxFQUFFLEVBQUU7UUFDZixLQUFLLEVBQUUsRUFBRTtLQUNWLENBQUM7SUEwRUosVUFBQztLQUFBO0FBL0VZLGtCQUFHO0FBcUZoQjtJQUFBLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVksU0FBUSxHQUFHO0tBQUcsQ0FBQTtJQUExQixXQUFXO1FBSnZCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUscUJBQXFCO1lBQzNCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztPQUNXLFdBQVcsQ0FBZTtJQUFELGtCQUFDO0tBQUE7QUFBMUIsa0NBQVcifQ==

});
