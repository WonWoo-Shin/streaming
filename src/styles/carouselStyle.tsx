import styled from "styled-components";

export const CarouselSection = styled.div`
  width: 100%;
`;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 var(--carousel-padding);
`;

interface ICarouselProps {
  $translate: number;
}

export const Carousel = styled.ol<ICarouselProps>`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  transition: transform 0.75s;
  transform: translate3d(-${(props) => props.$translate}%, 0, 0);
  &.no-transition {
    transition: none;
  }
`;

export const ItemContainer = styled.li<{ $itemWidth: number }>`
  flex: 0 0 ${(props) => props.$itemWidth}%;
  padding: 0 var(--carousel-gap);
`;

export const ItemParent = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
`;

export const Item = styled.div<{ $bgImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
`;

interface IButtonProps {
  $position: "left" | "right";
}

export const Button = styled.div<IButtonProps>`
  position: absolute;
  left: ${(props) => (props.$position === "left" ? 0 : "none")};
  right: ${(props) => (props.$position === "right" ? 0 : "none")};
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: calc(var(--carousel-padding) - var(--carousel-gap));
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease-in;
  svg {
    width: 1.7em;
    height: 1.7em;
    color: var(--arrow-color);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.7);
    svg {
      color: #fff;
    }
  }
`;
