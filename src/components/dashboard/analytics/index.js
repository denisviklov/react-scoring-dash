import React from "react";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import { FormattedMessage } from "react-intl";
import { Row, Col } from "antd";
import moment from "moment";
import Totals from "./totals";
import Filter from "./filter";
import MainChart from "./main-chart";
import PieChart from "./pie-chart";
import MainTable from "./main-table";

import "./analytics.css";

import { tableData } from "./data";

class Analytics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dateFrom: moment().add(-1, "year"),
      dateTo: moment(),
      projects: [],
      metric: "lead-age",
      groups: []
    };
  }

  onPeriodChange = (date, dateString) => {
    this.setState({ dateFrom: date[0], dateTo: date[1] });
  };

  onMetricChange = metric => {
    this.setState({ metric, groups: [] });
  };

  onProjectsChange = projects => {
    this.setState({ projects });
  };

  onLeadGroupsChange = groups => {
    this.setState({ groups });
  };

  render() {
    return (
      <div className="page">
        <BreadcrumbsItem
          to="/dashboard/analytics"
          className="ant-breadcrumb-link"
        >
          <FormattedMessage
            id="main-menu.analytics"
            defaultMessage="Analytics"
          />
        </BreadcrumbsItem>

        <Totals />

        <Filter
          style={{ marginTop: "8px" }}
          period={[this.state.dateFrom, this.state.dateTo]}
          onPeriodChange={this.onPeriodChange}
          metric={this.state.metric}
          onMetricChange={this.onMetricChange}
          selected={this.state.groups}
          onLeadGroupsChange={this.onLeadGroupsChange}
          onProjectsChange={this.onProjectsChange}
        />

        <Row
          gutter={8}
          style={{ marginTop: "8px" }}
          className={"charts-row"}
          type="flex"
        >
          <Col span={16} style={{ minWidth: "400px" }}>
            <MainChart
              metric={this.state.metric}
              dateFrom={this.state.dateFrom}
              dateTo={this.state.dateTo}
              groups={this.state.groups}
              projects={this.state.projects}
            />
          </Col>
          <Col span={8} style={{ minWidth: "341px" }}>
            <PieChart
              metric={this.state.metric}
              dateFrom={this.state.dateFrom}
              dateTo={this.state.dateTo}
              groups={this.state.groups}
              projects={this.state.projects}
            />
          </Col>
        </Row>

        <MainTable data={tableData} style={{ marginTop: "8px" }} />
      </div>
    );
  }
}

export default Analytics;
