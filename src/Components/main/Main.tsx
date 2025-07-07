import { MainContainer } from "../../styles/mainStyle";
import { getNowShowing, getTopRated, getTrending } from "../../api";
import { useRecoilValue } from "recoil";
import { topRatedMediaTypeState, trendingTimeState } from "../../atom";
import { Category } from "./Category";
import { useAdjustShowItem } from "../../hooks/useAdjustShowItem";

export const Main = () => {
  useAdjustShowItem();

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
