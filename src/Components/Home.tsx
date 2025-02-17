import { useParams } from "react-router-dom";
import { Wrapper } from "../styles/HomeStyle";
import { Banner } from "./banner/Banner";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemModal } from "./ItemModal";
import { Main } from "./main/Main";

export const Home = () => {
  const { itemId } = useParams();

  console.log(itemId);
  if (itemId) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "visible";
  }

  return (
    <>
      <Wrapper>
        <Header />
        <Banner />
        <Main />
        <Footer />
        <ItemModal itemId={itemId}></ItemModal>
      </Wrapper>
    </>
  );
};
