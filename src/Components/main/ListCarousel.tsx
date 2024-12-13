import { useState } from "react";
import {
  Button,
  Carousel,
  CarouselSection,
  Container,
  Item,
  ItemContainer,
  ItemParent,
} from "../../styles/carouselStyle";
import { useMediaQuery } from "react-responsive";
import { sliceArray } from "../../utils/sliceArray";

const itemLength = 19;
const items = Array.from({ length: itemLength }, (_, index) => index + 1);

// 단위 : em

// itemWidth = 100 / 6 %
//

export const ListCarousel = () => {
  const [isMouseOver, setIsMouseOver] = useState(false);

  const [carouselLocation, setCarouselLocation] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransition, setIsTransition] = useState(false);

  const [isCarouselActive, setIsCarouselActive] = useState(false);

  const isMediumScreen = useMediaQuery({ query: "(max-width: 1416px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1040px)" });
  const showItem = isSmallScreen ? 4 : isMediumScreen ? 5 : 6;

  const [cloneItems, setCloneItems] = useState(
    sliceArray(items, 0, showItem * 2 + 1)
  );

  const itemWidth = 100 / showItem;

  const handleCarousel = (direction: "left" | "right") => {
    if (isTransition) return;

    if (direction === "left" && !isCarouselActive) return;

    setIsTransition(true);

    const moveToScroll = showItem;
    const distanceToScroll = moveToScroll * itemWidth;

    // 남은 거리 계산
    const remainLocatoin =
      direction === "right"
        ? itemLength - carouselLocation - showItem
        : -carouselLocation;

    // 실제 이동 거리 계산
    const distance =
      direction === "right"
        ? Math.min(remainLocatoin, moveToScroll)
        : Math.max(remainLocatoin, -moveToScroll);

    // 스크롤 끝에서 무한 스크롤 적용
    if (remainLocatoin === 0) {
      if (direction === "right") {
        setCarouselLocation(0);
        setTranslate((prev) => prev + distanceToScroll);
      } else {
        setCarouselLocation(itemLength - showItem);
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
    setCloneItems(() => {
      const copyItems = [...items];
      const startIndex = carouselLocation - showItem - 1;
      const endIndex = carouselLocation + showItem * 2 + 1;
      return sliceArray(copyItems, startIndex, endIndex);
    });
    setTranslate(itemWidth * (showItem + 1));
  };

  return (
    <CarouselSection>
      <Container
        onMouseEnter={() => setIsMouseOver(true)}
        onMouseLeave={() => setIsMouseOver(false)}
      >
        <Button
          onClick={() => handleCarousel("left")}
          $position="left"
          className={isMouseOver && isCarouselActive ? "show" : ""}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M16.876 2.363a1.239 1.239 0 0 0-1.752 0l-8.761 8.76a1.239 1.239 0 0 0 0 1.753l8.76 8.761a1.239 1.239 0 1 0 1.753-1.752L8.991 12l7.885-7.885a1.239 1.239 0 0 0 0-1.752Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
        <Carousel
          $translate={translate}
          onTransitionEnd={transitionEnd}
          className={isTransition ? "" : "no-transition"}
        >
          {cloneItems.map((item, index) => (
            <ItemContainer key={index} $itemWidth={itemWidth}>
              <ItemParent>
                <Item>{item}</Item>
              </ItemParent>
            </ItemContainer>
          ))}
        </Carousel>
        <Button
          onClick={() => handleCarousel("right")}
          $position="right"
          className={isMouseOver ? "show" : ""}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.363 21.637a1.239 1.239 0 0 0 1.752 0l8.761-8.76a1.239 1.239 0 0 0 0-1.753l-8.76-8.761a1.239 1.239 0 1 0-1.753 1.752L14.248 12l-7.885 7.885a1.239 1.239 0 0 0 0 1.752Z"
              fill="currentColor"
            ></path>
          </svg>
        </Button>
      </Container>
    </CarouselSection>
  );
};
