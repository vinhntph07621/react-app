import React, { useEffect, useState, useContext } from "react";
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

//context
import { AppContext } from "./../../../../contexts/AppContext";

const Signup = (props) => {
  const { register, handleSubmit, errors } = useForm();
  let history = useHistory();
  const ctxUser = useContext(AppContext);

  const onHandldeSubmit = async (values) => {
    axios
      .post("http://dental-project.herokuapp.com/api/login", {
        email: values.email,
        password: values.password,
      })
      .then((res) => {
        localStorage.setItem("token", JSON.stringify(res));
        ctxUser.setUser({
          name: res.data.user.name,
        });
        swal("Đăng nhập thành công!", "Chào mừng Quý Khách!");
        setTimeout(() => {
          window.location = "/";
        }, 1500);
      })
      .catch((errors) => {
        swal("Đăng nhập thất bại!", "Sai tài khoản hoặc mật khẩu!");
        console.log(errors);
      }, []);
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
            <Form onSubmit={handleSubmit(onHandldeSubmit)} method="POST">
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
                          <i class="material-icons">email</i>
                        </span>
                      </div>
                      <input
                        type="email"
                        className="form-control "
                        name="email"
                        placeholder="email..."
                        ref={register({
                          required: true,
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "invalid email address",
                          },
                        })}
                      />
                      {errors.email && errors.email.type === "required" && (
                        <span className="text-danger">không bỏ trống</span>
                      )}
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
                        className="form-control"
                        name="password"
                        ref={register({
                          required: true,
                          minLength: 4,
                          pattern: /^\S{1}.{0,24}$/i,
                        })}
                      />
                      {errors.password &&
                        errors.password.type === "required" && (
                          <span className="text-danger">không bỏ trống</span>
                        )}
                      {errors.password &&
                        errors.password.type === "minLength" && (
                          <span className="text-danger">Nhập trên 4 ký tự</span>
                        )}
                      {errors.password &&
                        errors.password.type === "pattern" && (
                          <span className="text-danger">ko đc cách</span>
                        )}
                    </div>
                  </span>
                </div>
                <div class="card-footer justify-content-center">
                  <button class="btn btn-rose btn-link btn-lg">Login</button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

Signup.propTypes = {};

export default Signup;
