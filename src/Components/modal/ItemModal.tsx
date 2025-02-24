import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalContainer,
  ModalWindow,
  Test,
} from "../../styles/modalStyle";
import { AnimatePresence, Variants } from "framer-motion";

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

  return (
    <>
      {createPortal(
        <AnimatePresence>
          {itemId && (
            <ModalContainer
            // variants={modalVariant}
            // initial="initial"
            // animate="animate"
            // exit="exit"
            >
              <ModalBackground onClick={() => history.back()} />
              <ModalWindow>
                <Test style={{ backgroundColor: "tomato" }} />
                <Test style={{ backgroundColor: "teal" }} />
                <Test style={{ backgroundColor: "black" }} />
              </ModalWindow>
            </ModalContainer>
          )}
        </AnimatePresence>,
        root
      )}
    </>
  );
};
