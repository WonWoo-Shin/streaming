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
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

const rowVariants = {
  invisible: {
    x: window.innerWidth - 5,
  },
  visible: {
    x: 0,
  },
  exit: {
    x: -window.innerWidth + 5,
  },
};

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
    if (leaving) return;
    setLeaving(true);
    setIndex((prev) => ++prev);
  };

  return (
    <Wrapper>
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
          initial={false}
          onExitComplete={() => setLeaving(false)}
        >
          <Row
            variants={rowVariants}
            initial="invisible"
            animate="visible"
            exit="exit"
            transition={{ ease: "linear", duration: 1 }}
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
