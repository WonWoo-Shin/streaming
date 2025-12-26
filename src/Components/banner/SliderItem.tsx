import { useNavigate } from "react-router-dom";

import {
  Button,
  BannerButton,
  BannerImage,
  BannerTitle,
  BannerTitleSection,
  ItemContainer,
} from "../../styles/bannerStyle";
import { IItemList } from "../../type";
import { createImage } from "../../utils/createImgae";

export const SliderItem = ({
  id,
  title,
  name,
  backdrop_path,
  media_type,
}: IItemList) => {
  const navigate = useNavigate();

  return (
    <ItemContainer>
      <BannerTitleSection>
        <BannerTitle>{title ?? name}</BannerTitle>
        <BannerButton>
          <Button
            onClick={() => navigate(`modal/${media_type ?? "movie"}/${id}`)}
          >
            <span>확인하기</span>
          </Button>
        </BannerButton>
      </BannerTitleSection>
      <BannerImage $bgImage={createImage("original", backdrop_path ?? "")} />
    </ItemContainer>
  );
};
