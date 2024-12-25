import { useState } from "react";
import {
  Item,
  ItemArea,
  ItemContainer,
  ItemParent,
  ItemPreview,
  PreviewText,
  Text,
  Title,
} from "../../styles/carouselStyle";
import { ICarouselItemProps, IGetDetail, IMovie } from "../../type";
import { createBgImage } from "../../utils/createBgImgae";

import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { animate, AnimatePresence, Variants } from "framer-motion";

export const ItemImage = ({ image }: { image: IMovie["backdrop_path"] }) => {
  return (
    <ItemParent>
      <Item $bgImage={createBgImage("w500", image)} />
    </ItemParent>
  );
};

const previewVariant: Variants = {
  initial: {
    scale: 0.67,
  },
  animate: {
    scale: 1,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
  exit: {
    scale: 0.67,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
};

export const CarouselItem = ({
  id,
  backdrop_path,
  title,
  itemWidth,
  isTransition,
  index,
  isCarouselActive,
}: ICarouselItemProps) => {
  const { data: detailData } = useQuery<IGetDetail>({
    queryKey: ["movieDetail", id],
    queryFn: () => getDetail(id),
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
      <ItemArea onMouseEnter={itemEnter} onMouseLeave={itemLeave}>
        <ItemImage image={backdrop_path} />
        <Title>
          <Text>{title}</Text>
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
              <ItemImage image={backdrop_path} />
              <PreviewText>
                <span>{title}</span>
                <span>
                  {detailData?.genres.map((genre) => (
                    <p key={genre.id}>{genre.name}</p>
                  ))}
                </span>
              </PreviewText>
            </ItemPreview>
          )}
        </AnimatePresence>
      </ItemArea>
    </ItemContainer>
  );
};
