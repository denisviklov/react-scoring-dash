import React from "react";
import { Menu, Icon, Dropdown, Avatar, Tooltip } from "antd";
import { Link, withRouter } from "react-router-dom";
import { gql, graphql } from "react-apollo";
import { FormattedMessage } from "react-intl";

const getUserFullName = user => {
  let fullName = [];
  if (user.firstName) {
    fullName.push(user.firstName);
  }
  if (user.lastName) {
    fullName.push(user.lastName);
  }
  return fullName.join(" ");
};

const getUserInfoStr = user => {
  if (!user) {
    return "Offline";
  }
  let fullName = getUserFullName(user);
  return fullName ? `${fullName} (${user.username})` : user.username;
};

const UserMenu = props => {
  let { loading, user } = props.data;
  if (loading) {
    return <div className="loading" />;
  }
  const userTitle = getUserInfoStr(user);
  const location = props.location;
  const menu = (
    <Menu selectedKeys={[location.pathname]} className="user-menu">
      <Menu.Item key="/dashboard/profile">
        <Link to="/dashboard/profile">
          <Icon type="user" />
          <FormattedMessage id="user-menu.profile" defaultMessage="Profile" />
        </Link>
      </Menu.Item>
      <Menu.Item key="/dashboard/settings">
        <Link to="/dashboard/settings">
          <Icon type="setting" />
          <FormattedMessage id="user-menu.settings" defaultMessage="Settings" />
        </Link>
      </Menu.Item>
      <Menu.Item key="/dashboard/billing">
        <Link to="/dashboard/billing">
          <Icon type="wallet" />
          <FormattedMessage id="user-menu.billing" defaultMessage="Billing" />
        </Link>
      </Menu.Item>
      <Menu.Item key="/dashboard/payments">
        <Link to="/dashboard/payments">
          <Icon type="calculator" />
          <FormattedMessage id="user-menu.payments" defaultMessage="Payments" />
        </Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="/logout">
        <Link to="/logout">
          <Icon type="logout" />
          <FormattedMessage id="user-menu.logout" defaultMessage="Logout" />
        </Link>
      </Menu.Item>
    </Menu>
  );
  return (
    <Tooltip placement="left" title={userTitle}>
      <Dropdown overlay={menu} trigger={["hover", "click"]}>
        <a
          className="user-menu-dropdown ant-dropdown-link"
          href="/user-menu"
          style={{
            float: "right",
            margin: "0 10px",
            textDecoration: "none",
            color: "#000"
          }}
        >
          <Avatar
            shape="square"
            src={
              "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
            }
          />
          <Icon type="caret-down" />
        </a>
      </Dropdown>
    </Tooltip>
  );
};

const USER_QUERY = gql`
  query {
    user {
      id
      username
      firstName
      lastName
    }
  }
`;

const withUser = graphql(USER_QUERY, {
  options: () => ({ variables: {} })
  // props: ({data}) => ({ ...data })
});

export default withRouter(withUser(UserMenu));
