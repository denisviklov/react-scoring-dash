import React from "react";
import { Table, Button } from "antd";
import { FormattedMessage } from "react-intl";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Portlet from "../../utils/portlet";
import Locale from "../../../locale";

const { Column } = Table;

const Payments = props => {
  const locale = Locale.get();
  let dataSource = [
    {
      key: "1",
      title: "Fee for September 2017",
      titleRu: "Абонентская плата за сентябрь 2017",
      created: "2017-10-01",
      paid: "2017-10-09"
    },
    {
      key: "2",
      title: "Fee for October 2017",
      titleRu: "Абонентская плата за октябрь 2017",
      created: "2017-11-01",
      paid: null
    }
  ].reverse();

  const tableLocale = {
    filterConfirm: <FormattedMessage id="table.ok" defaultMessage="Ok" />,
    filterReset: <FormattedMessage id="table.reset" defaultMessage="Reset" />,
    emptyText: <FormattedMessage id="table.no-data" defaultMessage="No Data" />
  };

  return (
    <Portlet
      className="page"
      header={
        <FormattedMessage id="user-menu.payments" defaultMessage="Payments" />
      }
    >
      <BreadcrumbsItem to="/dashboard/payments" className="ant-breadcrumb-link">
        <FormattedMessage id="user-menu.payments" defaultMessage="Payments" />
      </BreadcrumbsItem>
      <Table dataSource={dataSource} locale={tableLocale}>
        <Column
          title={
            <FormattedMessage id="payments.title" defaultMessage="Title" />
          }
          dataIndex="title"
          key="title"
          render={(text, record) =>
            locale === "ru-RU" ? record.titleRu : record.title}
        />
        <Column
          title={
            <FormattedMessage
              id="payments.created-date"
              defaultMessage="Date created"
            />
          }
          dataIndex="created"
          key="created"
        />
        <Column
          title={
            <FormattedMessage id="payments.state" defaultMessage="State" />
          }
          dataIndex="paid"
          key="paid"
          render={(text, record) =>
            record.paid ? (
              <span>
                <FormattedMessage id="payments.paid" defaultMessage="Paid" />
                <span style={{ marginLeft: "5px" }}>{record.paid}</span>
              </span>
            ) : (
              <span>
                <FormattedMessage
                  id="payments.not-paid"
                  defaultMessage="Not paid"
                />
                <Button style={{ marginLeft: "5px" }}>
                  <FormattedMessage
                    id="payments.pay-now"
                    defaultMessage="Pay now"
                  />
                </Button>
              </span>
            )}
        />
      </Table>
    </Portlet>
  );
};

export default Payments;
