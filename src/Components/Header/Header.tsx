import { useState } from "react";
import { HeaderContainer, HeaderLogo, Nav } from "../../styles/headerStyle";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isLimpid, setIsLimpid] = useState(true);

  window.addEventListener("scroll", () => {
    const { scrollY } = window;
    setIsLimpid(() => (scrollY <= 50 ? true : false));
  });

  return (
    <HeaderContainer $isLimpid={isLimpid}>
      <HeaderLogo>
        <Link to="/">스스슥</Link>
      </HeaderLogo>
      <Nav></Nav>
    </HeaderContainer>
  );
};
