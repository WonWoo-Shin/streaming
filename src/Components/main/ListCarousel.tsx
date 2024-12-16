import { useEffect, useState } from "react";
import {
  Button,
  Carousel,
  Container,
  Item,
  ItemContainer,
  ItemParent,
} from "../../styles/carouselStyle";
import { useMediaQuery } from "react-responsive";
import { sliceArray } from "../../utils/sliceArray";
import { IGetResult, IMovie } from "../../type";
import { createBgImage } from "../../utils/createBgImgae";
import { CarouselButton } from "./CarouselButton";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";

// const itemLength = 19;
// const items = Array.from({ length: itemLength }, (_, index) => index + 1);

export const ListCarousel = ({ data }: { data: IMovie[] }) => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [carouselLocation, setCarouselLocation] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);

  // showItem = 넘어가는 스크롤 개수
  const showItem = useRecoilValue(screenState);

  const [cloneItems, setCloneItems] = useState<IMovie[]>([]);

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
        {cloneItems.map((item) => (
          <ItemContainer key={item.id} $itemWidth={itemWidth}>
            <ItemParent>
              <Item $bgImage={createBgImage("w400", item.backdrop_path)} />
            </ItemParent>
          </ItemContainer>
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
