import React from "react";
import { withApollo } from "react-apollo";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import { Link, Redirect } from "react-router-dom";
import { injectIntl, FormattedMessage } from "react-intl";
import AuthClient from "../../auth";
import AuthForm from "./auth";

import "./login.css";

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      loggedIn: AuthClient.isLoggedIn()
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        AuthClient.login(values, (err, loggedIn) => {
          if (loggedIn) {
            this.props.client.resetStore();
            this.setState({ loggedIn: AuthClient.isLoggedIn() });
          } else if (err) {
            this.setState({ error: err });
          }
        });
      }
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" push={true} />;
    }
    return (
      <AuthForm
        title={<FormattedMessage id="login.title" defaultMessage="Login" />}
        error={this.state.error}
      >
        <Form onSubmit={this.handleSubmit}>
          <FormItem>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "login.email-required-error",
                    defaultMessage: "Please input your email"
                  })
                },
                {
                  type: "email",
                  message: formatMessage({
                    id: "login.email-incorrect-error",
                    defaultMessage: "Please input correct email"
                  })
                }
              ]
            })(
              <Input
                prefix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder="Email"
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("password", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "login.password-error",
                    defaultMessage: "Please input your password"
                  })
                }
              ]
            })(
              <Input
                prefix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder={formatMessage({
                  id: "login.password",
                  defaultMessage: "Please input your password"
                })}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("remember", {
              valuePropName: "checked",
              initialValue: true
            })(
              <Checkbox>
                <FormattedMessage
                  id="login.remember"
                  defaultMessage="Remember me"
                />
              </Checkbox>
            )}
            <Link to="/recovery">
              <FormattedMessage
                id="login.forgot"
                defaultMessage="Forgot password"
              />
            </Link>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <FormattedMessage id="login.login" defaultMessage="Login" />
            </Button>
            <Link to="/signup">
              <FormattedMessage
                id="login.register"
                defaultMessage="Register now!"
              />
            </Link>
          </FormItem>
        </Form>
      </AuthForm>
    );
  }
}

const LoginComponent = Form.create()(injectIntl(withApollo(NormalLoginForm)));

export default LoginComponent;
