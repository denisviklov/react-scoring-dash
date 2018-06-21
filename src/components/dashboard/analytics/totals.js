import React from "react";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "antd";
import IconStat from "./icon-stat";

const Totals = props => {
  const iconSpan = 4,
    iconStyle = { minWidth: "170px" };
  return (
    <Row type="flex" justify="space-between" gutter={8}>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={
            <FormattedMessage id="analytics.visits" defaultMessage="Визиты" />
          }
          value={100500}
          icon="user"
        />
      </Col>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={
            <FormattedMessage id="analytics.sales" defaultMessage="Продажи" />
          }
          value={100500}
          icon="shop"
        />
      </Col>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={
            <FormattedMessage
              id="analytics.requests"
              defaultMessage="Проверено"
            />
          }
          value={10500}
          icon="global"
        />
      </Col>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={<FormattedMessage id="analytics.ip" defaultMessage="IP" />}
          value={1050}
          icon="desktop"
        />
      </Col>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={
            <FormattedMessage
              id="analytics.devices"
              defaultMessage="Устройства"
            />
          }
          value={5050}
          icon="desktop"
        />
      </Col>
      <Col span={iconSpan} style={iconStyle}>
        <IconStat
          label={
            <FormattedMessage id="analytics.fraud" defaultMessage="% Фрода" />
          }
          value={"23%"}
          icon="frown-o"
        />
      </Col>
    </Row>
  );
};

export default Totals;
