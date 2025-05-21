import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 220px;
  margin-top: 4em;
  border-top: 1px solid ${(props) => props.theme.etc.divider};
`;

export const LinkButton = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 120px;
  height: 40px;
  padding: 0 12px;
  background-color: var(--point-green);
  border-radius: 4px;
  color: #000000;
  font-size: 18px;
  font-weight: 600;
  font-family: BlinkMacSystemFont, sans-serif;
  text-decoration: none;
  svg {
    width: 24px;
    height: 24px;
  }
`;
