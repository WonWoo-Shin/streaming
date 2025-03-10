import { IGetVideos, IGetVideosResults, TMediaType, TTime } from "./type";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "148c0ccf226283888461d198a48dce07";
const LANGUAGE = "ko-KR";
const YOUTUBE_API_KEY = "AIzaSyAeoFkxAxrpXBk09xXdue0GZ79e9DGOh8w";

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

export const getVideos = async (
  itemId: number,
  mediaType: TMediaType,
  english?: boolean
) => {
  const { results: videos }: IGetVideosResults = await fetch(
    `${BASE_PATH}/${mediaType}/${itemId}/videos?api_key=${API_KEY}&language=${
      english ? "en-US" : LANGUAGE
    }`
  ).then((response) => response.json());

  //이용 불가 영상 필터링
  const filterPromise = videos.map(async (video) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${video.key}&key=${YOUTUBE_API_KEY}`
    );
    const fetchData = await response.json();
    return fetchData;
  });

  const fetchResults = await Promise.all(filterPromise);

  const filteredVideos = videos.filter((_, index) => {
    return fetchResults[index].items.length !== 0;
  });
  //이용 불가 영상 필터링

  return filteredVideos;
};
