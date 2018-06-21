import React from "react";
import { FormattedMessage } from "react-intl";
import { Menu, Icon } from "antd";
import { Link, withRouter } from "react-router-dom";

class MainMenu extends React.Component {
  render() {
    const { location } = this.props;
    return (
      <Menu selectedKeys={[location.pathname]} mode="inline">
        <Menu.Item key="/dashboard/projects">
          <Link to="/dashboard/projects">
            <Icon type="solution" />
            <FormattedMessage
              id="main-menu.projects"
              defaultMessage="Projects"
            />
          </Link>
        </Menu.Item>
        <Menu.Item key="/dashboard/analytics">
          <Link to="/dashboard/analytics">
            <Icon type="area-chart" />
            <span>
              <FormattedMessage
                id="main-menu.analytics"
                defaultMessage="Analytics"
              />
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/dashboard/data-exchange">
          <Link to="/dashboard/data-exchange">
            <Icon type="database" />
            <span>
              <FormattedMessage
                id="main-menu.data-exchange"
                defaultMessage="Data Exchange"
              />
            </span>
          </Link>
        </Menu.Item>
        <Menu.Item key="/dashboard/info">
          <Link to="/dashboard/info">
            {/*<Icon type="question-circle-o" />*/}
            <Icon type="info-circle-o" />
            <span>
              <FormattedMessage
                id="main-menu.info"
                defaultMessage="Information"
              />
            </span>
          </Link>
        </Menu.Item>
      </Menu>
    );
  }
}

export default withRouter(MainMenu);
