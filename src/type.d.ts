export interface IItemListResults {
  results: IItemList[];
}

export interface IItemList {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  genre_ids: IGenre["id"][];
  media_type: TMediaType; // 없을경우 임의적으로 추가 함. (Category.tsx)
}

export interface IGetDetail extends Omit<IItemList, "genre_ids"> {
  genres: IGenre[];
  overview: string;
  vote_average: number;
  vote_count: number;
  release_date?: string;
  first_air_date?: string;
  seasons?: ISeasons[];
  original_language: "en" | "ko" | "ja";
}

export interface IGetGenre {
  genres: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}

export interface ISeasons {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
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

export interface IWatchVideo {
  isOpen: boolean;
  videoKey: IGetVideos["key"];
  videoName: string;
}

export interface IGetEpisodes {
  id: number;
  air_date: string;
  episode_number: number;
  season_number: number;
  name: string;
  overview: string;
  still_path: string;
}

export interface IGetEpisodesResults {
  name: string;
  episodes: IGetEpisodes[];
}

export interface IEpisodeModal {
  isOpen: boolean;
  episode: IGetEpisodes;
}

export type TDirection = "left" | "right";

export type TMediaType = "all" | "movie" | "tv";

export type TTime = "day" | "week";

export type TCurrentTab = "video" | "episode" | "recommend";
