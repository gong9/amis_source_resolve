amis.define('src/renderers/Video.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file video
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.VideoRenderer = exports.HlsSource = exports.FlvSource = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const video_react_1 = require("node_modules/video-react/lib/index");
  const helper_1 = require("src/utils/helper.ts");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  // import css
  ''/*@require node_modules/video-react/dist/video-react.css*/;
  const str2seconds = str => str.indexOf(':')
      ? str
          .split(':')
          .reverse()
          .reduce((seconds, value, index) => seconds + (parseInt(value, 10) || 0) * Math.pow(60, index), 0)
      : parseInt(str, 10);
  // let currentPlaying: any = null;
  class FlvSource extends react_1.default.Component {
      constructor() {
          super(...arguments);
          this.loaded = false;
      }
      componentDidMount() {
          let { src, video, config, manager, isLive, autoPlay, actions, setError } = this.props;
          this.initFlv({
              video,
              manager,
              src,
              isLive,
              config,
              actions,
              setError,
              autoPlay
          });
      }
      componentDidUpdate(prevProps) {
          var _a, _b;
          const props = this.props;
          let { autoPlay, actions, src, setError, isLive, config, video, manager } = props;
          if (src !== prevProps.src) {
              setError('');
              (_a = this.flvPlayer) === null || _a === void 0 ? void 0 : _a.destroy();
              (_b = this.unsubscribe) === null || _b === void 0 ? void 0 : _b.call(this);
              this.loaded = false;
              this.initFlv({
                  video,
                  manager,
                  src,
                  isLive,
                  config,
                  actions,
                  setError,
                  autoPlay
              });
          }
      }
      componentWillUnmount() {
          var _a, _b;
          if (this.flvPlayer) {
              this.flvPlayer.destroy();
              (_b = (_a = this.props).setError) === null || _b === void 0 ? void 0 : _b.call(_a, '');
          }
      }
      initFlv({ video, manager, src, isLive, config, actions, setError, autoPlay }) {
          Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/flv.js/dist/flv'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then((flvjs) => {
              video = video || (manager.video && manager.video.video);
              let flvPlayer = flvjs.createPlayer({
                  type: 'flv',
                  url: src,
                  isLive: isLive
              }, config);
              flvPlayer.attachMediaElement(video);
              this.flvPlayer = flvPlayer;
              this.unsubscribe = manager.subscribeToOperationStateChange((operation) => {
                  const type = operation.operation.action;
                  if (type === 'play') {
                      clearTimeout(this.timer);
                      if (!this.loaded) {
                          this.loaded = true;
                          flvPlayer.load();
                      }
                      flvPlayer.play();
                  }
                  else if (type === 'pause') {
                      flvPlayer.pause();
                      if (isLive) {
                          this.timer = setTimeout(() => {
                              actions.seek(0);
                              flvPlayer.unload();
                              this.loaded = false;
                          }, 30000);
                      }
                  }
              });
              flvPlayer.on(flvjs.Events.RECOVERED_EARLY_EOF, () => {
                  setError('直播已经结束');
              });
              flvPlayer.on(flvjs.Events.ERROR, () => {
                  setError('视频加载失败');
                  flvPlayer.unload();
              });
              if (autoPlay) {
                  setTimeout(() => actions.play(), 200);
              }
          });
      }
      render() {
          return (react_1.default.createElement("source", { src: this.props.src, type: this.props.type || 'video/x-flv' }));
      }
  }
  exports.FlvSource = FlvSource;
  class HlsSource extends react_1.default.Component {
      constructor() {
          super(...arguments);
          this.loaded = false;
      }
      componentDidMount() {
          let { src, video, config, manager, isLive, autoPlay, actions } = this.props;
          this.initHls({
              video,
              manager,
              src,
              autoPlay,
              actions
          });
      }
      componentWillUnmount() {
          if (this.hls) {
              this.hls.stopLoad();
              this.hls.detachMedia();
          }
      }
      componentDidUpdate(prevProps) {
          var _a, _b, _c;
          const props = this.props;
          let { autoPlay, actions, src, isLive, config, video, manager } = props;
          if (src !== prevProps.src) {
              (_a = this.hls) === null || _a === void 0 ? void 0 : _a.stopLoad();
              (_b = this.hls) === null || _b === void 0 ? void 0 : _b.detachMedia();
              (_c = this.unsubscribe) === null || _c === void 0 ? void 0 : _c.call(this);
              this.loaded = false;
              this.initHls({
                  video,
                  manager,
                  src,
                  autoPlay,
                  actions
              });
          }
      }
      initHls({ video, manager, src, autoPlay, actions }) {
          // @ts-ignore
          Promise.resolve().then(() => new Promise(function(resolve){require(['node_modules/hls.js/dist/hls'], function(ret) {resolve(tslib_1.__importStar(ret));})})).then(({ default: Hls }) => {
              // load hls video source base on hls.js
              if (Hls.isSupported()) {
                  video = video || (manager.video && manager.video.video);
                  let hls = (this.hls = new Hls({
                      autoStartLoad: false
                  }));
                  hls.attachMedia(video);
                  hls.loadSource(src);
                  this.unsubscribe = manager.subscribeToOperationStateChange((operation) => {
                      const type = operation.operation.action;
                      if (type === 'play') {
                          if (!this.loaded) {
                              this.loaded = true;
                              hls.startLoad();
                          }
                          video.play();
                      }
                      else if (type === 'pause') {
                          video.pause();
                          hls.stopLoad();
                          this.loaded = false;
                      }
                  });
                  autoPlay && setTimeout(actions.play, 200);
              }
          });
      }
      render() {
          return (react_1.default.createElement("source", { src: this.props.src, type: this.props.type || 'application/x-mpegURL' }));
      }
  }
  exports.HlsSource = HlsSource;
  let Video = /** @class */ (() => {
      class Video extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  posterInfo: null,
                  videoState: {}
              };
              this.frameRef = this.frameRef.bind(this);
              this.cursorRef = this.cursorRef.bind(this);
              this.playerRef = this.playerRef.bind(this);
              this.onImageLoaded = this.onImageLoaded.bind(this);
              this.onClick = this.onClick.bind(this);
              this.setError = this.setError.bind(this);
          }
          onImageLoaded(e) {
              let image = new Image();
              image.onload = () => {
                  this.setState({
                      posterInfo: {
                          width: image.width,
                          height: image.height
                      }
                  });
                  image = image.onload = null;
              };
              image.src = e.target.getAttribute('src');
          }
          frameRef(dom) {
              this.frameDom = dom;
          }
          cursorRef(dom) {
              this.cursorDom = dom;
          }
          playerRef(player) {
              this.player = player;
              if (!player) {
                  return;
              }
              player.subscribeToStateChange((state) => {
                  this.setState({
                      videoState: state
                  });
                  // if (!state.paused) {
                  //   if (
                  //     currentPlaying &&
                  //     currentPlaying.video &&
                  //     currentPlaying !== player
                  //   ) {
                  //     currentPlaying.pause();
                  //   }
                  //   currentPlaying = player;
                  // }
                  if (!this.frameDom || !this.times) {
                      return;
                  }
                  const jumpBufferDuration = this.props.jumpBufferDuration || 0;
                  let index = 0;
                  const times = this.times;
                  const len = times.length;
                  while (index < len - 1) {
                      if (times[index + 1] &&
                          state.currentTime < times[index + 1] - jumpBufferDuration) {
                          break;
                      }
                      index++;
                  }
                  if (this.currentIndex !== index) {
                      this.moveCursorToIndex(index);
                  }
              });
          }
          moveCursorToIndex(index) {
              const { classPrefix: ns } = this.props;
              if (!this.frameDom || !this.cursorDom) {
                  return;
              }
              const items = this.frameDom.querySelectorAll(`.${ns}Video-frame`);
              if (items && items.length && items[index]) {
                  this.currentIndex = index;
                  const item = items[index];
                  const frameRect = this.frameDom.getBoundingClientRect();
                  const rect = item.getBoundingClientRect();
                  this.cursorDom.setAttribute('style', `width: ${rect.width - 4}px; height: ${rect.height - 4}px; left: ${rect.left + 2 - frameRect.left}px; top: ${rect.top + 2 - frameRect.top}px;`);
              }
          }
          jumpToIndex(index) {
              if (!this.times || !this.player || !this.props.jumpFrame) {
                  return;
              }
              const jumpBufferDuration = this.props.jumpBufferDuration || 0;
              const times = this.times;
              const player = this.player;
              player.seek(times[index] - jumpBufferDuration);
              player.play();
          }
          onClick(e) {
              // 避免把所在 form 给提交了。
              e.preventDefault();
          }
          setError(error) {
              const player = this.player;
              this.setState({
                  error: error
              });
              player === null || player === void 0 ? void 0 : player.pause();
          }
          renderFrames() {
              let { frames, framesClassName, columnsCount, data, jumpFrame, classPrefix: ns } = this.props;
              if (typeof frames === 'string' && frames[0] === '$') {
                  frames = tpl_builtin_1.resolveVariable(frames, data);
              }
              if (!frames) {
                  return null;
              }
              const items = [];
              const times = (this.times = []);
              Object.keys(frames).forEach(time => {
                  times.push(str2seconds(time));
                  items.push({
                      time: time,
                      src: frames[time]
                  });
              });
              if (!items.length) {
                  return null;
              }
              return (react_1.default.createElement("div", { className: classnames_1.default(`pos-rlt ${ns}Video-frameList`, framesClassName), ref: this.frameRef },
                  helper_1.padArr(items, columnsCount).map((items, i) => {
                      let restCount = columnsCount - items.length;
                      let blankArray = [];
                      while (restCount--) {
                          blankArray.push('');
                      }
                      return (react_1.default.createElement("div", { className: "pull-in-xxs", key: i },
                          react_1.default.createElement("div", { className: `${ns}Hbox ${ns}Video-frameItem` },
                              items.map((item, key) => (react_1.default.createElement("div", { className: `${ns}Hbox-col Wrapper--xxs ${ns}Video-frame`, key: key, onClick: () => this.jumpToIndex(i * columnsCount + key) },
                                  item.src ? (react_1.default.createElement("img", { className: "w-full", alt: "poster", src: item.src })) : null,
                                  react_1.default.createElement("div", { className: `${ns}Video-frameLabel` }, item.time)))),
                              /* 补充空白 */ restCount
                                  ? blankArray.map((_, index) => (react_1.default.createElement("div", { className: `${ns}Hbox-col Wrapper--xxs`, key: `blank_${index}` })))
                                  : null)));
                  }),
                  jumpFrame ? (react_1.default.createElement("span", { ref: this.cursorRef, className: `${ns}Video-cursor` })) : null));
          }
          renderPlayer() {
              let { poster, autoPlay, muted, name, data, amisConfig, locals, isLive, minVideoDuration, videoType, playerClassName, classPrefix: ns, aspectRatio, rates, classnames: cx } = this.props;
              let source = this.props.src ||
                  (name && data && data[name]) ||
                  (amisConfig && amisConfig.value);
              const videoState = this.state.videoState;
              let highlight = videoState.duration &&
                  minVideoDuration &&
                  videoState.duration < minVideoDuration;
              let src = tpl_1.filter(source, data, '| raw');
              let sourceNode;
              const error = this.state.error;
              if ((src && /\.flv(?:$|\?)/.test(src) && isLive) ||
                  videoType === 'video/x-flv') {
                  sourceNode = (react_1.default.createElement(FlvSource, { autoPlay: autoPlay, order: 999.0, isLive: isLive, src: src, setError: this.setError }));
              }
              else if ((src && /\.m3u8(?:$|\?)/.test(src)) ||
                  videoType === 'application/x-mpegURL') {
                  sourceNode = react_1.default.createElement(HlsSource, { autoPlay: autoPlay, order: 999.0, src: src });
              }
              else {
                  sourceNode = react_1.default.createElement("source", { src: src });
              }
              return (react_1.default.createElement("div", { className: cx('Video-player', playerClassName) },
                  react_1.default.createElement(video_react_1.Player, { ref: this.playerRef, poster: tpl_1.filter(poster, data, '| raw'), src: src, autoPlay: autoPlay, muted: muted, aspectRatio: aspectRatio },
                      rates && rates.length ? (react_1.default.createElement(video_react_1.ControlBar, null,
                          react_1.default.createElement(video_react_1.PlaybackRateMenuButton, { rates: rates, order: 7.1 }))) : null,
                      react_1.default.createElement(video_react_1.BigPlayButton, { position: "center" }),
                      sourceNode,
                      react_1.default.createElement(video_react_1.Shortcut, { disabled: true })),
                  error ? react_1.default.createElement("div", { className: cx('Video-error') }, error) : null,
                  highlight ? (react_1.default.createElement("p", { className: `m-t-xs ${ns}Text--danger` },
                      "\u89C6\u9891\u65F6\u957F\u5C0F\u4E8E ",
                      minVideoDuration,
                      " \u79D2")) : null));
          }
          renderPosterAndPlayer() {
              let { poster, data, locals, minPosterDimension, classnames: cx } = this.props;
              const posterInfo = this.state.posterInfo || {};
              let dimensionClassName = '';
              if (posterInfo &&
                  minPosterDimension &&
                  (minPosterDimension.width || minPosterDimension.height) &&
                  (minPosterDimension.width > posterInfo.width ||
                      minPosterDimension.height > posterInfo.height)) {
                  dimensionClassName = `Text--danger`;
              }
              return (react_1.default.createElement("div", { className: "pull-in-xs" },
                  react_1.default.createElement("div", { className: cx('Hbox') },
                      react_1.default.createElement("div", { className: cx('Hbox-col') },
                          react_1.default.createElement("div", { className: cx('Wrapper Wrapper--xs') },
                              react_1.default.createElement("img", { onLoad: this.onImageLoaded, className: "w-full", alt: "poster", src: tpl_1.filter(poster, data, '| raw') }),
                              react_1.default.createElement("p", { className: "m-t-xs" },
                                  "\u5C01\u9762",
                                  ' ',
                                  react_1.default.createElement("span", { className: dimensionClassName },
                                      posterInfo.width || '-',
                                      " x ",
                                      posterInfo.height || '-'),
                                  dimensionClassName ? (react_1.default.createElement("span", null,
                                      ' ',
                                      "\u5C01\u9762\u5C3A\u5BF8\u5C0F\u4E8E",
                                      ' ',
                                      react_1.default.createElement("span", { className: cx('Text--danger') },
                                          minPosterDimension.width || '-',
                                          " x",
                                          ' ',
                                          minPosterDimension.height || '-'))) : null))),
                      react_1.default.createElement("div", { className: cx('Hbox-col') },
                          react_1.default.createElement("div", { className: cx('Wrapper Wrapper--xs') }, this.renderPlayer())))));
          }
          render() {
              let { splitPoster, className, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Video`, className), onClick: this.onClick },
                  this.renderFrames(),
                  splitPoster ? this.renderPosterAndPlayer() : this.renderPlayer()));
          }
      }
      Video.defaultProps = {
          columnsCount: 8,
          isLive: false,
          jumpFrame: true,
          aspectRatio: 'auto'
      };
      return Video;
  })();
  exports.default = Video;
  let VideoRenderer = /** @class */ (() => {
      let VideoRenderer = class VideoRenderer extends Video {
      };
      VideoRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)video$/,
              name: 'video'
          })
      ], VideoRenderer);
      return VideoRenderer;
  })();
  exports.VideoRenderer = VideoRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVmlkZW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1ZpZGVvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7OztHQUdHOzs7O0FBRUgsMERBQTBCO0FBRTFCLDZDQU9xQjtBQUNyQiw0Q0FBdUM7QUFDdkMsb0VBQTRCO0FBQzVCLHdDQUFtRDtBQUNuRCxzREFBcUQ7QUFDckQsc0NBQW9DO0FBQ3BDLGFBQWE7QUFDYiw0Q0FBMEM7QUFpRzFDLE1BQU0sV0FBVyxHQUE0QixHQUFHLENBQUMsRUFBRSxDQUNqRCxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztJQUNkLENBQUMsQ0FBQyxHQUFHO1NBQ0EsS0FBSyxDQUFDLEdBQUcsQ0FBQztTQUNWLE9BQU8sRUFBRTtTQUNULE1BQU0sQ0FDTCxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEVBQUUsQ0FDeEIsT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsRUFDNUQsQ0FBQyxDQUNGO0lBQ0wsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7QUFleEIsa0NBQWtDO0FBRWxDLE1BQWEsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUE4QjtJQUFuRTs7UUFFRSxXQUFNLEdBQUcsS0FBSyxDQUFDO0lBdUlqQixDQUFDO0lBbklDLGlCQUFpQjtRQUNmLElBQUksRUFDRixHQUFHLEVBQ0gsS0FBSyxFQUNMLE1BQU0sRUFDTixPQUFPLEVBQ1AsTUFBTSxFQUNOLFFBQVEsRUFDUixPQUFPLEVBQ1AsUUFBUSxFQUNULEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVmLElBQUksQ0FBQyxPQUFPLENBQUM7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

});
