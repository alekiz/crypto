import { axiosPrivate } from "../api/axios.js";
import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken.js";
import useAuth from "./useAuth.js";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  useEffect(() => {
    // Attach the latest access token to each outgoing request.
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        if (auth?.accessToken) {
          config.headers['Authorization'] = `Bearer ${auth.accessToken}`;
        }
        return config;
      },
      error => Promise.reject(error)
    );

    // Intercept responses to handle expired tokens.
    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async error => {
        const prevRequest = error?.config;
        // If we get a 403 error and haven't retried yet, try to refresh the token.
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    // Cleanup interceptors when the component unmounts or dependencies change.
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
