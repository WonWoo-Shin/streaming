import styled from "styled-components";

export const RecommendContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 70px 20px;
  padding-top: 20px;
`;

export const ItemContainer = styled.li`
  &:hover .item-image::before {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

export const ItemImage = styled.div`
  position: relative;
  margin-bottom: 7px;
  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: 5px;
    object-fit: cover;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;
  }
`;

export const ItemTitle = styled.span`
  display: block;
  padding-right: 5px;
  font-size: 16px;
  line-height: 1.5;
  word-break: keep-all;
  color: ${(props) => props.theme.font.paragraph};
`;
