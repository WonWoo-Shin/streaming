import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";
import { IGetResult } from "../type";
import {
  Banner,
  Box,
  ModalBox,
  Overview,
  SliderContainer,
  Title,
  Wrapper,
} from "../styles/homeStyle";
import { AnimatePresence } from "framer-motion";

import { createBgImage } from "../utils/createBgImgae";

import { useHistory, useRouteMatch } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

const gap = 8;

export const Home = () => {
  const { data, isLoading } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  const history = useHistory();
  const movieMatch = useRouteMatch<{ movieId: string }>("/movie/:movieId");

  const [currentIndex, setCurrentIndex] = useState(0);
  const [translate, setTranslate] = useState(0);
  const [isTransition, setIsTransition] = useState(false);
  const boxRef = useRef<HTMLLIElement>(null);
  const boxWidth = boxRef.current?.offsetWidth;

  useEffect(() => {
    if (data && boxWidth) {
      const translate = currentIndex * (boxWidth * 6 + gap * 6);
      const totalChild = data.results.length - 1;
      if (totalChild - currentIndex * 6 > 6) {
        setTranslate(translate);
      } else {
        const remainChild = totalChild % 6;
        console.log(remainChild);
        const remainTranslate = boxWidth * remainChild + gap * remainChild;
        setTranslate((prev) => prev + remainTranslate);
      }
    }
  }, [currentIndex]);

  const handleCarousel = () => {
    if (!isTransition && data) {
      const maxIndex = Math.floor((data.results.length - 1) / 6);
      setCurrentIndex((prev) => (prev === maxIndex ? prev : prev + 1));
      setIsTransition(true);
    }
  };

  return (
    <Wrapper onClick={handleCarousel}>
      <Banner
        $bgImage={createBgImage(
          "original",
          data?.results[0].backdrop_path ?? ""
        )}
      >
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
      <SliderContainer
        $translate={translate}
        onTransitionEnd={() => setIsTransition(false)}
      >
        {data?.results.slice(1).map((result) => (
          <Box
            // layoutId={result.id + ""}
            ref={boxRef}
            onClick={() => history.push(`/movie/${result.id}`)}
            key={result.id}
            $bgImage={createBgImage("w500", result.backdrop_path)}
          />
        ))}
      </SliderContainer>
      {/* <AnimatePresence>
        {movieMatch && <ModalBox layoutId={movieMatch.params.movieId} />}
      </AnimatePresence> */}
    </Wrapper>
  );
};
