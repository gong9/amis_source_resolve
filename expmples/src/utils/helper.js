amis.define('src/utils/helper.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.findObjectsWithKey = exports.keyToPath = exports.SkipOperation = exports.loadScript = exports.mapObject = exports.chainEvents = exports.chainFunctions = exports.object2formData = exports.qsstringify = exports.hasFile = exports.sortArray = exports.bulkBindFunctions = exports.autobind = exports.pickEventsProps = exports.string2regExp = exports.getLevelFromClassName = exports.getWidthRate = exports.camel = exports.lcFirst = exports.ucFirst = exports.getTreeParent = exports.getTreeAncestors = exports.getTreeDepth = exports.spliceTree = exports.flattenTree = exports.someTree = exports.everyTree = exports.filterTree = exports.getTree = exports.findTreeIndex = exports.findTree = exports.eachTree = exports.mapTree = exports.uuidv4 = exports.uuid = exports.isEmpty = exports.omitControls = exports.until = exports.isBreakpoint = exports.isObject = exports.__uri = exports.padArr = exports.difference = exports.getScrollParent = exports.promisify = exports.makeHorizontalDeeper = exports.hasAbility = exports.isDisabled = exports.visibilityFilter = exports.isVisible = exports.hasVisibleExpression = exports.makeColumnClassBuild = exports.immutableExtends = exports.isArrayChildrenModified = exports.isObjectShallowModified = exports.rmUndefined = exports.anyChanged = exports.noop = exports.hasOwnProperty = exports.deleteVariable = exports.setVariable = exports.getVariable = exports.findIndex = exports.guid = exports.syncDataFromSuper = exports.extendObject = exports.injectPropsToObject = exports.cloneObject = exports.createObject = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  const isEqual_1 = tslib_1.__importDefault(require("node_modules/lodash/isEqual"));
  const uniq_1 = tslib_1.__importDefault(require("node_modules/lodash/uniq"));
  const tpl_1 = require("src/utils/tpl.ts");
  const qs_1 = tslib_1.__importDefault(require("node_modules/qs/lib/index"));
  const autobind_1 = require("src/utils/autobind.ts");
  // 方便取值的时候能够把上层的取到，但是获取的时候不会全部把所有的数据获取到。
  function createObject(superProps, props, properties) {
      if (superProps && Object.isFrozen(superProps)) {
          superProps = cloneObject(superProps);
      }
      const obj = superProps
          ? Object.create(superProps, Object.assign(Object.assign({}, properties), { __super: {
                  value: superProps,
                  writable: false,
                  enumerable: false
              } }))
          : Object.create(Object.prototype, properties);
      props &&
          isObject(props) &&
          Object.keys(props).forEach(key => (obj[key] = props[key]));
      return obj;
  }
  exports.createObject = createObject;
  function cloneObject(target, persistOwnProps = true) {
      const obj = target && target.__super
          ? Object.create(target.__super, {
              __super: {
                  value: target.__super,
                  writable: false,
                  enumerable: false
              }
          })
          : Object.create(Object.prototype);
      persistOwnProps &&
          target &&
          Object.keys(target).forEach(key => (obj[key] = target[key]));
      return obj;
  }
  exports.cloneObject = cloneObject;
  /**
   * 给目标对象添加其他属性，可读取但是不会被遍历。
   * @param target
   * @param props
   */
  function injectPropsToObject(target, props) {
      const sup = Object.create(target.__super || null);
      Object.keys(props).forEach(key => (sup[key] = props[key]));
      const result = Object.create(sup);
      Object.keys(target).forEach(key => (result[key] = target[key]));
      return result;
  }
  exports.injectPropsToObject = injectPropsToObject;
  function extendObject(target, src, persistOwnProps = true) {
      const obj = cloneObject(target, persistOwnProps);
      src && Object.keys(src).forEach(key => (obj[key] = src[key]));
      return obj;
  }
  exports.extendObject = extendObject;
  function syncDataFromSuper(data, superObject, prevSuperObject, store, force) {
      const obj = Object.assign({}, data);
      let keys = [];
      // 如果是 form store，则从父级同步 formItem 种东西。
      if (store && store.storeType === 'FormStore') {
          keys = uniq_1.default(store.items
              .map(item => `${item.name}`.replace(/\..*$/, ''))
              .concat(Object.keys(obj)));
      }
      else if (force) {
          keys = Object.keys(obj);
      }
      if (superObject || prevSuperObject) {
          keys.forEach(key => {
              if (!key) {
                  return;
              }
              if (((superObject && typeof superObject[key] !== 'undefined') ||
                  (prevSuperObject && typeof prevSuperObject[key] !== 'undefined')) &&
                  ((prevSuperObject && !superObject) ||
                      (!prevSuperObject && superObject) ||
                      prevSuperObject[key] !== superObject[key])) {
                  obj[key] = superObject[key];
              }
          });
      }
      return obj;
  }
  exports.syncDataFromSuper = syncDataFromSuper;
  /**
   * 生成 8 位随机数字。
   *
   * @return {string} 8位随机数字
   */
  function guid() {
      function s4() {
          return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
      }
      return s4() + s4() + s4();
  }
  exports.guid = guid;
  function findIndex(arr, detect) {
      for (let i = 0, len = arr.length; i < len; i++) {
          if (detect(arr[i], i)) {
              return i;
          }
      }
      return -1;
  }
  exports.findIndex = findIndex;
  function getVariable(data, key, canAccessSuper = true) {
      if (!data || !key) {
          return undefined;
      }
      else if (canAccessSuper ? key in data : data.hasOwnProperty(key)) {
          return data[key];
      }
      return exports.keyToPath(key).reduce((obj, key) => obj &&
          typeof obj === 'object' &&
          (canAccessSuper ? key in obj : obj.hasOwnProperty(key))
          ? obj[key]
          : undefined, data);
  }
  exports.getVariable = getVariable;
  function setVariable(data, key, value) {
      data = data || {};
      if (key in data) {
          data[key] = value;
          return;
      }
      const parts = exports.keyToPath(key);
      const last = parts.pop();
      while (parts.length) {
          let key = parts.shift();
          if (isPlainObject_1.default(data[key])) {
              data = data[key] = Object.assign({}, data[key]);
          }
          else if (Array.isArray(data[key])) {
              data[key] = data[key].concat();
              data = data[key];
          }
          else if (data[key]) {
              // throw new Error(`目标路径不是纯对象，不能覆盖`);
              // 强行转成对象
              data[key] = {};
              data = data[key];
          }
          else {
              data[key] = {};
              data = data[key];
          }
      }
      data[last] = value;
  }
  exports.setVariable = setVariable;
  function deleteVariable(data, key) {
      if (!data) {
          return;
      }
      else if (data.hasOwnProperty(key)) {
          delete data[key];
          return;
      }
      const parts = exports.keyToPath(key);
      const last = parts.pop();
      while (parts.length) {
          let key = parts.shift();
          if (isPlainObject_1.default(data[key])) {
              data = data[key] = Object.assign({}, data[key]);
          }
          else if (data[key]) {
              throw new Error(`目标路径不是纯对象，不能修改`);
          }
          else {
              break;
          }
      }
      if (data && data.hasOwnProperty && data.hasOwnProperty(last)) {
          delete data[last];
      }
  }
  exports.deleteVariable = deleteVariable;
  function hasOwnProperty(data, key) {
      const parts = exports.keyToPath(key);
      while (parts.length) {
          let key = parts.shift();
          if (!isObject(data) || !data.hasOwnProperty(key)) {
              return false;
          }
          data = data[key];
      }
      return true;
  }
  exports.hasOwnProperty = hasOwnProperty;
  function noop() { }
  exports.noop = noop;
  function anyChanged(attrs, from, to, strictMode = true) {
      return (typeof attrs === 'string'
          ? attrs.split(/\s*,\s*/)
          : attrs).some(key => (strictMode ? from[key] !== to[key] : from[key] != to[key]));
  }
  exports.anyChanged = anyChanged;
  function rmUndefined(obj) {
      const newObj = {};
      if (typeof obj !== 'object') {
          return obj;
      }
      const keys = Object.keys(obj);
      keys.forEach(key => {
          if (obj[key] !== undefined) {
              newObj[key] = obj[key];
          }
      });
      return newObj;
  }
  exports.rmUndefined = rmUndefined;
  function isObjectShallowModified(prev, next, strictMode = true, ignoreUndefined = false) {
      if (Array.isArray(prev) && Array.isArray(next)) {
          return prev.length !== next.length
              ? true
              : prev.some((prev, index) => isObjectShallowModified(prev, next[index], strictMode, ignoreUndefined));
      }
      else if (null == prev ||
          null == next ||
          !isObject(prev) ||
          !isObject(next)) {
          return strictMode ? prev !== next : prev != next;
      }
      if (ignoreUndefined) {
          prev = rmUndefined(prev);
          next = rmUndefined(next);
      }
      const keys = Object.keys(prev);
      const nextKeys = Object.keys(next);
      if (keys.length !== nextKeys.length ||
          keys.sort().join(',') !== nextKeys.sort().join(',')) {
          return true;
      }
      for (let i = keys.length - 1; i >= 0; i--) {
          let key = keys[i];
          if (strictMode
              ? next[key] !== prev[key]
              : isObjectShallowModified(next[key], prev[key], false, ignoreUndefined)) {
              return true;
          }
      }
      return false;
  }
  exports.isObjectShallowModified = isObjectShallowModified;
  function isArrayChildrenModified(prev, next, strictMode = true) {
      if (!Array.isArray(prev) || !Array.isArray(next)) {
          return strictMode ? prev !== next : prev != next;
      }
      if (prev.length !== next.length) {
          return true;
      }
      for (let i = prev.length - 1; i >= 0; i--) {
          if (strictMode ? prev[i] !== next[i] : prev[i] != next[i]) {
              return true;
          }
      }
      return false;
  }
  exports.isArrayChildrenModified = isArrayChildrenModified;
  function immutableExtends(to, from, deep = false) {
      // 不是对象，不可以merge
      if (!isObject(to) || !isObject(from)) {
          return to;
      }
      let ret = to;
      Object.keys(from).forEach(key => {
          const origin = to[key];
          const value = from[key];
          // todo 支持深度merge
          if (origin !== value) {
              // 一旦有修改，就创建个新对象。
              ret = ret !== to ? ret : Object.assign({}, to);
              ret[key] = value;
          }
      });
      return ret;
  }
  exports.immutableExtends = immutableExtends;
  // 即将抛弃
  function makeColumnClassBuild(steps, classNameTpl = 'col-sm-$value') {
      let count = 12;
      let step = Math.floor(count / steps);
      return function (schema) {
          if (schema.columnClassName &&
              /\bcol-(?:xs|sm|md|lg)-(\d+)\b/.test(schema.columnClassName)) {
              const flex = parseInt(RegExp.$1, 10);
              count -= flex;
              steps--;
              step = Math.floor(count / steps);
              return schema.columnClassName;
          }
          else if (schema.columnClassName) {
              count -= step;
              steps--;
              return schema.columnClassName;
          }
          count -= step;
          steps--;
          return classNameTpl.replace('$value', '' + step);
      };
  }
  exports.makeColumnClassBuild = makeColumnClassBuild;
  function hasVisibleExpression(schema) {
      return (schema === null || schema === void 0 ? void 0 : schema.visibleOn) || (schema === null || schema === void 0 ? void 0 : schema.hiddenOn);
  }
  exports.hasVisibleExpression = hasVisibleExpression;
  function isVisible(schema, data) {
      return !(schema.hidden ||
          schema.visible === false ||
          (schema.hiddenOn && tpl_1.evalExpression(schema.hiddenOn, data) === true) ||
          (schema.visibleOn && tpl_1.evalExpression(schema.visibleOn, data) === false));
  }
  exports.isVisible = isVisible;
  /**
   * 过滤掉被隐藏的数组元素
   */
  function visibilityFilter(items, data) {
      return items.filter((item) => {
          return isVisible(item, data);
      });
  }
  exports.visibilityFilter = visibilityFilter;
  function isDisabled(schema, data) {
      return (schema.disabled ||
          (schema.disabledOn && tpl_1.evalExpression(schema.disabledOn, data)));
  }
  exports.isDisabled = isDisabled;
  function hasAbility(schema, ability, data, defaultValue = true) {
      return schema.hasOwnProperty(ability)
          ? schema[ability]
          : schema.hasOwnProperty(`${ability}On`)
              ? tpl_1.evalExpression(schema[`${ability}On`], data || schema)
              : defaultValue;
  }
  exports.hasAbility = hasAbility;
  function makeHorizontalDeeper(horizontal, count) {
      if (count > 1 && /\bcol-(xs|sm|md|lg)-(\d+)\b/.test(horizontal.left)) {
          const flex = parseInt(RegExp.$2, 10) * count;
          return {
              leftFixed: horizontal.leftFixed,
              left: flex,
              right: 12 - flex,
              offset: flex
          };
      }
      else if (count > 1 && typeof horizontal.left === 'number') {
          const flex = horizontal.left * count;
          return {
              leftFixed: horizontal.leftFixed,
              left: flex,
              right: 12 - flex,
              offset: flex
          };
      }
      return horizontal;
  }
  exports.makeHorizontalDeeper = makeHorizontalDeeper;
  function promisify(fn) {
      let promisified = function () {
          try {
              const ret = fn.apply(null, arguments);
              if (ret && ret.then) {
                  return ret;
              }
              else if (typeof ret === 'function') {
                  // thunk support
                  return new Promise((resolve, reject) => ret((error, value) => error ? reject(error) : resolve(value)));
              }
              return Promise.resolve(ret);
          }
          catch (e) {
              Promise.reject(e);
          }
      };
      promisified.raw = fn;
      return promisified;
  }
  exports.promisify = promisify;
  function getScrollParent(node) {
      if (node == null) {
          return null;
      }
      const style = getComputedStyle(node);
      if (!style) {
          return null;
      }
      const text = style.getPropertyValue('overflow') +
          style.getPropertyValue('overflow-x') +
          style.getPropertyValue('overflow-y');
      if (/auto|scroll/.test(text) || node.nodeName === 'BODY') {
          return node;
      }
      return getScrollParent(node.parentNode);
  }
  exports.getScrollParent = getScrollParent;
  /**
   * Deep diff between two object, using lodash
   * @param  {Object} object Object compared
   * @param  {Object} base   Object to compare with
   * @return {Object}        Return a new object who represent the diff
   */
  function difference(object, base, keepProps) {
      function changes(object, base) {
          if (isObject(object) && isObject(base)) {
              const keys = uniq_1.default(Object.keys(object).concat(Object.keys(base)));
              let result = {};
              keys.forEach(key => {
                  const a = object[key];
                  const b = base[key];
                  if (keepProps && ~keepProps.indexOf(key)) {
                      result[key] = a;
                  }
                  if (isEqual_1.default(a, b)) {
                      return;
                  }
                  if (!object.hasOwnProperty(key)) {
                      result[key] = undefined;
                  }
                  else if (Array.isArray(a) && Array.isArray(b)) {
                      result[key] = a;
                  }
                  else {
                      result[key] = changes(a, b);
                  }
              });
              return result;
          }
          else {
              return object;
          }
      }
      return changes(object, base);
  }
  exports.difference = difference;
  exports.padArr = (arr, size = 4) => {
      const ret = [];
      const pool = arr.concat();
      let from = 0;
      while (pool.length) {
          let host = ret[from] || (ret[from] = []);
          if (host.length >= size) {
              from += 1;
              continue;
          }
          host.push(pool.shift());
      }
      return ret;
  };
  function __uri(id) {
      return id;
  }
  exports.__uri = __uri;
  function isObject(obj) {
      const typename = typeof obj;
      return (obj &&
          typename !== 'string' &&
          typename !== 'number' &&
          typename !== 'boolean' &&
          typename !== 'function' &&
          !Array.isArray(obj));
  }
  exports.isObject = isObject;
  // xs < 768px
  // sm >= 768px
  // md >= 992px
  // lg >= 1200px
  function isBreakpoint(str) {
      if (typeof str !== 'string') {
          return !!str;
      }
      const breaks = str.split(/\s*,\s*|\s+/);
      if (window.matchMedia) {
          return breaks.some(item => item === '*' ||
              (item === 'xs' &&
                  matchMedia(`screen and (max-width: 767px)`).matches) ||
              (item === 'sm' &&
                  matchMedia(`screen and (min-width: 768px) and (max-width: 991px)`)
                      .matches) ||
              (item === 'md' &&
                  matchMedia(`screen and (min-width: 992px) and (max-width: 1199px)`)
                      .matches) ||
              (item === 'lg' && matchMedia(`screen and (min-width: 1200px)`).matches));
      }
      else {
          const width = window.innerWidth;
          return breaks.some(item => item === '*' ||
              (item === 'xs' && width < 768) ||
              (item === 'sm' && width >= 768 && width < 992) ||
              (item === 'md' && width >= 992 && width < 1200) ||
              (item === 'lg' && width >= 1200));
      }
  }
  exports.isBreakpoint = isBreakpoint;
  function until(fn, when, getCanceler, interval = 5000) {
      let timer;
      let stoped = false;
      return new Promise((resolve, reject) => {
          let cancel = () => {
              clearTimeout(timer);
              stoped = true;
          };
          let check = async () => {
              try {
                  const ret = await fn();
                  if (stoped) {
                      return;
                  }
                  else if (when(ret)) {
                      stoped = true;
                      resolve(ret);
                  }
                  else {
                      timer = setTimeout(check, interval);
                  }
              }
              catch (e) {
                  reject(e);
              }
          };
          check();
          getCanceler && getCanceler(cancel);
      });
  }
  exports.until = until;
  function omitControls(controls, omitItems) {
      return controls.filter(control => !~omitItems.indexOf(control.name || control._name));
  }
  exports.omitControls = omitControls;
  function isEmpty(thing) {
      if (isObject(thing) && Object.keys(thing).length) {
          return false;
      }
      return true;
  }
  exports.isEmpty = isEmpty;
  /**
   * 基于时间戳的 uuid
   *
   * @returns uniqueId
   */
  exports.uuid = () => {
      return (+new Date()).toString(36);
  };
  // 参考 https://github.com/streamich/v4-uuid
  const str = () => ('00000000000000000' + (Math.random() * 0xffffffffffffffff).toString(16)).slice(-16);
  exports.uuidv4 = () => {
      const a = str();
      const b = str();
      return (a.slice(0, 8) +
          '-' +
          a.slice(8, 12) +
          '-4' +
          a.slice(13) +
          '-a' +
          b.slice(1, 4) +
          '-' +
          b.slice(4));
  };
  /**
   * 类似于 arr.map 方法，此方法主要针对类似下面示例的树形结构。
   * [
   *     {
   *         children: []
   *     },
   *     // 其他成员
   * ]
   *
   * @param {Tree} tree 树形数据
   * @param {Function} iterator 处理函数，返回的数据会被替换成新的。
   * @return {Tree} 返回处理过的 tree
   */
  function mapTree(tree, iterator, level = 1, depthFirst = false, paths = []) {
      return tree.map((item, index) => {
          if (depthFirst) {
              let children = item.children
                  ? mapTree(item.children, iterator, level + 1, depthFirst, paths.concat(item))
                  : undefined;
              children && (item = Object.assign(Object.assign({}, item), { children: children }));
              item = iterator(item, index, level, paths) || Object.assign({}, item);
              return item;
          }
          item = iterator(item, index, level, paths) || Object.assign({}, item);
          if (item.children && item.children.splice) {
              item.children = mapTree(item.children, iterator, level + 1, depthFirst, paths.concat(item));
          }
          return item;
      });
  }
  exports.mapTree = mapTree;
  /**
   * 遍历树
   * @param tree
   * @param iterator
   */
  function eachTree(tree, iterator, level = 1) {
      tree.map((item, index) => {
          iterator(item, index, level);
          if (item.children && item.children.splice) {
              eachTree(item.children, iterator, level + 1);
          }
      });
  }
  exports.eachTree = eachTree;
  /**
   * 在树中查找节点。
   * @param tree
   * @param iterator
   */
  function findTree(tree, iterator) {
      let result = null;
      everyTree(tree, (item, key, level, paths) => {
          if (iterator(item, key, level, paths)) {
              result = item;
              return false;
          }
          return true;
      });
      return result;
  }
  exports.findTree = findTree;
  /**
   * 在树中查找节点, 返回下标数组。
   * @param tree
   * @param iterator
   */
  function findTreeIndex(tree, iterator) {
      let idx = [];
      findTree(tree, (item, index, level, paths) => {
          if (iterator(item, index, level, paths)) {
              idx = [index];
              paths = paths.concat();
              paths.unshift({
                  children: tree
              });
              for (let i = paths.length - 1; i > 0; i--) {
                  const prev = paths[i - 1];
                  const current = paths[i];
                  idx.unshift(prev.children.indexOf(current));
              }
              return true;
          }
          return false;
      });
      return idx.length ? idx : undefined;
  }
  exports.findTreeIndex = findTreeIndex;
  function getTree(tree, idx) {
      const indexes = Array.isArray(idx) ? idx.concat() : [idx];
      const lastIndex = indexes.pop();
      let list = tree;
      for (let i = 0, len = indexes.length; i < len; i++) {
          const index = indexes[i];
          if (!list[index]) {
              list = null;
              break;
          }
          list = list[index].children;
      }
      return list ? list[lastIndex] : undefined;
  }
  exports.getTree = getTree;
  /**
   * 过滤树节点
   *
   * @param tree
   * @param iterator
   */
  function filterTree(tree, iterator, level = 1, depthFirst = false) {
      if (depthFirst) {
          return tree
              .map(item => {
              let children = item.children
                  ? filterTree(item.children, iterator, level + 1, depthFirst)
                  : undefined;
              children && (item = Object.assign(Object.assign({}, item), { children: children }));
              return item;
          })
              .filter((item, index) => iterator(item, index, level));
      }
      return tree
          .filter((item, index) => iterator(item, index, level))
          .map(item => {
          if (item.children && item.children.splice) {
              item = Object.assign(Object.assign({}, item), { children: filterTree(item.children, iterator, level + 1, depthFirst) });
          }
          return item;
      });
  }
  exports.filterTree = filterTree;
  /**
   * 判断树中每个节点是否满足某个条件。
   * @param tree
   * @param iterator
   */
  function everyTree(tree, iterator, level = 1, paths = [], indexes = []) {
      return tree.every((item, index) => {
          const value = iterator(item, index, level, paths, indexes);
          if (value && item.children && item.children.splice) {
              return everyTree(item.children, iterator, level + 1, paths.concat(item), indexes.concat(index));
          }
          return value;
      });
  }
  exports.everyTree = everyTree;
  /**
   * 判断树中是否有某些节点满足某个条件。
   * @param tree
   * @param iterator
   */
  function someTree(tree, iterator) {
      let result = false;
      everyTree(tree, (item, key, level, paths) => {
          if (iterator(item, key, level, paths)) {
              result = true;
              return false;
          }
          return true;
      });
      return result;
  }
  exports.someTree = someTree;
  function flattenTree(tree, mapper) {
      let flattened = [];
      eachTree(tree, (item, index) => flattened.push(mapper ? mapper(item, index) : item));
      return flattened;
  }
  exports.flattenTree = flattenTree;
  /**
   * 操作树，遵循 imutable, 每次返回一个新的树。
   * 类似数组的 splice 不同的地方这个方法不修改原始数据，
   * 同时第二个参数不是下标，而是下标数组，分别代表每一层的下标。
   *
   * 至于如何获取下标数组，请查看 findTreeIndex
   *
   * @param tree
   * @param idx
   * @param deleteCount
   * @param ...items
   */
  function spliceTree(tree, idx, deleteCount = 0, ...items) {
      const list = tree.concat();
      if (typeof idx === 'number') {
          list.splice(idx, deleteCount, ...items);
      }
      else if (Array.isArray(idx) && idx.length) {
          idx = idx.concat();
          const lastIdx = idx.pop();
          let host = idx.reduce((list, idx) => {
              const child = Object.assign(Object.assign({}, list[idx]), { children: list[idx].children ? list[idx].children.concat() : [] });
              list[idx] = child;
              return child.children;
          }, list);
          host.splice(lastIdx, deleteCount, ...items);
      }
      return list;
  }
  exports.spliceTree = spliceTree;
  /**
   * 计算树的深度
   * @param tree
   */
  function getTreeDepth(tree) {
      return Math.max(...tree.map(item => {
          if (Array.isArray(item.children)) {
              return 1 + getTreeDepth(item.children);
          }
          return 1;
      }));
  }
  exports.getTreeDepth = getTreeDepth;
  /**
   * 从树中获取某个值的所有祖先
   * @param tree
   * @param value
   */
  function getTreeAncestors(tree, value, includeSelf = false) {
      let ancestors = null;
      findTree(tree, (item, index, level, paths) => {
          if (item === value) {
              ancestors = paths;
              if (includeSelf) {
                  ancestors.push(item);
              }
              return true;
          }
          return false;
      });
      return ancestors;
  }
  exports.getTreeAncestors = getTreeAncestors;
  /**
   * 从树中获取某个值的上级
   * @param tree
   * @param value
   */
  function getTreeParent(tree, value) {
      const ancestors = getTreeAncestors(tree, value);
      return (ancestors === null || ancestors === void 0 ? void 0 : ancestors.length) ? ancestors[ancestors.length - 1] : null;
  }
  exports.getTreeParent = getTreeParent;
  function ucFirst(str) {
      return str ? str.substring(0, 1).toUpperCase() + str.substring(1) : '';
  }
  exports.ucFirst = ucFirst;
  function lcFirst(str) {
      return str ? str.substring(0, 1).toLowerCase() + str.substring(1) : '';
  }
  exports.lcFirst = lcFirst;
  function camel(str) {
      return str
          ? str
              .split(/[\s_\-]/)
              .map((item, index) => (index === 0 ? lcFirst(item) : ucFirst(item)))
              .join('')
          : '';
  }
  exports.camel = camel;
  function getWidthRate(value, strictMode = false) {
      if (typeof value === 'string' && /\bcol\-\w+\-(\d+)\b/.test(value)) {
          return parseInt(RegExp.$1, 10);
      }
      return strictMode ? 0 : value || 0;
  }
  exports.getWidthRate = getWidthRate;
  function getLevelFromClassName(value, defaultValue = 'default') {
      if (/\b(?:btn|text)-(link|primary|secondary|info|success|warning|danger|light|dark)\b/.test(value)) {
          return RegExp.$1;
      }
      return defaultValue;
  }
  exports.getLevelFromClassName = getLevelFromClassName;
  function string2regExp(value, caseSensitive = false) {
      if (typeof value !== 'string') {
          throw new TypeError('Expected a string');
      }
      return new RegExp(value.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d'), !caseSensitive ? 'i' : '');
  }
  exports.string2regExp = string2regExp;
  function pickEventsProps(props) {
      const ret = {};
      props &&
          Object.keys(props).forEach(key => /^on/.test(key) && (ret[key] = props[key]));
      return ret;
  }
  exports.pickEventsProps = pickEventsProps;
  exports.autobind = autobind_1.autobindMethod;
  exports.bulkBindFunctions = function (context, funNames) {
      funNames.forEach(key => (context[key] = context[key].bind(context)));
  };
  function sortArray(items, field, dir) {
      return items.sort((a, b) => {
          let ret;
          const a1 = a[field];
          const b1 = b[field];
          if (typeof a1 === 'number' && typeof b1 === 'number') {
              ret = a1 < b1 ? -1 : a1 === b1 ? 0 : 1;
          }
          else {
              ret = String(a1).localeCompare(String(b1));
          }
          return ret * dir;
      });
  }
  exports.sortArray = sortArray;
  // 只判断一层, 如果层级很深，form-data 也不好表达。
  function hasFile(object) {
      return Object.keys(object).some(key => {
          let value = object[key];
          return (value instanceof File ||
              (Array.isArray(value) && value.length && value[0] instanceof File));
      });
  }
  exports.hasFile = hasFile;
  function qsstringify(data, options = {
      arrayFormat: 'indices',
      encodeValuesOnly: true
  }) {
      return qs_1.default.stringify(data, options);
  }
  exports.qsstringify = qsstringify;
  function object2formData(data, options = {
      arrayFormat: 'indices',
      encodeValuesOnly: true
  }, fd = new FormData()) {
      let fileObjects = [];
      let others = {};
      Object.keys(data).forEach(key => {
          const value = data[key];
          if (value instanceof File) {
              fileObjects.push([key, value]);
          }
          else if (Array.isArray(value) &&
              value.length &&
              value[0] instanceof File) {
              value.forEach(value => fileObjects.push([`${key}[]`, value]));
          }
          else {
              others[key] = value;
          }
      });
      // 因为 key 的格式太多了，偷个懒，用 qs 来处理吧。
      qsstringify(others, options)
          .split('&')
          .forEach(item => {
          let parts = item.split('=');
          // form-data/multipart 是不需要 encode 值的。
          parts[0] && fd.append(parts[0], decodeURIComponent(parts[1]));
      });
      // Note: File类型字段放在后面，可以支持第三方云存储鉴权
      fileObjects.forEach((fileObject) => fd.append(fileObject[0], fileObject[1], fileObject[1].name));
      return fd;
  }
  exports.object2formData = object2formData;
  function chainFunctions(...fns) {
      return (...args) => fns.reduce((ret, fn) => ret === false
          ? false
          : typeof fn == 'function'
              ? fn(...args)
              : undefined, undefined);
  }
  exports.chainFunctions = chainFunctions;
  function chainEvents(props, schema) {
      const ret = {};
      Object.keys(props).forEach(key => {
          if (key.substr(0, 2) === 'on' &&
              typeof props[key] === 'function' &&
              typeof schema[key] === 'function' &&
              schema[key] !== props[key]) {
              ret[key] = chainFunctions(schema[key], props[key]);
          }
          else {
              ret[key] = props[key];
          }
      });
      return ret;
  }
  exports.chainEvents = chainEvents;
  function mapObject(value, fn) {
      if (Array.isArray(value)) {
          return value.map(item => mapObject(item, fn));
      }
      if (isObject(value)) {
          let tmpValue = Object.assign({}, value);
          Object.keys(tmpValue).forEach(key => {
              tmpValue[key] = mapObject(tmpValue[key], fn);
          });
          return tmpValue;
      }
      return fn(value);
  }
  exports.mapObject = mapObject;
  function loadScript(src) {
      return new Promise((ok, fail) => {
          const script = document.createElement('script');
          script.onerror = reason => fail(reason);
          if (~src.indexOf('{{callback}}')) {
              const callbackFn = `loadscriptcallback_${exports.uuid()}`;
              window[callbackFn] = () => {
                  ok();
                  delete window[callbackFn];
              };
              src = src.replace('{{callback}}', callbackFn);
          }
          else {
              script.onload = () => ok();
          }
          script.src = src;
          document.head.appendChild(script);
      });
  }
  exports.loadScript = loadScript;
  class SkipOperation extends Error {
  }
  exports.SkipOperation = SkipOperation;
  /**
   * 将例如像 a.b.c 或 a[1].b 的字符串转换为路径数组
   *
   * @param string 要转换的字符串
   */
  exports.keyToPath = (string) => {
      const result = [];
      if (string.charCodeAt(0) === '.'.charCodeAt(0)) {
          result.push('');
      }
      string.replace(new RegExp('[^.[\\]]+|\\[(?:([^"\'][^[]*)|(["\'])((?:(?!\\2)[^\\\\]|\\\\.)*?)\\2)\\]|(?=(?:\\.|\\[\\])(?:\\.|\\[\\]|$))', 'g'), (match, expression, quote, subString) => {
          let key = match;
          if (quote) {
              key = subString.replace(/\\(\\)?/g, '$1');
          }
          else if (expression) {
              key = expression.trim();
          }
          result.push(key);
          return '';
      });
      return result;
  };
  /**
   * 检查对象是否有循环引用，来自 https://stackoverflow.com/a/34909127
   * @param obj
   */
  function isCyclic(obj) {
      const seenObjects = [];
      function detect(obj) {
          if (obj && typeof obj === 'object') {
              if (seenObjects.indexOf(obj) !== -1) {
                  return true;
              }
              seenObjects.push(obj);
              for (var key in obj) {
                  if (obj.hasOwnProperty(key) && detect(obj[key])) {
                      return true;
                  }
              }
          }
          return false;
      }
      return detect(obj);
  }
  function internalFindObjectsWithKey(obj, key) {
      let objects = [];
      for (const k in obj) {
          if (!obj.hasOwnProperty(k))
              continue;
          if (k === key) {
              objects.push(obj);
          }
          else if (typeof obj[k] === 'object') {
              objects = objects.concat(internalFindObjectsWithKey(obj[k], key));
          }
      }
      return objects;
  }
  /**
   * 深度查找具有某个 key 名字段的对象，实际实现是 internalFindObjectsWithKey，这里包一层是为了做循环引用检测
   * @param obj
   * @param key
   */
  function findObjectsWithKey(obj, key) {
      // 避免循环引用导致死循环
      if (isCyclic(obj)) {
          return [];
      }
      return internalFindObjectsWithKey(obj, key);
  }
  exports.findObjectsWithKey = findObjectsWithKey;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3V0aWxzL2hlbHBlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsaUZBQWlEO0FBQ2pELHFFQUFxQztBQUNyQywrREFBK0I7QUFFL0IsK0JBQXFDO0FBQ3JDLG9EQUFvQjtBQUdwQix5Q0FBMEM7QUFFMUMsd0NBQXdDO0FBQ3hDLFNBQWdCLFlBQVksQ0FDMUIsVUFBc0MsRUFDdEMsS0FBaUMsRUFDakMsVUFBZ0I7SUFFaEIsSUFBSSxVQUFVLElBQUksTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsRUFBRTtRQUM3QyxVQUFVLEdBQUcsV0FBVyxDQUFDLFVBQVUsQ0FBQyxDQUFDO0tBQ3RDO0lBRUQsTUFBTSxHQUFHLEdBQUcsVUFBVTtRQUNwQixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxVQUFVLGtDQUNuQixVQUFVLEtBQ2IsT0FBTyxFQUFFO2dCQUNQLEtBQUssRUFBRSxVQUFVO2dCQUNqQixRQUFRLEVBQUUsS0FBSztnQkFDZixVQUFVLEVBQUUsS0FBSzthQUNsQixJQUNEO1FBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUVoRCxLQUFLO1FBQ0gsUUFBUSxDQUFDLEtBQUssQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU3RCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUF6QkQsb0NBeUJDO0FBRUQsU0FBZ0IsV0FBVyxDQUFDLE1BQVcsRUFBRSxrQkFBMkIsSUFBSTtJQUN0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

});
