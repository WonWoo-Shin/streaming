import {
  BannerButton,
  BannerImage,
  BannerTitle,
  BannerTitleSection,
  ItemContainer,
} from "../../styles/bannerStyle";
import { IMovie } from "../../type";
import { createBgImage } from "../../utils/createBgImgae";

export const SliderItem = ({ title, backdrop_path }: IMovie) => {
  return (
    <ItemContainer>
      <BannerTitleSection>
        <BannerTitle>{title}</BannerTitle>
        <BannerButton>확인하기</BannerButton>
      </BannerTitleSection>
      <BannerImage $bgImage={createBgImage("original", backdrop_path ?? "")} />
    </ItemContainer>
  );
};
