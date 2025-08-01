import {
  CompanyImage,
  CompanyImageContainer,
  CompanyName,
  InfoHead,
} from "../../styles/modal/modalInfoStyle";
import { IProductionCompanies } from "../../type";
import { createImage } from "../../utils/createImgae";

interface IProps {
  production_companies: IProductionCompanies[] | undefined;
}

export const ModalInfo = ({ production_companies }: IProps) => {
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
    </>
  );
};
