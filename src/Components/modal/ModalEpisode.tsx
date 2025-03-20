import { useQuery } from "@tanstack/react-query";
import { IGetEpisodesResults, IItemList } from "../../type";
import { getEpisode } from "../../api";
import { ContentsMessage } from "../../styles/modal/modalStyle";
import {
  Video,
  VideoContainer,
  VideoDate,
  VideoInfo,
  VideoName,
  VideoThumbnail,
} from "../../styles/modal/modalVideoStyle";
import { createImage } from "../../utils/createImgae";
import { convertDate } from "../../utils/convertDate";

interface IEpisodeProps {
  itemId: IItemList["id"];
}

export const ModalEpisode = ({ itemId }: IEpisodeProps) => {
  const { data: episodeData, isLoading } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId],
    queryFn: () => getEpisode(itemId, 1),
  });

  return (
    <>
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : episodeData?.episodes.length === 0 ? (
        <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
      ) : (
        <ul>
          {episodeData?.episodes.map((episode) => (
            <VideoContainer key={episode.id}>
              <Video>
                <VideoThumbnail>
                  <img src={createImage("w400", episode.still_path)} alt="" />
                </VideoThumbnail>
                <VideoInfo>
                  <VideoName>{episode.name}</VideoName>
                  <VideoDate>{convertDate(episode.air_date)}</VideoDate>
                </VideoInfo>
              </Video>
            </VideoContainer>
          ))}
        </ul>
      )}
    </>
  );
};
