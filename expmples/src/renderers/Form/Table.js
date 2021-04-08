amis.define('src/renderers/Form/Table.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TableControlRenderer = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const Item_1 = require("src/renderers/Form/Item.tsx");
  const classnames_1 = tslib_1.__importDefault(require("node_modules/classnames/index"));
  const Button_1 = tslib_1.__importDefault(require("src/components/Button.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const api_1 = require("src/utils/api.ts");
  const tpl_1 = require("src/utils/tpl.ts");
  const omit_1 = tslib_1.__importDefault(require("node_modules/lodash/omit"));
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const findIndex_1 = tslib_1.__importDefault(require("node_modules/lodash/findIndex"));
  const memoize_1 = tslib_1.__importDefault(require("node_modules/lodash/memoize"));
  const SimpleMap_1 = require("src/utils/SimpleMap.ts");
  const icons_1 = require("src/components/icons.tsx");
  let FormTable = /** @class */ (() => {
      class FormTable extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.entityId = 1;
              this.subForms = {};
              this.editting = {};
              this.buildItems = memoize_1.default((value, editIndex) => {
                  return value.map((value, index) => index === editIndex ? this.state.editting : value);
              }, (...args) => JSON.stringify(args));
              this.state = {
                  columns: this.buildColumns(props),
                  editIndex: -1,
                  buildItemProps: this.buildItemProps.bind(this)
              };
              this.entries = new SimpleMap_1.SimpleMap();
              this.buildItemProps = this.buildItemProps.bind(this);
              this.confirmEdit = this.confirmEdit.bind(this);
              this.cancelEdit = this.cancelEdit.bind(this);
              this.handleSaveTableOrder = this.handleSaveTableOrder.bind(this);
              this.handleTableSave = this.handleTableSave.bind(this);
              this.getEntryId = this.getEntryId.bind(this);
              this.subFormRef = this.subFormRef.bind(this);
          }
          componentDidUpdate(nextProps) {
              const props = this.props;
              if (props.columns !== nextProps.columns) {
                  this.setState({
                      columns: this.buildColumns(props)
                  });
              }
          }
          componentWillUnmount() {
              var _a, _b;
              this.entries.dispose();
              (_b = (_a = this.buildItems.cache).clear) === null || _b === void 0 ? void 0 : _b.call(_a);
          }
          subFormRef(form, x, y) {
              this.subForms[`${x}-${y}`] = form;
          }
          validate() {
              const { value, minLength, maxLength, translate: __ } = this.props;
              // todo: 如果当前正在编辑中，表单提交了，应该先让正在编辑的东西提交然后再做验证。
              if (~this.state.editIndex) {
                  return __('Table.editing');
              }
              if (minLength && (!Array.isArray(value) || value.length < minLength)) {
                  return __('Combo.minLength', { minLength });
              }
              else if (maxLength && Array.isArray(value) && value.length > maxLength) {
                  return __('Combo.maxLength', { maxLength });
              }
              else {
                  const subForms = [];
                  Object.keys(this.subForms).forEach(key => this.subForms[key] && subForms.push(this.subForms[key]));
                  if (subForms.length) {
                      return Promise.all(subForms.map(item => item.validate())).then(values => {
                          if (~values.indexOf(false)) {
                              return __('Form.validateFailed');
                          }
                          return;
                      });
                  }
              }
          }
          async doAction(action, ctx, ...rest) {
              const { onAction, value, valueField, env, onChange, editable, addApi, translate: __ } = this.props;
              if (action.actionType === 'add') {
                  const rows = Array.isArray(value) ? value.concat() : [];
                  if (addApi || action.payload) {
                      let toAdd = null;
                      if (api_1.isEffectiveApi(addApi, ctx)) {
                          const payload = await env.fetcher(addApi, ctx);
                          if (payload && !payload.ok) {
                              env.notify('error', payload.msg || __('fetchFailed'));
                              return;
                          }
                          else if (payload && payload.ok) {
                              toAdd = payload.data;
                          }
                      }
                      else {
                          toAdd = tpl_builtin_1.dataMapping(action.payload, ctx);
                      }
                      toAdd = Array.isArray(toAdd) ? toAdd : [toAdd];
                      toAdd.forEach((toAdd) => {
                          const idx = findIndex_1.default(rows, item => item[valueField] == toAdd[valueField]);
                          // 应该只有配置了 valueField 的时候，才去删重复项
                          if (~idx && valueField) {
                              rows.splice(idx, 1);
                          }
                          rows.push(toAdd);
                      });
                      onChange(rows);
                      if (editable) {
                          this.startEdit(rows.length - 1, rows[rows.length - 1], true);
                      }
                      return;
                  }
                  else {
                      return this.addItem(rows.length - 1);
                  }
              }
              else if (action.actionType === 'remove' ||
                  action.actionType === 'delete') {
                  if (!valueField) {
                      return env.alert(__('Table.valueField'));
                  }
                  else if (!action.payload) {
                      return env.alert(__('Table.playload'));
                  }
                  const rows = Array.isArray(value) ? value.concat() : [];
                  let toRemove = tpl_builtin_1.dataMapping(action.payload, ctx);
                  toRemove = Array.isArray(toRemove) ? toRemove : [toRemove];
                  toRemove.forEach((toRemove) => {
                      const idx = findIndex_1.default(rows, item => item[valueField] == toRemove[valueField]);
                      if (~idx) {
                          rows.splice(idx, 1);
                      }
                  });
                  onChange(rows);
                  // todo 如果配置删除 Api 怎么办？
                  return;
              }
              return onAction && onAction(action, ctx, ...rest);
          }
          addItem(index, payload = this.props.scaffold) {
              const { value, onChange, needConfirm } = this.props;
              let newValue = Array.isArray(value) ? value.concat() : [];
              newValue.splice(index + 1, 0, Object.assign({}, payload));
              onChange(newValue);
              index = Math.min(index + 1, newValue.length - 1);
              if (needConfirm === false) {
                  onChange(newValue);
              }
              else {
                  this.startEdit(index, newValue[index], true);
              }
          }
          startEdit(index, editting, isCreate = false) {
              const value = this.props.value;
              const scaffold = this.props.scaffold;
              this.setState({
                  editIndex: index,
                  buildItemProps: this.buildItemProps.bind(this),
                  editting: (this.editting =
                      editting || (value && value[index]) || scaffold || {}),
                  isCreateMode: isCreate,
                  columns: this.state.isCreateMode === isCreate
                      ? this.state.columns.concat()
                      : this.buildColumns(this.props, isCreate)
              });
          }
          async confirmEdit() {
              const { value, onChange, scaffold, addApi, updateApi, data, env, translate: __ } = this.props;
              // form 是 lazyChange 的，先让他们 flush, 即把未提交的数据提交。
              const subForms = [];
              Object.keys(this.subForms).forEach(key => this.subForms[key] && subForms.push(this.subForms[key]));
              subForms.forEach(form => form.flush());
              let newValue = Array.isArray(value) ? value.concat() : [];
              let item = Object.assign({}, this.editting);
              const origin = newValue[this.state.editIndex];
              const isNew = !helper_1.isObjectShallowModified(scaffold, origin, false);
              let remote = null;
              if (isNew && api_1.isEffectiveApi(addApi, helper_1.createObject(data, item))) {
                  remote = await env.fetcher(addApi, helper_1.createObject(data, item));
              }
              else if (api_1.isEffectiveApi(updateApi, helper_1.createObject(data, item))) {
                  remote = await env.fetcher(updateApi, helper_1.createObject(data, item));
              }
              if (remote && !remote.ok) {
                  env.notify('error', remote.msg || __('saveFailed'));
                  return;
              }
              else if (remote && remote.ok) {
                  item = Object.assign(Object.assign({}, ((isNew ? addApi : updateApi).replaceData
                      ? {}
                      : item)), remote.data);
              }
              newValue.splice(this.state.editIndex, 1, item);
              this.setState({
                  editIndex: -1,
                  columns: this.state.columns.concat(),
                  buildItemProps: this.buildItemProps.bind(this),
                  editting: null
              });
              onChange(newValue);
          }
          cancelEdit() {
              const { value, onChange } = this.props;
              if (this.state.isCreateMode) {
                  let newValue = Array.isArray(value) ? value.concat() : [];
                  newValue.splice(this.state.editIndex, 1);
                  onChange(newValue);
              }
              this.setState({
                  editIndex: -1,
                  columns: this.state.columns.concat(),
                  buildItemProps: this.buildItemProps.bind(this)
              });
          }
          async removeItem(index) {
              const { value, onChange, deleteApi, deleteConfirmText, env, data, translate: __ } = this.props;
              let newValue = Array.isArray(value) ? value.concat() : [];
              const item = newValue[index];
              if (!item) {
                  return;
              }
              const ctx = helper_1.createObject(data, item);
              if (api_1.isEffectiveApi(deleteApi, ctx)) {
                  const confirmed = await env.confirm(deleteConfirmText ? tpl_1.filter(deleteConfirmText, ctx) : __('deleteConfirm'));
                  if (!confirmed) {
                      // 如果不确认，则跳过！
                      return;
                  }
                  const result = await env.fetcher(deleteApi, ctx);
                  if (!result.ok) {
                      env.notify('error', __('deleteFailed'));
                      return;
                  }
              }
              this.removeEntry(item);
              newValue.splice(index, 1);
              onChange(newValue);
          }
          buildItemProps(item, index) {
              if (!this.props.editable) {
                  return null;
              }
              return {
                  quickEditEnabled: this.state.editIndex === index
              };
          }
          buildColumns(props, isCreateMode = false) {
              const env = this.props.env;
              let columns = Array.isArray(props.columns)
                  ? props.columns.concat()
                  : [];
              const ns = this.props.classPrefix;
              const __ = this.props.translate;
              const needConfirm = this.props.needConfirm;
              let btns = [];
              if (props.addable && props.showAddBtn !== false) {
                  btns.push({
                      children: ({ key, rowIndex }) => ~this.state.editIndex && needConfirm !== false ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.addRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: this.addItem.bind(this, rowIndex, undefined) },
                          props.addBtnLabel ? react_1.default.createElement("span", null, props.addBtnLabel) : null,
                          props.addBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.addBtnIcon, className: "icon" })) : null))
                  });
              }
              if (props.needConfirm === false) {
                  columns = columns.map(column => {
                      const quickEdit = column.quickEdit;
                      return quickEdit === false
                          ? omit_1.default(column, ['quickEdit'])
                          : Object.assign(Object.assign({}, column), { quickEdit: Object.assign(Object.assign({ type: 'text' }, quickEdit), { saveImmediately: true, mode: 'inline' }) });
                  });
              }
              else if (props.editable) {
                  columns = columns.map(column => {
                      const quickEdit = !isCreateMode && column.hasOwnProperty('quickEditOnUpdate')
                          ? column.quickEditOnUpdate
                          : column.quickEdit;
                      return quickEdit === false
                          ? omit_1.default(column, ['quickEdit'])
                          : Object.assign(Object.assign({}, column), { quickEdit: Object.assign(Object.assign({ type: 'text' }, quickEdit), { saveImmediately: true, mode: 'inline' }) });
                  });
                  btns.push({
                      children: ({ key, rowIndex, data }) => ~this.state.editIndex || (data && data.__isPlaceholder) ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.editRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: () => this.startEdit(rowIndex) },
                          props.updateBtnLabel ? (react_1.default.createElement("span", null, props.updateBtnLabel)) : null,
                          props.updateBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.updateBtnIcon, className: "icon" })) : null))
                  });
                  btns.push({
                      children: ({ key, rowIndex }) => this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('save'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: this.confirmEdit },
                          props.confirmBtnLabel ? (react_1.default.createElement("span", null, props.confirmBtnLabel)) : null,
                          props.confirmBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.confirmBtnIcon, className: "icon" })) : null)) : null
                  });
                  btns.push({
                      children: ({ key, rowIndex }) => this.state.editIndex === rowIndex ? (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('cancle'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: this.cancelEdit },
                          props.cancelBtnLabel ? (react_1.default.createElement("span", null, props.cancelBtnLabel)) : null,
                          props.cancelBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.cancelBtnIcon, className: "icon" })) : null)) : null
                  });
              }
              if (props.removable) {
                  btns.push({
                      children: ({ key, rowIndex, data }) => (~this.state.editIndex || (data && data.__isPlaceholder)) &&
                          needConfirm !== false ? null : (react_1.default.createElement(Button_1.default, { classPrefix: ns, size: "sm", key: key, level: "link", tooltip: __('Table.deleteRow'), tooltipContainer: env && env.getModalContainer ? env.getModalContainer : undefined, onClick: this.removeItem.bind(this, rowIndex) },
                          props.deleteBtnLabel ? (react_1.default.createElement("span", null, props.deleteBtnLabel)) : null,
                          props.deleteBtnIcon ? (react_1.default.createElement(icons_1.Icon, { icon: props.deleteBtnIcon, className: "icon" })) : null))
                  });
              }
              if (btns.length) {
                  columns.push({
                      type: 'operation',
                      buttons: btns,
                      label: __('Table.operation'),
                      className: 'v-middle nowrap',
                      fixed: 'right',
                      width: '1%',
                      innerClassName: 'm-n'
                  });
              }
              return columns;
          }
          handleTableSave(rows, diff, rowIndexes) {
              const { onChange, value, needConfirm } = this.props;
              const newValue = Array.isArray(value) ? value.concat() : [];
              if (~this.state.editIndex) {
                  this.setState({
                      editting: (this.editting = Object.assign({}, rows))
                  });
                  return;
              }
              else if (Array.isArray(rows)) {
                  rowIndexes.forEach((rowIndex, index) => {
                      const data = Object.assign(Object.assign({}, newValue.splice(rowIndex, 1)[0]), diff[index]);
                      newValue.splice(rowIndex, 0, data);
                  });
              }
              else {
                  const idx = rowIndexes;
                  const origin = newValue[idx];
                  const data = Object.assign(Object.assign({}, newValue.splice(idx, 1)[0]), diff);
                  newValue.splice(rowIndexes, 0, data);
                  this.entries.set(data, this.entries.get(origin) || this.entityId++);
                  // this.entries.delete(origin); // 反正最后都会清理的，先不删了吧。
              }
              onChange(newValue);
          }
          handleSaveTableOrder(moved, rows) {
              const { onChange } = this.props;
              onChange(rows.map((item) => (Object.assign({}, item))));
          }
          removeEntry(entry) {
              if (this.entries.has(entry)) {
                  this.entries.delete(entry);
              }
          }
          getEntryId(entry) {
              if (entry === this.state.editting) {
                  return 'editting';
              }
              else if (!this.entries.has(entry)) {
                  this.entries.set(entry, this.entityId++);
              }
              return String(this.entries.get(entry));
          }
          render() {
              const { className, value, showAddBtn, disabled, render, placeholder, draggable, addable, columnsTogglable, combineNum, translate: __, canAccessSuperData, affixRow, prefixRow } = this.props;
              return (react_1.default.createElement("div", { className: classnames_1.default('form-control-table', className) }, render('body', {
                  type: 'table',
                  placeholder: __(placeholder),
                  columns: this.state.columns,
                  affixHeader: false,
                  prefixRow,
                  affixRow
              }, {
                  value: undefined,
                  saveImmediately: true,
                  disabled,
                  draggable: draggable && !~this.state.editIndex,
                  items: this.buildItems(Array.isArray(value) && value.length
                      ? value
                      : addable && showAddBtn !== false
                          ? [{ __isPlaceholder: true }]
                          : [], this.state.editIndex),
                  getEntryId: this.getEntryId,
                  onSave: this.handleTableSave,
                  onSaveOrder: this.handleSaveTableOrder,
                  buildItemProps: this.state.buildItemProps,
                  quickEditFormRef: this.subFormRef,
                  columnsTogglable: columnsTogglable,
                  combineNum: combineNum,
                  canAccessSuperData
              })));
          }
      }
      FormTable.defaultProps = {
          placeholder: '空',
          scaffold: {},
          addBtnIcon: 'plus',
          updateBtnIcon: 'pencil',
          deleteBtnIcon: 'minus',
          confirmBtnIcon: 'check',
          cancelBtnIcon: 'close',
          valueField: ''
      };
      FormTable.propsList = [
          'onChange',
          'name',
          'columns',
          'label',
          'scaffold',
          'showAddBtn',
          'addable',
          'removable',
          'editable',
          'addApi',
          'updateApi',
          'deleteApi',
          'needConfirm',
          'canAccessSuperData'
      ];
      return FormTable;
  })();
  exports.default = FormTable;
  let TableControlRenderer = /** @class */ (() => {
      let TableControlRenderer = class TableControlRenderer extends FormTable {
      };
      TableControlRenderer = tslib_1.__decorate([
          Item_1.FormItem({
              test: /(^|\/)form(?:\/.+)?\/control\/table$/,
              name: 'table-control'
          })
      ], TableControlRenderer);
      return TableControlRenderer;
  })();
  exports.TableControlRenderer = TableControlRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJmaWxlOi8vL0Q6L215X3Byby9iYWlkdS1hbWlzLW1hc3RlciAoMSkvYW1pcy9zcmMvcmVuZGVyZXJzL0Zvcm0vVGFibGUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwwREFBMEI7QUFDMUIsaUNBQW1FO0FBQ25FLG9FQUE0QjtBQUM1Qiw2RUFBNkM7QUFDN0MsK0NBQXlFO0FBRXpFLHlDQUErQztBQUMvQyx5Q0FBdUM7QUFDdkMsK0RBQStCO0FBQy9CLHlEQUFvRDtBQUNwRCx5RUFBeUM7QUFDekMscUVBQXFDO0FBQ3JDLHFEQUFnRDtBQUNoRCxrREFBNEM7QUEwSTVDO0lBQUEsTUFBcUIsU0FBVSxTQUFRLGVBQUssQ0FBQyxTQUFpQztRQWlDNUUsWUFBWSxLQUFpQjtZQUMzQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFKZixhQUFRLEdBQVcsQ0FBQyxDQUFDO1lBQ3JCLGFBQVEsR0FBUSxFQUFFLENBQUM7WUFDbkIsYUFBUSxHQUFRLEVBQUUsQ0FBQztZQStqQm5CLGVBQVUsR0FBRyxpQkFBTyxDQUNsQixDQUFDLEtBQWlCLEVBQUUsU0FBaUIsRUFBRSxFQUFFO2dCQUN2QyxPQUFPLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsS0FBYSxFQUFFLEVBQUUsQ0FDN0MsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FDbEQsQ0FBQztZQUNKLENBQUMsRUFDRCxDQUFDLEdBQUcsSUFBZ0IsRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FDOUMsQ0FBQztZQWxrQkEsSUFBSSxDQUFDLEtBQUssR0FBRztnQkFDWCxPQUFPLEVBQUUsSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUM7Z0JBQ2pDLFNBQVMsRUFBRSxDQUFDLENB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

});
