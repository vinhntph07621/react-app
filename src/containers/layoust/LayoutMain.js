import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import PropTypes from "prop-types";
//component

//scss
import "@Assets/scss/layouts-view.scss";
import Row from "reactstrap/lib/Row";
import Col from "reactstrap/lib/Col";

import Sidebar from "../../components/Main/Sidebar";
import Navbar from "../../components/Main/Navbar";
import Header from "../../components/Main/Header/Header"
import "../../assets/scss/style/sb-admin-2.min.css";
import "../../assets/css/bootstrap.min.css"
import "../../assets/css/style.css"
export default ({ children }) => {
  return (
    <div className="user-page">
      <div className="site-wrap">
        <Row>
          <Col md={3}>
            {" "}
            <div className="sidebar">
              <Sidebar />
            </div>
          </Col>
          <Col md={9}>
            <Row>
              <Col md={12}>
              <Header/>
              </Col>
              <Col md={12}>
                {" "}
                <div className="content">{children}</div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
     
    </div>
  );
};
