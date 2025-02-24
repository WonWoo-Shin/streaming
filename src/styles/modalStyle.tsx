import { motion } from "framer-motion";
import styled from "styled-components";

export const ModalContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  position: fixed;
  inset: 0px;
  z-index: 2;
  width: 100vw;
`;

export const ModalBackground = styled.div`
  position: fixed;
  inset: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWindow = styled(motion.div)`
  z-index: 1;
  width: 1080px;
  border-radius: 5px;
  background-color: white;
`;

export const Test = styled.div`
  width: 50%;
  height: 500px;
`;
