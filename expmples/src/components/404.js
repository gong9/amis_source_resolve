amis.define('src/components/404.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 404
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.NotFound = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  class NotFound extends react_1.default.Component {
      render() {
          const { links, footerText, description, children, code } = this.props;
          return (react_1.default.createElement("div", { className: "container w-xxl w-auto-xs" },
              react_1.default.createElement("div", { className: "text-center m-b-lg" },
                  react_1.default.createElement("h1", { className: "text-shadow text-white" }, code || '404'),
                  description ? (react_1.default.createElement("div", { className: "text-danger" }, description)) : null),
              children,
              links ? (react_1.default.createElement("div", { className: "list-group bg-info auto m-b-sm m-b-lg" }, links)) : null,
              footerText ? (react_1.default.createElement("div", { className: "text-center" },
                  react_1.default.createElement("p", null,
                      react_1.default.createElement("small", { className: "text-muted" }, footerText)))) : null));
      }
  }
  exports.NotFound = NotFound;
  exports.default = theme_1.themeable(NotFound);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNDA0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvNDA0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9DQUFpRDtBQVdqRCxNQUFhLFFBQVMsU0FBUSxlQUFLLENBQUMsU0FBNkI7SUFDL0QsTUFBTTtRQUNKLE1BQU0sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVwRSxPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFDLDJCQUEyQjtZQUN4Qyx1Q0FBSyxTQUFTLEVBQUMsb0JBQW9CO2dCQUNqQyxzQ0FBSSxTQUFTLEVBQUMsd0JBQXdCLElBQUUsSUFBSSxJQUFJLEtBQUssQ0FBTTtnQkFDMUQsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUNiLHVDQUFLLFNBQVMsRUFBQyxhQUFhLElBQUUsV0FBVyxDQUFPLENBQ2pELENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDSjtZQUVMLFFBQVE7WUFFUixLQUFLLENBQUMsQ0FBQyxDQUFDLENBQ1AsdUNBQUssU0FBUyxFQUFDLHVDQUF1QyxJQUFFLEtBQUssQ0FBTyxDQUNyRSxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBRVAsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUNaLHVDQUFLLFNBQVMsRUFBQyxhQUFhO2dCQUMxQjtvQkFDRSx5Q0FBTyxTQUFTLEVBQUMsWUFBWSxJQUFFLFVBQVUsQ0FBUyxDQUNoRCxDQUNBLENBQ1AsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUNKLENBQ1AsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQTdCRCw0QkE2QkM7QUFFRCxrQkFBZSxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDIn0=

});
