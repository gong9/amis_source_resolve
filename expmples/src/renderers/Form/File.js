amis.define('src/renderers/Form/File.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.FileControlRenderer = exports.getNameFromUrl = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  // @ts-ignore
  const mapLimit_1 = tslib_1.__importDefault(require("node_modules/async/mapLimit"));
  const Image_1 = tslib_1.__importDefault(require("src/renderers/Form/Image.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const api_1 = require("src/utils/api.ts");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  const react_dropzone_1 = tslib_1.__importDefault(require("node_modules/react-dropzone/dist/index"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  let preventEvent = (e) => e.stopPropagation();
  function getNameFromUrl(url) {
      if (/(?:\/|^)([^\/]+?)$/.test(url)) {
          return decodeURIComponent(RegExp.$1);
      }
      return url;
  }
  exports.getNameFromUrl = getNameFromUrl;
  let FileControl = /** @class */ (() => {
      class FileControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.dropzone = react_1.default.createRef();
              const value = props.value;
              const multiple = props.multiple;
              const joinValues = props.joinValues;
              const delimiter = props.delimiter;
              let files = [];
              if (value && value instanceof Blob) {
                  files = [value];
              }
              else if (value) {
                  files = (Array.isArray(value)
                      ? value
                      : joinValues
                          ? `${value.value || value}`.split(delimiter)
                          : [(value.value || value)])
                      .map(item => FileControl.valueToFile(item, props))
                      .filter(item => item);
              }
              this.state = {
                  files,
                  uploading: false
              };
              this.sendFile = this.sendFile.bind(this);
              this.removeFile = this.removeFile.bind(this);
              this.clearError = this.clearError.bind(this);
              this.handleDrop = this.handleDrop.bind(this);
              this.handleDropRejected = this.handleDropRejected.bind(this);
              this.startUpload = this.startUpload.bind(this);
              this.stopUpload = this.stopUpload.bind(this);
              this.retry = this.retry.bind(this);
              this.toggleUpload = this.toggleUpload.bind(this);
              this.tick = this.tick.bind(this);
              this.onChange = this.onChange.bind(this);
              this.uploadFile = this.uploadFile.bind(this);
              this.uploadBigFile = this.uploadBigFile.bind(this);
              this.handleSelect = this.handleSelect.bind(this);
          }
          static valueToFile(value, props, files) {
              let file = files && typeof value === 'string'
                  ? find_1.default(files, item => item.value === value)
                  : undefined;
              return value
                  ? value instanceof File
                      ? {
                          state: 'ready',
                          value: value,
                          name: value.name,
                          url: '',
                          id: helper_1.guid()
                      }
                      : Object.assign({}, (typeof value === 'string'
                          ? {
                              state: file && file.state ? file.state : 'init',
                              value,
                              name: (file && file.name) ||
                                  (/^data:/.test(value)
                                      ? 'base64数据'
                                      : getNameFromUrl(value)),
                              id: helper_1.guid(),
                              url: typeof props.downloadUrl === 'string' &&
                                  value &&
                                  !/^data:/.test(value)
                                  ? `${props.downloadUrl}${value}`
                                  : undefined
                          }
                          : value))
                  : undefined;
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value && this.emitValue !== nextProps.value) {
                  const value = nextProps.value;
                  const multiple = nextProps.multiple;
                  const joinValues = nextProps.joinValues;
                  const delimiter = nextProps.delimiter;
                  let files = [];
                  if (value) {
                      files = (Array.isArray(value)
                          ? value
                          : joinValues && typeof value === 'string'
                              ? value.split(delimiter)
                              : [value])
                          .map(item => {
                          let obj = FileControl.valueToFile(item, nextProps, this.state.files);
                          let org;
                          if (obj &&
                              (org = find_1.default(this.state.files, (item) => item.value === obj.value))) {
                              obj = Object.assign(Object.assign(Object.assign({}, org), obj), { id: obj.id || org.id });
                          }
                          return obj;
                      })
                          .filter(item => item);
                  }
                  this.setState({
                      files: files
                  });
              }
          }
          handleDrop(files) {
              if (!files.length) {
                  return;
              }
              const { maxSize, multiple, maxLength, translate: __ } = this.props;
              let allowed = multiple && maxLength
                  ? maxLength - this.state.files.length
                  : files.length;
              const inputFiles = [];
              [].slice.call(files, 0, allowed).forEach((file) => {
                  if (maxSize && file.size > maxSize) {
                      this.props.env.alert(__('File.maxSize', {
                          filename: file.name,
                          actualSize: Image_1.default.formatFileSize(file.size),
                          maxSize: Image_1.default.formatFileSize(maxSize)
                      }));
                      file.state = 'invalid';
                  }
                  else {
                      file.state = 'pending';
                  }
                  file.id = helper_1.guid();
                  inputFiles.push(file);
              });
              if (!inputFiles.length) {
                  return;
              }
              this.setState({
                  error: null,
                  files: multiple ? this.state.files.concat(inputFiles) : inputFiles
              }, () => {
                  const { autoUpload } = this.props;
                  if (autoUpload) {
                      this.startUpload();
                  }
              });
          }
          handleDropRejected(rejectedFiles, evt) {
              if (evt.type !== 'change' && evt.type !== 'drop') {
                  return;
              }
              const { multiple, env, accept, translate: __ } = this.props;
              const files = rejectedFiles.map(fileRejection => (Object.assign(Object.assign({}, fileRejection.file), { state: 'invalid', id: helper_1.guid(), name: fileRejection.file.name })));
              // this.setState({
              //   files: multiple
              //     ? this.state.files.concat(files)
              //     : this.state.files.length
              //     ? this.state.files
              //     : files.slice(0, 1)
              // });
              env.alert(__('File.invalidType', {
                  files: files.map((item) => `「${item.name}」`).join(' '),
                  accept
              }));
          }
          handleSelect() {
              this.dropzone.current && this.dropzone.current.open();
          }
          startUpload(retry = false) {
              if (this.state.uploading) {
                  return;
              }
              this.setState({
                  uploading: true,
                  files: this.state.files.map(file => {
                      if (retry && file.state === 'error') {
                          file.state = 'pending';
                          file.progress = 0;
                      }
                      return file;
                  })
              }, this.tick);
          }
          toggleUpload(e) {
              e.preventDefault();
              return this.state.uploading ? this.stopUpload() : this.startUpload();
          }
          stopUpload() {
              if (!this.state.uploading) {
                  return;
              }
              this.setState({
                  uploading: false
              });
          }
          retry() {
              this.startUpload(true);
          }
          tick() {
              if (this.current || !this.state.uploading) {
                  return;
              }
              const { translate: __, multiple, autoFill, onBulkChange } = this.props;
              const file = find_1.default(this.state.files, item => item.state === 'pending');
              if (file) {
                  this.current = file;
                  file.state = 'uploading';
                  this.setState({
                      files: this.state.files.concat()
                  }, () => this.sendFile(file, (error, file, obj) => {
                      const files = this.state.files.concat();
                      const idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      let newFile = file;
                      if (error) {
                          newFile.state = 'error';
                          newFile.error = error;
                      }
                      else {
                          newFile = obj;
                          newFile.name = newFile.name || file.name;
                      }
                      files.splice(idx, 1, newFile);
                      this.current = null;
                      this.setState({
                          error: error ? error : null,
                          files: files
                      }, () => {
                          // todo 这个逻辑应该移到 onChange 里面去，因为这个时候并不一定修改了表单项的值。
                          const sendTo = !multiple &&
                              autoFill &&
                              !helper_1.isEmpty(autoFill) &&
                              tpl_builtin_1.dataMapping(autoFill, obj || {});
                          sendTo && onBulkChange(sendTo);
                          this.tick();
                      });
                  }, progress => {
                      const files = this.state.files.concat();
                      const idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      // file 是个非 File 对象，先不copy了直接改。
                      file.progress = progress;
                      this.setState({
                          files
                      });
                  }));
              }
              else {
                  this.setState({
                      uploading: false
                  }, () => {
                      this.onChange(!!this.resolve);
                      if (this.resolve) {
                          this.resolve(this.state.files.some(file => file.state === 'error')
                              ? __('File.errorRetry')
                              : null);
                          this.resolve = undefined;
                      }
                  });
              }
          }
          sendFile(file, cb, onProgress) {
              const { receiver, fileField, downloadUrl, useChunk, chunkSize, startChunkApi, chunkApi, finishChunkApi, asBase64, asBlob, data, translate: __ } = this.props;
              if (asBase64) {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                      file.state = 'ready';
                      cb(null, file, {
                          value: reader.result,
                          name: file.name,
                          url: '',
                          state: 'ready',
                          id: file.id
                      });
                  };
                  reader.onerror = (error) => cb(error.message);
                  return;
              }
              else if (asBlob) {
                  file.state = 'ready';
                  setTimeout(() => cb(null, file, {
                      name: file.name,
                      value: file,
                      url: '',
                      state: 'ready',
                      id: file.id
                  }), 4);
                  return;
              }
              let fn = (useChunk === 'auto' && chunkSize && file.size > chunkSize) ||
                  useChunk === true
                  ? this.uploadBigFile
                  : this.uploadFile;
              fn(file, receiver, {}, {
                  fieldName: fileField,
                  chunkSize,
                  startChunkApi,
                  chunkApi,
                  finishChunkApi,
                  data
              }, onProgress)
                  .then(ret => {
                  if (ret.status || !ret.data) {
                      throw new Error(ret.msg || __('File.errorRetry'));
                  }
                  onProgress(1);
                  let value = ret.data.value || ret.data.url || ret.data;
                  cb(null, file, Object.assign(Object.assign({}, (isPlainObject_1.default(ret.data) ? ret.data : null)), { value: value, url: typeof downloadUrl === 'string' && value
                          ? `${downloadUrl}${value}`
                          : ret.data
                              ? ret.data.url
                              : null, state: 'uploaded', id: file.id }));
              })
                  .catch(error => {
                  cb(error.message || __('File.errorRetry'), file);
              });
          }
          removeFile(file, index) {
              const files = this.state.files.concat();
              files.splice(index, 1);
              this.setState({
                  files: files
              }, this.onChange);
          }
          clearError() {
              this.setState({
                  error: null
              });
          }
          onChange(changeImmediately) {
              const { multiple, onChange, joinValues, extractValue, valueField, delimiter, resetValue, asBlob } = this.props;
              const files = this.state.files.filter(file => ~['uploaded', 'init', 'ready'].indexOf(file.state));
              let value = multiple ? files : files[0];
              if (value) {
                  if (extractValue || asBlob) {
                      value = Array.isArray(value)
                          ? value.map((item) => item[valueField || 'value'])
                          : value[valueField || 'value'];
                  }
                  else if (joinValues) {
                      value = Array.isArray(value)
                          ? value
                              .map((item) => item[valueField || 'value'])
                              .join(delimiter || ',')
                          : value[valueField || 'value'];
                  }
              }
              else {
                  value = typeof resetValue === 'undefined' ? '' : resetValue;
              }
              onChange((this.emitValue = value), undefined, changeImmediately);
          }
          uploadFile(file, receiver, params, config = {}, onProgress) {
              const fd = new FormData();
              const api = api_1.buildApi(receiver, helper_1.createObject(config.data, params), {
                  method: 'post'
              });
              helper_1.qsstringify(Object.assign(Object.assign({}, api.data), params))
                  .split('&')
                  .forEach(item => {
                  const parts = item.split('=');
                  fd.append(parts[0], decodeURIComponent(parts[1]));
              });
              // Note: File类型字段放在后面，可以支持第三方云存储鉴权
              fd.append(config.fieldName || 'file', file);
              return this._send(api, fd, {}, onProgress);
          }
          uploadBigFile(file, receiver, params, config = {}, onProgress) {
              const chunkSize = config.chunkSize || 5 * 1024 * 1024;
              const self = this;
              let startProgress = 0.2;
              let endProgress = 0.9;
              let progressArr;
              const __ = this.props.translate;
              return new Promise((resolve, reject) => {
                  let state;
                  const startApi = api_1.buildApi(config.startChunkApi, helper_1.createObject(config.data, Object.assign(Object.assign({}, params), { filename: file.name })), {
                      method: 'post',
                      autoAppend: true
                  });
                  self._send(startApi).then(startChunk).catch(reject);
                  function startChunk(ret) {
                      onProgress(startProgress);
                      const tasks = getTasks(file);
                      progressArr = tasks.map(() => 0);
                      if (!ret.data) {
                          throw new Error(__('File.uploadFailed'));
                      }
                      state = {
                          key: ret.data.key,
                          uploadId: ret.data.uploadId,
                          loaded: 0,
                          total: tasks.length
                      };
                      mapLimit_1.default(tasks, 3, uploadPartFile(state, config), function (err, results) {
                          if (err) {
                              reject(err);
                          }
                          else {
                              finishChunk(results, state);
                          }
                      });
                  }
                  function updateProgress(partNumber, progress) {
                      progressArr[partNumber - 1] = progress;
                      onProgress(startProgress +
                          (endProgress - startProgress) *
                              (progressArr.reduce((count, progress) => count + progress, 0) /
                                  progressArr.length));
                  }
                  function finishChunk(partList, state) {
                      onProgress(endProgress);
                      const endApi = api_1.buildApi(config.finishChunkApi, helper_1.createObject(config.data, Object.assign(Object.assign({}, params), { uploadId: state.uploadId, key: state.key, filename: file.name, partList })), {
                          method: 'post',
                          autoAppend: true
                      });
                      self._send(endApi).then(resolve).catch(reject);
                  }
                  function uploadPartFile(state, conf) {
                      return (task, callback) => {
                          const api = api_1.buildApi(conf.chunkApi, helper_1.createObject(config.data, params), {
                              method: 'post'
                          });
                          const fd = new FormData();
                          let blob = task.file.slice(task.start, task.stop + 1);
                          helper_1.qsstringify(Object.assign(Object.assign({}, api.data), params))
                              .split('&')
                              .forEach(item => {
                              const parts = item.split('=');
                              fd.append(parts[0], decodeURIComponent(parts[1]));
                          });
                          fd.append('key', state.key);
                          fd.append('uploadId', state.uploadId);
                          fd.append('partNumber', task.partNumber.toString());
                          fd.append('partSize', task.partSize.toString());
                          // Note: File类型字段放在后面，可以支持第三方云存储鉴权
                          fd.append(config.fieldName || 'file', blob, file.name);
                          return self
                              ._send(api, fd, {}, progress => updateProgress(task.partNumber, progress))
                              .then(ret => {
                              state.loaded++;
                              callback(null, {
                                  partNumber: task.partNumber,
                                  eTag: ret.data.eTag
                              });
                          })
                              .catch(callback);
                      };
                  }
                  function getTasks(file) {
                      let leftSize = file.size;
                      let offset = 0;
                      let partNumber = 1;
                      let tasks = [];
                      while (leftSize > 0) {
                          let partSize = Math.min(leftSize, chunkSize);
                          tasks.push({
                              file: file,
                              partNumber: partNumber,
                              partSize: partSize,
                              start: offset,
                              stop: offset + partSize - 1
                          });
                          leftSize -= partSize;
                          offset += partSize;
                          partNumber += 1;
                      }
                      return tasks;
                  }
              });
          }
          _send(api, data, options, onProgress) {
              const env = this.props.env;
              if (!env || !env.fetcher) {
                  throw new Error('fetcher is required');
              }
              return env.fetcher(api, data, Object.assign(Object.assign({ method: 'post' }, options), { withCredentials: true, onUploadProgress: onProgress
                      ? (event) => onProgress(event.loaded / event.total)
                      : undefined }));
          }
          validate() {
              const __ = this.props.translate;
              if (this.state.uploading ||
                  this.state.files.some(item => item.state === 'pending')) {
                  return new Promise(resolve => {
                      this.resolve = resolve;
                      this.startUpload();
                  });
              }
              else if (this.state.files.some(item => item.state === 'error')) {
                  return __('File.errorRetry');
              }
          }
          render() {
              const { btnLabel, accept, disabled, maxLength, multiple, autoUpload, description, hideUploadButton, className, classnames: cx, translate: __, render } = this.props;
              let { files, uploading, error } = this.state;
              const hasPending = files.some(file => file.state == 'pending');
              let uploaded = 0;
              let failed = 0;
              this.state.uploading ||
                  this.state.files.forEach(item => {
                      if (item.state === 'error') {
                          failed++;
                      }
                      else if (item.state === 'uploaded') {
                          uploaded++;
                      }
                  });
              return (react_1.default.createElement("div", { className: cx('FileControl', className) },
                  react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept === '*' ? '' : accept, multiple: multiple }, ({ getRootProps, getInputProps, isDragActive }) => (react_1.default.createElement("div", Object.assign({}, getRootProps({
                      onClick: preventEvent
                  }), { className: cx('FileControl-dropzone', {
                          disabled,
                          'is-empty': !files.length,
                          'is-active': isDragActive
                      }) }),
                      react_1.default.createElement("input", Object.assign({}, getInputProps())),
                      isDragActive ? (react_1.default.createElement("div", { className: cx('FileControl-acceptTip') }, __('File.dragDrop'))) : (react_1.default.createElement(react_1.default.Fragment, null,
                          (multiple && (!maxLength || files.length < maxLength)) ||
                              !multiple ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: disabled, className: cx('FileControl-selectBtn'), onClick: this.handleSelect },
                              react_1.default.createElement(icons_1.Icon, { icon: "upload", className: "icon" }),
                              !multiple && files.length
                                  ? __('File.repick')
                                  : multiple && files.length
                                      ? __('File.continueAdd')
                                      : btnLabel
                                          ? btnLabel
                                          : __('File.upload'))) : null,
                          description
                              ? render('desc', description, {
                                  className: cx('FileControl-description')
                              })
                              : null,
                          Array.isArray(files) ? (react_1.default.createElement("ul", { className: cx('FileControl-list') }, files.map((file, index) => (react_1.default.createElement("li", { key: file.id },
                              react_1.default.createElement("div", { className: cx('FileControl-itemInfo', {
                                      'is-invalid': file.state === 'invalid' ||
                                          file.state === 'error'
                                  }) },
                                  react_1.default.createElement(icons_1.Icon, { icon: "file", className: "icon" }),
                                  file.url ? (react_1.default.createElement("a", { className: cx('FileControl-itemInfoText'), target: "_blank", rel: "noopener", href: file.url }, file.name || file.filename)) : (react_1.default.createElement("span", { className: cx('FileControl-itemInfoText') }, file.name || file.filename)),
                                  file.state === 'invalid' ||
                                      file.state === 'error' ? (react_1.default.createElement(icons_1.Icon, { icon: "fail", className: "icon" })) : null,
                                  file.state !== 'uploading' && !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), className: cx('FileControl-clear'), onClick: () => this.removeFile(file, index) },
                                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null),
                              file.state === 'uploading' ||
                                  file.state === 'uploaded' ? (react_1.default.createElement("div", { className: cx('FileControl-progressInfo') },
                                  react_1.default.createElement("div", { className: cx('FileControl-progress') },
                                      react_1.default.createElement("span", { style: {
                                              width: `${file.state === 'uploaded'
                                                  ? 100
                                                  : (file.progress || 0) * 100}%`
                                          } })),
                                  file.state === 'uploaded' ? (react_1.default.createElement(icons_1.Icon, { icon: "success", className: "icon" })) : (react_1.default.createElement("span", null,
                                      Math.round((file.progress || 0) * 100),
                                      "%")))) : null))))) : null))))),
                  failed ? (react_1.default.createElement("div", { className: cx('FileControl-sum') },
                      __('File.result', {
                          uploaded,
                          failed
                      }),
                      react_1.default.createElement("a", { onClick: this.retry }, __('File.retry')),
                      __('File.failed'))) : null,
                  !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", disabled: !hasPending, className: cx('FileControl-uploadBtn'), onClick: this.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null));
          }
      }
      FileControl.defaultProps = {
          maxSize: 0,
          maxLength: 0,
          placeholder: '',
          receiver: '/api/upload/file',
          fileField: 'file',
          joinValues: true,
          extractValue: false,
          delimiter: ',',
          downloadUrl: '',
          useChunk: 'auto',
          chunkSize: 5 * 1024 * 1024,
          startChunkApi: '/api/upload/startChunk',
          chunkApi: '/api/upload/chunk',
          finishChunkApi: '/api/upload/finishChunk',
          accept: '',
          multiple: false,
          autoUpload: true,
          hideUploadButton: false,
          stateTextMap: {
              init: '',
              pending: '等待上传',
              uploading: '上传中',
              error: '上传出错',
              uploaded: '已上传',
              ready: ''
          },
          asBase64: false
      };
      return FileControl;
  })();
  exports.default = FileControl;
  let FileControlRenderer = /** @class */ (() => {
      let FileControlRenderer = class FileControlRenderer extends FileControl {
      };
      FileControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'file',
              sizeMutable: false,
              renderDescription: false
          })
      ], FileControlRenderer);
      return FileControlRenderer;
  })();
  exports.FileControlRenderer = FileControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9GaWxlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUduRSwrREFBK0I7QUFDL0IsaUZBQWlEO0FBQ2pELGFBQWE7QUFDYixzRUFBc0M7QUFDdEMsNERBQW1DO0FBSW5DLCtDQUE0RTtBQUM1RSx5Q0FBeUM7QUFDekMsNkVBQTZDO0FBQzdDLGtEQUE0QztBQUM1Qyw0RUFBc0M7QUFFdEMseURBQW9EO0FBK05wRCxJQUFJLFlBQVksR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBRW5ELFNBQWdCLGNBQWMsQ0FBQyxHQUFXO0lBQ3hDLElBQUksb0JBQW9CLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ2xDLE9BQU8sa0JBQWtCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBTkQsd0NBTUM7QUFFRDtJQUFBLE1BQXFCLFdBQVksU0FBUSxlQUFLLENBQUMsU0FBK0I7UUE4RTVFLFlBQVksS0FBZ0I7WUFDMUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRmYsYUFBUSxHQUFHLGVBQUssQ0FBQyxTQUFTLEVBQU8sQ0FBQztZQUloQyxNQUFNLEtBQUssR0FBbUQsS0FBSyxDQUFDLEtBQUssQ0FBQztZQUMxRSxNQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsUUFBUSxDQUFDO1lBQ2hDLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDcEMsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQW1CLENBQUM7WUFDNUMsSUFBSSxLQUFLLEdBQXFCLEVBQUUsQ0FBQztZQUVq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

});
