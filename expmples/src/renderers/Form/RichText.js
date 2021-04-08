amis.define('src/renderers/Form/RichText.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RichTextControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  function loadRichText(type = 'froala') {
      return () => type === 'tinymce'
          ? Promise.resolve().then(() => new Promise(function(resolve){require(['src/components/Tinymce.tsx'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(item => item.default)
          : Promise.resolve().then(() => new Promise(function(resolve){require(['src/components/RichText.tsx'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(item => item.default);
  }
  let RichTextControl = /** @class */ (() => {
      class RichTextControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  focused: false
              };
              this.config = null;
              const finnalVendor = props.vendor || (props.env.richTextToken ? 'froala' : 'tinymce');
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.handleChange = this.handleChange.bind(this);
              if (finnalVendor === 'froala') {
                  this.config = Object.assign(Object.assign({ imageAllowedTypes: ['jpeg', 'jpg', 'png', 'gif'], imageDefaultAlign: 'left', imageEditButtons: props.imageEditable
                          ? [
                              'imageReplace',
                              'imageAlign',
                              'imageRemove',
                              '|',
                              'imageLink',
                              'linkOpen',
                              'linkEdit',
                              'linkRemove',
                              '-',
                              'imageDisplay',
                              'imageStyle',
                              'imageAlt',
                              'imageSize'
                          ]
                          : [], key: props.env.richTextToken }, props.options), { editorClass: props.editorClass, placeholderText: props.translate(props.placeholder), imageUploadURL: props.receiver, imageUploadParams: {
                          from: 'rich-text'
                      }, videoUploadURL: props.videoReceiver, videoUploadParams: {
                          from: 'rich-text'
                      }, events: Object.assign(Object.assign({}, (props.options && props.options.events)), { 'froalaEditor.focus': this.handleFocus, 'froalaEditor.blur': this.handleBlur }), language: !this.props.locale || this.props.locale === 'zh-CN' ? 'zh_cn' : '' });
                  if (props.buttons) {
                      this.config.toolbarButtonsSM = props.buttons;
                      this.config.toolbarButtonsMD = props.buttons;
                      this.config.toolbarButtonsXS = props.buttons;
                      this.config.toolbarButtons = props.buttons;
                  }
              }
              else {
                  const fetcher = props.env.fetcher;
                  this.config = Object.assign(Object.assign({}, props.options), { images_upload_url: props.receiver, images_upload_handler: async (blobInfo, ok, fail) => {
                          var _a, _b, _c;
                          const formData = new FormData();
                          formData.append('file', blobInfo.blob(), blobInfo.filename());
                          try {
                              const response = await fetcher(props.receiver, formData, {
                                  method: 'post'
                              });
                              if (response.ok) {
                                  ok(((_a = response.data) === null || _a === void 0 ? void 0 : _a.link) || ((_b = response.data) === null || _b === void 0 ? void 0 : _b.url) || ((_c = response.data) === null || _c === void 0 ? void 0 : _c.value) ||
                                      response.link);
                              }
                          }
                          catch (e) {
                              fail(e);
                          }
                      } });
              }
          }
          handleFocus() {
              this.setState({
                  focused: true
              });
          }
          handleBlur() {
              this.setState({
                  focused: false
              });
          }
          handleChange(value, submitOnChange, changeImmediately) {
              const { onChange, disabled } = this.props;
              if (disabled) {
                  return;
              }
              onChange === null || onChange === void 0 ? void 0 : onChange(value, submitOnChange, changeImmediately);
          }
          render() {
              const { className, classPrefix: ns, value, onChange, disabled, size, vendor, env, locale, translate } = this.props;
              const finnalVendor = vendor || (env.richTextToken ? 'froala' : 'tinymce');
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}RichTextControl`, className, {
                      'is-focused': this.state.focused,
                      'is-disabled': disabled
                  }) },
                  react_1.default.createElement(LazyComponent_1.default, { getComponent: loadRichText(finnalVendor), model: value, onModelChange: this.handleChange, onFocus: this.handleFocus, onBlur: this.handleBlur, config: this.config, disabled: disabled, locale: locale, translate: translate })));
          }
      }
      RichTextControl.defaultProps = {
          imageEditable: true,
          receiver: '/api/upload/image',
          videoReceiver: '/api/upload/video',
          placeholder: 'placeholder.enter',
          options: {
              toolbarButtonsSM: [
                  'paragraphFormat',
                  'quote',
                  'color',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  '|',
                  'formatOL',
                  'formatUL',
                  'align',
                  '|',
                  'insertLink',
                  'insertImage',
                  'insertEmotion',
                  'insertTable',
                  '|',
                  'undo',
                  'redo',
                  'html'
              ],
              toolbarButtonsMD: [
                  'paragraphFormat',
                  'quote',
                  'color',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  '|',
                  'formatOL',
                  'formatUL',
                  'align',
                  '|',
                  'insertLink',
                  'insertImage',
                  'insertEmotion',
                  'insertTable',
                  '|',
                  'undo',
                  'redo',
                  'html'
              ],
              toolbarButtons: [
                  'paragraphFormat',
                  'quote',
                  'color',
                  '|',
                  'bold',
                  'italic',
                  'underline',
                  'strikeThrough',
                  '|',
                  'formatOL',
                  'formatUL',
                  'align',
                  '|',
                  'insertLink',
                  'insertImage',
                  'insertEmotion',
                  'insertTable',
                  '|',
                  'undo',
                  'redo',
                  'html'
              ]
          }
      };
      return RichTextControl;
  })();
  exports.default = RichTextControl;
  let RichTextControlRenderer = /** @class */ (() => {
      let RichTextControlRenderer = class RichTextControlRenderer extends RichTextControl {
      };
      RichTextControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'rich-text',
              sizeMutable: false
          })
      ], RichTextControlRenderer);
      return RichTextControlRenderer;
  })();
  exports.RichTextControlRenderer = RichTextControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmljaFRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vUmljaFRleHQudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLG9FQUE0QjtBQUM1QiwyRkFBMkQ7QUF1QjNELFNBQVMsWUFBWSxDQUNuQixPQUE2QixRQUFRO0lBRXJDLE9BQU8sR0FBRyxFQUFFLENBQ1YsSUFBSSxLQUFLLFNBQVM7UUFDaEIsQ0FBQyxDQUFDLDBEQUFPLDBCQUEwQixJQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDL0QsQ0FBQyxDQUFDLDBEQUFPLDJCQUEyQixJQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN2RSxDQUFDO0FBRUQ7SUFBQSxNQUFxQixlQUFnQixTQUFRLGVBQUssQ0FBQyxTQUdsRDtRQW1GQyxZQUFZLEtBQW9CO1lBQzlCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUxmLFVBQUssR0FBRztnQkFDTixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7WUFDRixXQUFNLEdBQVEsSUFBSSxDQUFDO1lBSWpCLE1BQU0sWUFBWSxHQUNoQixLQUFLLENBQUMsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxD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

});
