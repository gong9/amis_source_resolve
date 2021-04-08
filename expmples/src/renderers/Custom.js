amis.define('src/renderers/Custom.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CustomRenderer = exports.Custom = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const memoize_1 = tslib_1.__importDefault(require("node_modules/lodash/memoize"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  // 缓存一下，避免在 crud 中的自定义组件被大量执行
  const getFunction = memoize_1.default((...args) => {
      return new Function(...args);
  });
  let Custom = /** @class */ (() => {
      class Custom extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.onUpdate = () => { };
              this.onMount = () => { };
              this.onUnmount = () => { };
              this.dom = react_1.default.createRef();
              if (props.onMount) {
                  if (typeof props.onMount === 'string') {
                      this.onMount = getFunction('dom', 'value', 'onChange', 'props', props.onMount);
                  }
                  else {
                      this.onMount = props.onMount;
                  }
              }
              if (props.onUpdate) {
                  if (typeof props.onUpdate === 'string') {
                      this.onUpdate = getFunction('dom', 'data', 'prevData', 'props', props.onUpdate);
                  }
                  else {
                      this.onUpdate = props.onUpdate;
                  }
              }
              if (props.onUnmount) {
                  if (typeof props.onUnmount === 'string') {
                      this.onUnmount = getFunction('props', props.onUnmount);
                  }
                  else {
                      this.onUnmount = props.onUnmount;
                  }
              }
          }
          componentDidUpdate(prevProps) {
              if (helper_1.anyChanged(['data'], this.props, prevProps)) {
                  const { data } = this.props;
                  this.onUpdate(this.dom, data, prevProps.data, this.props);
              }
          }
          componentDidMount() {
              const { value, onChange } = this.props;
              this.onMount(this.dom.current, value, onChange, this.props);
          }
          componentwillUnmount() {
              this.onUnmount(this.props);
          }
          render() {
              const { className, html, id, wrapperComponent, inline, classnames: cx } = this.props;
              const Component = wrapperComponent || inline ? 'span' : 'div';
              return (react_1.default.createElement(Component, { ref: this.dom, className: cx(className), id: id, dangerouslySetInnerHTML: { __html: html ? html : '' } }));
          }
      }
      Custom.defaultProps = {
          inline: false
      };
      return Custom;
  })();
  exports.Custom = Custom;
  let CustomRenderer = /** @class */ (() => {
      let CustomRenderer = class CustomRenderer extends Custom {
      };
      CustomRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)custom$/,
              name: 'custom'
          })
      ], CustomRenderer);
      return CustomRenderer;
  })();
  exports.CustomRenderer = CustomRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ3VzdG9tLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9DdXN0b20udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIscUVBQXFDO0FBQ3JDLHdDQUFtRDtBQUVuRCw0Q0FBMkM7QUE0QjNDLDZCQUE2QjtBQUM3QixNQUFNLFdBQVcsR0FBRyxpQkFBTyxDQUFDLENBQUMsR0FBRyxJQUFJLEVBQUUsRUFBRTtJQUN0QyxPQUFPLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7QUFDL0IsQ0FBQyxDQUFDLENBQUM7QUFFSDtJQUFBLE1BQWEsTUFBTyxTQUFRLGVBQUssQ0FBQyxTQUE4QjtRQVU5RCxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUxmLGFBQVEsR0FBYSxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7WUFDOUIsWUFBTyxHQUFhLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztZQUM3QixjQUFTLEdBQWEsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1lBSTdCLElBQUksQ0FBQyxHQUFHLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBRSxDQUFDO1lBQzdCLElBQUksS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDakIsSUFBSSxPQUFPLEtBQUssQ0FBQyxPQUFPLEtBQUssUUFBUSxFQUFFO29CQUNyQyxJQUFJLENBQUMsT0FBTyxHQUFHLFdBQVcsQ0FDeEIsS0FBSyxFQUNMLE9BQU8sRUFDUCxVQUFVLEVBQ1YsT0FBTyxFQUNQLEtBQUssQ0FBQyxPQUFPLENBQ2QsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUM7aUJBQzlCO2FBQ0Y7WUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEVBQUU7Z0JBQ2xCLElB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

});
