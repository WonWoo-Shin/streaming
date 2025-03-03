import { atom } from "recoil";
import { IGetVideos, TTime } from "./type";

export const screenState = atom({
  key: "screenState",
  default: 6,
});

export const trendingTimeState = atom<TTime>({
  key: "trendingTimeState",
  default: "day",
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
