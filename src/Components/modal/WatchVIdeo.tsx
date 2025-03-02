import { useRecoilState, useSetRecoilState } from "recoil";
import { ModalBackground, ModalContainer } from "../../styles/modal/modalStyle";
import { videoModalState } from "../../atom";
import { VideoModalWindow } from "../../styles/modal/modalVideoStyle";
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

  return (
    <ModalContainer
      variants={modalVariant}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <ModalBackground
        onClick={() => setVideoModal({ isOpen: false, key: "" })}
      />
      <VideoModalWindow>
        <iframe
          width="100%"
          height="100%"
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
