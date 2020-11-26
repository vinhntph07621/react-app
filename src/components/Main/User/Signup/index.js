import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
//lib
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  Form,
  FormGroup,
  Label,
} from "reactstrap";

//alert
import swal from "sweetalert";

//svg
import log from "@Assets/svg/log.svg";
import register from "@Assets/svg/register.svg";

//js
// import "./../../../../assets/js/app";

//icons
import { AiOutlineUser } from "react-icons/ai";
import { RiLockPasswordFill } from "react-icons/ri";

const Signup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [addUser, setAddUser] = useState([]);
  let history = useHistory();
  const onHandleSubmit = (values) => {
    axios
      .post("http://dental-project.herokuapp.com/api/signup", {
        name: values.name,
        email: values.email,
        phone: values.phone,
        password: values.password,
      })
      .then((res) => {
        swal("Đăng ký thành công!", "Cảm ơn Quý Khách", "success");
        setTimeout(() => {
          window.location=("/login");
        }, 2000);
      })
      .catch((error) => {
        swal("tài khoản đã tồn tại!", "vui lòng thử lại", "warning");
      });
  };

  return (
    <div className="signUp-signIn-page">
      <nav className="navbar navbar-expand-lg navbar-transparent navbar-absolute fixed-top text-white">
        <div className="container">
          <div className="navbar-wrapper">
            <a className="navbar-brand" href="javascript:;">
              Login Page<div className="ripple-container"></div>
            </a>
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            aria-controls="navigation-index"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
            <span className="navbar-toggler-icon icon-bar"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <i class="material-icons">dashboard</i>
                <a href="../dashboard.html" class="nav-link">
                  Dashboard
                  <div class="ripple-container"></div>
                </a>
              </li>
              <li class="nav-item ">
                <i class="material-icons">person_add</i>
                <a href="../pages/register.html" class="nav-link">
                  Register
                  <div class="ripple-container"></div>
                </a>
              </li>
              <li class="nav-item  active ">
                <i class="material-icons">fingerprint</i>
                <a href="../pages/login.html" class="nav-link">
                  Login
                </a>
              </li>
              <li class="nav-item ">
                <i class="material-icons">lock_open</i>
                <a href="../pages/lock.html" class="nav-link">
                  Lock
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
            <form class="form" method="" action="">
              <div class="card card-login">
                <div class="card-header card-header-rose text-center">
                  <h4 class="card-title">Login</h4>
                  <div class="social-line">
                    <a
                      href="#pablo"
                      class="btn btn-just-icon btn-link btn-white"
                    >
                      <i class="fa fa-facebook-square"></i>
                    </a>
                    <a
                      href="#pablo"
                      class="btn btn-just-icon btn-link btn-white"
                    >
                      <i class="fa fa-twitter"></i>
                    </a>
                    <a
                      href="#pablo"
                      class="btn btn-just-icon btn-link btn-white"
                    >
                      <i class="fa fa-google-plus"></i>
                    </a>
                  </div>
                </div>
                <div class="card-body ">
                  <p class="card-description text-center">Or Be Classical</p>
                  <span class="bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">face</i>
                        </span>
                      </div>
                      <input
                        type="text"
                        class="form-control"
                        placeholder="First Name..."
                      />
                    </div>
                  </span>
                  <span class="bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">email</i>
                        </span>
                      </div>
                      <input
                        type="email"
                        class="form-control"
                        placeholder="Email..."
                      />
                    </div>
                  </span>
                  <span class="bmd-form-group">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">lock_outline</i>
                        </span>
                      </div>
                      <input
                        type="password"
                        class="form-control"
                        placeholder="Password..."
                      />
                    </div>
                  </span>
                </div>
                <div class="card-footer justify-content-center">
                  <a href="#pablo" class="btn btn-rose btn-link btn-lg">
                    Lets Go
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
