import { useQuery } from "@tanstack/react-query";
import {
  CastContainer,
  CastImage,
  CastImageArea,
  CastList,
  CastName,
  CastTextArea,
  CharacterName,
  CompanyImage,
  InfoHead,
  InfoSection,
} from "../../../styles/modal/modalInfoStyle";
import {
  ICredits,
  IItemList,
  IProductionCompanies,
  TMediaType,
} from "../../../type";
import { createImage } from "../../../utils/createImgae";
import { getCredits } from "../../../api";
import { ContentsMessage } from "../../../styles/modal/modalStyle";

interface IProps {
  itemId: IItemList["id"];
  mediaType: TMediaType;
  production_companies: IProductionCompanies[] | undefined;
}

export const ModalInfo = ({
  itemId,
  mediaType,
  production_companies,
}: IProps) => {
  const { data: creditsData, isLoading } = useQuery<ICredits>({
    queryKey: ["credits", itemId],
    queryFn: () => getCredits(mediaType, itemId),
  });

  return (
    <>
      {isLoading ? (
        <ContentsMessage>로드 중..</ContentsMessage>
      ) : creditsData?.success === false ? (
        <ContentsMessage>
          데이터를 불러오지 못했습니다.
          <br /> 잠시 후 다시 시도해주세요.
        </ContentsMessage>
      ) : (
        <div>
          {production_companies && (
            <InfoSection>
              <InfoHead>제작</InfoHead>
              <div>
                <CompanyImage
                  src={createImage("w200", production_companies[0].logo_path)}
                  title={production_companies[0].name}
                />
              </div>
            </InfoSection>
          )}
          {creditsData && (
            <InfoSection>
              <InfoHead>출연</InfoHead>
              <CastList>
                {creditsData.cast.map((cast) => (
                  <CastContainer key={cast.id}>
                    <CastImageArea>
                      {" "}
                      <CastImage
                        src={
                          cast.profile_path
                            ? createImage("w200", cast.profile_path)
                            : "https://ssl.pstatic.net/sstatic/keypage/outside/scui/cs_common_module/im/no_img_people_206x232_v2.png"
                        }
                        alt=""
                      />
                    </CastImageArea>
                    <CastTextArea>
                      <CastName>{cast.name}</CastName>
                      <CharacterName>{cast.character}</CharacterName>
                    </CastTextArea>
                  </CastContainer>
                ))}
              </CastList>
            </InfoSection>
          )}
        </div>
      )}
    </>
  );
};
