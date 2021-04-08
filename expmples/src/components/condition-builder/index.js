amis.define('src/components/condition-builder/index.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.QueryBuilder = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const theme_1 = require("src/theme.tsx");
  const locale_1 = require("src/locale.tsx");
  const uncontrollable_1 = require("node_modules/uncontrollable/cjs/index");
  const Group_1 = tslib_1.__importDefault(require("src/components/condition-builder/Group.tsx"));
  const config_1 = tslib_1.__importDefault(require("src/components/condition-builder/config.ts"));
  const helper_1 = require("src/utils/helper.ts");
  const Animation_1 = tslib_1.__importDefault(require("src/utils/Animation.ts"));
  let QueryBuilder = /** @class */ (() => {
      var _a, _b, _c;
      class QueryBuilder extends react_1.default.Component {
          constructor() {
              super(...arguments);
              this.config = Object.assign(Object.assign({}, config_1.default), this.props.config);
              this.lastMoveAt = 0;
          }
          handleDragStart(e) {
              const target = e.currentTarget;
              const item = target.closest('[data-id]');
              this.dragTarget = item;
              // this.dragNextSibling = item.nextElementSibling;
              this.host = item.closest('[data-group-id]');
              const ghost = item.cloneNode(true);
              ghost.classList.add('is-ghost');
              this.ghost = ghost;
              e.dataTransfer.setDragImage(item.firstChild, 0, 0);
              target.addEventListener('dragend', this.handleDragEnd);
              document.body.addEventListener('dragover', this.handleDragOver);
              document.body.addEventListener('drop', this.handleDragDrop);
              this.lastX = e.clientX;
              this.lastY = e.clientY;
              // 应该是 chrome 的一个bug，如果你马上修改，会马上执行 dragend
              setTimeout(() => {
                  item.classList.add('is-dragging');
                  // item.parentElement!.insertBefore(
                  //   item,
                  //   item.parentElement!.firstElementChild
                  // ); // 挪到第一个，主要是因为样式问题。
              }, 5);
          }
          handleDragOver(e) {
              e.preventDefault();
              const item = e.target.closest('[data-id]');
              const dx = e.clientX - this.lastX;
              const dy = e.clientY - this.lastY;
              const d = Math.max(Math.abs(dx), Math.abs(dy));
              const now = Date.now();
              // 没移动还是不要处理，免得晃动个不停。
              if (d < 5) {
                  if (this.lastMoveAt === 0) {
                  }
                  else if (now - this.lastMoveAt > 500) {
                      const host = e.target.closest('[data-group-id]');
                      if (host) {
                          this.host = host;
                          this.lastMoveAt = now;
                          this.lastX = 0;
                          this.lastY = 0;
                          this.handleDragOver(e);
                          return;
                      }
                  }
                  return;
              }
              this.lastMoveAt = now;
              this.lastX = e.clientX;
              this.lastY = e.clientY;
              if (!item ||
                  item.classList.contains('is-ghost') ||
                  item.closest('[data-group-id]') !== this.host) {
                  return;
              }
              const container = item.parentElement;
              const children = [].slice.apply(container.children);
              const idx = children.indexOf(item);
              if (this.ghost.parentElement !== container) {
                  container.appendChild(this.ghost);
              }
              const rect = item.getBoundingClientRect();
              const isAfter = dy > 0 && e.clientY > rect.top + rect.height / 2;
              const gIdx = isAfter ? idx : idx - 1;
              const cgIdx = children.indexOf(this.ghost);
              if (gIdx !== cgIdx) {
                  Animation_1.default.capture(container);
                  if (gIdx === children.length - 1) {
                      container.appendChild(this.ghost);
                  }
                  else {
                      container.insertBefore(this.ghost, children[gIdx + 1]);
                  }
                  Animation_1.default.animateAll();
              }
          }
          handleDragDrop() {
              const onChange = this.props.onChange;
              const fromId = this.dragTarget.getAttribute('data-id');
              const toId = this.host.getAttribute('data-group-id');
              const children = [].slice.call(this.ghost.parentElement.children);
              const idx = children.indexOf(this.dragTarget);
              if (~idx) {
                  children.splice(idx, 1);
              }
              const toIndex = children.indexOf(this.ghost);
              let value = this.props.value;
              const indexes = helper_1.findTreeIndex([value], item => item.id === fromId);
              if (indexes) {
                  const origin = helper_1.getTree([value], indexes.concat());
                  [value] = helper_1.spliceTree([value], indexes, 1);
                  const indexes2 = helper_1.findTreeIndex([value], item => item.id === toId);
                  if (indexes2) {
                      [value] = helper_1.spliceTree([value], indexes2.concat(toIndex), 0, origin);
                      onChange(value);
                  }
              }
          }
          handleDragEnd(e) {
              var _a;
              const target = e.target;
              target.removeEventListener('dragend', this.handleDragEnd);
              document.body.removeEventListener('dragover', this.handleDragOver);
              document.body.removeEventListener('drop', this.handleDragDrop);
              this.dragTarget.classList.remove('is-dragging');
              // if (this.dragNextSibling) {
              //   this.dragTarget.parentElement!.insertBefore(
              //     this.dragTarget,
              //     this.dragNextSibling
              //   );
              // } else {
              //   this.dragTarget.parentElement!.appendChild(this.dragTarget);
              // }
              delete this.dragTarget;
              // delete this.dragNextSibling;
              (_a = this.ghost.parentElement) === null || _a === void 0 ? void 0 : _a.removeChild(this.ghost);
              delete this.ghost;
          }
          render() {
              const { classnames: cx, fields, funcs, onChange, value, showNot, data } = this.props;
              const normalizedValue = Array.isArray(value === null || value === void 0 ? void 0 : value.children)
                  ? Object.assign(Object.assign({}, value), { children: helper_1.mapTree(value.children, (value) => {
                          if (value.id) {
                              return value;
                          }
                          return Object.assign(Object.assign({}, value), { id: helper_1.guid() });
                      }) }) : value;
              return (react_1.default.createElement(Group_1.default, { config: this.config, funcs: funcs || this.config.funcs, fields: fields || this.config.fields, value: normalizedValue, onChange: onChange, classnames: cx, removeable: false, onDragStart: this.handleDragStart, showNot: showNot, data: data }));
          }
      }
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof react_1.default !== "undefined" && react_1.default.DragEvent) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], QueryBuilder.prototype, "handleDragStart", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof DragEvent !== "undefined" && DragEvent) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], QueryBuilder.prototype, "handleDragOver", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], QueryBuilder.prototype, "handleDragDrop", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Event !== "undefined" && Event) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], QueryBuilder.prototype, "handleDragEnd", null);
      return QueryBuilder;
  })();
  exports.QueryBuilder = QueryBuilder;
  exports.default = theme_1.themeable(locale_1.localeable(uncontrollable_1.uncontrollable(QueryBuilder, {
      value: 'onChange'
  })));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvY29tcG9uZW50cy9jb25kaXRpb24tYnVpbGRlci9pbmRleC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix1Q0FBa0Q7QUFDbEQseUNBQXFEO0FBQ3JELG1EQUE4QztBQUU5Qyw0REFBcUM7QUFDckMsOERBQStDO0FBQy9DLCtDQU80QjtBQUU1Qiw4RUFBNkM7QUFZN0M7O0lBQUEsTUFBYSxZQUFhLFNBQVEsZUFBSyxDQUFDLFNBQWdDO1FBQXhFOztZQUNFLFdBQU0sbUNBQU8sZ0JBQWEsR0FBSyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRTtZQVFsRCxlQUFVLEdBQVcsQ0FBQyxDQUFDO1FBb016QixDQUFDO1FBak1DLGVBQWUsQ0FBQyxDQUFrQjtZQUNoQyxNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUMsYUFBYSxDQUFDO1lBQy9CLE1BQU0sSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFnQixDQUFDO1lBQ3hELElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1lBQ3ZCLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQWdCLENBQUM7WUFFM0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQWdCLENBQUM7WUFDbEQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7WUFFbkIsQ0FBQyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFVBQXlCLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBRWxFLE1BQU0sQ0FBQyxn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

});
