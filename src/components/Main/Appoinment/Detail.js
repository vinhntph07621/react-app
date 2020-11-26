import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import appointmentApi from "../../../api/appointmentApi";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
//axiot
import axios from "axios";
import Select from "react-select";
import {
  Row,
  Col,
  Container,
  Form,
  Label,
  FormGroup,
  Button,
} from "reactstrap";

import DatePicker from "react-datepicker";
import { addDays } from "date-fns";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import subDays from "date-fns/subDays";
import moment from "moment";

//alert
import swal from "sweetalert";

const Detail = (props) => {
  const [startDate, setStartDate] = useState(new Date());

  const [listApponintment, setListApponintment] = useState([]);
  const [loading, setLoading] = useState(true);
  console.log(12, listApponintment);
  const { register, handleSubmit, errors, setValue, getValues } = useForm({
    defaultValues: {
      // date: listApponintment[0].date_time,
    },
  });
  const [doctor, setDoctor] = useState([]);
  const [service, setService] = useState([]);
  const [listService, setListService] = useState([]);
  const [appointmentServices, setAppointmentServices] = useState([]);
  const { id } = useParams();

  const onHandldeSubmit = async (values) => {
    const { data } = await appointmentApi.update(listApponintment[0].id, {
      patient_name: values.patient_name,
      email: values.email,
      phone_number: values.phone_number,
      address: values.address,
      date_time: values.date,
      service_id: appointmentServices.map((service) => service.id),
      doctor_id: values.doctor_id,
      has_people: values.has_people,
      message: values.message,
      status: values.status,
    });
    swal("Cập nhật thành công");
    setTimeout(() => {
      // window.location.reload("/profile");
    }, 1500);
  };

  useEffect(() => {
    const getListApponintment = async () => {
      const data = await appointmentApi
        .getDetail(id)
        .then((res) => {
          console.log("res", res.data);
          setListApponintment(res.data);
          setLoading(false);
          if ( res.data.length > 0 ) {
            const getDefaultDateTime = moment(res.data[0].date_time, "YYYY-MM-DD HH:mm:ss").toDate();
            setStartDate(getDefaultDateTime);
          }
        })

        .catch((errors) => {
          console.log("error", errors);
        });
    };

    const getDoctor = async () => {
      const { data } = await axios.get(
        "http://dental-project.herokuapp.com/api/doctors"
      );
      setDoctor(data);
    };

    const getService = async () => {
      const { data } = await axios.get(
        "http://dental-project.herokuapp.com/api/services"
      );
      setService(data);
    };

    const getServiceAp = async () => {
      const { data } = await appointmentApi.getService(id);
      setListService(data);
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

    getListApponintment();
    getDoctor();
    getService();
    getServiceAp();
  }, []);

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
    console.log(2222, e);
    setValue("date", moment(e).format("YYYY-MM-DD HH:mm"));
    console.log(3333, moment(e).format("YYYY-MM-DD HH:mm"));
  };

  const optionSelect = listService.map((newItem, index) => ({
    value: newItem.id,
    label: newItem.name,
  }));

  useEffect(() => {
    if (listService.length) {
      setAppointmentServices(listService);
      setValue("service", optionSelect);
    }
  }, [listService]);

  const onChangeService = (list) => {
    setValue("service", list);
    setAppointmentServices(list);
  };

  const onChangeStatus = (e) => {};
  console.log("loading", loading);

  if (loading) {
    return <></>;
  }

  return (
    <div className="page">
      <div className="content">
        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <h4 className="page-title">Edit Appointment</h4>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-8 offset-lg-2">
            <Form onSubmit={handleSubmit(onHandldeSubmit)}>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Khách hàng</label>
                    <input
                      defaultValue={listApponintment[0].patient_name}
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
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Số điện thoại</label>
                    <input
                      defaultValue={listApponintment[0].phone_number}
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
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bác sĩ</label>
                    <select
                      className="form-control"
                      name="doctor_id"
                      ref={register}
                    >
                      {doctor.map((newsDoctor, index) =>
                        listApponintment &&
                        newsDoctor.id ==
                          listApponintment.map((value) => value.doctor_id) ? (
                          <option key={index} value={newsDoctor.id} selected>
                            {" "}
                            {newsDoctor.last_name} {newsDoctor.first_name} - Ms
                            {newsDoctor.id}
                          </option>
                        ) : (
                          <option key={index} value={newsDoctor.id}>
                            {" "}
                            {newsDoctor.last_name} {newsDoctor.first_name} - Ms
                            {newsDoctor.id}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Địa chỉ</label>
                    <select
                      className="form-control"
                      name="address"
                      ref={register}
                    >
                      <option selected> 444 Nguyễn Văn Giáp - Hà Nội</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Thời gian</label>
                    <DatePicker
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
                    {errors.date && errors.date.type === "required" && (
                      <span className="text-danger">
                        Vui lòng chọn ngày giờ
                      </span>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Số người khám</label>
                    <input
                      defaultValue={listApponintment[0].has_people}
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
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      defaultValue={listApponintment[0].email}
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
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Dịch vụ</label>
                    <Select
                      isMulti
                      name="service"
                      value={appointmentServices}
                      options={service}
                      onChange={onChangeService}
                      className="basic-multi-select"
                      classNamePrefix="select"
                      getOptionLabel={(item) => item.name}
                      getOptionValue={(item) => item.id}
                    />
                    {errors.service && errors.service.type === "required" && (
                      <span className="text-danger">
                        Vui lòng không bỏ trống
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea
                  defaultValue={listApponintment[0].message}
                  cols={30}
                  rows={4}
                  className="form-control"
                  ref={register}
                  name="message"
                />
              </div>
              <div className="form-group">
                <label className="display-block">Appointment Status</label>
                <div className="form-check form-check-inline">
                  <input
                    onClick={onChangeStatus}
                    className="form-check-input"
                    type="radio"
                    name="status"
                    defaultValue="2"
                    ref={register}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="product_inactive"
                  >
                    Xác nhận
                  </label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    onClick={onChangeStatus}
                    className="form-check-input"
                    type="radio"
                    name="status"
                    defaultValue="3"
                    defaultChecked
                    ref={register}
                  />
                  <label className="form-check-label" htmlFor="product_active">
                    Hủy
                  </label>
                </div>
              </div>
              <div className="m-t-20 text-center">
                <button className="btn btn-primary submit-btn">Xác nhận</button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

Detail.propTypes = {};

export default Detail;
