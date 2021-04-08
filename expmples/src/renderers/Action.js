amis.define('src/renderers/Action.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ResetRenderer = exports.SubmitRenderer = exports.ButtonRenderer = exports.ActionRenderer = exports.Action = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  const ActionProps = [
      'dialog',
      'drawer',
      'url',
      'link',
      'confirmText',
      'tooltip',
      'disabledTip',
      'className',
      'asyncApi',
      'redirect',
      'size',
      'level',
      'primary',
      'feedback',
      'api',
      'blank',
      'tooltipPlacement',
      'to',
      'content',
      'required',
      'type',
      'actionType',
      'label',
      'icon',
      'reload',
      'target',
      'close',
      'messages',
      'mergeData',
      'index',
      'copy',
      'payload',
      'requireSelected'
  ];
  const Remark_1 = require("src/renderers/Remark.tsx");
  const theme_1 = require("src/theme.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const icon_1 = require("src/utils/icon.tsx");
  const allowedType = ['button', 'submit', 'reset'];
  let Action = /** @class */ (() => {
      var _a;
      class Action extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.state = {
                  inCountDown: false,
                  countDownEnd: 0,
                  timeLeft: 0
              };
              this.localStorageKey = 'amis-countdownend-' + (this.props.name || '');
              const countDownEnd = parseInt(localStorage.getItem(this.localStorageKey) || '0');
              if (countDownEnd && this.props.countDown) {
                  if (Date.now() < countDownEnd) {
                      this.state = {
                          inCountDown: true,
                          countDownEnd,
                          timeLeft: Math.floor((countDownEnd - Date.now()) / 1000)
                      };
                      this.handleCountDown();
                  }
              }
          }
          handleAction(e) {
              const { onAction, onClick, disabled, countDown } = this.props;
              const result = onClick && onClick(e, this.props);
              if (disabled || e.isDefaultPrevented() || result === false || !onAction) {
                  return;
              }
              e.preventDefault();
              const action = pick_1.default(this.props, ActionProps);
              onAction(e, action);
              if (countDown) {
                  const countDownEnd = Date.now() + countDown * 1000;
                  this.setState({
                      countDownEnd: countDownEnd,
                      inCountDown: true,
                      timeLeft: countDown
                  });
                  localStorage.setItem(this.localStorageKey, String(countDownEnd));
                  setTimeout(() => {
                      this.handleCountDown();
                  }, 1000);
              }
          }
          handleCountDown() {
              // setTimeout 一般会晚于 1s，经过几十次后就不准了，所以使用真实时间进行 diff
              const timeLeft = Math.floor((this.state.countDownEnd - Date.now()) / 1000);
              if (timeLeft <= 0) {
                  this.setState({
                      inCountDown: false,
                      timeLeft: timeLeft
                  });
              }
              else {
                  this.setState({
                      timeLeft: timeLeft
                  });
                  setTimeout(() => {
                      this.handleCountDown();
                  }, 1000);
              }
          }
          render() {
              const { type, icon, iconClassName, primary, size, level, countDownTpl, block, className, componentClass, tooltip, disabledTip, tooltipPlacement, actionType, link, data, translate: __, activeClassName, isCurrentUrl, isMenuItem, active, activeLevel, tooltipContainer, classnames: cx } = this.props;
              let label = this.props.label;
              let disabled = this.props.disabled;
              let isActive = !!active;
              if (actionType === 'link' && !isActive && link && isCurrentUrl) {
                  isActive = isCurrentUrl(link);
              }
              // 倒计时
              if (this.state.inCountDown) {
                  label = Remark_1.filterContents(__(countDownTpl), Object.assign(Object.assign({}, data), { timeLeft: this.state.timeLeft }));
                  disabled = true;
              }
              const iconElement = icon_1.generateIcon(cx, icon, 'Button-icon', iconClassName);
              return isMenuItem ? (react_1.default.createElement("a", { className: cx(className, {
                      [activeClassName || 'is-active']: isActive,
                      'is-disabled': disabled
                  }), onClick: this.handleAction },
                  label,
                  iconElement)) : (react_1.default.createElement(Button_1.default, { className: cx(className, {
                      [activeClassName || 'is-active']: isActive
                  }), size: size, level: activeLevel && isActive
                      ? activeLevel
                      : level || (primary ? 'primary' : undefined), onClick: this.handleAction, type: type && ~allowedType.indexOf(type) ? type : 'button', disabled: disabled, componentClass: componentClass, tooltip: Remark_1.filterContents(tooltip, data), disabledTip: Remark_1.filterContents(disabledTip, data), placement: tooltipPlacement, tooltipContainer: tooltipContainer, block: block, iconOnly: !!(icon && !label && level !== 'link') },
                  label ? react_1.default.createElement("span", null, tpl_1.filter(String(label), data)) : null,
                  iconElement));
          }
      }
      Action.defaultProps = {
          type: 'button',
          componentClass: 'button',
          tooltipPlacement: 'bottom',
          activeClassName: 'is-active',
          countDownTpl: 'Action.countDown',
          countDown: 0
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.MouseEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Action.prototype, "handleAction", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], Action.prototype, "handleCountDown", null);
      return Action;
  })();
  exports.Action = Action;
  exports.default = theme_1.themeable(Action);
  let ActionRenderer = /** @class */ (() => {
      var _a;
      let ActionRenderer = class ActionRenderer extends react_1.default.Component {
          handleAction(e, action) {
              const { env, onAction, data, ignoreConfirm } = this.props;
              if (!ignoreConfirm && action.confirmText && env.confirm) {
                  env
                      .confirm(tpl_1.filter(action.confirmText, data))
                      .then((confirmed) => confirmed && onAction(e, action, data));
              }
              else {
                  onAction(e, action, data);
              }
          }
          isCurrentAction(link) {
              const { env, data } = this.props;
              return env.isCurrentUrl(tpl_1.filter(link, data));
          }
          render() {
              const _a = this.props, { env, disabled, btnDisabled } = _a, rest = tslib_1.__rest(_a, ["env", "disabled", "btnDisabled"]);
              return (react_1.default.createElement(Action, Object.assign({}, rest, { disabled: disabled || btnDisabled, onAction: this.handleAction, isCurrentUrl: this.isCurrentAction, tooltipContainer: env.getModalContainer ? env.getModalContainer : undefined })));
          }
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ActionRenderer.prototype, "handleAction", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [String]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ActionRenderer.prototype, "isCurrentAction", null);
      ActionRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)action$/,
              name: 'action'
          })
      ], ActionRenderer);
      return ActionRenderer;
  })();
  exports.ActionRenderer = ActionRenderer;
  let ButtonRenderer = /** @class */ (() => {
      let ButtonRenderer = class ButtonRenderer extends ActionRenderer {
      };
      ButtonRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)button$/,
              name: 'button'
          })
      ], ButtonRenderer);
      return ButtonRenderer;
  })();
  exports.ButtonRenderer = ButtonRenderer;
  let SubmitRenderer = /** @class */ (() => {
      let SubmitRenderer = class SubmitRenderer extends ActionRenderer {
      };
      SubmitRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)submit$/,
              name: 'submit'
          })
      ], SubmitRenderer);
      return SubmitRenderer;
  })();
  exports.SubmitRenderer = SubmitRenderer;
  let ResetRenderer = /** @class */ (() => {
      let ResetRenderer = class ResetRenderer extends ActionRenderer {
      };
      ResetRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)reset$/,
              name: 'reset'
          })
      ], ResetRenderer);
      return ResetRenderer;
  })();
  exports.ResetRenderer = ResetRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9BY3Rpb24udHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsd0NBQW1EO0FBQ25ELHNDQUFvQztBQUNwQywwRUFBMEM7QUFDMUMsK0RBQStCO0FBNlAvQixNQUFNLFdBQVcsR0FBRztJQUNsQixRQUFRO0lBQ1IsUUFBUTtJQUNSLEtBQUs7SUFDTCxNQUFNO0lBQ04sYUFBYTtJQUNiLFNBQVM7SUFDVCxhQUFhO0lBQ2IsV0FBVztJQUNYLFVBQVU7SUFDVixVQUFVO0lBQ1YsTUFBTTtJQUNOLE9BQU87SUFDUCxTQUFTO0lBQ1QsVUFBVTtJQUNWLEtBQUs7SUFDTCxPQUFPO0lBQ1Asa0JBQWtCO0lBQ2xCLElBQUk7SUFDSixTQUFTO0lBQ1QsVUFBVTtJQUNWLE1BQU07SUFDTixZQUFZO0lBQ1osT0FBTztJQUNQLE1BQU07SUFDTixRQUFRO0lBQ1IsUUFBUTtJQUNSLE9BQU87SUFDUCxVQUFVO0lBQ1YsV0FBVztJQUNYLE9BQU87SUFDUCxNQUFNO0lBQ04sU0FBUztJQUNULGlCQUFpQjtDQUNsQixDQUFDO0FBQ0YscUNBQXdDO0FBQ3hDLG9DQUE2RDtBQUM3RCw0Q0FBeUM7QUFjekMsd0NBQTJDO0FBNEIzQyxNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsT0FBTyxDQUFDLENBQUM7QUFRbEQ7O0lBQUEsTUFBYSxNQUFPLFNBQVEsZUFBSyxDQUFDLFNBQW1DO1FBb0JuRSxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQVhmLFVBQUssR0FBZ0I7Z0JBQ25CLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixZQUFZLEVBQUUsQ0FBQztnQkFDZixRQUFRLEVBQUUsQ0FBQzthQUNaLENBQUM7WUFRQSxJQUFJLENB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

});
