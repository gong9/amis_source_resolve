amis.define('src/renderers/Nav.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NavigationRenderer = exports.Navigation = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const tpl_1 = require("src/utils/tpl.ts");
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const api_1 = require("src/utils/api.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const icon_1 = require("src/utils/icon.tsx");
  let Navigation = /** @class */ (() => {
      class Navigation extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.mounted = true;
              this.renderItem = this.renderItem.bind(this);
              this.state = {
                  links: this.syncLinks(props, (props.source &&
                      typeof props.source === 'string' &&
                      tpl_builtin_1.isPureVariable(props.source) &&
                      tpl_builtin_1.resolveVariable(props.source, props.data)) ||
                      props.links)
              };
          }
          componentDidMount() {
              const { source } = this.props;
              if (source && !tpl_builtin_1.isPureVariable(source)) {
                  this.reload();
              }
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (nextProps.source && tpl_builtin_1.isPureVariable(nextProps.source)) {
                  if (nextProps.source !== props.source) {
                      this.setState({
                          links: this.syncLinks(nextProps)
                      });
                  }
                  else {
                      const links = tpl_builtin_1.resolveVariable(nextProps.source, nextProps.data);
                      const prevLinks = tpl_builtin_1.resolveVariable(props.source, props.data);
                      if (links !== prevLinks) {
                          this.setState({
                              links: this.syncLinks(nextProps, links)
                          });
                      }
                  }
              }
              else if (props.links !== nextProps.links) {
                  this.setState({
                      links: this.syncLinks(nextProps)
                  });
              }
              else if (nextProps.location && props.location !== nextProps.location) {
                  this.setState({
                      links: this.syncLinks(nextProps, this.state.links, true)
                  });
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (props.source && !tpl_builtin_1.isPureVariable(props.source)) {
                  api_1.isApiOutdated(prevProps.source, props.source, prevProps.data, props.data) && this.reload();
              }
          }
          componentWillUnmount() {
              this.mounted = false;
          }
          reload(target, query, values) {
              if (query) {
                  return this.receive(query);
              }
              const { data, env, source, translate: __ } = this.props;
              const finalData = values ? helper_1.createObject(data, values) : data;
              if (!api_1.isEffectiveApi(source, data)) {
                  return;
              }
              env
                  .fetcher(source, finalData)
                  .then(payload => {
                  if (!this.mounted) {
                      return;
                  }
                  if (!payload.ok) {
                      this.setState({
                          error: payload.msg || __('Nav.sourceError')
                      });
                  }
                  else {
                      const links = Array.isArray(payload.data)
                          ? payload.data
                          : payload.data.links ||
                              payload.data.options ||
                              payload.data.items ||
                              payload.data.rows;
                      if (!Array.isArray(links)) {
                          throw new Error('payload.data.options is not array.');
                      }
                      this.setState({
                          links: this.syncLinks(this.props, links)
                      }, () => {
                          if (payload.data &&
                              payload.data.value &&
                              !helper_1.someTree(this.state.links, (item) => item.active)) {
                              env.jumpTo(tpl_1.filter(payload.data.value, data));
                          }
                      });
                  }
              })
                  .catch(e => this.mounted &&
                  this.setState({
                      error: e.message
                  }));
          }
          receive(values) {
              const { store, initApi } = this.props;
              this.reload(undefined, undefined, values);
          }
          syncLinks(props, links = props.links, clearActive) {
              const { data, env } = props;
              if (!Array.isArray(links) || !links.length) {
                  return [];
              }
              return helper_1.mapTree(links, (link) => {
                  return Object.assign(Object.assign(Object.assign({}, link), filter_schema_1.default(link, data)), { active: (!clearActive && link.active) ||
                          (link.activeOn
                              ? tpl_1.evalExpression(link.activeOn, data)
                              : !!(link.hasOwnProperty('to') &&
                                  env &&
                                  env.isCurrentUrl(tpl_1.filter(link.to, data)))), unfolded: link.unfolded ||
                          (link.children && link.children.some(link => !!link.active)) });
              }, 1, true);
          }
          handleClick(link) {
              const { env, data, onSelect } = this.props;
              if (onSelect && onSelect(link) === false) {
                  return;
              }
              if (!link.to) {
                  link.children && link.children.length && this.toggleLink(link);
                  return;
              }
              env && env.jumpTo(tpl_1.filter(link.to, data), link);
          }
          toggleLink(target) {
              this.setState({
                  links: helper_1.mapTree(this.state.links, (link) => target === link
                      ? Object.assign(Object.assign({}, link), { unfolded: !link.unfolded }) : link)
              });
          }
          renderItem(link, index) {
              if (link.hidden === true || link.visible === false) {
                  return null;
              }
              const isActive = !!link.active;
              const { disabled, togglerClassName, classnames: cx } = this.props;
              return (react_1.default.createElement("li", { key: index, className: cx('Nav-item', link.className, {
                      'is-disabled': disabled || link.disabled,
                      'is-active': isActive,
                      'is-unfolded': link.unfolded
                  }) },
                  react_1.default.createElement("a", { onClick: this.handleClick.bind(this, link) },
                      icon_1.generateIcon(cx, link.icon, 'Nav-itemIcon'),
                      link.label),
                  link.children && link.children.length ? (react_1.default.createElement("span", { onClick: () => this.toggleLink(link), className: cx('Nav-itemToggler', togglerClassName) },
                      react_1.default.createElement(icons_1.Icon, { icon: "caret", className: "icon" }))) : null,
                  link.children && link.children.length ? (react_1.default.createElement("ul", { className: cx('Nav-subItems') }, link.children.map((link, index) => this.renderItem(link, index)))) : null));
          }
          render() {
              const { className, stacked, classnames: cx } = this.props;
              const links = this.state.links;
              return (react_1.default.createElement("ul", { className: cx('Nav', className, stacked ? 'Nav--stacked' : 'Nav--tabs') }, links.map(this.renderItem)));
          }
      }
      Navigation.defaultProps = {};
      return Navigation;
  })();
  exports.Navigation = Navigation;
  exports.default = theme_1.themeable(Navigation);
  let NavigationRenderer = /** @class */ (() => {
      let NavigationRenderer = class NavigationRenderer extends Navigation {
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
      NavigationRenderer.contextType = Scoped_1.ScopedContext;
      NavigationRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:nav|navigation)$/,
              name: 'nav'
          })
      ], NavigationRenderer);
      return NavigationRenderer;
  })();
  exports.NavigationRenderer = NavigationRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9OYXYudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsd0NBQW1EO0FBR25ELG1GQUF1RDtBQUN2RCxzQ0FBb0Q7QUFDcEQsNENBQWdFO0FBQ2hFLHNEQUFxRTtBQUNyRSxzQ0FBMkQ7QUFDM0Qsc0NBQXdEO0FBRXhELG9DQUE2RDtBQUM3RCwrQ0FBeUM7QUFFekMsd0NBQTJDO0FBcUUzQztJQUFBLE1BQWEsVUFBVyxTQUFRLGVBQUssQ0FBQyxTQUdyQztRQUlDLFlBQVksS0FBc0I7WUFDaEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRmYsWUFBTyxHQUFZLElBQUksQ0FBQztZQUl0QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRTdDLElBQUksQ0FBQyxLQUFLLEdBQUc7Z0JBQ1gsS0FBSyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQ25CLEtBQUssRUFDTCxDQUFDLEtBQUssQ0FBQyxNQUFNO29CQUNYLE9BQU8sS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRO29CQUNoQyw0QkFBYyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUM7b0JBQzVCLDZCQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzFDLEtBQUssQ0FBQyxLQUFLLENBQ2Q7YUFDRixDQUFDO1FBQ0osQ0FBQztRQUVELGlCQUFpQjtZQUNmLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTVCLElBQUksTUFBTSxJQUFJLENBQUMsNEJBQWMsQ0FBQyxNQUFnQixDQUFDLEVBQUU7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEVBQUUs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

});
