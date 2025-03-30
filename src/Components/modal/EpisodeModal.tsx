import { createPortal } from "react-dom";
import { ModalBackground, ModalContainer } from "../../styles/modal/modalStyle";
import { Variants } from "framer-motion";
import { IEpisodeModal } from "../../type";
import { EpisodeModalWindow } from "../../styles/modal/episodeModalStyle";

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

interface IProps extends IEpisodeModal {
  setEpisodeModal: React.Dispatch<React.SetStateAction<IEpisodeModal>>;
}

export const EpisodeModal = ({ episodeId, setEpisodeModal }: IProps) => {
  const modalContainer = document.getElementById("modal-container");
  if (!modalContainer) return null;

  return (
    <>
      {createPortal(
        <ModalContainer
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ModalBackground
            onClick={() => setEpisodeModal({ isOpen: false, episodeId: 0 })}
          />
          <EpisodeModalWindow
            variants={modalWindowVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          ></EpisodeModalWindow>
        </ModalContainer>,
        modalContainer
      )}
    </>
  );
};
