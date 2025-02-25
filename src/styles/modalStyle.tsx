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
  height: 95%;
  border-radius: 5px;
  background-color: white;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ModalOverview = styled.div`
  background-color: #1e2022;
`;

export const ModalNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 30px;
`;

export const ExitBtn = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

export const MainInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Vote = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
  width: 55px;
  height: 30px;
  border-radius: 3px;
  background-color: #3d4145;
  color: #ffffff;
  font-size: 15px;
  svg {
    margin-right: 3px;
    width: 15px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: #ffffff;
  font-size: 40px;
  font-weight: 600;
`;

export const Genre = styled.p`
  color: #d0d0d0;
  font-size: 16px;
  span {
    &:not(:first-child) {
      &::before {
        content: " · ";
      }
    }
  }
`;

export const Overview = styled.div`
  max-width: 650px;
  color: #d0d0d0;
  font-size: 16px;
  line-height: 22px;
`;

export const Poster = styled.img`
  width: 200px;
  height: 280px;
  border-radius: 5px;
  object-fit: cover;
`;
