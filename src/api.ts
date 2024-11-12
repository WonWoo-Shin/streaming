const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "148c0ccf226283888461d198a48dce07";
const LANGUAGE = "ko-KR";

export const getNowPlaying = () => {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};
