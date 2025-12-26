import { QueryObserverResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

import {
  MoreButton,
  MoreList,
} from "../../../styles/modal/modalColumnListStyle";
import { ContentsMessage } from "../../../styles/modal/modalStyle";
import {
  IGetDetail,
  IGetVideos,
  IGetVideosResults,
  IItemList,
} from "../../../type";

import { VideoList } from "./VIdeoList";


interface IProps {
  itemId: IItemList["id"];
  videos: IGetVideos[] | undefined;
  preVideos: IGetVideos[] | undefined;
  videosError: boolean;
  isVideoLoading: boolean;
  isPreVideoLoading: boolean;
  originalLanguage: IGetDetail["original_language"] | undefined;
  refetch: () => Promise<QueryObserverResult<IGetVideosResults, Error>>;
}

export const ModalVideos = ({
  itemId,
  videos,
  preVideos,
  videosError,
  isVideoLoading,
  isPreVideoLoading,
  originalLanguage,
  refetch,
}: IProps) => {
  const [showMoreVideos, setShowMoreVideos] = useState(false);
  useEffect(() => {
    setShowMoreVideos(videos?.length === 0);
  }, [videos]);

  const isMoreVideos =
    videos && videos.length !== 0 && originalLanguage !== "ko"; // 더 표시할 비디오가 있다 => videos가 하나 이상 있다 and original Lang이 한국 외

  const isLoading = isVideoLoading || isPreVideoLoading;

  const noVideos = !videos?.length && !preVideos?.length;

  const [hasRefetched, setHasRefetched] = useState(false);

  const clickMoreButton = () => {
    setShowMoreVideos((prev) => !prev);

    if (!hasRefetched) {
      refetch();
      setHasRefetched(true);
    }
  };

  if (videosError) {
    return (
      <ContentsMessage>
        데이터를 불러오지 못했습니다.
        <br /> 잠시 후 다시 시도해주세요.
      </ContentsMessage>
    );
  }

  if (noVideos && !isLoading) {
    return <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>;
  }

  return (
    <>
      <VideoList
        isLoading={isVideoLoading}
        videos={videos ?? []}
        itemId={itemId}
      />
      {showMoreVideos && (
        <VideoList
          isLoading={isPreVideoLoading}
          videos={preVideos ?? []}
          itemId={itemId}
        />
      )}
      {isMoreVideos && (
        <MoreList>
          <MoreButton
            className={showMoreVideos ? "rotate" : ""}
            onClick={clickMoreButton}
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
