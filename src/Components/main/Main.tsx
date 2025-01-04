import { useQueries, useQuery } from "@tanstack/react-query";
import { MainContainer } from "../../styles/mainStyle";
import { IGetResult } from "../../type";
import { getPopular, getTopRated, getUpComing } from "../../api";
import { useSetRecoilState } from "recoil";
import { screenState } from "../../atom";
import { useMediaQuery } from "react-responsive";
import { useEffect } from "react";
import { Category } from "./Category";
import ReactModal from "react-modal";

export const Main = () => {
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1400px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 1100px)" });
  const setShowItem = useSetRecoilState(screenState);
  useEffect(() => {
    setShowItem(() => {
      return isSmallScreen ? 4 : isMediumScreen ? 5 : 6;
    });
  }, [isMediumScreen, isSmallScreen]);

  // const result = useQueries({
  //   queries: [
  //     {
  //       queryKey: ["popularData"],
  //       queryFn: getPopular,
  //     },
  //     {
  //       queryKey: ["popularData"],
  //       queryFn: getPopular,
  //     },
  //     {
  //       queryKey: ["popularData"],
  //       queryFn: getPopular,
  //     },
  //   ],
  // });

  const { data: popularData } = useQuery<IGetResult>({
    queryKey: ["popularData"],
    queryFn: getPopular,
    staleTime: 60 * 60 * 1000,
  });

  const { data: upComingData } = useQuery<IGetResult>({
    queryKey: ["upComing"],
    queryFn: getUpComing,
    staleTime: 60 * 60 * 1000,
  });

  const { data: topRatedData, isSuccess } = useQuery<IGetResult>({
    queryKey: ["topRated"],
    queryFn: getTopRated,
    staleTime: 60 * 60 * 1000,
  });

  return (
    <MainContainer>
      <Category categoryData={popularData} categoryName="최근 관심작" />

      <Category categoryData={topRatedData} categoryName="역대 인기작" />
    </MainContainer>
  );
};
