import AuthClient from "./auth";

it("getToken returns null if not loggedIn", () => {
	expect(AuthClient.getToken()).toEqual(null);
});
it("getToken returns token if loggedIn", () => {
	AuthClient.setToken("123");
	expect(AuthClient.getToken()).toEqual("123");
});
