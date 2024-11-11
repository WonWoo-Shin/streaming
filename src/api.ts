const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "148c0ccf226283888461d198a48dce07";

export const getNowPlaying = () => {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
};
