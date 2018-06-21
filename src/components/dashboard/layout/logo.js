import React from "react";
import { Icon } from "antd";
import { Link } from "react-router-dom";

const Logo = () => (
	<Link to="/dashboard" className="logo">
		<Icon
			type="pie-chart"
			style={{ marginRight: "10px", fontSize: "16px", color: "#fff" }}
		/>
		<span>CONDUSTER</span>
	</Link>
);

export default Logo;
