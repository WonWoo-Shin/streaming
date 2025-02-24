import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import {
  BannerButton,
  BannerDescription,
  BannerImage,
  BannerTagline,
  BannerTitle,
  BannerTitleSection,
  ItemContainer,
} from "../../styles/bannerStyle";
import { IGetDetail, IItem } from "../../type";
import { createBgImage } from "../../utils/createBgImgae";

export const SliderItem = ({ title, name, backdrop_path }: IItem) => {
  return (
    <ItemContainer>
      <BannerTitleSection>
        <BannerTitle>{title ?? name}</BannerTitle>
        <BannerDescription>
          <BannerButton>
            <span>확인하기</span>
          </BannerButton>
        </BannerDescription>
      </BannerTitleSection>
      <BannerImage $bgImage={createBgImage("original", backdrop_path ?? "")} />
    </ItemContainer>
  );
};
