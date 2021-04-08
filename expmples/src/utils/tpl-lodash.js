amis.define('src/utils/tpl-lodash.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.register = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const template_1 = tslib_1.__importDefault(require("node_modules/lodash/template"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  const imports = {
      default: undefined,
      moment: moment_1.default,
      countDown: (end) => {
          if (!end) {
              return '--';
          }
          let date = new Date(parseInt(end, 10) * 1000);
          let now = Date.now();
          if (date.getTime() < now) {
              return '已结束';
          }
          return Math.ceil((date.getTime() - now) / (1000 * 60 * 60 * 24)) + '天';
      },
      formatDate: (value, format = 'LLL', inputFormat = '') => moment_1.default(value, inputFormat).format(format)
  };
  // 缓存一下提升性能
  const EVAL_CACHE = {};
  function lodashCompile(str, data) {
      try {
          const filters = tpl_builtin_1.getFilters();
          const finnalImports = Object.assign(Object.assign(Object.assign({}, filters), { formatTimeStamp: filters.date, formatNumber: filters.number, defaultValue: filters.defaut }), imports);
          delete finnalImports.default; // default 是个关键字，不能 imports 到 lodash 里面去。
          const fn = EVAL_CACHE[str] ||
              (EVAL_CACHE[str] = template_1.default(str, {
                  imports: finnalImports,
                  variable: 'data'
              }));
          return fn.call(data, data);
      }
      catch (e) {
          return `<span class="text-danger">${e.message}</span>`;
      }
  }
  function register() {
      return {
          name: 'lodash',
          test: (str) => !!~str.indexOf('<%'),
          compile: (str, data) => lodashCompile(str, data)
      };
  }
  exports.register = register;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBsLWxvZGFzaC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy91dGlscy90cGwtbG9kYXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFDQSx1RUFBdUM7QUFDdkMsK0NBQXlDO0FBRXpDLDREQUE0QjtBQUU1QixNQUFNLE9BQU8sR0FBRztJQUNkLE9BQU8sRUFBRSxTQUFTO0lBQ2xCLE1BQU0sRUFBRSxnQkFBTTtJQUNkLFNBQVMsRUFBRSxDQUFDLEdBQVEsRUFBRSxFQUFFO1FBQ3RCLElBQUksQ0FBQyxHQUFHLEVBQUU7WUFDUixPQUFPLElBQUksQ0FBQztTQUNiO1FBRUQsSUFBSSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM5QyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFFckIsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxFQUFFO1lBQ3hCLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztJQUN6RSxDQUFDO0lBQ0QsVUFBVSxFQUFFLENBQUMsS0FBVSxFQUFFLFNBQWlCLEtBQUssRUFBRSxjQUFzQixFQUFFLEVBQUUsRUFBRSxDQUMzRSxnQkFBTSxDQUFDLEtBQUssRUFBRSxXQUFXLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQzVDLENBQUM7QUFFRixXQUFXO0FBQ1gsTUFBTSxVQUFVLEdBQThCLEVBQUUsQ0FBQztBQUVqRCxTQUFTLGFBQWEsQ0FBQyxHQUFXLEVBQUUsSUFBWTtJQUM5QyxJQUFJO1FBQ0YsTUFBTSxPQUFPLEdBQUcsd0JBQVUsRUFBRSxDQUFDO1FBQzdCLE1BQU0sYUFBYSxpREFDZCxPQUFPLEtBQ1YsZUFBZSxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQzdCLFlBQVksRUFBRSxPQUFPLENBQUMsTUFBTSxFQUM1QixZQUFZLEVBQUUsT0FBTyxDQUFDLE1BQU0sS0FDekIsT0FBTyxDQUNYLENBQUM7UUFDRixPQUFPLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyx5Q0FBeUM7UUFDdkUsTUFBTSxFQUFFLEdBQ04sVUFBVSxDQUFDLEdBQUcsQ0FBQztZQUNmLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxHQUFHLGtCQUFRLENBQUMsR0FBRyxFQUFFO2dCQUMvQixPQUFPLEVBQUUsYUFBYTtnQkFDdEIsUUFBUSxFQUFFLE1BQU07YUFDakIsQ0FBQyxDQUFDLENBQUM7UUFFTixPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDO0tBQzVCO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixPQUFPLDZCQUE2QixDQUFDLENBQUMsT0FBTyxTQUFTLENBQUM7S0FDeEQ7QUFDSCxDQUFDO0FBRUQsU0FBZ0IsUUFBUTtJQUN0QixPQUFPO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxJQUFJLEVBQUUsQ0FBQyxHQUFXLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO1FBQzNDLE9BQU8sRUFBRSxDQUFDLEdBQVcsRUFBRSxJQUFZLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDO0tBQ2pFLENBQUM7QUFDSixDQUFDO0FBTkQsNEJBTUMifQ==

});
