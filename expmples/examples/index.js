amis.define('examples/index.jsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.bootstrap = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file entry of this example.
   * @author liaoxuezhi@cloud.com
   */
  require("examples/polyfills/index.ts");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  // import App from './components/App';
  const factory_tsx_1 = require("src/factory.tsx");
  const App = () => {
      return factory_tsx_1.render({
          type: 'page',
          body: 'test'
      });
  };
  function bootstrap(mountTo, initalState) {
      react_dom_1.render(react_1.default.createElement(App, null), mountTo);
  }
  exports.bootstrap = bootstrap;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9leGFtcGxlcy9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBOzs7R0FHRztBQUNILDZCQUEyQjtBQUMzQiwwREFBMEI7QUFDMUIseUNBQW1DO0FBQ25DLHNDQUFzQztBQUN0QyxvREFBeUQ7QUFFekQsTUFBTSxHQUFHLEdBQUcsR0FBRyxFQUFFO0lBQ2YsT0FBTyxvQkFBVSxDQUFDO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07S0FDYixDQUFDLENBQUE7QUFDSixDQUFDLENBQUE7QUFDRCxTQUFnQixTQUFTLENBQUMsT0FBTyxFQUFFLFdBQVc7SUFDNUMsa0JBQU0sQ0FBQyw4QkFBQyxHQUFHLE9BQUcsRUFBRSxPQUFPLENBQUMsQ0FBQztBQUMzQixDQUFDO0FBRkQsOEJBRUMifQ==

});
