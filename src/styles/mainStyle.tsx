import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4em;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  color: ${(props) => props.theme.font.secondary};
`;

export const CategoryStyle = styled.div`
  width: 100%;
`;

export const CategoryName = styled.div`
  padding-left: var(--carousel-padding);
  margin-bottom: 1.04em;
  span {
    font-size: 1.46em;
    font-weight: bold;
    font-family: inherit;
  }
`;

export const TabContainer = styled.div`
  display: flex;
  padding-left: var(--carousel-padding);
  margin-bottom: 1.04em;
`;

export const TabBtn = styled.button<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 4.95em;
  height: 2.34em;
  border: ${(props) =>
    props.$isActive ? "none" : `2px solid ${props.theme.etc.divider}`};
  border-radius: 9999px;
  background-color: ${(props) =>
    props.$isActive ? "var(--point-green)" : "inherit"};
  color: ${(props) => (props.$isActive ? "#000000" : "inherit")};
  font-size: inherit;
  cursor: pointer;
  &:not(:first-child) {
    margin-left: 1em;
  }
  span {
    font-weight: bold;
  }
`;
