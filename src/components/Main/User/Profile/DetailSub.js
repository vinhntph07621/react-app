import React, { useEffect, useState, useContext } from "react";
import appointmentApi from "../../../../api/appointmentApi";
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
} from "reactstrap";
import { get } from "lodash";

//alert
import swal from "sweetalert";

const DetailSub = (props) => {
  const [appointment, setAppointment] = useState([]);
  const { newDetail } = props;
  const { newService } = props;

  useEffect(() => {
    const getAppointment = async () => {
      const { data } = await appointmentApi.getAll();
      setAppointment(data);
    };

    getAppointment();
  }, []);

  return (
    <div className="detail-sub">
      <Row>
        <Col md={12}>
          <Card body className="mb-4 boder-0">
            <CardText>
              {newDetail.map((newDetailSub, index) => (
                <Row>
                  <Col lg={12} md={12} sm={12} xs={12}>
                    <div className="item-2">
                      <Row>
                        <Col lg={12} md={12} sm={12} xs={12}>
                          <div className="medical-info">
                            <Row>
                              <Col lg={6} md={6} sm={6} xs={12}>
                                {" "}
                                <Row>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-left"
                                      style={{
                                        lineHeight: "35px",
                                      }}
                                    >
                                      <p>Khách hàng:</p>
                                      <p>Bác sĩ:</p>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-night"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginLeft: "-80px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-user"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.patient_name}
                                      </p>
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-user-md"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.last_name}{" "}
                                        {newDetailSub.first_name} - Ms
                                        {newDetailSub.doctor_id}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={12}>
                                {" "}
                                <Row>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-left"
                                      style={{
                                        lineHeight: "35px",
                                      }}
                                    >
                                      <p>Số điện thoại:</p>
                                      <p>Địa chỉ:</p>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-night"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginLeft: "-80px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-phone"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.phone_number}
                                      </p>
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-map-marker"
                                          aria-hidden="true"
                                        ></i>
                                        Nguyễn Văn Giáp - Hà Nội
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={12}>
                                {" "}
                                <Row>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-left"
                                      style={{
                                        lineHeight: "35px",
                                      }}
                                    >
                                      <p>Ngày hẹn:</p>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-night"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginLeft: "-80px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.date_time}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={6} md={6} sm={6} xs={12}>
                                {" "}
                                <Row>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-left"
                                      style={{
                                        lineHeight: "35px",
                                      }}
                                    >
                                      <p>Số người:</p>
                                    </div>
                                  </Col>
                                  <Col lg={6} md={6} sm={6} xs={6}>
                                    <div
                                      className="opening-night"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginLeft: "-80px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-user"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.has_people}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>

                              <Col lg={12} md={12} sm={12} xs={12}>
                                {" "}
                                <Row>
                                  <Col lg={3} md={3} sm={3} xs={6}>
                                    <div
                                      className="opening-left"
                                      style={{
                                        lineHeight: "35px",
                                      }}
                                    >
                                      <p>Email:</p>
                                      <p>Dịch vụ:</p>
                                      <p>Lời nhắn:</p>
                                    </div>
                                  </Col>
                                  <Col lg={9} md={9} sm={9} xs={6}>
                                    <div
                                      className="opening-night"
                                      style={{
                                        fontSize: "14px",
                                        fontWeight: "500",
                                        marginLeft: "-80px",
                                      }}
                                    >
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-envelope"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.email}
                                      </p>
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          className="fa fa-credit-card"
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                        ></i>
                                        <div
                                          className="listService"
                                          style={{
                                            position: "relative",
                                            marginLeft: "40px",
                                            marginTop: "-29px",
                                          }}
                                        >
                                          {newService.map(
                                            (newsListService, index) => (
                                              <span
                                                className="text-primary"
                                                style={{ fontSize: "14px" }}
                                                key={index}
                                              >
                                                {" "}
                                                {newsListService.name},
                                              </span>
                                            )
                                          )}
                                        </div>
                                      </p>
                                      <p
                                        style={{
                                          borderRadius: "3px",
                                          boxShadow:
                                            "0 0.1rem 1rem 0 rgba(82, 95, 127, 0.125)",
                                        }}
                                      >
                                        <i
                                          style={{
                                            padding: "10px 15px 10px 15px",
                                          }}
                                          className="fa fa-comments-o"
                                          aria-hidden="true"
                                        ></i>
                                        {newDetailSub.message}
                                      </p>
                                    </div>
                                  </Col>
                                </Row>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              ))}
            </CardText>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

DetailSub.propTypes = {};

export default DetailSub;
