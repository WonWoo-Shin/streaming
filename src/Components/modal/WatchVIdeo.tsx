import { useRecoilValue, useResetRecoilState } from "recoil";
import { ModalContainer } from "../../styles/modal/modalStyle";
import { videoModalState } from "../../atom";
import {
  NoTrailer,
  VideoModalNav,
  VideoModalWindow,
} from "../../styles/modal/modalColumnListStyle";
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
                fill="currentcolor"
              ></path>
            </svg>
          </div>
        </VideoModalNav>
        {videoModal.key === "noVideo" ? (
          <NoTrailer>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512">
              <path
                fill="#ffffff"
                d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7l-86.4-67.7 13.8 9.2c9.8 6.5 22.4 7.2 32.9 1.6s16.9-16.4 16.9-28.2l0-256c0-11.8-6.5-22.6-16.9-28.2s-23-5-32.9 1.6l-96 64L448 174.9l0 17.1 0 128 0 5.8-32-25.1L416 128c0-35.3-28.7-64-64-64L113.9 64 38.8 5.1zM407 416.7L32.3 121.5c-.2 2.1-.3 4.3-.3 6.5l0 256c0 35.3 28.7 64 64 64l256 0c23.4 0 43.9-12.6 55-31.3z"
              />
            </svg>
            트레일러가 없습니다.
          </NoTrailer>
        ) : (
          <iframe
            src={`https://www.youtube.com/embed/${videoModal.key}?autoplay=1&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}
      </VideoModalWindow>
    </ModalContainer>
  );
};
