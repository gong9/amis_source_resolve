amis.define('src/renderers/PaginationWrapper.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PaginationWrapperRenderer = exports.PaginationWrapper = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const pagination_1 = require("src/store/pagination.ts");
  let PaginationWrapper = /** @class */ (() => {
      class PaginationWrapper extends react_1.default.Component {
          constructor(props) {
              super(props);
              props.store.syncProps(props, undefined, [
                  'perPage',
                  'mode',
                  'inputName',
                  'outputName'
              ]);
          }
          componentDidUpdate(prevProps) {
              const store = this.props.store;
              store.syncProps(this.props, prevProps, [
                  'perPage',
                  'mode',
                  'inputName',
                  'outputName'
              ]);
          }
          render() {
              const { position, render, store, classnames: cx, body, translate: __ } = this.props;
              const pagination = position !== 'none'
                  ? render('pager', {
                      type: 'pagination'
                  }, {
                      activePage: store.page,
                      lastPage: store.lastPage,
                      mode: store.mode,
                      onPageChange: store.switchTo,
                      className: 'PaginationWrapper-pager'
                  })
                  : null;
              return (react_1.default.createElement("div", { className: cx('PaginationWrapper') },
                  position === 'top' ? pagination : null,
                  body ? (render('body', body, {
                      data: store.locals
                  })) : (react_1.default.createElement("span", null, __('PaginationWrapper.placeholder'))),
                  position === 'bottom' ? pagination : null));
          }
      }
      PaginationWrapper.defaultProps = {
          inputName: 'items',
          outputName: 'items',
          perPage: 10,
          position: 'top'
      };
      return PaginationWrapper;
  })();
  exports.PaginationWrapper = PaginationWrapper;
  let PaginationWrapperRenderer = /** @class */ (() => {
      let PaginationWrapperRenderer = class PaginationWrapperRenderer extends PaginationWrapper {
      };
      PaginationWrapperRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)pagination-wrapper$/,
              name: 'pagination-wrapper',
              storeType: pagination_1.PaginationStore.name
          })
      ], PaginationWrapperRenderer);
      return PaginationWrapperRenderer;
  })();
  exports.PaginationWrapperRenderer = PaginationWrapperRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbldyYXBwZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL1BhZ2luYXRpb25XcmFwcGVyLnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHdDQUFtRDtBQUVuRCxvREFBc0U7QUErRHRFO0lBQUEsTUFBYSxpQkFBa0IsU0FBUSxlQUFLLENBQUMsU0FBOEI7UUFRekUsWUFBWSxLQUEwQjtZQUNwQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDYixLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsU0FBUyxFQUFFO2dCQUN0QyxTQUFTO2dCQUNULE1BQU07Z0JBQ04sV0FBVztnQkFDWCxZQUFZO2FBQ2IsQ0FBQyxDQUFDO1FBQ0wsQ0FBQztRQUVELGtCQUFrQixDQUFDLFNBQThCO1lBQy9DLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQy9CLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxTQUFTLEVBQUU7Z0JBQ3JDLFNBQVM7Z0JBQ1QsTUFBTTtnQkFDTixXQUFXO2dCQUNYLFlBQVk7YUFDYixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixRQUFRLEVBQ1IsTUFBTSxFQUNOLEtBQUssRUFDTCxVQUFVLEVBQUUsRUFBRSxFQUNkLElBQUksRUFDSixTQUFTLEVBQUUsRUFBRSxFQUNkLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUVmLE1BQU0sVUFBVSxHQUNkLFFBQVEsS0FBSyxNQUFNO2dCQUNqQixDQUFDLENBQUMsTUFBTSxDQUNKLE9BQU8sRUFDUDtvQkFDRSxJQUFJLEVBQUUsWUFBWTtpQkFDbkIsRUFDRDtvQkFDRSxVQUFVLEVBQUUsS0FBSyxDQUFDLElBQUk7b0JBQ3RCLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUTtvQkFDeEIsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixZQUFZLEVBQUUsS0FBSyxDQUFDLFFBQVE7b0JBQzVCLFNBQVMsRUFBRSx5QkFBeUI7aUJBQ3JDLENBQ0Y7Z0JBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUVYLE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLG1CQUFtQixDQUFDO2dCQUNwQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUk7Z0JBQ3RDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FDTixNQUFNLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRTtvQkFDbkIsSUFBSSxFQUFFLEtBQUssQ0FBQyxNQUFNO2lCQUNuQixDQUFDLENBQ0gsQ0FBQyxDQUFDLENBQUMsQ0FDRiw0Q0FBTyxFQUFFLENBQUMsK0JBQStCLENBQUMsQ0FBUSxDQUNuRDtnQkFDQSxRQUFRLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FDdEMsQ0FDUCxDQUFDO1FBQ0osQ0FBQzs7SUFuRU0sOEJBQVksR0FBRztRQUNwQixTQUFTLEVBQUUsT0FBTztRQUNsQixVQUFVLEVBQUUsT0FBTztRQUNuQixPQUFPLEVBQUUsRUFBRTtRQUNYLFFBQVEsRUFBRSxLQUFLO0tBQ2hCLENBQUM7SUErREosd0JBQUM7S0FBQTtBQXJFWSw4Q0FBaUI7QUE0RTlCO0lBQUEsSUFBYSx5QkFBeUIsR0FBdEMsTUFBYSx5QkFBMEIsU0FBUSxpQkFBaUI7S0FBRyxDQUFBO0lBQXRELHlCQUF5QjtRQUxyQyxrQkFBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLDJCQUEyQjtZQUNqQyxJQUFJLEVBQUUsb0JBQW9CO1lBQzFCLFNBQVMsRUFBRSw0QkFBZSxDQUFDLElBQUk7U0FDaEMsQ0FBQztPQUNXLHlCQUF5QixDQUE2QjtJQUFELGdDQUFDO0tBQUE7QUFBdEQsOERBQXlCIn0=

});
