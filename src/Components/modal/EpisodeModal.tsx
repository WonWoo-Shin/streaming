import { createPortal } from "react-dom";
import { ModalBackground, ModalContainer } from "../../styles/modal/modalStyle";
import { Variants } from "framer-motion";
import { IEpisodeModal } from "../../type";
import {
  EpisodeModalWindow,
  ModalHeader,
} from "../../styles/modal/episodeModalStyle";

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

  const closeModal = () => {
    setEpisodeModal({ isOpen: false, episodeId: 0 });
  };

  return (
    <>
      {createPortal(
        <ModalContainer
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
            <ModalHeader>
              <h1>에피소드 정보</h1>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={closeModal}
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.052 4.352a1.202 1.202 0 0 0-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 0 0 1.7 1.7L12 13.7l5.948 5.948a1.202 1.202 0 0 0 1.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 0 0-1.7-1.7L12 10.3 6.052 4.352Z"
                  fill="currentColor"
                ></path>
              </svg>
            </ModalHeader>
          </EpisodeModalWindow>
        </ModalContainer>,
        modalContainer
      )}
    </>
  );
};
