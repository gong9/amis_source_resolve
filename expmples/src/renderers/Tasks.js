amis.define('src/renderers/Tasks.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TaskRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const immutability_helper_1 = tslib_1.__importDefault(require("node_modules/immutability-helper/index"));
  const api_1 = require("src/utils/api.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  let Task = /** @class */ (() => {
      class Task extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  items: props.items ? props.items.concat() : []
              };
              this.handleLoaded = this.handleLoaded.bind(this);
              this.tick = this.tick.bind(this);
          }
          componentDidMount() {
              this.tick(!!this.props.checkApi);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.items !== nextProps.items) {
                  this.setState({
                      items: nextProps.items ? nextProps.items.concat() : []
                  });
              }
          }
          componentDidUpdate(prevProps) {
              const props = this.props;
              if (api_1.isApiOutdated(prevProps.checkApi, props.checkApi, prevProps.data, props.data)) {
                  this.tick(true);
              }
          }
          componentWillUnmount() {
              clearTimeout(this.timer);
          }
          reload() {
              this.tick(true);
          }
          tick(force = false) {
              const { loadingStatusCode, data, interval, checkApi, env } = this.props;
              const items = this.state.items;
              clearTimeout(this.timer);
              // 如果每个 task 都完成了, 则不需要取查看状态.
              if (!force && !items.some(item => item.status === loadingStatusCode)) {
                  return;
              }
              if (interval && !api_1.isEffectiveApi(checkApi)) {
                  return env.alert('checkApi 没有设置, 不能及时获取任务状态');
              }
              api_1.isEffectiveApi(checkApi, data) &&
                  env &&
                  env
                      .fetcher(checkApi, data)
                      .then(this.handleLoaded)
                      .catch(e => this.setState({ error: e }));
          }
          handleLoaded(ret) {
              if (!Array.isArray(ret.data)) {
                  return this.props.env.alert('返回格式不正确, 期望 response.data 为数组, 包含每个 task 的状态信息');
              }
              this.setState({
                  items: ret.data
              });
              const interval = this.props.interval;
              clearTimeout(this.timer);
              this.timer = setTimeout(this.tick, interval);
          }
          submitTask(item, index, retry = false) {
              const { submitApi, reSubmitApi, loadingStatusCode, errorStatusCode, data, env } = this.props;
              if (!retry && !api_1.isEffectiveApi(submitApi)) {
                  return env.alert('submitApi 没有配置');
              }
              else if (retry && !api_1.isEffectiveApi(reSubmitApi)) {
                  return env.alert('reSubmitApi 没有配置');
              }
              this.setState(immutability_helper_1.default(this.state, {
                  items: {
                      $splice: [
                          [
                              index,
                              1,
                              Object.assign(Object.assign({}, item), { status: loadingStatusCode })
                          ]
                      ]
                  }
              }));
              const api = retry ? reSubmitApi : submitApi;
              api_1.isEffectiveApi(api, data) &&
                  env &&
                  env
                      .fetcher(api, helper_1.createObject(data, item))
                      .then((ret) => {
                      if (ret && ret.data) {
                          if (Array.isArray(ret.data)) {
                              this.handleLoaded(ret);
                          }
                          else {
                              let replace = api && api.replaceData;
                              const items = this.state.items.map(item => item.key === ret.data.key
                                  ? Object.assign(Object.assign({}, (api.replaceData ? {} : item)), ret.data) : item);
                              this.handleLoaded(Object.assign(Object.assign({}, ret), { data: items }));
                          }
                          return;
                      }
                      clearTimeout(this.timer);
                      this.timer = setTimeout(this.tick, 4);
                  })
                      .catch(e => this.setState(immutability_helper_1.default(this.state, {
                      items: {
                          $splice: [
                              [
                                  index,
                                  1,
                                  Object.assign(Object.assign({}, item), { status: errorStatusCode, remark: e.message || e })
                              ]
                          ]
                      }
                  })));
          }
          render() {
              const { classnames: cx, className, tableClassName, taskNameLabel, operationLabel, statusLabel, remarkLabel, btnText, retryBtnText, btnClassName, retryBtnClassName, statusLabelMap, statusTextMap, readyStatusCode, loadingStatusCode, canRetryStatusCode, translate: __, render } = this.props;
              const items = this.state.items;
              const error = this.state.error;
              return (react_1.default.createElement("div", { className: cx('Table-content', className) },
                  react_1.default.createElement("table", { className: cx('Table-table', tableClassName) },
                      react_1.default.createElement("thead", null,
                          react_1.default.createElement("tr", null,
                              react_1.default.createElement("th", null, taskNameLabel),
                              react_1.default.createElement("th", null, __(operationLabel)),
                              react_1.default.createElement("th", null, statusLabel),
                              react_1.default.createElement("th", null, remarkLabel))),
                      react_1.default.createElement("tbody", null, error ? (react_1.default.createElement("tr", null,
                          react_1.default.createElement("td", { colSpan: 4 },
                              react_1.default.createElement("div", { className: "text-danger" }, error)))) : (items.map((item, key) => (react_1.default.createElement("tr", { key: key },
                          react_1.default.createElement("td", null, item.label),
                          react_1.default.createElement("td", null, item.status == loadingStatusCode ? (react_1.default.createElement(Spinner_1.default, { show: true, icon: "reload", spinnerClassName: cx('Task-spinner') })) : item.status == canRetryStatusCode ? (react_1.default.createElement("a", { onClick: () => this.submitTask(item, key, true), className: cx('Button', 'Button--danger', retryBtnClassName || btnClassName) }, retryBtnText || btnText)) : (react_1.default.createElement("a", { onClick: () => this.submitTask(item, key), className: cx('Button', 'Button--default', btnClassName, {
                                  disabled: item.status !== readyStatusCode
                              }) }, btnText))),
                          react_1.default.createElement("td", null,
                              react_1.default.createElement("span", { className: cx('label', statusLabelMap && statusLabelMap[item.status || 0]) }, statusTextMap && statusTextMap[item.status || 0])),
                          react_1.default.createElement("td", null, item.remark ? render(`${key}/remark`, item.remark) : null)))))))));
          }
      }
      Task.defaultProps = {
          className: '',
          tableClassName: '',
          taskNameLabel: '任务名称',
          operationLabel: 'Table.operation',
          statusLabel: '状态',
          remarkLabel: '备注说明',
          btnText: '上线',
          retryBtnText: '重试',
          btnClassName: '',
          retryBtnClassName: '',
          statusLabelMap: [
              'label-warning',
              'label-info',
              'label-info',
              'label-danger',
              'label-success',
              'label-danger'
          ],
          statusTextMap: ['未开始', '就绪', '进行中', '出错', '已完成', '出错'],
          initialStatusCode: 0,
          readyStatusCode: 1,
          loadingStatusCode: 2,
          errorStatusCode: 3,
          finishStatusCode: 4,
          canRetryStatusCode: 5,
          interval: 3000
      };
      return Task;
  })();
  exports.default = Task;
  let TaskRenderer = /** @class */ (() => {
      let TaskRenderer = class TaskRenderer extends Task {
          componentWillMount() {
              // super.componentWillMount();
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              super.componentWillUnmount();
              const scoped = this.context;
              scoped.unRegisterComponent(this);
          }
      };
      TaskRenderer.contextType = Scoped_1.ScopedContext;
      TaskRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)tasks$/,
              name: 'tasks'
          })
      ], TaskRenderer);
      return TaskRenderer;
  })();
  exports.TaskRenderer = TaskRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza3MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1Rhc2tzLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUtuRCxzRkFBeUM7QUFDekMsc0NBQTJEO0FBQzNELHNDQUF3RDtBQUN4RCw0RUFBNEM7QUFFNUMsNENBQTZDO0FBaUo3QztJQUFBLE1BQXFCLElBQUssU0FBUSxlQUFLLENBQUMsU0FBK0I7UUFnQ3JFLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRTthQUMvQyxDQUFDO1lBRUYsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCxpQkFBaUI7WUFDZixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ25DLENBQUM7UUFFRCx5QkFBeUIsQ0FBQyxTQUFvQjtZQUM1QyxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQUksS0FBSyxDQUFDLEtBQUssS0FBSyxTQUFTLENBQUMsS0FBSyxFQUFFO2dCQUNuQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMs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

});
