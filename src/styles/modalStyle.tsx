import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0px;
  z-index: 20;
`;

export const ModalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWindow = styled(motion.div)`
  overflow: auto;
  z-index: 1;
  width: 1080px;
  height: 880px;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const Test = styled.div`
  width: 50%;
  height: 500px;
`;
