import {
  ICredits,
  IGetDetail,
  IGetEpisodeImages,
  IGetEpisodes,
  IGetEpisodesResults,
  IGetVideosResults,
  IItemList,
  IItemListResults,
  TMediaType,
  TTime,
} from "./type";

const BASE_PATH = "https://api.themoviedb.org/3";
const API_KEY = "148c0ccf226283888461d198a48dce07";
const LANGUAGE = "ko-KR";
const YOUTUBE_API_KEY = "AIzaSyAeoFkxAxrpXBk09xXdue0GZ79e9DGOh8w";

const apiClient = async <T>(fetchUrl: string): Promise<T> => {
  const response = await fetch(fetchUrl);

  if (!response.ok) {
    throw new Error(response.status + "");
  }

  return response.json() as Promise<T>;
};

export const getNowShowing = () => {
  return apiClient(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=${LANGUAGE}&region=KR`
  );
};

export const getTopRated = (mediaType: TMediaType) => {
  return apiClient(
    `${BASE_PATH}/${mediaType}/top_rated?api_key=${API_KEY}&language=${LANGUAGE}`
  );
};

export const getTrending = (mediaType: TMediaType, time: TTime) => {
  return apiClient(
    `${BASE_PATH}/trending/${mediaType}/${time}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
};

export const getDetail = (mediaType: TMediaType, itemId: IItemList["id"]) => {
  return apiClient<IGetDetail>(
    `${BASE_PATH}/${mediaType}/${itemId}?append_to_response=seasons&api_key=${API_KEY}&language=${LANGUAGE}`
  );
};

export const getGenre = (mediaType: TMediaType) => {
  return fetch(
    `${BASE_PATH}/genre/${mediaType}/list?api_key=${API_KEY}&language=${LANGUAGE}`
  ).then((response) => response.json());
};

export const getVideos = async (
  itemId: number,
  mediaType: TMediaType,
  language?: IGetDetail["original_language"]
): Promise<IGetVideosResults> => {
  const alowedLanguage: IGetDetail["original_language"][] = ["en", "ko", "ja"]; //해당 국가 영상만 표시하도록 허용
  const allowLanguage =
    language && alowedLanguage.includes(language) ? language : "en"; //language가 위의 허용 국가에 포함돼 있다면 그대로, 아니라면 영어로 적용

  const videosResults = await apiClient<IGetVideosResults>(
    `${BASE_PATH}/${mediaType}/${itemId}/videos?api_key=${API_KEY}&language=${allowLanguage}`
  );

  //이용 불가 영상 필터링
  const filterPromise = videosResults.results.map(async (video) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=status&id=${video.key}&key=${YOUTUBE_API_KEY}`
    );
    const fetchData = await response.json();
    return fetchData;
  });

  const fetchResults = await Promise.all(filterPromise);

  const filteredVideos = videosResults.results.filter((_, index) => {
    return fetchResults[index].items.length !== 0;
  });
  //이용 불가 영상 필터링

  return { results: filteredVideos };
};

export const getEpisode = (
  itemId: IItemList["id"],
  seasonNumber: IGetEpisodes["season_number"]
) => {
  return apiClient<IGetEpisodesResults>(
    `${BASE_PATH}/tv/${itemId}/season/${seasonNumber}?api_key=${API_KEY}&language=${LANGUAGE}`
  );
};

export const getEpisodeImages = (
  itemId: IItemList["id"],
  seasonNumber: IGetEpisodes["season_number"],
  episodeNumber: IGetEpisodes["episode_number"]
) => {
  return apiClient<IGetEpisodeImages>(
    `${BASE_PATH}/tv/${itemId}/season/${seasonNumber}/episode/${episodeNumber}/images?api_key=${API_KEY}`
  );
};

export const getEpisodeVideos = (
  itemId: IItemList["id"],
  seasonNumber: IGetEpisodes["season_number"],
  episodeNumber: IGetEpisodes["episode_number"],
  language: IGetDetail["original_language"]
) => {
  return apiClient<IGetVideosResults>(
    `${BASE_PATH}/tv/${itemId}/season/${seasonNumber}/episode/${episodeNumber}/videos?api_key=${API_KEY}&include_video_language=${language}&language=${LANGUAGE}`
  );
};

export const getCredits = (mediaType: TMediaType, itemId: IItemList["id"]) => {
  return apiClient<ICredits>(
    `${BASE_PATH}/${mediaType}/${itemId}/credits?api_key=${API_KEY}&language=${LANGUAGE}`
  );
};

export const getRecommend = (
  mediaType: TMediaType,
  itemId: IItemList["id"]
) => {
  return apiClient<IItemListResults>(
    `${BASE_PATH}/${mediaType}/${itemId}/recommendations?api_key=${API_KEY}&language=${LANGUAGE}&page=1`
  );
};

export const getTvSearch = (query: string) => {
  return apiClient<IItemListResults>(
    `${BASE_PATH}/search/tv?api_key=${API_KEY}&query=${query}&include_adult=false&language=${LANGUAGE}&page=1`
  );
};

export const getMovieSearch = (query: string) => {
  return apiClient<IItemListResults>(
    `${BASE_PATH}/search/movie?api_key=${API_KEY}&query=${query}&include_adult=false&language=${LANGUAGE}&page=1`
  );
};
