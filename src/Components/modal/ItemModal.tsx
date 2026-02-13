import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalScreen,
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
import { useNavigate, useParams } from "react-router-dom";
import { ModalDetail } from "./ModalDetail";
import { useRef, useState } from "react";
import SimpleBar from "simplebar-react";

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
    y: 200,
  },
  animate: {
    y: 0,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
  exit: {
    y: 200,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

interface IProps {
  basePath?: string;
}

export const ItemModal = ({ basePath }: IProps) => {
  const rootModal = document.getElementById("root-modal");
  if (!rootModal) return null;

  const { itemId } = useParams();
  if (!itemId) return;

  const navigate = useNavigate();

  const body = document.body;
  body.classList.add("modal-open"); // body css에서 scroll 없애기

  const closeModal = () => {
    navigate(basePath ?? "/");
  };

  const simpleBarRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll({ container: simpleBarRef });

  const [showScrollUp, setShowScrollUp] = useState(false); // scroll 최상단 이동 버튼
  useMotionValueEvent(scrollY, "change", (current) => {
    setShowScrollUp(current >= 200);
  });
  const moveScrollTop = () => {
    const windowRefCurrent = simpleBarRef.current;
    if (windowRefCurrent) {
      windowRefCurrent.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      {createPortal(
        <ModalScreen
          id="modal-screen"
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ModalBackground onClick={closeModal} />
          <ModalWindow
            variants={modalWindowVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <SimpleBar
              scrollableNodeProps={{ ref: simpleBarRef }}
              style={{ minHeight: 0 }}
            >
              <ModalDetail
                key={itemId} // Link로 인한 itemId 변경시 재랜더링
                itemId={+itemId}
                closeModal={closeModal}
                basePath={basePath}
              />
            </SimpleBar>
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
        </ModalScreen>,
        rootModal,
      )}
    </>
  );
};
