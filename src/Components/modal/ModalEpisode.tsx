import { useQuery } from "@tanstack/react-query";
import {
  IEpisodeModal,
  IGetDetail,
  IGetEpisodesResults,
  IItemList,
} from "../../type";
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
import { EpisodeDetailModal } from "./EpisodeDetailModal";
import { AnimatePresence } from "framer-motion";

interface IEpisodeProps {
  itemId: IItemList["id"];
  seasons: IGetDetail["seasons"];
  language: IGetDetail["original_language"];
  backDropPath: string;
}

export const ModalEpisode = ({
  itemId,
  seasons,
  language,
  backDropPath,
}: IEpisodeProps) => {
  const [selectSeason, setSelectSeason] = useState(1);

  const { data: episodeData, isLoading } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId, selectSeason],
    queryFn: () => getEpisode(itemId, selectSeason),
  });

  const [episodeModal, setEpisodeModal] = useState<IEpisodeModal>({
    isOpen: false,
    episode: {} as any,
  });

  return (
    <>
      {seasons && (
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
              <ColumnList
                onClick={() =>
                  setEpisodeModal({
                    isOpen: true,
                    episode,
                  })
                }
              >
                <ListThumbnail className="thumbnail">
                  <img
                    src={createImage(
                      "w400",
                      episode.still_path ?? backDropPath
                    )}
                    alt=""
                  />
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
      <AnimatePresence>
        {episodeModal.isOpen && (
          <EpisodeDetailModal
            {...episodeModal}
            itemId={itemId}
            language={language}
            setEpisodeModal={setEpisodeModal}
          />
        )}
      </AnimatePresence>
    </>
  );
};
