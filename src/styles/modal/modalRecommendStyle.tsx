import styled from "styled-components";

export const RecommendContainer = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 70px 20px;
  padding-top: 20px;
`;

export const ItemImage = styled.div`
  position: relative;
  img {
    display: block;
    width: 100%;
    aspect-ratio: 16 / 9;
    margin-bottom: 10px;
    border-radius: 5px;
    object-fit: cover;
  }
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const ItemTitle = styled.span`
  display: block;
  padding-right: 5px;
  font-size: 18px;
  line-height: 1.5;
  color: ${(props) => props.theme.font.paragraph};
`;
