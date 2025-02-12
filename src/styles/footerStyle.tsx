import styled from "styled-components";

export const FooterContainer = styled.footer`
  width: 100%;
  height: 220px;
  margin-top: 4em;
  padding: 50px;
  border-top: 1px solid #202224;
  color: #e5e5e5;
`;

export const FooterTitle = styled.h1`
  margin-bottom: 20px;
  font-size: 24px;
  font-weight: 600;
`;

export const LinkButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 40px;
  padding: 0 12px;
  background-color: #ffffff;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  font-family: BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  transition: border-color 0.2s;
  svg {
    width: 24px;
    height: 24px;
  }
  &:hover {
    border-color: #b5b5b5;
  }
`;
