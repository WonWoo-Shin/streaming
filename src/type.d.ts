interface IItem {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title?: string;
  name?: string;
  media_type?: TMediaType;
  overview: string;
}

export interface IGetResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IItem[];
  total_pages: number;
  total_results: number;
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
  tagline: string;
}

export interface IGetVideosResults {
  results: IVideos[];
}

export interface IGetVideos {
  results: {
    id: string;
    key: string;
    name: string;
    published_at: string;
    site: string;
  }[];
}

export type TDirection = "left" | "right";

export interface ICarouselItemProps extends IItem {
  itemWidth: number;
  isTransition: boolean;
  index: number;
  isCarouselActive: boolean;
}

export type TMediaType = "all" | "movie" | "tv";

export type TTime = "day" | "week";

export type TCurrentTab = "video" | "episode" | "similar";
