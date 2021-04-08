amis.define('src/index.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.animation = exports.makeTranslator = exports.registerLocale = exports.setDefaultLocale = exports.getDefaultLocale = exports.classnames = exports.getClassPrefix = exports.classPrefix = exports.getTheme = exports.theme = exports.setDefaultTheme = exports.validateObject = exports.validate = exports.ScopedContext = exports.Scoped = exports.registerIcon = exports.Icon = exports.setIconVendor = exports.resolveVariableAndFilter = exports.resolveVariable = exports.relativeValueRe = exports.filterDate = exports.filterSchema = exports.resolveRenderer = exports.registerOptionsControl = exports.registerFormItem = exports.getRenderers = exports.unRegisterRenderer = exports.registerRenderer = exports.getRendererByName = exports.normalizeOptions = exports.str2rules = exports.addRule = exports.setCustomEvalExpression = exports.setCustomEvalJs = exports.evalJS = exports.evalExpression = exports.registerTplEnginer = exports.registerFilter = exports.resizeSensor = exports.utils = exports.filter = exports.buildApi = exports.wrapFetcher = exports.OptionsControl = exports.FormItem = exports.RegisterStore = exports.Renderer = exports.updateEnv = exports.clearStoresCache = exports.render = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  /** @license amis v@version
   *
   * Copyright Baidu
   *
   * This source code is licensed under the Apache license found in the
   * LICENSE file in the root directory of this source tree.
   */
  const factory_1 = require("src/factory.tsx");
  Object.defineProperty(exports, "render", { enumerable: true, get: function () { return factory_1.render; } });
  Object.defineProperty(exports, "Renderer", { enumerable: true, get: function () { return factory_1.Renderer; } });
  Object.defineProperty(exports, "getRendererByName", { enumerable: true, get: function () { return factory_1.getRendererByName; } });
  Object.defineProperty(exports, "getRenderers", { enumerable: true, get: function () { return factory_1.getRenderers; } });
  Object.defineProperty(exports, "registerRenderer", { enumerable: true, get: function () { return factory_1.registerRenderer; } });
  Object.defineProperty(exports, "unRegisterRenderer", { enumerable: true, get: function () { return factory_1.unRegisterRenderer; } });
  Object.defineProperty(exports, "resolveRenderer", { enumerable: true, get: function () { return factory_1.resolveRenderer; } });
  Object.defineProperty(exports, "filterSchema", { enumerable: true, get: function () { return factory_1.filterSchema; } });
  Object.defineProperty(exports, "clearStoresCache", { enumerable: true, get: function () { return factory_1.clearStoresCache; } });
  Object.defineProperty(exports, "updateEnv", { enumerable: true, get: function () { return factory_1.updateEnv; } });
  const api_1 = require("src/utils/api.ts");
  Object.defineProperty(exports, "wrapFetcher", { enumerable: true, get: function () { return api_1.wrapFetcher; } });
  Object.defineProperty(exports, "buildApi", { enumerable: true, get: function () { return api_1.buildApi; } });
  const tpl_1 = require("src/utils/tpl.ts");
  Object.defineProperty(exports, "filter", { enumerable: true, get: function () { return tpl_1.filter; } });
  Object.defineProperty(exports, "registerTplEnginer", { enumerable: true, get: function () { return tpl_1.registerTplEnginer; } });
  Object.defineProperty(exports, "evalExpression", { enumerable: true, get: function () { return tpl_1.evalExpression; } });
  Object.defineProperty(exports, "evalJS", { enumerable: true, get: function () { return tpl_1.evalJS; } });
  Object.defineProperty(exports, "setCustomEvalJs", { enumerable: true, get: function () { return tpl_1.setCustomEvalJs; } });
  Object.defineProperty(exports, "setCustomEvalExpression", { enumerable: true, get: function () { return tpl_1.setCustomEvalExpression; } });
  const utils = tslib_1.__importStar(require("src/utils/helper.ts"));
  exports.utils = utils;
  const resize_sensor_1 = require("src/utils/resize-sensor.ts");
  Object.defineProperty(exports, "resizeSensor", { enumerable: true, get: function () { return resize_sensor_1.resizeSensor; } });
  const IconPickerIcons_1 = require("src/renderers/Form/IconPickerIcons.tsx");
  Object.defineProperty(exports, "setIconVendor", { enumerable: true, get: function () { return IconPickerIcons_1.setIconVendor; } });
  const icons_1 = require("src/components/icons.tsx");
  Object.defineProperty(exports, "Icon", { enumerable: true, get: function () { return icons_1.Icon; } });
  Object.defineProperty(exports, "registerIcon", { enumerable: true, get: function () { return icons_1.registerIcon; } });
  const store_1 = require("src/store/index.ts");
  Object.defineProperty(exports, "RegisterStore", { enumerable: true, get: function () { return store_1.RegisterStore; } });
  const locale_1 = require("src/locale.tsx");
  Object.defineProperty(exports, "setDefaultLocale", { enumerable: true, get: function () { return locale_1.setDefaultLocale; } });
  Object.defineProperty(exports, "getDefaultLocale", { enumerable: true, get: function () { return locale_1.getDefaultLocale; } });
  Object.defineProperty(exports, "makeTranslator", { enumerable: true, get: function () { return locale_1.makeTranslator; } });
  Object.defineProperty(exports, "registerLocale", { enumerable: true, get: function () { return locale_1.register; } });
  require("src/locale/zh-CN.ts");
  const Animation_1 = tslib_1.__importDefault(require("src/utils/Animation.ts"));
  exports.animation = Animation_1.default;
  tslib_1.__exportStar(require("src/Schema.ts"), exports);
  // 注册渲染器
  require("src/renderers/Action.tsx");
  require("src/renderers/Alert.tsx");
  require("src/renderers/App.tsx");
  require("src/renderers/Avatar.tsx");
  require("src/renderers/Remark.tsx");
  require("src/renderers/ButtonGroup.tsx");
  require("src/renderers/ButtonToolbar.tsx");
  require("src/renderers/Breadcrumb.tsx");
  require("src/renderers/DropDownButton.tsx");
  require("src/renderers/Collapse.tsx");
  require("src/renderers/Color.tsx");
  require("src/renderers/CRUD.tsx");
  require("src/renderers/Pagination.tsx");
  require("src/renderers/Cards.tsx");
  require("src/renderers/Card.tsx");
  require("src/renderers/Custom.tsx");
  require("src/renderers/Date.tsx");
  require("src/renderers/Dialog.tsx");
  require("src/renderers/Divider.tsx");
  require("src/renderers/Each.tsx");
  require("src/renderers/Flex.tsx");
  require("src/renderers/Form/index.tsx");
  require("src/renderers/Form/Control.tsx");
  require("src/renderers/Form/Hidden.tsx");
  require("src/renderers/Form/Text.tsx");
  require("src/renderers/Form/Tag.tsx");
  require("src/renderers/Form/Number.tsx");
  require("src/renderers/Form/Textarea.tsx");
  require("src/renderers/Form/Checkboxes.tsx");
  require("src/renderers/Form/Checkbox.tsx");
  require("src/renderers/Form/City.tsx");
  require("src/renderers/Form/ChartRadios.tsx");
  require("src/renderers/Form/Rating.tsx");
  require("src/renderers/Form/Switch.tsx");
  require("src/renderers/Form/Button.tsx");
  require("src/renderers/Form/ButtonGroup.tsx");
  require("src/renderers/Form/ButtonToolbar.tsx");
  require("src/renderers/Form/Radios.tsx");
  require("src/renderers/Form/List.tsx");
  require("src/renderers/Form/Location.tsx");
  require("src/renderers/Form/Select.tsx");
  require("src/renderers/Form/Static.tsx");
  require("src/renderers/Form/Date.tsx");
  require("src/renderers/Form/DateRange.tsx");
  require("src/renderers/Form/Repeat.tsx");
  require("src/renderers/Form/Tree.tsx");
  require("src/renderers/Form/TreeSelect.tsx");
  require("src/renderers/Form/Image.tsx");
  require("src/renderers/Form/File.tsx");
  require("src/renderers/Form/UUID.tsx");
  require("src/renderers/Form/Matrix.tsx");
  require("src/renderers/Form/MonthRange.tsx");
  require("src/renderers/Form/Range.tsx");
  require("src/renderers/Form/Array.tsx");
  require("src/renderers/Form/Combo.tsx");
  require("src/renderers/Form/ConditionBuilder.tsx");
  require("src/renderers/Form/Container.tsx");
  require("src/renderers/Form/SubForm.tsx");
  require("src/renderers/Form/RichText.tsx");
  require("src/renderers/Form/Editor.tsx");
  require("src/renderers/Form/DiffEditor.tsx");
  require("src/renderers/Form/Grid.tsx");
  require("src/renderers/Form/HBox.tsx");
  require("src/renderers/Form/Panel.tsx");
  require("src/renderers/Form/Color.tsx");
  require("src/renderers/Form/ChainedSelect.tsx");
  require("src/renderers/Form/NestedSelect.tsx");
  require("src/renderers/Form/Transfer.tsx");
  require("src/renderers/Form/Service.tsx");
  require("src/renderers/Form/Table.tsx");
  require("src/renderers/Form/Picker.tsx");
  require("src/renderers/Form/IconPicker.tsx");
  require("src/renderers/Form/Formula.tsx");
  require("src/renderers/Form/FieldSet.tsx");
  require("src/renderers/Form/Tabs.tsx");
  require("src/renderers/Form/TabsTransfer.tsx");
  require("src/renderers/Form/Group.tsx");
  require("src/renderers/Form/InputGroup.tsx");
  require("src/renderers/Grid.tsx");
  require("src/renderers/Grid2D.tsx");
  require("src/renderers/HBox.tsx");
  require("src/renderers/VBox.tsx");
  require("src/renderers/Image.tsx");
  require("src/renderers/Images.tsx");
  require("src/renderers/List.tsx");
  require("src/renderers/Log.tsx");
  require("src/renderers/Operation.tsx");
  require("src/renderers/Page.tsx");
  require("src/renderers/PaginationWrapper.tsx");
  require("src/renderers/Panel.tsx");
  require("src/renderers/Plain.tsx");
  require("src/renderers/Property.tsx");
  require("src/renderers/Spinner.tsx");
  require("src/renderers/Table/index.tsx");
  require("src/renderers/Tabs.tsx");
  require("src/renderers/Tpl.tsx");
  require("src/renderers/Mapping.tsx");
  require("src/renderers/Progress.tsx");
  require("src/renderers/Status.tsx");
  require("src/renderers/Json.tsx");
  require("src/renderers/Link.tsx");
  require("src/renderers/Switch.tsx");
  require("src/renderers/Wizard.tsx");
  require("src/renderers/Chart.tsx");
  require("src/renderers/Container.tsx");
  require("src/renderers/SearchBox.tsx");
  require("src/renderers/Service.tsx");
  require("src/renderers/SparkLine.tsx");
  require("src/renderers/Video.tsx");
  require("src/renderers/Audio.tsx");
  require("src/renderers/Nav.tsx");
  require("src/renderers/Tasks.tsx");
  require("src/renderers/Drawer.tsx");
  require("src/renderers/Wrapper.tsx");
  require("src/renderers/IFrame.tsx");
  require("src/renderers/QRCode.tsx");
  require("src/renderers/Icon.tsx");
  require("src/renderers/Carousel.tsx");
  require("src/renderers/AnchorNav.tsx");
  require("src/renderers/Form/AnchorNav.tsx");
  const Scoped_1 = tslib_1.__importStar(require("src/Scoped.tsx"));
  exports.Scoped = Scoped_1.default;
  Object.defineProperty(exports, "ScopedContext", { enumerable: true, get: function () { return Scoped_1.ScopedContext; } });
  const Item_1 = require("src/renderers/Form/Item.tsx");
  Object.defineProperty(exports, "FormItem", { enumerable: true, get: function () { return Item_1.FormItem; } });
  Object.defineProperty(exports, "registerFormItem", { enumerable: true, get: function () { return Item_1.registerFormItem; } });
  // 兼容旧版本用法
  require("src/compat.ts");
  require("src/envOverwrite.ts");
  require("src/themes/default.ts");
  require("src/themes/cxd.ts");
  require("src/themes/dark.ts");
  require("src/themes/antd.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  Object.defineProperty(exports, "registerFilter", { enumerable: true, get: function () { return tpl_builtin_1.registerFilter; } });
  Object.defineProperty(exports, "filterDate", { enumerable: true, get: function () { return tpl_builtin_1.filterDate; } });
  Object.defineProperty(exports, "relativeValueRe", { enumerable: true, get: function () { return tpl_builtin_1.relativeValueRe; } });
  Object.defineProperty(exports, "resolveVariable", { enumerable: true, get: function () { return tpl_builtin_1.resolveVariable; } });
  Object.defineProperty(exports, "resolveVariableAndFilter", { enumerable: true, get: function () { return tpl_builtin_1.resolveVariableAndFilter; } });
  const validations_1 = require("src/utils/validations.ts");
  Object.defineProperty(exports, "addRule", { enumerable: true, get: function () { return validations_1.addRule; } });
  Object.defineProperty(exports, "str2rules", { enumerable: true, get: function () { return validations_1.str2rules; } });
  Object.defineProperty(exports, "validate", { enumerable: true, get: function () { return validations_1.validate; } });
  Object.defineProperty(exports, "validateObject", { enumerable: true, get: function () { return validations_1.validateObject; } });
  const Select_1 = require("src/components/Select.tsx");
  Object.defineProperty(exports, "normalizeOptions", { enumerable: true, get: function () { return Select_1.normalizeOptions; } });
  const Options_1 = require("src/renderers/Form/Options.tsx");
  Object.defineProperty(exports, "OptionsControl", { enumerable: true, get: function () { return Options_1.OptionsControl; } });
  Object.defineProperty(exports, "registerOptionsControl", { enumerable: true, get: function () { return Options_1.registerOptionsControl; } });
  const theme_1 = require("src/theme.tsx");
  Object.defineProperty(exports, "classnames", { enumerable: true, get: function () { return theme_1.classnames; } });
  Object.defineProperty(exports, "getClassPrefix", { enumerable: true, get: function () { return theme_1.getClassPrefix; } });
  Object.defineProperty(exports, "setDefaultTheme", { enumerable: true, get: function () { return theme_1.setDefaultTheme; } });
  Object.defineProperty(exports, "theme", { enumerable: true, get: function () { return theme_1.theme; } });
  Object.defineProperty(exports, "getTheme", { enumerable: true, get: function () { return theme_1.getTheme; } });
  const classPrefix = theme_1.getClassPrefix();
  exports.classPrefix = classPrefix;
  tslib_1.__exportStar(require("src/components/index.tsx"), exports);
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvaW5kZXgudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQTs7Ozs7O0dBTUc7QUFDSCx1Q0FXbUI7QUE4TGpCLHVGQXhNQSxnQkFBTSxPQXdNQTtBQUdOLHlGQTFNQSxrQkFBUSxPQTBNQTtBQW1CUixrR0E1TkEsMkJBQWlCLE9BNE5BO0FBR2pCLDZGQTlOQSxzQkFBWSxPQThOQTtBQUZaLGlHQTNOQSwwQkFBZ0IsT0EyTkE7QUFDaEIsbUdBM05BLDRCQUFrQixPQTJOQTtBQUlsQixnR0E5TkEseUJBQWUsT0E4TkE7QUFDZiw2RkE5TkEsc0JBQVksT0E4TkE7QUE1QlosaUdBak1BLDBCQUFnQixPQWlNQTtBQUNoQiwwRkFqTUEsbUJBQVMsT0FpTUE7QUEvTFgscUNBQWtEO0FBb01oRCw0RkFwTU0saUJBQVcsT0FvTU47QUFDWCx5RkFyTW1CLGNBQVEsT0FxTW5CO0FBcE1WLHFDQU9xQjtBQThMbkIsdUZBcE1BLFlBQU0sT0FvTUE7QUFLTixtR0F4TUEsd0JBQWtCLE9Bd01BO0FBQ2xCLCtGQXhNQSxvQkFBYyxPQXdNQTtBQUNkLHVGQXhNQSxZQUFNLE9Bd01BO0FBQ04sZ0dBeE1BLHFCQUFlLE9Bd01BO0FBQ2Ysd0dBeE1BLDZCQUF1QixPQXdNQTtBQXRNekIsOERBQXdDO0FBK0x0QyxzQkFBSztBQTlMUCx5REFBbUQ7QUErTGpELDZGQS9MTSw0QkFBWSxPQStMTjtBQTlMZCxzRUFBK0Q7QUFvTjdELDhGQXBOTSwrQkFBYSxPQW9OTjtBQW5OZiw4Q0FBc0Q7QUFvTnBELHFGQXBOTSxZQUFJLE9Bb05OO0FBQ0osNkZBck5ZLG9CQUFZLE9BcU5aO0FBcE5kLG1DQUFzQztBQW9McEMsOEZBcExNLHFCQUFhLE9Bb0xOO0FBbkxmLHFDQUtrQjtBQTJOaEIsaUdBL05BLHlCQUFnQixPQStOQTtBQURo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

});
