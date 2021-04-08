amis.define('src/renderers/Audio.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.AudioRenderer = exports.Audio = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const upperFirst_1 = tslib_1.__importDefault(require("node_modules/lodash/upperFirst"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  let Audio = /** @class */ (() => {
      class Audio extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  src: this.props.value ||
                      (this.props.src ? tpl_1.filter(this.props.src, this.props.data) : '') ||
                      tpl_builtin_1.resolveVariable(this.props.name, this.props.data) ||
                      '',
                  isReady: false,
                  muted: false,
                  playing: false,
                  played: 0,
                  seeking: false,
                  volume: 0.8,
                  prevVolume: 0.8,
                  loaded: 0,
                  playbackRate: 1.0,
                  showHandlePlaybackRate: false,
                  showHandleVolume: false
              };
          }
          componentWillUnmount() {
              clearTimeout(this.progressTimeout);
              clearTimeout(this.durationTimeout);
          }
          componentDidMount() {
              const autoPlay = this.props.autoPlay;
              const playing = autoPlay ? true : false;
              this.setState({
                  playing: playing
              }, this.progress);
          }
          componentWillReceiveProps(nextProps) {
              const props = this.props;
              if (props.value !== nextProps.value ||
                  tpl_1.filter(props.src, props.data) !==
                      tpl_1.filter(nextProps.src, nextProps.data)) {
                  this.setState({
                      src: nextProps.value || tpl_1.filter(nextProps.src, nextProps.data),
                      playing: false
                  }, () => {
                      this.audio.load();
                      this.progress();
                  });
              }
          }
          progress() {
              clearTimeout(this.progressTimeout);
              if (this.state.src && this.audio) {
                  const currentTime = this.audio.currentTime || 0;
                  const duration = this.audio.duration;
                  const played = currentTime / duration;
                  let playing = this.state.playing;
                  playing = played != 1 && playing ? true : false;
                  this.setState({
                      played,
                      playing
                  });
                  this.progressTimeout = setTimeout(this.progress, this.props.progressInterval / this.state.playbackRate);
              }
          }
          audioRef(audio) {
              this.audio = audio;
          }
          load() {
              this.setState({
                  isReady: true
              });
          }
          handlePlaybackRate(rate) {
              this.audio.playbackRate = rate;
              this.setState({
                  playbackRate: rate,
                  showHandlePlaybackRate: false
              });
          }
          handleMute() {
              if (!this.state.src) {
                  return;
              }
              const { muted, prevVolume } = this.state;
              const curVolume = !muted ? 0 : prevVolume;
              this.audio.muted = !muted;
              this.setState({
                  muted: !muted,
                  volume: curVolume
              });
          }
          handlePlaying() {
              if (!this.state.src) {
                  return;
              }
              let playing = this.state.playing;
              playing ? this.audio.pause() : this.audio.play();
              this.setState({
                  playing: !playing
              });
          }
          getCurrentTime() {
              if (!this.audio || !this.state.src || !this.state.isReady) {
                  return '0:00';
              }
              const duration = this.audio.duration;
              const played = this.state.played;
              return this.formatTime(duration * (played || 0));
          }
          getDuration() {
              if (!this.audio || !this.state.src) {
                  return '0:00';
              }
              if (!this.state.isReady) {
                  this.onDurationCheck();
                  return '0:00';
              }
              const { duration, seekable } = this.audio;
              // on iOS, live streams return Infinity for the duration
              // so instead we use the end of the seekable timerange
              if (duration === Infinity && seekable.length > 0) {
                  return seekable.end(seekable.length - 1);
              }
              return this.formatTime(duration);
          }
          onDurationCheck() {
              clearTimeout(this.durationTimeout);
              const duration = this.audio && this.audio.duration;
              if (!duration) {
                  this.audio.load();
                  this.durationTimeout = setTimeout(this.onDurationCheck, 500);
              }
          }
          onSeekChange(e) {
              if (!this.state.src) {
                  return;
              }
              const played = e.target.value;
              this.setState({ played: played });
          }
          onSeekMouseDown() {
              this.setState({ seeking: true });
          }
          onSeekMouseUp(e) {
              if (!this.state.seeking) {
                  return;
              }
              const played = e.target.value;
              const duration = this.audio.duration;
              this.audio.currentTime = duration * played;
              const loop = this.props.loop;
              let playing = this.state.playing;
              playing = played < 1 || loop ? playing : false;
              this.setState({
                  playing: playing,
                  seeking: false
              });
          }
          setVolume(e) {
              if (!this.state.src) {
                  return;
              }
              const volume = e.target.value;
              this.audio.volume = volume;
              this.setState({
                  volume: volume,
                  prevVolume: volume
              });
          }
          formatTime(seconds) {
              const date = new Date(seconds * 1000);
              const hh = date.getUTCHours();
              const mm = date.getUTCMinutes();
              const ss = this.pad(date.getUTCSeconds());
              if (hh) {
                  return `${hh}:${this.pad(mm)}:${ss}`;
              }
              return `${mm}:${ss}`;
          }
          pad(string) {
              return ('0' + string).slice(-2);
          }
          toggleHandlePlaybackRate() {
              if (!this.state.src) {
                  return;
              }
              this.setState({
                  showHandlePlaybackRate: !this.state.showHandlePlaybackRate
              });
          }
          toggleHandleVolume(type) {
              if (!this.state.src) {
                  return;
              }
              this.setState({
                  showHandleVolume: type
              });
          }
          renderRates() {
              const { rates, classnames: cx } = this.props;
              const { showHandlePlaybackRate, playbackRate } = this.state;
              return rates && rates.length ? (showHandlePlaybackRate ? (react_1.default.createElement("div", { className: cx('Audio-rateControl') }, rates.map((rate, index) => (react_1.default.createElement("div", { key: index, className: cx('Audio-rateControlItem'), onClick: () => this.handlePlaybackRate(rate) },
                  "x",
                  rate.toFixed(1)))))) : (react_1.default.createElement("div", { className: cx('Audio-rates'), onClick: this.toggleHandlePlaybackRate },
                  "x",
                  playbackRate.toFixed(1)))) : null;
          }
          renderPlay() {
              const { classnames: cx } = this.props;
              const { playing } = this.state;
              return (react_1.default.createElement("div", { className: cx('Audio-play'), onClick: this.handlePlaying }, playing ? (react_1.default.createElement(icons_1.Icon, { icon: "pause", className: "icon" })) : (react_1.default.createElement(icons_1.Icon, { icon: "play", className: "icon" }))));
          }
          renderTime() {
              const { classnames: cx } = this.props;
              return (react_1.default.createElement("div", { className: cx('Audio-times') },
                  this.getCurrentTime(),
                  " / ",
                  this.getDuration()));
          }
          renderProcess() {
              const { classnames: cx } = this.props;
              const { played } = this.state;
              return (react_1.default.createElement("div", { className: cx('Audio-process') },
                  react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: "any", value: played || 0, onMouseDown: this.onSeekMouseDown, onChange: this.onSeekChange, onMouseUp: this.onSeekMouseUp })));
          }
          renderVolume() {
              const { classnames: cx } = this.props;
              const { volume, showHandleVolume } = this.state;
              return showHandleVolume ? (react_1.default.createElement("div", { className: cx('Audio-volumeControl'), onMouseLeave: () => this.toggleHandleVolume(false) },
                  react_1.default.createElement("div", { className: cx('Audio-volumeControlIcon'), onClick: this.handleMute }, volume > 0 ? (react_1.default.createElement(icons_1.Icon, { icon: "volume", className: "icon" })) : (react_1.default.createElement(icons_1.Icon, { icon: "mute", className: "icon" }))),
                  react_1.default.createElement("input", { type: "range", min: 0, max: 1, step: "any", value: volume, onChange: this.setVolume }))) : (react_1.default.createElement("div", { className: cx('Audio-volume'), onMouseEnter: () => this.toggleHandleVolume(true) }, volume > 0 ? (react_1.default.createElement(icons_1.Icon, { icon: "volume", className: "icon" })) : (react_1.default.createElement(icons_1.Icon, { icon: "mute", className: "icon" }))));
          }
          render() {
              const { className, inline, autoPlay, loop, controls, classnames: cx } = this.props;
              const { muted, src } = this.state;
              return (react_1.default.createElement("div", { className: cx('Audio', className, inline ? 'Audio--inline' : '') },
                  react_1.default.createElement("audio", { className: cx('Audio-original'), ref: this.audioRef, onCanPlay: this.load, autoPlay: autoPlay, controls: true, muted: muted, loop: loop },
                      react_1.default.createElement("source", { src: src })),
                  react_1.default.createElement("div", { className: cx('Audio-controls') }, controls &&
                      controls.map((control, index) => {
                          control = 'render' + upperFirst_1.default(control);
                          const method = control;
                          return (react_1.default.createElement(react_1.default.Fragment, { key: index }, this[method]()));
                      }))));
          }
      }
      Audio.defaultProps = {
          inline: true,
          autoPlay: false,
          playbackRate: 1,
          loop: false,
          rates: [],
          progressInterval: 1000,
          controls: ['rates', 'play', 'time', 'process', 'volume']
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "progress", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "audioRef", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "load", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "handlePlaybackRate", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "handleMute", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "handlePlaying", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "getCurrentTime", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "getDuration", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "onDurationCheck", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "onSeekChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "onSeekMouseDown", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "onSeekMouseUp", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "setVolume", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "formatTime", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Number]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "pad", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "toggleHandlePlaybackRate", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Boolean]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Audio.prototype, "toggleHandleVolume", null);
      return Audio;
  })();
  exports.Audio = Audio;
  let AudioRenderer = /** @class */ (() => {
      let AudioRenderer = class AudioRenderer extends Audio {
      };
      AudioRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)audio/,
              name: 'audio'
          })
      ], AudioRenderer);
      return AudioRenderer;
  })();
  exports.AudioRenderer = AudioRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0F1ZGlvLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLDJFQUEyQztBQUMzQyx3Q0FBbUQ7QUFDbkQsNENBQXlDO0FBQ3pDLCtDQUF5QztBQUN6QyxzREFBcUQ7QUFDckQsc0NBQW9DO0FBK0RwQztJQUFBLE1BQWEsS0FBTSxTQUFRLGVBQUssQ0FBQyxTQUFpQztRQUFsRTs7WUF3QkUsVUFBSyxHQUFlO2dCQUNsQixHQUFHLEVBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLO29CQUNoQixDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxZQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUMvRCw2QkFBZSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO29CQUNqRCxFQUFFO2dCQUNKLE9BQU8sRUFBRSxLQUFLO2dCQUNkLEtBQUssRUFBRSxLQUFLO2dCQUNaLE9BQU8sRUFBRSxLQUFLO2dCQUNkLE1BQU0sRUFBRSxDQUFDO2dCQUNULE9BQU8sRUFBRSxLQUFLO2dCQUNkLE1BQU0sRUFBRSxHQUFHO2dCQUNYLFVBQVUsRUFBRSxHQUFHO2dCQUNmLE1BQU0sRUFBRSxDQUFDO2dCQUNULFlBQVksRUFBRSxHQUFHO2dCQUNqQixzQkFBc0IsRUFBRSxLQUFLO2dCQUM3QixnQkFBZ0IsRUFBRSxLQUFLO2FBQ3hCLENBQUM7UUFpWUosQ0FBQztRQS9YQyxvQkFBb0I7WUFDbEIsWUFBWSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMs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

});
