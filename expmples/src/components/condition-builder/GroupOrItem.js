amis.define('src/components/condition-builder/GroupOrItem.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CBGroupOrItem = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const icons_1 = require("src/components/icons.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Group_1 = tslib_1.__importDefault(require("src/components/condition-builder/Group.tsx"));
  const Item_1 = tslib_1.__importDefault(require("src/components/condition-builder/Item.tsx"));
  let CBGroupOrItem = /** @class */ (() => {
      class CBGroupOrItem extends react_1.default.Component {
          handleItemChange(value) {
              this.props.onChange(value, this.props.index);
          }
          handleItemRemove() {
              var _a, _b;
              (_b = (_a = this.props).onRemove) === null || _b === void 0 ? void 0 : _b.call(_a, this.props.index);
          }
          render() {
              const { classnames: cx, value, config, fields, funcs, draggable, data, onDragStart } = this.props;
              return (react_1.default.createElement("div", { className: cx('CBGroupOrItem'), "data-id": value === null || value === void 0 ? void 0 : value.id },
                  react_1.default.createElement("div", { className: cx('CBGroupOrItem-body') },
                      draggable ? (react_1.default.createElement("a", { draggable: true, onDragStart: onDragStart, className: cx('CBGroupOrItem-dragbar') },
                          react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" }))) : null,
                      (value === null || value === void 0 ? void 0 : value.conjunction) ? (react_1.default.createElement(Group_1.default, { onDragStart: onDragStart, config: config, fields: fields, value: value, onChange: this.handleItemChange, funcs: funcs, removeable: true, onRemove: this.handleItemRemove, data: data })) : (react_1.default.createElement(react_1.default.Fragment, null,
                          react_1.default.createElement(Item_1.default, { config: config, fields: fields, value: value, onChange: this.handleItemChange, funcs: funcs, data: data }),
                          react_1.default.createElement("a", { className: cx('CBDelete'), onClick: this.handleItemRemove },
                              react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })))))));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], CBGroupOrItem.prototype, "handleItemChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], CBGroupOrItem.prototype, "handleItemRemove", null);
      return CBGroupOrItem;
  })();
  exports.CBGroupOrItem = CBGroupOrItem;
  exports.default = theme_1.themeable(CBGroupOrItem);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JvdXBPckl0ZW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9Hcm91cE9ySXRlbS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLHVDQUFrRDtBQUNsRCwwREFBMEI7QUFDMUIsb0NBQThCO0FBQzlCLCtDQUE0QztBQUM1Qyw0REFBcUM7QUFDckMsMERBQW1DO0FBZ0JuQztJQUFBLE1BQWEsYUFBYyxTQUFRLGVBQUssQ0FBQyxTQUE2QjtRQUVwRSxnQkFBZ0IsQ0FBQyxLQUFVO1lBQ3pCLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9DLENBQUM7UUFHRCxnQkFBZ0I7O1lBQ2QsTUFBQSxNQUFBLElBQUksQ0FBQyxLQUFLLEVBQUMsUUFBUSxtREFBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtRQUMxQyxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixVQUFVLEVBQUUsRUFBRSxFQUNkLEtBQUssRUFDTCxNQUFNLEVBQ04sTUFBTSxFQUNOLEtBQUssRUFDTCxTQUFTLEVBQ1QsSUFBSSxFQUNKLFdBQVcsRUFDWixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxlQUFlLENBQUMsYUFBVyxLQUFLLGFBQUwsS0FBSyx1QkFBTCxLQUFLLENBQUUsRUFBRTtnQkFDckQsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxvQkFBb0IsQ0FBQztvQkFDckMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUNYLHFDQUNFLFNBQVMsUUFDVCxXQUFXLEVBQUUsV0FBVyxFQUN4QixTQUFTLEVBQUUsRUFBRSxDQUFDLHVCQUF1QixDQUFDO3dCQUV0Qyw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLFVBQVUsRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ3ZDLENBQ0wsQ0FBQyxDQUFDLENBQUMsSUFBSTtvQkFFUCxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxXQUFXLEVBQUMsQ0FBQyxDQUFDLENBQ3BCLDhCQUFDLGVBQWMsSUFDYixXQUFXLEVBQUUsV0FBVyxFQUN4QixNQUFNLEVBQUUsTUFBTSxFQUNkLE1BQU0sRUFBRSxNQUFNLEVBQ2QsS0FBSyxFQUFFLEtBQTRCLEVBQ25DLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQy9CLEtBQUssRUFBRSxLQUFLLEVBQ1osVUFBVSxRQUNWLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQy9CLElBQUksRUFBRSxJQUFJLEdBQ1YsQ0FDSCxDQUFDLENBQUMsQ0FBQyxDQUNGO3dCQUNFLDhCQUFDLGNBQWEsSUFDWixNQUFNLEVBQUUsTUFBTSxFQUNkLE1BQU0sRUFBRSxNQUFNLEVBQ2QsS0FBSyxFQUFFLEtBQXVCLEVBQzlCLFFBQVEsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLEVBQy9CLEtBQUssRUFBRSxLQUFLLEVBQ1osSUFBSSxFQUFFLElBQUksR0FDVjt3QkFDRixxQ0FBRyxTQUFTLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsZ0JBQWdCOzRCQUMxRCw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ3BDLENBQ0gsQ0FDSixDQUNHLENBQ0YsQ0FDUCxDQUFDO1FBQ0osQ0FBQztLQUNGO0lBakVDO1FBREMsaUJBQVE7Ozs7eURBR1I7SUFHRDtRQURDLGlCQUFROzs7O3lEQUdSO0lBMERILG9CQUFDO0tBQUE7QUFuRVksc0NBQWE7QUFxRTFCLGtCQUFlLGlCQUFTLENBQUMsYUFBYSxDQUFDLENBQUMifQ==

});
