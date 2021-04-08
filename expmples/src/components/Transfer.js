amis.define('src/components/Transfer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Transfer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const Checkboxes_1 = require("src/components/Checkboxes.tsx");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const ResultList_1 = tslib_1.__importDefault(require("src/components/ResultList.tsx"));
  const TableCheckboxes_1 = tslib_1.__importDefault(require("src/components/TableCheckboxes.tsx"));
  const ListCheckboxes_1 = tslib_1.__importDefault(require("src/components/ListCheckboxes.tsx"));
  const TreeCheckboxes_1 = tslib_1.__importDefault(require("src/components/TreeCheckboxes.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const InputBox_1 = tslib_1.__importDefault(require("src/components/InputBox.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const ChainedCheckboxes_1 = tslib_1.__importDefault(require("src/components/ChainedCheckboxes.tsx"));
  const AssociatedCheckboxes_1 = tslib_1.__importDefault(require("src/components/AssociatedCheckboxes.tsx"));
  const locale_1 = require("src/locale.tsx");
  let Transfer = /** @class */ (() => {
      var _a;
      class Transfer extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  inputValue: '',
                  searchResult: null
              };
              this.unmounted = false;
              this.lazySearch = debounce_1.default((text) => {
                  (async (text) => {
                      const onSearch = this.props.onSearch;
                      let result = await onSearch(text, (cancelExecutor) => (this.cancelSearch = cancelExecutor));
                      if (this.unmounted) {
                          return;
                      }
                      if (!Array.isArray(result)) {
                          throw new Error('onSearch 需要返回数组');
                      }
                      this.setState({
                          searchResult: result
                      });
                  })(text).catch(e => console.error(e));
              }, 250, {
                  trailing: true,
                  leading: false
              });
          }
          componentWillUnmount() {
              this.lazySearch.cancel();
              this.unmounted = true;
          }
          toggleAll() {
              const { options, option2value, onChange, value } = this.props;
              let valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              const availableOptions = helper_1.flattenTree(options).filter((option, index, list) => !option.disabled &&
                  option.value !== void 0 &&
                  list.indexOf(option) === index);
              if (valueArray.length < availableOptions.length) {
                  valueArray = availableOptions;
              }
              else {
                  valueArray = [];
              }
              let newValue = option2value
                  ? valueArray.map(item => option2value(item))
                  : valueArray;
              onChange && onChange(newValue);
          }
          clearAll() {
              const { onChange } = this.props;
              onChange && onChange([]);
          }
          handleSearchKeyDown(e) {
              if (e.key === 'Enter') {
                  e.preventDefault();
              }
          }
          handleSearch(text) {
              // text 有值的时候，走搜索否则直接走 handleSeachCancel ，等同于右侧的 clear 按钮
              if (text) {
                  this.setState({
                      inputValue: text
                  }, () => {
                      // 如果有取消搜索，先取消掉。
                      this.cancelSearch && this.cancelSearch();
                      this.lazySearch(text);
                  });
              }
              else {
                  this.handleSeachCancel();
              }
          }
          handleSeachCancel() {
              this.setState({
                  inputValue: '',
                  searchResult: null
              });
          }
          renderSelect() {
              const { selectRender, selectMode, classnames: cx, selectTitle, onSearch, disabled, options, statistics, translate: __ } = this.props;
              if (selectRender) {
                  return selectRender(Object.assign(Object.assign({}, this.props), { onSearch: this.handleSearch, onSearchCancel: this.handleSeachCancel, searchResult: this.state.searchResult }));
              }
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  react_1.default.createElement("div", { className: cx('Transfer-title', selectMode === 'table' ? 'Transfer-title--light' : '') },
                      react_1.default.createElement("span", null,
                          __(selectTitle),
                          statistics !== false ? (react_1.default.createElement("span", null,
                              "\uFF08",
                              this.valueArray.length,
                              "/",
                              this.availableOptions.length,
                              "\uFF09")) : null),
                      selectMode !== 'table' ? (react_1.default.createElement("a", { onClick: this.toggleAll, className: cx('Transfer-checkAll', disabled || !options.length ? 'is-disabled' : '') }, __('Select.placeholder'))) : null),
                  onSearch ? (react_1.default.createElement("div", { className: cx('Transfer-search') },
                      react_1.default.createElement(InputBox_1.default, { value: this.state.inputValue, onChange: this.handleSearch, placeholder: __('Transfer.searchKeyword'), clearable: false, onKeyDown: this.handleSearchKeyDown }, this.state.searchResult !== null ? (react_1.default.createElement("a", { onClick: this.handleSeachCancel },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : (react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" }))))) : null,
                  this.state.searchResult !== null
                      ? this.renderSearchResult()
                      : this.renderOptions()));
          }
          renderSearchResult() {
              const { searchResultMode, selectMode, noResultsText, searchResultColumns, classnames: cx, value, disabled, onChange, option2value, cellRender } = this.props;
              const options = this.state.searchResult || [];
              const mode = searchResultMode || selectMode;
              return mode === 'table' ? (react_1.default.createElement(TableCheckboxes_1.default, { placeholder: noResultsText, className: cx('Transfer-checkboxes'), columns: searchResultColumns, options: options, value: value, disabled: disabled, onChange: onChange, option2value: option2value, cellRender: cellRender })) : mode === 'tree' ? (react_1.default.createElement(TreeCheckboxes_1.default, { placeholder: noResultsText, className: cx('Transfer-checkboxes'), options: options, value: value, disabled: disabled, onChange: onChange, option2value: option2value })) : mode === 'chained' ? (react_1.default.createElement(ChainedCheckboxes_1.default, { placeholder: noResultsText, className: cx('Transfer-checkboxes'), options: options, value: value, disabled: disabled, onChange: onChange, option2value: option2value })) : (react_1.default.createElement(ListCheckboxes_1.default, { placeholder: noResultsText, className: cx('Transfer-checkboxes'), options: options, value: value, disabled: disabled, onChange: onChange, option2value: option2value }));
          }
          renderOptions() {
              const { selectMode, columns, options, value, disabled, onChange, option2value, classnames: cx, onDeferLoad, leftOptions, leftMode, rightMode, cellRender, leftDefaultValue } = this.props;
              return selectMode === 'table' ? (react_1.default.createElement(TableCheckboxes_1.default, { className: cx('Transfer-checkboxes'), columns: columns, options: options || [], value: value, disabled: disabled, onChange: onChange, option2value: option2value, onDeferLoad: onDeferLoad, cellRender: cellRender })) : selectMode === 'tree' ? (react_1.default.createElement(TreeCheckboxes_1.default, { className: cx('Transfer-checkboxes'), options: options || [], value: value, disabled: disabled, onChange: onChange, option2value: option2value, onDeferLoad: onDeferLoad })) : selectMode === 'chained' ? (react_1.default.createElement(ChainedCheckboxes_1.default, { className: cx('Transfer-checkboxes'), options: options || [], value: value, disabled: disabled, onChange: onChange, option2value: option2value, onDeferLoad: onDeferLoad })) : selectMode === 'associated' ? (react_1.default.createElement(AssociatedCheckboxes_1.default, { className: cx('Transfer-checkboxes'), options: options || [], value: value, disabled: disabled, onChange: onChange, option2value: option2value, onDeferLoad: onDeferLoad, columns: columns, leftOptions: leftOptions || [], leftMode: leftMode, rightMode: rightMode, leftDefaultValue: leftDefaultValue })) : (react_1.default.createElement(ListCheckboxes_1.default, { className: cx('Transfer-checkboxes'), options: options || [], value: value, disabled: disabled, onChange: onChange, option2value: option2value, onDeferLoad: onDeferLoad }));
          }
          render() {
              const { inline, classnames: cx, className, value, onChange, resultTitle, sortable, options, option2value, disabled, statistics, showArrow, translate: __ } = this.props;
              this.valueArray = Checkboxes_1.BaseCheckboxes.value2array(value, options, option2value);
              this.availableOptions = helper_1.flattenTree(options).filter((option, index, list) => !option.disabled &&
                  option.value !== void 0 &&
                  list.indexOf(option) === index);
              return (react_1.default.createElement("div", { className: cx('Transfer', className, inline ? 'Transfer--inline' : '') },
                  react_1.default.createElement("div", { className: cx('Transfer-select') }, this.renderSelect()),
                  react_1.default.createElement("div", { className: cx('Transfer-mid') }, showArrow /*todo 需要改成确认模式，即：点了按钮才到右边 */ ? (react_1.default.createElement("div", { className: cx('Transfer-arrow') },
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))) : null),
                  react_1.default.createElement("div", { className: cx('Transfer-result') },
                      react_1.default.createElement("div", { className: cx('Transfer-title') },
                          react_1.default.createElement("span", null,
                              __(resultTitle),
                              statistics !== false ? (react_1.default.createElement("span", null,
                                  "\uFF08",
                                  this.valueArray.length,
                                  "/",
                                  this.availableOptions.length,
                                  "\uFF09")) : null),
                          react_1.default.createElement("a", { onClick: this.clearAll, className: cx('Transfer-clearAll', disabled || !this.valueArray.length ? 'is-disabled' : '') }, __('clear'))),
                      react_1.default.createElement(ResultList_1.default, { className: cx('Transfer-selections'), sortable: sortable, disabled: disabled, value: value, onChange: onChange, placeholder: __('Transfer.selectFromLeft') }))));
          }
      }
      Transfer.defaultProps = {
          selectTitle: 'Select.placeholder',
          resultTitle: 'Transfer.selectd',
          itemRender: (option) => react_1.default.createElement("span", null, option.label)
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Transfer.prototype, "toggleAll", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Transfer.prototype, "clearAll", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Transfer.prototype, "handleSearchKeyDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Transfer.prototype, "handleSearch", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Transfer.prototype, "handleSeachCancel", null);
      return Transfer;
  })();
  exports.Transfer = Transfer;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(Transfer, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhbnNmZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9UcmFuc2Zlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixvQ0FBK0M7QUFDL0MsNkNBQWlFO0FBRWpFLG1EQUE4QztBQUM5QyxzRUFBc0M7QUFDdEMsZ0ZBQWdEO0FBQ2hELDhFQUE4QztBQUM5Qyw4RUFBOEM7QUFDOUMsNENBQXNEO0FBQ3RELGtFQUFrQztBQUNsQyxtQ0FBNkI7QUFDN0IsdUVBQXVDO0FBQ3ZDLG9GQUFvRDtBQUNwRCwwRkFBMEQ7QUFDMUQsc0NBQWtEO0FBZ0VsRDs7SUFBQSxNQUFhLFFBQVMsU0FBUSxlQUFLLENBQUMsU0FBdUM7UUFBM0U7O1lBT0UsVUFBSyxHQUFHO2dCQUNOLFVBQVUsRUFBRSxFQUFFO2dCQUNkLFlBQVksRUFBRSxJQUFJO2FBQ25CLENBQUM7WUFJRixjQUFTLEdBQUcsS0FBSyxDQUFDO1lBd0VsQixlQUFVLEdBQUcsa0JBQVEsQ0FDbkIsQ0FBQyxJQUFZLEVBQUUsRUFBRTtnQkFDZixDQUFDLEtBQUssRUFBRSxJQUFZLEVBQUUsRUFBRTtvQkFDdEIsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFTLENBQUM7b0JBQ3RDLElBQUksTUFBTSxHQUFHLE1BQU0sUUFBUSxDQUN6QixJQUFJLEVBQ0osQ0FBQyxjQUEwQixFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsY0FBYyxDQUFDLENBQ3JFLENBQUM7b0JBRUYsSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNsQixPQUFPO3FCQUNSO29CQUVELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO3dCQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENB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

});
