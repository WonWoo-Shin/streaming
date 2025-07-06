import { useState } from "react";
import {
  PannelContainer,
  PannelImage,
  PannelPreview,
  PannelTitle,
} from "../styles/contentsPannelStyle";
import { IItemList } from "../type";
import { createImage } from "../utils/createImgae";

export const ContentPannel = ({
  backdrop_path,
  poster_path,
  title,
  name,
}: IItemList) => {
  const [showPreview, setShowPreview] = useState(false);

  const pannelMouseEnter = () => {
    setShowPreview(true);
  };

  const pannelMouseLeave = () => {
    setShowPreview(false);
  };

  return (
    <PannelContainer
      onMouseEnter={pannelMouseEnter}
      onMouseLeave={pannelMouseLeave}
    >
      <PannelImage src={createImage("w500", backdrop_path ?? poster_path)} />
      <PannelTitle>{title ?? name}</PannelTitle>
      {showPreview && (
        <PannelPreview>
          <PannelImage
            src={createImage("w500", backdrop_path ?? poster_path)}
          />
          <PannelTitle>{title ?? name}</PannelTitle>
        </PannelPreview>
      )}
    </PannelContainer>
  );
};
