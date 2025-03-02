import styled from "styled-components";

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

export const VideoModalWindow = styled.div`
  z-index: 1;
  width: 1400px;

  background-color: #000000;
  iframe {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
  }
`;

export const VideoModalNav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  color: #ffffff;
  span {
    font-size: 18px;
  }
  div {
    cursor: pointer;
  }
`;
