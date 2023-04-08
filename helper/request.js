import axios from "axios";

export const axiosPost = (options) => {
  return axios.post(options);
}

export const axiosRequest = (options) => {
  return axios.request(options);
}