import { motion } from "framer-motion";
import styled from "styled-components";

export const Wrapper = styled.div``;

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

export const SliderContainer = styled.ol<{ $translate: number }>`
  display: flex;
  flex-flow: row nowrap;
  gap: 8px;
  overflow-x: visible;
  position: absolute;
  bottom: -100px;
  width: 100%;
  padding: 0px 50px;
  transition: transform 0.75s;
  transform: translateX(-${(props) => props.$translate}px);
`;

export const Box = styled.li<{ $bgImage?: string }>`
  flex: 0 0 calc((100% - (6 - 1) * 8px) / 6);
  height: 200px;
  background-color: white;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  font-size: 64px;
  color: black;
`;

export const ModalBox = styled(motion.div)`
  position: fixed;
  top: 100px;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: 800px;
  height: 700px;
  background-color: white;
`;
