import { useParams } from "react-router-dom";
import { Wrapper } from "../styles/homeStyle";
import { Banner } from "./banner/Banner";
import { ItemModal } from "./modal/ItemModal";
import { Main } from "./main/Main";

import { AnimatePresence } from "framer-motion";
import { Header } from "./Header/Header";

export const Home = () => {
  const { itemId } = useParams();

  return (
    <Wrapper>
      <Header isHome />
      <Banner />
      <Main />
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
  );
};
