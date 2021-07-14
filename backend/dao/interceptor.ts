import axios from "axios";

/** Enums */

let tokenInterceptor: any
const API = "https://api.spotify.com/v1";

export const getToken = (token: string) => {
  tokenInterceptor = token;
};

axios.interceptors.request.use(
  (request) => {
    request.headers = {
      Authorization: `Bearer ${tokenInterceptor}`,
      market: "VN",
    };
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(undefined, (error) => {
  // const { status, data, config } = error.response;
});

axios.defaults.baseURL = API;

export { axios };
