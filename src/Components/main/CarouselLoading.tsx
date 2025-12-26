import { useRecoilValue } from "recoil";

import { screenState } from "../../atom";
import {
  CarouselItemContainer,
  Container,
  ItemParent,
  Loading,
  LoadingItem,
  TextLoading,
  Title,
} from "../../styles/carouselStyle";

export const CarouselLoading = () => {
  const showItem = useRecoilValue(screenState);
  const renderCount = Array.from({ length: showItem + 1 }, (_, index) => index);
  const itemWidth = 100 / showItem;

  return (
    <Container>
      <Loading>
        {renderCount.map((index) => (
          <CarouselItemContainer $itemWidth={itemWidth} key={index}>
            <ItemParent>
              <LoadingItem />
            </ItemParent>
            <Title>
              <TextLoading />
            </Title>
          </CarouselItemContainer>
        ))}
      </Loading>
    </Container>
  );
};
