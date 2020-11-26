import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DetailReExamination from "./DetailReExamination";
import { Link } from "react-router-dom";
import appointmentApi from "../../../../api/appointmentApi";
import swal from "sweetalert";
import { useForm } from "react-hook-form";

const Detail = (props) => {
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
    <div className="detail" style={{padding:"2px 0"}}>
      <Button
        className="form-control bg-primary btn border-0 py-2"
        value={appointmentId}
        onClick={toggle}
      >
        {buttonLabel} Thông tin thêm
      </Button>
      <Modal isOpen={modal} fade={false} toggle={toggle}>
        <ModalHeader toggle={toggle}>Thông tin chi tiết</ModalHeader>
        <ModalBody className="bg-white">
          {detailAppointment && listService && (
            <DetailReExamination newDetail={detailAppointment} newService={listService} />
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Detail;
