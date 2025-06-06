import { useRef, useState } from "react";
import {
  BtnTag,
  HeaderContainer,
  HeaderLogo,
  Nav,
  ThemeBtn,
  SearchBtn,
} from "../../styles/headerStyle";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useRecoilState } from "recoil";
import { isDarkState } from "../../atom";
import { SearchIcon } from "./SearchIcon";
import { Search } from "./Search";

interface IProps {
  isHome: boolean;
}

export const Header = ({ isHome }: IProps) => {
  const location = useLocation();
  const logoClick = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0 });
    }
  };

  const headerRef = useRef<HTMLHeadElement>(null);

  const [isLimpid, setIsLimpid] = useState(isHome);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    if (!isHome) return;
    setIsLimpid(current < 50);
  });
  //내부적으로 핸들러가 정리되기 때문에 useEffect 불필요

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const [isDark, setIsDark] = useRecoilState(isDarkState);
  const [isThemeToggle, setIsThemeToggle] = useState(false);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
    setIsThemeToggle(true);
    setTimeout(() => {
      setIsThemeToggle(false);
    }, 0);
  };

  return (
    <HeaderContainer
      ref={headerRef}
      $isLimpid={isLimpid}
      $isThemeToggle={isThemeToggle}
    >
      <HeaderLogo>
        <Link to="/" onClick={logoClick}>
          스스슥
        </Link>
      </HeaderLogo>
      <Nav $isLimpid={isLimpid} $isThemeToggle={isThemeToggle}>
        <AnimatePresence>
          {isSearchOpen && <Search setIsSearchOpen={setIsSearchOpen} />}
        </AnimatePresence>
        {!isSearchOpen && (
          <SearchBtn onClick={() => setIsSearchOpen(true)} $isLimpid={isLimpid}>
            <SearchIcon />
            <BtnTag className="button-tag">검색</BtnTag>
          </SearchBtn>
        )}
        <ThemeBtn onClick={toggleTheme} $isLimpid={isLimpid}>
          {isDark ? (
            <>
              {" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 24 24"
              >
                <path
                  fill="currentcolor"
                  d="M 11 0 L 11 3 L 13 3 L 13 0 L 11 0 z M 4.2226562 2.8085938 L 2.8085938 4.2226562 L 4.9296875 6.34375 L 6.34375 4.9296875 L 4.2226562 2.8085938 z M 19.777344 2.8085938 L 17.65625 4.9296875 L 19.070312 6.34375 L 21.191406 4.2226562 L 19.777344 2.8085938 z M 12 5 C 8.1458514 5 5 8.1458514 5 12 C 5 15.854149 8.1458514 19 12 19 C 15.854149 19 19 15.854149 19 12 C 19 8.1458514 15.854149 5 12 5 z M 12 7 C 14.773268 7 17 9.2267316 17 12 C 17 14.773268 14.773268 17 12 17 C 9.2267316 17 7 14.773268 7 12 C 7 9.2267316 9.2267316 7 12 7 z M 0 11 L 0 13 L 3 13 L 3 11 L 0 11 z M 21 11 L 21 13 L 24 13 L 24 11 L 21 11 z M 4.9296875 17.65625 L 2.8085938 19.777344 L 4.2226562 21.191406 L 6.34375 19.070312 L 4.9296875 17.65625 z M 19.070312 17.65625 L 17.65625 19.070312 L 19.777344 21.191406 L 21.191406 19.777344 L 19.070312 17.65625 z M 11 21 L 11 24 L 13 24 L 13 21 L 11 21 z"
                ></path>
              </svg>
              <BtnTag className="button-tag">밝은 테마</BtnTag>
            </>
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="27"
                height="27"
                viewBox="0 0 384 512"
              >
                <path
                  fill="currentcolor"
                  d="M144.7 98.7c-21 34.1-33.1 74.3-33.1 117.3c0 98 62.8 181.4 150.4 211.7c-12.4 2.8-25.3 4.3-38.6 4.3C126.6 432 48 353.3 48 256c0-68.9 39.4-128.4 96.8-157.3zm62.1-66C91.1 41.2 0 137.9 0 256C0 379.7 100 480 223.5 480c47.8 0 92-15 128.4-40.6c1.9-1.3 3.7-2.7 5.5-4c4.8-3.6 9.4-7.4 13.9-11.4c2.7-2.4 5.3-4.8 7.9-7.3c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-3.7 .6-7.4 1.2-11.1 1.6c-5 .5-10.1 .9-15.3 1c-1.2 0-2.5 0-3.7 0l-.3 0c-96.8-.2-175.2-78.9-175.2-176c0-54.8 24.9-103.7 64.1-136c1-.9 2.1-1.7 3.2-2.6c4-3.2 8.2-6.2 12.5-9c3.1-2 6.3-4 9.6-5.8c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-3.6-.3-7.1-.5-10.7-.6c-2.7-.1-5.5-.1-8.2-.1c-3.3 0-6.5 .1-9.8 .2c-2.3 .1-4.6 .2-6.9 .4z"
                />
              </svg>
              <BtnTag className="button-tag">어두운 테마</BtnTag>
            </>
          )}
        </ThemeBtn>
      </Nav>
    </HeaderContainer>
  );
};
