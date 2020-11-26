import React, { useContext, useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from "reactstrap";

//lodash
import { isEmpty, values } from "lodash";

//context
import { AppContext } from "../../../contexts/AppContext";

const TopNavbar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  const ctxUser = useContext(AppContext);

  //logout
  const onChangeLogout = () => {
    localStorage.removeItem("token");
    window.location = "/";
  };

  return (
    <div className="top-navbar">
      <Navbar light expand="md">
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">Components</NavLink>
            </NavItem>
            <NavItem>
              <NavLink href="https://github.com/reactstrap/reactstrap">
                GitHub
              </NavLink>
            </NavItem>
            <NavItem>
              <form className="navbar-form" style={{ marginLeft: "190px" }}>
                <span className="bmd-form-group">
                  <div className="input-group no-border">
                    <input
                      type="text"
                      className="form-control border-0 line-bottom"
                      style={{
                        background: "none",
                      }}
                      placeholder="Search..."
                    />
                    <button
                      type="submit"
                      className="btn btn-white btn-round btn-just-icon"
                    >
                      <i className="material-icons">search</i>
                      <div className="ripple-container"></div>
                    </button>
                  </div>
                </span>
              </form>
            </NavItem>
          </Nav>
          <NavItem>
            <ul className="navbar-nav">
              <li className="nav-item">
                <a className="nav-link">
                  <i className="material-icons">dashboard</i>
                  <p className="d-lg-none d-md-block">Stats</p>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link"
                  href="http://example.com"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="material-icons">notifications</i>
                  <span className="notification">5</span>
                  <p className="d-lg-none d-md-block">Some Actions</p>
                  <div className="ripple-container" />
                </a>
                <div
                  className="dropdown-menu dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <a className="dropdown-item" href="#">
                    Mike John responded to your email
                  </a>
                  <a className="dropdown-item" href="#">
                    You have 5 new tasks
                  </a>
                  <a className="dropdown-item" href="#">
                    You're now friend with Andrew
                  </a>
                  <a className="dropdown-item" href="#">
                    Another Notification
                  </a>
                  <a className="dropdown-item" href="#">
                    Another One
                  </a>
                </div>
              </li>
            </ul>
          </NavItem>
          <NavbarText>
            <div className="top-bar-social">
              {/* login */}
              <div className="nav-item-right">
                <span className="user-name">
                  {!isEmpty(ctxUser.user) ? (
                    <div className="dropdown">
                      <span>
                        <a>
                          <i className="fa fa-user pr-2"></i>
                          {ctxUser.user.name}
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
            </div>
          </NavbarText>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default TopNavbar;
