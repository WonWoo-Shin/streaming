import { useEffect, useState } from "react";
import { Carousel, Container } from "../../styles/carouselStyle";

import { sliceArray } from "../../utils/sliceArray";
import { IItem } from "../../type";

import { CarouselButton } from "./CarouselButton";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { CarouselItem } from "./CarouselItem";

export const ListCarousel = ({ data }: { data: IItem[] }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [carouselLocation, setCarouselLocation] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  // showItem = 넘어가는 스크롤 개수 / 화면에 표시하는 개수
  const showItem = useRecoilValue(screenState);

  const [cloneItems, setCloneItems] = useState<IItem[]>([]);

  const itemWidth = 100 / showItem;

  const adjustItem = () => {
    setCloneItems(() => {
      const newArr = [...data];
      const startIndex = carouselLocation - showItem - 1;
      const endIndex = carouselLocation + showItem * 2 + 1;
      return sliceArray(newArr, startIndex, endIndex);
    });
    setTranslate((showItem + 1) * itemWidth);
  };

  const handleCarousel = (direction: "left" | "right") => {
    if (isTransition) return;

    if (direction === "left" && !isCarouselActive) return;

    setIsTransition(true);

    // 한번에 이동하는 translate 값
    const distanceToScroll = showItem * itemWidth;

    // 남은 거리 계산
    const remainLocatoin =
      direction === "right"
        ? data.length - carouselLocation - showItem
        : -carouselLocation;

    // 실제 이동 거리 계산
    const distance =
      direction === "right"
        ? Math.min(remainLocatoin, showItem)
        : Math.max(remainLocatoin, -showItem);

    // 스크롤 끝에서 무한 스크롤 적용
    if (remainLocatoin === 0) {
      if (direction === "right") {
        setCarouselLocation(0);
        setTranslate((prev) => prev + distanceToScroll);
      } else {
        setCarouselLocation(data.length - showItem);
        setTranslate((prev) => prev - distanceToScroll);
      }
      return;
    }

    setCarouselLocation((prev) => prev + distance);
    setTranslate((prev) => prev + distance * itemWidth);
  };

  const transitionEnd = () => {
    setIsCarouselActive(true);
    setIsTransition(false);
    adjustItem();
  };

  useEffect(() => {
    if (isCarouselActive) {
      adjustItem();
    } else {
      setCloneItems(sliceArray(data, 0, 13));
      setTranslate(0);
    }
  }, [showItem]);

  return (
    <Container
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {isCarouselActive && (
        <CarouselButton
          handleCarousel={handleCarousel}
          direction={"left"}
          isMouseOver={isMouseOver}
        />
      )}
      <Carousel
        $translate={translate}
        onTransitionEnd={transitionEnd}
        className={isTransition ? "" : "no-transition"}
      >
        {cloneItems.map((item, index) => (
          <CarouselItem
            key={item.id}
            index={index}
            {...item}
            itemWidth={itemWidth}
            isTransition={isTransition}
            isCarouselActive={isCarouselActive}
          />
        ))}
      </Carousel>
      <CarouselButton
        handleCarousel={handleCarousel}
        direction={"right"}
        isMouseOver={isMouseOver}
      />
    </Container>
  );
};
