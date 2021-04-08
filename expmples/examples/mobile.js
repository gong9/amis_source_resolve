amis.define('examples/mobile.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file 用于浏览移动端下的效果，通过 postMessage 来被父容器控制
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.bootstrap = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  require("examples/polyfills/index.ts");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const axios_1 = tslib_1.__importDefault(require("node_modules/axios/index"));
  const copy_to_clipboard_1 = tslib_1.__importDefault(require("node_modules/copy-to-clipboard/index"));
  const Toast_1 = require("src/components/Toast.tsx");
  require("src/locale/en-US.ts");
  const index_1 = require("src/index.tsx");
  class AMISComponent extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.state = {
              schema: null,
              props: {}
          };
          window.addEventListener('message', event => {
              const data = event.data;
              if (data && data.schema) {
                  this.setState({ schema: data.schema, props: data.props });
              }
          });
          window.parent.postMessage('amisReady', '*');
      }
      render() {
          return this.state.schema ? (react_1.default.createElement("div", null, index_1.render(this.state.schema, this.state.props, {
              fetcher: ({ url, // 接口地址
              method, // 请求方法 get、post、put、delete
              data, // 请求数据
              responseType, config, // 其他配置
              headers // 请求头
               }) => {
                  config = config || {};
                  config.withCredentials = true;
                  responseType && (config.responseType = responseType);
                  if (config.cancelExecutor) {
                      config.cancelToken = new axios_1.default.CancelToken(config.cancelExecutor);
                  }
                  config.headers = headers || {};
                  if (method !== 'post' && method !== 'put' && method !== 'patch') {
                      if (data) {
                          config.params = data;
                      }
                      return axios_1.default[method](url, config);
                  }
                  else if (data && data instanceof FormData) {
                      config.headers = config.headers || {};
                      config.headers['Content-Type'] = 'multipart/form-data';
                  }
                  else if (data &&
                      typeof data !== 'string' &&
                      !(data instanceof Blob) &&
                      !(data instanceof ArrayBuffer)) {
                      data = JSON.stringify(data);
                      config.headers = config.headers || {};
                      config.headers['Content-Type'] = 'application/json';
                  }
                  return axios_1.default[method](url, data, config);
              },
              isCancel: (value) => axios_1.default.isCancel(value),
              copy: content => {
                  copy_to_clipboard_1.default(content);
                  Toast_1.toast.success('内容已复制到粘贴板');
              },
              affixOffsetTop: 0
          }))) : null;
      }
  }
  function bootstrap(mountTo, initalState) {
      react_dom_1.render(react_1.default.createElement(AMISComponent, null), mountTo);
  }
  exports.bootstrap = bootstrap;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9iaWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvZXhhbXBsZXMvbW9iaWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7O0dBRUc7Ozs7QUFFSCw2QkFBMkI7QUFFM0IsMERBQTBCO0FBQzFCLHlDQUFpQztBQUNqQywwREFBMEI7QUFDMUIsa0ZBQXFDO0FBQ3JDLG1EQUE4QztBQUM5QywrQkFBNkI7QUFFN0Isd0NBQWtEO0FBRWxELE1BQU0sYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUFTO0lBS3pDLFlBQVksS0FBSztRQUNmLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUxmLFVBQUssR0FBRztZQUNOLE1BQU0sRUFBRSxJQUFJO1lBQ1osS0FBSyxFQUFFLEVBQUU7U0FDVixDQUFDO1FBR0EsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsRUFBRTtZQUN6QyxNQUFNLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1lBQ3hCLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7Z0JBQ3ZCLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDekQ7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBQ0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQ3pCLDJDQUNHLGNBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtZQUMvQyxPQUFPLEVBQUUsQ0FBQyxFQUNSLEdBQUcsRUFBRSxPQUFPO1lBQ1osTUFBTSxFQUFFLDJCQUEyQjtZQUNuQyxJQUFJLEVBQUUsT0FBTztZQUNiLFlBQVksRUFDWixNQUFNLEVBQUUsT0FBTztZQUNmLE9BQU8sQ0FBQyxNQUFNO2NBQ1YsRUFBRSxFQUFFO2dCQUNSLE1BQU0sR0FBRyxNQUFNLElBQUksRUFBRSxDQUFDO2dCQUN0QixNQUFNLENBQUMsZUFBZSxHQUFHLElBQUksQ0FBQztnQkFDOUIsWUFBWSxJQUFJLENBQUMsTUFBTSxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUMsQ0FBQztnQkFFckQsSUFBSSxNQUFNLENBQUMsY0FBYyxFQUFFO29CQUN6QixNQUFNLENBQUMsV0FBVyxHQUFHLElBQUssZUFBYSxDQUFDLFdBQVcsQ0FDakQsTUFBTSxDQUFDLGNBQWMsQ0FDdEIsQ0FBQztpQkFDSDtnQkFFRCxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBRS9CLElBQUksTUFBTSxLQUFLLE1BQU0sSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxPQUFPLEVBQUU7b0JBQy9ELElBQUksSUFBSSxFQUFFO3dCQUNSLE1BQU0sQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO3FCQUN0QjtvQkFFRCxPQUFRLGVBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7aUJBQzVDO3FCQUFNLElBQUksSUFBSSxJQUFJLElBQUksWUFBWSxRQUFRLEVBQUU7b0JBQzNDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcscUJBQXFCLENBQUM7aUJBQ3hEO3FCQUFNLElBQ0wsSUFBSTtvQkFDSixPQUFPLElBQUksS0FBSyxRQUFRO29CQUN4QixDQUFDLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQztvQkFDdkIsQ0FBQyxDQUFDLElBQUksWUFBWSxXQUFXLENBQUMsRUFDOUI7b0JBQ0EsSUFBSSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7b0JBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsY0FBYyxDQUFDLEdBQUcsa0JBQWtCLENBQUM7aUJBQ3JEO2dCQUVELE9BQVEsZUFBYSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbkQsQ0FBQztZQUNELFFBQVEsRUFBRSxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUUsZUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDeEQsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFO2dCQUNkLDJCQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQ2QsYUFBSyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM3QixDQUFDO1lBQ0QsY0FBYyxFQUFFLENBQUM7U0FDbEIsQ0FBQyxDQUNFLENBQ1AsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ1gsQ0FBQztDQUNGO0FBRUQsU0FBZ0IsU0FBUyxDQUFDLE9BQU8sRUFBRSxXQUFXO0lBQzVDLGtCQUFNLENBQUMsOEJBQUMsYUFBYSxPQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFDckMsQ0FBQztBQUZELDhCQUVDIn0=

});
