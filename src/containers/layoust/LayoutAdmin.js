import React from "react";
import PropTypes from "prop-types";

//component
import Navbar from "@Components/Admin/Navbar";
//css

export default ({ children }) => {
  return (
    <div className="admin-page">
      <div id="content-wrapper" className="d-flex flex-column">
        <Navbar />
        <div id="content">
          <div className="container">{children}</div>
        </div>
      </div>
    </div>
  );
};
