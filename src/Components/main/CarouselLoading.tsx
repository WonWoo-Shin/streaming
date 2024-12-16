import { useRecoilValue } from "recoil";
import {
  Container,
  ItemContainer,
  ItemParent,
  LoadingContainer,
  LoadingItem,
} from "../../styles/carouselStyle";
import { screenState } from "../../atom";

export const CarouselLoading = () => {
  const showItem = useRecoilValue(screenState);
  const renderCount = Array.from({ length: showItem + 1 }, (_, index) => index);
  const itemWidth = 100 / showItem;

  console.log(renderCount);

  return (
    <Container>
      <LoadingContainer>
        {renderCount.map((index) => (
          <ItemContainer $itemWidth={itemWidth}>
            <ItemParent>
              <LoadingItem key={index} />
            </ItemParent>
          </ItemContainer>
        ))}
      </LoadingContainer>
    </Container>
  );
};
