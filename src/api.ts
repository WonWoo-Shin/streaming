import { TMediaType, TTime } from "./type";

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

export const getDetail = (itemId: number, mediaType: TMediaType) => {
  return fetch(
    `${BASE_PATH}/${mediaType}/${itemId}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getTrending = (mediaType: TMediaType, time: TTime) => {
  return fetch(
    `${BASE_PATH}/trending/${mediaType}/${time}?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getVideos = (
  itemId: number,
  mediaType: TMediaType,
  english?: boolean
) => {
  return fetch(
    `${BASE_PATH}/${mediaType}/${itemId}/videos?api_key=${API_KEY}&language=${
      english ? "en-US" : LANGUAGE
    }`
  ).then((response) => response.json());
};
