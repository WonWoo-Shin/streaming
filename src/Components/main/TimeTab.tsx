import { useRecoilState } from "recoil";
import { TabBtn, TabContainer } from "../../styles/mainStyle";
import { trendingTimeState } from "../../atom";

export const TimeTab = () => {
  const [trendingTime, setTrendingTime] = useRecoilState(trendingTimeState);

  return (
    <TabContainer>
      <TabBtn
        onClick={() => setTrendingTime("day")}
        $isActive={trendingTime === "day"}
      >
        <span>오늘</span>
      </TabBtn>
      <TabBtn
        onClick={() => setTrendingTime("week")}
        $isActive={trendingTime === "week"}
      >
        <span>이번주</span>
      </TabBtn>
    </TabContainer>
  );
};
