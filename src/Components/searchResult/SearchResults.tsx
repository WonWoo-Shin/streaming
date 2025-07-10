import { useParams } from "react-router-dom";
import {
  ResultsList,
  ResultsName,
  ResultsWrapper,
  SearchKeyword,
  SearchMessage,
  Wrapper,
} from "../../styles/searchResultsStyle";
import { useQuery } from "@tanstack/react-query";
import { getSearch } from "../../api";
import { IItemListResults } from "../../type";

import { ItemModal } from "../modal/ItemModal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { ContentsPannel } from "../ContentsPannel";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { useAdjustShowItem } from "../../hooks/useAdjustShowItem";

export const SearchResults = () => {
  const { keyword, itemId } = useParams();

  const { data: searchData, isLoading } = useQuery<IItemListResults>({
    queryKey: ["searchResults", keyword],
    queryFn: () => getSearch(keyword ?? ""),
  });

  const [basePath, setBasePath] = useState("");
  useEffect(() => {
    if (keyword) {
      setBasePath(`/search/${keyword}`);
    }
  }, [keyword]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useAdjustShowItem();
  const showItem = useRecoilValue(screenState);

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
              {searchData?.results.map((result, index) => {
                const isLeftEnd = index % showItem === 0;
                const isRightEnd = (index + 1) % showItem === 0;

                return (
                  <ContentsPannel
                    key={result.id}
                    {...result}
                    index={index}
                    isLeftEnd={isLeftEnd}
                    isRightEnd={isRightEnd}
                  />
                );
              })}
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
