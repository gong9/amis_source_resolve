amis.define('src/renderers/Form/ButtonGroup.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ButtonGroupControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let ButtonGroupControl = /** @class */ (() => {
      var _a;
      class ButtonGroupControl extends react_1.default.Component {
          handleToggle(option) {
              const { onToggle, multiple, autoFill, onBulkChange } = this.props;
              onToggle(option);
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render(props = this.props) {
              const { render, classPrefix: ns, classnames: cx, className, disabled, options, value, labelField, placeholder, btnClassName, btnActiveClassName, selectedOptions, buttons, size, block, vertical } = props;
              let body = [];
              let btnLevel = props.btnLevel;
              let btnActiveLevel = props.btnActiveLevel;
              btnClassName && (btnLevel = helper_1.getLevelFromClassName(btnClassName));
              btnActiveClassName &&
                  (btnActiveLevel = helper_1.getLevelFromClassName(btnActiveClassName));
              if (options && options.length) {
                  body = options.map((option, key) => {
                      const active = !!~selectedOptions.indexOf(option);
                      return render(`option/${key}`, {
                          label: option[labelField || 'label'],
                          icon: option.icon,
                          size: option.size || size,
                          type: 'button',
                          block: block
                      }, {
                          key: key,
                          active,
                          level: (active ? btnActiveLevel : '') || option.level || btnLevel,
                          className: cx(option.className, btnClassName),
                          disabled: option.disabled || disabled,
                          onClick: (e) => {
                              this.handleToggle(option);
                              e.preventDefault(); // 禁止 onAction 触发
                          }
                      });
                  });
              }
              else if (Array.isArray(buttons)) {
                  body = buttons.map((button, key) => render(`button/${key}`, Object.assign({ size: size, block: block, activeLevel: btnActiveLevel }, button), {
                      key,
                      className: cx(button.className, btnClassName)
                  }));
              }
              return (react_1.default.createElement("div", { className: cx(`ButtonGroup`, {
                      'ButtonGroup--block': block,
                      'ButtonGroup--vertical': vertical,
                      [`ButtonGroup--${size}`]: size
                  }, className) }, body.length ? (body) : (react_1.default.createElement("span", { className: `${ns}ButtonGroup-placeholder` }, placeholder))));
          }
      }
      ButtonGroupControl.defaultProps = {
          btnLevel: 'default',
          btnActiveLevel: 'primary',
          clearable: false,
          vertical: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Options_1.Option !== "undefined" && Options_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], ButtonGroupControl.prototype, "handleToggle", null);
      return ButtonGroupControl;
  })();
  exports.default = ButtonGroupControl;
  let ButtonGroupControlRenderer = /** @class */ (() => {
      let ButtonGroupControlRenderer = class ButtonGroupControlRenderer extends ButtonGroupControl {
          render() {
              const _a = this.props, { className, classnames: cx } = _a, rest = tslib_1.__rest(_a, ["className", "classnames"]);
              const body = super.render(Object.assign(Object.assign({}, rest), { classnames: cx }));
              return react_1.default.createElement("div", { className: cx('ButtonGroupControl', className) }, body);
          }
      };
      ButtonGroupControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'button-group',
              sizeMutable: false,
              strictMode: false
          })
      ], ButtonGroupControlRenderer);
      return ButtonGroupControlRenderer;
  })();
  exports.ButtonGroupControlRenderer = ButtonGroupControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnV0dG9uR3JvdXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vQnV0dG9uR3JvdXAudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFFMUIsdUNBS21CO0FBRW5CLCtDQUE0RTtBQThCNUU7O0lBQUEsTUFBcUIsa0JBQW1CLFNBQVEsZUFBSyxDQUFDLFNBR3JEO1FBU0MsWUFBWSxDQUFDLE1BQWM7WUFDekIsTUFBTSxFQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFlBQVksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDaEUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ25CLENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7WUFDeEMsTUFBTSxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBQ3JCLENBQUM7UUFFRCxNQUFNLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLO1lBQ3ZCLE1BQU0sRUFDSixNQUFNLEVBQ04sV0FBVyxFQUFFLEVBQUUsRUFDZixVQUFVLEVBQUUsRUFBRSxFQUNkLFNBQVMsRUFDVCxRQUFRLEVBQ1IsT0FBTyxFQUNQLEtBQUssRUFDTCxVQUFVLEVBQ1YsV0FBVyxFQUNYLFlBQVksRUFDWixrQkFBa0IsRUFDbEIsZUFBZSxFQUNmLE9BQU8sRUFDUCxJQUFJLEVBQ0osS0FBSyxFQUNMLFFBQVEsRUFDVCxHQUFHLEtBQUssQ0FBQztZQUVWLElBQUksSUFBSSxHQUEyQixFQUFFLENBQUM7WUFDdEMsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDLFFBQVEsQ0FBQztZQUM5QixJQUFJLGNBQWMsR0FBRyxLQUFLLENBQUMsY0FBYyxDQUFDO1lBRTFDLFlBQVksSUFBSSxDQUFDLFFBQVEsR0FB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

});
