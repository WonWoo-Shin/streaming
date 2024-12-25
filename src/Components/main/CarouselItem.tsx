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

export const ItemImage = ({ image }: { image: IMovie["backdrop_path"] }) => {
  return (
    <ItemParent>
      <Item $bgImage={createBgImage("w500", image)} />
    </ItemParent>
  );
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
    setDelay(setTimeout(() => setShowPreview(true), 0));
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
        {showPreview && !isTransition && (
          <ItemPreview
            className={
              isLeftEnd ? "leftEnd" : isRightEnd ? "rightEnd" : "center"
            }
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
      </ItemArea>
    </ItemContainer>
  );
};
