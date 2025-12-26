import { useRecoilState } from "recoil";
import { TabBtn, TabContainer } from "../../styles/mainStyle";
import { topRatedMediaTypeState } from "../../atom";

export const MediaTypeTab = () => {
  const [topRatedMediaType, setTopRatedMediaType] = useRecoilState(
    topRatedMediaTypeState
  );

  return (
    <TabContainer>
      <TabBtn
        onClick={() => setTopRatedMediaType("movie")}
        $isActive={topRatedMediaType === "movie"}
      >
        <span>영화</span>
      </TabBtn>
      <TabBtn
        onClick={() => setTopRatedMediaType("tv")}
        $isActive={topRatedMediaType === "tv"}
      >
        <span>시리즈</span>
      </TabBtn>
    </TabContainer>
  );
};
