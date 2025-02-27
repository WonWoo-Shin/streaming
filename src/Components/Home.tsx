import { useParams } from "react-router-dom";
import { Wrapper } from "../styles/HomeStyle";
import { Banner } from "./banner/Banner";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemModal } from "./modal/ItemModal";
import { Main } from "./main/Main";

export const Home = () => {
  const { itemId } = useParams();

  return (
    <>
      <Wrapper>
        <Header />
        <Banner />
        <Main />
        <Footer />
        {itemId && <ItemModal itemId={itemId} />}
      </Wrapper>
    </>
  );
};
