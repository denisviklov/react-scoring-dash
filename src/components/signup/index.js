import React from "react";
import { graphql } from "react-apollo";
import { Form, Input, Icon, Checkbox, Button } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import { Link, Redirect } from "react-router-dom";

import { REGISTER_USER } from "./gql/mutation";

import "./signup.css";
import AuthForm from "../login/auth";
import PhoneInput from "../utils/phone";

const FormItem = Form.Item;

class RegistrationForm extends React.Component {
  state = {
    agree: true,
    error: null,
    success: null
  };

  makeSignupRequest = (values, cb) => {
    this.props
      .mutate({ variables: values })
      .then(({ data: { registerUser } }) => {
        let err = registerUser.error || null;
        let user = registerUser.user || null;
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
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        if (values.phone) {
          values.phone = "+7" + values.phone;
        }
        this.makeSignupRequest(values, (err, user) => {
          if (user) {
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
      return <Redirect to="/signup/confirm" />;
    }

    return (
      <AuthForm
        title={
          <FormattedMessage id="register.title" defaultMessage="Registration" />
        }
        error={this.state.error}
      >
        <Form onSubmit={this.handleSubmit} className="signup-form">
          <FormItem>
            {getFieldDecorator("companyName", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "register.company-required-error",
                    defaultMessage: "Please input your company name"
                  })
                }
              ]
            })(
              <Input
                suffix={<Icon type="team" style={{ fontSize: 13 }} />}
                placeholder={formatMessage({
                  id: "register.company-placeholder",
                  defaultMessage: "Company name"
                })}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("name", {})(
              <Input
                suffix={<Icon type="user" style={{ fontSize: 13 }} />}
                placeholder={formatMessage({
                  id: "register.contact-person-placeholder",
                  defaultMessage: "Contact person name"
                })}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("username", {
              rules: [
                {
                  required: true,
                  message: formatMessage({
                    id: "register.contact-person-email-required-error",
                    defaultMessage: "Please input contact person's email"
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
                placeholder={formatMessage({
                  id: "register.contact-person-email-placeholder",
                  defaultMessage: "Contact person email"
                })}
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
                suffix={<Icon type="lock" style={{ fontSize: 13 }} />}
                type="password"
                placeholder={formatMessage({
                  id: "login.password",
                  defaultMessage: "Password"
                })}
              />
            )}
          </FormItem>

          <FormItem>
            {getFieldDecorator("phone", {
              rules: [
                {
                  pattern: /^\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
                  message: formatMessage({
                    id: "register.phone-error",
                    defaultMessage: "Password"
                  })
                }
              ]
            })(<PhoneInput />)}
          </FormItem>

          <FormItem style={{ marginBottom: 8 }}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked",
              initialValue: this.state.agree,
              rules: [
                {
                  required: true
                }
              ]
            })(
              <Checkbox
                onChange={e => {
                  this.setState({ agree: e.target.checked });
                }}
              >
                <FormattedMessage
                  id="register.agree"
                  defaultMessage="I agree with "
                />
                <Link to="/agreement">
                  <FormattedMessage
                    id="register.agreement"
                    defaultMessage="processing of my personal data"
                  />
                </Link>
              </Checkbox>
            )}

            <Button
              disabled={!this.state.agree}
              type="primary"
              htmlType="submit"
              className="signup-form-button"
            >
              <FormattedMessage
                id="register.register"
                defaultMessage="Register"
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

const WrappedRegistrationForm = Form.create()(injectIntl(RegistrationForm));

const SignupComponent = graphql(REGISTER_USER)(WrappedRegistrationForm);

export default SignupComponent;
