amis.define('src/components/Modal.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Modal
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Modal = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Transition_1 = tslib_1.__importStar(require("node_modules/react-transition-group/Transition"));
  const react_overlays_1 = require("node_modules/react-overlays/lib/index");
  const ModalManager_1 = require("src/components/ModalManager.ts");
  const theme_1 = require("src/theme.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const locale_1 = require("src/locale.tsx");
  const fadeStyles = {
      [Transition_1.ENTERING]: 'in',
      [Transition_1.ENTERED]: 'in',
      [Transition_1.EXITING]: 'out'
  };
  let Modal = /** @class */ (() => {
      class Modal extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.handleEnter = () => {
                  document.body.classList.add(`is-modalOpened`);
                  if (document.body.scrollHeight > window.innerHeight) {
                      document.body.classList.add(`has-scrollbar`);
                  }
              };
              this.handleEntered = () => {
                  const onEntered = this.props.onEntered;
                  onEntered && onEntered();
              };
              this.handleExited = () => {
                  const onExited = this.props.onExited;
                  onExited && onExited();
                  setTimeout(() => {
                      if (!document.querySelector('.amis-dialog-widget')) {
                          document.body.classList.remove(`is-modalOpened`);
                          document.body.classList.remove(`has-scrollbar`);
                      }
                  }, 200);
              };
              this.modalRef = (ref) => {
                  const { classPrefix: ns } = this.props;
                  if (ref) {
                      ModalManager_1.addModal(this);
                      ref.classList.add(`${ns}Modal--${ModalManager_1.current()}th`);
                  }
                  else {
                      ModalManager_1.removeModal();
                  }
              };
          }
          componentDidMount() {
              if (this.props.show) {
                  this.handleEnter();
                  this.handleEntered();
              }
          }
          componentWillUnmount() {
              if (this.props.show) {
                  this.handleExited();
              }
          }
          render() {
              const { className, contentClassName, children, container, show, size, overlay, classnames: cx } = this.props;
              return (react_1.default.createElement(Transition_1.default, { mountOnEnter: true, unmountOnExit: true, in: show, timeout: 500, onEnter: this.handleEnter, onExited: this.handleExited, onEntered: this.handleEntered }, (status) => (react_1.default.createElement(react_overlays_1.Portal, { container: container },
                  react_1.default.createElement("div", { ref: this.modalRef, role: "dialog", className: cx(`amis-dialog-widget Modal`, {
                          [`Modal--${size}`]: size
                      }, className) },
                      overlay ? (react_1.default.createElement("div", { className: cx(`Modal-overlay`, fadeStyles[status]) })) : null,
                      react_1.default.createElement("div", { className: cx(`Modal-content`, contentClassName, fadeStyles[status]) }, children))))));
          }
      }
      Modal.defaultProps = {
          container: document.body,
          size: '',
          overlay: true
      };
      Modal.Header = theme_1.themeable(locale_1.localeable((_a) => {
          var { classnames: cx, className, showCloseButton, onClose, children, classPrefix, translate: __ } = _a, rest = tslib_1.__rest(_a, ["classnames", "className", "showCloseButton", "onClose", "children", "classPrefix", "translate"]);
          return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx('Modal-header', className) }),
              showCloseButton !== false ? (react_1.default.createElement("a", { "data-tooltip": __('Dialog.close'), "data-position": "left", onClick: onClose, className: cx('Modal-close') },
                  react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" }))) : null,
              children));
      }));
      Modal.Title = theme_1.themeable((_a) => {
          var { classnames: cx, className, children, classPrefix } = _a, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
          return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx('Modal-title', className) }), children));
      });
      Modal.Body = theme_1.themeable((_a) => {
          var { classnames: cx, className, children, classPrefix } = _a, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
          return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx('Modal-body', className) }), children));
      });
      Modal.Footer = theme_1.themeable((_a) => {
          var { classnames: cx, className, children, classPrefix } = _a, rest = tslib_1.__rest(_a, ["classnames", "className", "children", "classPrefix"]);
          return (react_1.default.createElement("div", Object.assign({}, rest, { className: cx('Modal-footer', className) }), children));
      });
      return Modal;
  })();
  exports.Modal = Modal;
  const FinalModal = theme_1.themeable(locale_1.localeable(Modal));
  exports.default = FinalModal;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9Nb2RhbC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7O0dBSUc7Ozs7QUFFSCwwREFBMEI7QUFDMUIsd0ZBSTJDO0FBQzNDLG1EQUFzQztBQUN0QyxpREFBOEQ7QUFDOUQsb0NBQTZEO0FBQzdELG1DQUE2QjtBQUM3QixzQ0FBa0Q7QUFnQmxELE1BQU0sVUFBVSxHQUVaO0lBQ0YsQ0FBQyxxQkFBUSxDQUFDLEVBQUUsSUFBSTtJQUNoQixDQUFDLG9CQUFPLENBQUMsRUFBRSxJQUFJO0lBQ2YsQ0FBQyxvQkFBTyxDQUFDLEVBQUUsS0FBSztDQUNqQixDQUFDO0FBQ0Y7SUFBQSxNQUFhLEtBQU0sU0FBUSxlQUFLLENBQUMsU0FBaUM7UUFBbEU7O1lBMEdFLGdCQUFXLEdBQUcsR0FBRyxFQUFFO2dCQUNqQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLENBQUMsV0FBVyxFQUFFO29CQUNuRCxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7aUJBQzlDO1lBQ0gsQ0FBQyxDQUFDO1lBRUYsa0JBQWEsR0FBRyxHQUFHLEVBQUU7Z0JBQ25CLE1BQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDO2dCQUV2QyxTQUFTLElBQUksU0FBUyxFQUFFLENBQUM7WUFDM0IsQ0FBQyxDQUFDO1lBQ0YsaUJBQVksR0FBRyxHQUFHLEVBQUU7Z0JBQ2xCLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDO2dCQUNyQyxRQUFRLElBQUksUUFBUSxFQUFFLENBQUM7Z0JBQ3ZCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMscUJBQXFCLENBQUMsRUFBRTt3QkFDbEQsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7d0JBQ2pELFFBQVEsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDakQ7Z0JBQ0gsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBQ1YsQ0FBQyxDQUFDO1lBRUYsYUFBUSxHQUFHLENBQUMsR0FBUSxFQUFFLEVBQUU7Z0JBQ3RCLE1BQU0sRUFBQyxXQUFXLEVBQUUsRUFBRSxFQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztnQkFDckMsSUFBSSxHQUFHLEVBQUU7b0JBQ1AsdUJBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDZCxHQUFtQixDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLFVBQVUsc0JBQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztpQkFDbEU7cUJBQU07b0JBQ0wsMEJBQVcsRUFBRSxDQUFDO2lCQUNmO1lBQ0gsQ0FBQyxDQUFDO1FBdURKLENBQUM7UUFuR0MsaUJBQWlCO1lBQ2YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRTtnQkFDbkIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7YUFDdEI7UUFDSCxDQUFDO1FBRUQsb0JBQW9CO1lBQ2xCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7Z0JBQ25CLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQzthQUNyQjtRQUNILENBQUM7UUFtQ0QsTUFBTTtZQUNKLE1BQU0sRUFDSixTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLFFBQVEsRUFDUixTQUFTLEVBQ1QsSUFBSSxFQUNKLElBQUksRUFDSixPQUFPLEVBQ1AsVUFBVSxFQUFFLEVBQUUsRUFDZixHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7WUFFZixPQUFPLENBQ0wsOEJBQUMsb0JBQVUsSUFDVCxZQUFZLFFBQ1osYUFBYSxRQUNiLEVBQUUsRUFBRSxJQUFJLEVBQ1IsT0FBTyxFQUFFLEdBQUcsRUFDWixPQUFPLEVBQUUsSUFBSSxDQUFDLFdBQVcsRUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQzNCLFNBQVMsRUFBRSxJQUFJLENBQUMsYUFBYSxJQUU1QixDQUFDLE1BQWMsRUFBRSxFQUFFLENBQUMsQ0FDbkIsOEJBQUMsdUJBQU0sSUFBQyxTQUFTLEVBQUUsU0FBUztnQkFDMUIsdUNBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQ2xCLElBQUksRUFBQyxRQUFRLEVBQ2IsU0FBUyxFQUFFLEVBQUUsQ0FDWCwwQkFBMEIsRUFDMUI7d0JBQ0UsQ0FBQyxVQUFVLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSTtxQkFDekIsRUFDRCxTQUFTLENBQ1Y7b0JBRUEsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUNULHVDQUFLLFNBQVMsRUFBRSxFQUFFLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFJLENBQzVELENBQUMsQ0FBQyxDQUFDLElBQUk7b0JBQ1IsdUNBQ0UsU0FBUyxFQUFFLEVBQUUsQ0FDWCxlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FDbkIsSUFFQSxRQUFRLENBQ0wsQ0FDRixDQUNDLENBQ1YsQ0FDVSxDQUNkLENBQUM7UUFDSixDQUFDOztJQTlMTSxrQkFBWSxHQUFHO1FBQ3BCLFNBQVMsRUFBRSxRQUFRLENBQUMsSUFBSTtRQUN4QixJQUFJLEVBQUUsRUFBRTtRQUNSLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQztJQUVLLFlBQU0sR0FBRyxpQkFBUyxDQUN2QixtQkFBVSxDQUNSLENBQUMsRUFleUMsRUFBRSxFQUFFO1lBZjdDLEVBQ0MsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQ1QsZUFBZSxFQUNmLE9BQU8sRUFDUCxRQUFRLEVBQ1IsV0FBVyxFQUNYLFNBQVMsRUFBRSxFQUFFLE9BUTJCLEVBUHJDLElBQUksc0JBUlIsaUdBU0EsQ0FEUTtRQU9zQyxPQUFBLENBQzdDLHVEQUFTLElBQUksSUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLGNBQWMsRUFBRSxTQUFTLENBQUM7WUFDcEQsZUFBZSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FDM0IscURBQ2dCLEVBQUUsQ0FBQyxjQUFjLENBQUMsbUJBQ2xCLE1BQU0sRUFDcEIsT0FBTyxFQUFFLE9BQU8sRUFDaEIsU0FBUyxFQUFFLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBRTVCLDhCQUFDLFlBQUksSUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLFNBQVMsRUFBQyxNQUFNLEdBQUcsQ0FDcEMsQ0FDTCxDQUFDLENBQUMsQ0FBQyxJQUFJO1lBQ1AsUUFBUSxDQUNMLENBQ1AsQ0FBQTtLQUFBLENBQ0YsQ0FDRixDQUFDO0lBRUssV0FBSyxHQUFHLGlCQUFTLENBQ3RCLENBQUMsRUFTdUMsRUFBRSxFQUFFO1lBVDNDLEVBQ0MsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsT0FLMkIsRUFKbkMsSUFBSSxzQkFMUixzREFNQSxDQURRO1FBSW9DLE9BQUEsQ0FDM0MsdURBQVMsSUFBSSxJQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsYUFBYSxFQUFFLFNBQVMsQ0FBQyxLQUNuRCxRQUFRLENBQ0wsQ0FDUCxDQUFBO0tBQUEsQ0FDRixDQUFDO0lBRUssVUFBSSxHQUFHLGlCQUFTLENBQ3JCLENBQUMsRUFTdUMsRUFBRSxFQUFFO1lBVDNDLEVBQ0MsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsT0FLMkIsRUFKbkMsSUFBSSxzQkFMUixzREFNQSxDQURRO1FBSW9DLE9BQUEsQ0FDM0MsdURBQVMsSUFBSSxJQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsWUFBWSxFQUFFLFNBQVMsQ0FBQyxLQUNsRCxRQUFRLENBQ0wsQ0FDUCxDQUFBO0tBQUEsQ0FDRixDQUFDO0lBRUssWUFBTSxHQUFHLGlCQUFTLENBQ3ZCLENBQUMsRUFTdUMsRUFBRSxFQUFFO1lBVDNDLEVBQ0MsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFdBQVcsT0FLMkIsRUFKbkMsSUFBSSxzQkFMUixzREFNQSxDQURRO1FBSW9DLE9BQUEsQ0FDM0MsdURBQVMsSUFBSSxJQUFFLFNBQVMsRUFBRSxFQUFFLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxLQUNwRCxRQUFRLENBQ0wsQ0FDUCxDQUFBO0tBQUEsQ0FDRixDQUFDO0lBcUdKLFlBQUM7S0FBQTtBQWhNWSxzQkFBSztBQWtNbEIsTUFBTSxVQUFVLEdBQUcsaUJBQVMsQ0FBQyxtQkFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7QUFFaEQsa0JBQWUsVUFLZCxDQUFDIn0=

});
