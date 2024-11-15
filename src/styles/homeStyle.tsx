import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div<{ $scrollWidth: number }>`
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: ${(props) => props.$scrollWidth}px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(0, 0, 0, 0.3);
    border-radius: 20px;
    background-clip: padding-box;
    border: 3px solid rgba(0, 0, 0, 0);
  }
  &::-webkit-scrollbar-track {
    padding: 5px;
    background-color: #ffffff;
  }
`;

export const Banner = styled.div<{ $bgImage: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  height: 100vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 1)),
    url(${(props) => props.$bgImage});
  background-size: cover;
`;

export const Title = styled.h2`
  margin-bottom: 20px;
  font-size: 68px;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 25px;
  line-height: 140%;
`;

export const Slider = styled.div`
  position: relative;
  width: 100%;
`;

export const Row = styled(motion.ul)<{ $gap: number }>`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: ${(props) => props.$gap}px;
  position: absolute;
  top: -100px;
  width: 100%;
`;

export const Box = styled.li<{ $bgImage?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background-color: white;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  font-size: 64px;
  color: black;
`;
