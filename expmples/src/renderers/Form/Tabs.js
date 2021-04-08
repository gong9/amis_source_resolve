amis.define('src/renderers/Form/Tabs.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TabsRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Tabs_1 = tslib_1.__importDefault(require("src/renderers/Tabs.tsx"));
  let TabsRenderer = /** @class */ (() => {
      let TabsRenderer = class TabsRenderer extends Tabs_1.default {
          constructor() {
              super(...arguments);
              this.renderTab = (tab, props, key) => {
                  const { renderFormItems, formMode, formHorizontal, $path, render, classnames: cx } = this.props;
                  if (renderFormItems &&
                      !tab.type &&
                      (tab.controls || tab.fieldSet || tab.tabs)) {
                      return (react_1.default.createElement("div", { className: cx(`Form--${tab.mode || formMode || 'normal'}`) }, renderFormItems(tab, `${$path.replace(/^.*form\//, '')}/${key}`, {
                          mode: tab.mode || formMode,
                          horizontal: tab.horizontal || formHorizontal
                      })));
                  }
                  return render(`tab/${key}`, tab.body || tab.tab || tab);
              };
          }
          resolveTabByKey(key) {
              const tabs = this.props.tabs;
              if (!Array.isArray(tabs)) {
                  return;
              }
              return find_1.default(tabs, (tab, index) => tab.hash ? tab.hash === key : index === key);
          }
          resolveKeyByValue(value) {
              const tabs = this.props.tabs;
              if (!Array.isArray(tabs)) {
                  return;
              }
              const tab = find_1.default(tabs, tab => { var _a; return ((_a = tab.value) !== null && _a !== void 0 ? _a : tab.title) === value; });
              return tab && tab.hash ? tab.hash : tabs.indexOf(tab);
          }
          componentDidMount() {
              var _a, _b;
              super.componentDidMount();
              const { name, value, onChange, source, tabs } = this.props;
              // 如果没有配置 name ，说明不需要同步表单值
              if (!name ||
                  typeof onChange !== 'function' ||
                  // 如果关联某个变量数据，则不启用
                  source) {
                  return;
              }
              //  如果有值，切到对应的 tab
              if (value && Array.isArray(tabs)) {
                  const key = this.resolveKeyByValue(value);
                  key !== undefined && this.handleSelect(key);
              }
              else {
                  const tab = this.resolveTabByKey(this.activeKey);
                  if (tab && value !== ((_a = tab.value) !== null && _a !== void 0 ? _a : tab.title)) {
                      onChange((_b = tab.value) !== null && _b !== void 0 ? _b : tab.title);
                  }
              }
          }
          componentDidUpdate(prevProps, prevState) {
              var _a, _b;
              super.componentDidUpdate(prevProps, prevState);
              const { name, value, onChange, source, tabs } = this.props;
              // 如果没有配置 name ，说明不需要同步表单值
              if (!name ||
                  typeof onChange !== 'function' ||
                  // 如果关联某个变量数据，则不启用
                  source) {
                  return;
              }
              let key;
              if (value !== prevProps.value &&
                  (key = this.resolveKeyByValue(value)) !== undefined &&
                  key !== this.activeKey) {
                  this.handleSelect(key);
              }
              else if (this.activeKey !== prevState.activeKey) {
                  const tab = this.resolveTabByKey(this.activeKey);
                  if (tab && value !== ((_a = tab.value) !== null && _a !== void 0 ? _a : tab.title)) {
                      onChange((_b = tab.value) !== null && _b !== void 0 ? _b : tab.title);
                  }
              }
          }
      };
      TabsRenderer.defaultProps = {
          mountOnEnter: false // form 中的不按需渲染
      };
      TabsRenderer.propsList = ['onChange', 'tabs'];
      TabsRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)form(?:.+)?\/control\/tabs$/i,
              weight: -100,
              name: 'tabs-control'
          })
      ], TabsRenderer);
      return TabsRenderer;
  })();
  exports.TabsRenderer = TabsRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFicy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9UYWJzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsK0RBQStCO0FBQy9CLDBEQUEwQjtBQUMxQiwyQ0FBc0Q7QUFFdEQsMkRBQW9EO0FBZ0RwRDtJQUFBLElBQWEsWUFBWSxHQUF6QixNQUFhLFlBQWEsU0FBUSxjQUFJO1FBQXRDOztZQU1FLGNBQVMsR0FBRyxDQUFDLEdBQVEsRUFBRSxLQUFVLEVBQUUsR0FBVyxFQUFFLEVBQUU7Z0JBQ2hELE1BQU0sRUFDSixlQUFlLEVBQ2YsUUFBUSxFQUNSLGNBQWMsRUFDZCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsRUFBRSxFQUFFLEVBQ2YsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUVmLElBQ0UsZUFBZTtvQkFDZixDQUFDLEdBQUcsQ0FBQyxJQUFJO29CQUNULENBQUMsR0FBRyxDQUFDLFFBQVEsSUFBSSxHQUFHLENBQUMsUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFDMUM7b0JBQ0EsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxHQUFHLENBQUMsSUFBSSxJQUFJLFFBQVEsSUFBSSxRQUFRLEVBQUUsQ0FBQyxJQUM1RCxlQUFlLENBQ2QsR0FBRyxFQUNILEdBQUksS0FBZ0IsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxFQUN0RDt3QkFDRSxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksSUFBSSxRQUFRO3dCQUMxQixVQUFVLEVBQUUsR0FBRyxDQUFDLFVBQVUsSUFBSSxjQUFjO3FCQUM3QyxDQUNGLENBQ0csQ0FDUCxDQUFDO2lCQUNIO2dCQUVELE9BQU8sTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLEVBQUUsR0FBRyxD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

});
