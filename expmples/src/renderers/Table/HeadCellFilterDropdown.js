amis.define('src/renderers/Table/HeadCellFilterDropdown.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HeadCellFilterDropDown = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const api_1 = require("src/utils/api.ts");
  const icons_1 = require("src/components/icons.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const xor_1 = tslib_1.__importDefault(require("node_modules/lodash/xor"));
  const Select_1 = require("src/components/Select.tsx");
  const helper_1 = require("src/utils/helper.ts");
  class HeadCellFilterDropDown extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.state = {
              isOpened: false,
              filterOptions: []
          };
          this.sourceInvalid = false;
          this.open = this.open.bind(this);
          this.close = this.close.bind(this);
          this.handleClick = this.handleClick.bind(this);
          this.handleCheck = this.handleCheck.bind(this);
      }
      componentDidMount() {
          var _a;
          const { filterable, name, store } = this.props;
          if (filterable.source) {
              this.fetchOptions();
          }
          else if (((_a = filterable.options) === null || _a === void 0 ? void 0 : _a.length) > 0) {
              this.setState({
                  filterOptions: this.alterOptions(filterable.options)
              });
          }
      }
      componentDidUpdate(prevProps, prevState) {
          var _a, _b, _c, _d;
          const name = this.props.name;
          const props = this.props;
          if (prevProps.name !== props.name ||
              prevProps.filterable !== props.filterable ||
              prevProps.data !== props.data) {
              if (props.filterable.source) {
                  this.sourceInvalid = api_1.isApiOutdated(prevProps.filterable.source, props.filterable.source, prevProps.data, props.data);
              }
              else if (props.filterable.options) {
                  this.setState({
                      filterOptions: this.alterOptions(props.filterable.options || [])
                  });
              }
              else if (name &&
                  !this.state.filterOptions.length &&
                  (Array.isArray((_a = props.store) === null || _a === void 0 ? void 0 : _a.data.itemsRaw) ||
                      Array.isArray((_b = props.store) === null || _b === void 0 ? void 0 : _b.data.items))) {
                  const itemsRaw = ((_c = props.store) === null || _c === void 0 ? void 0 : _c.data.itemsRaw) || ((_d = props.store) === null || _d === void 0 ? void 0 : _d.data.items);
                  const values = [];
                  itemsRaw.forEach((item) => {
                      const value = helper_1.getVariable(item, name);
                      if (!~values.indexOf(value)) {
                          values.push(value);
                      }
                  });
                  if (values.length) {
                      this.setState({
                          filterOptions: this.alterOptions(values)
                      });
                  }
              }
          }
          if (this.props.data[name] !== prevProps.data[name] &&
              this.state.filterOptions.length &&
              prevState.filterOptions !== this.props.filterOptions) {
              this.setState({
                  filterOptions: this.alterOptions(this.state.filterOptions)
              });
          }
          this.sourceInvalid && this.fetchOptions();
      }
      fetchOptions() {
          const { env, filterable, data } = this.props;
          if (!api_1.isEffectiveApi(filterable.source, data)) {
              return;
          }
          const api = api_1.normalizeApi(filterable.source);
          api.cache = 3000; // 开启 3s 缓存，因为固顶位置渲染1次会额外多次请求。
          env.fetcher(api, data).then(ret => {
              let options = (ret.data && ret.data.options) || [];
              this.setState({
                  filterOptions: ret && ret.data && this.alterOptions(options)
              });
          });
      }
      alterOptions(options) {
          const { data, filterable, name } = this.props;
          const filterValue = data && typeof data[name] !== 'undefined' ? data[name] : '';
          options = Select_1.normalizeOptions(options);
          if (filterable.multiple) {
              options = options.map(option => (Object.assign(Object.assign({}, option), { selected: filterValue.split(',').indexOf(option.value) > -1 })));
          }
          else {
              options = options.map(option => (Object.assign(Object.assign({}, option), { selected: option.value === filterValue })));
          }
          return options;
      }
      handleClickOutside() {
          this.close();
      }
      open() {
          this.setState({
              isOpened: true
          });
      }
      close() {
          this.setState({
              isOpened: false
          });
      }
      handleClick(value) {
          const { onQuery, name } = this.props;
          onQuery({
              [name]: value
          });
          this.close();
      }
      handleCheck(value) {
          const { data, name, onQuery } = this.props;
          let query;
          if (data[name] && data[name] === value) {
              query = '';
          }
          else {
              query =
                  (data[name] && xor_1.default(data[name].split(','), [value]).join(',')) || value;
          }
          onQuery({
              [name]: query
          });
      }
      handleReset() {
          const { name, onQuery } = this.props;
          onQuery({
              [name]: undefined
          });
          this.close();
      }
      render() {
          const { isOpened, filterOptions } = this.state;
          const { data, name, filterable, popOverContainer, classPrefix: ns, classnames: cx, translate: __ } = this.props;
          return (react_1.default.createElement("span", { className: cx(`${ns}TableCell-filterBtn`, typeof data[name] !== 'undefined' ? 'is-active' : '') },
              react_1.default.createElement("span", { onClick: this.open },
                  react_1.default.createElement(icons_1.Icon, { icon: "column-filter", className: "icon" })),
              isOpened ? (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (() => react_dom_1.findDOMNode(this)), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? () => react_dom_1.findDOMNode(this).parentNode : null, show: true },
                  react_1.default.createElement(PopOver_1.default, { classPrefix: ns, onHide: this.close, className: cx(`${ns}TableCell-filterPopOver`, filterable.className), overlay: true }, filterOptions && filterOptions.length > 0 ? (react_1.default.createElement("ul", { className: cx('DropDown-menu') },
                      !filterable.multiple
                          ? filterOptions.map((option, index) => (react_1.default.createElement("li", { key: index, className: cx({
                                  'is-active': option.selected
                              }), onClick: this.handleClick.bind(this, option.value) }, option.label)))
                          : filterOptions.map((option, index) => (react_1.default.createElement("li", { key: index },
                              react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, onChange: this.handleCheck.bind(this, option.value), checked: option.selected }, option.label)))),
                      filterOptions.some((item) => item.selected) ? (react_1.default.createElement("li", { key: "DropDown-menu-reset", onClick: this.handleReset.bind(this) }, __('reset'))) : null)) : null))) : null));
      }
  }
  exports.HeadCellFilterDropDown = HeadCellFilterDropDown;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZENlbGxGaWx0ZXJEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvVGFibGUvSGVhZENlbGxGaWx0ZXJEcm9wZG93bi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUcxQix5Q0FBNEU7QUFDNUUsa0RBQTRDO0FBQzVDLCtFQUErQztBQUMvQywrRUFBK0M7QUFDL0MseUNBQXNDO0FBQ3RDLGlGQUFpRDtBQUNqRCw2REFBNkI7QUFDN0Isb0RBQXlEO0FBQ3pELCtDQUErQztBQWdCL0MsTUFBYSxzQkFBdUIsU0FBUSxlQUFLLENBQUMsU0FHakQ7SUFPQyxZQUFZLEtBQTBCO1FBQ3BDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQVBmLFVBQUssR0FBRztZQUNOLFFBQVEsRUFBRSxLQUFLO1lBQ2YsYUFBYSxFQUFFLEVBQUU7U0FDbEIsQ0FBQztRQUVGLGtCQUFhLEdBQVksS0FBSyxDQUFDO1FBSTdCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQy9DLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELGlCQUFpQjs7UUFDZixNQUFNLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTdDLElBQUksVUFBVSxD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

});
