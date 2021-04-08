amis.define('src/components/ChainedCheckboxes.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChainedCheckboxes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * 级联多选框，支持无限极。从左侧到右侧一层层点选。
   */
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const times_1 = tslib_1.__importDefault(require("node_modules/lodash/times"));
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const locale_1 = require("src/locale.tsx");
  class ChainedCheckboxes extends Checkboxes_1.BaseCheckboxes {
      constructor() {
          super(...arguments);
          this.state = {
              selected: []
          };
      }
      componentDidMount() {
          const defaultSelectedIndex = this.props.defaultSelectedIndex;
          if (defaultSelectedIndex !== undefined) {
              this.setState({
                  selected: [`${defaultSelectedIndex}`]
              });
          }
      }
      selectOption(option, depth, id) {
          const { onDeferLoad } = this.props;
          const selected = this.state.selected.concat();
          selected.splice(depth, selected.length - depth);
          selected.push(id);
          this.setState({
              selected
          }, option.defer && onDeferLoad ? () => onDeferLoad(option) : undefined);
      }
      renderOption(option, index, depth, id) {
          const { labelClassName, disabled, classnames: cx, itemClassName, itemRender } = this.props;
          const valueArray = this.valueArray;
          if (Array.isArray(option.children) || option.defer) {
              return (react_1.default.createElement("div", { key: index, className: cx('ChainedCheckboxes-item', itemClassName, option.className, disabled || option.disabled ? 'is-disabled' : '', ~this.state.selected.indexOf(id) ? 'is-active' : ''), onClick: () => this.selectOption(option, depth, id) },
                  react_1.default.createElement("div", { className: cx('ChainedCheckboxes-itemLabel') }, itemRender(option)),
                  option.defer && option.loading ? react_1.default.createElement(Spinner_1.default, { size: "sm", show: true }) : null));
          }
          return (react_1.default.createElement("div", { key: index, className: cx('ChainedCheckboxes-item', itemClassName, option.className, disabled || option.disabled ? 'is-disabled' : ''), onClick: () => this.toggleOption(option) },
              react_1.default.createElement("div", { className: cx('ChainedCheckboxes-itemLabel') }, itemRender(option)),
              react_1.default.createElement(Checkbox_1.default, { size: "sm", checked: !!~valueArray.indexOf(option), disabled: disabled || option.disabled, labelClassName: labelClassName, description: option.description })));
      }
      render() {
          const { value, options, className, placeholder, classnames: cx, option2value, itemRender, translate: __ } = this.props;
          this.valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
          let body = [];
          if (Array.isArray(options) && options.length) {
              const selected = this.state.selected.concat();
              const depth = Math.min(helper_1.getTreeDepth(options), 3);
              times_1.default(Math.max(depth - selected.length, 1), () => selected.push(null));
              selected.reduce(({ body, options, subTitle, indexes, placeholder }, selected, depth) => {
                  let nextOptions = [];
                  let nextSubTitle = '';
                  let nextPlaceholder = '';
                  let nextIndexes = indexes;
                  body.push(react_1.default.createElement("div", { key: depth, className: cx('ChainedCheckboxes-col') },
                      subTitle ? (react_1.default.createElement("div", { className: cx('ChainedCheckboxes-subTitle') }, subTitle)) : null,
                      Array.isArray(options) && options.length ? (options.map((option, index) => {
                          const id = indexes.concat(index).join('-');
                          if (id === selected) {
                              nextSubTitle = option.subTitle;
                              nextOptions = option.children;
                              nextIndexes = indexes.concat(index);
                              nextPlaceholder = option.placeholder;
                          }
                          return this.renderOption(option, index, depth, id);
                      })) : (react_1.default.createElement("div", { className: cx('ChainedCheckboxes-placeholder') }, __(placeholder)))));
                  return {
                      options: nextOptions,
                      subTitle: nextSubTitle,
                      placeholder: nextPlaceholder,
                      indexes: nextIndexes,
                      body: body
                  };
              }, {
                  options,
                  body,
                  indexes: [],
                  placeholder
              });
          }
          return (react_1.default.createElement("div", { className: cx('ChainedCheckboxes', className) }, body && body.length ? (body) : (react_1.default.createElement("div", { className: cx('ChainedCheckboxes-placeholder') }, __(placeholder)))));
      }
  }
  exports.ChainedCheckboxes = ChainedCheckboxes;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(ChainedCheckboxes, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhaW5lZENoZWNrYm94ZXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9DaGFpbmVkQ2hlY2tib3hlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOztHQUVHO0FBQ0gsNkNBQWlFO0FBQ2pFLG9DQUFtQztBQUNuQywwREFBMEI7QUFDMUIsbURBQThDO0FBQzlDLGtFQUFrQztBQUVsQyw0Q0FBNkM7QUFDN0MsaUVBQWlDO0FBQ2pDLGdFQUFnQztBQUNoQyxzQ0FBcUM7QUFVckMsTUFBYSxpQkFBa0IsU0FBUSwyQkFHdEM7SUFIRDs7UUFLRSxVQUFLLEdBQTJCO1lBQzlCLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztJQXlMSixDQUFDO0lBdkxDLGlCQUFpQjtRQUNmLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQztRQUU3RCxJQUFJLG9CQUFvQixLQUFLLFNBQVMsRUFBRTtZQUN0QyxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxDQUFDLEdBQUcsb0JBQW9CLEVBQUUsQ0FBQzthQUN0QyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7SUFFRCxZQUFZLENBQUMsTUFBYyxFQUFFLEtBQWEsRUFBRSxFQUFVO1FBQ3BELE1BQU0sRUFBQyxXQUFXLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRWpDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLENBQUM7UUFDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUVsQixJQUFJLENBQUMsUUFBUSxDQUNYO1lB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

});
