import styled from "styled-components";

export const Wrapper = styled.main`
  width: 100%;
  height: 100vh;
  padding-top: 65px;
`;

export const ResultsWrapper = styled.div`
  padding: 55px 50px;
`;

export const ResultsName = styled.h1`
  font-size: 32px;
  font-weight: 600;
  color: ${(props) => props.theme.font.muted};
`;

export const SearchKeyword = styled.span`
  color: ${(props) => props.theme.font.primary};
`;
