import React from "react";
import { Switch, Link } from "react-router-dom";
import { BackTop, Layout, Icon, Badge } from "antd";
import { BreadcrumbsItem, Breadcrumbs } from "react-breadcrumbs-dynamic";
import "./layout.css";
import UserMenu from "./user-menu";
import { LangMenu } from "./lang-menu";
import MainMenu from "./main-menu";
import Logo from "./logo";

const { Header, Content, Footer, Sider } = Layout;

class DashboardLayout extends React.Component {
  state = {
    collapsed: false
  };

  toggleCollapsed = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh", minWidth: "400px" }}>
        <Header
          style={{
            padding: 0,
            position: "fixed",
            width: "100%",
            zIndex: 1005
          }}
        >
          <Logo />
          <Icon
            className="trigger"
            type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
            onClick={this.toggleCollapsed}
          />
          <UserMenu />
          <div className="user-notifications">
            <Badge count={2}>
              <Icon type="bell" size="large" />
            </Badge>
          </div>
          <LangMenu />
        </Header>

        <Layout style={{ marginTop: "54px" }}>
          <Sider
            collapsible
            trigger={null}
            collapsed={this.state.collapsed}
            onCollapse={this.onCollapse}
          >
            <MainMenu />
          </Sider>
          <Content
            style={{
              margin: "0 30px",
              marginLeft: this.state.collapsed ? "110px" : "230px",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Breadcrumbs
              container="div"
              containerProps={{
                className: "ant-breadcrumb"
              }}
              separator={<span className="ant-breadcrumb-separator">/</span>}
              item={Link}
              finalItem="span"
              finalProps={{
                className: "ant-breadcrumb-link",
                style: {}
              }}
            />
            <div style={{ minHeight: 360, flex: "auto", display: "flex" }}>
              <BreadcrumbsItem to="/dashboard" className="ant-breadcrumb-link">
                <Icon type="home" />
              </BreadcrumbsItem>
              <Switch>{this.props.children}</Switch>
            </div>
            <BackTop>
              <div className="ant-back-top-content">
                <Icon className="ant-back-top-icon" type="up" />
              </div>
            </BackTop>
          </Content>
        </Layout>
        <Footer style={{ textAlign: "center" }}>
          Conduster.com ©2017 Created by 31173
        </Footer>
      </Layout>
    );
  }
}

export default DashboardLayout;
