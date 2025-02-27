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
  width: 100%;
  max-width: 1080px;
  height: calc(100vh - 50px);
  border-radius: 5px;
  background-color: #1e2022;
  &::-webkit-scrollbar {
    display: none;
  }
  @media (max-width: 1080px) {
    height: 100%;
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
  opacity: 0.4;
  background-image: url(${(props) => props.$bgImg});
  background-size: cover;
  &::after {
    content: "";
    position: absolute;
    inset: 0px;
    background: linear-gradient(to top, #1e2022 0px, #1e202200 200px),
      linear-gradient(to right, #1e2022 0px, #1e202200 300px);
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

export const BadgeArea = styled.div`
  display: flex;
`;

export const Badge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #d0d0d0;
  font-size: 15px;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    margin-bottom: 10px;
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
  max-width: 650px;
  padding: 30px 50px;
  padding-top: 0px;
  color: #d0d0d0;
  font-size: 16px;
  line-height: 22px;
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
  color: ${(props) => (props.$tabMatch ? "var(--point-green)" : "#8a8a8a;")};
  cursor: pointer;
`;

export const CurrentBar = styled(motion.div)`
  width: 100%;
  height: 3px;
  margin-top: 12px;
  background-color: var(--point-green);
`;

export const VideoContainer = styled.li`
  width: 100%;
  padding: 20px 0;
  &:not(:last-child) {
    border-bottom: 2px solid #26282a;
  }
`;

export const Video = styled.div`
  display: flex;
  cursor: pointer;
`;

export const VideoThumbnail = styled.div`
  position: relative;
  margin-right: 30px;
  img {
    display: block;
    width: 280px;
    aspect-ratio: 16 / 9;
    border-radius: 5px;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  padding: 10px 0;
`;

export const VideoName = styled.span`
  font-size: 19px;
  color: #d0d0d0;
`;

export const VideoDate = styled.span`
  font-size: 16px;
  color: #8a8a8a;
`;
