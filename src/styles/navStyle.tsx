import styled from "styled-components";
import { motion } from "framer-motion";

export const Nav = styled(motion.nav)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  padding: 20px 60px;
  background-color: black;
  color: white;
  font-size: 14px;
`;

export const Column = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 35px;
`;

export const Logo = styled(motion.svg)`
  width: 95px;
  height: 25px;
  margin-right: 50px;
  fill: ${(props) => props.theme.red};
  path {
    stroke-width: 6px;
    stroke: white;
  }
`;

export const Items = styled.ul`
  display: flex;
  align-items: center;
`;

export const Item = styled.li`
  position: relative;
  margin-right: 20px;
  color: ${(props) => props.theme.white.darker};
  transition: color 0.3s ease-in-out;
  &:hover {
    color: ${(props) => props.theme.white.lighter};
  }
`;

export const Circle = styled(motion.span)`
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.red};
`;

export const SearchIcon = styled(motion.span)`
  position: absolute;
  right: 0;
  z-index: 1;
  color: white;
  svg {
    width: 35px;
    height: 25px;
  }
`;

export const SearchBar = styled(motion.div)`
  width: 275px;
  height: 35px;
  border: 1px solid #d9d9d9;
`;

export const SearchInput = styled(motion.input)`
  float: right;
  width: calc(275px - 35px);
  height: 100%;
  border: none;
  background: inherit;
  color: white;
  font-size: 15px;
  &:focus {
    outline: none;
  }
`;
