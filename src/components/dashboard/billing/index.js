import React from "react";
import { Form, Row, Col } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import BillingPlan from "./plan";

import "./billing.css";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";

class Billing extends React.Component {
  constructor(props) {
    super(props);
    this.onChoose = this.onChoose.bind(this);
  }

  onChoose(planName) {
    console.log("choosed plan", planName);
  }

  render() {
    const { locale, formatMessage } = this.props.intl;
    const span = 5;
    return (
      <Form className="billing-form page">
        <BreadcrumbsItem
          to="/dashboard/billing"
          className="ant-breadcrumb-link"
        >
          <FormattedMessage id="user-menu.billing" defaultMessage="Billing" />
        </BreadcrumbsItem>
        <h1>
          <FormattedMessage id="user-menu.billing" defaultMessage="Billing" />
        </h1>
        <Row
          className="billing-plans"
          type="flex"
          justify="center"
          align="bottom"
        >
          <Col span={span}>
            <BillingPlan
              name="free"
              title="Free"
              perfectFor={formatMessage({
                id: "billing.perfect-for-first-steps",
                defaultMessage: "first steps and trial period"
              })}
              offers={1}
              price={0}
              features={[
                formatMessage({
                  id: "billing.analytics-feature",
                  defaultMessage: "Analytics dashboard"
                }),
                formatMessage({
                  id: "billing.fraud-rules-feature",
                  defaultMessage: "Default fraud rules"
                })
              ]}
              current={true}
              onChoose={this.onChoose}
            />
          </Col>
          <Col span={span}>
            <BillingPlan
              name="beginer"
              title="Beginer"
              perfectFor={formatMessage({
                id: "billing.perfect-for-marketing-beginners",
                defaultMessage: "marketing beginers"
              })}
              offers={3}
              price={locale === "ru-RU" ? 1800 : 15}
              features={[
                formatMessage({
                  id: "billing.analytics-feature",
                  defaultMessage: "Analytics dashboard"
                }),
                formatMessage({
                  id: "billing.fraud-rules-feature",
                  defaultMessage: "Default fraud rules"
                }),
                formatMessage({
                  id: "billing.basic-support-feature",
                  defaultMessage: "Basic support"
                })
              ]}
              onChoose={this.onChoose}
            />
          </Col>
          <Col span={span}>
            <BillingPlan
              name="pro"
              title="Pro"
              perfectFor={formatMessage({
                id: "billing.perfect-for-growth-focused",
                defaultMessage: "marketing beginers"
              })}
              offers={500}
              price={locale === "ru-RU" ? 3600 : 60}
              features={[
                formatMessage({
                  id: "billing.analytics-feature",
                  defaultMessage: "Analytics dashboard"
                }),
                formatMessage({
                  id: "billing.custom-fraud-rules-feature",
                  defaultMessage: "Customizable fraud rules"
                }),
                formatMessage({
                  id: "billing.ext-support-feature",
                  defaultMessage: "Pro support"
                })
              ]}
              mostPopular={true}
              onChoose={this.onChoose}
            />
          </Col>
          <Col span={span}>
            <BillingPlan
              name="max"
              title="Max"
              perfectFor={formatMessage({
                id: "billing.perfect-for-pros",
                defaultMessage: "marketing beginers"
              })}
              offers={10000}
              price={locale === "ru-RU" ? 12000 : 200}
              features={[
                formatMessage({
                  id: "billing.analytics-feature",
                  defaultMessage: "Analytics dashboard"
                }),
                formatMessage({
                  id: "billing.custom-fraud-rules-feature",
                  defaultMessage: "Customizable fraud rules"
                }),
                formatMessage({
                  id: "billing.24/7-support-feature",
                  defaultMessage: "24/7 support"
                })
              ]}
              onChoose={this.onChoose}
            />
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(injectIntl(Billing));
