amis.define('src/renderers/Avatar.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AvatarFieldRenderer = exports.AvatarField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 用来展示用户头像
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Badge_1 = require("src/components/Badge.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  class AvatarField extends react_1.default.Component {
      render() {
          let { className, icon = 'fa fa-user', text, src, fit = 'cover', data, shape = 'circle', size = 40, style, classnames: cx, props } = this.props;
          let sizeStyle = {
              height: size,
              width: size,
              lineHeight: size + 'px'
          };
          let avatar = react_1.default.createElement("i", { className: icon });
          if (typeof text === 'string' && text[0] === '$') {
              text = tpl_builtin_1.resolveVariable(text, data);
          }
          if (typeof src === 'string' && src[0] === '$') {
              src = tpl_builtin_1.resolveVariable(src, data);
          }
          if (text) {
              if (text.length > 2) {
                  text = text.substring(0, 2).toUpperCase();
              }
              avatar = react_1.default.createElement("span", null, text);
          }
          if (src) {
              avatar = react_1.default.createElement("img", { src: src, style: { objectFit: fit } });
          }
          return (react_1.default.createElement("div", Object.assign({ className: cx('Avatar', className, `Avatar--${shape}`), style: Object.assign(Object.assign({}, sizeStyle), style) }, props), avatar));
      }
  }
  exports.AvatarField = AvatarField;
  let AvatarFieldRenderer = /** @class */ (() => {
      let AvatarFieldRenderer = class AvatarFieldRenderer extends AvatarField {
      };
      AvatarFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)avatar$/,
              name: 'avatar'
          }),
          Badge_1.withBadge
      ], AvatarFieldRenderer);
      return AvatarFieldRenderer;
  })();
  exports.AvatarFieldRenderer = AvatarFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9BdmF0YXIudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7R0FFRztBQUNILDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFPbkQsK0NBQTJEO0FBQzNELHNEQUErRTtBQXFFL0UsTUFBYSxXQUFZLFNBQVEsZUFBSyxDQUFDLFNBQThCO0lBQ25FLE1BQU07UUFDSixJQUFJLEVBQ0YsU0FBUyxFQUNULElBQUksR0FBRyxZQUFZLEVBQ25CLElBQUksRUFDSixHQUFHLEVBQ0gsR0FBRyxHQUFHLE9BQU8sRUFDYixJQUFJLEVBQ0osS0FBSyxHQUFHLFFBQVEsRUFDaEIsSUFBSSxHQUFHLEVBQUUsRUFDVCxLQUFLLEVBQ0wsVUFBVSxFQUFFLEVBQUUsRUFDZCxLQUFLLEVBQ04sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRWYsSUFBSSxTQUFTLEdBQUc7WUFDZCxNQUFNLEVBQUUsSUFBSTtZQUNaLEtBQUssRUFBRSxJQUFJO1lBQ1gsVUFBVSxFQUFFLElBQUksR0FBRyxJQUFJO1NBQ3hCLENBQUM7UUFFRixJQUFJLE1BQU0sR0FBRyxxQ0FBRyxTQUFTLEVBQUUsSUFBSSxHQUFJLENBQUM7UUFFcEMsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRTtZQUMvQyxJQUFJLEdBQUcsNkJBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7U0FDcEM7UUFFRCxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxFQUFFO1lBQzdDLEdBQUcsR0FBRyw2QkFBZSxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksSUFBSSxFQUFFO1lBQ1IsSUFBSSxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkIsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQzNDO1lBQ0QsTUFBTSxHQUFHLDRDQUFPLElBQUksQ0FBUSxDQUFDO1NBQzlCO1FBRUQsSUFBSSxHQUFHLEVBQUU7WUFDUCxNQUFNLEdBQUcsdUNBQUssR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFDLEdBQUksQ0FBQztTQUNyRDtRQUVELE9BQU8sQ0FDTCxxREFDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxLQUFLLEVBQUUsQ0FBQyxFQUN0RCxLQUFLLGtDQUFNLFNBQVMsR0FBSyxLQUFLLEtBQzFCLEtBQUssR0FFUixNQUFNLENBQ0gsQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBckRELGtDQXFEQztBQU9EO0lBQUEsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUExQyxtQkFBbUI7UUFML0Isa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztRQUNELGlCQUFTO09BQ0csbUJBQW1CLENBQXVCO0lBQUQsMEJBQUM7S0FBQTtBQUExQyxrREFBbUIifQ==

});
