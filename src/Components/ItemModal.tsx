import { createPortal } from "react-dom";
import {
  ModalBackground,
  ModalContainer,
  ModalWindow,
} from "../styles/modalStyle";
import { useNavigate } from "react-router-dom";

interface IModalProps {
  itemId: string | undefined;
}

const Modal = () => {
  const navigate = useNavigate();

  return (
    <ModalContainer>
      <ModalBackground onClick={() => navigate("/")}></ModalBackground>
      <ModalWindow></ModalWindow>
    </ModalContainer>
  );
};

export const ItemModal = ({ itemId }: IModalProps) => {
  if (!itemId) return null;

  const rootModal = document.getElementById("root-modal");
  if (!rootModal) return null;

  return <>{createPortal(<Modal />, rootModal)}</>;
};
