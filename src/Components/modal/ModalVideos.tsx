import { useQueryClient } from "@tanstack/react-query";
import { MoreButton, MoreList } from "../../styles/modal/modalColumnListStyle";
import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IGetVideosResults, IItemList } from "../../type";
import { VideoListItem } from "./VideoListItem";
import { useEffect, useState } from "react";

interface IProps {
  itemId: IItemList["id"];
  videos: IGetVideos[] | undefined;
  preVideos: IGetVideos[] | undefined;
  videosLoadSuccess: boolean | undefined;
  isVideoLoading: boolean;
  isPreVideoLoading: boolean;
}

export const ModalVideos = ({
  itemId,
  videos,
  preVideos,
  videosLoadSuccess,
  isVideoLoading,
  isPreVideoLoading,
}: IProps) => {
  const [showMoreVideos, setShowMoreVideos] = useState(!videos?.length);

  const queryClient = useQueryClient();
  useEffect(() => {
    if (showMoreVideos) {
      queryClient.fetchQuery({
        queryKey: ["videoPre", itemId],
      });
    }
  }, [showMoreVideos]);

  const [isMoreVideos, setIsMoreVideos] = useState(videos && !!videos.length);
  useEffect(() => {
    setIsMoreVideos(videos && !!videos.length);
  });

  const noVideos = !videos?.length && !preVideos?.length;

  return (
    <>
      {videosLoadSuccess === false ? (
        <ContentsMessage>
          데이터를 불러오지 못했습니다.
          <br /> 잠시 후 다시 시도해주세요.
        </ContentsMessage>
      ) : (
        noVideos && <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
      )}
      {isVideoLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : (
        <ul>
          {videos?.map((video) => (
            <VideoListItem key={video.id} itemId={itemId} video={video} />
          ))}
        </ul>
      )}
      {showMoreVideos && (
        <>
          {isPreVideoLoading ? (
            <ContentsMessage>로드 중..</ContentsMessage>
          ) : (
            <ul>
              {preVideos?.map((video) => (
                <VideoListItem key={video.id} itemId={itemId} video={video} />
              ))}
            </ul>
          )}
        </>
      )}
      {isMoreVideos && (
        <MoreList>
          <MoreButton
            className={showMoreVideos ? "rotate" : ""}
            onClick={() => setShowMoreVideos((prev) => !prev)}
          >
            {showMoreVideos ? "접기" : "더보기"}
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 6.5L8 9.5L11 6.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </MoreButton>
        </MoreList>
      )}
    </>
  );
};
