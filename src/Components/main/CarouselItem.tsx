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
import { IGetDetail, IItemList } from "../../type";
import { createImage } from "../../utils/createImgae";

import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { AnimatePresence, Variants } from "framer-motion";
import { Link } from "react-router-dom";

interface IItemImageProps {
  backdrop: IItemList["backdrop_path"];
  poster: IItemList["poster_path"];
}

export const ItemImage = ({ backdrop, poster }: IItemImageProps) => {
  const itemImage = backdrop
    ? createImage("w500", backdrop)
    : createImage("w500", poster);

  return (
    <ItemParent>
      <Item as="img" src={itemImage} />
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
  itemWidth,
  isTransition,
  index,
  isCarouselActive,
  media_type,
}: ICarouselItemProps) => {
  const { data: detailData } = useQuery<IGetDetail>({
    queryKey: ["itemDetail", id],
    queryFn: () => getDetail(id, media_type ?? "movie"),
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
        to={`/${media_type ?? "movie"}/${id}`}
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
              <ItemImage backdrop={backdrop_path} poster={poster_path} />
              <PreviewText>
                <span>{title ?? name}</span>
                <span>
                  {detailData?.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </span>
              </PreviewText>
            </ItemPreview>
          )}
        </AnimatePresence>
      </Link>
    </ItemContainer>
  );
};
