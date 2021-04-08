amis.define('src/renderers/Tabs.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TabsRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const helper_1 = require("src/utils/helper.ts");
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  const Tabs_1 = require("src/components/Tabs.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let Tabs = /** @class */ (() => {
      class Tabs extends react_1.default.Component {
          constructor(props) {
              super(props);
              const location = props.location || window.location;
              const tabs = props.tabs;
              let activeKey = 0;
              if (typeof props.activeKey !== 'undefined') {
                  activeKey = props.activeKey;
              }
              else if (location && Array.isArray(tabs)) {
                  const hash = location.hash.substring(1);
                  const tab = find_1.default(tabs, tab => tab.hash === hash);
                  activeKey = tab && tab.hash ? tab.hash : (tabs[0] && tabs[0].hash) || 0;
              }
              this.state = {
                  prevKey: undefined,
                  activeKey: (this.activeKey = activeKey)
              };
          }
          componentDidMount() {
              this.autoJumpToNeighbour(this.activeKey);
          }
          componentDidUpdate(preProps, prevState) {
              const props = this.props;
              if (props.location && props.location.hash !== preProps.location.hash) {
                  const hash = props.location.hash.substring(1);
                  if (!hash) {
                      return;
                  }
                  const tab = find_1.default(props.tabs, tab => tab.hash === hash);
                  if (tab && tab.hash && tab.hash !== this.state.activeKey) {
                      this.setState({
                          activeKey: (this.activeKey = tab.hash),
                          prevKey: this.state.activeKey
                      });
                  }
              }
              else if (preProps.tabs !== props.tabs) {
                  let activeKey = this.state.activeKey;
                  const location = props.location;
                  let tab = null;
                  if (location && Array.isArray(props.tabs)) {
                      const hash = location.hash.substring(1);
                      tab = find_1.default(props.tabs, tab => tab.hash === hash);
                  }
                  if (tab) {
                      activeKey = tab.hash;
                  }
                  else if (!props.tabs ||
                      !props.tabs.some((item, index) => item.hash ? item.hash === activeKey : index === activeKey)) {
                      activeKey = (props.tabs && props.tabs[0] && props.tabs[0].hash) || 0;
                  }
                  this.setState({
                      prevKey: undefined,
                      activeKey: (this.activeKey = activeKey)
                  });
              }
              this.autoJumpToNeighbour(this.activeKey);
          }
          autoJumpToNeighbour(key) {
              const { tabs, data } = this.props;
              if (!Array.isArray(tabs)) {
                  return;
              }
              // 当前 tab 可能不可见，所以需要自动切到一个可见的 tab, 向前找，找一圈
              const tabIndex = findIndex_1.default(tabs, (tab, index) => tab.hash ? tab.hash === key : index === key);
              if (tabs[tabIndex] && !helper_1.isVisible(tabs[tabIndex], this.props.data)) {
                  let len = tabs.length;
                  let i = tabIndex - 1 + len;
                  let tries = len - 1;
                  while (tries--) {
                      const index = i-- % len;
                      if (helper_1.isVisible(tabs[index], data)) {
                          let activeKey = tabs[index].hash || index;
                          this.setState({
                              activeKey: (this.activeKey = activeKey)
                          });
                          break;
                      }
                  }
              }
          }
          handleSelect(key) {
              const { env } = this.props;
              // 是 hash，需要更新到地址栏
              if (typeof key === 'string' && env) {
                  env.updateLocation(`#${key}`);
              }
              else if (typeof this.state.activeKey === 'string' && env) {
                  env.updateLocation(`#`);
              }
              this.setState({
                  activeKey: (this.activeKey = key),
                  prevKey: this.state.activeKey
              });
          }
          switchTo(index) {
              const { tabs } = this.props;
              Array.isArray(tabs) &&
                  tabs[index] &&
                  this.setState({
                      activeKey: (this.activeKey = tabs[index].hash || index)
                  });
          }
          currentIndex() {
              const { tabs } = this.props;
              return Array.isArray(tabs)
                  ? findIndex_1.default(tabs, (tab, index) => tab.hash
                      ? tab.hash === this.state.activeKey
                      : index === this.state.activeKey)
                  : -1;
          }
          renderToolbar() {
              const { toolbar, render, classnames: cx, toolbarClassName } = this.props;
              return toolbar ? (react_1.default.createElement("div", { className: cx(`Tabs-toolbar`, toolbarClassName) }, render('toolbar', toolbar))) : null;
          }
          renderTabs() {
              const { classnames: cx, classPrefix: ns, contentClassName, tabRender, className, render, data, mode: dMode, tabsMode, mountOnEnter, unmountOnExit, source } = this.props;
              const mode = tabsMode || dMode;
              const arr = tpl_builtin_1.resolveVariable(source, data);
              let tabs = this.props.tabs;
              if (!tabs) {
                  return null;
              }
              tabs = Array.isArray(tabs) ? tabs : [tabs];
              let children = [];
              if (Array.isArray(arr)) {
                  arr.forEach((value, index) => {
                      const ctx = helper_1.createObject(data, helper_1.isObject(value) ? Object.assign({ index }, value) : { item: value, index });
                      children.push(...tabs.map((tab, tabIndex) => helper_1.isVisible(tab, ctx) ? (react_1.default.createElement(Tabs_1.Tab, Object.assign({}, tab, { title: tpl_1.filter(tab.title, ctx), disabled: helper_1.isDisabled(tab, ctx), key: `${index * 1000 + tabIndex}`, eventKey: index * 1000 + tabIndex, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                              ? tab.reload
                              : typeof tab.unmountOnExit === 'boolean'
                                  ? tab.unmountOnExit
                                  : unmountOnExit }), render(`item/${index}/${tabIndex}`, tab.tab || tab.body || '', {
                          data: ctx
                      }))) : null));
                  });
              }
              else {
                  children = tabs.map((tab, index) => helper_1.isVisible(tab, data) ? (react_1.default.createElement(Tabs_1.Tab, Object.assign({}, tab, { title: tpl_1.filter(tab.title, data), disabled: helper_1.isDisabled(tab, data), key: index, eventKey: tab.hash || index, mountOnEnter: mountOnEnter, unmountOnExit: typeof tab.reload === 'boolean'
                          ? tab.reload
                          : typeof tab.unmountOnExit === 'boolean'
                              ? tab.unmountOnExit
                              : unmountOnExit }), this.renderTab
                      ? this.renderTab(tab, this.props, index)
                      : tabRender
                          ? tabRender(tab, this.props, index)
                          : render(`tab/${index}`, tab.tab || tab.body || ''))) : null);
              }
              return (react_1.default.createElement(Tabs_1.Tabs, { classPrefix: ns, classnames: cx, mode: mode, className: className, contentClassName: contentClassName, onSelect: this.handleSelect, activeKey: this.state.activeKey, toolbar: this.renderToolbar() }, children));
          }
          render() {
              return this.renderTabs();
          }
      }
      Tabs.defaultProps = {
          className: '',
          mode: '',
          mountOnEnter: true,
          unmountOnExit: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Tabs.prototype, "autoJumpToNeighbour", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Tabs.prototype, "handleSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Tabs.prototype, "switchTo", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", Number)
      ], Tabs.prototype, "currentIndex", null);
      return Tabs;
  })();
  exports.default = Tabs;
  let TabsRenderer = /** @class */ (() => {
      let TabsRenderer = class TabsRenderer extends Tabs {
      };
      TabsRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)tabs$/,
              name: 'tabs'
          })
      ], TabsRenderer);
      return TabsRenderer;
  })();
  exports.TabsRenderer = TabsRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvVGFicy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsK0RBQStCO0FBQy9CLDRDQU15QjtBQUN6Qix5RUFBeUM7QUFDekMsNkNBQXNEO0FBU3RELHNDQUFvQztBQUNwQyxzREFBcUQ7QUFpSHJEO0lBQUEsTUFBcUIsSUFBSyxTQUFRLGVBQUssQ0FBQyxTQUErQjtRQVdyRSxZQUFZLEtBQWdCO1lBQzFCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLE1BQU0sUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuRCxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksU0FBUyxHQUFRLENBQUMsQ0FBQztZQUV2QixJQUFJLE9BQU8sS0FBSyxDQUFDLFNBQVMsS0FBSyxXQUFXLEVBQUU7Z0JBQzFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDO2FBQzdCO2lCQUFNLElBQUksUUFBUSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQzFDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN4QyxNQUFNLEdBQUcsR0FBYyxjQUFJLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLElBQUksS0FBSyxJQUFJLENBQWMsQ0FBQztnQkFDekUsU0FBUyxHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENB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

});
