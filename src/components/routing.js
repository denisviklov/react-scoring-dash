import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";

import Landing from "./landing/index";
import SignupComponent from "./signup/index";
import LoginComponent from "./login/index";
import PasswordRecoveryComponent from "./password-recovery/index";
import { ActivationByCode, ActivationByCodeHash } from "./signup/activation";

import withFlatpages from "./flatpages/urls";
import Flatpage from "./flatpages/page";

import ProjectMainComponent from "./dashboard/projects/index";
import PageNotFound from "./not-found";
import Profile from "./dashboard/profile/index";
import Settings from "./dashboard/settings/index";
import Billing from "./dashboard/billing/index";
import Payments from "./dashboard/payments/index";
import Analytics from "./dashboard/analytics/index";
import DataExchange from "./dashboard/data-exchange/index";
import Info from "./dashboard/info/index";
import LogoutComponent from "./login/logout";
import AuthClient from "../auth";

import PrivateRoute from "./login/route";

import "./main.css";
import DashboardRoute from "./dashboard/route";
import {
  RecoveryConfirmByCode,
  RecoveryConfirmByCodeHash
} from "./password-recovery/confirm";

function isLoggedIn() {
  return AuthClient.isLoggedIn();
}

class Main extends React.Component {
  render() {
    if (this.props.data.loading) {
      return <div className="loading">Loading</div>;
    }
    let flatpages = this.props.data.flatpages || [];
    return (
      <div className="main-wrapper">
        <Switch>
          <Route
            exact
            path="/"
            render={props => <Landing {...props} flatpages={flatpages} />}
          />
          <Route path="/login" component={LoginComponent} />
          <Route exact path="/signup" component={SignupComponent} />
          <Route exact path="/signup/confirm" component={ActivationByCode} />
          <Route
            exact
            path="/signup/confirm/:hash"
            component={ActivationByCodeHash}
          />
          <Route exact path="/recovery" component={PasswordRecoveryComponent} />
          <Route
            exact
            path="/recovery/confirm"
            component={RecoveryConfirmByCode}
          />
          <Route
            exact
            path="/recovery/confirm/:hash"
            component={RecoveryConfirmByCodeHash}
          />
          <PrivateRoute
            path="/logout"
            component={LogoutComponent}
            authenticated={isLoggedIn}
          />
          {flatpages.map((flatpage, index) => (
            <Route exact path={flatpage.url} component={Flatpage} key={index} />
          ))}

          <Route
            exact
            path="/dashboard"
            render={() => <Redirect to="/dashboard/projects" />}
          />
          <DashboardRoute
            exact
            path="/dashboard/projects"
            component={ProjectMainComponent}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/analytics"
            component={Analytics}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/data-exchange"
            component={DataExchange}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/info"
            component={Info}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/profile"
            component={Profile}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/settings"
            component={Settings}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/billing"
            component={Billing}
            authenticated={isLoggedIn}
          />
          <DashboardRoute
            exact
            path="/dashboard/payments"
            component={Payments}
            authenticated={isLoggedIn}
          />

          <Route component={PageNotFound} />
        </Switch>
      </div>
    );
  }
}

export default withFlatpages(Main);
