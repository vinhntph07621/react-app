import React, { useEffect, useState, useContext, useRef } from "react";
import { useForm } from "react-hook-form";
// reactstrap components
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Card,
  Button,
  CardTitle,
  CardText,
  Row,
  Col,
  Container,
  CardBody,
  Pagination,
  Form,
} from "reactstrap";
import classnames from "classnames";
import { Link } from "react-router-dom";
//img
import img from "@Assets/img/user/user-bg.png";
import avt from "@Assets/img/user/avt-user.png";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";

//context
import { AppContext } from "../../../../contexts/AppContext";

//api
import appointmentApi from "../../../../api/appointmentApi";
import userApi from "../../../../api/userApi";

//component
import Detail from "./Detail";
import EditApointment from "./EditApointment";
import DetailButtonMedical from "./DetailButtonMedical";
import DetailButtonReExamination from "./DetailButtonReExamination";

//style
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Profile = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const [activeTab, setActiveTab] = useState("1");
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const ctx = useContext(AppContext);
  const [editUser, setEditUser] = useState([]);
  const [appointment, setAppointment] = useState([]);
  const [image, setImage] = useState("");
  const classes = useStyles();

  useEffect(() => {
    const getEditUser = async () => {
      const { data } = await userApi.getCurrent();
      setEditUser(data);
    };

    const getAppointment = async () => {
      const { data } = await appointmentApi.getAll();
      setAppointment(data);
    };

    getEditUser();
    getAppointment();
  }, []);

  return (
    <div className="content-profile">
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
                            <div className="author">
                              <StyledBadge
                                overlap="circle"
                                anchorOrigin={{
                                  vertical: "bottom",
                                  horizontal: "right",
                                }}
                                variant="dot"
                              >
                                <div class="image-upload">
                                  <label for="file-input">
                                    <Avatar
                                      style={{
                                        width: "124px",
                                        height: "124px",
                                      }}
                                      alt="Remy Sharp"
                                      src={avt}
                                    />
                                  </label>
                                  <input
                                    className="change-image"
                                    id="file-input"
                                    type="file"
                                  />
                                </div>
                              </StyledBadge>
                            </div>
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
                      <Col md={12}>
                        <div className="editUser">
                          <Link
                            to={`editUsers/${ctx.user.id}`}
                            className="text-white text-center bg-primary form-control"
                          >
                            <span>Sửa thông tin</span>
                          </Link>
                        </div>
                      </Col>
                    </Row>
                  ))}
                </CardBody>
              </Card>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={12}>
                  <div className="table">
                    <div className="history-appointment history-medical-record">
                      <Nav tabs>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggle("1");
                            }}
                          >
                            <h5>Lịch hẹn</h5>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggle("2");
                            }}
                          >
                            <h5>Lịch tái khám</h5>
                          </NavLink>
                        </NavItem>
                        <NavItem>
                          <NavLink
                            className={classnames({
                              active: activeTab === "3",
                            })}
                            onClick={() => {
                              toggle("3");
                            }}
                          >
                            <h5> Hồ sơ bệnh án</h5>
                          </NavLink>
                        </NavItem>
                      </Nav>
                      <TabContent activeTab={activeTab}>
                        <TabPane tabId="1">
                          <Row>
                            {appointment.map((newsAppointment, appointment) => (
                              <Col md={6} key={appointment}>
                                <Card body>
                                  <CardTitle>
                                    <h5>Thông tin cuộc hẹn</h5>
                                  </CardTitle>
                                  <CardText>
                                    <div className="detail ">
                                      <div className="item-detail">
                                        <div className="detail-name">
                                          <h6>
                                            Bác sĩ: Dr.{" "}
                                            {newsAppointment.doctor_first_name}
                                          </h6>
                                          <div className="detail-status">
                                            <h6 className="text-primary">
                                              {newsAppointment.status == 1 ? (
                                                <span className="text-warning">
                                                  Chờ xác nhận
                                                </span>
                                              ) : newsAppointment.status ==
                                                2 ? (
                                                <span className="text-success">
                                                  Đã xác nhận
                                                </span>
                                              ) : (
                                                <span className="text-danger">
                                                  Đã hủy
                                                </span>
                                              )}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="detail-name">
                                        <h6>
                                          {" "}
                                          Khách hàng:{" "}
                                          {newsAppointment.patient_name}
                                        </h6>
                                      </div>
                                      <div className="detail-time">
                                        <h6>
                                          {" "}
                                          Ngày hẹn: {newsAppointment.date_time}
                                        </h6>
                                      </div>
                                      <div className="detail-people">
                                        <h6>
                                          Số người: {newsAppointment.has_people}
                                        </h6>
                                      </div>
                                    </div>
                                  </CardText>{" "}
                                  <Detail appointmentId={newsAppointment.id} />
                                  {newsAppointment &&
                                  newsAppointment.status == 2 ? null : (
                                    <EditApointment
                                      appointmentId={newsAppointment.id}
                                    />
                                  )}
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </TabPane>
                        <TabPane tabId="2">
                          <Row>
                            {appointment.map((newsAppointment, appointment) => (
                              <Col md={6} key={appointment}>
                                <Card body>
                                  <CardTitle>
                                    <h5>Thông tin tái khám</h5>
                                  </CardTitle>
                                  <CardText>
                                    <div className="detail ">
                                      <div className="item-detail">
                                        <div className="detail-name">
                                          <h6>
                                            Bác sĩ: Dr.{" "}
                                            {newsAppointment.doctor_first_name}
                                          </h6>
                                          <div className="detail-status">
                                            <h6 className="text-primary">
                                              {newsAppointment.status ==
                                              3 ? null : (
                                                <span className="text-warning">
                                                  Tái khám
                                                </span>
                                              )}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="detail-name">
                                        <h6>
                                          {" "}
                                          Khách hàng:{" "}
                                          {newsAppointment.patient_name}
                                        </h6>
                                      </div>
                                      <div className="detail-time">
                                        <h6>
                                          {" "}
                                          Ngày hẹn: {newsAppointment.date_time}
                                        </h6>
                                      </div>
                                      <div className="detail-people">
                                        <h6>
                                          Số người: {newsAppointment.has_people}
                                        </h6>
                                      </div>
                                    </div>
                                  </CardText>{" "}
                                  <DetailButtonReExamination
                                    appointmentId={newsAppointment.id}
                                  />
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </TabPane>
                        <TabPane tabId="3">
                          <Row>
                            {appointment.map((newsAppointment, appointment) => (
                              <Col md={6} key={appointment}>
                                <Card body>
                                  <CardTitle>
                                    <h5>Thông tin bệnh án</h5>
                                  </CardTitle>
                                  <CardText>
                                    <div className="detail ">
                                      <div className="item-detail">
                                        <div className="detail-name">
                                          <h6>
                                            Bác sĩ: Dr.{" "}
                                            {newsAppointment.doctor_first_name}
                                          </h6>
                                          <div className="detail-status">
                                            <h6 className="text-primary">
                                              {newsAppointment.status ==
                                              2 ? null : (
                                                <span className="text-success">
                                                  Đã hoàn thành
                                                </span>
                                              )}
                                            </h6>
                                          </div>
                                        </div>
                                      </div>
                                      <div className="detail-name">
                                        <h6>
                                          {" "}
                                          Khách hàng:{" "}
                                          {newsAppointment.patient_name}
                                        </h6>
                                      </div>
                                      <div className="detail-time">
                                        <h6>
                                          {" "}
                                          Ngày hẹn: {newsAppointment.date_time}
                                        </h6>
                                      </div>
                                      <div className="detail-people">
                                        <h6>
                                          Số người: {newsAppointment.has_people}
                                        </h6>
                                      </div>
                                    </div>
                                  </CardText>{" "}
                                  <DetailButtonMedical
                                    appointmentId={newsAppointment.id}
                                  />
                                </Card>
                              </Col>
                            ))}
                          </Row>
                        </TabPane>
                      </TabContent>
                    </div>
                  </div>
                </Col>
                <Col md={12}>{/* <App /> */}</Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Profile;
