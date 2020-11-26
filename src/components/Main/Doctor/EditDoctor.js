import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { Link, useHistory, useParams } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label } from "reactstrap";

//api
import doctorApi from "../../../api/doctorApi";

//time
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

//alert
import swal from "sweetalert";
import axios from "axios";
import Button from "reactstrap/lib/Button";

const EditDoctor = (props) => {
  const [doctorUpdate, setDoctorUpdate] = useState([]);
    const { control, register, handleSubmit, errors, setValue } = useForm({
      defaultValues: {
        date: doctorUpdate.birthday,
      },
    });
  const { id } = useParams();

  const onHandldeSubmit = (values) => {
    console.log(values);
    const { data } = doctorApi
      .update(id, {
        first_name: values.first_name,
        last_name: values.last_name,
        birthday: values.birthday,
        gender: values.gender,
        phone: values.phone,
        address: values.address,
        email: values.email,
        password: values.password,
        short_bio: values.short_bio,
        status: "1",
        avatar: "123.png",
      })
      .then((res) => {
        swal("Sửa thành công!", "success");
        setTimeout(() => {
          // window.location = "/doctor";
        }, 2000);
      })
      .catch((error) => {
        swal("Sửa không thành công!", "vui lòng thử lại", "warning");
      });
  };

  useEffect(() => {
    const getDoctorUpdate = async () => {
      const { data } = await doctorApi.getById(id);
      setDoctorUpdate(data);
    };
    register(
      { name: "birthday" },
      {
        // required: true,
        // validate: (value) => value !== "Invalid date",
      }
    );
    getDoctorUpdate();
  }, []);

  //time
  const onChangeDatePicker = (e) => {
    setStartDate(e);
    console.log(e);
    setValue("birthday", moment(e).format("YYYY-MM-DD"));
  };
  const getDefaultDateTime = moment(doctorUpdate.birthday).format("YYYY-MM-DD");
  console.log("getDefaultDateTime", getDefaultDateTime);
  const [startDate, setStartDate] = useState(new Date(getDefaultDateTime));
  console.log("startDate", startDate);
  // const currentDate = moment().add(15, "minutes").format("YYYY-MM-DDTHH:mm");

  return (
    <div className="page">
      <div className="content">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h4 className="page-title text-center text-uppercase font-weight-font-weight-normal text-primary">
              Add Doctor
            </h4>
          </div>
        </div>
        <div className="from-add-doctor" style={{ padding: "0 200px" }}>
          <Container>
            <Row>
              <Col>
                <Form onSubmit={handleSubmit(onHandldeSubmit)}>
                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Email</Label>
                        <input
                          defaultValue={doctorUpdate.email}
                          type="email"
                          className="form-control"
                          name="email"
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
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Mật khẩu</Label>
                        <input
                          defaultValue={doctorUpdate.password}
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
                            <span className="text-danger">
                              Nhập trên 4 ký tự
                            </span>
                          )}
                        {errors.password &&
                          errors.password.type === "pattern" && (
                            <span className="text-danger">ko đc cách</span>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Họ</Label>
                        <input
                          defaultValue={doctorUpdate.first_name}
                          type="text"
                          className="form-control"
                          name="first_name"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.first_name &&
                          errors.first_name.type === "required" && (
                            <span className="text-danger">không bỏ trống</span>
                          )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Tên</Label>
                        <input
                          defaultValue={doctorUpdate.last_name}
                          type="text"
                          className="form-control"
                          name="last_name"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.last_name &&
                          errors.last_name.type === "required" && (
                            <span className="text-danger">không bỏ trống</span>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Ngày sinh</Label>
                        <DatePicker
                          defaultValue={getDefaultDateTime}
                          selected={startDate}
                          disabledKeyboardNavigation
                          autoComplete="off"
                          // limitTime
                          // filterTime={(t) => {
                          //   return new Date() < t;
                          // }}
                          className="form-control"
                          style={{ display: "none" }}
                          name="birthday"
                          onChange={(date) => onChangeDatePicker(date)}
                          dateFormat="dd/MM/yyyy"
                        />
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Giới tính</Label>
                        <select
                          // value={doctorUpdate.gender}
                          type="text"
                          className="form-control"
                          name="gender"
                          ref={register({
                            required: true,
                          })}
                        >
                          {" "}
                          <option selected>chọn giới tính</option>
                          <option value="0"> Nam</option>
                          <option value="1"> Nữ</option>
                        </select>

                        {errors.gender && errors.gender.type === "required" && (
                          <span className="text-danger">không bỏ trống</span>
                        )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Số điện thoại </Label>
                        <input
                          defaultValue={doctorUpdate.phone}
                          type="number"
                          className="form-control"
                          name="phone"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.phone && errors.phone.type === "required" && (
                          <span className="text-danger">không bỏ trống</span>
                        )}
                      </FormGroup>
                    </Col>
                    <Col md={6}>
                      <FormGroup>
                        <Label>Địa chỉ</Label>
                        <input
                          defaultValue={doctorUpdate.address}
                          type="text"
                          className="form-control"
                          name="address"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.address &&
                          errors.address.type === "required" && (
                            <span className="text-danger">không bỏ trống</span>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row form>
                    <Col md={12}>
                      <FormGroup>
                        <Label>Tiểu sử</Label>
                        <textarea
                          defaultValue={doctorUpdate.short_bio}
                          type="text"
                          className="form-control"
                          name="short_bio"
                          ref={register({
                            required: true,
                          })}
                        />
                        {errors.short_bio &&
                          errors.short_bio.type === "required" && (
                            <span className="text-danger">không bỏ trống</span>
                          )}
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row form>
                    <Col md={12}>
                      <FormGroup>
                        <button className="btn btn-primary w-100">Sửa</button>
                      </FormGroup>
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
};

EditDoctor.propTypes = {};

export default EditDoctor;
