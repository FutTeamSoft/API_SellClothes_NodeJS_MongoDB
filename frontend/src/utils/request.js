import axios from "axios";
//import jwt_decode from "jwt-decode";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

// request.interceptors.request.use(async (config) => {
//   let date = new Date();
//   const decodeToken = jwt_decode();
//   if (decodeToken.exp < date.getTime() / 1000) {

//   }
// });

export default request;
