amis.define('src/renderers/IFrame.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.IFrameRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Scoped_1 = require("src/Scoped.tsx");
  const api_1 = require("src/utils/api.ts");
  let IFrame = /** @class */ (() => {
      var _a;
      class IFrame extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.IFrameRef = react_1.default.createRef();
              this.state = {
                  width: this.props.width || '100%',
                  height: this.props.height || '100%'
              };
          }
          componentDidMount() {
              window.addEventListener('message', this.onMessage);
          }
          componentDidUpdate(prevProps) {
              const data = this.props.data;
              if (data !== prevProps.data) {
                  this.postMessage('update', data);
              }
              else if (this.props.width !== prevProps.width ||
                  this.props.height !== prevProps.height) {
                  this.setState({
                      width: this.props.width || '100%',
                      height: this.props.height || '100%'
                  });
              }
          }
          componentWillUnmount() {
              window.removeEventListener('message', this.onMessage);
          }
          onMessage(e) {
              var _a;
              const { events, onAction, data } = this.props;
              if (typeof ((_a = e === null || e === void 0 ? void 0 : e.data) === null || _a === void 0 ? void 0 : _a.type) !== 'string' || !events) {
                  return;
              }
              const [prefix, type] = e.data.type.split(':');
              if (prefix !== 'amis' || !type) {
                  return;
              }
              if (type === 'resize' && e.data.data) {
                  this.setState({
                      width: e.data.data.width || '100%',
                      height: e.data.data.height || '100%'
                  });
              }
              else {
                  const action = events[type];
                  action && onAction(e, action, helper_1.createObject(data, e.data.data));
              }
          }
          onLoad() {
              const { src, data } = this.props;
              src && this.postMessage('init', data);
          }
          // 当别的组件通知 iframe reload 的时候执行。
          reload(subpath, query) {
              if (query) {
                  return this.receive(query);
              }
              const { src, data } = this.props;
              if (src) {
                  this.IFrameRef.current.src = api_1.buildApi(src, data).url;
              }
          }
          // 当别的组件把数据发给 iframe 里面的时候执行。
          receive(values) {
              const { src, data } = this.props;
              const newData = helper_1.createObject(data, values);
              this.postMessage('receive', newData);
              if (api_1.isApiOutdated(src, src, data, newData)) {
                  this.IFrameRef.current.src = api_1.buildApi(src, newData).url;
              }
          }
          postMessage(type, data) {
              var _a, _b;
              (_b = (_a = this.IFrameRef.current) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 ? void 0 : _b.postMessage({
                  type: `amis:${type}`,
                  data
              }, '*');
          }
          render() {
              const { width, height } = this.state;
              let { className, src, frameBorder, data, style } = this.props;
              let tempStyle = {};
              width !== void 0 && (tempStyle.width = width);
              height !== void 0 && (tempStyle.height = height);
              style = Object.assign(Object.assign({}, tempStyle), style);
              const finalSrc = src ? api_1.buildApi(src, data).url : undefined;
              if (typeof finalSrc === 'string' &&
                  finalSrc &&
                  !/^(\.\/|\.\.\/|\/|https?\:\/\/|\/\/)/.test(finalSrc)) {
                  return react_1.default.createElement("p", null, "\u8BF7\u586B\u5199\u5408\u6CD5\u7684 iframe \u5730\u5740");
              }
              return (react_1.default.createElement("iframe", { className: className, frameBorder: frameBorder, style: style, ref: this.IFrameRef, onLoad: this.onLoad, src: finalSrc }));
          }
      }
      IFrame.propsList = ['src', 'className'];
      IFrame.defaultProps = {
          className: '',
          frameBorder: 0
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof MessageEvent !== "undefined" && MessageEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "onMessage", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "onLoad", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "reload", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "receive", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], IFrame.prototype, "postMessage", null);
      return IFrame;
  })();
  exports.default = IFrame;
  let IFrameRenderer = /** @class */ (() => {
      let IFrameRenderer = class IFrameRenderer extends IFrame {
          componentWillMount() {
              const scoped = this.context;
              scoped.registerComponent(this);
          }
          componentWillUnmount() {
              const scoped = this.context;
              scoped.unRegisterComponent(this);
          }
      };
      IFrameRenderer.contextType = Scoped_1.ScopedContext;
      IFrameRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)iframe$/,
              name: 'iframe'
          })
      ], IFrameRenderer);
      return IFrameRenderer;
  })();
  exports.IFrameRenderer = IFrameRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSUZyYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9JRnJhbWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBRW5ELDRDQUF1RDtBQUN2RCxzQ0FBd0Q7QUFDeEQsc0NBQXFEO0FBK0JyRDs7SUFBQSxNQUFxQixNQUFPLFNBQVEsZUFBSyxDQUFDLFNBQThCO1FBQXhFOztZQUNFLGNBQVMsR0FBdUMsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBT2xFLFVBQUssR0FBRztnQkFDTixLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLElBQUksTUFBTTtnQkFDakMsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxJQUFJLE1BQU07YUFDcEMsQ0FBQztRQXdJSixDQUFDO1FBdElDLGlCQUFpQjtZQUNmLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3JELENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxTQUFzQjtZQUN2QyxNQUFNLElBQUksR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUU3QixJQUFJLElBQUksS0FBSyxTQUFTLENBQUMsSUFBSSxFQUFFO2dCQUMzQixJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNsQztpQkFBTSxJQUNMLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxLQUFLO2dCQUNwQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsTUFBTSxFQUN0QztnQkFDQSxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssSUFB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

});
