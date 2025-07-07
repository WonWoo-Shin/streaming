import { useState } from "react";
import {
  PannelContainer,
  PannelImage,
  PannelPreview,
  PannelPreviewText,
  PannelTitle,
} from "../styles/contentsPannelStyle";
import { IGenre, IGetGenre, IItemList } from "../type";
import { createImage } from "../utils/createImgae";
import { useQuery } from "@tanstack/react-query";
import { getGenre } from "../api";

interface IProps extends IItemList {
  index: number;
  isLeftEnd: boolean;
  isRightEnd: boolean;
}

export const ContentPannel = ({
  backdrop_path,
  poster_path,
  title,
  name,
  media_type,
  genre_ids,
  isLeftEnd,
  isRightEnd,
}: IProps) => {
  const [showPreview, setShowPreview] = useState(false);

  const pannelMouseEnter = () => {
    setShowPreview(true);
  };

  const pannelMouseLeave = () => {
    setShowPreview(false);
  };

  const { data: genreList } = useQuery<IGetGenre>({
    queryKey: ["genre", media_type],
    queryFn: () => getGenre(media_type),
  });

  const findGenre = (genreId: IGenre["id"]) => {
    return genreList?.genres.find((genre) => genre.id == genreId)?.name;
  };

  return (
    <PannelContainer
      onMouseEnter={pannelMouseEnter}
      onMouseLeave={pannelMouseLeave}
    >
      <PannelImage src={createImage("w500", backdrop_path ?? poster_path)} />
      <PannelTitle>{title ?? name}</PannelTitle>
      {showPreview && (
        <PannelPreview
          className={
            isLeftEnd ? "left_end" : isRightEnd ? "right_end" : "center"
          }
        >
          <PannelImage
            className="preview"
            src={createImage("w500", backdrop_path ?? poster_path)}
          />
          <PannelPreviewText>
            <span>{title ?? name}</span>
            {genreList && (
              <span>
                {genre_ids.map((genreId) => (
                  <p key={genreId}>{findGenre(genreId)}</p>
                ))}
              </span>
            )}
          </PannelPreviewText>
        </PannelPreview>
      )}
    </PannelContainer>
  );
};
