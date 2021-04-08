amis.define('src/utils/SimpleMap.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.SimpleMap = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const find_1 = tslib_1.__importDefault(require("node_modules/lodash/find"));
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  class SimpleMap {
      constructor() {
          this.list = [];
      }
      has(key) {
          const resolved = find_1.default(this.list, item => item.key === key);
          return !!resolved;
      }
      set(key, value) {
          this.list.push({
              key,
              value
          });
      }
      get(key) {
          const resolved = find_1.default(this.list, item => item.key === key);
          return resolved ? resolved.value : null;
      }
      delete(key) {
          const idx = findIndex_1.default(this.list, item => item.key === key);
          ~idx && this.list.splice(idx, 1);
      }
      dispose() {
          this.list.splice(0, this.list.length);
      }
  }
  exports.SimpleMap = SimpleMap;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2ltcGxlTWFwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL1NpbXBsZU1hcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQStCO0FBQy9CLHlFQUF5QztBQUV6QyxNQUFhLFNBQVM7SUFBdEI7UUFDbUIsU0FBSSxHQUdoQixFQUFFLENBQUM7SUEyQlYsQ0FBQztJQXpCQyxHQUFHLENBQUMsR0FBTTtRQUNSLE1BQU0sUUFBUSxHQUFHLGNBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsQ0FBQyxRQUFRLENBQUM7SUFDcEIsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFNLEVBQUUsS0FBUTtRQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNiLEdBQUc7WUFDSCxLQUFLO1NBQ04sQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELEdBQUcsQ0FBQyxHQUFNO1FBQ1IsTUFBTSxRQUFRLEdBQUcsY0FBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQzNELE9BQU8sUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVELE1BQU0sQ0FBQyxHQUFNO1FBQ1gsTUFBTSxHQUFHLEdBQUcsbUJBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUMzRCxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVELE9BQU87UUFDTCxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7QUEvQkQsOEJBK0JDIn0=

});
