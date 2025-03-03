import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalContainer,
  ModalWindow,
} from "../../styles/modal/modalStyle";
import { AnimatePresence, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ModalDetail } from "./ModalDetail";
import { useEffect, useState } from "react";
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
                variants={modalWindowVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ModalDetail itemId={+itemId} setIsModalOpen={setIsModalOpen} />
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
