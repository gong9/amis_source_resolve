amis.define('src/components/Editor.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Editor
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Editor = exports.monacoFactory = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const theme_1 = require("src/theme.tsx");
  // 用于发布 sdk 版本的时候替换，因为不确定 sdk 版本怎么部署，而 worker 地址路径不可知。
  // 所以会被 fis3 替换成取相对的代码。
  function filterUrl(url) {
      return url;
  }
  window.MonacoEnvironment = {
      getWorkerUrl: function (moduleId, label) {
          let url = '/pkg/editor.worker.js';
          if (label === 'json') {
              url = '/pkg/json.worker.js';
          }
          else if (label === 'css') {
              url = '/pkg/css.worker.js';
          }
          else if (label === 'html') {
              url = '/pkg/html.worker.js';
          }
          else if (label === 'typescript' || label === 'javascript') {
              url = '/pkg/ts.worker.js';
          }
          url = filterUrl(url);
          // url 有可能会插件替换成 cdn 地址，比如：fis3-prepackager-stand-alone-pack
          if (/^https?/.test(url)) {
              return `data:text/javascript;charset=utf-8,${encodeURIComponent(`
          importScripts('${url}');`)}
        `;
          }
          return url;
      }
  };
  function monacoFactory(containerElement, monaco, options) {
      return monaco.editor.create(containerElement, Object.assign({ autoIndent: true, formatOnType: true, formatOnPaste: true, selectOnLineNumbers: true, scrollBeyondLastLine: false, folding: true, minimap: {
              enabled: false
          }, scrollbar: {
              alwaysConsumeMouseWheel: false
          } }, options));
  }
  exports.monacoFactory = monacoFactory;
  let Editor = /** @class */ (() => {
      class Editor extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.disposes = [];
              this.wrapperRef = this.wrapperRef.bind(this);
              this.currentValue = props.value;
          }
          componentDidUpdate(prevProps) {
              var _a, _b;
              if (this.props.value !== this.currentValue && this.editor) {
                  let value = String(this.props.value);
                  if (this.props.language === 'json') {
                      try {
                          value = JSON.stringify(JSON.parse(value), null, 2);
                      }
                      catch (e) { }
                  }
                  this.preventTriggerChangeEvent = true;
                  const eidtor = this.editor.getModifiedEditor
                      ? this.editor.getModifiedEditor()
                      : this.editor;
                  const model = eidtor.getModel();
                  eidtor.pushUndoStop();
                  // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
                  model.pushEditOperations([], [
                      {
                          range: model.getFullModelRange(),
                          text: value
                      }
                  ]);
                  eidtor.pushUndoStop();
                  this.preventTriggerChangeEvent = false;
              }
              if (this.props.options.readOnly !== prevProps.options.readOnly &&
                  this.editor) {
                  (_b = (_a = this.editor).updateOptions) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.options);
              }
          }
          componentWillUnmount() {
              var _a;
              if (this.editor) {
                  const context = this.props.context || window;
                  const monaco = context.monaco || window.monaco;
                  const editorWillUnmount = this.props.editorWillUnmount;
                  editorWillUnmount && editorWillUnmount(this.editor, monaco);
              }
              this.disposes.forEach(({ dispose }) => dispose());
              this.disposes = [];
              (_a = this.editor) === null || _a === void 0 ? void 0 : _a.dispose();
          }
          wrapperRef(ref) {
              this.container = ref;
              if (ref) {
                  this.loadMonaco();
              }
              else {
                  try {
                      this.disposes.forEach(({ dispose }) => dispose());
                      this.disposes = [];
                      if (this.editor) {
                          this.editor.getModel().dispose();
                          this.editor.dispose();
                      }
                      this.editor = null;
                  }
                  catch (e) {
                      // ignore
                  }
              }
          }
          loadMonaco() {
              Promise.resolve().then(() => new Promise(function(resolve){require(['examples/loadMonacoEditor.ts'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(monaco => this.initMonaco(monaco));
          }
          initMonaco(monaco) {
              var _a, _b;
              let value = this.props.value !== null ? this.props.value : this.props.defaultValue;
              const { language, editorTheme, options, editorFactory } = this.props;
              const containerElement = this.container;
              if (!containerElement) {
                  return;
              }
              // Before initializing monaco editor
              this.editorWillMount(monaco);
              if (this.props.language === 'json') {
                  try {
                      value = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 2);
                  }
                  catch (e) {
                      // ignore
                  }
              }
              const factory = editorFactory || monacoFactory;
              this.editor = factory(containerElement, monaco, Object.assign(Object.assign({}, options), { automaticLayout: true, value,
                  language,
                  editorTheme, theme: editorTheme }));
              // json 默认开启验证。
              (_a = monaco.languages.json) === null || _a === void 0 ? void 0 : _a.jsonDefaults.setDiagnosticsOptions(Object.assign({ enableSchemaRequest: true, validate: true, allowComments: true }, (_b = monaco.languages.json) === null || _b === void 0 ? void 0 : _b.jsonDefaults.diagnosticsOptions));
              // After initializing monaco editor
              this.editorDidMount(this.editor, monaco);
          }
          editorWillMount(monaco) {
              const { editorWillMount } = this.props;
              editorWillMount && editorWillMount(monaco);
          }
          editorDidMount(editor, monaco) {
              const { editorDidMount, onChange, onFocus, onBlur } = this.props;
              editorDidMount && editorDidMount(editor, monaco);
              editor.onDidChangeModelContent &&
                  this.disposes.push(editor.onDidChangeModelContent((event) => {
                      const value = editor.getValue();
                      // Always refer to the latest value
                      this.currentValue = value;
                      // Only invoking when user input changed
                      if (!this.preventTriggerChangeEvent && onChange) {
                          onChange(value, event);
                      }
                  }));
              onFocus &&
                  editor.onDidFocusEditorWidget &&
                  this.disposes.push(editor.onDidFocusEditorWidget(onFocus));
              onBlur &&
                  editor.onDidBlurEditorWidget &&
                  this.disposes.push(editor.onDidBlurEditorWidget(onBlur));
          }
          render() {
              const { className, classPrefix: ns, width, height } = this.props;
              let style = this.props.style || {};
              style.width = width;
              style.height = height;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}MonacoEditor`, className), style: style, ref: this.wrapperRef }));
          }
      }
      Editor.defaultProps = {
          language: 'javascript',
          editorTheme: 'vs',
          width: '100%',
          height: '100%',
          options: {}
      };
      return Editor;
  })();
  exports.Editor = Editor;
  exports.default = theme_1.themeable(Editor);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7OztBQUVILDBEQUEwQjtBQUMxQixvRUFBNEI7QUFDNUIsb0NBQWlEO0FBR2pELHNEQUFzRDtBQUN0RCx1QkFBdUI7QUFDdkIsU0FBUyxTQUFTLENBQUMsR0FBVztJQUM1QixPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFFQSxNQUFjLENBQUMsaUJBQWlCLEdBQUc7SUFDbEMsWUFBWSxFQUFFLFVBQVUsUUFBZ0IsRUFBRSxLQUFhO1FBQ3JELElBQUksR0FBRyxHQUFHLHVCQUF1QixDQUFDO1FBRWxDLElBQUksS0FBSyxLQUFLLE1BQU0sRUFBRTtZQUNwQixHQUFHLEdBQUcscUJBQXFCLENBQUM7U0FDN0I7YUFBTSxJQUFJLEtBQUssS0FBSyxLQUFLLEVBQUU7WUFDMUIsR0FBRyxHQUFHLG9CQUFvQixDQUFDO1NBQzVCO2FBQU0sSUFBSSxLQUFLLEtBQUssTUFBTSxFQUFFO1lBQzNCLEdBQUcsR0FBRyxxQkFBcUIsQ0FBQztTQUM3QjthQUFNLElBQUksS0FBSyxLQUFLLFlBQVksSUFBSSxLQUFLLEtBQUssWUFBWSxFQUFFO1lBQzNELEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztTQUMzQjtRQUVELEdBQUcsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckIsNERBQTREO1FBQzVELElBQUksU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUN2QixPQUFPLHNDQUFzQyxrQkFBa0IsQ0FBQzt5QkFDN0MsR0FBRyxLQUFLLENBQUM7T0FDM0IsQ0FBQztTQUNIO1FBRUQsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0NBQ0YsQ0FBQztBQUVGLFNBQWdCLGFBQWEsQ0FDM0IsZ0JB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

});
