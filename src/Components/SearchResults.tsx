import { Link, useParams } from "react-router-dom";
import {
  ItemImage,
  ResultsList,
  ResultsName,
  ResultsWrapper,
  SearchKeyword,
  Wrapper,
} from "../styles/searchResultsStyle";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../api";
import { IItemListResults } from "../type";
import { createImage } from "../utils/createImgae";
import { Title } from "../styles/carouselStyle";
import { ItemModal } from "./modal/ItemModal";
import { AnimatePresence } from "framer-motion";

export const SearchResults = () => {
  const { keyword, itemId } = useParams();

  const { data: searchData, isLoading } = useQuery<IItemListResults>({
    queryKey: ["searchResults", keyword],
    queryFn: () => getSearch(keyword ?? ""),
  });

  return (
    <Wrapper>
      <ResultsWrapper>
        <ResultsName>
          <SearchKeyword>'{keyword}'</SearchKeyword> 검색 결과
        </ResultsName>
        {isLoading ? (
          <span>검색 중...</span>
        ) : searchData?.results.length === 0 ? (
          <span>검색 결과가 없습니다.</span>
        ) : (
          <ResultsList>
            {searchData?.results.map((result) => (
              <li key={result.id}>
                <Link to={`modal/${result.media_type}/${result.id}`}>
                  <ItemImage
                    src={createImage(
                      "w400",
                      result.backdrop_path ?? result.poster_path
                    )}
                  />
                  <Title>{result.title ?? result.name}</Title>
                </Link>
              </li>
            ))}
          </ResultsList>
        )}
      </ResultsWrapper>
      <AnimatePresence>
        {itemId && <ItemModal itemId={itemId} />}
      </AnimatePresence>
    </Wrapper>
  );
};
