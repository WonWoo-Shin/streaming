import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IGetResult } from "../../type";
import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";

interface ICategoryProps {
  categoryData: IGetResult | undefined;
  categoryName: string;
}

export const Category = ({ categoryData, categoryName }: ICategoryProps) => {
  return (
    <CategoryStyle>
      <CategoryName>
        <span>{categoryName}</span>
      </CategoryName>
      {categoryData ? (
        <ListCarousel data={categoryData?.results} />
      ) : (
        <CarouselLoading />
      )}
    </CategoryStyle>
  );
};
