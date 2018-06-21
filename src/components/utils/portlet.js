import React from "react";
import "./portlet.css";

const Portlet = props => {
  let className = "portlet portlet-boxed";
  if (props.className) {
    className += " " + props.className;
  }
  return (
    <div className={className} style={props.style}>
      {props.header ? (
        <div className="portlet-header">
          {props.preHeader ? props.preHeader : ""}
          <h2 className="portlet-title">{props.header}</h2>
          {props.tools ? (
            <div className="portlet-tools">{props.tools}</div>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <div className="portlet-body">{props.children}</div>
    </div>
  );
};

export default Portlet;
