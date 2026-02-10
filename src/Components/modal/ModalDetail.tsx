import { useQuery } from "@tanstack/react-query";
import { getDetail, getVideos } from "../../api";
import {
  IGetDetail,
  IGetVideosResults,
  IItemList,
  TCurrentTab,
  TMediaType,
} from "../../type";
import { useParams } from "react-router-dom";
import {
  Badge,
  BadgeArea,
  BgImage,
  ContentNav,
  ExitBtn,
  Genre,
  Header,
  ModalContent,
  ModalMessage,
  ModalNav,
  ModalOverview,
  More,
  Overview,
  OverviewBackground,
  Poster,
  ReleaseDate,
  Title,
  TitleArea,
  Vote,
} from "../../styles/modal/modalStyle";
import { createImage } from "../../utils/createImgae";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "./NavItem";
import { ModalVideos } from "./modalVideos/ModalVideos";
import { convertDate } from "../../utils/convertDate";
import { ModalRecommend } from "./modalRecommend/ModalRecommend";
import { ModalEpisode } from "./modalEpisode/ModalEpisode";
import { WatchVideo } from "./WatchVIdeo";
import { AnimatePresence } from "framer-motion";
import { useRecoilState, useResetRecoilState } from "recoil";
import { watchVideoStateFamily } from "../../atom";
import { ModalInfo } from "./modalInfo/ModalInfo";
import { ContentNavBar } from "./ContentNavBar";

interface IProps {
  itemId: IItemList["id"];
  closeModal: () => void;
  basePath?: string;
}

interface IParams {
  mediaType: TMediaType;
}

export const ModalDetail = ({ itemId, basePath, closeModal }: IProps) => {
  const { mediaType } = useParams() as unknown as IParams;

  const {
    data: detailData,
    isFetched: isDetailFetched,
    isLoading: isDetailLoading,
    isError: isDetailError,
  } = useQuery<IGetDetail>({
    queryKey: ["itemDetail", itemId],
    queryFn: () => getDetail(mediaType, itemId),
  });

  const {
    data: videosData,
    isLoading: isVideoLoading,
    isError: isVideosError,
  } = useQuery<IGetVideosResults>({
    queryKey: ["video", itemId],
    queryFn: () => getVideos(itemId, mediaType, "ko"),
  });

  const {
    data: videosPreData,
    isLoading: isPreVideoLoading,
    isError: isPreVideosError,
    refetch: preVideosRefetch,
  } = useQuery<IGetVideosResults>({
    queryKey: ["videoPre", itemId],
    queryFn: () =>
      getVideos(itemId, mediaType as TMediaType, detailData?.original_language),
    enabled: videosData?.results?.length === 0 && !!detailData,
  });

  const videos = videosData?.results;
  const preVideos = videosPreData?.results;

  const mainVideos = videos?.length ? videos : preVideos;
  const mainTraier = mainVideos?.findLast((video) => video.type === "Trailer");

  const [isOverviewOverFlow, setIsOverviewOverFlow] = useState(true);
  const overviewRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isDetailFetched) return;

    const overViewCurrrent = overviewRef.current;
    if (overViewCurrrent) {
      const scrollHeight = overViewCurrrent.scrollHeight;
      const offsetHeight = overViewCurrrent.offsetHeight;
      setIsOverviewOverFlow(scrollHeight > offsetHeight);
    }
  }, [detailData]);

  const [currentTab, setCurrentTab] = useState<TCurrentTab>(
    mediaType === "tv" ? "episode" : "video",
  );

  // 모달창 별로 동영상 재생 유무 state 관리
  const [watchVideo, setWatchVideo] = useRecoilState(
    watchVideoStateFamily(itemId),
  );
  const resetWatchVideo = useResetRecoilState(watchVideoStateFamily(itemId));
  useEffect(() => {
    resetWatchVideo();
  }, []);
  // 모달창 재랜더링 시 state 초기화

  if (isDetailLoading) {
    return <ModalMessage>로드 중...</ModalMessage>;
  }

  if (isDetailError) {
    return (
      <ModalMessage>
        컨텐츠를 찾을 수 없습니다.
        <br />
        잠시 후 다시 시도하거나 URL을 확인해 주세요.
      </ModalMessage>
    );
  }

  return (
    <>
      <ModalOverview>
        <OverviewBackground>
          <BgImage
            $bgImg={createImage(
              "w780",
              detailData?.backdrop_path ?? detailData?.poster_path ?? "",
            )}
          />
        </OverviewBackground>
        <ModalNav>
          <ExitBtn onClick={closeModal}>
            {" "}
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.052 4.352a1.202 1.202 0 0 0-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 0 0 1.7 1.7L12 13.7l5.948 5.948a1.202 1.202 0 0 0 1.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 0 0-1.7-1.7L12 10.3 6.052 4.352Z"
                fill="currentColor"
              ></path>
            </svg>
          </ExitBtn>
        </ModalNav>
        <Header>
          <TitleArea>
            <div>
              <Vote>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.706 3.135c.476-1.154 2.112-1.154 2.588 0l2.043 4.95 5.329.43c1.238.1 1.742 1.644.802 2.456L17.4 14.482l1.24 5.235c.286 1.213-1.035 2.168-2.097 1.515L12 18.434l-4.543 2.797c-1.062.653-2.383-.302-2.096-1.515L6.6 14.482l-4.068-3.51c-.94-.813-.436-2.356.802-2.456l5.329-.43 2.043-4.95Z"
                    fill="currentColor"
                  ></path>
                </svg>
                <span>
                  {detailData?.vote_count
                    ? detailData?.vote_average.toFixed(1)
                    : "--"}
                </span>
              </Vote>
              <Title>{detailData?.title ?? detailData?.name}</Title>
              <Genre>
                {detailData?.genres.map((genre) => (
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </Genre>
              <ReleaseDate>
                <span>
                  {detailData?.release_date
                    ? convertDate(detailData?.release_date)
                    : ""}
                  {detailData?.first_air_date
                    ? convertDate(detailData?.first_air_date)
                    : ""}
                </span>
              </ReleaseDate>
            </div>
            <BadgeArea>
              <Badge
                onClick={() =>
                  setWatchVideo({
                    isOpen: true,
                    videoKey: mainTraier?.key ?? "noVideo",
                    videoName: "트레일러 재생",
                  })
                }
              >
                <svg
                  width="24"
                  height="24"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                <span>트레일러 보기</span>
              </Badge>
              <Badge>
                <svg
                  width="24"
                  height="24"
                  fill="currentcolor"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                <span>좋아요</span>
              </Badge>
            </BadgeArea>
          </TitleArea>
          <Poster
            src={createImage("w342", detailData?.poster_path ?? "")}
            alt=""
          />
        </Header>
        <Overview
          ref={overviewRef}
          className={isOverviewOverFlow ? "overflow" : ""}
        >
          <span>{detailData?.overview}</span>
          {isOverviewOverFlow && (
            <More
              onClick={() => {
                setIsOverviewOverFlow(false);
              }}
            >
              ...더보기
            </More>
          )}
        </Overview>
      </ModalOverview>
      <ModalContent>
        {/* <ContentNav>
          {mediaType === "tv" && (
            <NavItem
              tab="episode"
              tabName="에피소드"
              tabMatch={currentTab === "episode"}
              setCurrentTab={setCurrentTab}
            />
          )}
          <NavItem
            tab="video"
            tabName="동영상"
            tabMatch={currentTab === "video"}
            setCurrentTab={setCurrentTab}
          />
          <NavItem
            tab="info"
            tabName="작품 정보"
            tabMatch={currentTab === "info"}
            setCurrentTab={setCurrentTab}
          />
          <NavItem
            tab="recommend"
            tabName="추천 작품"
            tabMatch={currentTab === "recommend"}
            setCurrentTab={setCurrentTab}
          />
        </ContentNav> */}
        <ContentNavBar
          mediaType={mediaType}
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        {currentTab === "episode" && (
          <ModalEpisode
            itemId={itemId}
            language={detailData?.original_language ?? "ko"}
            seasons={detailData?.seasons}
            backDropPath={detailData?.backdrop_path ?? ""}
          />
        )}
        {currentTab === "video" && (
          <ModalVideos
            itemId={itemId}
            videos={videos}
            preVideos={preVideos}
            videosError={isVideosError || isPreVideosError}
            isVideoLoading={isVideoLoading}
            isPreVideoLoading={isPreVideoLoading}
            originalLanguage={detailData?.original_language}
            preVideosRefetch={preVideosRefetch}
          />
        )}
        {currentTab === "info" && (
          <ModalInfo
            itemId={itemId}
            mediaType={mediaType}
            production_companies={detailData?.production_companies}
          />
        )}
        {currentTab === "recommend" && (
          <ModalRecommend
            itemId={itemId}
            mediaType={mediaType}
            basePath={basePath}
          />
        )}
      </ModalContent>
      <AnimatePresence>
        {watchVideo.isOpen && (
          <WatchVideo {...watchVideo} setWatchVideo={setWatchVideo} />
        )}
      </AnimatePresence>
    </>
  );
};
