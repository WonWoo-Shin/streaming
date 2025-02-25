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

export const ModalOverview = styled.div`
  padding: 30px;
`;

export const ModalNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const ExitBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const Poster = styled.img`
  width: 200px;
  height: 280px;
  object-fit: cover;
`;
