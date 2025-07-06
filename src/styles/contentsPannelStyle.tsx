import { motion } from "framer-motion";
import styled from "styled-components";

export const PannelContainer = styled.div`
  position: relative;
  background-color: grey;
`;

export const PannelImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 4px;
  border-radius: 4px;
  object-fit: cover;
`;

export const PannelTitle = styled.h2`
  height: var(--title-height);
  margin-top: var(--title-margin);
  font-size: 1em;
  line-height: 1.2;
  color: ${(props) => props.theme.font.secondary};
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
`;

export const PannelPreview = styled(motion.div)`
  position: absolute;
  top: calc(((100% - var(--preview-scale)) / 2));
  z-index: 1;
  width: var(--preview-scale);
  height: var(--preview-scale);
  background-color: ${(props) => props.theme.background.primary};
  border-radius: var(--border-radius);
  box-shadow: ${(props) => props.theme.etc.boxShadow} 0px 3px 15px;
  &.leftEnd {
    left: 0;
    transform-origin: left center;
  }
  &.rightEnd {
    right: 0;
    transform-origin: right center;
  }
  &.center {
    left: calc(((100% - var(--preview-scale)) / 2));
  }
`;
