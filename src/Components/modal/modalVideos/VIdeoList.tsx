import { ContentsMessage } from "../../../styles/modal/modalStyle";
import { IGetVideos, IItemList } from "../../../type";

import { VideoListItem } from "./VideoListItem";

interface IProps {
  isLoading: boolean;
  videos: IGetVideos[];
  itemId: IItemList["id"];
}

export const VideoList = ({ isLoading, videos, itemId }: IProps) => {
  if (isLoading) {
    return <ContentsMessage>로드 중..</ContentsMessage>;
  }
  return (
    <ul>
      {videos?.map((video) => (
        <VideoListItem key={video.id} itemId={itemId} video={video} />
      ))}
    </ul>
  );
};
