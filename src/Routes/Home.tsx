import { useQuery } from "@tanstack/react-query";
import { getNowPlaying } from "../api";

export const Home = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["nowPlaying"],
    queryFn: getNowPlaying,
  });

  console.log(data, isLoading);

  return <div style={{ backgroundColor: "whitesmoke", height: "200vh" }}></div>;
};
