import { Wrapper } from "../styles/bannerStyle";
import { Banner } from "./banner/Banner";
import { Main } from "./main/Main";

export const Home = () => {
  return (
    <Wrapper>
      <Banner />
      <Main />
    </Wrapper>
  );
};
