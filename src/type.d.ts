export interface IItemListResults {
  results: IItemList[];
}

export interface IItemList {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  media_type: TMediaType; // 없을경우 임의적으로 추가 함. (Category.tsx)
}

export interface IGetDetail extends IItemList {
  genres: IGenre[];
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date: string;
  original_language: "en" | "ko" | "ja";
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGetVideos {
  id: string;
  key: string;
  name: string;
  published_at: string;
  site: string;
  type: string;
}

export interface IGetVideosResults {
  results: IGetVideos[];
}

export interface IGetEpisodes {
  id: number;
  air_date: string;
  episode_number: number;
  name: string;
  overview: string;
  still_path: string;
}

export interface IGetEpisodesResults {
  episodes: IGetEpisodes[];
}

export type TDirection = "left" | "right";

export type TMediaType = "all" | "movie" | "tv";

export type TTime = "day" | "week";

export type TCurrentTab = "video" | "episode" | "recommend";
