interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
}

export interface IGetResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGenre {
  id: number;
  name: string;
}

export interface IGetDetail {
  genres: IGenre[];
}

export type TDirection = "left" | "right";

export interface ICarouselItemProps extends IMovie {
  itemWidth: number;
  isTransition: boolean;
  index: number;
  isCarouselActive: boolean;
}
