amis.define('src/renderers/Json.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.JSONFieldRenderer = exports.JSONField = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const factory_1 = require("src/factory.tsx");
  const react_json_tree_1 = tslib_1.__importDefault(require("node_modules/react-json-tree/lib/index"));
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const twilight = {
      scheme: 'twilight',
      author: 'david hart (http://hart-dev.com)',
      base00: '#1e1e1e',
      base01: '#323537',
      base02: '#464b50',
      base03: '#5f5a60',
      base04: '#838184',
      base05: '#a7a7a7',
      base06: '#c3c3c3',
      base07: '#ffffff',
      base08: '#cf6a4c',
      base09: '#cda869',
      base0A: '#f9ee98',
      base0B: '#8f9d6a',
      base0C: '#afc4db',
      base0D: '#7587a6',
      base0E: '#9b859d',
      base0F: '#9b703f',
      tree: {
          border: 0,
          padding: '0 0.625em 0.425em',
          marginTop: '-0.25em',
          marginBottom: '0',
          marginLeft: '0',
          marginRight: 0,
          listStyle: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          backgroundColor: 'rgba(255, 255, 255, 0.4)',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          width: '100%'
      }
  };
  const eighties = {
      scheme: 'eighties',
      author: 'chris kempson (http://chriskempson.com)',
      base00: '#2d2d2d',
      base01: '#393939',
      base02: '#515151',
      base03: '#747369',
      base04: '#a09f93',
      base05: '#d3d0c8',
      base06: '#e8e6df',
      base07: '#f2f0ec',
      base08: '#f2777a',
      base09: '#f99157',
      base0A: '#ffcc66',
      base0B: '#99cc99',
      base0C: '#66cccc',
      base0D: '#6699cc',
      base0E: '#cc99cc',
      base0F: '#d27b53',
      tree: {
          border: 0,
          padding: '0 0.625em 0.425em',
          marginTop: '-0.25em',
          marginBottom: '0',
          marginLeft: '0',
          marginRight: 0,
          listStyle: 'none',
          MozUserSelect: 'none',
          WebkitUserSelect: 'none',
          backgroundColor: '#2D2D2D',
          whiteSpace: 'nowrap',
          display: 'inline-block',
          width: '100%'
      }
  };
  const themes = {
      twilight,
      eighties
  };
  let JSONField = /** @class */ (() => {
      class JSONField extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.shouldExpandNode = (keyName, data, level) => {
                  const { levelExpand } = this.props;
                  return level < levelExpand;
              };
          }
          valueRenderer(raw) {
              const cx = this.props.classnames;
              if (typeof raw === 'string' && /^\"?https?:\/\//.test(raw)) {
                  return (react_1.default.createElement("a", { className: cx('JsonField-nodeValue'), rel: "noopener", href: raw.replace(/^\"(.*)\"$/, '$1'), target: "_blank" }, raw));
              }
              return react_1.default.createElement("span", { className: cx('JsonField-nodeValue') }, raw);
          }
          render() {
              const { className, value, jsonTheme, classnames: cx, hideRoot, placeholder, source } = this.props;
              let data = value;
              if (source !== undefined && tpl_builtin_1.isPureVariable(source)) {
                  data = tpl_builtin_1.resolveVariableAndFilter(source, this.props.data, '| raw');
              }
              else if (typeof value === 'string') {
                  try {
                      data = JSON.parse(value);
                  }
                  catch (e) {
                      data = {
                          error: e.message
                      };
                  }
              }
              const theme = themes[jsonTheme] ? themes[jsonTheme] : themes['twilight'];
              return (react_1.default.createElement("div", { className: cx('JsonField', className) }, typeof data === 'undefined' || data === null ? (placeholder) : (react_1.default.createElement(react_json_tree_1.default, { data: data, theme: theme, shouldExpandNode: this.shouldExpandNode, valueRenderer: this.valueRenderer, hideRoot: hideRoot }))));
          }
      }
      JSONField.defaultProps = {
          placeholder: '-',
          levelExpand: 1,
          jsonTheme: 'twilight',
          hideRoot: false,
          source: ''
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], JSONField.prototype, "valueRenderer", null);
      return JSONField;
  })();
  exports.JSONField = JSONField;
  let JSONFieldRenderer = /** @class */ (() => {
      let JSONFieldRenderer = class JSONFieldRenderer extends JSONField {
      };
      JSONFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)json$/,
              name: 'json'
          })
      ], JSONFieldRenderer);
      return JSONFieldRenderer;
  })();
  exports.JSONFieldRenderer = JSONFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvSnNvbi50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix3Q0FBbUQ7QUFFbkQsOEVBQXVDO0FBQ3ZDLDRDQUF5QztBQUV6QyxzREFBOEU7QUFvQzlFLE1BQU0sUUFBUSxHQUFHO0lBQ2YsTUFBTSxFQUFFLFVBQVU7SUFDbEIsTUFBTSxFQUFFLGtDQUFrQztJQUMxQyxNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixNQUFNLEVBQUUsU0FBUztJQUNqQixJQUFJLEVBQUU7UUFDSixNQUFNLEVBQUUsQ0FBQztRQUNULE9BQU8sRUFBRSxtQkFBbUI7UUFDNUIsU0FBUyxFQUFFLFNBQVM7UUFDcEIsWUFBWSxFQUFFLEdBQUc7UUFDakIsVUFBVSxFQUFFLEdBQUc7UUFDZixXQUFXLEVBQUUsQ0FBQztRQUNkLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLGFBQWEsRUFBRSxNQUFNO1FBQ3JCLGdCQUFnQixFQUFFLE1BQU07UUFDeEIsZUFBZSxFQUFFLDBCQUEwQjtRQUMzQyxVQUFVLEVBQUUsUUFBUTtRQUNwQixPQUFPLEVBQUUsY0FBYztRQUN2QixLQUFL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

});
