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
  Season,
  SeasonSelect,
  SelectList,
  SelectItem,
} from "../../styles/modal/modalColumnListStyle";
import { createImage } from "../../utils/createImgae";
import { convertDate } from "../../utils/convertDate";
import { useState } from "react";

interface IEpisodeProps {
  itemId: IItemList["id"];
  seasons: IGetDetail["seasons"];
}

export const ModalEpisode = ({ itemId, seasons }: IEpisodeProps) => {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: episodeData, isLoading } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId, currentSeason],
    queryFn: () => getEpisode(itemId, currentSeason),
  });

  return (
    <>
      {seasons && seasons.length > 1 && (
        <Season>
          <SeasonSelect
            onClick={() => setIsSelectOpen((prev) => !prev)}
            $isSelectOpen={isSelectOpen}
          >
            <span>
              {
                seasons[
                  seasons.findIndex(
                    (season) => season.season_number === currentSeason
                  )
                ].name
              }
            </span>
            {isSelectOpen && (
              <SelectList>
                {seasons.map((season) => (
                  <SelectItem
                    key={season.id}
                    onClick={() => setCurrentSeason(season.season_number)}
                  >
                    {season.name}
                  </SelectItem>
                ))}
              </SelectList>
            )}
          </SeasonSelect>
        </Season>
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
