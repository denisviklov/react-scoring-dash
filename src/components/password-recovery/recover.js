import React from "react";
import { Redirect, Link } from "react-router-dom";
import { withApollo, graphql, compose } from "react-apollo";
import { Form, Input, Button, message } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import AuthClient from "../../auth";
import { RECOVER_BY_CODE, RECOVER_BY_CODE_HASH } from "./gql/mutation";

const FormItem = Form.Item;

class FResetPassowrdForm extends React.Component {
  state = {
    success: false
  };

  makeRecoverByRequest = (mutation, values, cb) => {
    this.props
      [mutation]({ variables: values })
      .then(({ data }) => {
        let mutationRes = data[mutation];
        let err = mutationRes.error || null;
        let user = mutationRes.user || null;
        let token = mutationRes.token || null;
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
    this.setState({ error: null });
    const { formatMessage } = this.props.intl;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let codeField = this.props.codeHash ? "codeHash" : "code";
        let mutation =
          "recoverBy" + codeField[0].toUpperCase() + codeField.substr(1);
        let reqCodeFild =
          "recovery" + codeField[0].toUpperCase() + codeField.substr(1);
        values[reqCodeFild] = this.props[codeField];
        this.makeRecoverByRequest(mutation, values, (err, user, token) => {
          if (user) {
            AuthClient.setToken(token);
            this.props.client.resetStore();
            message.success(
              formatMessage({
                id: "recovery.success",
                defaultMessage: "Password successfully changed"
              })
            );
            this.setState({ success: true });
          } else {
            this.props.onError(err);
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
      <Form onSubmit={this.handleSubmit} className="confirm-form">
        <FormItem>
          {getFieldDecorator("password", {
            rules: [
              {
                required: true,
                message: formatMessage({
                  id: "password.newPassword",
                  defaultMessage: "Enter your new password"
                })
              }
            ]
          })(
            <Input
              type={"password"}
              placeholder={formatMessage({
                id: "password.newPassword",
                defaultMessage: "New password"
              })}
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator("confirmPassword", {
            rules: [
              {
                required: true,
                message: formatMessage({
                  id: "password.confirmPassword",
                  defaultMessage: "Confirm your new password"
                })
              }
            ]
          })(
            <Input
              type={"password"}
              placeholder={formatMessage({
                id: "settings.confirmPassword",
                defaultMessage: "Confirm password"
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
            <FormattedMessage
              id="settings.save"
              defaultMessage="Save"
              description="Save"
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
    );
  }
}

export const ResetPasswordForm = compose(
  withApollo,
  graphql(RECOVER_BY_CODE, { name: "recoverByCode" }),
  graphql(RECOVER_BY_CODE_HASH, { name: "recoverByCodeHash" })
)(Form.create()(injectIntl(FResetPassowrdForm)));
