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
  position: relative;
  overflow: auto;
  z-index: 1;
  width: 100%;
  max-width: 1080px;
  height: calc(100vh - 50px);
  border-radius: 5px;
  background-color: ${(props) => props.theme.background.secondary};
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1080px) {
    height: 100%;
  }
`;

export const ModalScrollUp = styled.div`
  position: sticky;
  bottom: 0;
`;

export const ScrollUpBtn = styled(motion.button)`
  position: absolute;
  bottom: 25px;
  right: 25px;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  box-shadow: ${(props) => props.theme.etc.boxShadow} 0px 3px 8px;
  background-color: ${(props) => props.theme.background.secondary};
  cursor: pointer;
  svg {
    color: ${(props) => props.theme.font.paragraph};
  }
`;

export const ModalOverview = styled.div`
  position: relative;
`;

export const BgImage = styled.div<{ $bgImg: string }>`
  position: absolute;
  top: 0;
  right: 0;
  z-index: -1;
  width: 800px;
  height: 480px;
  background-image: url(${(props) => props.$bgImg});
  background-size: cover;
  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(
        to top,
        ${(props) => props.theme.background.secondary} 0px,
        ${(props) => props.theme.background.secondary}00 200px
      ),
      linear-gradient(
        to right,
        ${(props) => props.theme.background.secondary} 0px,
        ${(props) => props.theme.background.secondary}00 300px
      );
    background-color: ${(props) => props.theme.etc.imageBgColor};
  }
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
  background-color: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  cursor: pointer;
`;

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 50px;
`;

export const TitleArea = styled.div`
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
  background-color: ${(props) => props.theme.background.tertiary};
  color: ${(props) => props.theme.font.primary};
  font-size: 15px;
  svg {
    margin-right: 3px;
    width: 15px;
  }
`;

export const Title = styled.h1`
  margin-bottom: 20px;
  color: ${(props) => props.theme.font.primary};
  font-size: 40px;
  font-weight: 600;
`;

export const Genre = styled.p`
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.font.paragraph};
  span {
    &:not(:first-child) {
      &::before {
        content: " · ";
      }
    }
  }
`;

export const ReleaseDate = styled.div`
  font-size: 16px;
  color: ${(props) => props.theme.font.muted};
`;

export const BadgeArea = styled.div`
  display: flex;
`;

export const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 15px;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 10px;
    color: ${(props) => props.theme.font.secondary};
  }
  span {
    color: ${(props) => props.theme.font.paragraph};
  }
  &:not(:first-child) {
    margin-left: 30px;
  }
`;

export const Poster = styled.img`
  width: 200px;
  height: 280px;
  border-radius: 5px;
  object-fit: cover;
`;

export const Overview = styled.div`
  position: relative;
  max-width: 650px;
  padding-left: 50px;
  padding-top: 0px;
  color: ${(props) => props.theme.font.paragraph};
  font-size: 16px;
  line-height: 1.38em;
  &.overflow {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;

export const More = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  padding-left: 20px;
  background: linear-gradient(
    270deg,
    ${(props) => props.theme.background.secondary} 65%,
    rgba(0, 0, 0, 0) 100%
  );
  font-size: 15px;
  font-weight: bold;
  cursor: pointer;
`;

export const ModalContent = styled.div`
  padding: 40px 50px;
`;

export const ContentNav = styled.ul`
  display: flex;
  gap: 35px;
  margin-bottom: 20px;
`;

export const NavItemStyle = styled.li<{ $tabMatch: boolean }>`
  font-size: 20px;
  font-weight: 600;
  color: ${(props) =>
    props.$tabMatch ? "var(--point-green)" : props.theme.font.muted};
  cursor: pointer;
`;

export const CurrentBar = styled(motion.div)`
  width: 100%;
  height: 3px;
  margin-top: 12px;
  background-color: var(--point-green);
`;

export const ContentsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 180px;
  font-size: 17px;
  color: ${(props) => props.theme.font.muted};
`;
