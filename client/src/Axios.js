import axios from "axios";
let token;
if (localStorage.getItem("token")) {
  token = `Bearer ${localStorage.getItem("token").slice(1, -1)}`;
}

const Axios = axios.create({
  // baseURL: "http://192.168.1.72:8000",
  // baseURL: "http://localhost:8000",
  baseURL: "https://darul-hikma.herokuapp.com",
  withCredentials: true,
  headers: {
    "content-type": "application/json",
    "Access-Control-Allow-Origin": "*",
    authorization: token,
  },
});
export { Axios };
