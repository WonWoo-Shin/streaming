import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalContainer,
  ModalScrollUp,
  ModalWindow,
  ScrollUpBtn,
} from "../../styles/modal/modalStyle";
import {
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ModalDetail } from "./ModalDetail";
import { useRef, useState } from "react";

const modalVariant: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

const modalWindowVariant: Variants = {
  initial: {
    translateY: 200,
  },
  animate: {
    translateY: 0,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    translateY: 200,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface IProps {
  itemId: string;
}

export const ItemModal = ({ itemId }: IProps) => {
  const rootModal = document.getElementById("root-modal");
  if (!rootModal) return null;

  const navigate = useNavigate();

  const body = document.body;
  body.classList.add("modal-open"); // body css에서 scroll 없애기

  const modalWindowRef = useRef<HTMLDivElement>(null);
  const [showScrollUp, setShowScrollUp] = useState(false);
  const { scrollY } = useScroll({ container: modalWindowRef });
  useMotionValueEvent(scrollY, "change", (current) => {
    setShowScrollUp(current >= 200);
  });
  const moveScrollTop = () => {
    const windowRefCurrent = modalWindowRef.current;
    if (windowRefCurrent) {
      windowRefCurrent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {createPortal(
        <ModalContainer
          id="modal-container"
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ModalBackground onClick={() => navigate("/")} />
          <ModalWindow
            ref={modalWindowRef}
            variants={modalWindowVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ModalDetail
              key={itemId} // Link로 인한 itemId 변경시 재랜더링
              itemId={+itemId}
            />
            <AnimatePresence>
              {showScrollUp && (
                <ModalScrollUp>
                  <ScrollUpBtn
                    onClick={moveScrollTop}
                    variants={modalVariant}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.15 }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M17.293 11.707a1 1 0 0 0 1.414-1.414l-6-6a1 1 0 0 0-1.414 0l-6 6a1 1 0 1 0 1.414 1.414L11 7.414V19a1 1 0 1 0 2 0V7.414l4.293 4.293Z"
                        fill="currentcolor"
                      ></path>
                    </svg>
                  </ScrollUpBtn>
                </ModalScrollUp>
              )}
            </AnimatePresence>
          </ModalWindow>
        </ModalContainer>,
        rootModal
      )}
    </>
  );
};
