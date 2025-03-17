import { MainContainer } from "../../styles/mainStyle";

import { getNowShowing, getTopRated, getTrending } from "../../api";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  screenState,
  topRatedMediaTypeState,
  trendingTimeState,
} from "../../atom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { Category } from "./Category";

export const Main = () => {
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1400px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const setShowItem = useSetRecoilState(screenState);
  useEffect(() => {
    setShowItem(() => {
      return isSmallScreen ? 4 : isMediumScreen ? 5 : 6;
    });
  }, [isMediumScreen, isSmallScreen]);

  const trendingTime = useRecoilValue(trendingTimeState);
  const topRatedMediaType = useRecoilValue(topRatedMediaTypeState);

  return (
    <MainContainer>
      <Category
        categoryName="요즘 대세"
        getFn={() => getTrending("all", trendingTime)}
        tabButton="time"
        time={trendingTime}
      />
      <Category
        categoryName="최근 관심작"
        getFn={getNowShowing}
        mediaType="movie"
      />
      <Category
        categoryName="역대 인기작"
        getFn={() => getTopRated(topRatedMediaType)}
        mediaType={topRatedMediaType}
        tabButton="mediaType"
      />
    </MainContainer>
  );
};
