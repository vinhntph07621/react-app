import React, { useState, useEffect, useContext, useRef } from "react";
import { useForm, useWatch } from "react-hook-form";
import userApi from "../../../../api/userApi";
import { useParams, useHistory } from "react-router-dom";

//reactstrap
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  Container,
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  CardTitle,
} from "reactstrap";
import { AppContext } from "./../../../../contexts/AppContext";
import swal from "sweetalert";
//svg
import log from "@Assets/svg/log.svg";

const EditPasssWord = (props) => {
  const { register, handleSubmit, errors, setValue, watch } = useForm();
  let history = useHistory();
  const password = useRef({});
  const [currentPassword, setCurrentPasword] = useState([]);
  const ctx = useContext(AppContext);
  const id = ctx.user.id;

  password.current = watch("newPassword", "");
  const onHandldeSubmit = async (value) => {
    try {
      const { data } = await userApi.updatePassWord({
        old_password: value.old_password,
        new_password: value.newPassword,
      });
      swal("Cập nhật thành công!", "Vui lòng đăng nhập lại!");
      setTimeout(() => {
        localStorage.removeItem("token");
        history.push("/login");
      }, 2000);
    } catch {
      swal("Mật khẩu cũ không đúng!", "Vui lòng thử lại!");
    }
  };

  return (
    <div className="user-singup-signin">
      <div className="container">
        <div className="forms-container">
          <div className="signin-signup">
            <Form onSubmit={handleSubmit(onHandldeSubmit)}>
              <h2 className="title text-primary">Cập nhật mật khẩu</h2>
              <Row md={12} form>
                <Col md={12}>
                  <FormGroup>
                    <Label>Mật khẩu cũ</Label>
                    <input
                      type="password"
                      className="form-control"
                      name="old_password"
                      ref={register({
                        required: true,
                        minLength: { value: 6 },
                        pattern: /^\S{1}.{0,24}$/i,
                      })}
                    />
                    {errors.password && errors.password.type === "required" && (
                      <span className="text-danger">không bỏ trống</span>
                    )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span className="text-danger">Nhập trên 6 ký tự</span>
                      )}
                    {errors.password && errors.password.type === "pattern" && (
                      <span className="text-danger">ko đc cách</span>
                    )}
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Mật khẩu mới</Label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPassword"
                      ref={register({
                        required: true,
                        minLength: { value: 6 },
                        pattern: /^\S{1}.{0,24}$/i,
                      })}
                    />
                    {errors.newPassword &&
                      errors.newPassword.type === "required" && (
                        <span className="text-danger">không bỏ trống</span>
                      )}
                    {errors.newPassword &&
                      errors.newPassword.type === "minLength" && (
                        <span className="text-danger">Nhập trên 6 ký tự</span>
                      )}
                    {errors.newPassword &&
                      errors.newPassword.type === "pattern" && (
                        <span className="text-danger">ko đc cách</span>
                      )}
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <FormGroup>
                    <Label>Xác nhận lại mật khẩu</Label>
                    <input
                      type="password"
                      className="form-control"
                      name="newPasswordRepeated"
                      ref={register({
                        required: true,
                        minLength: 6,
                        pattern: /^\S{1}.{0,24}$/i,
                        validate: (value) => value === password.current,
                      })}
                    />
                    {errors.newPasswordRepeated &&
                      errors.newPasswordRepeated.type === "validate" && (
                        <span className="text-danger">
                          Mật khẩu không trùng khớp
                        </span>
                      )}
                    {errors.newPasswordRepeated &&
                      errors.newPasswordRepeated.type === "required" && (
                        <span className="text-danger">không bỏ trống</span>
                      )}
                    {errors.newPasswordRepeated &&
                      errors.newPasswordRepeated.type === "minLength" && (
                        <span className="text-danger">Nhập trên 6 ký tự</span>
                      )}
                    {errors.newPasswordRepeated &&
                      errors.newPasswordRepeated.type === "pattern" && (
                        <span className="text-danger">ko đc cách</span>
                      )}
                  </FormGroup>
                </Col>
              </Row>
              <Row form>
                <Col>
                  <FormGroup>
                    <div className="button-signin-signup">
                      <input
                        type="submit"
                        value="Xác nhận"
                        className="btn solid"
                      />
                      <p className="social-text">Liên hệ với chúng tôi</p>
                      <div className="social-media">
                        <a href="#" className="social-icon">
                          <i className="fa fa-facebook"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fa fa-google-plus"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fa fa-twitter"></i>
                        </a>
                        <a href="#" className="social-icon">
                          <i className="fa fa-skype"></i>
                        </a>
                      </div>
                    </div>
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </div>
        </div>

        <div className="panels-container">
          <div className="panel left-panel">
            <div className="content">
              <h3>
                <a href="/">Nhấn để quay lại trang chủ</a>
              </h3>
              <br />
              <h3>Bạn chưa có tài khoản?</h3>
              <p>Nhấn vào đăng ký ngay tại đây</p>
              <a href="/signup" className="btn transparent" id="sign-up-btn">
                <span className="text-white">Đăng ký</span>
              </a>
            </div>
            <img src={log} className="image" alt="" />
          </div>
          <div className="panel right-panel">
            <img src={register} className="image" alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

EditPasssWord.propTypes = {};

export default EditPasssWord;
