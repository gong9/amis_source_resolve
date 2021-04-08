amis.define('src/renderers/Form/Image.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ImageControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  ''/*@require node_modules/cropperjs/dist/cropper.css*/;
  const react_cropper_1 = tslib_1.__importDefault(require("node_modules/react-cropper/dist/react-cropper"));
  const react_dropzone_1 = tslib_1.__importDefault(require("node_modules/react-dropzone/dist/index"));
  require("node_modules/blueimp-canvastoblob/js/canvas-to-blob");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const api_1 = require("src/utils/api.ts");
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const attr_accept_1 = tslib_1.__importDefault(require("node_modules/attr-accept/dist/index"));
  const File_1 = require("src/renderers/Form/File.tsx");
  const Image_1 = tslib_1.__importDefault(require("src/renderers/Image.tsx"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  let preventEvent = (e) => e.stopPropagation();
  let ImageControl = /** @class */ (() => {
      class ImageControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  uploading: false,
                  locked: false,
                  files: []
              };
              this.files = [];
              this.cropper = react_1.default.createRef();
              this.dropzone = react_1.default.createRef();
              this.frameImageRef = react_1.default.createRef();
              this.current = null;
              this.unmounted = false;
              const value = props.value;
              const multiple = props.multiple;
              const joinValues = props.joinValues;
              const delimiter = props.delimiter;
              let files = [];
              if (value) {
                  // files = (multiple && Array.isArray(value) ? value : joinValues ? (value as string).split(delimiter) : [value])
                  files = (Array.isArray(value)
                      ? value
                      : joinValues && typeof value === 'string' && multiple
                          ? value.split(delimiter)
                          : [value])
                      .map(item => ImageControl.valueToFile(item))
                      .filter(item => item);
              }
              this.state = Object.assign(Object.assign({}, this.state), { files: (this.files = files), crop: this.buildCrop(props), frameImageWidth: 0 });
              this.sendFile = this.sendFile.bind(this);
              this.removeFile = this.removeFile.bind(this);
              this.handleDrop = this.handleDrop.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleCrop = this.handleCrop.bind(this);
              this.handleDropRejected = this.handleDropRejected.bind(this);
              this.cancelCrop = this.cancelCrop.bind(this);
              this.handleImageLoaded = this.handleImageLoaded.bind(this);
              this.handleFrameImageLoaded = this.handleFrameImageLoaded.bind(this);
              this.startUpload = this.startUpload.bind(this);
              this.stopUpload = this.stopUpload.bind(this);
              this.toggleUpload = this.toggleUpload.bind(this);
              this.tick = this.tick.bind(this);
              this.onChange = this.onChange.bind(this);
              this.addFiles = this.addFiles.bind(this);
              this.handleSelect = this.handleSelect.bind(this);
              this.handlePaste = this.handlePaste.bind(this);
          }
          static formatFileSize(size, units = [' B', ' KB', ' M', ' G']) {
              size = parseInt(size, 10) || 0;
              while (size > 1024 && units.length > 1) {
                  size /= 1024;
                  units.shift();
              }
              return size.toFixed(2) + units[0];
          }
          static valueToFile(value, props) {
              return value
                  ? Object.assign(Object.assign({}, (typeof value === 'string'
                      ? {
                          value,
                          url: value,
                          id: helper_1.guid()
                      }
                      : value)), { state: 'init' }) : undefined;
          }
          static sizeInfo(width, height, __) {
              if (!width) {
                  return __('Image.height', { height: height });
              }
              else if (!height) {
                  return __('Image.width', { width: width });
              }
              return __('Image.size', { width, height });
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
                          let obj = ImageControl.valueToFile(item, nextProps);
                          let org;
                          if (obj &&
                              (org = find_1.default(this.files, item => item.value === obj.value))) {
                              obj = Object.assign(Object.assign(Object.assign({}, org), obj), { id: org.id || obj.id });
                          }
                          return obj;
                      })
                          .filter(item => item);
                  }
                  this.setState({
                      files: (this.files = files)
                  });
              }
              if (props.crop !== nextProps.crop) {
                  this.setState({
                      crop: this.buildCrop(nextProps)
                  });
              }
          }
          componentWillUnmount() {
              this.unmounted = true;
          }
          buildCrop(props) {
              let crop = props.crop;
              const __ = this.props.translate;
              if (crop && props.multiple) {
                  props.env && props.env.alert && props.env.alert(__('Image.configError'));
                  return null;
              }
              if (crop === true) {
                  crop = {};
              }
              if (crop) {
                  crop = Object.assign({ aspectRatio: undefined, guides: true, dragMode: 'move', viewMode: 1, rotatable: false, scalable: false }, crop);
              }
              return crop;
          }
          handleDropRejected(rejectedFiles, evt) {
              if (evt.type !== 'change' && evt.type !== 'drop') {
                  return;
              }
              const { multiple, env, accept, translate: __ } = this.props;
              const files = rejectedFiles.map(fileRejection => (Object.assign(Object.assign({}, fileRejection.file), { state: 'invalid', id: helper_1.guid(), name: fileRejection.file.name })));
              // this.setState({
              //   files: this.files = multiple
              //     ? this.files.concat(files)
              //     : this.files.length
              //     ? this.files
              //     : files.slice(0, 1)
              // });
              env.alert(__('File.invalidType', {
                  files: files.map((file) => `「${file.name}」`).join(' '),
                  accept
              }));
          }
          startUpload(retry = false) {
              if (this.state.uploading) {
                  return;
              }
              this.setState({
                  uploading: true,
                  locked: true,
                  files: (this.files = this.files.map(file => {
                      if (retry && file.state === 'error') {
                          file.state = 'pending';
                          file.progress = 0;
                      }
                      return file;
                  }))
              }, this.tick);
          }
          toggleUpload() {
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
          tick() {
              const { multiple, autoFill, onBulkChange } = this.props;
              if (this.current || !this.state.uploading) {
                  return;
              }
              const env = this.props.env;
              const __ = this.props.translate;
              const file = find_1.default(this.files, item => item.state === 'pending');
              if (file) {
                  this.current = file;
                  file.state = 'uploading';
                  this.setState({
                      files: (this.files = this.files.concat())
                  }, () => this.sendFile(file, (error, file, obj) => {
                      const files = this.files.concat();
                      const idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      let newFile = file;
                      if (error) {
                          newFile.state =
                              file.state !== 'uploading' ? file.state : 'error';
                          newFile.error = error;
                          if (!this.props.multiple && newFile.state === 'invalid') {
                              files.splice(idx, 1);
                              this.current = null;
                              return this.setState({
                                  files: (this.files = files),
                                  error: error
                              }, this.tick);
                          }
                          env.notify('error', error || __('File.errorRetry'));
                      }
                      else {
                          newFile = Object.assign(Object.assign({ name: file.name }, obj), { preview: file.preview });
                      }
                      files.splice(idx, 1, newFile);
                      this.current = null;
                      this.setState({
                          files: (this.files = files)
                      }, () => {
                          // todo 这个逻辑应该移到 onChange 里面去，因为这个时候并不一定修改了表单项的值。
                          const sendTo = !multiple &&
                              autoFill &&
                              !helper_1.isEmpty(autoFill) &&
                              tpl_builtin_1.dataMapping(autoFill, newFile || {});
                          sendTo && onBulkChange(sendTo);
                          this.tick();
                      });
                  }, progress => {
                      const files = this.files.concat();
                      const idx = files.indexOf(file);
                      if (!~idx) {
                          return;
                      }
                      // file 是个非 File 对象，先不copy了直接改。
                      file.progress = progress;
                      this.setState({
                          files: (this.files = files)
                      });
                  }));
              }
              else {
                  this.setState({
                      uploading: false,
                      locked: false
                  }, () => {
                      this.onChange(!!this.resolve);
                      if (this.resolve) {
                          this.resolve(this.files.some(file => file.state === 'error')
                              ? __('File.errorRetry')
                              : null);
                          this.resolve = undefined;
                      }
                  });
              }
          }
          removeFile(file, index) {
              const files = this.files.concat();
              files.splice(index, 1);
              this.setState({
                  files: (this.files = files)
              }, this.onChange);
          }
          previewImage(file, index, e) {
              const { onImageEnlarge } = this.props;
              if (onImageEnlarge) {
                  const files = this.files;
                  e.preventDefault();
                  onImageEnlarge({
                      src: (file.preview || file.url),
                      originalSrc: (file.preview || file.url),
                      index,
                      list: files.map(file => ({
                          src: (file.preview || file.url),
                          originalSrc: (file.preview || file.url),
                          title: file.name || File_1.getNameFromUrl(file.value || file.url)
                      }))
                  });
              }
          }
          editImage(index) {
              const files = this.files;
              this.setState({
                  cropFile: {
                      preview: files[index].preview || files[index].url,
                      state: 'init'
                  }
              });
          }
          onChange(changeImmediately) {
              const { multiple, onChange, joinValues, extractValue, delimiter, valueField } = this.props;
              const files = this.files.filter(file => file.state == 'uploaded' || file.state == 'init');
              let newValue = files.length
                  ? joinValues
                      ? files[0].value
                      : files[0]
                  : '';
              if (multiple) {
                  newValue = joinValues
                      ? files.map(item => item.value).join(delimiter)
                      : extractValue
                          ? files.map(item => item.value)
                          : files;
              }
              else {
                  newValue = joinValues
                      ? newValue.value || newValue
                      : extractValue
                          ? newValue[valueField || 'value']
                          : newValue;
              }
              onChange((this.emitValue = newValue || ''), undefined, changeImmediately);
          }
          handleSelect() {
              this.dropzone.current && this.dropzone.current.open();
          }
          handleRetry(index) {
              const files = this.files.concat();
              const file = files[index];
              if (file.state !== 'invalid' && file.state !== 'error') {
                  return;
              }
              file.state = 'pending';
              file.progress = 0;
              this.setState({
                  files: files
              }, this.startUpload);
          }
          handleDrop(files) {
              const { multiple, crop } = this.props;
              if (crop && !multiple) {
                  const file = files[0];
                  if (!file.preview || !file.url) {
                      file.preview = window.URL.createObjectURL(file);
                  }
                  return this.setState({
                      cropFile: file
                  });
              }
              this.addFiles(files);
          }
          handlePaste(e) {
              const event = e.nativeEvent;
              const files = [];
              const items = event.clipboardData.items;
              const accept = this.props.accept || '*';
              [].slice.call(items).forEach((item) => {
                  let blob;
                  if (item.kind !== 'file' ||
                      !(blob = item.getAsFile()) ||
                      !attr_accept_1.default(blob, accept)) {
                      return;
                  }
                  blob.id = helper_1.guid();
                  files.push(blob);
              });
              this.handleDrop(files);
          }
          handleCrop() {
              this.cropper.current.getCroppedCanvas().toBlob((file) => {
                  this.addFiles([file]);
                  this.setState({
                      cropFile: undefined,
                      locked: false,
                      lockedReason: ''
                  });
              });
          }
          cancelCrop() {
              this.setState({
                  cropFile: undefined,
                  locked: false,
                  lockedReason: ''
              }, this.onChange);
          }
          addFiles(files) {
              if (!files.length) {
                  return;
              }
              const { multiple, maxLength, maxSize, accept, translate: __ } = this.props;
              let currentFiles = this.files;
              if (!multiple && currentFiles.length) {
                  currentFiles = [];
              }
              const allowed = (multiple
                  ? maxLength
                      ? maxLength
                      : files.length + currentFiles.length
                  : 1) - currentFiles.length;
              const inputFiles = [];
              [].slice.call(files, 0, allowed).forEach((file) => {
                  if (maxSize && file.size > maxSize) {
                      this.props.env.alert(__('File.maxSize', {
                          filename: file.name,
                          actualSize: ImageControl.formatFileSize(file.size),
                          maxSize: ImageControl.formatFileSize(maxSize)
                      }));
                      return;
                  }
                  file.state = 'pending';
                  file.id = helper_1.guid();
                  if (!file.preview || !file.url) {
                      file.preview = URL.createObjectURL(file);
                  }
                  inputFiles.push(file);
              });
              if (!inputFiles.length) {
                  return;
              }
              this.setState({
                  error: undefined,
                  files: (this.files = currentFiles.concat(inputFiles)),
                  locked: true
              }, () => {
                  const { autoUpload } = this.props;
                  if (autoUpload) {
                      this.startUpload();
                  }
              });
          }
          sendFile(file, cb, onProgress) {
              const { limit, translate: __ } = this.props;
              if (!limit) {
                  return this._upload(file, cb, onProgress);
              }
              const image = new Image();
              image.onload = () => {
                  const width = image.width;
                  const height = image.height;
                  let error = '';
                  if ((limit.width && limit.width != width) ||
                      (limit.height && limit.height != height)) {
                      error = __('Image.sizeNotEqual', {
                          info: ImageControl.sizeInfo(limit.width, limit.height, __)
                      });
                  }
                  else if ((limit.maxWidth && limit.maxWidth < width) ||
                      (limit.maxHeight && limit.maxHeight < height)) {
                      error = __('Image.limitMax', {
                          info: ImageControl.sizeInfo(limit.maxWidth, limit.maxHeight, __)
                      });
                  }
                  else if ((limit.minWidth && limit.minWidth > width) ||
                      (limit.minHeight && limit.minHeight > height)) {
                      error = __('Image.limitMin', {
                          info: ImageControl.sizeInfo(limit.minWidth, limit.minHeight, __)
                      });
                  }
                  else if (limit.aspectRatio &&
                      Math.abs(width / height - limit.aspectRatio) > 0.01) {
                      error = __(limit.aspectRatioLabel || 'Image.limitRatio', {
                          ratio: limit.aspectRatio.toFixed(2)
                      });
                  }
                  if (error) {
                      file.state = 'invalid';
                      cb(error, file);
                  }
                  else {
                      this._upload(file, cb, onProgress);
                  }
              };
              image.src = (file.preview || file.url);
          }
          _upload(file, cb, onProgress) {
              const __ = this.props.translate;
              this._send(file, this.props.receiver, {}, onProgress)
                  .then((ret) => {
                  if (ret.status) {
                      throw new Error(ret.msg || __('File.errorRetry'));
                  }
                  const obj = Object.assign(Object.assign({}, ret.data), { state: 'uploaded' });
                  obj.value = obj.value || obj.url;
                  cb(null, file, obj);
              })
                  .catch(error => cb(error.message || __('File.errorRetry'), file));
          }
          _send(file, receiver, params, onProgress) {
              const fd = new FormData();
              const data = this.props.data;
              const api = api_1.buildApi(receiver, helper_1.createObject(data, params), {
                  method: 'post'
              });
              const fileField = this.props.fileField || 'file';
              const idx = api.url.indexOf('?');
              if (~idx && params) {
                  params = Object.assign(Object.assign({}, qs_1.default.parse(api.url.substring(idx + 1))), params);
                  api.url = api.url.substring(0, idx) + '?' + helper_1.qsstringify(params);
              }
              else if (params) {
                  api.url += '?' + helper_1.qsstringify(params);
              }
              if (api.data) {
                  helper_1.qsstringify(api.data)
                      .split('&')
                      .forEach(item => {
                      let parts = item.split('=');
                      fd.append(parts[0], decodeURIComponent(parts[1]));
                  });
              }
              // Note: File类型字段放在后面，可以支持第三方云存储鉴权
              fd.append(fileField, file, file.name);
              const env = this.props.env;
              if (!env || !env.fetcher) {
                  throw new Error('fetcher is required');
              }
              return env.fetcher(api, fd, {
                  method: 'post',
                  onUploadProgress: (event) => onProgress(event.loaded / event.total)
              });
          }
          handleClick() {
              this.refs.dropzone.open();
          }
          handleImageLoaded(index, e) {
              const imgDom = e.currentTarget;
              const img = new Image();
              img.onload = () => {
                  delete img.onload;
                  const files = this.files.concat();
                  const file = files[index];
                  if (!file) {
                      return;
                  }
                  file.info = Object.assign(Object.assign({}, file.info), { width: img.width, height: img.height });
                  files.splice(index, 1, file);
                  const needUploading = !!(this.current || find_1.default(files, file => file.state === 'pending'));
                  this.unmounted ||
                      this.setState({
                          files: (this.files = files)
                      }, !needUploading ? this.onChange : undefined);
              };
              img.src = imgDom.src;
          }
          handleFrameImageLoaded(e) {
              const imgDom = e.currentTarget;
              const img = new Image();
              const { clientHeight } = this.frameImageRef.current;
              const _this = this;
              img.onload = function () {
                  const ratio = this.width / this.height;
                  const finalWidth = (ratio * (clientHeight - 2)).toFixed(2);
                  _this.setState({
                      frameImageWidth: +finalWidth
                  });
              };
              img.src = imgDom.src;
          }
          validate() {
              const __ = this.props.translate;
              if (this.state.locked && this.state.lockedReason) {
                  return this.state.lockedReason;
              }
              else if (this.state.cropFile) {
                  return new Promise(resolve => {
                      this.resolve = resolve;
                      this.handleCrop();
                  });
              }
              else if (this.state.uploading ||
                  this.files.some(item => item.state === 'pending')) {
                  return new Promise(resolve => {
                      this.resolve = resolve;
                      this.startUpload();
                  });
              }
              else if (this.files.some(item => item.state === 'error')) {
                  return __('File.errorRetry');
              }
          }
          render() {
              const { className, classnames: cx, placeholder, disabled, multiple, accept, maxLength, autoUpload, hideUploadButton, thumbMode, thumbRatio, reCropable, frameImage, fixedSize, fixedSizeClassName, translate: __ } = this.props;
              const { files, error, crop, uploading, cropFile, frameImageWidth } = this.state;
              let frameImageStyle = {};
              if (fixedSizeClassName && frameImageWidth && fixedSize) {
                  frameImageStyle.width = frameImageWidth;
              }
              const filterFrameImage = tpl_1.filter(frameImage, this.props.data, '| raw');
              const hasPending = files.some(file => file.state == 'pending');
              return (react_1.default.createElement("div", { className: cx(`ImageControl`, className) }, cropFile ? (react_1.default.createElement("div", { className: cx('ImageControl-cropperWrapper') },
                  react_1.default.createElement(react_cropper_1.default, Object.assign({}, crop, { ref: this.cropper, src: cropFile.preview })),
                  react_1.default.createElement("div", { className: cx('ImageControl-croperToolbar') },
                      react_1.default.createElement("a", { className: cx('ImageControl-cropCancel'), onClick: this.cancelCrop, "data-tooltip": __('cancle'), "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                      react_1.default.createElement("a", { className: cx('ImageControl-cropConfirm'), onClick: this.handleCrop, "data-tooltip": __('confirm'), "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" }))))) : (react_1.default.createElement(react_dropzone_1.default, { key: "drop-zone", ref: this.dropzone, onDrop: this.handleDrop, onDropRejected: this.handleDropRejected, accept: accept, multiple: multiple }, ({ getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject, isFocused }) => (react_1.default.createElement("div", Object.assign({}, getRootProps({
                  onClick: preventEvent,
                  onPaste: this.handlePaste,
                  className: cx('ImageControl-dropzone', {
                      disabled,
                      'is-empty': !files.length,
                      'is-active': isDragActive
                  })
              })),
                  react_1.default.createElement("input", Object.assign({}, getInputProps())),
                  isDragActive || isDragAccept || isDragReject ? (react_1.default.createElement("div", { className: cx('ImageControl-acceptTip', {
                          'is-accept': isDragAccept,
                          'is-reject': isDragReject
                      }) }, __('Image.dragDrop'))) : (react_1.default.createElement(react_1.default.Fragment, null,
                      files && files.length
                          ? files.map((file, key) => (react_1.default.createElement("div", { key: file.id || key, className: cx('ImageControl-item', {
                                  'is-uploaded': file.state !== 'uploading',
                                  'is-invalid': file.state === 'error' ||
                                      file.state === 'invalid'
                              }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), style: frameImageStyle }, file.state === 'invalid' ||
                              file.state === 'error' ? (react_1.default.createElement(react_1.default.Fragment, null,
                              react_1.default.createElement("a", { className: cx('ImageControl-itemClear'), "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: this.removeFile.bind(this, file, key) },
                                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                              react_1.default.createElement("a", { className: cx('ImageControl-retryBtn', {
                                      'is-disabled': disabled
                                  }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), onClick: this.handleRetry.bind(this, key) },
                                  react_1.default.createElement(icons_1.Icon, { icon: "retry", className: "icon" }),
                                  react_1.default.createElement("p", { className: "ImageControl-itemInfoError" }, __('File.repick'))))) : file.state === 'uploading' ? (react_1.default.createElement(react_1.default.Fragment, null,
                              react_1.default.createElement("a", { onClick: this.removeFile.bind(this, file, key), key: "clear", className: cx('ImageControl-itemClear'), "data-tooltip": __('Select.clear') },
                                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                              react_1.default.createElement("div", { key: "info", className: cx('ImageControl-itemInfo', fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : '') },
                                  react_1.default.createElement("p", null, __('File.uploading')),
                                  react_1.default.createElement("div", { className: cx('ImageControl-progress') },
                                      react_1.default.createElement("span", { style: {
                                              width: `${Math.round(file.progress * 100)}%`
                                          }, className: cx('ImageControl-progressValue') }))))) : (react_1.default.createElement(react_1.default.Fragment, null,
                              react_1.default.createElement(Image_1.default, { key: "image", className: cx('ImageControl-image', fixedSize ? 'Image-thumb--fixed-size' : ''), onLoad: this.handleImageLoaded.bind(this, key), src: file.preview || file.url, alt: file.name, thumbMode: thumbMode, thumbRatio: thumbRatio }),
                              react_1.default.createElement("div", { key: "overlay", className: cx('ImageControl-itemOverlay') },
                                  file.info ? ([
                                      react_1.default.createElement("div", { key: "info" },
                                          file.info.width,
                                          " x ",
                                          file.info.height),
                                      file.info.len ? (react_1.default.createElement("div", { key: "size" }, ImageControl.formatFileSize(file.info.len))) : null
                                  ]) : (react_1.default.createElement("div", null, "...")),
                                  react_1.default.createElement("a", { "data-tooltip": __('Image.zoomIn'), "data-position": "bottom", target: "_blank", rel: "noopener", href: file.url || file.preview, onClick: this.previewImage.bind(this, file, key) },
                                      react_1.default.createElement(icons_1.Icon, { icon: "view", className: "icon" })),
                                  !!crop &&
                                      reCropable !== false &&
                                      !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Image.crop'), "data-position": "bottom", onClick: this.editImage.bind(this, key) },
                                      react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null,
                                  !disabled ? (react_1.default.createElement("a", { "data-tooltip": __('Select.clear'), "data-position": "bottom", onClick: this.removeFile.bind(this, file, key) },
                                      react_1.default.createElement(icons_1.Icon, { icon: "remove", className: "icon" }))) : null,
                                  react_1.default.createElement("a", { "data-tooltip": file.name ||
                                          File_1.getNameFromUrl(file.value || file.url), "data-position": "bottom", target: "_blank" },
                                      react_1.default.createElement(icons_1.Icon, { icon: "info", className: "icon" }))))))))
                          : null,
                      (multiple && (!maxLength || files.length < maxLength)) ||
                          (!multiple && !files.length) ? (react_1.default.createElement("label", { className: cx('ImageControl-addBtn', {
                              'is-disabled': disabled
                          }, fixedSize ? 'ImageControl-fixed-size' : '', fixedSize ? fixedSizeClassName : ''), style: frameImageStyle, onClick: this.handleSelect, "data-tooltip": __(placeholder), "data-position": "right", ref: this.frameImageRef },
                          filterFrameImage ? (react_1.default.createElement(Image_1.default, { key: "upload-default-image", src: filterFrameImage, className: cx(fixedSize ? 'Image-thumb--fixed-size' : ''), onLoad: this.handleFrameImageLoaded.bind(this), thumbMode: thumbMode, thumbRatio: thumbRatio })) : (react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" })),
                          isFocused ? (react_1.default.createElement("span", { className: cx('ImageControl-pasteTip') }, __('Image.pasteTip'))) : null)) : null,
                      !autoUpload && !hideUploadButton && files.length ? (react_1.default.createElement(Button_1.default, { level: "default", className: cx('ImageControl-uploadBtn'), disabled: !hasPending, onClick: this.toggleUpload }, __(uploading ? 'File.pause' : 'File.start'))) : null,
                      error ? (react_1.default.createElement("div", { className: cx('ImageControl-errorMsg') }, error)) : null))))))));
          }
      }
      ImageControl.defaultProps = {
          limit: undefined,
          accept: 'image/jpeg, image/jpg, image/png, image/gif',
          receiver: '/api/upload',
          hideUploadButton: false,
          placeholder: 'Image.placeholder',
          joinValues: true,
          extractValue: false,
          delimiter: ',',
          autoUpload: true,
          multiple: false
      };
      return ImageControl;
  })();
  exports.default = ImageControl;
  let ImageControlRenderer = /** @class */ (() => {
      let ImageControlRenderer = class ImageControlRenderer extends ImageControl {
      };
      ImageControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'image',
              sizeMutable: false
          })
      ], ImageControlRenderer);
      return ImageControlRenderer;
  })();
  exports.ImageControlRenderer = ImageControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vSW1hZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLHNDQUFvQztBQUNwQywwRUFBb0M7QUFDcEMsNEVBQXNDO0FBRXRDLGdDQUE4QjtBQUM5QiwrREFBK0I7QUFDL0Isb0RBQW9CO0FBRXBCLHlDQUF5QztBQUN6QywrQ0FBNEU7QUFDNUUsa0RBQTRDO0FBQzVDLDZFQUE2QztBQUM3QyxzRUFBa0M7QUFDbEMsaUNBQXNDO0FBQ3RDLDZEQUF5RDtBQUV6RCx5REFBb0Q7QUFPcEQseUNBQXVDO0FBeU52QyxJQUFJLFlBQVksR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDO0FBbURuRDtJQUFBLE1BQXFCLFlBQWEsU0FBUSxlQUFLLENBQUMsU0FHL0M7UUEyRUMsWUFBWSxLQUFpQjtZQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFoQmYsVUFBSyxHQUFlO2dCQUNsQixTQUFTLEVBQUUsS0FBSztnQkFDaEIsTUFBTSxFQUFFLEtBQUs7Z0JBQ2IsS0FBSyxFQUFFLEVBQUU7YUFDVixDQUFDO1lBRUYsVUFBSyxHQUE2QixFQUFFLENBQUM7WUFDckMsWUFBTyxHQUFHLGVBQUssQ0FBQyxTQUFTLEVBQVcsQ0FBQztZQUNyQyxhQUFRLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBTyxDQUFDO1lBQ2xDLGtCQUFhLEdBQUcsZUFBSyxDQUFDLFNBQVMsRUFBTyxDQUFDO1lBQ3ZDLFlBQU8sR0FBNkIsSUFBSSxDQUFDO1lBR3pDLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFJaEIsTUFBTSxLQUFLLEdBQW1ELEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDMUUsTUFBTSxRQUFRLEdB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

});
