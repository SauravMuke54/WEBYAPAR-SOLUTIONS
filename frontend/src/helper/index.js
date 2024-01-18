import { API } from "../backend";
import axios from "axios";

export const authenticate = (data, next) => {
    if (typeof window !== "undefined") {
      //window obj is accessible
      localStorage.setItem("jwt", JSON.stringify(data));
      //jwt is a token
      next();
    }
  };
  export const isAuthenticated = () => {
    if (typeof window == "undefined") {
      //window obj is undeifined ie.no access therifore user not authenticated
      return false;
    }
    if (localStorage.getItem("jwt")) {
      return JSON.parse(localStorage.getItem("jwt"));
    } else {
      return false;
    }
  };

  export const LoginHelper = async (username, password) => {
    try {
      await axios
        .post(`${API}/signin`, {
          username: username,
          password: password,
        })
        .then((response) => {
          console.log(response.data);
          return response.data;
        })
        .catch((err) => {
          return err;
        });
    } catch (err) {
      console.log(err);
    }
  };

  export const signout = async () => {
    if (typeof window !== "undefined") {
      //window obj is accessible
      localStorage.removeItem("jwt"); //removing after signout
      //jwt is a token
  
      //logout user from bkend
      await axios
        .get(`${API}/signout`)
        .then((response) => {return response.data})
        .catch((err) => console.log(err));
    }
  };