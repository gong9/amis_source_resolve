amis.define('src/components/condition-builder/Formula.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.Formula = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const InputBox_1 = tslib_1.__importDefault(require("src/components/InputBox.tsx"));
  class Formula extends react_1.default.Component {
      render() {
          const { classnames: cx, value, onChange } = this.props;
          return (react_1.default.createElement("div", { className: cx('CBFormula') },
              react_1.default.createElement(InputBox_1.default, { value: value, onChange: onChange, placeholder: "\u8BF7\u8F93\u5165\u516C\u5F0F", prefix: react_1.default.createElement("span", { className: cx('CBFormula-label') }, "\u8868\u8FBE\u5F0F") })));
      }
  }
  exports.Formula = Formula;
  exports.default = theme_1.themeable(Formula);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRm9ybXVsYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL2NvbmRpdGlvbi1idWlsZGVyL0Zvcm11bGEudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsdUNBQWtEO0FBQ2xELG1FQUFtQztBQU9uQyxNQUFhLE9BQVEsU0FBUSxlQUFLLENBQUMsU0FBdUI7SUFDeEQsTUFBTTtRQUNKLE1BQU0sRUFBQyxVQUFVLEVBQUUsRUFBRSxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1FBRXJELE9BQU8sQ0FDTCx1Q0FBSyxTQUFTLEVBQUUsRUFBRSxDQUFDLFdBQVcsQ0FBQztZQUM3Qiw4QkFBQyxrQkFBUSxJQUNQLEtBQUssRUFBRSxLQUFLLEVBQ1osUUFBUSxFQUFFLFFBQVEsRUFDbEIsV0FBVyxFQUFDLGdDQUFPLEVBQ25CLE1BQU0sRUFBRSx3Q0FBTSxTQUFTLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLHlCQUFZLEdBQzFELENBQ0UsQ0FDUCxDQUFDO0lBQ0osQ0FBQztDQUNGO0FBZkQsMEJBZUM7QUFFRCxrQkFBZSxpQkFBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDIn0=

});
