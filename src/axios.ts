import axios from "axios";

const url = "http://94.130.59.91:8001";

const instance = axios.create({
  baseURL: url,
});

export default instance;
