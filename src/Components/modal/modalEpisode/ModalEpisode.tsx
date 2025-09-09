import { useQuery } from "@tanstack/react-query";
import {
  IEpisodeModal,
  IGetDetail,
  IGetEpisodesResults,
  IItemList,
} from "../../../type";
import { getEpisode } from "../../../api";
import { ContentsMessage } from "../../../styles/modal/modalStyle";
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
} from "../../../styles/modal/modalColumnListStyle";
import { createImage } from "../../../utils/createImgae";
import { convertDate } from "../../../utils/convertDate";
import { useState } from "react";
import { SeasonNav } from "./SeasonNav";
import { EpisodeInfoModal } from "./EpisodeInfoModal";
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

  const {
    data: episodeData,
    isLoading,
    isError,
  } = useQuery<IGetEpisodesResults>({
    queryKey: ["episode", itemId, selectSeason],
    queryFn: () => getEpisode(itemId, selectSeason),
  });

  const [episodeModal, setEpisodeModal] = useState<IEpisodeModal>({
    isOpen: false,
    episode: {} as any,
  });

  if (isLoading) {
    return <ContentsMessage>로드 중..</ContentsMessage>;
  }

  if (isError) {
    return (
      <ContentsMessage>
        데이터를 불러오지 못했습니다.
        <br /> 잠시 후 다시 시도해주세요.
      </ContentsMessage>
    );
  }

  if (!episodeData?.episodes.length) {
    return <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>;
  }

  return (
    <>
      {seasons && (
        <SeasonNav
          seasons={seasons}
          selectSeason={selectSeason}
          setSelectSeason={setSelectSeason}
        />
      )}
      <ul>
        {episodeData.episodes.map((episode) => (
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
                  src={createImage("w400", episode.still_path ?? backDropPath)}
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
      <AnimatePresence>
        {episodeModal.isOpen && (
          <EpisodeInfoModal
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
