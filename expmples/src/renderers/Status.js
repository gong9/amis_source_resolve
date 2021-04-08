amis.define('src/renderers/Status.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StatusFieldRenderer = exports.StatusField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const icons_1 = require("src/components/icons.tsx");
  let StatusField = /** @class */ (() => {
      class StatusField extends react_1.default.Component {
          render() {
              const { className, placeholder, map, labelMap, classnames: cx, data } = this.props;
              let value = this.props.value;
              let viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
              let wrapClassName = '';
              if (value !== undefined && value !== '' && map) {
                  if (typeof value === 'boolean') {
                      value = value ? 1 : 0;
                  }
                  else if (/^\d+$/.test(value)) {
                      value = parseInt(value, 10) || 0;
                  }
                  wrapClassName = `StatusField--${value}`;
                  let itemClassName = map[value] || '';
                  let svgIcon = '';
                  itemClassName = itemClassName.replace(/\bsvg-([^\s|$]+)\b/g, (_, icon) => {
                      svgIcon = icon;
                      return 'icon';
                  });
                  if (svgIcon) {
                      viewValue = (react_1.default.createElement(icons_1.Icon, { icon: svgIcon, className: cx('Status-icon icon', itemClassName), key: "icon" }));
                  }
                  else if (itemClassName) {
                      viewValue = (react_1.default.createElement("i", { className: cx('Status-icon', itemClassName), key: "icon" }));
                  }
                  if (labelMap && labelMap[value]) {
                      viewValue = [
                          viewValue,
                          react_1.default.createElement("span", { className: cx('StatusField-label'), key: "label" }, tpl_1.filter(labelMap[value], data))
                      ];
                  }
              }
              return (react_1.default.createElement("span", { className: cx('StatusField', wrapClassName, className) }, viewValue));
          }
      }
      StatusField.defaultProps = {
          placeholder: '-',
          map: {
              0: 'svg-fail',
              1: 'svg-success',
              success: 'svg-success',
              pending: 'rolling',
              fail: 'svg-fail',
              queue: 'svg-warning',
              schedule: 'svg-schedule'
          },
          labelMap: {
              success: '成功',
              pending: '运行中',
              fail: '失败',
              queue: '排队中',
              schedule: '调度中'
          }
      };
      return StatusField;
  })();
  exports.StatusField = StatusField;
  let StatusFieldRenderer = /** @class */ (() => {
      let StatusFieldRenderer = class StatusFieldRenderer extends StatusField {
      };
      StatusFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)status$/,
              name: 'status'
          })
      ], StatusFieldRenderer);
      return StatusFieldRenderer;
  })();
  exports.StatusFieldRenderer = StatusFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdHVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9TdGF0dXMudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBR25ELHNDQUFvQztBQUVwQywrQ0FBeUM7QUF1RHpDO0lBQUEsTUFBYSxXQUFZLFNBQVEsZUFBSyxDQUFDLFNBQThCO1FBcUJuRSxNQUFNO1lBQ0osTUFBTSxFQUNKLFNBQVMsRUFDVCxXQUFXLEVBQ1gsR0FBRyxFQUNILFFBQVEsRUFDUixVQUFVLEVBQUUsRUFBRSxFQUNkLElBQUksRUFDTCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDZixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUM3QixJQUFJLFNBQVMsR0FBb0IsQ0FDL0Isd0NBQU0sU0FBUyxFQUFDLFlBQVksSUFBRSxXQUFXLENBQVEsQ0FDbEQsQ0FBQztZQUNGLElBQUksYUFBYSxHQUFXLEVBQUUsQ0FBQztZQUUvQixJQUFJLEtBQUssS0FBSyxTQUFTLElBQUksS0FBSyxLQUFLLEVBQUUsSUFBSSxHQUFHLEVBQUU7Z0JBQzlDLElBQUksT0FBTyxLQUFLLEtBQUssU0FBUyxFQUFFO29CQUM5QixLQUFLLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDdkI7cUJBQU0sSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO29CQUM5QixLQUFLLEdBQUcsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ2xDO2dCQUVELGFBQWEsR0FBRyxnQkFBZ0IsS0FBSyxFQUFFLENBQUM7Z0JBQ3hDLElBQUksYUFBYSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQ3JDLElBQUksT0FBTyxHQUFXLEVBQUUsQ0FBQztnQkFFekIsYUFBYSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQ25DLHFCQUFxQixFQUNyQixDQUFDLENBQVMsRUFBRSxJQUFZLEVBQUUsRUFBRTtvQkFDMUIsT0FBTyxHQUFHLElBQUksQ0FBQztvQkFDZixPQUFPLE1BQU0sQ0FBQztnQkFDaEIsQ0FBQyxDQUNGLENBQUM7Z0JBRUYsSUFBSSxPQUFPLEVBQUU7b0JBQ1gsU0FBUyxHQUFHLENBQ1YsOEJBQUMsWUFBSSxJQUNILElBQUksRUFBRSxPQUFPLEVBQ2IsU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRSxhQUFhLENBQUMsRUFDaEQsR0FBRyxFQUFDLE1BQU0sR0FDVixDQUNILENBQUM7aUJBQ0g7cUJBQU0sSUFBSSxhQUFhLEVBQUU7b0JBQ3hCLFNBQVMsR0FBRyxDQUNWLHFDQUFHLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGFBQWEsQ0FBQyxFQUFFLEdBQUcsRUFBQyxNQUFNLEdBQUcsQ0FDOUQsQ0FBQztpQkFDSDtnQkFFRCxJQUFJLFFBQVEsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7b0JBQy9CLFNBQVMsR0FBRzt3QkFDVixTQUFTO3dCQUNULHdDQUFNLFNBQVMsRUFBRSxFQUFFLENBQUMsbUJBQW1CLENBQUMsRUFBRSxHQUFHLEVBQUMsT0FBTyxJQUNsRCxZQUFNLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUN6QjtxQkFDUixDQUFDO2lCQUNIO2FBQ0Y7WUFFRCxPQUFPLENBQ0wsd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQyxJQUN6RCxTQUFTLENBQ0wsQ0FDUixDQUFDO1FBQ0osQ0FBQzs7SUFuRk0sd0JBQVksR0FBeUI7UUFDMUMsV0FBVyxFQUFFLEdBQUc7UUFDaEIsR0FBRyxFQUFFO1lBQ0gsQ0FBQyxFQUFFLFVBQVU7WUFDYixDQUFDLEVBQUUsYUFBYTtZQUNoQixPQUFPLEVBQUUsYUFBYTtZQUN0QixPQUFPLEVBQUUsU0FBUztZQUNsQixJQUFJLEVBQUUsVUFBVTtZQUNoQixLQUFLLEVBQUUsYUFBYTtZQUNwQixRQUFRLEVBQUUsY0FBYztTQUN6QjtRQUNELFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRSxJQUFJO1lBQ2IsT0FBTyxFQUFFLEtBQUs7WUFDZCxJQUFJLEVBQUUsSUFBSTtZQUNWLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLEtBQUs7U0FDaEI7S0FDRixDQUFDO0lBa0VKLGtCQUFDO0tBQUE7QUFyRlksa0NBQVc7QUEyRnhCO0lBQUEsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUExQyxtQkFBbUI7UUFKL0Isa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUNXLG1CQUFtQixDQUF1QjtJQUFELDBCQUFDO0tBQUE7QUFBMUMsa0RBQW1CIn0=

});
