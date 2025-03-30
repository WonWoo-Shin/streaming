import { atom } from "recoil";
import { TMediaType, TTime } from "./type";

export const isDarkState = atom({
  key: "isDarkState",
  default: true,
});

export const screenState = atom({
  key: "screenState",
  default: 6,
});

export const trendingTimeState = atom<TTime>({
  key: "trendingTimeState",
  default: "day",
});

export const topRatedMediaTypeState = atom<TMediaType>({
  key: "topRatedMediaTypeState",
  default: "movie",
});
