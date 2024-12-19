import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4em;
  width: 100%;
  height: 100%;
  padding-top: 5%;
  color: #e5e5e5;
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
