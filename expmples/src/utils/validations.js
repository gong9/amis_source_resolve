amis.define('src/utils/validations.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.str2rules = exports.validateObject = exports.validate = exports.validateMessages = exports.addRule = exports.validations = void 0;
  const tpl_1 = require("src/utils/tpl.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const isExisty = (value) => value !== null && value !== undefined;
  const isEmpty = (value) => value === '';
  const makeRegexp = (reg) => {
      if (reg instanceof RegExp) {
          return reg;
      }
      else if (/^(?:matchRegexp\:)?\/(.+)\/([gimuy]*)$/.test(reg)) {
          return new RegExp(RegExp.$1, RegExp.$2 || '');
      }
      else if (typeof reg === 'string') {
          return new RegExp(reg);
      }
      return /^$/;
  };
  exports.validations = {
      isRequired: function (values, value) {
          return (value !== undefined &&
              value !== '' &&
              value !== null &&
              (!Array.isArray(value) || !!value.length));
      },
      isExisty: function (values, value) {
          return isExisty(value);
      },
      matchRegexp: function (values, value, regexp) {
          return !isExisty(value) || isEmpty(value) || makeRegexp(regexp).test(value);
      },
      isUndefined: function (values, value) {
          return value === undefined;
      },
      isEmptyString: function (values, value) {
          return isEmpty(value);
      },
      isEmail: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i);
      },
      isUrl: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i);
      },
      isTrue: function (values, value) {
          return value === true;
      },
      isFalse: function (values, value) {
          return value === false;
      },
      isNumeric: function (values, value) {
          if (typeof value === 'number') {
              return true;
          }
          return exports.validations.matchRegexp(values, value, /^[-+]?(?:\d*[.])?\d+$/);
      },
      isAlpha: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^[A-Z]+$/i);
      },
      isAlphanumeric: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^[0-9A-Z]+$/i);
      },
      isInt: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^(?:[-+]?(?:0|[1-9]\d*))$/);
      },
      isFloat: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^(?:[-+]?(?:\d+))?(?:\.\d*)?(?:[eE][\+\-]?(?:\d+))?$/);
      },
      isWords: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^[A-Z\s]+$/i);
      },
      isSpecialWords: function (values, value) {
          return exports.validations.matchRegexp(values, value, /^[A-Z\s\u00C0-\u017F]+$/i);
      },
      isLength: function (values, value, length) {
          return !isExisty(value) || isEmpty(value) || value.length === length;
      },
      equals: function (values, value, eql) {
          return !isExisty(value) || isEmpty(value) || value == eql;
      },
      equalsField: function (values, value, field) {
          return value == values[field];
      },
      maxLength: function (values, value, length) {
          return !isExisty(value) || value.length <= length;
      },
      minLength: function (values, value, length) {
          return !isExisty(value) || isEmpty(value) || value.length >= length;
      },
      isUrlPath: function (values, value, regexp) {
          return !isExisty(value) || isEmpty(value) || /^[a-z0-9_\\-]+$/i.test(value);
      },
      maximum: function (values, value, maximum) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              (parseFloat(value) || 0) <= (parseFloat(maximum) || 0));
      },
      lt: function (values, value, maximum) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              (parseFloat(value) || 0) < (parseFloat(maximum) || 0));
      },
      minimum: function (values, value, minimum) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              (parseFloat(value) || 0) >= (parseFloat(minimum) || 0));
      },
      gt: function (values, value, minimum) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              (parseFloat(value) || 0) > (parseFloat(minimum) || 0));
      },
      isJson: function (values, value, minimum) {
          if (isExisty(value) && !isEmpty(value) && typeof value === 'string') {
              try {
                  JSON.parse(value);
              }
              catch (e) {
                  return false;
              }
          }
          return true;
      },
      isPhoneNumber: function (values, value) {
          return (!isExisty(value) || isEmpty(value) || /^[1]([3-9])[0-9]{9}$/.test(value));
      },
      isTelNumber: function (values, value) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(value));
      },
      isZipcode: function (values, value) {
          return (!isExisty(value) || isEmpty(value) || /^[1-9]{1}(\d+){5}$/.test(value));
      },
      isId: function (values, value) {
          return (!isExisty(value) ||
              isEmpty(value) ||
              /(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/.test(value));
      },
      notEmptyString: function (values, value) {
          return !isExisty(value) || !(String(value) && String(value).trim() === '');
      },
      matchRegexp1: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp2: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp3: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp4: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp5: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp6: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp7: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp8: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      },
      matchRegexp9: function (values, value, regexp) {
          return exports.validations.matchRegexp(values, value, regexp);
      }
  };
  function addRule(ruleName, fn, message = '') {
      exports.validations[ruleName] = fn;
      exports.validateMessages[ruleName] = message;
  }
  exports.addRule = addRule;
  exports.validateMessages = {
      isEmail: 'validate.isEmail',
      isRequired: 'validate.isRequired',
      isUrl: 'validate.isUrl',
      isInt: 'validate.isInt',
      isAlpha: 'validate.isAlpha',
      isNumeric: 'validate.isNumeric',
      isAlphanumeric: 'validate.isAlphanumeric',
      isFloat: 'validate.isFloat',
      isWords: 'validate.isWords',
      isUrlPath: 'validate.isUrlPath',
      matchRegexp: 'validate.matchRegexp',
      minLength: 'validate.minLength',
      maxLength: 'validate.maxLength',
      maximum: 'validate.maximum',
      lt: 'validate.lt',
      minimum: 'validate.minimum',
      gt: 'validate.gt',
      isJson: 'validate.isJson',
      isLength: 'validate.isLength',
      notEmptyString: 'validate.notEmptyString',
      equalsField: 'validate.equalsField',
      equals: 'validate.equals',
      isPhoneNumber: 'validate.isPhoneNumber',
      isTelNumber: 'validate.isTelNumber',
      isZipcode: 'validate.isZipcode',
      isId: 'validate.isId'
  };
  function validate(value, values, rules, messages, __ = (str) => str) {
      const errors = [];
      rules &&
          Object.keys(rules).forEach(ruleName => {
              if (!rules[ruleName] && rules[ruleName] !== 0) {
                  return;
              }
              else if (typeof exports.validations[ruleName] !== 'function') {
                  throw new Error('Validation `' + ruleName + '` not exists!');
              }
              const fn = exports.validations[ruleName];
              const args = (Array.isArray(rules[ruleName])
                  ? rules[ruleName]
                  : [rules[ruleName]]).map((item) => {
                  if (typeof item === 'string' && tpl_builtin_1.isPureVariable(item)) {
                      return tpl_builtin_1.resolveVariableAndFilter(item, values, '|raw');
                  }
                  return item;
              });
              if (!fn(values, value, ...args)) {
                  errors.push(tpl_1.filter(__((messages && messages[ruleName]) || exports.validateMessages[ruleName]), Object.assign({}, [''].concat(args))));
              }
          });
      return errors;
  }
  exports.validate = validate;
  function validateObject(values, rules, messages, __ = (str) => str) {
      const ret = {};
      Object.keys(rules).forEach(key => {
          const msgs = validate(values[key], values, rules[key] === true
              ? {
                  isRequired: true
              }
              : rules[key], messages, __);
          if (msgs.length) {
              ret[key] = msgs;
          }
      });
      return ret;
  }
  exports.validateObject = validateObject;
  const splitValidations = function (str) {
      let i = 0;
      const placeholder = {};
      return str
          .replace(/matchRegexp\d*\s*\:\s*\/.*?\/[igm]*/g, raw => {
          placeholder[`__${i}`] = raw;
          return `__${i++}`;
      })
          .split(/,(?![^{\[]*[}\]])/g)
          .map(str => (/^__\d+$/.test(str) ? placeholder[str] : str.trim()));
  };
  function str2rules(validations) {
      if (typeof validations === 'string') {
          return validations
              ? splitValidations(validations).reduce(function (validations, validation) {
                  const idx = validation.indexOf(':');
                  let validateMethod = validation;
                  let args = [];
                  if (~idx) {
                      validateMethod = validation.substring(0, idx);
                      args = /^matchRegexp/.test(validateMethod)
                          ? [validation.substring(idx + 1).trim()]
                          : validation
                              .substring(idx + 1)
                              .split(',')
                              .map(function (arg) {
                              try {
                                  return JSON.parse(arg);
                              }
                              catch (e) {
                                  return arg;
                              }
                          });
                  }
                  validations[validateMethod] = args.length ? args : true;
                  return validations;
              }, {})
              : {};
      }
      return validations || {};
  }
  exports.str2rules = str2rules;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvdXRpbHMvdmFsaWRhdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQTZCO0FBQzdCLCtDQUF1RTtBQUN2RSxNQUFNLFFBQVEsR0FBRyxDQUFDLEtBQVUsRUFBRSxFQUFFLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssU0FBUyxDQUFDO0FBQ3ZFLE1BQU0sT0FBTyxHQUFHLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLEtBQUssRUFBRSxDQUFDO0FBQzdDLE1BQU0sVUFBVSxHQUFHLENBQUMsR0FBb0IsRUFBRSxFQUFFO0lBQzFDLElBQUksR0FBRyxZQUFZLE1BQU0sRUFBRTtRQUN6QixPQUFPLEdBQUcsQ0FBQztLQUNaO1NBQU0sSUFBSSx3Q0FBd0MsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDN0QsT0FBTyxJQUFJLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7S0FDL0M7U0FBTSxJQUFJLE9BQU8sR0FBRyxLQUFLLFFBQVEsRUFBRTtRQUNsQyxPQUFPLElBQUksTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hCO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUM7QUFZVyxRQUFBLFdBQVcsR0FFcEI7SUFDRixVQUFVLEVBQUUsVUFBVSxNQUFNLEVBQUUsS0FBVTtRQUN0QyxPQUFPLENBQ0wsS0FBSyxLQUFLLFNBQVM7WUFDbkIsS0FBSyxLQUFLLEVBQUU7WUFDWixLQUFLLEtBQUssSUFBSTtZQUNkLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENB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O0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNO1FBQzNDLE9BQU8sbUJBQVcsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUN4RCxDQUFDO0lBQ0QsWUFBWSxFQUFFLFVBQVUsTUFBTSxFQUFFLEtBQUssRUFB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

});
