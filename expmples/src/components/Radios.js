amis.define('src/components/Radios.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Radios
   * @description
   * @author fex
   *
   * @param 参数说明：
   * options: [
   *   {
   *      label: '显示的名字',
   *      value: '值',
   *      disabled: false
   *   }
   * ]
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Radios = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const Select_1 = require("src/components/Select.tsx");
  const chunk_1 = tslib_1.__importDefault(require("node_modules/lodash/chunk"));
  const theme_1 = require("src/theme.tsx");
  let Radios = /** @class */ (() => {
      class Radios extends react_1.default.Component {
          toggleOption(option) {
              const { value, onChange, valueField, clearable, delimiter, options } = this.props;
              let valueArray = Select_1.value2array(value, {
                  multiple: false,
                  delimiter,
                  valueField,
                  options
              });
              const idx = valueArray.indexOf(option);
              if (~idx) {
                  clearable && valueArray.splice(idx, 1);
              }
              else {
                  valueArray = [option];
              }
              let newValue = valueArray[0];
              onChange && onChange(newValue);
          }
          renderGroup(option, index, valueArray) {
              const { classnames: cx } = this.props;
              return (react_1.default.createElement("div", { key: index, className: cx('RadiosControl-group', option.className) },
                  react_1.default.createElement("label", { className: cx('RadiosControl-groupLabel', option.labelClassName) }, option.label),
                  option.children && option.children.length
                      ? option.children.map((option, index) => this.renderItem(option, index, valueArray))
                      : null));
          }
          renderItem(option, index, valueArray) {
              if (option.children) {
                  return this.renderGroup(option, index, valueArray);
              }
              const { disabled, inline, itemClassName, classnames: cx, labelClassName, labelField } = this.props;
              return (react_1.default.createElement(Checkbox_1.default, { type: "radio", key: index, onChange: () => this.toggleOption(option), checked: !!~valueArray.indexOf(option), className: cx(itemClassName, option.className), disabled: disabled || option.disabled, description: option.description, inline: inline, labelClassName: labelClassName }, `${option[labelField || 'label']}`));
          }
          render() {
              const { value, options, className, classnames: cx, placeholder, columnsCount, joinValues, extractValue, disabled, inline, delimiter, valueField, classPrefix } = this.props;
              let valueArray = Select_1.value2array(value, {
                  multiple: false,
                  delimiter,
                  valueField,
                  options
              });
              let body = [];
              if (options) {
                  body = options.map((option, key) => this.renderItem(option, key, valueArray));
              }
              if (!inline && columnsCount > 1) {
                  let weight = 12 / columnsCount;
                  let cellClassName = `Grid-col--sm${weight === Math.round(weight) ? weight : ''}`;
                  body = chunk_1.default(body, columnsCount).map((group, groupIndex) => (react_1.default.createElement("div", { className: cx('Grid'), key: groupIndex }, Array.from({ length: columnsCount }).map((_, index) => (react_1.default.createElement("div", { key: index, className: cx(cellClassName) }, group[index]))))));
              }
              return (react_1.default.createElement("div", { className: className }, body && body.length ? body : placeholder));
          }
      }
      Radios.defaultProps = {
          type: 'radio',
          resetValue: '',
          joinValues: true,
          clearable: false,
          columnsCount: 1 // 一行显示一个
      };
      return Radios;
  })();
  exports.Radios = Radios;
  exports.default = theme_1.themeable(uncontrollable_1.uncontrollable(Radios, {
      value: 'onChange'
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvUmFkaW9zLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7R0FhRzs7OztBQUVILDBEQUEwQjtBQUMxQixtREFBOEM7QUFDOUMsa0VBQWtDO0FBQ2xDLHFDQUEwRDtBQUMxRCxpRUFBaUM7QUFDakMsb0NBQWlEO0FBbUJqRDtJQUFBLE1BQWEsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUEwQjtRQVMxRCxZQUFZLENBQUMsTUFBYztZQUN6QixNQUFNLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDUixVQUFVLEVBQ1YsU0FBUyxFQUNULFNBQVMsRUFDVCxPQUFPLEVBQ1IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxVQUFVLEdBQUcsb0JBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ2xDLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFNBQVM7Z0JBQ1QsVUFBVTtnQkFDVixPQUFPO2FBQ1IsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV2QyxJQUFJLENBQUMsR0FBRyxFQUFFO2dCQUNSLFNBQVMsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUN4QztpQkFBTTtnQkFDTCxVQUFVLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2QjtZQUVELElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUU3QixRQUFRLElBQUksUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2pDLENBQUM7UUFFRCxXQUFXLENBQUMsTUFBYyxFQUFFLEtBQWEsRUFBRSxVQUF5QjtZQUNsRSxNQUFNLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFcEMsT0FBTyxDQUNMLHVDQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDO2dCQUNyRSx5Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLDBCQUEwQixFQUFFLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFFL0QsTUFBTSxDQUFDLEtBQUssQ0FDUDtnQkFFUCxNQUFNLENBQUMsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTTtvQkFDeEMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FDM0M7b0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FDSixDQUNQLENBQUM7UUFDSixDQUFDO1FBRUQsVUFBVSxDQUFDLE1BQWMsRUFBRSxLQUFhLEVBQUUsVUFBeUI7WUFDakUsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO2dCQUNuQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQzthQUNwRDtZQUVELE1BQU0sRUFDSixRQUFRLEVBQ1IsTUFBTSxFQUNOLGFBQWEsRUFDYixVQUFVLEVBQUUsRUFBRSxFQUNkLGNBQWMsRUFDZCxVQUFVLEVBQ1gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxDQUNMLDhCQUFDLGtCQUFRLElBQ1AsSUFBSSxFQUFDLE9BQU8sRUFDWixHQUFHLEVBQUUsS0FBSyxFQUNWLFFBQVEsRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxFQUN6QyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDdEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUM5QyxRQUFRLEVBQUUsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQ3JDLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVyxFQUMvQixNQUFNLEVBQUUsTUFBTSxFQUNkLGNBQWMsRUFBRSxjQUFjLElBRTdCLEdBQUcsTUFBTSxDQUFDLFVBQVUsSUFBSSxPQUFPLENBQUMsRUFBRSxDQUMxQixDQUNaLENBQUM7UUFDSixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixLQUFLLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxVQUFVLEVBQUUsRUFBRSxFQUNkLFdBQVcsRUFDWCxZQUFZLEVBQ1osVUFBVSxFQUNWLFlBQVksRUFDWixRQUFRLEVBQ1IsTUFBTSxFQUNOLFNBQVMsRUFDVCxVQUFVLEVBQ1YsV0FBVyxFQUNaLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksVUFBVSxHQUFHLG9CQUFXLENBQUMsS0FBSyxFQUFFO2dCQUNsQyxRQUFRLEVBQUUsS0FBSztnQkFDZixTQUFTO2dCQUNULFVBQVU7Z0JBQ1YsT0FBTzthQUNSLENBQUMsQ0FBQztZQUNILElBQUksSUFBSSxHQUEyQixFQUFFLENBQUM7WUFFdEMsSUFBSSxPQUFPLEVBQUU7Z0JBQ1gsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLFVBQVUsQ0FBQyxDQUN6QyxDQUFDO2FBQ0g7WUFFRCxJQUFJLENBQUMsTUFBTSxJQUFJLFlBQVksR0FBRyxDQUFDLEVBQUU7Z0JBQy9CLElBQUksTUFBTSxHQUFHLEVBQUUsR0FBSSxZQUF1QixDQUFDO2dCQUMzQyxJQUFJLGFBQWEsR0FBRyxlQUNsQixNQUFNLEtBQUssSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUMzQyxFQUFFLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLGVBQUssQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FDMUQsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxHQUFHLEVBQUUsVUFBVSxJQUN4QyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLFlBQXNCLEVBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQzlELHVDQUFLLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFDMUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUNULENBQ1AsQ0FBQyxDQUNFLENBQ1AsQ0FBQyxDQUFDO2FBQ0o7WUFFRCxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLFNBQVMsSUFDdEIsSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUNyQyxDQUNQLENBQUM7UUFDSixDQUFDOztJQTVJTSxtQkFBWSxHQUFHO1FBQ3BCLElBQUksRUFBRSxPQUFPO1FBQ2IsVUFBVSxFQUFFLEVBQUU7UUFDZCxVQUFVLEVBQUUsSUFBSTtRQUNoQixTQUFTLEVBQUUsS0FBSztRQUNoQixZQUFZLEVBQUUsQ0FBQyxDQUFDLFNBQVM7S0FDMUIsQ0FBQztJQXVJSixhQUFDO0tBQUE7QUE5SVksd0JBQU07QUFnSm5CLGtCQUFlLGlCQUFTLENBQ3RCLCtCQUFjLENBQUMsTUFBTSxFQUFFO0lBQ3JCLEtBQUssRUFBRSxVQUFVO0NBQ2xCLENBQUMsQ0FDSCxDQUFDIn0=

});
