amis.define('src/components/ModalManager.ts', function(require, exports, module, define) {

  "use strict";
  /**
   * @file ModalManager
   * @description
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.removeModal = exports.addModal = exports.currentModal = exports.current = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const keycode_1 = tslib_1.__importDefault(require("node_modules/keycode/index"));
  let modals = [];
  function current() {
      return modals.length;
  }
  exports.current = current;
  function currentModal() {
      return modals[modals.length - 1];
  }
  exports.currentModal = currentModal;
  function addModal(modal) {
      modals.push(modal);
  }
  exports.addModal = addModal;
  function removeModal() {
      modals.pop();
  }
  exports.removeModal = removeModal;
  window.addEventListener('keydown', handleWindowKeyDown);
  function handleWindowKeyDown(e) {
      const code = keycode_1.default(e);
      if (code !== 'esc') {
          return;
      }
      let modal = currentModal();
      if (!modal) {
          return;
      }
      const { disabled, closeOnEsc } = modal.props;
      if (closeOnEsc && !disabled) {
          modal.props.onHide(e);
      }
  }
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTW9kYWxNYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBvbmVudHMvTW9kYWxNYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsOERBQThCO0FBUzlCLElBQUksTUFBTSxHQUEwQixFQUFFLENBQUM7QUFFdkMsU0FBZ0IsT0FBTztJQUNyQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7QUFDdkIsQ0FBQztBQUZELDBCQUVDO0FBRUQsU0FBZ0IsWUFBWTtJQUMxQixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDO0FBQ25DLENBQUM7QUFGRCxvQ0FFQztBQUVELFNBQWdCLFFBQVEsQ0FBQyxLQUFxQjtJQUM1QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3JCLENBQUM7QUFGRCw0QkFFQztBQUVELFNBQWdCLFdBQVc7SUFDekIsTUFBTSxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQ2YsQ0FBQztBQUZELGtDQUVDO0FBRUQsTUFBTSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0FBRXhELFNBQVMsbUJBQW1CLENBQUMsQ0FBUTtJQUNuQyxNQUFNLElBQUksR0FBRyxpQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3hCLElBQUksSUFBSSxLQUFLLEtBQUssRUFBRTtRQUNsQixPQUFPO0tBQ1I7SUFDRCxJQUFJLEtBQUssR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsS0FBSyxFQUFFO1FBQ1YsT0FBTztLQUNSO0lBQ0QsTUFBTSxFQUFDLFFBQVEsRUFBRSxVQUFVLEVBQUMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO0lBQzNDLElBQUksVUFBVSxJQUFJLENBQUMsUUFBUSxFQUFFO1FBQzNCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3ZCO0FBQ0gsQ0FBQyJ9

});
