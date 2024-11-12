import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";
import { IGetResult } from "../type";
import { Banner, Overview, Title, Wrapper } from "../styles/homeStyle";

export const Home = () => {
  const { data, isLoading } = useQuery<IGetResult>({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  console.log(data, isLoading);

  const bgImage = `https://image.tmdb.org/t/p/original${data?.results[0].backdrop_path}`;

  return (
    <Wrapper>
      <Banner
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url(${bgImage})`,
        }}
      >
        <Title>{data?.results[0].title}</Title>
        <Overview>{data?.results[0].overview}</Overview>
      </Banner>
    </Wrapper>
  );
};
