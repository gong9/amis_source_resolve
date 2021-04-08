amis.define('src/components/BaiduMapPicker.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.BaiduMapPicker = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const debounce_1 = tslib_1.__importDefault(require("node_modules/lodash/debounce"));
  const icons_1 = require("src/components/icons.tsx");
  /**
   * 坐标常量说明：
   * COORDINATES_WGS84 = 1, WGS84坐标
   * COORDINATES_WGS84_MC = 2, WGS84的平面墨卡托坐标
   * COORDINATES_GCJ02 = 3，GCJ02坐标
   * COORDINATES_GCJ02_MC = 4, GCJ02的平面墨卡托坐标
   * COORDINATES_BD09 = 5, 百度bd09经纬度坐标
   * COORDINATES_BD09_MC = 6，百度bd09墨卡托坐标
   * COORDINATES_MAPBAR = 7，mapbar地图坐标
   * COORDINATES_51 = 8，51地图坐标
   */
  const COORDINATES_WGS84 = 1;
  const COORDINATES_WGS84_MC = 2;
  const COORDINATES_GCJ02 = 3;
  const COORDINATES_GCJ02_MC = 4;
  const COORDINATES_BD09 = 5;
  const COORDINATES_BD09_MC = 6;
  const COORDINATES_MAPBAR = 7;
  const COORDINATES_51 = 8;
  let BaiduMapPicker = /** @class */ (() => {
      var _a, _b, _c;
      class BaiduMapPicker extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  inputValue: '',
                  locs: [],
                  locIndex: -1,
                  sugs: []
              };
              this.id = helper_1.uuid();
              this.mapRef = react_1.default.createRef();
              this.search = debounce_1.default(() => {
                  var _a;
                  if (this.state.inputValue) {
                      (_a = this.ac) === null || _a === void 0 ? void 0 : _a.search(this.state.inputValue);
                  }
                  else {
                      this.setState({
                          sugs: []
                      });
                  }
              }, 250, {
                  trailing: true,
                  leading: false
              });
          }
          componentDidMount() {
              if (window.BMap) {
                  this.initMap();
              }
              else {
                  helper_1.loadScript(`//api.map.baidu.com/api?v=3.0&ak=${this.props.ak}&callback={{callback}}`).then(this.initMap);
              }
          }
          componentWillUnmount() {
              var _a;
              (_a = this.ac) === null || _a === void 0 ? void 0 : _a.dispose();
              document.body.removeChild(this.placeholderInput);
              delete this.placeholderInput;
              delete this.map;
          }
          async initMap() {
              const map = new BMap.Map(this.mapRef.current, {
                  enableMapClick: false
              });
              this.map = map;
              this.convertor = new BMap.Convertor();
              const value = this.props.value;
              let point = value
                  ? new BMap.Point(value.lng, value.lat)
                  : new BMap.Point(116.404, 39.915);
              if (this.props.coordinatesType == 'gcj02') {
                  point = await this.covertPoint(point, COORDINATES_GCJ02, COORDINATES_BD09);
                  map.centerAndZoom(point, 15);
              }
              else {
                  map.centerAndZoom(point, 15);
              }
              map.addControl(
              // @ts-ignore
              new BMap.NavigationControl({ type: BMAP_NAVIGATION_CONTROL_SMALL }));
              const geolocationControl = new BMap.GeolocationControl();
              geolocationControl.addEventListener('locationSuccess', (e) => {
                  this.getLocations(e.point);
              });
              map.addControl(geolocationControl);
              map.addEventListener('click', (e) => {
                  this.getLocations(e.point, true);
              });
              const input = document.createElement('input');
              input.className = 'invisible';
              this.placeholderInput = input;
              document.body.appendChild(input);
              this.ac = new BMap.Autocomplete({
                  input,
                  location: map,
                  onSearchComplete: (result) => {
                      // 说明已经销毁了。
                      if (!this.map) {
                          return;
                      }
                      const sugs = [];
                      const poiLength = result.getNumPois();
                      if (poiLength) {
                          for (let i = 0; i < poiLength; i++) {
                              const poi = result.getPoi(i);
                              sugs.push([
                                  poi.province,
                                  poi.city,
                                  poi.district,
                                  poi.street,
                                  poi.business
                              ].join(' '));
                          }
                          this.setState({
                              sugs
                          });
                      }
                  }
              });
              value ? this.getLocations(point) : geolocationControl.location();
          }
          getLocations(point, select) {
              const map = this.map;
              map.clearOverlays();
              const mk = new BMap.Marker(point);
              map.addOverlay(mk);
              map.panTo(point);
              var geoc = new BMap.Geocoder();
              geoc.getLocation(point, (rs) => {
                  // 说明已经销毁了。
                  if (!this.map) {
                      return;
                  }
                  const index = 0;
                  const locs = [];
                  locs.push({
                      title: '当前位置',
                      address: rs.address,
                      city: rs.addressComponents.city,
                      lat: rs.point.lat,
                      lng: rs.point.lng
                  });
                  if (Array.isArray(rs.surroundingPois)) {
                      rs.surroundingPois.forEach((item) => {
                          locs.push({
                              title: item.title,
                              address: item.address,
                              city: item.city,
                              lat: item.point.lat,
                              lng: item.point.lng
                          });
                      });
                  }
                  this.setState({
                      locIndex: index,
                      locs
                  }, () => {
                      if (!select) {
                          return;
                      }
                      this.triggerOnChange(locs[0]);
                  });
              });
          }
          handleChange(e) {
              this.setState({
                  inputValue: e.currentTarget.value
              }, this.search);
          }
          handleSelect(e) {
              const index = parseInt(e.currentTarget.getAttribute('data-index'), 10);
              const loc = this.state.locs[index];
              this.setState({
                  locIndex: index
              }, () => {
                  const point = new BMap.Point(loc.lng, loc.lat);
                  this.map.clearOverlays();
                  const mk = new BMap.Marker(point);
                  this.map.addOverlay(mk);
                  this.map.panTo(point);
                  this.triggerOnChange(loc);
              });
          }
          covertPoint(point, from, to) {
              return new Promise((resolve, reject) => {
                  this.convertor.translate([point], from, to, (res) => {
                      if (res.status === 0 && res.points.length) {
                          resolve(new BMap.Point(res.points[0].lng, res.points[0].lat));
                      }
                      else {
                          reject();
                      }
                  });
              });
          }
          triggerOnChange(loc) {
              var _a;
              const point = new BMap.Point(loc.lng, loc.lat);
              if (this.props.coordinatesType == 'gcj02') {
                  this.covertPoint(point, COORDINATES_BD09, COORDINATES_GCJ02).then((convertedPoint) => {
                      var _a;
                      (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange({
                          address: loc.address.trim() || loc.title,
                          lat: convertedPoint.lat,
                          lng: convertedPoint.lng,
                          city: loc.city
                      });
                  });
              }
              else {
                  (_a = this.props) === null || _a === void 0 ? void 0 : _a.onChange({
                      address: loc.address.trim() || loc.title,
                      lat: loc.lat,
                      lng: loc.lng,
                      city: loc.city
                  });
              }
          }
          handleSugSelect(e) {
              const value = e.currentTarget.innerText;
              this.setState({
                  inputValue: value
              });
              var local = new BMap.LocalSearch(this.map, {
                  //智能搜索
                  onSearchComplete: () => {
                      const results = local.getResults();
                      const poi = results.getPoi(0);
                      this.setState({
                          inputValue: poi.title,
                          sugs: []
                      });
                      this.getLocations(poi.point, true);
                  }
              });
              local.search(value);
          }
          render() {
              const { classnames: cx } = this.props;
              const { locIndex, locs, inputValue, sugs } = this.state;
              const hasSug = Array.isArray(sugs) && sugs.length;
              return (react_1.default.createElement("div", { className: cx('MapPicker') },
                  react_1.default.createElement("div", { className: cx('MapPicker-search TextControl-control') },
                      react_1.default.createElement("div", { className: cx('TextControl-input') },
                          react_1.default.createElement("input", { onChange: this.handleChange, value: inputValue, placeholder: "\u641C\u7D22\u5730\u70B9" }))),
                  react_1.default.createElement("div", { ref: this.mapRef, className: cx('MapPicker-map', {
                          invisible: hasSug
                      }) }),
                  react_1.default.createElement("div", { className: cx('MapPicker-result', {
                          invisible: hasSug
                      }) }, locs.map((item, index) => (react_1.default.createElement("div", { onClick: this.handleSelect, key: index, "data-index": index, className: cx('MapPicker-item') },
                      react_1.default.createElement("div", { className: cx('MapPicker-itemTitle') }, item.title),
                      react_1.default.createElement("div", { className: cx('MapPicker-itemDesc') }, item.address),
                      locIndex === index ? (react_1.default.createElement(icons_1.Icon, { icon: "success", className: "icon" })) : null)))),
                  hasSug ? (react_1.default.createElement("div", { className: cx('MapPicker-sug') }, sugs.map(item => (react_1.default.createElement("div", { onClick: this.handleSugSelect, className: cx('MapPicker-sugItem'), key: item }, item))))) : null));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", Promise)
      ], BaiduMapPicker.prototype, "initMap", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaiduMapPicker.prototype, "handleChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaiduMapPicker.prototype, "handleSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], BaiduMapPicker.prototype, "handleSugSelect", null);
      return BaiduMapPicker;
  })();
  exports.BaiduMapPicker = BaiduMapPicker;
  exports.default = theme_1.themeable(BaiduMapPicker);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFpZHVNYXBQaWNrZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9CYWlkdU1hcFBpY2tlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixvQ0FBaUQ7QUFDakQsNENBQTJEO0FBQzNELHVFQUF1QztBQUN2QyxtQ0FBNkI7QUFJN0I7Ozs7Ozs7Ozs7R0FVRztBQUNILE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLE1BQU0saUJBQWlCLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxDQUFDO0FBQy9CLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLE1BQU0sY0FBYyxHQUFHLENBQUMsQ0FBQztBQStCekI7O0lBQUEsTUFBYSxjQUFlLFNBQVEsZUFBSyxDQUFDLFNBR3pDO1FBSEQ7O1lBSUUsVUFBSyxHQUFtQjtnQkFDdEIsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLENBQUMsQ0FBQztnQkFDWixJQUFJLEVBQUUsRUFBRTthQUNULENBQUM7WUFFRixPQUFFLEdBQUcsYUFBSSxFQUFFLENBQUM7WUFDWixXQUFNLEdBQW9DLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUk1RCxXQUFNLEdBQUcsa0JBQVEsQ0FDZixHQUFHLEVBQUU7O2dCQUNILElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUU7b0JBQ3pCLE1BQUEsSUFBSSxDQUFDLEVBQUUsMENBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMs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

});
