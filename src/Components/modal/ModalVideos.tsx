import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IWatchVideo } from "../../type";

import { VideoListItem } from "./VideoListItem";

interface IProps {
  videos: IGetVideos[];
  isLoading: boolean;
  setWatchVideo: React.Dispatch<React.SetStateAction<IWatchVideo>>;
}

export const ModalVideos = ({ videos, isLoading, setWatchVideo }: IProps) => {
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
            <VideoListItem
              key={video.id}
              video={video}
              setWatchVideo={setWatchVideo}
            />
          ))}
        </ul>
      )}
    </>
  );
};
