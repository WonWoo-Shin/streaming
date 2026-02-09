import { Wrapper } from "../styles/homeStyle";
import { Banner } from "./banner/Banner";
import { Main } from "./main/Main";
import { Header } from "./header/Header";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ItemModal } from "./modal/ItemModal";

export const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { itemId } = useParams();

  return (
    <Wrapper>
      <Header isHome />
      <Banner />
      <Main />
      {/* <AnimatePresence
        onExitComplete={() => document.body.classList.remove("modal-open")}
      >
        {itemId && <ItemModal itemId={itemId} />}
      </AnimatePresence> */}
    </Wrapper>
  );
};
