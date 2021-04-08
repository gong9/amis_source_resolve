amis.define('src/components/ListCheckboxes.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const locale_1 = require("src/locale.tsx");
  class ListCheckboxes extends Checkboxes_1.BaseCheckboxes {
      renderOption(option, index) {
          const { labelClassName, disabled, classnames: cx, itemClassName, itemRender } = this.props;
          const valueArray = this.valueArray;
          if (Array.isArray(option.children)) {
              return (react_1.default.createElement("div", { key: index, className: cx('ListCheckboxes-group', option.className) },
                  react_1.default.createElement("div", { className: cx('ListCheckboxes-itemLabel') }, itemRender(option)),
                  react_1.default.createElement("div", { className: cx('ListCheckboxes-items', option.className) }, option.children.map((child, index) => this.renderOption(child, index)))));
          }
          return (react_1.default.createElement("div", { key: index, className: cx('ListCheckboxes-item', itemClassName, option.className, disabled || option.disabled ? 'is-disabled' : ''), onClick: () => this.toggleOption(option) },
              react_1.default.createElement("div", { className: cx('ListCheckboxes-itemLabel') }, itemRender(option)),
              react_1.default.createElement(Checkbox_1.default, { size: "sm", checked: !!~valueArray.indexOf(option), disabled: disabled || option.disabled, labelClassName: labelClassName, description: option.description })));
      }
      render() {
          const { value, options, className, placeholder, classnames: cx, option2value } = this.props;
          const __ = this.props.translate;
          this.valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
          let body = [];
          if (Array.isArray(options) && options.length) {
              body = options.map((option, key) => this.renderOption(option, key));
          }
          return (react_1.default.createElement("div", { className: cx('ListCheckboxes', className) }, body && body.length ? (body) : (react_1.default.createElement("div", { className: cx('ListCheckboxes-placeholder') }, __(placeholder)))));
      }
  }
  exports.ListCheckboxes = ListCheckboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ListCheckboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdENoZWNrYm94ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9MaXN0Q2hlY2tib3hlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDZDQUE0QztBQUM1QyxvQ0FBbUM7QUFDbkMsMERBQTBCO0FBQzFCLG1EQUE4QztBQUM5QyxrRUFBa0M7QUFFbEMsc0NBQXFDO0FBRXJDLE1BQWEsY0FBZSxTQUFRLDJCQUFjO0lBR2hELFlBQVksQ0FBQyxNQUFjLEVBQUUsS0FBYTtRQUN4QyxNQUFNLEVBQ0osY0FBYyxFQUNkLFFBQVEsRUFDUixVQUFVLEVBQUUsRUFBRSxFQUNkLGFBQWEsRUFDYixVQUFVLEVBQ1gsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2YsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUVuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFFO1lBQ2xDLE9BQU8sQ0FDTCx1Q0FDRSxHQUFHLEVBQUUsS0FBSyxFQUNWLFNBQVMsRUFBRSxFQUFFLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLFNBQVMsQ0FBQztnQkFFdkQsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxJQUMzQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQ2Y7Z0JBRU4sdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLElBQ3pELE1BQU0sQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3BDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUNoQyxDQUNHLENBQ0YsQ0FDUCxDQUFDO1NBQ0g7UUFFRCxPQUFPLENBQ0wsdUNBQ0UsR0FBRyxFQUFFLEtBQUssRUFDVixTQUFTLEVBQUUsRUFBRSxDQUNYLHFCQUFxQixFQUNyQixhQUFhLEVBQ2IsTUFBTSxDQUFDLFNBQVMsRUFDaEIsUUFBUSxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNqRCxFQUNELE9BQU8sRUFBRSxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQztZQUV4Qyx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLDBCQUEwQixDQUFDLElBQzNDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDZjtZQUVOLDhCQUFDLGtCQUFRLElBQ1AsSUFBSSxFQUFDLElBQUksRUFDVCxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFDdEMsUUFBUSxFQUFFLFFBQVEsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUNyQyxjQUFjLEVBQUUsY0FBYyxFQUM5QixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVcsR0FDL0IsQ0FDRSxDQUNQLENBQUM7SUFDSixDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sRUFDSixLQUFLLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxXQUFXLEVBQ1gsVUFBVSxFQUFFLEVBQUUsRUFDZCxZQUFZLEVBQ2IsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBQ2YsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7UUFFaEMsSUFBSSxDQUFDLFVBQVUsR0FBRywyQkFBYyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzNFLElBQUksSUFBSSxHQUEyQixFQUFFLENBQUM7UUFFdEMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxNQUFNLEVBQUU7WUFDNUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDO1NBQ3JFO1FBRUQsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsU0FBUyxDQUFDLElBQzVDLElBQUksSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNyQixJQUFJLENBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FDRix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLDRCQUE0QixDQUFDLElBQzdDLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FDWixDQUNQLENBQ0csQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBeEZELHdDQXdGQztBQUVELGtCQUFlLGlCQUFTLENBQ3RCLG1CQUFVLENBQ1IsK0JBQWMsQ0FBQyxjQUFjLEVBQUU7SUFDN0IsS0FBSyxFQUFFLFVBQVU7Q0FDbEIsQ0FBQyxDQUNILENBQ0YsQ0FBQyJ9

});
