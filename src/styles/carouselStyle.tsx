import styled from "styled-components";

export const Container = styled.div`
  display: flex;
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

export const ItemArea = styled.div`
  position: relative;
  cursor: pointer;
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

interface IPreviewProps {}

export const ItemPreview = styled.div<IPreviewProps>`
  position: absolute;
  top: calc(((100% - var(--preview-scale)) / 2));
  z-index: 1;
  width: var(--preview-scale);
  height: var(--preview-scale);
  background-color: #141517;
  border-radius: var(--border-radius);
  box-shadow: rgba(0, 0, 0, 0.75) 0px 3px 15px;
  &.leftEnd {
    left: 0;
  }
  &.rightEnd {
    right: 0;
  }
  &.center {
    left: calc(((100% - var(--preview-scale)) / 2));
  }
`;

export const PreviewText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 1em;
  line-height: 1.5;
  span {
    display: block;
    font-size: 1.1em;
    font-weight: 600;
    p {
      font-weight: 500;
      display: inline-block;
      font-size: 0.8em;
      color: #8a8a8a;
      white-space: pre;
      &:not(:first-child) {
        &::before {
          content: " · ";
        }
      }
    }
  }
`;

export const TextLoading = styled.div`
  width: 4em;
  height: 1em;
  border-radius: var(--border-radius);
  background-color: var(--loading-color);
`;

export const ButtonContainer = styled.div`
  position: absolute;
  width: var(--carousel-padding);
  height: 100%;
  z-index: 1;
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
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100% - var(--title-height) - var(--title-margin));
  background-color: rgba(0, 0, 0, 0.5);
  cursor: pointer;
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
