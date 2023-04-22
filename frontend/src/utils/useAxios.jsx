// Here is all the request and managment of the tokens jwt from the backend.
// Also here is refreshed the tokens

import axios from "axios";
import jwt_decode from "jwt-decode";
import dayjs from "dayjs";
import { useAuthContext } from "../context/useAuthContext";

const baseURL = "http://localhost:8000/api";

const useAxios = () => {
  const { authTokens, setUser, setAuthTokens, logoutUser } = useAuthContext();
  // console.log(authTokens)
  const axiosInstance = axios.create({
    baseURL,
    headers: { Authorization: `Bearer ${authTokens?.access}` },
  });

  axiosInstance.interceptors.request.use(async (req) => {
    const access = jwt_decode(authTokens.access);
    const refresh = jwt_decode(authTokens.refresh);
    const isExpiredAccess = dayjs.unix(access.exp).diff(dayjs()) < 1;
    const isExpiredRefresh = dayjs.unix(refresh.exp).diff(dayjs()) < 1;

    if (!isExpiredAccess) {
      return req;
    } else if (!isExpiredRefresh) {
      const response = await axios.post(`${baseURL}/auth/token/refresh/`, {
        refresh: authTokens.refresh,
      });

      localStorage.setItem("authTokens", JSON.stringify(response.data));

      setAuthTokens(response.data);
      setUser(jwt_decode(response.data.access));

      req.headers.Authorization = `Bearer ${response.data.access}`;
      return req;
    } else {
      alert("Your session expired, please log in again.");
      logoutUser();
      return req;
    }
  });

  return axiosInstance;
};

export default useAxios;
