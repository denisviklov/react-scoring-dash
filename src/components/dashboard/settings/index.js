import React from "react";
import { Input, Form, Button, Upload, Col, Row, Icon, message } from "antd";
import { graphql } from "react-apollo";
import { injectIntl, FormattedMessage } from "react-intl";
import "./settings.css";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Portlet from "../../utils/portlet";
import UPDATE_PASSWORD from "./gql/mutation";

const FormItem = Form.Item;

class UserInfoForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        if (values.password !== values.confirmPassword) {
          message.error("Новый пароль и подтверждение не совпадают");
          return;
        }

        this.props
          .mutate({
            variables: values
          })
          .then(({ data }) => {
            if (!data.data.success) {
              message.error(data.data.error);
            } else {
              message.success("Пароль обновлен");
            }
          })
          .catch(error => {
            message.error("Произошла ошибка");
          });
      }
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 8
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        span: 8,
        offset: 8
      }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit}>
        <Col offset={4}>
          <h2 style={{ paddingBottom: "16px" }}>
            <FormattedMessage
              id="settings.user-info"
              defaultMessage="User info"
            />
          </h2>
        </Col>
        <FormItem
          {...formItemLayout}
          label={
            <FormattedMessage
              id="settings.currentPassword"
              defaultMessage="Current password"
              description="Current password"
            />
          }
        >
          {getFieldDecorator("currentPassword", {
            rules: [
              {
                required: true,
                message: formatMessage({
                  id: "password.currentPassword",
                  defaultMessage: "Enter your current password"
                })
              }
            ]
          })(<Input type={"password"} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <FormattedMessage
              id="settings.newPassword"
              defaultMessage="New password"
              description="Password"
            />
          }
        >
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
          })(<Input type={"password"} />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={
            <FormattedMessage
              id="settings.confirmPassword"
              defaultMessage="Confirm password"
              description="Confirm password"
            />
          }
        >
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
          })(<Input type={"password"} />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            <FormattedMessage
              id="settings.save"
              defaultMessage="Save"
              description="Save"
            />
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const UserInfoMutation = graphql(UPDATE_PASSWORD)(UserInfoForm);
const UserInfo = Form.create()(injectIntl(UserInfoMutation));

const AvatarForm = props => {
  let imageUrl =
    "https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png";
  return (
    <div>
      <h2 style={{ paddingBottom: "16px" }}>
        <FormattedMessage id="settings.avatar" defaultMessage="Avatar" />
      </h2>
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="//jsonplaceholder.typicode.com/posts/"
        // onChange={this.handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={150}
            height={150}
            alt="[Avatar]"
            className="avatar"
          />
        ) : (
          <Icon type="plus" className="avatar-uploader-trigger" />
        )}
        <br />
        <FormattedMessage
          id="settings.avatar-help"
          defaultMessage="Click to upload"
          description="Click to upload"
        />
      </Upload>
    </div>
  );
};

const Settings = props => {
  return (
    <Portlet
      className="page"
      header={
        <FormattedMessage id="user-menu.settings" defaultMessage="Settings" />
      }
    >
      <BreadcrumbsItem to="/dashboard/settings" className="ant-breadcrumb-link">
        <FormattedMessage id="user-menu.settings" defaultMessage="Settings" />
      </BreadcrumbsItem>
      <Row>
        <Col span={12}>
          <UserInfo />
        </Col>
        <Col span={12}>
          <AvatarForm />
        </Col>
      </Row>
    </Portlet>
  );
};

export default Settings;
