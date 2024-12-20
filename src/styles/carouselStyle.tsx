import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
  padding: 0 var(--carousel-padding);
`;

export const Loading = styled.ol`
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
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

export const ItemDesign = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: var(--border-radius);
`;

export const LoadingItem = styled(ItemDesign)`
  background-color: var(--loading-color);
`;

export const Item = styled(ItemDesign)<{ $bgImage: string }>`
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
`;

export const Title = styled.div`
  height: var(--title-height);
  margin-top: var(--title-margin);
`;

export const Text = styled.span`
  font-size: 1em;
`;

export const TextLoading = styled.div`
  width: 4em;
  height: 1em;
  border-radius: var(--border-radius);
  background-color: var(--loading-color);
`;

interface IButtonProps {}

export const Button = styled.div<IButtonProps>`
  position: absolute;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: var(--carousel-padding);
  height: calc(100% - var(--title-height) - var(--title-margin));
  background-color: rgba(0, 0, 0, 0.5);
  &.left {
    left: 0;
    border-top-right-radius: var(--border-radius);
    border-bottom-right-radius: var(--border-radius);
  }
  &.right {
    right: 0;
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }
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
