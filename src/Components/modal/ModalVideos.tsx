import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IWatchVideo } from "../../type";
import { convertDate } from "../../utils/convertDate";
import {
  ColumnListContainer,
  ColumnList,
  ListThumbnail,
  VideoInfo,
  ListName,
  ListDate,
  PlayIcon,
} from "../../styles/modal/modalColumnListStyle";

interface IModalVideosProps {
  videos: IGetVideos[];
  isLoading: boolean;
  setWatchVideo: React.Dispatch<React.SetStateAction<IWatchVideo>>;
}

export const ModalVideos = ({
  videos,
  isLoading,
  setWatchVideo,
}: IModalVideosProps) => {
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
          {videos.map(
            (video) =>
              video.site === "YouTube" && (
                <ColumnListContainer key={video.id}>
                  <ColumnList
                    onClick={() =>
                      setWatchVideo({
                        isOpen: true,
                        videoKey: video.key,
                        videoName: video.name,
                      })
                    }
                  >
                    <ListThumbnail>
                      <img
                        src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
                        alt={video.name}
                      />
                      <PlayIcon className="play-icon">
                        {" "}
                        <svg
                          width="50"
                          height="50"
                          viewBox="0 0 24 24"
                          fill="#ffffff"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M18.2 10.96a1.2 1.2 0 0 1 0 2.08l-8.4 4.849a1.2 1.2 0 0 1-1.8-1.04V7.15a1.2 1.2 0 0 1 1.8-1.039l8.4 4.85Z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </PlayIcon>
                    </ListThumbnail>
                    <VideoInfo>
                      <ListName>{video.name}</ListName>
                      <ListDate>{convertDate(video.published_at)}</ListDate>
                    </VideoInfo>
                  </ColumnList>
                </ColumnListContainer>
              )
          )}
        </ul>
      )}
    </>
  );
};
