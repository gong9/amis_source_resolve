amis.define('src/renderers/Form/List.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const helper_1 = require("src/utils/helper.ts");
  let ListControl = /** @class */ (() => {
      class ListControl extends react_1.default.Component {
          handleDBClick(option, e) {
              this.props.onToggle(option, false, true);
              this.props.onAction(null, {
                  type: 'submit'
              });
          }
          handleClick(option, e) {
              if (e.target && e.target.closest('a,button')) {
                  return;
              }
              const { onToggle } = this.props;
              onToggle(option);
          }
          reload() {
              const reload = this.props.reloadOptions;
              reload && reload();
          }
          render() {
              const { render, itemClassName, classnames: cx, className, disabled, options, placeholder, selectedOptions, imageClassName, submitOnDBClick, itemSchema, data, labelField, listClassName } = this.props;
              let body = null;
              if (options && options.length) {
                  body = (react_1.default.createElement("div", { className: cx('ListControl-items', listClassName) }, options.map((option, key) => (react_1.default.createElement("div", { key: key, className: cx(`ListControl-item`, itemClassName, {
                          'is-active': ~selectedOptions.indexOf(option),
                          'is-disabled': option.disabled || disabled
                      }), onClick: this.handleClick.bind(this, option), onDoubleClick: submitOnDBClick
                          ? this.handleDBClick.bind(this, option)
                          : undefined }, itemSchema
                      ? render(`${key}/body`, itemSchema, {
                          data: helper_1.createObject(data, option)
                      })
                      : option.body
                          ? render(`${key}/body`, option.body)
                          : [
                              option.image ? (react_1.default.createElement("div", { key: "image", className: cx('ListControl-itemImage', imageClassName) },
                                  react_1.default.createElement("img", { src: option.image, alt: option[labelField || 'label'] }))) : null,
                              option[labelField || 'label'] ? (react_1.default.createElement("div", { key: "label", className: cx('ListControl-itemLabel') }, String(option[labelField || 'label']))) : null
                              // {/* {option.tip ? (<div className={`${ns}ListControl-tip`}>{option.tip}</div>) : null} */}
                          ])))));
              }
              return (react_1.default.createElement("div", { className: cx('ListControl', className) }, body ? (body) : (react_1.default.createElement("span", { className: cx('ListControl-placeholder') }, placeholder))));
          }
      }
      ListControl.propsList = ['itemSchema', 'value', 'renderFormItems'];
      ListControl.defaultProps = {
          clearable: false,
          imageClassName: '',
          submitOnDBClick: false
      };
      return ListControl;
  })();
  exports.default = ListControl;
  let ListControlRenderer = /** @class */ (() => {
      let ListControlRenderer = class ListControlRenderer extends ListControl {
      };
      ListControlRenderer = tslib_1.__decorate([
          Options_1.OptionsControl({
              type: 'list',
              sizeMutable: false
          })
      ], ListControlRenderer);
      return ListControlRenderer;
  })();
  exports.ListControlRenderer = ListControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvRm9ybS9MaXN0LnRzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMERBQTBCO0FBQzFCLHVDQUttQjtBQUVuQiwrQ0FBeUQ7QUE0Q3pEO0lBQUEsTUFBcUIsV0FBWSxTQUFRLGVBQUssQ0FBQyxTQUF5QjtRQVF0RSxhQUFhLENBQUMsTUFBYyxFQUFFLENBQWdDO1lBQzVELElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFDekMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFO2dCQUN4QixJQUFJLEVBQUUsUUFBUTthQUNmLENBQUMsQ0FBQztRQUNMLENBQUM7UUFFRCxXQUFXLENBQUMsTUFBYyxFQUFFLENBQWdDO1lBQzFELElBQUksQ0FBQyxDQUFDLE1BQU0sSUFBSyxDQUFDLENBQUMsTUFBc0IsQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQzdELE9BQU87YUFDUjtZQUVELE1BQU0sRUFBQyxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRTlCLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNuQixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDO1lBQ3hDLE1BQU0sSUFBSSxNQUFNLEVBQUUsQ0FBQztRQUNyQixDQUFDO1FBRUQsTUFBTTtZQUNKLE1BQU0sRUFDSixNQUFNLEVBQ04sYUFBYSxFQUNiLFVBQVUsRUFBRSxFQUFFLEVBQ2QsU0FBUyxFQUNULFFBQVEsRUFDUixPQUFPLEVBQ1AsV0FBVyxFQUNYLGVBQWUsRUFDZixjQUFjLEVBQ2QsZUFBZSxFQUNmLFVBQVUsRUFD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

});
