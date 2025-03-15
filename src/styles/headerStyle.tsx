import styled from "styled-components";

interface IHeaderProps {
  $isLimpid: boolean;
  $isThemeToggle: boolean;
}

export const HeaderContainer = styled.header<IHeaderProps>`
  display: flex;
  justify-content: space-between;
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 65px;
  padding: 0 50px;
  background-color: ${(props) =>
    props.$isLimpid ? "rgba(0, 0, 0, 0)" : props.theme.background.primary};
  color: ${(props) => props.theme.font.primary};
  transition: ${(props) =>
    props.$isThemeToggle ? "none" : "background-color 0.4s"};
  &.no-transition {
    transition: none;
  }
  body.modal-open & {
    padding-right: calc(50px + var(--scroll-width));
  }
`;

export const HeaderLogo = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 72px;
  height: 100%;
  font-size: 20px;
  font-family: "Gasoek One", sans-serif;
  font-style: oblique;
`;

export const Nav = styled.ol`
  display: flex;
  align-items: center;
  margin-left: 40px;
  font-size: 15px;
  li {
    margin-left: 24px;
    &:first-child {
      margin: 0;
    }
  }
`;

export const ThemeBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background: none;
  color: #ffffff;
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;
