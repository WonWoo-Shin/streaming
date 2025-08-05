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
} from "../../styles/modal/modalInfoStyle";
import {
  ICredits,
  IItemList,
  IProductionCompanies,
  TMediaType,
} from "../../type";
import { createImage } from "../../utils/createImgae";
import { getCredits } from "../../api";

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
  const { data: creditsData } = useQuery<ICredits>({
    queryKey: ["credits", itemId],
    queryFn: () => getCredits(mediaType, itemId),
  });

  return (
    <>
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
                    src={createImage("w200", cast.profile_path)}
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
    </>
  );
};
