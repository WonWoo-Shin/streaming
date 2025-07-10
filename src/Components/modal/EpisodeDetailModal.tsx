import { createPortal } from "react-dom";
import {
  ContentsMessage,
  ModalBackground,
  ModalContainer,
} from "../../styles/modal/modalStyle";
import { Variants } from "framer-motion";
import {
  IEpisodeModal,
  IGetDetail,
  IGetEpisodeImages,
  IGetVideosResults,
} from "../../type";
import {
  EpisodeModalWindow,
  ModalHeader,
  Overview,
  Section,
  SliderDots,
  StillImage,
  SubHead,
} from "../../styles/modal/episodeModalStyle";
import { createImage } from "../../utils/createImgae";
import { useQuery } from "@tanstack/react-query";
import { getEpisodeImages, getEpisodeVideos } from "../../api";
import { VideoListItem } from "./VideoListItem";
import Slider, { Settings } from "react-slick";
import { CustomArrow } from "../CustomArrow";

const modalVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const modalWindowVariant: Variants = {
  initial: {
    translateY: 200,
  },
  animate: {
    translateY: 0,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    translateY: 200,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface IProps extends IEpisodeModal {
  itemId: IGetDetail["id"];
  language: IGetDetail["original_language"];
  setEpisodeModal: React.Dispatch<React.SetStateAction<IEpisodeModal>>;
}

export const EpisodeDetailModal = ({
  itemId,
  episode,
  language,
  setEpisodeModal,
}: IProps) => {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return null;

  const closeModal = () => {
    setEpisodeModal((prev) => ({ ...prev, isOpen: false }));
  };

  const { data: episodeImagesData, isLoading: isImagesLoading } =
    useQuery<IGetEpisodeImages>({
      queryKey: ["episodeImages", episode.id],
      queryFn: () =>
        getEpisodeImages(itemId, episode.season_number, episode.episode_number),
    });

  const isMultiImage = episodeImagesData && episodeImagesData.stills.length > 1;

  const { data: episodeVideosData, isLoading: isVideosLoading } =
    useQuery<IGetVideosResults>({
      queryKey: ["episodeVideos", episode.id],
      queryFn: () =>
        getEpisodeVideos(
          itemId,
          episode.season_number,
          episode.episode_number,
          language
        ),
    });

  const slideSettings: Settings = {
    infinite: isMultiImage,
    prevArrow: <CustomArrow position="left" isMultiImage={isMultiImage} />,
    nextArrow: <CustomArrow position="right" isMultiImage={isMultiImage} />,
    dots: isMultiImage,
    appendDots: (dots) => <SliderDots>{dots}</SliderDots>,
  };

  const isLoading = isImagesLoading || isVideosLoading;

  const noInfo =
    !episodeImagesData?.stills.length &&
    !episodeImagesData?.stills.length &&
    !episodeVideosData?.results.length;

  return (
    <>
      {createPortal(
        <ModalContainer
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ModalBackground onClick={closeModal} />
          <EpisodeModalWindow
            variants={modalWindowVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ModalHeader>
              <h1>
                {episode.episode_number}화 {episode.name}
              </h1>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={closeModal}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.052 4.352a1.202 1.202 0 0 0-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 0 0 1.7 1.7L12 13.7l5.948 5.948a1.202 1.202 0 0 0 1.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 0 0-1.7-1.7L12 10.3 6.052 4.352Z"
                  fill="currentColor"
                ></path>
              </svg>
            </ModalHeader>
            {isLoading ? (
              <ContentsMessage>로딩 중...</ContentsMessage>
            ) : noInfo ? (
              <ContentsMessage>에피소드 정보가 없습니다.</ContentsMessage>
            ) : (
              <>
                {!!episodeImagesData?.stills.length && (
                  <StillImage>
                    <Slider {...slideSettings}>
                      {episodeImagesData?.stills.map((still, index) => (
                        <img
                          key={index}
                          src={createImage("w780", still.file_path)}
                          alt=""
                        />
                      ))}
                    </Slider>
                  </StillImage>
                )}
                {!!episode.overview && (
                  <Section>
                    <SubHead>줄거리</SubHead>
                    <Overview>{episode.overview}</Overview>
                  </Section>
                )}
                {!!episodeVideosData?.results.length && (
                  <Section>
                    <SubHead>동영상</SubHead>
                    <ul>
                      {episodeVideosData?.results.map((video) => (
                        <VideoListItem
                          key={video.id}
                          itemId={itemId}
                          video={video}
                          thumbnailWidth="220px"
                        />
                      ))}
                    </ul>
                  </Section>
                )}
              </>
            )}
          </EpisodeModalWindow>
        </ModalContainer>,
        modalContainer
      )}
    </>
  );
};
