amis.define('src/renderers/Form/Editor.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.EditorControlRenderer = exports.EditorControls = exports.availableLanguages = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  const Editor_1 = tslib_1.__importDefault(require("src/components/Editor.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  let EditorControl = /** @class */ (() => {
      class EditorControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  focused: false
              };
              this.toDispose = [];
              this.divRef = react_1.default.createRef();
              this.prevHeight = 0;
              this.handleFocus = this.handleFocus.bind(this);
              this.handleBlur = this.handleBlur.bind(this);
              this.handleEditorMounted = this.handleEditorMounted.bind(this);
          }
          componentWillUnmount() {
              this.toDispose.forEach(fn => fn());
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
          handleEditorMounted(editor, monaco) {
              this.editor = editor;
              this.toDispose.push(editor.onDidChangeModelDecorations(() => {
                  this.updateContainerSize(editor, monaco); // typing
                  requestAnimationFrame(this.updateContainerSize.bind(this, editor, monaco)); // folding
              }).dispose);
              this.props.editorDidMount && this.props.editorDidMount(editor, monaco);
          }
          updateContainerSize(editor, monaco) {
              var _a;
              if (!this.divRef.current) {
                  return;
              }
              const lineHeight = editor.getOption(monaco.editor.EditorOption.lineHeight);
              const lineCount = ((_a = editor.getModel()) === null || _a === void 0 ? void 0 : _a.getLineCount()) || 1;
              const height = editor.getTopForLineNumber(lineCount + 1) + lineHeight;
              if (this.prevHeight !== height) {
                  this.prevHeight = height;
                  this.divRef.current.style.height = `${height}px`;
                  editor.layout();
              }
          }
          render() {
              const { className, classPrefix: ns, classnames: cx, value, onChange, disabled, options, language, editorTheme, size } = this.props;
              let finnalValue = value;
              if (finnalValue && typeof finnalValue !== 'string') {
                  finnalValue = JSON.stringify(finnalValue, null, 2);
              }
              return (react_1.default.createElement("div", { ref: this.divRef, className: cx(`EditorControl`, {
                      'is-focused': this.state.focused,
                      [`EditorControl--${size}`]: size
                  }, className) },
                  react_1.default.createElement(LazyComponent_1.default, { classPrefix: ns, component: Editor_1.default, value: finnalValue, onChange: onChange, disabled: disabled, onFocus: this.handleFocus, onBlur: this.handleBlur, language: language, editorTheme: editorTheme, editorDidMount: this.handleEditorMounted, options: Object.assign(Object.assign({}, options), { readOnly: disabled }) })));
          }
      }
      EditorControl.defaultProps = {
          language: 'javascript',
          editorTheme: 'vs',
          options: {
              automaticLayout: true,
              selectOnLineNumbers: true,
              scrollBeyondLastLine: false,
              folding: true,
              minimap: {
                  enabled: false
              }
          }
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], EditorControl.prototype, "updateContainerSize", null);
      return EditorControl;
  })();
  exports.default = EditorControl;
  exports.availableLanguages = [
      'bat',
      'c',
      'coffeescript',
      'cpp',
      'csharp',
      'css',
      'dockerfile',
      'fsharp',
      'go',
      'handlebars',
      'html',
      'ini',
      'java',
      'javascript',
      'json',
      'less',
      'lua',
      'markdown',
      'msdax',
      'objective-c',
      'php',
      'plaintext',
      'postiats',
      'powershell',
      'pug',
      'python',
      'r',
      'razor',
      'ruby',
      'sb',
      'scss',
      'sol',
      'sql',
      'swift',
      'typescript',
      'vb',
      'xml',
      'yaml'
  ];
  exports.EditorControls = exports.availableLanguages.map((lang) => {
      let EditorControlRenderer = /** @class */ (() => {
          let EditorControlRenderer = class EditorControlRenderer extends EditorControl {
          };
          EditorControlRenderer.lang = lang;
          EditorControlRenderer.displayName = `${lang[0].toUpperCase()}${lang.substring(1)}EditorControlRenderer`;
          EditorControlRenderer.defaultProps = Object.assign(Object.assign({}, EditorControl.defaultProps), { language: lang });
          EditorControlRenderer = tslib_1.__decorate([
              Item_1.FormItem({
                  type: `${lang}-editor`,
                  sizeMutable: false
              })
          ], EditorControlRenderer);
          return EditorControlRenderer;
      })();
      return EditorControlRenderer;
  });
  let JavascriptEditorControlRenderer = /** @class */ (() => {
      let JavascriptEditorControlRenderer = class JavascriptEditorControlRenderer extends EditorControl {
      };
      JavascriptEditorControlRenderer.defaultProps = Object.assign(Object.assign({}, EditorControl.defaultProps), { language: 'javascript' });
      JavascriptEditorControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'js-editor',
              sizeMutable: false
          })
      ], JavascriptEditorControlRenderer);
      return JavascriptEditorControlRenderer;
  })();
  let TypescriptEditorControlRenderer = /** @class */ (() => {
      let TypescriptEditorControlRenderer = class TypescriptEditorControlRenderer extends EditorControl {
      };
      TypescriptEditorControlRenderer.defaultProps = Object.assign(Object.assign({}, EditorControl.defaultProps), { language: 'typescript' });
      TypescriptEditorControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'ts-editor',
              sizeMutable: false
          })
      ], TypescriptEditorControlRenderer);
      return TypescriptEditorControlRenderer;
  })();
  let EditorControlRenderer = /** @class */ (() => {
      let EditorControlRenderer = class EditorControlRenderer extends EditorControl {
      };
      EditorControlRenderer.defaultProps = Object.assign(Object.assign({}, EditorControl.defaultProps), { language: 'javascript' });
      EditorControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: `editor`,
              sizeMutable: false
          })
      ], EditorControlRenderer);
      return EditorControlRenderer;
  })();
  exports.EditorControlRenderer = EditorControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0VkaXRvci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFDbkUsMkZBQTJEO0FBRTNELDZFQUE2QztBQUM3QywrQ0FBNEM7QUFxRzVDO0lBQUEsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQXFCMUUsWUFBWSxLQUFrQjtZQUM1QixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFQZixVQUFLLEdBQUc7Z0JBQ04sT0FBTyxFQUFFLEtBQUs7YUFDZixDQUFDO1lBRUYsY0FBUyxHQUFvQixFQUFFLENBQUM7WUFDaEMsV0FBTSxHQUFHLGVBQUssQ0FBQyxTQUFTLEVBQWtCLENBQUM7WUFzQzNDLGVBQVUsR0FBRyxDQUFDLENBQUM7WUFsQ2IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLENBQUM7UUFFRCxvQkFBb0I7WUFDbEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLENBQUM7UUFFRCxXQUFXO1lBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQztnQkFDWixPQUFPLEVBQUUsSUFBSTthQUNkLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxVQUFVO1lBQ1IsSUFBSSxDQUFDLFFBQVEs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

});
