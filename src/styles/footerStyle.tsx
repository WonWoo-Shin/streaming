import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-top: 4em;
  border-top: 1px solid #202224;
  color: #e5e5e5;
`;

export const LinkButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 40px;
  padding: 0 12px;
  background-color: #04d087;
  border-radius: 4px;
  color: black;
  font-size: 18px;
  font-weight: 600;
  font-family: BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  svg {
    width: 24px;
    height: 24px;
  }
`;
