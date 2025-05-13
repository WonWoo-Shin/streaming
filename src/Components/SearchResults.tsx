import { useParams } from "react-router-dom";
import { ResultsWrapper } from "../styles/searchResultsStyle";

export const SearchResults = () => {
  const { keyword } = useParams();

  return <ResultsWrapper>{keyword}</ResultsWrapper>;
};
