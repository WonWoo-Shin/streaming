import { useQuery } from "@tanstack/react-query";
import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IItemList, TMediaType, TTime } from "../../type";
import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";
import { TimeTab } from "./TimeTab";

interface ICategoryProps {
  // categoryData: IGetResult | undefined;
  isSuccess?: boolean;
  categoryName: string;
  getFn: (mediaType?: TMediaType, time?: TTime) => Promise<any>;
  tabButton?: boolean;
  time?: TTime;
}

export const Category = ({
  // categoryData,
  categoryName,
  getFn,
  tabButton,
  time,
}: ICategoryProps) => {
  const { data: categoryData } = useQuery<IItemList>({
    queryKey: [categoryName, time],
    queryFn: () => getFn(),
    staleTime: 60 * 60 * 1000,
  });

  return (
    <CategoryStyle>
      <CategoryName>
        <span>{categoryName}</span>
      </CategoryName>
      {tabButton && <TimeTab />}
      {categoryData ? (
        <ListCarousel data={categoryData?.results} />
      ) : (
        <CarouselLoading />
      )}
    </CategoryStyle>
  );
};
