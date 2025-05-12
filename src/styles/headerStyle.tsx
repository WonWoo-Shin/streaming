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
  transition: ${(props) => (props.$isThemeToggle ? "none" : "background 0.4s")};
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

export const Nav = styled.ol<IHeaderProps>`
  display: flex;
  align-items: center;
  font-size: 15px;
  li {
    margin-left: 24px;
    &:first-child {
      margin: 0;
    }
  }
  svg {
    color: ${(props) =>
      props.$isLimpid ? "#ffffff" : props.theme.font.primary};
    transition: ${(props) => (props.$isThemeToggle ? "none" : "color 0.4s")};
  }
`;

export const NavBtn = styled.button<{ $isLimpid: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background: ${(props) =>
      props.$isLimpid
        ? "rgba(255, 255, 255, 0.2)"
        : props.theme.etc.buttonHover};
    .button-tag {
      display: block;
    }
  }
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

export const BtnTag = styled.span`
  display: none;
  position: absolute;
  bottom: -26px;
  padding: 5px 7px;
  border-radius: 4px;
  background-color: ${(props) => props.theme.background.tertiary};
  font-size: 13px;
  line-height: 13px;
  color: ${(props) => props.theme.font.primary};
  white-space: nowrap;
`;

export const InputWrapper = styled.div`
  display: flex;
  width: 280px;
  height: 40px;
  margin-right: 15px;
  padding: 5px 10px;
  border: 1px solid ${(props) => props.theme.font.muted};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background.primary};
`;

export const SearchIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 5px;
  svg {
    color: ${(props) => props.theme.font.primary};
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: ${(props) => props.theme.background.primary};
  color: ${(props) => props.theme.font.primary};
  caret-color: ${(props) => props.theme.font.primary};
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #8e8e8e;
  }
`;
