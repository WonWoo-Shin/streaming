import { CategoryName, CategoryStyle } from "../../styles/mainStyle";
import { IGetResult } from "../../type";
import { CarouselLoading } from "./CarouselLoading";
import { ListCarousel } from "./ListCarousel";

interface ICategoryProps {
  categoryData: IGetResult | undefined;
  isSuccess?: boolean;
  categoryName: string;
  tabButton?: boolean;
}

export const Category = ({
  categoryData,
  categoryName,
  tabButton,
}: ICategoryProps) => {
  return (
    <CategoryStyle>
      <CategoryName>
        <span>{categoryName}</span>
      </CategoryName>
      {tabButton && <button>button</button>}
      {categoryData ? (
        <ListCarousel data={categoryData?.results} />
      ) : (
        <CarouselLoading />
      )}
    </CategoryStyle>
  );
};
