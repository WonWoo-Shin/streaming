import { useQuery } from "@tanstack/react-query";
import {
  Video,
  VideoContainer,
  VideoDate,
  VideoInfo,
  VideoName,
  Videos,
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

  const convertDate = (date: string) => {
    const newDate = new Date(date);
    console.log(newDate);
    return `${newDate.getFullYear()}.${
      newDate.getMonth() + 1
    }.${newDate.getDate()}`;
  };

  return (
    <Videos>
      {videosData?.results.map((video) => (
        <VideoContainer key={video.id}>
          <Video>
            <VideoThumbnail>
              <img
                src={`https://img.youtube.com/vi/${video.key}/maxresdefault.jpg`}
                alt=""
              />
            </VideoThumbnail>
            <VideoInfo>
              <VideoName>{video.name}</VideoName>
              <VideoDate>{convertDate(video.published_at)}</VideoDate>
            </VideoInfo>
          </Video>
        </VideoContainer>
      ))}
    </Videos>
  );
};
