import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DetailEdit from "./DetailEdit";
import { Link } from "react-router-dom";
import appointmentApi from "../../../../api/appointmentApi";
import swal from "sweetalert";

const EditApointment = (props) => {
  const { buttonLabel, className } = props;
  const [detailAppointment, setDetailAppointment] = useState();
  const [appointment, setAppointment] = useState([]);
  const [listService, setListService] = useState([]);
  const [modal, setModal] = useState(false);
  const { appointmentId } = props;
  const toggle = (e) => {
    setModal(!modal);
  };

  useEffect(() => {
    const getDetailSub = async () => {
      const { data } = await appointmentApi.getDetail(appointmentId);
      setDetailAppointment(data);
    };
    const getServiceAp = async () => {
      const { data } = await appointmentApi.getService(appointmentId);
      setListService(data);
    };
    modal && getDetailSub();
    modal && getServiceAp();
  }, [modal]);

  return (
    <div className="detail">
        <Button
          className="form-control bg-warning btn border-0"
          value={appointmentId}
          onClick={toggle}
        >
          {buttonLabel} Sửa thông tin
        </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông tin chi tiết</ModalHeader>
        <ModalBody>
          {detailAppointment && listService && (
            <DetailEdit newEdit={detailAppointment} newsService={listService} />
          )}
        </ModalBody>
      </Modal>
    </div>
  );
};

export default EditApointment;
