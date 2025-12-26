import { useSetRecoilState } from "recoil";

import { watchVideoStateFamily } from "../../../atom";
import {
  ColumnList,
  ColumnListContainer,
  ListDate,
  ListName,
  ListThumbnail,
  PlayIcon,
  VideoInfo,
} from "../../../styles/modal/modalColumnListStyle";
import { IGetVideos, IItemList } from "../../../type";
import { convertDate } from "../../../utils/convertDate";

interface IProps {
  video: IGetVideos;
  itemId: IItemList["id"];
  thumbnailWidth?: string;
}

export const VideoListItem = ({ video, thumbnailWidth, itemId }: IProps) => {
  if (video.site !== "YouTube") return;

  const setWatchVideo = useSetRecoilState(watchVideoStateFamily(itemId));

  return (
    <ColumnListContainer>
      <ColumnList
        onClick={() =>
          setWatchVideo({
            isOpen: true,
            videoKey: video.key,
            videoName: video.name,
          })
        }
      >
        <ListThumbnail $thumbnailWidth={thumbnailWidth}>
          <img
            src={`https://img.youtube.com/vi/${video.key}/mqdefault.jpg`}
            alt={video.name}
          />
          <PlayIcon className="play-icon">
            {" "}
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18.2 10.96a1.2 1.2 0 0 1 0 2.08l-8.4 4.849a1.2 1.2 0 0 1-1.8-1.04V7.15a1.2 1.2 0 0 1 1.8-1.039l8.4 4.85Z"
                fill="currentColor"
              ></path>
            </svg>
          </PlayIcon>
        </ListThumbnail>
        <VideoInfo>
          <ListName>{video.name}</ListName>
          <ListDate>{convertDate(video.published_at)}</ListDate>
        </VideoInfo>
      </ColumnList>
    </ColumnListContainer>
  );
};
