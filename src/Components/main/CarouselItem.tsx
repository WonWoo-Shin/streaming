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
}: ICarouselItemProps) => {
  const { data: detailData } = useQuery<IGetDetail>({
    queryKey: ["movieDetail", id],
    queryFn: () => getDetail(id),
  });

  const [showPreview, setShowPreview] = useState(false);
  const [delay, setDelay] = useState<number>();

  const itemEnter = () => {
    setDelay(setTimeout(() => setShowPreview(true), 0));
  };

  const itemLeave = () => {
    setShowPreview(false);
    clearTimeout(delay);
  };

  return (
    <ItemContainer $itemWidth={itemWidth}>
      <ItemArea onMouseEnter={itemEnter} onMouseLeave={itemLeave}>
        <ItemImage image={backdrop_path} />
        <Title>
          <Text>{title}</Text>
        </Title>
        {showPreview && !isTransition && (
          <ItemPreview $itemWidth={itemWidth}>
            <ItemImage image={backdrop_path} />
            <PreviewText>
              <span>{title}</span>
              <span>
                {detailData?.genres.map((genre) => (
                  <p>{genre.name}</p>
                ))}
              </span>
            </PreviewText>
          </ItemPreview>
        )}
      </ItemArea>
    </ItemContainer>
  );
};
