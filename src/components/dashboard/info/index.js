import React from "react";
import { FormattedMessage } from "react-intl";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Portlet from "../../utils/portlet";

const Info = () => (
	<Portlet className="page" header="Здесь будет справочная информация">
		<BreadcrumbsItem to="/dashboard/info" className="ant-breadcrumb-link">
			<FormattedMessage id="main-menu.info" defaultMessage="Information" />
		</BreadcrumbsItem>
	</Portlet>
);

export default Info;
