amis.define('src/renderers/App.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AppRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const components_1 = require("src/components/index.tsx");
  const Layout_1 = tslib_1.__importDefault(require("src/components/Layout.tsx"));
  const factory_1 = require("src/factory.tsx");
  const Scoped_1 = require("src/Scoped.tsx");
  const app_1 = require("src/store/app.ts");
  const api_1 = require("src/utils/api.ts");
  const helper_1 = require("src/utils/helper.ts");
  const icon_1 = require("src/utils/icon.tsx");
  let App = /** @class */ (() => {
      var _a;
      class App extends react_1.default.Component {
          constructor(props) {
              super(props);
              const store = props.store;
              store.syncProps(props, undefined, ['pages']);
              store.updateActivePage(props.env);
              if (props.env.watchRouteChange) {
                  this.unWatchRouteChange = props.env.watchRouteChange(() => store.updateActivePage(props.env));
              }
          }
          async componentDidMount() {
              this.reload();
          }
          async componentDidUpdate(prevProps) {
              const props = this.props;
              const store = props.store;
              store.syncProps(props, prevProps, ['pages']);
              if (api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data)) {
                  this.reload();
              }
              else if (props.location && props.location !== prevProps.location) {
                  store.updateActivePage(props.env);
              }
          }
          componentWillUnmount() {
              var _a;
              (_a = this.unWatchRouteChange) === null || _a === void 0 ? void 0 : _a.call(this);
          }
          async reload(subpath, query, ctx, silent) {
              if (query) {
                  return this.receive(query);
              }
              const { api, store, env } = this.props;
              if (api_1.isEffectiveApi(api, store.data)) {
                  const json = await store.fetchInitData(api, store.data, {});
                  if (json === null || json === void 0 ? void 0 : json.data.pages) {
                      store.setPages(json.data.pages);
                      store.updateActivePage(env);
                  }
              }
          }
          receive(values) {
              const { store } = this.props;
              store.updateData(values);
              this.reload();
          }
          handleNavClick(e) {
              e.preventDefault();
              const env = this.props.env;
              const link = e.currentTarget.getAttribute('href');
              env.jumpTo(link);
          }
          renderHeader() {
              const { classnames: cx, brandName, header, render, store, logo } = this.props;
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  react_1.default.createElement("div", { className: cx('Layout-brandBar') },
                      react_1.default.createElement("div", { onClick: store.toggleOffScreen, className: cx('Layout-offScreenBtn') },
                          react_1.default.createElement("i", { className: "bui-icon iconfont icon-collapse" })),
                      react_1.default.createElement("div", { className: cx('Layout-brand') },
                          logo && ~logo.indexOf('<svg') ? (react_1.default.createElement(components_1.Html, { className: cx('AppLogo-html'), html: logo })) : logo ? (react_1.default.createElement("img", { className: cx('AppLogo'), src: logo })) : (react_1.default.createElement("i", { className: "fa fa-paw" })),
                          react_1.default.createElement("span", { className: "hidden-folded m-l-sm" }, brandName))),
                  react_1.default.createElement("div", { className: cx('Layout-headerBar') },
                      react_1.default.createElement("a", { onClick: store.toggleFolded, type: "button", className: cx('AppFoldBtn') },
                          react_1.default.createElement("i", { className: `fa fa-${store.folded ? 'indent' : 'dedent'} fa-fw` })),
                      header ? render('header', header) : null)));
          }
          renderAside() {
              const { store, env, asideBefore, asideAfter, render } = this.props;
              return (react_1.default.createElement(react_1.default.Fragment, null,
                  asideBefore ? render('aside-before', asideBefore) : null,
                  react_1.default.createElement(components_1.AsideNav, { navigations: store.navigations, renderLink: ({ link, active, toggleExpand, classnames: cx, depth, subHeader }, key) => {
                          let children = [];
                          if (link.visible === false) {
                              return null;
                          }
                          if (!subHeader && link.children && link.children.length) {
                              children.push(react_1.default.createElement("span", { key: "expand-toggle", className: cx('AsideNav-itemArrow'), onClick: e => toggleExpand(link, e) }));
                          }
                          link.badge &&
                              children.push(react_1.default.createElement("b", { key: "badge", className: cx(`AsideNav-itemBadge`, link.badgeClassName || 'bg-info') }, link.badge));
                          if (!subHeader && link.icon) {
                              children.push(icon_1.generateIcon(cx, link.icon, 'AsideNav-itemIcon'));
                          }
                          else if (store.folded && depth === 1 && !subHeader) {
                              children.push(react_1.default.createElement("i", { key: "icon", className: cx(`AsideNav-itemIcon`, link.children ? 'fa fa-folder' : 'fa fa-info') }));
                          }
                          children.push(react_1.default.createElement("span", { className: cx('AsideNav-itemLabel'), key: "label" }, link.label));
                          return link.path ? (/^https?\:/.test(link.path) ? (react_1.default.createElement("a", { target: "_blank", href: link.path, rel: "noopener" }, children)) : (react_1.default.createElement("a", { onClick: this.handleNavClick, href: link.path || (link.children && link.children[0].path) }, children))) : (react_1.default.createElement("a", { onClick: link.children ? () => toggleExpand(link) : undefined }, children));
                      }, isActive: (link) => !!env.isCurrentUrl(link === null || link === void 0 ? void 0 : link.path, link) }),
                  asideAfter ? render('aside-before', asideAfter) : null));
          }
          renderFooter() {
              const { render, footer } = this.props;
              return footer ? render('footer', footer) : null;
          }
          render() {
              var _a;
              const { className, size, classnames: cx, store, render } = this.props;
              return (react_1.default.createElement(Layout_1.default, { header: this.renderHeader(), aside: this.renderAside(), footer: this.renderFooter(), folded: store.folded, offScreen: store.offScreen },
                  store.activePage && store.schema ? (react_1.default.createElement(react_1.default.Fragment, null,
                      store.bcn.length ? (react_1.default.createElement("ul", { className: cx('AppBcn') }, store.bcn.map((item, index) => {
                          return (react_1.default.createElement("li", { key: index, className: cx('AppBcn-item') }, item.path ? (react_1.default.createElement("a", { href: item.path, onClick: this.handleNavClick }, item.label)) : (item.label)));
                      }))) : null,
                      render('page', store.schema, {
                          key: (_a = store.activePage) === null || _a === void 0 ? void 0 : _a.id,
                          data: store.pageData
                      }))) : store.pages && !store.activePage ? (react_1.default.createElement(components_1.NotFound, null,
                      react_1.default.createElement("div", { className: "text-center" }, "\u9875\u9762\u4E0D\u5B58\u5728"))) : null,
                  react_1.default.createElement(components_1.Spinner, { overlay: true, show: store.loading || !store.pages, size: "lg" })));
          }
      }
      App.propsList = [
          'brandName',
          'logo',
          'header',
          'asideBefore',
          'asideAfter',
          'pages',
          'footer'
      ];
      App.defaultProps = {};
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], App.prototype, "handleNavClick", null);
      return App;
  })();
  exports.default = App;
  let AppRenderer = /** @class */ (() => {
      let AppRenderer = class AppRenderer extends App {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
              super.componentWillUnmount();
          }
      };
      AppRenderer.contextType = Scoped_1.ScopedContext;
      AppRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)app$/,
              name: 'app',
              storeType: app_1.AppStore.name
          })
      ], AppRenderer);
      return AppRenderer;
  })();
  exports.AppRenderer = AppRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9BcHAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsOENBQWdFO0FBRWhFLDBFQUEwQztBQUMxQyx3Q0FBbUQ7QUFPbkQsc0NBQXdEO0FBQ3hELHNDQUFpRDtBQUVqRCxzQ0FBMkQ7QUFDM0QsNENBQXlDO0FBQ3pDLHdDQUEyQztBQStIM0M7O0lBQUEsTUFBcUIsR0FBSSxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQWFoRSxZQUFZLEtBQWU7WUFDekIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxQixLQUFLLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQzdDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFbEMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFO2dCQUM5QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FDeEQsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEMsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUVELEtBQUssQ0FBQyxpQkFBaUI7WUFDckIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFFRCxLQUFLLENBQUMsa0JBQWtCLENBQUMsU0FBbUI7WUFDMUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN6QixNQUFNLEtBQUssR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBRTFCLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFFLFNBQVMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFFN0MsSUFBSSxtQkFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUcsRUFBRSxTQUFTLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdkUsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQ2Y7aUJBQU0sSUFBSSxLQUFLLENBQUMsUUFBUSxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssU0FBUyxDQUFDLFFBQVEsRUFBRTtnQkFDbEUsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNuQztRQUNILENBQUM7UUFFRCxvQkFBb0I7O1lBQ2xCLE1BQUEsSUFBSSxDQUFDLGtCQUFrQiwrQ0FBdkIsSUFBSSxFQUF3QjtRQUM5QixDQUFDO1FBRUQsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFhLEVBQUUsS0FBVyxFQUFFLEdBQVMsRUFBRSxNQUFnQjtZQUNsRSxJQUFJLEtBQUssRUFBRTtnQkFDVCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDNUI7WUFFRCxNQUFNLEVBQUMsR0FBRyxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXJDLElBQUksb0JBQWMsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUNuQyxNQUFNLElBQUksR0FBRyxNQUFNLEtBQUssQ0FBQyxhQUFhLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQzVELElBQUksSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3BCLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDaEMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUM3QjthQUNGO1FBQ0gsQ0FBQztRQUVELE9BQU8sQ0FBQyxNQUFjO1lBQ3BCLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTNCLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDekIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ2hCLENBQUM7UUFHRCxjQUFjLENBQUMsQ0FBbUI7WUFDaEMsQ0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBRW5CLE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO1lBQzNCLE1BQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBRSxDQUFDO1lBQ25ELEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsQ0FBQztRQUVELFlBQVk7WUFDVixNQUFNLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUU1RSxPQUFPLENBQ0w7Z0JBQ0UsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztvQkFDbkMsdUNBQ0UsT0FBTyxFQUFFLEtBQUssQ0FBQyxlQUFlLEVBQzlCLFNBQVMsRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUM7d0JBRXBDLHFDQUFHLFNBQVMsRUFBQyxpQ0FBaUMsR0FBSyxDQUMvQztvQkFFTix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQzt3QkFDL0IsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDL0IsOEJBQUMsaUJBQUksSUFBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLGNBQWMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEdBQUksQ0FDcEQsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUNULHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsR0FBRyxFQUFFLElBQUksR0FBSSxDQUM3QyxDQUFDLENBQUMsQ0FBQyxDQUNGLHFDQUFHLFNBQVMsRUFBQyxXQUFXLEdBQUcsQ0FDNUI7d0JBQ0Qsd0NBQU0sU0FBUyxFQUFDLHNCQUFzQixJQUFFLFNBQVMsQ0FBUSxDQUNyRCxDQUNGO2dCQUVOLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUM7b0JBQ3BDLHFDQUNFLE9BQU8sRUFBRSxLQUFLLENBQUMsWUFBWSxFQUMzQixJQUFJLEVBQUMsUUFBUSxFQUNiLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDO3dCQUUzQixxQ0FDRSxTQUFTLEVBQUUsU0FBUyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsUUFBUSxHQUMzRCxDQUNIO29CQUNILE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNyQyxDQUNMLENBQ0osQ0FBQztRQUNKLENBQUM7UUFFRCxXQUFXO1lBQ1QsTUFBTSxFQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWpFLE9BQU8sQ0FDTDtnQkFDRyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3pELDhCQUFDLHFCQUFRLElBQ1AsV0FBVyxFQUFFLEtBQUssQ0FBQyxXQUFXLEVBQzlCLFVBQVUsRUFBRSxDQUNWLEVBQUMsSUFBSSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFNLEVBQ25FLEdBQVEsRUFDUixFQUFFO3dCQUNGLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQzt3QkFFbEIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTs0QkFDMUIsT0FBTyxJQUFJLENBQUM7eUJBQ2I7d0JBRUQsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFOzRCQUN2RCxRQUFRLENBQUMsSUFBSSxDQUNYLHdDQUNFLEdBQUcsRUFBQyxlQUFlLEVBQ25CLFNBQVMsRUFBRSxFQUFFLENBQUMsb0JBQW9CLENBQUMsRUFDbkMsT0FBTyxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsR0FDN0IsQ0FDVCxDQUFDO3lCQUNIO3dCQUVELElBQUksQ0FBQyxLQUFLOzRCQUNSLFFBQVEsQ0FBQyxJQUFJLENBQ1gscUNBQ0UsR0FBRyxFQUFDLE9BQU8sRUFDWCxTQUFTLEVBQUUsRUFBRSxDQUNYLG9CQUFvQixFQUNwQixJQUFJLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FDakMsSUFFQSxJQUFJLENBQUMsS0FBSyxDQUNULENBQ0wsQ0FBQzt3QkFFSixJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7NEJBQzNCLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQVksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUM7eUJBQ2pFOzZCQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFOzRCQUNwRCxRQUFRLENBQUMsSUFBSSxDQUNYLHFDQUNFLEdBQUcsRUFBQyxNQUFNLEVBQ1YsU0FBUyxFQUFFLEVBQUUsQ0FDWCxtQkFBbUIsRUFDbkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQzlDLEdBQ0QsQ0FDSCxDQUFDO3lCQUNIO3dCQUVELFFBQVEsQ0FBQyxJQUFJLENBQ1gsd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLEdBQUcsRUFBQyxPQUFPLElBQ25ELElBQUksQ0FBQyxLQUFLLENBQ04sQ0FDUixDQUFDO3dCQUVGLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDakIsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQzVCLHFDQUFHLE1BQU0sRUFBQyxRQUFRLEVBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxFQUFDLFVBQVUsSUFDL0MsUUFBUSxDQUNQLENBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FDRixxQ0FDRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDNUIsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBRTFELFFBQVEsQ0FDUCxDQUNMLENBQ0YsQ0FBQyxDQUFDLENBQUMsQ0FDRixxQ0FBRyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLElBQzdELFFBQVEsQ0FDUCxDQUNMLENBQUM7b0JBQ0osQ0FBQyxFQUNELFFBQVEsRUFBRSxDQUFDLElBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxZQUFZLENBQUMsSUFBSSxhQUFKLElBQUksdUJBQUosSUFBSSxDQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FDN0Q7Z0JBQ0QsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ3RELENBQ0osQ0FBQztRQUNKLENBQUM7UUFFRCxZQUFZO1lBQ1YsTUFBTSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQ3BDLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7UUFDbEQsQ0FBQztRQUVELE1BQU07O1lBQ0osTUFBTSxFQUFDLFNBQVMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVwRSxPQUFPLENBQ0wsOEJBQUMsZ0JBQU0sSUFDTCxNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUN6QixNQUFNLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFBRSxFQUMzQixNQUFNLEVBQUUsS0FBSyxDQUFDLE1BQU0sRUFDcEIsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTO2dCQUV6QixLQUFLLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ2xDO29CQUNHLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUNsQixzQ0FBSSxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUN4QixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxLQUFhLEVBQUUsRUFBRTt3QkFDMUMsT0FBTyxDQUNMLHNDQUFJLEdBQUcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDWCxxQ0FBRyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLGNBQWMsSUFDN0MsSUFBSSxDQUFDLEtBQUssQ0FDVCxDQUNMLENBQUMsQ0FBQyxDQUFDLENBQ0YsSUFBSSxDQUFDLEtBQUssQ0FDWCxDQUNFLENBQ04sQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FDQyxDQUNOLENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBRVAsTUFBTSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFO3dCQUM1QixHQUFHLFFBQUUsS0FBSyxDQUFDLFVBQVUsMENBQUUsRUFBRTt3QkFDekIsSUFBSSxFQUFFLEtBQUssQ0FBQyxRQUFRO3FCQUNyQixDQUFDLENBQ0QsQ0FDSixDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FDckMsOEJBQUMscUJBQVE7b0JBQ1AsdUNBQUssU0FBUyxFQUFDLGFBQWEscUNBQVksQ0FDL0IsQ0FDWixDQUFDLENBQUMsQ0FBQyxJQUFJO2dCQUNSLDhCQUFDLG9CQUFPLElBQUMsT0FBTyxRQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsSUFBSSxHQUFHLENBQzNELENBQ1YsQ0FBQztRQUNKLENBQUM7O0lBaFFNLGFBQVMsR0FBa0I7UUFDaEMsV0FBVztRQUNYLE1BQU07UUFDTixRQUFRO1FBQ1IsYUFBYTtRQUNiLFlBQVk7UUFDWixPQUFPO1FBQ1AsUUFBUTtLQUNULENBQUM7SUFDSyxnQkFBWSxHQUFHLEVBQUUsQ0FBQztJQThEekI7UUFEQyxpQkFBUTs7cUVBQ1MsZUFBSyxvQkFBTCxlQUFLLENBQUMsVUFBVTs7NkNBTWpDO0lBb0xILFVBQUM7S0FBQTtrQkFsUW9CLEdBQUc7QUF5UXhCO0lBQUEsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLEdBQUc7UUFHbEMsa0JBQWtCO1lBQ2hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUF5QixDQUFDO1lBQzlDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO1FBRUQsb0JBQW9CO1lBQ2xCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxPQUF5QixDQUFDO1lBQzlDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqQyxLQUFLLENBQUMsb0JBQW9CLEVBQUUsQ0FBQztRQUMvQixDQUFDO0tBQ0YsQ0FBQTtJQVpRLHVCQUFXLEdBQUcsc0JBQWEsQ0FBQztJQUR4QixXQUFXO1FBTHZCLGtCQUFRLENBQUM7WUFDUixJQUFJLEVBQUUsWUFBWTtZQUNsQixJQUFJLEVBQUUsS0FBSztZQUNYLFNBQVMsRUFBRSxjQUFRLENBQUMsSUFBSTtTQUN6QixDQUFDO09BQ1csV0FBVyxDQWF2QjtJQUFELGtCQUFDO0tBQUE7QUFiWSxrQ0FBVyJ9

});
