amis.define('src/renderers/Form/DiffEditor.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DiffEditorRenderer = exports.DiffEditorControlRenderer = exports.DiffEditor = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const LazyComponent_1 = tslib_1.__importDefault(require("src/components/LazyComponent.tsx"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const helper_1 = require("src/utils/helper.ts");
  function loadComponent() {
      return Promise.resolve().then(() => new Promise(function(resolve){require(['src/components/Editor.tsx'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(item => item.default);
  }
  function normalizeValue(value, language) {
      if (value && typeof value !== 'string') {
          value = JSON.stringify(value, null, 2);
      }
      if (language && language === 'json') {
          try {
              value = JSON.stringify(typeof value === 'string' ? JSON.parse(value) : value, null, 2);
          }
          catch (e) { }
      }
      return value;
  }
  let DiffEditor = /** @class */ (() => {
      class DiffEditor extends react_1.default.Component {
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
              this.editorFactory = this.editorFactory.bind(this);
              this.handleEditorMounted = this.handleEditorMounted.bind(this);
              this.handleModifiedEditorChange = this.handleModifiedEditorChange.bind(this);
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
          componentDidUpdate(prevProps) {
              const { data, value, diffValue, language } = this.props;
              if (this.originalEditor &&
                  diffValue &&
                  (diffValue !== prevProps.diffValue || data !== prevProps.data)) {
                  this.originalEditor.getModel().setValue(tpl_builtin_1.isPureVariable(diffValue)
                      ? normalizeValue(tpl_builtin_1.resolveVariableAndFilter(diffValue || '', data, '| raw', () => ''), language)
                      : normalizeValue(diffValue, language));
              }
              if (this.modifiedEditor &&
                  value &&
                  value !== prevProps.value &&
                  !this.state.focused) {
                  this.modifiedEditor.getModel().setValue(normalizeValue(value, language));
              }
          }
          editorFactory(containerElement, monaco, options) {
              return monaco.editor.createDiffEditor(containerElement, options);
          }
          handleEditorMounted(editor, monaco) {
              const { value, data, language, diffValue } = this.props;
              this.monaco = monaco;
              this.editor = editor;
              this.modifiedEditor = editor.getModifiedEditor();
              this.originalEditor = editor.getOriginalEditor();
              this.toDispose.push(this.modifiedEditor.onDidFocusEditorWidget(this.handleFocus).dispose);
              this.toDispose.push(this.modifiedEditor.onDidBlurEditorWidget(this.handleBlur).dispose);
              this.toDispose.push(this.modifiedEditor.onDidChangeModelContent(this.handleModifiedEditorChange).dispose);
              this.toDispose.push(this.modifiedEditor.onDidChangeModelDecorations(() => {
                  this.updateContainerSize(this.modifiedEditor, monaco); // typing
                  requestAnimationFrame(this.updateContainerSize.bind(this, this.modifiedEditor, monaco)); // folding
              }).dispose);
              this.editor.setModel({
                  original: this.monaco.editor.createModel(tpl_builtin_1.isPureVariable(diffValue)
                      ? normalizeValue(tpl_builtin_1.resolveVariableAndFilter(diffValue || '', data, '| raw'), language)
                      : normalizeValue(diffValue, language), language),
                  modified: this.monaco.editor.createModel(normalizeValue(value, language), language)
              });
          }
          handleModifiedEditorChange() {
              const { onChange } = this.props;
              onChange && onChange(this.modifiedEditor.getModel().getValue());
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
              const { className, value, onChange, disabled, size, options, language, theme, classnames: cx } = this.props;
              return (react_1.default.createElement("div", { ref: this.divRef, className: cx('EditorControl', size ? `EditorControl--${size}` : '', className, {
                      'is-focused': this.state.focused
                  }) },
                  react_1.default.createElement(LazyComponent_1.default, { getComponent: loadComponent, value: value, onChange: onChange, disabled: disabled, language: language, theme: theme, editorDidMount: this.handleEditorMounted, editorFactory: this.editorFactory, options: Object.assign(Object.assign({}, options), { readOnly: disabled }) })));
          }
      }
      DiffEditor.defaultProps = {
          language: 'javascript',
          theme: 'vs',
          options: {
              automaticLayout: false,
              selectOnLineNumbers: true,
              scrollBeyondLastLine: false,
              folding: true,
              minimap: {
                  enabled: false
              }
          },
          diffValue: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], DiffEditor.prototype, "updateContainerSize", null);
      return DiffEditor;
  })();
  exports.DiffEditor = DiffEditor;
  let DiffEditorControlRenderer = /** @class */ (() => {
      let DiffEditorControlRenderer = class DiffEditorControlRenderer extends DiffEditor {
      };
      DiffEditorControlRenderer.defaultProps = Object.assign({}, DiffEditor.defaultProps);
      DiffEditorControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: `diff-editor`,
              sizeMutable: false
          })
      ], DiffEditorControlRenderer);
      return DiffEditorControlRenderer;
  })();
  exports.DiffEditorControlRenderer = DiffEditorControlRenderer;
  let DiffEditorRenderer = /** @class */ (() => {
      let DiffEditorRenderer = class DiffEditorRenderer extends DiffEditor {
      };
      DiffEditorRenderer.defaultProps = Object.assign(Object.assign({}, DiffEditor.defaultProps), { disabled: true });
      DiffEditorRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)diff-editor$/,
              name: 'diff-editor'
          })
      ], DiffEditorRenderer);
      return DiffEditorRenderer;
  })();
  exports.DiffEditorRenderer = DiffEditorRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlmZkVkaXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9EaWZmRWRpdG9yLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLDJDQUF1QztBQUN2QyxpQ0FBbUU7QUFDbkUsMkZBQTJEO0FBQzNELHlEQUdpQztBQUVqQywrQ0FBNEM7QUE0QjVDLFNBQVMsYUFBYTtJQUNwQixPQUFPLDBEQUFPLHlCQUF5QixJQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBU0QsU0FBUyxjQUFjLENBQUMsS0FBVSxFQUFFLFFBQWlCO0lBQ25ELElBQUksS0FBSyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN0QyxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO0tBQ3hDO0lBRUQsSUFBSSxRQUFRLElBQUksUUFBUSxLQUFLLE1BQU0sRUFBRTtRQUNuQyxJQUFJO1lBQ0YsS0FBSyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQ3BCLE9BQU8sS0FBSyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUNyRCxJQUFJLEVBQ0osQ0FBQyxDQUNGLENBQUM7U0FDSDtRQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7S0FDZjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQztBQUVEO0lBQUEsTUFBYSxVQUFXLFNBQVEsZUFBSyxDQUFDLFNBQStCO1FBMkJuRSxZQUFZLEtBQXNCO1lBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQVpmLFVBQUssR0FBRztnQkFDTixP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

});
