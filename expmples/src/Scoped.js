amis.define('src/Scoped.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 用来创建一个域，在这个域里面会把里面的运行时实例注册进来，方便组件之间的通信。
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HocScoped = exports.ScopedContext = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const hoist_non_react_statics_1 = tslib_1.__importDefault(require("node_modules/hoist-non-react-statics/dist/hoist-non-react-statics.cjs"));
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  exports.ScopedContext = react_1.default.createContext(createScopedTools(''));
  function createScopedTools(path, parent, env) {
      const components = [];
      return {
          parent,
          registerComponent(component) {
              // 不要把自己注册在自己的 Scoped 上，自己的 Scoped 是给子节点们注册的。
              if (component.props.$path === path && parent) {
                  return parent.registerComponent(component);
              }
              if (!~components.indexOf(component)) {
                  components.push(component);
              }
          },
          unRegisterComponent(component) {
              // 自己本身实际上注册在父级 Scoped 上。
              if (component.props.$path === path && parent) {
                  return parent.unRegisterComponent(component);
              }
              const idx = components.indexOf(component);
              if (~idx) {
                  components.splice(idx, 1);
              }
          },
          getComponentByName(name) {
              if (~name.indexOf('.')) {
                  const paths = name.split('.');
                  const len = paths.length;
                  return paths.reduce((scope, name, idx) => {
                      if (scope && scope.getComponentByName) {
                          const result = scope.getComponentByName(name);
                          return result && idx < len - 1 ? result.context : result;
                      }
                      return null;
                  }, this);
              }
              const resolved = find_1.default(components, component => component.props.name === name || component.props.id === name);
              return resolved || (parent && parent.getComponentByName(name));
          },
          getComponents() {
              return components.concat();
          },
          reload(target, ctx) {
              const scoped = this;
              let targets = typeof target === 'string' ? target.split(/\s*,\s*/) : target;
              targets.forEach(name => {
                  const idx2 = name.indexOf('?');
                  let query = null;
                  if (~idx2) {
                      query = tpl_builtin_1.dataMapping(qs_1.default.parse(name.substring(idx2 + 1)), ctx);
                      name = name.substring(0, idx2);
                  }
                  const idx = name.indexOf('.');
                  let subPath = '';
                  if (~idx) {
                      subPath = name.substring(1 + idx);
                      name = name.substring(0, idx);
                  }
                  if (name === 'window') {
                      if (query) {
                          const link = location.pathname + '?' + helper_1.qsstringify(query);
                          env ? env.updateLocation(link, true) : location.replace(link);
                      }
                      else {
                          location.reload();
                      }
                  }
                  else {
                      const component = scoped.getComponentByName(name);
                      component &&
                          component.reload &&
                          component.reload(subPath, query, ctx);
                  }
              });
          },
          send(receive, values) {
              const scoped = this;
              let receives = typeof receive === 'string' ? receive.split(/\s*,\s*/) : receive;
              // todo 没找到做提示！
              receives.forEach(name => {
                  const idx = name.indexOf('.');
                  let subPath = '';
                  if (~idx) {
                      subPath = name.substring(1 + idx);
                      name = name.substring(0, idx);
                  }
                  const component = scoped.getComponentByName(name);
                  if (component && component.receive) {
                      component.receive(values, subPath);
                  }
                  else if (name === 'window' && env && env.updateLocation) {
                      const query = Object.assign(Object.assign({}, (location.search ? qs_1.default.parse(location.search.substring(1)) : {})), values);
                      const link = location.pathname + '?' + helper_1.qsstringify(query);
                      env.updateLocation(link, true);
                  }
              });
          },
          /**
           * 主要是用来关闭指定弹框的
           *
           * @param target 目标 name
           */
          close(target) {
              const scoped = this;
              if (typeof target === 'string') {
                  // 过滤已经关掉的，当用户 close 配置多个弹框 name 时会出现这种情况
                  target
                      .split(/\s*,\s*/)
                      .map(name => scoped.getComponentByName(name))
                      .filter(component => component && component.props.show)
                      .forEach(closeDialog);
              }
          }
      };
  }
  function closeDialog(component) {
      component.context
          .getComponents()
          .filter(item => item &&
          (item.props.type === 'dialog' || item.props.type === 'drawer') &&
          item.props.show)
          .forEach(closeDialog);
      component.props.onClose && component.props.onClose();
  }
  function HocScoped(ComposedComponent) {
      let ScopedComponent = /** @class */ (() => {
          class ScopedComponent extends react_1.default.Component {
              constructor() {
                  super(...arguments);
                  this.scoped = createScopedTools(this.props.$path, this.context, this.props.env);
              }
              getWrappedInstance() {
                  return this.ref;
              }
              childRef(ref) {
                  while (ref && ref.getWrappedInstance) {
                      ref = ref.getWrappedInstance();
                  }
                  this.ref = ref;
              }
              componentWillMount() {
                  const scopeRef = this.props.scopeRef;
                  scopeRef && scopeRef(this.scoped);
              }
              componentWillUnmount() {
                  const scopeRef = this.props.scopeRef;
                  scopeRef && scopeRef(null);
              }
              render() {
                  const _a = this.props, { scopeRef } = _a, rest = tslib_1.__rest(_a, ["scopeRef"]);
                  return (react_1.default.createElement(exports.ScopedContext.Provider, { value: this.scoped },
                      react_1.default.createElement(ComposedComponent, Object.assign({}, rest /* todo */, { ref: this.childRef }))));
              }
          }
          ScopedComponent.displayName = `Scoped(${ComposedComponent.displayName || ComposedComponent.name})`;
          ScopedComponent.contextType = exports.ScopedContext;
          ScopedComponent.ComposedComponent = ComposedComponent;
          tslib_1.__decorate([
              helper_1.autobind,
              tslib_1.__metadata("design:type", Function),
              tslib_1.__metadata("design:paramtypes", [Object]),
              tslib_1.__metadata("design:returntype", void 0)
          ], ScopedComponent.prototype, "childRef", null);
          return ScopedComponent;
      })();
      hoist_non_react_statics_1.default(ScopedComponent, ComposedComponent);
      return ScopedComponent;
  }
  exports.HocScoped = HocScoped;
  exports.default = HocScoped;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2NvcGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL1Njb3BlZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7R0FHRzs7OztBQUVILDBEQUEwQjtBQUMxQiwrREFBK0I7QUFFL0IsOEZBQTBEO0FBQzFELG9EQUFvQjtBQUNwQixxREFBZ0Q7QUFFaEQsMkNBQTJEO0FBOEI5QyxRQUFBLGFBQWEsR0FBRyxlQUFLLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFFeEUsU0FBUyxpQkFBaUIsQ0FDeEIsSUFBYSxFQUNiLE1BQTRCLEVBQzVCLEdBQWlCO0lBRWpCLE1BQU0sVUFBVSxHQUErQixFQUFFLENBQUM7SUFFbEQsT0FBTztRQUNMLE1BQU07UUFDTixpQkFBaUIsQ0FBQyxTQUE4QjtZQUM5Qyw2Q0FBNkM7WUFDN0MsSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxJQUFJLElBQUksTUFBTSxFQUFFO2dCQUM1QyxPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztZQUVELElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ25DLFVBQVUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDNUI7UUFDSCxDQUFDO1FBRUQsbUJBQW1CLENBQUMsU0FBOEI7WUFDaEQseUJBQXlCO1lBQ3pCLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLE1BQU0sRUFBRTtnQkFDNUMsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDOUM7WUFFRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTFDLElBQUks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

});
