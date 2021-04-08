amis.define('src/components/AsideNav.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file AsideNav
   * @description 左侧导航。
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AsideNav = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  const theme_1 = require("src/theme.tsx");
  let AsideNav = /** @class */ (() => {
      class AsideNav extends react_1.default.Component {
          constructor(props) {
              super(props);
              const isOpen = props.isOpen;
              let id = 1;
              this.state = {
                  navigations: helper_1.mapTree(props.navigations, (item) => {
                      const isActive = typeof item.active === 'undefined'
                          ? props.isActive(item)
                          : item.active;
                      return Object.assign(Object.assign({}, item), { id: id++, active: isActive, open: isActive || isOpen(item) });
                  }, 1, true)
              };
              this.renderLink = this.renderLink.bind(this);
              this.toggleExpand = this.toggleExpand.bind(this);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              const isOpen = props.isOpen;
              if (props.navigations !== nextProps.navigations ||
                  props.isActive !== nextProps.isActive) {
                  let id = 1;
                  this.setState({
                      navigations: helper_1.mapTree(nextProps.navigations, (item) => {
                          const isActive = typeof item.active === 'undefined'
                              ? nextProps.isActive(item)
                              : item.active;
                          return Object.assign(Object.assign({}, item), { id: id++, active: isActive, open: isActive || isOpen(item) });
                      }, 1, true)
                  });
              }
          }
          toggleExpand(link, e) {
              if (e) {
                  e.stopPropagation();
                  e.preventDefault();
              }
              this.setState({
                  navigations: helper_1.mapTree(this.state.navigations, (item) => (Object.assign(Object.assign({}, item), { open: link.id === item.id ? !item.open : item.open })), 1, true)
              });
          }
          renderLink(link, key, props = {}, depth = 1) {
              const _a = this.props, { renderLink, isActive, renderSubLinks, classnames: cx } = _a, others = tslib_1.__rest(_a, ["renderLink", "isActive", "renderSubLinks", "classnames"]);
              const dom = renderLink(Object.assign({ link, active: link.active, open: link.open, toggleExpand: this.toggleExpand, depth, classnames: cx, subHeader: key === 'subHeader' }, others));
              if (!dom) {
                  return;
              }
              else if (key === 'subHeader') {
                  return react_1.default.cloneElement(dom, {
                      key
                  });
              }
              return (react_1.default.createElement("li", Object.assign({}, props, { key: key, className: cx(`AsideNav-item`, link.className, {
                      [`is-open`]: link.open,
                      [`is-active`]: link.active
                  }) }),
                  dom,
                  renderSubLinks(link, this.renderLink, depth, this.props)));
          }
          render() {
              const navigations = this.state.navigations;
              let links = [];
              const { className, classnames: cx } = this.props;
              navigations.forEach((navigation, index) => {
                  if (!Array.isArray(navigation.children)) {
                      return;
                  }
                  if (navigation.prefix) {
                      const prefix = typeof navigation.prefix === 'function'
                          ? navigation.prefix(this.props)
                          : navigation.prefix;
                      links.push(react_1.default.cloneElement(prefix, Object.assign(Object.assign({}, prefix.props), { key: `${index}-prefix` })));
                  }
                  navigation.label &&
                      links.push(react_1.default.createElement("li", { key: `${index}-label`, className: cx(`AsideNav-label`, navigation.className) },
                          react_1.default.createElement("span", null, navigation.label)));
                  navigation.children.forEach((item, key) => {
                      const link = this.renderLink(item, `${index}-${key}`);
                      link && links.push(link);
                  });
                  if (navigation.affix) {
                      const affix = typeof navigation.affix === 'function'
                          ? navigation.affix(this.props)
                          : navigation.affix;
                      links.push(react_1.default.cloneElement(affix, Object.assign(Object.assign({}, affix.props), { key: `${index}-affix` })));
                  }
              });
              return (react_1.default.createElement("nav", { className: cx(`AsideNav`, className) },
                  react_1.default.createElement("ul", { className: cx(`AsideNav-list`) }, links)));
          }
      }
      AsideNav.defaultProps = {
          renderLink: (item) => react_1.default.createElement("a", null, item.label),
          renderSubLinks: (link, renderLink, depth, { classnames: cx }) => link.children && link.children.length ? (react_1.default.createElement("ul", { className: cx('AsideNav-subList') },
              link.label ? (react_1.default.createElement("li", { key: "subHeader", className: cx('AsideNav-subHeader') }, renderLink(Object.assign(Object.assign({}, link), { children: undefined }), 'subHeader', {}, depth))) : null,
              link.children.map((link, key) => renderLink(link, key, {}, depth + 1)))) : link.label && depth === 1 ? (react_1.default.createElement("div", { className: cx('AsideNav-tooltip') }, link.label)) : null,
          isActive: (link) => link.open,
          isOpen: (item) => item.children ? item.children.some(item => item.open) : false
      };
      return AsideNav;
  })();
  exports.AsideNav = AsideNav;
  exports.default = theme_1.themeable(AsideNav);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNpZGVOYXYuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Bc2lkZU5hdi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFFMUIsNENBQXdDO0FBQ3hDLG9DQUFpRDtBQThDakQ7SUFBQSxNQUFhLFFBQVMsU0FBUSxlQUFLLENBQUMsU0FBdUM7UUFvQ3pFLFlBQVksS0FBb0I7WUFDOUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztZQUM1QixJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDWCxJQUFJLENBQUMsS0FBSyxHQUFHO2dCQUNYLFdBQVcsRUFBRSxnQkFBTyxDQUNsQixLQUFLLENBQUMsV0FBVyxFQUNqQixDQUFDLElBQWdCLEVBQUUsRUFBRTtvQkFDbkIsTUFBTSxRQUFRLEdBQ1osT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVc7d0JBQ2hDLENBQUMsQ0FBRSxLQUFLLENBQUMsUUFBcUIsQ0FBQyxJQUFJLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO29CQUVsQix1Q0FDSyxJQUFJLEtBQ1AsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUNSLE1BQU0sRUFBRSxRQUFRLEVBQ2hCLElBQUksRUFBRSxRQUFRLElBQUksTUFBTSxDQUFDLElBQXFCLENBQUMsSUFDL0M7Z0JBQ0osQ0FBQyxFQUNELENBQUMsRUFDRCxJQUFJLENBQ0w7YUFDRixDQUFDO1lBRUYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElB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

});
