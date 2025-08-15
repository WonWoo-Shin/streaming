import { MoreButton, MoreList } from "../../styles/modal/modalColumnListStyle";
import { ContentsMessage } from "../../styles/modal/modalStyle";
import { IGetVideos, IItemList } from "../../type";

import { VideoListItem } from "./VideoListItem";

interface IProps {
  itemId: IItemList["id"];
  videos: IGetVideos[];
  videosLoadSuccess: boolean | undefined;
  isLoading: boolean;
}

export const ModalVideos = ({
  itemId,
  videos,
  videosLoadSuccess,
  isLoading,
}: IProps) => {
  return (
    <>
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : videosLoadSuccess === false ? (
        <ContentsMessage>
          데이터를 불러오지 못했습니다.
          <br /> 잠시 후 다시 시도해주세요.
        </ContentsMessage>
      ) : videos.length === 0 ? (
        <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
      ) : (
        <div>
          <ul>
            {videos.map((video) => (
              <VideoListItem key={video.id} itemId={itemId} video={video} />
            ))}
          </ul>
          <MoreList>
            <MoreButton>
              더보기{" "}
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
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </MoreButton>
          </MoreList>
        </div>
      )}
    </>
  );
};
