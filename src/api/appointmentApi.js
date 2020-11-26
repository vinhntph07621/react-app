import http from "./axiosHttp";

//lấy ra toàn bộ danh sách lịch
const getAll = () => {
  return http.get("/appointments");
};

//thêm mới lịch
const create = (data) => {
  return http.post("/appointments", data);
};

//lấy ra thông tin lịch
const getDetail = (id) => {
  return http.get(`/appointments/detail/${id}`);
};

//thêm trạng thái
const updateStatus = (id, data) => {
  return http.put(`/appointments/${id}`, data);
};

//lấy ra thog tin dịch vụ theo lịch khám
const getService = (id) => {
  return http.get(`/appointments/service/${id}`);
};

//updateAll
const update = (id, data) => {
  return http.put(`/appointments/edit/${id}`, data);
};

export default {
  getAll,
  create,
  getDetail,
  updateStatus,
  getService,
  update,
};
