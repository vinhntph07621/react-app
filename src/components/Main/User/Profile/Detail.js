import React, { useState, useEffect } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import DetailSub from "./DetailSub";
import { Link } from "react-router-dom";
import appointmentApi from "../../../../api/appointmentApi";
import swal from "sweetalert";

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

  const onRemove = async (id) => {
    try {
      const data = await appointmentApi.updateStatus(appointmentId, {
        status: 3,
      });
      swal({
        title: "Bạn muốn hủy lịch?",
        text:
          "Cân nhắc trước khi hủy!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Poof! Your imaginary file has been deleted!", {
            icon: "success",
          });
          setTimeout(() => {
            window.location.reload("/profile");
          }, 2000);
        } else {
          swal("Your imaginary file is safe!");
        }
      });
    } catch (error) {
      console.log("failed to request API: ", error);
    }
  };

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
            <DetailSub newDetail={detailAppointment} newService={listService} />
          )}
        </ModalBody>
        <ModalFooter>
          <div className="cancel">
            {detailAppointment &&
              (detailAppointment[0].status == 1 ? (
                <Button color="primary" onClick={() => onRemove(appointmentId)}>
                  Hủy lịch
                </Button>
              ) : detailAppointment[0].status == 2 ? (
                <Button color="success">Đã xác nhận</Button>
              ) : (
                <Button color="danger">Đã hủy</Button>
              ))}
          </div>
          <Button color="secondary" onClick={toggle}>
            Đóng
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Detail;
