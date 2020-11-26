import http from "./axiosHttp";


//lấy ra toàn bộ dịch vụ
const getAll = () => {
    return http.get("/services");
};

export default {
    getAll,
};