import React, { Component } from "react";
import { injectIntl } from "react-intl";
import Locale from "./locale";
import Main from "./components/routing";

class App extends Component {
  render() {
    Locale.setIntl(this.props.intl);
    return (
      <div className="App">
        <Main />
      </div>
    );
  }
}

export default injectIntl(App);
