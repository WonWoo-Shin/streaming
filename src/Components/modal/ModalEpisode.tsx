import { useQuery } from "@tanstack/react-query";
import { IGetDetail, IGetEpisodesResults, IItemList } from "../../type";
import { getEpisode } from "../../api";
import { ContentsMessage } from "../../styles/modal/modalStyle";
import {
  ColumnListContainer,
  ColumnList,
  ListThumbnail,
  ListName,
  ListDate,
  EpisodeInfo,
  EpisodeNumber,
  EpisodeMainInfo,
  EpisodeOverview,
} from "../../styles/modal/modalColumnListStyle";
import { createImage } from "../../utils/createImgae";
import { convertDate } from "../../utils/convertDate";
import { useState } from "react";
import { SeasonNav } from "./SeasonNav";

interface IEpisodeProps {
  itemId: IItemList["id"];
  seasons: IGetDetail["seasons"];
}

export const ModalEpisode = ({ itemId, seasons }: IEpisodeProps) => {
  const [selectSeason, setSelectSeason] = useState(1);

  const { data: episodeData, isLoading } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId, selectSeason],
    queryFn: () => getEpisode(itemId, selectSeason),
  });

  return (
    <>
      {seasons && seasons.length > 1 && (
        <SeasonNav
          seasons={seasons}
          selectSeason={selectSeason}
          setSelectSeason={setSelectSeason}
        />
      )}
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : episodeData?.episodes.length === 0 ? (
        <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
      ) : (
        <ul>
          {episodeData?.episodes.map((episode) => (
            <ColumnListContainer key={episode.id}>
              <ColumnList>
                <ListThumbnail className="thumbnail">
                  <img src={createImage("w400", episode.still_path)} alt="" />
                </ListThumbnail>
                <EpisodeInfo>
                  <EpisodeMainInfo>
                    <div>
                      <EpisodeNumber>{episode.episode_number}화</EpisodeNumber>
                      <ListName>{episode.name}</ListName>
                    </div>
                    <ListDate>{convertDate(episode.air_date)}</ListDate>
                  </EpisodeMainInfo>
                  <EpisodeOverview>{episode.overview}</EpisodeOverview>
                </EpisodeInfo>
              </ColumnList>
            </ColumnListContainer>
          ))}
        </ul>
      )}
    </>
  );
};
