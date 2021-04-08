amis.define('src/renderers/Form/SubForm.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SubFormControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const omit_1 = tslib_1.__importDefault(require("node_modules/lodash/omit"));
  const pick_1 = tslib_1.__importDefault(require("node_modules/lodash/pick"));
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  let dom;
  const stripTag = (value) => {
      if (!value) {
          return value;
      }
      dom = dom || document.createElement('div');
      dom.innerHTML = value;
      return dom.innerText;
  };
  let SubFormControl = /** @class */ (() => {
      class SubFormControl extends react_1.default.PureComponent {
          constructor(props) {
              super(props);
              this.state = {
                  openedIndex: -1,
                  optionIndex: -1
              };
              this.addItem = this.addItem.bind(this);
              this.removeItem = this.removeItem.bind(this);
              this.open = this.open.bind(this);
              this.close = this.close.bind(this);
              this.handleDialogConfirm = this.handleDialogConfirm.bind(this);
          }
          addItem() {
              let value = this.props.value;
              if (!Array.isArray(value)) {
                  value = [];
              }
              else {
                  value = value.concat();
              }
              value.push({});
              this.props.onChange(value);
          }
          removeItem(key, e) {
              e.stopPropagation();
              e.preventDefault();
              let value = this.props.value;
              if (!Array.isArray(value)) {
                  return;
              }
              value = value.concat();
              value.splice(key, 1);
              this.props.onChange(value);
          }
          open(index = 0) {
              this.setState({
                  openedIndex: index
              });
          }
          close() {
              this.setState({
                  openedIndex: -1
              });
          }
          handleDialogConfirm(values) {
              const { multiple, onChange, value } = this.props;
              if (multiple) {
                  let newValue = Array.isArray(value) ? value.concat() : [];
                  newValue[this.state.openedIndex] = Object.assign(Object.assign({}, newValue[this.state.openedIndex]), values[0]);
                  onChange(newValue);
              }
              else {
                  onChange(Object.assign(Object.assign({}, value), values[0]));
              }
              this.close();
          }
          buildDialogSchema() {
              let { form } = this.props;
              const dialogProps = [
                  'title',
                  'actions',
                  'name',
                  'size',
                  'closeOnEsc',
                  'showCloseButton',
                  'bodyClassName',
                  'type'
              ];
              return Object.assign(Object.assign({}, pick_1.default(form, dialogProps)), { type: 'dialog', body: Object.assign({ type: 'form' }, omit_1.default(form, dialogProps)) });
          }
          renderMultipe() {
              const { classPrefix: ns, addButtonClassName, editButtonClassName, disabled, labelField, value, btnLabel, render, data, translate: __ } = this.props;
              return [
                  react_1.default.createElement("div", { className: `${ns}SubForm-values`, key: "values" }, Array.isArray(value)
                      ? value.map((value, key) => (react_1.default.createElement("div", { className: classnames_1.default(`${ns}SubForm-value`, {
                              'is-disabled': disabled
                          }, editButtonClassName), key: key },
                          react_1.default.createElement("span", { "data-tooltip": __('delete'), "data-position": "bottom", className: `${ns}Select-valueIcon`, onClick: this.removeItem.bind(this, key) }, "\u00D7"),
                          react_1.default.createElement("span", { onClick: this.open.bind(this, key), className: `${ns}SubForm-valueLabel`, "data-tooltip": __('SubForm.editDetail'), "data-position": "bottom" }, (value &&
                              labelField &&
                              value[labelField] &&
                              stripTag(value[labelField])) ||
                              render('label', {
                                  type: 'tpl',
                                  tpl: __(btnLabel)
                              }, {
                                  data: helper_1.createObject(data, value)
                              })))))
                      : null),
                  react_1.default.createElement("button", { key: "add", type: "button", onClick: this.addItem, className: classnames_1.default(`${ns}Button ${ns}SubForm-addBtn`, addButtonClassName), disabled: disabled, "data-tooltip": __('Combo.add') },
                      react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                      react_1.default.createElement("span", null, __('Combo.add')))
              ];
          }
          renderSingle() {
              const { classPrefix: ns, btnClassName, disabled, value, labelField, btnLabel, render, data, translate: __ } = this.props;
              return (react_1.default.createElement("div", { className: `${ns}SubForm-values`, key: "values" },
                  react_1.default.createElement("div", { className: classnames_1.default(`${ns}SubForm-value`, {
                          'is-disabled': disabled
                      }, btnClassName), onClick: this.open.bind(this, 0), "data-tooltip": __('SubForm.editDetail'), "data-position": "bottom" },
                      react_1.default.createElement("span", { className: `${ns}SubForm-valueLabel` }, (value &&
                          labelField &&
                          value[labelField] &&
                          stripTag(value[labelField])) ||
                          render('label', {
                              type: 'tpl',
                              tpl: __(btnLabel)
                          }, {
                              data: helper_1.createObject(data, value)
                          })))));
          }
          render() {
              const { multiple, classPrefix: ns, className, render, value, data } = this.props;
              const openedIndex = this.state.openedIndex;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}SubFormControl`, className) },
                  multiple ? this.renderMultipe() : this.renderSingle(),
                  render(`dalog/${openedIndex}`, this.buildDialogSchema(), {
                      show: openedIndex !== -1,
                      onClose: this.close,
                      onConfirm: this.handleDialogConfirm,
                      data: helper_1.createObject(data, (multiple ? Array.isArray(value) && value[openedIndex] : value) ||
                          {})
                  })));
          }
      }
      SubFormControl.defaultProps = {
          minLength: 0,
          maxLength: 0,
          multiple: false,
          btnClassName: '',
          addButtonClassName: '',
          editButtonClassName: '',
          labelField: 'label',
          btnLabel: 'SubForm.button'
      };
      return SubFormControl;
  })();
  exports.default = SubFormControl;
  let SubFormControlRenderer = /** @class */ (() => {
      let SubFormControlRenderer = class SubFormControlRenderer extends SubFormControl {
      };
      SubFormControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              type: 'form',
              sizeMutable: false
          })
      ], SubFormControlRenderer);
      return SubFormControlRenderer;
  })();
  exports.SubFormControlRenderer = SubFormControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3ViRm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9TdWJGb3JtLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLGlDQUFtRTtBQUNuRSxvRUFBNEI7QUFDNUIsK0RBQStCO0FBQy9CLCtEQUErQjtBQUMvQiwrQ0FBZ0Q7QUFDaEQsa0RBQTRDO0FBMEU1QyxJQUFJLEdBQWdCLENBQUM7QUFDckIsTUFBTSxRQUFRLEdBQUcsQ0FBQyxLQUFhLEVBQUUsRUFBRTtJQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtJQUNELEdBQUcsR0FBRyxHQUFHLElBQUksUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxHQUFHLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQztJQUN0QixPQUFPLEdBQUcsQ0FBQyxTQUFTLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRUY7SUFBQSxNQUFxQixjQUFlLFNBQVEsZUFBSyxDQUFDLGFBR2pEO1FBZ0JDLFlBQVksS0FBbUI7WUFDN0IsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBTGYsVUFBSyxHQUFpQjtnQkFDcEIsV0FBVyxFQUFFLENBQUMsQ0FBQztnQkFDZixXQUFXLEVBQUUsQ0FBQyxDQUFDO2FBQ2hCLENBQUM7WUFJQSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3ZDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNq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

});
