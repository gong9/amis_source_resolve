amis.define('src/components/Layout.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Layout
   * @description 页面布局，支持左边栏、顶部、内容区域布局。
   * @author fex
   *
   * @param 参数说明：
   * * children 会渲染在内容区。
   * * header 头部区域
   * * aside 边栏
   * * asideClassName 边栏附加样式class
   * * footer 页脚
   * * folder 是否收起边栏
   * * asideFixed 边栏是否为固定模式，如果是会用 position:fixed 来定位.
   * * className 附件的样式名
   * * contentClassName 内容区域附加样式名称
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Layout = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  function Layout({ header, headerClassName, aside, asideClassName, children, className, contentClassName, folded, asideFixed, headerFixed, footer, offScreen, size, boxed, classnames: cx, bodyClassName }) {
      let body = (react_1.default.createElement("div", { className: cx(`Layout-body`, contentClassName) }, children));
      if (aside) {
          body = (react_1.default.createElement("div", { className: cx('Layout-content'), role: "main" }, body));
      }
      react_1.default.useEffect(() => {
          bodyClassName && document.body.classList.add(bodyClassName);
          return () => {
              bodyClassName && document.body.classList.remove(bodyClassName);
          };
      }, [bodyClassName]);
      return (react_1.default.createElement("div", { className: cx(`Layout`, className, {
              'Layout--boxed': boxed,
              'Layout--withAside': !!aside,
              'Layout--headerFixed': header ? headerFixed : false,
              'Layout--asideFixed': aside ? asideFixed : false,
              'Layout--folded': folded,
              'Layout--offScreen': offScreen,
              [`Layout--${size}`]: size,
              'Layout--noFooter': !footer
          }) },
          header ? (react_1.default.createElement("div", { className: cx('Layout-header', headerClassName) }, header)) : null,
          aside ? (react_1.default.createElement("div", { className: cx(`Layout-aside`, asideClassName) },
              react_1.default.createElement("div", { className: cx('Layout-asideWrap') },
                  react_1.default.createElement("div", { id: "asideInner", className: cx('Layout-asideInner') }, aside)))) : null,
          body,
          footer ? (react_1.default.createElement("footer", { className: cx('Layout-footer'), role: "footer" }, footer)) : null));
  }
  exports.Layout = Layout;
  Layout.defaultProps = {
      // asideWide: false,
      asideFixed: true,
      asideClassName: '',
      headerFixed: true,
      offScreen: false,
      footer: false
  };
  exports.default = theme_1.themeable(Layout);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGF5b3V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvTGF5b3V0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9DQUFpRDtBQXNCakQsU0FBZ0IsTUFBTSxDQUFDLEVBQ3JCLE1BQU0sRUFDTixlQUFlLEVBQ2YsS0FBSyxFQUNMLGNBQWMsRUFDZCxRQUFRLEVBQ1IsU0FBUyxFQUNULGdCQUFnQixFQUNoQixNQUFNLEVBQ04sVUFBVSxFQUNWLFdBQVcsRUFDWCxNQUFNLEVBQ04sU0FBUyxFQUNULElBQUksRUFDSixLQUFLLEVBQ0wsVUFBVSxFQUFFLEVBQUUsRUFDZCxhQUFhLEVBQ0Q7SUFDWixJQUFJLElBQUksR0FBRyxDQUNULHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLGdCQUFnQixDQUFDLElBQUcsUUFBUSxDQUFPLENBQ3RFLENBQUM7SUFFRixJQUFJLEtBQUssRUFBRTtRQUNULElBQUksR0FBRyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxJQUFJLEVBQUMsTUFBTSxJQUM5QyxJQUFJLENBQ0QsQ0FDUCxDQUFDO0tBQ0g7SUFFRCxlQUFLLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRTtRQUNuQixhQUFhLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTVELE9BQU8sR0FBRyxFQUFFO1lBQ1YsYUFBYSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNqRSxDQUFDLENBQUM7SUFDSixDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO0lBRXBCLE9BQU8sQ0FDTCx1Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLFFBQVEsRUFBRSxTQUFTLEVBQUU7WUFDakMsZUFBZSxFQUFFLEtBQUs7WUFDdEIsbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLEtBQUs7WUFDNUIscUJBQXFCLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDbkQsb0JBQW9CLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLEtBQUs7WUFDaEQsZ0JBQWdCLEVBQUUsTUFBTTtZQUN4QixtQkFBbUIsRUFBRSxTQUFTO1lBQzlCLENBQUMsV0FBVyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUk7WUFDekIsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNO1NBQzVCLENBQUM7UUFFRCxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ1IsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLEVBQUUsZUFBZSxDQUFDLElBQUcsTUFBTSxDQUFPLENBQ3JFLENBQUMsQ0FBQyxDQUFDLElBQUk7UUFDUCxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1AsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxjQUFjLEVBQUUsY0FBYyxDQUFDO1lBQ2hELHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUM7Z0JBQ3BDLHVDQUFLLEVBQUUsRUFBQyxZQUFZLEVBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxJQUNwRCxLQUFLLENBQ0YsQ0FDRixDQUNGLENBQ1AsQ0FBQyxDQUFDLENBQUMsSUFBSTtRQUNQLElBQUk7UUFDSixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ1IsMENBQVEsU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUMsUUFBUSxJQUNsRCxNQUFNLENBQ0EsQ0FDVixDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO0FBQ0osQ0FBQztBQXZFRCx3QkF1RUM7QUFFRCxNQUFNLENBQUMsWUFBWSxHQUFHO0lBQ3BCLG9CQUFvQjtJQUNwQixVQUFVLEVBQUUsSUFBSTtJQUNoQixjQUFjLEVBQUUsRUFBRTtJQUNsQixXQUFXLEVBQUUsSUFBSTtJQUNqQixTQUFTLEVBQUUsS0FBSztJQUNoQixNQUFNLEVBQUUsS0FBSztDQUNkLENBQUM7QUFFRixrQkFBZSxpQkFBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDIn0=

});
