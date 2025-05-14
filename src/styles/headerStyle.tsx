import { motion } from "framer-motion";
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
  transition: ${(props) => (props.$isThemeToggle ? "none" : "all 0.4s")};
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
  position: relative;
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

export const ThemeBtn = styled.button<{ $isLimpid: boolean }>`
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
`;

export const SearchBtn = styled(ThemeBtn)`
  position: absolute;
  right: 55px;
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

export const SearchBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  z-index: 1;
  width: 280px;
  height: 40px;
  margin-right: 15px;
`;

export const SearchIconWrapper = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 10px;
  z-index: 1;
  svg {
    color: ${(props) => props.theme.font.primary};
  }
`;

export const InputWrapper = styled(motion.form)`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  height: 100%;
  padding: 5px 10px 5px 40px;
  border: 1px solid ${(props) => props.theme.font.muted};
  border-radius: 4px;
  background-color: ${(props) => props.theme.background.primary};
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  background-color: inherit;
  color: ${(props) => props.theme.font.primary};
  caret-color: ${(props) => props.theme.font.primary};
  font-size: 15px;
  font-weight: 600;
  font-family: inherit;
  transform: none;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: #8e8e8e;
  }
`;
