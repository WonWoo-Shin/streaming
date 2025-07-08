import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselItemContainer,
  Container,
} from "../../styles/carouselStyle";

import { sliceArray } from "../../utils/sliceArray";
import { IItemList } from "../../type";

import { CarouselButton } from "./CarouselButton";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { ContentPannel } from "../ContentPannel";

export const ListCarousel = ({ data }: { data: IItemList[] }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [carouselLocation, setCarouselLocation] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  // showItem = 넘어가는 스크롤 개수 / 화면에 표시하는 개수
  const showItem = useRecoilValue(screenState);
  const itemCount = data.length;

  const [cloneItems, setCloneItems] = useState<IItemList[]>([]);

  //아이템 개수가 화면에 표시하는 개수보다 많은 경우
  const isScreenOver = itemCount > showItem;

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

    // 남은 거리 계산
    // 전체 개수 - 현재 위치 - 화면에 보이는 개수(제외)
    const remainLocatoin =
      direction === "right"
        ? data.length - carouselLocation - showItem
        : -carouselLocation;

    // 실제 이동 거리 계산
    const distance =
      direction === "right"
        ? Math.min(remainLocatoin, showItem)
        : Math.max(remainLocatoin, -showItem);

    // 스크롤 끝이면 무한 스크롤 적용
    if (remainLocatoin === 0) {
      if (direction === "right") {
        setCarouselLocation(0);
        setTranslate((prev) => prev + 100);
      } else {
        setCarouselLocation(data.length - showItem);
        setTranslate((prev) => prev - 100);
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

  const resetCarousel = () => {
    const renderCount = showItem * 2 + 1;
    const sliceEndIndex =
      itemCount > renderCount
        ? renderCount
        : itemCount > showItem
        ? itemCount + 1
        : itemCount;
    setCloneItems(sliceArray(data, 0, sliceEndIndex));
    setTranslate(0);
    setCarouselLocation(0);
    setIsCarouselActive(false);
    setIsTransition(false);
  };

  //showItem값이 변경된 경우 처리 내용
  useEffect(() => {
    if (!isScreenOver) {
      resetCarousel();
      return;
    }
    if (isCarouselActive) {
      adjustItem();
    } else {
      resetCarousel();
    }
  }, [showItem]);

  //data가 변경된 경우 캐러셀 초기화
  useEffect(() => {
    resetCarousel();
  }, [data]);

  return (
    <Container
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
    >
      {isCarouselActive && isScreenOver && (
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
        {cloneItems.map((item, index) => {
          const isLeftEnd = isCarouselActive
            ? index === showItem + 1
            : index === 0;
          const isRightEnd = isCarouselActive
            ? index === showItem * 2
            : index === showItem - 1;

          return (
            <CarouselItemContainer key={item.id} $itemWidth={itemWidth}>
              <ContentPannel
                {...item}
                index={index}
                isLeftEnd={isLeftEnd}
                isRightEnd={isRightEnd}
                isTransition={isTransition}
              />
            </CarouselItemContainer>
          );
        })}
      </Carousel>
      {isScreenOver && (
        <CarouselButton
          handleCarousel={handleCarousel}
          direction={"right"}
          isMouseOver={isMouseOver}
        />
      )}
    </Container>
  );
};
