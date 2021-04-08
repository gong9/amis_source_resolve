amis.define('src/store/modal.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ModalStore = void 0;
  const service_1 = require("src/store/service.ts");
  const mobx_state_tree_1 = require("node_modules/mobx-state-tree/dist/mobx-state-tree");
  const helper_1 = require("src/utils/helper.ts");
  exports.ModalStore = service_1.ServiceStore.named('ModalStore')
      .props({
      form: mobx_state_tree_1.types.frozen(),
      entered: false,
      resizeCoord: 0,
      schema: mobx_state_tree_1.types.frozen()
  })
      .views(self => {
      return {
          get formData() {
              return helper_1.createObject(self.data, self.form);
          }
      };
  })
      .actions(self => {
      return {
          setEntered(value) {
              self.entered = value;
          },
          setFormData(obj) {
              self.form = obj;
          },
          setResizeCoord(value) {
              self.resizeCoord = value;
          },
          setSchema(schema) {
              if (schema && schema.then) {
                  schema.then((value) => mobx_state_tree_1.isAlive(self) && self.setSchema(value));
                  return;
              }
              self.schema = schema;
          }
      };
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvc3RvcmUvbW9kYWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdUNBQXVDO0FBQ3ZDLHFEQUFxRTtBQUNyRSw0Q0FBNkM7QUFFaEMsUUFBQSxVQUFVLEdBQUcsc0JBQVksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDO0tBQ3ZELEtBQUssQ0FBQztJQUNMLElBQUksRUFBRSx1QkFBSyxDQUFDLE1BQU0sRUFBRTtJQUNwQixPQUFPLEVBQUUsS0FBSztJQUNkLFdBQVcsRUFBRSxDQUFDO0lBQ2QsTUFBTSxFQUFFLHVCQUFLLENBQUMsTUFBTSxFQUFFO0NBQ3ZCLENBQUM7S0FDRCxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7SUFDWixPQUFPO1FBQ0wsSUFBSSxRQUFRO1lBQ1YsT0FBTyxxQkFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLENBQUM7S0FDRixDQUFDO0FBQ0osQ0FBQyxDQUFDO0tBQ0QsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO0lBQ2QsT0FBTztRQUNMLFVBQVUsQ0FBQyxLQUFjO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3ZCLENBQUM7UUFDRCxXQUFXLENBQUMsR0FBUTtZQUNsQixJQUFJLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztRQUNsQixDQUFDO1FBRUQsY0FBYyxDQUFDLEtBQWE7WUFDMUIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVELFNBQVMsQ0FBQyxNQUFXO1lBQ25CLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEVBQUU7Z0JBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQ1QsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLHlCQUFPLENBQUMsSUFBSSxDQUFDLElBQUssSUFBWSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FDaEUsQ0FBQztnQkFDRixPQUFPO2FBQ1I7WUFFRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUN2QixDQUFDO0tBQ0YsQ0FBQztBQUNKLENBQUMsQ0FBQyxDQUFDIn0=

});
