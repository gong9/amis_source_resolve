amis.define('src/renderers/Form/Radios.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RadiosControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Radios_1 = tslib_1.__importDefault(require("src/components/Radios.tsx"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let RadiosControl = /** @class */ (() => {
      var _a;
      class RadiosControl extends react_1.default.Component {
          handleChange(option) {
              const { joinValues, extractValue, valueField, onChange } = this.props;
              if (option && (joinValues || extractValue)) {
                  option = option[valueField || 'value'];
              }
              onChange && onChange(option);
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render() {
              const { className, classPrefix: ns, value, onChange, disabled, joinValues, extractValue, delimiter, placeholder, options, inline, formMode, columnsCount, classPrefix, itemClassName, labelClassName, labelField, valueField, translate: __ } = this.props;
              return (react_1.default.createElement(Radios_1.default, { inline: inline || formMode === 'inline', className: classnames_1.default(`${ns}RadiosControl`, className), value: typeof value === 'undefined' || value === null ? '' : value, disabled: disabled, onChange: this.handleChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, labelClassName: labelClassName, labelField: labelField, valueField: valueField, placeholder: __(placeholder), options: options, columnsCount: columnsCount, classPrefix: classPrefix, itemClassName: itemClassName }));
          }
      }
      RadiosControl.defaultProps = {
          columnsCount: 1
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], RadiosControl.prototype, "handleChange", null);
      return RadiosControl;
  })();
  exports.default = RadiosControl;
  let RadiosControlRenderer = /** @class */ (() => {
      let RadiosControlRenderer = class RadiosControlRenderer extends RadiosControl {
      };
      RadiosControlRenderer.defaultProps = {
          multiple: false
      };
      RadiosControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'radios',
              sizeMutable: false
          })
      ], RadiosControlRenderer);
      return RadiosControlRenderer;
  })();
  exports.RadiosControlRenderer = RadiosControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1JhZGlvcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQixvRUFBNEI7QUFDNUIsNkVBQTZDO0FBQzdDLHVDQUttQjtBQUNuQiwrQ0FBcUQ7QUF1QnJEOztJQUFBLE1BQXFCLGFBQWMsU0FBUSxlQUFLLENBQUMsU0FBMkI7UUFNMUUsWUFBWSxDQUFDLE1BQWM7WUFDekIsTUFBTSxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEUsSUFBSSxNQUFNLElBQUksQ0FBQyxVQUFVLElBQUksWUFBWSxDQUFDLEVBQUU7Z0JBQzFDLE1BQU0sR0FBRyxNQUFNLENBQUMsVUFBVSxJQUFJLE9BQU8sQ0FBQyxDQUFDO2FBQ3hDO1lBRUQsUUFBUSxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMvQixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsV0FBVyxFQUFFLEVBQUUsRUFDZixLQUFLLEVBQ0wsUUFBUSxFQUNSLFFBQVEsRUFDUixVQUFVLEVBQ1YsWUFBWSxFQUNaLFNBQVMsRUFDVCxXQUFXLEVBQ1gsT0FBTyxFQUNQLE1BQU0sRUFDTixRQUFRLEVBQ1IsWUFBWSxFQUNaLFdBQVcsRUFDWCxhQUFhLEVBQ2IsY0FBYyxFQUNkLFVBQVUsRUFDVixVQUFVLEVBQ1YsU0FBUyxFQUFFLEVBQUUsRUFDZCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsOEJBQUMsZ0JBQU0sSUFDTCxNQUFNLEVBQUUsTUFBTSxJQUFJLFFBQVEsS0FBSyxRQUFRLEVBQ3ZDLFNBQVMsRUFBRSxvQkFBRSxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUUsU0FBUyxDQUFDLEVBQzlDLEtBQUssRUFBRSxPQUFPLEtBQUssS0FBSyxXQUFXLElBQUksS0FBSyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQ2xFLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMzQixVQUFVLEVBQUUsVUFBVSxFQUN0QixZQUFZLEVBQUUsWUFBYSxFQUMzQixTQUFTLEVBQUUsU0FBVSxFQUNyQixjQUFjLEVBQUUsY0FBYyxFQUM5QixVQUFVLEVBQUUsVUFBVSxFQUN0QixVQUFVLEVBQUUsVUFBVSxFQUN0QixXQUFXLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxFQUM1QixPQUFPLEVBQUUsT0FBTyxFQUNoQixZQUFZLEVBQUUsWUFBWSxFQUMxQixXQUFXLEVBQUUsV0FBVyxFQUN4QixhQUFhLEVBQUUsYUFBYSxHQUM1QixDQUNILENBQUM7UUFDSixDQUFDOztJQS9ETSwwQkFBWSxHQUF5QjtRQUMxQyxZQUFZLEVBQUUsQ0FBQztLQUNoQixDQUFDO0lBR0Y7UUFEQyxpQkFBUTs7cUVBQ1ksZ0JBQU0sb0JBQU4sZ0JBQU07O3FEQVExQjtJQW1ESCxvQkFBQztLQUFBO2tCQWpFb0IsYUFBYTtBQXVFbEM7SUFBQSxJQUFhLHFCQUFxQixHQUFsQyxNQUFhLHFCQUFzQixTQUFRLGFBQWE7S0FJdkQsQ0FBQTtJQUhRLGtDQUFZLEdBQUc7UUFDcEIsUUFBUSxFQUFFLEtBQUs7S0FDaEIsQ0FBQztJQUhTLHFCQUFxQjtRQUpqQyx3QkFBYyxDQUFDO1lBQ2QsSUFBSSxFQUFFLFFBQVE7WUFDZCxXQUFXLEVBQUUsS0FBSztTQUNuQixDQUFDO09BQ1cscUJBQXFCLENBSWpDO0lBQUQsNEJBQUM7S0FBQTtBQUpZLHNEQUFxQiJ9

});
