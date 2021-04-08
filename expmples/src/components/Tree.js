amis.define('src/components/Tree.tsx', function(require, exports, module, define) {

  "use strict";
  /**
   * @file Tree
   * @description 树形组件
   * @author fex
   */
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.TreeSelector = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const helper_1 = require("src/utils/helper.ts");
  const Select_1 = require("src/components/Select.tsx");
  const theme_1 = require("src/theme.tsx");
  const Options_1 = require("src/renderers/Form/Options.tsx");
  const icons_1 = require("src/components/icons.tsx");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const locale_1 = require("src/locale.tsx");
  let TreeSelector = /** @class */ (() => {
      var _a, _b, _c, _d, _e;
      class TreeSelector extends react_1.default.Component {
          componentWillMount() {
              const props = this.props;
              this.setState({
                  value: Select_1.value2array(props.value, {
                      multiple: props.multiple,
                      delimiter: props.delimiter,
                      valueField: props.valueField,
                      options: props.options
                  }),
                  unfolded: this.syncUnFolded(props),
                  inputValue: '',
                  addingParent: null,
                  isAdding: false,
                  isEditing: false,
                  editingItem: null
              });
          }
          componentWillReceiveProps(nextProps) {
              const toUpdate = {};
              if (this.props.value !== nextProps.value ||
                  this.props.options !== nextProps.options) {
                  toUpdate.value = Select_1.value2array(nextProps.value, {
                      multiple: nextProps.multiple,
                      delimiter: nextProps.delimiter,
                      valueField: nextProps.valueField,
                      options: nextProps.options
                  });
              }
              if (this.props.options !== nextProps.options) {
                  toUpdate.unfolded = this.syncUnFolded(nextProps);
              }
              this.setState(toUpdate);
          }
          syncUnFolded(props) {
              // 初始化树节点的展开状态
              let unfolded = {};
              const { foldedField, unfoldedField } = this.props;
              helper_1.eachTree(props.options, (node, index, level) => {
                  if (node.children && node.children.length) {
                      let ret = true;
                      if (unfoldedField && typeof node[unfoldedField] !== 'undefined') {
                          ret = !!node[unfoldedField];
                      }
                      else if (foldedField && typeof node[foldedField] !== 'undefined') {
                          ret = !node[foldedField];
                      }
                      else {
                          ret = !!props.initiallyOpen;
                          if (!ret && level <= props.unfoldedLevel) {
                              ret = true;
                          }
                      }
                      unfolded[node[props.valueField]] = ret;
                  }
              });
              return unfolded;
          }
          toggleUnfolded(node) {
              this.setState({
                  unfolded: Object.assign(Object.assign({}, this.state.unfolded), { [node[this.props.valueField]]: !this.state.unfolded[node[this.props.valueField]] })
              });
          }
          clearSelect() {
              this.setState({
                  value: []
              }, () => {
                  const { joinValues, rootValue, onChange } = this.props;
                  onChange(joinValues ? rootValue : []);
              });
          }
          handleSelect(node, value) {
              this.setState({
                  value: [node]
              }, () => {
                  const { joinValues, valueField, onChange } = this.props;
                  onChange(joinValues ? node[valueField] : node);
              });
          }
          handleCheck(item, checked) {
              const props = this.props;
              const value = this.state.value.concat();
              const idx = value.indexOf(item);
              const onlyChildren = props.onlyChildren;
              if (checked) {
                  ~idx || value.push(item);
                  // cascade 为 true 表示父节点跟子节点没有级联关系。
                  if (!props.cascade) {
                      const children = item.children ? item.children.concat([]) : [];
                      if (onlyChildren) {
                          // 父级选中的时候，子节点也都选中，但是自己不选中
                          !~idx && children.length && value.pop();
                          while (children.length) {
                              let child = children.shift();
                              let index = value.indexOf(child);
                              if (child.children) {
                                  children.push.apply(children, child.children);
                              }
                              else if (!~index && child.value !== 'undefined') {
                                  value.push(child);
                              }
                          }
                      }
                      else {
                          // 只要父节点选择了,子节点就不需要了,全部去掉勾选.  withChildren时相反
                          while (children.length) {
                              let child = children.shift();
                              let index = value.indexOf(child);
                              if (~index) {
                                  value.splice(index, 1);
                              }
                              if (props.withChildren) {
                                  value.push(child);
                              }
                              if (child.children && child.children.length) {
                                  children.push.apply(children, child.children);
                              }
                          }
                          let toCheck = item;
                          while (true) {
                              const parent = helper_1.getTreeParent(props.options, toCheck);
                              if (parent === null || parent === void 0 ? void 0 : parent.value) {
                                  // 如果所有孩子节点都勾选了，应该自动勾选父级。
                                  if (parent.children.every((child) => ~value.indexOf(child))) {
                                      if (!props.withChildren) {
                                          parent.children.forEach((child) => {
                                              const index = value.indexOf(child);
                                              if (~index) {
                                                  value.splice(index, 1);
                                              }
                                          });
                                      }
                                      value.push(parent);
                                      toCheck = parent;
                                      continue;
                                  }
                              }
                              break;
                          }
                      }
                  }
              }
              else {
                  ~idx && value.splice(idx, 1);
                  if (!props.cascade && (props.withChildren || onlyChildren)) {
                      const children = item.children ? item.children.concat([]) : [];
                      while (children.length) {
                          let child = children.shift();
                          let index = value.indexOf(child);
                          if (~index) {
                              value.splice(index, 1);
                          }
                          if (child.children && child.children.length) {
                              children.push.apply(children, child.children);
                          }
                      }
                  }
              }
              this.setState({
                  value
              }, () => {
                  const { joinValues, extractValue, valueField, delimiter, onChange } = props;
                  onChange(joinValues
                      ? value.map(item => item[valueField]).join(delimiter)
                      : extractValue
                          ? value.map(item => item[valueField])
                          : value);
              });
          }
          handleAdd(parent = null) {
              const { bultinCUD, onAdd, options } = this.props;
              if (!bultinCUD) {
                  const idxes = helper_1.findTreeIndex(options, item => item === parent) || [];
                  return onAdd && onAdd(idxes.concat(0));
              }
              else {
                  this.setState({
                      isEditing: false,
                      isAdding: true,
                      addingParent: parent
                  });
              }
          }
          handleEdit(item) {
              const { bultinCUD, onEdit, labelField, options } = this.props;
              if (!bultinCUD) {
                  onEdit === null || onEdit === void 0 ? void 0 : onEdit(item);
              }
              else {
                  this.setState({
                      isEditing: true,
                      isAdding: false,
                      editingItem: item,
                      inputValue: item[labelField]
                  });
              }
          }
          handleRemove(item) {
              const { onDelete } = this.props;
              onDelete && onDelete(item);
          }
          handleInputChange(e) {
              this.setState({
                  inputValue: e.currentTarget.value
              });
          }
          handleConfirm() {
              const { inputValue: value, isAdding, addingParent, editingItem, isEditing } = this.state;
              if (!value) {
                  return;
              }
              const { labelField, onAdd, options, onEdit } = this.props;
              this.setState({
                  inputValue: '',
                  isAdding: false,
                  isEditing: false
              }, () => {
                  if (isAdding && onAdd) {
                      const idxes = (addingParent &&
                          helper_1.findTreeIndex(options, item => item === addingParent)) ||
                          [];
                      onAdd(idxes.concat(0), { [labelField]: value }, true);
                  }
                  else if (isEditing && onEdit) {
                      onEdit(Object.assign(Object.assign({}, editingItem), { [labelField]: value }), editingItem, true);
                  }
              });
          }
          handleCancel() {
              this.setState({
                  inputValue: '',
                  isAdding: false,
                  isEditing: false
              });
          }
          renderInput(prfix = null) {
              const { classnames: cx, translate: __ } = this.props;
              const { inputValue } = this.state;
              return (react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
                  react_1.default.createElement("div", { className: cx('Tree-itemInput') },
                      prfix,
                      react_1.default.createElement("input", { onChange: this.handleInputChange, value: inputValue, placeholder: __('placeholder.enter') }),
                      react_1.default.createElement("a", { "data-tooltip": __('cancle'), onClick: this.handleCancel },
                          react_1.default.createElement(icons_1.Icon, { icon: "close", className: "icon" })),
                      react_1.default.createElement("a", { "data-tooltip": __('confirm'), onClick: this.handleConfirm },
                          react_1.default.createElement(icons_1.Icon, { icon: "check", className: "icon" })))));
          }
          renderList(list, value, uncheckable) {
              const { itemClassName, showIcon, showRadio, multiple, disabled, labelField, valueField, iconField, disabledField, cascade, selfDisabledAffectChildren, onlyChildren, classnames: cx, highlightTxt, options, maxLength, minLength, creatable, editable, removable, createTip, editTip, removeTip, translate: __ } = this.props;
              const { unfolded, value: stateValue, isAdding, addingParent, editingItem, isEditing } = this.state;
              let childrenChecked = 0;
              let ret = list.map((item, key) => {
                  if (!helper_1.isVisible(item, options)) {
                      return null;
                  }
                  const checked = !!~value.indexOf(item);
                  const selfDisabled = item[disabledField];
                  let selfChecked = !!uncheckable || checked;
                  let childrenItems = null;
                  let selfChildrenChecked = false;
                  if (item.children && item.children.length) {
                      childrenItems = this.renderList(item.children, value, cascade
                          ? false
                          : uncheckable ||
                              (selfDisabledAffectChildren ? selfDisabled : false) ||
                              (multiple && checked));
                      selfChildrenChecked = !!childrenItems.childrenChecked;
                      if (!selfChecked &&
                          onlyChildren &&
                          item.children.length === childrenItems.childrenChecked) {
                          selfChecked = true;
                      }
                      childrenItems = childrenItems.dom;
                  }
                  if ((onlyChildren ? selfChecked : selfChildrenChecked) || checked) {
                      childrenChecked++;
                  }
                  let nodeDisabled = !!uncheckable || !!disabled || selfDisabled;
                  if (!nodeDisabled &&
                      ((maxLength && !selfChecked && stateValue.length >= maxLength) ||
                          (minLength && selfChecked && stateValue.length <= minLength))) {
                      nodeDisabled = true;
                  }
                  const checkbox = multiple ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: selfChecked || (!cascade && selfChildrenChecked), partial: !selfChecked, onChange: this.handleCheck.bind(this, item, !selfChecked) })) : showRadio ? (react_1.default.createElement(Checkbox_1.default, { size: "sm", disabled: nodeDisabled, checked: checked, onChange: this.handleSelect.bind(this, item) })) : null;
                  const isLeaf = (!item.children || !item.children.length) && !item.placeholder;
                  return (react_1.default.createElement("li", { key: key, className: cx(`Tree-item ${itemClassName || ''}`, {
                          'Tree-item--isLeaf': isLeaf
                      }) },
                      isEditing && editingItem === item ? (this.renderInput(checkbox)) : (react_1.default.createElement("div", { className: cx('Tree-itemLabel', {
                              'is-children-checked': multiple && !cascade && selfChildrenChecked && !nodeDisabled,
                              'is-checked': checked,
                              'is-disabled': nodeDisabled
                          }) },
                          !isLeaf ? (react_1.default.createElement("div", { onClick: () => this.toggleUnfolded(item), className: cx('Tree-itemArrow', {
                                  'is-folded': !unfolded[item[valueField]]
                              }) },
                              react_1.default.createElement(icons_1.Icon, { icon: "right-arrow-bold", className: "icon" }))) : (react_1.default.createElement("span", { className: cx('Tree-itemArrowPlaceholder') })),
                          checkbox,
                          showIcon ? (react_1.default.createElement("i", { className: cx(`Tree-itemIcon ${item[iconField] ||
                                  (childrenItems ? 'Tree-folderIcon' : 'Tree-leafIcon')}`), onClick: () => !nodeDisabled &&
                                  (multiple
                                      ? this.handleCheck(item, !selfChecked)
                                      : this.handleSelect(item)) },
                              react_1.default.createElement(icons_1.Icon, { icon: childrenItems ? 'folder' : 'file', className: "icon" }))) : null,
                          react_1.default.createElement("span", { className: cx('Tree-itemText'), onClick: () => !nodeDisabled &&
                                  (multiple
                                      ? this.handleCheck(item, !selfChecked)
                                      : this.handleSelect(item)) }, highlightTxt
                              ? Options_1.highlight(`${item[labelField]}`, highlightTxt)
                              : `${item[labelField]}`),
                          !nodeDisabled && !isAdding && !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') },
                              creatable && helper_1.hasAbility(item, 'creatable') ? (react_1.default.createElement("a", { onClick: this.handleAdd.bind(this, item), "data-tooltip": __(createTip), "data-position": "left" },
                                  react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null,
                              removable && helper_1.hasAbility(item, 'removable') ? (react_1.default.createElement("a", { onClick: this.handleRemove.bind(this, item), "data-tooltip": __(removeTip), "data-position": "left" },
                                  react_1.default.createElement(icons_1.Icon, { icon: "minus", className: "icon" }))) : null,
                              editable && helper_1.hasAbility(item, 'editable') ? (react_1.default.createElement("a", { onClick: this.handleEdit.bind(this, item), "data-tooltip": __(editTip), "data-position": "left" },
                                  react_1.default.createElement(icons_1.Icon, { icon: "pencil", className: "icon" }))) : null)) : null)),
                      (childrenItems && unfolded[item[valueField]]) ||
                          (isAdding && addingParent === item) ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                          isAdding && addingParent === item ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput(checkbox
                              ? react_1.default.cloneElement(checkbox, {
                                  checked: false,
                                  disabled: true
                              })
                              : null))) : null,
                          childrenItems)) : !childrenItems &&
                          item.placeholder &&
                          unfolded[item[valueField]] ? (react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                          react_1.default.createElement("li", { className: cx('Tree-item') },
                              react_1.default.createElement("div", { className: cx('Tree-placeholder') }, item.placeholder)))) : null));
              });
              return {
                  dom: ret,
                  childrenChecked
              };
          }
          render() {
              const { className, placeholder, hideRoot, rootLabel, showIcon, classnames: cx, creatable, rootCreatable, rootCreateTip, disabled, translate: __ } = this.props;
              let options = this.props.options;
              const { value, isAdding, addingParent, isEditing, inputValue } = this.state;
              let addBtn = null;
              if (creatable && rootCreatable !== false && hideRoot) {
                  addBtn = (react_1.default.createElement("a", { className: cx('Tree-addTopBtn', {
                          'is-disabled': isAdding || isEditing
                      }), onClick: this.handleAdd.bind(this, null) },
                      react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }),
                      react_1.default.createElement("span", null, __(rootCreateTip))));
              }
              return (react_1.default.createElement("div", { className: cx(`Tree ${className || ''}`) }, (options && options.length) || addBtn || hideRoot === false ? (react_1.default.createElement("ul", { className: cx('Tree-list') }, hideRoot ? (react_1.default.createElement(react_1.default.Fragment, null,
                  addBtn,
                  isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
                  this.renderList(options, value, false).dom)) : (react_1.default.createElement("li", { className: cx('Tree-rootItem', {
                      'is-checked': !value || !value.length
                  }) },
                  react_1.default.createElement("div", { className: cx('Tree-itemLabel') },
                      react_1.default.createElement("span", { className: cx('Tree-itemText'), onClick: this.clearSelect },
                          showIcon ? (react_1.default.createElement("i", { className: cx('Tree-itemIcon Tree-rootIcon') },
                              react_1.default.createElement(icons_1.Icon, { icon: "home", className: "icon" }))) : null,
                          rootLabel),
                      !disabled &&
                          creatable &&
                          rootCreatable !== false &&
                          !isAdding &&
                          !isEditing ? (react_1.default.createElement("div", { className: cx('Tree-item-icons') }, creatable ? (react_1.default.createElement("a", { onClick: this.handleAdd.bind(this, null), "data-tooltip": rootCreateTip, "data-position": "left" },
                          react_1.default.createElement(icons_1.Icon, { icon: "plus", className: "icon" }))) : null)) : null),
                  react_1.default.createElement("ul", { className: cx('Tree-sublist') },
                      isAdding && !addingParent ? (react_1.default.createElement("li", { className: cx('Tree-item') }, this.renderInput())) : null,
                      this.renderList(options, value, false).dom))))) : (react_1.default.createElement("div", { className: cx('Tree-placeholder') }, placeholder))));
          }
      }
      TreeSelector.defaultProps = {
          showIcon: true,
          initiallyOpen: true,
          unfoldedLevel: 0,
          showRadio: false,
          multiple: false,
          disabled: false,
          withChildren: false,
          onlyChildren: false,
          labelField: 'label',
          valueField: 'value',
          iconField: 'icon',
          unfoldedField: 'unfolded',
          foldedField: 'foled',
          disabledField: 'disabled',
          joinValues: true,
          extractValue: false,
          delimiter: ',',
          hideRoot: true,
          rootLabel: 'Tree.root',
          rootValue: 0,
          cascade: false,
          selfDisabledAffectChildren: true,
          rootCreateTip: 'Tree.addRoot',
          createTip: 'Tree.addChild',
          editTip: 'Tree.editNode',
          removeTip: 'Tree.removeNode'
      };
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "toggleUnfolded", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "clearSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleSelect", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [Object, Boolean]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleCheck", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _a : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleAdd", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _b : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleEdit", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Select_1.Option !== "undefined" && Select_1.Option) === "function" ? _c : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleRemove", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof react_1.default !== "undefined" && react_1.default.ChangeEvent) === "function" ? _d : Object]),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleInputChange", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleConfirm", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", []),
          tslib_1.__metadata("design:returntype", void 0)
      ], TreeSelector.prototype, "handleCancel", null);
      tslib_1.__decorate([
          helper_1.autobind,
          tslib_1.__metadata("design:type", Function),
          tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof Select_1.Options !== "undefined" && Select_1.Options) === "function" ? _e : Object, Array, Boolean]),
          tslib_1.__metadata("design:returntype", Object)
      ], TreeSelector.prototype, "renderList", null);
      return TreeSelector;
  })();
  exports.TreeSelector = TreeSelector;
  exports.default = theme_1.themeable(locale_1.localeable(TreeSelector));
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJlZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9jb21wb25lbnRzL1RyZWUudHN4Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQTs7OztHQUlHOzs7O0FBRUgsMERBQTBCO0FBQzFCLDRDQVF5QjtBQUN6QixxQ0FBc0Q7QUFDdEQsb0NBQTZEO0FBQzdELHVEQUFvRDtBQUNwRCxtQ0FBNkI7QUFDN0Isa0VBQWtDO0FBQ2xDLHNDQUFrRDtBQTZFbEQ7O0lBQUEsTUFBYSxZQUFhLFNBQVEsZUFBSyxDQUFDLFNBR3ZDO1FBOEJDLGtCQUFrQjtZQUNoQixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDO1lBRXpCLElBQUksQ0FBQyxRQUFRLENBQUM7Z0JBQ1osS0FBSyxFQUFFLG9CQUFXLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRTtvQkFDOUIsUUFBUSxFQUFFLEtBQUssQ0FBQyxRQUFRO29CQUN4QixTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVM7b0JBQzFCLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVTtvQkFDNUIsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPO2lCQUN2QixDQUFDO2dCQUNGLFFBQVEsRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQztnQkFFbEMsVUFBVSxFQUFFLEVBQUU7Z0JBQ2QsWUFBWSxFQUFFLElBQUk7Z0JBQ2xCLFFBQVEsRUFBRSxLQUFLO2dCQUNmLFNBQVMsRUFBRSxLQUFLO2dCQUNoQixXQUFXLEVBQUUsSUFBSTthQUNsQixDQUFDLENBQUM7UUFDTCxDQUFDO1FBRUQseUJBQXlCLENBQUMsU0FBNEI7WUFDcEQsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO1lBRXpCLElBQ0UsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLEtBQUs7Z0JBQ3BDLElBQUksQ0FBQyxLQUFLLENBQUMs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

});
