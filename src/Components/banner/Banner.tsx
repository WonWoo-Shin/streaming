import Slider, { Settings } from "react-slick";
import {
  BannerSlider,
  SliderContainer,
  SliderDots,
} from "../../styles/bannerStyle";
import { SlideArrow } from "./SliderArrow";
import { IGetResult } from "../../type";
import { SliderItem } from "./SliderItem";
import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../../api";

export const Banner = () => {
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
    prevArrow: <SlideArrow position={"left"} />,
    nextArrow: <SlideArrow position={"right"} />,
  };

  const { data: nowPlayingData } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <SliderContainer>
      <BannerSlider>
        <Slider {...settings}>
          {nowPlayingData?.results.slice(0, 5).map((result) => (
            <SliderItem key={result.id} {...result} />
          ))}
        </Slider>
      </BannerSlider>
    </SliderContainer>
  );
};
