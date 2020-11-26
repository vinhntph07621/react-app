import http from "./axiosHttp";

const getAll = () => {
  return http.get("/number-bookings");
};

export default {
  getAll
};
