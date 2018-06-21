import React from "react";
import ReactDOM from "react-dom";

import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from "react-router-dom";

import { LocaleProvider } from "antd";
import { IntlProvider } from "react-intl";
import Locale from "./locale";

import registerServiceWorker from "./registerServiceWorker";

import App from "./App";
import client from "./api/client";

import { BreadcrumbsProvider } from "react-breadcrumbs-dynamic";

Locale.addLocaleData();

ReactDOM.render(
  <IntlProvider locale={Locale.get()} messages={Locale.getMessages()}>
    <LocaleProvider locale={Locale.getAntdLocale()}>
      <Router>
        <ApolloProvider client={client}>
          <BreadcrumbsProvider
            shouldBreadcrumbsUpdate={(prevProps, props) => {
              return prevProps.to !== props.to;
            }}
          >
            <App />
          </BreadcrumbsProvider>
        </ApolloProvider>
      </Router>
    </LocaleProvider>
  </IntlProvider>,
  document.getElementById("root")
);

/*ReactDOM.render(
  <Router>
   <ApolloProvider client={client}>
    <LocaleProvider locale={ruRU}>
      <IntlProvider locale={appLocale.locale} messages={appLocale.messages}>
        <App/>
      </IntlProvider>
    </LocaleProvider>
   </ApolloProvider>
  </Router>,
  document.getElementById('root')
  );*/

registerServiceWorker();
