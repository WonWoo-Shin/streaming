import { atom, atomFamily } from "recoil";
import { IWatchVideo, TMediaType, TTime } from "./type";

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

export const watchVideoStateFamily = atomFamily<IWatchVideo, number>({
  key: "watchVideo",
  default: {
    isOpen: false,
    videoKey: "",
    videoName: "",
  },
});
