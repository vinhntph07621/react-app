import http from "./axiosHttp";

//lấy thông tin user khi đăng nhập vào
const getCurrent = () => {
  return http.get("/auth");
};

//thay dổi thông tin user
const update = (id, data) => {
  return http.put(`/users/${id}`, data);
};

//thay đổi password
const updatePassWord = (data) => {
  return http.put(`/users/password/update`, data);
};

export default {
  getCurrent,
  update,
  updatePassWord,
};
