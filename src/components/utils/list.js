import React from "react";
import { Icon, Input, Button, Popconfirm } from "antd";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import Portlet from "./portlet";

import "./list.css";

const ButtonGroup = Button.Group;

class ListItem extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    selected: PropTypes.bool
  };

  state = {
    mode: "show"
  };

  onClick = () => {
    this.props.onClick(this.props.data);
  };

  onEditStart = () => {
    this.setState({ mode: "edit" });
  };

  onEditCancel = () => {
    this.setState({ mode: "show" });
  };

  onEditComplete = () => {
    let data = Object.assign({}, this.props.data);
    data.title = this.refs.input.refs.input.value;
    this.props.onEdit(data);
    this.setState({ mode: "show" });
  };

  onDelete = () => {
    this.props.onDelete(this.props.data);
  };

  render() {
    const data = this.props.data;
    const selected = this.props.selected;
    let className = "list-item";
    if (selected) {
      className += " selected";
    }
    if (this.state.mode === "edit") {
      className += " edit-mode";
      return (
        <li className={className}>
          <Input
            ref="input"
            onPressEnter={this.onEditComplete}
            size="small"
            placeholder="title"
            defaultValue={data.title}
            addonAfter={
              <ButtonGroup size="small">
                <Button
                  type="primary"
                  onClick={this.onEditComplete}
                  icon="check"
                />
                <Button onClick={this.onEditCancel} icon="close" />
              </ButtonGroup>
            }
          />
        </li>
      );
    } else {
      let deleteConfirmation = this.props.deleteConfirmation || (
        <span>
          <FormattedMessage
            id="list.delete-confirm"
            defaultMessage={"Are you shure? Delete item "}
          />
          "{data.title}"
        </span>
      );
      return (
        <li className={className} onClick={this.onClick}>
          <span className="item-title">{data.title}</span>
          {selected && (
            <ButtonGroup
              size="small"
              style={{ position: "absolute", right: "0" }}
            >
              <Button type="primary" onClick={this.onEditStart} icon="edit" />
              <Popconfirm
                title={deleteConfirmation}
                onConfirm={this.onDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button icon="delete" />
              </Popconfirm>
            </ButtonGroup>
          )}
        </li>
      );
    }
  }
}

export class AddItem extends React.Component {
  state = {
    mode: "show"
  };

  onAddStart = () => {
    this.setState({ mode: "edit" });
  };

  onAddCancel = () => {
    this.setState({ mode: "show" });
  };

  onAddComplete = () => {
    this.props.onAdd({ title: this.refs.input.refs.input.value });
    this.setState({ mode: "show" });
  };

  render() {
    if (this.state.mode === "edit") {
      return (
        <div className="list-item add edit-mode">
          <Input
            ref="input"
            onPressEnter={this.onAddComplete}
            size="small"
            placeholder="title"
            addonAfter={
              <ButtonGroup size="small">
                <Button
                  type="primary"
                  onClick={this.onAddComplete}
                  icon="check"
                />
                <Button onClick={this.onAddCancel} icon="close" />
              </ButtonGroup>
            }
          />
        </div>
      );
    } else {
      return (
        <div className="list-item add" onClick={this.onAddStart}>
          <Button size="small" className="add-btn">
            <FormattedMessage id="list.add" defaultMessage="Add" />
            <Icon type="plus" style={{ marginLeft: "5px" }} />
          </Button>
        </div>
      );
    }
  }
}

export class List extends React.Component {
  static propTypes = {
    data: PropTypes.array.isRequired,
    onSelect: PropTypes.func.isRequired,
    onEditItem: PropTypes.func.isRequired,
    onDeleteItem: PropTypes.func.isRequired,
    onAddItem: PropTypes.func.isRequired,
    deleteItemConfirmation: PropTypes.string,
    selected: PropTypes.object,
    header: PropTypes.node,
    item: PropTypes.node,
    addItem: PropTypes.node
  };

  render() {
    const {
      header,
      data,
      item,
      addItem,
      deleteItemConfirmation,
      selected,
      onSelect,
      onEditItem,
      onDeleteItem,
      onAddItem
    } = this.props;
    const ItemComponent = item || ListItem;
    const AddComponent = addItem || AddItem;
    return (
      <Portlet className="list" header={header}>
        <ul>
          {data.map((item, i) => (
            <ItemComponent
              key={item.id}
              data={item}
              onClick={onSelect}
              onEdit={onEditItem}
              onDelete={onDeleteItem}
              deleteConfirmation={deleteItemConfirmation}
              selected={selected && item.id === selected.id}
            />
          ))}
        </ul>
        <AddComponent onAdd={onAddItem} />
      </Portlet>
    );
  }
}
