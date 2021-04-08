amis.define('src/renderers/Form/InputGroup.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.InputGroup = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  const filter_schema_1 = tslib_1.__importDefault(require("src/utils/filter-schema.ts"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  class InputGroup extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.handleFocus = this.handleFocus.bind(this);
          this.handleBlur = this.handleBlur.bind(this);
          this.state = {
              isFocused: false
          };
      }
      handleFocus() {
          this.setState({
              isFocused: true
          });
      }
      handleBlur() {
          this.setState({
              isFocused: false
          });
      }
      renderControl(control, index, otherProps) {
          const { render, onChange } = this.props;
          if (!control) {
              return null;
          }
          const subSchema = control && control.type === 'control'
              ? control
              : {
                  type: 'control',
                  control
              };
          if (subSchema.control) {
              let control = subSchema.control;
              control.hiddenOn && (subSchema.hiddenOn = control.hiddenOn);
              control.visibleOn && (subSchema.visibleOn = control.visibleOn);
          }
          return render(`${index}`, subSchema, Object.assign({ onChange }, otherProps));
      }
      validate() {
          const { formItem } = this.props;
          const errors = [];
          formItem === null || formItem === void 0 ? void 0 : formItem.subFormItems.forEach((item) => {
              if (item.errors.length) {
                  errors.push(...item.errors);
              }
          });
          return errors.length ? errors : '';
      }
      render() {
          let { controls, className, mode, horizontal, formMode, formHorizontal, data, classnames: cx } = this.props;
          formMode = mode || formMode;
          controls = controls.filter(item => {
              if (item && (item.hidden || item.visible === false)) {
                  return false;
              }
              const exprProps = filter_schema_1.default(item || {}, data);
              if (exprProps.hidden || exprProps.visible === false) {
                  return false;
              }
              return true;
          });
          let horizontalDeeper = horizontal ||
              helper_1.makeHorizontalDeeper(formHorizontal, controls.length);
          return (react_1.default.createElement("div", { className: cx(`InputGroup`, className, {
                  'is-focused': this.state.isFocused
              }) }, controls.map((control, index) => {
              const isAddOn = ~[
                  'icon',
                  'plain',
                  'tpl',
                  'button',
                  'submit',
                  'reset'
              ].indexOf(control && control.type);
              let dom = this.renderControl(control, index, {
                  formHorizontal: horizontalDeeper,
                  formMode: 'normal',
                  inputOnly: true,
                  key: index,
                  onFocus: this.handleFocus,
                  onBlur: this.handleBlur
              });
              return isAddOn ? (react_1.default.createElement("span", { key: index, className: cx(control.addOnclassName, ~['button', 'submit', 'reset'].indexOf(control && control.type)
                      ? 'InputGroup-btn'
                      : 'InputGroup-addOn') }, dom)) : (dom);
          })));
      }
  }
  exports.InputGroup = InputGroup;
  let InputGroupRenderer = /** @class */ (() => {
      let InputGroupRenderer = class InputGroupRenderer extends InputGroup {
      };
      InputGroupRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'input-group',
              strictMode: false
          })
      ], InputGroupRenderer);
      return InputGroupRenderer;
  })();
  exports.default = InputGroupRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW5wdXRHcm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9JbnB1dEdyb3VwLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBSTFCLCtDQUs0QjtBQUU1QixzRkFBMEQ7QUFDMUQsaUNBS2dCO0FBMEJoQixNQUFhLFVBQVcsU0FBUSxlQUFLLENBQUMsU0FHckM7SUFDQyxZQUFZLEtBQXNCO1FBQ2hDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUViLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDL0MsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUU3QyxJQUFJLENBQUMsS0FBSyxHQUFHO1lBQ1gsU0FBUyxFQUFFLEtBQUs7U0FDakIsQ0FBQztJQUNKLENBQUM7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxVQUFVO1FBQ1IsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLFNBQVMsRUFBRSxLQUFLO1NBQ2pCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsT0FBWSxFQUFFLEtBQVUsRUFBRSxVQUFnQjtRQUN0RCxNQUFNLEVBQUMsTUFBTSxFQUFFLFFBQVEsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFdEMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNaLE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFFRCxNQUFNLFNBQVMsR0FDYixPQUFPLElBQUssT0FBa0IsQ0FBQyxJQUFJLEtBQUssU0FBUztZQUMvQyxDQUFDLENB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

});
