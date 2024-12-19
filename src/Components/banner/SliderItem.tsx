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
        <BannerButton>
          <span>확인하기</span>
        </BannerButton>
      </BannerTitleSection>
      <BannerImage $bgImage={createBgImage("original", backdrop_path ?? "")} />
    </ItemContainer>
  );
};
