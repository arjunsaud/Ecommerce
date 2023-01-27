import axios from "axios";
import { store } from "./store";
import { setAuthDetails } from "../slices/auth.slice";
import { toast } from "react-toastify";

const { dispatch } = store;

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

instance.interceptors.request.use((config) => {
  const { auth } = store.getState();
  const access_token = auth.bearer_token;
  if (access_token) {
    config.headers = {
      Authorization: `Bearer ${access_token}`,
      "Content-Type": config.type ? "multipart/form-data" : "application/json",
    };
  } else {
    config.headers = {
      "Content-Type": config.type ? "multipart/form-data" : "application/json",
    };
  }
  return config;
});

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const refreshTheToken = async (refreshToken) => {
      return instance.post("/auth/refresh_token", { refreshToken });
    };
    const response = error.response;
    if (response.status === 401) {
      if (error.config.url === "/auth/login") {
        toast.warning("User Credentials Do not Match");
      }
      if (
        error.config.url !== "/auth/refresh_token" &&
        error.config.url !== "/auth/login" &&
        error.config.url !== "/auth/register"
      ) {
        const { auth } = store.getState();
        const refresh_token = auth.refresh_token;

        const response = await refreshTheToken(refresh_token);

        const { refreshToken, token } = response.data;
        const user = {
          email: auth.email,
          bearer_token: token,
          refresh_token: refreshToken,
          role: auth.role,
          userid: auth.userid,
        };
        dispatch(setAuthDetails(user));
        error.config.headers["Authorization"] = "Bearer " + token;
        return instance.request(error.config);
      }
    } else if (response.status === 403) {
      window.alert("No permission!!");
    }
    return Promise.reject(error);
  }
);

export default instance;
