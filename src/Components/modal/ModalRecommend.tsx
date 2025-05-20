import { useQuery } from "@tanstack/react-query";
import { IItemList, IItemListResults, TMediaType } from "../../type";
import { getRecommend } from "../../api";
import { ContentsMessage } from "../../styles/modal/modalStyle";
import {
  ItemContainer,
  ItemImage,
  ItemTitle,
  RecommendContainer,
} from "../../styles/modal/modalRecommendStyle";
import { createImage } from "../../utils/createImgae";
import { Link } from "react-router-dom";

interface IProps {
  itemId: IItemList["id"];
  mediaType: TMediaType;
  basePath?: string;
}

export const ModalRecommend = ({ itemId, mediaType, basePath }: IProps) => {
  const { data: recommendData, isLoading } = useQuery<IItemListResults>({
    queryKey: ["recommend", itemId],
    queryFn: () => getRecommend(mediaType, itemId),
  });

  return (
    <>
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : recommendData?.results.length === 0 ? (
        <ContentsMessage>컨텐츠가 없습니다.</ContentsMessage>
      ) : (
        <RecommendContainer>
          {recommendData?.results.map((result) => (
            <ItemContainer key={result.id}>
              <Link to={`${basePath ?? ""}/${result.media_type}/${result.id}`}>
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
      )}
    </>
  );
};
