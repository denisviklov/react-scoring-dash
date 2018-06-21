import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { Layout } from "antd";
import { Link } from "react-router-dom";

import "./auth.css";

const { Content, Footer } = Layout;

class AuthForm extends React.Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    error: PropTypes.string,
    children: PropTypes.element.isRequired
  };

  render() {
    return (
      <Layout className="auth-layout">
        <Content className="login-form">
          <h1 className="logo-header">
            <Link to="/">
              <img
                alt="logo"
                src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"
              />
            </Link>
            Conduster
          </h1>
          <div className="slogan">
            <FormattedMessage
              id="login.slogan"
              defaultMessage="Conduster — perhaps the most advanced protection system against fraud"
            />
          </div>
          <h3 className="login-title">{this.props.title}</h3>

          {this.props.children}

          {this.props.error && (
            <div
              style={{ textAlign: "center" }}
              className="ant-form-item-control-wrapper has-error"
            >
              <div className="ant-form-explain">{this.props.error}</div>
            </div>
          )}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <div className="footer-menu">
            <Link to="/help">
              <FormattedMessage id="login.help" defaultMessage="Help" />
            </Link>
            <Link to="/privacy-policy">
              <FormattedMessage
                id="login.privacy-policy"
                defaultMessage="Privacy policy"
              />
            </Link>
          </div>
          <div>©2017 Conduster</div>
        </Footer>
      </Layout>
    );
  }
}

export default AuthForm;
