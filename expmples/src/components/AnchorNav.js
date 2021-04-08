amis.define('src/components/AnchorNav.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file AnchorNav
   * @description 锚点导航
   * @author hsm-lv
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AnchorNav = exports.AnchorNavSection = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const lodash_1 = require("node_modules/lodash/lodash");
  class AnchorNavSectionComponent extends react_1.default.PureComponent {
      constructor() {
          super(...arguments);
          this.contentRef = (ref) => (this.contentDom = ref);
      }
      render() {
          const { classnames: cx, children, className } = this.props;
          return (react_1.default.createElement("div", { ref: this.contentRef, className: cx('AnchorNav-section', className) }, children));
      }
  }
  exports.AnchorNavSection = theme_1.themeable(AnchorNavSectionComponent);
  let AnchorNav = /** @class */ (() => {
      var _a;
      class AnchorNav extends react_1.default.Component {
          constructor() {
              super(...arguments);
              // 滚动区域DOM
              this.contentDom = react_1.default.createRef();
          }
          componentDidMount() {
              // 初始化滚动标识
              this.setState({ fromSelect: false });
              // add scroll event
              const sectionRootDom = this.contentDom && this.contentDom.current;
              sectionRootDom.addEventListener('scroll', this.scrollToNav);
              let offsetArr = [];
              const { children, active } = this.props;
              // 收集段落区域offsetTop
              children &&
                  react_1.default.Children.forEach(children, (section, index) => {
                      offsetArr.push({
                          key: section.props.name,
                          offsetTop: sectionRootDom.children[index].offsetTop
                      });
                  });
              this.setState({
                  offsetArr
              }, () => active && this.scrollToSection(active));
          }
          scrollToNav(e) {
              if (this.state.fromSelect) {
                  return;
              }
              // 获取滚动的scrollTop
              const scrollTop = e.target.scrollTop;
              // 判断scrollTop所在区域
              const offsetArr = this.state.offsetArr;
              const firstSection = offsetArr[0];
              const lastSection = offsetArr[offsetArr.length - 1];
              // 首层偏移
              const offset = scrollTop + firstSection.offsetTop;
              // 首层
              if (offset <= firstSection.offsetTop) {
                  this.fireSelect(firstSection.key);
              }
              // 最后一层
              else if (offset >= lastSection.offsetTop) {
                  this.fireSelect(lastSection.key);
              }
              else {
                  // 段落区间判断
                  offsetArr.forEach((item, index) => {
                      if (offset >= item.offsetTop &&
                          offset < offsetArr[index + 1].offsetTop) {
                          this.fireSelect(item.key);
                      }
                  });
              }
          }
          scrollToSection(key) {
              // 获取指定段落的offsettop
              const offsetArr = this.state.offsetArr;
              const section = lodash_1.find(offsetArr, item => item.key === key);
              const sectionRootDom = this.contentDom && this.contentDom.current;
              // 滚动到指定段落
              section &&
                  (sectionRootDom.scrollTop = section.offsetTop - offsetArr[0].offsetTop);
          }
          handleSelect(key) {
              // 标记滚动来自导航选择
              this.setState({ fromSelect: true });
              // 滚动到对应段落
              this.scrollToSection(key);
              const sectionRootDom = this.contentDom && this.contentDom.current;
              // 如果已经滚到底就不去更新导航选中了
              if (sectionRootDom.scrollHeight - sectionRootDom.scrollTop <
                  sectionRootDom.clientHeight) {
                  // fire event
                  this.fireSelect(key);
              }
              // 取消标记
              this.setState({ fromSelect: false });
          }
          fireSelect(key) {
              const { onSelect } = this.props;
              onSelect && onSelect(key);
          }
          renderLink(link, index) {
              if (!link) {
                  return;
              }
              const { classnames: cx, active: activeProp } = this.props;
              const { title, name } = link.props;
              const active = activeProp === undefined && index === 0 ? name : activeProp;
              return (react_1.default.createElement("li", { className: cx('AnchorNav-link', active === name ? 'is-active' : ''), key: index, onClick: () => this.handleSelect(name) },
                  react_1.default.createElement("a", null, title)));
          }
          renderSection(section, index) {
              if (!section) {
                  return;
              }
              const { active: activeProp, classnames } = this.props;
              const name = section.props.name;
              const active = activeProp === undefined && index === 0 ? name : activeProp;
              return react_1.default.cloneElement(section, Object.assign(Object.assign({}, section.props), { key: index, classnames,
                  active }));
          }
          render() {
              const { classnames: cx, className, linkClassName, sectionClassName, children } = this.props;
              if (!Array.isArray(children)) {
                  return null;
              }
              return (react_1.default.createElement("div", { className: cx(`AnchorNav`, className) },
                  react_1.default.createElement("ul", { className: cx('AnchorNav-link-wrap', linkClassName), role: "anchorlist" }, children.map((link, index) => this.renderLink(link, index))),
                  react_1.default.createElement("div", { className: cx('AnchorNav-section-wrap', sectionClassName), ref: this.contentDom }, children.map((section, index) => {
                      return this.renderSection(section, index);
                  }))));
          }
      }
      AnchorNav.defaultProps = {
          linkClassName: '',
          sectionClassName: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Event !== "undefined" && Event) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], AnchorNav.prototype, "scrollToNav", null);
      return AnchorNav;
  })();
  exports.AnchorNav = AnchorNav;
  const ThemedAnchorNav = theme_1.themeable(uncontrollable_1.uncontrollable(AnchorNav, {
      active: 'onSelect'
  }));
  exports.default = ThemedAnchorNav;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQW5jaG9yTmF2LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvQW5jaG9yTmF2LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUUxQixvQ0FBK0M7QUFFL0MsNENBQXlDO0FBQ3pDLG1EQUE4QztBQUM5QyxtQ0FBNEI7QUFTNUIsTUFBTSx5QkFBMEIsU0FBUSxlQUFLLENBQUMsYUFBb0M7SUFBbEY7O1FBRUUsZUFBVSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsR0FBRyxDQUFDLENBQUM7SUFXckQsQ0FBQztJQVRDLE1BQU07UUFDSixNQUFNLEVBQUMsVUFBVSxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6RCxPQUFPLENBQ0wsdUNBQUssR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQUUsU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxTQUFTLENBQUMsSUFDckUsUUFBUSxDQUNMLENBQ1AsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQUVZLFFBQUEsZ0JBQWdCLEdBQUcsaUJBQVMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO0FBbUJyRTs7SUFBQSxNQUFhLFNBQVUsU0FBUSxlQUFLLENBQUMsU0FBeUM7UUFBOUU7O1lBU0UsVUFBVTtZQUNWLGVBQVUsR0FBb0MsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBa0xsRSxDQUFDO1FBaExDLGlCQUFpQjtZQUNmLFdBQVc7WUFDWCxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUMsVUFBVSxFQUFFLEtBQUssRUFBQyxDQUFDLENBQUM7WUFFbkMsbUJBQW1CO1lBQ25CLE1BQU0sY0FBYyxHQUNsQixJQUFJLENBQUMsVUFB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

});
