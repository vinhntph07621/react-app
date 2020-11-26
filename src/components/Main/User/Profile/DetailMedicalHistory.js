import React from "react";
import PropTypes from "prop-types";
import { Container, Row, Col } from "reactstrap";

import appointment from "@Assets/svg/appointment.svg";

const DetailMedicalHistory = (props) => {
  return (
    <div className="medical-history">
      <div className="section-medical">
        <Container>
          <div className="section-medical-items">
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="item-1">
                  <Row>
                    <Col lg={3} md={3} sm={3} xs={12}>
                      <div className="medical-image">
                        <img
                          alt="..."
                          class="avatar border-gray img-fluid"
                          src="/static/media/avt-user.d34d0690.png"
                        ></img>
                      </div>
                    </Col>
                    <Col lg={9} md={9} sm={9} xs={12}>
                      <div className="medical-text">
                        <p>
                          <h2 className="text-primary" style={{textTransform:"uppercase"}}>Nguyễn thành vinh</h2>
                        </p>
                        <div className="medical-info">
                          <Row>
                            <Col lg={4} md={4} sm={4} xs={6}>
                              {" "}
                              <div className="opening-left">
                                <p>Ngay sinh:</p>
                                <p>Dia chi:</p>
                                <p>So DT:</p>
                              </div>
                            </Col>
                            <Col lg={8} md={8} sm={8} xs={6}>
                              {" "}
                              <div className="opening-right">
                                <p>17-06-2000</p>
                                <p style={{textTransform: "capitalize"}}>Hoai Duc - Nam tu liem - ha noi</p>
                                <p>0979724165</p>
                              </div>
                            </Col>
                          </Row>
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>

            {/* item 2 */}
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="item-2">
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div className="medical-text">
                        <p>
                          <h5 className="text-primary">Thông tin nhập viện</h5>
                        </p>
                      </div>
                    </Col>
                  </Row>
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
                                  <p>Nhập viện:</p>
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
                                      className="fa fa-calendar"
                                      aria-hidden="true"
                                    ></i>
                                    11:00 12-07-1997
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
                                    Nguyễn Thành Vinh
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
                                  <p>Kết thúc:</p>
                                  <p>Y tá:</p>
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
                                    11:00 13-07-1997
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
                                    Nguyễn Thành VInh
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
                                  <p>Chi phí:</p>
                                  <p>Dịch vụ:</p>
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
                                      className="fa fa-credit-card"
                                      style={{
                                        padding: "10px 15px 10px 15px",
                                      }}
                                    ></i>
                                    1.200.000 VNĐ
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
                                      className="fa fa-stethoscope"
                                      aria-hidden="true"
                                    ></i>
                                    Bọc răng sứ, tẩy trắng răng
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

            {/* item 3 */}
            <Row>
              <Col lg={12} md={12} sm={12} xs={12}>
                <div className="item-2">
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div className="medical-text">
                        <p>
                          <h5 className="text-primary"> Dặn dò của bác sĩ</h5>
                        </p>
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg={12} md={12} sm={12} xs={12}>
                      <div className="instruct-doctor">
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit. Etiam malesuada dolor arcu, non bibendum ligula
                          dignissim non. Sed blandit quis lectus in fermentum.
                          Nam viverra sapien in accumsan vestibulum. Fusce non
                          libero quis elit tincidunt sagittis eget ac enim. Sed
                          posuere purus nec urna convallis ornare. Nunc
                          ultricies eleifend nisl ac dignissim. Curabitur
                          pulvinar dui sed nulla pretium rhoncus. Nullam cursus
                          dignissim elit non tincidunt. Maecenas sed sem a augue
                          dapibus mollis a sit amet nisi. Suspendisse commodo
                          euismod interdum. Donec nec urna velit. Fusce bibendum
                          efficitur pellentesque. In id eros ut arcu consectetur
                          euismod ac id ipsum. In dapibus, ipsum eget
                          scelerisque semper, neque ligula vulputate dolor, sit
                          amet efficitur ante lacus sed sem. Donec semper at
                          mauris nec facilisis.f
                        </p>
                      </div>
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </div>
  );
};

DetailMedicalHistory.propTypes = {};

export default DetailMedicalHistory;
