import { useQuery } from "@tanstack/react-query";
import { Category, MainContainer } from "../../styles/mainStyle";
import { ListCarousel } from "./ListCarousel";
import { IGetResult } from "../../type";
import { getNowPlaying } from "../../api";

export const Main = () => {
  const { data: nowPlayingData } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  return (
    <MainContainer>
      <Category>
        <div>
          <span>현재 상영중</span>
        </div>
        {nowPlayingData && <ListCarousel data={nowPlayingData?.results} />}
      </Category>
      <Category></Category>
      <Category></Category>
    </MainContainer>
  );
};
