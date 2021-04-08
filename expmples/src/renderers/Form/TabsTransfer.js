amis.define('src/renderers/Form/TabsTransfer.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TabsTransferRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Spinner_1 = tslib_1.__importDefault(require("src/components/Spinner.tsx"));
  const Transfer_1 = require("src/renderers/Form/Transfer.tsx");
  const TabsTransfer_1 = tslib_1.__importDefault(require("src/components/TabsTransfer.tsx"));
  let TabsTransferRenderer = /** @class */ (() => {
      let TabsTransferRenderer = class TabsTransferRenderer extends Transfer_1.BaseTransferRenderer {
          render() {
              const { className, classnames: cx, options, selectedOptions, sortable, loading, searchable, searchResultMode, showArrow, deferLoad, disabled } = this.props;
              return (react_1.default.createElement("div", { className: cx('TabsTransferControl', className) },
                  react_1.default.createElement(TabsTransfer_1.default, { value: selectedOptions, disabled: disabled, options: options, onChange: this.handleChange, option2value: this.option2value, sortable: sortable, searchResultMode: searchResultMode, onSearch: searchable ? this.handleSearch : undefined, showArrow: showArrow, onDeferLoad: deferLoad }),
                  react_1.default.createElement(Spinner_1.default, { overlay: true, key: "info", show: loading })));
          }
      };
      TabsTransferRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'tabs-transfer'
          })
      ], TabsTransferRenderer);
      return TabsTransferRenderer;
  })();
  exports.TabsTransferRenderer = TabsTransferRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFic1RyYW5zZmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL1RhYnNUcmFuc2Zlci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHVDQUltQjtBQUNuQiwwREFBMEI7QUFFMUIsK0VBQStDO0FBQy9DLHlDQUFnRDtBQUNoRCx5RkFBeUQ7QUFrRHpEO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBcUIsU0FBUSwrQkFBdUM7UUFDL0UsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxPQUFPLEVBQ1AsZUFBZSxFQUNmLFFBQVEsRUFDUixPQUFPLEVBQ1AsVUFBVSxFQUNWLGdCQUFnQixFQUNoQixTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsRUFDVCxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsdUNBQUssU0FBUyxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsRUFBRSxTQUFTLENBQUM7Z0JBQ2xELDhCQUFDLHNCQUFZLElBQ1gsS0FBSyxFQUFFLGVBQWUsRUFDdEIsUUFBUSxFQUFFLFFBQVEsRUFDbEIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFlBQVksRUFBRSxJQUFJLENBQUMsWUFBWSxFQUMvQixRQUFRLEVBQUUsUUFBUSxFQUNsQixnQkFBZ0IsRUFBRSxnQkFBZ0IsRUFDbEMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUNwRCxTQUFTLEVBQUUsU0FBUyxFQUNwQixXQUFXLEVBQUUsU0FBUyxHQUN0QjtnQkFFRiw4QkFBQyxpQkFBTyxJQUFDLE9BQU8sUUFBQyxHQUFHLEVBQUMsTUFBTSxFQUFDLElBQUksRUFBRSxPQUFPLEdBQUksQ0FDekMsQ0FDUCxDQUFDO1FBQ0osQ0FBQztLQUNGLENBQUE7SUFuQ1ksb0JBQW9CO1FBSGhDLHdCQUFjLENBQUM7WUFDZCxJQUFJLEVBQUUsZUFBZTtTQUN0QixDQUFDO09BQ1csb0JBQW9CLENBbUNoQztJQUFELDJCQUFDO0tBQUE7QUFuQ1ksb0RBQW9CIn0=

});
