import React from "react";
import { Menu, Icon, Dropdown } from "antd";
import Locale from "../../../locale";

export class LangMenu extends React.Component {
  onSelect = ({ item, key }) => {
    Locale.set(key);
    window.location.reload();
  };

  render() {
    const current = Locale.getLocale();
    const locales = Locale.locales();
    let menuItems = [];
    for (let k in locales) {
      let l = locales[k];
      menuItems.push(<Menu.Item key={k}>{l.title}</Menu.Item>);
    }
    const menu = (
      <Menu
        selectedKeys={[current.locale]}
        onClick={this.onSelect}
        className="user-menu"
      >
        {menuItems}
      </Menu>
    );
    return (
      <Dropdown overlay={menu} trigger={["hover", "click"]}>
        <a
          className="user-menu-dropdown ant-dropdown-link"
          href="/lang-menu"
          style={{
            float: "right",
            margin: "0 10px",
            textDecoration: "none"
          }}
        >
          {current.title}
          <Icon type="caret-down" />
        </a>
      </Dropdown>
    );
  }
}
