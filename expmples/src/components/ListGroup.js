amis.define('src/components/ListGroup.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListGroup = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  let ListGroup = /** @class */ (() => {
      class ListGroup extends react_1.default.Component {
          render() {
              const _a = this.props, { classnames: cx, className, expand, placeholder, items, children, itemClassName, itemRender, getItemProps, classPrefix } = _a, rest = tslib_1.__rest(_a, ["classnames", "className", "expand", "placeholder", "items", "children", "itemClassName", "itemRender", "getItemProps", "classPrefix"]);
              return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx('ListGroup', className, expand ? 'ListGroup--expanded' : '') }),
                  Array.isArray(items) && items.length ? (items.map((item, index) => {
                      const itemProps = (getItemProps === null || getItemProps === void 0 ? void 0 : getItemProps({ item, index })) || {};
                      return (react_1.default.createElement("div", Object.assign({ key: index }, itemProps, { className: cx('ListGroup-item', itemClassName, itemProps.className) }), itemRender(item, index)));
                  })) : placeholder ? (react_1.default.createElement("div", { className: cx('Placeholder ListGroup-placeholder') })) : null,
                  children));
          }
      }
      ListGroup.defaultProps = {
          itemRender: (item) => react_1.default.createElement(react_1.default.Fragment, null, `${item}`)
      };
      return ListGroup;
  })();
  exports.ListGroup = ListGroup;
  exports.default = theme_1.themeable(ListGroup);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdEdyb3VwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvTGlzdEdyb3VwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsb0NBQStDO0FBQy9DLDBEQUEwQjtBQWExQjtJQUFBLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUF5QjtRQUs1RCxNQUFNO1lBQ0osTUFBTSxLQVlGLElBQUksQ0FBQyxLQUFLLEVBWlIsRUFDSixVQUFVLEVBQUUsRUFBRSxFQUNkLFNBQVMsRUFDVCxNQUFNLEVBQ04sV0FBVyxFQUNYLEtBQUssRUFDTCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFVBQVUsRUFDVixZQUFZLEVBQ1osV0FBVyxPQUVDLEVBRFQsSUFBSSxzQkFYSCx1SUFZTCxDQUFhLENBQUM7WUFFZixPQUFPLENBQ0wsdURBQ00sSUFBSSxJQUNSLFNBQVMsRUFBRSxFQUFFLENBQ1gsV0FBVyxFQUNYLFNBQVMsRUFDVCxNQUFNLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQ3BDO2dCQUVBLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FDdEMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQVMsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDN0IsTUFBTSxTQUFTLEdBQUcsQ0FBQSxZQUFZLGFBQVosWUFBWSx1QkFBWixZQUFZLENBQUcsRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLE1BQUssRUFBRSxDQUFDO29CQUV0RCxPQUFPLENBQ0wscURBQ0UsR0FBRyxFQUFFLEtBQUssSUFDTixTQUFTLElBQ2IsU0FBUyxFQUFFLEVBQUUsQ0FDWCxnQkFBZ0IsRUFDaEIsYUFBYSxFQUNiLFNBQVMsQ0FBQyxTQUFTLENBQ3BCLEtBRUEsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FDcEIsQ0FDUCxDQUFDO2dCQUNKLENBQUMsQ0FBQyxDQUNILENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FDaEIsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxtQ0FBbUMsQ0FBQyxHQUFRLENBQ2hFLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBRVAsUUFBUSxDQUNMLENBQ1AsQ0FBQztRQUNKLENBQUM7O0lBckRNLHNCQUFZLEdBQUc7UUFDcEIsVUFBVSxFQUFFLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FBQyw4REFBRyxHQUFHLElBQUksRUFBRSxDQUFJO0tBQzVDLENBQUM7SUFvREosZ0JBQUM7S0FBQTtBQXZEWSw4QkFBUztBQXlEdEIsa0JBQWUsaUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyJ9

});
