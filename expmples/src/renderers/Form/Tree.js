amis.define('src/renderers/Form/Tree.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Tree_1 = tslib_1.__importDefault(require("src/components/Tree.tsx"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const components_1 = require("src/components/index.tsx");
  let TreeControl = /** @class */ (() => {
      class TreeControl extends react_1.default.Component {
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render() {
              const { className, classPrefix: ns, value, onChange, disabled, joinValues, extractValue, delimiter, placeholder, options, multiple, valueField, initiallyOpen, unfoldedLevel, withChildren, onlyChildren, loading, hideRoot, rootLabel, cascade, rootValue, showIcon, showRadio, onAdd, creatable, createTip, addControls, onEdit, editable, editTip, editControls, removable, removeTip, onDelete, rootCreatable, rootCreateTip, labelField, translate: __ } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}TreeControl`, className) },
                  react_1.default.createElement(components_1.Spinner, { size: "sm", key: "info", show: loading }),
                  loading ? null : (react_1.default.createElement(Tree_1.default, { classPrefix: ns, labelField: labelField, valueField: valueField, disabled: disabled, onChange: onChange, joinValues: joinValues, extractValue: extractValue, delimiter: delimiter, placeholder: __(placeholder), options: options, multiple: multiple, initiallyOpen: initiallyOpen, unfoldedLevel: unfoldedLevel, withChildren: withChildren, onlyChildren: onlyChildren, hideRoot: hideRoot, rootLabel: __(rootLabel), rootValue: rootValue, showIcon: showIcon, showRadio: showRadio, cascade: cascade, foldedField: "collapsed", value: value || '', selfDisabledAffectChildren: false, onAdd: onAdd, creatable: creatable, createTip: createTip, rootCreatable: rootCreatable, rootCreateTip: rootCreateTip, onEdit: onEdit, editable: editable, editTip: editTip, removable: removable, removeTip: removeTip, onDelete: onDelete, bultinCUD: !addControls && !editControls }))));
          }
      }
      TreeControl.defaultProps = {
          placeholder: 'loading',
          multiple: false,
          rootLabel: '顶级',
          rootValue: '',
          showIcon: true
      };
      return TreeControl;
  })();
  exports.default = TreeControl;
  let TreeControlRenderer = /** @class */ (() => {
      let TreeControlRenderer = class TreeControlRenderer extends TreeControl {
      };
      TreeControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'tree'
          })
      ], TreeControlRenderer);
      return TreeControlRenderer;
  })();
  exports.TreeControlRenderer = TreeControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9UcmVlLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLG9FQUE0QjtBQUM1Qix5RUFBaUQ7QUFDakQsdUNBSW1CO0FBQ25CLGlEQUF5QztBQTZEekM7SUFBQSxNQUFxQixXQUFZLFNBQVEsZUFBSyxDQUFDLFNBQW9CO1FBU2pFLE1BQU07WUFDSixNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQztZQUN4QyxNQUFNLElBQUksTUFBTSxFQUFFLENBQUM7UUFDckIsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osU0FBUyxFQUNULFdBQVcsRUFBRSxFQUFFLEVBQ2YsS0FBSyxFQUNMLFFBQVEsRUFDUixRQUFRLEVBQ1IsVUFBVSxFQUNWLFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsVUFBVSxFQUNWLGFBQWEsRUFDYixhQUFhLEVBQ2IsWUFBWSxFQUNaLFlBQVksRUFDWixPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxPQUFPLEVBQ1AsU0FBUyxFQUNULFFBQVEsRUFDUixTQUFTLEVBQ1QsS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsV0FBVyxFQUNYLE1BQU0sRUFDTixRQUFRLEVBQ1IsT0FBTyxFQUNQLFlBQVksRUFDWixTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDUixhQUFhLEVBQ2IsYUFBYSxFQUNiLFVBQVUsRUFDVixTQUFTLEVBQUUsRUFBRSxFQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsb0JBQUUsQ0FBQyxHQUFHLEVBQUUsYUFBYSxFQUFFLFNBQVMsQ0FBQztnQkFDL0MsOEJBQUMsb0JBQU8sSUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBQyxNQUFNLEVBQUMsSUFBSSxFQUFFLE9BQU8sR0FBSTtnQkFDOUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQ2hCLDhCQUFDLGNBQVksSUFDWCxXQUFXLEVBQUUsRUFBRSxFQUNmLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFVBQVUsRUFBRSxVQUFVLEVBQ3RCLFlBQVksRUFBRSxZQUFZLEVBQzFCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLEVBQzVCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLGFBQWEsRUFBRSxhQUFhLEVBQzVCLGFBQWEsRUFBRSxhQUFhLEVBQzVCLFlBQVksRUFBRSxZQUFZLEVBQzFCLFlBQVksRUFBRSxZQUFZLEVBQzFCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFNBQVMsRUFBRSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQ3hCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLFFBQVEsRUFBRSxRQUFRLEVBQ2xCLFNBQVMsRUFBRSxTQUFTLEVBQ3BCLE9BQU8sRUFBRSxPQUFPLEVBQ2hCLFdBQVcsRUFBQyxXQUFXLEVBQ3ZCLEtBQUssRUFBRSxLQUFLLElBQUksRUFBRSxFQUNsQiwwQkFBMEIsRUFBRSxLQUFLLEVBQ2pDLEtBQUssRUFBRSxLQUFLLEVBQ1osU0FBUyxFQUFFLFNBQVMsRUFDcEIsU0FBUyxFQUFFLFNBQVMsRUFDcEIsYUFBYSxFQUFFLGFBQWEsRUFDNUIsYUFBYSxFQUFFLGFBQWEsRUFDNUIsTUFBTSxFQUFFLE1BQU0sRUFDZCxRQUFRLEVBQUUsUUFBUSxFQUNsQixPQUFPLEVBQUUsT0FBTyxFQUNoQixTQUFTLEVBQUUsU0FBUyxFQUNwQixTQUFTLEVBQUUsU0FBUyxFQUNwQixRQUFRLEVBQUUsUUFBUSxFQUNsQixTQUFTLEVBQUUsQ0FBQyxXQUFXLElBQUksQ0FBQyxZQUFZLEdBQ3hDLENBQ0gsQ0FDRyxDQUNQLENBQUM7UUFDSixDQUFDOztJQXBHTSx3QkFBWSxHQUF1QjtRQUN4QyxXQUFXLEVBQUUsU0FBUztRQUN0QixRQUFRLEVBQUUsS0FBSztRQUNmLFNBQVMsRUFBRSxJQUFJO1FBQ2YsU0FBUyxFQUFFLEVBQUU7UUFDYixRQUFRLEVBQUUsSUFBSTtLQUNmLENBQUM7SUErRkosa0JBQUM7S0FBQTtrQkF0R29CLFdBQVc7QUEyR2hDO0lBQUEsSUFBYSxtQkFBbUIsR0FBaEMsTUFBYSxtQkFBb0IsU0FBUSxXQUFXO0tBQUcsQ0FBQTtJQUExQyxtQkFBbUI7UUFIL0Isd0JBQWMsQ0FBQztZQUNkLElBQUksRUFBRSxNQUFNO1NBQ2IsQ0FBQztPQUNXLG1CQUFtQixDQUF1QjtJQUFELDBCQUFDO0tBQUE7QUFBMUMsa0RBQW1CIn0=

});
