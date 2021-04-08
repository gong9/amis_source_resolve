amis.define('src/utils/tpl-builtin.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.register = exports.dataMapping = exports.tokenize = exports.resolveVariableAndFilter = exports.isPureVariable = exports.resolveVariable = exports.pickValues = exports.getFilters = exports.registerFilter = exports.filters = exports.parseDuration = exports.filterDate = exports.relativeValueRe = exports.formatDuration = exports.escapeHtml = exports.prettyBytes = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const moment_1 = tslib_1.__importDefault(require("node_modules/moment/moment"));
  const isPlainObject_1 = tslib_1.__importDefault(require("node_modules/lodash/isPlainObject"));
  const groupBy_1 = tslib_1.__importDefault(require("node_modules/lodash/groupBy"));
  const helper_1 = require("src/utils/helper.ts");
  const uniqBy_1 = tslib_1.__importDefault(require("node_modules/lodash/uniqBy"));
  const uniq_1 = tslib_1.__importDefault(require("node_modules/lodash/uniq"));
  const UNITS = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  exports.prettyBytes = (num) => {
      if (!Number.isFinite(num)) {
          throw new TypeError(`Expected a finite number, got ${typeof num}: ${num}`);
      }
      const neg = num < 0;
      if (neg) {
          num = -num;
      }
      if (num < 1) {
          return (neg ? '-' : '') + num + ' B';
      }
      const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), UNITS.length - 1);
      const numStr = Number((num / Math.pow(1000, exponent)).toPrecision(3));
      const unit = UNITS[exponent];
      return (neg ? '-' : '') + numStr + ' ' + unit;
  };
  const entityMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '/': '&#x2F;'
  };
  exports.escapeHtml = (str) => String(str).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
  });
  function formatDuration(value) {
      const unit = ['秒', '分', '时', '天', '月', '季', '年'];
      const steps = [1, 60, 3600, 86400, 2592000, 7776000, 31104000];
      let len = steps.length;
      const parts = [];
      while (len--) {
          if (steps[len] && value >= steps[len]) {
              parts.push(Math.floor(value / steps[len]) + unit[len]);
              value %= steps[len];
          }
          else if (len === 0 && value) {
              parts.push((value.toFixed ? value.toFixed(2) : '0') + unit[0]);
          }
      }
      return parts.join('');
  }
  exports.formatDuration = formatDuration;
  function makeSorter(key, method, order) {
      return function (a, b) {
          if (!a || !b) {
              return 0;
          }
          const va = exports.resolveVariable(key, a);
          const vb = exports.resolveVariable(key, b);
          let result = 0;
          if (method === 'numerical') {
              result = (parseFloat(va) || 0) - (parseFloat(vb) || 0);
          }
          else {
              result = String(va).localeCompare(String(vb));
          }
          return result * (order === 'desc' ? -1 : 1);
      };
  }
  const timeUnitMap = {
      year: 'Y',
      month: 'M',
      week: 'w',
      weekday: 'W',
      day: 'd',
      hour: 'h',
      minute: 'm',
      min: 'm',
      second: 's',
      millisecond: 'ms'
  };
  exports.relativeValueRe = /^(.+)?(\+|-)(\d+)(minute|min|hour|day|week|month|year|weekday|second|millisecond)s?$/i;
  exports.filterDate = (value, data = {}, format = 'X', utc = false) => {
      let m, mm = utc ? moment_1.default.utc : moment_1.default;
      if (typeof value === 'string') {
          value = value.trim();
      }
      value = exports.tokenize(value, data);
      if (value && typeof value === 'string' && (m = exports.relativeValueRe.exec(value))) {
          const date = new Date();
          const step = parseInt(m[3], 10);
          const from = m[1]
              ? exports.filterDate(m[1], data, format, utc)
              : mm(/(minute|min|hour|second)s?/.test(m[4])
                  ? [
                      date.getFullYear(),
                      date.getMonth(),
                      date.getDate(),
                      date.getHours(),
                      date.getMinutes(),
                      date.getSeconds()
                  ]
                  : [date.getFullYear(), date.getMonth(), date.getDate()]);
          return m[2] === '-'
              ? from.subtract(step, timeUnitMap[m[4]])
              : from.add(step, timeUnitMap[m[4]]);
          //   return from[m[2] === '-' ? 'subtract' : 'add'](step, mapping[m[4]] || m[4]);
      }
      else if (value === 'now') {
          return mm();
      }
      else if (value === 'today') {
          const date = new Date();
          return mm([date.getFullYear(), date.getMonth(), date.getDate()]);
      }
      else {
          return mm(value, format);
      }
  };
  function parseDuration(str) {
      const matches = /^((?:\-|\+)?(?:\d*\.)?\d+)(minute|min|hour|day|week|month|year|weekday|second|millisecond)s?$/.exec(str);
      if (matches) {
          const duration = moment_1.default.duration(parseFloat(matches[1]), matches[2]);
          if (moment_1.default.isDuration(duration)) {
              return duration;
          }
      }
      return;
  }
  exports.parseDuration = parseDuration;
  exports.filters = {
      html: (input) => exports.escapeHtml(input),
      json: (input, tabSize = 2) => tabSize
          ? JSON.stringify(input, null, parseInt(tabSize, 10))
          : JSON.stringify(input),
      toJson: input => {
          let ret;
          try {
              ret = JSON.parse(input);
          }
          catch (e) {
              ret = null;
          }
          return ret;
      },
      toInt: input => (typeof input === 'string' ? parseInt(input, 10) : input),
      toFloat: input => (typeof input === 'string' ? parseFloat(input) : input),
      raw: input => input,
      now: () => new Date(),
      toDate: (input, inputFormat = '') => {
          const data = moment_1.default(input, inputFormat);
          data.add();
          return data.isValid() ? data.toDate() : undefined;
      },
      dateModify: (input, modifier = 'add', amount = 0, unit = 'days') => {
          if (!(input instanceof Date)) {
              input = new Date();
          }
          if (modifier === 'endOf' || modifier === 'startOf') {
              return moment_1.default(input)[modifier === 'endOf' ? 'endOf' : 'startOf'](amount || 'day')
                  .toDate();
          }
          return moment_1.default(input)[modifier === 'add' ? 'add' : 'subtract'](parseInt(amount, 10) || 0, unit)
              .toDate();
      },
      date: (input, format = 'LLL', inputFormat = 'X') => moment_1.default(input, inputFormat).format(format),
      number: input => {
          let parts = String(input).split('.');
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
          return parts.join('.');
      },
      trim: input => (typeof input === 'string' ? input.trim() : input),
      percent: (input, decimals = 0) => {
          input = parseFloat(input) || 0;
          decimals = parseInt(decimals, 10) || 0;
          let whole = input * 100;
          let multiplier = Math.pow(10, decimals);
          return ((Math.round(whole * multiplier) / multiplier).toFixed(decimals) + '%');
      },
      duration: input => (input ? formatDuration(input) : input),
      bytes: input => (input ? exports.prettyBytes(parseFloat(input)) : input),
      round: (input, decimals = 2) => {
          var _a;
          if (isNaN(input)) {
              return 0;
          }
          decimals = (_a = parseInt(decimals, 10)) !== null && _a !== void 0 ? _a : 2;
          let multiplier = Math.pow(10, decimals);
          return (Math.round(input * multiplier) / multiplier).toFixed(decimals);
      },
      truncate: (input, length, end) => {
          if (typeof input !== 'string') {
              return input;
          }
          end = end || '...';
          if (length == null) {
              return input;
          }
          length = parseInt(length, 10) || 200;
          return input.substring(0, length) + (input.length > length ? end : '');
      },
      url_encode: input => encodeURIComponent(input),
      url_decode: input => decodeURIComponent(input),
      default: (input, defaultValue, strict = false) => { var _a; return (_a = (strict ? input : input ? input : undefined)) !== null && _a !== void 0 ? _a : (() => {
          try {
              if (defaultValue === 'undefined') {
                  return undefined;
              }
              return JSON.parse(defaultValue);
          }
          catch (e) {
              return defaultValue;
          }
      })(); },
      join: (input, glue) => (input && input.join ? input.join(glue) : input),
      split: (input, delimiter = ',') => typeof input === 'string' ? input.split(delimiter) : input,
      sortBy: (input, key, method = 'alpha', order) => Array.isArray(input) ? input.sort(makeSorter(key, method, order)) : input,
      unique: (input, key) => Array.isArray(input) ? (key ? uniqBy_1.default(input, key) : uniq_1.default(input)) : input,
      topAndOther: (input, len = 10, labelField = 'name', restLabel = '其他') => {
          if (Array.isArray(input) && len) {
              const grouped = groupBy_1.default(input, (item) => {
                  const index = input.indexOf(item) + 1;
                  return index >= len ? len : index;
              });
              return Object.keys(grouped).map((key, index) => {
                  const group = grouped[key];
                  const obj = group.reduce((obj, item) => {
                      Object.keys(item).forEach(key => {
                          if (!obj.hasOwnProperty(key) || key === 'labelField') {
                              obj[key] = item[key];
                          }
                          else if (typeof item[key] === 'number' &&
                              typeof obj[key] === 'number') {
                              obj[key] += item[key];
                          }
                          else if (typeof item[key] === 'string' &&
                              /^(?:\-|\.)\d/.test(item[key]) &&
                              typeof obj[key] === 'number') {
                              obj[key] += parseFloat(item[key]) || 0;
                          }
                          else if (typeof item[key] === 'string' &&
                              typeof obj[key] === 'string') {
                              obj[key] += `, ${item[key]}`;
                          }
                          else {
                              obj[key] = item[key];
                          }
                      });
                      return obj;
                  }, {});
                  if (index === len - 1) {
                      obj[labelField] = restLabel || '其他';
                  }
                  return obj;
              });
          }
          return input;
      },
      first: input => input && input[0],
      nth: (input, nth = 0) => input && input[nth],
      last: input => input && (input.length ? input[input.length - 1] : null),
      minus: (input, step = 1) => (parseInt(input, 10) || 0) - parseInt(step, 10),
      plus: (input, step = 1) => (parseInt(input, 10) || 0) + parseInt(step, 10),
      count: (input) => Array.isArray(input) || typeof input === 'string' ? input.length : 0,
      sum: (input, field) => Array.isArray(input)
          ? input.reduce((sum, item) => sum + (parseFloat(field ? pickValues(field, item) : item) || 0), 0)
          : input,
      abs: (input) => (typeof input === 'number' ? Math.abs(input) : input),
      pick: (input, path = '&') => Array.isArray(input) && !/^\d+$/.test(path)
          ? input.map((item, index) => pickValues(path, helper_1.createObject({ index }, item)))
          : pickValues(path, input),
      pick_if_exist: (input, path = '&') => Array.isArray(input)
          ? input.map(item => exports.resolveVariable(path, item) || item)
          : exports.resolveVariable(path, input) || input,
      str2date: function (input, inputFormat = 'X', outputFormat = 'X') {
          return input
              ? exports.filterDate(input, this, inputFormat).format(outputFormat)
              : '';
      },
      asArray: input => (Array.isArray(input) ? input : input ? [input] : input),
      concat(input, ...args) {
          return Array.isArray(input)
              ? input.concat(...args.map(arg => getStrOrVariable(arg, this)))
              : input;
      },
      filter: function (input, keys, expOrDirective, arg1) {
          if (!Array.isArray(input) || !keys || !expOrDirective) {
              return input;
          }
          let directive = expOrDirective;
          let fn = () => true;
          if (directive === 'isTrue') {
              fn = value => !!value;
          }
          else if (directive === 'isFalse') {
              fn = value => !value;
          }
          else if (directive === 'isExists') {
              fn = value => typeof value !== 'undefined';
          }
          else if (directive === 'equals' || directive === 'equal') {
              arg1 = arg1 ? getStrOrVariable(arg1, this) : '';
              fn = value => arg1 == value;
          }
          else if (directive === 'isIn') {
              let list = arg1 ? getStrOrVariable(arg1, this) : [];
              list = str2array(list);
              list = Array.isArray(list) ? list : list ? [list] : [];
              fn = value => (list.length ? !!~list.indexOf(value) : true);
          }
          else if (directive === 'notIn') {
              let list = arg1 ? getStrOrVariable(arg1, this) : [];
              list = str2array(list);
              list = Array.isArray(list) ? list : list ? [list] : [];
              fn = value => !~list.indexOf(value);
          }
          else {
              if (directive !== 'match') {
                  directive = 'match';
                  arg1 = expOrDirective;
              }
              arg1 = arg1 ? getStrOrVariable(arg1, this) : '';
              // 比对的值是空时直接返回。
              if (!arg1) {
                  return input;
              }
              let reg = helper_1.string2regExp(`${arg1}`, false);
              fn = value => reg.test(String(value));
          }
          keys = keys.split(/\s*,\s*/);
          return input.filter((item) => keys.some((key) => fn(exports.resolveVariable(key, item), key, item)));
      },
      base64Encode(str) {
          return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function toSolidBytes(match, p1) {
              return String.fromCharCode(('0x' + p1));
          }));
      },
      base64Decode(str) {
          return decodeURIComponent(atob(str)
              .split('')
              .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
              .join(''));
      },
      lowerCase: input => input && typeof input === 'string' ? input.toLowerCase() : input,
      upperCase: input => input && typeof input === 'string' ? input.toUpperCase() : input,
      isTrue(input, trueValue, falseValue) {
          return getConditionValue(input, !!input, trueValue, falseValue, this);
      },
      isFalse(input, trueValue, falseValue) {
          return getConditionValue(input, !input, trueValue, falseValue, this);
      },
      isMatch(input, matchArg, trueValue, falseValue) {
          matchArg = getStrOrVariable(matchArg, this);
          return getConditionValue(input, matchArg && helper_1.string2regExp(`${matchArg}`, false).test(String(input)), trueValue, falseValue, this);
      },
      notMatch(input, matchArg, trueValue, falseValue) {
          matchArg = getStrOrVariable(matchArg, this);
          return getConditionValue(input, matchArg && !helper_1.string2regExp(`${matchArg}`, false).test(String(input)), trueValue, falseValue, this);
      },
      isEquals(input, equalsValue, trueValue, falseValue) {
          equalsValue = /^\d+$/.test(equalsValue)
              ? parseInt(equalsValue, 10)
              : getStrOrVariable(equalsValue, this);
          return getConditionValue(input, input === equalsValue, trueValue, falseValue, this);
      },
      notEquals(input, equalsValue, trueValue, falseValue) {
          equalsValue = /^\d+$/.test(equalsValue)
              ? parseInt(equalsValue, 10)
              : getStrOrVariable(equalsValue, this);
          return getConditionValue(input, input !== equalsValue, trueValue, falseValue, this);
      }
  };
  /**
   * 如果当前传入字符为：'xxx'或者"xxx"，则返回字符xxx
   * 否则去数据域中，获取变量xxx
   *
   * @param value 传入字符
   * @param data 数据域
   */
  function getStrOrVariable(value, data) {
      return /^('|")(.*)\1$/.test(value)
          ? RegExp.$2
          : /^-?\d+$/.test(value)
              ? parseInt(value, 10)
              : /^(-?\d+)\.\d+?$/.test(value)
                  ? parseFloat(value)
                  : /^\[.*\]$/.test(value)
                      ? value
                          .substring(1, value.length - 1)
                          .split(/\s*,\s*/)
                          .filter(item => item)
                      : /,/.test(value)
                          ? value.split(/\s*,\s*/).filter(item => item)
                          : exports.resolveVariable(value, data);
  }
  function str2array(list) {
      if (list && typeof list === 'string') {
          if (/^\[.*\]$/.test(list)) {
              return list
                  .substring(1, list.length - 1)
                  .split(/\s*,\s*/)
                  .filter(item => item);
          }
          else {
              return list.split(/\s*,\s*/).filter(item => item);
          }
      }
      return list;
  }
  function getConditionValue(input, isTrue, trueValue, falseValue, data) {
      return isTrue || (!isTrue && falseValue)
          ? getStrOrVariable(isTrue ? trueValue : falseValue, data)
          : input;
  }
  function registerFilter(name, fn) {
      exports.filters[name] = fn;
  }
  exports.registerFilter = registerFilter;
  function getFilters() {
      return exports.filters;
  }
  exports.getFilters = getFilters;
  function pickValues(names, data) {
      let arr;
      if (!names || ((arr = names.split(',')) && arr.length < 2)) {
          let idx = names.indexOf('~');
          if (~idx) {
              let key = names.substring(0, idx);
              let target = names.substring(idx + 1);
              return {
                  [key]: exports.resolveVariable(target, data)
              };
          }
          return exports.resolveVariable(names, data);
      }
      let ret = {};
      arr.forEach(name => {
          let idx = name.indexOf('~');
          let target = name;
          if (~idx) {
              target = name.substring(idx + 1);
              name = name.substring(0, idx);
          }
          helper_1.setVariable(ret, name, exports.resolveVariable(target, data));
      });
      return ret;
  }
  exports.pickValues = pickValues;
  exports.resolveVariable = (path, data = {}) => {
      if (!path || !data) {
          return undefined;
      }
      if (path === '$$') {
          return data;
      }
      else if (path[0] === '$') {
          path = path.substring(1);
      }
      else if (path === '&') {
          return data;
      }
      if (typeof data[path] !== 'undefined') {
          return data[path];
      }
      let parts = helper_1.keyToPath(path.replace(/^{|}$/g, ''));
      return parts.reduce((data, path) => {
          if ((helper_1.isObject(data) || Array.isArray(data)) && path in data) {
              return data[path];
          }
          return undefined;
      }, data);
  };
  exports.isPureVariable = (path) => typeof path === 'string'
      ? /^\$(?:([a-z0-9_.]+)|{[^}{]+})$/.test(path)
      : false;
  exports.resolveVariableAndFilter = (path, data = {}, defaultFilter = '| html', fallbackValue = (value) => value) => {
      if (!path) {
          return undefined;
      }
      const m = /^(\\)?\$(?:([a-z0-9_.]+)|{([\s\S]+)})$/i.exec(path);
      if (!m) {
          return undefined;
      }
      const [_, escape, key, key2] = m;
      // 如果是转义如： `\$abc` => `$abc`
      if (escape) {
          return _.substring(1);
      }
      let finalKey = key || key2;
      // 先只支持一层吧
      finalKey = finalKey.replace(/(\\|\\\$)?\$(?:([a-zA-Z0-9_.]+)|{([^}{]+)})/g, (_, escape) => {
          return escape
              ? _.substring(1)
              : exports.resolveVariableAndFilter(_, data, defaultFilter);
      });
      // 默认 html 转义
      if (!~finalKey.indexOf('|')) {
          finalKey += defaultFilter;
      }
      let paths = finalKey.split(/\s*\|\s*/g);
      let originalKey = finalKey;
      finalKey = paths.shift();
      let ret = exports.resolveVariable(finalKey, data);
      let prevConInputChanged = false; // 前一个类三元过滤器生效，则跳过后续类三元过滤器
      return ret == null &&
          !~originalKey.indexOf('default') &&
          !~originalKey.indexOf('now')
          ? fallbackValue(ret)
          : paths.reduce((input, filter) => {
              let params = filter
                  .replace(/([^\\])\\([\:\\])/g, (_, affix, content) => `${affix}__${content === ':' ? 'colon' : 'slash'}__`)
                  .split(':')
                  .map(item => item.replace(/__(slash|colon)__/g, (_, type) => type === 'colon' ? ':' : '\\'));
              let key = params.shift();
              if (~[
                  'isTrue',
                  'isFalse',
                  'isMatch',
                  'isEquals',
                  'notMatch',
                  'notEquals'
              ].indexOf(key)) {
                  if (prevConInputChanged) {
                      return input;
                  }
                  else {
                      const result = exports.filters[key].call(data, input, ...params);
                      prevConInputChanged = result !== input;
                      return result;
                  }
              }
              else {
                  // 后面再遇到非类三元filter就重置了吧，不影响再后面的其他三元filter
                  prevConInputChanged = false;
              }
              return (exports.filters[key] || exports.filters.raw).call(data, input, ...params);
          }, ret);
  };
  exports.tokenize = (str, data, defaultFilter = '| html') => {
      if (!str || typeof str !== 'string') {
          return str;
      }
      return str.replace(/(\\)?\$(?:([a-z0-9_\.]+|&|\$)|{([^}{]+?)})/gi, (_, escape, key1, key2, index, source) => {
          var _a;
          if (!escape && key1 === '$') {
              const prefix = source[index - 1];
              return prefix === '='
                  ? encodeURIComponent(JSON.stringify(data))
                  : helper_1.qsstringify(data);
          }
          return escape
              ? _.substring(1)
              : (_a = exports.resolveVariableAndFilter(_, data, defaultFilter)) !== null && _a !== void 0 ? _a : '';
      });
  };
  function resolveMapping(value, data, defaultFilter = '| raw') {
      return typeof value === 'string' && exports.isPureVariable(value)
          ? exports.resolveVariableAndFilter(value, data, defaultFilter, () => '')
          : typeof value === 'string' && ~value.indexOf('$')
              ? exports.tokenize(value, data, defaultFilter)
              : value;
  }
  function dataMapping(to, from, ignoreFunction = false) {
      if (Array.isArray(to)) {
          return to.map(item => dataMapping(item, from, ignoreFunction));
      }
      else if (typeof to === 'string') {
          return resolveMapping(to, from);
      }
      else if (!isPlainObject_1.default(to)) {
          return to;
      }
      let ret = {};
      Object.keys(to).forEach(key => {
          const value = to[key];
          let keys;
          if (typeof ignoreFunction === 'function' && ignoreFunction(key, value)) {
              // 如果被ignore，不做数据映射处理。
              ret[key] = value;
          }
          else if (key === '&' && value === '$$') {
              ret = Object.assign(Object.assign({}, ret), from);
          }
          else if (key === '&') {
              const v = isPlainObject_1.default(value) &&
                  (keys = Object.keys(value)) &&
                  keys.length === 1 &&
                  from[keys[0].substring(1)] &&
                  Array.isArray(from[keys[0].substring(1)])
                  ? from[keys[0].substring(1)].map((raw) => dataMapping(value[keys[0]], helper_1.createObject(from, raw), ignoreFunction))
                  : resolveMapping(value, from);
              if (Array.isArray(v) || typeof v === 'string') {
                  ret = v;
              }
              else if (typeof v === 'function') {
                  ret = Object.assign(Object.assign({}, ret), v(from));
              }
              else {
                  ret = Object.assign(Object.assign({}, ret), v);
              }
          }
          else if (value === '$$') {
              ret[key] = from;
          }
          else if (value && value[0] === '$') {
              const v = resolveMapping(value, from);
              ret[key] = v;
              if (v === '__undefined') {
                  delete ret[key];
              }
          }
          else if (isPlainObject_1.default(value) &&
              (keys = Object.keys(value)) &&
              keys.length === 1 &&
              from[keys[0].substring(1)] &&
              Array.isArray(from[keys[0].substring(1)])) {
              // 支持只取数组中的部分值这个需求
              // 如:
              // data: {
              //   items: {
              //     '$rows': {
              //        id: '$id',
              //        forum_id: '$forum_id'
              //      }
              //   }
              // }
              const arr = from[keys[0].substring(1)];
              const mapping = value[keys[0]];
              ret[key] = arr.map((raw) => dataMapping(mapping, helper_1.createObject(from, raw), ignoreFunction));
          }
          else if (isPlainObject_1.default(value)) {
              ret[key] = dataMapping(value, from, ignoreFunction);
          }
          else if (Array.isArray(value)) {
              ret[key] = value.map((value) => isPlainObject_1.default(value)
                  ? dataMapping(value, from, ignoreFunction)
                  : resolveMapping(value, from));
          }
          else if (typeof value == 'string' && ~value.indexOf('$')) {
              ret[key] = resolveMapping(value, from);
          }
          else if (typeof value === 'function' && ignoreFunction !== true) {
              ret[key] = value(from);
          }
          else {
              ret[key] = value;
              if (value === '__undefined') {
                  delete ret[key];
              }
          }
      });
      return ret;
  }
  exports.dataMapping = dataMapping;
  function register() {
      return {
          name: 'builtin',
          test: (str) => !!~str.indexOf('$'),
          compile: (str, data, defaultFilter = '| html') => exports.tokenize(str, data, defaultFilter)
      };
  }
  exports.register = register;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHBsLWJ1aWx0aW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvdXRpbHMvdHBsLWJ1aWx0aW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDREQUE0QjtBQUU1QixpRkFBaUQ7QUFDakQscUVBQXFDO0FBQ3JDLHFDQU9rQjtBQUVsQixtRUFBbUM7QUFDbkMsK0RBQStCO0FBRS9CLE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQztBQUV2RCxRQUFBLFdBQVcsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3pDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3pCLE1BQU0sSUFBSSxTQUFTLENBQUMsaUNBQWlDLE9BQU8sR0FBRyxLQUFLLEdBQUcsRUFBRSxDQUFDLENBQUM7S0FDNUU7SUFFRCxNQUFNLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0lBRXBCLElBQUksR0FBRyxFQUFFO1FBQ1AsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDO0tBQ1o7SUFFRCxJQUFJLEdBQUcsR0FBRyxDQUFDLEVBQUU7UUFDWCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7S0FDdEM7SUFFRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUN2QixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMxQyxLQUFLLENBQUMsTUFB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QUFJLEtBQUssQ0FBQyxHQUFHLENBQUM7SUFDNUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztJQUN2RSxLQUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxHQUFHLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDO0lBQzNFLElBQUksRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEdBQUcsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksRUFBRSxFQUFFLENBQUM7SUFDMUUsS0FBSyxFQUFFLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FDcEIsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDdEUsR0FBRyxFQUFFLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ3BCLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO1FBQ2xCLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUNWLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxFQUFFLENBQ1osR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ2pFLENBQUMsQ0FDRjtRQUNILENB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

});
