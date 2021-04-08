amis.define('src/renderers/Form/Static.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.StaticFieldRenderer = exports.StaticControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const Table_1 = require("src/renderers/Table/index.tsx");
  const PopOver_1 = tslib_1.__importDefault(require("src/renderers/PopOver.tsx"));
  const QuickEdit_1 = tslib_1.__importDefault(require("src/renderers/QuickEdit.tsx"));
  const factory_1 = require("src/factory.tsx");
  const Copyable_1 = tslib_1.__importDefault(require("src/renderers/Copyable.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  let StaticControl = /** @class */ (() => {
      class StaticControl extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.handleQuickChange = this.handleQuickChange.bind(this);
          }
          handleQuickChange(values, saveImmediately) {
              const { onBulkChange, onAction, data } = this.props;
              onBulkChange(values, saveImmediately === true);
              if (saveImmediately && saveImmediately.api) {
                  onAction(null, {
                      actionType: 'ajax',
                      api: saveImmediately.api
                  }, helper_1.extendObject(data, values));
              }
          }
          render() {
              const _a = this.props, { className, value, label, type, render, children, data, classnames: cx, name } = _a, rest = tslib_1.__rest(_a, ["className", "value", "label", "type", "render", "children", "data", "classnames", "name"]);
              const subType = /^static/.test(type)
                  ? type.substring(7) || (rest.tpl ? 'tpl' : 'plain')
                  : type;
              const field = Object.assign(Object.assign({ label,
                  name }, rest), { type: subType });
              return (react_1.default.createElement("div", { className: cx('Form-static') }, render('field', Object.assign(Object.assign({}, field), { type: 'static-field', field }), {
                  value,
                  className,
                  onQuickChange: this.handleQuickChange
              })));
          }
      }
      StaticControl.defaultProps = {
          placeholder: '-'
      };
      return StaticControl;
  })();
  exports.default = StaticControl;
  let StaticControlRenderer = /** @class */ (() => {
      let StaticControlRenderer = class StaticControlRenderer extends StaticControl {
      };
      StaticControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              test: (path, schema, resolveRenderer) => {
                  if (/(^|\/)form(?:\/.+)?\/control\/static(\-[^\/]+)?$/.test(path)) {
                      return true;
                  }
                  else if (/(^|\/)form(?:\/.+)?\/control\/[^\/]+$/.test(path) &&
                      schema &&
                      schema.type &&
                      (schema.name || schema.label) &&
                      resolveRenderer &&
                      resolveRenderer(`${path}/static-field/${schema.type}`)) {
                      // 不一定
                      return true;
                  }
                  return false;
              },
              weight: -90,
              strictMode: false,
              sizeMutable: false,
              name: 'static-control'
          })
      ], StaticControlRenderer);
      return StaticControlRenderer;
  })();
  exports.StaticControlRenderer = StaticControlRenderer;
  let StaticFieldRenderer = /** @class */ (() => {
      let StaticFieldRenderer = class StaticFieldRenderer extends Table_1.TableCell {
          render() {
              let _a = this.props, { type, className, render, style, wrapperComponent: Component, labelClassName, value, data, children, width, inputClassName, label, tabIndex, onKeyUp, field } = _a, rest = tslib_1.__rest(_a, ["type", "className", "render", "style", "wrapperComponent", "labelClassName", "value", "data", "children", "width", "inputClassName", "label", "tabIndex", "onKeyUp", "field"]);
              const schema = Object.assign(Object.assign({}, field), { className: inputClassName, type: (field && field.type) || 'plain' });
              let body = children
                  ? children
                  : render('field', schema, Object.assign(Object.assign({}, rest), { value,
                      data }));
              if (width) {
                  style = style || {};
                  style.width = style.width || width;
              }
              if (!Component) {
                  return body;
              }
              return (react_1.default.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
          }
      };
      StaticFieldRenderer.defaultProps = Object.assign(Object.assign({}, Table_1.TableCell.defaultProps), { wrapperComponent: 'div' });
      StaticFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)static\-field$/
          }),
          QuickEdit_1.default(),
          PopOver_1.default(),
          Copyable_1.default()
      ], StaticFieldRenderer);
      return StaticFieldRenderer;
  })();
  exports.StaticFieldRenderer = StaticFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3RhdGljLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1N0YXRpYy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQixpQ0FBbUU7QUFDbkUsb0NBQW1DO0FBQ25DLGlFQUFrRDtBQUNsRCxxRUFBd0Q7QUFDeEQsMkNBQXVDO0FBQ3ZDLG1FQUFxRDtBQUNyRCwrQ0FBZ0Q7QUFpRGhEO0lBQUEsTUFBcUIsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUEyQjtRQUsxRSxZQUFZLEtBQWtCO1lBQzVCLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUViLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELENBQUM7UUFFRCxpQkFBaUIsQ0FBQyxNQUFXLEVBQUUsZUFBOEI7WUFDM0QsTUFBTSxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVsRCxZQUFZLENBQUMsTUFBTSxFQUFFLGVBQWUsS0FBSyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLGVBQWUsSUFBSSxlQUFlLENBQUMsR0FBRyxFQUFFO2dCQUMxQyxRQUFRLENBQ04sSUFBSSxFQUNKO29CQUNFLFVBQVUsRUFBRSxNQUFNO29CQUNsQixHQUFHLEVBQUUsZUFBZSxDQUFDLEdBQUc7aUJBQ3pCLEVBQ0QscUJBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQzNCLENBQUM7YUFDSDtRQUNILENBQUM7UUFFRCxNQUFNO1lBQ0osTUFBTSxLQVdGLElBQUksQ0FBQyxLQUFLLEVBWFIsRUFDSixTQUFTLEVBQ1QsS0FBSyxFQUNMLEtBQUssRUFDTCxJQUFJLEVBQ0osTUFBTSxFQUNOLFFBQVEsRUFDUixJ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

});
