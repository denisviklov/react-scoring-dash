import React from "react";
import { FormattedMessage } from "react-intl";
import { BreadcrumbsItem } from "react-breadcrumbs-dynamic";
import Portlet from "../../utils/portlet";

const DataExchange = () => (
	<Portlet
		className="page"
		header="Здесь будет обмен данными по продажам лидов"
	>
		<BreadcrumbsItem
			to="/dashboard/data-exchange"
			className="ant-breadcrumb-link"
		>
			<FormattedMessage
				id="main-menu.data-exchange"
				defaultMessage="Data Exchange"
			/>
		</BreadcrumbsItem>
	</Portlet>
);

export default DataExchange;
