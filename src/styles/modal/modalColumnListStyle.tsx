import styled from "styled-components";

export const Season = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const EpisodeCount = styled.span`
  padding: 10px 0;
  font-size: 17px;
  color: ${(props) => props.theme.font.secondary};
`;

const selectValue = {
  padding: "10px 20px",
};

export const SeasonSelect = styled.div<{ $isSelectOpen: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  max-width: 250px;
  padding: ${selectValue.padding};
  border-radius: 3px;
  background-color: ${(props) => props.theme.background.tertiary};
  font-size: 17px;
  line-height: 1.5;
  color: ${(props) => props.theme.font.secondary};
  cursor: pointer;
  span {
    margin-right: 15px;
    word-break: keep-all;
  }
  &::after {
    content: "▼";
    font-size: 8px;
    transform: ${(props) => (props.$isSelectOpen ? "rotate(180deg)" : "")};
    transition: all linear 0.2s;
  }
`;

export const SelectList = styled.ul`
  overflow-y: auto;
  position: absolute;
  top: 100%;
  right: 0;
  max-height: 300px;
  margin-top: 2px;
  white-space: nowrap;
  border-radius: 3px;
  background-color: ${(props) => props.theme.background.tertiary};
  &::-webkit-scrollbar-track {
    padding: 5px;
    background-color: inherit;
  }
`;

export const SelectItem = styled.li`
  display: flex;
  align-items: center;
  padding: ${selectValue.padding};
  padding-right: 50px;
  &:hover {
    background-color: ${(props) => props.theme.font.primary}10;
  }
`;

export const ColumnListContainer = styled.li`
  width: 100%;
  padding: 20px 0;
  &:not(:last-child) {
    border-bottom: 2px solid ${(props) => props.theme.etc.divider};
  }
`;

export const ColumnList = styled.div`
  display: flex;
  cursor: pointer;
  &:hover .play-icon {
    opacity: 1;
  }
  &:hover .thumbnail::before {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const ListThumbnail = styled.div<{ $thumbnailWidth?: string }>`
  position: relative;
  margin-right: 30px;
  img {
    display: block;
    width: ${(props) => props.$thumbnailWidth ?? "280px"};
    aspect-ratio: 16 / 9;
    border-radius: 5px;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
    transition: background-color 0.2s;
  }
`;

export const PlayIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  inset: 0;
  border-radius: 5px;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: 0;
  transition: opacity ease 0.2s;
  svg {
    color: #ffffff;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const VideoInfo = styled(FlexColumn)`
  justify-content: center;
  gap: 25%;
`;

export const EpisodeInfo = styled(FlexColumn)`
  padding: 10px 0;
`;

export const EpisodeMainInfo = styled(FlexColumn)`
  gap: 10px;
`;

export const ListName = styled.span`
  font-size: 19px;
  line-height: 1.5;
  color: ${(props) => props.theme.font.paragraph};
`;

export const EpisodeNumber = styled(ListName)`
  margin-right: 10px;
`;

export const ListDate = styled.span`
  font-size: 16px;
  color: ${(props) => props.theme.font.muted};
`;

export const EpisodeOverview = styled(ListDate)`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
  line-height: 1.5;
`;

export const MoreList = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-top: 1px solid ${(props) => props.theme.etc.modalDivider};
  }
`;

export const MoreButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 25px;
  margin: 0 8px;
  padding: 0 10px;
  border: 1px solid ${(props) => props.theme.etc.modalDivider};
  border-radius: 13px;
  background-color: inherit;
  font-size: 13px;
  font-weight: 600;
  color: ${(props) => props.theme.font.muted};
  cursor: pointer;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const VideoModalWindow = styled.div`
  z-index: 1;
  width: 1300px;
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
    color: rgba(255, 255, 255, 0.7);
    &:hover {
      color: inherit;
    }
  }
`;

export const NoTrailer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  aspect-ratio: 16 / 9;
  color: #ffffff;
  font-size: 19px;
  svg {
    width: 60px;
    height: 60px;
    margin-bottom: 30px;
  }
`;
