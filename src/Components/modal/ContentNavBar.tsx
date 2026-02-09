import { useState } from "react";
import { ContentNav, CurrentBar } from "../../styles/modal/modalStyle";
import { NavItem } from "./NavItem";
import { TCurrentTab } from "../../type";

export const ContentNavBar = () => {
  const [currentTab, setCurrentTab] = useState<TCurrentTab>("video");

  return (
    <div>
      <ContentNav>
        <NavItem
          tab="video"
          tabName="동영상"
          tabMatch={currentTab === "video"}
          setCurrentTab={setCurrentTab}
        />
      </ContentNav>
      <CurrentBar />
    </div>
  );
};
