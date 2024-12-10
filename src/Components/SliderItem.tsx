import {
  BannerImage,
  BannerTitle,
  BannerTitleSection,
  ItemContainer,
} from "../styles/homeStyle";
import { IMovie } from "../type";
import { createBgImage } from "../utils/createBgImgae";

export const SliderItem = ({ title, backdrop_path }: IMovie) => {
  return (
    <ItemContainer>
      <BannerTitleSection>
        <BannerTitle>{title}</BannerTitle>
      </BannerTitleSection>
      <BannerImage $bgImage={createBgImage("original", backdrop_path ?? "")} />
    </ItemContainer>
  );
};
