import React from "react";
import PropTypes from "prop-types";
import { Select, Button, Row, Col, Radio, DatePicker, message } from "antd";
import { FormattedMessage, injectIntl } from "react-intl";
import { withApollo } from "react-apollo";
import Portlet from "../../utils/portlet";
import { ALL_PROJECTS } from "../projects/gql/query";
import { leadGroupsQuery, leadGroupsVar } from "./gql/query";

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { RangePicker } = DatePicker;
const Option = Select.Option;

class Filter extends React.Component {
  static propTypes = {
    period: PropTypes.array.isRequired,
    onPeriodChange: PropTypes.func,
    onMetricChange: PropTypes.func,
    onLeadAgeGroupsChange: PropTypes.func,
    onProjectsChange: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.state = {
      projects: null,
      leadAgeGroups: null,
      leadDurationGroups: null
    };
  }

  getProjectsOptions(projects) {
    return projects.map((project, i) => {
      return <Option key={project.id}>{project.title}</Option>;
    });
  }

  getLeadGoupsOptions(groups) {
    return groups.map((group, i) => {
      return <Option key={group.groupName}>{group.groupTitle}</Option>;
    });
  }

  onMetricChange = e => {
    e.preventDefault();
    this.loadLeadGroups(e.target.value);
    this.props.onMetricChange(e.target.value);
  };

  handleInternalError = err => {
    console.error(err);
    const { formatMessage } = this.props.intl;
    message.error(
      formatMessage({
        id: "general.network-error",
        defaultMessage: "Network error, try again later"
      })
    );
  };

  loadProjects() {
    if (this.state.projects === null) {
      this.props.client
        .query({ query: ALL_PROJECTS })
        .then(({ data: { allProjects } }) => {
          this.setState({ projects: allProjects });
        })
        .catch(this.handleInternalError);
    }
  }

  loadLeadGroups(metric) {
    if (["lead-age", "lead-duration"].indexOf(metric) === -1) {
      return;
    }
    const stateVar = leadGroupsVar(metric);
    if (this.state[stateVar] === null) {
      this.props.client
        .query({ query: leadGroupsQuery(metric) })
        .then(({ data }) => {
          let state = {};
          state[stateVar] = data[stateVar];
          this.setState(state);
        })
        .catch(this.handleInternalError);
    }
  }

  componentWillMount() {
    this.loadLeadGroups(this.props.metric);
    this.loadProjects();
  }

  renderLeadGroups(metric) {
    if (["lead-age", "lead-duration"].indexOf(metric) === -1) {
      return "";
    }
    return (
      <Row style={{ marginTop: "10px" }}>
        <Select
          mode="multiple"
          placeholder="Группы"
          onChange={this.props.onLeadGroupsChange}
          style={{ width: "100%" }}
          value={this.props.selected}
        >
          {this.getLeadGoupsOptions(this.state[leadGroupsVar(metric)] || [])}
        </Select>
      </Row>
    );
  }

  render() {
    return (
      <Portlet style={this.props.style}>
        <Row>
          <RadioGroup
            defaultValue={this.props.metric}
            onChange={this.onMetricChange}
          >
            <RadioButton value="lead-age">
              <FormattedMessage
                id="analytics.lead-age"
                defaultMessage="Lead age"
              />
            </RadioButton>
            <RadioButton value="lead-duration">
              <FormattedMessage
                id="analytics.lead-duration"
                defaultMessage="Lead duration"
              />
            </RadioButton>
          </RadioGroup>
        </Row>
        {this.renderLeadGroups(this.props.metric)}
        <Row type="flex" justify="start" style={{ margin: "10px 0" }}>
          <Col span={8}>
            <RangePicker
              style={{ width: "200px" }}
              onChange={this.props.onPeriodChange}
              defaultValue={this.props.period}
              allowClear={false}
            />
          </Col>
          {/*<Col span={8} style={{textAlign: 'center'}}>*/}
          {/*<RadioGroup defaultValue='count'>*/}
          {/*<RadioButton value='count'>Count</RadioButton>*/}
          {/*<RadioButton value='percent'>Percent</RadioButton>*/}
          {/*</RadioGroup>*/}
          {/*</Col>*/}
          <Col offset={8} span={8} style={{ textAlign: "center" }}>
            <Button>Export to CSV</Button> <Button>Export to PDF</Button>
          </Col>
        </Row>
        <Row>
          <Select
            mode="multiple"
            placeholder="Проекты"
            style={{ width: "100%" }}
            onChange={this.props.onProjectsChange}
          >
            {this.getProjectsOptions(this.state.projects || [])}
          </Select>
        </Row>
      </Portlet>
    );
  }
}

export default withApollo(injectIntl(Filter));

// {/*<RadioButton value='offer'>Offer</RadioButton>*/}
// {/*<RadioButton value='affiliate'>Affiliate</RadioButton>*/}
// {/*<RadioButton value='date'>Date</RadioButton>*/}
// {/*<RadioButton value='advertiser'>Advertiser</RadioButton>*/}
// {/*<RadioButton value='ip'>IP</RadioButton>*/}
// {/*<RadioButton value='ipd'>IP(D)</RadioButton>*/}
// {/*<RadioButton value='affiliate-sub1'>Affiliate sub1</RadioButton>*/}
// {/*<RadioButton value='affiliate-sub2'>Affiliate sub2</RadioButton>*/}
// {/*<RadioButton value='affiliate-sub3'>Affiliate sub3</RadioButton>*/}
// {/*<RadioButton value='affiliate-sub4'>Affiliate sub4</RadioButton>*/}
// {/*<RadioButton value='affiliate-sub5'>Affiliate sub5</RadioButton>*/}
// {/*<RadioButton value='referal-host'>Referal Host</RadioButton>*/}
// {/*<RadioButton value='source'>Source</RadioButton>*/}
// {/*<RadioButton value='country'>Country</RadioButton>*/}
// {/*<RadioButton value='isp'>ISP</RadioButton>*/}
// {/*<RadioButton value='city'>City</RadioButton>*/}
// {/*<RadioButton value='status'>Status</RadioButton>*/}
// {/*<RadioButton value='user-device'>User device</RadioButton>*/}
// {/*<RadioButton value='browser'>Browser</RadioButton>*/}
// {/*<RadioButton value='os-version'>OS version</RadioButton>*/}
// {/*<RadioButton value='os'>OS</RadioButton>*/}
// {/*<RadioButton value='hour'>Hour</RadioButton>*/}
// {/*<RadioButton value='fraud-status'>Fraud status</RadioButton>*/}
// {/*<RadioButton value='fraud-reason'>Fraud reason</RadioButton>*/}
// {/*<RadioButton value='time-to-install'>Time to install</RadioButton>*/}
// {/*<RadioButton value='android-id'>Android ID</RadioButton>*/}
// {/*<RadioButton value='idfa'>IDFA</RadioButton>*/}
// {/*<RadioButton value='email'>E-mail</RadioButton>*/}
// {/*<RadioButton value='connection-type'>Connection Type</RadioButton>*/}
// {/*<RadioButton value='device-brand'>Device brand</RadioButton>*/}
// {/*<RadioButton value='user-id'>User ID</RadioButton>*/}
