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
  const wrapperElement = wrapperRef.current;

  const scrollRef = useRef(0);

  // 모달창이 열렸을 때 실행값
  if (itemId && wrapperElement) {
    scrollRef.current = window.scrollY;
    wrapperElement.style.top = `-${scrollRef.current}px`;
    wrapperElement.classList.add("modal-open");
  }
  // 모달창이 열렸을 때 실행값

  const modalExitComplete = () => {
    if (wrapperRef.current) {
      wrapperRef.current.classList.remove("modal-open");
      console.log(scrollRef.current);
      window.scrollTo(0, scrollRef.current);
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
