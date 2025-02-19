import { motion } from "framer-motion";
import styled from "styled-components";

export const RootModal = styled.div`
  display: flex;
`;

export const ModalContainer = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  inset: 0px;
  z-index: 2;
  width: 100%;
  height: 100%;
`;

export const ModalBackground = styled.div`
  z-index: -1;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const ModalWindow = styled(motion.div)`
  z-index: 1;
  width: 1080px;
  height: 95%;
  border-radius: 5px;
  background-color: white;
`;
