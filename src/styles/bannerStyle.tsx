import styled from "styled-components";
import { TDirection } from "../type";

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 42.5%;
`;

export const BannerSlider = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  // 현재 index를 뒤에 배치하고 transition을 제거하여 이전의 index만 자연스럽게 사라지도록 설정
  .slick-slide {
    pointer-events: none;
  }
  .slick-current {
    z-index: -1 !important;
    transition: none !important;
    pointer-events: unset !important;
  }
`;

export const ItemContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  width: 100%;
  height: 100%;
`;

export const BannerTitleSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10%;
  position: relative;
  padding-left: var(--padding-width);
  background-color: ${(props) => props.theme.background.secondary};
  font-weight: bold;
  color: ${(props) => props.theme.font.primary};
`;

export const BannerTitle = styled.h1`
  padding-right: 1.5rem;
  font-size: 2.4em;
  line-height: 1.2em;
`;

export const BannerButton = styled.div`
  position: absolute;
  bottom: 25%;
`;

export const Button = styled.button`
  width: 7.8em;
  height: 3.13em;
  border: none;
  border-radius: 0.3em;
  background-color: var(--point-green);
  font-size: inherit;
  span {
    font-size: 1.2em;
    font-weight: 600;
  }
`;

export const BannerImage = styled.div<{ $bgImage: string }>`
  height: 100%;
  padding-right: var(--padding-width);
  background-size: cover;
  background-image: linear-gradient(
      rgba(18, 18, 18, 0.5) 0%,
      rgba(18, 18, 18, 0) 20%
    ),
    linear-gradient(rgba(18, 18, 18, 0) 75%, rgba(18, 18, 18, 0.5) 100%),
    linear-gradient(90deg, rgba(18, 18, 18, 0) 90%, rgba(18, 18, 18, 0.2) 100%),
    url(${(props) => props.$bgImage});
`;

export const SliderDots = styled.section`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  height: 20%;
  padding-right: var(--padding-width);
  ul {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    align-items: center;
    li {
      width: 0.8em;
      height: 0.8em;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.3);
      button {
        width: 100%;
        height: 100%;
        &:before {
          content: "";
        }
      }
    }
    .slick-active {
      background-color: #f7f7f7;
    }
  }
`;

export const SlideArrowStyle = styled.div<{ $position: TDirection }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: ${(props) => (props.$position === "left" ? 0 : "none")};
  right: ${(props) => (props.$position === "right" ? 0 : "none")};
  z-index: 1;
  width: var(--padding-width);
  color: var(--arrow-color);
  cursor: pointer;
  &:hover {
    color: #ffffff;
  }
  svg {
    width: 1.5em;
    height: 1.5em;
  }
`;
