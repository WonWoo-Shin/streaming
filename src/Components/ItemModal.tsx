import { createPortal } from "react-dom";
import { ModalContainer } from "../styles/modalStyle";

interface IModalProps {
  itemId: string | undefined;
}

const Modal = () => {
  return <ModalContainer></ModalContainer>;
};

export const ItemModal = ({ itemId }: IModalProps) => {
  if (!itemId) return null;

  const rootModal = document.getElementById("root-modal");
  if (!rootModal) return null;

  return <>{createPortal(<Modal />, rootModal)}</>;
};
