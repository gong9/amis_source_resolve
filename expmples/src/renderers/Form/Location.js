amis.define('src/renderers/Form/Location.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LocationRenderer = exports.LocationControl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = tslib_1.__importDefault(require("src/renderers/Form/Item.tsx"));
  const LocationPicker_1 = tslib_1.__importDefault(require("src/components/LocationPicker.tsx"));
  let LocationControl = /** @class */ (() => {
      class LocationControl extends react_1.default.Component {
          render() {
              return (react_1.default.createElement("div", { className: this.props.classnames('LocationControl') },
                  react_1.default.createElement(LocationPicker_1.default, Object.assign({}, this.props))));
          }
      }
      LocationControl.defaultProps = {
          vendor: 'baidu',
          coordinatesType: 'bd09'
      };
      return LocationControl;
  })();
  exports.LocationControl = LocationControl;
  let LocationRenderer = /** @class */ (() => {
      let LocationRenderer = class LocationRenderer extends LocationControl {
      };
      LocationRenderer = tslib_1.__decorate([
          Item_1.default({
              type: 'location'
          })
      ], LocationRenderer);
      return LocationRenderer;
  })();
  exports.LocationRenderer = LocationRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9jYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vTG9jYXRpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsMERBQW1FO0FBQ25FLDZGQUE2RDtBQWtDN0Q7SUFBQSxNQUFhLGVBQWdCLFNBQVEsZUFBSyxDQUFDLFNBQStCO1FBTXhFLE1BQU07WUFDSixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLGlCQUFpQixDQUFDO2dCQUN0RCw4QkFBQyx3QkFBYyxvQkFBSyxJQUFJLENBQUMsS0FBSyxFQUFJLENBQzlCLENBQ1AsQ0FBQztRQUNKLENBQUM7O0lBWE0sNEJBQVksR0FBRztRQUNwQixNQUFNLEVBQUUsT0FBTztRQUNmLGVBQWUsRUFBRSxNQUFNO0tBQ3hCLENBQUM7SUFTSixzQkFBQztLQUFBO0FBYlksMENBQWU7QUFrQjVCO0lBQUEsSUFBYSxnQkFBZ0IsR0FBN0IsTUFBYSxnQkFBaUIsU0FBUSxlQUFlO0tBQUcsQ0FBQTtJQUEzQyxnQkFBZ0I7UUFINUIsY0FBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFVBQVU7U0FDakIsQ0FBQztPQUNXLGdCQUFnQixDQUEyQjtJQUFELHVCQUFDO0tBQUE7QUFBM0MsNENBQWdCIn0=

});
