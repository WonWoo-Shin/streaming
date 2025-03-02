import { useQuery } from "@tanstack/react-query";
import { NoContents } from "../../styles/modal/modalStyle";
import { getVideos } from "../../api";
import { IGetVideos, IGetVideosResults, TMediaType } from "../../type";
import { convertDate } from "../../utils/convertDate";
import {
  Video,
  VideoContainer,
  VideoDate,
  VideoInfo,
  VideoName,
  VideoThumbnail,
} from "../../styles/modal/modalVideoStyle";
import { useRecoilState } from "recoil";
import { videoModalState } from "../../atom";
import { createPortal } from "react-dom";
import { WatchVideo } from "./WatchVIdeo";

interface IModalVideosProps {
  itemId: number;
  mediaType: TMediaType;
}

export const ModalVideos = ({ itemId, mediaType }: IModalVideosProps) => {
  const [videoModal, setVideoModal] = useRecoilState(videoModalState);

  const { data: videosData } = useQuery<IGetVideosResults>({
    queryKey: ["video", itemId],
    queryFn: () => getVideos(itemId, mediaType),
  });

  const { data: videosPreData } = useQuery<IGetVideosResults>({
    queryKey: ["videoPre", itemId],
    queryFn: () => getVideos(itemId, mediaType, true),
    enabled: videosData?.results.length === 0,
  });

  const videos = [
    ...(videosData?.results || []),
    ...(videosPreData?.results || []),
  ];

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
                  setVideoModal({ isOpen: true, key: video.key });
                }}
              >
                <VideoThumbnail>
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                    alt={video.name}
                  />
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
