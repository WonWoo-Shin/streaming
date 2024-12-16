import { useQuery } from "@tanstack/react-query";
import { Category, MainContainer } from "../../styles/mainStyle";
import { ListCarousel } from "./ListCarousel";
import { IGetResult } from "../../type";
import { getNowPlaying } from "../../api";
import { CarouselLoading } from "./CarouselLoading";
import { useSetRecoilState } from "recoil";
import { screenState } from "../../atom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";

export const Main = () => {
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1400px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const setShowItem = useSetRecoilState(screenState);
  useEffect(() => {
    setShowItem(() => {
      return isSmallScreen ? 4 : isMediumScreen ? 5 : 6;
    });
  }, [isMediumScreen, isSmallScreen]);

  const { data: nowPlayingData } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <MainContainer>
      <Category>
        <div>
          <span>현재 상영중</span>
        </div>
        {nowPlayingData ? (
          <ListCarousel data={nowPlayingData?.results} />
        ) : (
          <CarouselLoading />
        )}
      </Category>
    </MainContainer>
  );
};
