import React from "react";
import { graphql } from "react-apollo";
import { Form, Icon, Input, Button } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link, Redirect } from "react-router-dom";

import AuthForm from "../login/auth";

import "./password-recovery.css";
import { PASSWORD_RECOVERY } from "./gql/mutation";

const FormItem = Form.Item;

class PasswordRecovery extends React.Component {
  state = {
    error: null,
    success: null
  };

  makeRecoveryRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { recovery } }) => {
        let err = recovery.error || null;
        let user = recovery.success || null;
        cb(err, user);
      })
      .catch(err => {
        console.error(err);
        const { formatMessage } = this.props.intl;
        const error = formatMessage({
          id: "general.network-error",
          defaultMessage: "Network error, try again later"
        });
        cb(error, false);
      });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({ error: null });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.makeRecoveryRequest(values, (err, success) => {
          if (success) {
            this.setState({ success: true });
          } else {
            this.setState({ error: err });
          }
        });
      }
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;

    if (this.state.success) {
      return <Redirect to="/recovery/confirm" />;
    }

    return (
      <AuthForm
        title={
          <FormattedMessage
            id="recovery.title"
            defaultMessage="Password recovery"
          />
        }
        error={this.state.error}
      >
        <Form onSubmit={this.handleSubmit} className="recovery-form">
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
                suffix={<Icon type="mail" style={{ fontSize: 13 }} />}
                placeholder="Email"
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="recovery-form-button"
            >
              <FormattedMessage
                id="recovery.recover"
                defaultMessage="Recover"
              />
            </Button>
            <Link to="/login">
              <FormattedMessage
                id="register.login"
                defaultMessage="Login for existing users"
              />
            </Link>
          </FormItem>
        </Form>
      </AuthForm>
    );
  }
}

const PasswordRecoveryComponent = graphql(PASSWORD_RECOVERY)(
  Form.create()(injectIntl(PasswordRecovery))
);

export default PasswordRecoveryComponent;
