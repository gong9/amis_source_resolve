amis.define('src/components/Collapse.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Collapse
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Collapse = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const index_1 = tslib_1.__importDefault(require("node_modules/dom-helpers/style/index"));
  const theme_1 = require("src/theme.tsx");
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const helper_1 = require("src/utils/helper.ts");
  const collapseStyles = {
      [Transition_1.EXITED]: 'out',
      [Transition_1.EXITING]: 'out',
      [Transition_1.ENTERING]: 'in'
  };
  let Collapse = /** @class */ (() => {
      var _a, _b, _c, _d, _e;
      class Collapse extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.contentRef = (ref) => (this.contentDom = ref);
          }
          handleEnter(elem) {
              elem.style['height'] = '';
          }
          handleEntering(elem) {
              elem.style['height'] = `${elem['scrollHeight']}px`;
          }
          handleEntered(elem) {
              elem.style['height'] = '';
          }
          handleExit(elem) {
              let offsetHeight = elem['offsetHeight'];
              const height = offsetHeight +
                  parseInt(index_1.default(elem, 'marginTop'), 10) +
                  parseInt(index_1.default(elem, 'marginBottom'), 10);
              elem.style['height'] = `${height}px`;
              // trigger browser reflow
              elem.offsetHeight;
          }
          handleExiting(elem) {
              elem.style['height'] = '';
          }
          render() {
              const { show, children, classnames: cx, mountOnEnter, unmountOnExit } = this.props;
              return (react_1.default.createElement(Transition_1.default, { mountOnEnter: mountOnEnter, unmountOnExit: unmountOnExit, in: show, timeout: 300, onEnter: this.handleEnter, onEntering: this.handleEntering, onEntered: this.handleEntered, onExit: this.handleExit, onExiting: this.handleExiting }, (status) => {
                  if (status === Transition_1.ENTERING) {
                      this.contentDom.offsetWidth;
                  }
                  return react_1.default.cloneElement(children, Object.assign(Object.assign({}, children.props), { ref: this.contentRef, className: cx('Collapse-content', children.props.className, collapseStyles[status]) }));
              }));
          }
      }
      Collapse.defaultProps = {
          show: false,
          mountOnEnter: false,
          unmountOnExit: false
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Collapse.prototype, "handleEnter", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Collapse.prototype, "handleEntering", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Collapse.prototype, "handleEntered", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Collapse.prototype, "handleExit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof HTMLElement !== "undefined" && HTMLElement) === "function" ? _e : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], Collapse.prototype, "handleExiting", null);
      return Collapse;
  })();
  exports.Collapse = Collapse;
  exports.default = theme_1.themeable(Collapse);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29sbGFwc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Db2xsYXBzZS50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsNEVBQTBDO0FBQzFDLG9DQUFpRDtBQUNqRCx3RkFJMkM7QUFDM0MsNENBQXlDO0FBRXpDLE1BQU0sY0FBYyxHQUVoQjtJQUNGLENBQUMsbUJBQU0sQ0FBQyxFQUFFLEtBQUs7SUFDZixDQUFDLG9CQUFPLENBQUMsRUFBRSxLQUFLO0lBQ2hCLENBQUMscUJBQVEsQ0FBQyxFQUFFLElBQUk7Q0FDakIsQ0FBQztBQVdGOztJQUFBLE1BQWEsUUFBUyxTQUFRLGVBQUssQ0FBQyxTQUE2QjtRQUFqRTs7WUFXRSxlQUFVLEdBQUcsQ0FBQyxHQUFRLEVBQUUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsQ0FBQztRQXlFckQsQ0FBQztRQXRFQyxXQUFXLENBQUMsSUFBaUI7WUFDM0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUdELGNBQWMsQ0FBQyxJQUFpQjtZQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUM7UUFDckQsQ0FBQztRQUdELGFBQWEsQ0FBQyxJQUFpQjtZQUM3QixJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUM1QixDQUFDO1FBR0QsVUFBVSxDQUFDLElBQWlCO1lBQzFCLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4QyxNQUFNLE1BQU0sR0FDVixZQUFZO2dCQUNaLFFBQVEsQ0FBQyxlQUFHLENBQUMsSUFBSSxFQUFFLFdBQVcsQ0FBQyxFQUFFLEVBQUUsQ0FBQztnQkFDcEMsUUFBUSxDQUFDLGVBQUcsQ0FBQyxJQUFJLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDO1lBRXJDLHlCQUF5QjtZQUN6QixJQUFJLENBQUMsWUFBWSxDQUFDO1FBQ3BCLENBQUM7UUFHRCxhQUFhLENBQUMsSUFBaUI7WUFDN0IsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDNUIsQ0FBQztRQUVELE1BQU07WUFDSixNQUFNLEVBQ0osSUFBSSxFQUNKLFFBQVEsRUFDUixVQUFVLEVBQUUsRUFBRSxFQUNkLFlBQVksRUFDWixhQUFhLEVBQ2QsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsT0FBTyxDQUNMLDhCQUFDLG9CQUFVLElBQ1QsWUFBWSxFQUFFLFlBQVksRUFDMUIsYUFBYSxFQUFFLGFBQWEsRUFDNUIsRUFBRSxFQUFFLElBQUksRUFDUixPQUFPLEVBQUUsR0FBRyxFQUNaLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxFQUN6QixVQUFVLEVBQUUsSUFBSSxDQUFDLGNBQWMsRUFDL0IsU0FBUyxFQUFFLElBQUksQ0FBQyxhQUFhLEVBQzdCLE1BQU0sRUFBRSxJQUFJLENBQUMsVUFBVSxFQUN2QixTQUFTLEVBQUUsSUFBSSxDQUFDLGFBQWEsSUFFNUIsQ0FBQyxNQUFjLEVBQUUsRUFBRTtnQkFDbEIsSUFBSSxNQUFNLEtBQUsscUJBQVEsRUFBRTtvQkFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7aUJBQzdCO2dCQUNELE9BQU8sZUFBSyxDQUFDLFlBQVksQ0FBQyxRQUFlLGtDQUNuQyxRQUErQixDQUFDLEtBQUssS0FDekMsR0FBRyxFQUFFLElBQUksQ0FBQyxVQUFVLEVBQ3BCLFNBQVMsRUFBRSxFQUFFLENBQ1gsa0JBQWtCLEVBQ2pCLFFBQStCLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFDaEQsY0FBYyxDQUFDLE1BQU0sQ0FBQyxDQUN2QixJQUNELENBQUM7WUFDTCxDQUFDLENBQ1UsQ0FDZCxDQUFDO1FBQ0osQ0FBQzs7SUFsRk0scUJBQVksR0FHZjtRQUNGLElBQUksRUFBRSxLQUFLO1FBQ1gsWUFBWSxFQUFFLEtBQUs7UUFDbkIsYUFBYSxFQUFFLEtBQUs7S0FDckIsQ0FBQztJQU1GO1FBREMsaUJBQVE7O3FFQUNTLFdBQVcsb0JBQVgsV0FBVzs7K0NBRTVCO0lBR0Q7UUFEQyxpQkFBUTs7cUVBQ1ksV0FBVyxvQkFBWCxXQUFXOztrREFFL0I7SUFHRDtRQURDLGlCQUFROztxRUFDVyxXQUFXLG9CQUFYLFdBQVc7O2lEQUU5QjtJQUdEO1FBREMsaUJBQVE7O3FFQUNRLFdBQVcsb0JBQVgsV0FBVzs7OENBVTNCO0lBR0Q7UUFEQyxpQkFBUTs7cUVBQ1csV0FBVyxvQkFBWCxXQUFXOztpREFFOUI7SUF3Q0gsZUFBQztLQUFBO0FBcEZZLDRCQUFRO0FBc0ZyQixrQkFBZSxpQkFBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDIn0=

});
