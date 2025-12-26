import { createPortal } from "react-dom";
import { ModalBackground, ModalScreen } from "../../../styles/modal/modalStyle";
import { Variants } from "framer-motion";
import { IEpisodeModal, IGetDetail } from "../../../type";
import { EpisodeModalWindow } from "../../../styles/modal/episodeModalStyle";

import { EpisodeInfoDetail } from "./EpisodeInfoDetail";

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
  itemId: IGetDetail["id"];
  language: IGetDetail["original_language"];
  setEpisodeModal: React.Dispatch<React.SetStateAction<IEpisodeModal>>;
}

export const EpisodeInfoModal = ({
  itemId,
  episode,
  language,
  setEpisodeModal,
}: IProps) => {
  const modalContainer = document.getElementById("modal-screen");
  if (!modalContainer) return null;

  const closeModal = () => {
    setEpisodeModal((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <>
      {createPortal(
        <ModalScreen
          variants={modalVariant}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <ModalBackground onClick={closeModal} />
          <EpisodeModalWindow
            variants={modalWindowVariant}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <EpisodeInfoDetail
              itemId={itemId}
              episode={episode}
              language={language}
              closeModal={closeModal}
            />
          </EpisodeModalWindow>
        </ModalScreen>,
        modalContainer
      )}
    </>
  );
};
