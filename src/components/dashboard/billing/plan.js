import React from "react";
import PropTypes from "prop-types";
import { Button, Icon } from "antd";
import { injectIntl, FormattedMessage } from "react-intl";
import Portlet from "../../utils/portlet";

class BillingPlan extends React.Component {
  constructor(props) {
    super(props);
    this.onChoose = this.onChoose.bind(this);
  }

  onChoose(e) {
    this.props.onChoose(this.props.name);
  }

  render() {
    const mostPopular = this.props.mostPopular;
    let className = "billing-plan";
    if (mostPopular) {
      className += " most-popular";
    }
    const title = this.props.title || this.props.name;
    let preHeader = "";
    if (mostPopular) {
      preHeader = (
        <div className="plan-most-popular">
          <FormattedMessage
            id="billing.most-popular"
            defaultMessage="MOST POPULAR"
          />
        </div>
      );
    }
    return (
      <Portlet header={title} className={className} preHeader={preHeader}>
        <div className="plan-perfect-for">
          <FormattedMessage
            id="billing.perfect-for"
            defaultMessage="Perfect for"
          />
          <span style={{ marginLeft: "5px" }}>{this.props.perfectFor}</span>
        </div>
        <div className="plan-size">
          <FormattedMessage
            id="billing.offers-count"
            defaultMessage="Offers count"
          />:
          <span style={{ marginLeft: "5px" }} className="val">
            {this.props.offers}
          </span>
        </div>
        <div className="plan-price">
          <span className="val">
            <FormattedMessage
              id="billing.price-value"
              defaultMessage="{price}р"
              values={{ price: this.props.price }}
            />
          </span>/<FormattedMessage
            id="billing.per-month"
            defaultMessage="mo"
          />
        </div>
        {this.props.current ? (
          <span className="current-btn" disabled>
            <Icon type="check" style={{ marginRight: "5px" }} />
            <FormattedMessage
              id="billing.current-plan"
              defaultMessage="Current plan"
            />
          </span>
        ) : (
          <Button className="choose-btn" onClick={this.onChoose} type="primary">
            <FormattedMessage
              id="billing.choose-plan"
              defaultMessage="Choose plan"
            />
          </Button>
        )}
        <hr />
        <div className="plan-features">
          {this.props.features.map((feature, i) => (
            <p key={"f" + i}>{feature}</p>
          ))}
        </div>
      </Portlet>
    );
  }
}

BillingPlan.propTypes = {
  name: PropTypes.string.isRequired,
  title: PropTypes.string,
  perfectFor: PropTypes.string.isRequired,
  offers: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  features: PropTypes.array.isRequired,
  mostPopular: PropTypes.bool,
  current: PropTypes.bool,
  onChoose: PropTypes.func.isRequired
};

export default injectIntl(BillingPlan);
