amis.define('src/renderers/Pagination.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.PaginationRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const icons_1 = require("src/components/icons.tsx");
  let Pagination = /** @class */ (() => {
      var _a;
      class Pagination extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.state = {
                  pageNum: String(this.props.activePage) || ''
              };
          }
          componentWillReceiveProps(nextProps) {
              if (this.props.activePage !== nextProps.activePage) {
                  this.setState({
                      pageNum: String(nextProps.activePage) || ''
                  });
              }
          }
          renderSimple() {
              const { activePage, hasNext, onPageChange, classnames: cx } = this.props;
              return (react_1.default.createElement("ul", { className: cx('Pagination', 'Pagination--sm') },
                  react_1.default.createElement("li", { className: cx({
                          'is-disabled': activePage < 2
                      }), onClick: activePage < 2
                          ? e => e.preventDefault()
                          : () => onPageChange(activePage - 1) },
                      react_1.default.createElement("a", null,
                          react_1.default.createElement(icons_1.Icon, { icon: "left-arrow", className: "icon" }))),
                  react_1.default.createElement("li", { className: cx({
                          'is-disabled': !hasNext
                      }), onClick: !hasNext
                          ? e => e.preventDefault()
                          : () => onPageChange(activePage + 1) },
                      react_1.default.createElement("a", null,
                          react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" })))));
          }
          handlePageChange(e) {
              const { lastPage } = this.props;
              let value = e.currentTarget.value;
              if (/^\d+$/.test(value) && parseInt(value, 10) > lastPage) {
                  value = String(lastPage);
              }
              this.setState({ pageNum: value });
          }
          renderNormal() {
              let { activePage, lastPage, maxButtons, onPageChange, classnames: cx, showPageInput, className, translate: __ } = this.props;
              const pageNum = this.state.pageNum;
              let pageButtons = [];
              let startPage;
              let endPage;
              if (activePage < (maxButtons - 1) / 2 + 2) {
                  maxButtons = activePage + (maxButtons - 1) / 2;
              }
              if (lastPage - activePage < (maxButtons - 1) / 2 + 2) {
                  maxButtons = lastPage - activePage + (maxButtons - 1) / 2 + 1;
              }
              if (maxButtons && maxButtons < lastPage) {
                  startPage = Math.max(Math.min(activePage - Math.floor(maxButtons / 2), lastPage - maxButtons + 1), 1);
                  endPage = startPage + maxButtons - 1;
              }
              else {
                  startPage = 1;
                  endPage = lastPage;
              }
              for (let page = startPage; page <= endPage; ++page) {
                  pageButtons.push(react_1.default.createElement("li", { onClick: () => onPageChange(page), key: page, className: cx({
                          'is-active': page === activePage
                      }) },
                      react_1.default.createElement("a", { role: "button" }, page)));
              }
              if (startPage > 1) {
                  if (startPage > 2) {
                      pageButtons.unshift(react_1.default.createElement("li", { onClick: () => onPageChange(startPage - 1), key: "prev-ellipsis" },
                          react_1.default.createElement("a", { role: "button" }, "...")));
                  }
                  pageButtons.unshift(react_1.default.createElement("li", { onClick: () => onPageChange(1), key: 1, className: cx({
                          'is-active': 1 === activePage
                      }) },
                      react_1.default.createElement("a", { role: "button" }, 1)));
              }
              if (endPage < lastPage) {
                  if (lastPage - endPage > 1) {
                      pageButtons.push(react_1.default.createElement("li", { className: cx('Pagination-ellipsis'), onClick: () => onPageChange(endPage + 1), key: "next-ellipsis" },
                          react_1.default.createElement("a", { role: "button" },
                              react_1.default.createElement("span", null, "..."))));
                  }
                  pageButtons.push(react_1.default.createElement("li", { onClick: () => onPageChange(lastPage), key: lastPage, className: cx({
                          'is-active': lastPage === activePage
                      }) },
                      react_1.default.createElement("a", { role: "button" }, lastPage)));
              }
              pageButtons.unshift(react_1.default.createElement("li", { className: cx('Pagination-prev', {
                      'is-disabled': activePage === 1
                  }), onClick: activePage === 1
                      ? (e) => e.preventDefault()
                      : () => onPageChange(activePage - 1), key: "prev" },
                  react_1.default.createElement("span", null,
                      react_1.default.createElement(icons_1.Icon, { icon: "left-arrow", className: "icon" }))));
              pageButtons.push(react_1.default.createElement("li", { className: cx('Pagination-next', {
                      'is-disabled': activePage === lastPage
                  }), onClick: activePage === lastPage
                      ? (e) => e.preventDefault()
                      : () => onPageChange(activePage + 1), key: "next" },
                  react_1.default.createElement("span", null,
                      react_1.default.createElement(icons_1.Icon, { icon: "right-arrow", className: "icon" }))));
              return (react_1.default.createElement("div", { className: cx('Pagination-wrap', className) },
                  react_1.default.createElement("ul", { className: cx('Pagination', 'Pagination--sm') }, pageButtons),
                  showPageInput === true || lastPage > 9 ? (react_1.default.createElement("div", { className: cx('Pagination-inputGroup'), key: "toPage" },
                      __('CRUD.paginationGoText'),
                      react_1.default.createElement("input", { type: "text", onChange: this.handlePageChange, onFocus: (e) => e.currentTarget.select(), onKeyUp: (e) => e.keyCode == 13 &&
                              onPageChange(parseInt(e.currentTarget.value, 10)), value: pageNum }),
                      __('CRUD.paginationPageText'))) : null));
          }
          render() {
              const { mode } = this.props;
              return mode === 'simple' ? this.renderSimple() : this.renderNormal();
          }
      }
      Pagination.defaultProps = {
          activePage: 1,
          lastPage: 1,
          maxButtons: 5,
          mode: 'normal',
          hasNext: false,
          showPageInput: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Pagination.prototype, "handlePageChange", null);
      return Pagination;
  })();
  exports.default = Pagination;
  let PaginationRenderer = /** @class */ (() => {
      let PaginationRenderer = class PaginationRenderer extends Pagination {
      };
      PaginationRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)(?:pagination|pager)$/,
              name: 'pagination'
          })
      ], PaginationRenderer);
      return PaginationRenderer;
  })();
  exports.PaginationRenderer = PaginationRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGFnaW5hdGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvUGFnaW5hdGlvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFDbkQsNENBQXlDO0FBQ3pDLCtDQUF5QztBQXdDekM7O0lBQUEsTUFBcUIsVUFBVyxTQUFRLGVBQUssQ0FBQyxTQUc3QztRQUhEOztZQWFFLFVBQUssR0FBRztnQkFDTixPQUFPLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRTthQUM3QyxDQUFDO1FBbU9KLENBQUM7UUFqT0MseUJBQXlCLENBQUMsU0FBMEI7WUFDbEQsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsS0FBSyxTQUFTLENBQUMsVUFBVSxFQUFFO2dCQUNsRCxJQUFJLENBQUMsUUFBUSxDQUFDO29CQUNaLE9BQU8sRUFBRSxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUU7aUJBQzVDLENBQUMsQ0FBQzthQUNKO1FBQ0gsQ0FBQztRQUVELFlBQVk7WUFDVixNQUFNLEVBQUMsVUFBVSxFQUFFLE9BQU8sRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLEVBQUUsRUFBQyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFdkUsT0FBTyxDQUNMLHNDQUFJLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLGdCQUFnQixDQUFDO2dCQUMvQyxzQ0FDRSxTQUFTLEVBQUUsRUFBRSxDQUFDO3dCQUNaLGFBQWEsRUFBRSxVQUFVLEdBQUcsQ0FBQztxQkFDOUIsQ0FBQyxFQUNGLE9BQU8sRUFDTCxVQUFVLEdBQUcsQ0FBQzt3QkFDWixDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsY0FBYyxFQUFFO3dC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

});
