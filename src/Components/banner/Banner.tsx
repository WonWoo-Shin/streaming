import { useQuery } from "@tanstack/react-query";
import Slider, { Settings } from "react-slick";

import { getTrending } from "../../api";
import {
  BannerSlider,
  SliderContainer,
  SliderDots,
} from "../../styles/bannerStyle";
import { IItemListResults } from "../../type";

import { SlideArrow } from "./SliderArrow";
import { SliderItem } from "./SliderItem";

export const Banner = () => {
  const settings: Settings = {
    dots: true,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    waitForAnimate: false,
    autoplay: true,
    autoplaySpeed: 7000,
    pauseOnHover: false,
    appendDots: (dots) => (
      <SliderDots>
        <ul>{dots}</ul>
      </SliderDots>
    ),
    prevArrow: <SlideArrow position={"left"} />,
    nextArrow: <SlideArrow position={"right"} />,
  };

  const { data: trendingData } = useQuery<IItemListResults>({
    queryKey: ["요즘 대세", "day"],
    queryFn: () => getTrending("all", "day"),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <SliderContainer>
      <BannerSlider>
        <Slider {...settings}>
          {trendingData?.results.slice(0, 5).map((result) => (
            <SliderItem key={result.id} {...result} />
          ))}
        </Slider>
      </BannerSlider>
    </SliderContainer>
  );
};
