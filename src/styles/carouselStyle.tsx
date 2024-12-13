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
  padding: 0 4%;
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
  padding: 0 0.2vw;
`;

export const ItemParent = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
`;

export const Item = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f2a65e;
  color: white;
  font-size: 2em;
  font-family: sans-serif;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100px;
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
  width: calc(4% - 0.2vw);
  height: 100%;
  opacity: 0;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.25s ease-in;
  &.show {
    opacity: 1;
  }
  svg {
    width: 2em;
    height: 2em;
    color: #ffffff;
  }
`;
