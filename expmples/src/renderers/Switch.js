amis.define('src/renderers/Switch.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SwitchFieldRenderer = exports.SwitchField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Switch_1 = tslib_1.__importDefault(require("src/components/Switch.tsx"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let SwitchField = /** @class */ (() => {
      class SwitchField extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleChange = this.handleChange.bind(this);
          }
          handleChange(checked) {
              const { onQuickChange, name, trueValue, falseValue, saveImmediately, readOnly, disabled } = this.props;
              onQuickChange &&
                  !readOnly &&
                  !disabled &&
                  onQuickChange({
                      [name]: checked ? trueValue : falseValue
                  }, saveImmediately);
          }
          render() {
              const { className, classPrefix: ns, placeholder, trueValue, falseValue, onText, offText, onQuickChange, option, disabled, name, data } = this.props;
              let value = this.props.value;
              let viewValue = (react_1.default.createElement("span", { className: "text-muted" }, placeholder));
              let showOption = false;
              if (value === void 0 && name) {
                  value = tpl_builtin_1.resolveVariable(name, data);
              }
              if (value !== void 0) {
                  showOption = !!option;
                  viewValue = (react_1.default.createElement(Switch_1.default, { inline: true, classPrefix: ns, onText: onText, offText: offText, checked: value == trueValue, onChange: this.handleChange, disabled: disabled || !onQuickChange }));
              }
              return (react_1.default.createElement("span", { className: classnames_1.default(`${ns}SwitchField`, className) },
                  viewValue,
                  showOption ? option : null));
          }
      }
      SwitchField.defaultProps = {
          placeholder: '-',
          trueValue: true,
          falseValue: false,
          readOnly: false,
          saveImmediately: false
      };
      return SwitchField;
  })();
  exports.SwitchField = SwitchField;
  let SwitchFieldRenderer = /** @class */ (() => {
      let SwitchFieldRenderer = class SwitchFieldRenderer extends SwitchField {
      };
      SwitchFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)switch$/,
              name: 'switch'
          })
      ], SwitchFieldRenderer);
      return SwitchFieldRenderer;
  })();
  exports.SwitchFieldRenderer = SwitchFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3dpdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Td2l0Y2gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBSW5ELG9FQUE0QjtBQUM1QiwwRUFBMEM7QUFDMUMsc0RBQXFEO0FBdURyRDtJQUFBLE1BQWEsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUE4QjtRQVNuRSxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkQsQ0FBQztRQUVELFlBQVksQ0FBQyxPQUFnQjtZQUMzQixNQUFNLEVBQ0osYUFBYSxFQUNiLElBQUksRUFDSixTQUFTLEVBQ1QsVUFBVSxFQUNWLGVBQWUsRUFDZixRQUFRLEVBQ1IsUUFBUSxFQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLGFBQWE7Z0JBQ1gsQ0FBQyxRQUFRO2dCQUNULENBQUMsUUFBUTtnQkFDVCxhQUFhLENBQ1g7b0JBQ0UsQ0FBQyxJQUFjLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVTtpQkFDbkQsRUFDRCxlQUFlLENBQ2hCLENBQUM7UUFDTixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsV0FBVyxFQUFFLEVBQUUsRUFDZixXQUFXLEVBQ1gsU0FBUyxFQUNULFVBQVUsRUFDVixNQUFNLEVBQ04sT0FBTyxFQUNQLGFBQWEsRUFDYixNQUFNLEVBQ04sUUFBUSxFQUNSLElBQUksRUFDSixJQUFJLEVBQ0wsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDN0IsSUFBSSxTQUFTLEdBQW9CLENBQy9CLHdDQUFNLFNBQVMsRUFBQyxZQUFZLElBQUUsV0FBVyxDQUFRLENBQ2xELENBQUM7WUFDRixJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUM7WUFFdkIsSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUM1QixLQUFLLEdBQUcsNkJBQWUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDckM7WUFFRCxJQUFJLEtBQUssS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsVUFBVSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUM7Z0JBQ3RCLFNBQVMsR0FBRyxDQUNWLDhCQUFDLGdCQUFNLElBQ0wsTUFBTSxRQUNOLFdBQVcsRUFBRSxFQUFFLEVBQ2YsTUFBTSxFQUFFLE1BQU0sRUFDZCxPQUFPLEVBQUUsT0FBTyxFQUNoQixPQUFPLEVBQUUsS0FBSyxJQUFJLFNBQVMsRUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFFBQVEsRUFBRSxRQUFRLElBQUksQ0FBQyxhQUFhLEdBQ3BDLENBQ0gsQ0FBQzthQUNIO1lBRUQsT0FBTyxDQUNMLHdDQUFNLFNBQVMsRUFBRSxvQkFBRSxDQUFDLEdBQUcsRUFBRSxhQUFhLEVBQUUsU0FBUyxDQUFDO2dCQUMvQyxTQUFTO2dCQUNULFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RCLENBQ1IsQ0FBQztRQUNKLENBQUM7O0lBbkZNLHdCQUFZLEdBQXlCO1FBQzFDLFdBQVcsRUFBRSxHQUFHO1FBQ2hCLFNBQVMsRUFBRSxJQUFJO1FBQ2YsVUFBVSxFQUFFLEtBQUs7UUFDakIsUUFBUSxFQUFFLEtBQUs7UUFDZixlQUFlLEVBQUUsS0FBSztLQUN2QixDQUFDO0lBOEVKLGtCQUFDO0tBQUE7QUFyRlksa0NBQVc7QUEyRnhCO0lBQUEsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUExQyxtQkFBbUI7UUFKL0Isa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxlQUFlO1lBQ3JCLElBQUksRUFBRSxRQUFRO1NBQ2YsQ0FBQztPQUNXLG1CQUFtQixDQUF1QjtJQUFELDBCQUFDO0tBQUE7QUFBMUMsa0RBQW1CIn0=

});
