import axios from "axios";
import { Buffer } from "buffer";

export const signupAPI = (user) => {
  return axios
    .post(`${process.env.REACT_APP_API_URL}/user`, user)
    .then((res) => {
      const plaintext = `${user.email}:${user.password}`;
      const token = Buffer.from(plaintext).toString("base64");
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(res.data));
      return res;
    })
    .catch((err) => {
      return err;
    });
};
