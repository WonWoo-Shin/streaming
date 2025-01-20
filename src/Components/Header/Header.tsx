import { useState } from "react";
import { HeaderContainer, HeaderLogo, Nav } from "../../styles/headerStyle";

export const Header = () => {
  const [isLimpid, setIsLimpid] = useState(true);

  window.addEventListener("scroll", () => {
    const { scrollY } = window;
    setIsLimpid(() => (scrollY <= 50 ? true : false));
  });

  return (
    <HeaderContainer $isLimpid={isLimpid}>
      <HeaderLogo>
        <a>스스슥</a>
      </HeaderLogo>
      <Nav>
        <li>
          <a> 영화</a>
        </li>
        <li>
          <a>시리즈</a>
        </li>
      </Nav>
    </HeaderContainer>
  );
};
