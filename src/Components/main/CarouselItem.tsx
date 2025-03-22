import { useState } from "react";
import {
  Item,
  ItemContainer,
  ItemParent,
  ItemPreview,
  PreviewText,
  Text,
  Title,
} from "../../styles/carouselStyle";
import { IGetGenre, IItemList } from "../../type";
import { createImage } from "../../utils/createImgae";

import { useQuery } from "@tanstack/react-query";
import { getGenre } from "../../api";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { AnimatePresence, Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface IItemImageProps {
  backdrop: IItemList["backdrop_path"];
  poster: IItemList["poster_path"];
  preview?: boolean;
}

export const ItemImage = ({ backdrop, poster, preview }: IItemImageProps) => {
  return (
    <ItemParent>
      <Item
        as="img"
        src={createImage("w500", backdrop ?? poster)}
        className={preview ? "preview" : ""}
      />
    </ItemParent>
  );
};

const previewVariant: Variants = {
  initial: {
    scale: 0.72,
  },
  animate: {
    scale: 1,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
  exit: {
    scale: 0.72,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
};

interface ICarouselItemProps extends IItemList {
  itemWidth: number;
  isTransition: boolean;
  index: number;
  isCarouselActive: boolean;
}

export const CarouselItem = ({
  id,
  backdrop_path,
  poster_path,
  title,
  name,
  genre_ids,
  itemWidth,
  isTransition,
  index,
  isCarouselActive,
  media_type,
}: ICarouselItemProps) => {
  const { data: genreList } = useQuery<IGetGenre>({
    queryKey: ["genre", media_type],
    queryFn: () => getGenre(media_type),
  });

  const showItem = useRecoilValue(screenState);

  const [showPreview, setShowPreview] = useState(false);
  const [delay, setDelay] = useState<number>();

  const itemEnter = () => {
    setDelay(setTimeout(() => setShowPreview(true), 500));
  };

  const itemLeave = () => {
    setShowPreview(false);
    clearTimeout(delay);
  };

  const isLeftEnd = isCarouselActive ? index === showItem + 1 : index === 0;
  const isRightEnd = isCarouselActive
    ? index === showItem * 2
    : index === showItem - 1;

  return (
    <ItemContainer $itemWidth={itemWidth}>
      <Link
        onMouseEnter={itemEnter}
        onMouseLeave={itemLeave}
        to={`/${media_type}/${id}`}
      >
        <ItemImage backdrop={backdrop_path} poster={poster_path} />
        <Title>
          <Text>{title ?? name}</Text>
        </Title>
        <AnimatePresence>
          {showPreview && !isTransition && (
            <ItemPreview
              className={
                isLeftEnd ? "leftEnd" : isRightEnd ? "rightEnd" : "center"
              }
              variants={previewVariant}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <ItemImage
                backdrop={backdrop_path}
                poster={poster_path}
                preview
              />
              <PreviewText>
                <span>{title ?? name}</span>
                {genreList && (
                  <span>
                    {genre_ids.map((genreId) => (
                      <p key={genreId}>
                        {
                          genreList.genres.find((genre) => genre.id === genreId)
                            ?.name
                        }
                      </p>
                    ))}
                  </span>
                )}
              </PreviewText>
            </ItemPreview>
          )}
        </AnimatePresence>
      </Link>
    </ItemContainer>
  );
};
