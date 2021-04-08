amis.define('src/utils/autobind.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.autobindMethod = exports.bind = void 0;
  const { defineProperty, getPrototypeOf } = Object;
  function bind(fn, context) {
      if (fn.bind) {
          return fn.bind(context);
      }
      else {
          return function __autobind__() {
              return fn.apply(context, arguments);
          };
      }
  }
  exports.bind = bind;
  let mapStore;
  function getBoundSuper(obj, fn) {
      if (typeof WeakMap === 'undefined') {
          throw new Error(`Using @autobind on ${fn.name}() requires WeakMap support due to its use of super.${fn.name}()
          See https://github.com/jayphelps/core-decorators.js/issues/20`);
      }
      if (!mapStore) {
          mapStore = new WeakMap();
      }
      if (mapStore.has(obj) === false) {
          mapStore.set(obj, new WeakMap());
      }
      const superStore = mapStore.get(obj);
      if (superStore.has(fn) === false) {
          superStore.set(fn, bind(fn, obj));
      }
      return superStore.get(fn);
  }
  function createDefaultSetter(key) {
      return function set(newValue) {
          Object.defineProperty(this, key, {
              configurable: true,
              writable: true,
              // IS enumerable when reassigned by the outside word
              enumerable: true,
              value: newValue
          });
          return newValue;
      };
  }
  function autobindMethod(target, key, { value: fn, configurable, enumerable }) {
      if (typeof fn !== 'function') {
          throw new SyntaxError(`@autobind can only be used on functions, not: ${fn}`);
      }
      const { constructor } = target;
      return {
          configurable,
          enumerable,
          get() {
              // Class.prototype.key lookup
              // Someone accesses the property directly on the prototype on which it is
              // actually defined on, i.e. Class.prototype.hasOwnProperty(key)
              if (this === target) {
                  return fn;
              }
              // Class.prototype.key lookup
              // Someone accesses the property directly on a prototype but it was found
              // up the chain, not defined directly on it
              // i.e. Class.prototype.hasOwnProperty(key) == false && key in Class.prototype
              if (this.constructor !== constructor &&
                  getPrototypeOf(this).constructor === constructor) {
                  return fn;
              }
              // Autobound method calling super.sameMethod() which is also autobound and so on.
              if (this.constructor !== constructor &&
                  key in this.constructor.prototype) {
                  return getBoundSuper(this, fn);
              }
              const boundFn = bind(fn, this);
              defineProperty(this, key, {
                  configurable: true,
                  writable: true,
                  // NOT enumerable when it's a bound method
                  enumerable: false,
                  value: boundFn
              });
              return boundFn;
          },
          set: createDefaultSetter(key)
      };
  }
  exports.autobindMethod = autobindMethod;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b2JpbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvdXRpbHMvYXV0b2JpbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxFQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUMsR0FBRyxNQUFNLENBQUM7QUFFaEQsU0FBZ0IsSUFBSSxDQUFDLEVBQVksRUFBRSxPQUFZO0lBQzdDLElBQUksRUFBRSxDQUFDLElBQUksRUFBRTtRQUNYLE9BQU8sRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN6QjtTQUFNO1FBQ0wsT0FBTyxTQUFTLFlBQVk7WUFDMUIsT0FBTyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxTQUFTLENBQUMsQ0FBQztRQUN0QyxDQUFDLENBQUM7S0FDSDtBQUNILENBQUM7QUFSRCxvQkFRQztBQUVELElBQUksUUFBOEIsQ0FBQztBQUNuQyxTQUFTLGFBQWEsQ0FBQyxHQUFXLEVBQUUsRUFBWTtJQUM5QyxJQUFJLE9BQU8sT0FBTyxLQUFLLFdBQVcsRUFBRTtRQUNsQyxNQUFNLElBQUksS0FBSyxDQUNiLHNCQUFzQixFQUFFLENBQUMsSUFBSSx1REFBdUQsRUFBRSxDQUFDLElBQUk7c0VBQzNCLENBQ2pFLENBQUM7S0FDSDtJQUVELElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDYixRQUFRLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUVELElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7UUFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEVBQUUsSUFBSSxPQUFPLEVBQUUsQ0FBQyxDQUFDO0tBQ2xDO0lBRUQsTUFBTSxVQUFVLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVyQyxJQUFJLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEtBQUssS0FBSyxFQUFFO1FBQ2hDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQztLQUNuQztJQUVELE9BQU8sVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUM1QixDQUFDO0FBRUQsU0FBUyxtQkFBbUIsQ0FBQyxHQUFXO0lBQ3RDLE9BQU8sU0FBUyxHQUFHLENBQVksUUFBYTtRQUMxQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDL0IsWUFBWSxFQUFFLElBQUk7WUFDbEIsUUFBUSxFQUFFLElBQUk7WUFDZCxvREFBb0Q7WUFDcEQsVUFBVSxFQUFFLElBQUk7WUFDaEIsS0FBSyxFQUFFLFFBQVE7U0FDaEIsQ0FBQyxDQUFDO1FBRUgsT0FBTyxRQUFRLENBQUM7SUFDbEIsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUVELFNBQWdCLGNBQWMsQ0FDNUIsTUFBYyxFQUNkLEdBQVcsRUFDWCxFQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBb0M7SUFFeEUsSUFBSSxPQUFPLEVBQUUsS0FBSyxVQUFVLEVBQUU7UUFDNUIsTUFBTSxJQUFJLFdBQVcsQ0FDbkIsaURBQWlELEVBQUUsRUFBRSxDQUN0RCxDQUFDO0tBQ0g7SUFFRCxNQUFNLEVBQUMsV0FBVyxFQUFDLEdBQUcsTUFBTSxDQUFDO0lBRTdCLE9BQU87UUFDTCxZQUFZO1FBQ1osVUFBVTtRQUVWLEdBQUc7WUFDRCw2QkFBNkI7WUFDN0IseUVBQXlFO1lBQ3pFLGdFQUFnRTtZQUNoRSxJQUFJLElBQUksS0FBSyxNQUFNLEVBQUU7Z0JBQ25CLE9BQU8sRUFBRSxDQUFDO2FBQ1g7WUFFRCw2QkFBNkI7WUFDN0IseUVBQXlFO1lBQ3pFLDJDQUEyQztZQUMzQyw4RUFBOEU7WUFDOUUsSUFDRSxJQUFJLENBQUMsV0FBVyxLQUFLLFdBQVc7Z0JBQ2hDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEtBQUssV0FBVyxFQUNoRDtnQkFDQSxPQUFPLEVBQUUsQ0FBQzthQUNYO1lBRUQsaUZBQWlGO1lBQ2pGLElBQ0UsSUFBSSxDQUFDLFdBQVcsS0FBSyxXQUFXO2dCQUNoQyxHQUFHLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQ2pDO2dCQUNBLE9BQU8sYUFBYSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQzthQUNoQztZQUVELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFL0IsY0FBYyxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7Z0JBQ3hCLFlBQVksRUFBRSxJQUFJO2dCQUNsQixRQUFRLEVBQUUsSUFBSTtnQkFDZCwwQ0FBMEM7Z0JBQzFDLFVBQVUsRUFBRSxLQUFLO2dCQUNqQixLQUFLLEVBQUUsT0FBTzthQUNmLENBQUMsQ0FBQztZQUVILE9BQU8sT0FBTyxDQUFDO1FBQ2pCLENBQUM7UUFDRCxHQUFHLEVBQUUsbUJBQW1CLENBQUMsR0FBRyxDQUFDO0tBQzlCLENBQUM7QUFDSixDQUFDO0FBMURELHdDQTBEQyJ9

});
