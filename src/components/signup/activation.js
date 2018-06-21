import React from "react";
import { Redirect, Link } from "react-router-dom";
import { withApollo, graphql } from "react-apollo";
import { CONFIRM_BY_CODE, CONFIRM_BY_CODE_HASH } from "./gql/mutation";
import { Form, Input, Icon, Button, message } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import AuthClient from "../../auth";
import AuthForm from "../login/auth";

const FormItem = Form.Item;

class FActivationByCode extends React.Component {
  state = {
    error: null,
    success: false
  };

  makeConfirmRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { confirmByCode } }) => {
        let err = confirmByCode.error || null;
        let user = confirmByCode.user || null;
        let token = confirmByCode.token;
        cb(err, user, token);
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
    const { formatMessage } = this.props.intl;
    this.setState({ error: null });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.makeConfirmRequest(values, (err, user, token) => {
          if (user) {
            AuthClient.setToken(token);
            this.props.client.resetStore();
            message.success(
              formatMessage({
                id: "confirm.success-message",
                defaultMessage: "Thank you for your registration"
              })
            );
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
      return <Redirect to="/dashboard/profile" push={true} />;
    }

    return (
      <AuthForm
        title={
          <FormattedMessage
            id="confirm.title"
            defaultMessage="Registartion confirm"
          />
        }
        error={this.state.error}
      >
        <Form onSubmit={this.handleSubmit} className="confirm-form">
          <div>
            <FormattedMessage
              id="confirm.help"
              defaultMessage="We have sent you confirmation code on your email.
                Please check your inbox and follow instructions."
            />
          </div>

          <FormItem>
            {getFieldDecorator("activationCode", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "confirm.code-required-error",
                    defaultMessage: "Please input your confirmation code"
                  })
                }
              ]
            })(
              <Input
                suffix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                maxLength="4"
                placeholder={formatMessage({
                  id: "confirm.code-placeholder",
                  defaultMessage: "Code ****"
                })}
              />
            )}
          </FormItem>
          <FormItem>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              <FormattedMessage id="confirm.confirm" defaultMessage="Confirm" />
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

export const ActivationByCode = graphql(CONFIRM_BY_CODE)(
  Form.create()(injectIntl(withApollo(FActivationByCode)))
);

class FActivationByCodeHash extends React.Component {
  state = {
    error: null,
    success: false
  };

  makeConfirmRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { confirmByCodeHash } }) => {
        let err = confirmByCodeHash.error || null;
        let user = confirmByCodeHash.user || null;
        let token = confirmByCodeHash.token;
        cb(err, user, token);
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

  componentWillMount() {
    const { formatMessage } = this.props.intl;
    const values = { activationCodeHash: this.props.match.params.hash };
    this.makeConfirmRequest(values, (err, user, token) => {
      if (user) {
        AuthClient.setToken(token);
        this.props.client.resetStore();
        message.success(
          formatMessage({
            id: "confirm.success-message",
            defaultMessage: "Thank you for your registration"
          })
        );
        this.setState({ success: true });
      } else {
        this.setState({ error: err });
      }
    });
  }

  render() {
    if (this.state.success) {
      return <Redirect to="/dashboard/profile" push={true} />;
    }

    return (
      <AuthForm
        title={
          <FormattedMessage
            id="confirm.title"
            defaultMessage="Registartion confirm"
          />
        }
        error={this.state.error}
      >
        <div style={{ paddingTop: "40px" }} />
      </AuthForm>
    );
  }
}

export const ActivationByCodeHash = graphql(CONFIRM_BY_CODE_HASH)(
  Form.create()(injectIntl(withApollo(FActivationByCodeHash)))
);
