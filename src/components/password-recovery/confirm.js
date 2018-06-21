import React from "react";
import { Link } from "react-router-dom";
import { graphql } from "react-apollo";
import { Form, Input, Icon, Button } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import AuthForm from "../login/auth";
import { RECOVER_BY_CODE, RECOVER_BY_CODE_HASH } from "./gql/mutation";
import { ResetPasswordForm } from "./recover";

const FormItem = Form.Item;

class FRecoveryConfirmByCode extends React.Component {
  state = {
    error: null,
    code: null
  };

  makeConfirmRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { recoverByCode } }) => {
        let err = recoverByCode.error || null;
        let user = recoverByCode.user || null;
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
        this.makeConfirmRequest(values, (err, user) => {
          if (user) {
            this.setState({ code: values.recoveryCode });
          } else {
            this.setState({ error: err });
          }
        });
      }
    });
  };

  onResetPasswordError = error => {
    this.setState({ error });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { getFieldDecorator } = this.props.form;

    return (
      <AuthForm
        title={
          this.state.code ? (
            <FormattedMessage
              id="recovery.title"
              defaultMessage="Password recovery"
            />
          ) : (
            <FormattedMessage
              id="recovery-confirm.title"
              defaultMessage="Password recovery confirm"
            />
          )
        }
        error={this.state.error}
      >
        {this.state.code ? (
          <ResetPasswordForm
            code={this.state.code}
            onError={this.onResetPasswordError}
          />
        ) : (
          <Form onSubmit={this.handleSubmit} className="confirm-form">
            <div>
              <FormattedMessage
                id="confirm.help"
                defaultMessage="We have sent you confirmation code on your email.
                  Please check your inbox and follow instructions."
              />
            </div>

            <FormItem>
              {getFieldDecorator("recoveryCode", {
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
                <FormattedMessage
                  id="recovery-confirm.confirm"
                  defaultMessage="Confirm"
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
        )}
      </AuthForm>
    );
  }
}

export const RecoveryConfirmByCode = graphql(RECOVER_BY_CODE)(
  Form.create()(injectIntl(FRecoveryConfirmByCode))
);

class FRecoveryConfirmByCodeHash extends React.Component {
  state = {
    error: null,
    code: null
  };

  makeConfirmRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { recoverByCodeHash } }) => {
        let err = recoverByCodeHash.error || null;
        let user = recoverByCodeHash.user || null;
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

  componentWillMount() {
    const values = { recoveryCodeHash: this.props.match.params.hash };
    this.makeConfirmRequest(values, (err, user) => {
      if (user) {
        this.setState({ code: values.recoveryCodeHash });
      } else {
        this.setState({ error: err });
      }
    });
  }

  onResetPasswordError = error => {
    this.setState({ error });
  };

  render() {
    return (
      <AuthForm
        title={
          this.state.code ? (
            <FormattedMessage
              id="recovery.title"
              defaultMessage="Password recovery"
            />
          ) : (
            <FormattedMessage
              id="recovery-confirm.title"
              defaultMessage="Password recovery confirm"
            />
          )
        }
        error={this.state.error}
      >
        {this.state.code ? (
          <ResetPasswordForm
            codeHash={this.state.code}
            onError={this.onResetPasswordError}
          />
        ) : (
          <div style={{ paddingTop: "40px" }} />
        )}
      </AuthForm>
    );
  }
}

export const RecoveryConfirmByCodeHash = graphql(RECOVER_BY_CODE_HASH)(
  Form.create()(injectIntl(FRecoveryConfirmByCodeHash))
);
