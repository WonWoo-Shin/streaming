import { useState } from "react";
import { HeaderContainer, HeaderLogo, Nav } from "../../styles/headerStyle";
import { Link } from "react-router-dom";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useSetRecoilState } from "recoil";
import { isDarkState } from "../../atom";

export const Header = () => {
  const [isLimpid, setIsLimpid] = useState(true);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (current) => {
    setIsLimpid(current < 50);
  });
  //내부적으로 핸들러가 정리되기 때문에 useEffect 불필요

  const setIsDark = useSetRecoilState(isDarkState);

  return (
    <HeaderContainer $isLimpid={isLimpid}>
      <HeaderLogo>
        <Link to="/">스스슥</Link>
      </HeaderLogo>
      <Nav>
        <button onClick={() => setIsDark((prev) => !prev)}>theme</button>
      </Nav>
    </HeaderContainer>
  );
};
