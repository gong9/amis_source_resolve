amis.define('src/renderers/Chart.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ChartRenderer = exports.Chart = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const service_1 = require("src/store/service.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const api_1 = require("src/utils/api.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const EVAL_CACHE = {};
  /**
   * ECharts 中有些配置项可以写函数，但 JSON 中无法支持，为了实现这个功能，需要将看起来像函数的字符串转成函数类型
   * 目前 ECharts 中可能有函数的配置项有如下：interval、formatter、color、min、max、labelFormatter、pageFormatter、optionToContent、contentToOption、animationDelay、animationDurationUpdate、animationDelayUpdate、animationDuration、position、sort
   * 其中用得最多的是 formatter、sort，所以目前先只支持它们
   * @param config ECharts 配置
   */
  function recoverFunctionType(config) {
      ['formatter', 'sort', 'renderItem'].forEach((key) => {
          const objects = helper_1.findObjectsWithKey(config, key);
          for (const object of objects) {
              const code = object[key];
              if (typeof code === 'string' && code.trim().startsWith('function')) {
                  try {
                      if (!(code in EVAL_CACHE)) {
                          EVAL_CACHE[code] = eval('(' + code + ')');
                      }
                      object[key] = EVAL_CACHE[code];
                  }
                  catch (e) {
                      console.warn(code, e);
                  }
              }
          }
      });
  }
  let Chart = /** @class */ (() => {
      class Chart extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.refFn = this.refFn.bind(this);
              this.reload = this.reload.bind(this);
              this.handleClick = this.handleClick.bind(this);
          }
          componentWillMount() {
              const { config, api, data, initFetch, source } = this.props;
              this.mounted = true;
              if (source && tpl_builtin_1.isPureVariable(source)) {
                  const ret = tpl_builtin_1.resolveVariableAndFilter(source, data, '| raw');
                  ret && this.renderChart(ret);
              }
              else if (api && initFetch !== false) {
                  this.reload();
              }
              config && this.renderChart(config);
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (api_1.isApiOutdated(prevProps.api, props.api, prevProps.data, props.data)) {
                  this.reload();
              }
              else if (props.source && tpl_builtin_1.isPureVariable(props.source)) {
                  const prevRet = prevProps.source
                      ? tpl_builtin_1.resolveVariableAndFilter(prevProps.source, prevProps.data, '| raw')
                      : null;
                  const ret = tpl_builtin_1.resolveVariableAndFilter(props.source, props.data, '| raw');
                  if (prevRet !== ret) {
                      this.renderChart(ret || {});
                  }
              }
              else if (props.config !== prevProps.config) {
                  this.renderChart(props.config || {});
              }
              else if (props.config &&
                  props.trackExpression &&
                  tpl_1.filter(props.trackExpression, props.data) !==
                      tpl_1.filter(prevProps.trackExpression, prevProps.data)) {
                  this.renderChart(props.config || {});
              }
          }
          componentWillUnmount() {
              this.mounted = false;
              clearTimeout(this.timer);
          }
          handleClick(ctx) {
              const { onAction, clickAction, data } = this.props;
              clickAction &&
                  onAction &&
                  onAction(null, clickAction, helper_1.createObject(data, ctx));
          }
          refFn(ref) {
              const chartRef = this.props.chartRef;
              const { chartTheme, onChartWillMount, onChartUnMount, env } = this.props;
              let onChartMount = this.props.onChartMount;
              if (ref) {
                  Promise.all([
                      Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/echarts/index'], function(ret) {resolve(tslib_1.__importStar(ret));})})),
                      Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/echarts-stat/index'], function(ret) {resolve(tslib_1.__importStar(ret));})})),
                      Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/echarts/extension/dataTool/index'], function(ret) {resolve(tslib_1.__importStar(ret));})})),
                      Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/echarts/extension/bmap/bmap'], function(ret) {resolve(tslib_1.__importStar(ret));})}))
                  ]).then(async ([echarts, ecStat]) => {
                      window.echarts = echarts;
                      window.ecStat = ecStat;
                      let theme = 'default';
                      if (chartTheme) {
                          echarts.registerTheme('custom', chartTheme);
                          theme = 'custom';
                      }
                      if (onChartWillMount) {
                          await onChartWillMount(echarts);
                      }
                      echarts.registerTransform(ecStat.transform.regression);
                      echarts.registerTransform(ecStat.transform.histogram);
                      echarts.registerTransform(ecStat.transform.clustering);
                      if (env.loadChartExtends) {
                          await env.loadChartExtends();
                      }
                      this.echarts = echarts.init(ref, theme);
                      if (typeof onChartMount === 'string') {
                          onChartMount = new Function('chart', 'echarts');
                      }
                      onChartMount === null || onChartMount === void 0 ? void 0 : onChartMount(this.echarts, echarts);
                      this.echarts.on('click', this.handleClick);
                      this.unSensor = resize_sensor_1.resizeSensor(ref, () => {
                          var _a;
                          const width = ref.offsetWidth;
                          const height = ref.offsetHeight;
                          (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.resize({
                              width,
                              height
                          });
                      });
                      chartRef && chartRef(this.echarts);
                      this.renderChart();
                  });
              }
              else {
                  chartRef && chartRef(null);
                  this.unSensor && this.unSensor();
                  if (this.echarts) {
                      onChartUnMount === null || onChartUnMount === void 0 ? void 0 : onChartUnMount(this.echarts, window.echarts);
                      this.echarts.dispose();
                      delete this.echarts;
                  }
              }
              this.ref = ref;
          }
          reload(subpath, query) {
              var _a, _b;
              const { api, env, store, interval } = this.props;
              if (query) {
                  return this.receive(query);
              }
              else if (!env || !env.fetcher || !api_1.isEffectiveApi(api, store.data)) {
                  return;
              }
              clearTimeout(this.timer);
              if (this.reloadCancel) {
                  this.reloadCancel();
                  delete this.reloadCancel;
                  (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.hideLoading();
              }
              (_b = this.echarts) === null || _b === void 0 ? void 0 : _b.showLoading();
              store.markFetching(true);
              env
                  .fetcher(api, store.data, {
                  cancelExecutor: (executor) => (this.reloadCancel = executor)
              })
                  .then(result => {
                  var _a;
                  mobx_state_tree_1.isAlive(store) && store.markFetching(false);
                  if (!result.ok) {
                      return env.notify('error', result.msg || '加载失败，请重试！', result.msgTimeout !== undefined
                          ? {
                              closeButton: true,
                              timeout: result.msgTimeout
                          }
                          : undefined);
                  }
                  delete this.reloadCancel;
                  const data = result.data || {};
                  // 说明返回的是数据接口。
                  if (!data.series && this.props.config) {
                      const ctx = helper_1.createObject(this.props.data, data);
                      this.renderChart(this.props.config, ctx);
                  }
                  else {
                      this.renderChart(result.data || {});
                  }
                  (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.hideLoading();
                  interval &&
                      this.mounted &&
                      (this.timer = setTimeout(this.reload, Math.max(interval, 1000)));
              })
                  .catch(reason => {
                  var _a;
                  if (env.isCancel(reason)) {
                      return;
                  }
                  mobx_state_tree_1.isAlive(store) && store.markFetching(false);
                  env.notify('error', reason);
                  (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.hideLoading();
              });
          }
          receive(data) {
              const store = this.props.store;
              store.updateData(data);
              this.reload();
          }
          renderChart(config, data) {
              var _a, _b, _c;
              config && (this.pending = config);
              data && (this.pendingCtx = data);
              if (!this.echarts) {
                  return;
              }
              const store = this.props.store;
              let onDataFilter = this.props.onDataFilter;
              const dataFilter = this.props.dataFilter;
              if (!onDataFilter && typeof dataFilter === 'string') {
                  onDataFilter = new Function('config', 'echarts', dataFilter);
              }
              config = config || this.pending;
              data = data || this.pendingCtx || this.props.data;
              if (typeof config === 'string') {
                  config = new Function('return ' + config)();
              }
              try {
                  onDataFilter &&
                      (config = onDataFilter(config, window.echarts) || config);
              }
              catch (e) {
                  console.warn(e);
              }
              if (config) {
                  try {
                      if (!this.props.disableDataMapping) {
                          config = tpl_builtin_1.dataMapping(config, data, (key, value) => typeof value === 'function' ||
                              (typeof value === 'string' && value.startsWith('function')));
                      }
                      recoverFunctionType(config);
                      if (mobx_state_tree_1.isAlive(store) && store.loading) {
                          (_a = this.echarts) === null || _a === void 0 ? void 0 : _a.showLoading();
                      }
                      else {
                          (_b = this.echarts) === null || _b === void 0 ? void 0 : _b.hideLoading();
                      }
                      (_c = this.echarts) === null || _c === void 0 ? void 0 : _c.setOption(config, this.props.replaceChartOption);
                  }
                  catch (e) {
                      console.warn(e);
                  }
              }
          }
          render() {
              const { className, width, height, classPrefix: ns, unMountOnHidden } = this.props;
              let style = this.props.style || {};
              width && (style.width = width);
              height && (style.height = height);
              return (react_1.default.createElement(LazyComponent_1.default, { unMountOnHidden: unMountOnHidden, placeholder: react_1.default.createElement("div", { className: classnames_1.default(`${ns}Chart`, className), style: style },
                      react_1.default.createElement("div", { className: `${ns}Chart-placeholder` },
                          react_1.default.createElement(Spinner_1.default, { show: true, icon: "reload", spinnerClassName: classnames_1.default('Chart-spinner') }))), component: () => (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Chart`, className), style: style, ref: this.refFn })) }));
          }
      }
      Chart.defaultProps = {
          replaceChartOption: false,
          unMountOnHidden: false
      };
      Chart.propsList = [];
      return Chart;
  })();
  exports.Chart = Chart;
  let ChartRenderer = /** @class */ (() => {
      let ChartRenderer = class ChartRenderer extends Chart {
          componentWillMount() {
              super.componentWillMount();
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              super.componentWillUnmount();
              const scoped = this.context;
              scoped.unRegisterComponent(this);
          }
      };
      ChartRenderer.contextType = Scoped_1.ScopedContext;
      ChartRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)chart$/,
              storeType: service_1.ServiceStore.name,
              name: 'chart'
          })
      ], ChartRenderer);
      return ChartRenderer;
  })();
  exports.ChartRenderer = ChartRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2hhcnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0NoYXJ0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBRTFCLHdDQUFtRDtBQUNuRCw4Q0FBNkQ7QUFFN0Qsc0NBQW9EO0FBQ3BELG9FQUE0QjtBQUM1Qix3RkFBd0Q7QUFDeEQsMERBQW9EO0FBQ3BELHNEQUk4QjtBQUM5QixzQ0FBMkQ7QUFDM0Qsc0NBQXdEO0FBQ3hELDRDQUFpRTtBQUNqRSw0RUFBNEM7QUFVNUMscURBQXdDO0FBNkZ4QyxNQUFNLFVBQVUsR0FBOEIsRUFBRSxDQUFDO0FBQ2pEOzs7OztHQUtHO0FBQ0gsU0FBUyxtQkFBbUIsQ0FBQyxNQUFjO0lBQ3pDLENBQUMsV0FBVyxFQUFFLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFXLEVBQUUsRUFBRTtRQUMxRCxNQUFNLE9BQU8sR0FBRywyQkFBa0IsQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDaEQsS0FBSyxNQUFNLE1BQU0sSUFBSSxPQUFPLEVBQUU7WUFDNUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ3pCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ2xFLElBQUk7b0JBQ0YsSUFBSSxDQUFDLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxFQUFFO3dCQUN6QixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7cUJBQzNDO29CQUNELE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7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

});
