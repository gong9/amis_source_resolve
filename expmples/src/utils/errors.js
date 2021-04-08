amis.define('src/utils/errors.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ServerError = void 0;
  class ServerError extends Error {
      constructor(msg, response) {
          super(msg);
          this.type = 'ServerError';
          this.response = response;
      }
  }
  exports.ServerError = ServerError;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL2Vycm9ycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxNQUFhLFdBQVksU0FBUSxLQUFLO0lBSXBDLFlBQVksR0FBVyxFQUFFLFFBQWlCO1FBQ3hDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUpiLFNBQUksR0FBRyxhQUFhLENBQUM7UUFLbkIsSUFBSSxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7SUFDM0IsQ0FBQztDQUNGO0FBUkQsa0NBUUMifQ==

});
