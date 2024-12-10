import { useQuery } from "@tanstack/react-query";
import {
  BannerSlider,
  SliderContainer,
  SliderDots,
  Wrapper,
} from "../styles/homeStyle";
import { getNowPlaying } from "../api";
import { createBgImage } from "../utils/createBgImgae";
import { IGetResult } from "../type";

import Slider, { Settings } from "react-slick";
import { SliderItem } from "./SliderItem";

export const Home = () => {
  const { data: nowPlayingData } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  const settings: Settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    appendDots: (dots) => (
      <SliderDots>
        <ul>{dots}</ul>
      </SliderDots>
    ),
  };

  return (
    <Wrapper>
      <SliderContainer>
        <BannerSlider>
          <Slider {...settings}>
            {nowPlayingData?.results.slice(0, 5).map((result) => (
              <SliderItem key={result.id} {...result} />
            ))}
          </Slider>
        </BannerSlider>
      </SliderContainer>
    </Wrapper>
  );
};
