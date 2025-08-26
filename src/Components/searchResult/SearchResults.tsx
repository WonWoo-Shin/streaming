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
import { getMovieSearch, getTvSearch } from "../../api";
import { IItemListResults } from "../../type";

import { ItemModal } from "../modal/ItemModal";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Header } from "../header/Header";
import { ContentsPannel } from "../ContentsPannel";
import { useRecoilValue } from "recoil";
import { screenState } from "../../atom";
import { useAdjustShowItem } from "../../hooks/useAdjustShowItem";
import { addMediatype } from "../../utils/addMediaType";

export const SearchResults = () => {
  const { keyword, itemId } = useParams();

  const {
    data: searchTvData,
    isLoading: isTvLoading,
    isError: isTvError,
  } = useQuery<IItemListResults>({
    queryKey: ["searchTvResults", keyword],
    queryFn: () => getTvSearch(keyword ?? ""),
    select: (data) => addMediatype(data, "tv"),
  });

  const {
    data: searchMovieData,
    isLoading: isMovieLoading,
    isError: isMovieError,
  } = useQuery<IItemListResults>({
    queryKey: ["searchMovieResults", keyword],
    queryFn: () => getMovieSearch(keyword ?? ""),
    select: (data) => addMediatype(data, "movie"),
  });

  const searchData = [
    ...(searchTvData?.results ?? []),
    ...(searchMovieData?.results ?? []),
  ];
  const isLoading = isTvLoading || isMovieLoading;

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
          ) : isTvError || isMovieError ? (
            <SearchMessage>
              데이터를 불러오지 못했습니다.
              <br /> 잠시 후 다시 시도해주세요.
            </SearchMessage>
          ) : searchData?.length === 0 ? (
            <SearchMessage>검색 결과가 없습니다.</SearchMessage>
          ) : (
            <ResultsList>
              {searchData?.map((data, index) => {
                const isLeftEnd = index % showItem === 0;
                const isRightEnd = (index + 1) % showItem === 0;

                return (
                  <ContentsPannel
                    key={data.id}
                    {...data}
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
