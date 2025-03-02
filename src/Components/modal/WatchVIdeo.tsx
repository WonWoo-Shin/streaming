import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalBackground, ModalContainer } from "../../styles/modal/modalStyle";
import { videoModalState } from "../../atom";
import {
  VideoModalNav,
  VideoModalWindow,
} from "../../styles/modal/modalVideoStyle";
import { Variants } from "framer-motion";
import { IGetVideos } from "../../type";

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
  const [videoModal, setVideoModal] = useRecoilState(videoModalState);

  const closeVideo = () => {
    setVideoModal({ isOpen: false, key: "" });
  };

  return (
    <ModalContainer
      variants={modalVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ModalBackground onClick={closeVideo} />
      <VideoModalWindow>
        <VideoModalNav>
          <span>트레일러 재생</span>
          <div onClick={closeVideo}>
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
