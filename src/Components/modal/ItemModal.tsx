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
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  Variants,
} from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ModalDetail } from "./ModalDetail";
import { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import { videoModalState } from "../../atom";
import { WatchVideo } from "./WatchVIdeo";

interface IModalProps {
  itemId: string | undefined;
}

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

export const ItemModal = ({ itemId }: IModalProps) => {
  const rootModal = document.getElementById("root-modal");
  if (!rootModal) return null;

  if (!itemId) return null;

  const [isModalOpen, setIsModalOpen] = useState(true);

  const body = document.body;
  useEffect(() => {
    if (itemId) {
      body.classList.add("modal-open");
    }
  }, []);

  const navigate = useNavigate();

  const videoModal = useRecoilValue(videoModalState);

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
        <AnimatePresence>
          {isModalOpen && (
            <ModalContainer
              id="modal-container"
              variants={modalVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              onAnimationComplete={(definition) => {
                if (definition === "exit") {
                  body.classList.remove("modal-open");
                  navigate("/");
                }
              }}
            >
              <ModalBackground onClick={() => setIsModalOpen(false)} />
              <ModalWindow
                ref={modalWindowRef}
                variants={modalWindowVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ModalDetail itemId={+itemId} setIsModalOpen={setIsModalOpen} />
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
              <AnimatePresence>
                {videoModal.isOpen && <WatchVideo />}
              </AnimatePresence>
            </ModalContainer>
          )}
        </AnimatePresence>,
        rootModal
      )}
    </>
  );
};
