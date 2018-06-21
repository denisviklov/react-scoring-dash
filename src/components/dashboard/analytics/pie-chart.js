import React from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import { compose, graphql } from "react-apollo";
import Portlet from "../../utils/portlet";
import {
  PieChart as RPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend
} from "recharts";
import { chooseColor } from "./utils";
import { LEAD_AGE_TOTALS_QUERY, LEAD_DURATION_TOTALS_QUERY } from "./gql/query";

class PieChart extends React.Component {
  static propTypes = {
    metric: PropTypes.string.isRequired
  };

  state = {
    activeTitle: null
  };

  _getOptionsByMetric(metric) {
    switch (metric) {
      case "lead-age":
        return { nameKey: "groupTitle", dataKey: "leadsCount" };
      case "lead-duration":
        return { nameKey: "groupTitle", dataKey: "leadsCount" };
      default:
        return null;
    }
  }

  onMouseEnter = o => {
    this.setState({ activeTitle: o.value });
  };

  onMouseLeave = o => {
    this.setState({ activeTitle: null });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const opts = this._getOptionsByMetric(this.props.metric);
    const data = this.props.data.data;
    return (
      <Portlet
        header={formatMessage({
          id: "analytics." + this.props.metric,
          defaultMessage: this.props.metric
        })}
        style={{ minWidth: "300px" }}
        className="pie-chart"
      >
        {this.props.data.loading ? (
          <div className="loading" />
        ) : (
          <ResponsiveContainer>
            <RPieChart>
              <Pie
                data={data}
                dataKey={opts.dataKey}
                label
                minAngle={3}
                paddingAngle={1}
                nameKey={opts.nameKey}
                fill="#bcbcbc"
                outerRadius={100}
                isAnimationActive={true}
              >
                {data.map((item, i) => (
                  <Cell
                    key={i}
                    fill={chooseColor(i === 0)}
                    fillOpacity={
                      this.state.activeTitle === item.groupTitle ? 0.7 : 1
                    }
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
              />
            </RPieChart>
          </ResponsiveContainer>
        )}
      </Portlet>
    );
  }
}

export default compose(
  graphql(LEAD_AGE_TOTALS_QUERY, {
    options: props => ({
      variables: { ...props },
      notifyOnNetworkStatusChange: true
    }),
    skip: props => props.metric !== "lead-age"
  }),
  graphql(LEAD_DURATION_TOTALS_QUERY, {
    options: props => ({
      variables: { ...props },
      notifyOnNetworkStatusChange: true
    }),
    skip: props => props.metric !== "lead-duration"
  })
)(injectIntl(PieChart));
