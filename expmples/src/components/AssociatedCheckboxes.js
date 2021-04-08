amis.define('src/components/AssociatedCheckboxes.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * 关联多选框，仅支持两层关联选择。
   * 左边先点选，然后右边再次点选。
   * 可以满足，先从 tree 中选中一个元素，然后查出来一个列表再次勾选。
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AssociatedCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const Select_1 = require("src/components/Select.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const ListRadios_1 = tslib_1.__importDefault(require("src/components/ListRadios.tsx"));
  const theme_1 = require("src/theme.tsx");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const ListCheckboxes_1 = tslib_1.__importDefault(require("src/components/ListCheckboxes.tsx"));
  const TableCheckboxes_1 = tslib_1.__importDefault(require("src/components/TableCheckboxes.tsx"));
  const TreeCheckboxes_1 = tslib_1.__importDefault(require("src/components/TreeCheckboxes.tsx"));
  const ChainedCheckboxes_1 = tslib_1.__importDefault(require("src/components/ChainedCheckboxes.tsx"));
  const TreeRadios_1 = tslib_1.__importDefault(require("src/components/TreeRadios.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const locale_1 = require("src/locale.tsx");
  let AssociatedCheckboxes = /** @class */ (() => {
      var _a, _b;
      class AssociatedCheckboxes extends Checkboxes_1.BaseCheckboxes {
          constructor() {
              super(...arguments);
              this.state = {
                  leftValue: this.props.leftDefaultValue
              };
          }
          componentDidMount() {
              const leftValue = this.state.leftValue;
              const { options, onDeferLoad } = this.props;
              if (leftValue) {
                  const selectdOption = ListRadios_1.default.resolveSelected(leftValue, options, (option) => option.ref);
                  if (selectdOption && onDeferLoad && selectdOption.defer) {
                      onDeferLoad(selectdOption);
                  }
              }
          }
          leftOption2Value(option) {
              return option.value;
          }
          handleLeftSelect(value) {
              const { options, onDeferLoad } = this.props;
              this.setState({ leftValue: value });
              const selectdOption = ListRadios_1.default.resolveSelected(value, options, (option) => option.ref);
              if (selectdOption && onDeferLoad && selectdOption.defer) {
                  onDeferLoad(selectdOption);
              }
          }
          handleRetry(option) {
              const { onDeferLoad } = this.props;
              onDeferLoad === null || onDeferLoad === void 0 ? void 0 : onDeferLoad(option);
          }
          render() {
              const { classnames: cx, className, leftOptions, options, option2value, rightMode, onChange, columns, value, disabled, leftMode, cellRender } = this.props;
              const selectdOption = ListRadios_1.default.resolveSelected(this.state.leftValue, options, (option) => option.ref);
              const __ = this.props.translate;
              return (react_1.default.createElement("div", { className: cx('AssociatedCheckboxes', className) },
                  react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-left') }, leftMode === 'tree' ? (react_1.default.createElement(TreeRadios_1.default, { option2value: this.leftOption2Value, options: leftOptions, value: this.state.leftValue, disabled: disabled, onChange: this.handleLeftSelect, showRadio: false })) : (react_1.default.createElement(ListRadios_1.default, { option2value: this.leftOption2Value, options: leftOptions, value: this.state.leftValue, disabled: disabled, onChange: this.handleLeftSelect, showRadio: false }))),
                  react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-right') }, this.state.leftValue ? (selectdOption ? (selectdOption.defer && !selectdOption.loaded ? (react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-box') },
                      react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-reload', selectdOption.loading ? 'is-spin' : 'is-clickable'), onClick: selectdOption.loading
                              ? undefined
                              : this.handleRetry.bind(this, selectdOption) },
                          react_1.default.createElement(icons_1.Icon, { icon: "reload", className: "icon" })),
                      selectdOption.loading ? (react_1.default.createElement("p", null, __('loading'))) : (react_1.default.createElement("p", null, __('Transfer.refreshIcon'))))) : rightMode === 'table' ? (react_1.default.createElement(TableCheckboxes_1.default, { columns: columns, value: value, disabled: disabled, options: selectdOption.children || [], onChange: onChange, option2value: option2value, cellRender: cellRender })) : rightMode === 'tree' ? (react_1.default.createElement(TreeCheckboxes_1.default, { value: value, disabled: disabled, options: selectdOption.children || [], onChange: onChange, option2value: option2value })) : rightMode === 'chained' ? (react_1.default.createElement(ChainedCheckboxes_1.default, { value: value, disabled: disabled, options: selectdOption.children || [], onChange: onChange, option2value: option2value })) : (react_1.default.createElement(ListCheckboxes_1.default, { value: value, disabled: disabled, options: selectdOption.children || [], onChange: onChange, option2value: option2value }))) : (react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-box') }, __('Transfer.configError')))) : (react_1.default.createElement("div", { className: cx('AssociatedCheckboxes-box') }, __('Transfer.selectFromLeft'))))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], AssociatedCheckboxes.prototype, "leftOption2Value", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], AssociatedCheckboxes.prototype, "handleLeftSelect", null);
      return AssociatedCheckboxes;
  })();
  exports.AssociatedCheckboxes = AssociatedCheckboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(AssociatedCheckboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzb2NpYXRlZENoZWNrYm94ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Bc3NvY2lhdGVkQ2hlY2tib3hlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsNkNBQWlFO0FBQ2pFLHFDQUF5QztBQUV6Qyw0Q0FBeUM7QUFDekMsc0VBQXNDO0FBQ3RDLG9DQUFtQztBQUNuQyxtREFBOEM7QUFDOUMsOEVBQThDO0FBQzlDLGdGQUFnRDtBQUNoRCw4RUFBOEM7QUFDOUMsb0ZBQW9EO0FBRXBELHNFQUFzQztBQUN0QyxtQ0FBNkI7QUFDN0Isc0NBQXFDO0FBd0JyQzs7SUFBQSxNQUFhLG9CQUFxQixTQUFRLDJCQUd6QztRQUhEOztZQUlFLFVBQUssR0FBOEI7Z0JBQ2pDLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLGdCQUFnQjthQUN2QyxDQUFDO1FBcUtKLENBQUM7UUFuS0MsaUJBQWlCO1lBQ2YsTUFBTSxTQUFTLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7WUFDdkMsTUFBTSxFQUFDLE9BQU8sRUFBRSxXQUFXLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTFDLElBQUksU0FBUyxFQUFFO2dCQUNiLE1BQU0sYUFBYSxHQUFHLG9CQUFVLENBQUMsZUFBZSxDQUM5QyxTQUFTLEVBQ1QsT0FBTyxFQUNQLENBQUMsTUFBYyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUMvQixDQUFDO2dCQUVGLElBQUksYUFBYSxJQUFJLFdBQVcsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO29CQUN2RCxXQUFXLENBQUMsYUFBYSxDQUFDLENBQUM7aUJBQzVCO2FBQ0Y7UUFDSCxDQUFDO1FBR0QsZ0JBQWdCLENBQUMsTUFBYztZQUM3QixP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

});
