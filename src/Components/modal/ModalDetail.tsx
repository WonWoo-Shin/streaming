import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import { IGetDetail } from "../../type";
import { useNavigate, useParams } from "react-router-dom";
import {
  ExitBtn,
  ModalNav,
  ModalOverview,
  Poster,
} from "../../styles/modalStyle";
import { createImage } from "../../utils/createImgae";

interface IModalProps {
  itemId: number;
}

export const ModalDetail = ({ itemId }: IModalProps) => {
  const { mediaType } = useParams();
  if (!mediaType) return;

  const { data: detailData } = useQuery<IGetDetail>({
    queryKey: ["itemDetail", itemId],
    queryFn: () => getDetail(itemId, (mediaType as any) ?? "movie"),
  });

  const navigate = useNavigate();

  return (
    <ModalOverview>
      <ModalNav>
        <ExitBtn onClick={() => navigate("/")}>
          {" "}
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.052 4.352a1.202 1.202 0 0 0-1.7 1.7L10.3 12l-5.948 5.948a1.202 1.202 0 0 0 1.7 1.7L12 13.7l5.948 5.948a1.202 1.202 0 0 0 1.7-1.7L13.7 12l5.948-5.948a1.202 1.202 0 0 0-1.7-1.7L12 10.3 6.052 4.352Z"
              fill="currentColor"
            ></path>
          </svg>
        </ExitBtn>
      </ModalNav>
      <div>
        <div></div>
        <Poster
          src={createImage("w400", detailData?.poster_path ?? "")}
          alt=""
        />
      </div>
    </ModalOverview>
  );
};
