import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getRecommend } from "../../../api";
import {
  ItemContainer,
  ItemImage,
  ItemTitle,
  RecommendContainer,
} from "../../../styles/modal/modalRecommendStyle";
import { ContentsMessage } from "../../../styles/modal/modalStyle";
import { IItemList, IItemListResults, TMediaType } from "../../../type";
import { createImage } from "../../../utils/createImgae";


interface IProps {
  itemId: IItemList["id"];
  mediaType: TMediaType;
  basePath?: string;
}

export const ModalRecommend = ({ itemId, mediaType, basePath }: IProps) => {
  const {
    data: recommendData,
    isLoading,
    isError,
  } = useQuery<IItemListResults>({
    queryKey: ["recommend", itemId],
    queryFn: () => getRecommend(mediaType, itemId),
  });

  if (isLoading) {
    return <ContentsMessage>로드 중..</ContentsMessage>;
  }

  if (isError) {
    return (
      <ContentsMessage>
        데이터를 불러오지 못했습니다.
        <br /> 잠시 후 다시 시도해주세요.
      </ContentsMessage>
    );
  }

  if (!recommendData?.results.length) {
    return <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>;
  }

  return (
    <RecommendContainer>
      {recommendData?.results.map((result) => (
        <ItemContainer key={result.id}>
          <Link
            to={`${basePath ?? ""}/modal/${result.media_type}/${result.id}`}
          >
            <ItemImage className="item-image">
              <img
                src={createImage(
                  "w500",
                  result.backdrop_path ?? result.poster_path
                )}
              />
            </ItemImage>
            <ItemTitle>{result.title ?? result.name}</ItemTitle>
          </Link>
        </ItemContainer>
      ))}
    </RecommendContainer>
  );
};
