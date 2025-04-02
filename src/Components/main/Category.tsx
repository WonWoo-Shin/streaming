import { useQuery } from "@tanstack/react-query";
import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IItemListResults, TMediaType, TTime } from "../../type";
import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";
import { TimeTab } from "./TimeTab";
import { MediaTypeTab } from "./MediaTypeTab";

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
  const { data: categoryData } = useQuery<IItemListResults>({
    queryKey: [categoryName, time, mediaType].filter(Boolean),
    queryFn: () => getFn(),
    select: (data) => {
      const addMediaTypeResults = data.results.map((result) => ({
        ...result,
        media_type: result.media_type || mediaType, // media_type이 있다면 그대로 두고, 없다면 추가
      }));
      const allowMediaType: TMediaType[] = ["movie", "tv"];
      const filterdMediaTypeResults = addMediaTypeResults.filter(
        (result) => allowMediaType.includes(result.media_type) // media type movie, tv외의 것은 제외
      );
      return {
        ...data,
        results: filterdMediaTypeResults,
      };
    },
    staleTime: 60 * 60 * 1000,
  });

  return (
    <CategoryStyle>
      <CategoryName>
        <span>{categoryName}</span>
      </CategoryName>
      {tabButton === "time" && <TimeTab />}
      {tabButton === "mediaType" && <MediaTypeTab />}
      {categoryData ? (
        <ListCarousel data={categoryData?.results} />
      ) : (
        <CarouselLoading />
      )}
    </CategoryStyle>
  );
};
