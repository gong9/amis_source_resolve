amis.define('src/components/RichText.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file RichText
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const jquery_1 = tslib_1.__importDefault(require("node_modules/jquery/dist/jquery"));
  // Require Editor JS files.
  // import 'froala-editor/js/froala_editor.pkgd.min.js';
  [
      require('node_modules/froala-editor/js/froala_editor.min'),
      require('node_modules/froala-editor/js/plugins/align.min'),
      require('node_modules/froala-editor/js/plugins/char_counter.min'),
      require('node_modules/froala-editor/js/plugins/code_beautifier.min'),
      require('node_modules/froala-editor/js/plugins/code_view.min'),
      require('node_modules/froala-editor/js/plugins/colors.min'),
      require('node_modules/froala-editor/js/plugins/draggable.min'),
      require('node_modules/froala-editor/js/plugins/emoticons.min'),
      require('node_modules/froala-editor/js/plugins/entities.min'),
      // require('froala-editor/js/plugins/file.min'),
      require('node_modules/froala-editor/js/plugins/font_family.min'),
      require('node_modules/froala-editor/js/plugins/font_size.min'),
      require('node_modules/froala-editor/js/plugins/forms.min'),
      require('node_modules/froala-editor/js/plugins/fullscreen.min'),
      require('node_modules/froala-editor/js/plugins/help.min'),
      require('node_modules/froala-editor/js/plugins/image.min'),
      require('node_modules/froala-editor/js/plugins/image_manager.min'),
      require('node_modules/froala-editor/js/plugins/inline_class.min'),
      require('node_modules/froala-editor/js/plugins/inline_style.min'),
      require('node_modules/froala-editor/js/plugins/line_breaker.min'),
      require('node_modules/froala-editor/js/plugins/line_height.min'),
      require('node_modules/froala-editor/js/plugins/link.min'),
      require('node_modules/froala-editor/js/plugins/lists.min'),
      require('node_modules/froala-editor/js/plugins/paragraph_format.min'),
      require('node_modules/froala-editor/js/plugins/paragraph_style.min'),
      require('node_modules/froala-editor/js/plugins/print.min'),
      require('node_modules/froala-editor/js/plugins/quick_insert.min'),
      require('node_modules/froala-editor/js/plugins/quote.min'),
      require('node_modules/froala-editor/js/plugins/save.min'),
      require('node_modules/froala-editor/js/plugins/special_characters.min'),
      require('node_modules/froala-editor/js/plugins/table.min'),
      require('node_modules/froala-editor/js/plugins/url.min'),
      require('node_modules/froala-editor/js/plugins/video.min'),
      require('node_modules/froala-editor/js/plugins/word_paste.min')
  ].forEach(init => init());
  // Require Editor CSS files.
  ''/*@require node_modules/froala-editor/css/froala_style.min.css*/;
  ''/*@require node_modules/froala-editor/css/froala_editor.pkgd.min.css*/;
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  class FroalaEditor extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.listeningEvents = [];
          this.$element = null;
          this.$editor = null;
          this.config = {
              immediateReactModelUpdate: false,
              reactIgnoreAttrs: null
          };
          this.editorInitialized = false;
          this.oldModel = null;
          this.textareaRef = this.textareaRef.bind(this);
      }
      componentDidUpdate() {
          if (JSON.stringify(this.oldModel) == JSON.stringify(this.props.model)) {
              return;
          }
          this.setContent();
      }
      textareaRef(ref) {
          ref ? this.createEditor(ref) : this.destroyEditor();
      }
      createEditor(ref) {
          if (this.editorInitialized) {
              return;
          }
          this.config = this.props.config || this.config;
          this.$element = jquery_1.default(ref);
          this.setContent(true);
          this.registerEvents();
          resize_sensor_1.resizeSensor(ref.parentElement, () => {
              jquery_1.default(ref).prev('.fr-box').find('.fr-toolbar').css('width', '');
          });
          this.$editor = this.$element
              .froalaEditor(this.config)
              .data('froala.editor').$el;
          this.initListeners();
          this.editorInitialized = true;
      }
      setContent(firstTime = false) {
          if (!this.editorInitialized && !firstTime) {
              return;
          }
          if (this.props.model || this.props.model == '') {
              this.oldModel = this.props.model;
              this.setNormalTagContent(firstTime);
          }
      }
      setNormalTagContent(firstTime) {
          let self = this;
          function htmlSet() {
              self.$element.froalaEditor('html.set', self.props.model || '', true);
              //This will reset the undo stack everytime the model changes externally. Can we fix this?
              self.$element.froalaEditor('undo.reset');
              self.$element.froalaEditor('undo.saveStep');
          }
          if (firstTime) {
              this.registerEvent(this.$element, 'froalaEditor.initialized', htmlSet);
          }
          else {
              htmlSet();
          }
      }
      getEditor() {
          if (this.$element) {
              return this.$element.froalaEditor.bind(this.$element);
          }
          return null;
      }
      updateModel() {
          if (!this.props.onModelChange) {
              return;
          }
          let modelContent = '';
          let returnedHtml = this.$element.froalaEditor('html.get');
          if (typeof returnedHtml === 'string') {
              modelContent = returnedHtml;
          }
          this.oldModel = modelContent;
          this.props.onModelChange(modelContent);
      }
      initListeners() {
          let self = this;
          // bind contentChange and keyup event to froalaModel
          this.registerEvent(this.$element, 'froalaEditor.contentChanged', function () {
              self.updateModel();
          });
          if (this.config.immediateReactModelUpdate) {
              this.registerEvent(this.$editor, 'keyup', function () {
                  self.updateModel();
              });
          }
      }
      // register event on jquery editor element
      registerEvent(element, eventName, callback) {
          if (!element || !eventName || !callback) {
              return;
          }
          this.listeningEvents.push(eventName);
          element.on(eventName, callback);
      }
      registerEvents() {
          let events = this.config.events;
          if (!events) {
              return;
          }
          for (let event in events) {
              if (events.hasOwnProperty(event)) {
                  this.registerEvent(this.$element, event, events[event]);
              }
          }
      }
      destroyEditor() {
          if (this.$element) {
              this.listeningEvents && this.$element.off(this.listeningEvents.join(' '));
              this.$editor.off('keyup');
              this.$element.froalaEditor('destroy');
              this.listeningEvents.length = 0;
              this.$element = null;
              this.editorInitialized = false;
          }
      }
      render() {
          return react_1.default.createElement("textarea", { ref: this.textareaRef });
      }
  }
  exports.default = FroalaEditor;
  // 不限制视频插入。
  jquery_1.default.FE.VIDEO_PROVIDERS = [
      {
          test_regex: /.*/,
          url_regex: '',
          url_text: '',
          html: '<span class="fr-video fr-dvb fr-draggable" contenteditable="false" draggable="true"><video class="fr-draggable" controls="" data-msg="ok" data-status="0" src="{url}" style="width: 600px;"></video></span>'
      }
  ];
  jquery_1.default.FE.LANGUAGE['zh_cn'] = {
      translation: {
          // Place holder
          'Type something': '\u8f93\u5165\u4e00\u4e9b\u5185\u5bb9',
          // Basic formatting
          'Bold': '\u7c97\u4f53',
          'Italic': '\u659c\u4f53',
          'Underline': '\u4e0b\u5212\u7ebf',
          'Strikethrough': '\u5220\u9664\u7ebf',
          // Main buttons
          'Insert': '\u63d2\u5165',
          'Delete': '\u5220\u9664',
          'Cancel': '\u53d6\u6d88',
          'OK': '\u786e\u5b9a',
          'Back': '\u80cc\u90e8',
          'Remove': '\u53bb\u6389',
          'More': '\u66f4\u591a',
          'Update': '\u66f4\u65b0',
          'Style': '\u98ce\u683c',
          // Font
          'Font Family': '\u5b57\u4f53',
          'Font Size': '\u5b57\u53f7',
          // Colors
          'Colors': '\u989c\u8272',
          'Background': '\u80cc\u666f',
          'Text': '\u6587\u5b57',
          // Paragraphs
          'Paragraph Format': '\u683c\u5f0f',
          'Normal': '\u6b63\u5e38',
          'Code': '\u4ee3\u7801',
          'Heading 1': '\u6807\u98981',
          'Heading 2': '\u6807\u98982',
          'Heading 3': '\u6807\u98983',
          'Heading 4': '\u6807\u98984',
          // Style
          'Paragraph Style': '\u6bb5\u843d\u6837\u5f0f',
          'Inline Style': '\u5185\u8054\u6837\u5f0f',
          // Alignment
          'Align': '\u5bf9\u9f50\u65b9\u5f0f',
          'Align Left': '\u5de6\u5bf9\u9f50',
          'Align Center': '\u5c45\u4e2d',
          'Align Right': '\u53f3\u5bf9\u9f50',
          'Align Justify': '\u4e24\u7aef\u5bf9\u9f50',
          'None': '\u65e0',
          // Lists
          'Ordered List': '\u7f16\u53f7\u5217\u8868',
          'Unordered List': '\u9879\u76ee\u7b26\u53f7',
          // Indent
          'Decrease Indent': '\u51cf\u5c11\u7f29\u8fdb',
          'Increase Indent': '\u589e\u52a0\u7f29\u8fdb',
          // Links
          'Insert Link': '\u63d2\u5165\u94fe\u63a5',
          'Open in new tab': '\u5f00\u542f\u5728\u65b0\u6807\u7b7e\u9875',
          'Open Link': '\u6253\u5f00\u94fe\u63a5',
          'Edit Link': '\u7f16\u8f91\u94fe\u63a5',
          'Unlink': '\u5220\u9664\u94fe\u63a5',
          'Choose Link': '\u9009\u62e9\u94fe\u63a5',
          // Images
          'Insert Image': '\u63d2\u5165\u56fe\u7247',
          'Upload Image': '\u4e0a\u4f20\u56fe\u7247',
          'By URL': '\u901a\u8fc7\u7f51\u5740',
          'Browse': '\u6d4f\u89c8',
          'Drop image': '\u56fe\u50cf\u62d6\u653e',
          'or click': '\u6216\u70b9\u51fb',
          'Manage Images': '\u7ba1\u7406\u56fe\u50cf',
          'Loading': '\u8f7d\u5165\u4e2d',
          'Deleting': '\u5220\u9664',
          'Tags': '\u6807\u7b7e',
          'Are you sure? Image will be deleted.': '\u4f60\u786e\u5b9a\u5417\uff1f\u56fe\u50cf\u5c06\u88ab\u5220\u9664\u3002',
          'Replace': '\u66f4\u6362',
          'Uploading': '\u4e0a\u4f20',
          'Loading image': '\u5bfc\u5165\u56fe\u50cf',
          'Display': '\u663e\u793a',
          'Inline': '\u6392\u961f',
          'Break Text': '\u65ad\u5f00\u6587\u672c',
          'Alternate Text': '\u5907\u7528\u6587\u672c',
          'Change Size': '\u5c3a\u5bf8\u53d8\u5316',
          'Width': '\u5bbd\u5ea6',
          'Height': '\u9ad8\u5ea6',
          'Something went wrong. Please try again.': '\u51fa\u4e86\u4e9b\u95ee\u9898\u3002 \u8bf7\u518d\u8bd5\u4e00\u6b21\u3002',
          // Video
          'Insert Video': '\u63d2\u5165\u89c6\u9891',
          'Embedded Code': '\u5d4c\u5165\u5f0f\u4ee3\u7801',
          // Tables
          'Insert Table': '\u63d2\u5165\u8868\u683c',
          'Table Header': '\u8868\u5934',
          'Remove Table': '\u5220\u9664\u8868',
          'Table Style': '\u8868\u683c\u6837\u5f0f',
          'Horizontal Align': '\u6c34\u5e73\u5bf9\u9f50\u65b9\u5f0f',
          'Row': '\u884c',
          'Insert row above': '\u5728\u4e0a\u65b9\u63d2\u5165',
          'Insert row below': '\u5728\u4e0b\u65b9\u63d2\u5165',
          'Delete row': '\u5220\u9664\u884c',
          'Column': '\u5217',
          'Insert column before': '\u5728\u5de6\u4fa7\u63d2\u5165',
          'Insert column after': '\u5728\u53f3\u4fa7\u63d2\u5165',
          'Delete column': '\u5220\u9664\u5217',
          'Cell': '\u5355\u5143\u683c',
          'Merge cells': '\u5408\u5e76\u5355\u5143\u683c',
          'Horizontal split': '\u6c34\u5e73\u5206\u5272',
          'Vertical split': '\u5782\u76f4\u5206\u5272',
          'Cell Background': '\u5355\u5143\u683c\u80cc\u666f',
          'Vertical Align': '\u5782\u76f4\u5bf9\u9f50\u65b9\u5f0f',
          'Top': '\u6700\u4f73',
          'Middle': '\u4e2d\u95f4',
          'Bottom': '\u5e95\u90e8',
          'Align Top': '\u9876\u90e8\u5bf9\u9f50',
          'Align Middle': '\u4e2d\u95f4\u5bf9\u9f50',
          'Align Bottom': '\u5e95\u90e8\u5bf9\u9f50',
          'Cell Style': '\u5355\u5143\u683c\u6837\u5f0f',
          // Files
          'Upload File': '\u4e0a\u4f20\u6587\u4ef6',
          'Drop file': '\u6587\u4ef6\u62d6\u653e',
          // Emoticons
          'Emoticons': '\u8868\u60c5',
          'Grinning face': '\u8138\u4e0a\u7b11\u563b\u563b',
          'Grinning face with smiling eyes': '',
          'Face with tears of joy': '\u7b11\u563b\u563b\u7684\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b',
          'Smiling face with open mouth': '\u7b11\u8138\u5f20\u5f00\u5634',
          'Smiling face with open mouth and smiling eyes': '\u7b11\u8138\u5f20\u5f00\u5634\u5fae\u7b11\u7684\u773c\u775b',
          'Smiling face with open mouth and cold sweat': '\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57',
          'Smiling face with open mouth and tightly-closed eyes': '\u7b11\u8138\u5f20\u5f00\u5634\uff0c\u7d27\u7d27\u95ed\u7740\u773c\u775b',
          'Smiling face with halo': '\u7b11\u8138\u6655',
          'Smiling face with horns': '\u5fae\u7b11\u7684\u8138\u89d2',
          'Winking face': '\u7728\u773c\u8868\u60c5',
          'Smiling face with smiling eyes': '\u9762\u5e26\u5fae\u7b11\u7684\u773c\u775b',
          'Face savoring delicious food': '\u9762\u5bf9\u54c1\u5c1d\u7f8e\u5473\u7684\u98df\u7269',
          'Relieved face': '\u9762\u5bf9\u5982\u91ca\u91cd\u8d1f',
          'Smiling face with heart-shaped eyes': '\u5fae\u7b11\u7684\u8138\uff0c\u5fc3\u810f\u5f62\u7684\u773c\u775b',
          'Smiling face with sunglasses': '\u7b11\u8138\u592a\u9633\u955c',
          'Smirking face': '\u9762\u5bf9\u9762\u5e26\u7b11\u5bb9',
          'Neutral face': '\u4e2d\u6027\u9762',
          'Expressionless face': '\u9762\u65e0\u8868\u60c5',
          'Unamused face': '\u4e00\u8138\u4e0d\u5feb\u7684\u8138',
          'Face with cold sweat': '\u9762\u5bf9\u51b7\u6c57',
          'Pensive face': '\u6c89\u601d\u7684\u8138',
          'Confused face': '\u9762\u5bf9\u56f0\u60d1',
          'Confounded face': '\u8be5\u6b7b\u7684\u8138',
          'Kissing face': '\u9762\u5bf9\u63a5\u543b',
          'Face throwing a kiss': '\u9762\u5bf9\u6295\u63b7\u4e00\u4e2a\u543b',
          'Kissing face with smiling eyes': '\u63a5\u543b\u8138\uff0c\u542b\u7b11\u7684\u773c\u775b',
          'Kissing face with closed eyes': '\u63a5\u543b\u7684\u8138\u95ed\u7740\u773c\u775b',
          'Face with stuck out tongue': '\u9762\u5bf9\u4f38\u51fa\u820c\u5934',
          'Face with stuck out tongue and winking eye': '\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7728\u52a8\u7684\u773c\u775b',
          'Face with stuck out tongue and tightly-closed eyes': '\u9762\u5bf9\u4f38\u51fa\u820c\u5934\u548c\u7d27\u95ed\u7684\u773c\u775b',
          'Disappointed face': '\u9762\u5bf9\u5931\u671b',
          'Worried face': '\u9762\u5bf9\u62c5\u5fc3',
          'Angry face': '\u6124\u6012\u7684\u8138',
          'Pouting face': '\u9762\u5bf9\u5658\u5634',
          'Crying face': '\u54ed\u6ce3\u7684\u8138',
          'Persevering face': '\u600e\u5948\u8138',
          'Face with look of triumph': '\u9762\u5e26\u770b\u7684\u80dc\u5229',
          'Disappointed but relieved face': '\u5931\u671b\uff0c\u4f46\u8138\u4e0a\u91ca\u7136',
          'Frowning face with open mouth': '\u9762\u5bf9\u76b1\u7740\u7709\u5934\u5f20\u53e3',
          'Anguished face': '\u9762\u5bf9\u75db\u82e6',
          'Fearful face': '\u53ef\u6015\u7684\u8138',
          'Weary face': '\u9762\u5bf9\u538c\u5026',
          'Sleepy face': '\u9762\u5bf9\u56f0',
          'Tired face': '\u75b2\u60eb\u7684\u8138',
          'Grimacing face': '\u72f0\u72de\u7684\u8138',
          'Loudly crying face': '\u5927\u58f0\u54ed\u8138',
          'Face with open mouth': '\u9762\u5bf9\u5f20\u5f00\u5634',
          'Hushed face': '\u5b89\u9759\u7684\u8138',
          'Face with open mouth and cold sweat': '',
          'Face screaming in fear': '\u9762\u5bf9\u5f20\u5f00\u5634\uff0c\u4e00\u8eab\u51b7\u6c57',
          'Astonished face': '\u9762\u5bf9\u60ca\u8bb6',
          'Flushed face': '\u7ea2\u6251\u6251\u7684\u8138\u86cb',
          'Sleeping face': '\u719f\u7761\u7684\u8138',
          'Dizzy face': '\u9762\u5bf9\u7729',
          'Face without mouth': '\u8138\u4e0a\u6ca1\u6709\u5634',
          'Face with medical mask': '\u9762\u5bf9\u533b\u7597\u53e3\u7f69',
          // Line breaker
          'Break': '\u7834',
          // Math
          'Subscript': '\u4e0b\u6807',
          'Superscript': '\u4e0a\u6807',
          // Full screen
          'Fullscreen': '\u5168\u5c4f',
          // Horizontal line
          'Insert Horizontal Line': '\u63d2\u5165\u6c34\u5e73\u7ebf',
          // Clear formatting
          'Clear Formatting': '\u683c\u5f0f\u5316\u5220\u9664',
          // Undo, redo
          'Undo': '\u64a4\u6d88',
          'Redo': '\u91cd\u590d',
          // Select all
          'Select All': '\u5168\u9009',
          // Code view
          'Code View': '\u4ee3\u7801\u89c6\u56fe',
          // Quote
          'Quote': '\u5f15\u7528',
          'Increase': '\u589e\u52a0\u5f15\u7528',
          'Decrease': '\u5220\u9664\u5f15\u7528',
          // Quick Insert
          'Quick Insert': '\u5feb\u63d2'
      },
      direction: 'ltr'
  };
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmljaFRleHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9SaWNoVGV4dC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7OztBQUVILDBEQUEwQjtBQUMxQiw0REFBdUI7QUFFdkIsMkJBQTJCO0FBQzNCLHVEQUF1RDtBQUN2RDtJQUNFLE9BQU8sQ0FBQyx1Q0FBdUMsQ0FBQztJQUNoRCxPQUFPLENBQUMsb0NBQW9DLENBQUM7SUFDN0MsT0FBTyxDQUFDLDJDQUEyQyxDQUFDO0lBQ3BELE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQztJQUN2RCxPQUFPLENBQUMsd0NBQXdDLENBQUM7SUFDakQsT0FBTyxDQUFDLHFDQUFxQyxDQUFDO0lBQzlDLE9BQU8sQ0FBQyx3Q0FBd0MsQ0FBQztJQUNqRCxPQUFPLENBQUMsd0NBQXdDLENBQUM7SUFDakQsT0FBTyxDQUFDLHVDQUF1QyxDQUFDO0lBQ2hELGdEQUFnRDtJQUNoRCxPQUFPLENBQUMsMENBQTBDLENBQUM7SUFDbkQsT0FBTyxDQUFDLHdDQUF3QyxDQUFDO0lBQ2pELE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztJQUM3QyxPQUFPLENBQUMseUNBQXlDLENBQUM7SUFDbEQsT0FBTyxDQUFDLG1DQUFtQyxDQUFDO0lBQzVDLE9BQU8sQ0FBQyxvQ0FBb0MsQ0FBQztJQUM3QyxPQUFPLENBQUMsNENBQTRDLENBQUM7SUFDckQsT0FBTyxDQUFDLDJDQUEyQyxDQUFDO0lBQ3BELE9BQU8sQ0FBQywyQ0FBMkMsQ0FBQztJQUNwRCxPQUFPLENBQUMsMkNBQTJDLENBQUM7SUFDcEQsT0FBTyxDQUFDLDBDQUEwQyxDQUFDO0lBQ25ELE9BQU8sQ0FBQyxtQ0FBbUMsQ0FBQztJQUM1QyxPQUFPLENBQUMsb0NBQW9DLENBQUM7SUFDN0MsT0FBTyxDQUFDLCtDQUErQyxDQUFDO0lBQ3hELE9BQU8s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

});
