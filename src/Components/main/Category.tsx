import { useQuery } from "@tanstack/react-query";

import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IItemListResults, TMediaType, TTime } from "../../type";
import { addMediatype } from "../../utils/addMediaType";

import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";
import { MediaTypeTab } from "./MediaTypeTab";
import { TimeTab } from "./TimeTab";

interface ICategoryProps {
  isSuccess?: boolean;
  categoryName: string;
  getFn: (mediaType?: TMediaType, time?: TTime) => Promise<any>;
  mediaType?: TMediaType;
  tabButton?: "time" | "mediaType";
  time?: TTime;
}

export const Category = ({
  categoryName,
  getFn,
  mediaType,
  tabButton,
  time,
}: ICategoryProps) => {
  const {
    data: categoryData,
    isLoading,
    isError,
  } = useQuery<IItemListResults>({
    queryKey: [categoryName, time, mediaType].filter(Boolean),
    queryFn: () => getFn(),
    select: (data) => addMediatype(data, mediaType),
    staleTime: 60 * 60 * 1000,
  });

  const content = () => {
    if (isLoading) {
      return <CarouselLoading />;
    }
    if (isError) {
      return <span>데이터를 불러오지 못했습니다.</span>;
    }
    if (!categoryData?.results.length) {
      return <span>컨텐츠가 없습니다.</span>;
    }
    return <ListCarousel data={categoryData.results} />;
  };

  return (
    <CategoryStyle>
      <CategoryName>
        <span>{categoryName}</span>
      </CategoryName>
      {tabButton === "time" && <TimeTab />}
      {tabButton === "mediaType" && <MediaTypeTab />}
      {content()}
    </CategoryStyle>
  );
};
