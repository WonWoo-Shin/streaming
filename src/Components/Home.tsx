import { AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { Wrapper } from "../styles/homeStyle";

import { Banner } from "./banner/Banner";
import { Header } from "./header/Header";
import { Main } from "./main/Main";
import { ItemModal } from "./modal/ItemModal";



export const Home = () => {
  const { itemId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
