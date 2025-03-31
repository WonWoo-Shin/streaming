import styled from "styled-components";
import { ModalWindow } from "./modalStyle";

export const EpisodeModalWindow = styled(ModalWindow)`
  max-width: 720px;
  height: calc(100vh - 150px);
  padding: 30px;
  border-radius: 8px;
`;

export const ModalHeader = styled.header`
  h1 {
    font-size: 20px;
    color: ${(props) => props.theme.font.primary};
  }
`;
