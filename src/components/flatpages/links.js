import React from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";
import Locale from "../../locale";

const FlatpagesLinks = props => {
  let flatpages = props.flatpages;
  return (
    <Row>
      {flatpages.map((flatpage, index) => (
        <Col md={4} key={index}>
          <Link to={flatpage.url}>
            {flatpage["title" + (Locale.get() === "ru-RU" ? "Ru" : "")]}
          </Link>
        </Col>
      ))}
    </Row>
  );
};

export default FlatpagesLinks;
