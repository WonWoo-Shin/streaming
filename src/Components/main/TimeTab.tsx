import { useRecoilState } from "recoil";
import { TimeTabBtn, TimeTabContainer } from "../../styles/mainStyle";
import { trendingTimeState } from "../../atom";

export const TimeTab = () => {
  const [trendingTime, setTrendingTime] = useRecoilState(trendingTimeState);

  return (
    <TimeTabContainer>
      <TimeTabBtn
        onClick={() => setTrendingTime("day")}
        $isActive={trendingTime === "day"}
      >
        <span>오늘</span>
      </TimeTabBtn>
      <TimeTabBtn
        onClick={() => setTrendingTime("week")}
        $isActive={trendingTime === "week"}
      >
        <span>이번주</span>
      </TimeTabBtn>
    </TimeTabContainer>
  );
};
