import { useQuery } from "@tanstack/react-query";
import { getDetail } from "../../api";
import { IGetDetail, TCurrentTab } from "../../type";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  BadgeArea,
  BgImage,
  ContentNav,
  CurrentBar,
  ExitBtn,
  Genre,
  Header,
  ModalContent,
  ModalNav,
  ModalOverview,
  NavItem,
  NavItems,
  Overview,
  Poster,
  Title,
  TitleArea,
  Vote,
} from "../../styles/modalStyle";
import { createImage } from "../../utils/createImgae";
import { useState } from "react";

interface IModalProps {
  itemId: number;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalDetail = ({ itemId, setIsModalOpen }: IModalProps) => {
  const { mediaType } = useParams();
  if (!mediaType) return;

  const { data: detailData } = useQuery<IGetDetail>({
    queryKey: ["itemDetail", itemId],
    queryFn: () => getDetail(itemId, (mediaType as any) ?? "movie"),
  });

  const [currentTab, setCurrentTab] = useState<TCurrentTab>("video");

  return (
    <>
      <ModalOverview>
        <BgImage
          $bgImg={createImage("w780", detailData?.backdrop_path ?? "")}
        ></BgImage>
        <ModalNav>
          <ExitBtn onClick={() => setIsModalOpen(false)}>
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
          <TitleArea>
            <div>
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
                  <span key={genre.id}>{genre.name}</span>
                ))}
              </Genre>
            </div>
            <BadgeArea>
              <Badge>
                <svg
                  width="24"
                  height="24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 384 512"
                >
                  <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80L0 432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
                </svg>
                <span>트레일러 보기</span>
              </Badge>
              <Badge>
                <svg
                  width="24"
                  height="24"
                  fill="#ffffff"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z" />
                </svg>
                <span>좋아요</span>
              </Badge>
            </BadgeArea>
          </TitleArea>
          <Poster
            src={createImage("w400", detailData?.poster_path ?? "")}
            alt=""
          />
        </Header>
        <Overview>
          <span>{detailData?.overview}</span>
        </Overview>
      </ModalOverview>
      <ModalContent>
        <ContentNav>
          <NavItems>
            <NavItem
              onClick={() => setCurrentTab("video")}
              $current={currentTab === "video"}
            >
              <span>동영상</span>
              {currentTab === "video" && (
                <CurrentBar layoutId="currentBar" style={{ originY: "0px" }} />
              )}
            </NavItem>
            {mediaType === "tv" && (
              <NavItem
                onClick={() => setCurrentTab("episode")}
                $current={currentTab === "episode"}
              >
                <span>에피소드</span>
                {currentTab === "episode" && (
                  <CurrentBar layoutId="currentBar" />
                )}
              </NavItem>
            )}
            <NavItem
              onClick={() => setCurrentTab("similar")}
              $current={currentTab === "similar"}
            >
              <span>비슷한 작품</span>
              {currentTab === "similar" && <CurrentBar layoutId="currentBar" />}
            </NavItem>
          </NavItems>
        </ContentNav>
      </ModalContent>
    </>
  );
};
