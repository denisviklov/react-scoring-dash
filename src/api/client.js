import { ApolloClient, createNetworkInterface } from "react-apollo";
import { GQL_SERVER_ADDRESS } from "../config/conf.js";
import Locale from "../locale";
import AuthClient from "../auth";

const networkInterface = createNetworkInterface({
  uri: GQL_SERVER_ADDRESS,
  opts: {
    credentials: "same-origin"
  }
});

networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }

      const token = AuthClient.getToken();
      req.options.headers["authorization"] = `JWT ${token}`;

      req.options.headers["locale"] = Locale.get();
      next();
    }
  }
]);

const client = new ApolloClient({
  networkInterface: networkInterface
});

export default client;
