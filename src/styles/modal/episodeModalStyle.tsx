import styled from "styled-components";
import { ModalWindow } from "./modalStyle";

export const EpisodeModalWindow = styled(ModalWindow)`
  max-width: 720px;
  height: calc(100vh - 150px);
  padding: 30px;
  border-radius: 8px;
`;

export const ModalHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  color: ${(props) => props.theme.font.primary};
  h1 {
    font-size: 20px;
    font-weight: 600;
  }
  svg {
    cursor: pointer;
  }
`;

export const StillImage = styled.div`
  margin-bottom: 30px;
  padding: 0 50px;
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 4px;
  }
`;

export const SlideArrow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;
  height: auto;
  color: rgba(255, 255, 255, 0.6);
  &.slick-prev {
    left: -50px;
  }
  &.slick-next {
    right: -50px;
  }
  &::before {
    content: "";
  }
  &:hover {
    color: #ffffff;
  }
`;

export const Section = styled.section`
  margin-bottom: 30px;
  &:last-child {
    margin-bottom: 0px;
  }
`;

export const SubHead = styled.span`
  display: block;
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
  color: ${(props) => props.theme.font.secondary};
`;

export const Overview = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: ${(props) => props.theme.font.paragraph};
`;
