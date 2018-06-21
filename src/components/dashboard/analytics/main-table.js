import React from "react";
import Portlet from "../../utils/portlet";
import { Table } from "antd";

const MainTable = props => {
  const columns = [
    {
      title: "Какой то столбец1",
      dataIndex: "col1",
      key: "col1"
    },
    {
      title: "Какой то столбец2",
      dataIndex: "col2",
      key: "col2"
    }
  ];

  return (
    <Portlet header={"Таблица с какими то данными"} style={props.style}>
      <Table
        style={{ borderRadius: "4px" }}
        bordered
        rowClassName={(record, index) => (index % 2 === 0 ? "odd" : "even")}
        dataSource={props.data}
        columns={columns}
      />
    </Portlet>
  );
};

export default MainTable;
