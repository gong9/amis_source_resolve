amis.define('src/renderers/Collapse.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CollapseRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Collapse_1 = require("src/components/Collapse.tsx");
  let Collapse = /** @class */ (() => {
      class Collapse extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  collapsed: false
              };
              this.toggleCollapsed = this.toggleCollapsed.bind(this);
              this.state.collapsed = !!props.collapsed;
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.collapsed !== nextProps.collapsed) {
                  this.setState({
                      collapsed: !!nextProps.collapsed
                  });
              }
          }
          toggleCollapsed() {
              this.props.collapsable !== false &&
                  this.setState({
                      collapsed: !this.state.collapsed
                  });
          }
          render() {
              const { classPrefix: ns, classnames: cx, size, wrapperComponent: WrapperComponent, headingComponent: HeadingComponent, className, headingClassName, children, titlePosition, title, collapseTitle, body, bodyClassName, render, collapsable, translate: __, mountOnEnter, unmountOnExit } = this.props;
              // 默认给个 title，不然没法点
              const finalTitle = this.state.collapsed ? title : collapseTitle || title;
              let dom = [
                  finalTitle ? (react_1.default.createElement(HeadingComponent, { key: "title", onClick: this.toggleCollapsed, className: cx(`Collapse-header`, headingClassName) },
                      render('heading', finalTitle),
                      collapsable && react_1.default.createElement("span", { className: cx('Collapse-arrow') }))) : null,
                  react_1.default.createElement(Collapse_1.Collapse, { show: collapsable ? !this.state.collapsed : true, classnames: cx, classPrefix: ns, key: "body", mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit },
                      react_1.default.createElement("div", { className: cx(`Collapse-body`, bodyClassName) }, children
                          ? typeof children === 'function'
                              ? children(this.props)
                              : children
                          : body
                              ? render('body', body)
                              : null))
              ];
              if (titlePosition === 'bottom') {
                  dom.reverse();
              }
              return (react_1.default.createElement(WrapperComponent, { className: cx(`Collapse`, {
                      'is-collapsed': this.state.collapsed,
                      [`Collapse--${size}`]: size,
                      'Collapse--collapsable': collapsable,
                      'Collapse--title-bottom': titlePosition === 'bottom'
                  }, className) }, dom));
          }
      }
      Collapse.propsList = [
          'wrapperComponent',
          'headingComponent',
          'bodyClassName',
          'collapsed',
          'headingClassName',
          'title',
          'mountOnEnter',
          'unmountOnExit'
      ];
      Collapse.defaultProps = {
          titlePosition: 'top',
          wrapperComponent: 'div',
          headingComponent: 'h4',
          className: '',
          headingClassName: '',
          bodyClassName: '',
          collapsable: true
      };
      return Collapse;
  })();
  exports.default = Collapse;
  let CollapseRenderer = /** @class */ (() => {
      let CollapseRenderer = class CollapseRenderer extends Collapse {
      };
      CollapseRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)collapse$/,
              name: 'collapse'
          })
      ], CollapseRenderer);
      return CollapseRenderer;
  })();
  exports.CollapseRenderer = CollapseRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0NvbGxhcHNlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUNuRCxxREFBaUU7QUF3RmpFO0lBQUEsTUFBcUIsUUFBUyxTQUFRLGVBQUssQ0FBQyxTQUczQztRQTBCQyxZQUFZLEtBQW9CO1lBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUxmLFVBQUssR0FBRztnQkFDTixTQUFTLEVBQUUsS0FBSzthQUNqQixDQUFDO1lBS0EsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQztRQUMzQyxDQUFDO1FBRUQseUJBQXlCLENBQUMsU0FBd0I7WUFDaEQsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV6QixJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssU0FBUyxDQUFDLFNBQVMsRUFBRTtnQkFDM0MsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTO2lCQUNqQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFFRCxlQUFlO1lBQ2IsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLEtBQUssS0FBSztnQkFDOUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztvQkFDWixTQUFTLEVBQUUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7aUJBQ2pDLENBQUMsQ0FBQztRQUNQLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxFQUNKLFdBQVcsRUFBRSxFQUFFLEVBQ2YsVUFB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

});
