import { Link } from "react-router-dom";
import {
  ItemImage,
  ItemPreview,
  ResultsItemContainer,
} from "../../styles/searchResultsStyle";
import { createImage } from "../../utils/createImgae";
import { IItemList } from "../../type";
import { Title } from "../../styles/carouselStyle";
import { useState } from "react";

export const ResultsItem = ({
  id,
  media_type,
  backdrop_path,
  poster_path,
  title,
  name,
}: IItemList) => {
  const [showPreview, setShowPreview] = useState(false);

  const itemEnter = () => {
    setShowPreview(true);
  };

  const itemLeave = () => {
    setShowPreview(false);
  };

  return (
    <ResultsItemContainer onMouseEnter={itemEnter} onMouseLeave={itemLeave}>
      <Link to={`modal/${media_type}/${id}`}>
        <ItemImage src={createImage("w400", backdrop_path ?? poster_path)} />
        <Title>{title ?? name}</Title>
      </Link>
      {showPreview && <ItemPreview></ItemPreview>}
    </ResultsItemContainer>
  );
};
