import { useParams } from "react-router-dom";
import { Wrapper } from "../styles/HomeStyle";
import { Banner } from "./banner/Banner";
import { Footer } from "./Footer";
import { Header } from "./Header/Header";
import { ItemModal } from "./modal/ItemModal";
import { Main } from "./main/Main";

import { AnimatePresence } from "framer-motion";

export const Home = () => {
  const { itemId } = useParams();

  return (
    <>
      <Wrapper>
        <Header />
        <Banner />
        <Main />
        <Footer />
        <AnimatePresence
          onExitComplete={() => {
            const body = document.body;
            body.classList.remove("modal-open");
          }}
        >
          {" "}
          {itemId && <ItemModal itemId={itemId} />}
        </AnimatePresence>
      </Wrapper>
    </>
  );
};
