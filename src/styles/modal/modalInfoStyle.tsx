import styled from "styled-components";

export const InfoHead = styled.h2`
  font-size: 17px;
  font-weight: 600;
  color: ${(props) => props.theme.font.secondary};
`;

export const CompanyImageContainer = styled.div`
  width: 300px;
  background-color: #ffffff;
`;

export const CompanyImage = styled.img`
  display: block;
  object-fit: contain;
`;

export const CompanyName = styled.span`
  color: ${(props) => props.theme.font.paragraph};
`;
