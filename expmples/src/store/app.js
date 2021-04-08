amis.define('src/store/app.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AppStore = void 0;
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const helper_1 = require("src/utils/helper.ts");
  const service_1 = require("src/store/service.ts");
  exports.AppStore = service_1.ServiceStore.named('AppStore')
      .props({
      pages: mobx_state_tree_1.types.frozen(),
      activePage: mobx_state_tree_1.types.frozen(),
      folded: false,
      offScreen: false
  })
      .views(self => ({
      get navigations() {
          if (Array.isArray(self.pages)) {
              return helper_1.mapTree(self.pages, item => {
                  let visible = item.visible;
                  if (visible !== false &&
                      item.path &&
                      !~item.path.indexOf('http') &&
                      ~item.path.indexOf(':')) {
                      visible = false;
                  }
                  return {
                      label: item.label,
                      icon: item.icon,
                      path: item.path,
                      children: item.children,
                      className: item.className,
                      visible
                  };
              });
          }
          return [
              {
                  label: '导航',
                  children: [
                      {
                          label: '暂无页面'
                      }
                  ]
              }
          ];
      },
      get bcn() {
          var _a;
          return ((_a = self.activePage) === null || _a === void 0 ? void 0 : _a.bcn) || [];
      },
      get pageData() {
          var _a;
          return helper_1.createObject(self.data, {
              params: ((_a = self.activePage) === null || _a === void 0 ? void 0 : _a.params) || {}
          });
      }
  }))
      .actions(self => ({
      toggleFolded() {
          self.folded = !self.folded;
      },
      toggleOffScreen() {
          self.offScreen = !self.offScreen;
      },
      setPages(pages) {
          if (pages && !Array.isArray(pages)) {
              pages = [pages];
          }
          else if (!Array.isArray(pages)) {
              return;
          }
          pages = helper_1.mapTree(pages, (item, index, level, paths) => {
              let path = item.link || item.url;
              if (item.schema || item.schemaApi) {
                  path =
                      item.url ||
                          `/${paths
                              .map(item => item.index)
                              .concat(index)
                              .map(index => `page-${index + 1}`)
                              .join('/')}`;
                  if (path && path[0] !== '/') {
                      let parentPath = '/';
                      let index = paths.length;
                      while (index > 0) {
                          const item = paths[index - 1];
                          if (item === null || item === void 0 ? void 0 : item.path) {
                              parentPath = item.path + '/';
                              break;
                          }
                          index--;
                      }
                      path = parentPath + path;
                  }
              }
              return Object.assign(Object.assign({}, item), { index, id: item.id || helper_1.guid(), label: item.label, icon: item.icon, path });
          });
          self.pages = pages;
      },
      rewrite(to, env) {
          let page = helper_1.findTree(self.pages, item => {
              if (item.path === to) {
                  return true;
              }
              return false;
          });
          if (page) {
              this.setActivePage(page, env);
          }
      },
      setActivePage(page, env, params) {
          let bcn = [];
          helper_1.findTree(self.pages, (item, index, level, paths) => {
              if (item.id === page.id) {
                  bcn = paths.filter(item => item.path && item.label);
                  bcn.push(Object.assign(Object.assign({}, item), { path: '' }));
                  if (bcn[0].path !== '/') {
                      bcn.unshift({
                          label: '首页',
                          path: '/'
                      });
                  }
                  return true;
              }
              return false;
          });
          self.activePage = Object.assign(Object.assign({}, page), { params: params || {}, bcn });
          if (page.schema) {
              self.schema = page.schema;
          }
          else if (page.schemaApi) {
              self.fetchSchema(page.schemaApi, self.activePage);
          }
          else if (page.redirect) {
              env.jumpTo(page.redirect);
              return;
          }
          else if (page.rewrite) {
              this.rewrite(page.rewrite, env);
          }
          else {
              self.schema = null;
          }
      },
      updateActivePage(env) {
          if (!Array.isArray(self.pages)) {
              return;
          }
          let matched;
          let page = helper_1.findTree(self.pages, item => {
              if (item.path) {
                  matched = env.isCurrentUrl(item.path, item);
                  if (matched) {
                      return true;
                  }
              }
              return false;
          });
          if (page) {
              this.setActivePage(page, env, typeof matched === 'object' ? matched.params : undefined);
          }
          else {
              const page = helper_1.findTree(self.pages, item => item.isDefaultPage);
              if (page) {
                  this.setActivePage(page, env);
              }
              else {
                  self.activePage = null;
              }
          }
      }
  }));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3N0b3JlL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBNEQ7QUFHNUQsNENBTXlCO0FBQ3pCLHVDQUF1QztBQUUxQixRQUFBLFFBQVEsR0FBRyxzQkFBWSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7S0FDbkQsS0FBSyxDQUFDO0lBQ0wsS0FBSyxFQUFFLHVCQUFLLENBQUMsTUFBTSxFQUFFO0lBQ3JCLFVBQVUsRUFBRSx1QkFBSyxDQUFDLE1BQU0sRUFBRTtJQUMxQixNQUFNLEVBQUUsS0FBSztJQUNiLFNBQVMsRUFBRSxLQUFLO0NBQ2pCLENBQUM7S0FDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2QsSUFBSSxXQUFXO1FBQ2IsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUM3QixPQUFPLGdCQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDaEMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztnQkFFM0IsSUFDRSxPQUFPLEtBQUssS0FBSztvQkFDakIsSUFBSSxDQUFDLElBQUk7b0JBQ1QsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQztvQkFDM0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFDdkI7b0JBQ0EsT0FBTyxHQUFHLEtBQUssQ0FBQztpQkFDakI7Z0JBRUQsT0FBTztvQkFDTCxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUs7b0JBQ2pCLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtvQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7b0JBQ2YsUUFBUSxF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

});
