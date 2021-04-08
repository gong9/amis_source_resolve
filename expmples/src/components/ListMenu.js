amis.define('src/components/ListMenu.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ListMenu = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const theme_1 = require("src/theme.tsx");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const locale_1 = require("src/locale.tsx");
  let ListMenu = /** @class */ (() => {
      class ListMenu extends react_1.default.Component {
          renderItem(result, option, optionIndex) {
              const { classnames: cx, itemRender, disabled, getItemProps, highlightIndex, selectedOptions, onSelect } = this.props;
              if (Array.isArray(option.children) && option.children.length) {
                  const stackResult = {
                      items: [],
                      index: result.index
                  };
                  result.items.push(react_1.default.createElement("div", { className: cx('ListMenu-group'), key: optionIndex },
                      react_1.default.createElement("div", { className: cx('ListMenu-groupLabel') }, itemRender(option)),
                      option.children.reduce((result, option, index) => this.renderItem(result, option, index), stackResult).items));
                  result.index = stackResult.index;
                  return result;
              }
              const index = result.index++;
              result.items.push(react_1.default.createElement("div", Object.assign({ className: cx('ListMenu-item', option.className, disabled || option.disabled ? 'is-disabled' : '', index === highlightIndex ? 'is-highlight' : '', ~(selectedOptions || []).indexOf(option) ? 'is-active' : ''), key: index, onClick: onSelect ? (e) => onSelect(e, option) : undefined }, getItemProps({
                  item: option,
                  index: index
              })),
                  react_1.default.createElement("div", { className: cx('ListMenu-itemLabel') }, itemRender(option))));
              return result;
          }
          render() {
              const { classnames: cx, options, placeholder, prefix, children } = this.props;
              const __ = this.props.translate;
              return (react_1.default.createElement("div", { className: cx('ListMenu') },
                  prefix,
                  Array.isArray(options) && options.length ? (options.reduce((result, option, index) => this.renderItem(result, option, index), {
                      items: [],
                      index: 0
                  }).items) : (react_1.default.createElement("span", { className: cx('ListMenu-placeholder') }, __(placeholder))),
                  children));
          }
      }
      ListMenu.defaultProps = {
          placeholder: 'placeholder.noOption',
          itemRender: (option) => react_1.default.createElement(react_1.default.Fragment, null, option.label),
          getItemProps: (props) => null
      };
      return ListMenu;
  })();
  exports.ListMenu = ListMenu;
  exports.default = theme_1.themeable(locale_1.localeable(ListMenu));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlzdE1lbnUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9MaXN0TWVudS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG9DQUErQztBQUMvQywwREFBMEI7QUFFMUIsc0NBQWtEO0FBbUJsRDtJQUFBLE1BQWEsUUFBUyxTQUFRLGVBQUssQ0FBQyxTQUF3QjtRQU8xRCxVQUFVLENBQUMsTUFBb0IsRUFBRSxNQUFjLEVBQUUsV0FBbUI7WUFDbEUsTUFBTSxFQUNKLFVBQVUsRUFBRSxFQUFFLEVBQ2QsVUFBVSxFQUNWLFFBQVEsRUFDUixZQUFZLEVBQ1osY0FBYyxFQUNkLGVBQWUsRUFDZixRQUFRLEVBQ1QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDNUQsTUFBTSxXQUFXLEdBQUc7b0JBQ2xCLEtBQUssRUFBRSxFQUFFO29CQUNULEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSztpQkFDcEIsQ0FBQztnQkFDRixNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FDZix1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsR0FBRyxFQUFFLFdBQVc7b0JBQ3BELHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBRyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQU87b0JBRW5FLE1BQU0sQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUNwQixDQUFDLE1BQW9CLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3RDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsRUFDeEMsV0FBVyxDQUNa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

});
