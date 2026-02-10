import { useRef, useState } from "react";
import { ContentNav, CurrentBar } from "../../styles/modal/modalStyle";

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
  const navItemRef = useRef(null);

  return (
    // <div style={{ marginBottom: "20px" }}>
    //   <ContentNav>
    //     {mediaType === "tv" && (
    //       <NavItem
    //         onClick={() => setCurrentTab("episode")}
    //         $tabMatch={currentTab === "episode"}
    //       >
    //         <span>에피소드</span>
    //       </NavItem>
    //     )}
    //     <NavItem
    //       onClick={() => setCurrentTab("video")}
    //       $tabMatch={currentTab === "video"}
    //     >
    //       <span>동영상</span>
    //     </NavItem>
    //     <NavItem
    //       onClick={() => setCurrentTab("info")}
    //       $tabMatch={currentTab === "info"}
    //     >
    //       <span>작품 정보</span>
    //     </NavItem>
    //     <NavItem
    //       onClick={() => setCurrentTab("recommend")}
    //       $tabMatch={currentTab === "recommend"}
    //     >
    //       <span>추천 작품</span>
    //     </NavItem>
    //   </ContentNav>
    //   <CurrentBar />
    // </div>
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
