amis.define('src/renderers/Form/Repeat.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file filter
   * @author fex
   *
   * 不建议用，以后可能会删除。可以直接用组合出来，不需要新建一个组件。
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RepeatControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const LANG = {
      secondly: '秒',
      minutely: '分',
      hourly: '时',
      daily: '天',
      weekdays: '周中',
      weekly: '周',
      monthly: '月',
      yearly: '年'
  };
  const Select_1 = tslib_1.__importDefault(require("src/components/Select.tsx"));
  const Range_1 = tslib_1.__importDefault(require("src/components/Range.tsx"));
  let RepeatControl = /** @class */ (() => {
      class RepeatControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleOptionChange = this.handleOptionChange.bind(this);
              this.handleChange = this.handleChange.bind(this);
          }
          handleOptionChange(option) {
              this.props.onChange(option.value);
          }
          handleChange(value) {
              const option = this.props.value;
              const parts = option ? option.split(':') : [];
              this.props.onChange(`${parts[0]}:${value}`);
          }
          renderInput() {
              const value = this.props.value;
              const parts = value ? value.split(':') : [];
              let { options, placeholder, disabled, classPrefix: ns, translate: __ } = this.props;
              let optionsArray = [];
              optionsArray = options.split(',').map(key => ({
                  label: LANG[key] || '不支持',
                  value: key
              }));
              optionsArray.unshift({
                  label: __(placeholder),
                  value: ''
              });
              let input;
              parts[1] = parseInt(parts[1], 10) || 1;
              switch (parts[0]) {
                  case 'secondly':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'minutely':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 5, max: 60, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'hourly':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 24, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'daily':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 30, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'weekly':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'monthly':
                      input = (react_1.default.createElement(Range_1.default, { key: "input", classPrefix: ns, value: parts[1], min: 1, step: 1, max: 12, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
                  case 'yearly':
                      input = (react_1.default.createElement(Range_1.default, { classPrefix: ns, key: "input", className: "v-middle", value: parts[1], min: 1, step: 1, max: 20, disabled: disabled, onChange: (value) => this.handleChange(value) }));
                      break;
              }
              return (react_1.default.createElement("div", { className: "repeat-control hbox" },
                  input ? (react_1.default.createElement("div", { className: "col v-middle", style: { width: 30 } },
                      react_1.default.createElement("span", null, __('Repeat.pre')))) : null,
                  input ? react_1.default.createElement("div", { className: "col v-middle" }, input) : null,
                  react_1.default.createElement("div", { className: "col v-middle repeat-btn" },
                      react_1.default.createElement(Select_1.default, { classPrefix: ns, className: input ? 'pull-right' : '', options: optionsArray, placeholder: __(placeholder), onChange: this.handleOptionChange, value: parts[0], clearable: false, searchable: false, disabled: disabled, joinValues: false }))));
          }
          render() {
              const { className, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}RepeatControl`, className) }, this.renderInput()));
          }
      }
      RepeatControl.defaultProps = {
          // options: 'secondly,minutely,hourly,daily,weekdays,weekly,monthly,yearly'
          options: 'hourly,daily,weekly,monthly',
          placeholder: '不重复'
      };
      return RepeatControl;
  })();
  exports.default = RepeatControl;
  let RepeatControlRenderer = /** @class */ (() => {
      let RepeatControlRenderer = class RepeatControlRenderer extends RepeatControl {
      };
      RepeatControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'repeat',
              sizeMutable: false
          })
      ], RepeatControlRenderer);
      return RepeatControlRenderer;
  })();
  exports.RepeatControlRenderer = RepeatControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwZWF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1JlcGVhdC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7OztHQUtHOzs7O0FBRUgsMERBQTBCO0FBQzFCLG9FQUE0QjtBQUM1QixpQ0FBbUU7QUFZbkUsTUFBTSxJQUFJLEdBRU47SUFDRixRQUFRLEVBQUUsR0FBRztJQUNiLFFBQVEsRUFBRSxHQUFHO0lBQ2IsTUFBTSxFQUFFLEdBQUc7SUFDWCxLQUFLLEVBQUUsR0FBRztJQUNWLFFBQVEsRUFBRSxJQUFJO0lBQ2QsTUFBTSxFQUFFLEdBQUc7SUFDWCxPQUFPLEVBQUUsR0FBRztJQUNaLE1BQU0sRUFBRSxHQUFHO0NBQ1osQ0FBQztBQUNGLDZFQUE2QztBQUM3QywyRUFBZ0Q7QUFRaEQ7SUFBQSxNQUFxQixhQUFjLFNBQVEsZUFBSyxDQUFDLFNBQTJCO1FBTzFFLFlBQVksS0FBa0I7WUFDNUIsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRWIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxDQUFDO1FBRUQsa0JBQWtCLENBQUMsTUFBYztZQUMvQixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEMsQ0FBQztRQUVELFlBQVksQ0FBQyxLQUFhO1lBQ3hCLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQ2hDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUss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

});
