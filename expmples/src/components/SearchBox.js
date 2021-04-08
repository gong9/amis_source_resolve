amis.define('src/components/SearchBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SearchBox = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const helper_1 = require("src/utils/helper.ts");
  const locale_1 = require("src/locale.tsx");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  let SearchBox = /** @class */ (() => {
      var _a, _b;
      class SearchBox extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.inputRef = react_1.default.createRef();
              this.lazyEmitSearch = debounce_1.default(() => {
                  const onSearch = this.props.onSearch;
                  onSearch === null || onSearch === void 0 ? void 0 : onSearch(this.props.value || '');
              }, 250, {
                  leading: false,
                  trailing: true
              });
          }
          componentWillUnmount() {
              this.lazyEmitSearch.cancel();
          }
          handleActive() {
              var _a;
              const { onActiveChange } = this.props;
              onActiveChange === null || onActiveChange === void 0 ? void 0 : onActiveChange(true);
              (_a = this.inputRef.current) === null || _a === void 0 ? void 0 : _a.focus();
          }
          handleCancel() {
              const { onActiveChange, onChange, onCancel } = this.props;
              onActiveChange === null || onActiveChange === void 0 ? void 0 : onActiveChange(false);
              onCancel === null || onCancel === void 0 ? void 0 : onCancel();
              onChange === null || onChange === void 0 ? void 0 : onChange('');
          }
          handleChange(e) {
              const { onChange, onSearch, searchImediately } = this.props;
              onChange === null || onChange === void 0 ? void 0 : onChange(e.currentTarget.value);
              searchImediately && this.lazyEmitSearch();
          }
          handleSearch() {
              const { value, onSearch } = this.props;
              onSearch === null || onSearch === void 0 ? void 0 : onSearch(value || '');
          }
          handleKeyDown(e) {
              if (e.key === 'Enter') {
                  this.handleSearch();
                  e.preventDefault();
              }
          }
          render() {
              const { classnames: cx, value, active, name, onChange, disabled, placeholder, mini, translate: __ } = this.props;
              return (react_1.default.createElement("div", { className: cx('SearchBox', disabled ? 'is-disabled' : '', !mini || active ? 'is-active' : '') },
                  react_1.default.createElement("input", { name: name, disabled: disabled, onChange: this.handleChange, value: value || '', placeholder: __(placeholder || 'placeholder.enter'), ref: this.inputRef, autoComplete: "off", onKeyDown: this.handleKeyDown }),
                  !mini ? (react_1.default.createElement("a", { className: cx('SearchBox-searchBtn'), onClick: this.handleSearch },
                      react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" }))) : active ? (react_1.default.createElement("a", { className: cx('SearchBox-cancelBtn'), onClick: this.handleCancel },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : (react_1.default.createElement("a", { className: cx('SearchBox-activeBtn'), onClick: this.handleActive },
                      react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" })))));
          }
      }
      SearchBox.defaultProps = {
          mini: true,
          searchImediately: true
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBox.prototype, "handleActive", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBox.prototype, "handleCancel", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBox.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBox.prototype, "handleSearch", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.KeyboardEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBox.prototype, "handleKeyDown", null);
      return SearchBox;
  })();
  exports.SearchBox = SearchBox;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(SearchBox, {
      active: 'onActiveChange',
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvU2VhcmNoQm94LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9DQUErQztBQUMvQyxtQ0FBNkI7QUFDN0IsbURBQThDO0FBQzlDLDRDQUF5QztBQUN6QyxzQ0FBa0Q7QUFDbEQsdUVBQXVDO0FBa0J2Qzs7SUFBQSxNQUFhLFNBQVUsU0FBUSxlQUFLLENBQUMsU0FBeUI7UUFBOUQ7O1lBQ0UsYUFBUSxHQUFzQyxlQUFLLENBQUMsU0FBUyxFQUFFLENBQUM7WUFNaEUsbUJBQWMsR0FBRyxrQkFBUSxDQUN2QixHQUFHLEVBQUU7Z0JBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFBSSxFQUFFLEVBQUU7WUFDckMsQ0FBQyxFQUNELEdBQUcsRUFDSDtnQkFDRSxPQUFPLEVBQUUsS0FBSztnQkFDZCxRQUFRLEVBQUUsSUFBSTthQUNmLENBQ0YsQ0FBQztRQTBGSixDQUFDO1FBeEZDLG9CQUFvQjtZQUNsQixJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQy9CLENBQUM7UUFHRCxZQUFZOztZQUNWLE1BQU0sRUFBQyxjQUFjLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLGNBQWMsYUFBZCxjQUFjLHVCQUFkLGNBQWMsQ0FBRyxJQUFJLEVBQUU7WUFDdkIsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sMENBQUUsS0FBSyxHQUFHO1FBQ2pDLENBQUM7UUFHRCxZQUFZO1lBQ1YsTUFBTSxFQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFD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

});
