import { Link, useLocation, useParams } from "react-router-dom";
import {
  ItemImage,
  ResultsList,
  ResultsName,
  ResultsWrapper,
  SearchKeyword,
  SearchMessage,
  Wrapper,
} from "../styles/searchResultsStyle";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../api";
import { IItemListResults } from "../type";
import { createImage } from "../utils/createImgae";
import { Title } from "../styles/carouselStyle";
import { ItemModal } from "./modal/ItemModal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Header } from "./Header/Header";

export const SearchResults = () => {
  const { keyword, itemId } = useParams();

  const { data: searchData, isLoading } = useQuery<IItemListResults>({
    queryKey: ["searchResults", keyword],
    queryFn: () => getSearch(keyword ?? ""),
  });

  const { pathname } = useLocation();
  const [basePath, setBasePath] = useState("");
  useEffect(() => {
    setBasePath(pathname);
  }, [keyword]);

  return (
    <>
      <Header isHome={false} />
      <Wrapper>
        <ResultsWrapper>
          <ResultsName>
            <SearchKeyword>'{keyword}'</SearchKeyword> 검색 결과
          </ResultsName>
          {isLoading ? (
            <SearchMessage>검색 중...</SearchMessage>
          ) : searchData?.results.length === 0 ? (
            <SearchMessage>검색 결과가 없습니다.</SearchMessage>
          ) : (
            <ResultsList>
              {searchData?.results.map((result) => (
                <li key={result.id}>
                  <Link to={`${result.media_type}/${result.id}`}>
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
        <AnimatePresence
          onExitComplete={() => {
            const body = document.body;
            body.classList.remove("modal-open");
          }}
        >
          {itemId && <ItemModal itemId={itemId} basePath={basePath} />}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};
