import { useRecoilState } from "recoil";

import { topRatedMediaTypeState } from "../../atom";
import { TabBtn, TabContainer } from "../../styles/mainStyle";

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
