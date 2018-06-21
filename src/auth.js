import Cookie from "js-cookie";
import { AUTH_URL } from "./config/conf";
import Locale from "./locale";

class AuthClient {
  isLoggedIn() {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  login(values, cb) {
    fetch(AUTH_URL, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(values)
    })
      .then(res => {
        res.json().then(res => {
          if (res.token) {
            this.setToken(res.token);
            cb(null, true);
          } else {
            const { formatMessage } = Locale.intl;
            const err = formatMessage({
              id: "login.wrong-credentials-error",
              defaultMessage: "Invalid login or password"
            });
            cb(err, false);
          }
        });
      })
      .catch(err => {
        console.log(err);
        const { formatMessage } = Locale.intl;
        const error = formatMessage({
          id: "general.network-error",
          defaultMessage: "Network error, try again later"
        });
        cb(error, false);
      });
  }

  setToken(token) {
    Cookie.set("token", token);
  }

  logout() {
    Cookie.remove("token");
  }

  getToken() {
    return Cookie.get("token") || null;
  }
}

export default new AuthClient();
