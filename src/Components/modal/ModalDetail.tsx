import { useQuery } from "@tanstack/react-query";
import { getDetail, getVideos } from "../../api";
import {
  IGetDetail,
  IGetVideos,
  IWatchVideo,
  TCurrentTab,
  TMediaType,
} from "../../type";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  BadgeArea,
  BgImage,
  ContentNav,
  ExitBtn,
  Genre,
  Header,
  ModalContent,
  ModalNav,
  ModalOverview,
  More,
  Overview,
  Poster,
  ReleaseDate,
  Title,
  TitleArea,
  Vote,
} from "../../styles/modal/modalStyle";
import { createImage } from "../../utils/createImgae";
import { useEffect, useRef, useState } from "react";
import { NavItem } from "./NavItem";
import { ModalVideos } from "./ModalVideos";
import { convertDate } from "../../utils/convertDate";
import { ModalRecommend } from "./ModalRecommend";
import { ModalEpisode } from "./ModalEpisode";
import { WatchVideo } from "./WatchVIdeo";
import { AnimatePresence } from "framer-motion";

interface IProps {
  itemId: number;
}

interface IParams {
  mediaType: TMediaType;
}

export const ModalDetail = ({ itemId }: IProps) => {
  const { mediaType } = useParams() as unknown as IParams;

  const [preMediaType, setPreMediaType] = useState(mediaType);
  useEffect(() => {
    if (mediaType) {
      setPreMediaType(mediaType);
    }
  }, [mediaType]); // 모달창이 닫힐 때 자연스러운 애니메이션을 위해 preState에 저장

  const navigate = useNavigate();

  const { data: detailData, isFetched: isDetailFetched } = useQuery<IGetDetail>(
    {
      queryKey: ["itemDetail", itemId],
      queryFn: () => getDetail(mediaType, itemId),
    }
  );

  const { data: videosData, isLoading: isVideoLoading } = useQuery<
    IGetVideos[]
  >({
    queryKey: ["video", itemId],
    queryFn: () => getVideos(itemId, mediaType, "ko"),
  });

  const { data: videosPreData, isLoading: isPreVideoLoading } = useQuery<
    IGetVideos[]
  >({
    queryKey: ["videoPre", itemId],
    queryFn: () =>
      getVideos(itemId, mediaType as TMediaType, detailData?.original_language),
    enabled: videosData?.length === 0 && !!detailData,
  });

  const videos = [...(videosData || []), ...(videosPreData || [])];
  const mainTraier = videos.findLast((video) => video.type === "Trailer");

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
    mediaType === "tv" ? "episode" : "video"
  );

  const [watchVideo, setWatchVideo] = useState<IWatchVideo>({
    isOpen: false,
    videoKey: "",
    videoName: "",
  });

  return (
    <>
      <ModalOverview>
        <BgImage
          $bgImg={createImage(
            "w780",
            detailData?.backdrop_path ?? detailData?.poster_path ?? ""
          )}
        ></BgImage>
        <ModalNav>
          <ExitBtn onClick={() => navigate("/")}>
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
            src={createImage("w400", detailData?.poster_path ?? "")}
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
        <ContentNav>
          {preMediaType === "tv" && (
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
            tab="recommend"
            tabName="추천 작품"
            tabMatch={currentTab === "recommend"}
            setCurrentTab={setCurrentTab}
          />
        </ContentNav>
        {currentTab === "episode" && (
          <ModalEpisode
            itemId={itemId}
            seasons={detailData?.seasons}
            backDropPath={detailData?.backdrop_path ?? ""}
          />
        )}
        {currentTab === "video" && (
          <ModalVideos
            videos={videos}
            isLoading={isVideoLoading || isPreVideoLoading}
            setWatchVideo={setWatchVideo}
          />
        )}
        {currentTab === "recommend" && (
          <ModalRecommend itemId={itemId} mediaType={mediaType} />
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
