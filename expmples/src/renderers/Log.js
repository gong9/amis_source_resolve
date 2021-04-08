amis.define('src/renderers/Log.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.LogRenderer = exports.Log = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /**
   * @file 用于显示日志的组件，比如显示命令行的输出结果
   */
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const ansi_to_react_1 = tslib_1.__importDefault(require("node_modules/ansi-to-react/lib/index"));
  const api_1 = require("src/utils/api.ts");
  let Log = /** @class */ (() => {
      class Log extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.isDone = false;
              this.autoScroll = false;
              this.state = {
                  lastLine: '',
                  logs: []
              };
              this.logRef = react_1.default.createRef();
              this.autoScroll = props.autoScroll || false;
              this.pauseOrResumeScrolling = this.pauseOrResumeScrolling.bind(this);
          }
          componentWillUnmount() {
              if (this.logRef && this.logRef.current) {
                  this.logRef.current.removeEventListener('scroll', this.pauseOrResumeScrolling);
              }
          }
          componentDidMount() {
              if (this.autoScroll && this.logRef && this.logRef.current) {
                  this.logRef.current.addEventListener('scroll', this.pauseOrResumeScrolling);
              }
              if (this.props.source) {
                  this.loadLogs();
              }
          }
          componentDidUpdate() {
              if (this.autoScroll && this.logRef && this.logRef.current) {
                  this.logRef.current.scrollTop = this.logRef.current.scrollHeight;
              }
          }
          // 如果向上滚动就停止自动滚动，除非滚到底部
          pauseOrResumeScrolling() {
              if (this.logRef && this.logRef.current) {
                  const { scrollHeight, scrollTop, offsetHeight } = this.logRef.current;
                  this.autoScroll = scrollHeight - (scrollTop + offsetHeight) < 50;
              }
          }
          async loadLogs() {
              const { source, data, env, translate: __, encoding } = this.props;
              // 因为这里返回结果是流式的，和普通 api 请求不一样，如果直接用 fetcher 经过 responseAdpater 可能会导致出错，所以就直接 fetch 了
              const api = api_1.buildApi(source, data);
              const res = await fetch(api.url);
              if (res.status === 200) {
                  const body = res.body;
                  if (!body) {
                      return;
                  }
                  const reader = body.getReader();
                  let lastline = '';
                  let logs = [];
                  for (;;) {
                      let { done, value } = await reader.read();
                      if (value) {
                          let text = new TextDecoder(encoding).decode(value, { stream: true });
                          // 不考虑只有 \r 换行符的情况，几乎没人用
                          const lines = text.split('\n');
                          // 如果没有换行符就只更新最后一行
                          if (lines.length === 1) {
                              lastline += lines[0];
                              this.setState({
                                  lastLine: lastline
                              });
                          }
                          else {
                              // 将之前的数据补上
                              lines[0] = lastline + lines[0];
                              // 最后一个要么是空，要么是下一行的数据
                              lastline = lines.pop() || '';
                              logs = logs.concat(lines);
                              this.setState({
                                  logs: logs,
                                  lastLine: lastline
                              });
                          }
                      }
                      if (done) {
                          this.isDone = true;
                          return;
                      }
                  }
              }
              else {
                  env.notify('error', __('fetchFailed'));
              }
          }
          render() {
              const { source, className, classnames: cx, placeholder, height, translate: __ } = this.props;
              let loading = __(placeholder);
              if (!source) {
                  loading = __('Log.mustHaveSource');
              }
              const lines = this.state.logs.map((line, index) => {
                  return (react_1.default.createElement("div", { className: cx('Log-line'), key: index },
                      react_1.default.createElement(ansi_to_react_1.default, { useClasses: true }, line)));
              });
              return (react_1.default.createElement("div", { ref: this.logRef, className: cx('Log', className), style: { height: height } },
                  lines.length ? lines : loading,
                  react_1.default.createElement("div", { className: cx('Log-line'), key: "last" },
                      react_1.default.createElement("code", null, this.state.lastLine))));
          }
      }
      Log.defaultProps = {
          height: 500,
          autoScroll: true,
          placeholder: 'loading',
          encoding: 'utf-8'
      };
      return Log;
  })();
  exports.Log = Log;
  let LogRenderer = /** @class */ (() => {
      let LogRenderer = class LogRenderer extends Log {
      };
      LogRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)log$/,
              name: 'log'
          })
      ], LogRenderer);
      return LogRenderer;
  })();
  exports.LogRenderer = LogRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTG9nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Mb2cudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7R0FFRztBQUNILDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsMEVBQWlDO0FBRWpDLHNDQUFzQztBQStDdEM7SUFBQSxNQUFhLEdBQUksU0FBUSxlQUFLLENBQUMsU0FBNkI7UUFtQjFELFlBQVksS0FBZTtZQUN6QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFaZixXQUFNLEdBQVksS0FBSyxDQUFDO1lBRXhCLGVBQVUsR0FBWSxLQUFLLENBQUM7WUFJNUIsVUFBSyxHQUFhO2dCQUNoQixRQUFRLEVBQUUsRUFBRTtnQkFDWixJQUFJLEVBQUUsRUFBRTthQUNULENBQUM7WUFJQSxJQUFJLENBQUMsTUFBTSxHQUFHLGVBQUssQ0FBQyxTQUFTLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLElBQUksS0FBSyxDQUFDO1lBQzVDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFFRCxvQkFBb0I7WUFDbEIsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxtQkFBbUIsQ0FDckMsUUFBUSxFQUNSLElBQUksQ0FBQyxzQkFBc0IsQ0FDNUIsQ0FBQzthQUNIO1FBQ0gsQ0FBQztRQUVELGlCQUFpQjtZQUNmLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxFQUFFO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FDbEMsUUFBUSxFQUNSLElBQUksQ0FBQyxzQkFBc0IsQ0FDNUIsQ0FBQzthQUNIO1lBQ0QsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtnQkFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQ2pCO1FBQ0gsQ0FBQztRQUVELGtCQUFrQjtZQUNoQixJQUFJLElBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDekQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQzthQUNsRTtRQUNILENBQUM7UUFFRCx1QkFBdUI7UUFDdkIsc0JBQXNCO1lBQ3BCLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRTtnQkFDdEMsTUFBTSxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7Z0JBQ3BFLElBQUksQ0FBQyxVQUFVLEdBQUcsWUFBWSxHQUFHLENBQUMsU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNsRTtRQUNILENBQUM7UUFFRCxLQUFLLENBQUMsUUFBUTtZQUNaLE1BQU0sRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEUsb0ZBQW9GO1lBQ3BGLE1BQU0sR0FBRyxHQUFHLGNBQVEsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDbkMsTUFBTSxHQUFHLEdBQUcsTUFBTSxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ2pDLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxHQUFHLEVBQUU7Z0JBQ3RCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ1QsT0FBTztpQkFDUjtnQkFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7Z0JBQ2hDLElBQUksUUFBUSxHQUFHLEVBQUUsQ0FBQztnQkFDbEIsSUFBSSxJQUFJLEdBQWEsRUFBRSxDQUFDO2dCQUN4QixTQUFTO29CQUNQLElBQUksRUFBQyxJQUFJLEVBQUUsS0FBSyxFQUFDLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7b0JBQ3hDLElBQUksS0FBSyxFQUFFO3dCQUNULElBQUksSUFBSSxHQUFHLElBQUksV0FBVyxDQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQzt3QkFDbkUsd0JBQXdCO3dCQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO3dCQUMvQixrQkFBa0I7d0JBQ2xCLElBQUksS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7NEJBQ3RCLFFBQVEsSUFBSSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7NEJBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0NBQ1osUUFBUSxFQUFFLFFBQVE7NkJBQ25CLENBQUMsQ0FBQzt5QkFDSjs2QkFBTTs0QkFDTCxXQUFXOzRCQUNYLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxRQUFRLEdBQUcsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDOzRCQUMvQixxQkFBcUI7NEJBQ3JCLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDOzRCQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQzs0QkFDMUIsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQ0FDWixJQUFJLEVBQUUsSUFBSTtnQ0FDVixRQUFRLEVBQUUsUUFBUTs2QkFDbkIsQ0FBQyxDQUFDO3lCQUNKO3FCQUNGO29CQUVELElBQUksSUFBSSxFQUFFO3dCQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3dCQUNuQixPQUFPO3FCQUNSO2lCQUNGO2FBQ0Y7aUJBQU07Z0JBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDeEM7UUFDSCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixNQUFNLEVBQ04sU0FBUyxFQUNULFVBQVUsRUFBRSxFQUFFLEVBQ2QsV0FBVyxFQUNYLE1BQU0sRUFDTixTQUFTLEVBQUUsRUFBRSxFQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLElBQUksT0FBTyxHQUFHLEVBQUUsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUU5QixJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUNYLE9BQU8sR0FBRyxFQUFFLENBQUMsb0JBQW9CLENBQUMsQ0FBQzthQUNwQztZQUVELE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDaEQsT0FBTyxDQUNMLHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUs7b0JBQ3hDLDhCQUFDLHVCQUFJLElBQUMsVUFBVSxVQUFFLElBQUksQ0FBUSxDQUMxQixDQUNQLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztZQUVILE9BQU8sQ0FDTCx1Q0FDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFDaEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxLQUFLLEVBQUUsU0FBUyxDQUFDLEVBQy9CLEtBQUssRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUM7Z0JBRXRCLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsT0FBTztnQkFDL0IsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLEVBQUMsTUFBTTtvQkFDeEMsNENBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQVEsQ0FDOUIsQ0FDRixDQUNQLENBQUM7UUFDSixDQUFDOztJQWhKTSxnQkFBWSxHQUFHO1FBQ3BCLE1BQU0sRUFBRSxHQUFHO1FBQ1gsVUFBVSxFQUFFLElBQUk7UUFDaEIsV0FBVyxFQUFFLFNBQVM7UUFDdEIsUUFBUSxFQUFFLE9BQU87S0FDbEIsQ0FBQztJQTRJSixVQUFDO0tBQUE7QUFsSlksa0JBQUc7QUF3SmhCO0lBQUEsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBWSxTQUFRLEdBQUc7S0FBRyxDQUFBO0lBQTFCLFdBQVc7UUFKdkIsa0JBQVEsQ0FBQztZQUNSLElBQUksRUFBRSxZQUFZO1lBQ2xCLElBQUksRUFBRSxLQUFLO1NBQ1osQ0FBQztPQUNXLFdBQVcsQ0FBZTtJQUFELGtCQUFDO0tBQUE7QUFBMUIsa0NBQVcifQ==

});
