import { useRecoilState } from "recoil";

import { trendingTimeState } from "../../atom";
import { TabBtn, TabContainer } from "../../styles/mainStyle";

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
