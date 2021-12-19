import axios from "axios";
let token;
if (localStorage.getItem("token")) {
  token = `Bearer ${localStorage.getItem("token").slice(1, -1)}`;
}

const Axios = axios.create({
  baseURL: "http://192.168.100.32:5000",
  // baseURL: "http://localhost:8000",
  // baseURL: "http://192.168.100.32:5000",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    authorization: token,
  },
});
export { Axios };
