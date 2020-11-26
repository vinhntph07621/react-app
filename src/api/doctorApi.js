import http from "./axiosHttp";
//getAll Doctor
const getAll = () => {
  return http.get("/doctors");
};

//add
const create = (data) => {
  return http.post("/doctors", data);
};

//getbyID
const getById = (id) => {
  return http.get(`/doctors/${id}`);
};

//update
const update = (id, data) => {
  return http.put(`/doctors/${id}`, data);
};

export default { create, update, getById, getAll };
