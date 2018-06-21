console.log("Env set to " + process.env.REACT_APP_MODE_ENV);

let GQL_SERVER_ADDRESS = null;
let AUTH_URL = null;

if (process.env.REACT_APP_MODE_ENV === "production") {
	GQL_SERVER_ADDRESS = "https://api.xxxxx.com/graphql/";
	AUTH_URL = "https://api.xxxxx.com/api-token-auth/";
} else if (process.env.REACT_APP_MODE_ENV === "development") {
	GQL_SERVER_ADDRESS = "https://dev-api.xxxxx.com/graphql/";
	AUTH_URL = "https://dev-api.xxxxx.com/api-token-auth/";
} else {
	GQL_SERVER_ADDRESS = "http://127.0.0.1:8000/graphql/";
	AUTH_URL = "http://127.0.0.1:8000/api-token-auth/";
}

export { GQL_SERVER_ADDRESS, AUTH_URL };
