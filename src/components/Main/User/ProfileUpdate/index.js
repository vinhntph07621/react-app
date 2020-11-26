import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useParams, useHistory } from "react-router-dom";
import { AppContext } from "./../../../../contexts/AppContext";
import userApi from "../../../../api/userApi";
import swal from "sweetalert";
import firebase from "../../../../firebase";
//img
import img from "@Assets/img/user/user-bg.png";
import avt from "@Assets/img/user/avt-user.png";

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
  Button,
  CardBody,
} from "reactstrap";

const ProfileUpdate = ({ currentUsers }) => {
  const { register, handleSubmit, errors, setValue } = useForm();
  const ctx = useContext(AppContext);
  let history = useHistory();
  const [userUpdate, setUserUpdate] = useState();
  const [editUser, setEditUser] = useState([]);
  const [avarta, setAvatart] = useState("");
  const id = ctx.user.id;

  const onHandldeSubmit = async (values) => {
    const { data } = await userApi.update(id, {
      name: values.name,
      phone: values.phone,
    });
    setUserUpdate(data);
    swal("Cập nhật thành công!", "Vui lòng đăng nhập lại!");
    // setTimeout(() => {
    //   localStorage.removeItem("token");
    //   history.push("/login");
    // }, 2000);

    const file = values.avatar[0];
    // tạo folder chứa ảnh trên firesbase
    const storageRef = firebase.storage().ref(`images/${file.name}`);
    // đẩy ảnh lên đường dẫn trên
    const uploadTask = storageRef.put(file);
    // thực hiện việc đầy ảnh lên firebase
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED);
    firebase
      .storage()
      .ref()
      .child(`images/${file.name}`)
      .getDownloadURL()
      .then((url) => {
        // Tạo object mới chứa toàn bộ thông tin từ input
        const newData = {
          id: Math.random().toString(36).substr(2, 9),
          ...data,
          image: url,
        };
        history.push('/profile');
      });
  };

  useEffect(() => {
    const getEditUser = async () => {
      const { data } = await userApi.getCurrent();
      setEditUser(data);
    };
    getEditUser();
  }, []);

  return (
    <div className="profile-upate py-4">
      <Container>
        <div className="profile">
          <Row>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={img} />
                </div>
                <CardBody>
                  {editUser.map((currentUser, index) => (
                    <Row>
                      <Col md={12} key={index}>
                        <div className="author">
                          <a href="#pablo">
                            <img
                              alt="..."
                              className="avatar border-gray"
                              src={avt}
                            />
                            <h5 className="user-name title text-primary">
                              Hello {ctx.user.name}
                            </h5>
                            <h6 className="user-email title text-secondary">
                              Email: {ctx.user.email}
                            </h6>
                            <h6 className="user-phone title text-secondary">
                              Số ĐT: {ctx.user.phone}
                            </h6>
                          </a>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </CardBody>
              </Card>
            </Col>
            <Col md={8}>
              {" "}
              <Form onSubmit={handleSubmit(onHandldeSubmit)}>
                <h2 className="title text-center text-primary text-uppercase">
                  Cập nhật thông tin cá nhân
                </h2>
                <Row form>
                  {/* email */}
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <Label for="exampleEmail">
                        <h6>Email</h6>
                      </Label>
                      <input
                        disabled
                        value={ctx.user.email}
                        type="email"
                        className="form-control "
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
                  {/* name */}
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <Label>
                        <h6>Họ và tên</h6>
                      </Label>
                      <input
                        defaulValue={ctx.user.name}
                        type="text"
                        className="form-control"
                        name="name"
                        ref={register({
                          required: true,
                          minLength: 4,
                          pattern: /^\S{1}.{0,24}$/i,
                        })}
                      />
                      {errors.name && errors.name.type === "required" && (
                        <span className="text-danger">không bỏ trống</span>
                      )}
                      {errors.name && errors.name.type === "minLength" && (
                        <span className="text-danger">Nhập trên 4 ký tự</span>
                      )}
                      {errors.name && errors.name.type === "pattern" && (
                        <span className="text-danger">ko đc cách</span>
                      )}
                    </FormGroup>
                  </Col>
                </Row>
                <Row form>
                  {/* phone */}
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <Label for="">
                        <h6>Số điện thoại</h6>
                      </Label>
                      <input
                        defaulValue={ctx.user.phone}
                        type="number"
                        className="form-control "
                        name="phone"
                        ref={register({
                          required: true,
                          minLength: 8,
                          maxLength: 12,
                          pattern: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/,
                        })}
                      />
                      {errors.phone && errors.phone.type === "required" && (
                        <span className="text-danger">không bỏ trống</span>
                      )}
                      {errors.phone && errors.phone.type === "minLength" && (
                        <span className="text-danger">chưa đúng định dạng</span>
                      )}
                      {errors.phone && errors.phone.type === "maxLength" && (
                        <span className="text-danger">chưa đúng định dạng</span>
                      )}
                    </FormGroup>
                  </Col>

                  {/* phone */}
                  {/* <Col lg={12} md={12} sm={12} xs={12}>
                    <FormGroup>
                      <Label for="">
                        <h6>Ảnh đại diện</h6>
                      </Label>
                      <br />
                      <input
                        defaulValue={ctx.user.phone}
                        type="file"
                        name="avatar"
                        ref={register({ required: true })}
                      />
                    </FormGroup>
                  </Col> */}
                </Row>
                <button className=" form-control btn btn-primary">
                  {" "}
                  Xác nhận
                </button>
              </Form>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

ProfileUpdate.propTypes = {};

export default ProfileUpdate;
