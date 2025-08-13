import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IItemList } from "../../type";

import { VideoListItem } from "./VideoListItem";

interface IProps {
  itemId: IItemList["id"];
  videos: IGetVideos[];
  videosLoadSuccess: boolean | undefined;
  isLoading: boolean;
}

export const ModalVideos = ({
  itemId,
  videos,
  videosLoadSuccess,
  isLoading,
}: IProps) => {
  return (
    <>
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : videosLoadSuccess === false ? (
        <ContentsMessage>
          데이터를 불러오지 못했습니다.
          <br /> 잠시 후 다시 시도해주세요.
        </ContentsMessage>
      ) : videos.length === 0 ? (
        <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
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
