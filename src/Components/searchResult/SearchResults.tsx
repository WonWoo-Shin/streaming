import { useQuery } from "@tanstack/react-query";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";

import { getMovieSearch, getTvSearch } from "../../api";
import { screenState } from "../../atom";
import { useAdjustShowItem } from "../../hooks/useAdjustShowItem";
import {
  ResultsList,
  ResultsName,
  ResultsWrapper,
  SearchKeyword,
  SearchMessage,
  Wrapper,
} from "../../styles/searchResultsStyle";
import { IItemListResults } from "../../type";
import { addMediatype } from "../../utils/addMediaType";
import { ContentsPannel } from "../ContentsPannel";
import { Header } from "../header/Header";
import { ItemModal } from "../modal/ItemModal";

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

  const content = () => {
    if (isLoading) {
      return <SearchMessage>검색 중...</SearchMessage>;
    }
    if (isTvError || isMovieError) {
      return (
        <SearchMessage>
          데이터를 불러오지 못했습니다.
          <br /> 잠시 후 다시 시도해주세요.
        </SearchMessage>
      );
    }
    if (!searchData.length) {
      return <SearchMessage>검색 결과가 없습니다.</SearchMessage>;
    }
    return (
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
    );
  };

  return (
    <>
      <Header isHome={false} />
      <Wrapper>
        <ResultsWrapper>
          <ResultsName>
            <SearchKeyword>'{keyword}'</SearchKeyword> 검색 결과
          </ResultsName>
          {content()}
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
