import { useQuery } from "@tanstack/react-query";
import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IItemListResults, TMediaType, TTime } from "../../type";
import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";
import { TimeTab } from "./TimeTab";
import { MediaTypeTab } from "./MediaTypeTab";
import { addMediatype } from "../../utils/addMediaType";

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
    select: (data) => addMediatype(data, mediaType),
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
