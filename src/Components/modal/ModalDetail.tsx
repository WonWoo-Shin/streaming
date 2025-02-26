import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import { IGetDetail } from "../../type";
import { useNavigate, useParams } from "react-router-dom";
import {
  BgImage,
  ExitBtn,
  Genre,
  Header,
  MainInfo,
  ModalNav,
  ModalOverview,
  Overview,
  Poster,
  Title,
  Vote,
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
      <BgImage
        $bgImg={createImage("w500", detailData?.backdrop_path ?? "")}
      ></BgImage>
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
      <Header>
        <MainInfo>
          <Vote>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              color="#FFFFFF"
            >
              <path
                d="M10.706 3.135c.476-1.154 2.112-1.154 2.588 0l2.043 4.95 5.329.43c1.238.1 1.742 1.644.802 2.456L17.4 14.482l1.24 5.235c.286 1.213-1.035 2.168-2.097 1.515L12 18.434l-4.543 2.797c-1.062.653-2.383-.302-2.096-1.515L6.6 14.482l-4.068-3.51c-.94-.813-.436-2.356.802-2.456l5.329-.43 2.043-4.95Z"
                fill="currentColor"
              ></path>
            </svg>
            <span>{detailData?.vote_average.toFixed(1)}</span>
          </Vote>
          <Title>{detailData?.title ?? detailData?.name}</Title>
          <Genre>
            {detailData?.genres.map((genre) => (
              <span>{genre.name}</span>
            ))}
          </Genre>
        </MainInfo>
        <Poster
          src={createImage("w400", detailData?.poster_path ?? "")}
          alt=""
        />
      </Header>
      <Overview>
        <span>{detailData?.overview}</span>
      </Overview>
    </ModalOverview>
  );
};
