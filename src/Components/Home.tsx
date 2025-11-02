import { useParams } from "react-router-dom";
import { Wrapper } from "../styles/homeStyle";
import { Banner } from "./banner/Banner";
import { ItemModal } from "./modal/ItemModal";
import { Main } from "./main/Main";

import { AnimatePresence } from "framer-motion";
import { Header } from "./header/Header";
import { useEffect, useRef } from "react";
import { Footer } from "./Footer";

export const Home = () => {
  const { itemId } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const wrapperRef = useRef<HTMLDivElement>(null);

  if (itemId && wrapperRef.current) {
    wrapperRef.current.classList.add("modal-open");
  }

  const modalExitComplete = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("modal-open");
    }
  };

  return (
    <Wrapper ref={wrapperRef}>
      <Header isHome />
      <Banner />
      <Main />
      <Footer />
      <AnimatePresence onExitComplete={modalExitComplete}>
        {" "}
        {itemId && <ItemModal itemId={itemId} />}
      </AnimatePresence>
    </Wrapper>
  );
};
