amis.define('src/compat.ts', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  const factory_1 = require("src/factory.tsx");
  const Checkbox_1 = require("src/renderers/Form/Checkbox.tsx");
  const index_1 = require("src/renderers/Form/index.tsx");
  const FieldSet_1 = require("src/renderers/Form/FieldSet.tsx");
  const Tabs_1 = require("src/renderers/Form/Tabs.tsx");
  const Card_1 = require("src/renderers/Card.tsx");
  const List_1 = require("src/renderers/List.tsx");
  const ButtonGroup_1 = require("src/renderers/Form/ButtonGroup.tsx");
  const helper_1 = require("src/utils/helper.ts");
  const Service_1 = require("src/renderers/Form/Service.tsx");
  const File_1 = require("src/renderers/Form/File.tsx");
  const Image_1 = require("src/renderers/Form/Image.tsx");
  const RichText_1 = require("src/renderers/Form/RichText.tsx");
  // 兼容老的用法，老用法 label 用在 checkbox 的右侧内容，新用法用 option 来代替。
  factory_1.addSchemaFilter(function CheckboxPropsFilter(schema, renderer) {
      if (renderer.component !== Checkbox_1.CheckboxControlRenderer) {
          return schema;
      }
      if (schema.label && typeof schema.option === 'undefined') {
          schema = Object.assign({}, schema);
          schema.option = schema.label;
          delete schema.label;
      }
      return schema;
  });
  function convertFieldSetTabs2Controls(schema) {
      const toUpdate = {};
      let flag = false;
      toUpdate.controls = Array.isArray(schema.controls)
          ? schema.controls.concat()
          : [];
      toUpdate.controls = toUpdate.controls.map((control) => {
          if (Array.isArray(control)) {
              let converted = convertFieldSetTabs2Controls({
                  type: 'group',
                  controls: control
              });
              if (converted !== control) {
                  flag = true;
              }
              return converted;
          }
          return control;
      });
      schema.fieldSet &&
          (Array.isArray(schema.fieldSet)
              ? schema.fieldSet
              : [schema.fieldSet]).forEach((fieldSet) => {
              flag = true;
              toUpdate.controls.push(Object.assign(Object.assign({}, convertFieldSetTabs2Controls(fieldSet)), { type: 'fieldSet', collapsable: schema.collapsable }));
          });
      schema.tabs &&
          (flag = true) &&
          toUpdate.controls.push({
              type: 'tabs',
              tabs: schema.tabs.map((tab) => convertFieldSetTabs2Controls(tab))
          });
      if (flag) {
          schema = Object.assign(Object.assign({}, schema), toUpdate);
          delete schema.fieldSet;
          delete schema.tabs;
      }
      return schema;
  }
  // Form 中，把 fieldSet 和 tabs 转成 {type: 'fieldSet', controls: []}
  // 同时把数组用法转成 {type: 'group', controls: []}
  factory_1.addSchemaFilter(function FormPropsFilter(schema, renderer) {
      if (renderer.component !== index_1.FormRenderer) {
          return schema;
      }
      if (schema.fieldSet || schema.tabs) {
          // console.warn('Form 下面直接用 fieldSet 或者 tabs 将不支持，请改成在 controls 数组中添加。');
          schema = convertFieldSetTabs2Controls(schema);
      }
      else if (Array.isArray(schema.controls)) {
          let flag = false;
          let converted = schema.controls.map((control) => {
              if (Array.isArray(control)) {
                  let converted = convertFieldSetTabs2Controls({
                      type: 'group',
                      controls: control
                  });
                  if (converted !== control) {
                      flag = true;
                  }
                  return converted;
              }
              return control;
          });
          if (flag) {
              schema = Object.assign(Object.assign({}, schema), { controls: converted });
          }
      }
      return schema;
  });
  // FieldSet 中把 controls 里面的数组用法转成 {type: 'group', controls: []}
  factory_1.addSchemaFilter(function FormPropsFilter(schema, renderer) {
      if (renderer.component !== FieldSet_1.FieldSetRenderer) {
          return schema;
      }
      if (Array.isArray(schema.controls)) {
          let flag = false;
          let converted = schema.controls.map((control) => {
              if (Array.isArray(control)) {
                  let converted = convertFieldSetTabs2Controls({
                      type: 'group',
                      controls: control
                  });
                  if (converted !== control) {
                      flag = true;
                  }
                  return converted;
              }
              return control;
          });
          if (flag) {
              schema = Object.assign(Object.assign({}, schema), { controls: converted });
          }
      }
      return schema;
  });
  // Form 里面的 Tabs 中把 controls 里面的数组用法转成 {type: 'group', controls: []}
  factory_1.addSchemaFilter(function FormPropsFilter(schema, renderer) {
      if (renderer.component !== Tabs_1.TabsRenderer) {
          return schema;
      }
      if (Array.isArray(schema.tabs)) {
          let flag = false;
          let converted = schema.tabs.map((tab) => {
              let flag2 = false;
              let converted = (tab.controls || []).map((control) => {
                  if (Array.isArray(control)) {
                      let converted = convertFieldSetTabs2Controls({
                          type: 'group',
                          controls: control
                      });
                      if (converted !== control) {
                          flag2 = true;
                      }
                      return converted;
                  }
                  return control;
              });
              if (flag2) {
                  flag = true;
                  tab = Object.assign(Object.assign({}, tab), { controls: converted });
              }
              return tab;
          });
          if (flag) {
              schema = Object.assign(Object.assign({}, schema), { tabs: converted });
          }
      }
      return schema;
  });
  function convertArray2Hbox(arr) {
      let flag = false;
      let converted = arr.map((item) => {
          if (Array.isArray(item)) {
              flag = true;
              return convertArray2Hbox(item);
          }
          return item;
      });
      if (!flag) {
          converted = arr;
      }
      return {
          type: 'hbox',
          columns: converted
      };
  }
  // CRUD/List  和 CRUD/Card 的 body 中的数组用法转成 hbox
  factory_1.addSchemaFilter(function (schema, renderer) {
      if (renderer.component !== Card_1.CardRenderer &&
          renderer.component !== List_1.ListItemRenderer) {
          return schema;
      }
      if (Array.isArray(schema.body)) {
          let flag = false;
          let converted = schema.body.map((item) => {
              if (Array.isArray(item)) {
                  flag = true;
                  return convertArray2Hbox(item);
              }
              return item;
          });
          if (flag) {
              schema = Object.assign(Object.assign({}, schema), { body: converted });
          }
      }
      return schema;
  });
  // button group 的 btnClassName 和 btnActiveClassName 改成 btnLevel 和 btnActiveLevel 了
  factory_1.addSchemaFilter(function (scheam, renderer) {
      if (renderer.component !== ButtonGroup_1.ButtonGroupControlRenderer) {
          return scheam;
      }
      if (scheam.btnClassName || scheam.btnActiveClassName) {
          scheam = Object.assign(Object.assign({}, scheam), { btnLevel: helper_1.getLevelFromClassName(scheam.btnClassName), btnActiveLevel: helper_1.getLevelFromClassName(scheam.btnActiveClassName) });
          delete scheam.btnClassName;
          delete scheam.btnActiveClassName;
      }
      return scheam;
  });
  // FieldSet  className 定制样式方式改成 size 来配置
  factory_1.addSchemaFilter(function (scheam, renderer) {
      if (renderer.component !== FieldSet_1.FieldSetRenderer) {
          return scheam;
      }
      if (scheam.className &&
          !scheam.size &&
          /\bfieldset(?:\-(xs|sm|md|lg))?\b/.test(scheam.className)) {
          scheam = Object.assign(Object.assign({}, scheam), { size: RegExp.$1 || 'base', className: scheam.className.replace(/\bfieldset(?:\-(xs|sm|md|lg))?\b/, '') });
          delete scheam.btnClassName;
          delete scheam.btnActiveClassName;
      }
      return scheam;
  });
  // FieldSet  className 定制样式方式改成 size 来配置
  factory_1.addSchemaFilter(function (scheam, renderer) {
      if (renderer.component !== Service_1.ServiceRenderer) {
          return scheam;
      }
      if (scheam.body && scheam.body.controls) {
          scheam = Object.assign(Object.assign({}, scheam), { controls: scheam.body.controls });
          delete scheam.body;
      }
      return scheam;
  });
  // 原 reciever 错别字改为 receiver
  factory_1.addSchemaFilter(function (scheam, renderer) {
      if (renderer.component !== File_1.FileControlRenderer &&
          renderer.component !== Image_1.ImageControlRenderer &&
          renderer.component !== RichText_1.RichTextControlRenderer) {
          return scheam;
      }
      if (scheam.reciever) {
          scheam = Object.assign(Object.assign({}, scheam), { receiver: scheam.reciever });
          delete scheam.reciever;
      }
      if (scheam.videoReciever) {
          scheam = Object.assign(Object.assign({}, scheam), { videoReceiver: scheam.reciever });
          delete scheam.reciever;
      }
      return scheam;
  });
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tcGF0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL2NvbXBhdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUtBLHVDQUF5RTtBQUN6RSx3REFBa0U7QUFDbEUsa0RBQW9EO0FBQ3BELHdEQUEyRDtBQUMzRCxnREFBbUQ7QUFDbkQsMkNBQThDO0FBQzlDLDJDQUFrRDtBQUNsRCw4REFBd0U7QUFDeEUsMkNBQXFEO0FBQ3JELHNEQUF5RDtBQUN6RCxnREFBMEQ7QUFDMUQsa0RBQTREO0FBQzVELHdEQUFrRTtBQUVsRSxzREFBc0Q7QUFDdEQseUJBQWUsQ0FBQyxTQUFTLG1CQUFtQixDQUFDLE1BQWMsRUFBRSxRQUFRO0lBQ25FLElBQUksUUFBUSxDQUFDLFNBQVMsS0FBSyxrQ0FBdUIsRUFBRTtRQUNsRCxPQUFPLE1BQU0sQ0FBQztLQUNmO0lBRUQsSUFBSSxNQUFNLENBQUMsS0FBSyxJQUFJLE9BQU8sTUFBTSxDQUFDLE1BQU0sS0FBSyxXQUFXLEVBQUU7UUFDeEQsTUFBTSxxQkFDRCxNQUFNLENBQ1YsQ0FBQztRQUNGLE1BQU0sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQztRQUM3QixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDckI7SUFFRCxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDLENBQUMsQ0FBQztBQUVILFNBQVMsNEJBQTRCLENBQUMsTUFBVztJQUMvQyxNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7SUFDekIsSUFBSSxJQUFJLEdBQUcsS0FBSyxDQUFDO0lBRWpCLFFBQVEsQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2hELENBQUMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtRQUMxQixDQUFDLENBQUMsRUFBRSxDQUFDO0lBQ1AsUUFB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

});
