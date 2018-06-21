import React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import { compose, graphql } from 'react-apollo';
import Portlet from '../../utils/portlet';
import { Radio, Icon} from 'antd';
import {
  ComposedChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Bar,
  ResponsiveContainer,
  Legend
} from 'recharts';

import {LEADS_BY_PERIOD_QUERY, LEAD_DURATION_BY_PERIOD_QUERY} from './gql/query'
import {chooseColor} from "./utils";


const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;


class MainChart extends React.Component {

  static propTypes = {
    metric: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      mode: 'line',
      activeTitle: null
    }
  }

  onMouseEnter = (o) => {
    this.setState({ activeTitle: o.value });
  }

  onMouseLeave = (o) => {
    this.setState({ activeTitle: null });
  }

  _getHeader(metric) {
    const {formatMessage} = this.props.intl;
    switch (metric) {
      case 'lead-age':
        return formatMessage({ id: 'analytics.leads-by-period', defaultMessage: 'Leads'})
      case 'lead-duration':
        return formatMessage({ id: 'analytics.lead-duration', defaultMessage: 'Lead Duration'})
      default:
        return null
    }
  }

  _renderLeadSeries(SeriesCmp) {
    const {formatMessage} = this.props.intl;
    return <SeriesCmp
      dataKey='leadsCount'
      strokeOpacity={this.state.activeTitle !== null ? 0.7 : 1}
      fillOpacity={this.state.activeTitle !== null ? 0.7 : 1}
      fill={chooseColor(true)} connectNulls={true}
      name={formatMessage({ id: 'analytics.leads-count', defaultMessage: 'Leads Count'})}/>
  }

  _renderLeadDurationSeries(groups, SeriesCmp) {
    let res = [];
    for (let i = 0; i < groups.length; i++) {
      let group = groups[i];
      let color = chooseColor(i === 0);
      res.push(
        <SeriesCmp
          key={group} type='monotone'
          name={group} connectNulls={true}
          dataKey={group} fill={color} stroke={color}
          strokeOpacity={this.state.activeTitle === group ? 0.7 : 1}
          fillOpacity={this.state.activeTitle === group ? 0.7 : 1}
        />
      );
    }
    return res;
  }

  _renderSeries(metric, data, SeriesCmp) {
    switch (metric) {
      case 'lead-age': return this._renderLeadSeries(SeriesCmp);
      case 'lead-duration': return this._renderLeadDurationSeries(data.groups, SeriesCmp)
      default: return null;
    }
  }

  _renderChart() {
    const SeriesCmp = this.state.mode === 'bar' ? Bar : Line;
    return (
      <ResponsiveContainer>
        <ComposedChart data={this.props.data.data}>
          <XAxis dataKey='created'/>
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <CartesianGrid vertical={false}/>
          { this._renderSeries(this.props.metric, this.props.data, SeriesCmp) }
          <Legend onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}/>
        </ComposedChart>
      </ResponsiveContainer>
    )
  }

  onModeChange = (e) => {
    this.setState({ mode: e.target.value });
  }

  renderTools() {
    return (
     <RadioGroup onChange={this.onModeChange} defaultValue="line">
        <RadioButton value="line"><Icon type="line-chart" /></RadioButton>
        <RadioButton value="bar"><Icon type="bar-chart" /></RadioButton>
     </RadioGroup>
    )
  }

  render() {
    return (
      <Portlet
        header={this._getHeader(this.props.metric)}
        tools={this.renderTools()}
        className='main-chart'
      >
        {this.props.data.loading ?
          <div className='loading'/>:
          this._renderChart()
        }
      </Portlet>
    )
  }
}

/**
 * transpose data and collect groups for duration chart
 * @param data
 * @returns {*}
 */
const prepareGroupedData = (data) => {
  let groups = [];
  if (!data) { return { data, groups}; }
  let res = [];
  let period = null;
  for (let i = 0; i < data.length; i++) {
    let item = data[i];
    if (!period || item.created !== period.created) {
      period = {created: item.created}
      res.push(period);
    }
    period[item.groupTitle] = item.leadsCount;
    if (groups.indexOf(item.groupTitle) === -1) {
      groups.push(item.groupTitle);
    }
  }
  return { data: res, groups} ;
}

export default compose(
  graphql(LEADS_BY_PERIOD_QUERY, {
    options: ({dateFrom, dateTo, projects}) => {
      return {
        variables: { dateFrom, dateTo, projects },
        notifyOnNetworkStatusChange: true
      };
    },
    skip: (props) => (props.metric !== 'lead-age')}),
  graphql(LEAD_DURATION_BY_PERIOD_QUERY, {
    options: ({dateFrom, dateTo, groups, projects}) => {
      return {
        variables: { dateFrom, dateTo, groups, projects },
        notifyOnNetworkStatusChange: true
      };
    },
    skip: (props) => (props.metric !== 'lead-duration'),
    props: ({ ...ownProps, data: { loading, data, refetch } }) => {
      let res = prepareGroupedData(data);
      return { ...ownProps, data: { loading, data: res.data, groups: res.groups, refetch }}
    }
  }),
)(injectIntl(MainChart));