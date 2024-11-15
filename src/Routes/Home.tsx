import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";
import { IGetResult } from "../type";
import {
  Banner,
  Box,
  Overview,
  Row,
  Slider,
  Title,
  Wrapper,
} from "../styles/homeStyle";
import { AnimatePresence, wrap } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useWindowDimensions } from "../utils/useWidowDimensions";

// [0,1,2,3,4,5,6]
// [7,8,9,10,11,12]
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].slice(6, 6);

const createBgImage = (size: string, path: string) => {
  return `https://image.tmdb.org/t/p/${size}${path}`;
};

const offset = 6;

export const Home = () => {
  const { data, isLoading } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      setLeaving(true);
      const maxIndex = Math.ceil((data?.results.length - 1) / offset) - 1;
      setIndex((prev) => (prev === maxIndex ? 0 : ++prev));
    }
  };

  const scrollWidth = 15;
  const windowDemension = useWindowDimensions() - scrollWidth;
  const gap = 10;

  return (
    <Wrapper $scrollWidth={scrollWidth}>
      <Banner
        $bgImage={createBgImage(
          "original",
          data?.results[0].backdrop_path ?? ""
        )}
        onClick={increaseIndex}
      >
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
      <Slider>
        <AnimatePresence
          initial={true}
          onExitComplete={() => setLeaving(false)}
        >
          <Row
            $gap={gap}
            initial={{ x: windowDemension + gap }}
            animate={{ x: 0 }}
            exit={{ x: -windowDemension - gap }}
            transition={{ ease: "easeInOut", duration: 2 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .splice(index * offset, offset)
              .map((result) => (
                <Box
                  key={result.id}
                  $bgImage={createBgImage("w500", result.backdrop_path)}
                />
              ))}
          </Row>
        </AnimatePresence>
      </Slider>
    </Wrapper>
  );
};
