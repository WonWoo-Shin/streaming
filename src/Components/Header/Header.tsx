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
      <HeaderLogo>스스슥</HeaderLogo>
      <Nav>
        <li>태그검색</li>
        <li>요일별 신작</li>
        <li>테마추천</li>
      </Nav>
    </HeaderContainer>
  );
};
