amis.define('src/renderers/Mapping.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.MappingFieldRenderer = exports.MappingField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  let MappingField = /** @class */ (() => {
      class MappingField extends react_1.default.Component {
          render() {
              var _a, _b;
              const { className, placeholder, map, render, classnames: cx } = this.props;
              let key = this.props.value;
              let viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
              key =
                  typeof key === 'string'
                      ? key.trim()
                      : key === true
                          ? '1'
                          : key === false
                              ? '0'
                              : key; // trim 一下，干掉一些空白字符。
              if (typeof key !== 'undefined' && map && ((_a = map[key]) !== null && _a !== void 0 ? _a : map['*'])) {
                  viewValue = render('tpl', (_b = map[key]) !== null && _b !== void 0 ? _b : map['*'] // 兼容平台旧用法：即 value 为 true 时映射 1 ，为 false 时映射 0
                  );
              }
              return react_1.default.createElement("span", { className: cx('MappingField', className) }, viewValue);
          }
      }
      MappingField.defaultProps = {
          placeholder: '-',
          map: {
              '*': '通配值'
          }
      };
      return MappingField;
  })();
  exports.MappingField = MappingField;
  let MappingFieldRenderer = /** @class */ (() => {
      let MappingFieldRenderer = class MappingFieldRenderer extends MappingField {
      };
      MappingFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:map|mapping)$/,
              name: 'mapping'
          })
      ], MappingFieldRenderer);
      return MappingFieldRenderer;
  })();
  exports.MappingFieldRenderer = MappingFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWFwcGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvTWFwcGluZy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUF1Q25EO0lBQUEsTUFBYSxZQUFhLFNBQVEsZUFBSyxDQUFDLFNBQStCO1FBUXJFLE1BQU07O1lBQ0osTUFBTSxFQUFDLFNBQVMsRUFBRSxXQUFXLEVBQUUsR0FBRyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6RSxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUUzQixJQUFJLFNBQVMsR0FBb0IsQ0FDL0Isd0NBQU0sU0FBUyxFQUFDLFlBQVksSUFBRSxXQUFXLENBQVEsQ0FDbEQsQ0FBQztZQUVGLEdBQUc7Z0JBQ0QsT0FBTyxHQUFHLEtBQUssUUFBUTtvQkFDckIsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7b0JBQ1osQ0FBQyxDQUFDLEdBQUcsS0FBSyxJQUFJO3dCQUNkLENBQUMsQ0FBQyxHQUFHO3dCQUNMLENBQUMsQ0FBQyxHQUFHLEtBQUssS0FBSzs0QkFDZixDQUFDLENBQUMsR0FBRzs0QkFDTCxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsb0JBQW9CO1lBRS9CLElBQUksT0FBTyxHQUFHLEtBQUssV0FBVyxJQUFJLEdBQUcsSUFBSSxPQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsbUNBQUksR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7Z0JBQy9ELFNBQVMsR0FBRyxNQUFNLENBQ2hCLEtBQUssUUFDTCxHQUFHLENBQUMsR0FBRyxDQUFDLG1DQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyw4Q0FBOEM7aUJBQ3BFLENBQUM7YUFDSDtZQUVELE9BQU8sd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsU0FBUyxDQUFDLElBQUcsU0FBUyxDQUFRLENBQUM7UUFDNUUsQ0FBQzs7SUFoQ00seUJBQVksR0FBMEI7UUFDM0MsV0FBVyxFQUFFLEdBQUc7UUFDaEIsR0FBRyxFQUFFO1lBQ0gsR0FBRyxFQUFFLEtBQUs7U0FDWDtLQUNGLENBQUM7SUE0QkosbUJBQUM7S0FBQTtBQWxDWSxvQ0FBWTtBQXdDekI7SUFBQSxJQUFhLG9CQUFvQixHQUFqQyxNQUFhLG9CQUFxQixTQUFRLFlBQVk7S0FBRyxDQUFBO0lBQTVDLG9CQUFvQjtRQUpoQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLHdCQUF3QjtZQUM5QixJQUFJLEVBQUUsU0FBUztTQUNoQixDQUFDO09BQ1csb0JBQW9CLENBQXdCO0lBQUQsMkJBQUM7S0FBQTtBQUE1QyxvREFBb0IifQ==

});
