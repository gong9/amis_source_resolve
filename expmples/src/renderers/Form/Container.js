amis.define('src/renderers/Form/Container.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ContainerControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Container_1 = tslib_1.__importDefault(require("src/renderers/Container.tsx"));
  const Item_1 = tslib_1.__importDefault(require("src/renderers/Form/Item.tsx"));
  let ContainerControlRenderer = /** @class */ (() => {
      let ContainerControlRenderer = class ContainerControlRenderer extends Container_1.default {
          renderBody() {
              const { renderFormItems, body, bodyClassName, controls, tabs, fieldSet, mode, formMode, horizontal, $path, classPrefix: ns, store, render } = this.props;
              if (!body && (controls || tabs || fieldSet)) {
                  let props = {
                      store,
                      data: store.data,
                      render
                  };
                  mode && (props.mode = mode);
                  horizontal && (props.horizontal = horizontal);
                  return (react_1.default.createElement("div", { className: classnames_1.default(`${ns}Form--${props.mode || formMode || 'normal'}`, bodyClassName) }, renderFormItems({
                      controls,
                      tabs,
                      fieldSet
                  }, $path.replace(/^.*form\//, ''), props)));
              }
              return super.renderBody();
          }
      };
      ContainerControlRenderer.propsList = ['onChange'];
      ContainerControlRenderer = tslib_1.__decorate([
          Item_1.default({
              type: 'container',
              strictMode: false,
              sizeMutable: false
          })
      ], ContainerControlRenderer);
      return ContainerControlRenderer;
  })();
  exports.ContainerControlRenderer = ContainerControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmlsZTovLy9EOi9teV9wcm8vYmFpZHUtYW1pcy1tYXN0ZXIgKDEpL2FtaXMvc3JjL3JlbmRlcmVycy9Gb3JtL0NvbnRhaW5lci50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUUxQixvRUFBNEI7QUFDNUIscUVBQXdEO0FBQ3hELDBEQUlnQjtBQXdDaEI7SUFBQSxJQUFhLHdCQUF3QixHQUFyQyxNQUFhLHdCQUF5QixTQUFRLG1CQUF5QjtRQUdyRSxVQUFVO1lBQ1IsTUFBTSxFQUNKLGVBQWUsRUFDZixJQUFJLEVBQ0osYUFBYSxFQUNiLFFBQVEsRUFDUixJQUFJLEVBQ0osUUFBUSxFQUNSLElBQUksRUFDSixRQUFRLEVBQ1IsVUFBVSxFQUNWLEtBQUssRUFDTCxXQUFXLEVBQUUsRUFBRSxFQUNmLEtBQUssRUFDTCxNQUFNLEVBQ1AsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRWYsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLEVBQUU7Z0JBQzNDLElBQUksS0FBSyxHQUFRO29CQUNmLEtBQUs7b0JBQ0wsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJO29CQUNoQixNQUFNO2lCQUNQLENBQUM7Z0JBQ0YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsQ0FBQztnQkFDNUIsVUFBVSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsQ0FBQztnQkFFOUMsT0FBTyxDQUNMLHVDQUNFLFNBQVMsRUFBRSxvQkFBRSxDQUNYLEdBQUcsRUFBRSxTQUFTLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxJQUFJLFFBQVEsRUFBRSxFQUNsRCxhQUFhLENBQ2QsSUFFQSxlQUFlLENBQ2Q7b0JBQ0UsUUFBUTtvQkFDUixJQUFJO29CQUNKLFFBQVE7aUJBQ1QsRUFDQSxLQUFnQixDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLEVBQzFDLEtBQUssQ0FDTixDQUNHLENBQ1AsQ0FBQzthQUNIO1lBRUQsT0FBTyxLQUFLLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDNUIsQ0FBQztLQUNGLENBQUE7SUFsRFEsa0NBQVMsR0FBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQURwQyx3QkFBd0I7UUFMcEMsY0FBUSxDQUFDO1lBQ1IsSUFBSSxFQUFFLFdBQVc7WUFDakIsVUFBVSxFQUFFLEtBQUs7WUFDakIsV0FBVyxFQUFFLEtBQUs7U0FDbkIsQ0FBQztPQUNXLHdCQUF3QixDQW1EcEM7SUFBRCwrQkFBQztLQUFBO0FBbkRZLDREQUF3QiJ9

});
