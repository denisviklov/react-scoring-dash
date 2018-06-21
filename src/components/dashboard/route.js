import React from "react";
import PrivateRoute from "../login/route";
import DashboardLayout from "./layout/index";

const DashboardRoute = ({ component, exact = false, path, authenticated }) => (
	<DashboardLayout>
		<PrivateRoute
			exact={exact}
			path={path}
			component={component}
			authenticated={authenticated}
		/>
	</DashboardLayout>
);

export default DashboardRoute;
