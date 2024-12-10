import styled from "styled-components";

export const Wrapper = styled.div`
  height: 200vh;
  font-size: 1vw;
`;

export const SliderContainer = styled.div`
  position: relative;
  width: 100%;
  padding-bottom: 40%;
`;

export const BannerSlider = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  .slick-slider,
  .slick-list,
  .slick-track,
  .slick-slide {
    height: 100%;
    div {
      height: inherit;
    }
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
  align-items: center;
  position: relative;
  height: 100%;
  padding-left: 5%;
  color: #ffffff;
  background-color: #141517;
`;

export const BannerTitle = styled.h1`
  font-size: 2vw;
`;

export const BannerImage = styled.div<{ $bgImage: string }>`
  height: 100%;
  background-size: cover;
  background-image: linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.$bgImage});
`;

export const SliderDots = styled.section`
  display: flex;
  justify-content: flex-end;
  bottom: 0;
  height: 20%;
  padding-right: 5%;
  ul {
    display: flex;
    justify-content: space-between;
    gap: 1em;
    align-items: center;
    li {
      width: 1em;
      height: 1em;
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
