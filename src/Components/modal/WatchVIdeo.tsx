import { useRecoilValue, useResetRecoilState } from "recoil";
import { ModalContainer } from "../../styles/modal/modalStyle";
import { videoModalState } from "../../atom";
import {
  VideoModalNav,
  VideoModalWindow,
} from "../../styles/modal/modalVideoStyle";
import { Variants } from "framer-motion";

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

export const WatchVideo = () => {
  const videoModal = useRecoilValue(videoModalState);
  const resetVideoModal = useResetRecoilState(videoModalState);

  return (
    <ModalContainer
      variants={modalVariant}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <VideoModalWindow>
        <VideoModalNav>
          <span>{videoModal.name}</span>
          <div onClick={resetVideoModal}>
            {" "}
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.052 4.352a1.202 1.202 0 0 0-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 0 0 1.7 1.7L12 13.7l5.948 5.948a1.202 1.202 0 0 0 1.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 0 0-1.7-1.7L12 10.3 6.052 4.352Z"
                fill="#ffffff"
              ></path>
            </svg>
          </div>
        </VideoModalNav>
        <iframe
          src={`https://www.youtube.com/embed/${videoModal.key}?autoplay=1&mute=0`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      </VideoModalWindow>
    </ModalContainer>
  );
};
