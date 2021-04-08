amis.define('src/renderers/Table/HeadCellSearchDropdown.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.HeadCellSearchDropDown = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const icons_1 = require("src/components/icons.tsx");
  const Overlay_1 = tslib_1.__importDefault(require("src/components/Overlay.tsx"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const PopOver_1 = tslib_1.__importDefault(require("src/components/PopOver.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  class HeadCellSearchDropDown extends react_1.default.Component {
      constructor(props) {
          super(props);
          this.state = {
              isOpened: false
          };
          this.formItems = [];
          this.open = this.open.bind(this);
          this.close = this.close.bind(this);
          this.close = this.close.bind(this);
          this.handleSubmit = this.handleSubmit.bind(this);
          this.handleAction = this.handleAction.bind(this);
      }
      buildSchema() {
          var _a;
          const { searchable, sortable, name, label, translate: __ } = this.props;
          let schema;
          if (searchable === true) {
              schema = {
                  title: '',
                  controls: [
                      {
                          type: 'text',
                          name,
                          placeholder: label,
                          clearable: true
                      }
                  ]
              };
          }
          else if (searchable) {
              if (searchable.controls || searchable.tabs || searchable.fieldSet) {
                  schema = Object.assign(Object.assign({ title: '' }, searchable), { controls: Array.isArray(searchable.controls)
                          ? searchable.controls.concat()
                          : undefined });
              }
              else {
                  schema = {
                      title: '',
                      className: searchable.formClassName,
                      controls: [
                          Object.assign({ type: searchable.type || 'text', name: searchable.name || name, placeholder: label }, searchable)
                      ]
                  };
              }
          }
          if (schema && schema.controls && sortable) {
              schema.controls.unshift({
                  type: 'hidden',
                  name: 'orderBy',
                  value: name
              }, {
                  type: 'button-group',
                  name: 'orderDir',
                  label: __('sort'),
                  options: [
                      {
                          label: __('asc'),
                          value: 'asc'
                      },
                      {
                          label: __('desc'),
                          value: 'desc'
                      }
                  ]
              });
          }
          if (schema) {
              const formItems = [];
              (_a = schema.controls) === null || _a === void 0 ? void 0 : _a.forEach((item) => item.name &&
                  item.name !== 'orderBy' &&
                  item.name !== 'orderDir' &&
                  formItems.push(item.name));
              this.formItems = formItems;
              schema = Object.assign(Object.assign({}, schema), { type: 'form', wrapperComponent: 'div', actions: [
                      {
                          type: 'button',
                          label: __('reset'),
                          actionType: 'clear-and-submit'
                      },
                      {
                          type: 'button',
                          label: __('cancle'),
                          actionType: 'cancel'
                      },
                      {
                          label: __('search'),
                          type: 'submit',
                          primary: true
                      }
                  ] });
          }
          return schema || 'error';
      }
      handleClickOutside() {
          this.close();
      }
      open() {
          this.setState({
              isOpened: true
          });
      }
      close() {
          this.setState({
              isOpened: false
          });
      }
      handleAction(e, action, ctx) {
          const { onAction } = this.props;
          if (action.actionType === 'cancel' || action.actionType === 'close') {
              this.close();
              return;
          }
          if (action.actionType === 'reset') {
              this.close();
              this.handleReset();
              return;
          }
          onAction && onAction(e, action, ctx);
      }
      handleReset() {
          const { onQuery, data, name } = this.props;
          const values = Object.assign({}, data);
          this.formItems.forEach(key => helper_1.setVariable(values, key, undefined));
          if (values.orderBy === name) {
              values.orderBy = '';
              values.orderDir = 'asc';
          }
          onQuery(values);
      }
      handleSubmit(values) {
          const { onQuery, name } = this.props;
          this.close();
          if (values.orderDir) {
              values = Object.assign(Object.assign({}, values), { orderBy: name });
          }
          onQuery(values);
      }
      isActive() {
          const { data, name, orderBy } = this.props;
          return orderBy === name || this.formItems.some(key => data === null || data === void 0 ? void 0 : data[key]);
      }
      render() {
          const { render, name, data, searchable, store, orderBy, popOverContainer, classPrefix: ns, classnames: cx } = this.props;
          const formSchema = this.buildSchema();
          const isActive = this.isActive();
          return (react_1.default.createElement("span", { className: cx(`${ns}TableCell-searchBtn`, isActive ? 'is-active' : '') },
              react_1.default.createElement("span", { onClick: this.open },
                  react_1.default.createElement(icons_1.Icon, { icon: "search", className: "icon" })),
              this.state.isOpened ? (react_1.default.createElement(Overlay_1.default, { container: popOverContainer || (() => react_dom_1.findDOMNode(this)), placement: "left-bottom-left-top right-bottom-right-top", target: popOverContainer ? () => react_dom_1.findDOMNode(this).parentNode : null, show: true },
                  react_1.default.createElement(PopOver_1.default, { classPrefix: ns, onHide: this.close, className: cx(`${ns}TableCell-searchPopOver`, searchable.className), overlay: true }, render('quick-search-form', formSchema, {
                      data: Object.assign(Object.assign({}, data), { orderBy: orderBy, orderDir: orderBy === name ? store.orderDir : '' }),
                      onSubmit: this.handleSubmit,
                      onAction: this.handleAction
                  })))) : null));
      }
  }
  exports.HeadCellSearchDropDown = HeadCellSearchDropDown;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZENlbGxTZWFyY2hEcm9wZG93bi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvVGFibGUvSGVhZENlbGxTZWFyY2hEcm9wZG93bi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUcxQixrREFBNEM7QUFDNUMsK0VBQStDO0FBQy9DLHlDQUFzQztBQUN0QywrRUFBK0M7QUFFL0MsK0NBQStDO0FBaUIvQyxNQUFhLHNCQUF1QixTQUFRLGVBQUssQ0FBQyxTQUdqRDtJQU1DLFlBQVksS0FBMEI7UUFDcEMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBTmYsVUFBSyxHQUFHO1lBQ04sUUFBUSxFQUFFLEtBQUs7U0FDaEIsQ0FBQztRQUVGLGNBQVMsR0FBa0IsRUFBRSxDQUFDO1FBSTVCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ25DLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNuRCxDQUFDO0lBRUQsV0FBVzs7UUFDVCxNQUFNLEVBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXRFLElBQUksTUFBVyxDQUFDO1FBRWhCLElBQUksVUFBVSxLQUFLLElBQUksRUFBRTtZQUN2QixNQUFNLEdBQUc7Z0JBQ1AsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsUUFBUSxFQUFFO29CQUNSO3dCQUNFLElBQUksRUFBRSxNQUFNO3dCQUNaLElBQUk7d0JBQ0osV0FBVyxFQUFFLEtBQUs7d0JBQ2xCLFNBQVMsRUFBRSxJQUFJO3FCQUNoQjtpQkFDRjthQUNGLENBQUM7U0FDSDthQUFNLElBQUksVUFBVSxFQUFFO1lBQ3JCLElBQUksVUFBVSxDQUFDLFFBQVEsSUFBSSxVQUFVLENBQUMsSUFBSSxJQUFJLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0JBQ2pFLE1BQU0saUNBQ0osS0FBSyxFQUFFLEVBQUUsSUFDTixVQUFVLEtBQ2IsUUFBUSxFQUFFLEtBQUssQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQzt3QkFDMUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFO3dCQUM5QixDQUFDLENBQUMsU0FBUyxHQUNkLENBQUM7YUFDSDtpQkFBTTtnQkFDTCxNQUFNLEdBQUc7b0JBQ1AsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsU0FBUyxFQUFFLFVBQVUsQ0FBQyxhQUFhO29CQUNuQyxRQUFRLEVBQUU7d0NBRU4sSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLElBQUksTUFBTSxFQUMvQixJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksSUFBSSxJQUFJLEVBQzdCLFdBQVcsRUFBRSxLQUFLLElBQ2YsVUFBVTtxQkFFaEI7aUJBQ0YsQ0FBQzthQUNIO1NBQ0Y7UUFFRCxJQUFJLE1BQU0sSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLFFBQVEsRUFBRTtZQUN6QyxNQUFNLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FDckI7Z0JBQ0UsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsS0FBSyxFQUFFLElBQUk7YUFDWixFQUNEO2dCQUNFLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLEVBQUUsVUFBVTtnQkFDaEIsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRTtvQkFDUDt3QkFDRSxLQUFLLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQzt3QkFDaEIsS0FBSyxFQUFFLEtBQUs7cUJBQ2I7b0JBQ0Q7d0JBQ0UsS0FBSyxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUM7d0JBQ2pCLEtBQUssRUFBRSxNQUFNO3FCQUNkO2lCQUNGO2FBQ0YsQ0FDRixDQUFDO1NBQ0g7UUFFRCxJQUFJLE1BQU0sRUFBRTtZQUNWLE1BQU0sU0FBUyxHQUFrQixFQUFFLENBQUM7WUFDcEMsTUFBQSxNQUFNLENBQUMsUUFBUSwwQ0FBRSxPQUFPLENBQ3RCLENBQUMsSUFBUyxFQUFFLEVBQUUsQ0FDWixJQUFJLENBQUMsSUFBSTtnQkFDVCxJQUFJLENBQUMsSUFBSSxLQUFLLFNBQVM7Z0JBQ3ZCLElBQUksQ0FBQyxJQUFJLEtBQUssVUFBVTtnQkFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQzNCO1lBQ0YsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7WUFDM0IsTUFBTSxtQ0FDRCxNQUFNLEtBQ1QsSUFBSSxFQUFFLE1BQU0sRUFDWixnQkFBZ0IsRUFBRSxLQUFLLEVBQ3ZCLE9BQU8sRUFBRTtvQkFDUDt3QkFDRSxJQUFJLEVBQUUsUUFBUTt3QkFDZCxLQUFLLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQzt3QkFDbEIsVUFBVSxFQUFFLGtCQUFrQjtxQkFDL0I7b0JBRUQ7d0JBQ0UsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsS0FBSyxFQUFFLEVBQUUsQ0FBQyxRQUFRLENBQUM7d0JBQ25CLFVBQVUsRUFBRSxRQUFRO3FCQUNyQjtvQkFFRDt3QkFDRSxLQUFLLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQzt3QkFDbkIsSUFBSSxFQUFFLFFBQVE7d0JBQ2QsT0FBTyxFQUFFLElBQUk7cUJBQ2Q7aUJBQ0YsR0FDRixDQUFDO1NBQ0g7UUFFRCxPQUFPLE1BQU0sSUFBSSxPQUFPLENBQUM7SUFDM0IsQ0FBQztJQUVELGtCQUFrQjtRQUNoQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDO0lBRUQsSUFBSTtRQUNGLElBQUksQ0FBQyxRQUFRLENBQUM7WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUNaLFFBQVEsRUFBRSxLQUFLO1NBQ2hCLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxZQUFZLENBQUMsQ0FBTSxFQUFFLE1BQWMsRUFBRSxHQUFXO1FBQzlDLE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRTlCLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxRQUFRLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxPQUFPLEVBQUU7WUFDbkUsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsT0FBTztTQUNSO1FBRUQsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLE9BQU8sRUFBRTtZQUNqQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBRUQsUUFBUSxJQUFJLFFBQVEsQ0FBQyxDQUFDLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZDLENBQUM7SUFFRCxXQUFXO1FBQ1QsTUFBTSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUN6QyxNQUFNLE1BQU0scUJBQU8sSUFBSSxDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxvQkFBVyxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztRQUVuRSxJQUFJLE1BQU0sQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQzNCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1NBQ3pCO1FBQ0QsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxZQUFZLENBQUMsTUFBVztRQUN0QixNQUFNLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWIsSUFBSSxNQUFNLENBQUMsUUFBUSxFQUFFO1lBQ25CLE1BQU0sbUNBQ0QsTUFBTSxLQUNULE9BQU8sRUFBRSxJQUFJLEdBQ2QsQ0FBQztTQUNIO1FBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ2xCLENBQUM7SUFFRCxRQUFRO1FBQ04sTUFBTSxFQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUV6QyxPQUFPLE9BQU8sS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxJQUFJLGFBQUosSUFBSSx1QkFBSixJQUFJLENBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNyRSxDQUFDO0lBRUQsTUFBTTtRQUNKLE1BQU0sRUFDSixNQUFNLEVBQ04sSUFBSSxFQUNKLElBQUksRUFDSixVQUFVLEVBQ1YsS0FBSyxFQUNMLE9BQU8sRUFDUCxnQkFBZ0IsRUFDaEIsV0FBVyxFQUFFLEVBQUUsRUFDZixVQUFVLEVBQUUsRUFBRSxFQUNmLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztRQUVmLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUN0QyxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFakMsT0FBTyxDQUNMLHdDQUNFLFNBQVMsRUFBRSxFQUFFLENBQUMsR0FBRyxFQUFFLHFCQUFxQixFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFdEUsd0NBQU0sT0FBTyxFQUFFLElBQUksQ0FBQyxJQUFJO2dCQUN0Qiw4QkFBQyxZQUFJLElBQUMsSUFBSSxFQUFDLFFBQVEsRUFBQyxTQUFTLEVBQUMsTUFBTSxHQUFHLENBQ2xDO1lBQ04sSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQ3JCLDhCQUFDLGlCQUFPLElBQ04sU0FBUyxFQUFFLGdCQUFnQixJQUFJLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN4RCxTQUFTLEVBQUMsNkNBQTZDLEVBQ3ZELE1BQU0sRUFDSixnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUMsdUJBQVcsQ0FBQyxJQUFJLENBQUUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksRUFFL0QsSUFBSTtnQkFFSiw4QkFBQyxpQkFBTyxJQUNOLFdBQVcsRUFBRSxFQUFFLEVBQ2YsTUFBTSxFQUFFLElBQUksQ0FBQyxLQUFLLEVBQ2xCLFNBQVMsRUFBRSxFQUFFLENBQ1gsR0FBRyxFQUFFLHlCQUF5QixFQUM3QixVQUFrQixDQUFDLFNBQVMsQ0FDOUIsRUFDRCxPQUFPLFVBR0wsTUFBTSxDQUFDLG1CQUFtQixFQUFFLFVBQVUsRUFBRTtvQkFDdEMsSUFBSSxrQ0FDQyxJQUFJLEtBQ1AsT0FBTyxFQUFFLE9BQU8sRUFDaEIsUUFBUSxFQUNOLE9BQU8sS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFFLEtBQXFCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQzFEO29CQUNELFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWTtvQkFDM0IsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZO2lCQUM1QixDQUFnQixDQUVYLENBQ0YsQ0FDWCxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ0gsQ0FDUixDQUFDO0lBQ0osQ0FBQztDQUNGO0FBMVBELHdEQTBQQyJ9

});
