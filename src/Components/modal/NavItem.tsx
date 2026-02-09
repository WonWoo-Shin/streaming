import { CurrentBar, NavItemStyle } from "../../styles/modal/modalStyle";
import { TCurrentTab } from "../../type";

interface INavItemProps {
  tab: TCurrentTab;
  tabName: string;
  tabMatch: boolean;
  setCurrentTab: React.Dispatch<React.SetStateAction<TCurrentTab>>;
}

export const NavItem = ({
  tab,
  tabName,
  tabMatch,
  setCurrentTab,
}: INavItemProps) => {
  return (
    <NavItemStyle onClick={() => setCurrentTab(tab)} $tabMatch={tabMatch}>
      <span>{tabName}</span>
    </NavItemStyle>
  );
};
