import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IItemList } from "../../type";

import { VideoListItem } from "./VideoListItem";

interface IProps {
  itemId: IItemList["id"];
  videos: IGetVideos[];
  isLoading: boolean;
}

export const ModalVideos = ({ itemId, videos, isLoading }: IProps) => {
  return (
    <>
      {isLoading ? (
        <ContentsMessage className="exactScroll">
          <span>로드 중..</span>
        </ContentsMessage>
      ) : videos.length === 0 ? (
        <ContentsMessage>
          <span>컨텐츠가 없습니다.</span>
        </ContentsMessage>
      ) : (
        <ul>
          {videos.map((video) => (
            <VideoListItem key={video.id} itemId={itemId} video={video} />
          ))}
        </ul>
      )}
    </>
  );
};
