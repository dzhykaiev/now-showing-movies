import axios from "axios";

export const API = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
});

API.interceptors.request.use(
  (config) =>
    (config = {
      ...config,
      params: { ...config.params, api_key: process.env.REACT_APP_TMDb_API_KEY },
    }),
  (error) => Promise.reject(error)
);
