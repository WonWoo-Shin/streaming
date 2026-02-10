import { ContentNav } from "../../styles/modal/modalStyle";

import { TCurrentTab, TMediaType } from "../../type";
import { NavItem } from "./NavItem";

interface IProps {
  mediaType: TMediaType;
  currentTab: TCurrentTab;
  setCurrentTab: React.Dispatch<React.SetStateAction<TCurrentTab>>;
}

export const ContentNavBar = ({
  mediaType,
  currentTab,
  setCurrentTab,
}: IProps) => {
  return (
    <ContentNav>
      {mediaType === "tv" && (
        <NavItem
          tab="episode"
          tabName="에피소드"
          tabMatch={currentTab === "episode"}
          setCurrentTab={setCurrentTab}
        />
      )}
      <NavItem
        tab="video"
        tabName="동영상"
        tabMatch={currentTab === "video"}
        setCurrentTab={setCurrentTab}
      />
      <NavItem
        tab="info"
        tabName="작품 정보"
        tabMatch={currentTab === "info"}
        setCurrentTab={setCurrentTab}
      />
      <NavItem
        tab="recommend"
        tabName="추천 작품"
        tabMatch={currentTab === "recommend"}
        setCurrentTab={setCurrentTab}
      />
    </ContentNav>
  );
};
