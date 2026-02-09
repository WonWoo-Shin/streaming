import { useQuery } from "@tanstack/react-query";
import {
  ModalHeader,
  Overview,
  Section,
  SliderDots,
  StillImage,
  SubHead,
} from "../../../styles/modal/episodeModalStyle";
import {
  IGetDetail,
  IGetEpisodeImages,
  IGetEpisodes,
  IGetVideosResults,
  IItemList,
} from "../../../type";
import { getEpisodeImages, getEpisodeVideos } from "../../../api";
import Slider, { Settings } from "react-slick";
import { CustomArrow } from "../../CustomArrow";
import { ContentsMessage } from "../../../styles/modal/modalStyle";
import { createImage } from "../../../utils/createImgae";
import { VideoListItem } from "../modalVideos/VideoListItem";
import SimpleBar from "simplebar-react";

interface IProps {
  itemId: IItemList["id"];
  episode: IGetEpisodes;
  language: IGetDetail["original_language"];
  closeModal: () => void;
}

export const EpisodeInfoDetail = ({
  itemId,
  episode,
  language,
  closeModal,
}: IProps) => {
  const {
    data: episodeImagesData,
    isLoading: isImagesLoading,
    isError: isImagesError,
  } = useQuery<IGetEpisodeImages>({
    queryKey: ["episodeImages", episode.id],
    queryFn: () =>
      getEpisodeImages(itemId, episode.season_number, episode.episode_number),
  });

  const {
    data: episodeVideosData,
    isLoading: isVideosLoading,
    isError: isVideosError,
  } = useQuery<IGetVideosResults>({
    queryKey: ["episodeVideos", episode.id],
    queryFn: () =>
      getEpisodeVideos(
        itemId,
        episode.season_number,
        episode.episode_number,
        language,
      ),
  });

  const isLoading = isImagesLoading || isVideosLoading;
  const isError = isImagesError || isVideosError;

  const isMultiImage = episodeImagesData && episodeImagesData.stills.length > 1;

  const noInfo =
    !episodeImagesData?.stills.length && !episodeVideosData?.results.length;

  const slideSettings: Settings = {
    infinite: isMultiImage,
    prevArrow: <CustomArrow position="left" isMultiImage={isMultiImage} />,
    nextArrow: <CustomArrow position="right" isMultiImage={isMultiImage} />,
    dots: isMultiImage,
    appendDots: (dots) => <SliderDots>{dots}</SliderDots>,
  };

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

  if (noInfo) {
    return <ContentsMessage>에피소드 정보가 없습니다.</ContentsMessage>;
  }

  return (
    <>
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
  );
};
