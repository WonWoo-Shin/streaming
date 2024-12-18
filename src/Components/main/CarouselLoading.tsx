import { useRecoilValue } from "recoil";
import {
  Container,
  ItemContainer,
  ItemParent,
  Loading,
  LoadingItem,
} from "../../styles/carouselStyle";
import { screenState } from "../../atom";

export const CarouselLoading = () => {
  const showItem = useRecoilValue(screenState);
  const renderCount = Array.from({ length: showItem + 1 }, (_, index) => index);
  const itemWidth = 100 / showItem;

  return (
    <Container>
      <Loading>
        {renderCount.map((index) => (
          <ItemContainer $itemWidth={itemWidth} key={index}>
            <ItemParent>
              <LoadingItem />
            </ItemParent>
          </ItemContainer>
        ))}
      </Loading>
    </Container>
  );
};
