import styled from "styled-components";

export const InfoSection = styled.section`
  padding: 15px 0;
  color: ${(props) => props.theme.font.secondary};
`;

export const InfoHead = styled.h2`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: 600;
`;

export const CompanyImage = styled.img`
  display: block;
  object-fit: contain;
  margin-bottom: 15px;
  padding: 15px;
  border-radius: 5px;
  background-color: #ffffff;
`;

export const CastList = styled.ul`
  display: flex;
  flex-wrap: nowrap;
  gap: 15px;
  overflow-x: scroll;
  padding-bottom: 15px;
`;

export const CastContainer = styled.li`
  display: flex;
  flex-direction: column;
  flex: 0 0 140px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid ${(props) => props.theme.background.tertiary};
    border-radius: 5px;
  }
`;

export const CastImageArea = styled.div`
  position: relative;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const CastImage = styled.img`
  display: block;
  width: 100%;
  height: 160px;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  object-fit: cover;
`;

export const CastTextArea = styled.div`
  --font-size: 17px;
  --line-height: 1.5;
  --padding: 10px;

  height: calc(var(--font-size) * var(--line-height) * 4 + var(--padding) * 2);
  padding: var(--padding);
  span {
    height: 50%;
    font-size: var(--font-size);
    line-height: var(--line-height);
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const CastName = styled.span``;

export const CharacterName = styled.span`
  color: ${(props) => props.theme.font.muted};
`;
