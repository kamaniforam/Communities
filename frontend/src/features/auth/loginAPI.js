import axios from "axios";
import { Buffer } from "buffer";

export const loginAPI = ({ email, password }) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/user`, {
      auth: { username: email, password: password },
    })
    .then((res) => {
      const plaintext = `${email}:${password}`;
      const token = Buffer.from(plaintext).toString("base64");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};

export const loginWithToken = (token) => {
  return axios
    .get(`${process.env.REACT_APP_API_URL}/user`, {
      headers: { Authorization: `Basic ${token}` },
    })
    .then((res) => {
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};
