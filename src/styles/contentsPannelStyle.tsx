import { motion } from "framer-motion";
import styled from "styled-components";

export const PannelContainer = styled.div`
  position: relative;
`;

export const PannelImage = styled.img`
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  margin-bottom: 4px;
  border-radius: 4px;
  object-fit: cover;
  &.preview {
    margin-bottom: 0;
  }
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
  &.left_end {
    left: 0;
    transform-origin: left center;
  }
  &.right_end {
    right: 0;
    transform-origin: right center;
  }
  &.center {
    left: calc(((100% - var(--preview-scale)) / 2));
  }
`;

export const PannelPreviewText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 0.8em;
  line-height: 1.5;
  span {
    display: block;
    overflow: hidden;
    width: 15em;
    white-space: nowrap;
    font-size: 1.1em;
    font-weight: 600;
    color: ${(props) => props.theme.font.secondary};
    text-overflow: ellipsis;
    p {
      font-weight: 500;
      display: inline-block;
      font-size: 0.8em;
      color: ${(props) => props.theme.font.muted};
      white-space: pre;
      &:not(:first-child) {
        &::before {
          content: " · ";
        }
      }
    }
  }
`;
