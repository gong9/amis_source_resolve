amis.define('src/renderers/SearchBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SearchBoxRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const factory_1 = require("src/factory.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const SearchBox_1 = tslib_1.__importDefault(require("src/components/SearchBox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  let SearchBoxRenderer = /** @class */ (() => {
      let SearchBoxRenderer = class SearchBoxRenderer extends react_1.default.Component {
          handleCancel() {
              const name = this.props.name;
              const onQuery = this.props.onQuery;
              const data = {};
              helper_1.setVariable(data, name, '');
              onQuery === null || onQuery === void 0 ? void 0 : onQuery(data);
          }
          handleSearch(text) {
              const { name, onQuery: onQuery } = this.props;
              const data = {};
              helper_1.setVariable(data, name, text);
              onQuery === null || onQuery === void 0 ? void 0 : onQuery(data);
          }
          render() {
              const { data, name, onQuery: onQuery, mini, searchImediately } = this.props;
              const value = helper_1.getVariable(data, name);
              return (react_1.default.createElement(SearchBox_1.default, { name: name, disabled: !onQuery, defaultActive: !!value, defaultValue: value, mini: mini, searchImediately: searchImediately, onSearch: this.handleSearch, onCancel: this.handleCancel }));
          }
      };
      SearchBoxRenderer.defaultProps = {
          name: 'keywords',
          mini: false,
          searchImediately: false
      };
      SearchBoxRenderer.propsList = ['mini', 'searchImediately'];
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBoxRenderer.prototype, "handleCancel", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], SearchBoxRenderer.prototype, "handleSearch", null);
      SearchBoxRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)search\-box$/,
              name: 'search'
          })
      ], SearchBoxRenderer);
      return SearchBoxRenderer;
  })();
  exports.SearchBoxRenderer = SearchBoxRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQm94LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9TZWFyY2hCb3gudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSx3Q0FBbUQ7QUFDbkQsMERBQTBCO0FBRTFCLGdGQUFnRDtBQUNoRCw0Q0FBbUU7QUEwQ25FO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBa0IsU0FBUSxlQUFLLENBQUMsU0FBeUI7UUFVcEUsWUFBWTtZQUNWLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO1lBQ25DLE1BQU0sSUFBSSxHQUFRLEVBQUUsQ0FBQztZQUNyQixvQkFBVyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDNUIsT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFHLElBQUksRUFBRTtRQUNsQixDQUFDO1FBR0QsWUFBWSxDQUFDLElBQVk7WUFDdkIsTUFBTSxFQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUM1QyxNQUFNLElBQUksR0FBUSxFQUFFLENBQUM7WUFDckIsb0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQzlCLE9BQU8sYUFBUCxPQUFPLHVCQUFQLE9BQU8sQ0FBRyxJQUFJLEVBQUU7UUFDbEIsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxnQkFBZ0IsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFMUUsTUFBTSxLQUFLLEdBQUcsb0JBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDdEMsT0FBTyxDQUNMLDhCQUFDLG1CQUFTLElBQ1IsSUFBSSxFQUFFLElBQUksRUFDVixRQUFRLEVBQUUsQ0FBQyxPQUFPLEVBQ2xCLGFBQWEsRUFBRSxDQUFDLENBQUMsS0FBSyxFQUN0QixZQUFZLEVBQUUsS0FBSyxFQUNuQixJQUFJLEVBQUUsSUFBSSxFQUNWLGdCQUFnQixFQUFFLGdCQUFnQixFQUNsQyxRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEdBQzNCLENBQ0gsQ0FBQztRQUNKLENBQUM7S0FDRixDQUFBO0lBMUNRLDhCQUFZLEdBQUc7UUFDcEIsSUFBSSxFQUFFLFVBQVU7UUFDaEIsSUFBSSxFQUFFLEtBQUs7UUFDWCxnQkFBZ0IsRUFBRSxLQUFLO0tBQ3hCLENBQUM7SUFFSywyQkFBUyxHQUFrQixDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO0lBRy9EO1FBREMsaUJBQVE7Ozs7eURBT1I7SUFHRDtRQURDLGlCQUFROzs7O3lEQU1SO0lBeEJVLGlCQUFpQjtRQUo3QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLG9CQUFvQjtZQUMxQixJQUFJLEVBQUUsUUFBUTtTQUNmLENBQUM7T0FDVyxpQkFBaUIsQ0EyQzdCO0lBQUQsd0JBQUM7S0FBQTtBQTNDWSw4Q0FBaUIifQ==

});
