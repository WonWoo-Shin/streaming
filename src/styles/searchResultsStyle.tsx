import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 850px;
  padding-top: 65px;
`;

export const ResultsWrapper = styled.div`
  padding: 55px 50px;
`;

export const ResultsName = styled.h1`
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: 600;
  color: ${(props) => props.theme.font.muted};
`;

export const SearchKeyword = styled.span`
  color: ${(props) => props.theme.font.primary};
`;

export const SearchMessage = styled.span`
  color: ${(props) => props.theme.font.secondary};
`;

export const ResultsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 60px 8px;
  @media (max-width: 1400px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media (max-width: 1100px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 800px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 500px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const ItemImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 4px;
  border-radius: 4px;
  object-fit: cover;
`;
