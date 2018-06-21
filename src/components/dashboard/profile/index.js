import React from "react";
import { Input, Form, Select, Button, message } from "antd";
import { graphql, compose } from "react-apollo";
import { FormattedMessage, injectIntl } from "react-intl";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Portlet from "../../utils/portlet";
import Phone from "../../utils/phone";

import { COUNTRIES, USER_PROFILE } from "./gql/query";
import UPDATE_PROFILE from "./gql/mutation";

const FormItem = Form.Item;
const Option = Select.Option;

class FProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleInternalError = err => {
    const { formatMessage } = this.props.intl;
    message.error(
      formatMessage({
        id: "general.network-error",
        defaultMessage: "Network error, try again later"
      })
    );
  };

  handleSuccess = err => {
    const { locale } = this.props.intl;
    let error =
      locale === "ru-RU"
        ? "Профиль успешно обновлен"
        : "Profile has been updated";
    if (error) {
      return message.success(error);
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props
          .mutate({
            variables: values
          })
          .then(({ data }) => {
            message.success("Профиль обновлен");
          })
          .catch(this.handleInternalError);
      }
    });
  };

  render() {
    const formItemLayout = {
      labelCol: {
        span: 8
      },
      wrapperCol: {
        span: 8
      }
    };

    let profile = {};
    let countries = [];
    let firstName = "";
    let lastName = "";

    if (this.props.data.loading || this.props.countries.loading) {
      return <div className="loading" />;
    } else {
      countries = this.props.countries.countries;
      profile = this.props.data.data;
      lastName = profile.user.lastName;
      firstName = profile.user.firstName;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <Portlet
        className="page"
        header={
          <FormattedMessage id="user-menu.profile" defaultMessage="Profile" />
        }
      >
        <Form onSubmit={this.handleSubmit}>
          <BreadcrumbsItem
            to="/dashboard/analytics"
            className="ant-breadcrumb-link"
          >
            <FormattedMessage id="user-menu.profile" defaultMessage="Profile" />
          </BreadcrumbsItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.companyName"
                defaultMessage="Organization"
              />
            }
          >
            {getFieldDecorator("companyName", {
              initialValue: profile.companyName
            })(<Input readOnly={true} />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.firstName"
                defaultMessage="First Name"
                description="First Name"
              />
            }
          >
            {getFieldDecorator("firstName", {
              initialValue: firstName
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.lastName"
                defaultMessage="Last Name"
                description="Last Name"
              />
            }
          >
            {getFieldDecorator("lastName", {
              initialValue: lastName
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.position"
                defaultMessage="Position"
                description="Position"
              />
            }
          >
            {getFieldDecorator("position", {
              initialValue: profile.position
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.phone"
                defaultMessage="Phone"
                description="Phone"
              />
            }
          >
            {getFieldDecorator("phone", {
              initialValue: profile.phone
            })(<Phone />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.site"
                defaultMessage="Site"
                description="Site"
              />
            }
          >
            {getFieldDecorator("site", {
              initialValue: profile.site
            })(<Input />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.country"
                defaultMessage="Country"
                description="Country"
              />
            }
          >
            {getFieldDecorator("country", {
              initialValue: profile.country
            })(
              <Select placeholder="" onChange={this.handleSelectChange}>
                {countries.map(d => (
                  <Option key={JSON.parse(d).key}>
                    {JSON.parse(d).full_name}
                  </Option>
                ))}
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.address"
                defaultMessage="Legal Address"
                description="Legal Address"
              />
            }
          >
            {getFieldDecorator("address", {
              initialValue: profile.address
            })(<Input />)}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.industry"
                defaultMessage="Industry"
                description="Industry"
              />
            }
          >
            {getFieldDecorator("industry", {
              initialValue: profile.industry
            })(
              <Select
                placeholder="Select an industry"
                onChange={this.handleSelectChange}
              >
                <Option value="bank">
                  <FormattedMessage
                    id="profile.select.bank"
                    defaultMessage="Bank"
                  />
                </Option>
                <Option value="ecommerce">
                  <FormattedMessage
                    id="profile.select.ecommerce"
                    defaultMessage="E-commerce"
                  />
                </Option>
                <Option value="mobileapp">
                  <FormattedMessage
                    id="profile.select.moblieapp"
                    defaultMessage="Mobile app"
                  />
                </Option>
                <Option value="health">
                  <FormattedMessage
                    id="profile.select.health"
                    defaultMessage="Health and wellness"
                  />
                </Option>
                <Option value="property">
                  <FormattedMessage
                    id="profile.select.property"
                    defaultMessage="Property"
                  />
                </Option>
                <Option value="edu">
                  <FormattedMessage
                    id="profile.select.edu"
                    defaultMessage="Education"
                  />
                </Option>
                <Option value="gaming">
                  <FormattedMessage
                    id="profile.select.gaming"
                    defaultMessage="Gaming"
                  />
                </Option>
                <Option value="trip">
                  <FormattedMessage
                    id="profile.select.trip"
                    defaultMessage="Traveling"
                  />
                </Option>
                <Option value="law">
                  <FormattedMessage
                    id="profile.select.law"
                    defaultMessage="Law"
                  />
                </Option>
              </Select>
            )}
          </FormItem>

          <FormItem
            {...formItemLayout}
            label={
              <FormattedMessage
                id="profile.business"
                defaultMessage="Business"
                description="Business"
              />
            }
          >
            {getFieldDecorator("business", {
              initialValue: profile.business
            })(
              <Select placeholder="" onChange={this.handleSelectChange}>
                <Option value="agency">
                  <FormattedMessage
                    id="profile.select.agency"
                    defaultMessage="Agency"
                  />
                </Option>
                <Option value="brokerage">
                  <FormattedMessage
                    id="profile.select.brokerage"
                    defaultMessage="Brokerage"
                  />
                </Option>
                <Option value="affilate">
                  <FormattedMessage
                    id="profile.select.affilate"
                    defaultMessage="Affilate"
                  />
                </Option>
                <Option value="advertiser">
                  <FormattedMessage
                    id="profile.select.advertiser"
                    defaultMessage="Advertiser"
                  />
                </Option>
                <Option value="other">
                  <FormattedMessage
                    id="profile.select.other"
                    defaultMessage="Other"
                  />
                </Option>
              </Select>
            )}
          </FormItem>
          <FormItem wrapperCol={{ span: 8, offset: 10 }}>
            <Button type="primary" htmlType="submit">
              <FormattedMessage
                id="settings.save"
                defaultMessage="Save"
                description="Save"
              />
            </Button>
          </FormItem>
        </Form>
      </Portlet>
    );
  }
}

const IProfile = Form.create()(injectIntl(FProfile));
const ProfileMutation = graphql(UPDATE_PROFILE)(IProfile);
const Profile = compose(
  graphql(USER_PROFILE, { name: "data" }),
  graphql(COUNTRIES, { name: "countries" })
)(ProfileMutation);

export default Profile;
