import { useQuery } from "@tanstack/react-query";
import {
  CompanyImage,
  CompanyImageContainer,
  CompanyName,
  InfoHead,
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

  console.log(creditsData);

  return (
    <>
      <InfoHead>제작</InfoHead>
      {production_companies && (
        <>
          <CompanyImageContainer>
            <CompanyImage
              src={createImage("w300", production_companies[0].logo_path)}
            />
          </CompanyImageContainer>
          <CompanyName>{production_companies[0].name}</CompanyName>
        </>
      )}
      {creditsData && (
        <>
          <InfoHead>출연</InfoHead>
          <ul>
            {creditsData.cast.slice(0, 3).map((cast) => (
              <li key={cast.id}>
                {cast.character} 역 {cast.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
};
