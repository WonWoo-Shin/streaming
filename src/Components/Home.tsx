import { Wrapper } from "../styles/HomeStyle";
import { Banner } from "./banner/Banner";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemModal } from "./ItemModal";
import { Main } from "./main/Main";

export const Home = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Banner />
        <Main />
        <ItemModal />
        <Footer />
      </Wrapper>
    </>
  );
};
