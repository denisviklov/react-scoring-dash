import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "react-router-dom";

import { Row, Col } from "antd";
import LocaleButton from "./locale-button/index";
import FlatpagesLinks from "../flatpages/links";

class LandingComponent extends React.Component {
  render() {
    const flatpages = this.props.flatpages;
    const currentEnv = process.env.REACT_APP_MODE_ENV;
    let isProduction = true ? currentEnv === "production" : false;

    return (
      <Row>
        <Col md={12} offset={8}>
          {console.log(this.props)}
          <h1>
            <FormattedMessage
              id="landing.title"
              defaultMessage="We're comming soon, stay tuned"
              description="main landing message"
            />
          </h1>
          <FlatpagesLinks flatpages={flatpages} />
          <Row>
            {isProduction ? (
              <div>
                <Col md={2} />
                <Col md={6} />
              </div>
            ) : (
              <div>
                <Col md={2}>
                  <Link to="/login">
                    <FormattedMessage
                      id="landing.login"
                      defaultMessage="Login"
                      description="login"
                    />
                  </Link>
                </Col>
                <Col md={6}>
                  <Link to="/signup">
                    <FormattedMessage
                      id="landing.signup"
                      defaultMessage="Signup"
                      description="signup"
                    />
                  </Link>
                </Col>
              </div>
            )}

            <Col md={2}>
              <LocaleButton />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default LandingComponent;
