import { useParams } from "react-router-dom";
import {
  ResultsName,
  ResultsWrapper,
  SearchKeyword,
  Wrapper,
} from "../styles/searchResultsStyle";

export const SearchResults = () => {
  const { keyword } = useParams();

  return (
    <>
      <Wrapper>
        <ResultsWrapper>
          <ResultsName>
            <SearchKeyword>'{keyword}'</SearchKeyword> 검색결과
          </ResultsName>
        </ResultsWrapper>
      </Wrapper>
    </>
  );
};
