import React, { useEffect, useState, useContext } from "react";
import appointmentApi from "../../../../api/appointmentApi";
// reactstrap components
import {
  Row,
  Col,
  Container,
  Form,
  Label,
  FormGroup,
  Button,
} from "reactstrap";
import { get } from "lodash";
import { useForm } from "react-hook-form";
import Select from "react-select";
import moment from "moment";
import TextField from "@material-ui/core/TextField";

//axiot
import axios from "axios";
import userApi from "../../../../api/userApi";
import AppointmentAPI from "../../../../api/appointmentApi";
import { AppContext } from "../../../../contexts/AppContext";

//alert
import swal from "sweetalert";

import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";

const DetailSub = (props) => {
  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    defaultValues: {
      date: props.newEdit[0].date_time
    }
  });
  const [appointment, setAppointment] = useState([]);
  const { newEdit } = props;
  const { newsService } = props;
  const [doctor, setDoctor] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [service, setService] = useState([]);
  const [onlyDoctor, setOnlyDoctor] = useState();
  const [appointmentServices, setAppointmentServices] = useState([]);
  const ctx = useContext(AppContext);

  const onHandldeSubmit = async (values) => {
    const { data } = await appointmentApi.updateAll(newEdit[0].id, {
      patient_name: values.patient_name,
      email: values.email,
      phone_number: values.phone_number,
      address: values.address,
      date_time: values.date,
      service_id: appointmentServices.map(service => service.id),
      doctor_id: values.doctor_id,
      has_people: values.has_people,
      message: values.message,
    });
    swal("Cảm ơn quý khách, chúng tôi sẽ liên hệ lại");
    setTimeout(() => {
      window.location.reload("/profile");
    }, 1500);
  };

  useEffect(() => {
    const getDoctor = async () => {
      const { data } = await axios.get(
        "http://dental-project.herokuapp.com/api/doctors"
      );
      setDoctor(data);
    };

    const getCurrentUser = async () => {
      const { data } = await userApi.getCurrent();
      setCurrentUser(data);
    };

    const getService = async () => {
      const { data } = await axios.get(
        "http://dental-project.herokuapp.com/api/services"
      );
      setService(data);
    };

    const getAppointment = async () => {
      const { data } = await appointmentApi.getAll();
      setAppointment(data);
    };

    const getDoctorByAppointmentId = async () => {
      const { data } = await axios.get(
        `http://dental-project.herokuapp.com/api/doctors/${newEdit[0].doctor_id}`
      );
      setOnlyDoctor(data);
    };

    register(
      { name: "date" },
      {
        required: true,
      }
    );
    register(
      { name: "service" },
      {
        required: true,
      }
    );
    getDoctor();
    getService();
    getCurrentUser();
    getAppointment();
    getDoctorByAppointmentId();
  }, []);

  const optionSelect = newsService.map((newItem, index) => ({
    value: newItem.id,
    label: newItem.name,
  }));

  useEffect(() => {
    if (newsService.length) {
      setAppointmentServices(newsService);
      setValue("service", optionSelect);
    }
  }, [newsService]);

  //datePicker
  const highlightWithRanges = [
    {
      "react-datepicker__day--highlighted-custom-2": [
        addDays(new Date(), 1),
        addDays(new Date(), 2),
        addDays(new Date(), 3),
        addDays(new Date(), 4),
        addDays(new Date(), 5),
        addDays(new Date(), 6),
        addDays(new Date(), 7),
      ],
    },
  ];
  const onChangeDatePicker = (e) => {
    setStartDate(e);
    setValue("date", moment(e).format("YYYY-MM-DD HH:mm"));
  };
  const getDefaultDateTime = moment(newEdit[0].date_time).format(
    "YYYY-MM-DD HH:mm"
  );
  const [startDate, setStartDate] = useState(new Date(getDefaultDateTime));
  // const currentDate = moment().add(15, "minutes").format("YYYY-MM-DDTHH:mm");

  const onChangeService = (list) => {
    setValue("service", list);
    // setListService(list ? list.map((items) => items.value) : []);
    // .map(item => item.label)
    setAppointmentServices(list);
  };

  return (
    <div className="detail-edit-appointment" style={{ padding: "0 15px" }}>
      <Row>
        <Col md={12}>
          <Form onSubmit={handleSubmit(onHandldeSubmit)}>
            <Row form>
              {/* name */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Khách hàng</Label>
                  <input
                    defaultValue={newEdit[0].patient_name}
                    type="text"
                    className="form-control"
                    name="patient_name"
                    ref={register({
                      required: true,
                      minLength: 4,
                      pattern: /^\S{1}.{0,24}$/i,
                    })}
                  />
                  {errors.patient_name &&
                    errors.patient_name.type === "required" && (
                      <span className="text-danger">không bỏ trống</span>
                    )}
                  {errors.patient_name &&
                    errors.patient_name.type === "minLength" && (
                      <span className="text-danger">Nhập trên 4 ký tự</span>
                    )}
                  {errors.patient_name &&
                    errors.patient_name.type === "pattern" && (
                      <span className="text-danger">ko đc cách</span>
                    )}
                </FormGroup>
              </Col>

              {/* phone */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label for="">Số điện thoại</Label>
                  <input
                    defaultValue={newEdit[0].phone_number}
                    type="number"
                    className="form-control "
                    name="phone_number"
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
            </Row>

            <Row form>
              {/* Doctor */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Bác sĩ</Label>
                  <select
                    className="form-control"
                    name="doctor_id"
                    ref={register}
                  >
                    {doctor.map((newsDoctor, index) =>
                      onlyDoctor && newsDoctor.id == onlyDoctor.id ? (
                        <option key={index} value={newsDoctor.id} selected>
                          {" "}
                          {newsDoctor.last_name} {newsDoctor.first_name} - Ms{newsDoctor.id}
                        </option>
                      ) : (
                        <option key={index} value={newsDoctor.id}>
                          {" "}
                          {newsDoctor.last_name} {newsDoctor.first_name} - Ms{newsDoctor.id}
                        </option>
                      )
                    )}
                  </select>
                </FormGroup>
              </Col>
              {/* address */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Địa chỉ</Label>
                  <select
                    className="form-control"
                    name="address"
                    ref={register}
                  >
                    <option selected> 444 Nguyễn Văn Giáp - Hà Nội</option>
                  </select>
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              {/* appointment */}
              {/* time */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Thời gian khám*</Label>
                  <DatePicker
                    defaultValue={getDefaultDateTime}
                    selected={startDate}
                    disabledKeyboardNavigation
                    autoComplete="off"
                    highlightDates={highlightWithRanges}
                    // limitTime
                    // filterTime={(t) => {
                    //   return new Date() < t;
                    // }}
                    className="form-control"
                    name="date"
                    onChange={(date) => onChangeDatePicker(date)}
                    showTimeSelect
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 7)}
                    includeTimes={[
                      setHours(setMinutes(new Date(), 0), 8),
                      setHours(setMinutes(new Date(), 0), 9),
                      setHours(setMinutes(new Date(), 0), 10),
                      setHours(setMinutes(new Date(), 0), 11),
                      setHours(setMinutes(new Date(), 0), 12),
                      setHours(setMinutes(new Date(), 0), 13),
                      setHours(setMinutes(new Date(), 0), 14),
                      setHours(setMinutes(new Date(), 0), 15),
                      setHours(setMinutes(new Date(), 0), 16),
                      setHours(setMinutes(new Date(), 0), 17),
                      setHours(setMinutes(new Date(), 0), 18),
                    ]}
                    excludeDates={[new Date(), subDays(new Date(), 1)]}
                    timeFormat="HH:mm"
                    timeIntervals={60}
                    timeCaption="time"
                    dateFormat="dd/MM/yyyy HH:mm aa"
                  />
                  {errors.date &&
                    errors.date.type === "required" && (
                      <span className="text-danger">Vui lòng chọn ngày giờ</span>
                    )}
                </FormGroup>
              </Col>
              {/* people */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Số người khám*</Label>
                  <input
                    defaultValue={newEdit[0].has_people}
                    className="form-control"
                    name="has_people"
                    ref={register({
                      required: true,
                    })}
                  ></input>
                  {errors.has_people &&
                    errors.has_people.type === "required" && (
                      <span className="text-danger">Số người đi khám</span>
                    )}
                </FormGroup>
              </Col>
            </Row>

            <Row form>
              {/* email */}
              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Email*</Label>
                  <input
                    defaultValue={newEdit[0].email}
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

              {/* service */}

              <Col lg={6} md={6} sm={6} xs={12}>
                <FormGroup>
                  <Label>Dịch vụ*</Label>
                  <Select
                    isMulti
                    name="service"
                    value={appointmentServices}
                    options={service}
                    onChange={onChangeService}
                    className="basic-multi-select"
                    classNamePrefix="select"
                    getOptionLabel={item => item.name}
                    getOptionValue={item => item.id}
                  />
                  {errors.service && errors.service.type === "required" && (
                    <span className="text-danger">Vui lòng không bỏ trống</span>
                  )}
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col lg={12} md={12} sm={6} xs={12}>
                <FormGroup>
                  <Label>Lời nhắn</Label>
                  <textarea
                    defaultValue={newEdit[0].message}
                    type="text"
                    className="form-control"
                    name="message"
                    ref={register}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row form>
              <Col lg={12} md={12} sm={6} xs={12}>
                <FormGroup>
                  <button type="submit" className="btn btn-primary w-100">
                    Cập nhật
                  </button>
                </FormGroup>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

DetailSub.propTypes = {};

export default DetailSub;
