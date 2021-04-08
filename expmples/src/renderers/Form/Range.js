amis.define('src/renderers/Form/Range.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.RangeControlRenderer = exports.formatValue = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const isNumber_1 = tslib_1.__importDefault(require("node_modules/lodash/isNumber"));
  const isObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isObject"));
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const Range_1 = tslib_1.__importDefault(require("src/components/Range.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  function formatValue(value, props) {
      if (props.multiple) {
          if (typeof value === 'string') {
              const [minValue, maxValue] = value
                  .split(props.delimiter || ',')
                  .map(v => Number(v));
              return {
                  min: (props.min && minValue < props.min && props.min) ||
                      minValue ||
                      props.min,
                  max: (props.max && maxValue > props.max && props.max) ||
                      maxValue ||
                      props.max
              };
          }
          else if (typeof value === 'object') {
              return {
                  min: (props.min && value.min < props.min && props.min) ||
                      value.min ||
                      props.min,
                  max: (props.max && value.max > props.max && props.max) ||
                      value.max ||
                      props.max
              };
          }
      }
      return value !== null && value !== void 0 ? value : props.min;
  }
  exports.formatValue = formatValue;
  let RangeControl = /** @class */ (() => {
      class RangeControl extends react_1.default.PureComponent {
          constructor(props) {
              super(props);
              const { value: propsValue, multiple, delimiter, min, max } = this.props;
              const value = formatValue(propsValue, {
                  multiple,
                  delimiter,
                  min,
                  max
              });
              this.state = {
                  value: value,
                  minValue: isObject_1.default(value) ? value.min : min,
                  maxValue: isObject_1.default(value) ? value.max : max
              };
              this.handleChange = this.handleChange.bind(this);
              this.handleEnd = this.handleEnd.bind(this);
              this.handleInputChange = this.handleInputChange.bind(this);
              this.midLabelRef = this.midLabelRef.bind(this);
              this.clearValue = this.clearValue.bind(this);
              this.handleMinInputBlur = this.handleMinInputBlur.bind(this);
              this.handleMaxInputBlur = this.handleMaxInputBlur.bind(this);
              this.handleMinInputChange = this.handleMinInputChange.bind(this);
              this.handleMaxInputChange = this.handleMaxInputChange.bind(this);
          }
          componentWillReceiveProps(nextProps) {
              const { value } = this.props;
              const { value: nextPropsValue, multiple, delimiter, min, max } = nextProps;
              if (value !== nextPropsValue) {
                  const value = formatValue(nextPropsValue, {
                      multiple,
                      delimiter,
                      min,
                      max
                  });
                  this.setState({
                      value: value,
                      minValue: isObject_1.default(value) ? value.min : min,
                      maxValue: isObject_1.default(value) ? value.max : max
                  });
              }
          }
          componentDidMount() {
              this.updateStyle();
          }
          componentDidUpdate(prevProps) {
              if (prevProps.showInput !== this.props.showInput) {
                  this.updateStyle();
              }
          }
          updateStyle() {
              const { showInput, classPrefix: ns } = this.props;
              let offsetWidth = this.midLabel.offsetWidth;
              let left = `calc(50% - ${offsetWidth / 2}px)`;
              document.querySelector(`.${ns}InputRange-label--value`).style.left = left;
              if (showInput) {
                  left = `calc(50% - ${offsetWidth / 2 + 60}px)`;
              }
              this.midLabel.style.left = left;
          }
          midLabelRef(ref) {
              this.midLabel = ref;
          }
          handleChange(value) {
              this.setState({
                  value: value,
                  minValue: value.min,
                  maxValue: value.max
              });
          }
          clearValue() {
              const { multiple, min, max } = this.props;
              if (multiple) {
                  this.setState({
                      value: {
                          min: min,
                          max: max
                      },
                      minValue: min,
                      maxValue: max
                  });
              }
              else {
                  this.setState({
                      value: min
                  });
              }
          }
          handleEnd(value) {
              const { multiple, joinValues, delimiter } = this.props;
              let endValue = value;
              if (multiple && joinValues) {
                  endValue = [value.min, value.max].join(delimiter || ',');
              }
              const { onChange } = this.props;
              this.setState({
                  value
              }, () => onChange(endValue));
          }
          getStepPrecision() {
              const { step } = this.props;
              return typeof step !== 'number' || step >= 1 || step < 0
                  ? 0
                  : step.toString().split('.')[1].length;
          }
          getValue(value, type) {
              const { max, min, step } = this.props;
              const { value: stateValue } = this.state;
              if (value === '' ||
                  value === '-' ||
                  new RegExp('^[-]?\\d+[.]{1}[0]{0,' + this.getStepPrecision() + '}$').test(value)) {
                  return value;
              }
              value = Math.round(parseFloat(value) / step) * step;
              value =
                  step < 1 ? parseFloat(value.toFixed(this.getStepPrecision())) : ~~value;
              switch (type) {
                  case 'min': {
                      if (isObject_1.default(stateValue) && isNumber_1.default(stateValue.max)) {
                          if (value >= stateValue.max && min <= stateValue.max - step) {
                              return stateValue.max - step;
                          }
                          if (value < stateValue.max - step) {
                              return value;
                          }
                      }
                      return min;
                  }
                  case 'max':
                      return isObject_1.default(stateValue) && isNumber_1.default(stateValue.min)
                          ? (value > max && max) ||
                              (value <= stateValue.min && stateValue.min + step) ||
                              value
                          : max;
                  default:
                      return (value < min && min) || (value > max && max) || value;
              }
          }
          handleInputChange(evt) {
              this.setState({
                  value: this.getValue(evt.target.value)
              });
          }
          handleMinInputBlur(evt) {
              const minValue = this.getValue(evt.target.value, 'min');
              const { value } = this.state;
              isObject_1.default(value)
                  ? this.setState({
                      value: {
                          min: minValue,
                          max: value.max
                      },
                      minValue: minValue
                  })
                  : null;
          }
          handleMaxInputBlur(evt) {
              const maxValue = this.getValue(evt.target.value, 'max');
              const { value } = this.state;
              isObject_1.default(value)
                  ? this.setState({
                      value: {
                          min: value.min,
                          max: maxValue
                      },
                      maxValue: maxValue
                  })
                  : null;
          }
          handleMinInputChange(evt) {
              this.setState({
                  minValue: evt.target.value
              });
          }
          handleMaxInputChange(evt) {
              this.setState({
                  maxValue: evt.target.value
              });
          }
          render() {
              const { max, min, step, unit, clearable, name, disabled, className, showInput, multiple, classnames: cx, classPrefix: ns } = this.props;
              return (react_1.default.createElement("div", { className: cx('RangeControl', {
                      'RangeControl--withInput': showInput,
                      'RangeControl--clearable': clearable,
                      'is-multiple': multiple
                  }, className) },
                  react_1.default.createElement(Range_1.default, { classPrefix: ns, value: this.state.value, disabled: disabled, onChange: this.handleChange, onChangeComplete: this.handleEnd, max: max, min: min, step: step, formatLabel: (value) => value + unit, multiple: multiple }),
                  react_1.default.createElement("span", { className: cx('InputRange-label InputRange-label--mid'), ref: this.midLabelRef },
                      react_1.default.createElement("span", { className: cx('InputRange-labelContainer') }, ((max + min) / 2).toFixed(this.getStepPrecision()) + unit)),
                  showInput ? (multiple && isObject_1.default(this.state.value) ? (react_1.default.createElement("div", { className: cx('InputRange-input is-multiple') },
                      react_1.default.createElement("input", { className: this.state.value.min !== min ? 'is-active' : '', type: "text", name: name, value: this.state.minValue, disabled: disabled, onChange: this.handleMinInputChange, onBlur: this.handleMinInputBlur }),
                      react_1.default.createElement("span", { className: cx('InputRange-input-separator') }, " - "),
                      react_1.default.createElement("input", { className: this.state.value.max !== max ? 'is-active' : '', type: "text", name: name, value: this.state.maxValue, disabled: disabled, onChange: this.handleMaxInputChange, onBlur: this.handleMaxInputBlur }))) : (react_1.default.createElement("div", { className: cx('InputRange-input') },
                      react_1.default.createElement("input", { className: this.state.value !== min ? 'is-active' : '', type: "text", name: name, value: !isObject_1.default(this.state.value) ? this.state.value : 0, disabled: disabled, onChange: this.handleInputChange })))) : null,
                  clearable && !disabled && showInput ? (react_1.default.createElement("a", { onClick: () => this.clearValue(), className: cx('InputRange-clear', {
                          'is-active': multiple
                              ? isEqual_1.default(this.state.value, { min: min, max: max })
                              : this.state.value !== min
                      }) },
                      react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null));
          }
      }
      RangeControl.defaultProps = {
          max: 100,
          min: 0,
          step: 1,
          unit: '',
          clearable: true,
          disabled: false,
          showInput: false,
          multiple: false,
          joinValues: true,
          delimiter: ','
      };
      return RangeControl;
  })();
  exports.default = RangeControl;
  let RangeControlRenderer = /** @class */ (() => {
      let RangeControlRenderer = class RangeControlRenderer extends RangeControl {
      };
      RangeControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              test: /(^|\/)form(?:\/.+)?\/control\/(?:\d+\/)?(slider|range)$/,
              name: 'range-control'
          })
      ], RangeControlRenderer);
      return RangeControlRenderer;
  })();
  exports.RangeControlRenderer = RangeControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vUmFuZ2UudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsdUVBQXVDO0FBQ3ZDLHVFQUF1QztBQUN2QyxxRUFBcUM7QUFDckMsaUNBQW1FO0FBRW5FLDJFQUFnRDtBQUNoRCxrREFBNEM7QUE0RDVDLFNBQWdCLFdBQVcsQ0FDekIsS0FBbUQsRUFDbkQsS0FBMEI7SUFFMUIsSUFBSSxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQ2xCLElBQUksT0FBTyxLQUFLLEtBQUssUUFBUSxFQUFFO1lBQzdCLE1BQU0sQ0FBQyxRQUFRLEVBQUUsUUFBUSxDQUFDLEdBQUcsS0FBSztpQkFDL0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksR0FBRyxDQUFDO2lCQUM3QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2QixPQUFPO2dCQUNMLEdBQUcsRUFDRCxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksUUFBUSxHQUFHLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQztvQkFDaEQsUUFBUTtvQkFDUixLQUFLLENBQUMsR0FBRztnQkFDWCxHQUFHLEVBQ0QsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLFFBQVEsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQ2hELFFBQVE7b0JBQ1IsS0FBSyxDQUFDLEdBQUc7YUFDWixDQUFDO1NBQ0g7YUFBTSxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUNwQyxPQUFPO2dCQUNMLEdBQUcsRUFDRCxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQ2pELEtBQUssQ0FBQyxHQUFHO29CQUNULEtBQUssQ0FBQyxHQUFHO2dCQUNYLEdBQUcsRUFDRCxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksS0FBSyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsR0FBRyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7b0JBQ2pELEtBQUssQ0FBQyxHQUFHO29CQUNULEtBQUssQ0FBQyxHQUFHO2FBQ1osQ0FBQztTQUNIO0tBQ0Y7SUFDRCxPQUFPLEtBQUssYUFBTCxLQUFLLGNBQUwsS0FBSyxHQUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7QUFDNUIsQ0FBQztBQWpDRCxrQ0FpQ0M7QUFpQkQ7SUFBQSxNQUFxQixZQUFhLFNBQVEsZUFBSyxDQUFDLGFBRy9DO1FBZ0JDLFlBQVksS0FBaUI7WUFDM0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQ2IsTUFBTSxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN0RSxNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsVUFBVSxFQUFFO2dCQUNwQyxRQUFRO2dCQUNSLFNBQVM7Z0JBQ1QsR0FBRztnQkFDSCxHQUFHO2FBQ0osQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsa0JBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRztnQkFDM0MsUUFBUSxFQUFFLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7YUFDNUMsQ0FBQztZQUNGLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMzRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLGtCQUFrQixHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0QsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakUsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkUsQ0FBQztRQUVELHlCQUF5QixDQUFDLFNBQXFCO1lBQzdDLE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLE1BQU0sRUFBQyxLQUFLLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBQyxHQUFHLFNBQVMsQ0FBQztZQUN6RSxJQUFJLEtBQUssS0FBSyxjQUFjLEVBQUU7Z0JBQzVCLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxjQUFjLEVBQUU7b0JBQ3hDLFFBQVE7b0JBQ1IsU0FBUztvQkFDVCxHQUFHO29CQUNILEdBQUc7aUJBQ0osQ0FBQyxDQUFDO2dCQUVILElBQUksQ0FBQyxRQUFRLENBQUM7b0JBQ1osS0FBSyxFQUFFLEtBQUs7b0JBQ1osUUFBUSxFQUFFLGtCQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEdBQUc7b0JBQzNDLFFBQVEsRUFBRSxrQkFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHO2lCQUM1QyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7UUFFRCxpQkFBaUI7WUFDZixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQXFCO1lBQ3RDLElBQUksU0FBUyxDQUFDLFNBQVMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDaEQsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1FBQ0gsQ0FBQztRQUVELFdBQVc7WUFDVCxNQUFNLEVBQUMsU0FBUyxFQUFFLFdBQVcsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWhELElBQUksV0FBVyxHQUFJLElBQUksQ0FBQyxRQUE0QixDQUFDLFdBQVcsQ0FBQztZQUNqRSxJQUFJLElBQUksR0FBRyxjQUFjLFdBQVcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUM3QyxRQUFRLENBQUMsYUFBYSxDQUNyQixJQUFJLEVBQUUseUJBQXlCLENBQ1osQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztZQUN4QyxJQUFJLFNBQVMsRUFBRTtnQkFDYixJQUFJLEdBQUcsY0FBYyxXQUFXLEdBQUcsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDO2FBQ2hEO1lBQ0EsSUFBSSxDQUFDLFFBQTRCLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFDdkQsQ0FBQztRQUVELFdBQVcsQ0FBQyxHQUFRO1lBQ2xCLElBQUksQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxZQUFZLENBQUMsS0FBVTtZQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxLQUFLLENBQUMsR0FBRztnQkFDbkIsUUFBUSxFQUFFLEtBQUssQ0FBQyxHQUFHO2FBQ3BCLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxVQUFVO1lBQ1IsTUFBTSxFQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUN4QyxJQUFJLFFBQVEsRUFBRTtnQkFDWixJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUUsR0FBRzt3QkFDUixHQUFHLEVBQUUsR0FBRztxQkFDVDtvQkFDRCxRQUFRLEVBQUUsR0FBRztvQkFDYixRQUFRLEVBQUUsR0FBRztpQkFDZCxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRSxHQUFHO2lCQUNYLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUVELFNBQVMsQ0FBQyxLQUFVO1lBQ2xCLE1BQU0sRUFBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFDckQsSUFBSSxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3JCLElBQUksUUFBUSxJQUFJLFVBQVUsRUFBRTtnQkFDMUIsUUFBUSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxHQUFHLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQ1g7Z0JBQ0UsS0FBSzthQUNOLEVBQ0QsR0FBRyxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUN6QixDQUFDO1FBQ0osQ0FBQztRQUVELGdCQUFnQjtZQUNkLE1BQU0sRUFBQyxJQUFJLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTFCLE9BQU8sT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxHQUFHLENBQUM7Z0JBQ3RELENBQUMsQ0FBQyxDQUFDO2dCQUNILENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQztRQUMzQyxDQUFDO1FBRUQsUUFBUSxDQUFDLEtBQVUsRUFBRSxJQUFhO1lBQ2hDLE1BQU0sRUFBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUEwQixDQUFDO1lBQ3pELE1BQU0sRUFBQyxLQUFLLEVBQUUsVUFBVSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUV2QyxJQUNFLEtBQUssS0FBSyxFQUFFO2dCQUNaLEtBQUssS0FBSyxHQUFHO2dCQUNiLElBQUksTUFBTSxDQUFDLHVCQUF1QixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxHQUFHLElBQUksQ0FBQyxDQUFDLElBQUksQ0FDdkUsS0FBSyxDQUNOLEVBQ0Q7Z0JBQ0EsT0FBTyxLQUFLLENBQUM7YUFDZDtZQUVELEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDcEQsS0FBSztnQkFDSCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFFMUUsUUFBUSxJQUFJLEVBQUU7Z0JBQ1osS0FBSyxLQUFLLENBQUMsQ0FBQztvQkFDVixJQUFJLGtCQUFRLENBQUMsVUFBVSxDQUFDLElBQUksa0JBQVEsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7d0JBQ3BELElBQUksS0FBSyxJQUFJLFVBQVUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxFQUFFOzRCQUMzRCxPQUFPLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO3lCQUM5Qjt3QkFDRCxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsR0FBRyxHQUFHLElBQUksRUFBRTs0QkFDakMsT0FBTyxLQUFLLENBQUM7eUJBQ2Q7cUJBQ0Y7b0JBQ0QsT0FBTyxHQUFHLENBQUM7aUJBQ1o7Z0JBQ0QsS0FBSyxLQUFLO29CQUNSLE9BQU8sa0JBQVEsQ0FBQyxVQUFVLENBQUMsSUFBSSxrQkFBUSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUM7d0JBQ3JELENBQUMsQ0FBQyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDOzRCQUNsQixDQUFDLEtBQUssSUFBSSxVQUFVLENBQUMsR0FBRyxJQUFJLFVBQVUsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDOzRCQUNsRCxLQUFLO3dCQUNULENBQUMsQ0FBQyxHQUFHLENBQUM7Z0JBQ1Y7b0JBQ0UsT0FBTyxDQUFDLEtBQUssR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQzthQUNoRTtRQUNILENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxHQUF3QztZQUN4RCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLEtBQUssRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3ZDLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxHQUF3QztZQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLGtCQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUUsUUFBUTt3QkFDYixHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7cUJBQ2Y7b0JBQ0QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLENBQUM7UUFFRCxrQkFBa0IsQ0FBQyxHQUF3QztZQUN6RCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO1lBQ3hELE1BQU0sRUFBQyxLQUFLLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBQzNCLGtCQUFRLENBQUMsS0FBSyxDQUFDO2dCQUNiLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLEtBQUssRUFBRTt3QkFDTCxHQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUc7d0JBQ2QsR0FBRyxFQUFFLFFBQVE7cUJBQ2Q7b0JBQ0QsUUFBUSxFQUFFLFFBQVE7aUJBQ25CLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLENBQUM7UUFFRCxvQkFBb0IsQ0FBQyxHQUF3QztZQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDO2dCQUNaLFFBQVEsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUs7YUFDM0IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELG9CQUFvQixDQUFDLEdBQXdDO1lBQzNELElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osUUFBUSxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSzthQUMzQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixHQUFHLEVBQ0gsR0FBRyxFQUNILElBQUksRUFDSixJQUFJLEVBQ0osU0FBUyxFQUNULElBQUksRUFDSixRQUFRLEVBQ1IsU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLEVBQ1IsVUFBVSxFQUFFLEVBQUUsRUFDZCxXQUFXLEVBQUUsRUFBRSxFQUNoQixHQUFHLElBQUksQ0FBQyxLQUEwQixDQUFDO1lBRXBDLE9BQU8sQ0FDTCx1Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUNYLGNBQWMsRUFDZDtvQkFDRSx5QkFBeUIsRUFBRSxTQUFTO29CQUNwQyx5QkFBeUIsRUFBRSxTQUFTO29CQUNwQyxhQUFhLEVBQUUsUUFBUTtpQkFDeEIsRUFDRCxTQUFTLENBQ1Y7Z0JBRUQsOEJBQUMsZUFBVSxJQUNULFdBQVcsRUFBRSxFQUFFLEVBQ2YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUN2QixRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLFlBQVksRUFDM0IsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFDaEMsR0FBRyxFQUFFLEdBQUcsRUFDUixHQUFHLEVBQUUsR0FBRyxFQUNSLElBQUksRUFBRSxJQUFJLEVBQ1YsV0FBVyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEdBQUcsSUFBSSxFQUN6QyxRQUFRLEVBQUUsUUFBUSxHQUNsQjtnQkFFRix3Q0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDLHdDQUF3QyxDQUFDLEVBQ3ZELEdBQUcsRUFBRSxJQUFJLENBQUMsV0FBVztvQkFFckIsd0NBQU0sU0FBUyxFQUFFLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQyxJQUM3QyxDQUFDLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FDckQsQ0FDRjtnQkFFTixTQUFTLENBQUMsQ0FBQyxDQUFDLENBQ1gsUUFBUSxJQUFJLGtCQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDdkMsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQztvQkFDaEQseUNBQ0UsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUMxRCxJQUFJLEVBQUMsTUFBTSxFQUNYLElBQUksRUFBRSxJQUFJLEVBQ1YsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUMxQixRQUFRLEVBQUUsUUFBUSxFQUNsQixRQUFRLEVBQUUsSUFBSSxDQUFDLG9CQUFvQixFQUNuQyxNQUFNLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixHQUMvQjtvQkFDRix3Q0FBTSxTQUFTLEVBQUUsRUFBRSxDQUFDLDRCQUE0QixDQUFDLFVBQVk7b0JBQzdELHlDQUNFLFNBQVMsRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFDMUQsSUFBSSxFQUFDLE1BQU0sRUFDWCxJQUFJLEVBQUUsSUFBSSxFQUNWLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFDMUIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsUUFBUSxFQUFFLElBQUksQ0FBQyxvQkFBb0IsRUFDbkMsTUFBTSxFQUFFLElBQUksQ0FBQyxrQkFBa0IsR0FDL0IsQ0FDRSxDQUNQLENBQUMsQ0FBQyxDQUFDLENBQ0YsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQztvQkFDcEMseUNBQ0UsU0FBUyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxLQUFLLEdBQUcsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQ3RELElBQUksRUFBQyxNQUFNLEVBQ1gsSUFBSSxFQUFFLElBQUksRUFDVixLQUFLLEVBQUUsQ0FBQyxrQkFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQ3pELFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFFBQVEsRUFBRSxJQUFJLENBQUMsaUJBQWlCLEdBQ2hDLENBQ0UsQ0FDUCxDQUNGLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBRVAsU0FBUyxJQUFJLENBQUMsUUFBUSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FDckMscUNBQ0UsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsRUFDaEMsU0FBUyxFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsRUFBRTt3QkFDaEMsV0FBVyxFQUFFLFFBQVE7NEJBQ25CLENBQUMsQ0FBQyxpQkFBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFDLENBQUM7NEJBQ2pELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxHQUFHO3FCQUM3QixDQUFDO29CQUVGLDhCQUFDLFlBQUksSUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEdBQUcsQ0FDcEMsQ0FDTCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0osQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFuVU0seUJBQVksR0FBaUI7UUFDbEMsR0FBRyxFQUFFLEdBQUc7UUFDUixHQUFHLEVBQUUsQ0FBQztRQUNOLElBQUksRUFBRSxDQUFDO1FBQ1AsSUFBSSxFQUFFLEVBQUU7UUFDUixTQUFTLEVBQUUsSUFBSTtRQUNmLFFBQVEsRUFBRSxLQUFLO1FBQ2YsU0FBUyxFQUFFLEtBQUs7UUFDaEIsUUFBUSxFQUFFLEtBQUs7UUFDZixVQUFVLEVBQUUsSUFBSTtRQUNoQixTQUFTLEVBQUUsR0FBRztLQUNmLENBQUM7SUF5VEosbUJBQUM7S0FBQTtrQkExVW9CLFlBQVk7QUFnVmpDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSxZQUFZO0tBQUcsQ0FBQTtJQUE1QyxvQkFBb0I7UUFKaEMsZUFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLHlEQUF5RDtZQUMvRCxJQUFJLEVBQUUsZUFBZTtTQUN0QixDQUFDO09BQ1csb0JBQW9CLENBQXdCO0lBQUQsMkJBQUM7S0FBQTtBQUE1QyxvREFBb0IifQ==

});
