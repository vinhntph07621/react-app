import React, { useState, useEffect, useContext } from "react";

//lodash
import { isEmpty, values } from "lodash";

//context
import { AppContext } from "../../../contexts/AppContext";

//reactstrap
import { Container, Row, Col } from "reactstrap";

const Header = (props) => {
  const ctx = useContext(AppContext);
  //logout
  const onChangeLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };
  return (
    <div className="header">
      <div className="header-left">
        <a href="index-2.html" className="logo">
          <img src="assets/img/logo.png" width={35} height={35} alt="" />{" "}
          <span>Preclinic</span>
        </a>
      </div>
      <a id="toggle_btn" href="javascript:void(0);">
        <i className="fa fa-bars" />
      </a>
      <a id="mobile_btn" className="mobile_btn float-left" href="#sidebar">
        <i className="fa fa-bars" />
      </a>
      <ul className="nav user-menu float-right">
        <li className="nav-item dropdown d-none d-sm-block">
          <a
            href="#"
            className="dropdown-toggle nav-link"
            data-toggle="dropdown"
          >
            <i className="fa fa-bell-o" />{" "}
            <span className="badge badge-pill bg-danger float-right">3</span>
          </a>
          <div className="dropdown-menu notifications">
            <div className="topnav-dropdown-header">
              <span>Notifications</span>
            </div>
            <div className="drop-scroll">
              <ul className="notification-list">
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">
                        <img
                          alt="John Doe"
                          src="assets/img/user.jpg"
                          className="img-fluid"
                        />
                      </span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">John Doe</span> added new
                          task{" "}
                          <span className="noti-title">
                            Patient appointment booking
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">4 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">V</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Tarah Shropshire</span>{" "}
                          changed the task name{" "}
                          <span className="noti-title">
                            Appointment booking with payment gateway
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">6 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">L</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Misty Tison</span> added{" "}
                          <span className="noti-title">Domenic Houston</span>{" "}
                          and <span className="noti-title">Claire Mapes</span>{" "}
                          to project{" "}
                          <span className="noti-title">
                            Doctor available module
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">8 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">G</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Rolland Webber</span>{" "}
                          completed task{" "}
                          <span className="noti-title">
                            Patient and Doctor video conferencing
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">12 mins ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
                <li className="notification-message">
                  <a href="activities.html">
                    <div className="media">
                      <span className="avatar">V</span>
                      <div className="media-body">
                        <p className="noti-details">
                          <span className="noti-title">Bernardo Galaviz</span>{" "}
                          added new task{" "}
                          <span className="noti-title">
                            Private chat module
                          </span>
                        </p>
                        <p className="noti-time">
                          <span className="notification-time">2 days ago</span>
                        </p>
                      </div>
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="topnav-dropdown-footer">
              <a href="activities.html">View all Notifications</a>
            </div>
          </div>
        </li>
        <li className="nav-item dropdown d-none d-sm-block">
          <a
            href="javascript:void(0);"
            id="open_msg_box"
            className="hasnotifications nav-link"
          >
            <i className="fa fa-comment-o" />{" "}
            <span className="badge badge-pill bg-danger float-right">8</span>
          </a>
        </li>
        <li>
          {/* login */}
          <div className="nav-item-right">
            <span className="user-name">
              {!isEmpty(ctx.user) ? (
                <div className="dropdown">
                  <span>
                    <a>
                      <i className="fa fa-user pr-2"></i>
                      {ctx.user.name}
                    </a>
                  </span>
                  <div className="dropdown-content">
                    <a href="/profile">Thông tin cá nhân</a>
                    <a href="/editPassword">Đổi mật khẩu</a>
                    <a href="#" onClick={onChangeLogout}>
                      Đăng xuất
                    </a>
                  </div>
                </div>
              ) : (
                <span>
                  <a href="/login">
                    {" "}
                    <i className="fa fa-user pr-2"></i> Đăng nhập
                  </a>
                </span>
              )}
            </span>
          </div>
        </li>
      </ul>
    </div>
  );
};

Header.propTypes = {};

export default Header;
