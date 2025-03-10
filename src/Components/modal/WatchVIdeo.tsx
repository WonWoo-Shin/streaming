import { useRecoilValue, useResetRecoilState } from "recoil";
import { ModalContainer } from "../../styles/modal/modalStyle";
import { videoModalState } from "../../atom";
import {
  NoTrailer,
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
        {videoModal.key ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoModal.key}?autoplay=1&mute=0`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        ) : (
          <NoTrailer>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path
                fill="#ffffff"
                d="M175.9 448c-35-.1-65.5-22.6-76-54.6C67.6 356.8 48 308.7 48 256C48 141.1 141.1 48 256 48s208 93.1 208 208s-93.1 208-208 208c-28.4 0-55.5-5.7-80.1-16zM0 256a256 256 0 1 0 512 0A256 256 0 1 0 0 256zM128 369c0 26 21.5 47 48 47s48-21 48-47c0-20-28.4-60.4-41.6-77.7c-3.2-4.4-9.6-4.4-12.8 0C156.6 308.6 128 349 128 369zm128-65c-13.3 0-24 10.7-24 24s10.7 24 24 24c30.7 0 58.7 11.5 80 30.6c9.9 8.8 25 8 33.9-1.9s8-25-1.9-33.9C338.3 320.2 299 304 256 304zm47.6-96a32 32 0 1 0 64 0 32 32 0 1 0 -64 0zm-128 32a32 32 0 1 0 0-64 32 32 0 1 0 0 64z"
              />
            </svg>
            트레일러가 없습니다.
          </NoTrailer>
        )}
      </VideoModalWindow>
    </ModalContainer>
  );
};
