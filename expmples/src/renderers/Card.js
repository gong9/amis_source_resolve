amis.define('src/renderers/Card.tsx', function(require, exports, module, define) {

  "use strict";
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CardItemFieldRenderer = exports.CardRenderer = exports.Card = void 0;
  const tslib_1 = require("node_modules/tslib/tslib");
  const react_1 = tslib_1.__importDefault(require("node_modules/react/index"));
  const react_dom_1 = require("node_modules/react-dom/index");
  const factory_1 = require("src/factory.tsx");
  const tpl_1 = require("src/utils/tpl.ts");
  const Checkbox_1 = tslib_1.__importDefault(require("src/components/Checkbox.tsx"));
  const helper_1 = require("src/utils/helper.ts");
  const tpl_builtin_1 = require("src/utils/tpl-builtin.ts");
  const QuickEdit_1 = tslib_1.__importDefault(require("src/renderers/QuickEdit.tsx"));
  const PopOver_1 = tslib_1.__importDefault(require("src/renderers/PopOver.tsx"));
  const Table_1 = require("src/renderers/Table/index.tsx");
  const Copyable_1 = tslib_1.__importDefault(require("src/renderers/Copyable.tsx"));
  const icons_1 = require("src/components/icons.tsx");
  let Card = /** @class */ (() => {
      class Card extends react_1.default.Component {
          constructor(props) {
              super(props);
              this.getPopOverContainer = this.getPopOverContainer.bind(this);
              this.itemRender = this.itemRender.bind(this);
              this.handleAction = this.handleAction.bind(this);
              this.handleQuickChange = this.handleQuickChange.bind(this);
              this.handleClick = this.handleClick.bind(this);
              this.handleCheck = this.handleCheck.bind(this);
          }
          handleClick(e) {
              const target = e.target;
              const ns = this.props.classPrefix;
              let formItem;
              if (!e.currentTarget.contains(target) ||
                  ~['INPUT', 'TEXTAREA'].indexOf(target.tagName) ||
                  ((formItem = target.closest(`button, a, .${ns}Form-item`)) &&
                      e.currentTarget.contains(formItem))) {
                  return;
              }
              const item = this.props.item;
              this.props.onCheck && this.props.onCheck(item);
          }
          handleCheck() {
              const item = this.props.item;
              this.props.onCheck && this.props.onCheck(item);
          }
          handleAction(e, action, ctx) {
              const { onAction, item } = this.props;
              onAction && onAction(e, action, ctx || item.data);
          }
          handleQuickChange(values, saveImmediately, savePristine, resetOnFailed) {
              const { onQuickChange, item } = this.props;
              onQuickChange &&
                  onQuickChange(item, values, saveImmediately, savePristine, resetOnFailed);
          }
          getPopOverContainer() {
              return react_dom_1.findDOMNode(this);
          }
          renderToolbar() {
              const { dragging, selectable, checkable, selected, onSelect, checkOnItemClick, multiple, hideCheckToggler, classnames: cx, classPrefix: ns } = this.props;
              if (dragging) {
                  return (react_1.default.createElement("div", { className: cx('Card-dragBtn') },
                      react_1.default.createElement(icons_1.Icon, { icon: "drag-bar", className: "icon" })));
              }
              else if (selectable && !hideCheckToggler) {
                  return (react_1.default.createElement("div", { className: cx('Card-checkBtn') },
                      react_1.default.createElement(Checkbox_1.default, { classPrefix: ns, type: multiple ? 'checkbox' : 'radio', disabled: !checkable, checked: selected, onChange: checkOnItemClick ? helper_1.noop : this.handleCheck })));
              }
              return null;
          }
          renderActions() {
              const { actions, render, dragging, actionsCount, data, classnames: cx } = this.props;
              if (Array.isArray(actions)) {
                  const group = helper_1.padArr(actions.filter(item => helper_1.isVisible(item, data)), actionsCount);
                  return group.map((actions, groupIndex) => (react_1.default.createElement("div", { key: groupIndex, className: cx('Card-actions') }, actions.map((action, index) => {
                      const size = action.size || 'sm';
                      return render(`action/${index}`, Object.assign(Object.assign({ level: 'link', type: 'button' }, action), { size }), {
                          isMenuItem: true,
                          key: index,
                          index,
                          disabled: dragging || helper_1.isDisabled(action, data),
                          className: cx('Card-action', action.className || `${size ? `Card-action--${size}` : ''}`),
                          componentClass: 'a',
                          onAction: this.handleAction
                      });
                  }))));
              }
              return null;
          }
          renderChild(node, region = 'body', key = 0) {
              const { render } = this.props;
              if (typeof node === 'string' || typeof node === 'number') {
                  return render(region, node, { key });
              }
              const childNode = node;
              if (childNode.type === 'hbox' || childNode.type === 'grid') {
                  return render(region, node, {
                      key,
                      itemRender: this.itemRender
                  });
              }
              return this.renderFeild(region, childNode, key, this.props);
          }
          itemRender(field, index, props) {
              return this.renderFeild(`column/${index}`, field, index, props);
          }
          renderFeild(region, field, key, props) {
              const { render, classnames: cx, itemIndex } = props;
              const data = this.props.data;
              if (!helper_1.isVisible(field, data)) {
                  return;
              }
              const $$id = field.$$id ? `${field.$$id}-field` : '';
              return (react_1.default.createElement("div", { className: cx('Card-field'), key: key },
                  field && field.label ? (react_1.default.createElement("label", { className: cx('Card-fieldLabel', field.labelClassName) }, field.label)) : null,
                  render(region, Object.assign(Object.assign({}, field), { field: field, $$id, type: 'card-item-field' }), {
                      className: cx('Card-fieldValue', field.className),
                      rowIndex: itemIndex,
                      colIndex: key,
                      value: field.name ? tpl_builtin_1.resolveVariable(field.name, data) : undefined,
                      popOverContainer: this.getPopOverContainer,
                      onAction: this.handleAction,
                      onQuickChange: this.handleQuickChange
                  })));
          }
          renderBody() {
              const { body } = this.props;
              if (!body) {
                  return null;
              }
              if (Array.isArray(body)) {
                  return body.map((child, index) => this.renderChild(child, `body/${index}`, index));
              }
              return this.renderChild(body, 'body');
          }
          render() {
              const { className, data, header, render, bodyClassName, highlightClassName, titleClassName, subTitleClassName, descClassName, checkOnItemClick, avatarClassName, checkable, classnames: cx, classPrefix: ns, imageClassName, avatarTextClassName } = this.props;
              let heading = null;
              if (header) {
                  const { highlight: highlightTpl, avatar: avatarTpl, avatarText: avatarTextTpl, title: titleTpl, subTitle: subTitleTpl, subTitlePlaceholder, desc: descTpl } = header;
                  const descPlaceholder = header.descriptionPlaceholder || header.descPlaceholder;
                  const highlight = !!tpl_1.evalExpression(highlightTpl, data);
                  const avatar = tpl_1.filter(avatarTpl, data, '| raw');
                  const avatarText = tpl_1.filter(avatarTextTpl, data);
                  const title = tpl_1.filter(titleTpl, data);
                  const subTitle = tpl_1.filter(subTitleTpl, data);
                  const desc = tpl_1.filter(header.description || descTpl, data);
                  heading = (react_1.default.createElement("div", { className: cx('Card-heading', header.className) },
                      avatar ? (react_1.default.createElement("span", { className: cx('Card-avtar', header.avatarClassName || avatarClassName) },
                          react_1.default.createElement("img", { className: cx('Card-img', header.imageClassName || imageClassName), src: avatar }))) : avatarText ? (react_1.default.createElement("span", { className: cx('Card-avtarText', header.avatarTextClassName || avatarTextClassName) }, avatarText)) : null,
                      react_1.default.createElement("div", { className: cx('Card-meta') },
                          highlight ? (react_1.default.createElement("i", { className: cx('Card-highlight', header.highlightClassName || highlightClassName) })) : null,
                          title ? (react_1.default.createElement("div", { className: cx('Card-title', header.titleClassName || titleClassName) }, render('title', title))) : null,
                          subTitle || subTitlePlaceholder ? (react_1.default.createElement("div", { className: cx('Card-subTitle', header.subTitleClassName || subTitleClassName) }, render('sub-title', subTitle || subTitlePlaceholder, {
                              className: cx(!subTitle ? 'Card-placeholder' : undefined)
                          }))) : null,
                          desc || descPlaceholder ? (react_1.default.createElement("div", { className: cx('Card-desc', header.descriptionClassName ||
                                  header.descClassName ||
                                  descClassName) }, render('desc', desc || descPlaceholder, {
                              className: !desc ? 'text-muted' : undefined
                          }))) : null)));
              }
              const body = this.renderBody();
              return (react_1.default.createElement("div", { onClick: checkOnItemClick && checkable ? this.handleClick : undefined, className: cx('Card', className) },
                  this.renderToolbar(),
                  heading,
                  body ? (react_1.default.createElement("div", { className: cx('Card-body', bodyClassName) }, body)) : null,
                  this.renderActions()));
          }
      }
      Card.defaultProps = {
          className: '',
          avatarClassName: '',
          bodyClassName: '',
          actionsCount: 4,
          titleClassName: '',
          highlightClassName: '',
          subTitleClassName: '',
          descClassName: ''
      };
      Card.propsList = [
          'avatarClassName',
          'bodyClassName',
          'actionsCount',
          'titleClassName',
          'highlightClassName',
          'subTitleClassName',
          'descClassName',
          'hideCheckToggler'
      ];
      return Card;
  })();
  exports.Card = Card;
  let CardRenderer = /** @class */ (() => {
      let CardRenderer = class CardRenderer extends Card {
      };
      CardRenderer.propsList = ['multiple', ...Card.propsList];
      CardRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)card$/,
              name: 'card'
          })
      ], CardRenderer);
      return CardRenderer;
  })();
  exports.CardRenderer = CardRenderer;
  let CardItemFieldRenderer = /** @class */ (() => {
      let CardItemFieldRenderer = class CardItemFieldRenderer extends Table_1.TableCell {
          render() {
              let _a = this.props, { type, className, render, style, wrapperComponent: Component, labelClassName, value, data, children, width, innerClassName, label, tabIndex, onKeyUp, field } = _a, rest = tslib_1.__rest(_a, ["type", "className", "render", "style", "wrapperComponent", "labelClassName", "value", "data", "children", "width", "innerClassName", "label", "tabIndex", "onKeyUp", "field"]);
              const schema = Object.assign(Object.assign({}, field), { className: innerClassName, type: (field && field.type) || 'plain' });
              let body = children
                  ? children
                  : render('field', schema, Object.assign(Object.assign({}, rest), { value,
                      data }));
              if (width) {
                  style = style || {};
                  style.width = style.width || width;
                  body = (react_1.default.createElement("div", { style: { width: !/%/.test(String(width)) ? width : '' } }, body));
              }
              if (!Component) {
                  return body;
              }
              return (react_1.default.createElement(Component, { style: style, className: className, tabIndex: tabIndex, onKeyUp: onKeyUp }, body));
          }
      };
      CardItemFieldRenderer.defaultProps = Object.assign(Object.assign({}, Table_1.TableCell.defaultProps), { wrapperComponent: 'div' });
      CardItemFieldRenderer.propsList = [
          'quickEdit',
          'quickEditEnabledOn',
          'popOver',
          'copyable',
          'inline',
          ...Table_1.TableCell.propsList
      ];
      CardItemFieldRenderer = tslib_1.__decorate([
          factory_1.Renderer({
              test: /(^|\/)card-item-field$/,
              name: 'card-item'
          }),
          QuickEdit_1.default(),
          PopOver_1.default(),
          Copyable_1.default()
      ], CardItemFieldRenderer);
      return CardItemFieldRenderer;
  })();
  exports.CardItemFieldRenderer = CardItemFieldRenderer;
  //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FyZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImZpbGU6Ly8vRDovbXlfcHJvL2JhaWR1LWFtaXMtbWFzdGVyICgxKS9hbWlzL3NyYy9yZW5kZXJlcnMvQ2FyZC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDBEQUEwQjtBQUMxQix5Q0FBc0M7QUFDdEMsd0NBQW1EO0FBRW5ELHNDQUFvRDtBQUVwRCw4RUFBOEM7QUFFOUMsNENBQW9FO0FBQ3BFLHNEQUFxRDtBQUNyRCxvRUFBdUQ7QUFDdkQsZ0VBQWlEO0FBQ2pELG1DQUFrQztBQUNsQyxrRUFBb0Q7QUFDcEQsK0NBQXlDO0FBc0p6QztJQUFBLE1BQWEsSUFBSyxTQUFRLGVBQUssQ0FBQyxTQUFvQjtRQXVCbEQsWUFBWSxLQUFnQjtZQUMxQixLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFYixJQUFJLENBQUMsbUJBQW1CLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvRCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdDLElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDM0QsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUMvQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2pELENBQUM7UUFFRCxXQUFXLENBQUMsQ0FBbUM7WUFDN0MsTUFBTSxNQUFNLEdBQWdCLENBQUMsQ0FBQyxN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

});
