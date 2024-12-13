import { Category, MainContainer } from "../../styles/mainStyle";
import { ListCarousel } from "./ListCarousel";

export const Main = () => {
  return (
    <MainContainer>
      <Category>
        <div>
          <span>현재 상영중</span>
        </div>
        <ListCarousel />
      </Category>
      <Category></Category>
      <Category></Category>
    </MainContainer>
  );
};
