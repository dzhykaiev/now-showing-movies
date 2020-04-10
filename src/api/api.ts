/**
 * Here will be all api's stuff
 *
 */

import axios from "axios";

/**
 * Conditionally saving data in values, this is for usage mock data if used without api_key
 *
 */
export const API_DEFAULT_URLS = process.env.REACT_APP_TMDb_API_KEY
  ? ["/movie/now_playing", "/genre/movie/list"]
  : ["/now_playing.json", "/genre.json"];

const baseURL = process.env.REACT_APP_TMDb_API_KEY
  ? "https://api.themoviedb.org/3/"
  : "/";

export const API = axios.create({
  baseURL: baseURL,
});

API.interceptors.request.use(
  (config) =>
    (config = {
      ...config,
      params: { ...config.params, api_key: process.env.REACT_APP_TMDb_API_KEY },
    }),
  (error) => Promise.reject(error)
);
