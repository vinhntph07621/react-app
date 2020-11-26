import http from "./axiosHttp";
//getAll Doctor
const getAll = () => {
  return http.get("/nurses");
};

//add
const create = (data) => {
  return http.post("/nurses", data);
};

export default { create, getAll };
