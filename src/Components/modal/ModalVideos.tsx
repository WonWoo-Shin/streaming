import { useQuery } from "@tanstack/react-query";
import { NoContents } from "../../styles/modal/modalStyle";
import { getVideos } from "../../api";
import { IGetVideos, IGetVideosResults, TMediaType } from "../../type";
import { convertDate } from "../../utils/convertDate";
import {
  PlayIcon,
  Video,
  VideoContainer,
  VideoDate,
  VideoInfo,
  VideoName,
  VideoThumbnail,
} from "../../styles/modal/modalVideoStyle";
import { useSetRecoilState } from "recoil";
import { videoModalState } from "../../atom";

interface IModalVideosProps {
  itemId: number;
  mediaType: TMediaType;
}

export const ModalVideos = ({ videos }: { videos: IGetVideos[] }) => {
  const setVideoModal = useSetRecoilState(videoModalState);

  if (videos.length === 0) {
    return (
      <NoContents>
        <span>컨텐츠가 없습니다.</span>
      </NoContents>
    );
  }

  return (
    <ul>
      {videos.map(
        (video) =>
          video.site === "YouTube" && (
            <VideoContainer key={video.id}>
              <Video
                onClick={() => {
                  setVideoModal({
                    isOpen: true,
                    key: video.key,
                    name: video.name,
                  });
                }}
              >
                <VideoThumbnail>
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
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
                </VideoThumbnail>
                <VideoInfo>
                  <VideoName>{video.name}</VideoName>
                  <VideoDate>{convertDate(video.published_at)}</VideoDate>
                </VideoInfo>
              </Video>
            </VideoContainer>
          )
      )}
    </ul>
  );
};
