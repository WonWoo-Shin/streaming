import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, Variants } from "framer-motion";
import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";

import { getGenre } from "../api";
import {
  PannelContainer,
  PannelImage,
  PannelPreview,
  PannelPreviewText,
  PannelTitle,
} from "../styles/contentsPannelStyle";
import { IGenre, IGetGenre, IItemList } from "../type";
import { createImage } from "../utils/createImgae";


const previewVariant: Variants = {
  initial: {
    scale: 0.72,
  },
  animate: {
    scale: 1,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
  exit: {
    scale: 0.72,
    transition: {
      ease: [0.25, 0.1, 0.25, 1],
      duration: 0.25,
    },
  },
};

interface IProps extends IItemList {
  index: number;
  isLeftEnd: boolean;
  isRightEnd: boolean;
  isTransition?: boolean;
}

export const ContentsPannel = React.memo(
  ({
    id,
    backdrop_path,
    poster_path,
    title,
    name,
    media_type,
    genre_ids,
    isLeftEnd,
    isRightEnd,
    isTransition,
  }: IProps) => {
    const [showPreview, setShowPreview] = useState(false);
    const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const pannelMouseEnter = () => {
      delayRef.current = setTimeout(() => {
        setShowPreview(true);
      }, 500);
    };

    const pannelMouseLeave = () => {
      setShowPreview(false);
      if (delayRef.current) {
        clearTimeout(delayRef.current);
      }
    };

    const { data: genreList } = useQuery<IGetGenre>({
      queryKey: ["genre", media_type],
      queryFn: () => getGenre(media_type),
    });

    const findGenre = (genreId: IGenre["id"]) => {
      return genreList?.genres.find((genre) => genre.id == genreId)?.name;
    };

    return (
      <PannelContainer
        onMouseEnter={pannelMouseEnter}
        onMouseLeave={pannelMouseLeave}
      >
        <Link to={`modal/${media_type}/${id}`}>
          <PannelImage
            src={createImage("w500", backdrop_path ?? poster_path)}
          />
          <PannelTitle>{title ?? name}</PannelTitle>
          <AnimatePresence>
            {showPreview && !isTransition && (
              <PannelPreview
                className={
                  isLeftEnd ? "left_end" : isRightEnd ? "right_end" : "center"
                }
                variants={previewVariant}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                <PannelImage
                  className="preview"
                  src={createImage("w500", backdrop_path ?? poster_path)}
                />
                <PannelPreviewText>
                  <span>{title ?? name}</span>
                  <span>
                    {genre_ids.map((genreId) => (
                      <p key={genreId}>{findGenre(genreId)}</p>
                    ))}
                  </span>
                </PannelPreviewText>
              </PannelPreview>
            )}
          </AnimatePresence>
        </Link>
      </PannelContainer>
    );
  }
);
