import { Link } from "react-router-dom";
import { ItemImage } from "../../styles/searchResultsStyle";
import { createImage } from "../../utils/createImgae";
import { IItemList } from "../../type";
import { Title } from "../../styles/carouselStyle";

export const SearchItem = ({
  id,
  media_type,
  backdrop_path,
  poster_path,
  title,
  name,
}: IItemList) => {
  return (
    <li>
      <Link to={`modal/${media_type}/${id}`}>
        <ItemImage src={createImage("w400", backdrop_path ?? poster_path)} />
        <Title>{title ?? name}</Title>
      </Link>
    </li>
  );
};
