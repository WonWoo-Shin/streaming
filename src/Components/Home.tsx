import { Wrapper } from "../styles/bannerStyle";
import { Banner } from "./banner/Banner";
import { Header } from "./Header/Header";
import { Main } from "./main/Main";

export const Home = () => {
  return (
    <Wrapper>
      <Header />
      <Banner />
      <Main />
    </Wrapper>
  );
};
