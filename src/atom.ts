import { atom } from "recoil";
import { TTime } from "./type";

export const screenState = atom({
  key: "screenState",
  default: 6,
});

export const trendingTimeState = atom<TTime>({
  key: "trendingTimeState",
  default: "day",
});
