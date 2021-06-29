import axios from "axios";

/** Constants */
import { URLS } from "@constants/index";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  const { status, data, config } = error.response;
  console.log("=======================BEGIN AXIOS========================");
  console.log("RESPONSE STATUS =>", status);
  console.log("RESPONSE DATA =>", data);
  console.log("RESPONSE CONFIG =>", config);
  console.log("===========================END AXIOS====================");
});

axios.defaults.baseURL = URLS.LOCALHOST;

export default axios;
