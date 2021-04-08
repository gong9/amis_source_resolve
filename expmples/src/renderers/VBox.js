amis.define('src/renderers/VBox.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.VBoxRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  let VBox = /** @class */ (() => {
      class VBox extends react_1.default.Component {
          renderChild(region, node) {
              const { render } = this.props;
              return render(region, node);
          }
          renderCell(row, key) {
              const { classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Vbox-cell`, row.cellClassName) }, this.renderChild(`row/${key}`, row)));
          }
          render() {
              const { className, rows, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Vbox`, className) }, Array.isArray(rows)
                  ? rows.map((row, key) => (react_1.default.createElement("div", { className: classnames_1.default('row-row', row.rowClassName), key: key }, this.renderCell(row, key))))
                  : null));
          }
      }
      VBox.propsList = ['rows'];
      VBox.defaultProps = {};
      return VBox;
  })();
  exports.default = VBox;
  let VBoxRenderer = /** @class */ (() => {
      let VBoxRenderer = class VBoxRenderer extends VBox {
      };
      VBoxRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)vbox$/,
              name: 'vbox'
          })
      ], VBoxRenderer);
      return VBoxRenderer;
  })();
  exports.VBoxRenderer = VBoxRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVkJveC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvVkJveC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsb0VBQTRCO0FBeUI1QjtJQUFBLE1BQXFCLElBQUssU0FBUSxlQUFLLENBQUMsU0FBNEI7UUFLbEUsV0FBVyxDQUFDLE1BQWMsRUFBRSxJQUFZO1lBQ3RDLE1BQU0sRUFBQyxNQUFNLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTVCLE9BQU8sTUFBTSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRUQsVUFBVSxDQUFDLEdBQVksRUFBRSxHQUFRO1lBQy9CLE1BQU0sRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyQyxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLG9CQUFFLENBQUMsR0FBRyxFQUFFLFdBQVcsRUFBRyxHQUFlLENBQUMsYUFBYSxDQUFDLElBQ2pFLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxHQUFHLEVBQUUsRUFBRSxHQUFHLENBQUMsQ0FDaEMsQ0FDUCxDQUFDO1FBQ0osQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQUMsU0FBUyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV0RCxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLG9CQUFFLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUMsSUFDdkMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2xCLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLENBQUMsQ0FDckIsdUNBQ0UsU0FBUyxFQUFFLG9CQUFFLENBQUMsU0FBUyxFQUFHLEdBQWUsQ0FBQyxZQUFZLENBQUMsRUFDdkQsR0FBRyxFQUFFLEdBQUcsSUFFUCxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FDdEIsQ0FDUCxDQUFDO2dCQUNKLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFwQ00sY0FBUyxHQUFrQixDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBRXBDLGlCQUFZLEdBQXVCLEVBQUUsQ0FBQztJQW1DL0MsV0FBQztLQUFBO2tCQXRDb0IsSUFBSTtBQTRDekI7SUFBQSxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFhLFNBQVEsSUFBSTtLQUFHLENBQUE7SUFBNUIsWUFBWTtRQUp4QixrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLGFBQWE7WUFDbkIsSUFBSSxFQUFFLE1BQU07U0FDYixDQUFDO09BQ1csWUFBWSxDQUFnQjtJQUFELG1CQUFDO0tBQUE7QUFBNUIsb0NBQVkifQ==

});
