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
  SeasonName,
  SelectList,
  SelectItem,
} from "../../styles/modal/modalColumnListStyle";
import { createImage } from "../../utils/createImgae";
import { convertDate } from "../../utils/convertDate";
import { useState } from "react";

interface IEpisodeProps {
  itemId: IItemList["id"];
  numberOfSeasons: IGetDetail["number_of_seasons"];
}

export const ModalEpisode = ({ itemId, numberOfSeasons }: IEpisodeProps) => {
  const [season, setSeason] = useState(1);
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const { data: episodeData, isLoading } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId, season],
    queryFn: () => getEpisode(itemId, season),
  });

  return (
    <>
      {numberOfSeasons && numberOfSeasons > 1 && (
        <Season>
          <SeasonName>{episodeData?.name}</SeasonName>
          <SeasonSelect
            onClick={() => setIsSelectOpen((prev) => !prev)}
            $isSelectOpen={isSelectOpen}
          >
            <span>{`시즌 ${season}`}</span>
            {isSelectOpen && (
              <SelectList>
                {Array.from({ length: numberOfSeasons }, (_, i) => i + 1).map(
                  (season) => (
                    <SelectItem key={season} onClick={() => setSeason(season)}>
                      시즌 {season}
                    </SelectItem>
                  )
                )}
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
