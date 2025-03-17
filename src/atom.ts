import { atom } from "recoil";
import { IGetVideos, TMediaType, TTime } from "./type";

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

interface IVideoModal {
  isOpen: boolean;
  key: IGetVideos["key"];
  name: string;
}

export const videoModalState = atom<IVideoModal>({
  key: "videoModalState",
  default: { isOpen: false, key: "", name: "" },
});
