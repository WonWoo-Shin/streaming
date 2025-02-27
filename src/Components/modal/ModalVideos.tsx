import { useQuery } from "@tanstack/react-query";
import {
  Video,
  VideoContainer,
  VideoDate,
  VideoInfo,
  VideoName,
  VideoThumbnail,
} from "../../styles/modalStyle";
import { getVideos } from "../../api";
import { IGetVideos, TMediaType } from "../../type";

interface IModalVideosProps {
  itemId: number;
  mediaType: TMediaType;
}

export const ModalVideos = ({ itemId, mediaType }: IModalVideosProps) => {
  const { data: videosData } = useQuery<IGetVideos>({
    queryKey: ["video", itemId],
    queryFn: () => getVideos(itemId, mediaType),
  });

  const { data: videosPreData } = useQuery<IGetVideos>({
    queryKey: ["videoPre", itemId],
    queryFn: () => getVideos(itemId, mediaType, true),
    enabled: videosData?.results.length === 0,
  });

  const videos = [
    ...(videosData?.results || []),
    ...(videosPreData?.results || []),
  ];

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    return `${newDate.getFullYear()}.${
      newDate.getMonth() + 1
    }.${newDate.getDate()}`;
  };

  return (
    <ul>
      {videos.map(
        (video) =>
          video.site === "YouTube" && (
            <VideoContainer key={video.id}>
              <Video>
                <VideoThumbnail>
                  <img
                    src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                    alt={video.name}
                    onError={() => console.log("asd")}
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
