import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalContainer,
  ModalWindow,
} from "../../styles/modalStyle";
import { AnimatePresence, Variants } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { IGetDetail } from "../../type";
import { getDetail } from "../../api";
import { ModalDetail } from "./ModalDetail";

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
  const root = document.getElementById("root");
  if (!root) return null;

  const body = document.body;
  if (itemId) {
    body.classList.add("modal-open");
  }

  const navigate = useNavigate();

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {itemId && (
            <ModalContainer
              variants={modalVariant}
              initial="initial"
              animate="animate"
              exit="exit"
              onAnimationComplete={(definition) => {
                if (definition === "exit") {
                  body.classList.remove("modal-open");
                }
              }}
            >
              <ModalBackground onClick={() => navigate("/")} />
              <ModalWindow
                variants={modalWindowVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <ModalDetail itemId={+itemId}></ModalDetail>
              </ModalWindow>
            </ModalContainer>
          )}
        </AnimatePresence>,
        root
      )}
    </>
  );
};
