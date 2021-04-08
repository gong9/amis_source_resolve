amis.define('src/renderers/Form/City.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CheckboxControlRenderer = exports.LocationControl = exports.CityPicker = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const theme_1 = require("src/theme.tsx");
  const components_1 = require("src/components/index.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const locale_1 = require("src/locale.tsx");
  let CityPicker = /** @class */ (() => {
      var _a, _b, _c, _d, _e;
      class CityPicker extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  code: 0,
                  province: '',
                  provinceCode: 0,
                  city: '',
                  cityCode: 0,
                  district: '',
                  districtCode: 0,
                  street: ''
              };
          }
          componentDidMount() {
              this.loadDb(() => this.syncIn());
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (props.value !== prevProps.value) {
                  this.loadDb(() => this.syncIn(props));
              }
          }
          loadDb(callback) {
              if (this.state.db) {
                  callback === null || callback === void 0 ? void 0 : callback();
                  return;
              }
              Promise.resolve().then(() => new Promise(function(resolve){require(['src/renderers/Form/CityDB.ts'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(db => {
                  this.setState({
                      db: Object.assign(Object.assign({}, db.default), { province: db.province, city: db.city, district: db.district })
                  }, callback);
              });
              // require.ensure(['./CityDB'], (db: any) =>
              //   this.setState(
              //     {
              //       db: {
              //         ...db.default,
              //         province: db.province,
              //         city: db.city,
              //         district: db.district
              //       }
              //     },
              //     callback
              //   )
              // );
          }
          handleProvinceChange(option) {
              this.setState({
                  province: option.label,
                  provinceCode: option.value,
                  city: '',
                  cityCode: 0,
                  district: '',
                  districtCode: 0,
                  street: '',
                  code: option.value
              }, this.syncOut);
          }
          handleCityChange(option) {
              if (option.value % 100) {
                  return this.handleDistrictChange(option, {
                      cityCode: option.value
                  });
              }
              this.setState({
                  city: option.label,
                  cityCode: option.value,
                  district: '',
                  districtCode: 0,
                  street: '',
                  code: option.value
              }, this.syncOut);
          }
          handleDistrictChange(option, otherStates = {}) {
              this.setState(Object.assign(Object.assign({}, otherStates), { district: option.label, districtCode: option.value, street: '', code: option.value }), this.syncOut);
          }
          handleStreetChange(e) {
              this.setState({
                  street: e.currentTarget.value
              });
          }
          handleStreetEnd() {
              this.syncOut();
          }
          syncIn(props = this.props) {
              var _a;
              const db = this.state.db;
              const { value, delimiter } = props;
              if (!db) {
                  return;
              }
              const state = {
                  code: 0,
                  province: '',
                  provinceCode: 0,
                  city: '',
                  cityCode: 0,
                  district: '',
                  districtCode: 0,
                  street: ''
              };
              let code = (value && value.code) ||
                  (typeof value === 'number' && value) ||
                  (typeof value === 'string' && /(\d{6})/.test(value) && RegExp.$1);
              if (code && db[code]) {
                  code = parseInt(code, 10);
                  state.code = code;
                  const provinceCode = code - (code % 10000);
                  if (db[provinceCode]) {
                      state.provinceCode = provinceCode;
                      state.province = db[provinceCode];
                  }
                  const cityCode = code - (code % 100);
                  if (db[cityCode]) {
                      state.cityCode = cityCode;
                      state.city = db[cityCode];
                  }
                  else if (~((_a = db.city[provinceCode]) === null || _a === void 0 ? void 0 : _a.indexOf(code))) {
                      state.cityCode = code;
                      state.city = db[code];
                  }
                  if (code % 100) {
                      state.district = db[code];
                      state.districtCode = code;
                  }
              }
              else if (value) {
                  // todo 模糊查找
              }
              if (value && value.street) {
                  state.street = value.street;
              }
              else if (typeof value === 'string' && ~value.indexOf(delimiter)) {
                  state.street = value.slice(value.indexOf(delimiter) + delimiter.length);
              }
              this.setState(state);
          }
          syncOut() {
              const { onChange, allowStreet, joinValues, extractValue, delimiter } = this.props;
              const { code, province, city, district, street } = this.state;
              if (typeof extractValue === 'undefined' ? joinValues : extractValue) {
                  code
                      ? onChange(allowStreet && street
                          ? [code, street].join(delimiter)
                          : String(code))
                      : onChange('');
              }
              else {
                  onChange({
                      code,
                      province,
                      city,
                      district,
                      street
                  });
              }
          }
          render() {
              var _a, _b;
              const { classnames: cx, className, disabled, allowCity, allowDistrict, allowStreet, searchable, translate: __ } = this.props;
              const { provinceCode, cityCode, districtCode, street, db } = this.state;
              return db ? (react_1.default.createElement("div", { className: cx('CityPicker', className) },
                  react_1.default.createElement(components_1.Select, { searchable: searchable, disabled: disabled, options: db.province.map(item => ({
                          label: db[item],
                          value: item
                      })), value: provinceCode, onChange: this.handleProvinceChange }),
                  provinceCode &&
                      allowDistrict &&
                      Array.isArray(db.district[provinceCode]) ? (react_1.default.createElement(components_1.Select, { searchable: searchable, disabled: disabled, options: db.district[provinceCode].map(item => ({
                          label: db[item],
                          value: item
                      })), value: districtCode, onChange: this.handleDistrictChange })) : allowCity &&
                      db.city[provinceCode] &&
                      db.city[provinceCode].length ? (react_1.default.createElement(components_1.Select, { searchable: searchable, disabled: disabled, options: db.city[provinceCode].map(item => ({
                          label: db[item],
                          value: item
                      })), value: cityCode, onChange: this.handleCityChange })) : null,
                  cityCode &&
                      allowDistrict && ((_b = (_a = db.district[provinceCode]) === null || _a === void 0 ? void 0 : _a[cityCode]) === null || _b === void 0 ? void 0 : _b.length) ? (react_1.default.createElement(components_1.Select, { searchable: searchable, disabled: disabled, options: db.district[provinceCode][cityCode].map(item => ({
                          label: db[item],
                          value: item
                      })), value: districtCode, onChange: this.handleDistrictChange })) : null,
                  allowStreet && provinceCode ? (react_1.default.createElement("input", { className: cx('CityPicker-input'), value: street, onChange: this.handleStreetChange, onBlur: this.handleStreetEnd, placeholder: __('City.street'), disabled: disabled })) : null)) : (react_1.default.createElement(components_1.Spinner, { show: true, size: "sm" }));
          }
      }
      CityPicker.defaultProps = {
          joinValues: true,
          extractValue: true,
          delimiter: ',',
          allowCity: true,
          allowDistrict: true,
          allowStreet: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "handleProvinceChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "handleCityChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _c : Object, typeof (_d = typeof Partial !== "undefined" && Partial) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "handleDistrictChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _e : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "handleStreetChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "handleStreetEnd", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "syncIn", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], CityPicker.prototype, "syncOut", null);
      return CityPicker;
  })();
  exports.CityPicker = CityPicker;
  const ThemedCity = theme_1.themeable(locale_1.localeable(CityPicker));
  exports.default = ThemedCity;
  class LocationControl extends react_1.default.Component {
      render() {
          const { value, onChange, allowCity, allowDistrict, extractValue, joinValues, allowStreet, disabled, searchable } = this.props;
          return (react_1.default.createElement(ThemedCity, { searchable: searchable, value: value, onChange: onChange, allowCity: allowCity, allowDistrict: allowDistrict, extractValue: extractValue, joinValues: joinValues, allowStreet: allowStreet, disabled: disabled }));
      }
  }
  exports.LocationControl = LocationControl;
  let CheckboxControlRenderer = /** @class */ (() => {
      let CheckboxControlRenderer = class CheckboxControlRenderer extends LocationControl {
      };
      CheckboxControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'city',
              sizeMutable: false
          })
      ], CheckboxControlRenderer);
      return CheckboxControlRenderer;
  })();
  exports.CheckboxControlRenderer = CheckboxControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2l0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9DaXR5LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUNuRSx1Q0FBZ0U7QUFDaEUsaURBQWlEO0FBQ2pELCtDQUE0QztBQUM1Qyx1Q0FBaUM7QUFDakMseUNBQXFEO0FBd0ZyRDs7SUFBQSxNQUFhLFVBQVcsU0FBUSxlQUFLLENBQUMsU0FHckM7UUFIRDs7WUFhRSxVQUFLLEdBQW9CO2dCQUN2QixJQUFJLEVBQUUsQ0FBQztnQkFDUCxRQUFRLEVBQUUsRUFBRTtnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixJQUFJLEVBQUUsRUFBRTtnQkFDUixRQUFRLEVBQUUsQ0FBQztnQkFDWCxRQUFRLEVBQUUsRUFBRTtnQkFDWixZQUFZLEVBQUUsQ0FBQztnQkFDZixNQUFNLEVBQUUsRUFBRTthQUNYLENBQUM7UUF1U0osQ0FBQztRQXJTQyxpQkFBaUI7WUFDZixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxTQUEwQjtZQUMzQyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzthQUN2QztRQUNILENBQUM7UUFFRCxNQUFNLENBQUMsUUFBcUI7WUFDMUIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRTtnQkFDakIsUUFBUSxhQUFSLFFBQVEsdUJB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

});
