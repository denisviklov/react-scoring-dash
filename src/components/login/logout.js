import React from "react";
import { Redirect } from "react-router-dom";
import { withApollo } from "react-apollo";
import AuthClient from "../../auth";

class LogoutComponent extends React.Component {
  componentWillMount() {
    AuthClient.logout();
    this.props.client.resetStore();
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default withApollo(LogoutComponent);
