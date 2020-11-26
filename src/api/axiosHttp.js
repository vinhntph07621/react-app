import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://dental-project.herokuapp.com/api/",
    headers: {
        "Content-type": "application/json"
    }
});
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    const token = localStorage.getItem("token");
    if (token){
        const { data } = JSON.parse(token);
        if (data && data.access_token) {
            Object.assign(config.headers, {
                Authorization: `Bearer ${data.access_token}`,
            });
        }
    }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
    // Do something before request is sent
    
    return response;
}, function (error) {
    return Promise.reject(error);
});

export default axiosInstance;