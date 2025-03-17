interface IItemList {
  id: number;
  backdrop_path?: string;
  poster_path: string;
  title?: string;
  name?: string;
  media_type?: TMediaType;
  overview: string;
}

export interface IItemListResults {
  results: IItemList[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGetDetail {
  title: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  genres: IGenre[];
  overview: string;
  vote_average: number;
  vote_count: number;
  tagline: string;
  release_date: string;
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

export type TDirection = "left" | "right";

export type TMediaType = "all" | "movie" | "tv";

export type TTime = "day" | "week";

export type TCurrentTab = "video" | "episode" | "similar";
