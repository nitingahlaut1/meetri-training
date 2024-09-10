import axios from "axios";
import { API_URL } from "../const/Const";

const API = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
});

export default API;
