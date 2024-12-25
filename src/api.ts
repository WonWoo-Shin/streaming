const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "148c0ccf226283888461d198a48dce07";
const LANGUAGE = "ko-KR";

export const getPopular = () => {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getUpComing = () => {
  return fetch(
    `${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getTopRated = () => {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getDetail = (movieId: number) => {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};
